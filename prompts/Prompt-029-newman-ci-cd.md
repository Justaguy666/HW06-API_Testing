# Prompt 029 — Implement and Validate Newman CI/CD with Passing and Intentional-Fail Workflows

You are continuing my HW06 – API Testing project for the EShop SUT.

Current project state:

```text
LOGICAL TEST DESIGN:
COMPLETE

POSTMAN BUILD:
COMPLETE

SMOKE:
COMPLETE

FULL NEWMAN EXECUTION:
COMPLETE

EXECUTION TRIAGE:
COMPLETE

CONFIRMED DEFECTS:
3

BUG REPORTS:
COMPLETE

GITHUB ISSUES:
3 / 3 — COMPLETE

CI/CD:
NOT STARTED
```

GitHub repository:

```text
Justaguy666/HW06-API_Testing
```

GitHub CLI:

```text
AVAILABLE
AUTHENTICATED
```

The assignment requires Newman CI/CD evidence for:

```text
1. an all-pass CI execution
2. an intentional-failing CI execution
```

This prompt must implement, publish, execute, and document both.

---

# 1. Purpose

Create a reproducible GitHub Actions Newman CI pipeline demonstrating:

```text
PASSING CI
+
INTENTIONAL FAILURE DETECTION
```

The transformation is:

```text
Canonical Postman suite
        ↓
Small stable CI regression subset
        +
Explicit CI-only failure demonstration
        ↓
GitHub Actions workflows
        ↓
Real remote executions
        ↓
Passing workflow evidence
        +
Failing workflow evidence
        ↓
CI/CD COMPLETE
```

This prompt must:

1. create a stable passing Newman CI subset,
2. create a clearly isolated intentional-fail Newman sample,
3. start the local SUT inside GitHub Actions,
4. inject `X-Student-Id` securely,
5. generate Newman CLI/JSON/JUnit reports,
6. upload CI artifacts,
7. commit and push the CI implementation,
8. run the passing workflow,
9. run the intentional-failing workflow,
10. capture real GitHub Actions evidence,
11. verify expected conclusions,
12. preserve all logical-test and defect history.

---

# 2. Important CI Principle

Do NOT use the entire 114-test executable suite as the required all-pass CI sample.

The authoritative full suite intentionally contains confirmed SUT defects and setup/spec limitations.

A CI regression demonstration should instead use a small stable subset that has already demonstrated reliable execution.

The passing CI workflow is:

```text
REPRESENTATIVE REGRESSION SAMPLE
```

not:

```text
CLAIM THAT ALL 114 TESTS PASS
```

Do not falsify full-suite status.

---

# 3. Authoritative Inputs

Use:

```text
postman/collections/HW06-API-Testing.postman_collection.json
postman/environments/HW06-local.postman_environment.json

postman/traceability/testcase-postman-matrix.md
postman/traceability/setup-postman-matrix.md

reports/newman/full/logical-test-results.md
reports/newman/full/authoritative-execution-summary.md

analysis/execution-triage/triage-summary.md
analysis/execution-triage/confirmed-defects.md
analysis/execution-triage/non-defect-findings.md

eshop-sut/setup_guide.md
eshop-sut/backend/package.json
```

Use implementation/bootstrap files only as necessary to run the SUT in ephemeral CI.

Do not reinterpret implementation as requirement authority.

---

# 4. Passing CI Test Selection

Build a small stable passing CI suite.

Target:

```text
3–6 executable logical testcase units
```

Requirements:

* cover FR-02,
* cover FR-07,
* cover FR-18 where feasible without private Admin credentials,
* include at least one supported hard assertion,
* include at least one exploratory/observation case if useful,
* preferably include at least one HUMAN_ADDED testcase,
* exclude confirmed defects,
* exclude canonical blocked tests,
* exclude unresolved SETUP-007,
* exclude SETUP-014 ambiguity,
* avoid Admin credential dependency.

Preferred candidates, subject to verification against the canonical suite:

```text
TC-API-001
TC-API-130
TC-API-048
TC-API-173
```

Rationale:

```text
TC-API-001:
verified successful FR-02 login behavior

TC-API-130:
verified FR-07 authenticated Cart behavior

TC-API-048:
verified FR-18 unauthenticated access denial
without requiring Admin credentials

TC-API-173:
HUMAN_ADDED observational Cart response-header case
```

Before using these IDs, verify that their canonical setup dependencies can run reproducibly in clean CI.

If one candidate is unsuitable, replace it only with another previously successful/observed testcase and document the substitution.

Do not select:

```text
TC-API-047
TC-API-055
TC-API-011
TC-API-078
```

because they are associated with confirmed SUT defects.

---

# 5. Derived CI Collection Principle

Do NOT manually rewrite logical testcase behavior.

Create a deterministic extraction/build script:

```text
postman/ci/build-ci-collections.js
```

It should derive CI request units from:

```text
postman/collections/HW06-API-Testing.postman_collection.json
```

and preserve:

* canonical request definitions,
* scripts,
* testcase metadata,
* X-Student-Id headers,
* required setup dependencies.

This avoids divergence between CI and canonical Postman artifacts.

---

# 6. Passing Collection

Generate:

```text
postman/ci/HW06-CI-Passing.postman_collection.json
```

Collection name:

```text
HW06 CI — Passing Regression Sample
```

Description must state clearly:

```text
This is a representative CI regression subset.

It does not replace the authoritative 114-test execution.

Known confirmed SUT defects are intentionally excluded from
the all-pass demonstration and remain documented separately.
```

---

# 7. CI Test Selection Artifact

Create:

```text
postman/ci/passing-selection.md
```

Required:

| Test ID | Feature | Origin | Previous Result | Required Setup | CI Reason |
| ------- | ------- | ------ | --------------- | -------------- | --------- |

Also record:

```text
Selected logical testcase units:
N

Selected setup requests:
N
```

---

# 8. Intentional-Fail Collection

Create:

```text
postman/ci/HW06-CI-Intentional-Fail.postman_collection.json
```

This collection exists ONLY to demonstrate that CI detects a Newman assertion failure.

It is:

```text
CI_DEMO_ONLY
```

It must NOT be counted as:

* a new logical testcase,
* AI_GENERATED testcase,
* HUMAN_ADDED testcase,
* defect reproduction testcase.

---

# 9. Intentional-Fail Design

Use a simple safe documented request that can complete reliably.

Prefer a public/read-only endpoint.

Every request must still include:

```text
X-Student-Id: {{student_id}}
```

Include exactly one intentionally failing assertion clearly named:

```javascript
pm.test("[CI-DEMO-FAIL] Intentional CI failure demonstration", function () {
    pm.expect(true, "Intentional failure required by HW06 CI demonstration").to.eql(false);
});
```

This is allowed ONLY inside:

```text
HW06-CI-Intentional-Fail.postman_collection.json
```

because its purpose is explicitly to demonstrate CI failure detection.

Do not place this assertion into the canonical collection.

---

# 10. Intentional-Fail Documentation

The collection description and README must state:

```text
THIS FAILURE IS INTENTIONAL.

It is not a SUT defect.

It exists solely to demonstrate that the GitHub Actions
Newman pipeline correctly becomes red when a test assertion fails.
```

---

# 11. CI Environment Template

Create:

```text
postman/ci/HW06-CI.postman_environment.json
```

Safe committed values may include:

```text
base_url = http://127.0.0.1:3000
```

The committed value for:

```text
student_id
```

must remain empty.

No tokens/passwords may be committed.

---

# 12. Runtime CI Environment Generator

Create:

```text
scripts/ci/build-postman-ci-environment.js
```

It must:

1. read the committed CI environment,
2. read `process.env.STUDENT_ID`,
3. fail clearly if missing,
4. insert it into runtime environment,
5. write the runtime file only inside a temporary/runtime path.

Do not print the student ID.

Example target on GitHub Actions:

```text
${RUNNER_TEMP}/HW06-CI.runtime.postman_environment.json
```

---

# 13. GitHub Secret

Required GitHub Actions secret:

```text
STUDENT_ID
```

Check:

```powershell
gh secret list --repo Justaguy666/HW06-API_Testing
```

Only inspect secret names.

Do NOT print secret values.

---

# 14. Configure STUDENT_ID Automatically If Missing

If `STUDENT_ID` is not configured:

read the value from the existing ignored local runtime environment:

```text
postman/runtime/HW06-local.runtime.postman_environment.json
```

and securely set:

```text
STUDENT_ID
```

in:

```text
Justaguy666/HW06-API_Testing
```

using GitHub CLI.

Do not print, log, store, or place the value on a command line where it may be exposed.

Prefer piping directly to:

```text
gh secret set STUDENT_ID
```

Then verify only that the secret NAME exists:

```text
STUDENT_ID
```

Never expose its value.

---

# 15. SUT Setup in GitHub Actions

The passing and failing workflows must run the SUT themselves.

Use:

```text
ubuntu-latest
```

unless the SUT has a documented platform constraint.

Required general sequence:

```text
checkout
→ setup Node
→ install backend dependencies
→ prepare ephemeral runtime DB if needed
→ start backend
→ wait for reachability
→ build private CI Postman environment
→ run Newman
```

---

# 16. Node Version

Use:

```text
Node.js 22
```

to align with the validated local environment unless the project specifies otherwise.

Use:

```yaml
actions/setup-node@v4
```

---

# 17. Dependency Installation

Inspect:

```text
eshop-sut/backend/package.json
```

and lockfile state.

Use:

```text
npm ci
```

when a valid lockfile exists.

Otherwise use the minimum valid documented install command.

Do not run:

```text
npm audit fix
```

or mutate dependencies unrelated to CI.

---

# 18. Ephemeral Database Strategy

GitHub-hosted runner state is disposable.

Determine whether the backend bootstrap can safely create/seed a fresh database.

If yes, use a clean CI fixture strategy and document:

```text
EPHEMERAL_CI_FIXTURE_RESET
```

Do not modify database seed/business source.

Do not commit any CI-generated SQLite file.

---

# 19. Start Backend

Run backend in background.

Capture its PID.

Redirect logs to a runner-temp file.

Do not expose private request credentials.

---

# 20. SUT Readiness Check

Create:

```text
scripts/ci/wait-for-sut.js
```

or use another reliable documented mechanism.

Target:

```text
http://127.0.0.1:3000
```

Wait with a bounded timeout.

Fail clearly if the SUT never becomes reachable.

Do not use arbitrary long sleeps as the primary mechanism.

---

# 21. Passing Workflow

Create:

```text
.github/workflows/newman-ci.yml
```

Workflow name:

```text
HW06 Newman CI
```

Triggers:

```yaml
push:
pull_request:
workflow_dispatch:
```

Restrict paths if appropriate, but do not make the workflow impossible to trigger for evidence.

---

# 22. Passing Workflow Permissions

Use minimum permissions such as:

```yaml
permissions:
  contents: read
```

Do not grant unnecessary write permissions.

---

# 23. Passing Newman Execution

Use:

```text
newman 6.2.2
```

Prefer:

```bash
npx --yes newman@6.2.2
```

to avoid unnecessary global installation.

Produce:

```text
CLI
JSON
JUnit
```

Reports.

---

# 24. Passing CI Reports

Inside runner output create:

```text
reports/ci/passing/
```

with:

```text
newman-cli.txt
newman-report.json
newman-report.xml
```

Use GitHub Actions artifacts for retention.

---

# 25. Upload Passing Artifacts

Use:

```yaml
actions/upload-artifact@v4
```

Artifact name such as:

```text
hw06-newman-passing
```

Upload reports with:

```text
if: always()
```

---

# 26. Passing Workflow Success Rule

The passing workflow must be genuinely green only if:

```text
SUT starts
+
environment builds
+
Newman runs
+
all selected supported assertions pass
```

Do NOT:

```text
|| true
continue-on-error
```

on the final Newman pass execution.

---

# 27. Intentional-Fail Workflow

Create:

```text
.github/workflows/newman-intentional-fail.yml
```

Workflow name:

```text
HW06 Newman Intentional Failure Demo
```

Trigger:

```yaml
workflow_dispatch:
```

Do NOT run this failing demonstration automatically on every push.

---

# 28. Failing Workflow Setup

Use the same reproducible:

```text
checkout
Node
backend
runtime environment
Newman
```

strategy as the passing workflow.

Avoid unnecessary duplication through scripts where reasonable.

---

# 29. Capture Intentional Newman Exit Code

The intentional Newman execution must be allowed to produce its report before the workflow concludes.

Capture the exit code without hiding it.

Conceptually:

```bash
set +e

npx newman ... 2>&1 | tee newman-cli.txt
NEWMAN_EXIT=${PIPESTATUS[0]}

echo "newman_exit=$NEWMAN_EXIT" >> "$GITHUB_OUTPUT"

exit 0
```

Then upload artifacts.

---

# 30. Verify Failure Is Actually Detected

After artifact upload:

if Newman unexpectedly returned:

```text
0
```

the workflow should fail because the intentional-fail test did not behave as designed.

If Newman returned non-zero as expected:

perform a final explicit:

```bash
exit 1
```

or equivalent so the GitHub Actions run conclusion is:

```text
failure
```

This red workflow is expected evidence.

---

# 31. Intentional-Fail Reports

Create:

```text
reports/ci/intentional-fail/
```

with:

```text
newman-cli.txt
newman-report.json
newman-report.xml
```

Upload artifact:

```text
hw06-newman-intentional-fail
```

using:

```text
if: always()
```

---

# 32. CI Asset Validator

Create:

```text
postman/ci/validate-ci-assets.js
```

Validate locally before publishing:

```text
passing collection JSON parseable
intentional-fail collection JSON parseable
CI environment JSON parseable

passing logical IDs belong to canonical suite

passing collection excludes:
confirmed defect tests
canonical blocked tests
SETUP-007-dependent tests
SETUP-014 ambiguity tests

intentional collection contains CI_DEMO_ONLY marker

intentional collection creates no TC-API ID

exactly one intentional failure assertion

every CI HTTP request contains X-Student-Id

committed student_id value empty

plaintext secrets = 0
```

---

# 33. Build Validation

Run:

```bash
node postman/ci/build-ci-collections.js
node postman/ci/validate-ci-assets.js
node postman/validation/validate-postman-build.js
```

Expected:

```text
PASS
PASS
PASS
```

---

# 34. Workflow Audit Before Push

Inspect both YAML workflows.

Validate:

```text
passing workflow can become green

intentional failure workflow only manual

student ID comes from GitHub secret

no private Admin credential required

no hardcoded student ID

no JWT/token/password

no unsupported SUT expectation

artifacts uploaded even on failure
```

---

# 35. CI Documentation

Create:

```text
ci/README.md
```

Required sections:

1. CI purpose
2. passing regression subset
3. why full 114-test suite is not used as all-pass sample
4. known defects preserved separately
5. STUDENT_ID secret
6. SUT startup
7. Newman version
8. passing workflow
9. intentional-fail workflow
10. reports/artifacts
11. expected workflow conclusions
12. reproduction commands
13. evidence links

---

# 36. CI Traceability

Create:

```text
ci/ci-test-traceability.md
```

Map:

```text
passing CI testcase
→ canonical TC-API ID
→ feature
→ origin
→ authoritative result
```

The intentional failure demo must appear separately as:

```text
CI_DEMO_ONLY
NO_LOGICAL_TC_ID
```

---

# 37. Git Safety Before Publication

Run:

```bash
git status
git diff --check
```

Verify:

```text
runtime environment staged:
NO

runtime DB staged:
NO

credentials staged:
NO

GitHub token staged:
NO

student ID staged:
NO
```

---

# 38. Commit CI Step

Because real GitHub Actions execution requires the workflows to exist remotely, Prompt 029 must create exactly one CI procedure commit after local validation passes.

Commit message:

```text
ci: add Newman passing and intentional-fail workflows
```

Do not combine unrelated changes.

Record commit SHA.

---

# 39. Push CI Commit

Push the current branch to:

```text
origin
```

Do not force push.

Record:

```text
branch
commit SHA
push result
```

---

# 40. Passing Workflow Remote Execution

After push:

locate the `HW06 Newman CI` run corresponding to the CI commit.

If push trigger produced one, use it.

Otherwise trigger:

```text
workflow_dispatch
```

using GitHub CLI.

Do not create unnecessary duplicate runs.

---

# 41. Wait for Passing Run

Use `gh` to wait for completion.

Record:

```text
run ID
run URL
commit SHA
conclusion
duration
```

Expected conclusion:

```text
success
```

If it fails:

do not immediately modify assertions.

Diagnose:

```text
CI_HARNESS
ENVIRONMENT
SUT_STARTUP
SECRET
TEST_SETUP
ACTUAL_TEST_FAILURE
```

Fix only CI/harness problems.

Preserve failed run evidence.

---

# 42. Passing Workflow Repair

If a legitimate CI implementation defect is found:

document:

```text
CI-FIX-NNN
```

Fix it without changing logical testcase semantics.

A repair commit is allowed only if genuinely required.

Do not hide real SUT failures.

After repair:

push and obtain a genuine green run.

Preserve initial failed run history.

---

# 43. Intentional-Fail Remote Execution

After a successful passing workflow exists, manually trigger:

```text
HW06 Newman Intentional Failure Demo
```

via `gh`.

Wait for completion.

Expected:

```text
conclusion:
failure
```

This failure is REQUIRED.

---

# 44. Intentional Failure Validation

Inspect workflow logs/reports.

Verify failure source is:

```text
[CI-DEMO-FAIL] Intentional CI failure demonstration
```

Required:

```text
SUT startup:
PASS

Newman executed:
YES

Intentional assertion:
FAILED

Newman non-zero:
YES

Workflow conclusion:
failure
```

Do not accept a red workflow caused by:

* SUT startup failure,
* missing secret,
* YAML failure,
* npm failure,
* network problem.

---

# 45. CI Evidence Directory

Create:

```text
evidence/ci/
```

Required:

```text
passing-run.md
intentional-fail-run.md
ci-summary.md
```

---

# 46. Passing Evidence

`passing-run.md` must include:

```text
workflow
run ID
run URL
commit SHA
conclusion
selected logical tests
Newman result
assertion failures
artifact name
X-Student-Id source:
GitHub Secret — value redacted
```

Expected:

```text
conclusion:
SUCCESS
```

---

# 47. Intentional Failure Evidence

`intentional-fail-run.md` must include:

```text
workflow
run ID
run URL
commit SHA
conclusion
Newman exit code
intentional assertion name
artifact name
failure attribution
```

Expected:

```text
conclusion:
FAILURE

failure attribution:
INTENTIONAL_CI_DEMO
```

---

# 48. Download CI Reports

Use GitHub CLI where practical to download workflow artifacts into local evidence/report folders.

Create retained sanitized copies under:

```text
reports/ci/passing/
reports/ci/intentional-fail/
```

Do not commit GitHub runner secrets.

---

# 49. Screenshot Evidence

Actively attempt to capture genuine GitHub Actions evidence.

Target:

```text
evidence/ci/HW06-Newman-CI-success.png
evidence/ci/HW06-Newman-intentional-failure.png
```

Preferred screenshots:

### Passing

GitHub Actions run showing:

```text
HW06 Newman CI
Success
```

### Intentional Failure

GitHub Actions run showing:

```text
HW06 Newman Intentional Failure Demo
Failure
```

and, where visible, that the failing step is the intentional Newman demonstration.

Do NOT fabricate screenshots.

---

# 50. Screenshot Fallback

Only if automatic capture is technically impossible after a genuine attempt:

create:

```text
evidence/ci/screenshot-capture-checklist.md
```

and record:

```text
AUTOMATIC_SCREENSHOT_ATTEMPTED:
YES
```

Do not synthesize fake GitHub Actions UI.

---

# 51. CI Secret Audit

Scan all retained CI artifacts for:

```text
student ID
JWT
Bearer token
password
GitHub token
private environment contents
```

Required:

```text
CI_SECRET_EXPOSURES = 0
```

---

# 52. GitHub Run URL Validation

Every CI run URL recorded must be real.

Do not fabricate run IDs or URLs.

Verify via:

```text
gh run view
```

---

# 53. CI Results Required

Final required external state:

```text
PASSING WORKFLOW:
CONCLUSION = SUCCESS

INTENTIONAL-FAIL WORKFLOW:
CONCLUSION = FAILURE
FAILURE SOURCE = CI_DEMO_ONLY
```

This distinction is critical.

---

# 54. Do Not Create New Product Bugs

Prompt 029 is CI/CD work.

Do not create new GitHub bug Issues unless a genuinely new defect is independently established and requires a later triage workflow.

Unexpected CI behavior should first be treated as CI/harness diagnosis.

---

# 55. Preserve Existing GitHub Issues

Do not edit or close:

```text
#1
#2
#3
```

unless necessary to fix a broken evidence link created by this repository update.

Their defect content remains unchanged.

---

# 56. CI Quality Validation

Required:

| Check                                       | Expected |
| ------------------------------------------- | -------- |
| Passing workflow file                       | 1        |
| Intentional-fail workflow file              | 1        |
| Passing CI logical tests                    | 3–6      |
| Canonical blocked tests in passing CI       | 0        |
| Confirmed defect tests in passing CI        | 0        |
| CI demo logical TC IDs created              | 0        |
| Passing workflow real run                   | SUCCESS  |
| Intentional workflow real run               | FAILURE  |
| Intentional failure correctly attributed    | YES      |
| CI HTTP requests missing X-Student-Id       | 0        |
| Hardcoded student ID                        | 0        |
| Plaintext secrets                           | 0        |
| Existing defect issues modified incorrectly | 0        |
| Canonical Postman validator                 | PASS     |

---

# 57. CI Completion Gate

Report:

```text
CI_CD_COMPLETE
```

only when:

```text
passing workflow exists
+
intentional failure workflow exists
+
real successful passing run exists
+
real failing intentional run exists
+
failure correctly attributed
+
reports retained
+
run URLs retained
+
secret audit passes
```

Otherwise:

```text
CI_CD_PARTIALLY_COMPLETE
```

with exact blocker.

---

# 58. Required Final Response Structure

Use exactly:

# Prompt 029 — Newman CI/CD

## 1. Executive Summary

Include:

* CI passing testcase count,
* workflows created,
* GitHub secret state,
* passing run conclusion,
* intentional-fail run conclusion,
* screenshots,
* completion status.

## 2. Passing Test Selection

## 3. CI Collection Generation

## 4. Intentional Failure Design

## 5. CI Environment

## 6. STUDENT_ID Secret

## 7. SUT CI Startup

## 8. Passing Workflow

## 9. Intentional-Fail Workflow

## 10. Local CI Asset Validation

## 11. CI Commit and Push

## 12. Passing GitHub Actions Run

## 13. Passing Newman Results

## 14. Intentional-Fail GitHub Actions Run

## 15. Intentional Failure Attribution

## 16. GitHub Actions Artifacts

## 17. CI Screenshot Evidence

## 18. CI Traceability

## 19. Secret Audit

## 20. CI Fixes

If none:

```text
NONE
```

## 21. Quality Validation

## 22. CI/CD Status

Use exactly one:

```text
CI_CD_COMPLETE
```

or:

```text
CI_CD_PARTIALLY_COMPLETE
```

## 23. Current Project Status

Use:

```text
BUG REPORTING:
COMPLETE

GITHUB ISSUES:
3 / 3 — COMPLETE

CI/CD:
COMPLETE / PARTIAL

AGENT SKILL G9.5:
NOT STARTED

FINAL AI AUDIT:
NOT STARTED
```

## 24. Machine-Usable Summary

End exactly:

```text
PROMPT_029_SUMMARY

Passing CI logical tests:

Passing CI test IDs:

Passing CI HUMAN_ADDED tests:

Intentional-fail logical testcase ID:
NONE — CI_DEMO_ONLY

GitHub workflows:
2

STUDENT_ID secret:
CONFIGURED / MISSING

CI commit SHA:

Passing workflow:
RUN_ID:
RUN_URL:
CONCLUSION:
NEWMAN_EXIT_CODE:
REQUESTS:
ASSERTIONS:
ASSERTION_FAILURES:

Intentional-fail workflow:
RUN_ID:
RUN_URL:
CONCLUSION:
NEWMAN_EXIT_CODE:
INTENTIONAL_ASSERTION_FAILURES:

Intentional failure correctly attributed:
YES / NO

Passing artifact:
AVAILABLE / MISSING

Intentional-fail artifact:
AVAILABLE / MISSING

Passing screenshot:
AVAILABLE / PENDING

Intentional-fail screenshot:
AVAILABLE / PENDING

Canonical blocked tests in passing CI:
0

Confirmed defect tests in passing CI:
0

CI-created logical testcase IDs:
0

CI requests missing X-Student-Id:
0

Hardcoded student ID:
0

CI secret exposures:
0

Canonical Postman validator:
PASS / FAIL

CI/CD status:
CI_CD_COMPLETE / CI_CD_PARTIALLY_COMPLETE

Next required prompt if complete:
PROMPT 030 — DESIGN AGENT SKILL G9.5 FOR AI-DRIVEN API TEST GENERATION
```

---

# 59. Output Artifacts

Create:

```text
.github/workflows/newman-ci.yml
.github/workflows/newman-intentional-fail.yml

postman/ci/
├── build-ci-collections.js
├── validate-ci-assets.js
├── HW06-CI-Passing.postman_collection.json
├── HW06-CI-Intentional-Fail.postman_collection.json
├── HW06-CI.postman_environment.json
└── passing-selection.md

scripts/ci/
├── build-postman-ci-environment.js
└── wait-for-sut.js

ci/
├── README.md
└── ci-test-traceability.md

evidence/ci/
├── passing-run.md
├── intentional-fail-run.md
└── ci-summary.md

reports/ci/
├── passing/
└── intentional-fail/
```

Create genuine screenshots if technically possible:

```text
evidence/ci/HW06-Newman-CI-success.png

evidence/ci/HW06-Newman-intentional-failure.png
```

Log:

```text
prompts/Prompt-029-newman-ci-cd.md
```

Append exactly one Prompt 029 entry to:

```text
prompts/prompt-log.md
```

---

# 60. Final Constraints

* Passing CI must genuinely pass.
* Intentional failure CI must genuinely fail.
* Red intentional workflow must fail because of `CI_DEMO_ONLY`, not infrastructure.
* Do not use full 114-test suite as fake all-pass evidence.
* Do not remove confirmed product defects.
* Do not weaken assertions.
* Do not create new logical TC IDs.
* CI demo failure is not a product defect.
* Do not expose student ID.
* Do not expose GitHub token.
* Do not expose passwords or JWTs.
* All HTTP requests must include X-Student-Id.
* No Admin private credential dependency in passing CI.
* Preserve GitHub Issues #1–#3.
* Preserve Prompt 026 authoritative execution.
* Preserve Prompt 027 triage.
* Preserve canonical suite semantics.
* Capture real GitHub run IDs and URLs.
* Capture genuine screenshots where technically possible.
* Do not fabricate green or red CI evidence.

The objective is:

**Real Green CI + Real Intentional Red CI = Demonstrated Newman CI/CD**
