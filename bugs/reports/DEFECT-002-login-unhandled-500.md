# DEFECT-002 — Login endpoint returns unhandled HTTP 500 when JSON body is unavailable

**Defect ID:** DEFECT-002  
**Type:** ROBUSTNESS  
**Severity:** MEDIUM  
**Status:** CONFIRMED  
**Affected Feature:** FR-02 — Login and Account Lockout  
**Affected Endpoint:** `POST /api/login`  
**Detected By Test IDs:** TC-API-011, TC-API-078

## Environment

- Local SUT
- Backend base URL: `http://localhost:3000`
- Node.js: v22.17.0
- Newman: 6.2.2 through `npx`
- Execution date: 2026-08-30 (+07:00)

## Preconditions

The local API is reachable. No authenticated context is required.

## Minimal Reproduction Steps

Variant A — non-JSON body:

1. Send `POST /api/login` with `Content-Type: text/plain` and the TC-API-011 raw non-JSON representation.
2. Observe HTTP 500.

Variant B — absent body:

1. Send `POST /api/login` with no request body as TC-API-078.
2. Observe HTTP 500.

## Expected Behavior

The endpoint should handle an unavailable or non-JSON login body without terminating the request through an unhandled internal server exception. No exact 400/422 response status is asserted.

## Actual Behavior

- TC-API-011: text/plain non-JSON input returned HTTP 500 in 2/2 iterations.
- TC-API-078: an absent body returned HTTP 500 in 2/2 iterations.
- The responses were HTML internal-error pages; sanitized triage evidence identifies the same unavailable-body `TypeError` root condition.

## Reproducibility

REPRODUCED — TC-API-011 2/2; TC-API-078 2/2.

## Impact

Simple unsupported or absent login bodies trigger internal exception handling and expose implementation error details, reducing robustness and potentially aiding reconnaissance.

## Specification / Documentation Evidence

`eshop-sut/api_specification.md` documents `POST /api/login` with a JSON credential body but defines no exact invalid-input status. The oracle is limited to avoiding an unhandled internal server failure.

## Runtime Evidence

- `bugs/evidence/DEFECT-002/reproduction-summary.md`
- `bugs/evidence/DEFECT-002/tc-api-011-redacted-excerpt.txt`
- `bugs/evidence/DEFECT-002/tc-api-078-redacted-excerpt.txt`
- `reports/newman/triage/tc-api-011/reproduction-report.json`
- `reports/newman/triage/tc-api-078/reproduction-report.json`

## Screenshot Evidence

`bugs/evidence/DEFECT-002/DEFECT-002-login-500.png` — genuine editor capture of the sanitized Newman evidence excerpt; secret-audited.

`SCREENSHOT_CLASSIFICATION: REAL_SCREENSHOT_AVAILABLE`  
`SCREENSHOT_STATUS: COMPLETE`

## Security / Privacy Notes

Passwords, credentials, private identifiers, tokens, Authorization headers, and sensitive local stack paths are omitted.

## Related Testcases

TC-API-011, TC-API-078

## Related Triage IDs

TRIAGE-002, TRIAGE-003

## GitHub Issue

#2 — https://github.com/Justaguy666/HW06-API_Testing/issues/2

## AI Assistance Disclosure

AI assisted with structuring and formatting the report. The defect itself was identified through the recorded student test execution and human-reviewed triage evidence.
