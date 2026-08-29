# Passing GitHub Actions Run

## Run Identification

| Field | Value |
|---|---|
| Workflow | HW06 Newman CI |
| Run ID | 33279580944 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279580944 |
| Commit SHA | 3ac0b3d4f58209ee93d8ea1e87db0b002eeb8d36 |
| Conclusion | **success** |
| Triggered by | push (`ci: add Newman passing and intentional-fail workflows`) |
| Started at | 2026-08-29T22:51:06Z |
| Completed at | 2026-08-29T22:51:29Z |

## Newman Results

| Metric | Value |
|---|---|
| Newman exit code | **0** |
| HTTP requests | 6 |
| Assertions | 8 |
| Assertion failures | **0** |
| Iterations | 1 |

## Logical Test Coverage

| ID | Functional Requirement | Provenance |
|---|---|---|
| TC-API-001 | FR-02 | AI_GENERATED |
| TC-API-130 | FR-07 | AI_GENERATED |
| TC-API-048 | FR-18 | AI_GENERATED |
| TC-API-173 | FR-18 | HUMAN_ADDED |

## Actions Artifact

| Field | Value |
|---|---|
| Artifact name | hw06-newman-passing |
| Artifact retention | 14 days |
| Local copy | `reports/ci/passing/` |
| Secrets included | false |

## Security Properties

- No hardcoded student ID in committed CI assets
- No JWT, Bearer token, or GitHub token in committed CI assets
- Runtime environment built from `STUDENT_ID` GitHub secret at CI execution time
- Sanitized report stored; raw runtime files discarded

```text
STATUS:
COMPLETE
CONCLUSION: success
NEWMAN_EXIT_CODE: 0
ASSERTION_FAILURES: 0
```
