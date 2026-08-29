const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const collectionPath = path.join(root, 'postman/collections/HW06-API-Testing.postman_collection.json');
const environmentPath = path.join(root, 'postman/environments/HW06-local.postman_environment.json');
const runtimeDir = path.join(root, 'postman/runtime');
const fullSelectedIds = new Set([
  'TC-API-001', 'TC-API-003', 'TC-API-165',
  'TC-API-130', 'TC-API-161', 'TC-API-173',
  'TC-API-046', 'TC-API-048', 'TC-API-179'
]);
const fullSelectedSetupNames = new Set([
  '[SETUP-002] Register Primary User',
  '[SETUP-003] Login Primary User',
  '[SETUP-006] Discover Existing Product',
  '[SETUP-006] Confirm Existing Product',
  '[SETUP-005] Login Admin'
]);
const adminRetry = process.env.HW06_SMOKE_MODE === 'admin-retry';
const selectedIds = adminRetry ? new Set(['TC-API-046', 'TC-API-179']) : fullSelectedIds;
const selectedSetupNames = adminRetry ? new Set(['[SETUP-005] Login Admin']) : fullSelectedSetupNames;

const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
const environment = JSON.parse(fs.readFileSync(environmentPath, 'utf8'));

function filterItems(items, setup = false) {
  const output = [];
  for (const item of items || []) {
    if (item.request) {
      const idMatch = /^\[(TC-API-\d{3})\]/.exec(item.name || '');
      if ((setup && selectedSetupNames.has(item.name)) || (!setup && idMatch && selectedIds.has(idMatch[1]))) {
        output.push(item);
      }
      continue;
    }
    const idMatch = /^\[(TC-API-\d{3})\]/.exec(item.name || '');
    if (!setup && idMatch && selectedIds.has(idMatch[1])) {
      output.push(item);
      continue;
    }
    const children = filterItems(item.item, setup);
    if (children.length) output.push({ ...item, item: children });
  }
  return output;
}

collection.info = {
  ...collection.info,
  name: 'HW06 API Testing — Controlled Smoke',
  description: `${collection.info.description || ''}\n\nDerived smoke scope: 9 logical testcase units; 5 supporting setup requests.`
};
collection.item = collection.item.flatMap((item) => {
  const setup = item.name === '00 - Setup';
  const children = filterItems(item.item, setup);
  return children.length ? [{ ...item, item: children }] : [];
});

const values = new Map(environment.values.map((entry) => [entry.key, entry]));
const setValue = (key, value) => {
  if (!values.has(key)) throw new Error(`Unknown environment variable: ${key}`);
  values.get(key).value = value;
  values.get(key).enabled = true;
};
if (!process.env.HW06_STUDENT_ID) throw new Error('HW06_STUDENT_ID is required');
setValue('base_url', 'http://localhost:3000');
setValue('student_id', process.env.HW06_STUDENT_ID);
setValue('admin_email', process.env.HW06_ADMIN_EMAIL || '');
setValue('admin_password', process.env.HW06_ADMIN_PASSWORD || '');

fs.mkdirSync(runtimeDir, { recursive: true });
const collectionFilename = adminRetry ? 'HW06-smoke-admin-retry.postman_collection.json' : 'HW06-smoke.postman_collection.json';
fs.writeFileSync(path.join(runtimeDir, collectionFilename), `${JSON.stringify(collection, null, 2)}\n`);
fs.writeFileSync(path.join(runtimeDir, 'HW06-local.runtime.postman_environment.json'), `${JSON.stringify(environment, null, 2)}\n`);

let requestCount = 0;
let setupCount = 0;
let unitCount = 0;
function count(items, inSetup = false) {
  for (const item of items || []) {
    const setup = inSetup || item.name === '00 - Setup';
    if (/^\[TC-API-\d{3}\]/.test(item.name || '')) unitCount += 1;
    if (item.request) {
      requestCount += 1;
      if (setup) setupCount += 1;
    }
    count(item.item, setup);
  }
}
count(collection.item);
const expected = adminRetry
  ? { unitCount: 2, requestCount: 3, setupCount: 1 }
  : { unitCount: 9, requestCount: 15, setupCount: 5 };
if (unitCount !== expected.unitCount || requestCount !== expected.requestCount || setupCount !== expected.setupCount) {
  throw new Error(`Unexpected smoke scope: units=${unitCount}, requests=${requestCount}, setup=${setupCount}`);
}
console.log(JSON.stringify({ unitCount, requestCount, setupCount, testcaseRequests: requestCount - setupCount }));
