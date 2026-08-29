# HW06 Passing CI Selection

This is a representative regression sample derived from the canonical collection. It does not replace or revise the authoritative 114-test execution.

| Test ID | Feature | Origin | Previous Result | Required Setup | CI Reason |
| ------- | ------- | ------ | --------------- | -------------- | --------- |
| TC-API-001 | FR-02 | AI_GENERATED | PASS | SETUP-002 | Supported successful-login assertions passed in the authoritative run. |
| TC-API-130 | FR-07 | AI_GENERATED | PASS | SETUP-002, SETUP-003 | Stable authenticated GET Cart transport contract. |
| TC-API-173 | FR-07 | HUMAN_ADDED | OBSERVED_EXPLORATORY | SETUP-002, SETUP-003 | Human-added Content-Type observation with a measurable response-object check. |
| TC-API-048 | FR-18 | AI_GENERATED | PASS | SETUP-001 only | Admin-order authorization denial without private Admin credentials. |

Selected logical testcase units: 4

Selected setup requests: 2

Excluded scopes include confirmed defects, canonical blocked tests, SETUP-007-dependent behavior, SETUP-014 ambiguity, and private Admin credential dependencies.
