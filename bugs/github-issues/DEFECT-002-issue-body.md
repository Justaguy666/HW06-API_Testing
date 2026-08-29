## Summary

`POST /api/login` returns an unhandled HTTP 500 when its expected JSON request body is unavailable, both for a text/plain representation and for an absent body.

## Severity

MEDIUM — ROBUSTNESS

## Affected Feature / Endpoint

FR-02 — Login and Account Lockout; `POST /api/login`.

## Preconditions

The local API is reachable. No authenticated context is required.

## Steps to Reproduce

1. Variant A: send the TC-API-011 `POST /api/login` request with `Content-Type: text/plain` and a raw non-JSON body.
2. Observe HTTP 500.
3. Variant B: send the TC-API-078 `POST /api/login` request with no request body.
4. Observe HTTP 500.

## Expected Behavior

The endpoint should handle the unavailable/non-JSON body without terminating through an unhandled internal server exception. No exact 400/422 status is asserted.

## Actual Behavior

Both variants return HTTP 500 with an HTML internal-error response. Sanitized triage evidence identifies the same unavailable-body `TypeError` root condition.

## Reproducibility

TC-API-011 2/2; TC-API-078 2/2.

## Impact

Simple unsupported or absent login bodies trigger an internal exception and disclose implementation error detail, reducing endpoint robustness.

## Detected By

TC-API-011, TC-API-078; TRIAGE-002, TRIAGE-003.

## Evidence

- `bugs/reports/DEFECT-002-login-unhandled-500.md`
- `bugs/evidence/DEFECT-002/reproduction-summary.md`
- `reports/newman/triage/tc-api-011/reproduction-report.json`
- `reports/newman/triage/tc-api-078/reproduction-report.json`

## Screenshot

`bugs/evidence/DEFECT-002/DEFECT-002-login-500.png`

## Environment

Local SUT at `http://localhost:3000`; Node.js v22.17.0; Newman 6.2.2; execution date 2026-08-30 (+07:00).

