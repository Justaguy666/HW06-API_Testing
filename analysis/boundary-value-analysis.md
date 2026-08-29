# Prompt 004 — Boundary Value Analysis

## 1. Executive Summary

| Metric                        | FR-02 | FR-09 | FR-18 | Total |
| ----------------------------- | ----: | ----: | ----: | ----: |
| Parameters reviewed           | 4 | 16 | 7 | 27 |
| BVA eligible                  | 0 | 0 | 0 | 0 |
| Not BVA applicable            | 2 | 9 | 7 | 18 |
| Blocked by specification      | 2 | 7 | 0 | 9 |
| Explicit boundary constraints | 0 | 0 | 0 | 0 |
| Boundary positions            | 0 | 0 | 0 | 0 |
| Boundary requirements         | 0 | 0 | 0 | 0 |

- The authoritative specification provides no explicit numeric, length, count, temporal, or ordered-discrete boundary for the 27 parameters.
- FR-02 credential lengths and all lockout quantities are unspecified; no symbolic lock threshold is introduced because the API specification does not establish that quantitative boundary.
- FR-09 contains number/date-shaped examples, but examples do not establish bounds or eligibility boundaries.
- FR-18 identifiers are equivalence-partition concerns, and order statuses are categorical/state concerns rather than BVA domains.
- Producing zero concrete boundary positions is the correct outcome under the stated source constraints.

## 2. BVA Eligibility Matrix

### 2.1 FR-02

| PARAM-ID | Feature | Endpoint | Parameter | Relevant EP-IDs | Domain Type | BVA Classification | Explicit Boundary Present? | Reason | Relevant Blocker |
| -------- | ------- | -------- | --------- | --------------- | ----------- | ------------------ | -------------------------- | ------ | ---------------- |
| P-FR02-001 | FR-02 | `POST /api/login` | `email` | EP-FR02-001–EP-FR02-005 | Credential string representation; normative domain unspecified | BLOCKED-BY-SPEC | NO | No minimum, maximum, or fixed length is specified. Format itself would not be BVA, and even its syntax is unspecified here. | BLK-FR02-001 |
| P-FR02-002 | FR-02 | `POST /api/login` | `password` | EP-FR02-006–EP-FR02-010 | Credential string representation; normative domain unspecified | BLOCKED-BY-SPEC | NO | No minimum/maximum length or character-count rule is specified. | BLK-FR02-001 |
| P-FR02-003 | FR-02 | `POST /api/login` | `Content-Type` | EP-FR02-011–EP-FR02-013 | Header syntax/media category | NOT-ELIGIBLE-FORMAT | NO | Media-type syntax and presence are equivalence-partition concerns, not ordered quantitative boundaries. | BLK-FR02-001 |
| P-FR02-004 | FR-02 | `POST /api/login` | `Authorization` | EP-FR02-014–EP-FR02-015 | Header/authentication category | NOT-ELIGIBLE-FORMAT | NO | Header presence/form is not an ordered numeric, length, count, or temporal domain. | BLK-FR02-004 |

### 2.2 FR-09

| PARAM-ID | Feature | Endpoint | Parameter | Relevant EP-IDs | Domain Type | BVA Classification | Explicit Boundary Present? | Reason | Relevant Blocker |
| -------- | ------- | -------- | --------- | --------------- | ----------- | ------------------ | -------------------------- | ------ | ---------------- |
| P-FR09-001 | FR-09 | `POST /api/apply-coupon` | `code` | EP-FR09-001–EP-FR09-005 | Coupon-code string representation | BLOCKED-BY-SPEC | NO | No code-length boundary is specified. Matching/existence is an equivalence partition, not BVA. | BLK-FR09-001, BLK-FR09-002 |
| P-FR09-002 | FR-09 | `POST /api/apply-coupon` | `total_amount` | EP-FR09-006–EP-FR09-009 | Monetary number representation | BLOCKED-BY-SPEC | NO | No lower/upper amount or eligibility threshold is specified. | BLK-FR09-001, BLK-FR09-002, BLK-FR09-003 |
| P-FR09-003 | FR-09 | `POST /api/apply-coupon` | `user_id` | EP-FR09-010–EP-FR09-014 | Resource identifier | NOT-ELIGIBLE-IDENTIFIER | NO | No numeric range is specified; existence and identity matching are equivalence/security concerns. | BLK-FR09-004 |
| P-FR09-004 | FR-09 | `POST /api/apply-coupon` | `Authorization` | EP-FR09-015–EP-FR09-016 | Header/authentication category | NOT-ELIGIBLE-FORMAT | NO | Header presence/form is not an ordered boundary domain. | BLK-FR09-004 |
| P-FR09-005 | FR-09 | `POST /api/apply-coupon` | `Content-Type` | EP-FR09-017–EP-FR09-019 | Header syntax/media category | NOT-ELIGIBLE-FORMAT | NO | Media-type classes belong to equivalence partitioning. | BLK-FR09-001 |
| P-FR09-006 | FR-09 | `GET /api/coupons` | `Authorization` | EP-FR09-020–EP-FR09-023 | Bearer-header format and role category | NOT-ELIGIBLE-FORMAT | NO | Token syntax and role are format/categorical dimensions, not BVA. | BLK-FR09-007 |
| P-FR09-007 | FR-09 | `POST /api/admin/coupons` | `Authorization` | EP-FR09-024–EP-FR09-027 | Bearer-header format and role category | NOT-ELIGIBLE-FORMAT | NO | Token syntax and role are handled by equivalence/security analysis. | BLK-ALL-001 |
| P-FR09-008 | FR-09 | `POST /api/admin/coupons` | `code` | EP-FR09-028 | Coupon-code string representation | BLOCKED-BY-SPEC | NO | No minimum, maximum, or fixed code length is specified. | BLK-FR09-001 |
| P-FR09-009 | FR-09 | `POST /api/admin/coupons` | `type` | EP-FR09-029 | Categorical value | NOT-ELIGIBLE-CATEGORICAL | NO | The example value does not define an ordered domain or boundary. | BLK-FR09-001, BLK-FR09-003 |
| P-FR09-010 | FR-09 | `POST /api/admin/coupons` | `discount_value` | EP-FR09-030 | Numeric representation | BLOCKED-BY-SPEC | NO | No lower/upper bound, percentage interval, precision, or unit is specified. | BLK-FR09-003 |
| P-FR09-011 | FR-09 | `POST /api/admin/coupons` | `min_order_amount` | EP-FR09-031 | Monetary number representation | BLOCKED-BY-SPEC | NO | The field name suggests a threshold concept, but no constraint or application semantics are specified. | BLK-FR09-002, BLK-FR09-003 |
| P-FR09-012 | FR-09 | `POST /api/admin/coupons` | `expired_at` | EP-FR09-032 | Date/time-shaped string representation | BLOCKED-BY-SPEC | NO | No accepted format, comparison instant, inclusiveness, timezone, or expiry behavior is specified. | BLK-FR09-002 |
| P-FR09-013 | FR-09 | `POST /api/admin/coupons` | `max_uses_per_user` | EP-FR09-033 | Count-shaped number representation | BLOCKED-BY-SPEC | NO | No count range, minimum, maximum, or enforcement semantics are specified. | BLK-FR09-005 |
| P-FR09-014 | FR-09 | `POST /api/admin/coupons` | `Content-Type` | EP-FR09-034–EP-FR09-036 | Header syntax/media category | NOT-ELIGIBLE-FORMAT | NO | Media-type handling is not an ordered boundary domain. | BLK-FR09-001 |
| P-FR09-015 | FR-09 | `DELETE /api/admin/coupons/:id` | `Authorization` | EP-FR09-037–EP-FR09-040 | Bearer-header format and role category | NOT-ELIGIBLE-FORMAT | NO | Token syntax and role are format/categorical domains. | BLK-ALL-001 |
| P-FR09-016 | FR-09 | `DELETE /api/admin/coupons/:id` | `id` | EP-FR09-041–EP-FR09-044 | Resource identifier | NOT-ELIGIBLE-IDENTIFIER | NO | No numeric range exists; existing/non-existing resource classes are not boundaries. | BLK-FR09-002 |

### 2.3 FR-18

| PARAM-ID | Feature | Endpoint | Parameter | Relevant EP-IDs | Domain Type | BVA Classification | Explicit Boundary Present? | Reason | Relevant Blocker |
| -------- | ------- | -------- | --------- | --------------- | ----------- | ------------------ | -------------------------- | ------ | ---------------- |
| P-FR18-001 | FR-18 | `GET /api/admin/orders` | `Authorization` | EP-FR18-001–EP-FR18-004 | Bearer-header format and role category | NOT-ELIGIBLE-FORMAT | NO | Authentication and role classes are not ordered boundary domains. | BLK-FR18-006, BLK-ALL-001 |
| P-FR18-002 | FR-18 | `PUT /api/admin/orders/:id/status` | `Authorization` | EP-FR18-005–EP-FR18-008 | Bearer-header format and role category | NOT-ELIGIBLE-FORMAT | NO | Authentication and role classes are handled by equivalence/security analysis. | BLK-FR18-006, BLK-ALL-001 |
| P-FR18-003 | FR-18 | `PUT /api/admin/orders/:id/status` | `id` | EP-FR18-009–EP-FR18-012 | Resource identifier | NOT-ELIGIBLE-IDENTIFIER | NO | No ID range is specified; existence/non-existence is not BVA. | BLK-FR18-003 |
| P-FR18-004 | FR-18 | `PUT /api/admin/orders/:id/status` | `status` | EP-FR18-013–EP-FR18-021 | Categorical state value | NOT-ELIGIBLE-CATEGORICAL | NO | Listed statuses are not defined as an ordered discrete numeric domain. | BLK-FR18-001, BLK-FR18-004 |
| P-FR18-005 | FR-18 | `PUT /api/admin/orders/:id/status` | `Content-Type` | EP-FR18-022–EP-FR18-024 | Header syntax/media category | NOT-ELIGIBLE-FORMAT | NO | Media-type handling is not BVA. | BLK-FR18-003 |
| P-FR18-006 | FR-18 support | `PUT /api/orders/:id/cancel` | `Authorization` | EP-FR18-025–EP-FR18-027 | Bearer-header format | NOT-ELIGIBLE-FORMAT | NO | Header syntax is a format/equivalence dimension. | BLK-FR18-006 |
| P-FR18-007 | FR-18 support | `PUT /api/orders/:id/cancel` | `id` / referenced order | EP-FR18-028–EP-FR18-032 | Resource identifier plus categorical state predicate | NOT-ELIGIBLE-IDENTIFIER | NO | ID existence is EP; “chưa giao” is a state predicate, not a quantitative boundary. | BLK-FR18-002, BLK-FR18-003 |

## 3. Explicit Boundary Constraints

### 3.1 FR-02

No deterministic specification-based boundary constraints identified.

### 3.2 FR-09

No deterministic specification-based boundary constraints identified.

### 3.3 FR-18

No deterministic specification-based boundary constraints identified.

Consequently, no `BC-*` identifiers are created. Example-shaped numeric/date fields are not promoted to constraints.

## 4. Boundary Value Model

### 4.1 FR-02

No verified boundary constraint exists; therefore no `BV-FR02-*` positions are generated.

### 4.2 FR-09

No verified boundary constraint exists; therefore no `BV-FR09-*` positions are generated.

### 4.3 FR-18

No verified boundary constraint exists; therefore no `BV-FR18-*` positions are generated.

No symbolic boundary is introduced for lockout, coupon thresholds, or status order because the specification does not establish sufficient quantitative boundary concepts.

## 5. Boundary-to-Equivalence-Partition Consistency

No `BV-*` entry exists, so there is no boundary-to-EP row to evaluate. Consistency is instead enforced by retaining all Prompt 003 partitions unchanged and by classifying every candidate as either not BVA-applicable or blocked.

| Check ID | BV-ID | EP-ID | BVA Classification | EP Classification | Consistent? | Explanation |
| -------- | ----- | ----- | ------------------ | ----------------- | ----------- | ----------- |

## 6. Feature-Specific Analysis

### 6.1 FR-02 — Login and Account Lockout

- Eligible BVA dimensions: none.
- Non-BVA dimensions: `Content-Type` and request `Authorization` are format/category domains.
- Blocked dimensions: possible `email` and `password` lengths have no specified lower, upper, or fixed length.
- Lockout-specific gap: the API specification gives no count threshold, counter rule, duration, or unlock timing. `BLK-FR02-002` and `BLK-FR02-003` therefore prevent BVA. A symbolic `LOCK_THRESHOLD` is not created because this specification does not establish a quantitative threshold at all.

### 6.2 FR-09 — Discount Coupons

- Eligible quantitative domains: none.
- Numeric/date-shaped examples (`total_amount`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`) contain no normative bounds or boundary semantics.
- Coupon-code lengths, percentage/fixed limits, minimum-order eligibility, expiration comparison, usage limits, and maximum discounts are not specified.
- Resource existence, authentication, role, and coupon state remain equivalence/security/state concerns rather than BVA.
- Relevant blockers: BLK-FR09-001 through BLK-FR09-005 and BLK-ALL-001.

### 6.3 FR-18 — Order Management (Admin)

- Eligible quantitative domains: none.
- Order/coupon identifiers are excluded because no numeric ranges are specified; existence is an equivalence partition.
- `status` is categorical. The listed values are not treated as first/last or adjacent boundary positions.
- The “chưa giao” cancellation predicate belongs to state-transition analysis and is not translated into a temporal or numeric boundary.
- Authentication headers and roles remain format/categorical security dimensions.

## 7. Blocked Boundary Analysis

| BB-ID | Feature | PARAM-ID | Potential Boundary Concept | Missing Information | Related Blocker | Impact | Handling |
| ----- | ------- | -------- | -------------------------- | ------------------- | --------------- | ------ | -------- |
| BB-FR02-001 | FR-02 | P-FR02-001 | Email length | Minimum, maximum, or fixed length | BLK-FR02-001 | No length BVA positions can be derived. | NO SPEC-BASED BVA |
| BB-FR02-002 | FR-02 | P-FR02-002 | Password length/character counts | Minimum, maximum, fixed length, or count rules | BLK-FR02-001 | No length/count BVA positions can be derived. | NO SPEC-BASED BVA |
| BB-FR02-003 | FR-02 | Not assigned; lockout state variable absent from Prompt 003 inventory | Failed-login lock threshold and lock duration | Existence/value/inclusiveness of threshold; temporal duration | BLK-FR02-002, BLK-FR02-003 | Lockout BVA cannot be modeled from this specification. | VERIFY IMPLEMENTATION LATER |
| BB-FR09-001 | FR-09 | P-FR09-001 | Coupon-code length | Minimum, maximum, or fixed length | BLK-FR09-001 | No string-length BVA. | NO SPEC-BASED BVA |
| BB-FR09-002 | FR-09 | P-FR09-002 | Order-total lower/upper/eligibility boundary | Numeric interval, unit, precision, and threshold semantics | BLK-FR09-002, BLK-FR09-003 | No monetary BVA or threshold-neighbor positions. | NO SPEC-BASED BVA |
| BB-FR09-003 | FR-09 | P-FR09-008 | Created coupon-code length | Minimum, maximum, or fixed length | BLK-FR09-001 | No creation-code length BVA. | NO SPEC-BASED BVA |
| BB-FR09-004 | FR-09 | P-FR09-010 | Discount-value interval | Lower/upper bound, percentage/fixed semantics, unit, precision | BLK-FR09-003 | No numeric BVA. | VERIFY IMPLEMENTATION LATER |
| BB-FR09-005 | FR-09 | P-FR09-011 | Minimum-order threshold | Allowed numeric domain and application boundary semantics | BLK-FR09-002, BLK-FR09-003 | Cannot derive below/on/above eligibility positions. | NO SPEC-BASED BVA |
| BB-FR09-006 | FR-09 | P-FR09-012 | Expiration instant | Accepted format, time zone, comparison rule, inclusiveness | BLK-FR09-002 | Cannot derive before/on/after temporal positions. | VERIFY IMPLEMENTATION LATER |
| BB-FR09-007 | FR-09 | P-FR09-013 | Per-user usage count | Minimum/maximum count and enforcement boundary | BLK-FR09-005 | Cannot derive count-neighbor positions. | NO SPEC-BASED BVA |

These rows document gaps only and are not boundary requirements.

## 8. BVA Coverage Traceability

| PARAM-ID | EP-ID(s) | BVA Status | BC-ID(s) | BV-ID(s) | Blocker | Coverage Result | Notes |
| -------- | -------- | ---------- | -------- | -------- | ------- | --------------- | ----- |
| P-FR02-001 | EP-FR02-001–EP-FR02-005 | BLOCKED-BY-SPEC | None | None | BLK-FR02-001 | BLOCKED | No length constraint. |
| P-FR02-002 | EP-FR02-006–EP-FR02-010 | BLOCKED-BY-SPEC | None | None | BLK-FR02-001 | BLOCKED | No length/count constraint. |
| P-FR02-003 | EP-FR02-011–EP-FR02-013 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR02-001 | NOT BVA APPLICABLE | Media-type partitions retained. |
| P-FR02-004 | EP-FR02-014–EP-FR02-015 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR02-004 | NOT BVA APPLICABLE | Authentication handling deferred. |
| P-FR09-001 | EP-FR09-001–EP-FR09-005 | BLOCKED-BY-SPEC | None | None | BLK-FR09-001, BLK-FR09-002 | BLOCKED | No code-length boundary. |
| P-FR09-002 | EP-FR09-006–EP-FR09-009 | BLOCKED-BY-SPEC | None | None | BLK-FR09-002, BLK-FR09-003 | BLOCKED | No monetary interval/threshold. |
| P-FR09-003 | EP-FR09-010–EP-FR09-014 | NOT-ELIGIBLE-IDENTIFIER | None | None | BLK-FR09-004 | NOT BVA APPLICABLE | Existence/identity are EP/security dimensions. |
| P-FR09-004 | EP-FR09-015–EP-FR09-016 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR09-004 | NOT BVA APPLICABLE | — |
| P-FR09-005 | EP-FR09-017–EP-FR09-019 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR09-001 | NOT BVA APPLICABLE | — |
| P-FR09-006 | EP-FR09-020–EP-FR09-023 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR09-007 | NOT BVA APPLICABLE | Role intent is categorical. |
| P-FR09-007 | EP-FR09-024–EP-FR09-027 | NOT-ELIGIBLE-FORMAT | None | None | BLK-ALL-001 | NOT BVA APPLICABLE | Admin role is categorical. |
| P-FR09-008 | EP-FR09-028 | BLOCKED-BY-SPEC | None | None | BLK-FR09-001 | BLOCKED | No code-length boundary. |
| P-FR09-009 | EP-FR09-029 | NOT-ELIGIBLE-CATEGORICAL | None | None | BLK-FR09-001, BLK-FR09-003 | NOT BVA APPLICABLE | No ordered domain. |
| P-FR09-010 | EP-FR09-030 | BLOCKED-BY-SPEC | None | None | BLK-FR09-003 | BLOCKED | No numeric interval. |
| P-FR09-011 | EP-FR09-031 | BLOCKED-BY-SPEC | None | None | BLK-FR09-002, BLK-FR09-003 | BLOCKED | No threshold semantics. |
| P-FR09-012 | EP-FR09-032 | BLOCKED-BY-SPEC | None | None | BLK-FR09-002 | BLOCKED | No temporal boundary semantics. |
| P-FR09-013 | EP-FR09-033 | BLOCKED-BY-SPEC | None | None | BLK-FR09-005 | BLOCKED | No count interval/limit. |
| P-FR09-014 | EP-FR09-034–EP-FR09-036 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR09-001 | NOT BVA APPLICABLE | — |
| P-FR09-015 | EP-FR09-037–EP-FR09-040 | NOT-ELIGIBLE-FORMAT | None | None | BLK-ALL-001 | NOT BVA APPLICABLE | Role/auth are security dimensions. |
| P-FR09-016 | EP-FR09-041–EP-FR09-044 | NOT-ELIGIBLE-IDENTIFIER | None | None | BLK-FR09-002 | NOT BVA APPLICABLE | Existing/non-existing is EP. |
| P-FR18-001 | EP-FR18-001–EP-FR18-004 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR18-006, BLK-ALL-001 | NOT BVA APPLICABLE | — |
| P-FR18-002 | EP-FR18-005–EP-FR18-008 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR18-006, BLK-ALL-001 | NOT BVA APPLICABLE | — |
| P-FR18-003 | EP-FR18-009–EP-FR18-012 | NOT-ELIGIBLE-IDENTIFIER | None | None | BLK-FR18-003 | NOT BVA APPLICABLE | No ID range. |
| P-FR18-004 | EP-FR18-013–EP-FR18-021 | NOT-ELIGIBLE-CATEGORICAL | None | None | BLK-FR18-001, BLK-FR18-004 | NOT BVA APPLICABLE | State-transition analysis deferred. |
| P-FR18-005 | EP-FR18-022–EP-FR18-024 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR18-003 | NOT BVA APPLICABLE | — |
| P-FR18-006 | EP-FR18-025–EP-FR18-027 | NOT-ELIGIBLE-FORMAT | None | None | BLK-FR18-006 | NOT BVA APPLICABLE | — |
| P-FR18-007 | EP-FR18-028–EP-FR18-032 | NOT-ELIGIBLE-IDENTIFIER | None | None | BLK-FR18-002, BLK-FR18-003 | NOT BVA APPLICABLE | Identifier and state predicate are not BVA. |

## 9. BVA Self-Audit

| Review ID | Item | Potential Problem | Decision | Reason |
| --------- | ---- | ----------------- | -------- | ------ |
| BVR-001 | FR-02 email | Treating email syntax as an ordered boundary | BLOCK | No quantitative format/length constraint exists. |
| BVR-002 | FR-02 password | Importing a conventional password minimum | BLOCK | No length or character-count policy exists in the authoritative source. |
| BVR-003 | FR-02 lockout | Inventing a retry threshold or symbolic threshold | BLOCK | The API specification does not establish the quantitative rule. |
| BVR-004 | FR-09 numeric examples | Treating shown values as minimums, maxima, or representative boundary centers | BLOCK | Example values are not constraints. |
| BVR-005 | FR-09 `min_order_amount` | Treating the field name itself as a verified application boundary | BLOCK | Semantics and inclusiveness are unspecified. |
| BVR-006 | FR-09 `expired_at` | Deriving before/on/after positions | BLOCK | Temporal comparison behavior and instant are not normative. |
| BVR-007 | FR-09 usage | Inventing count neighbors | BLOCK | No count boundary is specified. |
| BVR-008 | Resource identifiers | Treating smallest/largest or existing/non-existing IDs as BVA | BLOCK | No numeric ID ranges exist; existence is EP. |
| BVR-009 | FR-18 statuses | Treating state names as ordered adjacent values | BLOCK | No ordered-discrete domain is specified. |
| BVR-010 | Missing/null EPs | Recasting presence partitions as numeric/length boundaries | BLOCK | Presence is equivalence partitioning, not BVA here. |
| BVR-011 | Concrete values | Emitting values without verified constraints | BLOCK | There are zero verified BC entries. |
| BVR-012 | Zero BC/BV result | Artificially adding boundary rows to appear complete | KEEP | Correct technique selection permits zero eligible targets. |
| BVR-013 | “Chưa giao” | Treating it as a temporal boundary | BLOCK | It is an ambiguous state predicate, deferred to state analysis. |
| BVR-014 | Prompt 003 consistency | Changing EP classifications due absence of BVA | KEEP | All EPs remain unchanged; BVA adds eligibility metadata only. |

## 10. Boundary Coverage Requirements

No abstract `BR-*` requirement is generated because no verified `BC-*` constraint or `BV-*` position exists. Blocked-boundary rows must not be treated as boundary test requirements.

| BR-ID | Feature | PARAM-ID | BV-ID(s) | Coverage Requirement | Deterministic? | TB Reference |
| ----- | ------- | -------- | -------- | -------------------- | -------------- | ------------ |

## 11. Human Review Checklist

- [ ] All 27 parameters from Prompt 003 were reviewed.
- [ ] BVA was applied only to ordered domains.
- [ ] No numeric boundary was invented.
- [ ] No string-length limit was invented.
- [ ] Email format was not incorrectly treated as BVA.
- [ ] Missing/null was not incorrectly treated as numeric BVA.
- [ ] Existing/non-existing IDs were not treated as boundaries.
- [ ] FR-02 lockout threshold was not invented.
- [ ] FR-09 coupon constraints were not invented.
- [ ] FR-18 order states were not treated as numeric boundaries.
- [ ] Every concrete boundary value is traceable to the specification.
- [ ] Every blocked boundary links to the appropriate blocker.
- [ ] BVA classifications remain consistent with Prompt 003 EP classifications.
- [ ] No final test cases were generated.
- [ ] Numeric/date-shaped JSON examples were not promoted to constraints.
- [ ] Coupon field names were not used as substitutes for business rules.
- [ ] No `BC-*`, `BV-*`, or `BR-*` ID was fabricated when no verified boundary exists.
- [ ] `Content-Type` and `Authorization` remain format/security domains.
- [ ] “Chưa giao” remains deferred to state-transition analysis.
- [ ] The zero-eligible result is accepted as a valid BVA outcome.

## 12. BVA Readiness Assessment

| Feature | Status | Eligible Domains | Deterministic Boundaries | Main Blockers | Ready for Test Generation? |
| ------- | ------ | ---------------: | -----------------------: | ------------- | -------------------------- |
| FR-02 | BLOCKED | 0 | 0 | BLK-FR02-001, BLK-FR02-002, BLK-FR02-003 | NO for specification-based BVA |
| FR-09 | BLOCKED | 0 | 0 | BLK-FR09-001, BLK-FR09-002, BLK-FR09-003, BLK-FR09-005 | NO for specification-based BVA |
| FR-18 | NO BVA APPLICABLE | 0 | 0 | None for quantitative boundaries; state/auth gaps belong elsewhere | NOT APPLICABLE |

## 13. Machine-Usable Summary for Later Prompts

```text
BVA_MODEL_SUMMARY

FR-02:
Eligible PARAM-IDs: None
BC-IDs: None
BV-IDs: None
BR-IDs: None
Blocked PARAM-IDs: P-FR02-001 email length; P-FR02-002 password length
Relevant Blockers: BLK-FR02-001; BLK-FR02-002; BLK-FR02-003

FR-09:
Eligible PARAM-IDs: None
BC-IDs: None
BV-IDs: None
BR-IDs: None
Blocked PARAM-IDs: P-FR09-001 apply code length; P-FR09-002 total amount; P-FR09-008 create code length; P-FR09-010 discount value; P-FR09-011 minimum order amount; P-FR09-012 expiration; P-FR09-013 usage count
Relevant Blockers: BLK-FR09-001; BLK-FR09-002; BLK-FR09-003; BLK-FR09-005

FR-18:
Eligible PARAM-IDs: None
BC-IDs: None
BV-IDs: None
BR-IDs: None
Blocked PARAM-IDs: None
Relevant Blockers: BLK-FR18-001; BLK-FR18-002; BLK-FR18-003; BLK-FR18-004; BLK-FR18-006; BLK-ALL-001
```
