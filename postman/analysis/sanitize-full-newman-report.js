const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const runtimeDir = path.join(root, 'postman/runtime');
const outputDir = path.join(root, 'reports/newman/full');
const rawReportPath = path.join(runtimeDir, 'authoritative-report.raw.json');
const rawCliPath = path.join(runtimeDir, 'authoritative-cli.raw.txt');
const exitCodePath = path.join(runtimeDir, 'authoritative-exit-code.txt');
const raw = JSON.parse(fs.readFileSync(rawReportPath, 'utf8'));
const exitCode = Number(fs.readFileSync(exitCodePath, 'utf8').trim());
const environmentValues = raw.environment?.values?.members || raw.environment?.values || [];
const sensitiveKeys = new Set([
  'student_id', 'user_email', 'user_password', 'user_b_email', 'user_b_password',
  'admin_email', 'admin_password', 'wrong_role_email', 'wrong_role_password',
  'user_token', 'user_b_token', 'admin_token', 'wrong_role_token', 'unassociated_email', 'wrong_password'
]);

const descriptionText = (request) => {
  const description = request?.description;
  if (typeof description === 'string') return description;
  return description?.content || '';
};
const field = (description, label) => (description.match(new RegExp(`^${label}: (.+)$`, 'm')) || [])[1] || '';
const requestHeaders = (execution) => execution.request?.headers?.members || execution.request?.header || [];

const executions = (raw.run.executions || []).map((execution, index) => {
  const description = descriptionText(execution.request);
  const parentTestId = field(description, 'Canonical Test ID') || field(description, 'Parent Canonical Test ID') || null;
  const nameSetup = /^\[(SETUP-\d{3})\]/.exec(execution.item.name || '');
  const setupId = nameSetup?.[1] || null;
  const studentHeader = requestHeaders(execution).find((entry) => String(entry.key).toLowerCase() === 'x-student-id');
  return {
    sequence: index + 1,
    itemId: execution.item.id,
    itemName: execution.item.name,
    parentTestId,
    setupId,
    feature: field(description, 'Feature') || (setupId ? 'SETUP' : 'UNKNOWN'),
    origin: field(description, 'Origin') || null,
    executionClass: field(description, 'Execution Class') || null,
    exploratory: field(description, 'Exploratory') === 'YES',
    setupIds: field(description, 'SETUP IDs') || null,
    assertionStrategy: field(description, 'Assertion Strategy') || null,
    method: execution.request?.method || null,
    url: execution.request?.url?.toString?.() || null,
    httpStatus: execution.response?.code ?? null,
    responseTimeMs: execution.response?.responseTime ?? null,
    requestError: execution.requestError ? String(execution.requestError.message || execution.requestError) : null,
    assertions: (execution.assertions || []).map((assertion) => ({
      name: assertion.assertion,
      passed: !assertion.error,
      error: assertion.error ? String(assertion.error.message || assertion.error) : null
    })),
    studentHeader: {
      present: Boolean(studentHeader),
      valueNonempty: Boolean(studentHeader && String(studentHeader.value || '').trim())
    }
  };
});

const sanitized = {
  reportType: 'AUTHORITATIVE_INITIAL_FULL_RUN_REDACTED',
  secretsIncluded: false,
  fullSuiteScope: { logicalPlanned: 114, canonicalBlockedExcluded: 8 },
  newmanExitCode: exitCode,
  stats: raw.run.stats,
  timings: raw.run.timings,
  environmentState: Object.fromEntries(environmentValues.map((entry) => [
    entry.key,
    String(entry.value || '').length ? 'POPULATED' : 'EMPTY'
  ])),
  executions
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'authoritative-report.json'), `${JSON.stringify(sanitized, null, 2)}\n`);

let cli = fs.readFileSync(rawCliPath, 'utf8');
for (const entry of environmentValues) {
  if (!sensitiveKeys.has(entry.key)) continue;
  const value = String(entry.value || '');
  if (value) cli = cli.split(value).join(`[REDACTED_${entry.key.toUpperCase()}]`);
}
cli = cli
  .replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]*/g, '[REDACTED_JWT]')
  .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [REDACTED]');
const command = 'Command: npx --yes newman@6.2.2 run postman/collections/HW06-API-Testing.postman_collection.json -e postman/runtime/HW06-local.runtime.postman_environment.json --reporters cli,json --reporter-json-export postman/runtime/authoritative-report.raw.json --color off';
fs.writeFileSync(path.join(outputDir, 'authoritative-cli.txt'), `AUTHORITATIVE_INITIAL_FULL_RUN\n${command}\nNewman exit code: ${exitCode}\n\n${cli}\nHTML_REPORTER_NOT_AVAILABLE\n`);

console.log(JSON.stringify({
  exitCode,
  requests: executions.length,
  assertions: raw.run.stats.assertions.total,
  assertionFailures: raw.run.stats.assertions.failed,
  missingStudentHeader: executions.filter((entry) => !entry.studentHeader.present).length,
  emptyStudentHeader: executions.filter((entry) => !entry.studentHeader.valueNonempty).length
}));
