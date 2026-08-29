## Summary

An authenticated normal user with confirmed non-Admin role receives successful access to reproduced Admin order list and status-update operations.

## Severity

HIGH — SECURITY

## Affected Feature / Endpoint

FR-18 — Order Management (Admin)

- `GET /api/admin/orders`
- `PUT /api/admin/orders/:id/status`

## Preconditions

A normal user is registered and authenticated, its returned role is confirmed non-Admin, and a valid order fixture exists for the update variant.

## Steps to Reproduce

1. Authenticate as a normal non-Admin user.
2. Confirm the returned account role is not Admin.
3. Send `GET /api/admin/orders` with that user's token.
4. With a valid discovered order, send `PUT /api/admin/orders/:id/status` using the same non-Admin context.

## Expected Behavior

The non-Admin caller must not obtain successful access to Admin-only order operations. No exact denial status is asserted.

## Actual Behavior

The GET returned HTTP 200 in 2/2 reproductions and the PUT returned HTTP 200 in 1/1 targeted verification. The authorization assertion failed in each reproduced case.

## Reproducibility

GET 2/2; PUT 1/1 targeted verification.

## Impact

Broken role isolation permits unauthorized access to administrative order data and, where reproduced, unauthorized order-state modification.

## Detected By

TC-API-047, TC-API-055; TRIAGE-001.

## Evidence

- `bugs/reports/DEFECT-001-broken-admin-order-access-control.md`
- `bugs/evidence/DEFECT-001/reproduction-summary.md`
- `reports/newman/triage/tc-api-047/reproduction-report.json`
- `reports/newman/triage/setup-009/post-fix/verification-report.json`

## Screenshot

`bugs/evidence/DEFECT-001/DEFECT-001-access-control.png`

## Environment

Local SUT at `http://localhost:3000`; Node.js v22.17.0; Newman 6.2.2; execution date 2026-08-30 (+07:00).

