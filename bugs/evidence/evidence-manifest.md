# Bug Evidence Manifest

| Defect | Runtime/Text Evidence | Screenshot | Screenshot Status | Secret Audit |
| ------ | --------------------- | ---------- | ----------------- | ------------ |
| DEFECT-001 | `bugs/evidence/DEFECT-001/reproduction-summary.md`; TC-API-047/055 sanitized excerpts; preserved Newman JSON | `bugs/evidence/DEFECT-001/DEFECT-001-access-control.png` | COMPLETE | PASS — no token, password, private identifier, or response records |
| DEFECT-002 | `bugs/evidence/DEFECT-002/reproduction-summary.md`; TC-API-011/078 sanitized excerpts; preserved Newman JSON | `bugs/evidence/DEFECT-002/DEFECT-002-login-500.png` | COMPLETE | PASS — no credential, token, private identifier, or local stack path |
| DEFECT-003 | `bugs/evidence/DEFECT-003/documentation-comparison.md`; `evidence/smoke/admin-prerequisite-resolution.md` | `bugs/evidence/DEFECT-003/DEFECT-003-documentation-conflict.png` | COMPLETE | PASS — both password values replaced by credential labels |

All screenshots are genuine Windows editor captures of repository evidence files. No terminal, Newman, Postman, or documentation view was synthetically drawn. Sanitization changed only the retained display excerpts, not the authoritative source artifacts.

