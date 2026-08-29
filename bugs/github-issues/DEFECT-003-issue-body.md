## Summary

The setup guide and README provide different passwords for the same seeded local Admin identity. Neither password is reproduced here.

## Severity

LOW — DOCUMENTATION

## Affected Feature / Endpoint

Local Admin runtime setup; `eshop-sut/setup_guide.md` and `eshop-sut/README.md`.

## Preconditions

Use the repository-provided local seed fixture without altering the Admin account.

## Steps to Reproduce

1. Inspect `eshop-sut/setup_guide.md:103–105`.
2. Inspect `eshop-sut/README.md:21–24`.
3. Observe different password values for the same Admin identity.
4. Compare both labeled values with the seed without printing either value.
5. Observe that legitimate login confirms only the seed-consistent source.

## Expected Behavior

Repository setup documentation should provide one consistent credential for the seeded local Admin fixture.

## Actual Behavior

The documents disagree. The seed matches exactly one documented credential, and legitimate runtime login confirms that credential.

## Reproducibility

Reproduced by static source comparison and legitimate local login evidence.

## Impact

Users can fail Admin login and trigger temporary account lockout, blocking FR-18 setup and execution.

## Detected By

Runtime prerequisite validation; TRIAGE-006.

## Evidence

- `bugs/reports/DEFECT-003-conflicting-admin-credentials-documentation.md`
- `bugs/evidence/DEFECT-003/documentation-comparison.md`
- `evidence/smoke/admin-prerequisite-resolution.md`

## Screenshot

`bugs/evidence/DEFECT-003/DEFECT-003-documentation-conflict.png`

## Environment

Local repository/SUT; Node.js v22.17.0; Newman 6.2.2; validation date 2026-08-30 (+07:00).

