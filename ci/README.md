# HW06 Newman CI/CD

## 1. CI purpose

The CI implementation demonstrates both a genuine green Newman regression run and a genuine red run caused by one explicitly isolated CI-only assertion.

## 2. Passing regression subset

`HW06 CI — Passing Regression Sample` contains four logical testcase units derived without semantic edits from the canonical collection:

- TC-API-001 — FR-02 successful login
- TC-API-130 — FR-07 authenticated GET Cart transport
- TC-API-173 — FR-07 HUMAN_ADDED Content-Type observation
- TC-API-048 — FR-18 unauthenticated Admin-order denial

The subset uses only SETUP-002 and SETUP-003. It has no private Admin credential dependency.

## 3. Why the full 114-test suite is not the all-pass sample

The authoritative 114-test run intentionally retains confirmed SUT defects, setup limitations, and specification ambiguity. Presenting it as an all-pass CI run would falsify the recorded project state. CI therefore uses a representative 4-test regression subset while preserving the authoritative full-run result separately.

## 4. Known defects remain separate

DEFECT-001, DEFECT-002, and DEFECT-003 remain documented under `bugs/` and GitHub Issues #1–#3. Confirmed defect tests are excluded from the green sample, not weakened or deleted.

## 5. STUDENT_ID secret

Both workflows read `STUDENT_ID` from the GitHub Actions secret of the same name. The committed environment template keeps `student_id` empty. A runtime environment is written only beneath `${RUNNER_TEMP}`, and the value is never printed.

## 6. SUT startup

Each workflow checks out the public `eshop-sut` submodule recursively, uses Node.js 22, runs `npm ci` in `eshop-sut/backend`, and starts `server.js` in the background. Loading the backend bootstrap recreates and seeds a disposable SQLite database on the GitHub-hosted runner:

```text
EPHEMERAL_CI_FIXTURE_RESET
```

`scripts/ci/wait-for-sut.js` performs a bounded reachability check against `http://127.0.0.1:3000/api/products`.

## 7. Newman version

Both workflows execute `npx --yes newman@6.2.2`.

## 8. Passing workflow

`.github/workflows/newman-ci.yml` runs on push, pull request, or manual dispatch. It becomes green only when checkout, SUT setup, environment generation, and every supported assertion in the selected sample pass.

## 9. Intentional-fail workflow

`.github/workflows/newman-intentional-fail.yml` is manual-only. Its collection contains no logical TC ID and exactly one assertion:

```text
[CI-DEMO-FAIL] Intentional CI failure demonstration
```

THIS FAILURE IS INTENTIONAL. It is not a SUT defect. It exists solely to demonstrate that the GitHub Actions Newman pipeline correctly becomes red when a test assertion fails.

## 10. Reports and artifacts

Each run produces sanitized CLI, JSON, and JUnit files. Raw Newman files and the private runtime environment remain in `${RUNNER_TEMP}`. Uploaded artifact names are:

- `hw06-newman-passing`
- `hw06-newman-intentional-fail`

## 11. Expected workflow conclusions

```text
HW06 Newman CI:
SUCCESS

HW06 Newman Intentional Failure Demo:
FAILURE — INTENTIONAL_CI_DEMO
```

## 12. Reproduction commands

Static generation and validation:

```bash
node postman/ci/build-ci-collections.js
node postman/ci/validate-ci-assets.js
node postman/validation/validate-postman-build.js
```

Runtime environment generation requires `STUDENT_ID` and optionally `CI_POSTMAN_ENV_PATH`:

```bash
node scripts/ci/build-postman-ci-environment.js
```

The Newman commands are recorded in the workflow files. Do not place private values directly on their command lines.

## 13. Evidence links

- `postman/ci/passing-selection.md`
- `ci/ci-test-traceability.md`
- `evidence/ci/passing-run.md`
- `evidence/ci/intentional-fail-run.md`
- `evidence/ci/ci-summary.md`
- `reports/ci/passing/`
- `reports/ci/intentional-fail/`

