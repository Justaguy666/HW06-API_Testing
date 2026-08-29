# DEFECT-001 Reproduction Summary

This evidence package is derived from the preserved Newman triage runs. Authentication tokens and private identifiers are omitted.

| Test | Authenticated context | Operation | Observed status | Result |
| --- | --- | --- | ---: | --- |
| TC-API-047 | Confirmed role `user` (`NON_ADMIN`), token populated | `GET /api/admin/orders` | 200 in 2/2 iterations | Authorization assertion failed in 2/2 iterations |
| TC-API-055 | Confirmed role `user` (`NON_ADMIN`), valid order fixture | `PUT /api/admin/orders/:id/status` | 200 in 1/1 targeted verification | Authorization assertion failed |

Genuine sources:

- `reports/newman/triage/tc-api-047/reproduction-cli.txt`
- `reports/newman/triage/tc-api-047/reproduction-report.json`
- `reports/newman/triage/setup-009/post-fix/verification-cli.txt`
- `reports/newman/triage/setup-009/post-fix/verification-report.json`

