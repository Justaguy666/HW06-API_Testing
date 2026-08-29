const target = process.env.SUT_READY_URL || 'http://127.0.0.1:3000/api/products';
const timeoutMs = Number(process.env.SUT_READY_TIMEOUT_MS || 60000);
const intervalMs = 500;
const started = Date.now();

async function wait() {
  let lastError = 'no response';
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(target, { signal: AbortSignal.timeout(3000) });
      if (response.status >= 200 && response.status < 500) {
        console.log(JSON.stringify({ status: 'PASS', target, httpStatus: response.status, elapsedMs: Date.now() - started }));
        return;
      }
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error && error.message ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error(`SUT readiness timeout after ${timeoutMs}ms (${lastError})`);
}

wait().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
