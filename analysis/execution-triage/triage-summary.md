# Newman Execution Triage Summary

## 1. Authoritative baseline

Prompt 026 remains immutable: 114 executable logical tests were accounted, with 10 PASS, 80 OBSERVED_EXPLORATORY, 1 FAIL_ASSERTION, and 23 FAIL_SETUP. The authoritative report, CLI, logical aggregation, and historical execution rate were not overwritten.

## 2. Candidate grouping

| Root Candidate | Direct Cause | Dependent Tests | Candidate Count |
| -------------- | ------------ | --------------- | --------------: |
| TRIAGE-001 | Non-Admin token received HTTP 200 from Admin order list | TC-API-047 | 1 |
| TRIAGE-002 | Login with non-JSON media type produced HTTP 500 | TC-API-011 | 1 |
| TRIAGE-003 | Login with absent body produced HTTP 500 | TC-API-078 | 1 |
| TRIAGE-004 | SETUP-009/011 never provisioned documented order fixtures before discovery | TC-API-055–057, TC-API-061–066, TC-API-117, TC-API-122–123, TC-API-129, TC-API-180 | 14 |
| TRIAGE-005 | SETUP-007 could not establish a specification-supported missing-product oracle | TC-API-155 | 1 |
| TRIAGE-007 | SETUP-014 guaranteed transition/reset contract unavailable | TC-API-050–054, TC-API-124–126 | 8 |
| TRIAGE-006 | Conflicting Admin credential documentation | Documentation setup path | 1 documentation candidate |

The six runtime groups partition all 26 authoritative runtime candidates. TRIAGE-006 accounts for the separate documentation candidate.

Dependency attribution:

```text
SETUP-009 provisioning gap
   ↓
SETUP-011 multiple-order context
   ↓
14 directly setup-blocked tests

SETUP-009 existing-order context
   ↓
SETUP-014 still lacks an authoritative transition/reset rule
   ↓
8 specification-ambiguous tests
```

## 3. Targeted reproduction

- TC-API-047: two iterations; wrong-role registration/login succeeded twice, authenticated roles were `user`, tokens were populated, and Admin list returned HTTP 200 twice. Assertion failed twice.
- TC-API-011: two isolated iterations, both HTTP 500 with the same unhandled missing-body TypeError.
- TC-API-078: two isolated iterations, both HTTP 500 with the same unhandled missing-body TypeError.
- SETUP-009 documented-flow diagnostic: register/login → product discovery → Cart add → checkout → user history → Admin discovery all returned 2xx; an order ID and current state were captured.
- Post-fix verification: two user-attributable orders were created and discovered. TC-API-117 passed, TC-API-180 observed a valid response, and TC-API-055 exposed the same access-control defect on the Admin update endpoint.

No full-suite rerun was performed.

## 4. Root-cause results

| Triage ID | Final Classification | Reproducibility | Result |
| --- | --- | --- | --- |
| TRIAGE-001 | CONFIRMED_SUT_DEFECT | REPRODUCED | Broken access control on Admin order list/update |
| TRIAGE-002 | CONFIRMED_SUT_DEFECT | REPRODUCED | Shared unhandled login-body exception |
| TRIAGE-003 | CONFIRMED_SUT_DEFECT | REPRODUCED | Shared unhandled login-body exception |
| TRIAGE-004 | POSTMAN_IMPLEMENTATION_DEFECT | REPRODUCED | Fixed by TRIAGE-FIX-001 |
| TRIAGE-005 | TEST_DATA_SETUP_LIMITATION | CONDITIONALLY_REPRODUCED | Missing-product absence contract unavailable |
| TRIAGE-006 | CONFIRMED_DOCUMENTATION_DEFECT | REPRODUCED | Admin credential sources conflict |
| TRIAGE-007 | SPECIFICATION_AMBIGUITY | NOT_APPLICABLE | Transition/reset contract unavailable |

## 5. Confirmed defects

- DEFECT-001 — HIGH SECURITY: authenticated non-Admin users can list and update system-wide orders.
- DEFECT-002 — MEDIUM ROBUSTNESS: POST `/api/login` returns an unhandled HTTP 500 when the JSON body is unavailable; TC-API-011 and TC-API-078 share this root.
- DEFECT-003 — LOW DOCUMENTATION: setup guide and README provide conflicting Admin credentials.

## 6. Non-defect candidates

TRIAGE-004 is a fixed Postman harness defect, TRIAGE-005 is a test-data/setup limitation, and TRIAGE-007 is a specification ambiguity. None is reported as a SUT defect.

## 7. Setup limitations

SETUP-007 remains limited because the product API returns HTTP 200 with an empty object for the candidate while the specification defines no missing-resource response or deterministic absence operation. TC-API-155 remains setup-limited.

## 8. Postman defects/fixes

TRIAGE-FIX-001 added two documented user → Cart → checkout fixture flows before Admin order discovery. The fix populates `existing_order_id`, `second_order_id`, and `current_order_status` and changes no logical semantics.

Static collection counts after the fix: 114 testcase units, 152 HTTP request definitions, 15 setup requests, and 137 testcase-step requests. Static validator: PASS.

## 9. Documentation defect

The same Admin identity is documented with different passwords in `setup_guide.md` and `README.md`. Boolean seed comparison and legitimate login confirm only the README-aligned fixture. DEFECT-003 is ready for reporting without exposing either password.

## 10. Final affected-test mapping

| Historical Run Result | Tests | Triage Interpretation |
| --- | --- | --- |
| FAIL_ASSERTION | TC-API-047 | CONFIRMED_SUT_DEFECT — DEFECT-001 |
| OBSERVED_EXPLORATORY with HTTP 500 | TC-API-011, TC-API-078 | CONFIRMED_SUT_DEFECT — DEFECT-002 |
| FAIL_SETUP | TC-API-055–057, TC-API-061–066, TC-API-117, TC-API-122–123, TC-API-129, TC-API-180 | POSTMAN_IMPLEMENTATION_DEFECT — TRIAGE-FIX-001 applied; 14 no longer setup-blocked |
| Targeted post-fix FAIL_ASSERTION | TC-API-055 | CONFIRMED_SUT_DEFECT — DEFECT-001; historical full-run result remains FAIL_SETUP |
| FAIL_SETUP | TC-API-155 | TEST_DATA_SETUP_LIMITATION |
| FAIL_SETUP | TC-API-050–054, TC-API-124–126 | SPECIFICATION_AMBIGUITY |
| Documentation candidate | Local Admin setup | CONFIRMED_DOCUMENTATION_DEFECT — DEFECT-003 |

Coverage interpretation:

- Canonical blocked: 8.
- Authoritative FAIL_SETUP: 23.
- Setup failures resolved by harness fix: 14.
- Setup-limited after triage: 1.
- Remaining specification-ambiguous setup cases: 8.
- All 23 historical FAIL_SETUP results are explained by root triage.

## 11. Bug-reporting readiness

All 26 runtime candidates and the documentation candidate are accounted. Confirmed defects have minimal reproduction, severity/type, contract evidence, redacted reports, and no unresolved Postman defect masquerading as a SUT bug.

```text
READY_FOR_BUG_REPORTING
```
