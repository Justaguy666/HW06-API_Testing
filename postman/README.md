# HW06 Postman Build

## Purpose and scope

This directory implements the approved Postman layer for FR-02, FR-07, and FR-18. The canonical logical suite remains 122 tests: 114 executable testcase units are represented in the collection and eight blocked logical tests remain traceable but have no fake executable request.

The collection has not been sent to the SUT and Newman has not been run.

## Directory layout

```text
postman/
├── README.md
├── collections/HW06-API-Testing.postman_collection.json
├── environments/HW06-local.postman_environment.json
├── traceability/
│   ├── testcase-postman-matrix.md
│   ├── setup-postman-matrix.md
│   └── blocked-tests.md
└── validation/
    ├── validate-postman-build.js
    └── build-validation.md
```

## Collection organization

- `00 - Setup`: documented registration, authentication, Product discovery, and Admin order discovery.
- `FR-02 - Login and Lockout`: deterministic-oracle, exploratory, and runtime/stateful units.
- `FR-07 - Cart`: GET, POST, and sequence/state units.
- `FR-18 - Admin Order Management`: list, update, and sequence/state units.

Single-request logical tests are Postman request units. Multi-request logical tests are folders named `[TC-API-NNN] <Title>` whose steps preserve the same parent ID in every description.

## Import steps

1. Import `collections/HW06-API-Testing.postman_collection.json` into Postman.
2. Import `environments/HW06-local.postman_environment.json`.
3. Select the `HW06 Local` environment.
4. Populate `student_id`, `admin_email`, and `admin_password` locally.
5. Confirm `base_url` for the local environment.
6. Run setup requests in their collection order before dependent testcase folders.

Do not export populated credentials or runtime tokens back into the repository.

## Environment variables

| Variable group | Variables | Checked-in value |
| --- | --- | --- |
| Environment | `base_url` | `http://localhost:3000` safe local default |
| Required private input | `student_id`, `admin_email`, `admin_password` | Empty |
| Generated normal identities | `user_email`, `user_password`, `user_b_email`, `user_b_password`, `wrong_role_email`, `wrong_role_password` | Empty; generated at runtime if absent |
| Runtime tokens | `user_token`, `user_b_token`, `admin_token`, `wrong_role_token` | Empty |
| Product context | `existing_product_id`, `missing_product_id`, `existing_product_name`, `existing_product_price` | Empty |
| Order context | `existing_order_id`, `missing_order_id`, `current_order_status`, `second_order_id` | Empty |
| Runtime probe context | `run_id`, `unassociated_email`, `wrong_password` | Empty |

The environment template contains 25 variables.

## Collection variables

Checked-in collection variables are non-secret scratch slots: `cart_snapshot_before`, `cart_snapshot_after`, `orders_snapshot_1`, and `orders_snapshot_2`. Sequence scripts also create temporary collection variables and unset them when practical. Runtime tokens and credentials use the selected environment and are empty in the exported files.

## Secret handling

- Real credentials, JWTs, session tokens, and the actual student ID are absent.
- Authentication setup extracts tokens without logging their values.
- Observation scripts record only status, response time, Content-Type, body length, selected non-sensitive field names, or comparison booleans.
- Populated Postman environments must remain local and uncommitted.

Static plaintext secret count: `0`.

## Setup sequence

The collection contains 11 supporting HTTP request items:

1. Register primary user.
2. Login primary user.
3. Register secondary user.
4. Login secondary user.
5. Discover existing Product.
6. Confirm discovered Product.
7. Verify a missing-Product candidate.
8. Register wrong-role user.
9. Login wrong-role user.
10. Login Admin using private credentials.
11. Discover existing/current/multiple-order context and derive an absent order candidate.

Unavailable SETUP-012–014 are documented in setup traceability and are not implemented as fake endpoints.

## Runtime discovery

Product and order IDs are obtained from documented list/detail operations. No existing Product or order is assumed to have ID `1`. Missing-resource candidates are derived from observed identifiers and retained only after the planned absence check. If setup cannot establish a required value, dependent execution must stop or be reported as a runtime precondition failure rather than silently substituting an ID.

## Shared pre-request behavior

The collection-level pre-request script:

- emits clear messages when `base_url` or `student_id` is absent,
- creates a run-scoped `run_id`,
- creates benign non-associated-email and wrong-password probe values,
- performs no network setup.

## Exploratory semantics

`EXECUTABLE_EXPLORATORY` scripts use `[OBS][TC-API-NNN]` output. They capture transport and useful non-sensitive response information without asserting undocumented status, schema, Cart semantics, lockout thresholds, order transitions, or response Content-Type.

An observational `pm.test()` checks that a real response object/status code exists; it is not a semantic pass oracle.

## Deterministic assertions

Exact status `200` is asserted only for the documented successful-login cases TC-API-001 and TC-API-074. Authentication/authorization denial cases assert only that the protected operation did not return a successful 2xx response. Method/path cases assert the documented operation itself. Other unspecified layers remain observations.

## Blocked logical tests

TC-API-092, TC-API-093, TC-API-118, TC-API-121, TC-API-127, TC-API-128, TC-API-164, and TC-API-181 are preserved in `traceability/blocked-tests.md`. They have no executable testcase unit and are not planned for Newman execution.

## X-Student-Id policy

Every one of the 148 HTTP request definitions—including all 11 setup requests and 137 testcase step requests—contains:

```text
X-Student-Id: {{student_id}}
```

Static requests missing this header: `0`.

## Static validation

Run only the local validator:

```text
node postman/validation/validate-postman-build.js
```

It parses local JSON/Markdown and performs no network requests. The recorded result is in `validation/build-validation.md`.

## Newman execution

Newman execution, CLI/JSON/HTML reporting, API pass/fail interpretation, runtime response capture, screenshots, and bug reporting are deferred to a later controlled-execution prompt.
