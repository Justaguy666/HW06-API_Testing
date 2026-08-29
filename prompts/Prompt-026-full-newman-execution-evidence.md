# Prompt 026 — Run Full Newman Execution and Collect Authoritative Evidence

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 025 resolved the final runtime prerequisite.

Current project state:

```text id="nxnud5"
LOGICAL TESTS:
122

EXECUTABLE LOGICAL TESTS:
114

CANONICAL BLOCKED LOGICAL TESTS:
8

POSTMAN BUILD:
COMPLETE

STATIC VALIDATION:
PASS

CONTROLLED SMOKE:
COMPLETE

ADMIN PREREQUISITE:
RESOLVED

FULL NEWMAN EXECUTION:
NOT STARTED
```

Current gate:

```text id="3xuatt"
READY_FOR_FULL_NEWMAN_EXECUTION
```

The eight logical tests that remain intentionally non-executable are:

```text id="zf23cl"
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

They must NOT be executed.

---

# 1. Purpose

Perform the first authoritative full Newman execution of the complete executable API suite and collect reproducible, redacted evidence.

The transformation is:

```text id="jhu64l"
114 executable logical tests
        ↓
Controlled runtime preparation
        ↓
Full Newman execution
        ↓
Raw execution evidence
        ↓
Logical-test-level aggregation
        ↓
Failure candidates
        ↓
READY_FOR_EXECUTION_TRIAGE
```

This prompt must:

1. verify the runtime gate remains valid,
2. prepare a clean-enough execution context,
3. execute all 114 executable testcase units,
4. execute zero canonical blocked tests,
5. retain the first full run as authoritative evidence,
6. aggregate raw Newman request/assertion results to logical testcase IDs,
7. distinguish exploratory observations from hard failures,
8. capture setup/runtime failures separately,
9. redact sensitive evidence,
10. identify failure candidates for Prompt 027.

Do NOT file bugs yet.

Do NOT change expected behavior merely to make Newman pass.

---

# 2. Authoritative Inputs

Use:

```text id="d3nlzq"
postman/collections/HW06-API-Testing.postman_collection.json
postman/environments/HW06-local.postman_environment.json

postman/traceability/testcase-postman-matrix.md
postman/traceability/setup-postman-matrix.md
postman/traceability/blocked-tests.md

postman-plan/execution-manifest.md
postman-plan/runtime-setup-manifest.md
postman-plan/blocked-test-register.md

test-data/testcase-data-matrix.md
test-data/runtime-data-catalog.md

postman/validation/build-validation.md

evidence/smoke/runtime-summary.md
evidence/smoke/admin-prerequisite-resolution.md
reports/newman/smoke/smoke-execution-summary.md
```

Use the private ignored runtime environment:

```text id="0xwe75"
postman/runtime/HW06-local.runtime.postman_environment.json
```

Do not commit it.

---

# 3. Preserve Logical Scope

The authoritative logical suite remains:

```text id="6103lb"
122 tests
```

Execution scope remains:

```text id="8orbt6"
114 executable
8 blocked
```

Do not:

* remove failing tests,
* add replacement tests,
* renumber IDs,
* change AI/HUMAN origin,
* reactivate blocked tests.

---

# 4. Pre-Run Static Gate

Before execution run:

```bash id="1ylvrj"
node postman/validation/validate-postman-build.js
```

Required:

```text id="sqfk7r"
PASS
```

If it fails:

do NOT full-run Newman.

Report:

```text id="h7tlzz"
FULL_RUN_ABORTED_STATIC_VALIDATION_FAILURE
```

and stop.

---

# 5. Runtime Tool Gate

Confirm:

```text id="17i2op"
SUT reachable
Newman available
runtime environment exists
base_url populated
student_id populated
legitimate admin fixture available
```

Do not print private values.

Required result for each:

```text id="8kqkga"
PASS
```

---

# 6. Runtime State Policy

The full run may mutate:

* generated users,
* Cart state,
* order state,
* login-attempt state.

Before running, record the current runtime state at a high level.

Do not manually rewrite business state merely to make tests pass.

Prefer:

```text id="ma96gq"
fresh generated identities
+
runtime-discovered resources
+
sequence-local state
```

where already designed.

---

# 7. Database Reset Decision

Do NOT automatically reset the database.

Reset only if:

```text id="7454nl"
the canonical runtime/setup strategy requires clean initialization
```

and doing so is necessary for reproducibility.

If no reset is needed:

```text id="i8ie88"
DATABASE_RESET:
NO
```

If reset is required:

* use the documented initialization procedure,
* preserve a private backup,
* never commit DB backup,
* do not alter seed/business source.

---

# 8. Authoritative Run Principle

The first complete full-suite execution must be preserved as:

```text id="qexmqi"
AUTHORITATIVE_INITIAL_FULL_RUN
```

Do NOT delete or overwrite it because failures occur.

This run is evidence.

---

# 9. Newman Execution Scope

Execute:

```text id="vqf7zh"
all 114 executable logical testcase units
```

including all required setup requests and multi-step sequence requests.

Execute:

```text id="zu518q"
zero
```

of the eight canonical blocked testcase units.

---

# 10. Full Newman Command

Use Newman against:

```text id="oo2u1z"
postman/collections/HW06-API-Testing.postman_collection.json
```

with:

```text id="lp6otv"
postman/runtime/HW06-local.runtime.postman_environment.json
```

Use reporters sufficient to produce:

```text id="s0jarl"
CLI
JSON
```

and HTML when already available.

Document the exact command.

Do not expose private environment contents.

---

# 11. HTML Reporter

If a compatible HTML reporter is available:

produce:

```text id="oxogq5"
full-report.html
```

If unavailable:

record:

```text id="ik8wso"
HTML_REPORTER_NOT_AVAILABLE
```

Do not install unrelated or invasive tooling simply to generate HTML.

If assignment explicitly requires an HTML Newman report and a standard compatible reporter can be installed locally through npm with no project-runtime impact, document the installation separately before use.

---

# 12. Full Report Directory

Create:

```text id="rnxg31"
reports/newman/full/
```

Required:

```text id="tj7o3u"
authoritative-cli.txt
authoritative-report.json
authoritative-execution-summary.md
```

Optional:

```text id="wllhzu"
authoritative-report.html
```

Do not overwrite smoke reports.

---

# 13. Exit Code

Record Newman exit code exactly.

Do not assume:

```text id="9j3jq8"
non-zero = SUT bug
```

Non-zero may mean:

* hard assertion failure,
* setup failure,
* request failure,
* Postman script defect.

---

# 14. Capture Newman Raw Counts

Record:

```text id="9miav1"
iterations
requests
request failures
test scripts
assertions
assertion failures
skipped requests if any
total duration
```

Use actual Newman output.

Do not infer logical testcase pass count from request count.

---

# 15. Logical-Test-Level Aggregation

Because:

```text id="h86b07"
114 logical testcase units
≠
number of HTTP requests
```

create an analyzer that maps Newman execution records to canonical `TC-API-*`.

Create:

```text id="izvsa9"
postman/analysis/analyze-full-newman-run.js
```

The script must read:

```text id="1eck61"
authoritative-report.json
+
testcase-postman-matrix.md or collection metadata
```

and produce logical-test-level results.

No network calls.

---

# 16. Logical Result Classes

Every one of the 114 executable logical tests must receive one final initial-run class:

```text id="nla75n"
PASS
OBSERVED_EXPLORATORY
FAIL_ASSERTION
FAIL_REQUEST
FAIL_SETUP
INCOMPLETE_SEQUENCE
BLOCKED_RUNTIME_PREREQUISITE
```

Definitions:

### PASS

All supported deterministic assertions and required requests succeeded.

### OBSERVED_EXPLORATORY

The exploratory testcase executed sufficiently to capture its intended observations and has no supported hard assertion failure.

### FAIL_ASSERTION

At least one supported hard assertion failed.

### FAIL_REQUEST

Required request could not complete normally.

### FAIL_SETUP

The logical testcase could not execute because its runtime setup failed.

### INCOMPLETE_SEQUENCE

Only part of a multi-request logical testcase executed successfully.

### BLOCKED_RUNTIME_PREREQUISITE

A prerequisite unexpectedly became unavailable during full execution.

---

# 17. Exploratory Tests Are Not Failures

Do not count:

```text id="57usxk"
OBSERVED_EXPLORATORY
```

as failure solely because there is no deterministic semantic assertion.

They are successful exploratory executions.

---

# 18. Hard Assertion Failures

Any `pm.test()` assertion representing a verified hard oracle that fails must be retained as:

```text id="0c8qks"
FAIL_ASSERTION
```

Do not weaken/delete the assertion during Prompt 026.

Flag for Prompt 027.

---

# 19. Setup Failure

If a setup request fails:

identify all affected logical tests.

Do not classify every downstream request independently as a SUT defect.

Record:

```text id="ymyi1x"
ROOT_SETUP_FAILURE
```

and dependency impact.

---

# 20. Sequence Failure

For a testcase with multiple steps, distinguish:

```text id="0a6jxe"
STEP_1_PASS
STEP_2_FAIL
STEP_3_NOT_RUN
```

from a simple request failure.

The logical result may become:

```text id="2rfzej"
INCOMPLETE_SEQUENCE
```

---

# 21. Request-Level Result Artifact

Create:

```text id="o4928h"
reports/newman/full/request-level-results.md
```

Required columns:

| Request | Parent Test ID | Feature | HTTP Status | Newman Error | Assertion Failures | Execution Time |
| ------- | -------------- | ------- | ----------: | ------------ | -----------------: | -------------: |

Redact sensitive output.

---

# 22. Logical-Level Result Artifact

Create:

```text id="4a04t5"
reports/newman/full/logical-test-results.md
```

Exactly:

```text id="xlvoz6"
114 rows
```

Columns:

| Test ID | Feature | Origin | Execution Class | Logical Result | Request Count | Assertion Failures | Primary Observation / Failure |
| ------- | ------- | ------ | --------------- | -------------- | ------------: | -----------------: | ----------------------------- |

---

# 23. Feature Summary

Required:

| Feature | Planned Executable | PASS | OBSERVED | Assertion Fail | Request Fail | Setup Fail | Incomplete |
| ------- | -----------------: | ---: | -------: | -------------: | -----------: | ---------: | ---------: |
| FR-02   |                 39 |      |          |                |              |            |            |
| FR-07   |                 40 |      |          |                |              |            |            |
| FR-18   |                 35 |      |          |                |              |            |            |
| TOTAL   |                114 |      |          |                |              |            |            |

---

# 24. Origin Summary

Required:

| Origin       | Executable | Successful / Observed | Failed |
| ------------ | ---------: | --------------------: | -----: |
| AI_GENERATED |         98 |                       |        |
| HUMAN_ADDED  |         16 |                       |        |
| TOTAL        |        114 |                       |        |

Do not merge provenance.

---

# 25. Blocked-Test Validation

Verify none of:

```text id="9tw5ad"
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

appeared as executable testcase units in the Newman run.

Required:

```text id="q9lwl7"
CANONICAL_BLOCKED_TESTS_EXECUTED = 0
```

---

# 26. X-Student-Id Runtime Audit

Validate actual executed requests.

Required:

```text id="t6ds5n"
executed HTTP requests missing X-Student-Id:
0
```

Also verify resolved values were non-empty.

Redact actual identifier.

---

# 27. Sensitive Data Audit

Scan retained reports for:

```text id="iql58b"
passwords
admin credential
JWT-like values
Authorization bearer values
student identifier
refresh tokens
```

Produce redacted artifacts.

If raw JSON contains secrets:

retain a sanitized copy for Git and remove/ignore private-bearing raw copy.

Do not destroy the ability to prove execution counts.

---

# 28. Authoritative Evidence Directory

Create:

```text id="512pe7"
evidence/full-run/
```

Required:

```text id="2zmds7"
runtime-context.md
student-header-validation.md
full-run-result-summary.md
failure-candidates.md
```

Only genuine runtime evidence.

---

# 29. Runtime Context

`runtime-context.md` should record:

```text id="7lxnp1"
date/time
SUT base URL
backend state
Newman version
Node version
database reset YES/NO
runtime fixture strategy
admin prerequisite state
collection path
environment path — private path only, no contents
```

---

# 30. Student Header Evidence

Create:

```text id="cmv632"
evidence/full-run/student-header-validation.md
```

Report:

```text id="7rrd6q"
executed requests checked:
N

missing header:
0

empty resolved header:
0

actual identifier:
REDACTED
```

---

# 31. Full Run Result Summary

Create:

```text id="afvw1z"
evidence/full-run/full-run-result-summary.md
```

Include:

* raw Newman counts,
* logical testcase counts,
* feature counts,
* origins,
* assertion failures,
* request/setup failures,
* exploratory successes,
* blocked logical tests excluded.

---

# 32. Failure Candidate Register

Create:

```text id="m0s75i"
evidence/full-run/failure-candidates.md
```

For every non-successful logical testcase:

| Candidate ID | Test ID | Symptom | Result Class | Potential Category | Needs Prompt 027 Triage? |
| ------------ | ------- | ------- | ------------ | ------------------ | ------------------------ |

Potential Category:

```text id="3jvqyb"
SUT_BEHAVIOR
POSTMAN_IMPLEMENTATION
TEST_DATA
SETUP_STATE
SPEC_AMBIGUITY
DOCUMENTATION
ENVIRONMENT
UNKNOWN
```

Do not decide final bug status yet.

---

# 33. Documentation Defect Candidate

Carry forward the Prompt 025 issue:

```text id="blni6e"
Admin credential conflict:
setup_guide.md vs README.md
```

Add it to `failure-candidates.md` as:

```text id="vz887e"
DOCUMENTATION_CANDIDATE
```

even if it does not cause failure in the authoritative run.

Do not file GitHub issue yet.

---

# 34. No Immediate Test Fixing

During the authoritative initial full run:

do not alter collection scripts simply because a testcase fails.

First preserve:

```text id="4qcr80"
AUTHORITATIVE_INITIAL_FULL_RUN
```

All fixes/triage happen afterward.

---

# 35. Catastrophic Harness Failure Exception

If the full run cannot meaningfully proceed because of a catastrophic harness defect such as:

```text id="ixfggp"
collection JSON corruption
global script syntax error
every auth setup broken
runtime environment unreadable
```

preserve the failed attempt.

Do not masquerade it as an authoritative product execution.

Report:

```text id="ekgguk"
FULL_RUN_HARNESS_ABORT
```

and defer correction to Prompt 027.

---

# 36. Targeted Diagnostic Reruns

After the authoritative full run, you MAY perform narrowly targeted reruns only to collect diagnosis evidence.

Rules:

```text id="x1fbnr"
do not overwrite authoritative run
do not use rerun to hide initial failure
do not modify expected assertions
```

Store separately:

```text id="289o25"
reports/newman/full/diagnostic/
```

---

# 37. No Final Bug Classification

Prompt 026 may say:

```text id="0fcs4f"
FAILURE_CANDIDATE
```

or:

```text id="apz7z7"
POTENTIAL_SUT_DEFECT
```

but must NOT declare:

```text id="ha2zr6"
CONFIRMED_BUG
```

Prompt 027 owns triage.

---

# 38. No GitHub Issues Yet

Do not create GitHub Issues.

Do not write final defect reports.

---

# 39. Execution Success Rate

Calculate two distinct metrics:

### Raw successful execution rate

```text id="cwo1d0"
(PASS + OBSERVED_EXPLORATORY) / 114
```

### Hard-oracle pass rate

Among tests with supported hard assertions:

```text id="rwthh7"
hard assertion tests with no failure
/
hard assertion tests executed
```

Do not combine them.

---

# 40. Setup Reliability

Report:

```text id="3ragd4"
setup requests executed
setup failures
setup success rate
```

A setup failure should be separately visible.

---

# 41. HTTP Observation Summary

For exploratory research value, summarize observed status distributions by feature.

Example table:

| Feature | 2xx | 4xx | 5xx | Network/Other |
| ------- | --: | --: | --: | ------------: |

This is observational.

Do not turn frequency into a requirement oracle.

---

# 42. Server Error Signal

Any observed:

```text id="rpbgvh"
HTTP 5xx
```

should be highlighted for Prompt 027 triage.

Do not automatically classify every 5xx as a confirmed bug because malformed-input robustness probes may expose unspecified behavior, but mark it high priority.

---

# 43. Newman Exit Code Interpretation

Report exact exit code and explain:

```text id="4erm9t"
0:
no Newman hard failure

non-zero:
one or more request/assertion/script failures
```

Do not equate non-zero directly with assignment failure.

---

# 44. Update Execution Traceability

Update:

```text id="x72qg2"
postman/traceability/testcase-postman-matrix.md
```

with an execution result column only if doing so does not destroy historical planning data.

Prefer append-only or separate:

```text id="5yp9cf"
Execution Result
Authoritative Run
```

Preserve original plan.

---

# 45. Runtime DB Dirty-State Note

After execution, record whether the local DB was mutated.

Do not commit runtime database changes as evidence unless explicitly required.

If `eshop-sut/backend/database.sqlite` is tracked and modified:

do not stage it.

Record:

```text id="gxds4l"
RUNTIME_DB_DIRTY:
YES / NO
```

---

# 46. Git Safety

Run:

```bash id="d9qu4h"
git status
```

Ensure no:

* runtime environment,
* database backup,
* secret-bearing report,
* token dump

is staged.

---

# 47. Full Execution Readiness for Triage

At the end report:

```text id="v7hgn8"
READY_FOR_EXECUTION_TRIAGE
```

when:

```text id="tpjvr2"
authoritative run captured
114 logical tests accounted
8 blocked tests excluded
raw counts available
logical aggregation complete
failure candidates enumerated
secrets sanitized
```

This does not require all 114 tests to pass.

---

# 48. Required Final Response Structure

Use exactly:

# Prompt 026 — Full Newman Execution and Evidence Collection

## 1. Executive Summary

Include:

* Newman exit code,
* logical tests executed,
* PASS,
* OBSERVED_EXPLORATORY,
* failures by class,
* raw request/assertion totals,
* failure candidate count,
* triage readiness.

## 2. Pre-Run Gate

## 3. Runtime Context

## 4. Authoritative Newman Command

## 5. Raw Newman Results

## 6. Logical-Test Aggregation

## 7. FR-02 Results

## 8. FR-07 Results

## 9. FR-18 Results

## 10. AI_GENERATED vs HUMAN_ADDED Results

## 11. Hard Assertion Results

## 12. Exploratory Results

## 13. Setup Reliability

## 14. HTTP Observation Distribution

## 15. Request / Assertion Failures

## 16. Sequence Failures

## 17. Blocked-Test Exclusion Validation

## 18. X-Student-Id Runtime Validation

## 19. Sensitive-Data Audit

## 20. Failure Candidate Register

## 21. Documentation Candidate

## 22. Diagnostic Reruns

If none:

```text id="4bsf0r"
NONE
```

## 23. Runtime Database State

## 24. Evidence Generated

## 25. Quality Validation

## 26. Execution Triage Readiness

Use:

```text id="ja001k"
READY_FOR_EXECUTION_TRIAGE
```

or:

```text id="y9fdjo"
NOT_READY_FOR_EXECUTION_TRIAGE
```

## 27. Current Project Status

Use:

```text id="nu86dw"
LOGICAL TEST DESIGN:
122 — COMPLETE

POSTMAN BUILD:
COMPLETE

SMOKE:
COMPLETE

FULL EXECUTION:
COMPLETE

FAILURE TRIAGE:
NOT STARTED

BUG REPORTING:
NOT STARTED
```

## 28. Machine-Usable Summary

End exactly:

```text id="a4ecxm"
PROMPT_026_SUMMARY

Newman exit code:

Logical executable tests planned:
114

Logical tests accounted:
114

Logical results:
PASS:
OBSERVED_EXPLORATORY:
FAIL_ASSERTION:
FAIL_REQUEST:
FAIL_SETUP:
INCOMPLETE_SEQUENCE:
BLOCKED_RUNTIME_PREREQUISITE:

Successful/observed total:

Execution success rate:

Raw Newman:
Iterations:
Requests:
Request failures:
Assertions:
Assertion failures:

Setup:
Requests:
Failures:

Feature results:

FR-02:
PLANNED: 39
PASS:
OBSERVED:
FAILED:

FR-07:
PLANNED: 40
PASS:
OBSERVED:
FAILED:

FR-18:
PLANNED: 35
PASS:
OBSERVED:
FAILED:

Origin results:

AI_GENERATED:
PLANNED: 98
SUCCESSFUL_OR_OBSERVED:
FAILED:

HUMAN_ADDED:
PLANNED: 16
SUCCESSFUL_OR_OBSERVED:
FAILED:

Canonical blocked tests executed:
0

Executed requests missing X-Student-Id:

Executed requests with empty X-Student-Id:

HTTP 5xx observed:

Failure candidates:

Documentation candidates:

Private secrets retained:
0

RUNTIME_DB_DIRTY:
YES / NO

Authoritative full run:
CAPTURED

Readiness:
READY_FOR_EXECUTION_TRIAGE / NOT_READY_FOR_EXECUTION_TRIAGE

Next required prompt:
PROMPT 027 — TRIAGE NEWMAN FAILURES AND CLASSIFY GENUINE DEFECTS
```

---

# 49. Output Artifacts

Create:

```text id="jkk8ru"
reports/newman/full/authoritative-cli.txt
reports/newman/full/authoritative-report.json
reports/newman/full/authoritative-execution-summary.md
reports/newman/full/request-level-results.md
reports/newman/full/logical-test-results.md
```

Optional:

```text id="q0n1e3"
reports/newman/full/authoritative-report.html
```

Create:

```text id="97ylq6"
postman/analysis/analyze-full-newman-run.js
```

Create evidence:

```text id="p41tcl"
evidence/full-run/runtime-context.md
evidence/full-run/student-header-validation.md
evidence/full-run/full-run-result-summary.md
evidence/full-run/failure-candidates.md
```

Update traceability only if appropriate:

```text id="c0hhu7"
postman/traceability/testcase-postman-matrix.md
```

Log:

```text id="q48u46"
prompts/Prompt-026-full-newman-execution-evidence.md
```

Append exactly one Prompt 026 entry to:

```text id="8pqsdx"
prompts/prompt-log.md
```

Do not modify Prompt 001–025 historical prompt contents.

---

# 50. Final Constraints

* Execute all 114 executable logical testcase units.
* Execute zero canonical blocked testcase units.
* Preserve the first complete run as authoritative.
* Do not remove failing assertions.
* Do not change testcase expectations to fit implementation.
* Do not classify failures as confirmed bugs yet.
* Do not file GitHub Issues.
* Do not expose private credentials/tokens/student ID.
* Do not commit private runtime environment.
* Do not stage runtime-mutated SQLite DB.
* Preserve AI/HUMAN provenance.
* Aggregate results at logical-test level, not only request level.
* Exploratory observations are not failures.
* Highlight 5xx, assertion failures, setup failures, and sequence failures for triage.
* Preserve Admin documentation mismatch as a separate candidate.
* No new TC-API IDs.

The objective is:

**114 Executable Tests → One Authoritative Full Newman Run → Reliable Triage Evidence**

not:

**Force a green Newman run**.
