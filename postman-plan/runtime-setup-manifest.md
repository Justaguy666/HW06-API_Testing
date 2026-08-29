# Runtime Setup Manifest

This is a planning manifest only. No setup request or script has been implemented or executed.

| SETUP-ID | Purpose | Operation | Output Variables | Consumers | Automatable |
| --- | --- | --- | --- | --- | --- |
| SETUP-001 | Verify local environment and load assignment identity | Start backend per setup guide; load private environment | `base_url`, `student_id`, `run_id` | All executable tests | MANUAL_PRECONDITION |
| SETUP-002 | Create fresh normal account | `POST /api/register` | `valid_user_email`, `valid_user_password`, optional user ID | FR-02 matching-account tests; FR-07 identity base | AUTOMATABLE |
| SETUP-003 | Authenticate primary normal user | `POST /api/login` | `user_token` | Authenticated FR-07 tests | AUTOMATABLE |
| SETUP-004 | Create/authenticate distinct normal user | `POST /api/register`; `POST /api/login` | `second_user_token`, `wrong_role_token` | TC-API-047, 055, 129, 157 and multi-user setup | AUTOMATABLE |
| SETUP-005 | Authenticate administrator | Private Admin credential precondition; `POST /api/login` | `admin_token` | Protected FR-18 tests | MANUAL_PRECONDITION |
| SETUP-006 | Discover existing product | `GET /api/products`; confirm with `GET /api/products/:id` | `existing_product_id`, observable name/price | Resource-bound FR-07 tests | AUTOMATABLE |
| SETUP-007 | Verify missing-product candidate | Product list plus `GET /api/products/:id` absence check | `nonexisting_product_id` only after evidence | TC-API-155 | AUTOMATABLE |
| SETUP-008 | Establish fresh sequence-local Cart context | SETUP-002 and SETUP-003 for a new run-scoped user | Fresh token/context label and before snapshot | TC-API-156–161 | AUTOMATABLE |
| SETUP-009 | Discover existing order/current visible state | `GET /api/admin/orders` | `existing_order_id`; `current_order_status` if API-visible | Existing-order FR-18 tests | AUTOMATABLE after SETUP-005 |
| SETUP-010 | Verify missing-order candidate | Complete observable `GET /api/admin/orders` result | `nonexisting_order_id` only after absence evidence | TC-API-058 | AUTOMATABLE after SETUP-005 |
| SETUP-011 | Provision/discover orders for multiple users | Register/login, Product discovery, Cart add, checkout, per-user history, Admin list | Two attributable order IDs when the documented flow exposes them | TC-API-117, 127 | AUTOMATABLE_WITH_RUNTIME_GUARD |
| SETUP-012 | Establish system-wide empty-order state | No sufficient documented API operation | NONE | TC-API-118 | UNAVAILABLE |
| SETUP-013 | Establish exact locked/counter/elapsed-unlock state | No documented threshold, duration, counter channel, or unlock operation | NONE | TC-API-092–093; exact-state portion of 013/090–091 | UNAVAILABLE |
| SETUP-014 | Establish guaranteed allowed status transition and reset | Admin status-update operation exists, but transition matrix/reset path is undocumented | NONE | TC-API-121, 127–128 | UNAVAILABLE |

## Reassessment of the original 41 POSTMAN_SETUP_REQUIRED tests

| Test ID / Group | SETUP-ID | Setup Operation | Documented? | Automatable? | Result |
| --- | --- | --- | --- | --- | --- |
| TC-API-001, 006, 012, 074–077, 081–087, 089, 094–095 | SETUP-001, SETUP-002 | Environment plus registration | YES | YES after environment precondition | AUTOMATABLE |
| TC-API-002 | SETUP-001 | Generate a run-unique email candidate and deliberately do not register it | YES as local data generation; no setup endpoint invented | YES | AUTOMATABLE |
| TC-API-130–134 | SETUP-001–003 | Register then login normal user | YES | YES | AUTOMATABLE |
| TC-API-159–161 | SETUP-008 | Fresh normal user/token and sequence-local context | YES | YES | AUTOMATABLE |
| TC-API-046 | SETUP-005 | Admin credential precondition then documented login | PARTIAL: login documented; credential source is environment/setup | PARTIAL | MANUAL_PRECONDITION |
| TC-API-047, 055, 129 | SETUP-004, SETUP-009 where needed | Register/login normal wrong-role user; discover order | YES | YES after Admin precondition for order discovery | AUTOMATABLE |
| TC-API-056–059, 061, 116 | SETUP-005, SETUP-009/010 where needed | Admin login and order discovery/absence verification | YES after credential precondition | PARTIAL | MANUAL_PRECONDITION |
| TC-API-117 | SETUP-005, SETUP-011 | Discover or provision two attributable orders | Operations documented; response linkage unspecified | GUARDED | AUTOMATABLE |
| TC-API-120, 178 | SETUP-005 | Same Admin context, repeated read, no intentional mutation | YES | YES | AUTOMATABLE |
| TC-API-180 | SETUP-005, SETUP-009 | Admin login, existing-order discovery, update observation | YES | YES after credential precondition | MANUAL_PRECONDITION |
| TC-API-181 | SETUP-005, SETUP-009 | Admin/order setup is achievable; required traceability channel is assessed separately | Setup YES | YES after Admin credential precondition | AUTOMATABLE |

All setup requests built later must also carry `X-Student-Id: {{student_id}}`.
