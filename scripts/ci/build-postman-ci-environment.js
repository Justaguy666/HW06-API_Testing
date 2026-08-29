const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const templatePath = path.join(root, 'postman/ci/HW06-CI.postman_environment.json');
const studentId = String(process.env.STUDENT_ID || '').trim();
if (!studentId) {
  console.error('STUDENT_ID is required to build the private CI Postman environment');
  process.exit(1);
}

const environment = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
const entry = (environment.values || []).find((value) => value.key === 'student_id');
if (!entry) throw new Error('CI environment template does not define student_id');
entry.value = studentId;
entry.enabled = true;

const outputPath = process.env.CI_POSTMAN_ENV_PATH
  ? path.resolve(process.env.CI_POSTMAN_ENV_PATH)
  : path.join(process.env.RUNNER_TEMP || os.tmpdir(), 'HW06-CI.runtime.postman_environment.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(environment, null, 2)}\n`, { mode: 0o600 });

console.log(JSON.stringify({
  status: 'PASS',
  output: outputPath,
  studentId: 'CONFIGURED_REDACTED'
}));
