# Prompt 002 — Verified and Normalized Requirement Analysis

**Selected features:** FR-02, FR-09, FR-18  
**Authoritative source:** `eshop-sut/api_specification.md`  
**Audited input:** `analysis/requirement-analysis.md`  
**Scope:** Specification verification only. No source code, README material, test cases, test data, or conventional REST/e-commerce assumptions are used.

## 1. Audit Summary

Prompt 001 was generally conservative and correctly preserved most absent information as **Not specified**. No statement was found that directly contradicts `api_specification.md`. The main corrections are:

1. The login specification does not define the overall response as a JSON object; it only says a successful `200 OK` returns a JWT `token` string and `user` information.
2. Several setup/observation uses assigned to registration, coupon administration, checkout, and order-detail endpoints are reasonable testing interpretations, but are not explicit feature dependencies.
3. `GET /api/coupons` is explicitly labeled “Dành cho Admin” and explicitly requires a Bearer token. The label supports an Admin-only intent, but the document does not state the enforcement/result as clearly as the global rule for Section 6 endpoints.
4. Prompt 001 omitted `PUT /api/orders/:id/cancel`, which explicitly changes an order to `canceled` and permits cancellation only when the order is “chưa giao.” This is relevant state information, although “chưa giao” is not mapped to the listed status values.
5. The API Base URL, `http://localhost:3000`, was omitted.

The absence of SEC-01–SEC-07 definitions is confirmed. None of those IDs can be mapped normatively from this authoritative source.

## 2. Audit FR-02 — Login and Account Lockout

| Audit ID | Prompt 001 claim or claim group | Classification | Evidence / correction |
| --- | --- | --- | --- |
| A-FR02-001 | The primary endpoint is `POST /api/login`. | VERIFIED | Section 1.2 explicitly gives this method and path. |
| A-FR02-002 | Its purpose is authentication using submitted email and password. | VERIFIED | The endpoint is titled “Đăng nhập” and shows those two body fields. |
| A-FR02-003 | No separate lock/read/unlock/reset-lock endpoint is documented. | VERIFIED | No such endpoint appears in the authoritative document. |
| A-FR02-004 | `POST /api/register` can be used as FR-02 setup. | PARTIALLY VERIFIED | Registration is documented, but its use as login-test setup is an interpretation rather than an explicit dependency. |
| A-FR02-005 | The body example contains `email` and `password`. | VERIFIED | Both fields are shown in Section 1.2 JSON. |
| A-FR02-006 | The example values are JSON strings. | VERIFIED | Both values are quoted JSON values. This verifies the example representation, not a normative type rule for all requests. |
| A-FR02-007 | Requiredness, format, length, normalization, case handling, allowed values, and defaults are not specified. | VERIFIED | The source supplies no such constraints. |
| A-FR02-008 | `Content-Type` and request `Authorization` requirements are not specified for login. | VERIFIED | Neither header is documented for this endpoint. |
| A-FR02-009 | Successful login has status `200 OK`. | VERIFIED | Explicitly stated in Section 1.2. |
| A-FR02-010 | Success returns JWT `token` and `user` information. | VERIFIED | Explicitly stated in Section 1.2. |
| A-FR02-011 | Success returns an object containing `token` and `user`. | PARTIALLY VERIFIED | Field names/content are stated, but the overall container/schema is not. Correct form: response returns JWT `token` and `user` information; exact structure is **Not specified**. |
| A-FR02-012 | `token` is a JWT string. | VERIFIED | The source says “chuỗi JWT `token`.” |
| A-FR02-013 | `user` fields/types and sensitive-field exclusions are not specified. | VERIFIED | No `user` schema is present. |
| A-FR02-014 | Failure statuses and error schema are not specified. | VERIFIED | Only the successful `200 OK` response is documented. |
| A-FR02-015 | Failed-attempt, lock, unlock, threshold, duration, counter, and lockout responses are not specified. | VERIFIED | No lockout rules appear in the source. |
| A-FR02-016 | No SEC-01–SEC-07 mapping can be established. | VERIFIED | Those requirement IDs and definitions do not appear in the source. |
| A-FR02-017 | An existing user and known credentials are dependencies. | PARTIALLY VERIFIED | They are implied by a credential-based login operation, but are not written as explicit preconditions. |

### FR-02 lockout verification

| Item | Verified result |
| --- | --- |
| Failed login attempts | **Not specified** |
| Failed-attempt counter | **Not specified** |
| Lock state | **Not specified** |
| Lock threshold | **Not specified** |
| Lock duration | **Not specified** |
| Unlock behavior | **Not specified** |
| Counter reset | **Not specified** |
| Response while locked | **Not specified** |

## 3. Audit FR-09 — Discount Coupons

| Audit ID | Prompt 001 claim or claim group | Classification | Evidence / correction |
| --- | --- | --- | --- |
| A-FR09-001 | The primary endpoint is `POST /api/apply-coupon`. | VERIFIED | Section 5.1 explicitly gives this method and path. |
| A-FR09-002 | It calculates the total after applying a discount. | VERIFIED | Explicit endpoint description. |
| A-FR09-003 | The body example contains `code`, `total_amount`, and `user_id`. | VERIFIED | Explicit JSON example in Section 5.1. |
| A-FR09-004 | Example representations are string, number, and number respectively. | VERIFIED | Supported only as representations in the example; normative types are not separately defined. |
| A-FR09-005 | Requiredness, ranges, formats, defaults, normalization, and field relationships are not specified. | VERIFIED | No such constraints are stated. |
| A-FR09-006 | Authentication/authorization for `/api/apply-coupon` is not specified. | VERIFIED | Section 5.1 contains no auth requirement. |
| A-FR09-007 | The response is JSON containing `discount_amount` and `final_amount`. | VERIFIED | Explicitly stated in Section 5.1. |
| A-FR09-008 | Response field types and all status codes are not specified. | VERIFIED | No types or statuses are documented. |
| A-FR09-009 | Coupon existence, activation, expiration, threshold, usage, formula, rounding, and combination rules are not specified. | VERIFIED | None of these application rules appears in Section 5.1 or elsewhere as an application rule. |
| A-FR09-010 | `GET /api/coupons` is a supporting endpoint with a Bearer header. | VERIFIED | Method, path, and header are explicit in Section 5.2. “Supporting” is analysis classification, not source terminology. |
| A-FR09-011 | Admin-role enforcement for `GET /api/coupons` is ambiguous. | AMBIGUOUS | The heading explicitly labels it “Dành cho Admin,” but unlike Section 6 it does not explicitly state role-check enforcement or failure behavior. |
| A-FR09-012 | `POST /api/admin/coupons` and `DELETE /api/admin/coupons/:id` require Bearer authentication and Admin permission. | VERIFIED | Both are under Section 6, whose global rule explicitly requires both. |
| A-FR09-013 | Admin coupon creation can supply fixtures and deletion can clean them up. | PARTIALLY VERIFIED | Create/delete purposes are explicit; their use in FR-09 setup/cleanup is an interpretation. |
| A-FR09-014 | Creation example includes `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, and `max_uses_per_user`. | VERIFIED | Explicit Section 6.4 JSON example. |
| A-FR09-015 | `type=percent` and the shown numeric/date values are examples, not documented allowed values or boundaries. | VERIFIED | No normative constraints accompany the example. |
| A-FR09-016 | No coupon-usage-recording endpoint is documented. | VERIFIED | No such endpoint appears in the source. |
| A-FR09-017 | Existing coupon and user are preconditions. | PARTIALLY VERIFIED | `code` and `user_id` imply referenced resources, but existence requirements and failure behavior are not explicit. |
| A-FR09-018 | No SEC-01–SEC-07 mapping can be established. | VERIFIED | Those requirement IDs and definitions are absent. |

### FR-09 coupon-rule verification

| Rule | Verified result |
| --- | --- |
| Coupon must exist | **Not specified** |
| Active/inactive status | **Not specified** |
| Expiration eligibility | **Not specified** |
| Minimum order eligibility | **Not specified** |
| Inclusive/exclusive minimum boundary | **Not specified** |
| Percentage range | **Not specified** |
| Fixed-discount rules | **Not specified** |
| Maximum discount | **Not specified** |
| Usage count persistence | **Not specified** |
| Per-user usage enforcement | **Not specified** |
| Discount formula | **Not specified** |
| Cart/order dependency | **Not specified** |

## 4. Audit FR-18 — Order Management (Admin)

| Audit ID | Prompt 001 claim or claim group | Classification | Evidence / correction |
| --- | --- | --- | --- |
| A-FR18-001 | Primary endpoints are `GET /api/admin/orders` and `PUT /api/admin/orders/:id/status`. | VERIFIED | Both are explicit in Section 6.2. |
| A-FR18-002 | The list covers orders for the entire system. | VERIFIED | Section 6.2 is titled “Quản lý Đơn hàng (Toàn hệ thống).” |
| A-FR18-003 | The PUT operation updates the identified order's status. | VERIFIED | Explicit operation description and `:id` path. |
| A-FR18-004 | Both endpoints require `Authorization: Bearer <token>` and an Admin account. | VERIFIED | Explicit global rule for every Section 6 API. |
| A-FR18-005 | `id` is structurally present but its type/range/existence behavior is not specified. | VERIFIED | The path contains `:id`; no constraints are supplied. |
| A-FR18-006 | Body example is `{"status":"confirmed"}`. | VERIFIED | Explicit Section 6.2 example. |
| A-FR18-007 | Listed statuses are `pending`, `confirmed`, `shipping`, `delivered`, and `canceled`. | VERIFIED | Explicit parenthetical list. |
| A-FR18-008 | No transitions are specified. | MISSING | No transition rule is attached to the Admin PUT endpoint, but Section 4.6 explicitly documents a supporting transition to `canceled` when an order is “chưa giao.” Prompt 001 omitted it. |
| A-FR18-009 | No source-to-target transition matrix for the Admin PUT is specified. | VERIFIED | The status list does not state which source state permits which target. |
| A-FR18-010 | Initial state, terminal states, same-state behavior, Admin PUT cancellation rules, concurrency, and side effects are not specified. | VERIFIED | None is stated. |
| A-FR18-011 | All success/error statuses and response schemas for the two Admin endpoints are not specified. | VERIFIED | No responses are documented in Section 6.2. |
| A-FR18-012 | Checkout can be used to create an order fixture. | PARTIALLY VERIFIED | `POST /api/checkout` is documented as order placement; using it as FR-18 setup is an interpretation. |
| A-FR18-013 | `GET /api/orders/:id` can verify the current state. | PARTIALLY VERIFIED | It retrieves order detail, but the response schema does not explicitly promise a status field. |
| A-FR18-014 | Existing order is required for `:id` update. | PARTIALLY VERIFIED | A target resource is implied by the path; missing-order behavior is not specified. |
| A-FR18-015 | Existing current status is required for transition reasoning. | PARTIALLY VERIFIED | An order has a requested status domain, but the source does not define transition evaluation for Admin PUT. |
| A-FR18-016 | JWT/Bearer token is explicitly required. | PARTIALLY VERIFIED | Section 6 explicitly says Bearer `token`; it does not explicitly call that Admin request token a JWT. Login separately returns a JWT. |
| A-FR18-017 | No SEC-01–SEC-07 mapping can be established. | VERIFIED | Those requirement IDs and definitions are absent. |

### FR-18 state verification

#### Explicit states

`pending`, `confirmed`, `shipping`, `delivered`, `canceled`.

#### Explicitly allowed transitions

- Supporting endpoint `PUT /api/orders/:id/cancel` changes an order to `canceled` when the order is “chưa giao.”
- The exact source status or statuses represented by “chưa giao” are **Not specified**.
- The example target `confirmed` for `PUT /api/admin/orders/:id/status` is not sufficient to establish a source-to-target transition.

#### Explicitly prohibited transitions

- Cancellation through `PUT /api/orders/:id/cancel` is prohibited when the condition “chưa giao” is not satisfied.
- The exact prohibited source status or statuses are **Not specified**, because “chưa giao” is not mapped to the status vocabulary.
- No explicit prohibited transition is documented for `PUT /api/admin/orders/:id/status`.

#### Unspecified transitions

Every concrete source-to-target pair for `PUT /api/admin/orders/:id/status` is **Not specified**, including transitions to the example value `confirmed`. No matrix can be built from the authoritative source.

## 5. Audit SEC-01 through SEC-07 Mapping

| Security Requirement | FR-02 | FR-09 | FR-18 | Evidence from Spec | Verification |
| --- | --- | --- | --- | --- | --- |
| SEC-01 | Not established | Not established | Not established | SEC-01 is absent; its text is not defined. | UNSUPPORTED |
| SEC-02 | Not established | Not established | Not established | SEC-02 is absent. Bearer requirements exist for some endpoints but are not linked to this ID. | UNSUPPORTED |
| SEC-03 | Not established | Not established | Not established | SEC-03 is absent. Admin permission is explicit for Section 6 but is not linked to this ID. | UNSUPPORTED |
| SEC-04 | Not established | Not established | Not established | SEC-04 is absent; its text is not defined. | UNSUPPORTED |
| SEC-05 | Not established | Not established | Not established | SEC-05 is absent; its text is not defined. | UNSUPPORTED |
| SEC-06 | Not established | Not established | Not established | SEC-06 is absent; its text is not defined. | UNSUPPORTED |
| SEC-07 | Not established | Not established | Not established | SEC-07 is absent; its text is not defined. | UNSUPPORTED |

The Bearer-token and Admin-permission statements remain verified security-relevant requirements without SEC identifiers. They must not be relabeled SEC-02 or SEC-03 using information outside this specification.

## 6. Audit Response Schemas

| Feature | Endpoint | Status | Field | Type | Required? | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| FR-02 | `POST /api/login` | `200 OK` | `token` | JWT string | Returned on success | VERIFIED |
| FR-02 | `POST /api/login` | `200 OK` | `user` | Not specified | Returned on success | VERIFIED |
| FR-02 | `POST /api/login` | `200 OK` | Overall body structure | Not specified | Not specified | AMBIGUOUS |
| FR-02 | `POST /api/login` | Failure statuses not specified | Error fields | Not specified | Not specified | AMBIGUOUS |
| FR-09 | `POST /api/apply-coupon` | Not specified | `discount_amount` | Not specified | Contained in response | VERIFIED |
| FR-09 | `POST /api/apply-coupon` | Not specified | `final_amount` | Not specified | Contained in response | VERIFIED |
| FR-09 | `POST /api/apply-coupon` | Not specified | Overall body | JSON structure | Yes at a high level | VERIFIED |
| FR-09 | `POST /api/apply-coupon` | Error statuses not specified | Error fields | Not specified | Not specified | AMBIGUOUS |
| FR-09 support | `GET /api/coupons` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |
| FR-09 support | `POST /api/admin/coupons` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |
| FR-09 support | `DELETE /api/admin/coupons/:id` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |
| FR-18 | `GET /api/admin/orders` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |
| FR-18 | `PUT /api/admin/orders/:id/status` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |
| FR-18 support | `PUT /api/orders/:id/cancel` | Not specified | Success/error body | Not specified | Not specified | MISSING |
| FR-18 support | `GET /api/orders/:id` | Not specified | Success/error body | Not specified | Not specified | AMBIGUOUS |

## 7. Audit Preconditions and Dependencies

| Dependency | Feature | Classification | Evidence / Reason |
| --- | --- | --- | --- |
| Existing user account | FR-02 | IMPLIED-BY-ENDPOINT | Credential-based login implies a corresponding account, but the source does not state the precondition. |
| Known email/password | FR-02 | IMPLIED-BY-ENDPOINT | These fields are shown in the login body; validity requirements are not explicit. |
| Unlocked account | FR-02 | UNSUPPORTED | No lock state is defined. |
| Failed-attempt count | FR-02 | UNSUPPORTED | No counter is defined. |
| Registration endpoint as setup | FR-02 | AMBIGUOUS | Registration is documented, but no setup workflow is specified. |
| Existing coupon matching `code` | FR-09 | IMPLIED-BY-ENDPOINT | Coupon application and `code` imply a target coupon; existence behavior is unstated. |
| Existing user matching `user_id` | FR-09 | IMPLIED-BY-ENDPOINT | A `user_id` is shown, but existence and identity matching are unstated. |
| Active coupon state | FR-09 | UNSUPPORTED | No active field or rule is documented. |
| Coupon expiration eligibility | FR-09 | AMBIGUOUS | `expired_at` appears in the Admin creation example, but no application rule is specified. |
| Minimum-order eligibility | FR-09 | AMBIGUOUS | `min_order_amount` appears in creation, but no application rule is specified. |
| Per-user usage enforcement | FR-09 | AMBIGUOUS | `max_uses_per_user` appears in creation, but no enforcement/persistence rule is specified. |
| Authenticated caller for application | FR-09 | UNSUPPORTED | No auth requirement is documented for `/api/apply-coupon`. |
| Admin account/token for Section 6 setup | FR-09 | EXPLICIT | Global Section 6 rule. |
| Cart or order | FR-09 | UNSUPPORTED | Neither is documented as an application dependency. |
| Admin account | FR-18 | EXPLICIT | Global Section 6 rule. |
| Bearer token | FR-18 | EXPLICIT | Global Section 6 rule. |
| Existing order | FR-18 | IMPLIED-BY-ENDPOINT | `:id` identifies the target, but missing-resource behavior is unspecified. |
| Particular source order state for Admin PUT | FR-18 | UNSUPPORTED | No Admin transition prerequisites are documented. |
| Order “chưa giao” for cancel endpoint | FR-18 support | EXPLICIT | Section 4.6 explicitly gives this precondition, but does not map it to statuses. |
| Checkout as order-fixture setup | FR-18 | AMBIGUOUS | Checkout is documented as order placement, but not explicitly linked as setup. |
| User Bearer token for checkout | FR-18 support | EXPLICIT | Global rule at the start of Section 4. |
| Database reset/state restoration | All | UNSUPPORTED | No reset or cleanup mechanism is specified. |

## 8. Potential Hallucinations / Unsupported Assumptions

Prompt 001 mostly labeled assumptions correctly. The following statements still require normalization.

| ID | Feature | Prompt 001 Statement | Problem | Corrected Version |
| --- | --- | --- | --- | --- |
| H-001 | FR-02 | “Success body: An object containing a JWT `token` and `user` information.” | The field/content statement is supported, but an object container is not explicitly defined. | Success returns JWT `token` and `user` information; overall structure is **Not specified**. |
| H-002 | FR-02 | Registration “can create an account that may later be used for login.” | Likely workflow, but the specification does not link registration to login setup. | Registration is separately documented; its role as FR-02 setup is **Not specified**. |
| H-003 | FR-09 | Admin coupon creation can supply application test data. | This is a testing interpretation, not a source requirement. | Coupon creation is documented; its use as FR-09 setup is **Not specified**. |
| H-004 | FR-09 | Coupon deletion supports cleanup or unavailable-coupon setup. | This is a testing interpretation. | Coupon deletion is documented; its use for cleanup/setup is **Not specified**. |
| H-005 | FR-18 | `POST /api/checkout` “creates an order and can supply an existing order for admin operations.” | “Đặt hàng” supports order placement, but the fixture relationship is not explicit. | Checkout is documented; its use as FR-18 setup is **Not specified**. |
| H-006 | FR-18 | `GET /api/orders/:id` “can observe its current state.” | Order detail is documented, but its schema does not explicitly include status. | The endpoint retrieves order detail; returned fields are **Not specified**. |
| H-007 | FR-18 | “JWT/Bearer token for Admin account” is explicitly required. | Section 6 explicitly says Bearer token, not JWT; linking it to login's JWT is interpretation. | `Authorization: Bearer <token>` and Admin permission are required. Token kind beyond that is **Not specified** in Section 6. |
| H-008 | FR-18 | Cart or checkout data is “required by `/api/checkout` according to its own example.” | A body example does not establish requiredness, and no cart dependency is stated. | Checkout shows `total_amount` and `shipping_address` in an example; their requiredness and cart dependency are **Not specified**. |
| H-009 | Cross-feature | Credentials are needed before creating an order. | Login is one possible token source, but the specification does not define this workflow as mandatory. | Section 4 requires a Bearer token; token-acquisition workflow is **Not specified**. |

No **CONTRADICTED** Prompt 001 statement was identified.

## 9. Missing Requirements

| ID | Feature | Missing Requirement | Source Section | Why Testing-Relevant |
| --- | --- | --- | --- | --- |
| M-001 | All | Base URL is `http://localhost:3000`. | Document header | Required to construct executable requests. |
| M-002 | FR-18 support | `PUT /api/orders/:id/cancel` changes the order state to `canceled`. | 4.6 Hủy đơn hàng | Adds an explicit state-changing endpoint relevant to order state behavior. |
| M-003 | FR-18 support | Cancellation is allowed only when the order is “chưa giao.” | 4.6 Hủy đơn hàng | Provides an explicit transition precondition, although its mapping to statuses is ambiguous. |

No other material omission from the selected-feature scope was identified.

## 10. Normalized Requirement Model

### FR-02 — Login and Account Lockout

#### A. Endpoints

- `POST /api/login` — login endpoint.
- Base URL: `http://localhost:3000`.
- No separate account-lockout endpoint is documented.

#### B. Inputs and Explicit Constraints

- Body is shown as JSON with `email` and `password`.
- Both example values are JSON strings.
- Requiredness, format, length, allowed values, normalization, defaults, and extra-field handling: **Not specified**.
- Path and query inputs: none documented.
- Request `Content-Type`: **Not specified**.

#### C. Authentication / Authorization

- Prerequisite authentication for login: **Not specified**.
- Required role: **Not specified**.
- On successful login, a JWT `token` is returned.

#### D. Business Rules

- A successful login returns JWT `token` and `user` information.
- Credential-validity rules: **Not specified**.
- Failed-login and lockout rules: **Not specified**.

#### E. States and Explicit State Rules

- Account states: **Not specified**.
- Failed-attempt state/counter: **Not specified**.
- Transitions: **Not specified**.

#### F. Response Codes

- Success: `200 OK`.
- Failure status codes: **Not specified**.

#### G. Response Schema

- Successful response returns a JWT `token` string and `user` information.
- Overall response structure: **Not specified**.
- `user` structure/types: **Not specified**.
- Error schema: **Not specified**.

#### H. Applicable Security Requirements

- SEC-01–SEC-07 applicability: **Not specified** because those requirements are absent.
- Returning a JWT on success is verified, but it has no SEC ID in this source.

#### I. Preconditions / Dependencies

- An account and corresponding credentials are **IMPLIED-BY-ENDPOINT**, not explicit.
- Locked/unlocked state and failed-attempt setup: **Not specified**.

#### J. Unspecified or Ambiguous Items

- Every account-lockout detail.
- Input requiredness and validation.
- JWT claims, lifetime, and invalidation.
- Failure responses.
- Exact success schema and permitted `user` fields.

### FR-09 — Discount Coupons

#### A. Endpoints

- Primary: `POST /api/apply-coupon` — calculates the total after discount.
- Supporting documented coupon endpoints:
  - `GET /api/coupons` — coupon list, labeled for Admin.
  - `POST /api/admin/coupons` — create coupon.
  - `DELETE /api/admin/coupons/:id` — delete coupon.
- Base URL: `http://localhost:3000`.

#### B. Inputs and Explicit Constraints

- `/api/apply-coupon` JSON example fields:
  - `code`: example JSON string.
  - `total_amount`: example JSON number.
  - `user_id`: example JSON number.
- Requiredness, formats, ranges, defaults, and relationships: **Not specified**.
- Admin-create JSON example fields: `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, and `max_uses_per_user`.
- `type=percent`, the date, and numeric values are examples only; normative constraints are **Not specified**.
- Admin-delete path includes `:id`; its type/range are **Not specified**.

#### C. Authentication / Authorization

- `/api/apply-coupon`: authentication and role are **Not specified**.
- `GET /api/coupons`: Bearer header is explicit; endpoint is labeled for Admin. Exact role enforcement/failure behavior is **Ambiguous**.
- Section 6 create/delete endpoints: Bearer token and Admin permission are explicitly required.

#### D. Business Rules

- Coupon application calculates the total after discount.
- Response JSON contains `discount_amount` and `final_amount`.
- Exact validation, eligibility, and calculation rules: **Not specified**.

#### E. States and Explicit State Rules

- No coupon state or state-transition model is specified.
- `expired_at`, `min_order_amount`, and `max_uses_per_user` exist in a creation example, but their application semantics are **Not specified**.

#### F. Response Codes

- All success and error status codes: **Not specified**.

#### G. Response Schema

- `/api/apply-coupon` returns a JSON structure containing `discount_amount` and `final_amount`.
- Both field types and all other fields: **Not specified**.
- Error schema: **Not specified**.
- Supporting endpoint schemas: **Not specified**.

#### H. Applicable Security Requirements

- SEC-01–SEC-07 applicability: **Not specified** because those definitions are absent.
- Bearer/Admin requirements remain verified without SEC IDs.

#### I. Preconditions / Dependencies

- Existing coupon and user are **IMPLIED-BY-ENDPOINT**, not explicit.
- Admin account/token is explicit for Section 6 setup endpoints.
- Cart/order dependencies: **Not specified**.

#### J. Unspecified or Ambiguous Items

- Existence, active status, expiry eligibility, thresholds, formulas, rounding, usage rules, code matching, and combination rules.
- Whether application requires authentication and whether `user_id` must match token identity.
- Whether application consumes usage.
- Response statuses/error schema.
- Admin-role enforcement behavior for `GET /api/coupons`.

### FR-18 — Order Management (Admin)

#### A. Endpoints

- `GET /api/admin/orders` — list orders for the entire system.
- `PUT /api/admin/orders/:id/status` — update an order's status.
- Relevant supporting state endpoint: `PUT /api/orders/:id/cancel`.
- Base URL: `http://localhost:3000`.

#### B. Inputs and Explicit Constraints

- Both Admin endpoints require header `Authorization: Bearer <token>`.
- Status-update path includes `id`; type/range/existence constraints are **Not specified**.
- Status-update body example contains `status: "confirmed"`.
- Documented status vocabulary: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.
- Requiredness and default of `status`: **Not specified**.
- No query inputs are documented for Admin order listing.

#### C. Authentication / Authorization

- Every Section 6 Admin endpoint requires a Bearer token and an account with Admin permission.
- Missing/invalid token and non-admin response behavior: **Not specified**.

#### D. Business Rules

- Admin order listing covers the entire system.
- Admin can update order status.
- Detailed Admin transition rules and side effects: **Not specified**.

#### E. States and Explicit State Rules

- Explicit status vocabulary: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.
- `PUT /api/orders/:id/cancel` changes status to `canceled` and is allowed only while the order is “chưa giao.”
- The exact status or statuses corresponding to “chưa giao” are **Not specified**.
- No source-to-target transition pair is explicitly established for the Admin PUT endpoint.
- Initial states, terminal states, and same-state rules: **Not specified**.

#### F. Response Codes

- Success and failure codes for all relevant order endpoints: **Not specified**.

#### G. Response Schema

- Admin list response schema: **Not specified**.
- Admin update response schema: **Not specified**.
- Cancel response schema: **Not specified**.
- Error schemas: **Not specified**.

#### H. Applicable Security Requirements

- SEC-01–SEC-07 applicability: **Not specified** because those definitions are absent.
- Bearer-token and Admin-permission requirements are explicit security-relevant rules without SEC IDs.

#### I. Preconditions / Dependencies

- Admin account and Bearer token: explicit.
- Existing target order: **IMPLIED-BY-ENDPOINT**.
- “Chưa giao” order for cancellation: explicit, but status mapping ambiguous.
- Particular source state for Admin PUT: **Not specified**.

#### J. Unspecified or Ambiguous Items

- Concrete transition matrix, initial/final states, status-update idempotence, concurrency, and side effects.
- Meaning of “chưa giao” relative to the five status values.
- Input constraints for `id` and `status`.
- Every response code/schema and authorization failure behavior.

## 11. Verified Test-Basis Matrix

| TB-ID | Feature | Endpoint | Requirement Type | Verified Requirement | Source | Testable? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TB-FR02-001 | FR-02 | `POST /api/login` | INPUT | Method/path are `POST /api/login`. | 1.2 | YES | Base URL is document-level. |
| TB-FR02-002 | FR-02 | `POST /api/login` | INPUT | JSON example contains `email`. | 1.2 | PARTIAL | Requiredness and validation are not specified. |
| TB-FR02-003 | FR-02 | `POST /api/login` | INPUT | JSON example contains `password`. | 1.2 | PARTIAL | Requiredness and validation are not specified. |
| TB-FR02-004 | FR-02 | `POST /api/login` | AUTHENTICATION | Successful login returns JWT `token`. | 1.2 | YES | Claims/lifetime are not specified. |
| TB-FR02-005 | FR-02 | `POST /api/login` | RESPONSE_STATUS | Success status is `200 OK`. | 1.2 | YES | Failure statuses are not specified. |
| TB-FR02-006 | FR-02 | `POST /api/login` | RESPONSE_SCHEMA | Success returns `token` and `user` information. | 1.2 | PARTIAL | Overall and `user` schemas are not specified. |
| TB-FR02-007 | FR-02 | `POST /api/login` | DEPENDENCY | Account/credentials are implied by the login endpoint. | 1.2 | PARTIAL | Not an explicit precondition. |
| TB-FR09-001 | FR-09 | `POST /api/apply-coupon` | INPUT | Method/path are `POST /api/apply-coupon`. | 5.1 | YES | — |
| TB-FR09-002 | FR-09 | `POST /api/apply-coupon` | INPUT | JSON example contains `code`. | 5.1 | PARTIAL | Requiredness/domain are not specified. |
| TB-FR09-003 | FR-09 | `POST /api/apply-coupon` | INPUT | JSON example contains `total_amount`. | 5.1 | PARTIAL | Requiredness/domain are not specified. |
| TB-FR09-004 | FR-09 | `POST /api/apply-coupon` | INPUT | JSON example contains `user_id`. | 5.1 | PARTIAL | Requiredness/domain/identity relationship are not specified. |
| TB-FR09-005 | FR-09 | `POST /api/apply-coupon` | BUSINESS_RULE | Endpoint calculates the total after discount. | 5.1 | PARTIAL | Formula and eligibility are not specified. |
| TB-FR09-006 | FR-09 | `POST /api/apply-coupon` | RESPONSE_SCHEMA | Response is JSON containing `discount_amount`. | 5.1 | PARTIAL | Type/value rule is not specified. |
| TB-FR09-007 | FR-09 | `POST /api/apply-coupon` | RESPONSE_SCHEMA | Response is JSON containing `final_amount`. | 5.1 | PARTIAL | Type/value rule is not specified. |
| TB-FR09-008 | FR-09 | `GET /api/coupons` | INPUT | Method/path are `GET /api/coupons`. | 5.2 | YES | Supporting endpoint. |
| TB-FR09-009 | FR-09 | `GET /api/coupons` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | 5.2 | YES | Failure behavior absent. |
| TB-FR09-010 | FR-09 | `GET /api/coupons` | AUTHORIZATION | Endpoint is labeled “Dành cho Admin.” | 5.2 | PARTIAL | Exact role enforcement is ambiguous. |
| TB-FR09-011 | FR-09 | `POST /api/admin/coupons` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | Section 6, 6.4 | YES | — |
| TB-FR09-012 | FR-09 | `POST /api/admin/coupons` | AUTHORIZATION | Account must have Admin permission. | Section 6, 6.4 | YES | Failure behavior absent. |
| TB-FR09-013 | FR-09 | `POST /api/admin/coupons` | INPUT | Creation example contains six named body fields. | 6.4 | PARTIAL | Requiredness and domains are not specified. |
| TB-FR09-014 | FR-09 | `DELETE /api/admin/coupons/:id` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | Section 6, 6.4 | YES | — |
| TB-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | AUTHORIZATION | Account must have Admin permission. | Section 6, 6.4 | YES | — |
| TB-FR18-001 | FR-18 | `GET /api/admin/orders` | INPUT | Method/path are `GET /api/admin/orders`. | 6.2 | YES | — |
| TB-FR18-002 | FR-18 | `GET /api/admin/orders` | BUSINESS_RULE | Operation lists orders for the entire system. | 6.2 heading | YES | Response schema absent. |
| TB-FR18-003 | FR-18 | `GET /api/admin/orders` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | Section 6 | YES | Failure behavior absent. |
| TB-FR18-004 | FR-18 | `GET /api/admin/orders` | AUTHORIZATION | Account must have Admin permission. | Section 6 | YES | Failure behavior absent. |
| TB-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | INPUT | Method/path identify an order by `id`. | 6.2 | PARTIAL | `id` type/range are not specified. |
| TB-FR18-006 | FR-18 | `PUT /api/admin/orders/:id/status` | INPUT | JSON example contains `status: "confirmed"`. | 6.2 | PARTIAL | Requiredness not specified. |
| TB-FR18-007 | FR-18 | `PUT /api/admin/orders/:id/status` | DOMAIN | Documented status vocabulary is `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | 6.2 | YES | Transition relationships are not specified. |
| TB-FR18-008 | FR-18 | `PUT /api/admin/orders/:id/status` | BUSINESS_RULE | Operation updates order status. | 6.2 | PARTIAL | Exact valid transitions are absent. |
| TB-FR18-009 | FR-18 | `PUT /api/admin/orders/:id/status` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | Section 6 | YES | — |
| TB-FR18-010 | FR-18 | `PUT /api/admin/orders/:id/status` | AUTHORIZATION | Account must have Admin permission. | Section 6 | YES | — |
| TB-FR18-011 | FR-18 support | `PUT /api/orders/:id/cancel` | STATE | Operation changes status to `canceled`. | 4.6 | YES | Supporting state endpoint. |
| TB-FR18-012 | FR-18 support | `PUT /api/orders/:id/cancel` | STATE | Cancellation is permitted only when the order is “chưa giao.” | 4.6 | PARTIAL | Phrase is not mapped to listed statuses. |
| TB-FR18-013 | FR-18 support | `PUT /api/orders/:id/cancel` | AUTHENTICATION | Requires `Authorization: Bearer <token>`. | Section 4 | YES | Required role not specified. |
| TB-FR18-014 | FR-18 | Admin order endpoints | DEPENDENCY | Admin account and Bearer token are explicit dependencies. | Section 6 | YES | Existing order remains implied. |

No `SECURITY` row with a SEC ID is included because SEC-01–SEC-07 are absent. Authentication/authorization rows retain the security-relevant statements that are actually documented.

## 12. Test-Design Blockers

| Blocker ID | Feature | Missing Information | Impact on Testing | Recommended Handling |
| --- | --- | --- | --- | --- |
| BLK-FR02-001 | FR-02 | Requiredness and validation rules for `email` and `password` | Deterministic positive/negative input expectations cannot be derived. | Keep expected result unspecified |
| BLK-FR02-002 | FR-02 | Failed-attempt counter and threshold | Lockout sequences cannot have spec-derived expected states. | Exclude from spec-based test design |
| BLK-FR02-003 | FR-02 | Lock duration and unlock behavior | Time-based expected results cannot be determined. | Exclude from spec-based test design |
| BLK-FR02-004 | FR-02 | Failure status codes and error schema | Negative response assertions cannot be deterministic. | Keep expected result unspecified |
| BLK-FR02-005 | FR-02 | Exact `user` response schema and permitted sensitive fields | Complete schema validation is impossible. | Mark as exploratory test candidate |
| BLK-FR02-006 | FR-02 | JWT claims, lifetime, and invalidation | Token-content/lifecycle assertions lack a basis. | Verify against implementation later |
| BLK-FR09-001 | FR-09 | Requiredness/domains for `code`, `total_amount`, and `user_id` | Domain partition expectations cannot be derived. | Keep expected result unspecified |
| BLK-FR09-002 | FR-09 | Coupon existence/active/expiration/threshold eligibility | Eligibility-result assertions cannot be derived. | Exclude from spec-based test design |
| BLK-FR09-003 | FR-09 | Discount formulas and rounding | Correct numeric outputs cannot be calculated deterministically. | Keep expected result unspecified |
| BLK-FR09-004 | FR-09 | Authentication and `user_id` ownership for application | Access-control expectations are indeterminate. | Mark as exploratory test candidate |
| BLK-FR09-005 | FR-09 | Usage persistence and per-user enforcement | Stateful usage tests lack expected behavior. | Exclude from spec-based test design |
| BLK-FR09-006 | FR-09 | Success/error statuses and field types | Full response validation is impossible. | Keep expected result unspecified |
| BLK-FR09-007 | FR-09 | Role enforcement for `GET /api/coupons` | The Admin label cannot determine exact non-admin behavior. | Verify against implementation later |
| BLK-FR18-001 | FR-18 | Concrete Admin order transition matrix | Valid/invalid transition assertions cannot be derived. | Exclude from spec-based test design |
| BLK-FR18-002 | FR-18 | Meaning of “chưa giao” in status terms | Cancel precondition cannot be mapped deterministically. | Verify against implementation later |
| BLK-FR18-003 | FR-18 | `id` and `status` requiredness/type constraints | Negative input expectations are unspecified. | Keep expected result unspecified |
| BLK-FR18-004 | FR-18 | Initial/final states and idempotence | State-sequence expectations remain incomplete. | Exclude from spec-based test design |
| BLK-FR18-005 | FR-18 | Success/error statuses and response schemas | Response assertions are not deterministic. | Keep expected result unspecified |
| BLK-FR18-006 | FR-18 | Missing/invalid-token and non-admin failure behavior | Exact access-control status/schema cannot be asserted. | Mark as exploratory test candidate |
| BLK-ALL-001 | All | SEC-01–SEC-07 definitions and mappings | Required security coverage cannot be traced by ID. | Exclude from spec-based test design |

---

This document is a verified test basis, not a test suite. It intentionally contains no test cases or generated test data.
