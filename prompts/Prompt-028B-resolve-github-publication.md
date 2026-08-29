# Prompt 028B — Resolve GitHub CLI and Publish Confirmed Defect Issues

You are continuing my HW06 – API Testing project.

Prompt 028 completed:

```text
Confirmed defects:
3

Markdown reports:
3 / 3

GitHub issue bodies:
3 / 3

Genuine screenshots:
3 / 3

Secret exposures:
0

GitHub Issues created:
0
```

Current blocker:

```text
GH_NOT_AVAILABLE
```

Repository:

```text
Justaguy666/HW06-API_Testing
```

Prompt 028 status:

```text
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING
```

The only purpose of this prompt is to resolve GitHub publication and create the three required issues.

---

# 1. Required Issues

Create exactly one issue for each:

```text
DEFECT-001
DEFECT-002
DEFECT-003
```

using the already prepared issue bodies:

```text
bugs/github-issues/DEFECT-001-issue-body.md
bugs/github-issues/DEFECT-002-issue-body.md
bugs/github-issues/DEFECT-003-issue-body.md
```

Do NOT rewrite the defect findings unless a repository-relative link must be corrected.

---

# 2. First Recheck GitHub CLI

Run:

```powershell
Get-Command gh -ErrorAction SilentlyContinue
where.exe gh
gh --version
```

Also inspect common installation paths if needed, such as:

```text
C:\Program Files\GitHub CLI\gh.exe
```

Do not immediately reinstall if `gh.exe` already exists but PATH is stale.

If found outside PATH, use the discovered executable directly or refresh the current terminal PATH safely.

---

# 3. Install GitHub CLI If Truly Missing

If GitHub CLI is genuinely not installed, use the standard Windows package manager if available:

```powershell
winget install --id GitHub.cli --exact
```

Do not install unrelated packages.

After installation, resolve the executable and run:

```powershell
gh --version
```

Expected classification:

```text
GH_AVAILABLE
```

Document:

```text
GitHub CLI installation:
ALREADY_INSTALLED / INSTALLED_BY_PROMPT_028B
```

---

# 4. Authentication Resolution

Check:

```powershell
gh auth status
```

Do not print tokens.

Then check whether a non-empty authentication token is already available through a safe environment mechanism such as:

```text
GH_TOKEN
GITHUB_TOKEN
```

Only check presence.

Do not print their values.

---

# 5. Authentication Strategy

Use this order:

```text
1. Existing gh authenticated session

2. Existing GH_TOKEN / GITHUB_TOKEN
   with sufficient repository issue permission

3. gh auth login using supported browser/device flow
   if interactive login can be completed in the current environment

4. Report authentication blocker
```

Do not fabricate authentication.

Do not embed credentials or personal access tokens into scripts/files.

---

# 6. Repository Verification

Before creating issues run:

```powershell
git remote -v
```

Verify the target repository resolves to:

```text
Justaguy666/HW06-API_Testing
```

Then verify access, for example:

```powershell
gh repo view Justaguy666/HW06-API_Testing
```

Do not create issues in another repository.

---

# 7. Duplicate-Issue Safety

Before creating new issues, search existing repository issues for the prepared titles and defect identifiers.

Check for:

```text
DEFECT-001
DEFECT-002
DEFECT-003
```

and/or equivalent existing titles.

Do not create duplicate issues if Prompt 028 or another attempt already successfully created them.

If an exact existing issue clearly corresponds to one of the three defects:

```text
reuse its issue number and URL
```

and record:

```text
ISSUE_ALREADY_EXISTS
```

Do not create a second copy.

---

# 8. Issue Titles

Use the already approved titles:

```text
[FR-18][Security] Non-Admin user can access Admin order operations

[FR-02][Robustness] Login returns HTTP 500 when JSON body is unavailable

[Docs] Conflicting seeded Admin credentials in setup guide and README
```

---

# 9. Issue Creation

Where no duplicate exists, create:

```powershell
gh issue create `
  --repo Justaguy666/HW06-API_Testing `
  --title "<approved title>" `
  --body-file "bugs/github-issues/<issue-body-file>"
```

Create exactly:

```text
3 issues total
```

across existing + newly created matching defects.

Do not create issues for:

```text
SETUP-007
SETUP-009
SETUP-014
TRIAGE-FIX-001
```

---

# 10. Labels

Inspect repository labels.

If an existing:

```text
bug
```

label exists, it may be applied.

Do not create arbitrary labels solely for HW06.

Label absence must not block issue creation.

---

# 11. Screenshot Evidence in Issue Bodies

Verify each issue body references its genuine screenshot or repository evidence correctly.

Required screenshots already exist:

```text
bugs/evidence/DEFECT-001/DEFECT-001-access-control.png

bugs/evidence/DEFECT-002/DEFECT-002-login-500.png

bugs/evidence/DEFECT-003/DEFECT-003-documentation-conflict.png
```

Do not regenerate them.

Do not create new fake screenshot URLs.

---

# 12. Capture Issue Results

For each issue record:

```text
Defect ID
Issue number
Issue URL
Creation status
```

Creation status:

```text
CREATED
ISSUE_ALREADY_EXISTS
FAILED
```

Never invent numbers or URLs.

---

# 13. Update Issue Mapping

Update:

```text
bugs/github-issues/issue-mapping.md
```

Required:

| Defect ID | Issue Created? | Issue Number | Issue URL | Screenshot Status |
| --------- | -------------- | ------------ | --------- | ----------------- |

Expected final result:

```text
DEFECT-001 → real issue number + URL
DEFECT-002 → real issue number + URL
DEFECT-003 → real issue number + URL
```

---

# 14. Update Bug Traceability

Update:

```text
bugs/bug-traceability.md
```

with the real GitHub issue mappings.

Preserve:

```text
Defect
→ Test
→ Triage
→ Report
→ Evidence
→ Screenshot
→ GitHub Issue
```

---

# 15. Update Defect Reports

Update only the `GitHub Issue` field in:

```text
bugs/reports/DEFECT-001-broken-admin-order-access-control.md

bugs/reports/DEFECT-002-login-unhandled-500.md

bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md
```

Use:

```text
GitHub Issue:
#<real-number> — <real-URL>
```

Do not alter defect classification, severity, reproduction, or evidence.

---

# 16. Update Bug README

Update:

```text
bugs/README.md
```

Final expected state:

```text
Confirmed defects:
3

GitHub issues:
3 / 3

Screenshot evidence:
3 / 3

Bug reporting:
COMPLETE
```

---

# 17. GitHub Publication Evidence

Create:

```text
bugs/github-issues/github-publication-evidence.md
```

Required table:

| Defect | Issue Number | URL | Status |
| ------ | ------------ | --- | ------ |

Also record:

```text
Repository:
Justaguy666/HW06-API_Testing

GitHub CLI:
<version>

Authentication:
AUTHENTICATED

Issues required:
3

Issues mapped:
3
```

Do not record authentication secrets.

---

# 18. Security Audit

After publication scan modified bug artifacts.

Required:

```text
plaintext passwords:
0

JWT values:
0

Bearer tokens:
0

student identifier:
0

GitHub auth tokens:
0
```

Issue bodies must still contain:

```text
absolute C:\Users\ paths:
0
```

---

# 19. Do Not Modify Screenshots

Prompt 028 already completed genuine screenshot capture.

Do not:

* regenerate screenshots,
* replace them with synthetic images,
* modify their runtime meaning.

Only verify they remain present.

---

# 20. Completion Gate

Report:

```text
BUG_REPORTING_COMPLETE
```

only when all three confirmed defects have:

```text
Markdown report
Issue body
Runtime/document evidence
Genuine screenshot
Real GitHub issue number
Real GitHub issue URL
Traceability mapping
```

Otherwise use:

```text
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING
```

and provide the exact unresolved technical blocker.

---

# 21. Required Final Response Structure

Use exactly:

# Prompt 028B — Resolve GitHub Publication

## 1. Executive Summary

Include:

* GitHub CLI resolution,
* authentication status,
* repository,
* existing issues discovered,
* new issues created,
* total confirmed defects mapped,
* completion status.

## 2. GitHub CLI Resolution

## 3. Authentication Validation

## 4. Repository Validation

## 5. Duplicate-Issue Audit

## 6. DEFECT-001 Publication

## 7. DEFECT-002 Publication

## 8. DEFECT-003 Publication

## 9. Final Issue Mapping

## 10. Bug Traceability Update

## 11. Defect Report Updates

## 12. Screenshot Validation

## 13. Secret Audit

## 14. Quality Validation

## 15. Bug Reporting Status

Use:

```text
BUG_REPORTING_COMPLETE
```

or:

```text
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING
```

## 16. Current Project Status

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

SCREENSHOTS:
3 / 3 — COMPLETE

GITHUB ISSUES:
3 / 3 — COMPLETE / PENDING

CI/CD:
NOT STARTED
```

## 17. Machine-Usable Summary

End exactly:

```text
PROMPT_028B_SUMMARY

Repository:
Justaguy666/HW06-API_Testing

GitHub CLI:
AVAILABLE / UNAVAILABLE

GitHub authentication:
AUTHENTICATED / NOT_AUTHENTICATED

Confirmed defects:
3

GitHub issues required:
3

Existing matching issues:

New issues created:

Total mapped issues:

DEFECT-001:
ISSUE_NUMBER:
ISSUE_URL:

DEFECT-002:
ISSUE_NUMBER:
ISSUE_URL:

DEFECT-003:
ISSUE_NUMBER:
ISSUE_URL:

Genuine screenshots:
3

Bug artifact secret exposures:
0

Fake issue URLs:
0

Duplicate issues created:
0

Bug reporting status:
BUG_REPORTING_COMPLETE /
BUG_REPORTING_PARTIALLY_COMPLETE_GITHUB_PENDING

Next required prompt if complete:
PROMPT 029 — IMPLEMENT NEWMAN CI/CD WITH PASSING AND INTENTIONAL-FAIL WORKFLOWS
```

---

# 22. Output Artifacts

Update:

```text
bugs/README.md
bugs/bug-traceability.md

bugs/github-issues/issue-mapping.md

bugs/reports/DEFECT-001-broken-admin-order-access-control.md
bugs/reports/DEFECT-002-login-unhandled-500.md
bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md
```

Create:

```text
bugs/github-issues/github-publication-evidence.md
```

Log:

```text
prompts/Prompt-028B-resolve-github-publication.md
```

Append exactly one Prompt 028B entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–028 historical prompt contents.

---

# 23. Final Constraints

* Publish exactly the three confirmed defects.
* Do not create duplicate issues.
* Install only GitHub CLI if genuinely missing.
* Never print or commit GitHub tokens.
* Never fabricate issue URLs/numbers.
* Never modify defect evidence to make publication easier.
* Do not create issues for non-defect findings.
* Preserve screenshots from Prompt 028.
* Preserve defect IDs and testcase IDs.
* Update only publication-related report metadata.
* Do not begin CI/CD until GitHub publication is resolved or proven technically impossible.

The objective is:

**3 Completed Local Bug Packages → 3 Real GitHub Issues → BUG_REPORTING_COMPLETE**
