# Prompt 012 — Verify and Normalize FR-07 Test Basis

## 1. Executive Summary

Prompt 011 identified 2 FR-07 operations, 6 parameters, 12 initial test-basis items, and 11 blockers. Direct verification against `eshop-sut/api_specification.md` confirms both operations and all six parameter identities. It also confirms that the Section 4 Bearer-header requirement applies to both Cart endpoints and that the POST example contains JSON members `id`, `name`, `price`, and `quantity`.

Normalization made the following changes:

- retained 2 operations and 6 parameters;
- corrected two non-normative example literals in the raw analysis: the specification shows `name: "Sản phẩm A"` and `price: 100000`, not the raw artifact's different sample values;
- split the section-level authentication basis into independently traceable GET and POST items, adding `TB-FR07-013` while retaining `TB-FR07-001` for GET;
- refined the two response-gap items into atomic statements without inventing response requirements;
- retained all 11 existing blockers and added `BLK-FR07-012` for repeated retrieval/read-after-add consistency, which was identified as uncertain in Prompt 011 but lacked a dedicated blocker;
- removed no supported operation, parameter, or test-basis ID.

Final verified counts are 2 endpoints/operations, 6 parameters, 13 normalized test-basis items, and 12 FR-07-specific blockers. No equivalence partitions, BVA, test cases, concrete data, implementation inspection, or execution were performed. The normalized basis is `READY_FOR_DOMAIN_MODELING` because its evidence, uncertainties, IDs, and feature boundaries are explicit and stable.

## 2. Endpoint Scope Verification

| Endpoint / Operation | Prompt 011 Classification | Specification Evidence | Verification | Final Scope |
| --- | --- | --- | --- | --- |
| `GET /api/cart` — retrieve Cart | IN_SCOPE | §4.1 explicitly lists `GET /api/cart` under Cart & Orders and labels it “Lấy giỏ hàng” | VERIFIED | IN_SCOPE |
| `POST /api/cart` — add to Cart | IN_SCOPE | §4.2 explicitly lists `POST /api/cart`, labels it “Thêm vào giỏ hàng,” and supplies a JSON body example | VERIFIED | IN_SCOPE |

The verified number of true FR-07 in-scope operations remains **2**. No update-quantity, remove-item, clear-Cart, or Cart-total operation is documented.

## 3. Neighboring Feature Boundary Verification

| Related Feature | Shared Resource / Operation | Relationship | Evidence | Quota Consequence |
| --- | --- | --- | --- | --- |
| FR-05 — Product Listing / Search | A product list could supply contextual item information, but no Cart link is stated | AMBIGUOUS | §3.1 and §4.2 are independent; §4.2 does not define `id` as a Product ID | REQUIRES_LATER_REVIEW |
| FR-06 — Product Detail | A product detail could be setup context, but no required dependency is stated | AMBIGUOUS | §3.2 uses `/api/products/:id`; §4.2 has body `id` without semantic linkage | REQUIRES_LATER_REVIEW |
| FR-08 — Checkout | Potential downstream workflow after Cart use | AMBIGUOUS | §4.3 accepts `total_amount` and `shipping_address` but identifies no Cart input or dependency | REQUIRES_LATER_REVIEW |
| FR-09 — Discount Coupons | Coupon calculation accepts its own code and amount | NO_OVERLAP | §5.1 is under Coupons and does not reference Cart | DOES_NOT_COUNT_FR07 |
| FR-10 — Order State Machine | Order cancellation mutates an order, not a Cart | NO_OVERLAP | §4.6 targets `/api/orders/:id/cancel` and documents order state `canceled` | DOES_NOT_COUNT_FR07 |

Checkout behavior is not automatically Cart behavior. Coupon behavior is not automatically Cart behavior. Product behavior is not automatically Cart behavior. Ambiguous product and checkout relationships supply no FR-07 quota credit unless later authoritative evidence establishes direct Cart behavior.

## 4. Functional Operation Verification

| OP-ID | Operation | Endpoint | Evidence | Verification | Final Classification |
| --- | --- | --- | --- | --- | --- |
| OP-FR07-001 | Retrieve Cart | `GET /api/cart` | §4.1 | VERIFIED | RETAIN |
| OP-FR07-002 | Add to Cart | `POST /api/cart` | §4.2 | VERIFIED | RETAIN |

No explicitly documented FR-07 operation was missing, so no operation ID was added or renumbered.

## 5. Parameter Verification

| PARAM-ID | Parameter | Location | Prompt 011 Claim | Specification Evidence | Verification | Final Normalized Definition |
| --- | --- | --- | --- | --- | --- | --- |
| PARAM-FR07-001 | `Authorization: Bearer <token>` | HEADER on `GET /api/cart` | Required Bearer header | §4 preamble: “Yêu cầu Header: `Authorization: Bearer <token>`” | VERIFIED | Required header with explicitly shown Bearer form; missing/malformed behavior, token validity rules, and claims are NOT SPECIFIED |
| PARAM-FR07-002 | `Authorization: Bearer <token>` | HEADER on `POST /api/cart` | Required Bearer header | Same §4 preamble applies to §4.2 | VERIFIED | Required header with explicitly shown Bearer form; missing/malformed behavior, token validity rules, and claims are NOT SPECIFIED |
| PARAM-FR07-003 | `id` | BODY on `POST /api/cart` | JSON number-shaped example `1`; meaning and constraints unspecified | §4.2 body includes `"id": 1` | PARTIALLY_VERIFIED | Member existence, body location, and example representation are verified; normative type, requiredness, nullability, domain, format, and resource relationship are NOT SPECIFIED |
| PARAM-FR07-004 | `name` | BODY on `POST /api/cart` | String-shaped member, but raw example literal was `"Laptop Dell XPS"` | §4.2 body actually includes `"name": "Sản phẩm A"` | PARTIALLY_VERIFIED | Member existence, body location, and string-shaped example are verified; raw literal is corrected; normative type, requiredness, nullability, format, length, and source are NOT SPECIFIED |
| PARAM-FR07-005 | `price` | BODY on `POST /api/cart` | Number-shaped member, but raw example literal was `1500` | §4.2 body actually includes `"price": 100000` | PARTIALLY_VERIFIED | Member existence, body location, and number-shaped example are verified; raw literal is corrected; normative type, requiredness, nullability, range, precision, currency, and authority are NOT SPECIFIED |
| PARAM-FR07-006 | `quantity` | BODY on `POST /api/cart` | JSON number-shaped example `2`; domain unspecified | §4.2 body includes `"quantity": 2` | PARTIALLY_VERIFIED | Member existence, body location, and example representation are verified; normative type, requiredness, nullability, integer-only rule, range, and stock relationship are NOT SPECIFIED |

The phrase “Body (JSON)” verifies the request representation example; it does not independently establish a required `Content-Type` header or a complete JSON schema.

## 6. Missing Parameter Analysis

| Candidate Missing Parameter | Endpoint | Evidence | Classification | Action |
| --- | --- | --- | --- | --- |
| Path parameter | Both Cart endpoints | Both documented paths are exactly `/api/cart` with no placeholder | NOT_A_PARAMETER | Do not add |
| Query parameter | Both Cart endpoints | No query string or query member is documented | NOT_A_PARAMETER | Do not add |
| `user_id` | Both Cart endpoints | No user identifier appears in either endpoint contract | NOT_A_PARAMETER | Preserve ownership gap |
| `cart_id` | Both Cart endpoints | No Cart identifier appears in either endpoint contract | NOT_A_PARAMETER | Preserve resource/ownership gap |
| Separate cart-item identifier | `POST /api/cart` | Body has `id`, but its meaning is undefined | AMBIGUOUS | Do not add; retain `PARAM-FR07-003` and blocker |
| `Content-Type` header | `POST /api/cart` | Specification labels the body JSON but does not state a header requirement | AMBIGUOUS | Do not add a header parameter |
| Authenticated identity/claims | Both Cart endpoints | Bearer token is required, but identity claims are not described | SUPPORTING_CONTEXT | Do not add; track ownership blocker |
| Current Cart/resource state | Both Cart endpoints | No explicit state input is defined | SUPPORTING_CONTEXT | Model only as an uncertain context later; do not add as a parameter |

No genuine missing parameter was found. Final parameter count remains **6**.

## 7. Requiredness Verification

| Parameter | Requiredness | Evidence Strength | Deterministic Invalid-Case Possible? |
| --- | --- | --- | --- |
| PARAM-FR07-001 — GET Bearer header | REQUIRED | Strong: §4 explicitly says the header is required | PARTIAL — omission violates an explicit requirement, but exact failure status/body is absent |
| PARAM-FR07-002 — POST Bearer header | REQUIRED | Strong: §4 explicitly says the header is required | PARTIAL — omission violates an explicit requirement, but exact failure status/body is absent |
| PARAM-FR07-003 — `id` | NOT_SPECIFIED | Example presence only | NO |
| PARAM-FR07-004 — `name` | NOT_SPECIFIED | Example presence only | NO |
| PARAM-FR07-005 — `price` | NOT_SPECIFIED | Example presence only | NO |
| PARAM-FR07-006 — `quantity` | NOT_SPECIFIED | Example presence only | NO |

The example body is not treated as proof that any individual body member is required.

## 8. Quantity Domain Verification

| Quantity Property | Prompt 011 Value | Specification Evidence | Final Verification |
| --- | --- | --- | --- |
| Type | JSON number-shaped example; normative type not specified | Literal `2` in §4.2 example | NOT_SPECIFIED — the example representation does not establish a normative type |
| Required | NOT SPECIFIED | Example presence only | NOT_SPECIFIED |
| Integer-only | NOT SPECIFIED | No validation statement | NOT_SPECIFIED |
| Zero | NOT SPECIFIED | No boundary statement | NOT_SPECIFIED |
| Negative | NOT SPECIFIED | No boundary statement | NOT_SPECIFIED |
| Fractional | NOT SPECIFIED | No domain statement | NOT_SPECIFIED |
| Minimum | NOT SPECIFIED | No minimum | NOT_SPECIFIED |
| Maximum | NOT SPECIFIED | No maximum | NOT_SPECIFIED |
| Stock relationship | NOT SPECIFIED | No inventory/stock relation in §4.2 | NOT_SPECIFIED |
| Overflow / size limit | Not captured explicitly | No size/overflow rule | NOT_SPECIFIED |

No BVA boundary follows from the everyday meaning of quantity. In particular, neither integer-only behavior nor a minimum of one is a verified requirement.

## 9. Identifier Domain Verification

| Identifier | Property | Evidence | Verification | Test-Design Implication |
| --- | --- | --- | --- | --- |
| Body `id` | Existence and location | §4.2 body contains `"id": 1` | VERIFIED | The member can be traced as a documented input example |
| Body `id` | Normative type | Only numeric literal `1` is shown | NOT_SPECIFIED | Do not assert integer or numeric validation |
| Body `id` | Semantic identity | It is named `id`, but no Product or Cart-item linkage is stated | AMBIGUOUS | Do not label it product ID or Cart-item ID deterministically |
| Body `id` | Requiredness/omission | No schema or required-fields list | NOT_SPECIFIED | No deterministic missing-ID negative case |
| Body `id` | Allowed/invalid representation | No format, range, sign, null, or malformed rule | NOT_SPECIFIED | No positive-integer partition or hard error oracle |
| Body `id` | Existing/non-existing resource behavior | No existence rule or response | NOT_SPECIFIED | Resource-existence tests are exploratory/blocked |
| Cart identifier | Representation | Neither endpoint contains a Cart ID | UNSUPPORTED | Do not invent a Cart identifier dimension |
| Separate Cart-item identifier | Representation | None is explicitly defined | UNSUPPORTED | Do not invent an item identifier distinct from body `id` |

## 10. Authentication Verification

| Endpoint | Authentication Required? | Scheme | Missing Auth Behavior | Malformed Auth Behavior | Verification |
| --- | --- | --- | --- | --- | --- |
| `GET /api/cart` | YES — VERIFIED | `Authorization: Bearer <token>` — VERIFIED | NOT_SPECIFIED | NOT_SPECIFIED | PARTIAL overall: requirement/scheme verified, failure contract absent |
| `POST /api/cart` | YES — VERIFIED | `Authorization: Bearer <token>` — VERIFIED | NOT_SPECIFIED | NOT_SPECIFIED | PARTIAL overall: requirement/scheme verified, failure contract absent |

Authentication rules are taken only from the §4 Cart & Orders preamble, not transferred from FR-09 or FR-18.

## 11. Authorization and Ownership Verification

| Ownership / Authorization Claim | Evidence | Verification | Final Rule |
| --- | --- | --- | --- |
| Cart belongs to the authenticated user | Bearer header is required, but no ownership text exists | UNSUPPORTED | NOT SPECIFIED |
| One Cart per user | No cardinality/lifecycle statement | UNSUPPORTED | NOT SPECIFIED |
| Identity is derived from token | Token is required; claims-to-Cart mapping is absent | AMBIGUOUS | NOT SPECIFIED |
| Caller supplies `user_id` | No such path, query, or body member | UNSUPPORTED | No documented `user_id` parameter |
| Caller supplies `cart_id` | Both paths are `/api/cart`; no Cart ID member is defined | UNSUPPORTED | No documented `cart_id` parameter |
| Cross-user Cart access is forbidden | No cross-user rule or target identifier | UNSUPPORTED | NOT SPECIFIED |
| Admin has special Cart behavior | No Admin qualification appears in §4.1 or §4.2 | UNSUPPORTED | NOT SPECIFIED |

The verified authentication header does not establish Cart ownership or one-Cart-per-user semantics.

## 12. Cart Resource Model Verification

| Resource Aspect | Prompt 011 Assessment | Specification Evidence | Final Assessment |
| --- | --- | --- | --- |
| Cart owner | PARTIAL from Bearer requirement | §4 requires a token but states no owner mapping | PARTIAL |
| Cart lifetime | NOT_SPECIFIED | No creation, expiry, reset, or lifecycle rule | NOT_SPECIFIED |
| Empty Cart | NOT_SPECIFIED | No empty response or status | NOT_SPECIFIED |
| Item identity | Item-like body with `id` | `id` exists, but its semantics are undefined | PARTIAL |
| Product reference | `id`, `name`, and `price` may suggest Product data | No explicit Product-resource link | PARTIAL |
| Quantity | Example member exists | `quantity: 2`; no domain/semantics | PARTIAL |
| Price | Example member exists | `price: 100000`; no authority/currency/precision | PARTIAL |
| Subtotal | NOT_SPECIFIED | No subtotal member or formula | NOT_SPECIFIED |
| Total | NOT_SPECIFIED | No Cart total member or formula | NOT_SPECIFIED |
| Persistence | NOT_SPECIFIED | No cross-request/session persistence rule | NOT_SPECIFIED |
| Duplicate products | NOT_SPECIFIED | No repeated-add or duplicate-row rule | NOT_SPECIFIED |

`PARTIAL` records only the narrow documented clue and does not elevate it into a complete resource contract.

## 13. State and Mutation Verification

| Operation | Pre-State Claim | Mutation Claim | Post-State Claim | Verification |
| --- | --- | --- | --- | --- |
| OP-FR07-001 — retrieve Cart | No specific pre-state is documented | Heading supports retrieval; no mutation is documented | Representation and resulting state are NOT_SPECIFIED | PARTIALLY_VERIFIED: read purpose is explicit, state semantics are absent |
| OP-FR07-002 — add to Cart | Existing/empty/present/absent conditions are NOT_SPECIFIED | “Thêm vào giỏ hàng” explicitly supports an add mutation concept | Exact item, quantity, ordering, and Cart result are NOT_SPECIFIED | PARTIALLY_VERIFIED: mutation purpose is explicit, transition is absent |

No formal empty/non-empty or item-present/item-absent state machine is created. Such labels may later be used only as clearly derived modeling dimensions constrained by these blockers.

## 14. Repeated-Operation Verification

| Repeated Behavior | Specification Evidence | Verification | Hard Oracle Available? |
| --- | --- | --- | --- |
| Same item added repeatedly | None | NOT_SPECIFIED | NO |
| Repeated quantity update | No update operation exists | UNSUPPORTED | NO |
| Repeated removal | No remove operation exists | UNSUPPORTED | NO |
| Cart retrieval repeated | GET operation exists; consistency/idempotence is not described | NOT_SPECIFIED | NO |
| Retrieval after add | Both operations exist; visibility/timing/order is not described | NOT_SPECIFIED | NO |
| Quantity accumulation versus replacement | None | NOT_SPECIFIED | NO |

Neither idempotence nor quantity accumulation is inferred.

## 15. Calculation Rule Verification

| Calculation Claim | Evidence | Verification | Deterministic Oracle Available? |
| --- | --- | --- | --- |
| `quantity × price` | Both members appear in a request example, but no formula is stated | NOT_SPECIFIED | NO |
| Item subtotal | No Cart response member or formula | NOT_SPECIFIED | NO |
| Cart total | No Cart response member or formula | NOT_SPECIFIED | NO |
| Aggregation across Cart items | No item collection or aggregation rule | NOT_SPECIFIED | NO |
| Rounding/precision | No rule | NOT_SPECIFIED | NO |
| Currency | No rule | NOT_SPECIFIED | NO |

Checkout/coupon `total_amount` fields do not establish an FR-07 formula. Mathematical convention is not specification evidence.

## 16. Response Contract Verification

| Endpoint | Scenario | Status | Response Shape | Fields | Types | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| `GET /api/cart` | Successful retrieval | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| `GET /api/cart` | Empty Cart | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| `GET /api/cart` | Missing/malformed authentication | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| `POST /api/cart` | Successful add | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| `POST /api/cart` | Invalid/missing body data | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| `POST /api/cart` | Missing/malformed authentication | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |

| Endpoint / Scenario | Transport Oracle | Schema Oracle | Semantic Oracle | State Oracle |
| --- | --- | --- | --- | --- |
| GET — successful retrieval | NOT_SPECIFIED | NOT_SPECIFIED | PARTIAL: operation purpose is retrieve Cart | NOT_SPECIFIED |
| GET — empty/auth failure | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |
| POST — successful add | NOT_SPECIFIED | NOT_SPECIFIED | PARTIAL: operation purpose is add to Cart | PARTIAL: a mutation concept exists, exact result absent |
| POST — input/auth failure | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED | NOT_SPECIFIED |

The endpoint path/method contract is supported, but it is not substituted for an undocumented response-status transport oracle.

## 17. Exact Schema Audit

| Endpoint | Documented Response Member | Presence Supported? | Type Supported? | Value Semantics Supported? |
| --- | --- | --- | --- | --- |
| `GET /api/cart` | None documented | NO | NO | NO |
| `POST /api/cart` | None documented | NO | NO | NO |

No exact response-schema assertion can be generated from the authoritative FR-07 text. The §4.2 request example does not document a response schema.

## 18. Error Behavior Verification

| Condition | Error Behavior Defined? | Status Defined? | Error Schema Defined? | Final Classification |
| --- | --- | --- | --- | --- |
| Nonexistent product/reference | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Invalid item/reference representation | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Invalid-looking quantity | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Missing body members | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Missing Bearer header | Required header is explicit; failure behavior is not | NO | NO | EXPLORATORY_NEGATIVE |
| Malformed Bearer header/token | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Empty Cart retrieval | NO; it is not even defined as an error | NO | NO | NOT_SPECIFIED |
| Unsupported body member/shape | NO | NO | NO | EXPLORATORY_NEGATIVE |
| Malformed body `id` | NO | NO | NO | EXPLORATORY_NEGATIVE |

No condition has enough evidence for an exact deterministic negative response oracle.

## 19. Security Basis Verification

| Security Topic | Specification Evidence | FR-07 Relevance | Normative Security Oracle Available? |
| --- | --- | --- | --- |
| Authentication | §4 requires `Authorization: Bearer <token>` | Directly relevant to both Cart operations | PARTIAL — header requirement is normative; failure result is absent |
| Authorization | No role or permission statement for Cart | Relevant but unspecified | NO |
| Object ownership | No owner, user ID, Cart ID, or cross-user rule | Relevant but unspecified | NO |
| Information disclosure | No response or disclosure rule | Potentially relevant but not specified | NO |
| Input handling | JSON example only; no validation/security rule | Relevant to POST but unspecified | NO |
| SEC-01–SEC-07 | Definitions are absent from the authoritative source | Cannot be mapped normatively | NO — retain shared `BLK-ALL-001` |

No OWASP or general best-practice statement is treated as an FR-07 requirement.

## 20. Dependency Verification

| Dependency | Prompt 011 Classification | Evidence | Final Classification | Quota Effect |
| --- | --- | --- | --- | --- |
| DEP-FR07-001 — login/JWT | SETUP_ONLY | §1.2 successful login returns JWT `token`; §4 requires Bearer token | SETUP_ONLY | Login setup does not count; only tested Cart behavior counts |
| DEP-FR07-002 — Product listing/detail | AMBIGUOUS | Product endpoints exist, but §4.2 does not link body members to them | AMBIGUOUS | Does not count; requires later evidence/review |
| DEP-FR07-003 — checkout | AMBIGUOUS | Checkout exists but takes no documented Cart identifier/reference | AMBIGUOUS | Does not count; requires later evidence/review |

No setup or neighboring-feature operation is counted as an FR-07 test.

## 21. Existing Blocker Verification

| Blocker ID | Prompt 011 Missing Information | Still Missing? | Evidence | Final Status |
| --- | --- | --- | --- | --- |
| BLK-FR07-001 | Body-member requiredness, normative types, and validation | YES | §4.2 supplies only an example | RETAIN |
| BLK-FR07-002 | Meaning of `id`, `name`, `price` and Product relationship | YES | No semantic/resource linkage is stated | RETAIN |
| BLK-FR07-003 | Quantity integer/range/stock domain | YES | Only example `2` is present | RETAIN |
| BLK-FR07-004 | Cart ownership and token-to-Cart mapping | YES | Bearer requirement has no ownership rule | RETAIN |
| BLK-FR07-005 | Exact add mutation and resulting Cart state | YES | Add purpose exists; before/after contract does not | RETAIN |
| BLK-FR07-006 | Repeated add, duplicate, accumulation/replacement semantics | YES | No repeated-operation rule | RETAIN |
| BLK-FR07-007 | Cart creation, lifetime, session scope, persistence | YES | No lifecycle rule | RETAIN |
| BLK-FR07-008 | Success/error statuses and response schemas | YES | Neither FR-07 endpoint documents a response | RETAIN |
| BLK-FR07-009 | Price authority, currency, precision, formulas, rounding | YES | Request members exist; calculation contract does not | RETAIN |
| BLK-FR07-010 | Product existence, availability, deletion, inventory/stock | YES | No Cart product-validity rule | RETAIN |
| BLK-FR07-011 | Missing/malformed Bearer failure behavior | YES | Header is required; failure contract absent | RETAIN |

All 11 blockers remain evidence-backed gaps. None is resolved through implementation assumptions.

## 22. Missing Blocker Analysis

| Candidate Blocker | Affected Area | Evidence Gap | Add? |
| --- | --- | --- | --- |
| Repeated GET consistency and read-after-add visibility/order | STATE / SEMANTIC | Both endpoints exist, but repeated retrieval consistency and visibility of an add are not defined | YES — add `BLK-FR07-012` |
| Request media-type/header behavior | INPUT / TRANSPORT | “Body (JSON)” does not state a `Content-Type` header or unsupported-media behavior | NO — covered sufficiently by BLK-FR07-001 and BLK-FR07-008 |
| Empty-Cart representation | SCHEMA / STATE | No empty response contract | NO — covered by BLK-FR07-008 and BLK-FR07-007 |
| Ordering of Cart items | SEMANTIC / SCHEMA | No collection/order rule | NO — covered by BLK-FR07-008 and new read-consistency blocker when relevant |
| SEC definitions | SECURITY | SEC-01–SEC-07 unavailable | NO FR-07-specific ID — retain shared `BLK-ALL-001` |

New blocker:

| Blocker ID | Missing Information | Affected Area | Test-Design Impact | Handling |
| --- | --- | --- | --- | --- |
| BLK-FR07-012 | Consistency of repeated Cart retrieval and visibility/order of a preceding add | STATE / SEMANTIC | Repeated-read and read-after-write hard oracles are blocked | KEEP_EXPLORATORY |

Final FR-07-specific blocker count: **12**.

## 23. Existing Test-Basis Verification

| TB-ID | Requirement | Prompt 011 Status | Specification Evidence | Verification | Action |
| --- | --- | --- | --- | --- | --- |
| TB-FR07-001 | Bearer authentication applies to both Cart endpoints | YES | §4 preamble | PARTIALLY_VERIFIED because one item spans two independently executable endpoints | SPLIT — retain ID for GET and add POST-specific TB-FR07-013 |
| TB-FR07-002 | `GET /api/cart` endpoint exists | YES | §4.1 | VERIFIED | RETAIN |
| TB-FR07-003 | GET purpose is retrieve Cart | PARTIAL | §4.1 heading | VERIFIED for purpose; response/resource details absent | REFINE to atomic purpose statement |
| TB-FR07-004 | `POST /api/cart` endpoint exists | YES | §4.2 | VERIFIED | RETAIN |
| TB-FR07-005 | POST has a JSON body example | PARTIAL | §4.2 “Body (JSON)” | VERIFIED for example representation only | REFINE to exclude full-schema inference |
| TB-FR07-006 | POST example includes `id` | PARTIAL | §4.2 `"id": 1` | VERIFIED for member/example only | REFINE to exclude semantic/type inference |
| TB-FR07-007 | POST example includes `name` | PARTIAL | §4.2 `"name": "Sản phẩm A"` | VERIFIED for member/example only | REFINE and correct raw example literal |
| TB-FR07-008 | POST example includes `price` | PARTIAL | §4.2 `"price": 100000` | VERIFIED for member/example only | REFINE and correct raw example literal |
| TB-FR07-009 | POST example includes `quantity` | PARTIAL | §4.2 `"quantity": 2` | VERIFIED for member/example only | REFINE to exclude domain inference |
| TB-FR07-010 | POST purpose establishes add mutation concept | PARTIAL | §4.2 heading | VERIFIED for purpose; exact transition absent | REFINE to atomic mutation-purpose statement |
| TB-FR07-011 | GET response contract is absent | NO | §4.1 contains endpoint only | UNSUPPORTED as a positive response requirement; omission verified | REFINE to one atomic response-contract gap |
| TB-FR07-012 | POST response/result contract is absent | NO | §4.2 contains endpoint/body only | UNSUPPORTED as a positive response requirement; omission verified | REFINE to one atomic response-contract gap |

No existing TB ID is removed, merged, or renumbered.

## 24. Missing Test-Basis Analysis

| Missing Requirement | Endpoint | Requirement Type | Evidence | Add? |
| --- | --- | --- | --- | --- |
| POST-specific Bearer authentication rule exposed by atomic split of TB-FR07-001 | `POST /api/cart` | AUTHENTICATION | §4 preamble applies to §4.2 | YES — add TB-FR07-013 |
| Additional path/query input | Both | INPUT | None documented | NO |
| Complete POST request schema | POST | SCHEMA | Example only | NO — blocker, not a requirement |
| Cart response schema/status | Both | RESPONSE / SCHEMA | None documented | NO — retain gap TBs, do not invent |
| Additional Cart operation | FR-07 | ENDPOINT | None documented | NO |

One atomic test-basis item is added. Final test-basis count: **13**.

## 25. Final Normalized FR-07 Test Basis

| TB-ID | Feature | Endpoint | Requirement Type | Requirement Statement | Verification Status | Evidence | Testability | Deterministic Oracle Available | Related PARAM IDs | Related Blocker IDs | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TB-FR07-001 | FR-07 | `GET /api/cart` | AUTHENTICATION | The GET Cart endpoint requires header `Authorization: Bearer <token>` | VERIFIED | `api_specification.md` §4 preamble + §4.1 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-001 | BLK-FR07-011 | Header form is exact; failure status/body are absent |
| TB-FR07-002 | FR-07 | `GET /api/cart` | ENDPOINT | The documented retrieve-Cart operation uses `GET /api/cart` | VERIFIED | §4.1 | TESTABLE | YES | None | None | Path and method only; no response implication |
| TB-FR07-003 | FR-07 | `GET /api/cart` | RESOURCE | The documented purpose of `GET /api/cart` is to retrieve the Cart | VERIFIED | §4.1 heading “Lấy giỏ hàng” | PARTIALLY_TESTABLE | PARTIAL | None | BLK-FR07-004, BLK-FR07-007, BLK-FR07-008, BLK-FR07-012 | Representation, owner, lifecycle, and consistency absent |
| TB-FR07-004 | FR-07 | `POST /api/cart` | ENDPOINT | The documented add-to-Cart operation uses `POST /api/cart` | VERIFIED | §4.2 | TESTABLE | YES | None | None | Path and method only; no response implication |
| TB-FR07-005 | FR-07 | `POST /api/cart` | INPUT | The specification supplies a JSON request-body example for add-to-Cart | VERIFIED | §4.2 “Body (JSON)” | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-003, PARAM-FR07-004, PARAM-FR07-005, PARAM-FR07-006 | BLK-FR07-001, BLK-FR07-008 | Example is not a complete required schema or header rule |
| TB-FR07-006 | FR-07 | `POST /api/cart` | INPUT | The JSON example contains body member `id` represented by literal `1` | VERIFIED | §4.2 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-003 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-010 | Literal verifies example shape only; semantics/type/domain absent |
| TB-FR07-007 | FR-07 | `POST /api/cart` | INPUT | The JSON example contains body member `name` represented by literal `"Sản phẩm A"` | VERIFIED | §4.2 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-004 | BLK-FR07-001, BLK-FR07-002 | Literal verifies example shape only; requiredness/constraints absent |
| TB-FR07-008 | FR-07 | `POST /api/cart` | INPUT | The JSON example contains body member `price` represented by literal `100000` | VERIFIED | §4.2 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-005 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-009 | Literal verifies example shape only; authority/currency/domain absent |
| TB-FR07-009 | FR-07 | `POST /api/cart` | INPUT | The JSON example contains body member `quantity` represented by literal `2` | VERIFIED | §4.2 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-006 | BLK-FR07-001, BLK-FR07-003, BLK-FR07-010 | Literal verifies example shape only; integer/range/stock domain absent |
| TB-FR07-010 | FR-07 | `POST /api/cart` | BUSINESS_RULE | The documented purpose of `POST /api/cart` is to add to the Cart | VERIFIED | §4.2 heading “Thêm vào giỏ hàng” | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-003, PARAM-FR07-004, PARAM-FR07-005, PARAM-FR07-006 | BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-009, BLK-FR07-010, BLK-FR07-012 | Exact mutation, duplicate, calculation, persistence, and visibility rules absent |
| TB-FR07-011 | FR-07 | `GET /api/cart` | RESPONSE | The specification provides no response status, body, fields, types, semantic result, or exact schema for GET Cart | UNSUPPORTED | Verified absence in §4.1 | BLOCKED | NO | None | BLK-FR07-008, BLK-FR07-012 | Gap item prevents fabricated response/read-state assertions |
| TB-FR07-012 | FR-07 | `POST /api/cart` | RESPONSE | The specification provides no response status, body, fields, types, semantic result, or exact schema for POST Cart | UNSUPPORTED | Verified absence in §4.2 | BLOCKED | NO | None | BLK-FR07-005, BLK-FR07-008 | Gap item prevents fabricated response/mutation-result assertions |
| TB-FR07-013 | FR-07 | `POST /api/cart` | AUTHENTICATION | The POST Cart endpoint requires header `Authorization: Bearer <token>` | VERIFIED | §4 preamble + §4.2 | PARTIALLY_TESTABLE | PARTIAL | PARAM-FR07-002 | BLK-FR07-011 | Created by atomic split; failure status/body are absent |

## 26. Requirement Atomicity Validation

| TB-ID | Atomic? | Problem | Normalization |
| --- | --- | --- | --- |
| TB-FR07-001 | YES | Original spanned both independently executable endpoints | Refined to GET authentication only; POST moved to TB-FR07-013 |
| TB-FR07-002 | YES | None | Retained endpoint method/path contract |
| TB-FR07-003 | YES | Original notes mixed resource gaps with purpose | Requirement limited to retrieve-Cart purpose; gaps remain notes/blockers |
| TB-FR07-004 | YES | None | Retained endpoint method/path contract |
| TB-FR07-005 | YES | Example could be mistaken for complete schema | Limited to existence of JSON body example |
| TB-FR07-006 | YES | Potential type/semantic inference | Limited to one example member/literal |
| TB-FR07-007 | YES | Raw sample literal was inaccurate | Corrected and limited to one example member/literal |
| TB-FR07-008 | YES | Raw sample literal was inaccurate | Corrected and limited to one example member/literal |
| TB-FR07-009 | YES | Potential quantity-domain inference | Limited to one example member/literal |
| TB-FR07-010 | YES | Exact transition was not supported | Limited to one operation-purpose/mutation concept |
| TB-FR07-011 | YES | Multiple absent response facets could appear compound | Normalized as one absence of the GET response contract |
| TB-FR07-012 | YES | Multiple absent response facets could appear compound | Normalized as one absence of the POST response contract |
| TB-FR07-013 | YES | None | One POST authentication rule |

`NON_ATOMIC unresolved = 0`.

## 27. Parameter Traceability

| PARAM-ID | Related TB IDs | Coverage Relationship | Blocker |
| --- | --- | --- | --- |
| PARAM-FR07-001 | TB-FR07-001 | GET authentication header requirement | BLK-FR07-011 |
| PARAM-FR07-002 | TB-FR07-013 | POST authentication header requirement | BLK-FR07-011 |
| PARAM-FR07-003 | TB-FR07-005, TB-FR07-006, TB-FR07-010 | POST example/body member and add purpose | BLK-FR07-001, BLK-FR07-002, BLK-FR07-010 |
| PARAM-FR07-004 | TB-FR07-005, TB-FR07-007, TB-FR07-010 | POST example/body member and add purpose | BLK-FR07-001, BLK-FR07-002 |
| PARAM-FR07-005 | TB-FR07-005, TB-FR07-008, TB-FR07-010 | POST example/body member and add purpose | BLK-FR07-001, BLK-FR07-002, BLK-FR07-009 |
| PARAM-FR07-006 | TB-FR07-005, TB-FR07-009, TB-FR07-010 | POST example/body member and add purpose | BLK-FR07-001, BLK-FR07-003, BLK-FR07-010 |

All retained parameters map to at least one normalized TB. No setup-only parameter is promoted into FR-07 coverage.

## 28. Blocker Traceability

| Blocker ID | Affected TB IDs | Affected Oracle Layer |
| --- | --- | --- |
| BLK-FR07-001 | TB-FR07-005, TB-FR07-006, TB-FR07-007, TB-FR07-008, TB-FR07-009 | PRECONDITION, SCHEMA, SEMANTIC |
| BLK-FR07-002 | TB-FR07-006, TB-FR07-007, TB-FR07-008, TB-FR07-010 | PRECONDITION, SEMANTIC |
| BLK-FR07-003 | TB-FR07-009, TB-FR07-010 | PRECONDITION, SEMANTIC |
| BLK-FR07-004 | TB-FR07-003 | SECURITY, PRECONDITION |
| BLK-FR07-005 | TB-FR07-010, TB-FR07-012 | SEMANTIC, STATE |
| BLK-FR07-006 | TB-FR07-010 | SEMANTIC, STATE |
| BLK-FR07-007 | TB-FR07-003, TB-FR07-010 | PRECONDITION, STATE, EXECUTABILITY |
| BLK-FR07-008 | TB-FR07-001, TB-FR07-003, TB-FR07-005, TB-FR07-010, TB-FR07-011, TB-FR07-012, TB-FR07-013 | TRANSPORT, SCHEMA, SEMANTIC |
| BLK-FR07-009 | TB-FR07-008, TB-FR07-010 | SEMANTIC, STATE |
| BLK-FR07-010 | TB-FR07-006, TB-FR07-009, TB-FR07-010 | PRECONDITION, SEMANTIC |
| BLK-FR07-011 | TB-FR07-001, TB-FR07-013 | TRANSPORT, SCHEMA, SECURITY |
| BLK-FR07-012 | TB-FR07-003, TB-FR07-010, TB-FR07-011 | SEMANTIC, STATE |

Shared `BLK-ALL-001` affects future SECURITY mapping because SEC-01–SEC-07 definitions are unavailable; it is not counted among the 12 FR-07-specific blockers.

## 29. Oracle Support Summary

| Oracle Layer | Fully Supported TBs | Partially Supported TBs | Unsupported / Blocked TBs |
| --- | --- | --- | --- |
| TRANSPORT | TB-FR07-002, TB-FR07-004 (2: endpoint method/path only) | TB-FR07-001, TB-FR07-013 (2: required header, failure response absent) | TB-FR07-011, TB-FR07-012 (2: response status absent) |
| SCHEMA | None (0) | TB-FR07-005 through TB-FR07-009 (5: request example shape only) | TB-FR07-011, TB-FR07-012 (2: response schema absent) |
| SEMANTIC | None (0) | TB-FR07-003, TB-FR07-006 through TB-FR07-010 (6: operation/member concepts only) | TB-FR07-011, TB-FR07-012 (2) |
| STATE | None (0) | TB-FR07-010 (1: add mutation concept only) | TB-FR07-003, TB-FR07-011, TB-FR07-012 (3: resource/result state absent) |
| SECURITY | None (0) | TB-FR07-001, TB-FR07-013 (2: authentication header only) | No standalone ownership/authorization TB was invented; those regions remain blocked by BLK-FR07-004 and BLK-ALL-001 |

The table reports support only and does not define executable tests.

## 30. Validation

| Validation Check | Result | Evidence |
| --- | --- | --- |
| Endpoint references | PASS | Exactly `GET /api/cart` and `POST /api/cart`, matching §4.1–§4.2 |
| Operation IDs | PASS | OP-FR07-001 through OP-FR07-002; 2 unique IDs |
| Parameter IDs | PASS | PARAM-FR07-001 through PARAM-FR07-006; 6 unique IDs |
| Test-basis IDs | PASS | TB-FR07-001 through TB-FR07-013; 13 unique IDs |
| Blocker IDs | PASS | BLK-FR07-001 through BLK-FR07-012; 12 unique FR-07 IDs |
| Duplicate IDs | PASS | None within each ID namespace |
| Unsupported hard requirements | PASS | Unspecified details remain partial, unsupported, ambiguous, exploratory, or blocked |
| Unsupported raw example literals | PASS | `name` and `price` corrected to the exact §4.2 example |
| Equivalence-partition IDs generated | PASS | 0 |
| Test-case IDs generated | PASS | 0 |
| BVA generated | PASS | 0 |
| Implementation assumptions introduced | PASS | None; no implementation/database/README/runtime/Postman material inspected |
| Historical combined artifacts modified | PASS | None by Prompt 012 |

Unsupported positive response requirements removed: **0**; the two response gaps remain explicit non-assertive basis records. Contradicted requirements: **0**. Genuinely missing specification requirements added: **0**. One test-basis item (`TB-FR07-013`) was added by splitting an already captured section-level requirement for atomic traceability. Ambiguous positive requirements retained: **0**; ambiguous contexts remain blockers/dependencies rather than hard requirements.

## 31. Domain Modeling Readiness

```text
READY_FOR_DOMAIN_MODELING
```

Endpoint scope, parameters, atomic TB IDs, blockers, neighboring-feature boundaries, and unsupported regions are normalized. The unresolved blockers do not authorize assumptions; they constrain Prompt 013 to supported, partial, ambiguous, or exploratory domains. No equivalence partition or test case has been generated early.

## 32. Current Project Status

```text
POOL B:
FR-07

FR-07 REQUIREMENT EXTRACTION:
COMPLETE

FR-07 TEST BASIS VERIFICATION:
COMPLETE

FR-07 DOMAIN MODEL:
NOT STARTED

FR-07 BVA:
NOT STARTED

FR-07 AI TEST GENERATION:
NOT STARTED

FR-07 QUOTA:
0 / 35

FR-02:
PRESERVED — 35 / 35

FR-18:
PRESERVED — 35 / 35

FR-09:
SUPERSEDED — HISTORICAL ONLY
```

## 33. Machine-Usable Summary

```text
PROMPT_012_SUMMARY

FR-07 endpoint count:
2
FR-07 operation count:
2

Parameters before verification:
6

Parameters after verification:
6

Test-basis items before verification:
12

Test-basis items after verification:
13

Blockers before verification:
11

Blockers after verification:
12

Unsupported requirements removed:
0
Contradicted requirements:
0
Missing requirements added:
0
Ambiguous requirements retained:
0

Unresolved non-atomic TBs:
0

EPs generated:
0

Testcases generated:
0

Domain modeling readiness:
READY_FOR_DOMAIN_MODELING

FR-07 quota:
0 / 35

Next required prompt:
PROMPT 013 — FR-07 DOMAIN MODELING AND EQUIVALENCE PARTITIONING
```
