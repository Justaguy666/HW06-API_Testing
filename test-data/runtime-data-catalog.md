# Runtime Test-Data Catalog

This catalog never supplies fabricated existing resource IDs or committed secrets. `GENERATED_AT_RUNTIME` values are created within the run; `DISCOVERED_AT_RUNTIME` values are read through documented operations.

## Shared environment inventory

| Variable | Purpose | Source | Sensitive? | Runtime? |
| --- | --- | --- | --- | --- |
| `base_url` | EShop API root | API specification; environment verification | NO | NO |
| `student_id` | Assignment-required `X-Student-Id` value | Student's private local environment | YES | NO |
| `run_id` | Unique suffix for generated identities/resources | Run start timestamp plus random suffix | NO | YES |

## Identity inventory

| Identity ID | Role | Required Credentials | Token Needed? | Used By |
| --- | --- | --- | --- | --- |
| IDENTITY-FR02-USER | Existing normal user used for matching/mismatching login | `valid_user_email`, `valid_user_password`; private runtime values | Captured only where downstream Cart setup uses the same user | FR-02 credential tests; supporting FR-07 setup |
| IDENTITY-FR07-USER-A | Normal authenticated Cart user | `cart_user_a_email`, `cart_user_a_password` | YES: `user_token` | Authenticated FR-07 tests |
| IDENTITY-FR07-USER-B | Second normal user for cross-context observation | `cart_user_b_email`, `cart_user_b_password` | YES: `second_user_token` | TC-API-157 and multi-user setup |
| IDENTITY-FR18-ADMIN | Administrator | `admin_email`, `admin_password` from private environment | YES: `admin_token` | Protected FR-18 tests |
| IDENTITY-FR18-WRONG-ROLE | Authenticated non-Admin | Generated normal-user credentials | YES: `wrong_role_token` | TC-API-047, 055, 129 |
| IDENTITY-UNAUTHENTICATED | No authenticated identity | NONE | NO | TC-API-048, 056, 135, 137 |

## Runtime DATA items

### DATA-FR02-001

- Data ID: DATA-FR02-001
- Feature: FR-02
- Category: IDENTITY
- Purpose: Provide a reproducible existing account and matching credential pair.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `{{valid_user_email}}`, `{{valid_user_password}}`; generate a unique email using `run_id`, register it through `POST /api/register`, and retain its chosen password privately.
- Specification Role: Login success requires an account-associated matching pair; registration is a documented supporting operation.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-001, TC-API-006, TC-API-012, TC-API-074–077, TC-API-081–087, TC-API-089–095
- Setup Dependency: SETUP-002
- Blocker Refs: BLK-FR02-005, BLK-FR02-006, BLK-ALL-001
- Notes: Credentials are runtime-only and excluded from repository output.

### DATA-FR02-002

- Data ID: DATA-FR02-002
- Feature: FR-02
- Category: FIELD_VALUE
- Purpose: Supply controlled non-matching credential classes.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `{{unassociated_email}} = "hw06-unregistered+" + run_id + "@example.invalid"` and `{{wrong_password}} = "Wrong-" + run_id + "!"`; never register the unassociated address.
- Specification Role: Supports unknown-account and wrong-password observations; failure behavior is unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-002, TC-API-006, TC-API-013, TC-API-077, TC-API-082–083, TC-API-090–094, TC-API-170
- Setup Dependency: SETUP-002 when the known-account class is needed
- Blocker Refs: BLK-FR02-002, BLK-FR02-003, BLK-FR02-004
- Notes: The unique address is a run-scoped candidate deliberately not provisioned; it is not advertised as a permanent global invariant.

### DATA-FR02-006

- Data ID: DATA-FR02-006
- Feature: FR-02
- Category: FIELD_VALUE
- Purpose: Derive whitespace and case variants from a real matching pair.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Add one leading and trailing U+0020 to email/password separately; toggle alphabetic case of email/password separately.
- Specification Role: Normalization and case rules are unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-084–087
- Setup Dependency: SETUP-002
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: The generated account password must contain alphabetic characters.

### DATA-FR02-007

- Data ID: DATA-FR02-007
- Feature: FR-02
- Category: SEQUENCE
- Purpose: Execute repeated successful login with the same account and capture token observations.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Two consecutive matching login requests; retain token A/token B only as ephemeral values and compare presence/equality/decodable shape observationally.
- Specification Role: Successful login returns JWT token and user information; lifecycle details are unspecified.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-089
- Setup Dependency: SETUP-002
- Blocker Refs: BLK-FR02-006, BLK-ALL-001
- Notes: Tokens must not be written to committed reports.

### DATA-FR02-008

- Data ID: DATA-FR02-008
- Feature: FR-02
- Category: RESOURCE_STATE
- Purpose: Represent failed-attempt, locked, and elapsed-unlock states.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `UNRESOLVED`: requires authoritative failed-attempt threshold, counter visibility, lock duration, and reset/unlock rule.
- Specification Role: FR-02 name includes lockout, but the API contract supplies no state rules.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-013, TC-API-090–093
- Setup Dependency: SETUP-013
- Blocker Refs: BLK-FR02-002, BLK-FR02-003, BLK-FR02-004
- Notes: No request count or duration is invented; these tests are blocked before Postman.

### DATA-FR07-001

- Data ID: DATA-FR07-001
- Feature: FR-07
- Category: AUTH
- Purpose: Provide normal authenticated Cart contexts.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `Authorization: Bearer {{user_token}}`; optionally `{{second_user_token}}` for a distinct generated account.
- Specification Role: Both Cart operations require Bearer authentication.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-130–134, TC-API-139–176 except cases intentionally omitting/varying Authorization
- Setup Dependency: SETUP-002, SETUP-003; SETUP-004 for second context
- Blocker Refs: BLK-FR07-004, BLK-FR07-007, BLK-FR07-011
- Notes: Tokens remain runtime-only.

### DATA-FR07-003

- Data ID: DATA-FR07-003
- Feature: FR-07
- Category: BODY
- Purpose: Bind a Cart body to a product actually discovered at runtime.
- Concrete / Runtime: DISCOVERED_AT_RUNTIME
- Value / Logical Generator: `{"id":{{existing_product_id}},"name":"{{existing_product_name}}","price":{{existing_product_price}},"quantity":2}` using fields visibly returned by documented Product operations when available.
- Specification Role: Product endpoints and Cart example are documented; authoritative body-to-product linkage remains unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-154, TC-API-160–161, TC-API-164, TC-API-174 where a resource-bound body is selected
- Setup Dependency: SETUP-006
- Blocker Refs: BLK-FR07-002, BLK-FR07-005, BLK-FR07-010
- Notes: Discovery does not resolve whether all Cart members are client- or server-authoritative.

### DATA-FR07-007

- Data ID: DATA-FR07-007
- Feature: FR-07
- Category: RESOURCE
- Purpose: Identify a product that demonstrably exists.
- Concrete / Runtime: DISCOVERED_AT_RUNTIME
- Value / Logical Generator: `{{existing_product_id}}`, plus observable `name` and `price`, captured from `GET /api/products` and confirmed through `GET /api/products/:id`.
- Specification Role: Product list/detail operations are documented.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-154, TC-API-160–161, TC-API-164, TC-API-174, TC-API-180–181 indirectly through order provisioning if used
- Setup Dependency: SETUP-006
- Blocker Refs: BLK-FR07-002, BLK-FR07-010
- Notes: Never default to product ID `1` as an existence claim.

### DATA-FR07-008

- Data ID: DATA-FR07-008
- Feature: FR-07
- Category: RESOURCE
- Purpose: Produce a verified non-existing product candidate.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Inspect known IDs, choose a clearly separated candidate in the observed identifier representation, then verify absence with `GET /api/products/:id`; retain `{{nonexisting_product_id}}` only after observable non-existence.
- Specification Role: Product list/detail are documented; Cart behavior for missing products is not.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-155
- Setup Dependency: SETUP-007
- Blocker Refs: BLK-FR07-002, BLK-FR07-005, BLK-FR07-008, BLK-FR07-010
- Notes: If identifier representation or absence cannot be verified, the test remains blocked.

### DATA-FR07-009

- Data ID: DATA-FR07-009
- Feature: FR-07
- Category: RESOURCE_STATE
- Purpose: Represent fresh/same/different authentication-to-Cart contexts.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Fresh user A with no intentional Cart request before the test; optional user B; retain context labels, not assumed ownership semantics.
- Specification Role: Cart auth is documented; ownership, creation, lifetime, and persistence are not.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-156–158
- Setup Dependency: SETUP-008
- Blocker Refs: BLK-FR07-004, BLK-FR07-007, BLK-FR07-012
- Notes: The contexts are provisionable, but required ownership/lifecycle oracles are structurally blocked.

### DATA-FR07-010

- Data ID: DATA-FR07-010
- Feature: FR-07
- Category: SEQUENCE
- Purpose: Define Cart read/add sequences with sequence-local observations.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: A: GET then GET with no intentional mutation; B: POST then identical POST; C: POST then GET, always within one token context and retaining snapshots.
- Specification Role: GET/POST Cart operations exist; consistency, duplicate-add, and visibility semantics are unspecified.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-159–161
- Setup Dependency: SETUP-008; SETUP-006 when using resource-bound body
- Blocker Refs: BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008, BLK-FR07-012
- Notes: No accumulation, replacement, persistence, or ordering outcome is asserted.

### DATA-FR07-013

- Data ID: DATA-FR07-013
- Feature: FR-07
- Category: RESOURCE_STATE
- Purpose: Represent known product availability/stock for quantity interaction.
- Concrete / Runtime: DISCOVERED_AT_RUNTIME
- Value / Logical Generator: `UNRESOLVED`: requires an API-visible availability/stock attribute and authoritative Cart relationship; neither is documented.
- Specification Role: Product and Cart operations exist, but stock/availability rules do not.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-164
- Setup Dependency: NONE AVAILABLE
- Blocker Refs: BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-010
- Notes: No stock value or expected quantity outcome is invented.

### DATA-FR18-001

- Data ID: DATA-FR18-001
- Feature: FR-18
- Category: AUTH
- Purpose: Provide an authenticated administrator context.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `{{admin_email}}`, `{{admin_password}}` supplied privately; `{{admin_token}}` captured by documented login.
- Specification Role: All Admin APIs require Bearer token and Admin permission.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: Protected FR-18 tests except intentionally unauthenticated/non-Bearer cases
- Setup Dependency: SETUP-005
- Blocker Refs: BLK-FR18-005, BLK-FR18-006
- Notes: The setup guide may identify a local default account, but no credential is copied into repository artifacts.

### DATA-FR18-002

- Data ID: DATA-FR18-002
- Feature: FR-18
- Category: AUTH
- Purpose: Provide an authenticated non-Admin context.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Generate/register a normal user and capture `{{wrong_role_token}}` by documented login.
- Specification Role: Admin permission is explicitly required.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-047, TC-API-055, TC-API-129
- Setup Dependency: SETUP-004
- Blocker Refs: BLK-FR18-006, BLK-ALL-001
- Notes: Role is inferred only from the normal registration path versus the separately supplied Admin identity.

### DATA-FR18-003

- Data ID: DATA-FR18-003
- Feature: FR-18
- Category: RESOURCE
- Purpose: Identify an existing order and its observable current status.
- Concrete / Runtime: DISCOVERED_AT_RUNTIME
- Value / Logical Generator: From authenticated `GET /api/admin/orders`, select one visible order and capture `{{existing_order_id}}` and `{{current_order_status}}` if exposed.
- Specification Role: Admin listing is system-wide and update path identifies order by ID.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-050–058, TC-API-060–066, TC-API-121–129, TC-API-180–181
- Setup Dependency: SETUP-009
- Blocker Refs: BLK-FR18-001, BLK-FR18-003, BLK-FR18-004, BLK-FR18-005
- Notes: If the response does not expose usable ID/status, dependent tests remain blocked.

### DATA-FR18-004

- Data ID: DATA-FR18-004
- Feature: FR-18
- Category: RESOURCE
- Purpose: Produce a verified non-existing order candidate.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Inspect the complete system-wide Admin list, choose a separated candidate in the observed ID representation, and retain `{{nonexisting_order_id}}` only after confirming it is absent from that list.
- Specification Role: Admin list is documented as system-wide; order-ID shape is not.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-058
- Setup Dependency: SETUP-010
- Blocker Refs: BLK-FR18-003
- Notes: Do not hardcode `999999`; if complete-list absence cannot be established, the test cannot claim non-existence.

### DATA-FR18-008

- Data ID: DATA-FR18-008
- Feature: FR-18
- Category: RESOURCE_STATE
- Purpose: Establish a system with no orders.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: `UNRESOLVED`: requires an isolated empty datastore or documented operation that removes all orders.
- Specification Role: The API contract provides no Admin delete-all/delete-order operation.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-118
- Setup Dependency: SETUP-012
- Blocker Refs: BLK-FR18-005
- Notes: Database initialization in the setup guide is environment setup, not evidence that the resulting order set is empty.

### DATA-FR18-009

- Data ID: DATA-FR18-009
- Feature: FR-18
- Category: RESOURCE_STATE
- Purpose: Establish an allowed source/target order-status relation and restoration strategy.
- Concrete / Runtime: DISCOVERED_AT_RUNTIME
- Value / Logical Generator: `UNRESOLVED`: requires authoritative transition matrix, known initial state, permitted target, and supported reset/restore relation.
- Specification Role: Five status values are documented; transitions and idempotence are not.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-050–054, TC-API-121, TC-API-124–128
- Setup Dependency: SETUP-014
- Blocker Refs: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- Notes: No transition is invented from vocabulary order.

### DATA-FR18-010

- Data ID: DATA-FR18-010
- Feature: FR-18
- Category: RESOURCE_STATE
- Purpose: Provide two distinct existing orders for system-wide and update-isolation observations.
- Concrete / Runtime: GENERATED_AT_RUNTIME
- Value / Logical Generator: Provision or discover orders A/B attributable to two users where attribution is API-visible; capture both IDs and before snapshots.
- Specification Role: Admin listing is system-wide; checkout and per-user order history are documented supporting operations.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-117, TC-API-127
- Setup Dependency: SETUP-011
- Blocker Refs: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- Notes: TC-API-127 additionally needs an allowed transition and therefore remains blocked.

## Supporting setup inventory

| SETUP-ID | Purpose | Supporting Operation | Produces | Consumed By |
| --- | --- | --- | --- | --- |
| SETUP-001 | Verify environment and inject assignment header value | Start backend per setup guide; no API behavioral inference | `base_url`, private `student_id`, `run_id` | All active tests |
| SETUP-002 | Create a fresh normal account | `POST /api/register` | `valid_user_email`, `valid_user_password`, optional returned user ID | FR-02 matching-pair tests; Cart identity base |
| SETUP-003 | Authenticate normal Cart user | `POST /api/login` | `user_token` | Authenticated FR-07 tests |
| SETUP-004 | Create/authenticate a distinct normal user | `POST /api/register`; `POST /api/login` | `second_user_token` / `wrong_role_token` | TC-API-047, 055, 129, 157; multi-user setup |
| SETUP-005 | Authenticate administrator with private credentials | `POST /api/login` | `admin_token` | Protected FR-18 tests |
| SETUP-006 | Discover and confirm an existing product | `GET /api/products`; `GET /api/products/:id` | Existing product ID/name/price when exposed | Resource-bound FR-07 tests |
| SETUP-007 | Verify a missing-product candidate | `GET /api/products`; `GET /api/products/:id` | `nonexisting_product_id`, only after absence evidence | TC-API-155 |
| SETUP-008 | Establish sequence-local Cart context | Fresh account via register/login; no undocumented cleanup endpoint | Fresh token/context label and before snapshot | TC-API-156–161, 173–176 as needed |
| SETUP-009 | Discover existing order/current state | `GET /api/admin/orders` | `existing_order_id`, current status when visible | Existing-order FR-18 tests |
| SETUP-010 | Verify a missing-order candidate | Complete `GET /api/admin/orders` observation | `nonexisting_order_id`, only after absence evidence | TC-API-058 |
| SETUP-011 | Provision/discover orders for multiple users | Documented register/login, Product discovery, Cart add, checkout, per-user history, Admin list | Two attributable order IDs if the documented flow succeeds visibly | TC-API-117, 127 |
| SETUP-012 | Establish empty-order system | No sufficient documented API; isolated manual environment reset would be required | Empty system state | TC-API-118 |
| SETUP-013 | Establish lockout/counter/timer state | No sufficient documented rule or setup operation | Locked/counter/time states | TC-API-013, 090–093 |
| SETUP-014 | Establish allowed status transition and restore path | No transition matrix; Admin status update exists but cannot define valid setup alone | Initial/target status pair and reset path | TC-API-050–054, 121, 124–128, 180–181 |

Supporting setup does not add selected-feature quota testcases. SETUP-012–014 are explicit unresolved setup records, not invented endpoints.

## Stateful data

| STATE-DATA-ID | Feature | Required Initial State | Setup | Consumed By |
| --- | --- | --- | --- | --- |
| STATE-DATA-001 | FR-02 | Fresh generated account with no intentional failed attempts | SETUP-002 | TC-API-089–091 |
| STATE-DATA-002 | FR-02 | Known counter/locked/elapsed-unlock state | SETUP-013 — blocked | TC-API-013, TC-API-090–093 |
| STATE-DATA-003 | FR-07 | Fresh user token and sequence-local Cart context | SETUP-008 | TC-API-156–161 |
| STATE-DATA-004 | FR-07 | Same token, no intentional mutation between reads | SETUP-008 | TC-API-159, 173 |
| STATE-DATA-005 | FR-07 | Two distinct normal-user tokens | SETUP-004, SETUP-008 | TC-API-157 |
| STATE-DATA-006 | FR-07 | API-visible product availability/stock | No available setup — blocked | TC-API-164 |
| STATE-DATA-007 | FR-18 | Existing order and observable current state | SETUP-009 | Existing-order update tests |
| STATE-DATA-008 | FR-18 | System has no orders | SETUP-012 — blocked/manual | TC-API-118 |
| STATE-DATA-009 | FR-18 | Allowed transition plus restoration path | SETUP-014 — blocked | TC-API-050–054, 121, 124–128, 180–181 |
| STATE-DATA-010 | FR-18 | Same Admin/endpoint and no intentional mutation between reads | SETUP-005 | TC-API-120, 178 |
| STATE-DATA-011 | FR-18 | Two attributable existing orders | SETUP-011 | TC-API-117, 127 |

For stateful execution, the implementation record must capture: initial state, setup action, state identifier, test action, observation, and cleanup/reset result.

## Isolation

| Test / Group | Isolation Class | Reason | Reset Needed? |
| --- | --- | --- | --- |
| FR-02 single-request representation tests | SHARED_READ_ONLY_SAFE | Login representation observations do not intentionally mutate domain resources | NO_CLEANUP, except unknown failed-attempt side effects require a fresh account when repeated |
| TC-API-013, 090–093 | GLOBAL_STATE_RISK | Failed attempts may lock a persistent account and threshold/duration are unknown | MANUAL_RESET_IF_BLOCKED |
| TC-API-089, 170 | SEQUENCE_LOCAL_STATE | Repeated requests must share one controlled condition | Fresh account preferred; no API cleanup defined |
| FR-07 single GET tests | SHARED_READ_ONLY_SAFE | No intentional mutation | NO_CLEANUP |
| FR-07 POST/sequence tests | ISOLATED_RESOURCE_REQUIRED | Cart mutation may interfere with later observations | FRESH_RESOURCE_REQUIRED via fresh user identity |
| TC-API-156–161 | SEQUENCE_LOCAL_STATE | Observations depend on order within one token context | Fresh user per sequence; no Cart reset API documented |
| FR-18 Admin list tests | SHARED_READ_ONLY_SAFE | Reads are safe if no concurrent mutation occurs | NO_CLEANUP |
| FR-18 status-update tests | ISOLATED_RESOURCE_REQUIRED | Order mutation can contaminate later tests | RESET_REQUIRED, but valid restore path is blocked |
| TC-API-126–128, 180–181 | SEQUENCE_LOCAL_STATE | Same order and before/after snapshots are required | RESET_REQUIRED / MANUAL_RESET_IF_BLOCKED |
| TC-API-118 | GLOBAL_STATE_RISK | Empty-order condition is global | MANUAL_RESET_IF_BLOCKED |

## Cleanup strategy

| Context | Cleanup | Limitation |
| --- | --- | --- |
| Static/response-only probes | NO_CLEANUP | Returned sensitive evidence must not be committed |
| Generated login identities | FRESH_RESOURCE_REQUIRED | No delete-user operation is selected for cleanup; use isolated run IDs/reset environment |
| Cart mutation | FRESH_RESOURCE_REQUIRED | No Cart clear/delete endpoint is documented |
| Lockout/counter state | MANUAL_RESET_IF_BLOCKED | Threshold, duration, and administrative unlock are undocumented |
| Read-only Admin list | NO_CLEANUP | Prevent concurrent intentional mutations during comparison |
| Order status mutation | RESET_REQUIRED | Restore transition is not documented; use isolated disposable orders or manual environment reset |
| Empty system state | MANUAL_RESET_IF_BLOCKED | No documented API can delete all orders |

## Blocker-to-data mapping

| Blocker | Affected DATA IDs | Affected Tests | Data Effect |
| --- | --- | --- | --- |
| BLK-FR02-001 | DATA-FR02-003–006, 010–014 | Canonical affected set plus TC-API-165–169 | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR02-002 | DATA-FR02-002, 008, 015 | TC-API-013, 090–093, 170 | PREVENTS_STATE_SETUP for 013/090–093; limits result for 170 |
| BLK-FR02-003 | DATA-FR02-008 | TC-API-013, 092–093 | PREVENTS_STATE_SETUP |
| BLK-FR02-004 | DATA-FR02-002–015 | Failure-oriented FR-02 cases | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR02-005 | DATA-FR02-001, 009 | TC-API-001, 095 | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR02-006 | DATA-FR02-001, 007 | TC-API-001, 089 | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-001 | DATA-FR07-002, 004–006, 011 | Body-shape/member tests | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-002 | DATA-FR07-003, 005, 007–008, 013 | TC-API-133, 141–147, 154–155, 164, 176 | PREVENTS_RESOURCE_SETUP for relationship-dependent cases |
| BLK-FR07-003 | DATA-FR07-004–005, 011, 013 | Quantity tests | PREVENTS_STATE_SETUP for TC-API-164; otherwise limits result |
| BLK-FR07-004 | DATA-FR07-001, 009 | TC-API-131, 156–157 | PREVENTS_STATE_SETUP |
| BLK-FR07-005 | DATA-FR07-003, 008–010, 012–013 | Mutation/sequence cases | PREVENTS_STATE_SETUP for conditional resource cases; otherwise limits result |
| BLK-FR07-006 | DATA-FR07-010, 012 | TC-API-134, 160 | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-007 | DATA-FR07-009–010 | TC-API-131, 134, 156, 158, 161 | PREVENTS_STATE_SETUP where lifecycle is the objective |
| BLK-FR07-008 | DATA-FR07-004, 006, 008, 010, 012 | Broad FR-07 response set | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-009 | DATA-FR07-002, 004–005, 011–012 | Price tests | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-010 | DATA-FR07-005, 007–008, 011, 013 | Product/quantity interaction tests | PREVENTS_RESOURCE_SETUP for TC-API-154–155/164 |
| BLK-FR07-011 | DATA-FR07-001, DATA-SHARED-004 | Auth representation tests | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR07-012 | DATA-FR07-009–010, 012 | Ownership/lifecycle/read sequence tests | PREVENTS_STATE_SETUP for 156–158; otherwise limits result |
| BLK-FR18-001 | DATA-FR18-003, 005, 009–010, 013 | Transition-dependent tests | PREVENTS_STATE_SETUP |
| BLK-FR18-003 | DATA-FR18-003–006 | ID/status representation tests | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-FR18-004 | DATA-FR18-003, 009–010 | Stateful update tests | PREVENTS_STATE_SETUP |
| BLK-FR18-005 | DATA-FR18-003–013, DATA-SHARED-005–006 | Broad FR-18 response set | LIMITS_EXPECTED_RESULT_ONLY; TC-API-118 also lacks setup |
| BLK-FR18-006 | DATA-FR18-001–003, DATA-SHARED-004 | Auth/role tests | LIMITS_EXPECTED_RESULT_ONLY |
| BLK-ALL-001 | DATA-FR02-009, DATA-FR18-002, 013 | Security/traceability cases | LIMITS_EXPECTED_RESULT_ONLY |

Blockers not listed as preventing setup have a defensible value strategy and limit only the expected-result depth.
