# Postman Variable Plan

This is a scope and source plan only. No Postman environment, collection, script, or request has been implemented.

## Variables

| Variable | Proposed Scope | Source | Sensitive | Used By |
| --- | --- | --- | --- | --- |
| `base_url` | ENVIRONMENT | API specification; verified locally | NO | All active requests |
| `student_id` | ENVIRONMENT | Student supplies privately | YES | `X-Student-Id` on all active requests |
| `valid_user_email` | ENVIRONMENT | SETUP-002 or private seed override | YES | FR-02 matching credential tests |
| `valid_user_password` | ENVIRONMENT | SETUP-002 or private seed override | YES | FR-02 matching credential tests |
| `admin_email` | ENVIRONMENT | Private local environment | YES | SETUP-005 |
| `admin_password` | ENVIRONMENT | Private local environment | YES | SETUP-005 |
| `run_id` | COLLECTION | Generated once at run start | NO | Unique users and missing-resource candidates |
| `unassociated_email` | RUNTIME_LOCAL | GEN-001 plus `run_id`; deliberately not registered | YES | TC-API-002, 094, 170 |
| `wrong_password` | RUNTIME_LOCAL | GEN-001 plus `run_id` | YES | FR-02 mismatch/state probes |
| `user_token` | RUNTIME_LOCAL | SETUP-003 login response | YES | Authenticated FR-07 requests |
| `second_user_token` | RUNTIME_LOCAL | SETUP-004 login response | YES | TC-API-157 and multi-user setup |
| `wrong_role_token` | RUNTIME_LOCAL | SETUP-004 normal-user login response | YES | TC-API-047, 055, 129 |
| `admin_token` | RUNTIME_LOCAL | SETUP-005 login response | YES | Protected FR-18 requests |
| `existing_product_id` | RUNTIME_LOCAL | SETUP-006 Product discovery | NO | Resource-bound FR-07 tests |
| `existing_product_name` | RUNTIME_LOCAL | SETUP-006 Product discovery | NO | Resource-bound Cart body |
| `existing_product_price` | RUNTIME_LOCAL | SETUP-006 Product discovery | NO | Resource-bound Cart body |
| `nonexisting_product_id` | RUNTIME_LOCAL | SETUP-007 verified candidate | NO | TC-API-155 |
| `existing_order_id` | RUNTIME_LOCAL | SETUP-009 Admin list discovery | YES | Existing-order FR-18 tests |
| `current_order_status` | RUNTIME_LOCAL | SETUP-009 observable Admin list field | YES | Stateful status tests |
| `nonexisting_order_id` | RUNTIME_LOCAL | SETUP-010 verified candidate | NO | TC-API-058 |
| `second_order_id` | RUNTIME_LOCAL | SETUP-011 multi-order provisioning/discovery | YES | TC-API-117, 127 |
| `target_order_status` | RUNTIME_LOCAL | Selected from DATA-FR18-005 only after valid state rules are available | NO | Status-update tests |
| `response_snapshot_a` | RUNTIME_LOCAL | First response observation | YES | Repeated-read/sequence cases |
| `response_snapshot_b` | RUNTIME_LOCAL | Second response observation | YES | Repeated-read/sequence cases |

`GLOBAL_STYLE` is reserved for runner-wide non-data behavior and is not needed for a value in this phase. Environment variables hold host/header identity and credentials. Collection variables hold non-sensitive run constants. Temporary tokens, IDs, and observations remain local to the run whenever the eventual Postman tooling permits.

## Logical generators

| Generator ID | Purpose | Inputs | Output Class | Boundary? |
| --- | --- | --- | --- | --- |
| GEN-001 | Create run-unique benign strings and account candidates | `run_id`, prefix, suffix | Unique email/password-like string | NO |
| GEN-002 | `LONG_STRING_PROBE` | length `4096`, safe character | Long reproducible string | NO — robustness probe |
| GEN-003 | `LONG_EMAIL_PROBE` | local-part length `4096`, domain `example.invalid` | Long email-shaped representation | NO — robustness probe |
| GEN-004 | `UNICODE_PROBE` | class = accented Latin / non-Latin / supplementary plane | One representative string | NO |
| GEN-005 | `SPECIAL_CHAR_PROBE` | class = quotation / bracket / backslash / escaped newline | One benign character-class string | NO |
| GEN-006 | `LARGE_NUMBER_PROBE` | fixed decimal `1000000000000` | Large finite JSON number | NO — robustness probe |
| GEN-007 | Missing-resource candidate | observed ID representation, known current ID set, run ID | Candidate retained only after documented verification | NO |
| GEN-008 | Finite repeated-request schedule | count `20`, pace `2 requests/second` | Ordered request schedule | NO — not a throttling threshold |
| GEN-009 | Structured query probe | semantic family | `page=1&limit=2` or `status=pending` | NO |

Generators are design descriptions. Prompt 021 adds no JavaScript implementation.

## Secret-handling controls

- Initial/current values for credentials and tokens must be absent from committed Postman JSON.
- A private local environment or process environment populates credentials at run time.
- Tokens and response snapshots are ephemeral and must be cleared after execution.
- Logs/reporters must redact `Authorization`, credential fields, tokens, student ID, and order/customer data.
- Repository Markdown contains placeholders only.

Committed plaintext secret count: `0`.

## Readiness

The variable taxonomy is implementable, but the full 122-test suite is `NOT_READY_FOR_POSTMAN_IMPLEMENTATION` until the 23 `BLOCKED_BEFORE_POSTMAN` tests receive authoritative rules or reproducible supported setup. The remaining tests can be implemented without changing logical semantics.
