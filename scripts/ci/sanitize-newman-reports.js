const fs = require('fs');
const path = require('path');

function argument(name) {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0 || !process.argv[index + 1]) throw new Error(`Missing --${name}`);
  return process.argv[index + 1];
}

const rawJsonPath = path.resolve(argument('raw-json'));
const rawJunitPath = path.resolve(argument('raw-junit'));
const rawCliPath = path.resolve(argument('raw-cli'));
const runtimeEnvironmentPath = path.resolve(argument('runtime-environment'));
const outputDir = path.resolve(argument('output-dir'));
const mode = argument('mode');
const newmanExitCode = Number(argument('newman-exit'));

const raw = JSON.parse(fs.readFileSync(rawJsonPath, 'utf8'));
const runtimeEnvironment = JSON.parse(fs.readFileSync(runtimeEnvironmentPath, 'utf8'));
const sensitiveKey = /(student|password|token|email)/i;
const sensitiveValues = new Set(
  (runtimeEnvironment.values || [])
    .filter((entry) => sensitiveKey.test(String(entry.key || '')) && String(entry.value || ''))
    .map((entry) => String(entry.value))
);
if (process.env.STUDENT_ID) sensitiveValues.add(String(process.env.STUDENT_ID));

function redactText(input) {
  let output = String(input || '');
  for (const value of [...sensitiveValues].sort((a, b) => b.length - a.length)) {
    output = output.split(value).join('[REDACTED]');
  }
  return output
    .replace(/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]*/g, '[REDACTED_JWT]')
    .replace(/Bearer\s+[A-Za-z0-9._~-]+/gi, 'Bearer [REDACTED]')
    .replace(/\b(?:gh[opsu]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,})\b/gi, '[REDACTED_GITHUB_TOKEN]');
}

function requestHeaders(execution) {
  return execution.request?.headers?.members || execution.request?.header || [];
}

const executions = (raw.run?.executions || []).map((execution) => {
  const header = requestHeaders(execution).find((entry) => String(entry.key).toLowerCase() === 'x-student-id');
  const name = String(execution.item?.name || '');
  return {
    itemName: name,
    logicalTestId: /^\[(TC-API-\d{3})\]/.exec(name)?.[1] || null,
    ciDemoOnly: name.includes('CI-DEMO-ONLY'),
    method: execution.request?.method || null,
    url: execution.request?.url?.toString?.() || null,
    httpStatus: execution.response?.code ?? null,
    responseTimeMs: execution.response?.responseTime ?? null,
    requestError: execution.requestError ? redactText(execution.requestError.message || execution.requestError) : null,
    assertions: (execution.assertions || []).map((assertion) => ({
      name: assertion.assertion,
      passed: !assertion.error,
      error: assertion.error ? redactText(assertion.error.message || assertion.error) : null
    })),
    studentHeader: {
      present: Boolean(header),
      valueNonempty: Boolean(header && String(header.value || '').trim()),
      value: '[REDACTED]'
    }
  };
});

const sanitized = {
  reportType: `HW06_CI_${mode}_REDACTED`,
  secretsIncluded: false,
  newmanExitCode,
  stats: raw.run?.stats || null,
  timings: raw.run?.timings || null,
  executions
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'newman-report.json'), `${JSON.stringify(sanitized, null, 2)}\n`);
fs.writeFileSync(path.join(outputDir, 'newman-cli.txt'), `${redactText(fs.readFileSync(rawCliPath, 'utf8'))}\n`);
fs.writeFileSync(path.join(outputDir, 'newman-report.xml'), redactText(fs.readFileSync(rawJunitPath, 'utf8')));

const retained = [
  fs.readFileSync(path.join(outputDir, 'newman-report.json'), 'utf8'),
  fs.readFileSync(path.join(outputDir, 'newman-cli.txt'), 'utf8'),
  fs.readFileSync(path.join(outputDir, 'newman-report.xml'), 'utf8')
].join('\n');
for (const value of sensitiveValues) {
  if (value && retained.includes(value)) throw new Error('Sensitive runtime value remained in retained CI reports');
}
if (/eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]*/.test(retained)) {
  throw new Error('JWT-like value remained in retained CI reports');
}
if (/Bearer\s+(?!\[REDACTED\])[A-Za-z0-9._~-]{8,}/i.test(retained)) {
  throw new Error('Bearer token remained in retained CI reports');
}

console.log(JSON.stringify({
  status: 'PASS',
  mode,
  newmanExitCode,
  requests: raw.run?.stats?.requests?.total ?? executions.length,
  assertions: raw.run?.stats?.assertions?.total ?? 0,
  assertionFailures: raw.run?.stats?.assertions?.failed ?? 0,
  outputDir,
  secretExposure: 0
}));
