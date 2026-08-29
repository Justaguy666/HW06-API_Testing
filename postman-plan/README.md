# Postman Execution-Scope Plan

## Purpose and downstream contract

This directory partitions all 122 active logical tests into a defensible Postman/Newman implementation scope. It does not create Postman JSON, execute the API, or run Newman. Prompt 023 must preserve the execution manifest, build only executable requests, document skips, and avoid inventing requirements.

## Execution-class definitions

- `EXECUTABLE_DETERMINISTIC`: request and supported hard assertion are defensible without testcase-specific runtime provisioning.
- `EXECUTABLE_EXPLORATORY`: request is executable; unspecified semantic outcomes are recorded rather than asserted.
- `EXECUTABLE_WITH_RUNTIME_SETUP`: documented setup/provisioning must run before the testcase; assertion depth remains testcase-specific.
- `BLOCKED_SETUP_UNAVAILABLE`: documented operations cannot establish the required resource/environment.
- `BLOCKED_STATE_UNAVAILABLE`: required state, transition, or reset cannot be established defensibly.
- `BLOCKED_SCOPE_OR_CHANNEL`: the required observation lies outside the documented API-testing channel.

These execution classes do not alter logical classification, authorship, objectives, IDs, DATA mappings, or requirement blockers.

## Supported-assertion principle

Hard assertions may cover only explicit contract layers. Unsupported status codes, error messages, schemas, Cart behavior, lockout rules, order transitions, and traceability fields must not be asserted. A missing hard oracle does not prevent a request from being executed and observed.

## Exploratory assertion policy

An executable exploratory request may capture request completion, response existence, elapsed time, headers, and raw/parsed body evidence. JSON parseability is asserted only when the contract justifies JSON for that response. No generic `status == 200`, `status == 400`, error-message, or schema assertion is allowed without specification support.

## Skip policy

Blocked logical tests remain in the manifest and blocked register. Prompt 023 must not create fake passing assertions. It may include non-executable documentation metadata, but Newman must skip the blocked testcase. A blocked test can be promoted only when the evidence named in `blocked-test-register.md` becomes available.

## Prompt-021 blocked-test reassessment

| Test ID | Feature | Current Blocker | Setup Missing? | Oracle Missing? | Executable Request? | New Execution Classification | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-API-013 | FR-02 | Failed-attempt threshold/lockout semantics | NO for finite repeated requests | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Register a fresh user, issue a finite failure sequence, and observe; do not claim threshold or unlock semantics. |
| TC-API-090 | FR-02 | Failed-attempt counter visibility | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | A successful login followed by one failed attempt is reproducible; counter behavior remains observational. |
| TC-API-091 | FR-02 | Counter reset rule | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | One failed attempt followed by valid credentials is reproducible; reset is not asserted. |
| TC-API-092 | FR-02 | Locked-state setup | YES | YES | NO under required state | BLOCKED_STATE_UNAVAILABLE | A known locked account cannot be established without threshold/state evidence. |
| TC-API-093 | FR-02 | Lock duration/unlock/reset | YES | YES | NO under required state | BLOCKED_STATE_UNAVAILABLE | Neither locked start state nor post-duration state is reproducible. |
| TC-API-154 | FR-07 | Body-ID/product relationship and mutation oracle | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Product list/detail can discover an existing product; Cart result remains observational. |
| TC-API-155 | FR-07 | Missing-product relationship/oracle | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Product APIs can support a verified absent candidate; Cart response is observed. |
| TC-API-156 | FR-07 | Cart ownership/mapping | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Same generated token can be reused; ownership behavior is not asserted. |
| TC-API-157 | FR-07 | Cross-user Cart ownership | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Two users can be registered/logged in and their visible Cart responses compared. |
| TC-API-158 | FR-07 | First/later lifecycle semantics | NO | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | A fresh user allows operational first and second access; lifecycle meaning remains observational. |
| TC-API-164 | FR-07 | Availability/stock state | YES | YES | NO under required state | BLOCKED_SETUP_UNAVAILABLE | No documented stock/availability field or setup mechanism exists. |
| TC-API-050 | FR-18 | Transition matrix/source state | NO for issuing request | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Discover an existing order, request `pending`, and observe without claiming transition validity. |
| TC-API-051 | FR-18 | Transition matrix/source state | NO for issuing request | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Discover an existing order, request `confirmed`, and observe without claiming transition validity. |
| TC-API-052 | FR-18 | Transition matrix/source state | NO for issuing request | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Discover an existing order, request `shipping`, and observe without claiming transition validity. |
| TC-API-053 | FR-18 | Transition matrix/source state | NO for issuing request | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Discover an existing order, request `delivered`, and observe without claiming transition validity. |
| TC-API-054 | FR-18 | Transition matrix/source state | NO for issuing request | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Discover an existing order, request `canceled`, and observe without claiming transition validity. |
| TC-API-118 | FR-18 | System-wide empty-order setup | YES | YES | NO under required state | BLOCKED_SETUP_UNAVAILABLE | No documented API can establish an empty global order set. |
| TC-API-121 | FR-18 | Guaranteed successful transition | YES | YES | NO for successful-response objective | BLOCKED_STATE_UNAVAILABLE | A generic update can be sent, but the testcase specifically requires a known successful update. |
| TC-API-124 | FR-18 | Allowed nominal update context | NO for issuing observation | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Existing order plus documented target and extra member can be submitted observationally. |
| TC-API-125 | FR-18 | Current-state/idempotence rule | NO when current status is API-visible at runtime | YES | YES with runtime guard | EXECUTABLE_WITH_RUNTIME_SETUP | Capture a visible current status and submit it again; skip locally if the status is not observable. |
| TC-API-126 | FR-18 | Conflicting-update semantics | NO for issuing sequence | YES | YES | EXECUTABLE_WITH_RUNTIME_SETUP | Two distinct documented targets can be submitted sequentially and observed. |
| TC-API-127 | FR-18 | Successful target transition/reset | YES | YES | NO for isolation objective | BLOCKED_STATE_UNAVAILABLE | Isolation requires a known successful target mutation. |
| TC-API-128 | FR-18 | Successful transition/persistence setup | YES | YES | NO for persistence objective | BLOCKED_STATE_UNAVAILABLE | Persistence cannot be evaluated until an allowed mutation can be established. |

Prompt-021 blocked tests moved into executable observational scope: `16`. Prompt-021 blocked tests remaining blocked: `7`.

TC-API-181 was not one of the Prompt-021 blocked 23, but Prompt 022 requires it to be `BLOCKED_SCOPE_OR_CHANNEL` because no API-visible traceability channel is documented. Final blocked total: `8`.

## Deterministic assertion manifest

| Test ID | Supported Assertion Layers | Unsupported Layers |
| --- | --- | --- |
| TC-API-048 | SEMANTIC, SECURITY — protected Admin operation must not succeed without authentication | Exact STATUS, SCHEMA, STATE, detailed security/error contract |
| TC-API-049 | SEMANTIC, SECURITY — protected Admin operation must not succeed with non-Bearer representation | Exact STATUS, SCHEMA, STATE, detailed security/error contract |

Runtime-setup cases that also possess supported hard oracles retain those assertions in `execution-manifest.md`; their primary execution class records setup dependency.

## Implementation policy

| Execution Class | Build Request? | Build Tests? | Newman Execution? |
| --- | --- | --- | --- |
| EXECUTABLE_DETERMINISTIC | YES | Hard supported assertions | YES |
| EXECUTABLE_EXPLORATORY | YES | Transport plus observational capture | YES |
| EXECUTABLE_WITH_RUNTIME_SETUP | YES | Setup plus supported assertions/observations | YES |
| BLOCKED_SETUP_UNAVAILABLE | Document only | No executable request unless meaningful independently | SKIP |
| BLOCKED_STATE_UNAVAILABLE | Document only | NO | SKIP |
| BLOCKED_SCOPE_OR_CHANNEL | Document only | NO | SKIP |

## Execution blocker categories

The planning-only categories are `BLKEXEC-SETUP`, `BLKEXEC-STATE`, `BLKEXEC-RESET`, `BLKEXEC-IDENTITY`, `BLKEXEC-RESOURCE`, and `BLKEXEC-OBSERVATION_CHANNEL`. They do not replace or extend requirement blocker IDs.

## X-Student-Id requirement

Every testcase and setup request built by Prompt 023 must include `X-Student-Id: {{student_id}}`. Planned executable requests missing the header: `0`.

## Coverage and readiness

| Feature | Logical | Executable | Blocked |
| --- | ---: | ---: | ---: |
| FR-02 | 41 | 39 | 2 |
| FR-07 | 41 | 40 | 1 |
| FR-18 | 40 | 35 | 5 |
| TOTAL | 122 | 114 | 8 |

The Postman scope is fully defined even though eight logical tests remain documented skips. Therefore the gate is `READY_FOR_POSTMAN_BUILD`.

## Quality validation

| Check | Result |
| --- | --- |
| 122 active tests classified exactly once | PASS |
| AI/HUMAN origins preserved at 105/17 | PASS |
| 23 Prompt-021 blocked tests individually reassessed | PASS |
| Missing oracle distinguished from unavailable execution state | PASS |
| Runtime setup uses documented operations only | PASS |
| Eight genuine skips have evidence-to-unblock criteria | PASS |
| No logical testcase deleted or renumbered | PASS |
| No lockout, Cart ownership/stock, order-transition, or audit rule invented | PASS |
| Planned executable requests missing `X-Student-Id` | 0 — PASS |
| Postman JSON created | 0 — PASS |
| API/Newman execution performed | 0 — PASS |
