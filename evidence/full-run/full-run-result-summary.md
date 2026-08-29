# Authoritative Full-Run Result Summary

## Raw Newman counts

| Metric | Count |
| --- | ---: |
| Iterations | 1 |
| Requests | 167 |
| Request failures | 0 |
| Test scripts | 164 |
| Assertions | 173 |
| Assertion failures | 1 |
| Skipped requests | 0 |

Newman exit code: `1`. Duration: 14,852 ms.

## Logical testcase counts

| Result | Count |
| --- | ---: |
| PASS | 10 |
| OBSERVED_EXPLORATORY | 80 |
| FAIL_ASSERTION | 1 |
| FAIL_REQUEST | 0 |
| FAIL_SETUP | 23 |
| INCOMPLETE_SEQUENCE | 0 |
| BLOCKED_RUNTIME_PREREQUISITE | 0 |
| TOTAL | 114 |

Raw successful/observed rate: `78.95%`. Hard-oracle pass rate with available setup: `10/11 = 90.91%`.

## Feature results

| Feature | Planned | PASS | OBSERVED | Assertion Fail | Request Fail | Setup Fail | Incomplete |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-02 | 39 | 4 | 35 | 0 | 0 | 0 | 0 |
| FR-07 | 40 | 2 | 37 | 0 | 0 | 1 | 0 |
| FR-18 | 35 | 4 | 8 | 1 | 0 | 22 | 0 |
| TOTAL | 114 | 10 | 80 | 1 | 0 | 23 | 0 |

## Origin results

| Origin | Executable | Successful / Observed | Failed |
| --- | ---: | ---: | ---: |
| AI_GENERATED | 98 | 75 | 23 |
| HUMAN_ADDED | 16 | 15 | 1 |
| TOTAL | 114 | 90 | 24 |

## Failure and observation signals

- TC-API-047 has the sole supported assertion failure: a non-Admin caller observed HTTP 200 on an Admin order-list endpoint.
- SETUP-007 could not establish a verified missing-product candidate, affecting TC-API-155.
- SETUP-009 could not establish an existing-order/current-status context, affecting 22 FR-18 logical tests through SETUP-009, SETUP-011, or SETUP-014 dependencies.
- TC-API-011 and TC-API-078 observed HTTP 500 and require high-priority triage without changing their exploratory classification.
- No Newman request, network, script, or sequence failure occurred.
- All eight canonical blocked tests remained excluded.

The separate Admin documentation mismatch from Prompt 025 is carried forward as a documentation candidate.

