# Prompt 001 — Requirement Analysis for Selected APIs

**Selected features:** FR-02, FR-09, FR-18  
**Analysis source:** `eshop-sut/api_specification.md` only  
**Analysis time:** 2026-08-29 09:11:40 +07:00  
**Scope rule:** A value shown only in a JSON example is identified as an example, not promoted to a normative constraint. Information absent from the source is recorded as **Not specified**.

## 1. FR-02 — Login and Account Lockout

### 1.1 Relevant endpoints

| Feature ID | Feature name | Method | Endpoint | Classification | Purpose stated by the specification |
| --- | --- | --- | --- | --- | --- |
| FR-02 | Login and Account Lockout | `POST` | `/api/login` | Primary | Authenticate using the submitted email and password. A successful response returns a JWT `token` and `user` information. |
| FR-02 | Login and Account Lockout | Not specified | Not specified | Missing | The specification defines no endpoint specifically for reading, locking, unlocking, or resetting the lockout state. |

`POST /api/register` can create an account that may later be used for login, but the specification describes it as the registration API, not as an implementation of login or account lockout. It is therefore treated as a setup dependency rather than an FR-02 endpoint.

### 1.2 Inputs and constraints

#### `POST /api/login`

| Category | Name | Data type | Required? | Constraints / allowed values / format | Default | Relationships |
| --- | --- | --- | --- | --- | --- | --- |
| Header | `Content-Type` | Not specified | Not specified | The body is presented as JSON, but the header itself is not documented. | Not specified | Not specified |
| Header | `Authorization` | Not specified | Not specified | No authentication header is documented for login. | Not specified | Not specified |
| Request body | `email` | JSON string in the example | Not specified | Example: `test@domain.com`. Email syntax, length, normalization, case sensitivity, and whitespace handling are not specified. | Not specified | Used together with `password` for login. No further dependency is specified. |
| Request body | `password` | JSON string in the example | Not specified | Example: `Password123!`. Length, complexity, encoding, and whitespace handling are not specified. | Not specified | Used together with `email` for login. No further dependency is specified. |
| Path parameter | None documented | — | — | — | — | — |
| Query parameter | None documented | — | — | — | — | — |

The example implies a JSON object containing `email` and `password`, but the specification does not explicitly state whether either field is mandatory or whether extra fields are accepted.

### 1.3 Authentication / authorization

- Authentication required to call `POST /api/login`: **Not specified**. The endpoint is itself the authentication operation, and no prerequisite token is documented.
- Required role: **Not specified**.
- Token/header requirement on the request: **Not specified**.
- Successful output: a JWT `token` and `user` information are explicitly stated.
- Ownership/access-control restrictions: **Not specified**.
- JWT lifetime, issuer, audience, signing algorithm, and claims: **Not specified**.

### 1.4 Business rules

Explicitly stated:

- The operation accepts an email and password in a JSON body example.
- A successful login returns a JWT `token` and `user` information.

Not specified:

- What constitutes a valid or invalid email/password pair.
- Whether email matching is case-sensitive.
- How many failed attempts are allowed.
- How a failed-attempt counter changes.
- The threshold that locks an account.
- Lockout duration.
- Whether the counter is reset after successful login.
- Behavior after the lockout period expires.
- Whether attempts during lockout extend the lockout.
- Whether unknown accounts participate in lockout.
- Error messages for invalid credentials and locked accounts.
- Password hashing/storage requirements.

### 1.5 States and transitions

The specification contains no explicit account-state model.

| Stateful resource | Possible states | Explicitly valid transitions | Explicitly invalid transitions | Preconditions |
| --- | --- | --- | --- | --- |
| User account lockout | Not specified | Not specified | Not specified | Not specified |
| Failed-login counter | Not specified | Not specified | Not specified | Not specified |

The words “Account Lockout” come from the selected feature name supplied with the prompt; the API specification itself does not define a lockout state, counter, threshold, duration, or transition.

### 1.6 Response schemas

#### `POST /api/login`

| Aspect | Specification |
| --- | --- |
| Success status | `200 OK` |
| Error statuses | Not specified |
| Success body | An object containing a JWT `token` and `user` information |
| Required fields | `token` and `user` are described as returned on success |
| `token` type | Described as a JWT string; an exact JSON schema is not supplied |
| `user` type/fields | Not specified |
| Error body structure | Not specified |
| Content type | Not specified |

The exact property set, nullability, formats, and whether sensitive user fields must be omitted are not specified.

### 1.7 Applicable security requirements

`api_specification.md` contains no requirements labeled SEC-01 through SEC-07 and does not define their text. Under the source-only constraint, none can be normatively mapped to FR-02.

| Security ID | Mapping to FR-02 from this source |
| --- | --- |
| SEC-01 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-02 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-03 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-04 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-05 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-06 | Not specified in `api_specification.md`; no mapping can be established. |
| SEC-07 | Not specified in `api_specification.md`; no mapping can be established. |

The source does explicitly state that successful login returns a JWT. That statement is security-relevant, but it is not linked to any SEC requirement ID in this source.

### 1.8 Preconditions and dependencies

| Dependency | Status in specification |
| --- | --- |
| Existing user account | Implied by submitting credentials, but not explicitly stated as a precondition |
| Known email and password | Shown in the request example; validity rules are not specified |
| Account initially unlocked | Not specified |
| Failed-attempt count | Not specified |
| Registration setup | `POST /api/register` is documented and can create a user; its use as FR-02 setup is an interpretation, not an explicit dependency |
| Database reset/unlock mechanism | Not specified |
| Time-control mechanism for lockout | Not specified |

### 1.9 Specification ambiguities

- FR-02 and the phrase “Account Lockout” do not appear in `api_specification.md`; only the login endpoint is documented.
- Requiredness and validation of `email` and `password` are absent.
- No failed-login or lockout behavior is described.
- The `user` response schema is absent, including whether password-related fields are prohibited.
- All error statuses and error bodies are absent.
- JWT format details, expiration, and claims are absent.
- Behavior for malformed JSON, wrong media type, duplicate fields, and extra fields is absent.

## 2. FR-09 — Discount Coupons

### 2.1 Relevant endpoints

| Feature ID | Feature name | Method | Endpoint | Classification | Purpose stated by the specification |
| --- | --- | --- | --- | --- | --- |
| FR-09 | Discount Coupons | `POST` | `/api/apply-coupon` | Primary | Calculate the total after applying a coupon and return `discount_amount` and `final_amount`. |

The following documented APIs can support test-data setup or observation, but the specification places them under coupon administration rather than coupon application:

| Method | Endpoint | Supporting purpose |
| --- | --- | --- |
| `GET` | `/api/coupons` | Obtain the coupon list. The heading labels it for Admin display and documents a Bearer token. |
| `POST` | `/api/admin/coupons` | Create a coupon that can potentially be supplied to `/api/apply-coupon`. |
| `DELETE` | `/api/admin/coupons/:id` | Delete a coupon used as test data. |

No coupon-usage-recording endpoint is documented.

### 2.2 Inputs and constraints

#### `POST /api/apply-coupon`

| Category | Name | Data type | Required? | Constraints / allowed values / format | Default | Relationships |
| --- | --- | --- | --- | --- | --- | --- |
| Header | `Content-Type` | Not specified | Not specified | Body is presented as JSON. | Not specified | Not specified |
| Header | `Authorization` | Not specified | Not specified | No token requirement is documented for this endpoint. | Not specified | Not specified |
| Request body | `code` | JSON string in example | Not specified | Example: `SAVE10`. Case sensitivity, length, whitespace, and character set are not specified. | Not specified | Intended to identify a coupon; exact lookup rules are not specified. |
| Request body | `total_amount` | JSON number in example | Not specified | Example: `500000`. Minimum, maximum, sign, precision, currency, and integer/decimal restrictions are not specified. | Not specified | Used in calculating the post-discount total; exact formula is not specified. |
| Request body | `user_id` | JSON number in example | Not specified | Example: `1`. Integer/range/existence constraints are not specified. | Not specified | Relationship to an authenticated identity is not specified because authentication is not documented for this endpoint. |
| Path parameter | None documented | — | — | — | — | — |
| Query parameter | None documented | — | — | — | — | — |

#### Supporting `GET /api/coupons`

| Category | Name | Data type | Required? | Constraints |
| --- | --- | --- | --- | --- |
| Header | `Authorization` | String | Yes, according to the endpoint note | `Bearer <token>` |

No path, query, or body inputs are documented.

#### Supporting `POST /api/admin/coupons`

| Category | Name | Data type | Required? | Constraints / allowed values / format | Default |
| --- | --- | --- | --- | --- | --- |
| Header | `Authorization` | String | Yes | `Bearer <token>`; Section 6 requires the account to be Admin |
| Request body | `code` | JSON string in example | Not specified | Example: `TET2025`; uniqueness and other constraints are not specified | Not specified |
| Request body | `type` | JSON string in example | Not specified | Example: `percent`; allowed values are not stated in prose | Not specified |
| Request body | `discount_value` | JSON number in example | Not specified | Example: `15`; bounds are not specified | Not specified |
| Request body | `min_order_amount` | JSON number in example | Not specified | Example: `200000`; bounds are not specified | Not specified |
| Request body | `expired_at` | JSON string in example | Not specified | Example: `2025-01-31`; exact accepted date format is not normatively specified | Not specified |
| Request body | `max_uses_per_user` | JSON number in example | Not specified | Example: `1`; bounds are not specified | Not specified |

#### Supporting `DELETE /api/admin/coupons/:id`

| Category | Name | Data type | Required? | Constraints |
| --- | --- | --- | --- | --- |
| Header | `Authorization` | String | Yes | `Bearer <token>`; Section 6 requires Admin role |
| Path parameter | `id` | Not specified | Structurally present in path | Format, range, and existence behavior are not specified |

### 2.3 Authentication / authorization

#### `POST /api/apply-coupon`

- Authentication required: **Not specified**.
- Required role: **Not specified**.
- Token/header requirements: **Not specified**.
- Ownership restriction on `user_id`: **Not specified**.

#### Supporting coupon-management APIs

- `GET /api/coupons` documents `Authorization: Bearer <token>` and its heading says “Dành cho Admin.” Whether the heading establishes an enforceable Admin-role rule is under-specified because the endpoint is outside the Section 6 statement that explicitly requires Admin role.
- `POST /api/admin/coupons` and `DELETE /api/admin/coupons/:id` fall under Section 6. The section explicitly requires `Authorization: Bearer <token>` and an Admin account.
- Ownership restrictions: Not specified.

### 2.4 Business rules

Explicitly stated for coupon application:

- `/api/apply-coupon` calculates the total after a discount.
- The response contains `discount_amount` and `final_amount`.
- The request example contains `code`, `total_amount`, and `user_id`.

Not specified:

- Coupon existence and active/inactive requirements.
- Expiration rules.
- Minimum order threshold.
- Whether equality to the threshold qualifies.
- Maximum usage per user or how usage is recorded.
- Whether authentication is required.
- Whether `user_id` must match the authenticated user.
- Percent and fixed discount formulas.
- Rounding and currency rules.
- Whether discount may exceed total.
- Whether final amount may be negative.
- Coupon code case/whitespace normalization.
- Combining coupons.
- Whether applying a coupon consumes a usage.

### 2.5 States and transitions

No coupon state machine is specified.

| Stateful resource | Possible states | Explicitly valid transitions | Explicitly invalid transitions | Preconditions |
| --- | --- | --- | --- | --- |
| Coupon | Not specified | Not specified | Not specified | Not specified |
| Per-user coupon usage | Not specified | Not specified | Not specified | Not specified |

The creation example includes `expired_at` and `max_uses_per_user`, but the specification does not describe eligibility states or transitions produced by these fields.

### 2.6 Response schemas

#### `POST /api/apply-coupon`

| Aspect | Specification |
| --- | --- |
| Success status | Not specified |
| Error statuses | Not specified |
| Success body | JSON structure containing `discount_amount` and `final_amount` |
| `discount_amount` type | Not specified |
| `final_amount` type | Not specified |
| Other fields | Not specified |
| Error body structure | Not specified |

#### Supporting endpoints

For `GET /api/coupons`, `POST /api/admin/coupons`, and `DELETE /api/admin/coupons/:id`, success statuses, error statuses, success schemas, required response fields, field types, and error schemas are all **Not specified**.

### 2.7 Applicable security requirements

`api_specification.md` does not contain SEC-01–SEC-07 definitions. No normative SEC-ID mapping can be made under the source-only constraint.

| Security ID | Mapping to FR-09 from this source |
| --- | --- |
| SEC-01 | Not specified; no mapping can be established. |
| SEC-02 | Not specified; no mapping can be established. |
| SEC-03 | Not specified; no mapping can be established. |
| SEC-04 | Not specified; no mapping can be established. |
| SEC-05 | Not specified; no mapping can be established. |
| SEC-06 | Not specified; no mapping can be established. |
| SEC-07 | Not specified; no mapping can be established. |

Independently of SEC IDs, the source explicitly requires a Bearer token for coupon-list access and requires an Admin account for Section 6 coupon-management endpoints. It does not document authentication for coupon application.

### 2.8 Preconditions and dependencies

| Dependency | Status in specification |
| --- | --- |
| Existing coupon matching `code` | Implied by coupon application, but not explicitly stated |
| Coupon active/inactive state | Not specified |
| Coupon expiration state | Creation input includes `expired_at`; application rule is not specified |
| Minimum order amount | Creation input includes `min_order_amount`; application rule is not specified |
| Usage limit | Creation input includes `max_uses_per_user`; application rule and usage persistence are not specified |
| Existing user matching `user_id` | Implied by the field name/example, but not explicitly required |
| Authenticated user | Not specified for application |
| Admin account/token for setup APIs | Explicitly required for Section 6 endpoints |
| Order or cart | Not specified as a dependency of `/api/apply-coupon` |

### 2.9 Specification ambiguities

- No normative eligibility rules or discount formulas are supplied.
- Requiredness and validation for all three application fields are absent.
- It is unclear why unauthenticated coupon application accepts a client-supplied `user_id`.
- It is unclear whether applying a coupon records usage.
- No endpoint for recording or inspecting coupon usage is documented.
- Success and error statuses/schemas are absent.
- `type` allowed values and numeric/date constraints for coupon creation are absent.
- The phrase “Dành cho Admin” for `GET /api/coupons` is not accompanied by an explicit role statement at that endpoint, unlike Section 6.
- Behavior for deleted, expired, inactive, unknown, or exhausted coupons is absent.

## 3. FR-18 — Order Management (Admin)

### 3.1 Relevant endpoints

| Feature ID | Feature name | Method | Endpoint | Classification | Purpose stated by the specification |
| --- | --- | --- | --- | --- | --- |
| FR-18 | Order Management (Admin) | `GET` | `/api/admin/orders` | Primary | Retrieve orders for the entire system. |
| FR-18 | Order Management (Admin) | `PUT` | `/api/admin/orders/:id/status` | Primary | Update an order's status. |

Supporting observation/setup endpoints documented elsewhere:

| Method | Endpoint | Supporting purpose |
| --- | --- | --- |
| `POST` | `/api/checkout` | Creates an order and can supply an existing order for admin operations. This setup use is inferred, not explicitly linked to FR-18. |
| `GET` | `/api/orders/:id` | Retrieves one order and can observe its current state. Authentication for this endpoint is not explicitly stated at the endpoint level; Section 4 globally says Cart & Orders require a Bearer token. |
| `GET` | `/api/orders/my-orders` | Retrieves the authenticated user's personal order history. |

### 3.2 Inputs and constraints

#### `GET /api/admin/orders`

| Category | Name | Data type | Required? | Constraints |
| --- | --- | --- | --- | --- |
| Header | `Authorization` | String | Yes | `Bearer <token>`; account must have Admin permission |
| Path parameter | None | — | — | — |
| Query parameter | None documented | — | — | — |
| Request body | None documented | — | — | — |

Pagination, filtering, sorting, and field-selection inputs are not specified.

#### `PUT /api/admin/orders/:id/status`

| Category | Name | Data type | Required? | Constraints / allowed values / format | Default | Relationships |
| --- | --- | --- | --- | --- | --- | --- |
| Header | `Authorization` | String | Yes | `Bearer <token>`; account must have Admin permission | Not specified | Token must represent an Admin account |
| Path parameter | `id` | Not specified | Structurally present in path | Format, range, and existence constraints are not specified | Not specified | Identifies the order whose status is updated |
| Request body | `status` | JSON string in example | Not specified | Example: `confirmed`. Listed statuses: `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | Not specified | Applied to the order identified by `id`; allowed source-to-target transitions are not specified |
| Query parameter | None documented | — | — | — | — | — |

### 3.3 Authentication / authorization

- Both primary endpoints are under Section 6, which states that every API in that section requires `Authorization: Bearer <token>` and an account with Admin permission.
- Required role: Admin.
- Non-admin behavior/status: Not specified.
- Missing, malformed, expired, revoked, or otherwise invalid-token behavior/status: Not specified.
- Order ownership restriction: None is documented for Admin operations; the list is described as covering the entire system.
- Scope restrictions among Admin accounts: Not specified.

### 3.4 Business rules

Explicitly stated:

- Admin can retrieve orders across the entire system.
- Admin can update an order's status.
- The documented status values are `pending`, `confirmed`, `shipping`, `delivered`, and `canceled`.
- Admin authorization and a Bearer token are required for the Section 6 endpoints.

Not specified:

- Valid transitions between individual status values.
- Invalid or prohibited transitions.
- Initial/default order state.
- Terminal/final states.
- Cancellation rules.
- Whether updating to the current status is allowed.
- Concurrency/version handling.
- Whether every status can be assigned directly.
- Side effects of status changes.
- Audit history, timestamp, or actor recording.
- List ordering, pagination, filtering, and response fields.

### 3.5 States and transitions

The possible status values are explicitly listed, but no transition graph is provided.

| Stateful resource | Possible states | Explicitly valid transitions | Explicitly invalid transitions | Preconditions |
| --- | --- | --- | --- | --- |
| Order | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | Not specified | Not specified | Existing order identified by `:id` is implied; Admin token is explicitly required |

The example `{"status": "confirmed"}` shows a target value only. It does not specify the source state from which `confirmed` is valid.

### 3.6 Response schemas

#### `GET /api/admin/orders`

- Success status: **Not specified**.
- Error statuses: **Not specified**.
- Success body structure: **Not specified**.
- Order fields and field types: **Not specified**.
- Error body structure: **Not specified**.

#### `PUT /api/admin/orders/:id/status`

- Success status: **Not specified**.
- Error statuses: **Not specified**.
- Success body structure: **Not specified**.
- Required response fields and types: **Not specified**.
- Error body structure: **Not specified**.

### 3.7 Applicable security requirements

The source does not define SEC-01–SEC-07, so it cannot provide normative mappings to FR-18.

| Security ID | Mapping to FR-18 from this source |
| --- | --- |
| SEC-01 | Not specified; no mapping can be established. |
| SEC-02 | Not specified; no mapping can be established. |
| SEC-03 | Not specified; no mapping can be established. |
| SEC-04 | Not specified; no mapping can be established. |
| SEC-05 | Not specified; no mapping can be established. |
| SEC-06 | Not specified; no mapping can be established. |
| SEC-07 | Not specified; no mapping can be established. |

The source separately and explicitly requires a Bearer token plus Admin permission for both Section 6 order endpoints. This is a security requirement stated without a SEC identifier.

### 3.8 Preconditions and dependencies

| Dependency | Status in specification |
| --- | --- |
| Admin account | Explicitly required |
| JWT/Bearer token for Admin account | Explicitly required |
| Existing order for status update | Implied by `:id`; missing-order behavior is not specified |
| Current order status | Necessary to reason about transitions, but rules are not specified |
| User/order creation | `/api/checkout` is documented; using it for FR-18 setup is inferred |
| Cart or checkout data | Required by `/api/checkout` according to its own example, but not explicitly linked to FR-18 |
| Database reset or order-state restoration | Not specified |

### 3.9 Specification ambiguities

- The five status values are listed, but there is no transition matrix.
- No initial or terminal status is defined.
- Requiredness of `status` and constraints on `id` are absent.
- All response schemas and status codes are absent.
- Non-admin and invalid-token outcomes are absent.
- Behavior for nonexistent orders and repeated/idempotent updates is absent.
- The fields returned by the system-wide order list are absent.
- Concurrency, audit logging, and side effects are absent.

## 4. Cross-Feature Dependency Matrix

| Dependency / Resource | FR-02 | FR-09 | FR-18 | Notes |
| --- | --- | --- | --- | --- |
| Existing user | Implied | `user_id` appears in example; existence rule not specified | Needed to create a user order through checkout; not explicitly linked | Registration endpoint is documented separately. |
| User credentials | Used directly | Not specified for application | Needed to obtain a token before creating an order; setup interpretation | Login returns a JWT on success. |
| JWT token | Output | Not specified for application; required for supporting coupon-list/admin APIs | Required | Token format beyond being JWT/Bearer is not specified. |
| Admin role | Not specified | Required for Section 6 coupon setup endpoints | Required | The role representation/claim is not specified. |
| Locked/unlocked account | Feature name suggests relevance; behavior not documented | Not specified | Could affect token acquisition, but not documented | No account-state model exists in the API specification. |
| Existing coupon | Not applicable | Implied | Not applicable | Creation and deletion APIs are documented. |
| Coupon expiration/state | Not applicable | Fields imply relevance, but rules not documented | Not applicable | No active flag or usage endpoint is documented. |
| Existing order | Not applicable | Not specified | Implied/required for `:id` update | Checkout is the documented creation endpoint. |
| Current order status | Not applicable | Not applicable | Relevant, but transition rules are absent | Five possible target values are listed. |
| User token for checkout | Not applicable | Not specified | Supporting setup dependency | Section 4 states Cart & Orders require a Bearer token. |
| Deterministic reset/cleanup | Not specified | Not specified | Not specified | Important for execution but absent from the source. |

## 5. Requirement Traceability Table

The FR identifiers below come from the selected-feature declaration in the prompt. `api_specification.md` organizes content by section headings and does not itself assign FR identifiers.

| Requirement ID | API / Endpoint | Requirement / Rule | Source Section | Testing Relevance |
| --- | --- | --- | --- | --- |
| FR-02 | `POST /api/login` | Accepts an example JSON body with `email` and `password`. | 1.2 Đăng nhập | Defines the documented request fields. |
| FR-02 | `POST /api/login` | Successful response is `200 OK`. | 1.2 Đăng nhập | Only explicit response status for the selected APIs. |
| FR-02 | `POST /api/login` | Success returns JWT `token` and `user` information. | 1.2 Đăng nhập | Defines minimum high-level success content. |
| FR-02 | No endpoint documented | Account lockout behavior is not specified. | Not present | Must be clarified before lockout expectations can be designed from this source. |
| FR-09 | `POST /api/apply-coupon` | Calculates the total after discount. | 5.1 Áp dụng mã giảm giá | Defines the endpoint's high-level purpose. |
| FR-09 | `POST /api/apply-coupon` | Example body contains `code`, `total_amount`, and `user_id`. | 5.1 Áp dụng mã giảm giá | Identifies input dimensions, without normative constraints. |
| FR-09 | `POST /api/apply-coupon` | Response contains `discount_amount` and `final_amount`. | 5.1 Áp dụng mã giảm giá | Defines two high-level output fields. |
| FR-09 support | `GET /api/coupons` | Retrieves coupon list and requires `Authorization: Bearer <token>`. | 5.2 Lấy danh sách mã giảm giá | Supports fixture discovery and authenticated access analysis. |
| FR-09 support | `POST /api/admin/coupons` | Creates coupon using the illustrated fields. | 6.4 Quản lý Mã Giảm Giá | Supports controlled fixture creation. |
| FR-09 support | `DELETE /api/admin/coupons/:id` | Deletes a coupon. | 6.4 Quản lý Mã Giảm Giá | Supports cleanup or unavailable-coupon setup. |
| FR-18 | `GET /api/admin/orders` | Retrieves orders for the entire system. | 6.2 Quản lý Đơn hàng | Defines Admin list capability and non-ownership-limited scope. |
| FR-18 | `PUT /api/admin/orders/:id/status` | Updates the status of the identified order. | 6.2 Quản lý Đơn hàng | Primary state-changing operation. |
| FR-18 | `PUT /api/admin/orders/:id/status` | Status values listed: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | 6.2 Quản lý Đơn hàng | Defines the documented state value set, not transitions. |
| FR-18 | Both `/api/admin/orders` endpoints | Bearer token and Admin account are required. | 6 API Dành cho Admin | Defines authentication and authorization preconditions. |
| FR-18 support | `POST /api/checkout` | Creates an order from `total_amount` and `shipping_address`. | 4.3 Đặt hàng | Potential fixture creation path; linkage is inferred. |
| SEC-01 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-02 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-03 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-04 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-05 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-06 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |
| SEC-07 | Not specified | Requirement text and endpoint mapping are absent. | Not present | External security specification is required. |

## 6. Open Questions / Specification Gaps

### Source and traceability

1. Where are FR-02, FR-09, FR-18, and SEC-01–SEC-07 normatively defined? They do not appear in `api_specification.md`.
2. Is another requirements document allowed as a normative source for detailed test design?
3. Which document wins if the API specification and requirements document disagree?

### FR-02

4. Are `email` and `password` required, and what validation/normalization rules apply?
5. What is the failed-login threshold and how is the counter incremented?
6. How long is an account locked, and what unlocks it?
7. Does successful login reset failed attempts?
8. What statuses and error schemas represent bad credentials and lockout?
9. Which fields are allowed in the returned `user` object?
10. What JWT claims, expiration, signing rules, and invalidation behavior apply?

### FR-09

11. Must coupon application require authentication?
12. If authenticated, must `user_id` match the token identity, or should `user_id` be omitted?
13. What makes a coupon valid: existence, active state, date, threshold, and usage limit?
14. Are threshold boundaries inclusive or exclusive?
15. What are the exact fixed and percentage discount formulas and rounding rules?
16. Can a discount exceed the total, and can `final_amount` be negative?
17. Does applying a coupon consume usage, or is usage recorded during checkout?
18. What are the required fields, allowed `type` values, date format, and numeric bounds for coupon creation?
19. What statuses and error bodies apply for invalid, expired, inactive, exhausted, or ineligible coupons?
20. Does `GET /api/coupons` require Admin role or any authenticated user?

### FR-18

21. What is the valid order-state transition matrix?
22. Which states are terminal, and what are the cancellation rules?
23. Is setting the current status again valid/idempotent?
24. What happens for an unknown or malformed order ID?
25. What status/error schema is returned for a non-admin token, absent token, or invalid token?
26. What are the schemas of the order list and status-update responses?
27. Are pagination, filtering, and sorting supported or required?
28. Are status changes audited, timestamped, or protected against concurrent updates?

### Cross-cutting protocol gaps

29. Is `Content-Type: application/json` required for JSON bodies?
30. What is the common error response schema?
31. How are malformed JSON, wrong field types, unknown fields, duplicate keys, and unsupported media types handled?
32. What are the exact success/error status codes for every endpoint other than the documented successful login?
33. Is `X-Student-Id` an SUT contract requirement or only a homework execution requirement? It is absent from `api_specification.md`.

---

This document intentionally contains no test cases and no implementation-derived expectations.
