const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const paths = {
  canonical: path.join(root, 'postman/collections/HW06-API-Testing.postman_collection.json'),
  passing: path.join(__dirname, 'HW06-CI-Passing.postman_collection.json'),
  intentional: path.join(__dirname, 'HW06-CI-Intentional-Fail.postman_collection.json'),
  environment: path.join(__dirname, 'HW06-CI.postman_environment.json'),
  blocked: path.join(root, 'postman/traceability/blocked-tests.md'),
  passingWorkflow: path.join(root, '.github/workflows/newman-ci.yml'),
  intentionalWorkflow: path.join(root, '.github/workflows/newman-intentional-fail.yml')
};

const failures = [];
const checks = [];
function check(name, condition, details = '') {
  checks.push({ name, pass: Boolean(condition), details });
  if (!condition) failures.push(`${name}${details ? `: ${details}` : ''}`);
}
function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push(`JSON parse failed for ${path.relative(root, file)}: ${error.message}`);
    return null;
  }
}
function requestItems(items, output = []) {
  for (const item of items || []) {
    if (item.request) output.push(item);
    if (item.item) requestItems(item.item, output);
  }
  return output;
}
function itemId(item) {
  return /^\[(TC-API-\d{3})\]/.exec(item.name || '')?.[1] || null;
}
function headerPresent(item) {
  return (item.request?.header || []).some((header) =>
    String(header.key).toLowerCase() === 'x-student-id' && String(header.value) === '{{student_id}}'
  );
}

const canonical = readJson(paths.canonical);
const passing = readJson(paths.passing);
const intentional = readJson(paths.intentional);
const environment = readJson(paths.environment);
check('Passing collection JSON parseable', Boolean(passing));
check('Intentional-fail collection JSON parseable', Boolean(intentional));
check('CI environment JSON parseable', Boolean(environment));

if (canonical && passing && intentional && environment) {
  const canonicalRequests = requestItems(canonical.item);
  const passingRequests = requestItems(passing.item);
  const intentionalRequests = requestItems(intentional.item);
  const canonicalById = new Map(canonicalRequests.map((item) => [itemId(item), item]).filter(([id]) => id));
  const passingTestItems = passingRequests.filter((item) => itemId(item));
  const passingIds = passingTestItems.map(itemId);
  const passingSet = new Set(passingIds);
  const expected = new Set(['TC-API-001', 'TC-API-130', 'TC-API-173', 'TC-API-048']);
  const confirmedDefects = new Set(['TC-API-047', 'TC-API-055', 'TC-API-011', 'TC-API-078']);
  const setup007 = new Set(['TC-API-155']);
  const setup014 = new Set(['TC-API-050', 'TC-API-051', 'TC-API-052', 'TC-API-053', 'TC-API-054', 'TC-API-124', 'TC-API-125', 'TC-API-126']);
  const blockedIds = new Set(fs.readFileSync(paths.blocked, 'utf8').match(/TC-API-\d{3}/g) || []);

  check('Passing logical testcase count is within 3–6', passingIds.length >= 3 && passingIds.length <= 6, String(passingIds.length));
  check('Passing logical testcase IDs unique', passingIds.length === passingSet.size);
  check('Passing selection exactly matches approved IDs',
    passingSet.size === expected.size && [...expected].every((id) => passingSet.has(id)),
    passingIds.join(', '));
  check('Passing logical IDs belong to canonical suite', passingIds.every((id) => canonicalById.has(id)));
  check('Passing items preserve canonical request units', passingTestItems.every((item) =>
    JSON.stringify(item) === JSON.stringify(canonicalById.get(itemId(item)))));
  check('Canonical blocked tests excluded', [...blockedIds].every((id) => !passingSet.has(id)));
  check('Confirmed defect tests excluded', [...confirmedDefects].every((id) => !passingSet.has(id)));
  check('SETUP-007-dependent tests excluded', [...setup007].every((id) => !passingSet.has(id)));
  check('SETUP-014 ambiguity tests excluded', [...setup014].every((id) => !passingSet.has(id)));
  check('Passing sample covers FR-02, FR-07, and FR-18',
    ['FR-02', 'FR-07', 'FR-18'].every((feature) => passingTestItems.some((item) => String(item.request.description || '').includes(`Feature: ${feature}`))));
  check('Passing sample contains one HUMAN_ADDED testcase',
    passingTestItems.filter((item) => String(item.request.description || '').includes('Origin: HUMAN_ADDED')).length === 1);
  check('Passing sample has two setup requests', passingRequests.filter((item) => /^\[SETUP-/.test(item.name || '')).length === 2);
  check('Passing sample has six total HTTP requests', passingRequests.length === 6, String(passingRequests.length));
  check('Every passing HTTP request contains X-Student-Id', passingRequests.every(headerPresent));
  check('Every intentional HTTP request contains X-Student-Id', intentionalRequests.length === 1 && intentionalRequests.every(headerPresent));

  const intentionalText = JSON.stringify(intentional);
  check('Intentional collection contains CI_DEMO_ONLY marker', intentionalText.includes('CI_DEMO_ONLY'));
  check('Intentional collection creates no TC-API ID', !/TC-API-\d{3}/.test(intentionalText));
  check('Intentional collection contains exactly one pm.test', (intentionalText.match(/pm\.test\(/g) || []).length === 1);
  check('Intentional collection contains exact failure assertion name',
    (intentionalText.match(/\[CI-DEMO-FAIL\] Intentional CI failure demonstration/g) || []).length === 1);
  check('Intentional assertion is guaranteed to fail', intentionalText.includes('.to.eql(false)'));

  const studentEntry = (environment.values || []).find((entry) => entry.key === 'student_id');
  check('Committed student_id value is empty', Boolean(studentEntry) && String(studentEntry.value || '') === '');
  check('CI base_url uses loopback SUT',
    (environment.values || []).some((entry) => entry.key === 'base_url' && entry.value === 'http://127.0.0.1:3000'));
  check('Committed CI credential/token values are empty', (environment.values || [])
    .filter((entry) => /(student|password|token|email)/i.test(String(entry.key)))
    .every((entry) => String(entry.value || '') === ''));

  const committedText = [
    fs.readFileSync(paths.passing, 'utf8'),
    fs.readFileSync(paths.intentional, 'utf8'),
    fs.readFileSync(paths.environment, 'utf8')
  ].join('\n');
  check('No JWT-like values in committed CI assets', !/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]*/.test(committedText));
  check('No GitHub token-like values in committed CI assets', !/\b(?:gh[opsu]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/i.test(committedText));
  check('No hardcoded student identifier in committed CI assets', !/\b\d{8}\b/.test(committedText));
}

for (const workflowPath of [paths.passingWorkflow, paths.intentionalWorkflow]) {
  check(`${path.basename(workflowPath)} exists`, fs.existsSync(workflowPath));
}
if (fs.existsSync(paths.passingWorkflow) && fs.existsSync(paths.intentionalWorkflow)) {
  const passingWorkflow = fs.readFileSync(paths.passingWorkflow, 'utf8');
  const intentionalWorkflow = fs.readFileSync(paths.intentionalWorkflow, 'utf8');
  check('Passing workflow uses STUDENT_ID secret', passingWorkflow.includes('secrets.STUDENT_ID'));
  check('Intentional workflow uses STUDENT_ID secret', intentionalWorkflow.includes('secrets.STUDENT_ID'));
  check('Passing workflow uses Node.js 22 and Newman 6.2.2', passingWorkflow.includes("node-version: '22'") && passingWorkflow.includes('newman@6.2.2'));
  check('Intentional workflow uses Node.js 22 and Newman 6.2.2', intentionalWorkflow.includes("node-version: '22'") && intentionalWorkflow.includes('newman@6.2.2'));
  check('Passing workflow has no continue-on-error or || true', !/continue-on-error|\|\|\s*true/.test(passingWorkflow));
  check('Intentional workflow is manual-only', /workflow_dispatch:/.test(intentionalWorkflow) && !/^\s*(push|pull_request):/m.test(intentionalWorkflow));
  check('Both workflows upload artifacts with always()',
    [passingWorkflow, intentionalWorkflow].every((text) => text.includes('actions/upload-artifact@v4') && text.includes('if: always()')));
  check('Intentional workflow explicitly fails after Newman evidence upload',
    intentionalWorkflow.includes('exit 1') && intentionalWorkflow.includes('steps.newman.outputs.newman_exit'));
}

const result = {
  status: failures.length ? 'FAIL' : 'PASS',
  metrics: {
    passingLogicalTests: passing ? requestItems(passing.item).filter((item) => itemId(item)).length : 0,
    passingHttpRequests: passing ? requestItems(passing.item).length : 0,
    intentionalLogicalTestIds: intentional && /TC-API-\d{3}/.test(JSON.stringify(intentional)) ? 1 : 0,
    intentionalHttpRequests: intentional ? requestItems(intentional.item).length : 0
  },
  checks,
  failures
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
