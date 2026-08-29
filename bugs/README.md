# HW06 Confirmed Defects

This directory contains submission-quality reports for exactly three human-reviewed confirmed defects: two SUT defects and one documentation defect.

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

| Defect | Type | Severity | Report | Screenshot |
| --- | --- | --- | --- | --- |
| DEFECT-001 | SECURITY | HIGH | `bugs/reports/DEFECT-001-broken-admin-order-access-control.md` | COMPLETE |
| DEFECT-002 | ROBUSTNESS | MEDIUM | `bugs/reports/DEFECT-002-login-unhandled-500.md` | COMPLETE |
| DEFECT-003 | DOCUMENTATION | LOW | `bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md` | COMPLETE |

## Navigation

- Reports: `bugs/reports/`
- GitHub-ready issue bodies: `bugs/github-issues/`
- Issue mapping: `bugs/github-issues/issue-mapping.md`
- Evidence manifest: `bugs/evidence/evidence-manifest.md`
- Traceability: `bugs/bug-traceability.md`
- Non-defect execution findings: `analysis/execution-triage/non-defect-findings.md`

## GitHub status

GitHub CLI 2.98.0 was installed by Prompt 028B and authenticated as repository owner `Justaguy666`. Duplicate audit found zero existing matches, then exactly three issues were created:

- DEFECT-001 → [#1](https://github.com/Justaguy666/HW06-API_Testing/issues/1)
- DEFECT-002 → [#2](https://github.com/Justaguy666/HW06-API_Testing/issues/2)
- DEFECT-003 → [#3](https://github.com/Justaguy666/HW06-API_Testing/issues/3)

Publication status: `BUG_REPORTING_COMPLETE`.

## Evidence and redaction policy

Every finding is backed by preserved Newman/triage or repository documentation evidence. Screenshots are genuine Windows editor captures of sanitized repository evidence, never artificial terminal or Postman images. Passwords, tokens, Authorization headers, private identifiers, sensitive local paths, and unrelated response records are excluded. Credential conflicts use `DOCUMENTED_CREDENTIAL_A` and `DOCUMENTED_CREDENTIAL_B` labels only.

Setup/data limitations, specification ambiguities, and the fixed Postman harness defect remain in the triage analysis and are not reported here as bugs.
