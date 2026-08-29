const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const collectionPath = path.join(root, 'postman/collections/HW06-API-Testing.postman_collection.json');
const environmentPath = path.join(root, 'postman/environments/HW06-local.postman_environment.json');
const tracePath = path.join(root, 'postman/traceability/testcase-postman-matrix.md');
const blockedPath = path.join(root, 'postman/traceability/blocked-tests.md');
const setupTracePath = path.join(root, 'postman/traceability/setup-postman-matrix.md');
const manifestPath = path.join(root, 'postman-plan/execution-manifest.md');

const result = { checks: [], metrics: {} };
const check = (name, condition, details = '') => {
  result.checks.push({ name, pass: Boolean(condition), details });
};
const parseJson = (file, label) => {
  try {
    const value = JSON.parse(fs.readFileSync(file, 'utf8'));
    check(`${label} JSON parseable`, true);
    return value;
  } catch (error) {
    check(`${label} JSON parseable`, false, error.message);
    return null;
  }
};
const splitRow = (line) => line.split('|').slice(1, -1).map((v) => v.trim());

const collection = parseJson(collectionPath, 'Collection');
const environment = parseJson(environmentPath, 'Environment');
if (!collection || !environment) finish();

check('Collection schema is Postman v2.1', collection.info && collection.info.schema === 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json', collection.info && collection.info.schema);
check('Collection name is canonical', collection.info && collection.info.name === 'HW06 API Testing');
check('Environment is directly importable', environment._postman_variable_scope === 'environment' && Array.isArray(environment.values));
check('Collection contains only canonical item hierarchy', (collection.item || []).every((item) => !Object.prototype.hasOwnProperty.call(item, 'folders')));

const manifestRows = fs.readFileSync(manifestPath, 'utf8').split(/\r?\n/)
  .filter((line) => /^\| TC-API-\d{3} \|/.test(line)).map(splitRow);
const knownIds = new Set(manifestRows.map((r) => r[0]));
const expectedExecutable = new Set(manifestRows.filter((r) => !r[3].startsWith('BLOCKED_')).map((r) => r[0]));
const expectedBlocked = new Set(manifestRows.filter((r) => r[3].startsWith('BLOCKED_')).map((r) => r[0]));
const expectedOrigin = new Map(manifestRows.map((r) => [r[0], r[2]]));

const testcaseUnits = [];
const requests = [];
const requestContexts = new Map();
const duplicateNames = [];

function walk(items, ancestors = [], unitId = null, inSetup = false) {
  for (const item of items || []) {
    const match = /^\[(TC-API-\d{3})\]/.exec(item.name || '');
    let currentUnit = unitId;
    if (match) {
      currentUnit = match[1];
      testcaseUnits.push({ id: currentUnit, item, path: [...ancestors, item.name].join(' / ') });
    }
    const setup = inSetup || item.name === '00 - Setup';
    if (item.request) {
      requests.push(item);
      requestContexts.set(item, { unitId: currentUnit, inSetup: setup, path: [...ancestors, item.name].join(' / ') });
    }
    if (item.item) walk(item.item, [...ancestors, item.name], currentUnit, setup);
  }
}
walk(collection.item);

const implementedIds = testcaseUnits.map((u) => u.id);
const implementedSet = new Set(implementedIds);
const duplicates = implementedIds.filter((id, index) => implementedIds.indexOf(id) !== index);
const unknown = [...implementedSet].filter((id) => !knownIds.has(id));
const missingExecutable = [...expectedExecutable].filter((id) => !implementedSet.has(id));
const blockedImplemented = [...expectedBlocked].filter((id) => implementedSet.has(id));

result.metrics.executableTestcaseUnits = testcaseUnits.length;
result.metrics.totalHttpRequests = requests.length;
result.metrics.supportingSetupRequests = requests.filter((r) => requestContexts.get(r).inSetup).length;
result.metrics.testcaseHttpRequests = requests.length - result.metrics.supportingSetupRequests;
result.metrics.environmentVariables = environment.values.length;
result.metrics.aiExecutableUnits = testcaseUnits.filter((u) => expectedOrigin.get(u.id) === 'AI_GENERATED').length;
result.metrics.humanExecutableUnits = testcaseUnits.filter((u) => expectedOrigin.get(u.id) === 'HUMAN_ADDED').length;

check('Executable testcase units represented = 114', testcaseUnits.length === 114, String(testcaseUnits.length));
check('Executable testcase implementation IDs unique', duplicates.length === 0, duplicates.join(', '));
check('Unknown testcase implementation IDs = 0', unknown.length === 0, unknown.join(', '));
check('All expected executable IDs represented', missingExecutable.length === 0, missingExecutable.join(', '));
check('Blocked IDs absent from executable testcase units', blockedImplemented.length === 0, blockedImplemented.join(', '));
check('AI_GENERATED executable units = 98', result.metrics.aiExecutableUnits === 98, String(result.metrics.aiExecutableUnits));
check('HUMAN_ADDED executable units = 16', result.metrics.humanExecutableUnits === 16, String(result.metrics.humanExecutableUnits));

const missingStudentHeader = requests.filter((item) => !((item.request.header || []).some((h) => String(h.key).toLowerCase() === 'x-student-id' && h.value === '{{student_id}}')));
result.metrics.httpRequestsMissingStudentId = missingStudentHeader.length;
check('Every HTTP request includes X-Student-Id', missingStudentHeader.length === 0, missingStudentHeader.map((r) => requestContexts.get(r).path).join('; '));

const invalidJsonBodies = [];
for (const item of requests) {
  const rawBody = item.request.body && item.request.body.raw;
  const rawLanguage = item.request.body && item.request.body.options && item.request.body.options.raw && item.request.body.options.raw.language;
  if (typeof rawBody !== 'string' || rawLanguage !== 'json') continue;
  const substituted = rawBody
    .replace(/"{{[^}]+}}"/g, '"placeholder"')
    .replace(/{{[^}]+}}/g, '1');
  try {
    JSON.parse(substituted);
  } catch (error) {
    invalidJsonBodies.push(`${requestContexts.get(item).path}: ${error.message}`);
  }
}
check('All JSON-designated raw bodies are syntactically parseable', invalidJsonBodies.length === 0, invalidJsonBodies.join('; '));

const requiredMetadata = ['Canonical Test ID:', 'Feature:', 'Origin:', 'Execution Class:', 'Logical Objective:', 'TB Refs:', 'EP Refs:', 'INT Refs:', 'Blocker Refs:', 'DATA IDs:', 'SETUP IDs:', 'Assertion Strategy:', 'Exploratory:'];
const metadataFailures = [];
const humanMetadataFailures = [];
for (const unit of testcaseUnits) {
  const descriptions = [];
  if (typeof unit.item.description === 'string') descriptions.push(unit.item.description);
  if (unit.item.request && typeof unit.item.request.description === 'string') descriptions.push(unit.item.request.description);
  const collectDescriptions = (items) => (items || []).forEach((i) => { if (i.request && typeof i.request.description === 'string') descriptions.push(i.request.description); if (i.item) collectDescriptions(i.item); });
  collectDescriptions(unit.item.item);
  const combined = descriptions.join('\n');
  if (requiredMetadata.some((key) => !combined.includes(key)) || !combined.includes(unit.id)) metadataFailures.push(unit.id);
  if (expectedOrigin.get(unit.id) === 'HUMAN_ADDED' && (!combined.includes('Origin: HUMAN_ADDED') || !/Student Proposal ID: TC-PROP-/.test(combined))) humanMetadataFailures.push(unit.id);
}
check('Every testcase unit has required metadata', metadataFailures.length === 0, metadataFailures.join(', '));
check('HUMAN_ADDED provenance and proposal IDs preserved', humanMetadataFailures.length === 0, humanMetadataFailures.join(', '));

const pmTestNameFailures = [];
const fakePassHits = [];
const unsupportedExactStatus = [];
const allowedExactStatus = new Set(['TC-API-001', 'TC-API-074']);
const allowedNon2xx = new Set(['TC-API-047','TC-API-048','TC-API-049','TC-API-055','TC-API-056','TC-API-057']);
for (const item of requests) {
  const context = requestContexts.get(item);
  if (!context.unitId) continue;
  const scripts = (item.event || []).filter((e) => e.listen === 'test').flatMap((e) => (e.script && e.script.exec) || []);
  const text = scripts.join('\n');
  for (const match of text.matchAll(/pm\.test\(\s*["'`]([^"'`]+)["'`]/g)) if (!match[1].includes(context.unitId)) pmTestNameFailures.push(`${context.unitId}: ${match[1]}`);
  if (/expect\(\s*true\s*\)|to\.be\.true/.test(text)) fakePassHits.push(context.unitId);
  if (/pm\.response\.to\.have\.status\(\s*\d+/.test(text) && !allowedExactStatus.has(context.unitId)) unsupportedExactStatus.push(context.unitId);
  if (/to\.not\.be\.within\(200,\s*299\)/.test(text) && !allowedNon2xx.has(context.unitId)) unsupportedExactStatus.push(context.unitId);
}
check('Every pm.test name contains its testcase ID', pmTestNameFailures.length === 0, pmTestNameFailures.join('; '));
check('Fake-pass assertions absent', fakePassHits.length === 0, [...new Set(fakePassHits)].join(', '));
check('Unsupported hard assertions absent', unsupportedExactStatus.length === 0, [...new Set(unsupportedExactStatus)].join(', '));

const traceRows = fs.readFileSync(tracePath, 'utf8').split(/\r?\n/).filter((line) => /^\| TC-API-\d{3} \|/.test(line)).map(splitRow);
const traceIds = traceRows.map((r) => r[0]);
const traceUnknown = traceIds.filter((id) => !knownIds.has(id));
const traceMissing = [...knownIds].filter((id) => !traceIds.includes(id));
check('Logical IDs accounted by traceability = 122', traceRows.length === 122 && new Set(traceIds).size === 122 && traceUnknown.length === 0 && traceMissing.length === 0, `rows=${traceRows.length}; unknown=${traceUnknown.join(',')}; missing=${traceMissing.join(',')}`);

const blockedRows = fs.readFileSync(blockedPath, 'utf8').split(/\r?\n/).filter((line) => /^\| TC-API-\d{3} \|/.test(line)).map(splitRow);
const blockedDocIds = new Set(blockedRows.map((r) => r[0]));
check('Blocked tests documented = 8', blockedRows.length === 8 && [...expectedBlocked].every((id) => blockedDocIds.has(id)), String(blockedRows.length));
check('Blocked documentation preserves logical tests and skips Newman', blockedRows.every((r) => r[3] === 'YES' && r[4] === 'NO'));

const setupTraceRows = fs.readFileSync(setupTracePath, 'utf8').split(/\r?\n/).filter((line) => /^\| SETUP-\d{3} \|/.test(line)).map(splitRow);
check('All 14 SETUP IDs represented in setup traceability', setupTraceRows.length === 14 && new Set(setupTraceRows.map((r) => r[0])).size === 14, String(setupTraceRows.length));

const sensitiveKeys = new Set(['student_id','user_email','user_password','user_b_email','user_b_password','admin_email','admin_password','wrong_role_email','wrong_role_password','user_token','user_b_token','admin_token','wrong_role_token']);
const plaintextSensitive = environment.values.filter((v) => sensitiveKeys.has(v.key) && v.value !== '');
const serialized = JSON.stringify({ collection, environment });
const secretPatternHits = [];
if (/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./.test(serialized)) secretPatternHits.push('JWT-like literal');
if (/admin123/i.test(serialized)) secretPatternHits.push('known default password literal');
result.metrics.plaintextSecrets = plaintextSensitive.length + secretPatternHits.length;
check('No plaintext credentials or tokens committed', result.metrics.plaintextSecrets === 0, [...plaintextSensitive.map((v) => v.key), ...secretPatternHits].join(', '));

const runtimeIdViolations = [];
for (const item of requests) {
  const context = requestContexts.get(item);
  const url = typeof item.request.url === 'string' ? item.request.url : JSON.stringify(item.request.url);
  const body = item.request.body && item.request.body.raw || '';
  if (/\/api\/admin\/orders\/\d+\/status/.test(url)) runtimeIdViolations.push(context.path);
  if (/\/api\/products\/1(?:\D|$)/.test(url)) runtimeIdViolations.push(context.path);
  if (context.unitId && ['TC-API-154','TC-API-155','TC-API-160','TC-API-161','TC-API-171','TC-API-172','TC-API-174','TC-API-175'].includes(context.unitId) && /"id"\s*:\s*1(?:\D|$)/.test(body)) runtimeIdViolations.push(context.path);
}
check('No hardcoded runtime Product/Order IDs where discovery is required', runtimeIdViolations.length === 0, runtimeIdViolations.join('; '));

function finish() {
  const failed = result.checks.filter((c) => !c.pass);
  const output = {
    status: failed.length ? 'FAIL' : 'PASS',
    metrics: result.metrics,
    checks: result.checks,
    failed: failed.map((c) => ({ name: c.name, details: c.details }))
  };
  console.log(JSON.stringify(output, null, 2));
  process.exitCode = failed.length ? 1 : 0;
}

finish();
