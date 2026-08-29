# GitHub Issue Mapping

Repository: `Justaguy666/HW06-API_Testing`

GitHub CLI status: `GH_NOT_AVAILABLE`  
Issue creation status: `GITHUB_ISSUE_CREATION_BLOCKED`  
Exact failure: the `gh` executable is not installed or is not available on `PATH`. `gh --version` and `gh auth status` failed, and an explicit `gh issue create` attempt for DEFECT-001 also exited with code 1 because PowerShell could not resolve the `gh` command. No request reached GitHub, so DEFECT-002 and DEFECT-003 were not redundantly attempted with the same missing executable.

Planned issue titles:

- DEFECT-001: `[FR-18][Security] Non-Admin user can access Admin order operations`
- DEFECT-002: `[FR-02][Robustness] Login returns HTTP 500 when JSON body is unavailable`
- DEFECT-003: `[Docs] Conflicting seeded Admin credentials in setup guide and README`

| Defect ID | Issue Created? | Issue Number | Issue URL | Creation Status | Screenshot Status |
| --------- | -------------- | ------------ | --------- | --------------- | ----------------- |
| DEFECT-001 | NO | PENDING | PENDING | GITHUB_ISSUE_CREATION_BLOCKED — GH_NOT_AVAILABLE | COMPLETE |
| DEFECT-002 | NO | PENDING | PENDING | GITHUB_ISSUE_CREATION_BLOCKED — GH_NOT_AVAILABLE | COMPLETE |
| DEFECT-003 | NO | PENDING | PENDING | GITHUB_ISSUE_CREATION_BLOCKED — GH_NOT_AVAILABLE | COMPLETE |

Required human action: install GitHub CLI, authenticate with issue-write permission for the detected repository, then create exactly one issue from each `bugs/github-issues/DEFECT-00X-issue-body.md` file. Do not create issues for non-defect triage findings.
