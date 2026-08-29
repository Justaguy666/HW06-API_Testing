# CI Test Traceability

## Passing regression sample

| Passing CI Test | Canonical Test ID | Feature | Origin | Authoritative Result | CI Role |
| --- | --- | --- | --- | --- | --- |
| TC-API-001 | TC-API-001 | FR-02 | AI_GENERATED | PASS | Supported successful-login assertions |
| TC-API-130 | TC-API-130 | FR-07 | AI_GENERATED | PASS | Authenticated Cart transport contract |
| TC-API-173 | TC-API-173 | FR-07 | HUMAN_ADDED | OBSERVED_EXPLORATORY | Response Content-Type observation |
| TC-API-048 | TC-API-048 | FR-18 | AI_GENERATED | PASS | Unauthenticated Admin-order denial |

All four request units and their scripts are deterministically extracted from `postman/collections/HW06-API-Testing.postman_collection.json`.

## Intentional failure demonstration

| Classification | Logical Test ID | Source Request | Purpose |
| --- | --- | --- | --- |
| CI_DEMO_ONLY | NO_LOGICAL_TC_ID | Canonical public GET products request | Prove that a Newman assertion failure makes the manual workflow red |

The CI-only assertion is not counted as AI_GENERATED, HUMAN_ADDED, a defect reproduction, or a new logical testcase.

