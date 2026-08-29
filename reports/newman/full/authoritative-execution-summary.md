# Authoritative Initial Full Newman Run

## Scope and command

Run label: `AUTHORITATIVE_INITIAL_FULL_RUN`

```text
npx --yes newman@6.2.2 run postman/collections/HW06-API-Testing.postman_collection.json -e postman/runtime/HW06-local.runtime.postman_environment.json --reporters cli,json --reporter-json-export postman/runtime/authoritative-report.raw.json --color off
```

The private raw report was sanitized into `authoritative-report.json`. The raw private-bearing copy remains only in the Git-ignored runtime directory.

## Newman result

| Metric | Result |
| --- | ---: |
| Exit code | 1 |
| Iterations | 1 |
| HTTP requests | 167 |
| Request failures | 0 |
| Test scripts | 164 |
| Assertions | 173 |
| Assertion failures | 1 |
| Skipped requests | 0 |
| Duration | 14,852 ms |

Exit code 1 is attributable to one supported assertion failure in TC-API-047. It is retained as a failure candidate and is not yet a confirmed bug.

## Logical result summary

| Logical Result | Count |
| --- | ---: |
| PASS | 10 |
| OBSERVED_EXPLORATORY | 80 |
| FAIL_ASSERTION | 1 |
| FAIL_REQUEST | 0 |
| FAIL_SETUP | 23 |
| INCOMPLETE_SEQUENCE | 0 |
| BLOCKED_RUNTIME_PREREQUISITE | 0 |
| TOTAL | 114 |

Successful/observed execution rate: `90 / 114 = 78.95%`.

## Feature summary

| Feature | Planned Executable | PASS | OBSERVED | Assertion Fail | Request Fail | Setup Fail | Incomplete |
| ------- | -----------------: | ---: | -------: | -------------: | -----------: | ---------: | ---------: |
| FR-02 | 39 | 4 | 35 | 0 | 0 | 0 | 0 |
| FR-07 | 40 | 2 | 37 | 0 | 0 | 1 | 0 |
| FR-18 | 35 | 4 | 8 | 1 | 0 | 22 | 0 |
| TOTAL | 114 | 10 | 80 | 1 | 0 | 23 | 0 |

## Origin summary

| Origin | Executable | Successful / Observed | Failed |
| ------ | ---------: | --------------------: | -----: |
| AI_GENERATED | 98 | 75 | 23 |
| HUMAN_ADDED | 16 | 15 | 1 |
| TOTAL | 114 | 90 | 24 |

## Hard-oracle result

Hard-oracle tests with available setup: 11. Passed: 10. Failed: 1. Pass rate: `90.91%`.

## Setup reliability

| Metric | Result |
| --- | ---: |
| Setup requests executed | 11 |
| Setup failures | 2 |
| Setup success rate | 81.82% |

Root setup failures:

- SETUP-007 did not retain a verified missing-product candidate.
- SETUP-009 found no existing order and therefore did not populate existing-order/current-state context.

## HTTP observation distribution

Testcase requests only; setup requests are excluded.

| Feature | 2xx | 4xx | 5xx | Network/Other |
| ------- | --: | --: | --: | ------------: |
| FR-02 | 8 | 60 | 2 | 0 |
| FR-07 | 43 | 4 | 0 | 0 |
| FR-18 | 12 | 27 | 0 | 0 |
| TOTAL | 63 | 91 | 2 | 0 |

HTTP 5xx signals occurred in TC-API-011 and TC-API-078. They remain exploratory executions but are registered for high-priority Prompt 027 triage.

## Traceability and safety

- Executable logical IDs accounted: 114/114.
- Canonical blocked tests executed: 0.
- Executed requests missing X-Student-Id: 0.
- Executed requests with empty X-Student-Id: 0.
- Sequence failures: 0.
- Private secrets retained in committed evidence: 0.
- Diagnostic reruns: none.
- HTML reporter: `HTML_REPORTER_NOT_AVAILABLE`.

## Triage gate

```text
READY_FOR_EXECUTION_TRIAGE
```

