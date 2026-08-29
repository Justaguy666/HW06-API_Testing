# Controlled Smoke Selection

The smoke scope contains nine logical testcase units and excludes every blocked testcase. The derived runtime collection is generated mechanically from the canonical collection; testcase scripts and semantics are not rewritten.

| Test ID | Feature | Origin | Execution Class | Why Selected | Required Setup |
| ------- | ------- | ------ | --------------- | ------------ | -------------- |
| TC-API-001 | FR-02 | AI_GENERATED | EXECUTABLE_WITH_RUNTIME_SETUP | Representative successful login with a supported hard status oracle | SETUP-001, SETUP-002 |
| TC-API-003 | FR-02 | AI_GENERATED | EXECUTABLE_EXPLORATORY | Small malformed-input exploratory request and observation logging | SETUP-001 |
| TC-API-165 | FR-02 | HUMAN_ADDED | EXECUTABLE_EXPLORATORY | Confirms HUMAN_ADDED execution and generated extreme-length input | SETUP-001 |
| TC-API-130 | FR-07 | AI_GENERATED | EXECUTABLE_WITH_RUNTIME_SETUP | Representative authenticated GET Cart request | SETUP-001–003 |
| TC-API-161 | FR-07 | AI_GENERATED | EXECUTABLE_WITH_RUNTIME_SETUP | Low-volume POST-then-GET chain validates mutation and sequence mechanics | SETUP-008 |
| TC-API-173 | FR-07 | HUMAN_ADDED | EXECUTABLE_EXPLORATORY | Confirms HUMAN_ADDED Content-Type observation for GET Cart | SETUP-001–003 |
| TC-API-046 | FR-18 | AI_GENERATED | EXECUTABLE_WITH_RUNTIME_SETUP | Representative authenticated Admin order-list request | SETUP-001, SETUP-005 |
| TC-API-048 | FR-18 | AI_GENERATED | EXECUTABLE_DETERMINISTIC | Supported hard authorization-denial assertion without private token dependency | SETUP-001 |
| TC-API-179 | FR-18 | HUMAN_ADDED | EXECUTABLE_EXPLORATORY | Confirms HUMAN_ADDED Content-Type observation for Admin order listing | SETUP-005 |

## Supporting setup requests

The controlled collection includes only these five setup requests, in execution order:

1. `[SETUP-002] Register Primary User`
2. `[SETUP-003] Login Primary User`
3. `[SETUP-006] Discover Existing Product`
4. `[SETUP-006] Confirm Existing Product`
5. `[SETUP-005] Login Admin`

`SETUP-001` is fulfilled by the private runtime environment and collection-level guard. `SETUP-008` is fulfilled by the authenticated primary-user/product context produced by the listed setup requests.

