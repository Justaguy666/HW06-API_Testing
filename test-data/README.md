# Concrete Test Data Design — Current Selected Suite

## Purpose

This directory transforms the 122 active logical tests for FR-02, FR-07, and FR-18 into reusable, traceable test-data definitions. It is a design artifact only: no Postman collection/environment is created and no API request has been executed.

## Canonical source

The logical source of truth is `analysis/current-selected-suite/test-case-design.md`, supported by the verified basis, partition summary, boundary summary, blocker register, coverage matrix, reconciliation summary, and student-extension integration summary. `eshop-sut/api_specification.md` is the primary API contract. The setup guide is used only for environment/provisioning context.

Historical FR-09, FR-17 cross-feature, FR-10 cross-feature, inactive, and rejected proposals are excluded.

## ID conventions

- `DATA-SHARED-nnn`: reusable cross-feature values or observations.
- `DATA-FR02-nnn`, `DATA-FR07-nnn`, `DATA-FR18-nnn`: feature-local data assets.
- `SETUP-nnn`: documented supporting operation or an explicitly blocked/manual setup activity.
- `STATE-DATA-nnn`: reproducible initial-state and sequence contract.
- `GEN-nnn`: logical generator design; implementation is deferred.

DATA IDs represent semantic data classes, not individual testcases. One test may use several DATA IDs and one DATA ID may support many tests.

## Static and runtime distinction

`STATIC` means the representation is safe to define before a run. `GENERATED_AT_RUNTIME` means a unique value or identity must be created during the run. `DISCOVERED_AT_RUNTIME` means an existing identity/resource/state must be obtained from a documented interface. A name such as `{{existing_order_id}}` is never assigned a fabricated constant.

The per-test primary status is one of `STATIC_READY`, `RUNTIME_PROVISION_REQUIRED`, `STATE_SETUP_REQUIRED`, `EXPLORATORY_PROBE_READY`, or `BLOCKED_BY_SPEC`. Runtime needs can still be listed as dependencies of an exploratory test; the primary status preserves its observational semantics.

## Exploratory probe rules

Probe values are finite, reproducible, and varied one factor at a time. They define an observation target, not an expected acceptance or rejection. Structured query, rate-control, Unicode, special-character, negative, fractional, long-string, and large-number values remain exploratory.

## Boundary integrity

The current specification provides no accepted BVA boundary for FR-02, FR-07, or FR-18. Long strings, `-1`, `1.5`, and `1000000000000` are robustness representatives with `Boundary Status: NOT_A_BOUNDARY`; they are not min/max, overflow, or adjacent-boundary values.

## Secret handling

Repository artifacts contain variable names only. Credentials and tokens are populated later through a private local Postman environment or process environment. Real passwords, bearer tokens, and the student's actual ID are not committed.

Committed plaintext secret count: `0`.

## Downstream Postman usage

`static-data-catalog.md` supplies literal representations and logical generators. `runtime-data-catalog.md` defines identities, resources, state, setup, isolation, and cleanup. `testcase-data-matrix.md` maps all 122 tests. `postman-variable-plan.md` defines scopes without implementing Postman.

Because 23 tests remain structurally blocked by missing specification rules or reproducible state setup, overall status is `NOT_READY_FOR_POSTMAN_IMPLEMENTATION`. The unblocked subset has a defensible implementation plan.

## Concrete data quality audit

| Check | Result |
| --- | --- |
| 122 active tests mapped | PASS |
| AI/HUMAN provenance preserved | PASS |
| No historical FR-09 execution data | PASS |
| No undocumented boundary introduced | PASS |
| No runtime-existing resource fabricated | PASS |
| No unsupported expected result introduced | PASS |
| Stateful setup explicitly identified | PASS |
| Cleanup limitations documented | PASS |
| Student ID header variable planned | PASS |
| No plaintext secrets | PASS |
| No Postman implementation yet | PASS |
| No API execution | PASS |

## Current readiness counts

| Per-test data status | Count |
| --- | ---: |
| STATIC_READY | 2 |
| RUNTIME_PROVISION_REQUIRED | 33 |
| STATE_SETUP_REQUIRED | 8 |
| EXPLORATORY_PROBE_READY | 56 |
| BLOCKED_BY_SPEC | 23 |
| TOTAL | 122 |

| Per-test Postman readiness | Count |
| --- | ---: |
| DATA_READY_FOR_POSTMAN | 2 |
| DATA_READY_BUT_EXPLORATORY | 56 |
| POSTMAN_SETUP_REQUIRED | 41 |
| BLOCKED_BEFORE_POSTMAN | 23 |
| TOTAL | 122 |
