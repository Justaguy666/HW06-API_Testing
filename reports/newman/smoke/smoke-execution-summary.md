# Controlled Newman Smoke Execution Summary

## Smoke scope

- Nine logical testcase units: three each from FR-02, FR-07, and FR-18.
- Ten testcase HTTP requests plus five supporting setup requests in `INITIAL_RUN`.
- Zero blocked logical-suite IDs selected.
- Three HUMAN_ADDED units included.
- Supported hard assertions exercised by TC-API-001 and TC-API-048.

## Setup results

Primary-user registration/login and product discovery/confirmation passed. Admin login did not establish `admin_token`: the setup-guide credential returned 401, and the alternate credential documented in the SUT README returned 403 during a targeted retry.

Root-cause classification: `PRIVATE_PREREQUISITE_MISSING` with a local documentation/configuration mismatch. This is not classified as a Postman implementation defect or confirmed SUT defect.

## Test results

| Result | Count |
| --- | ---: |
| PASS | 3 |
| OBSERVED_EXPLORATORY | 4 |
| BLOCKED_RUNTIME_PREREQUISITE | 2 |
| FAIL_ASSERTION | 0 |
| FAIL_REQUEST | 0 |
| FAIL_SETUP | 0 |

Newman transport summary for the initial run: 15 requests executed, 15 assertions passed, zero Newman request/assertion failures. Logical result classification separately marks two FR-18 cases blocked because Newman transport success cannot substitute for the missing Admin prerequisite.

## Postman fixes

Postman implementation defects found: 0. Postman implementation fixes applied: 0. The private runtime credential candidate was adjusted for one targeted retry; no canonical collection, environment template, traceability, or logical testcase semantics were changed.

## Potential SUT defects

None classified at smoke stage. The Admin credential inconsistency remains a runtime/documentation prerequisite issue pending a verified local Admin credential.

## Remaining runtime prerequisites

- Supply or establish a locally valid Admin credential for `SETUP-005`.
- Confirm `admin_token` becomes populated before executing Admin-authenticated FR-18 cases.

## Full-suite readiness

```text
NOT_READY_FOR_FULL_NEWMAN_EXECUTION
```

FR-02 and FR-07 smoke paths are ready. A full run would currently produce misleading FR-18 results because authenticated Admin setup is not available.

## Optional HTML report

```text
HTML_REPORTER_NOT_AVAILABLE
```

## PROMPT 025 — ADMIN PREREQUISITE FOLLOW-UP

Prompt 024 history above remains unchanged. Read-only fixture diagnosis found one Admin account matching the repository seed credential, but with failed-attempt state and a temporary lock. The lock expired naturally; no database reset, direct SQL mutation, authentication bypass, or source change was performed.

Targeted final retry scope:

- SETUP-005 only
- TC-API-046 only
- TC-API-179 only

Results:

| Item | Result | HTTP Status |
| --- | --- | ---: |
| SETUP-005 | PASS; `admin_token` populated | 200 |
| TC-API-046 | PASS | 200 |
| TC-API-179 | OBSERVED_EXPLORATORY | 200 |

X-Student-Id was present and non-empty on 3/3 requests. Static validation remained PASS. The documentation conflict is classified `POTENTIAL_DOCUMENTATION_DEFECT`; the runtime root cause is `ACCOUNT_STATE_PROBLEM`.

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```
