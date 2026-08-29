# DEFECT-001 — Authenticated non-Admin user can access Admin order operations

**Defect ID:** DEFECT-001  
**Type:** SECURITY  
**Severity:** HIGH  
**Status:** CONFIRMED  
**Affected Feature:** FR-18 — Order Management (Admin)  
**Affected Endpoints:** `GET /api/admin/orders`; `PUT /api/admin/orders/:id/status`  
**Detected By Test IDs:** TC-API-047, TC-API-055

## Environment

- Local SUT
- Backend base URL: `http://localhost:3000`
- Node.js: v22.17.0
- Newman: 6.2.2 through `npx`
- Execution date: 2026-08-30 (+07:00)

## Preconditions

A normal user is registered and authenticated. The returned role is confirmed as `user` and therefore non-Admin. A valid order is provisioned through documented APIs for the update variant. Tokens are not retained in this report.

## Minimal Reproduction Steps

1. Authenticate as a normal non-Admin user.
2. Confirm the returned account role is not Admin using the existing fixture evidence.
3. Send `GET /api/admin/orders` with that user's token.
4. Observe HTTP 200 and the failed authorization assertion.
5. With a valid discovered order, send `PUT /api/admin/orders/:id/status` with the same non-Admin context.
6. Observe HTTP 200 and the failed authorization assertion.

## Expected Behavior

An authenticated non-Admin user must not be authorized to perform Admin-only order operations. The specification does not support asserting one exact denial status here.

## Actual Behavior

- TC-API-047: the confirmed non-Admin caller received HTTP 200 for `GET /api/admin/orders` in 2/2 iterations; the authorization assertion failed twice.
- TC-API-055: the confirmed non-Admin caller received HTTP 200 for a valid `PUT /api/admin/orders/:id/status` request in 1/1 targeted verification; the authorization assertion failed.

## Reproducibility

REPRODUCED — GET 2/2; PUT 1/1 targeted verification.

## Impact

A normal authenticated user can cross the intended role boundary, read system-wide administrative order data, and modify order state where reproduced. This breaks role isolation and affects confidentiality and integrity. No broader privilege escalation is claimed.

## Specification / Documentation Evidence

`eshop-sut/api_specification.md` section 6 states that `/api/admin/*` APIs require a Bearer token and an Admin account. `eshop-sut/README.md` lines 176–180 additionally require `role = admin` in the token.

## Runtime Evidence

- `bugs/evidence/DEFECT-001/reproduction-summary.md`
- `bugs/evidence/DEFECT-001/tc-api-047-redacted-excerpt.txt`
- `bugs/evidence/DEFECT-001/tc-api-055-redacted-excerpt.txt`
- `reports/newman/triage/tc-api-047/reproduction-report.json`
- `reports/newman/triage/setup-009/post-fix/verification-report.json`

## Screenshot Evidence

`bugs/evidence/DEFECT-001/DEFECT-001-access-control.png` — genuine editor capture of the sanitized Newman evidence excerpt; secret-audited.

`SCREENSHOT_CLASSIFICATION: REAL_SCREENSHOT_AVAILABLE`  
`SCREENSHOT_STATUS: COMPLETE`

## Security / Privacy Notes

Only the approved Admin-order scenarios were reproduced. Tokens, Authorization headers, passwords, private identifiers, and response records are omitted.

## Related Testcases

TC-API-047, TC-API-055

## Related Triage IDs

TRIAGE-001

## GitHub Issue

#1 — https://github.com/Justaguy666/HW06-API_Testing/issues/1

## AI Assistance Disclosure

AI assisted with structuring and formatting the report. The defect itself was identified through the recorded student test execution and human-reviewed triage evidence.
