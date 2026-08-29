const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const reportPath = path.join(root, 'reports/newman/full/authoritative-report.json');
const collectionPath = path.join(root, 'postman/collections/HW06-API-Testing.postman_collection.json');
const outputDir = path.join(root, 'reports/newman/full');
const evidenceDir = path.join(root, 'evidence/full-run');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

const blockedIds = new Set(['TC-API-092', 'TC-API-093', 'TC-API-118', 'TC-API-121', 'TC-API-127', 'TC-API-128', 'TC-API-164', 'TC-API-181']);
const unitMap = new Map();

function collectDescriptions(item) {
  const values = [];
  if (typeof item.description === 'string') values.push(item.description);
  if (typeof item.request?.description === 'string') values.push(item.request.description);
  for (const child of item.item || []) values.push(...collectDescriptions(child));
  return values;
}

function countRequests(item) {
  let total = item.request ? 1 : 0;
  for (const child of item.item || []) total += countRequests(child);
  return total;
}

function field(text, label) {
  return (text.match(new RegExp(`^${label}: (.+)$`, 'm')) || [])[1] || '';
}

function walkCollection(items, ancestors = []) {
  for (const item of items || []) {
    const match = /^\[(TC-API-\d{3})\]/.exec(item.name || '');
    if (match) {
      const description = collectDescriptions(item).join('\n');
      unitMap.set(match[1], {
        id: match[1],
        feature: field(description, 'Feature') || (ancestors[0] || '').match(/FR-\d{2}/)?.[0] || 'UNKNOWN',
        origin: field(description, 'Origin'),
        executionClass: field(description, 'Execution Class'),
        exploratory: field(description, 'Exploratory') === 'YES',
        setupIds: field(description, 'SETUP IDs'),
        assertionStrategy: field(description, 'Assertion Strategy'),
        expectedRequestCount: countRequests(item),
        path: [...ancestors, item.name].join(' / ')
      });
    }
    walkCollection(item.item, [...ancestors, item.name]);
  }
}
walkCollection(collection.item);

const executableIds = [...unitMap.keys()].filter((id) => !blockedIds.has(id)).sort();
if (unitMap.size !== 114 || executableIds.length !== 114) {
  throw new Error(`Expected 114 executable units in collection, found units=${unitMap.size}, executable=${executableIds.length}`);
}

const setupExecutions = report.executions.filter((entry) => entry.setupId);
const testcaseExecutions = report.executions.filter((entry) => entry.parentTestId);
const executionByTest = new Map(executableIds.map((id) => [id, []]));
for (const execution of testcaseExecutions) {
  if (!executionByTest.has(execution.parentTestId)) throw new Error(`Unknown executed testcase: ${execution.parentTestId}`);
  executionByTest.get(execution.parentTestId).push(execution);
}

const failedSetupIds = new Set();
const failedSetupRequests = [];
if (report.environmentState.missing_product_id !== 'POPULATED') {
  failedSetupIds.add('SETUP-007');
  failedSetupRequests.push('[SETUP-007] Verify Missing Product Candidate');
}
if (report.environmentState.existing_order_id !== 'POPULATED') {
  for (const id of ['SETUP-009', 'SETUP-011', 'SETUP-014']) failedSetupIds.add(id);
  failedSetupRequests.push('[SETUP-009] Discover Existing Orders');
}

const setupRefs = (text) => [...text.matchAll(/SETUP-\d{3}/g)].map((match) => match[0]);
const logicalResults = executableIds.map((id) => {
  const unit = unitMap.get(id);
  const executions = executionByTest.get(id);
  const assertionFailures = executions.flatMap((entry) => entry.assertions.filter((assertion) => !assertion.passed));
  const requestErrors = executions.filter((entry) => entry.requestError);
  const unavailableSetups = setupRefs(unit.setupIds).filter((setupId) => failedSetupIds.has(setupId));
  const statuses = executions.map((entry) => entry.httpStatus).filter((value) => value !== null);
  const has5xx = statuses.some((status) => status >= 500 && status <= 599);
  let logicalResult;
  let primary;
  if (unavailableSetups.length) {
    logicalResult = 'FAIL_SETUP';
    primary = `Unavailable runtime setup: ${unavailableSetups.join(', ')}`;
  } else if (assertionFailures.length) {
    logicalResult = 'FAIL_ASSERTION';
    primary = assertionFailures.map((failure) => `${failure.name}: ${failure.error}`).join('; ');
  } else if (requestErrors.length) {
    logicalResult = 'FAIL_REQUEST';
    primary = requestErrors.map((entry) => entry.requestError).join('; ');
  } else if (executions.length < unit.expectedRequestCount) {
    logicalResult = 'INCOMPLETE_SEQUENCE';
    primary = `Executed ${executions.length}/${unit.expectedRequestCount} required request steps`;
  } else if (unit.exploratory) {
    logicalResult = 'OBSERVED_EXPLORATORY';
    primary = `Observed HTTP ${[...new Set(statuses)].join(', ')}${has5xx ? '; HTTP 5xx triage signal' : ''}`;
  } else {
    logicalResult = 'PASS';
    primary = `Required requests/assertions completed; observed HTTP ${[...new Set(statuses)].join(', ')}`;
  }
  return {
    ...unit,
    logicalResult,
    requestCount: executions.length,
    assertionFailures: assertionFailures.length,
    primary,
    statuses,
    has5xx,
    unavailableSetups
  };
});

const resultClasses = ['PASS', 'OBSERVED_EXPLORATORY', 'FAIL_ASSERTION', 'FAIL_REQUEST', 'FAIL_SETUP', 'INCOMPLETE_SEQUENCE', 'BLOCKED_RUNTIME_PREREQUISITE'];
const countByClass = Object.fromEntries(resultClasses.map((name) => [name, logicalResults.filter((row) => row.logicalResult === name).length]));
const successful = countByClass.PASS + countByClass.OBSERVED_EXPLORATORY;

const featureSummary = {};
for (const feature of ['FR-02', 'FR-07', 'FR-18']) {
  const rows = logicalResults.filter((row) => row.feature === feature);
  featureSummary[feature] = {
    planned: rows.length,
    pass: rows.filter((row) => row.logicalResult === 'PASS').length,
    observed: rows.filter((row) => row.logicalResult === 'OBSERVED_EXPLORATORY').length,
    assertionFail: rows.filter((row) => row.logicalResult === 'FAIL_ASSERTION').length,
    requestFail: rows.filter((row) => row.logicalResult === 'FAIL_REQUEST').length,
    setupFail: rows.filter((row) => row.logicalResult === 'FAIL_SETUP').length,
    incomplete: rows.filter((row) => row.logicalResult === 'INCOMPLETE_SEQUENCE').length
  };
}

const originSummary = {};
for (const origin of ['AI_GENERATED', 'HUMAN_ADDED']) {
  const rows = logicalResults.filter((row) => row.origin === origin);
  originSummary[origin] = {
    planned: rows.length,
    successfulOrObserved: rows.filter((row) => ['PASS', 'OBSERVED_EXPLORATORY'].includes(row.logicalResult)).length,
    failed: rows.filter((row) => !['PASS', 'OBSERVED_EXPLORATORY'].includes(row.logicalResult)).length
  };
}

const hardOracleRows = logicalResults.filter((row) => !row.exploratory && row.logicalResult !== 'FAIL_SETUP');
const hardOraclePassing = hardOracleRows.filter((row) => row.logicalResult === 'PASS').length;

const httpDistribution = {};
for (const feature of ['FR-02', 'FR-07', 'FR-18']) {
  const executions = testcaseExecutions.filter((entry) => entry.feature === feature);
  httpDistribution[feature] = {
    success2xx: executions.filter((entry) => entry.httpStatus >= 200 && entry.httpStatus <= 299).length,
    client4xx: executions.filter((entry) => entry.httpStatus >= 400 && entry.httpStatus <= 499).length,
    server5xx: executions.filter((entry) => entry.httpStatus >= 500 && entry.httpStatus <= 599).length,
    networkOther: executions.filter((entry) => entry.httpStatus === null || entry.httpStatus < 200 || entry.httpStatus >= 600 || (entry.httpStatus >= 300 && entry.httpStatus <= 399)).length
  };
}

const blockedExecuted = report.executions.filter((entry) => blockedIds.has(entry.parentTestId));
const missingHeaders = report.executions.filter((entry) => !entry.studentHeader.present);
const emptyHeaders = report.executions.filter((entry) => !entry.studentHeader.valueNonempty);

const requestLines = [
  '# Authoritative Request-Level Results',
  '',
  '| Request | Parent Test ID | Feature | HTTP Status | Newman Error | Assertion Failures | Execution Time |',
  '| ------- | -------------- | ------- | ----------: | ------------ | -----------------: | -------------: |'
];
for (const entry of report.executions) {
  const failures = entry.assertions.filter((assertion) => !assertion.passed).length;
  requestLines.push(`| ${entry.itemName.replace(/\|/g, '\\|')} | ${entry.parentTestId || entry.setupId || '—'} | ${entry.feature} | ${entry.httpStatus ?? '—'} | ${(entry.requestError || '—').replace(/\|/g, '\\|')} | ${failures} | ${entry.responseTimeMs ?? '—'} ms |`);
}
fs.writeFileSync(path.join(outputDir, 'request-level-results.md'), `${requestLines.join('\n')}\n`);

const logicalLines = [
  '# Authoritative Logical-Test Results',
  '',
  `Exactly ${logicalResults.length} executable logical testcase units are represented.`,
  '',
  '| Test ID | Feature | Origin | Execution Class | Logical Result | Request Count | Assertion Failures | Primary Observation / Failure |',
  '| ------- | ------- | ------ | --------------- | -------------- | ------------: | -----------------: | ----------------------------- |'
];
for (const row of logicalResults) {
  logicalLines.push(`| ${row.id} | ${row.feature} | ${row.origin} | ${row.executionClass} | ${row.logicalResult} | ${row.requestCount} | ${row.assertionFailures} | ${row.primary.replace(/\|/g, '\\|')} |`);
}
fs.writeFileSync(path.join(outputDir, 'logical-test-results.md'), `${logicalLines.join('\n')}\n`);

const candidates = [];
for (const row of logicalResults.filter((entry) => !['PASS', 'OBSERVED_EXPLORATORY'].includes(entry.logicalResult))) {
  candidates.push({
    testId: row.id,
    symptom: row.primary,
    resultClass: row.logicalResult,
    category: row.logicalResult === 'FAIL_ASSERTION' ? 'SUT_BEHAVIOR' : row.logicalResult === 'FAIL_SETUP' ? 'SETUP_STATE' : 'UNKNOWN'
  });
}
for (const row of logicalResults.filter((entry) => entry.has5xx && ['PASS', 'OBSERVED_EXPLORATORY'].includes(entry.logicalResult))) {
  candidates.push({
    testId: row.id,
    symptom: `HTTP 5xx observed during ${row.feature} execution`,
    resultClass: row.logicalResult,
    category: 'SUT_BEHAVIOR'
  });
}

const candidateLines = [
  '# Failure Candidate Register',
  '',
  'These entries require Prompt 027 triage and are not confirmed bugs.',
  '',
  '| Candidate ID | Test ID | Symptom | Result Class | Potential Category | Needs Prompt 027 Triage? |',
  '| ------------ | ------- | ------- | ------------ | ------------------ | ------------------------ |'
];
candidates.forEach((candidate, index) => {
  candidateLines.push(`| FC-${String(index + 1).padStart(3, '0')} | ${candidate.testId} | ${candidate.symptom.replace(/\|/g, '\\|')} | ${candidate.resultClass} | ${candidate.category} | YES |`);
});
candidateLines.push(`| DOCUMENTATION_CANDIDATE | N/A | Conflicting Admin credentials in setup_guide.md and README.md | N/A | DOCUMENTATION | YES |`);
fs.mkdirSync(evidenceDir, { recursive: true });
fs.writeFileSync(path.join(evidenceDir, 'failure-candidates.md'), `${candidateLines.join('\n')}\n`);

const summary = {
  newmanExitCode: report.newmanExitCode,
  logicalPlanned: 114,
  logicalAccounted: logicalResults.length,
  logicalResults: countByClass,
  successfulOrObserved: successful,
  executionSuccessRate: Number(((successful / 114) * 100).toFixed(2)),
  raw: {
    iterations: report.stats.iterations.total,
    requests: report.stats.requests.total,
    requestFailures: report.stats.requests.failed,
    testScripts: report.stats.testScripts.total,
    assertions: report.stats.assertions.total,
    assertionFailures: report.stats.assertions.failed,
    skippedRequests: report.stats.requests.pending,
    durationMs: report.timings.completed - report.timings.started
  },
  setup: {
    requests: setupExecutions.length,
    failures: failedSetupRequests.length,
    successRate: Number((((setupExecutions.length - failedSetupRequests.length) / setupExecutions.length) * 100).toFixed(2)),
    failedRequests: failedSetupRequests
  },
  featureSummary,
  originSummary,
  hardOracle: {
    executed: hardOracleRows.length,
    passed: hardOraclePassing,
    passRate: hardOracleRows.length ? Number(((hardOraclePassing / hardOracleRows.length) * 100).toFixed(2)) : 0
  },
  httpDistribution,
  http5xxExecutions: testcaseExecutions.filter((entry) => entry.httpStatus >= 500 && entry.httpStatus <= 599).length,
  http5xxLogicalTests: logicalResults.filter((row) => row.has5xx).map((row) => row.id),
  blockedExecuted: blockedExecuted.length,
  missingStudentHeaders: missingHeaders.length,
  emptyStudentHeaders: emptyHeaders.length,
  failureCandidates: candidates.length,
  documentationCandidates: 1
};
fs.writeFileSync(path.join(outputDir, 'analysis-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
