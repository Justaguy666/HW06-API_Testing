# Prompt 021 — Concrete Test Data Design for the Final 122-Test Logical Suite

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 020 completed validation and integration of the student-authored extension.

Current selected features:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Superseded historical feature:

* **FR-09: Discount Coupons**

Current final logical-test suite:

```text
AI_GENERATED:
105

HUMAN_ADDED:
17

TOTAL ACTIVE LOGICAL TESTS:
122
```

Current testcase IDs include:

```text
Historical/current AI tests:
TC-API-001 ... TC-API-164
with non-current historical IDs preserved

HUMAN_ADDED:
TC-API-165 ... TC-API-181
```

Only active current selected tests are relevant to downstream implementation.

Current state:

```text
LOGICAL TEST DESIGN:
COMPLETE

STUDENT EXTENSION:
17 / 15 — PASS

CONCRETE TEST DATA:
NOT STARTED

POSTMAN:
NOT STARTED

EXECUTION:
NOT STARTED
```

---

# 1. Purpose

Design the concrete and runtime-bound test data required to implement the final 122 active logical tests in Postman/Newman.

The transformation is:

```text
122 logical tests
        ↓
Identify reusable data dimensions
        ↓
Concrete static values
        +
Runtime-provisioned values
        +
Stateful setup requirements
        ↓
Test Data Catalog
        ↓
TC → DATA Traceability
        ↓
POSTMAN-READY DATA DESIGN
```

This prompt must:

1. inspect all 122 current active logical tests,
2. determine the data required by every testcase,
3. create reusable stable DATA IDs,
4. assign concrete values where safe,
5. preserve runtime placeholders where resource existence is required,
6. identify supporting setup/provisioning needs,
7. separate static data from runtime/state-dependent data,
8. distinguish exploratory probe values from specification boundaries,
9. map every testcase to its required data,
10. prepare a Postman-ready data design.

Do not implement Postman yet.

Do not execute the API.

---

# 2. Authoritative Inputs

Use the current canonical suite:

```text
analysis/current-selected-suite/selected-features.md
analysis/current-selected-suite/verified-test-basis.md
analysis/current-selected-suite/domain-and-partition-summary.md
analysis/current-selected-suite/boundary-analysis-summary.md
analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
analysis/current-selected-suite/blocker-register.md
analysis/current-selected-suite/suite-reconciliation-summary.md
analysis/current-selected-suite/student-extension-integration-summary.md
```

Primary API contract:

```text
eshop-sut/api_specification.md
```

You may inspect:

```text
eshop-sut/setup_guide.md
```

only for environment/startup/provisioning information.

Do not treat setup documentation as a requirement authority.

Do not inspect implementation code to invent expected behavior.

---

# 3. Scope

Design data only for active current tests belonging to:

```text
FR-02
FR-07
FR-18
```

Do not create execution data for:

```text
FR-09 historical tests
historical FR-17 cross-feature tests
historical FR-10 cross-feature tests
inactive/rejected proposals
```

---

# 4. Preserve Test Provenance

Current logical tests retain their original origins:

```text
AI_GENERATED = 105
HUMAN_ADDED = 17
```

Test data design must not alter authorship.

Do not change testcase IDs.

Do not change testcase objectives.

---

# 5. Data Status Classification

Every active testcase must receive exactly one primary data status:

```text
STATIC_READY
RUNTIME_PROVISION_REQUIRED
STATE_SETUP_REQUIRED
EXPLORATORY_PROBE_READY
BLOCKED_BY_SPEC
```

Definitions:

## STATIC_READY

All required test values can be defined safely before runtime.

## RUNTIME_PROVISION_REQUIRED

At least one resource identity/token/account/order/product must be obtained or created at runtime.

## STATE_SETUP_REQUIRED

Execution depends on a specific system state or sequence.

## EXPLORATORY_PROBE_READY

Concrete probe values can be supplied, but the semantic oracle remains observational.

## BLOCKED_BY_SPEC

Missing specification information prevents a defensible concrete-data definition or setup.

---

# 6. Stable DATA IDs

Create stable IDs:

```text
DATA-SHARED-001
DATA-SHARED-002
...

DATA-FR02-001
DATA-FR02-002
...

DATA-FR07-001
DATA-FR07-002
...

DATA-FR18-001
DATA-FR18-002
...
```

Do not create one DATA ID per testcase automatically.

Reuse data assets when several tests share the same semantic data class.

---

# 7. Data Categories

Every DATA item must have one category:

```text
ENVIRONMENT
IDENTITY
AUTH
HEADER
BODY
FIELD_VALUE
RESOURCE
RESOURCE_STATE
SEQUENCE
ROBUSTNESS_PROBE
EXPECTED_OBSERVATION
SUPPORTING_SETUP
```

---

# 8. Required DATA Schema

Every DATA item must include:

```text
Data ID:
Feature:
Category:

Purpose:

Concrete / Runtime:
STATIC / GENERATED_AT_RUNTIME / DISCOVERED_AT_RUNTIME

Value / Logical Generator:

Specification Role:

Boundary Status:
SPEC_BOUNDARY / NOT_A_BOUNDARY / NOT_APPLICABLE

Sensitive:
YES / NO

Reusable:
YES / NO

Used By Test IDs:

Setup Dependency:

Blocker Refs:

Notes:
```

---

# 9. Boundary Integrity

Preserve existing BVA conclusions.

No current selected feature has an accepted specification-backed boundary.

Therefore values such as:

```text
extremely long email
extremely long password
negative quantity
fractional quantity
large numeric magnitude
```

must be classified as:

```text
ROBUSTNESS_PROBE
Boundary Status:
NOT_A_BOUNDARY
```

Do not call them:

* lower boundary,
* upper boundary,
* overflow boundary,
* min-1,
* max+1.

---

# 10. Static vs Runtime Data

Prefer concrete static values for representation-focused cases.

Examples include:

* omitted member,
* explicit null,
* boolean instead of string,
* object instead of scalar,
* array instead of expected object,
* Unicode representation,
* negative-number probe,
* fractional-number probe.

Use runtime-bound variables for resource-dependent cases.

Examples:

```text
{{valid_user_email}}
{{valid_user_password}}
{{user_token}}

{{existing_product_id}}

{{admin_email}}
{{admin_password}}
{{admin_token}}

{{existing_order_id}}
{{current_order_status}}
```

These variable names are examples of naming style.

Verify actual required variables against the canonical suite.

---

# 11. No Fake Runtime Identities

Do not pretend a resource exists merely by assigning:

```text
existing_order_id = 1
existing_product_id = 1
```

unless reliable test setup guarantees it.

Instead classify such values as:

```text
DISCOVERED_AT_RUNTIME
```

or:

```text
GENERATED_AT_RUNTIME
```

and define the provisioning mechanism separately.

---

# 12. Supporting Setup

A supporting endpoint may be used to create or discover state when it is documented by the API specification.

Supporting setup does not count as a selected-feature quota testcase.

Required table:

| SETUP-ID | Purpose | Supporting Operation | Produces | Consumed By |
| -------- | ------- | -------------------- | -------- | ----------- |

IDs:

```text
SETUP-001
SETUP-002
...
```

Do not invent undocumented setup endpoints.

---

# 13. Environment Data

Create a shared environment inventory.

At minimum investigate the need for:

```text
base_url
student_id
```

Every future API request must support:

```text
X-Student-Id: {{student_id}}
```

as required by the assignment.

Do not hardcode the student's actual ID into every request if an environment variable can be reused.

Required table:

| Variable | Purpose | Source | Sensitive? | Runtime? |
| -------- | ------- | ------ | ---------- | -------- |

---

# 14. Authentication Data

Build separate runtime identities where required.

Possible logical roles:

```text
normal authenticated user
administrator
wrong-role authenticated user
unauthenticated context
```

only when supported by current tests.

Required inventory:

| Identity ID | Role | Required Credentials | Token Needed? | Used By |
| ----------- | ---- | -------------------- | ------------- | ------- |

Do not store real secrets.

Use local/environment variables.

---

# 15. FR-02 Data Design

Design concrete/runtime data for all current FR-02 tests, including HUMAN_ADDED `TC-API-165–170`.

Cover required dimensions such as:

* nominal email representation,
* nominal password representation,
* missing members,
* null,
* wrong type,
* malformed JSON representation,
* whitespace/case probes,
* credential mismatch,
* lockout/state sequence,
* extreme-length email probe,
* extreme-length password probe,
* Unicode/non-ASCII probe,
* special-character-class probe,
* positional credential swap,
* repeated-login/throttling observation.

Do not infer a documented maximum string length.

---

# 16. Extreme-Length Probe Design

For HUMAN_ADDED robustness tests:

```text
TC-API-165
TC-API-166
```

select deterministic, reproducible probe-generation rules.

Example form:

```text
repeat a safe character N times
```

N may be chosen as a robustness probe value.

Important:

```text
N is NOT a specification boundary.
```

Document:

```text
Probe Rationale:
A deliberately large reproducible representation selected
for robustness observation; not a claimed valid/invalid threshold.
```

Avoid embedding thousands of characters directly in Markdown if a generator expression is clearer.

---

# 17. Unicode Probe Design

For the Unicode credential testcase:

define a small reproducible set of representative Unicode classes.

Potential categories:

```text
accented Latin
non-Latin Unicode
emoji / supplementary-plane character
```

Use the minimum set necessary for meaningful representation coverage.

Do not turn one logical testcase into dozens of artificial variants.

---

# 18. Special-Character Probe Design

Use abstract safe representation classes.

Do not provide exploit payloads.

Allowed categories may include:

```text
quotation character
bracket character
escape-like character
control-character representation
```

Do not define SQLi/XSS/command-injection strings.

---

# 19. Repeated-Request Probe

For the FR-02 rate-control/throttling observation:

define a finite reproducible request-count/time-window probe.

It must be explicitly labeled:

```text
EXPLORATORY PROBE
NOT A DOCUMENTED THROTTLING THRESHOLD
```

Do not assert that throttling must occur.

If no defensible finite probe can be selected:

mark:

```text
BLOCKED_BY_SPEC
```

rather than inventing a threshold.

---

# 20. FR-07 Data Design

Design data for all current FR-07 tests including HUMAN_ADDED:

```text
TC-API-171 ... TC-API-176
```

Data dimensions may include:

* existing product context,
* missing/non-existing product context,
* documented Cart object shape,
* omitted fields,
* null fields,
* wrong-type fields,
* negative quantity probe,
* fractional quantity probe,
* response-header observation,
* array-shaped request body,
* extreme-magnitude numeric probe,
* add → retrieve sequence,
* repeated GET,
* repeated POST/add sequence.

Do not infer stock semantics.

Do not infer duplicate-item accumulation.

---

# 21. Negative / Fractional Quantity Probes

For:

```text
TC-API-171
TC-API-172
```

create reproducible representative values.

These values remain:

```text
EXPLORATORY
NOT_A_BOUNDARY
NOT_DETERMINISTIC_INVALID
```

Do not encode an expected rejection.

---

# 22. Extreme-Magnitude Numeric Probe

For:

```text
TC-API-176
```

choose a reproducible large finite numeric probe.

Do not use implementation-specific integer limits as API boundaries.

Do not claim overflow.

If multiple numeric members are tested, executions must vary one numeric member at a time.

---

# 23. FR-18 Data Design

Design data for all current FR-18 tests including:

```text
TC-API-177 ... TC-API-181
```

Required contexts may include:

* authenticated admin,
* unauthenticated request,
* wrong role,
* existing order,
* non-existing order,
* status vocabulary values where documented,
* unknown status representation,
* missing/null/wrong-type status,
* repeated order-list reads,
* structured undocumented query probes,
* response Content-Type observations,
* in-scope traceability observation.

Do not invent status transitions.

---

# 24. Structured Query Probe Data

For:

```text
TC-API-177
```

create one concrete structured query family per execution.

Examples of semantic families:

```text
pagination-shaped
filter-shaped
```

Do not claim the endpoint supports them.

Do not generate a huge arbitrary combinatorial matrix.

Each value must be labeled:

```text
UNDOCUMENTED_QUERY_PROBE
```

---

# 25. Sort-Stability Data

For:

```text
TC-API-178
```

define the state requirement:

```text
same authenticated admin context
same endpoint
no intentional mutation between reads
```

The data design should support comparison of:

```text
observable order sequence A
observable order sequence B
```

Do not define the required ordering.

---

# 26. Content-Type Observation Tests

For:

```text
TC-API-173
TC-API-174
TC-API-179
TC-API-180
```

no special body value is necessarily required.

Create an observation data item such as:

```text
Record response Content-Type header verbatim.
```

Do not assert:

```text
application/json
```

unless explicitly supported.

---

# 27. Traceability Observation

For:

```text
TC-API-181
```

restrict observations to in-scope API response information.

Do not inspect:

* database audit tables,
* logs unavailable through API,
* server filesystem,
* implementation-only tracing.

If no API-visible traceability field/channel is documented:

keep the test exploratory and record:

```text
NO IN-SCOPE TRACEABILITY CHANNEL DOCUMENTED
```

Do not invent one.

---

# 28. Missing Resource Data

For non-existing resources, use a deterministic strategy that avoids colliding with known current resources.

Do not simply assume arbitrary ID `999999` is guaranteed absent.

Possible strategy:

```text
obtain known existing IDs
→ choose a clearly separated candidate
→ verify non-existence as setup
```

only if verification can be performed through documented APIs.

Otherwise classify:

```text
RUNTIME_PROVISION_REQUIRED
```

---

# 29. Stateful Test Data

For state-dependent tests define:

```text
Initial State
Setup Action
State Identifier
Test Action
Observation
Cleanup / Reset Requirement
```

Do not define unsupported expected transitions.

Required table:

| STATE-DATA-ID | Feature | Required Initial State | Setup | Consumed By |
| ------------- | ------- | ---------------------- | ----- | ----------- |

---

# 30. Test Isolation

Determine where data isolation is needed to prevent testcase interference.

Classify:

```text
ISOLATED_RESOURCE_REQUIRED
SHARED_READ_ONLY_SAFE
SEQUENCE_LOCAL_STATE
GLOBAL_STATE_RISK
```

Required table:

| Test / Group | Isolation Class | Reason | Reset Needed? |
| ------------ | --------------- | ------ | ------------- |

Pay special attention to:

* login lockout,
* Cart mutation,
* order status mutation.

---

# 31. Cleanup Strategy

Determine whether tests require cleanup.

Use:

```text
NO_CLEANUP
RESET_REQUIRED
FRESH_RESOURCE_REQUIRED
MANUAL_RESET_IF_BLOCKED
```

Do not invent cleanup APIs.

If no supported cleanup exists:

record the limitation.

---

# 32. Static Test-Data Catalog

Create reusable static datasets.

Suggested artifact:

```text
test-data/static-data-catalog.md
```

Group by:

```text
shared
FR-02
FR-07
FR-18
```

---

# 33. Runtime Data Catalog

Create:

```text
test-data/runtime-data-catalog.md
```

Include:

* runtime variables,
* identities,
* resource IDs,
* state variables,
* provisioning mechanism,
* cleanup/reset rules.

---

# 34. Testcase-to-Data Matrix

Create:

```text
test-data/testcase-data-matrix.md
```

It must contain exactly one row for every active logical testcase.

Required columns:

| Test ID | Feature | Origin | Data Status | DATA IDs | SETUP IDs | State Requirement | Cleanup | Blocker |
| ------- | ------- | ------ | ----------- | -------- | --------- | ----------------- | ------- | ------- |

Expected active testcase rows:

```text
122
```

---

# 35. Postman Variable Plan

Create a variable plan only.

Do not create the Postman environment yet.

Classify:

```text
GLOBAL_STYLE
ENVIRONMENT
COLLECTION
RUNTIME_LOCAL
```

Required table:

| Variable | Proposed Scope | Source | Sensitive | Used By |
| -------- | -------------- | ------ | --------- | ------- |

Prefer environment variables for:

```text
base_url
student_id
credentials
tokens
```

Prefer runtime/local variables for temporary resource IDs where appropriate.

---

# 36. Secret Handling

Do not commit real passwords/tokens.

Use:

```text
{{variable_name}}
```

and explain how values will be populated later.

No secrets should appear in repository Markdown/JSON.

Required validation:

```text
Committed plaintext secret count:
0
```

---

# 37. Data Generators

For reusable representation probes, define logical generators.

Examples:

```text
LONG_STRING_PROBE(length)
UNICODE_PROBE(class)
LARGE_NUMBER_PROBE()
```

These are design descriptions only.

Do not implement Postman JavaScript yet.

Required table:

| Generator ID | Purpose | Inputs | Output Class | Boundary? |
| ------------ | ------- | ------ | ------------ | --------- |

---

# 38. Deterministic vs Exploratory Data

Required summary:

| Data Use             | Count |
| -------------------- | ----: |
| Deterministic static |       |
| Runtime provisioned  |       |
| Stateful             |       |
| Exploratory probe    |       |
| Blocked              |       |

Do not convert exploratory probes into deterministic invalid data.

---

# 39. Blocker Mapping

Map all active blockers to their data-design effects.

Required:

| Blocker | Affected DATA IDs | Affected Tests | Data Effect |
| ------- | ----------------- | -------------- | ----------- |

Data Effect:

```text
PREVENTS_VALUE_SELECTION
PREVENTS_RESOURCE_SETUP
PREVENTS_STATE_SETUP
LIMITS_EXPECTED_RESULT_ONLY
NO_DATA_EFFECT
```

---

# 40. Data Readiness Classification Per Test

Every testcase must eventually have one:

```text
DATA_READY_FOR_POSTMAN
DATA_READY_BUT_EXPLORATORY
POSTMAN_SETUP_REQUIRED
BLOCKED_BEFORE_POSTMAN
```

Required count summary.

Do not require all 122 to be deterministic.

---

# 41. Concrete Data Quality Audit

Validate:

| Check                                     | Result    |
| ----------------------------------------- | --------- |
| 122 active tests mapped                   | PASS/FAIL |
| AI/HUMAN provenance preserved             | PASS/FAIL |
| No historical FR-09 execution data        | PASS/FAIL |
| No undocumented boundary introduced       | PASS/FAIL |
| No runtime-existing resource fabricated   | PASS/FAIL |
| No unsupported expected result introduced | PASS/FAIL |
| Stateful setup explicitly identified      | PASS/FAIL |
| Cleanup limitations documented            | PASS/FAIL |
| Student ID header variable planned        | PASS/FAIL |
| No plaintext secrets                      | PASS/FAIL |
| No Postman implementation yet             | PASS/FAIL |
| No API execution                          | PASS/FAIL |

---

# 42. Postman Readiness

If all active tests have a defensible data strategy even where some remain runtime/state dependent:

report:

```text
READY_FOR_POSTMAN_IMPLEMENTATION
```

If important data/setup requirements remain structurally unresolved:

report:

```text
NOT_READY_FOR_POSTMAN_IMPLEMENTATION
```

A testcase may be exploratory and still be ready for Postman.

A testcase requiring an impossible/unknown setup may remain blocked.

---

# 43. Create Test-Data Directory

Create:

```text
test-data/
├── README.md
├── static-data-catalog.md
├── runtime-data-catalog.md
├── testcase-data-matrix.md
└── postman-variable-plan.md
```

Do not create Postman files yet.

---

# 44. test-data/README.md

Explain:

```text
Purpose
Canonical source
DATA ID convention
STATIC vs RUNTIME distinction
Exploratory probe rules
Boundary integrity
Secret-handling policy
Downstream Postman usage
```

---

# 45. Update Canonical Coverage Metadata

Update only if needed:

```text
analysis/current-selected-suite/test-coverage-matrix.md
```

Add a concise downstream data-readiness section.

Do not rewrite logical test semantics.

---

# 46. Required Final Response Structure

Use exactly:

# Prompt 021 — Concrete Test Data Design

## 1. Executive Summary

Include:

* active tests = 122,
* DATA item count,
* SETUP count,
* static/runtime/stateful/exploratory/blocked counts,
* Postman readiness.

## 2. Data Design Method

## 3. Shared Environment Data

## 4. Identity and Authentication Data

## 5. FR-02 Data Catalog

## 6. FR-07 Data Catalog

## 7. FR-18 Data Catalog

## 8. Robustness Probe Design

## 9. Stateful Data Design

## 10. Supporting Setup Inventory

## 11. Test Isolation

## 12. Cleanup Strategy

## 13. Testcase-to-Data Mapping

122 rows.

## 14. Postman Variable Plan

## 15. Secret Handling

## 16. Data Generator Design

## 17. Blocker-to-Data Mapping

## 18. Data Readiness Summary

## 19. Quality Validation

## 20. Postman Readiness

Use exactly one:

```text
READY_FOR_POSTMAN_IMPLEMENTATION
```

or:

```text
NOT_READY_FOR_POSTMAN_IMPLEMENTATION
```

## 21. Current Project Status

Use:

```text
CURRENT SELECTED FEATURES:
FR-02
FR-07
FR-18

AI TEST DESIGN:
105 / 105 — COMPLETE

STUDENT EXTENSION:
17 / 15 — COMPLETE

TOTAL ACTIVE LOGICAL TESTS:
122

CONCRETE TEST DATA DESIGN:
COMPLETE

POSTMAN IMPLEMENTATION:
NOT STARTED

API EXECUTION:
NOT STARTED
```

## 22. Machine-Usable Summary

End exactly:

```text
PROMPT_021_SUMMARY

Active logical tests:
122

AI_GENERATED:
105

HUMAN_ADDED:
17

DATA items:

SETUP items:

Data categories:
STATIC_READY:
RUNTIME_PROVISION_REQUIRED:
STATE_SETUP_REQUIRED:
EXPLORATORY_PROBE_READY:
BLOCKED_BY_SPEC:

Postman readiness:
DATA_READY_FOR_POSTMAN:
DATA_READY_BUT_EXPLORATORY:
POSTMAN_SETUP_REQUIRED:
BLOCKED_BEFORE_POSTMAN:

Testcases mapped:
122

Unmapped active testcases:

Plaintext secrets committed:
0

Unsupported boundaries introduced:
0

Runtime resources falsely assumed:
0

Postman implemented:
NO

API requests executed:
NO

Overall readiness:
READY_FOR_POSTMAN_IMPLEMENTATION / NOT_READY_FOR_POSTMAN_IMPLEMENTATION

Next required prompt if ready:
PROMPT 022 — BUILD POSTMAN COLLECTION, ENVIRONMENT, AND TEST SCRIPTS
```

---

# 47. Important Constraints

* Work from the final 122-test canonical suite.
* Do not generate new logical testcases.
* Do not change testcase origins.
* Do not renumber testcase IDs.
* Do not reactivate FR-09.
* Do not implement Postman.
* Do not execute APIs.
* Do not inspect implementation as requirement authority.
* Do not fabricate existing accounts/products/orders.
* Do not hardcode real credentials.
* Do not commit tokens.
* Do not invent min/max values.
* Do not label robustness probes BVA.
* Do not invent rate-limit thresholds.
* Do not invent Cart stock/quantity rules.
* Do not invent order transition rules.
* Do not invent response Content-Type requirements.
* Do not invent audit-log requirements.
* Preserve exploratory semantics.
* Prefer reusable DATA IDs over 122 duplicated datasets.

The objective is:

**122 Final Logical Tests → Reusable, Traceable, Postman-Ready Test Data**

not:

**Execute the SUT or invent missing requirements**.

---

# 48. Output Artifacts

Create:

```text
test-data/README.md
test-data/static-data-catalog.md
test-data/runtime-data-catalog.md
test-data/testcase-data-matrix.md
test-data/postman-variable-plan.md
```

Update only if necessary:

```text
analysis/current-selected-suite/test-coverage-matrix.md
```

Log:

```text
prompts/Prompt-021-concrete-test-data-design.md
```

Append exactly one Prompt 021 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–020 historical prompt contents.
