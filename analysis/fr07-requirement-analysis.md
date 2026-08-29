# Prompt 011 — Pool B Feature Switch to FR-07

## 1. Executive Summary

The selected Pool B feature changes from FR-09 — Discount Coupons to FR-07 — Cart. FR-02 and FR-18 remain selected and their 35 AI cases each are preserved. FR-09 is a `SUPERSEDED_SELECTED_FEATURE`; all its work remains historical but contributes nothing to the current quota.

The authoritative API specification explicitly documents two Cart operations: `GET /api/cart` and `POST /api/cart`. It specifies Bearer authentication for the Cart & Orders API section and supplies an example JSON body for adding an item. It does not specify Cart response contracts, field validation, ownership rules, quantity boundaries, repeated-add semantics, stock validation, persistence, calculation formulas, or most error behavior. This analysis records those omissions as gaps and blockers; it creates neither equivalence partitions nor test cases.

Current selected quota: `70 / 105` (`FR-02: 35`, `FR-07: 0`, `FR-18: 35`).

## 2. Scope Migration Decision

```text
CURRENT_SELECTED_FEATURES

Pool A:
FR-02 — Login and Account Lockout

Pool B:
FR-07 — Cart

Pool C:
FR-18 — Order Management (Admin)

Superseded Selection:
FR-09 — Discount Coupons
```

Switch reason:

```text
Student explicitly changed the selected Pool B feature
after completing the previous FR-09 analysis and design workflow.
```

Decision mapping: `FR-02 = KEEP`, `FR-09 = SUPERSEDED`, `FR-07 = NEW SELECTED POOL B FEATURE`, and `FR-18 = KEEP`.

## 3. Historical Preservation Rules

- Prompts 001–010 and all associated outputs remain historical audit evidence.
- FR-09 AI-generated cases remain historical `AI_GENERATED` cases.
- FR-09 human-audit decisions remain evidence of the review actually performed.
- FR-09 cases and extension candidates do not count toward the current Pool B quota or current extension work.
- FR-09 identifiers remain reserved and are not reused for FR-07.
- FR-09 content is not renamed or relabeled as FR-07.
- Prompt 010 FR-09 candidates are `HISTORICAL_AI_ASSISTED_CANDIDATES_FOR_SUPERSEDED_FEATURE`.
- FR-02 and FR-18 candidates remain potentially relevant to their preserved features.

## 4. FR-07 Endpoint Scope

| Endpoint / Operation | Specification Feature | FR-07 Relationship | Classification | Evidence |
| --- | --- | --- | --- | --- |
| `POST /api/login` — login | Authentication | Can supply the Bearer token required by Section 4, but no mandatory Cart setup workflow is stated | SUPPORTING | `api_specification.md` §1.2 returns a JWT; §4 requires a Bearer token |
| `GET /api/products` — product list/search | Product Listing / Search | May help locate an item, but the specification does not link its product representation to Cart input | AMBIGUOUS | §3.1 and §4.2 are documented independently |
| `GET /api/products/:id` — product detail | Product Detail | May help establish a product, but the Cart member `id` is not explicitly defined as a product ID | AMBIGUOUS | §3.2 and the §4.2 example provide no explicit relationship |
| `GET /api/cart` — retrieve cart | Cart | Direct Cart read operation | IN_SCOPE | §4.1 “Lấy giỏ hàng” |
| `POST /api/cart` — add to cart | Cart | Direct Cart mutation operation | IN_SCOPE | §4.2 “Thêm vào giỏ hàng” |
| `POST /api/checkout` — checkout | Checkout | Potential downstream consumer, but no Cart-to-checkout relationship is defined | AMBIGUOUS | §4.3 accepts `total_amount` and `shipping_address`; no Cart reference is stated |
| `POST /api/apply-coupon` — apply coupon | Discount Coupons | Belongs to superseded FR-09, not Cart | OUT_OF_SCOPE | §5.1 is under Coupons and accepts `coupon_code` and `total_amount` |
| `GET /api/orders/my-orders` — personal order history | Order history | Operates on orders, not Cart | OUT_OF_SCOPE | §4.4 |
| `GET /api/orders/:id` — order detail | Order detail | Operates on an order, not Cart | OUT_OF_SCOPE | §4.5 |
| `PUT /api/orders/:id/cancel` — cancel order | Order State Machine | Mutates an order state, not Cart state | OUT_OF_SCOPE | §4.6 |

No update-quantity, remove-item, clear-cart, or explicit calculate/display-total endpoint is documented for FR-07.

## 5. FR-07 vs Neighboring Features

| Dimension | FR-07 Cart | FR-05 Product Listing / Search | FR-06 Product Detail | FR-08 Checkout | FR-09 Discount Coupons | FR-10 Order State Machine |
| --- | --- | --- | --- | --- | --- | --- |
| Actor | Bearer-authenticated caller; role unspecified | Unspecified caller | Unspecified caller | Bearer-authenticated caller; role unspecified | Caller unspecified for apply operation | Bearer-authenticated caller; role unspecified |
| Main responsibility | Retrieve Cart; add an item | List/search products | Retrieve one product | Place an order | Apply a coupon | Cancel an order |
| Resource | Cart, partially described item input | Product collection | Single product | Checkout/order creation concept | Coupon/discount result | Existing order |
| Read behavior | Retrieve Cart | Read product collection | Read one product | None explicitly labeled as read | Coupon evaluation result not specified | None in cancellation operation |
| Mutation behavior | Add to Cart | None documented | None documented | Place order | Apply coupon; persistent mutation not specified | Cancel order |
| Authentication | Section 4 Bearer requirement | Not stated in §3.1 | Not stated in §3.2 | Section 4 Bearer requirement | Not stated for §5.1 | Section 4 Bearer requirement |
| Ownership | Not specified; no user or cart identifier | Not specified | Not specified | Not specified | Not specified | Order ownership/permission not specified |
| State dependency | Cart state and transitions mostly unspecified | Product availability/state unspecified | Product availability/state unspecified | Cart dependency not specified | Cart dependency not specified | Depends on existing order state; transition rules unspecified here |
| Typical supporting dependency | Token; product relationship is ambiguous | None documented | Product identifier | Token; Cart relationship ambiguous | Coupon code and supplied total amount | Token and order identifier |

| Neighboring Feature | Endpoint Relationship | Overlap Classification | Quota Consequence |
| --- | --- | --- | --- |
| FR-05 | Product listing could be setup, but the Cart specification does not require it | AMBIGUOUS | Does not count as FR-07 |
| FR-06 | Product detail could be setup, but `id` linkage is unstated | AMBIGUOUS | Does not count as FR-07 |
| FR-08 | Checkout could follow Cart use, but no dependency is defined | AMBIGUOUS | Does not count as FR-07 |
| FR-09 | Coupon operation has independent inputs and belongs to Coupons | NO_OVERLAP | Does not count as FR-07 |
| FR-10 | Order cancellation changes order state rather than Cart state | NO_OVERLAP | Does not count as FR-07 |

## 6. FR-07 Functional Operation Inventory

| Operation ID | Endpoint | Method | Operation | FR-07 Scope | Evidence |
| --- | --- | --- | --- | --- | --- |
| OP-FR07-001 | `/api/cart` | GET | Retrieve Cart | IN_SCOPE | `api_specification.md` §4.1 |
| OP-FR07-002 | `/api/cart` | POST | Add to Cart | IN_SCOPE | `api_specification.md` §4.2 |

Operation count: **2**.

## 7. FR-07 Parameter Inventory

| PARAM-ID | Endpoint | Location | Parameter / Condition | Type / Shape | Required? | Constraints | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PARAM-FR07-001 | `GET /api/cart` | HEADER | `Authorization: Bearer <token>` | Bearer token header | YES | Token syntax/claims/expiry behavior NOT SPECIFIED | §4 section-level requirement |
| PARAM-FR07-002 | `POST /api/cart` | HEADER | `Authorization: Bearer <token>` | Bearer token header | YES | Token syntax/claims/expiry behavior NOT SPECIFIED | §4 section-level requirement |
| PARAM-FR07-003 | `POST /api/cart` | BODY | `id` | JSON number-shaped example | NOT SPECIFIED | Meaning, allowed values, and product relationship NOT SPECIFIED | §4.2 example: `1` |
| PARAM-FR07-004 | `POST /api/cart` | BODY | `name` | JSON string-shaped example | NOT SPECIFIED | Length, format, source, and mutability NOT SPECIFIED | §4.2 example: `"Laptop Dell XPS"` |
| PARAM-FR07-005 | `POST /api/cart` | BODY | `price` | JSON number-shaped example | NOT SPECIFIED | Range, precision, currency, and authority NOT SPECIFIED | §4.2 example: `1500` |
| PARAM-FR07-006 | `POST /api/cart` | BODY | `quantity` | JSON number-shaped example | NOT SPECIFIED | Integer requirement, minimum, maximum, and stock relation NOT SPECIFIED | §4.2 example: `2` |

Parameter count: **6**. The example members are observable input shapes, not proof of normative requiredness or validation rules.

## 8. Cart Resource Model

| Resource Aspect | Specification Evidence | Known? | Notes |
| --- | --- | --- | --- |
| Cart owner | Section 4 requires a Bearer token | PARTIAL | Token-to-Cart mapping and ownership rule are not stated |
| Cart lifetime | None | NOT_SPECIFIED | Creation, expiry, session scope, and lifecycle are unknown |
| Cart items | Retrieve/add operation names and §4.2 item-like body | PARTIAL | GET representation and item schema are absent |
| Product reference | §4.2 contains `id`, `name`, `price` | PARTIAL | No field is explicitly linked to the Product resource |
| Quantity | §4.2 contains example `quantity: 2` | PARTIAL | Meaning and domain are unspecified |
| Price | §4.2 contains example `price: 1500` | PARTIAL | Authority, currency, precision, and calculation role are unspecified |
| Subtotal | None | NOT_SPECIFIED | No field or formula is defined |
| Total | None in Cart operations | NOT_SPECIFIED | Checkout/coupon `total_amount` does not establish a Cart total contract |
| Persistence | None | NOT_SPECIFIED | Persistence across requests, sessions, or login is unknown |
| Empty-cart representation | None | NOT_SPECIFIED | Status, container, and body are unknown |

## 9. Authentication / Authorization / Ownership

### Authentication

| Question | Specification Result | Evidence / Impact |
| --- | --- | --- |
| Is authentication required? | VERIFIED — YES | Section 4 requires `Authorization: Bearer <token>` for Cart & Orders APIs |
| Is Bearer form specified? | VERIFIED — YES | Exact header form is shown |
| Missing-header behavior | NOT SPECIFIED | No deterministic status or schema oracle |
| Malformed-header behavior | NOT SPECIFIED | No deterministic status or schema oracle |

### Authorization

No Cart role, permission, or access-control rule is documented. Authorization beyond the presence of the authentication header is `NOT SPECIFIED`.

### Ownership

| Question | Specification Result |
| --- | --- |
| Does the Cart belong to the authenticated user? | NOT SPECIFIED |
| Is a user ID supplied explicitly? | NO documented user ID parameter |
| Is a Cart ID supplied explicitly? | NO documented Cart ID parameter |
| Can another user's Cart be targeted? | NOT SPECIFIED |
| Is ownership inferred from the token? | NOT SPECIFIED |

The absence of user and Cart identifiers suggests possible token-derived context, but that is an inference and is not adopted as a requirement.

## 10. Quantity Domain

| Aspect | Specification Value | Evidence | Test-Design Impact |
| --- | --- | --- | --- |
| Type | JSON number-shaped example; normative type NOT SPECIFIED | §4.2 uses `2` | Type-validation oracle blocked |
| Requiredness | NOT SPECIFIED | Only an example is supplied | Missing-field oracle blocked |
| Zero allowed? | NOT SPECIFIED | No rule | Boundary oracle blocked |
| Negative allowed? | NOT SPECIFIED | No rule | Boundary oracle blocked |
| Fractional allowed? | NOT SPECIFIED | No rule | Partition and boundary oracle blocked |
| Minimum | NOT SPECIFIED | No rule | No minimum boundary can be asserted |
| Maximum | NOT SPECIFIED | No rule | No maximum boundary can be asserted |
| Stock relationship | NOT SPECIFIED | No inventory rule in Cart section | Stock-dependent oracle blocked |

The specification does not support a rule that quantity must be at least one.

## 11. Product / Item Validity

| Condition | Specification Support | Deterministic Behavior Available? | Notes |
| --- | --- | --- | --- |
| Existing product | NOT SPECIFIED | NO | `id` is not explicitly defined as a product ID |
| Nonexistent product | NOT SPECIFIED | NO | No rejection/status/schema rule |
| Unavailable product | NOT SPECIFIED | NO | Availability concept is absent from Cart contract |
| Duplicate product already in Cart | NOT SPECIFIED | NO | No accumulation, replacement, or duplicate-row rule |
| Product inventory | NOT SPECIFIED | NO | No stock relationship is defined |
| Deleted product | NOT SPECIFIED | NO | No behavior is defined |
| Invalid product identifier | NOT SPECIFIED | NO | Identifier semantics and validation are absent |

## 12. Cart State and Mutation Model

The operation names support a read concept and an add mutation concept, but not a formal state machine. Logical labels such as empty, non-empty, present, or absent are therefore not promoted to verified formal states.

| Operation | Before State | Mutation | After State | Deterministic? | Evidence |
| --- | --- | --- | --- | --- | --- |
| `GET /api/cart` | NOT SPECIFIED | No mutation is documented; read operation | NOT SPECIFIED | PARTIAL | §4.1 labels the operation “retrieve Cart”; representation and consistency are absent |
| `POST /api/cart` | NOT SPECIFIED | “Add to Cart” is an explicit mutation concept; exact update rule is absent | NOT SPECIFIED | PARTIAL | §4.2 operation label and example body |

## 13. Repeated Operation Semantics

| Repeated Operation | Defined? | Documented Behavior | Blocker Needed? |
| --- | --- | --- | --- |
| Add the same product twice | NO | NOT SPECIFIED | YES |
| Update the same item repeatedly | NO | No update operation is documented | NO — out of documented operation scope |
| Remove an already-removed item | NO | No remove operation is documented | NO — out of documented operation scope |
| Retrieve Cart repeatedly | NO | Consistency, idempotence, and representation stability are NOT SPECIFIED | YES |
| Quantity accumulation versus replacement | NO | NOT SPECIFIED | YES |

The specification does not support an assumption that adding the same item increments its quantity.

## 14. Calculation Rules

| Calculation | Formula Explicit? | Input Fields | Rounding Defined? | Currency Defined? |
| --- | --- | --- | --- | --- |
| Unit price handling | NO — SPECIFICATION GAP | `price` appears in POST example | NO | NO |
| Quantity handling | NO — SPECIFICATION GAP | `quantity` appears in POST example | N/A | N/A |
| Item subtotal | NO — SPECIFICATION GAP | No documented subtotal inputs/field contract | NO | NO |
| Cart total | NO — SPECIFICATION GAP | No documented Cart total inputs/field contract | NO | NO |
| Multi-item accumulation | NO — SPECIFICATION GAP | NOT SPECIFIED | NO | NO |

The presence of `price` and `quantity` does not establish a required multiplication formula. Checkout and coupon `total_amount` inputs do not establish a Cart calculation contract.

## 15. Response Contract

| Endpoint | Scenario | Documented Status | Response Container | Documented Fields | Field Types | Exact Schema? |
| --- | --- | --- | --- | --- | --- | --- |
| `GET /api/cart` | Successful retrieval | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |
| `GET /api/cart` | Empty Cart | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |
| `GET /api/cart` | Authentication failure | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |
| `POST /api/cart` | Successful add | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |
| `POST /api/cart` | Invalid or missing input | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |
| `POST /api/cart` | Authentication failure | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NOT SPECIFIED | NO |

No IDs, timestamps, totals, error objects, nested product fields, or HTTP statuses are inferred.

## 16. Error Behavior

| Error Condition | Expected Behavior Specified? | Status Specified? | Schema Specified? |
| --- | --- | --- | --- |
| Nonexistent product | NO | NO | NO |
| Invalid item | NO | NO | NO |
| Invalid quantity | NO | NO | NO |
| Missing fields | NO | NO | NO |
| Authorization/authentication failure | NO | NO | NO |
| Empty Cart retrieval | NO | NO | NO |
| Unsupported body members/shape | NO | NO | NO |
| Malformed identifier | NO | NO | NO |

These are blocker or future exploratory regions, not deterministic requirements.

## 17. Security Mapping

| Security Concern | Specification Support | Mapping |
| --- | --- | --- |
| Authentication | Section 4 explicitly requires Bearer authorization header | Deterministic header-presence requirement; failure response remains unspecified |
| Cart ownership | No rule | Block deterministic ownership/access oracle |
| Object access | No Cart/user identifier and no cross-user access rule | Block deterministic object-access oracle |
| Role authorization | No Cart role requirement | NOT SPECIFIED |
| SEC-01–SEC-07 | Definitions unavailable in the authoritative source | Retain shared `BLK-ALL-001`; do not invent definitions |

General security best practices are not converted into FR-07 specification requirements.

## 18. Dependency Analysis

| Dependency ID | Feature / Resource | Dependency Purpose | Setup Only? | Counts as FR-07? |
| --- | --- | --- | --- | --- |
| DEP-FR07-001 | Authentication / login | Obtain a JWT that can be placed in the Section 4 Bearer header | SETUP_ONLY | NO; only Cart behavior under that context counts |
| DEP-FR07-002 | Product resource / listing / detail | Possible way to identify an item, but the Cart body-to-Product relationship is not stated | AMBIGUOUS | NO |
| DEP-FR07-003 | Checkout | Possible downstream use of Cart, but the specification defines no Cart dependency | AMBIGUOUS | NO |

No dependency operation is counted toward the FR-07 quota unless a later verified case directly tests Cart behavior.

## 19. FR-07 Blockers

| Blocker ID | Missing Information | Affected Area | Test-Design Impact | Handling |
| --- | --- | --- | --- | --- |
| BLK-FR07-001 | Requiredness, normative types, and validation rules for `id`, `name`, `price`, and `quantity` | POST input | Deterministic valid/invalid input partitions are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-002 | Meaning of `id`, `name`, and `price`, including relationship to Product resources | Resource/input model | Product-reference and client-supplied-value oracles are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-003 | Quantity integer/range/stock domain | Quantity | Boundary and invalid-value oracles are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-004 | Cart ownership and token-to-Cart mapping | Ownership/authorization | Isolation and cross-user access oracles are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-005 | Exact add mutation and resulting Cart state | State/business rule | Before/after assertions are partial | BLOCK_DETERMINISTIC_ORACLE |
| BLK-FR07-006 | Repeated add, duplicate item, accumulation, and replacement semantics | Repeated operation | Duplicate/add-twice cases require observation rather than a hard oracle | KEEP_EXPLORATORY |
| BLK-FR07-007 | Cart creation, lifetime, session scope, and persistence | Resource lifecycle | Multi-request/session-state assertions are blocked | VERIFY_LATER |
| BLK-FR07-008 | Success/error HTTP statuses and response schemas for both endpoints | Response/schema | Hard response oracles are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-009 | Price authority, currency, precision, subtotal/total formulas, and rounding | Calculation | Calculation partitions and exact totals are blocked | SPEC_UPDATE_REQUIRED |
| BLK-FR07-010 | Product existence, availability, deleted state, and inventory/stock behavior | Product validity | Item-validity outcomes cannot be predicted | VERIFY_LATER |
| BLK-FR07-011 | Missing or malformed Bearer-header failure behavior | Authentication error | Header requirement is testable, but exact failure status/body is not | BLOCK_DETERMINISTIC_ORACLE |

FR-07 blocker count: **11**. Shared blocker `BLK-ALL-001` remains separately active for unavailable SEC-01–SEC-07 definitions and is not included in this FR-07-specific count.

## 20. Initial FR-07 Test Basis

| TB-ID | Feature | Endpoint | Requirement Type | Verified Requirement | Source | Testable? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TB-FR07-001 | FR-07 | Both Cart endpoints | AUTHENTICATION | Section 4 Cart & Orders APIs require `Authorization: Bearer <token>` | `api_specification.md` §4 preamble | YES | Missing/malformed failure response remains unspecified |
| TB-FR07-002 | FR-07 | `GET /api/cart` | ENDPOINT | A GET Cart endpoint is documented | §4.1 | YES | Exact status and schema absent |
| TB-FR07-003 | FR-07 | `GET /api/cart` | RESOURCE | Operation purpose is to retrieve the Cart | §4.1 | PARTIAL | Cart representation, ownership, and empty form absent |
| TB-FR07-004 | FR-07 | `POST /api/cart` | ENDPOINT | A POST Cart endpoint is documented | §4.2 | YES | Exact status and schema absent |
| TB-FR07-005 | FR-07 | `POST /api/cart` | INPUT | An example JSON request body is documented | §4.2 | PARTIAL | Example does not establish full schema or requiredness |
| TB-FR07-006 | FR-07 | `POST /api/cart` | INPUT | Example body contains number-shaped member `id` | §4.2 | PARTIAL | Semantics and Product linkage absent |
| TB-FR07-007 | FR-07 | `POST /api/cart` | INPUT | Example body contains string-shaped member `name` | §4.2 | PARTIAL | Constraints and authority absent |
| TB-FR07-008 | FR-07 | `POST /api/cart` | INPUT | Example body contains number-shaped member `price` | §4.2 | PARTIAL | Currency, precision, range, and authority absent |
| TB-FR07-009 | FR-07 | `POST /api/cart` | INPUT | Example body contains number-shaped member `quantity` | §4.2 | PARTIAL | Requiredness, integer rule, and range absent |
| TB-FR07-010 | FR-07 | `POST /api/cart` | STATE | “Add to Cart” establishes a mutation concept | §4.2 | PARTIAL | Exact before/after and repeated-add semantics absent |
| TB-FR07-011 | FR-07 | `GET /api/cart` | RESPONSE | No status, container, fields, types, or exact response schema are documented | §4.1 | NO | Specification gap blocks deterministic response oracle |
| TB-FR07-012 | FR-07 | `POST /api/cart` | RESPONSE | No status, response schema, or exact mutation result is documented | §4.2 | NO | Specification gap blocks deterministic response/state oracle |

Initial test-basis count: **12**. No equivalence partitions, test-case IDs, concrete data, Postman implementation, API execution, or source-code inspection are included.

FR-07 uses independent `OP-FR07-*`, `PARAM-FR07-*`, `TB-FR07-*`, and `BLK-FR07-*` namespaces. Historical FR-09 IDs are not reused. The future FR-07 partition namespace is reserved, with no IDs allocated in Prompt 011.

## 21. Artifact Impact Analysis

| Artifact | Classification | Required Action | Reason |
| --- | --- | --- | --- |
| `analysis/verified-test-basis.md` | HISTORICAL_SUPERSEDED | Preserve unchanged; verify and normalize the new FR-07 basis separately in Prompt 012 | Contains historical selected-scope and FR-09 basis |
| `analysis/domain-model.md` | HISTORICAL_SUPERSEDED | Preserve unchanged; build only FR-07 modeling in Prompt 013 | Existing FR-09 partitions remain audit history |
| `analysis/boundary-value-analysis.md` | HISTORICAL_SUPERSEDED | Preserve unchanged; build only eligible FR-07 BVA in Prompt 014 | Existing BVA is tied to old scope |
| `analysis/test-case-design.md` | HISTORICAL_SUPERSEDED | Preserve FR-09 cases as historical; create FR-07 cases in Prompt 015 | FR-09 cases cannot be renamed or counted |
| `analysis/test-coverage-matrix.md` | HISTORICAL_SUPERSEDED | Preserve old matrix; rebuild current combined matrix in Prompt 019 | Current Pool B coverage is zero |
| `analysis/scope-and-gap-analysis.md` | HISTORICAL_SUPERSEDED | Preserve old analysis; perform FR-07 gap closure in Prompt 016 | Old scope/quota conclusions include FR-09 |
| `analysis/human-audit-worksheet.md` | HISTORICAL_SUPERSEDED | Preserve all audit decisions; create a separate FR-07 worksheet in Prompt 017 | Human decisions cannot transfer between features |
| `analysis/human-audit-application-summary.md` | HISTORICAL_SUPERSEDED | Preserve unchanged; apply later FR-07 decisions in Prompt 018 | It records a completed historical audit |
| `analysis/student-extension-reassessment.md` | HISTORICAL_SUPERSEDED | Preserve; reassess current combined suite after Prompt 019 | Previous reassessment used FR-09 |
| `analysis/student-extension-worksheet.md` | HISTORICAL_SUPERSEDED | Preserve; mark FR-09 candidate slots historical and later rebuild current candidates | Old candidate selection is scope-specific |
| `analysis/ai-assisted-extension-candidate-analysis.md` | HISTORICAL_SUPERSEDED | Preserve; exclude FR-09 candidates from current work | FR-09 candidates are for a superseded feature |

At the content level, the FR-02 and FR-18 portions remain `PRESERVE_UNCHANGED`; the FR-09 portions are `HISTORICAL_SUPERSEDED`. The new FR-07 requirement foundation is `REBUILD_FR07_ONLY`, while the feature-switch record is `UPDATE_CURRENT_SCOPE_METADATA`. Prompt 011 does not rewrite any listed historical artifact.

## 22. Current Quota State

| Feature | Current | Required | Status |
| --- | ---: | ---: | --- |
| FR-02 | 35 | 35 | PRESERVED |
| FR-07 | 0 | 35 | REBUILD REQUIRED |
| FR-18 | 35 | 35 | PRESERVED |

FR-09 contributes zero cases to the current quota.

## 23. Migration Workflow

```text
Prompt 011
Pool B switch + FR-07 requirement extraction
        ↓
Prompt 012
Verify and normalize FR-07 test basis
        ↓
Prompt 013
FR-07 domain model + equivalence partitioning
        ↓
Prompt 014
FR-07 BVA
        ↓
Prompt 015
FR-07 initial logical test generation
        ↓
Prompt 016
FR-07 scope / quota / technique gap closure
        ↓
Prompt 017
FR-07 human-audit worksheet preparation
        ↓
STUDENT HUMAN REVIEW — FR-07
        ↓
Prompt 018
Apply FR-07 human decisions
        ↓
Prompt 019
Rebuild combined current suite:
FR-02 + FR-07 + FR-18
        ↓
Rebuild current student extension candidates
        ↓
Student extension
        ↓
Concrete test data design
```

FR-02 and FR-18 are preserved rather than regenerated.

## 24. Current Project Status

```text
POOL B FEATURE SWITCH: COMPLETE

FR-02:
PRESERVED

FR-09:
SUPERSEDED — HISTORICAL ONLY

FR-07:
REQUIREMENT EXTRACTION COMPLETE
TEST DESIGN NOT STARTED

FR-18:
PRESERVED

CURRENT SELECTED FEATURE QUOTA:
70 / 105

FR-07:
0 / 35
```

## 25. Machine-Usable Summary

```text
PROMPT_011_SUMMARY

Old Pool B:
FR-09

New Pool B:
FR-07

Current selected features:
FR-02
FR-07
FR-18

Preserved:
FR-02 AI cases: 35
FR-18 AI cases: 35

FR-09:
Historical cases preserved: YES
Counts toward current quota: NO

FR-07 endpoints:
2
FR-07 operations:
2
FR-07 parameters:
6
FR-07 test-basis items:
12
FR-07 blockers:
11

FR-07 current quota:
0 / 35

Current selected quota:
70 / 105

Next required prompt:
PROMPT 012 — VERIFY AND NORMALIZE FR-07 TEST BASIS
```
