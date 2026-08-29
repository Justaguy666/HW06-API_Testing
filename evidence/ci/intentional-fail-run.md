# Intentional-Fail GitHub Actions Run

## Run Identification

| Field | Value |
|---|---|
| Workflow | HW06 Newman Intentional Failure Demo |
| Run ID | 33279644102 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279644102 |
| Commit SHA | 3ac0b3d4f58209ee93d8ea1e87db0b002eeb8d36 |
| Conclusion | **failure** |
| Triggered by | workflow_dispatch (manual — after passing run confirmed) |
| Started at | 2026-08-29T22:52:44Z |
| Completed at | 2026-08-29T22:53:09Z |

## Failure Attribution

| Attribute | Result |
|---|---|
| SUT startup | **PASS** |
| Runtime environment creation | **PASS** |
| Newman executed | **YES** |
| Newman exit code | **1** |
| `[CI-DEMO-FAIL]` assertion failed | **YES** |
| Workflow conclusion | **failure** |
| Failure cause | `CI_DEMO_ONLY` — intentional demonstration only |

## Step-by-Step Evidence

| Step | Result |
|---|---|
| Set up job | ✓ |
| Checkout repository and SUT submodule | ✓ |
| Set up Node.js 22 | ✓ |
| Install backend dependencies | ✓ |
| Build and validate derived CI assets | ✓ |
| Start EShop SUT with ephemeral CI fixture reset | ✓ |
| Wait for SUT readiness | ✓ |
| Build private runtime Postman environment | ✓ |
| Run intentional Newman failure and preserve reports | ✓ (Newman ran, reports saved) |
| Upload intentional-fail Newman reports | ✓ |
| Mark the verified intentional demonstration red | ✗ (deliberate `exit 1` — CI_DEMO_ONLY confirmed) |

## Newman Results

| Metric | Value |
|---|---|
| Newman exit code | **1** |
| HTTP requests | 1 |
| Assertions | 1 |
| Assertion failures | **1** |
| Iterations | 1 |

## Assertion Detail

```text
Item:      [CI-DEMO-ONLY] GET products with intentional assertion failure
CI tag:    CI-DEMO-ONLY = true
Assertion: [CI-DEMO-FAIL] Intentional CI failure demonstration
Result:    FAILED
Error:     Intentional failure required by HW06 CI demonstration: expected true to deeply equal false
```

## Logical Testcase Impact

This failure is **CI_DEMO_ONLY**. It is:
- Not a logical testcase (no `TC-API-NNN` ID)
- Not a product bug
- Not a defect report
- Designed to turn the workflow red for demonstration purposes

## Actions Artifact

| Field | Value |
|---|---|
| Artifact name | hw06-newman-intentional-fail |
| Artifact retention | 14 days |
| Local copy | `reports/ci/intentional-fail/` |
| Secrets included | false |

```text
STATUS:
COMPLETE
CONCLUSION: failure
FAILURE_ATTRIBUTION: CI_DEMO_ONLY
NEWMAN_EXIT_CODE: 1
INTENTIONAL_ASSERTION_FAILURES: 1
```
