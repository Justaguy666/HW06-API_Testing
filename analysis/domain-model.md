# Prompt 003 — Domain Modeling and Equivalence Partitioning

## 1. Executive Summary

The model covers every documented or explicitly tracked input surface in the normalized test basis. “Deterministic partitions” below means `Deterministic Expected Behavior? = YES`; “non-deterministic” combines `PARTIAL` and `NO`. The blocker total is 20 unique blockers; the per-feature counts include the shared `BLK-ALL-001`.

| Metric | FR-02 | FR-09 | FR-18 | Total |
| ------ | ----: | ----: | ----: | ----: |
| Parameters found | 4 | 16 | 7 | 27 |
| Equivalence partitions | 15 | 44 | 32 | 91 |
| VALID | 0 | 2 | 3 | 5 |
| INVALID | 0 | 9 | 12 | 21 |
| CONDITIONAL | 2 | 11 | 7 | 20 |
| EXPLORATORY | 13 | 22 | 10 | 45 |
| Deterministic partitions (`YES`) | 2 | 0 | 2 | 4 |
| Non-deterministic partitions (`PARTIAL` + `NO`) | 13 | 44 | 30 | 87 |
| Blockers affecting domain testing | 7 | 8 | 7 | 20 unique |

FR-02 has no explicitly invalid input class because field requiredness and validation are absent. FR-09 has deterministic authorization constraints only on supporting Admin endpoints, while its core coupon rules remain unspecified. FR-18 has explicit Admin authorization and a status vocabulary, but not an Admin transition matrix. No concrete test values, boundary analysis, payloads, or test cases are included.

## 2. Parameter Inventory

### 2.1 FR-02

| PARAM-ID | Feature | Endpoint | Location | Parameter | Specified Type | Required? | Explicit Constraints | Dependency | TB References |
| -------- | ------- | -------- | -------- | --------- | -------------- | --------- | -------------------- | ---------- | ------------- |
| P-FR02-001 | FR-02 | `POST /api/login` | Body | `email` | JSON string in example; normative type Not specified | Not specified | None | Credential relationship and account existence are implied only | TB-FR02-002, TB-FR02-007 |
| P-FR02-002 | FR-02 | `POST /api/login` | Body | `password` | JSON string in example; normative type Not specified | Not specified | None | Must relate to `email` for authentication; exact rule Not specified | TB-FR02-003, TB-FR02-007 |
| P-FR02-003 | FR-02 | `POST /api/login` | Header | `Content-Type` | Not specified | Not specified | Body is shown as JSON; header rule Not specified | Governs representation parsing; behavior Not specified | BLK-FR02-001 |
| P-FR02-004 | FR-02 | `POST /api/login` | Header | `Authorization` | Not specified | Not specified | No request auth requirement documented | None documented | BLK-FR02-004 |

### 2.2 FR-09

| PARAM-ID | Feature | Endpoint | Location | Parameter | Specified Type | Required? | Explicit Constraints | Dependency | TB References |
| -------- | ------- | -------- | -------- | --------- | -------------- | --------- | -------------------- | ---------- | ------------- |
| P-FR09-001 | FR-09 | `POST /api/apply-coupon` | Body | `code` | JSON string in example; normative type Not specified | Not specified | None | Coupon-resource relationship implied | TB-FR09-002 |
| P-FR09-002 | FR-09 | `POST /api/apply-coupon` | Body | `total_amount` | JSON number in example; normative type Not specified | Not specified | None | Used in total-after-discount calculation; formula Not specified | TB-FR09-003, TB-FR09-005 |
| P-FR09-003 | FR-09 | `POST /api/apply-coupon` | Body | `user_id` | JSON number in example; normative type Not specified | Not specified | None | User-resource/identity relationship implied | TB-FR09-004 |
| P-FR09-004 | FR-09 | `POST /api/apply-coupon` | Header | `Authorization` | Not specified | Not specified | No auth rule documented | Relationship to `user_id` Not specified | BLK-FR09-004 |
| P-FR09-005 | FR-09 | `POST /api/apply-coupon` | Header | `Content-Type` | Not specified | Not specified | Body is shown as JSON; header rule Not specified | Governs representation parsing; behavior Not specified | BLK-FR09-001 |
| P-FR09-006 | FR-09 | `GET /api/coupons` | Header | `Authorization` | Bearer token syntax | Yes | `Authorization: Bearer <token>` | Endpoint is labeled for Admin; exact enforcement ambiguous | TB-FR09-009, TB-FR09-010 |
| P-FR09-007 | FR-09 | `POST /api/admin/coupons` | Header | `Authorization` | Bearer token syntax | Yes | Bearer token; account must have Admin permission | Authentication × role | TB-FR09-011, TB-FR09-012 |
| P-FR09-008 | FR-09 | `POST /api/admin/coupons` | Body | `code` | JSON string in example; normative type Not specified | Not specified | None | Coupon creation semantics Not specified | TB-FR09-013 |
| P-FR09-009 | FR-09 | `POST /api/admin/coupons` | Body | `type` | JSON string in example; normative type Not specified | Not specified | Example representation only | Relationship to calculation Not specified | TB-FR09-013 |
| P-FR09-010 | FR-09 | `POST /api/admin/coupons` | Body | `discount_value` | JSON number in example; normative type Not specified | Not specified | None | Relationship to `type` Not specified | TB-FR09-013 |
| P-FR09-011 | FR-09 | `POST /api/admin/coupons` | Body | `min_order_amount` | JSON number in example; normative type Not specified | Not specified | None | Application eligibility semantics Not specified | TB-FR09-013 |
| P-FR09-012 | FR-09 | `POST /api/admin/coupons` | Body | `expired_at` | JSON string in example; normative format/type Not specified | Not specified | None | Application expiry semantics Not specified | TB-FR09-013 |
| P-FR09-013 | FR-09 | `POST /api/admin/coupons` | Body | `max_uses_per_user` | JSON number in example; normative type Not specified | Not specified | None | Usage persistence/enforcement Not specified | TB-FR09-013 |
| P-FR09-014 | FR-09 | `POST /api/admin/coupons` | Header | `Content-Type` | Not specified | Not specified | Body is shown as JSON; header rule Not specified | Governs representation parsing; behavior Not specified | BLK-FR09-001 |
| P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | Header | `Authorization` | Bearer token syntax | Yes | Bearer token; account must have Admin permission | Authentication × role | TB-FR09-014, TB-FR09-015 |
| P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | Path | `id` | Not specified | Structurally required by path | Identifies coupon; format/range Not specified | Coupon existence implied | TB-FR09-014, TB-FR09-015 |

### 2.3 FR-18

| PARAM-ID | Feature | Endpoint | Location | Parameter | Specified Type | Required? | Explicit Constraints | Dependency | TB References |
| -------- | ------- | -------- | -------- | --------- | -------------- | --------- | -------------------- | ---------- | ------------- |
| P-FR18-001 | FR-18 | `GET /api/admin/orders` | Header | `Authorization` | Bearer token syntax | Yes | Bearer token; account must have Admin permission | Authentication × role | TB-FR18-003, TB-FR18-004 |
| P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | Header | `Authorization` | Bearer token syntax | Yes | Bearer token; account must have Admin permission | Authentication × role | TB-FR18-009, TB-FR18-010 |
| P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | Path | `id` | Not specified | Structurally required by path | Identifies order; format/range Not specified | Order existence implied | TB-FR18-005, TB-FR18-014 |
| P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | Body | `status` | JSON string in example; normative type Not specified | Not specified | Documented set: `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | Validity may depend on current state; rules Not specified | TB-FR18-006, TB-FR18-007, TB-FR18-008 |
| P-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | Header | `Content-Type` | Not specified | Not specified | Body is shown as JSON; header rule Not specified | Governs representation parsing; behavior Not specified | BLK-FR18-003 |
| P-FR18-006 | FR-18 support | `PUT /api/orders/:id/cancel` | Header | `Authorization` | Bearer token syntax | Yes | `Authorization: Bearer <token>` | Required by global Section 4 rule; role Not specified | TB-FR18-013 |
| P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | Path | `id` | Not specified | Structurally required by path | Identifies order; format/range Not specified | Cancellation allowed only when order is “chưa giao” | TB-FR18-011, TB-FR18-012 |

## 3. Parameter Domain Models

### 3.1 FR-02

| PARAM-ID | Parameter | Base Domain | Explicit Valid Domain | Explicit Invalid Domain | Unknown / Unspecified Region |
| -------- | --------- | ----------- | --------------------- | ----------------------- | ---------------------------- |
| P-FR02-001 | `email` | Any JSON field value or omission | String representation shown in example, conditionally paired with credentials | None | Presence, null, non-string, format, length, normalization, account existence, correctness |
| P-FR02-002 | `password` | Any JSON field value or omission | String representation shown in example, conditionally paired with `email` | None | Presence, null, non-string, length, format, correctness |
| P-FR02-003 | `Content-Type` | Header absent or present with any value | None | None | Entire header domain |
| P-FR02-004 | `Authorization` | Header absent or present with any value | None | None | Entire header domain for login request |

### 3.2 FR-09

| PARAM-ID | Parameter | Base Domain | Explicit Valid Domain | Explicit Invalid Domain | Unknown / Unspecified Region |
| -------- | --------- | ----------- | --------------------- | ----------------------- | ---------------------------- |
| P-FR09-001 | `code` | Any JSON field value or omission | String representation shown in example, conditional on resource | None | Requiredness, type rule, matching, format, normalization, resource states |
| P-FR09-002 | `total_amount` | Any JSON field value or omission | Number representation shown in example, conditional on unknown calculation rules | None | Requiredness, type rule, sign, precision, range, currency, eligibility |
| P-FR09-003 | `user_id` | Any JSON field value or omission | Number representation shown in example, conditional on user resource | None | Requiredness, type rule, range, existence, ownership/auth identity |
| P-FR09-004 | Apply `Authorization` | Header absent or present with any value | None | None | Entire authentication domain |
| P-FR09-005 | Apply `Content-Type` | Header absent or present with any value | None | None | Entire media-type domain |
| P-FR09-006 | List `Authorization` | Header absent or present | Bearer-form header; Admin intent appears in label | Missing/non-Bearer violates explicit header syntax | Token validity and exact Admin enforcement |
| P-FR09-007 | Create `Authorization` | Header absent or present; caller roles | Bearer token associated with Admin account | Missing/non-Bearer header; account without Admin permission | Token validity and failure outcome |
| P-FR09-008 | Create `code` | Any JSON field value or omission | String representation shown in example | None | All validation and creation semantics |
| P-FR09-009 | `type` | Any JSON field value or omission | String representation shown in example | None | Allowed set and relation to discount calculation |
| P-FR09-010 | `discount_value` | Any JSON field value or omission | Number representation shown in example | None | Bounds, precision, sign, relation to `type` |
| P-FR09-011 | `min_order_amount` | Any JSON field value or omission | Number representation shown in example | None | Bounds and eligibility semantics |
| P-FR09-012 | `expired_at` | Any JSON field value or omission | String representation shown in example | None | Required format, temporal comparison, timezone, expiration semantics |
| P-FR09-013 | `max_uses_per_user` | Any JSON field value or omission | Number representation shown in example | None | Bounds, integrality, persistence, enforcement |
| P-FR09-014 | Create `Content-Type` | Header absent or present with any value | None | None | Entire media-type domain |
| P-FR09-015 | Delete `Authorization` | Header absent or present; caller roles | Bearer token associated with Admin account | Missing/non-Bearer header; account without Admin permission | Token validity and failure outcome |
| P-FR09-016 | Delete `id` | Any path-segment representation or missing segment | Existing coupon identifier is implied, not explicit | Missing segment violates documented path shape | Type, format, range, resource existence, deleted-resource behavior |

### 3.3 FR-18

| PARAM-ID | Parameter | Base Domain | Explicit Valid Domain | Explicit Invalid Domain | Unknown / Unspecified Region |
| -------- | --------- | ----------- | --------------------- | ----------------------- | ---------------------------- |
| P-FR18-001 | List `Authorization` | Header absent or present; caller roles | Bearer token associated with Admin account | Missing/non-Bearer header; account without Admin permission | Token validity and exact failure response |
| P-FR18-002 | Update `Authorization` | Header absent or present; caller roles | Bearer token associated with Admin account | Missing/non-Bearer header; account without Admin permission | Token validity and exact failure response |
| P-FR18-003 | Update `id` | Any path-segment representation or missing segment | Existing order identifier is implied, not explicit | Missing segment violates documented path shape | Type, format, range, existence, ownership |
| P-FR18-004 | `status` | Any JSON field value or omission | Members of documented status vocabulary, conditionally valid by current state | Value outside documented status vocabulary | Requiredness, normative type, concrete transition validity, same-state behavior |
| P-FR18-005 | Update `Content-Type` | Header absent or present with any value | None | None | Entire media-type domain |
| P-FR18-006 | Cancel `Authorization` | Header absent or present | Bearer-form header | Missing/non-Bearer violates explicit header syntax | Token validity, role, ownership, failure response |
| P-FR18-007 | Cancel `id` | Any path-segment representation or missing segment; referenced order state | Existing order satisfying “chưa giao” condition | Existing order not satisfying “chưa giao”; missing segment violates path shape | Meaning of “chưa giao,” ID type/format/range, non-existing resource |

## 4. Equivalence Partition Model

### 4.1 FR-02

| EP-ID | PARAM-ID | Feature | Endpoint | Parameter | Partition Description | Classification | Basis | Governing Requirement | Dependency / Condition | Deterministic Expected Behavior? |
| ----- | -------- | ------- | -------- | --------- | --------------------- | -------------- | ----- | --------------------- | ---------------------- | -------------------------------- |
| EP-FR02-001 | P-FR02-001 | FR-02 | `POST /api/login` | `email` | JSON-string representation associated with an existing account and matching credential pair | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR02-002, TB-FR02-007 | Depends on `password` and account existence | YES |
| EP-FR02-002 | P-FR02-001 | FR-02 | `POST /api/login` | `email` | JSON-string representation not associated with a usable credential pair | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001, BLK-FR02-004 | Failure behavior not specified | NO |
| EP-FR02-003 | P-FR02-001 | FR-02 | `POST /api/login` | `email` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Requiredness not specified | NO |
| EP-FR02-004 | P-FR02-001 | FR-02 | `POST /api/login` | `email` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Null handling not specified | NO |
| EP-FR02-005 | P-FR02-001 | FR-02 | `POST /api/login` | `email` | Field represented by a non-string JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Normative type not specified | NO |
| EP-FR02-006 | P-FR02-002 | FR-02 | `POST /api/login` | `password` | JSON-string representation matching the selected account's credential | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR02-003, TB-FR02-007 | Depends on `email` and account existence | YES |
| EP-FR02-007 | P-FR02-002 | FR-02 | `POST /api/login` | `password` | JSON-string representation not matching the selected account's credential | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001, BLK-FR02-004 | Invalid-credential behavior not specified | NO |
| EP-FR02-008 | P-FR02-002 | FR-02 | `POST /api/login` | `password` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Requiredness not specified | NO |
| EP-FR02-009 | P-FR02-002 | FR-02 | `POST /api/login` | `password` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Null handling not specified | NO |
| EP-FR02-010 | P-FR02-002 | FR-02 | `POST /api/login` | `password` | Field represented by a non-string JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Normative type not specified | NO |
| EP-FR02-011 | P-FR02-003 | FR-02 | `POST /api/login` | `Content-Type` | Header indicates a JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Header requirement absent | NO |
| EP-FR02-012 | P-FR02-003 | FR-02 | `POST /api/login` | `Content-Type` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Header requirement absent | NO |
| EP-FR02-013 | P-FR02-003 | FR-02 | `POST /api/login` | `Content-Type` | Header indicates a non-JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-001 | Media-type behavior absent | NO |
| EP-FR02-014 | P-FR02-004 | FR-02 | `POST /api/login` | `Authorization` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-004 | Request authentication not specified | NO |
| EP-FR02-015 | P-FR02-004 | FR-02 | `POST /api/login` | `Authorization` | Header present in any form | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR02-004 | Effect on login not specified | NO |

### 4.2 FR-09

| EP-ID | PARAM-ID | Feature | Endpoint | Parameter | Partition Description | Classification | Basis | Governing Requirement | Dependency / Condition | Deterministic Expected Behavior? |
| ----- | -------- | ------- | -------- | --------- | --------------------- | -------------- | ----- | --------------------- | ---------------------- | -------------------------------- |
| EP-FR09-001 | P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | JSON-string representation associated with a coupon resource | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR09-002 | Depends on coupon existence and unspecified eligibility | PARTIAL |
| EP-FR09-002 | P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | JSON-string representation not associated with a coupon resource | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-002 | Missing-coupon behavior not specified | NO |
| EP-FR09-003 | P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Requiredness not specified | NO |
| EP-FR09-004 | P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Null handling not specified | NO |
| EP-FR09-005 | P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | Field represented by a non-string JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Normative type not specified | NO |
| EP-FR09-006 | P-FR09-002 | FR-09 | `POST /api/apply-coupon` | `total_amount` | JSON-number representation participating in discount calculation | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR09-003, TB-FR09-005 | Depends on coupon and unspecified formula/eligibility | PARTIAL |
| EP-FR09-007 | P-FR09-002 | FR-09 | `POST /api/apply-coupon` | `total_amount` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Requiredness not specified | NO |
| EP-FR09-008 | P-FR09-002 | FR-09 | `POST /api/apply-coupon` | `total_amount` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Null handling not specified | NO |
| EP-FR09-009 | P-FR09-002 | FR-09 | `POST /api/apply-coupon` | `total_amount` | Field represented by a non-number JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Normative type not specified | NO |
| EP-FR09-010 | P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | JSON-number representation associated with a user resource | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR09-004 | User existence/identity semantics not specified | PARTIAL |
| EP-FR09-011 | P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | JSON-number representation not associated with a user resource | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-004 | Missing-user behavior not specified | NO |
| EP-FR09-012 | P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001, BLK-FR09-004 | Requiredness/identity semantics absent | NO |
| EP-FR09-013 | P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Null handling not specified | NO |
| EP-FR09-014 | P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | Field represented by a non-number JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Normative type not specified | NO |
| EP-FR09-015 | P-FR09-004 | FR-09 | `POST /api/apply-coupon` | `Authorization` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-004 | Application authentication absent | NO |
| EP-FR09-016 | P-FR09-004 | FR-09 | `POST /api/apply-coupon` | `Authorization` | Header present in any form | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-004 | Effect and identity relationship absent | NO |
| EP-FR09-017 | P-FR09-005 | FR-09 | `POST /api/apply-coupon` | `Content-Type` | Header indicates a JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Header requirement absent | NO |
| EP-FR09-018 | P-FR09-005 | FR-09 | `POST /api/apply-coupon` | `Content-Type` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Header requirement absent | NO |
| EP-FR09-019 | P-FR09-005 | FR-09 | `POST /api/apply-coupon` | `Content-Type` | Header indicates a non-JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Media-type behavior absent | NO |
| EP-FR09-020 | P-FR09-006 | FR-09 | `GET /api/coupons` | `Authorization` | Bearer-form token associated with an Admin account | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR09-009, TB-FR09-010 | Admin enforcement is ambiguous | PARTIAL |
| EP-FR09-021 | P-FR09-006 | FR-09 | `GET /api/coupons` | `Authorization` | Bearer-form token associated with a non-Admin account | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-007 | Admin label enforcement ambiguous | NO |
| EP-FR09-022 | P-FR09-006 | FR-09 | `GET /api/coupons` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR09-009 | Violates explicit header requirement | PARTIAL |
| EP-FR09-023 | P-FR09-006 | FR-09 | `GET /api/coupons` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR09-009 | Violates explicit header syntax | PARTIAL |
| EP-FR09-024 | P-FR09-007 | FR-09 | `POST /api/admin/coupons` | `Authorization` | Bearer-form token associated with an Admin account | VALID | SPEC-EXPLICIT | TB-FR09-011, TB-FR09-012 | Both authentication and role requirements satisfied | PARTIAL |
| EP-FR09-025 | P-FR09-007 | FR-09 | `POST /api/admin/coupons` | `Authorization` | Bearer-form token associated with a non-Admin account | INVALID | DEPENDENCY-DERIVED | TB-FR09-012 | Violates explicit Admin permission requirement | PARTIAL |
| EP-FR09-026 | P-FR09-007 | FR-09 | `POST /api/admin/coupons` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR09-011 | Violates explicit Bearer requirement | PARTIAL |
| EP-FR09-027 | P-FR09-007 | FR-09 | `POST /api/admin/coupons` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR09-011 | Violates explicit header syntax | PARTIAL |
| EP-FR09-028 | P-FR09-008 | FR-09 | `POST /api/admin/coupons` | `code` | Field represented as a JSON string consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Overall creation validity unspecified | PARTIAL |
| EP-FR09-029 | P-FR09-009 | FR-09 | `POST /api/admin/coupons` | `type` | Field represented as a JSON string consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Allowed set and semantics unspecified | PARTIAL |
| EP-FR09-030 | P-FR09-010 | FR-09 | `POST /api/admin/coupons` | `discount_value` | Field represented as a JSON number consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Bounds and relation to type unspecified | PARTIAL |
| EP-FR09-031 | P-FR09-011 | FR-09 | `POST /api/admin/coupons` | `min_order_amount` | Field represented as a JSON number consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Bounds and application semantics unspecified | PARTIAL |
| EP-FR09-032 | P-FR09-012 | FR-09 | `POST /api/admin/coupons` | `expired_at` | Field represented as a JSON string consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Format and expiration semantics unspecified | PARTIAL |
| EP-FR09-033 | P-FR09-013 | FR-09 | `POST /api/admin/coupons` | `max_uses_per_user` | Field represented as a JSON number consistent with the example | CONDITIONAL | SPEC-EXPLICIT | TB-FR09-013 | Bounds and usage semantics unspecified | PARTIAL |
| EP-FR09-034 | P-FR09-014 | FR-09 | `POST /api/admin/coupons` | `Content-Type` | Header indicates a JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Header requirement absent | NO |
| EP-FR09-035 | P-FR09-014 | FR-09 | `POST /api/admin/coupons` | `Content-Type` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Header requirement absent | NO |
| EP-FR09-036 | P-FR09-014 | FR-09 | `POST /api/admin/coupons` | `Content-Type` | Header indicates a non-JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | Media-type behavior absent | NO |
| EP-FR09-037 | P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | `Authorization` | Bearer-form token associated with an Admin account | VALID | SPEC-EXPLICIT | TB-FR09-014, TB-FR09-015 | Both explicit requirements satisfied | PARTIAL |
| EP-FR09-038 | P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | `Authorization` | Bearer-form token associated with a non-Admin account | INVALID | DEPENDENCY-DERIVED | TB-FR09-015 | Violates explicit Admin permission requirement | PARTIAL |
| EP-FR09-039 | P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR09-014 | Violates explicit Bearer requirement | PARTIAL |
| EP-FR09-040 | P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR09-014 | Violates explicit header syntax | PARTIAL |
| EP-FR09-041 | P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | `id` | Path identifier associated with an existing coupon | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR09-014, TB-FR09-015 | Existence implied; response unspecified | PARTIAL |
| EP-FR09-042 | P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | `id` | Path identifier not associated with a coupon | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-002 | Missing-resource behavior unspecified | NO |
| EP-FR09-043 | P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | `id` | Identifier segment omitted | INVALID | SPEC-DERIVED | TB-FR09-014 | Does not satisfy documented path shape | PARTIAL |
| EP-FR09-044 | P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | `id` | Identifier represented in an undocumented format/type region | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR09-001 | ID domain unspecified | NO |

### 4.3 FR-18

| EP-ID | PARAM-ID | Feature | Endpoint | Parameter | Partition Description | Classification | Basis | Governing Requirement | Dependency / Condition | Deterministic Expected Behavior? |
| ----- | -------- | ------- | -------- | --------- | --------------------- | -------------- | ----- | --------------------- | ---------------------- | -------------------------------- |
| EP-FR18-001 | P-FR18-001 | FR-18 | `GET /api/admin/orders` | `Authorization` | Bearer-form token associated with an Admin account | VALID | SPEC-EXPLICIT | TB-FR18-003, TB-FR18-004 | Both explicit requirements satisfied | PARTIAL |
| EP-FR18-002 | P-FR18-001 | FR-18 | `GET /api/admin/orders` | `Authorization` | Bearer-form token associated with a non-Admin account | INVALID | DEPENDENCY-DERIVED | TB-FR18-004 | Violates Admin permission requirement | PARTIAL |
| EP-FR18-003 | P-FR18-001 | FR-18 | `GET /api/admin/orders` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR18-003 | Violates Bearer requirement | PARTIAL |
| EP-FR18-004 | P-FR18-001 | FR-18 | `GET /api/admin/orders` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR18-003 | Violates explicit header syntax | PARTIAL |
| EP-FR18-005 | P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | `Authorization` | Bearer-form token associated with an Admin account | VALID | SPEC-EXPLICIT | TB-FR18-009, TB-FR18-010 | Both explicit requirements satisfied | PARTIAL |
| EP-FR18-006 | P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | `Authorization` | Bearer-form token associated with a non-Admin account | INVALID | DEPENDENCY-DERIVED | TB-FR18-010 | Violates Admin permission requirement | PARTIAL |
| EP-FR18-007 | P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR18-009 | Violates Bearer requirement | PARTIAL |
| EP-FR18-008 | P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR18-009 | Violates explicit header syntax | PARTIAL |
| EP-FR18-009 | P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | `id` | Path identifier associated with an existing order | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-005, TB-FR18-014 | Existing resource implied; status behavior also dependent | PARTIAL |
| EP-FR18-010 | P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | `id` | Path identifier not associated with an order | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Missing-resource behavior unspecified | NO |
| EP-FR18-011 | P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | `id` | Identifier segment omitted | INVALID | SPEC-DERIVED | TB-FR18-005 | Does not satisfy documented path shape | PARTIAL |
| EP-FR18-012 | P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | `id` | Identifier represented in an undocumented format/type region | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | ID type/range unspecified | NO |
| EP-FR18-013 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Requested target is `pending` | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-007, TB-FR18-008 | Depends on current order state; transition rule absent | PARTIAL |
| EP-FR18-014 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Requested target is `confirmed` | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-006, TB-FR18-007, TB-FR18-008 | Example target; source-state rule absent | PARTIAL |
| EP-FR18-015 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Requested target is `shipping` | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-007, TB-FR18-008 | Depends on current state; transition rule absent | PARTIAL |
| EP-FR18-016 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Requested target is `delivered` | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-007, TB-FR18-008 | Depends on current state; transition rule absent | PARTIAL |
| EP-FR18-017 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Requested target is `canceled` | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-007, TB-FR18-008 | Admin transition rule absent | PARTIAL |
| EP-FR18-018 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Value outside the documented status vocabulary | INVALID | SPEC-DERIVED | TB-FR18-007 | Outside the explicit set of order statuses | PARTIAL |
| EP-FR18-019 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Field omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Requiredness unspecified | NO |
| EP-FR18-020 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Field present with null-like JSON value | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Null handling and type rule unspecified | NO |
| EP-FR18-021 | P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | Field represented by a non-string JSON type | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Normative type not specified | NO |
| EP-FR18-022 | P-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | `Content-Type` | Header indicates a JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Header requirement absent | NO |
| EP-FR18-023 | P-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | `Content-Type` | Header omitted | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Header requirement absent | NO |
| EP-FR18-024 | P-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | `Content-Type` | Header indicates a non-JSON representation | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Media-type behavior absent | NO |
| EP-FR18-025 | P-FR18-006 | FR-18 support | `PUT /api/orders/:id/cancel` | `Authorization` | Header follows documented Bearer form | VALID | SPEC-EXPLICIT | TB-FR18-013 | Token validity/role behavior otherwise unspecified | PARTIAL |
| EP-FR18-026 | P-FR18-006 | FR-18 support | `PUT /api/orders/:id/cancel` | `Authorization` | Header omitted | INVALID | SPEC-DERIVED | TB-FR18-013 | Violates Section 4 Bearer requirement | PARTIAL |
| EP-FR18-027 | P-FR18-006 | FR-18 support | `PUT /api/orders/:id/cancel` | `Authorization` | Header present without documented Bearer form | INVALID | SPEC-DERIVED | TB-FR18-013 | Violates explicit header syntax | PARTIAL |
| EP-FR18-028 | P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` / referenced order | Existing order satisfying textual condition “chưa giao” | CONDITIONAL | DEPENDENCY-DERIVED | TB-FR18-011, TB-FR18-012 | Transition target is `canceled`; status mapping ambiguous | YES |
| EP-FR18-029 | P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` / referenced order | Existing order not satisfying textual condition “chưa giao” | INVALID | DEPENDENCY-DERIVED | TB-FR18-012 | Cancellation explicitly restricted | YES |
| EP-FR18-030 | P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` | Path identifier not associated with an order | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | Missing-resource behavior unspecified | NO |
| EP-FR18-031 | P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` | Identifier segment omitted | INVALID | SPEC-DERIVED | TB-FR18-011 | Does not satisfy documented path shape | PARTIAL |
| EP-FR18-032 | P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` | Identifier represented in an undocumented format/type region | EXPLORATORY | BLOCKER-DRIVEN | BLK-FR18-003 | ID type/range unspecified | NO |

## 5. Compound and Dependent Domains

| DEP-ID | Feature | Factor A | Factor B | Relationship | Source / TB Reference | Testing Significance |
| ------ | ------- | -------- | -------- | ------------ | --------------------- | -------------------- |
| DEP-FR02-001 | FR-02 | `email` | `password` | Authentication depends on the credential pair, not either field independently. | TB-FR02-002, TB-FR02-003, TB-FR02-007 | Prevents treating isolated example-shaped strings as globally valid credentials. |
| DEP-FR02-002 | FR-02 | Credential pair | Account existence | Success logically depends on a corresponding account, but the precondition is implied. | TB-FR02-007 | Requires fixture/precondition control later. |
| DEP-FR02-003 | FR-02 | Credential correctness | Account lock state | Relationship is relevant to the feature name but entirely unspecified. | BLK-FR02-002, BLK-FR02-003 | Must not be converted into a deterministic partition or lockout sequence. |
| DEP-FR09-001 | FR-09 | `code` | Coupon existence | A code appears to reference a coupon; missing-resource behavior is unspecified. | TB-FR09-002, BLK-FR09-002 | Separates resource condition from string representation. |
| DEP-FR09-002 | FR-09 | `code` / coupon | `total_amount` | Calculation involves both, but eligibility and formula are unspecified. | TB-FR09-003, TB-FR09-005, BLK-FR09-002, BLK-FR09-003 | Prevents invented threshold or formula partitions. |
| DEP-FR09-003 | FR-09 | `user_id` | Coupon usage state | Per-user field exists in creation example, but enforcement/persistence is unspecified. | TB-FR09-004, BLK-FR09-005 | Retained only as blocker-driven relationship. |
| DEP-FR09-004 | FR-09 | Coupon | Active/expiration state | No active rule is documented; expiration field exists only in creation example. | BLK-FR09-002 | Candidate for exploratory analysis, not valid/invalid classes. |
| DEP-FR09-005 | FR-09 | Apply authentication state | `user_id` identity | Neither application authentication nor identity matching is specified. | BLK-FR09-004 | Must be resolved during later security analysis. |
| DEP-FR09-006 | FR-09 | Bearer authentication | Admin role | Both are explicit for Section 6 endpoints. | TB-FR09-011, TB-FR09-012, TB-FR09-014, TB-FR09-015 | Defines valid/invalid authorization partitions for setup endpoints. |
| DEP-FR09-007 | FR-09 | Delete `id` | Coupon existence | Identifier/resource relationship is implied; missing behavior absent. | P-FR09-016, BLK-FR09-002 | Requires resource-state setup later. |
| DEP-FR18-001 | FR-18 | Bearer authentication | Admin role | Both are explicit for Admin endpoints. | TB-FR18-003, TB-FR18-004, TB-FR18-009, TB-FR18-010 | Supports authorization partitions without assuming status codes. |
| DEP-FR18-002 | FR-18 | Order `id` | Order existence | Target resource is implied by path; missing behavior unspecified. | TB-FR18-005, TB-FR18-014 | Separates identifier representation from resource state. |
| DEP-FR18-003 | FR-18 | Requested `status` | Current order status | Concrete validity depends on an unspecified transition model. | TB-FR18-007, TB-FR18-008, BLK-FR18-001 | All documented target states remain conditional. |
| DEP-FR18-004 | FR-18 support | Cancel order `id` | Order satisfies “chưa giao” | Textual predicate controls whether cancellation is permitted. | TB-FR18-011, TB-FR18-012, BLK-FR18-002 | Deterministic at abstract predicate level; status mapping deferred. |

## 6. Test-Basis Traceability

| TB-ID | Feature | Requirement | Covered By PARAM-ID | Covered By EP-ID(s) | Coverage Status | Notes |
| ----- | ------- | ----------- | ------------------- | ------------------- | --------------- | ----- |
| TB-FR02-001 | FR-02 | `POST /api/login` method/path | P-FR02-001, P-FR02-002 | EP-FR02-001–EP-FR02-010 | COVERED | Endpoint itself is not a variable parameter; body inputs cover its input surface. |
| TB-FR02-002 | FR-02 | Example contains `email` | P-FR02-001 | EP-FR02-001–EP-FR02-005 | COVERED | Unspecified regions remain exploratory. |
| TB-FR02-003 | FR-02 | Example contains `password` | P-FR02-002 | EP-FR02-006–EP-FR02-010 | COVERED | Unspecified regions remain exploratory. |
| TB-FR09-001 | FR-09 | `POST /api/apply-coupon` method/path | P-FR09-001–P-FR09-005 | EP-FR09-001–EP-FR09-019 | COVERED | Method/path are fixed, not partitioned. |
| TB-FR09-002 | FR-09 | Example contains `code` | P-FR09-001 | EP-FR09-001–EP-FR09-005 | COVERED | — |
| TB-FR09-003 | FR-09 | Example contains `total_amount` | P-FR09-002 | EP-FR09-006–EP-FR09-009 | COVERED | Formula/range blocked. |
| TB-FR09-004 | FR-09 | Example contains `user_id` | P-FR09-003 | EP-FR09-010–EP-FR09-014 | COVERED | Identity semantics blocked. |
| TB-FR09-008 | FR-09 | `GET /api/coupons` method/path | P-FR09-006 | EP-FR09-020–EP-FR09-023 | COVERED | Header is its only documented input. |
| TB-FR09-013 | FR-09 | Admin-create example has six fields | P-FR09-008–P-FR09-013 | EP-FR09-028–EP-FR09-033 | PARTIALLY COVERED | Only example-shaped regions can be modeled; constraints blocked. |
| TB-FR18-001 | FR-18 | `GET /api/admin/orders` method/path | P-FR18-001 | EP-FR18-001–EP-FR18-004 | COVERED | Authorization is its documented input surface. |
| TB-FR18-005 | FR-18 | Status-update path identifies order by `id` | P-FR18-003 | EP-FR18-009–EP-FR18-012 | COVERED | ID domain is mostly exploratory. |
| TB-FR18-006 | FR-18 | Example contains target `status` | P-FR18-004 | EP-FR18-013–EP-FR18-021 | COVERED | Example target is retained without a source state. |
| TB-FR18-007 | FR-18 | Five documented statuses | P-FR18-004 | EP-FR18-013–EP-FR18-018 | COVERED | Each target separated due unknown state dependence. |

No relevant INPUT or DOMAIN TB item is left unexplained. `TB-FR18-008` is a BUSINESS_RULE item and is represented through DEP-FR18-003 and the conditional status partitions.

## 7. Specification Blockers Affecting Domain Testing

| Blocker ID | Feature | Affected Parameter / Domain | Partitioning Impact | Current Handling | Later Testing Strategy |
| ---------- | ------- | --------------------------- | ------------------- | ---------------- | ---------------------- |
| BLK-FR02-001 | FR-02 | `email`, `password`, body/media type | Cannot mark presence, format, type, or malformed regions invalid. | EXPLORATORY PARTITION | Cover through exploratory testing |
| BLK-FR02-002 | FR-02 | Failed-attempt counter/threshold | No deterministic lock-counter domain exists. | NO DETERMINISTIC PARTITION | Resolve during state-transition analysis |
| BLK-FR02-003 | FR-02 | Lock state/duration/unlock | Locked/unlocked classes cannot receive spec outcomes. | NO DETERMINISTIC PARTITION | Resolve during state-transition analysis |
| BLK-FR02-004 | FR-02 | Incorrect credentials and response behavior | Negative credential classes lack deterministic outcomes. | EXPLORATORY PARTITION | Verify implementation behavior |
| BLK-FR02-005 | FR-02 | Response `user` structure | Not an input-domain issue. | NOT DOMAIN-RELATED | Exclude from deterministic spec-based tests |
| BLK-FR02-006 | FR-02 | JWT claims/lifecycle | Token internals are outside current parameter model. | NOT DOMAIN-RELATED | Resolve during security analysis |
| BLK-FR09-001 | FR-09 | Apply/create body fields and media type | Requiredness/types/ranges cannot define invalid partitions. | EXPLORATORY PARTITION | Cover through exploratory testing |
| BLK-FR09-002 | FR-09 | Coupon existence/state/eligibility | Resource conditions remain conditional or exploratory. | PARTIAL PARTITION | Verify implementation behavior |
| BLK-FR09-003 | FR-09 | `total_amount`, `type`, `discount_value` | No deterministic numeric/formula subdomains. | NO DETERMINISTIC PARTITION | Verify implementation behavior |
| BLK-FR09-004 | FR-09 | Apply `Authorization` × `user_id` | Identity/ownership partitions cannot be classified valid/invalid. | EXPLORATORY PARTITION | Resolve during security analysis |
| BLK-FR09-005 | FR-09 | `max_uses_per_user` and usage state | No deterministic usage-state domain. | NO DETERMINISTIC PARTITION | Resolve during state-transition analysis |
| BLK-FR09-006 | FR-09 | Response codes/schema types | Not an input-domain issue. | NOT DOMAIN-RELATED | Exclude from deterministic spec-based tests |
| BLK-FR09-007 | FR-09 | List-coupon auth role | Admin label does not define exact enforcement. | PARTIAL PARTITION | Resolve during security analysis |
| BLK-FR18-001 | FR-18 | Requested `status` × current state | Target states are conditional; no concrete transition validity. | PARTIAL PARTITION | Resolve during state-transition analysis |
| BLK-FR18-002 | FR-18 | Cancel order condition | “Chưa giao” cannot be mapped to status members. | PARTIAL PARTITION | Resolve during state-transition analysis |
| BLK-FR18-003 | FR-18 | `id`, `status`, media type | Requiredness/types and missing-resource behavior absent. | EXPLORATORY PARTITION | Cover through exploratory testing |
| BLK-FR18-004 | FR-18 | Initial/final/current states | No deterministic state-domain sequences. | NO DETERMINISTIC PARTITION | Resolve during state-transition analysis |
| BLK-FR18-005 | FR-18 | Response codes/schemas | Not an input-domain issue. | NOT DOMAIN-RELATED | Exclude from deterministic spec-based tests |
| BLK-FR18-006 | FR-18 | Token validity/non-admin failure outcome | Classes known, exact outcomes absent. | PARTIAL PARTITION | Resolve during security analysis |
| BLK-ALL-001 | All | SEC-01–SEC-07 traceability | Cannot create SEC-ID-derived partitions. | NO DETERMINISTIC PARTITION | Resolve during security analysis |

## 8. Unsupported-Assumption / Over-Partitioning Review

| Review ID | EP-ID | Potential Problem | Decision | Reason |
| --------- | ----- | ----------------- | -------- | ------ |
| REV-001 | EP-FR02-003–EP-FR02-005 | Missing/null/non-string email might be mislabeled invalid. | KEEP | They are explicitly EXPLORATORY because no requiredness/type rule exists. |
| REV-002 | EP-FR02-008–EP-FR02-010 | Missing/null/non-string password might be mislabeled invalid. | KEEP | They remain blocker-driven exploratory partitions. |
| REV-003 | EP-FR02-001, EP-FR02-006 | “Matching credentials” is only implied, not a documented algorithm. | NEEDS HUMAN REVIEW | Kept conditional; success `200` is explicit but credential validity rules are not. |
| REV-004 | EP-FR09-001 | Existing coupon might be treated as sufficient for validity. | KEEP | Classified CONDITIONAL, with all eligibility rules explicitly unresolved. |
| REV-005 | EP-FR09-006 | Numeric `total_amount` might be treated as globally valid. | KEEP | Classified CONDITIONAL; no sign/range partition is invented. |
| REV-006 | EP-FR09-020 | Admin label for coupon list might be treated as enforced authorization. | KEEP | Conditional and linked to BLK-FR09-007. |
| REV-007 | EP-FR09-028–EP-FR09-033 | Example-shaped Admin body fields might be promoted to fully valid domains. | KEEP | Marked CONDITIONAL/PARTIAL, not globally valid. |
| REV-008 | EP-FR09-043 | Omitted path segment is classified invalid. | KEEP | Derived only from the explicitly documented path shape, not from a value constraint. |
| REV-009 | EP-FR18-013–EP-FR18-017 | Listed statuses might be treated as globally valid transitions. | KEEP | Each is CONDITIONAL on current state; no transition matrix is asserted. |
| REV-010 | EP-FR18-018 | Outside-set status is treated invalid although wording is concise. | NEEDS HUMAN REVIEW | “Các trạng thái” supports an exhaustive vocabulary, but failure behavior remains only partial. |
| REV-011 | EP-FR18-028–EP-FR18-029 | “Chưa giao” might be silently equated to a concrete status subset. | KEEP | Partitions preserve the textual predicate and avoid mapping it to statuses. |
| REV-012 | All `Content-Type` partitions | JSON examples might be used to infer a media-type requirement. | KEEP | Every media-type partition is EXPLORATORY/BLOCKER-DRIVEN. |
| REV-013 | Authorization invalid partitions | Invalid class might imply a specific status code. | KEEP | Only requirement violation is deterministic; endpoint outcome remains PARTIAL. |
| REV-014 | No length/numeric boundary EPs | Model could appear incomplete without common robustness ranges. | KEEP | Omitting invented ranges is required; BVA is deferred. |

## 9. Human Review Checklist

- [ ] Every endpoint input is represented.
- [ ] Every parameter has at least one domain model entry.
- [ ] Every explicit valid class is represented.
- [ ] Every explicit invalid class is represented.
- [ ] Conditional behavior is not incorrectly classified as globally valid/invalid.
- [ ] Unspecified constraints are not invented.
- [ ] Exploratory partitions are clearly separated from spec-derived partitions.
- [ ] All partitions trace back to verified test-basis items or blockers.
- [ ] FR-02 lockout rules were not invented.
- [ ] FR-09 coupon business rules were not invented.
- [ ] FR-18 transition rules were not invented.
- [ ] JSON example representations were not mistaken for normative type declarations.
- [ ] Login credential correctness remains a compound condition.
- [ ] Coupon existence is not treated as sufficient eligibility.
- [ ] No coupon threshold, formula, expiry, active-state, or usage boundary was introduced.
- [ ] `GET /api/coupons` Admin intent remains separated from explicit Section 6 role enforcement.
- [ ] Each FR-18 target status remains conditional on an unspecified current state.
- [ ] “Chưa giao” remains textual and is not silently mapped to named statuses.
- [ ] No exact HTTP error status or message was inferred.
- [ ] All 20 Prompt 002 blockers remain visible.
- [ ] No concrete values, attack payloads, test-case IDs, or boundary values appear.

## 10. Domain-Test Readiness Summary

| Feature | Status | Deterministic Domain Coverage | Main Gaps | Recommended Next Step |
| ------- | ------ | ----------------------------- | --------- | --------------------- |
| FR-02 | PARTIALLY READY | Successful credential pair is modelable only conditionally; no explicit invalid input domain | Requiredness, validation, credential-failure behavior, all lockout rules | Obtain authoritative FR/SEC requirements before BVA; otherwise retain exploratory partitions |
| FR-09 | PARTIALLY READY | Admin authentication/role domains are explicit; application inputs are only example-shaped | Eligibility, formulas, ranges, usage, application authentication, responses | Clarify coupon business rules before deterministic BVA and stateful usage design |
| FR-18 | PARTIALLY READY | Admin auth and status vocabulary are explicit; abstract cancel predicate is testable | Admin transition matrix, “chưa giao” mapping, ID/status constraints, responses | Resolve state rules in later state-transition analysis without inventing transitions |

## 11. Machine-Usable Summary for Next Prompt

```text
DOMAIN_MODEL_SUMMARY

FR-02:
Parameters: P-FR02-001 email; P-FR02-002 password; P-FR02-003 Content-Type; P-FR02-004 Authorization
Partition IDs: EP-FR02-001..EP-FR02-015
Dependencies: DEP-FR02-001 credential pair; DEP-FR02-002 account existence; DEP-FR02-003 account lock state
Relevant Blockers: BLK-FR02-001..BLK-FR02-006; BLK-ALL-001

FR-09:
Parameters: P-FR09-001 code; P-FR09-002 total_amount; P-FR09-003 user_id; P-FR09-004 apply auth; P-FR09-005 apply content type; P-FR09-006 list auth; P-FR09-007 create auth; P-FR09-008 create code; P-FR09-009 type; P-FR09-010 discount_value; P-FR09-011 min_order_amount; P-FR09-012 expired_at; P-FR09-013 max_uses_per_user; P-FR09-014 create content type; P-FR09-015 delete auth; P-FR09-016 delete id
Partition IDs: EP-FR09-001..EP-FR09-044
Dependencies: DEP-FR09-001 coupon existence; DEP-FR09-002 coupon-total; DEP-FR09-003 user-usage; DEP-FR09-004 coupon-state; DEP-FR09-005 auth-identity; DEP-FR09-006 auth-role; DEP-FR09-007 delete-resource
Relevant Blockers: BLK-FR09-001..BLK-FR09-007; BLK-ALL-001

FR-18:
Parameters: P-FR18-001 list auth; P-FR18-002 update auth; P-FR18-003 update id; P-FR18-004 status; P-FR18-005 update content type; P-FR18-006 cancel auth; P-FR18-007 cancel id/order state
Partition IDs: EP-FR18-001..EP-FR18-032
Dependencies: DEP-FR18-001 auth-role; DEP-FR18-002 order existence; DEP-FR18-003 requested-current status; DEP-FR18-004 cancel predicate
Relevant Blockers: BLK-FR18-001..BLK-FR18-006; BLK-ALL-001
```
