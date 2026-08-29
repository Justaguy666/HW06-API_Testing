# DEFECT-003 — Setup guide and README provide conflicting credentials for the seeded Admin account

**Defect ID:** DEFECT-003  
**Type:** DOCUMENTATION  
**Severity:** LOW  
**Status:** CONFIRMED  
**Affected Feature:** Local Admin runtime setup  
**Affected Artifacts:** `eshop-sut/setup_guide.md`; `eshop-sut/README.md`  
**Detected By Test IDs:** Runtime prerequisite validation; no logical testcase ID

## Environment

- Local repository and SUT
- Backend base URL: `http://localhost:3000`
- Node.js: v22.17.0
- Newman: 6.2.2 through `npx`
- Validation date: 2026-08-30 (+07:00)

## Preconditions

Use the repository-provided local seed fixture without altering the Admin credential or role.

## Minimal Reproduction Steps

1. Inspect the Admin fixture documentation in `eshop-sut/setup_guide.md:103–105`.
2. Inspect the Admin fixture documentation in `eshop-sut/README.md:21–24`.
3. Observe that the same Admin identity has different documented password values.
4. Compare both labels with the repository seed fixture without printing the secret.
5. Observe that a legitimate login confirms only the seed-consistent documented credential.

## Expected Behavior

Repository setup documentation should provide one consistent credential for the seeded local Admin fixture.

## Actual Behavior

The same Admin identity is documented in both files, but the password values conflict. The seed matches exactly one documented credential, and legitimate runtime login confirms that credential.

## Reproducibility

REPRODUCED through static documentation comparison and legitimate local login evidence.

## Impact

Users following the conflicting setup documentation can fail Admin authentication and trigger temporary account lockout, delaying or blocking FR-18 execution.

## Specification / Documentation Evidence

- Same Admin identity documented: YES
- Password values conflict: YES
- Seed matches exactly one documented credential: YES
- Legitimate runtime login confirms that credential: YES
- Credential labels only: `DOCUMENTED_CREDENTIAL_A`, `DOCUMENTED_CREDENTIAL_B`

## Runtime Evidence

- `bugs/evidence/DEFECT-003/documentation-comparison.md`
- `evidence/smoke/admin-prerequisite-resolution.md`

## Screenshot Evidence

`bugs/evidence/DEFECT-003/DEFECT-003-documentation-conflict.png` — genuine editor capture of the redacted comparison sourced from both repository files; source files were not changed.

`SCREENSHOT_CLASSIFICATION: REAL_SCREENSHOT_AVAILABLE`  
`SCREENSHOT_STATUS: COMPLETE`

## Security / Privacy Notes

Neither password is reproduced. Seed comparison is represented only as boolean evidence. No hash, token, Authorization header, or private identifier is present.

## Related Testcases

Runtime prerequisite validation; no logical testcase ID.

## Related Triage IDs

TRIAGE-006

## GitHub Issue

#3 — https://github.com/Justaguy666/HW06-API_Testing/issues/3

## AI Assistance Disclosure

AI assisted with structuring and formatting the report. The defect itself was identified through the recorded student test execution and human-reviewed triage evidence.
