const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const reportDir = path.join(root, 'reports/newman/smoke');
const sensitiveKeys = new Set([
  'student_id', 'user_email', 'user_password', 'user_b_email', 'user_b_password',
  'admin_email', 'admin_password', 'wrong_role_email', 'wrong_role_password',
  'user_token', 'user_b_token', 'admin_token', 'wrong_role_token'
]);

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(reportDir, name), 'utf8'));
}

function headerState(execution) {
  const headers = execution.request?.headers?.members || execution.request?.header || [];
  const header = headers.find((entry) => String(entry.key).toLowerCase() === 'x-student-id');
  return {
    present: Boolean(header),
    valueNonempty: Boolean(header && String(header.value || '').trim())
  };
}

function sanitizeRun(report, label) {
  const executions = (report.run.executions || []).map((execution) => ({
    item: execution.item.name,
    method: execution.request.method,
    url: execution.request.url && execution.request.url.toString(),
    httpStatus: execution.response?.code ?? null,
    responseTimeMs: execution.response?.responseTime ?? null,
    assertions: (execution.assertions || []).map((assertion) => ({
      name: assertion.assertion,
      passed: !assertion.error,
      error: assertion.error ? String(assertion.error.message || assertion.error) : null
    })),
    studentHeader: headerState(execution)
  }));
  const variables = report.environment?.values?.members || report.environment?.values || [];
  return {
    label,
    requestsExecuted: executions.length,
    failedRequests: report.run.stats?.requests?.failed || 0,
    failedAssertions: report.run.stats?.assertions?.failed || 0,
    executions,
    runtimeVariableState: Object.fromEntries(variables.map((entry) => [
      entry.key,
      sensitiveKeys.has(entry.key)
        ? (String(entry.value || '').length ? 'POPULATED' : 'EMPTY')
        : (String(entry.value || '').length ? 'POPULATED' : 'EMPTY')
    ]))
  };
}

const initial = sanitizeRun(readJson('smoke-report.raw.json'), 'INITIAL_RUN');
const finalValidation = sanitizeRun(readJson('final-validation-report.raw.json'), 'FINAL_VALIDATION_RUN');
const rawInitialReport = readJson('smoke-report.raw.json');
const rawEnvironmentValues = rawInitialReport.environment?.values?.members || rawInitialReport.environment?.values || [];
const runtimeStudentId = String(rawEnvironmentValues.find((entry) => entry.key === 'student_id')?.value || '');
const logicalOutcomes = [
  ['TC-API-001', 'FR-02', 'AI_GENERATED', 'PASS', 200, 3, 'Supported successful-login assertions passed.'],
  ['TC-API-003', 'FR-02', 'AI_GENERATED', 'OBSERVED_EXPLORATORY', 401, 1, 'Omitted-email behavior observed without adding an oracle.'],
  ['TC-API-165', 'FR-02', 'HUMAN_ADDED', 'OBSERVED_EXPLORATORY', 401, 1, 'Extreme-length email behavior observed.'],
  ['TC-API-130', 'FR-07', 'AI_GENERATED', 'PASS', 200, 2, 'Authenticated GET Cart transport mechanics passed.'],
  ['TC-API-161', 'FR-07', 'AI_GENERATED', 'OBSERVED_EXPLORATORY', '200, 200', 2, 'POST then GET sequence completed; Cart response changed from empty to populated.'],
  ['TC-API-173', 'FR-07', 'HUMAN_ADDED', 'OBSERVED_EXPLORATORY', 200, 1, 'GET Cart Content-Type observed as JSON.'],
  ['TC-API-046', 'FR-18', 'AI_GENERATED', 'BLOCKED_RUNTIME_PREREQUISITE', 401, 2, 'Admin authentication prerequisite was not established.'],
  ['TC-API-048', 'FR-18', 'AI_GENERATED', 'PASS', 401, 2, 'Supported unauthenticated-denial assertion passed.'],
  ['TC-API-179', 'FR-18', 'HUMAN_ADDED', 'BLOCKED_RUNTIME_PREREQUISITE', 401, 1, 'Admin authentication prerequisite was not established; response is not treated as the intended authenticated observation.']
].map(([testId, feature, origin, result, httpStatusObserved, assertions, notes]) => ({
  testId, feature, origin, result, httpStatusObserved, assertions, notes
}));

const output = {
  reportType: 'CONTROLLED_SMOKE_REDACTED',
  generatedFrom: ['smoke-report.raw.json', 'final-validation-report.raw.json'],
  secretsIncluded: false,
  fullSuiteExecuted: false,
  selectedLogicalTests: 9,
  selectedTestcaseRequests: 10,
  selectedSetupRequests: 5,
  initialRun: initial,
  finalValidationRun: finalValidation,
  headerRuntimeValidation: {
    initialRunPresentAndNonempty: initial.executions.filter((entry) => entry.studentHeader.present && entry.studentHeader.valueNonempty).length,
    initialRunRequests: initial.executions.length,
    finalRunPresentAndNonempty: finalValidation.executions.filter((entry) => entry.studentHeader.present && entry.studentHeader.valueNonempty).length,
    finalRunRequests: finalValidation.executions.length
  },
  logicalOutcomes
};

fs.writeFileSync(path.join(reportDir, 'smoke-report.json'), `${JSON.stringify(output, null, 2)}\n`);

const initialCli = fs.readFileSync(path.join(reportDir, 'smoke-cli.raw.txt'), 'utf8');
const finalCli = fs.readFileSync(path.join(reportDir, 'final-validation-cli.raw.txt'), 'utf8');
const cli = [
  'INITIAL_RUN',
  'Command: npx --yes newman@6.2.2 run postman/runtime/HW06-smoke.postman_collection.json -e postman/runtime/HW06-local.runtime.postman_environment.json --reporters cli,json --reporter-json-export reports/newman/smoke/smoke-report.raw.json --color off',
  '',
  initialCli,
  '',
  'FINAL_VALIDATION_RUN',
  'Command: npx --yes newman@6.2.2 run postman/runtime/HW06-smoke-admin-retry.postman_collection.json -e postman/runtime/HW06-local.runtime.postman_environment.json --reporters cli,json --reporter-json-export reports/newman/smoke/final-validation-report.raw.json --color off',
  '',
  finalCli,
  '',
  'HTML_REPORTER_NOT_AVAILABLE'
].join('\n');
const redactedCli = runtimeStudentId ? cli.split(runtimeStudentId).join('[REDACTED_STUDENT_ID]') : cli;
fs.writeFileSync(path.join(reportDir, 'smoke-cli.txt'), redactedCli);

for (const rawName of [
  'smoke-report.raw.json',
  'final-validation-report.raw.json',
  'smoke-cli.raw.txt',
  'final-validation-cli.raw.txt'
]) {
  const rawPath = path.join(reportDir, rawName);
  if (fs.existsSync(rawPath)) fs.unlinkSync(rawPath);
}

console.log(JSON.stringify({
  initialRequests: initial.executions.length,
  finalValidationRequests: finalValidation.executions.length,
  initialHeadersValid: output.headerRuntimeValidation.initialRunPresentAndNonempty,
  finalHeadersValid: output.headerRuntimeValidation.finalRunPresentAndNonempty
}));
