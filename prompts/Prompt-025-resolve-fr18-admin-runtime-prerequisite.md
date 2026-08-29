# Prompt 025 — Resolve FR-18 Admin Runtime Prerequisite and Complete Smoke Gate

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 024 completed controlled smoke validation.

Current smoke result:

```text
SUT reachable:
YES

Newman available:
YES

Smoke logical tests:
9

Results:
PASS = 3
OBSERVED_EXPLORATORY = 4
BLOCKED_RUNTIME_PREREQUISITE = 2

Postman implementation defects:
0

Potential confirmed SUT defects:
0

Static validator:
PASS
```

The only unresolved runtime prerequisite is:

```text
VALID LOCAL ADMIN CREDENTIAL
```

Affected FR-18 smoke tests:

```text
TC-API-046
TC-API-179
```

The admin setup attempts observed:

```text
credential documented in setup guide:
HTTP 401

alternate credential documented in SUT README:
HTTP 403
```

`TC-API-048` already passed its supported unauthenticated-access assertion and does not require a valid Admin token.

Current gate:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

---

# 1. Purpose

Resolve the FR-18 Admin authentication runtime prerequisite without inventing credentials or modifying business logic.

The transformation is:

```text
Admin authentication unavailable
        ↓
Runtime fixture / documentation diagnosis
        ↓
Establish legitimate local Admin identity
        ↓
Targeted Admin setup retry
        ↓
Re-run only affected FR-18 smoke tests
        ↓
READY_FOR_FULL_NEWMAN_EXECUTION
```

This prompt must:

1. determine why documented Admin credentials fail,
2. distinguish dirty runtime state from stale documentation,
3. establish a legitimate Admin credential only through defensible local setup,
4. populate `admin_token`,
5. rerun only the affected Admin smoke scope,
6. preserve all existing logical tests,
7. preserve all previous smoke evidence,
8. determine whether the full Newman gate can now open.

Do NOT run the full 114-test suite.

---

# 2. Authoritative Runtime Sources

Inspect:

```text
eshop-sut/setup_guide.md
eshop-sut/README.md
eshop-sut/api_specification.md
```

For runtime-fixture diagnosis only, you MAY also inspect:

```text
eshop-sut/backend/package.json
eshop-sut/backend/database.js
eshop-sut/backend/server.js
```

and the local SQLite database.

Important:

```text
Implementation / seed code may be used to understand
LOCAL TEST FIXTURE PROVISIONING.

It must NOT be used as requirement authority or to
invent testcase expected results.
```

---

# 3. Existing Evidence

Use:

```text
evidence/smoke/runtime-summary.md
evidence/smoke/request-header-validation.md
evidence/smoke/smoke-result-summary.md

reports/newman/smoke/smoke-report.json
reports/newman/smoke/smoke-execution-summary.md

postman/smoke/smoke-selection.md
postman/smoke/smoke-fix-log.md

postman-plan/runtime-setup-manifest.md
```

Do not overwrite Prompt 024 evidence.

---

# 4. Preserve Existing Runtime Success

Do not rerun unrelated FR-02 or FR-07 smoke cases unless necessary to verify that a deliberate database reset did not break fundamental runtime setup.

Existing successful smoke evidence remains valid.

---

# 5. Admin Credential Diagnostic Order

Use this order exactly.

## Step A — Documentation comparison

Compare every explicit Admin credential/reference found in:

```text
setup_guide.md
README.md
```

Record:

* documented identifier/email,
* documented role,
* whether password is explicitly supplied,
* source file,
* whether sources disagree.

Do not print passwords in the final report.

Use:

```text
DOCUMENTED_CREDENTIAL_A
DOCUMENTED_CREDENTIAL_B
```

or similar redacted labels.

---

# 6. Step B — Read-Only Database Identity Inspection

Inspect the current SQLite database read-only.

Determine:

* whether an Admin account exists,
* its non-secret identifier/email if safe,
* its role,
* active/disabled/locked state where explicitly represented,
* whether multiple Admin accounts exist.

Do NOT expose:

* password hash,
* refresh token,
* JWT,
* private secret.

Required table:

| Admin Fixture | Exists? | Role | Account State | Credential Source Match? |
| ------------- | ------- | ---- | ------------- | ------------------------ |

Do not attempt password cracking.

Do not brute force credentials.

---

# 7. Step C — Seed / Fixture Inspection

Inspect local seed/bootstrap logic only to answer:

```text
What Admin fixture is the SUT intended to create locally?
```

Record:

* seed Admin identity,
* whether creation occurs only on first DB initialization,
* whether existing database state prevents reseeding,
* whether documented credential appears consistent with seed logic.

Again:

```text
DO NOT report plaintext secrets.
```

If source contains a literal development password, classify it as:

```text
LOCAL_TEST_FIXTURE_SECRET
```

and redact it from committed evidence.

It may be placed only into the ignored private runtime environment when necessary for the local test.

---

# 8. Determine Root Cause

Classify the Admin setup issue into exactly one primary category:

```text
DIRTY_RUNTIME_DATABASE
DOCUMENTATION_MISMATCH
SEED_FIXTURE_MISMATCH
ACCOUNT_STATE_PROBLEM
POSTMAN_SETUP_DEFECT
UNKNOWN_RUNTIME_PREREQUISITE
```

Required reasoning must be evidence-based.

---

# 9. Dirty Database Check

Prompt 024 noted that the database became runtime-dirty from startup/smoke operations.

Determine whether the Admin credential problem may have existed because:

```text
an old database.sqlite was reused
```

instead of a clean seeded fixture.

Do not immediately delete the database.

---

# 10. Safe Database Reset Policy

If a clean database reset is necessary:

1. stop the backend cleanly,
2. record `git status`,
3. make a private backup of the current runtime SQLite file outside tracked artifacts,
4. identify the canonical clean initialization procedure,
5. reset/reinitialize only runtime database state,
6. restart the backend,
7. verify the seed fixture,
8. never commit the runtime-mutated database.

Do not modify:

```text
database.js
server.js
```

to force authentication.

Do not alter password hashes manually.

Do not promote a normal user to Admin via direct SQL.

---

# 11. Preferred Resolution Hierarchy

Use this hierarchy:

```text
1. Valid documented Admin fixture on current DB

2. Valid repository-defined local Admin fixture

3. Clean reproducible DB initialization restores the fixture

4. Runtime prerequisite remains unavailable
```

Do NOT use:

```text
guess credentials
brute-force credentials
patch authentication
directly overwrite password hash
directly promote role
disable authentication
```

---

# 12. Private Runtime Environment

If a legitimate Admin fixture is identified:

populate only the ignored runtime environment:

```text
postman/runtime/HW06-local.runtime.postman_environment.json
```

Do not write the credential into:

```text
postman/environments/HW06-local.postman_environment.json
```

The committed template must remain secret-free.

---

# 13. Git Safety

Ensure:

```text
postman/runtime/
```

remains ignored.

After runtime configuration verify:

```text
git status
```

No private runtime file or secret-bearing artifact may be staged.

Required:

```text
PLAINTEXT_PRIVATE_ADMIN_SECRET_COMMITTED = 0
```

---

# 14. Admin Setup Retry

Once a legitimate credential is available, rerun only:

```text
[SETUP-005] Authenticate Administrator
```

Required validation:

```text
admin_token:
POPULATED
```

Do not print the token.

Record observed HTTP status.

---

# 15. Authentication Success Criteria

Do not declare Admin setup successful merely because a token-looking value exists.

Validate only supported minimum runtime criteria:

```text
request completed
authentication operation succeeded according to documented contract
runtime token variable populated where contract supports token response
```

Do not infer additional claims.

---

# 16. Targeted FR-18 Smoke Retry

After `admin_token` is populated, rerun only the previously blocked Admin-dependent smoke tests:

```text
TC-API-046
TC-API-179
```

plus SETUP-005.

Do NOT rerun:

```text
TC-API-048
```

unless needed for a narrowly justified comparison.

Do not rerun all nine smoke tests.

---

# 17. Expected Classification

For:

```text
TC-API-046
```

use its approved assertion/observation strategy from the execution manifest.

For:

```text
TC-API-179
```

preserve exploratory Content-Type observation semantics.

Do not invent a media-type oracle.

---

# 18. X-Student-Id Validation

Verify targeted retry requests still carry a resolved, non-empty:

```text
X-Student-Id
```

Record only:

```text
HEADER_PRESENT
HEADER_VALUE_NONEMPTY
```

Do not expose its actual value.

---

# 19. Targeted Retry Reports

Create:

```text
reports/newman/smoke/admin-prerequisite/
```

with:

```text
admin-retry-cli.txt
admin-retry-report.json
```

Optional:

```text
admin-retry-report.html
```

only if an HTML reporter is already available.

Do not install optional reporting packages solely for this prompt.

---

# 20. Redaction

Before retaining reports inspect for:

* Admin password,
* Admin token,
* other JWTs,
* student ID,
* private credentials.

Create redacted evidence where needed.

Remove secret-bearing raw report artifacts if they cannot be safely sanitized.

---

# 21. Evidence Artifact

Create:

```text
evidence/smoke/admin-prerequisite-resolution.md
```

Required sections:

1. Original failure
2. Documentation comparison
3. Database fixture inspection
4. Seed fixture inspection
5. Root cause
6. Resolution action
7. Admin login retry
8. TC-API-046 retry
9. TC-API-179 retry
10. Secret/redaction validation
11. Full-suite gate result

---

# 22. Runtime Reset Evidence

If database reset was required, include:

```text
Reset required:
YES

Reason:

Backup created:
YES

Source code modified:
NO

Business data logic modified:
NO

Direct role/password mutation:
NO

Clean initialization mechanism:
...
```

Do not commit backup SQLite files.

---

# 23. Documentation Mismatch Handling

If repository documentation contains conflicting Admin credentials and only one matches the clean local fixture:

classify:

```text
POTENTIAL_DOCUMENTATION_DEFECT
```

Do not file a GitHub issue yet.

Record exact conflicting source locations without exposing the passwords.

This issue can be considered during later bug triage.

---

# 24. If No Credential Can Be Established

If no legitimate Admin credential can be established after:

* documentation inspection,
* seed inspection,
* safe clean initialization,

do NOT circumvent authentication.

Report:

```text
ADMIN_RUNTIME_PREREQUISITE_UNRESOLVED
```

and:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

Include precise evidence required from the instructor/SUT owner to unblock.

---

# 25. Do Not Reduce the Suite

Do not remove FR-18 tests merely because Admin authentication is unavailable.

Current logical/executable counts remain:

```text
122 logical
114 planned executable
8 logical blocked
```

Admin prerequisite failure is a runtime execution constraint.

---

# 26. Static Validator

If canonical Postman collection/environment template was not changed:

rerun or confirm:

```bash
node postman/validation/validate-postman-build.js
```

Expected:

```text
PASS
```

If any canonical Postman implementation change was genuinely required, rerun the validator after the change.

---

# 27. No Full Newman Yet

Even if Admin retry succeeds:

do NOT run the full 114 executable testcases in Prompt 025.

Prompt 026 will own full execution.

---

# 28. Full Execution Gate

Report:

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```

only when:

```text
SUT reachable = YES
Newman available = YES
user setup works = YES
product setup works = YES
admin setup works = YES
admin_token populated = YES
TC-API-046 targeted smoke valid = YES
TC-API-179 targeted smoke valid = YES
X-Student-Id runtime = PASS
static validator = PASS
no unresolved harness defect
```

Otherwise:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

---

# 29. Update Existing Smoke Summary

Update:

```text
reports/newman/smoke/smoke-execution-summary.md
```

by appending a clearly labeled:

```text
PROMPT 025 — ADMIN PREREQUISITE FOLLOW-UP
```

Do not rewrite Prompt 024 historical results.

The original failed Admin attempts must remain recorded.

---

# 30. Update Runtime Summary

Append to:

```text
evidence/smoke/runtime-summary.md
```

with final Admin prerequisite status.

Preserve Prompt 024 history.

---

# 31. Potential Defect Classification

Allowed outcomes:

```text
NONE
POTENTIAL_DOCUMENTATION_DEFECT
POTENTIAL_SEED_FIXTURE_DEFECT
```

Do not classify authentication failure as a confirmed product defect without sufficient evidence.

---

# 32. Quality Validation

Required:

| Check                                       | Expected |
| ------------------------------------------- | -------- |
| Full 114-test suite executed                | NO       |
| Admin prerequisite investigated             | YES      |
| Credential brute force                      | NO       |
| Auth bypass                                 | NO       |
| Direct role mutation                        | NO       |
| Direct password-hash mutation               | NO       |
| Source business logic modified              | NO       |
| Private Admin secret committed              | 0        |
| Admin token exposed                         | 0        |
| Targeted blocked logical-suite IDs executed | 0        |
| TC-API-046 retry if Admin resolved          | YES      |
| TC-API-179 retry if Admin resolved          | YES      |
| X-Student-Id targeted retry                 | PASS     |
| Static validator                            | PASS     |

Note:

TC-API-046 and TC-API-179 are not among the eight canonical blocked logical tests; they were only smoke-runtime blocked due to missing Admin credential.

---

# 33. Required Final Response Structure

Use exactly:

# Prompt 025 — Resolve FR-18 Admin Runtime Prerequisite

## 1. Executive Summary

Include:

* Admin prerequisite resolution status,
* identified root cause,
* clean reset performed?,
* Admin setup retry result,
* targeted FR-18 smoke result,
* potential documentation/fixture defect,
* full-suite readiness.

## 2. Documentation Credential Audit

## 3. Current Database Fixture Audit

## 4. Seed / Bootstrap Fixture Audit

## 5. Root-Cause Classification

## 6. Resolution Strategy

## 7. Runtime Database Reset

If not required:

```text
NOT REQUIRED
```

## 8. Private Runtime Environment

## 9. Admin Authentication Retry

## 10. TC-API-046 Targeted Retry

## 11. TC-API-179 Targeted Retry

## 12. X-Student-Id Runtime Validation

## 13. Potential Documentation / Fixture Defect

## 14. Reports and Evidence

## 15. Secret Safety

## 16. Static Validation

## 17. Remaining Runtime Prerequisites

## 18. Quality Validation

## 19. Full Newman Execution Readiness

Use exactly one:

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```

or:

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

## 20. Current Project Status

Use:

```text
LOGICAL TEST DESIGN:
122 — COMPLETE

POSTMAN BUILD:
COMPLETE

POSTMAN STATIC VALIDATION:
PASS

GENERAL SMOKE:
COMPLETE

FR-18 ADMIN PREREQUISITE:
RESOLVED / UNRESOLVED

FULL NEWMAN EXECUTION:
NOT STARTED
```

## 21. Machine-Usable Summary

End exactly:

```text
PROMPT_025_SUMMARY

Admin credential documented sources inspected:

Admin accounts in current DB:

Seed Admin fixture identified:
YES / NO

Root cause:
DIRTY_RUNTIME_DATABASE /
DOCUMENTATION_MISMATCH /
SEED_FIXTURE_MISMATCH /
ACCOUNT_STATE_PROBLEM /
POSTMAN_SETUP_DEFECT /
UNKNOWN_RUNTIME_PREREQUISITE

Database clean reset performed:
YES / NO

Direct password/role mutation:
NO

Admin authentication retry:
PASS / FAIL

admin_token populated:
YES / NO

TC-API-046 targeted retry:
PASS / OBSERVED_EXPLORATORY / BLOCKED

TC-API-179 targeted retry:
PASS / OBSERVED_EXPLORATORY / BLOCKED

X-Student-Id:
PASS / FAIL

Potential defect:
NONE /
POTENTIAL_DOCUMENTATION_DEFECT /
POTENTIAL_SEED_FIXTURE_DEFECT

Private credentials committed:
0

Admin token exposed:
0

Static validator:
PASS / FAIL

Full 114-test suite executed:
NO

Readiness:
READY_FOR_FULL_NEWMAN_EXECUTION /
NOT_READY_FOR_FULL_NEWMAN_EXECUTION

Next required prompt if ready:
PROMPT 026 — RUN FULL NEWMAN EXECUTION AND COLLECT EVIDENCE

Next required action if not ready:
OBTAIN / RESTORE LEGITIMATE LOCAL ADMIN TEST FIXTURE
```

---

# 34. Output Artifacts

Create:

```text
evidence/smoke/admin-prerequisite-resolution.md

reports/newman/smoke/admin-prerequisite/admin-retry-cli.txt
reports/newman/smoke/admin-prerequisite/admin-retry-report.json
```

Update by append-only history:

```text
reports/newman/smoke/smoke-execution-summary.md
evidence/smoke/runtime-summary.md
```

Log:

```text
prompts/Prompt-025-resolve-fr18-admin-runtime-prerequisite.md
```

Append exactly one Prompt 025 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–024 historical prompt contents.

---

# 35. Final Constraints

* Resolve only the Admin runtime prerequisite.
* Do not full-run the suite.
* Do not guess/brute-force credentials.
* Do not bypass authentication.
* Do not directly promote users to Admin.
* Do not directly alter password hashes.
* Do not change business logic.
* A clean DB reset is allowed only as a controlled test-fixture restoration with backup/evidence.
* Seed source may be inspected only for fixture provisioning, not requirement authority.
* Preserve original failed Admin smoke evidence.
* Keep secrets out of Git and reports.
* Do not file GitHub issues yet.
* Do not change logical testcase semantics.
* Do not generate new TC-API IDs.
* Keep all eight canonical blocked tests blocked.
* Stop when the Admin prerequisite is resolved and targeted FR-18 smoke is validated.

The objective is:

**One Missing Admin Fixture → Legitimate Runtime Resolution → Full-Run Gate**

not:

**Bypass authentication so FR-18 can execute**.
