# Prompt 023 — Build Postman Collection, Environment, and Test Scripts

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 022 finalized the executable Postman scope.

Current selected features:

* FR-02 — Login and Account Lockout
* FR-07 — Cart
* FR-18 — Order Management (Admin)

Current logical suite:

```text
AI_GENERATED:
105

HUMAN_ADDED:
17

TOTAL LOGICAL TESTS:
122
```

Execution feasibility:

```text
EXECUTABLE_DETERMINISTIC:
2

EXECUTABLE_EXPLORATORY:
56

EXECUTABLE_WITH_RUNTIME_SETUP:
56

BLOCKED_SETUP_UNAVAILABLE:
2

BLOCKED_STATE_UNAVAILABLE:
5

BLOCKED_SCOPE_OR_CHANNEL:
1

EXECUTABLE TOTAL:
114

BLOCKED TOTAL:
8
```

Feature execution scope:

```text
FR-02:
39 executable / 41 logical

FR-07:
40 executable / 41 logical

FR-18:
35 executable / 40 logical
```

Blocked logical testcase IDs:

```text
TC-API-092
TC-API-093

TC-API-118
TC-API-121
TC-API-127
TC-API-128

TC-API-164
TC-API-181
```

Prompt 022 result:

```text
READY_FOR_POSTMAN_BUILD
```

---

# 1. Purpose

Build the executable Postman implementation for the 114 executable logical tests.

The transformation is:

```text
Canonical logical suite
        +
Concrete test data
        +
Execution manifest
        ↓
Postman collection
        +
Postman environment template
        +
Pre-request scripts
        +
Test scripts
        +
Traceability
        ↓
Static validation
        ↓
READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

This prompt must:

1. build a valid Postman Collection v2.1,
2. build a safe environment template,
3. implement all 114 executable logical testcases,
4. implement documented supporting setup operations,
5. implement only supported deterministic assertions,
6. implement observational handling for exploratory cases,
7. preserve all AI/HUMAN provenance,
8. include `X-Student-Id` in every API request,
9. maintain TC → Postman traceability,
10. document the 8 blocked tests without fake implementation,
11. statically validate the generated Postman artifacts.

Do NOT execute the SUT.

Do NOT run Newman.

---

# 2. Authoritative Inputs

Use:

```text
eshop-sut/api_specification.md
eshop-sut/setup_guide.md

analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
analysis/current-selected-suite/blocker-register.md

test-data/README.md
test-data/static-data-catalog.md
test-data/runtime-data-catalog.md
test-data/testcase-data-matrix.md
test-data/postman-variable-plan.md

postman-plan/README.md
postman-plan/execution-manifest.md
postman-plan/runtime-setup-manifest.md
postman-plan/blocked-test-register.md
postman-plan/collection-structure.md
```

Do not use implementation code as requirement authority.

---

# 3. Preserve Canonical Logical Suite

Do not modify:

```text
analysis/current-selected-suite/test-case-design.md
```

Do not:

* generate new logical tests,
* delete logical tests,
* change logical objectives,
* change origins,
* renumber testcase IDs.

The Postman layer implements the approved logical suite.

---

# 4. Executable Scope

Build Postman implementation only for the 114 executable tests.

Do not create executable testcase requests for:

```text
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

These remain:

```text
BLOCKED_LOGICAL_TEST
```

They must still appear in traceability documentation.

---

# 5. Collection Artifact

Create:

```text
postman/collections/HW06-API-Testing.postman_collection.json
```

Use Postman Collection Schema:

```text
v2.1
```

Collection name:

```text
HW06 API Testing
```

Collection description must include:

```text
Selected features:
FR-02
FR-07
FR-18

Logical tests:
122

Executable:
114

Blocked:
8

AI_GENERATED:
105 logical tests

HUMAN_ADDED:
17 logical tests
```

---

# 6. Environment Artifact

Create:

```text
postman/environments/HW06-local.postman_environment.json
```

Do not commit real credentials or tokens.

Required environment variables should include, where needed:

```text
base_url
student_id

user_email
user_password

user_b_email
user_b_password

admin_email
admin_password

wrong_role_email
wrong_role_password
```

Runtime variables such as tokens/resource IDs should initially be empty.

Examples:

```text
user_token
user_b_token
admin_token
wrong_role_token

existing_product_id
missing_product_id

existing_order_id
missing_order_id
current_order_status

run_id
```

Use the existing variable plan as authority.

Do not invent unnecessary variables.

---

# 7. Secret Safety

Exported environment values for credentials/tokens must be:

```text
""
```

or safe placeholders.

Do not store:

* real passwords,
* JWTs,
* admin secrets,
* session tokens.

Required validation:

```text
PLAINTEXT_SECRET_COUNT = 0
```

---

# 8. X-Student-Id Requirement

Every HTTP request in the collection must contain:

```text
X-Student-Id: {{student_id}}
```

This includes:

* testcase requests,
* setup requests,
* discovery requests,
* authentication requests,
* supporting operations.

Do not rely solely on README documentation.

The actual request definitions must include the header.

Required static validation:

```text
HTTP_REQUESTS_MISSING_X_STUDENT_ID = 0
```

---

# 9. Collection Structure

Implement approximately:

```text
HW06 API Testing
│
├── 00 - Setup
│
│   ├── Shared
│
│   ├── FR-02 Setup
│
│   ├── FR-07 Setup
│
│   └── FR-18 Setup
│
├── FR-02 - Login and Lockout
│   ├── Deterministic
│   ├── Exploratory
│   └── Runtime / Stateful
│
├── FR-07 - Cart
│   ├── GET Cart
│   ├── POST Cart
│   └── Sequence / State
│
└── FR-18 - Admin Order Management
    ├── List Orders
    ├── Update Status
    └── Sequence / State
```

Adjust subfolders only where required by the execution manifest.

Do not introduce feature folders outside current scope.

---

# 10. Setup Requests

Implement documented automatable setup operations from:

```text
postman-plan/runtime-setup-manifest.md
```

Do not implement unavailable setup IDs as fake API requests.

For unavailable setup:

document it externally.

Setup request naming:

```text
[SETUP-NNN] <purpose>
```

Setup requests do NOT count toward the 114 executable testcase count.

---

# 11. Testcase Naming

Every executable testcase unit must clearly expose its canonical ID.

Use:

```text
[TC-API-NNN] <Canonical title>
```

Do not create new testcase IDs.

---

# 12. Single-Request vs Multi-Request Tests

A logical testcase may require:

```text
ONE REQUEST
```

or:

```text
MULTI-REQUEST SEQUENCE
```

For a single-request test:

use one Postman request.

For sequence/state tests requiring multiple requests:

represent the logical testcase as a folder such as:

```text
[TC-API-NNN] <Title>
├── Step 1 - Setup / First Action
├── Step 2 - Test Action
└── Step 3 - Observation
```

when necessary.

All child requests must carry the same canonical testcase reference in their description.

Do not create fake extra `TC-API-*` IDs for steps.

---

# 13. Postman Testcase Metadata

Each testcase request/folder description must include:

```text
Test ID:
Feature:
Origin:
Execution Class:

Logical Objective:

TB Refs:
EP Refs:
INT Refs:
Blocker Refs:

DATA IDs:
SETUP IDs:

Assertion Strategy:

Exploratory:
YES / NO
```

For HUMAN_ADDED tests also include:

```text
Origin:
HUMAN_ADDED

Student Proposal ID:
TC-PROP-...
```

where applicable.

---

# 14. Request Construction

Build request method/path/body strictly from the documented API specification and approved testcase design.

Do not infer undocumented endpoints.

Use:

```text
{{base_url}}
```

for the API root.

Do not hardcode localhost ports if `base_url` can represent them.

---

# 15. Authorization

Where authentication is required use variables such as:

```text
Bearer {{user_token}}
Bearer {{user_b_token}}
Bearer {{admin_token}}
Bearer {{wrong_role_token}}
```

only where the API contract/current test design supports such authentication.

Do not silently add Authorization to cases designed to test missing authentication.

---

# 16. Missing-Authentication Tests

For a testcase whose objective is missing authentication:

the request must intentionally omit the Authorization header.

However it must still contain:

```text
X-Student-Id: {{student_id}}
```

---

# 17. Invalid/Malformed Authorization Tests

Where the logical testcase tests malformed or invalid Authorization:

construct only the representation already defined by the canonical testcase/data catalog.

Do not create extra variants.

---

# 18. Request Bodies

Use concrete values and generator strategies defined by:

```text
test-data/*
```

Do not invent new value classes.

Respect member omission:

```text
missing field
≠
field: null
```

Respect body representation:

```text
JSON object
array
malformed JSON
non-JSON
```

as distinct testcase inputs.

---

# 19. Pre-Request Scripts

Use pre-request scripts where they genuinely reduce duplication or generate test data.

Reasonable uses include:

```text
run-unique benign strings
long-string probes
Unicode representative selection
special-character representatives
large-number probes
runtime counters
sequence snapshots
```

Do not use scripts to invent missing state.

---

# 20. Generator Implementation

Implement approved generators from Prompt 021 where needed.

Examples:

```text
GEN-001
GEN-002
...
```

Generators must be deterministic/reproducible within a run where practical.

For example:

```javascript
const value = "A".repeat(4096);
pm.variables.set("long_password_probe", value);
```

is acceptable because 4096 was explicitly defined as:

```text
ROBUSTNESS PROBE
NOT A SPECIFICATION BOUNDARY
```

Do not label it BVA.

---

# 21. Runtime IDs

Never hardcode assumptions such as:

```text
product_id = 1
order_id = 1
```

when runtime discovery is required.

Use runtime variables populated by setup/discovery requests.

---

# 22. Response Parsing

Only parse response JSON where doing so is supported and necessary.

Guard parsing safely.

Example style:

```javascript
let json;

try {
    json = pm.response.json();
} catch (e) {
    json = null;
}
```

Do not make unsupported schema assertions merely because JSON parsing succeeds.

---

# 23. Deterministic Assertion Policy

Prompt 022 explicitly identified deterministic cases such as:

```text
TC-API-048
TC-API-049
```

with supported semantic/security layers.

For deterministic tests:

implement only the supported oracle layers defined in:

```text
postman-plan/execution-manifest.md
```

Do not strengthen them.

---

# 24. Runtime-Setup Tests

`EXECUTABLE_WITH_RUNTIME_SETUP` does not automatically mean exploratory.

After setup:

derive assertion behavior from the testcase's approved assertion strategy.

Do not classify all runtime tests identically.

---

# 25. Exploratory Assertion Policy

For:

```text
EXECUTABLE_EXPLORATORY
```

the test script must NOT fabricate a pass/fail semantic oracle.

Prefer observational instrumentation.

Allowed supported checks may include:

```text
response object exists
response code is present
response time captured
specific requested header captured
response body captured
parseability checked only when justified
```

Do not assert a specific status merely to make Newman green.

---

# 26. Observation Logging

For exploratory tests use `console.log()` or equivalent Postman/Newman-visible output with structured prefixes such as:

```text
[OBS][TC-API-150]
```

Record only useful non-secret information.

Possible observations:

```text
status
response time
Content-Type
body type
selected non-sensitive fields
comparison result
```

Do not dump tokens/passwords.

---

# 27. Content-Type Observation Cases

For tests such as:

```text
TC-API-173
TC-API-174
TC-API-179
TC-API-180
```

record:

```javascript
pm.response.headers.get("Content-Type")
```

without asserting a specific value unless specification support exists.

---

# 28. Sequence Comparisons

For sequence tests:

store required observations in runtime/collection variables.

Examples:

```text
cart_snapshot_before
cart_snapshot_after

orders_snapshot_1
orders_snapshot_2
```

Use safe comparisons.

Do not assert equivalence/order/state unless supported.

Exploratory comparisons should be recorded as observations.

---

# 29. Runtime Variable Policy

Runtime-generated tokens, IDs and snapshots may use:

```text
collection variables
```

or another Newman-persistent scope supported by the design.

They must not be exported back into repository artifacts as secret values.

The checked-in collection must contain empty/default-safe values.

---

# 30. Collection Variables

Use collection variables for safe constants/runtime scratch values where appropriate.

Do not put secrets in checked-in collection variable values.

Document each collection variable in README.

---

# 31. Environment Variables

Use environment variables for:

```text
base_url
student_id
private credentials
environment-specific configuration
```

Runtime tokens may be populated during a collection run but exported templates must remain empty.

---

# 32. Authentication Setup

Implement documented setup flows for:

```text
normal user
second normal user
admin
wrong-role user
```

where feasible.

Admin/private identity may remain a manual environment prerequisite where credentials cannot be automatically created.

Do not invent admin-registration functionality.

---

# 33. Product Discovery

For FR-07 setup:

use documented product operation(s) to discover a usable product.

Store resulting ID in:

```text
existing_product_id
```

or the canonical variable from the variable plan.

Do not assume ID 1.

---

# 34. Missing-Product Candidate

Implement only the verified absence strategy from Prompt 021/022.

Do not assume an arbitrary large ID is absent without verification.

---

# 35. Order Discovery

For FR-18:

use documented API operations to discover an order where execution planning says this is possible.

Store:

```text
existing_order_id
current_order_status
```

as runtime variables where appropriate.

Do not invent an order ID.

---

# 36. Blocked Tests

Do not add fake passing request items for:

```text
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

Instead create:

```text
postman/traceability/blocked-tests.md
```

with:

| Test ID | Feature | Reason | Logical Test Preserved? | Executed by Newman? |
| ------- | ------- | ------ | ----------------------- | ------------------- |

Expected:

```text
Logical Test Preserved = YES
Executed by Newman = NO
```

---

# 37. Postman Traceability Matrix

Create:

```text
postman/traceability/testcase-postman-matrix.md
```

Exactly 122 logical testcase rows.

Columns:

| Test ID | Feature | Origin | Execution Class | Postman Path | Implemented? | Newman Planned? | Notes |
| ------- | ------- | ------ | --------------- | ------------ | ------------ | --------------- | ----- |

Expected:

```text
Implemented executable:
114

Blocked/not implemented:
8

TOTAL:
122
```

---

# 38. Setup Traceability

Create:

```text
postman/traceability/setup-postman-matrix.md
```

Map:

```text
SETUP-ID
→ Postman request/folder
→ produced variables
→ consumer tests
```

Unavailable setup must be explicitly marked.

---

# 39. README

Create:

```text
postman/README.md
```

Document:

1. collection purpose,
2. selected features,
3. logical/executable/blocked counts,
4. directory layout,
5. import steps,
6. environment variables,
7. secret-handling rules,
8. setup sequence,
9. exploratory-test semantics,
10. blocked-test semantics,
11. student ID header policy,
12. Newman execution deferred to later prompt.

---

# 40. Environment Example Safety

The environment JSON must be directly importable into Postman but safe for Git.

Fields requiring private values must be empty.

README must explain which must be populated locally.

---

# 41. Exercise Postman Features Reasonably

Use Postman features where they naturally serve the suite.

Target reasonable use of:

```text
environment variables
collection variables
folder organization
request descriptions
pre-request scripts
post-response/test scripts
runtime variable extraction
request chaining/sequences
JSON body construction
raw-body testing
headers
auth variation
response-header inspection
response parsing
state snapshots
```

Do not add meaningless features merely to inflate feature count.

---

# 42. Collection-Level Pre-Request Guard

A collection-level pre-request script may validate basic required context such as:

```text
base_url
student_id
```

and generate:

```text
run_id
```

where appropriate.

Do not perform network setup from the collection-level script.

---

# 43. Required-Variable Safety

Do not silently continue when required essential variables are completely absent.

Use clear runtime messages such as:

```text
[SETUP] admin_email is not configured
```

where needed.

However do not intentionally make static collection validation fail merely because private runtime credentials are not committed.

---

# 44. Test Script Naming

Every `pm.test()` name must begin with or contain its testcase ID.

Example:

```javascript
pm.test("[TC-API-048] supported semantic behavior", function () {
    // supported assertion
});
```

This makes Newman reports traceable.

---

# 45. Exploratory Logging Naming

Use:

```text
[OBS][TC-API-NNN]
```

for observational output.

This distinguishes observations from hard assertions.

---

# 46. No Fake Pass Tests

Do NOT use patterns such as:

```javascript
pm.test("test", () => {
    pm.expect(true).to.be.true;
});
```

solely to generate a green Newman report.

Every assertion must test something meaningful and supported.

---

# 47. Request-Level Traceability

Every executable request description must contain:

```text
Canonical Test ID
```

For multi-step testcase folders:

every step must contain the parent canonical Test ID.

---

# 48. Static Build Validation Script

Create:

```text
postman/validation/validate-postman-build.js
```

This script must perform only local/static JSON validation.

It must NOT call the API.

Validate at minimum:

```text
collection JSON parseable
environment JSON parseable

collection schema version present

executable testcase IDs represented = 114
blocked testcase IDs absent from executable test units

logical IDs accounted by traceability = 122

duplicate testcase implementation IDs = 0

unknown testcase IDs = 0

HUMAN_ADDED IDs represented correctly

all HTTP requests contain X-Student-Id

no plaintext credential/token values committed

no hardcoded known-runtime product/order IDs where runtime discovery is required

blocked tests documented = 8
```

---

# 49. Static Validation Output

Run only:

```bash
node postman/validation/validate-postman-build.js
```

This is allowed because it performs no network request.

Create:

```text
postman/validation/build-validation.md
```

containing the validation result.

---

# 50. Important Count Semantics

Do not equate:

```text
114 logical executable tests
```

with:

```text
114 raw HTTP requests
```

because multi-request sequence tests and supporting setup may require additional HTTP request items.

Instead validate:

```text
114 executable logical testcase IDs represented exactly once as testcase units
```

A testcase unit may be:

```text
one request
```

or:

```text
one folder containing multiple sequence requests
```

---

# 51. Blocked IDs Must Not Disappear

The following eight IDs must remain visible in project traceability:

```text
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

They are blocked, not deleted.

---

# 52. Preserve HUMAN_ADDED Provenance

Accepted student tests:

```text
TC-API-165 ... TC-API-181
```

except the rejected proposal that received no ID.

Any executable HUMAN_ADDED testcase must retain:

```text
Origin:
HUMAN_ADDED

Student Proposal ID:
...
```

TC-API-181 remains HUMAN_ADDED even though it is execution-blocked.

---

# 53. No SUT Execution

Prompt 023 must not:

```text
start backend
send HTTP requests
run Postman collection
run Newman
capture runtime responses
create screenshots
report API pass/fail results
```

This prompt is build + static validation only.

---

# 54. Quality Validation

Required table:

| Check                          | Expected |
| ------------------------------ | -------- |
| Logical testcase IDs accounted | 122      |
| Executable IDs represented     | 114      |
| Blocked IDs documented         | 8        |
| Duplicate implementation IDs   | 0        |
| Unknown implementation IDs     | 0        |
| X-Student-Id missing           | 0        |
| Plaintext secrets              | 0        |
| Unsupported hard assertions    | 0        |
| Blocked fake-pass requests     | 0        |
| API execution                  | NO       |
| Newman execution               | NO       |

---

# 55. Postman Execution Validation Readiness

If:

```text
collection valid
environment valid
114 executable testcase units represented
8 blocked tests documented
setup mappings complete
student header present
secret audit passes
static validator passes
```

report:

```text
READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

Otherwise:

```text
NOT_READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

Do not execute the API to resolve build defects.

---

# 56. Directory Structure

Create:

```text
postman/
├── README.md
│
├── collections/
│   └── HW06-API-Testing.postman_collection.json
│
├── environments/
│   └── HW06-local.postman_environment.json
│
├── traceability/
│   ├── testcase-postman-matrix.md
│   ├── setup-postman-matrix.md
│   └── blocked-tests.md
│
└── validation/
    ├── validate-postman-build.js
    └── build-validation.md
```

Do not create execution reports yet.

---

# 57. Required Final Response Structure

Use exactly:

# Prompt 023 — Build Postman Collection, Environment, and Test Scripts

## 1. Executive Summary

Include:

* logical tests = 122,
* executable testcase units = 114,
* blocked = 8,
* actual HTTP request item count,
* setup request count,
* environment variables,
* static validation result,
* readiness.

## 2. Collection Structure

## 3. Environment Design

## 4. Secret Handling

## 5. Shared Pre-Request Logic

## 6. Runtime Setup Implementation

## 7. FR-02 Postman Implementation

## 8. FR-07 Postman Implementation

## 9. FR-18 Postman Implementation

## 10. Deterministic Assertions

## 11. Exploratory Observation Scripts

## 12. Stateful / Sequence Implementation

## 13. HUMAN_ADDED Implementation

## 14. Blocked-Test Documentation

## 15. X-Student-Id Validation

## 16. Testcase Traceability

## 17. Setup Traceability

## 18. Postman Feature Usage

## 19. Static Build Validation

## 20. Quality Validation

## 21. Execution Validation Readiness

Use exactly one:

```text
READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

or:

```text
NOT_READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

## 22. Current Project Status

Use:

```text
LOGICAL TEST DESIGN:
122 — COMPLETE

CONCRETE TEST DATA:
COMPLETE

EXECUTION FEASIBILITY:
114 EXECUTABLE / 8 BLOCKED — COMPLETE

POSTMAN BUILD:
COMPLETE

POSTMAN STATIC VALIDATION:
COMPLETE

NEWMAN/API EXECUTION:
NOT STARTED
```

## 23. Machine-Usable Summary

End exactly:

```text
PROMPT_023_SUMMARY

Logical tests:
122

Executable logical tests:
114

Blocked logical tests:
8

Executable testcase units represented:

Total HTTP request items:

Supporting setup requests:

Environment variables:

AI_GENERATED executable testcase units:

HUMAN_ADDED executable testcase units:

Blocked testcase IDs:
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181

Logical IDs accounted in traceability:
122

Duplicate implementation IDs:
0

Unknown implementation IDs:
0

HTTP requests missing X-Student-Id:
0

Plaintext secrets:
0

Unsupported hard assertions:
0

Static validator:
PASS / FAIL

API executed:
NO

Newman executed:
NO

Readiness:
READY_FOR_POSTMAN_EXECUTION_VALIDATION / NOT_READY_FOR_POSTMAN_EXECUTION_VALIDATION

Next required prompt if ready:
PROMPT 024 — VALIDATE POSTMAN EXECUTION SETUP AND RUN CONTROLLED SMOKE TEST
```

---

# 58. Output Artifacts

Create:

```text
postman/README.md

postman/collections/HW06-API-Testing.postman_collection.json

postman/environments/HW06-local.postman_environment.json

postman/traceability/testcase-postman-matrix.md
postman/traceability/setup-postman-matrix.md
postman/traceability/blocked-tests.md

postman/validation/validate-postman-build.js
postman/validation/build-validation.md
```

Log:

```text
prompts/Prompt-023-build-postman-collection-environment-tests.md
```

Append exactly one Prompt 023 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–022 historical prompt contents.

---

# 59. Final Constraints

* Implement 114 executable logical tests.
* Preserve all 122 logical tests in traceability.
* Preserve 8 blocked tests as blocked.
* Do not invent replacement tests.
* Do not execute the API.
* Do not run Newman.
* Do not start the SUT.
* Do not modify the logical suite.
* Do not change AI/HUMAN origins.
* Do not hardcode real credentials.
* Do not commit tokens.
* Do not assume product/order ID 1.
* Do not invent lockout thresholds.
* Do not invent Cart ownership rules.
* Do not invent stock rules.
* Do not invent order transition rules.
* Do not invent response schemas.
* Do not invent audit-log interfaces.
* Do not create fake green assertions.
* All HTTP requests must contain X-Student-Id.
* Exploratory observations must remain observations.
* Use Postman features only where they add genuine implementation value.

The objective is:

**114 Defensible Executable Logical Tests → Traceable Postman Implementation**

not:

**Make everything green by inventing assertions**.
