# Prompt 024 — Validate Runtime Setup and Run Controlled Postman/Newman Smoke Test

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 023 completed the Postman implementation.

Current state:

```text
LOGICAL TESTS:
122

EXECUTABLE LOGICAL TESTS:
114

BLOCKED LOGICAL TESTS:
8

POSTMAN EXECUTABLE TESTCASE UNITS:
114

HTTP REQUEST ITEMS:
148

SUPPORTING SETUP REQUESTS:
11

STATIC VALIDATION:
PASS
```

Prompt 023 result:

```text
READY_FOR_POSTMAN_EXECUTION_VALIDATION
```

No API or Newman execution has yet been performed.

---

# 1. Purpose

Validate that the Postman implementation can actually execute against the SUT before running the full 114-test Newman suite.

The transformation is:

```text
Statically valid Postman build
        ↓
Environment/runtime prerequisite validation
        ↓
Start / verify SUT
        ↓
Run supporting setup
        ↓
Run small controlled smoke subset
        ↓
Diagnose collection/setup defects
        ↓
READY_FOR_FULL_NEWMAN_EXECUTION
```

This prompt must:

1. verify local runtime prerequisites,
2. verify the SUT can be started/reached,
3. prepare a private runtime environment,
4. exercise essential setup flows,
5. execute only a small representative smoke subset,
6. verify runtime variable extraction,
7. verify `X-Student-Id` is actually sent,
8. identify collection/setup defects,
9. make only justified Postman implementation fixes,
10. produce smoke execution evidence.

Do NOT run the full 114-test suite.

Do NOT create GitHub Issues yet.

---

# 2. Authoritative Inputs

Use:

```text
eshop-sut/api_specification.md
eshop-sut/setup_guide.md

postman/README.md
postman/collections/HW06-API-Testing.postman_collection.json
postman/environments/HW06-local.postman_environment.json

postman/traceability/testcase-postman-matrix.md
postman/traceability/setup-postman-matrix.md
postman/traceability/blocked-tests.md

postman/validation/build-validation.md

postman-plan/execution-manifest.md
postman-plan/runtime-setup-manifest.md

test-data/runtime-data-catalog.md
test-data/postman-variable-plan.md
```

You may inspect SUT startup files only as needed to run the documented system.

Do not use implementation code to redefine testcase expected behavior.

---

# 3. Preserve Logical Test Design

Do not modify:

```text
analysis/current-selected-suite/test-case-design.md
```

Do not:

* change logical objectives,
* change testcase classification,
* change AI/HUMAN provenance,
* create new TC-API IDs,
* delete blocked tests.

Runtime failures are not automatically logical-test defects.

---

# 4. Runtime Prerequisite Audit

Check locally for required tools.

At minimum:

```text
node
npm
newman
```

Also check any SUT runtime prerequisites documented in:

```text
eshop-sut/setup_guide.md
```

Required table:

| Requirement | Available? | Version / State | Action |
| ----------- | ---------- | --------------- | ------ |

Allowed Action:

```text
NONE
USE_EXISTING
INSTALL_REQUIRED
CONFIG_REQUIRED
```

Do not silently make broad system-level modifications.

If Newman is unavailable but can safely be invoked through the project's existing Node/npm environment, use the least invasive supported approach.

Document exactly what was used.

---

# 5. SUT Startup

Start or verify the SUT strictly according to:

```text
eshop-sut/setup_guide.md
```

Do not modify business logic to make tests pass.

Record:

```text
startup command
expected base URL
process state
basic reachability
```

Do not yet execute the full API test suite.

---

# 6. Private Runtime Environment

The committed environment template intentionally contains no real secrets.

Create a local-only runtime copy if required.

Example conceptual path:

```text
postman/runtime/HW06-local.runtime.postman_environment.json
```

This runtime file must NOT be committed.

Ensure runtime/private environment files are ignored by Git.

Do not copy real secrets into:

```text
postman/environments/HW06-local.postman_environment.json
```

The committed template must remain secret-free.

---

# 7. Required Runtime Configuration

Validate the availability of values required for the smoke test, such as:

```text
base_url
student_id
```

and, where needed:

```text
admin_email
admin_password
```

plus any other private credential prerequisite already defined by the environment plan.

Do not invent missing private credentials.

Classify each:

```text
AVAILABLE
MISSING_OPTIONAL_FOR_SMOKE
MISSING_BLOCKS_FEATURE_SMOKE
```

Never print passwords/tokens into reports.

---

# 8. Student Header Runtime Validation

Static validation already showed:

```text
148 / 148 requests contain X-Student-Id
```

Prompt 024 must verify runtime behavior.

For smoke requests confirm that the outgoing request contains:

```text
X-Student-Id: {{student_id}}
```

resolved to a non-empty runtime value.

Do not expose the actual student identifier unnecessarily in reports.

Record:

```text
HEADER_PRESENT
HEADER_VALUE_NONEMPTY
```

not the private value itself.

---

# 9. Smoke-Test Philosophy

Do NOT run:

```text
114 executable logical tests
```

yet.

Select a small representative subset sufficient to validate:

* collection execution,
* setup chaining,
* authentication,
* runtime variables,
* GET requests,
* POST/PUT requests where feasible,
* exploratory logging,
* hard assertions,
* HUMAN_ADDED execution.

Target:

```text
6–9 logical testcase units
```

plus required setup requests.

---

# 10. Smoke Selection Rules

Select approximately:

```text
FR-02:
2–3 executable testcase units

FR-07:
2–3 executable testcase units

FR-18:
2–3 executable testcase units
```

Where possible, each feature subset should contain:

```text
one simple/representative request
one exploratory testcase
one runtime-setup-dependent testcase
```

At least one smoke testcase overall should be:

```text
HUMAN_ADDED
```

At least one should exercise:

```text
supported hard assertion behavior
```

where available.

Do not select any of the eight blocked tests.

---

# 11. Avoid Destructive Smoke Selection

Prefer tests with low destructive impact.

If a mutation is necessary to validate POST/PUT mechanics:

* use isolated/disposable runtime state where available,
* document the mutation,
* do not perform unnecessary repeated mutations.

Do not run high-volume/repeated-request robustness tests in the smoke phase.

For example, do not use the rate-control probe merely to validate that Newman works.

---

# 12. Smoke Selection Artifact

Create:

```text
postman/smoke/smoke-selection.md
```

Required table:

| Test ID | Feature | Origin | Execution Class | Why Selected | Required Setup |
| ------- | ------- | ------ | --------------- | ------------ | -------------- |

Also list setup requests separately.

---

# 13. Setup Smoke

Before testcase execution, validate required supporting flows.

Possible flows based on Prompt 023 include:

```text
normal-user registration/login
second-user setup
wrong-role user setup
admin authentication
existing-product discovery
existing-order discovery
```

Execute only those needed by the selected smoke tests.

Required result per setup:

```text
PASS
FAIL
BLOCKED_PRIVATE_PREREQUISITE
```

---

# 14. Setup Failure Discipline

If setup fails:

first determine whether the cause is:

```text
POSTMAN_IMPLEMENTATION_DEFECT
ENVIRONMENT_CONFIGURATION
SUT_STARTUP
PRIVATE_PREREQUISITE_MISSING
SPECIFICATION_LIMITATION
SUT_OBSERVED_BEHAVIOR
```

Do not immediately classify it as a SUT bug.

Do not alter requirements to make setup pass.

---

# 15. Runtime Variable Validation

After setup, inspect whether expected runtime variables are populated.

Examples may include:

```text
user_token
user_b_token
wrong_role_token
admin_token

existing_product_id

existing_order_id
current_order_status
```

depending on smoke scope.

Required table:

| Variable | Required by Smoke? | Populated? | Source Request | Secret? |
| -------- | ------------------ | ---------- | -------------- | ------- |

For secrets report only:

```text
POPULATED / EMPTY
```

Do not print actual values.

---

# 16. Newman Smoke Execution

Use Newman to execute only the selected smoke scope.

Do NOT run the full collection indiscriminately.

Use a defensible mechanism such as:

* temporary smoke collection derived from the canonical collection,
* folder-based Newman selection,
* another local filtering mechanism that preserves testcase semantics.

Do not manually duplicate/rewrite tests.

Document the exact command.

---

# 17. Smoke Reports

Create:

```text
reports/newman/smoke/
```

Capture:

```text
smoke-cli.txt
smoke-report.json
```

If an HTML reporter is already available and works without invasive setup:

```text
smoke-report.html
```

Otherwise record:

```text
HTML_REPORTER_NOT_AVAILABLE
```

Do not fail the entire smoke solely because optional HTML output is unavailable.

---

# 18. Console Observation Preservation

Exploratory tests already use:

```text
[OBS][TC-API-NNN]
```

Confirm these messages appear in Newman output where applicable.

Preserve non-sensitive observation output.

Do not dump:

* JWTs,
* passwords,
* private credentials.

---

# 19. Result Classification

For every smoke testcase use:

```text
PASS
FAIL_ASSERTION
FAIL_REQUEST
FAIL_SETUP
OBSERVED_EXPLORATORY
BLOCKED_RUNTIME_PREREQUISITE
```

Important:

```text
OBSERVED_EXPLORATORY
```

is not a test failure merely because no deterministic assertion exists.

---

# 20. Postman Implementation Defect Handling

If smoke exposes a defect in the generated Postman collection such as:

```text
wrong variable name
incorrect request body construction
incorrect setup chaining
missing runtime extraction
invalid script syntax
incorrect folder sequencing
```

you MAY fix the Postman implementation.

But:

* preserve the logical testcase,
* preserve Test ID,
* preserve objective,
* preserve origin,
* document before/after.

---

# 21. Allowed Files to Fix

If necessary, modify only relevant implementation artifacts such as:

```text
postman/collections/HW06-API-Testing.postman_collection.json
postman/environments/HW06-local.postman_environment.json
postman/README.md
postman/traceability/*
```

Do not modify canonical logical-test semantics.

---

# 22. Fix Log

Create:

```text
postman/smoke/smoke-fix-log.md
```

Required table:

| Fix ID | Problem | Root Cause | Artifact | Change | Logical Test Changed? |
| ------ | ------- | ---------- | -------- | ------ | --------------------- |

Expected:

```text
Logical Test Changed? = NO
```

for Postman implementation fixes.

---

# 23. Do Not Overfit to SUT Behavior

If actual SUT response differs from an exploratory expectation:

record the observation.

Do not modify Postman so that it asserts whatever the implementation happened to return.

Implementation behavior does not automatically become the specification.

---

# 24. Assertion Failure Classification

For a supported hard assertion that fails, classify:

```text
POTENTIAL_SUT_DEFECT
```

but do not create a bug report yet.

Prompt 026 will perform full triage.

For smoke stage, collect evidence only.

---

# 25. Request Failure Classification

Differentiate:

```text
CONNECTION_FAILURE
REQUEST_BUILD_FAILURE
AUTH_SETUP_FAILURE
RESOURCE_SETUP_FAILURE
SUT_RESPONSE_FAILURE
```

Do not combine all under generic "failed".

---

# 26. Smoke Evidence

Create:

```text
evidence/smoke/
```

Only store genuine generated evidence.

Possible artifacts:

```text
runtime-summary.md
request-header-validation.md
smoke-result-summary.md
```

Do not fabricate screenshots.

Do not require screenshots unless useful.

---

# 27. Header Evidence

Create:

```text
evidence/smoke/request-header-validation.md
```

Document that representative executed requests contained a resolved non-empty:

```text
X-Student-Id
```

Redact the actual value.

---

# 28. Runtime Summary

Create:

```text
evidence/smoke/runtime-summary.md
```

Include:

```text
SUT started/reachable
base URL configured
Newman available
runtime environment used
private prerequisites availability
setup flows attempted
runtime variables populated
```

Do not include secrets.

---

# 29. Smoke Result Summary

Create:

```text
evidence/smoke/smoke-result-summary.md
```

Required table:

| Test ID | Feature | Origin | Result | HTTP Status Observed | Assertions | Notes |
| ------- | ------- | ------ | ------ | -------------------- | ---------- | ----- |

HTTP status is an observed runtime fact here, not automatically a specification oracle.

---

# 30. Re-run Static Validator After Fixes

If Prompt 024 changes the Postman collection:

rerun:

```bash
node postman/validation/validate-postman-build.js
```

Final result must remain:

```text
PASS
```

If no Postman file changes occurred, still record that previous static validation remains valid.

---

# 31. Smoke Re-run

If implementation defects are fixed:

rerun only the necessary affected smoke scope.

Do not repeatedly run unrelated testcases.

Final smoke evidence must distinguish:

```text
INITIAL_RUN
FINAL_VALIDATION_RUN
```

where applicable.

---

# 32. Full-Suite Gate

Report:

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```

only if:

1. SUT is reachable,
2. essential collection runtime logic works,
3. core setup chaining works for executable feature scope,
4. no unresolved collection syntax/runtime defect remains,
5. student header resolves correctly,
6. static validator remains PASS,
7. any missing private prerequisite is explicitly understood and does not make the planned full run misleading.

Otherwise:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

---

# 33. Private Admin Credential Case

If FR-18 requires private admin credentials not available in the current local environment:

do not fabricate them.

Report:

```text
FR18_RUNTIME_PREREQUISITE_MISSING
```

and distinguish this from a Postman collection defect.

If this prevents meaningful FR-18 execution, final readiness may remain:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

until the prerequisite is locally supplied.

---

# 34. No Full Execution Yet

Do not execute all:

```text
114
```

executable testcase units.

Prompt 025 is reserved for the controlled full Newman run.

---

# 35. No Bug Filing Yet

Do not:

* create GitHub Issues,
* write final bug reports,
* claim confirmed defects.

Use:

```text
POTENTIAL_SUT_DEFECT
```

only as a triage marker.

---

# 36. Quality Validation

Required:

| Check                               | Expected |
| ----------------------------------- | -------- |
| Full 114-test suite executed        | NO       |
| Smoke logical tests                 | 6–9      |
| Blocked test executed               | 0        |
| Student header verified at runtime  | PASS     |
| Real secrets committed              | 0        |
| Runtime secrets exposed in reports  | 0        |
| Static validator after fixes        | PASS     |
| Logical testcase semantics modified | 0        |
| New TC-API IDs                      | 0        |
| GitHub bugs filed                   | 0        |

---

# 37. Current Progress Artifact

Create:

```text
reports/newman/smoke/smoke-execution-summary.md
```

Include:

```text
smoke scope
setup results
test results
Postman fixes
potential SUT defects
remaining runtime prerequisites
full-suite readiness
```

---

# 38. Required Final Response Structure

Use exactly:

# Prompt 024 — Validate Runtime Setup and Run Controlled Smoke Test

## 1. Executive Summary

Include:

* SUT runtime state,
* smoke testcase count,
* smoke request count,
* setup results,
* testcase results,
* implementation fixes,
* potential SUT defects,
* full-suite readiness.

## 2. Runtime Prerequisite Audit

## 3. SUT Startup and Reachability

## 4. Runtime Environment

## 5. X-Student-Id Runtime Validation

## 6. Smoke Test Selection

## 7. Setup Execution

## 8. Runtime Variable Validation

## 9. Newman Smoke Execution

## 10. FR-02 Smoke Results

## 11. FR-07 Smoke Results

## 12. FR-18 Smoke Results

## 13. Exploratory Observation Results

## 14. Hard Assertion Results

## 15. Postman Implementation Defects

## 16. Fixes Applied

## 17. Potential SUT Defects

## 18. Evidence Generated

## 19. Static Revalidation

## 20. Remaining Runtime Prerequisites

## 21. Quality Validation

## 22. Full Newman Execution Readiness

Use exactly one:

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```

or:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

## 23. Current Project Status

Use:

```text
LOGICAL TEST DESIGN:
122 — COMPLETE

POSTMAN BUILD:
COMPLETE

POSTMAN STATIC VALIDATION:
PASS

SMOKE EXECUTION:
COMPLETE

FULL NEWMAN EXECUTION:
NOT STARTED
```

## 24. Machine-Usable Summary

End exactly:

```text
PROMPT_024_SUMMARY

SUT reachable:
YES / NO

Newman available:
YES / NO

Smoke logical tests:

Smoke HTTP requests:

Smoke setup requests:

Smoke results:
PASS:
OBSERVED_EXPLORATORY:
FAIL_ASSERTION:
FAIL_REQUEST:
FAIL_SETUP:
BLOCKED_RUNTIME_PREREQUISITE:

FR-02 smoke:
EXECUTED:
SUCCESSFUL:
FAILED:

FR-07 smoke:
EXECUTED:
SUCCESSFUL:
FAILED:

FR-18 smoke:
EXECUTED:
SUCCESSFUL:
FAILED:

X-Student-Id runtime verification:
PASS / FAIL

Postman implementation defects found:

Postman implementation defects fixed:

Potential SUT defects:

Runtime prerequisites still missing:

Static validator:
PASS / FAIL

Full 114-test suite executed:
NO

Readiness:
READY_FOR_FULL_NEWMAN_EXECUTION / NOT_READY_FOR_FULL_NEWMAN_EXECUTION

Next required prompt if ready:
PROMPT 025 — RUN FULL NEWMAN EXECUTION AND COLLECT EVIDENCE

Next required action if not ready:
RESOLVE IDENTIFIED RUNTIME / POSTMAN PREREQUISITES
```

---

# 39. Output Artifacts

Create:

```text
postman/smoke/smoke-selection.md
postman/smoke/smoke-fix-log.md

reports/newman/smoke/smoke-cli.txt
reports/newman/smoke/smoke-report.json
reports/newman/smoke/smoke-execution-summary.md
```

Optional if available:

```text
reports/newman/smoke/smoke-report.html
```

Create genuine evidence:

```text
evidence/smoke/runtime-summary.md
evidence/smoke/request-header-validation.md
evidence/smoke/smoke-result-summary.md
```

Update implementation files only if a genuine Postman defect is discovered.

Log:

```text
prompts/Prompt-024-postman-controlled-smoke-validation.md
```

Append exactly one Prompt 024 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–023 historical prompt contents.

---

# 40. Final Constraints

* Smoke only 6–9 logical testcase units.
* Do not run all 114 tests.
* Execute zero blocked logical tests.
* Do not fabricate credentials.
* Do not commit private runtime environment values.
* Do not expose tokens/passwords in reports.
* Do not modify logical testcase objectives.
* Do not generate new logical tests.
* Do not create new TC-API IDs.
* Do not turn exploratory observations into hard assertions.
* Do not treat every runtime mismatch as a SUT bug.
* Do not fix SUT business logic.
* Do not file GitHub Issues yet.
* Preserve X-Student-Id on every executed request.
* Re-run static validation after Postman implementation fixes.
* Preserve genuine runtime evidence only.

The objective is:

**Statically Valid Postman Build → Small Real Smoke → Confident Full-Run Gate**

not:

**Run everything before confirming the execution harness works**.
