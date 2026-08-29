# Prompt 028 — Create Defect Reports, GitHub Issues, and Genuine Bug Evidence

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 027 completed execution triage.

Current confirmed defects:

```text
DEFECT-001
Type: SECURITY
Severity: HIGH
Classification: CONFIRMED_SUT_DEFECT

Affected behavior:
Authenticated non-Admin users can access Admin order operations.

Detected/reproduced by:
TC-API-047
TC-API-055 targeted post-fix verification
```

```text
DEFECT-002
Type: ROBUSTNESS
Severity: MEDIUM
Classification: CONFIRMED_SUT_DEFECT

Affected behavior:
POST /api/login returns an unhandled HTTP 500 when
the expected JSON request body is unavailable.

Detected/reproduced by:
TC-API-011
TC-API-078
```

```text
DEFECT-003
Type: DOCUMENTATION
Severity: LOW
Classification: CONFIRMED_DOCUMENTATION_DEFECT

Affected behavior:
setup_guide.md and README.md provide conflicting
passwords for the same Admin identity.

Repository seed and legitimate runtime login agree
with only one of them.
```

Prompt 027 also established:

```text
Postman implementation defects:
1 — FIXED

Setup/data limitation roots:
1

Specification ambiguity roots:
1

Bug-reporting readiness:
READY_FOR_BUG_REPORTING
```

No GitHub issues currently exist for these defects from this workflow.

---

# 1. Purpose

Create submission-quality defect reports, genuine evidence packages, and corresponding GitHub Issues for exactly the three confirmed defects.

The transformation is:

```text
Confirmed defect register
        ↓
Minimal evidence extraction
        ↓
Markdown bug reports
        ↓
Screenshot/evidence audit
        ↓
GitHub Issue bodies
        ↓
GitHub Issues
        ↓
Issue/report traceability
```

Do NOT report non-defect findings as bugs.

---

# 2. Authoritative Inputs

Use:

```text
analysis/execution-triage/triage-summary.md
analysis/execution-triage/candidate-matrix.md
analysis/execution-triage/confirmed-defects.md
analysis/execution-triage/non-defect-findings.md
```

Runtime evidence:

```text
reports/newman/full/
reports/newman/triage/

evidence/full-run/
evidence/smoke/
```

Specification/documentation:

```text
eshop-sut/api_specification.md
eshop-sut/setup_guide.md
eshop-sut/README.md
```

Postman traceability:

```text
postman/traceability/testcase-postman-matrix.md
```

Do not reinterpret unconfirmed findings as defects.

---

# 3. Defects In Scope

Create reports/issues only for:

```text
DEFECT-001
DEFECT-002
DEFECT-003
```

Do NOT create issues for:

```text
SETUP-007
SETUP-009
SETUP-014
TRIAGE-FIX-001
```

because these were classified as:

```text
TEST_DATA_SETUP_LIMITATION
POSTMAN_IMPLEMENTATION_DEFECT
SPECIFICATION_AMBIGUITY
```

rather than confirmed SUT/documentation defects.

---

# 4. Bug Report Directory

Create:

```text
bugs/
├── README.md
├── reports/
│   ├── DEFECT-001-broken-admin-order-access-control.md
│   ├── DEFECT-002-login-unhandled-500.md
│   └── DEFECT-003-conflicting-admin-credentials-documentation.md
│
├── github-issues/
│   ├── DEFECT-001-issue-body.md
│   ├── DEFECT-002-issue-body.md
│   └── DEFECT-003-issue-body.md
│
└── evidence/
    ├── DEFECT-001/
    ├── DEFECT-002/
    └── DEFECT-003/
```

---

# 5. Bug Report Schema

Each Markdown defect report must contain:

```text
Defect ID

Title

Type

Severity

Status

Affected Feature

Affected Endpoint / Artifact

Detected By Test IDs

Environment

Preconditions

Minimal Reproduction Steps

Expected Behavior

Actual Behavior

Reproducibility

Impact

Specification / Documentation Evidence

Runtime Evidence

Screenshot Evidence

Security / Privacy Notes

Related Testcases

Related Triage IDs

GitHub Issue

AI Assistance Disclosure
```

---

# 6. Status

For all three reports use:

```text
Status:
CONFIRMED
```

Do not write:

```text
FIXED
RESOLVED
```

because the SUT/documentation itself has not been fixed.

`TRIAGE-FIX-001` fixed only the testing harness.

---

# 7. Environment Section

Use the actual execution environment already recorded.

Include only non-sensitive information such as:

```text
Local SUT
Backend base URL: http://localhost:3000
Node.js version
Newman version
Execution date
```

Do not expose:

* student ID,
* passwords,
* tokens,
* Authorization headers.

---

# 8. DEFECT-001 Report

Create:

```text
bugs/reports/DEFECT-001-broken-admin-order-access-control.md
```

Recommended title:

```text
Authenticated non-Admin user can access Admin order operations
```

Type:

```text
SECURITY
```

Severity:

```text
HIGH
```

Affected feature:

```text
FR-18 — Order Management (Admin)
```

Affected operations include the confirmed evidence for:

```text
GET /api/admin/orders
```

and, if supported by the triage evidence:

```text
PUT /api/admin/orders/:id/status
```

Do not list endpoints that were not reproduced.

---

# 9. DEFECT-001 Expected Behavior

Use only the explicit authorization requirement from the specification.

Expected behavior should communicate:

```text
An authenticated non-Admin user must not be
authorized to perform Admin-only order operations.
```

If the specification defines an exact status, include it.

Otherwise do NOT invent:

```text
401
403
```

as the required exact status.

---

# 10. DEFECT-001 Actual Behavior

Record factual observations such as:

```text
TC-API-047:
confirmed non-Admin role
GET /api/admin/orders
HTTP 200
reproduced 2/2

TC-API-055:
confirmed non-Admin role
valid order fixture
Admin status-update request returned successful access
```

Use exact evidence from Prompt 027.

Do not generalize beyond reproduced operations.

---

# 11. DEFECT-001 Impact

Explain concisely:

```text
A normal authenticated user can cross the intended
role boundary and interact with system-wide
administrative order functionality.
```

Potential impacts include only evidence-supported risks:

* unauthorized access to administrative order data,
* unauthorized order-state modification where reproduced,
* broken role isolation.

Do not claim full account takeover or unrelated privilege escalation.

---

# 12. DEFECT-001 Reproduction Evidence

Use genuine artifacts from:

```text
reports/newman/triage/tc-api-047/
```

and the post-fix verification evidence that reproduced TC-API-055.

Create sanitized evidence copies/excerpts under:

```text
bugs/evidence/DEFECT-001/
```

Recommended artifacts:

```text
reproduction-summary.md
tc-api-047-redacted-excerpt.txt
tc-api-055-redacted-excerpt.txt
```

Do not fabricate response content.

---

# 13. DEFECT-002 Report

Create:

```text
bugs/reports/DEFECT-002-login-unhandled-500.md
```

Recommended title:

```text
Login endpoint returns unhandled HTTP 500 when JSON body is unavailable
```

Type:

```text
ROBUSTNESS
```

Severity:

```text
MEDIUM
```

Affected feature:

```text
FR-02 — Login and Account Lockout
```

Affected endpoint:

```text
POST /api/login
```

Detected by:

```text
TC-API-011
TC-API-078
```

---

# 14. DEFECT-002 Root-Cause Grouping

Do not create two bug reports.

Prompt 027 established that:

```text
TC-API-011
TC-API-078
```

produce the same unhandled internal exception/root condition.

One defect report must reference both tests.

---

# 15. DEFECT-002 Expected Behavior

Do NOT claim:

```text
Expected HTTP 400
Expected HTTP 422
```

because the specification does not define an exact invalid-input status.

Use a minimal defensible expectation such as:

```text
The endpoint should handle an unavailable/non-JSON login
body without terminating the request through an unhandled
internal server exception.
```

The defect is the:

```text
unhandled HTTP 500
```

not failure to return a guessed status code.

---

# 16. DEFECT-002 Actual Behavior

Include:

```text
TC-API-011:
Content-Type text/plain
raw non-JSON representation
HTTP 500
2/2 reproduction

TC-API-078:
no request body
HTTP 500
2/2 reproduction
```

Where triage evidence supports it, mention that the response contained an internal-error page / unhandled TypeError.

Do not include stack traces containing sensitive local paths unless sanitized.

---

# 17. DEFECT-002 Evidence

Create genuine sanitized evidence under:

```text
bugs/evidence/DEFECT-002/
```

Recommended:

```text
reproduction-summary.md
tc-api-011-redacted-excerpt.txt
tc-api-078-redacted-excerpt.txt
```

Source them from actual Newman triage reports.

---

# 18. DEFECT-003 Report

Create:

```text
bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md
```

Recommended title:

```text
Setup guide and README provide conflicting credentials for the seeded Admin account
```

Type:

```text
DOCUMENTATION
```

Severity:

```text
LOW
```

Affected artifacts:

```text
eshop-sut/setup_guide.md
eshop-sut/README.md
```

Do NOT print the passwords.

---

# 19. DEFECT-003 Evidence

The report should state:

```text
same Admin identity documented:
YES

password values conflict:
YES

seed matches exactly one documented credential:
YES

legitimate runtime login confirms that credential:
YES
```

Refer to source locations.

Represent credentials only as:

```text
DOCUMENTED_CREDENTIAL_A
DOCUMENTED_CREDENTIAL_B
```

Create:

```text
bugs/evidence/DEFECT-003/documentation-comparison.md
```

No plaintext credential may appear.

---

# 20. DEFECT-003 Expected Behavior

Expected:

```text
Repository setup documentation should provide one
consistent credential for the seeded local Admin fixture.
```

Actual:

```text
setup_guide.md and README.md provide different passwords
for the same Admin identity.
```

---

# 21. Screenshot Requirement

The assignment requires genuine bug screenshot evidence.

For each defect determine:

```text
REAL_SCREENSHOT_AVAILABLE
REAL_SCREENSHOT_CAN_BE_CAPTURED
MANUAL_SCREENSHOT_REQUIRED
```

Do NOT generate artificial images and call them screenshots.

Do NOT render text into an image and label it runtime screenshot evidence.

Do NOT fabricate Postman/Newman UI.

---

# 22. Screenshot Evidence Preference

Preferred genuine screenshots:

### DEFECT-001

A real Postman/Newman/terminal execution view showing:

```text
TC-API-047
confirmed non-Admin context
HTTP 200 / failing authorization assertion
```

or equivalent genuine runtime evidence.

### DEFECT-002

A real runtime/Postman/Newman view showing:

```text
TC-API-011 or TC-API-078
POST /api/login
HTTP 500
```

Prefer one screenshot that clearly identifies the testcase and status.

### DEFECT-003

A real editor/file view showing the two conflicting documentation locations, with password values visually redacted if necessary.

---

# 23. Screenshot Safety

Screenshots must not expose:

* Admin password,
* user password,
* JWT,
* Bearer token,
* student ID,
* sensitive local secrets.

If capture would expose a secret:

redact before capture using a safe display/copy.

Do not alter the source file merely to manufacture evidence.

---

# 24. If Codex Cannot Capture Screenshots

If the current environment cannot capture genuine GUI/terminal screenshots:

do NOT create placeholder PNGs.

Instead create:

```text
bugs/evidence/screenshot-capture-checklist.md
```

with an exact manual checklist.

For each defect include:

```text
Defect:
Window to open:
Command/request to display:
Expected visible evidence:
Fields that must be redacted:
Suggested output filename:
```

Suggested names:

```text
DEFECT-001-access-control.png
DEFECT-002-login-500.png
DEFECT-003-documentation-conflict.png
```

Set:

```text
SCREENSHOT_STATUS:
PENDING_MANUAL_CAPTURE
```

for affected reports.

Do not claim the screenshot requirement complete.

---

# 25. Existing Genuine Screenshot Reuse

If genuine screenshots already exist in the repository/evidence directories and clearly support the exact defect:

they may be reused.

Before reuse verify:

```text
real runtime artifact
relevant defect
readable
no secrets
not fabricated
```

Copy or reference them without altering historical evidence.

---

# 26. Bug Evidence Manifest

Create:

```text
bugs/evidence/evidence-manifest.md
```

Required table:

| Defect | Runtime/Text Evidence | Screenshot | Screenshot Status | Secret Audit |
| ------ | --------------------- | ---------- | ----------------- | ------------ |

Screenshot Status:

```text
COMPLETE
PENDING_MANUAL_CAPTURE
NOT_APPLICABLE
```

For this assignment, genuine defects should normally require screenshot evidence.

---

# 27. GitHub Repository Detection

Determine the current Git remote using:

```bash
git remote -v
```

Identify the repository that should receive HW06 issues.

Do not guess repository owner/name.

Record:

```text
GitHub repository:
<detected owner/repository>
```

---

# 28. GitHub Authentication

Check:

```bash
gh --version
gh auth status
```

Classify:

```text
GH_AVAILABLE_AUTHENTICATED
GH_AVAILABLE_NOT_AUTHENTICATED
GH_NOT_AVAILABLE
```

Do not print authentication tokens.

---

# 29. GitHub Issue Creation Rule

If:

```text
GH_AVAILABLE_AUTHENTICATED
+
valid GitHub remote
```

then create exactly:

```text
3 GitHub Issues
```

one per confirmed defect.

If authentication/tooling is unavailable:

do NOT fake issue URLs/numbers.

Create complete issue-body artifacts and report:

```text
GITHUB_ISSUE_CREATION_BLOCKED
```

with the exact human action needed.

---

# 30. GitHub Issue Titles

Use concise titles based on the reports.

Recommended:

```text
[FR-18][Security] Non-Admin user can access Admin order operations

[FR-02][Robustness] Login returns HTTP 500 when JSON body is unavailable

[Docs] Conflicting seeded Admin credentials in setup guide and README
```

Do not put severity in titles unless repository convention requires it.

---

# 31. GitHub Issue Body Schema

Each issue body must include:

```text
## Summary

## Severity

## Affected Feature / Endpoint

## Preconditions

## Steps to Reproduce

## Expected Behavior

## Actual Behavior

## Reproducibility

## Impact

## Detected By

## Evidence

## Screenshot

## Environment
```

Keep it concise enough for a GitHub Issue.

---

# 32. GitHub Issue Evidence Paths

Reference repository-relative evidence paths.

Do not write:

```text
C:\Users\...
```

inside GitHub Issue bodies.

Use:

```text
bugs/reports/...
bugs/evidence/...
reports/newman/triage/...
```

where appropriate.

---

# 33. Screenshot in GitHub Issue

If a genuine screenshot is already tracked and has a usable GitHub-relative Markdown reference, include it.

If screenshot is pending manual capture:

write:

```text
Screenshot evidence:
PENDING — see bugs/evidence/screenshot-capture-checklist.md
```

Do not invent a URL.

---

# 34. Labels

Inspect existing repository labels if using `gh`.

If an existing `bug` label is available, it may be applied.

Do not create arbitrary labels solely for this assignment.

Do not fail issue creation if labels are unavailable.

---

# 35. Issue Creation

Where authenticated, create using a mechanism such as:

```bash
gh issue create --title "..." --body-file "bugs/github-issues/DEFECT-001-issue-body.md"
```

Repeat for exactly three issues.

Capture:

```text
Issue number
Issue URL
```

Do not expose tokens.

---

# 36. Issue Mapping Artifact

Create:

```text
bugs/github-issues/issue-mapping.md
```

Required:

| Defect ID | Issue Created? | Issue Number | Issue URL | Screenshot Status |
| --------- | -------------- | ------------ | --------- | ----------------- |

Never invent issue numbers.

---

# 37. Update Defect Reports

Once issues are created, update each report:

```text
GitHub Issue:
#NNN — <URL>
```

If blocked:

```text
GitHub Issue:
PENDING — authentication/tool unavailable
```

---

# 38. DEFECT-001 Minimal Reproduction

The report/issue must reproduce only the approved authorization scenario.

Do not add additional security probing.

Minimal steps should approximately be:

```text
1. Authenticate as a normal non-Admin user.
2. Confirm the account role is non-Admin using existing fixture evidence.
3. Send the Admin order request with that token.
4. Observe successful Admin access.
```

Include the status/body observation supported by evidence.

---

# 39. DEFECT-002 Minimal Reproduction

Provide two variants under the same defect:

```text
Variant A — non-JSON body
Variant B — absent body
```

Do not unnecessarily introduce attack strings.

---

# 40. DEFECT-003 Minimal Reproduction

No runtime API attack is required.

Steps:

```text
1. Inspect setup_guide.md Admin fixture documentation.
2. Inspect README.md Admin fixture documentation.
3. Observe different password values for the same identity.
4. Compare with repository seed fixture.
5. Legitimate login confirms only one documented value.
```

Passwords remain redacted.

---

# 41. AI Assistance Disclosure

Because the assignment uses AI-first workflow, each report should include:

```text
AI Assistance:
AI assisted with structuring and formatting the report.
The defect itself was identified through the recorded
student test execution and human-reviewed triage evidence.
```

Do not claim AI independently discovered runtime facts that came from actual Newman execution.

---

# 42. Bug README

Create:

```text
bugs/README.md
```

Include:

* confirmed defect count,
* SUT defect count,
* documentation defect count,
* report paths,
* GitHub mapping,
* screenshot status,
* evidence policy,
* redaction policy.

---

# 43. Preserve Non-Defect Findings

Do not copy non-defect findings into `bugs/reports/`.

They remain in:

```text
analysis/execution-triage/non-defect-findings.md
```

Bug README may link to them as:

```text
Non-defect execution findings
```

but must not call them bugs.

---

# 44. Security Disclosure Discipline

For DEFECT-001, include only reproduction necessary to demonstrate the role authorization failure.

Do not:

* enumerate unrelated Admin endpoints,
* attempt destructive modifications,
* extract unrelated user data,
* escalate beyond approved testcase scope.

---

# 45. Evidence Redaction Audit

Scan all bug artifacts for:

```text
JWT-like strings
Bearer tokens
passwords
student ID
private runtime environment values
```

Required:

```text
BUG_ARTIFACT_SECRET_EXPOSURES = 0
```

---

# 46. Issue Content Audit

Ensure:

```text
C:\Users\
```

appears zero times in GitHub Issue body files.

GitHub issues must use repository-relative paths.

---

# 47. Bug Report Traceability

Create:

```text
bugs/bug-traceability.md
```

Columns:

| Defect ID | Test IDs | Triage IDs | Report | Evidence | GitHub Issue |
| --------- | -------- | ---------- | ------ | -------- | ------------ |

Expected mappings:

```text
DEFECT-001
→ TC-API-047, TC-API-055

DEFECT-002
→ TC-API-011, TC-API-078

DEFECT-003
→ documentation evidence
```

---

# 48. Quality Validation

Required:

| Check                                        | Expected |
| -------------------------------------------- | -------- |
| Confirmed defects                            | 3        |
| Markdown bug reports                         | 3        |
| SUT bug reports                              | 2        |
| Documentation bug reports                    | 1        |
| Unconfirmed findings reported as bugs        | 0        |
| GitHub issue bodies                          | 3        |
| Duplicate bug reports                        | 0        |
| Exact unsupported status expectations        | 0        |
| Plaintext passwords                          | 0        |
| JWT/token exposure                           | 0        |
| Student ID exposure                          | 0        |
| Absolute local Windows paths in issue bodies | 0        |
| Fake screenshots                             | 0        |
| Fake issue URLs                              | 0        |

---

# 49. Screenshot Gate

Report separately:

```text
BUG_SCREENSHOT_EVIDENCE:
COMPLETE
```

only if all required genuine screenshots exist and pass secret audit.

Otherwise:

```text
BUG_SCREENSHOT_EVIDENCE:
PENDING_MANUAL_CAPTURE
```

This does NOT allow fake screenshots.

---

# 50. Bug Reporting Completion Gate

Use:

```text
BUG_REPORTING_COMPLETE
```

only when:

```text
3 reports created
3 issue bodies created
all evidence mapped
GitHub issues created if authenticated tooling available
screenshot requirement satisfied
```

If screenshot capture remains pending:

use:

```text
BUG_REPORTING_PARTIALLY_COMPLETE_SCREENSHOTS_PENDING
```

If GitHub auth is unavailable:

use:

```text
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING
```

If both remain:

report both blockers explicitly.

---

# 51. Required Final Response Structure

Use exactly:

# Prompt 028 — Defect Reports, GitHub Issues, and Bug Evidence

## 1. Executive Summary

Include:

* confirmed defects = 3,
* reports created,
* GitHub issues created,
* screenshot evidence status,
* secret audit,
* completion status.

## 2. Defect Inventory

## 3. DEFECT-001 Report

## 4. DEFECT-001 Evidence

## 5. DEFECT-002 Report

## 6. DEFECT-002 Evidence

## 7. DEFECT-003 Report

## 8. DEFECT-003 Evidence

## 9. Screenshot Evidence

## 10. GitHub Repository and Authentication

## 11. GitHub Issue Creation

## 12. Issue Mapping

## 13. Bug Traceability

## 14. AI Assistance Disclosure

## 15. Redaction / Secret Audit

## 16. Quality Validation

## 17. Bug Reporting Status

Use one of:

```text
BUG_REPORTING_COMPLETE

BUG_REPORTING_PARTIALLY_COMPLETE_SCREENSHOTS_PENDING

BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING

BUG_REPORTING_PARTIALLY_COMPLETE
```

## 18. Current Project Status

Use:

```text
FULL EXECUTION:
COMPLETE

EXECUTION TRIAGE:
COMPLETE

CONFIRMED DEFECTS:
3

BUG REPORTS:
COMPLETE

GITHUB ISSUES:
COMPLETE / PENDING

SCREENSHOT EVIDENCE:
COMPLETE / PENDING

CI/CD:
NOT STARTED
```

## 19. Machine-Usable Summary

End exactly:

```text
PROMPT_028_SUMMARY

Confirmed defects:
3

Confirmed SUT defects:
2

Confirmed documentation defects:
1

Markdown reports:
3

GitHub issue bodies:
3

GitHub repository:

GitHub authentication:
GH_AVAILABLE_AUTHENTICATED /
GH_AVAILABLE_NOT_AUTHENTICATED /
GH_NOT_AVAILABLE

GitHub issues created:

DEFECT-001:
REPORT:
ISSUE_NUMBER:
ISSUE_URL:
SCREENSHOT:

DEFECT-002:
REPORT:
ISSUE_NUMBER:
ISSUE_URL:
SCREENSHOT:

DEFECT-003:
REPORT:
ISSUE_NUMBER:
ISSUE_URL:
SCREENSHOT:

Bug artifact secret exposures:
0

Fake screenshots:
0

Fake issue URLs:
0

Unconfirmed findings reported as bugs:
0

Bug screenshot evidence:
COMPLETE / PENDING_MANUAL_CAPTURE

Bug reporting status:
BUG_REPORTING_COMPLETE /
BUG_REPORTING_PARTIALLY_COMPLETE_SCREENSHOTS_PENDING /
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING /
BUG_REPORTING_PARTIALLY_COMPLETE

Next required prompt if complete:
PROMPT 029 — IMPLEMENT NEWMAN CI/CD WITH PASSING AND INTENTIONAL-FAIL WORKFLOWS

Next required action if screenshots pending:
CAPTURE AND ADD GENUINE BUG SCREENSHOTS

Next required action if GitHub pending:
CREATE ISSUES FROM bugs/github-issues/*-issue-body.md
```

---

# 52. Output Artifacts

Create:

```text
bugs/README.md
bugs/bug-traceability.md

bugs/reports/DEFECT-001-broken-admin-order-access-control.md
bugs/reports/DEFECT-002-login-unhandled-500.md
bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md

bugs/github-issues/DEFECT-001-issue-body.md
bugs/github-issues/DEFECT-002-issue-body.md
bugs/github-issues/DEFECT-003-issue-body.md
bugs/github-issues/issue-mapping.md

bugs/evidence/evidence-manifest.md
```

Create defect-specific genuine evidence under:

```text
bugs/evidence/DEFECT-001/
bugs/evidence/DEFECT-002/
bugs/evidence/DEFECT-003/
```

If screenshot capture is unavailable create:

```text
bugs/evidence/screenshot-capture-checklist.md
```

Log:

```text
prompts/Prompt-028-defect-reports-github-evidence.md
```

Append exactly one Prompt 028 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–027 historical prompt contents.

---

# 53. Final Constraints

* Report exactly the three confirmed defects.
* Do not report setup/data/spec limitations as bugs.
* Do not fabricate screenshots.
* Do not fabricate GitHub issue numbers or URLs.
* Do not expose passwords.
* Do not expose tokens.
* Do not expose student ID.
* Do not invent expected 400/422 behavior for DEFECT-002.
* Do not exaggerate DEFECT-001 beyond reproduced Admin-order scope.
* Do not classify the Admin implementation itself as defective for DEFECT-003.
* Preserve defect IDs.
* Preserve testcase IDs.
* Preserve authoritative execution evidence.
* GitHub Issue bodies use repository-relative paths only.
* Actual issue creation occurs only with authenticated GitHub tooling.
* Screenshot evidence must be genuine.
* AI assistance disclosure is mandatory.

The objective is:

**3 Confirmed Defects → 3 Auditable Reports → 3 GitHub Issues → Genuine Evidence**

not:

**Turn every interesting execution observation into a bug**.
