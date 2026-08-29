const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const canonicalCollectionPath = path.join(root, 'postman/collections/HW06-API-Testing.postman_collection.json');
const canonicalEnvironmentPath = path.join(root, 'postman/environments/HW06-local.postman_environment.json');
const passingPath = path.join(__dirname, 'HW06-CI-Passing.postman_collection.json');
const intentionalPath = path.join(__dirname, 'HW06-CI-Intentional-Fail.postman_collection.json');
const environmentPath = path.join(__dirname, 'HW06-CI.postman_environment.json');
const selectionPath = path.join(__dirname, 'passing-selection.md');

const selection = [
  {
    id: 'TC-API-001', feature: 'FR-02', origin: 'AI_GENERATED', previous: 'PASS',
    setup: 'SETUP-002', reason: 'Supported successful-login assertions passed in the authoritative run.'
  },
  {
    id: 'TC-API-130', feature: 'FR-07', origin: 'AI_GENERATED', previous: 'PASS',
    setup: 'SETUP-002, SETUP-003', reason: 'Stable authenticated GET Cart transport contract.'
  },
  {
    id: 'TC-API-173', feature: 'FR-07', origin: 'HUMAN_ADDED', previous: 'OBSERVED_EXPLORATORY',
    setup: 'SETUP-002, SETUP-003', reason: 'Human-added Content-Type observation with a measurable response-object check.'
  },
  {
    id: 'TC-API-048', feature: 'FR-18', origin: 'AI_GENERATED', previous: 'PASS',
    setup: 'SETUP-001 only', reason: 'Admin-order authorization denial without private Admin credentials.'
  }
];
const selectedIds = new Set(selection.map((entry) => entry.id));
const selectedSetupNames = new Set([
  '[SETUP-002] Register Primary User',
  '[SETUP-003] Login Primary User'
]);

const canonical = JSON.parse(fs.readFileSync(canonicalCollectionPath, 'utf8'));
const canonicalEnvironment = JSON.parse(fs.readFileSync(canonicalEnvironmentPath, 'utf8'));

function filterItems(items, inSetup = false) {
  const output = [];
  for (const item of items || []) {
    if (item.request) {
      const id = /^\[(TC-API-\d{3})\]/.exec(item.name || '')?.[1];
      if ((inSetup && selectedSetupNames.has(item.name)) || (!inSetup && id && selectedIds.has(id))) {
        output.push(item);
      }
      continue;
    }
    const children = filterItems(item.item, inSetup || item.name === '00 - Setup');
    if (children.length) output.push({ ...item, item: children });
  }
  return output;
}

function flattenRequests(items, output = []) {
  for (const item of items || []) {
    if (item.request) output.push(item);
    if (item.item) flattenRequests(item.item, output);
  }
  return output;
}

function findRequestByName(items, name) {
  return flattenRequests(items).find((item) => item.name === name);
}

const passing = JSON.parse(JSON.stringify(canonical));
passing.info = {
  ...passing.info,
  _postman_id: 'hw06-ci-passing-regression-sample',
  name: 'HW06 CI — Passing Regression Sample',
  description: [
    'This is a representative CI regression subset.',
    '',
    'It does not replace the authoritative 114-test execution.',
    '',
    'Known confirmed SUT defects are intentionally excluded from the all-pass demonstration and remain documented separately.'
  ].join('\n')
};
passing.item = passing.item.flatMap((item) => {
  const children = filterItems(item.item, item.name === '00 - Setup');
  return children.length ? [{ ...item, item: children }] : [];
});

const passingRequests = flattenRequests(passing.item);
const passingIds = passingRequests
  .map((item) => /^\[(TC-API-\d{3})\]/.exec(item.name || '')?.[1])
  .filter(Boolean);
const setupRequests = passingRequests.filter((item) => /^\[SETUP-\d{3}\]/.test(item.name || ''));
if (passingIds.length !== selectedIds.size || new Set(passingIds).size !== selectedIds.size) {
  throw new Error(`Unexpected passing logical scope: ${passingIds.join(', ')}`);
}
for (const id of selectedIds) {
  if (!passingIds.includes(id)) throw new Error(`Selected testcase missing from canonical extraction: ${id}`);
}
if (setupRequests.length !== selectedSetupNames.size) {
  throw new Error(`Unexpected setup request count: ${setupRequests.length}`);
}

const sourceRequest = findRequestByName(canonical.item, '[SETUP-006] Discover Existing Product');
if (!sourceRequest) throw new Error('Canonical public GET products request was not found');
const intentionalRequest = {
  ...JSON.parse(JSON.stringify(sourceRequest)),
  name: '[CI-DEMO-ONLY] GET products with intentional assertion failure',
  event: [{
    listen: 'test',
    script: {
      type: 'text/javascript',
      exec: [
        'pm.test("[CI-DEMO-FAIL] Intentional CI failure demonstration", function () {',
        '    pm.expect(true, "Intentional failure required by HW06 CI demonstration").to.eql(false);',
        '});'
      ]
    }
  }],
  request: {
    ...JSON.parse(JSON.stringify(sourceRequest.request)),
    description: [
      'CI_DEMO_ONLY',
      'NO_LOGICAL_TC_ID',
      '',
      'THIS FAILURE IS INTENTIONAL.',
      'It is not a SUT defect.',
      'It exists solely to demonstrate that the GitHub Actions Newman pipeline correctly becomes red when a test assertion fails.',
      'The safe public GET products request is derived from the canonical collection.'
    ].join('\n')
  },
  response: []
};

const intentional = {
  info: {
    _postman_id: 'hw06-ci-intentional-fail-demo',
    name: 'HW06 CI — Intentional Failure Demo',
    description: [
      'CI_DEMO_ONLY — NO_LOGICAL_TC_ID',
      '',
      'THIS FAILURE IS INTENTIONAL.',
      '',
      'It is not a SUT defect.',
      '',
      'It exists solely to demonstrate that the GitHub Actions Newman pipeline correctly becomes red when a test assertion fails.'
    ].join('\n'),
    schema: canonical.info.schema
  },
  event: JSON.parse(JSON.stringify(canonical.event || [])),
  item: [intentionalRequest]
};

const ciEnvironment = JSON.parse(JSON.stringify(canonicalEnvironment));
ciEnvironment.id = 'hw06-ci-environment-template';
ciEnvironment.name = 'HW06 CI Template';
for (const entry of ciEnvironment.values || []) {
  entry.value = entry.key === 'base_url' ? 'http://127.0.0.1:3000' : '';
  entry.enabled = true;
}

const selectionMarkdown = [
  '# HW06 Passing CI Selection',
  '',
  'This is a representative regression sample derived from the canonical collection. It does not replace or revise the authoritative 114-test execution.',
  '',
  '| Test ID | Feature | Origin | Previous Result | Required Setup | CI Reason |',
  '| ------- | ------- | ------ | --------------- | -------------- | --------- |',
  ...selection.map((entry) => `| ${entry.id} | ${entry.feature} | ${entry.origin} | ${entry.previous} | ${entry.setup} | ${entry.reason} |`),
  '',
  `Selected logical testcase units: ${selection.length}`,
  '',
  `Selected setup requests: ${selectedSetupNames.size}`,
  '',
  'Excluded scopes include confirmed defects, canonical blocked tests, SETUP-007-dependent behavior, SETUP-014 ambiguity, and private Admin credential dependencies.',
  ''
].join('\n');

fs.mkdirSync(__dirname, { recursive: true });
fs.writeFileSync(passingPath, `${JSON.stringify(passing, null, 2)}\n`);
fs.writeFileSync(intentionalPath, `${JSON.stringify(intentional, null, 2)}\n`);
fs.writeFileSync(environmentPath, `${JSON.stringify(ciEnvironment, null, 2)}\n`);
fs.writeFileSync(selectionPath, selectionMarkdown);

console.log(JSON.stringify({
  status: 'PASS',
  passingLogicalTests: passingIds,
  passingLogicalTestCount: passingIds.length,
  passingSetupRequests: setupRequests.length,
  passingHttpRequests: passingRequests.length,
  intentionalLogicalTestIds: 0,
  intentionalHttpRequests: 1
}, null, 2));
