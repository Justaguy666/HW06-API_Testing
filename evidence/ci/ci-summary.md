# CI Summary — HW06 Prompt 029

## Passing Workflow

| Field | Value |
|---|---|
| Workflow name | HW06 Newman CI |
| Run ID | 33279580944 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279580944 |
| Commit SHA | 3ac0b3d4f58209ee93d8ea1e87db0b002eeb8d36 |
| Conclusion | **success** |
| Newman exit code | **0** |
| HTTP requests | 6 |
| Assertions | 8 |
| Assertion failures | **0** |
| Artifact | hw06-newman-passing |

## Intentional-Fail Workflow

| Field | Value |
|---|---|
| Workflow name | HW06 Newman Intentional Failure Demo |
| Run ID | 33279644102 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279644102 |
| Commit SHA | 3ac0b3d4f58209ee93d8ea1e87db0b002eeb8d36 |
| Conclusion | **failure** |
| Newman exit code | **1** |
| HTTP requests | 1 |
| Assertions | 1 |
| Intentional assertion failures | **1** |
| Artifact | hw06-newman-intentional-fail |

## Failure Attribution

```text
FAILURE_TYPE:   CI_DEMO_ONLY
PRODUCT_BUG:    NO
LOGICAL_TEST:   NONE
ASSERTION:      [CI-DEMO-FAIL] Intentional CI failure demonstration
CAUSE:          expected true to deeply equal false (hardcoded guarantee)
```

## Security Audit

| Check | Result |
|---|---|
| Hardcoded student ID in committed CI assets | 0 |
| JWT exposure | 0 |
| Bearer token exposure | 0 |
| Password exposure | 0 |
| GitHub token exposure | 0 |
| Private runtime environment committed | 0 |
| Runtime DB committed | 0 |

## Logical CI Test Coverage

| ID | FR | Provenance | Admin required |
|---|---|---|---|
| TC-API-001 | FR-02 | AI_GENERATED | No |
| TC-API-130 | FR-07 | AI_GENERATED | No |
| TC-API-048 | FR-18 | AI_GENERATED | No |
| TC-API-173 | FR-18 | HUMAN_ADDED | No |

## Canonical Validator

```text
node postman/validation/validate-postman-build.js
→ PASS (114 executable testcase units; 0 secret exposures)

node postman/ci/validate-ci-assets.js
→ PASS (39/39 checks passed)

node postman/ci/build-ci-collections.js
→ PASS (4 logical tests; 6 HTTP requests; 1 intentional request)
```

```text
PASSING WORKFLOW:
REAL GITHUB ACTIONS RUN
CONCLUSION = SUCCESS

INTENTIONAL-FAIL WORKFLOW:
REAL GITHUB ACTIONS RUN
CONCLUSION = FAILURE

FAILURE ATTRIBUTION:
CI_DEMO_ONLY

CI/CD STATUS:
CI_CD_COMPLETE
```
