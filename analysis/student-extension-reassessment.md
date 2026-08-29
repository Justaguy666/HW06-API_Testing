# Prompt 009 — Human Extension Reassessment

## 1. Executive Summary

The current suite contains 129 historical AI-generated cases. Active quota-eligible coverage remains FR-02 35, FR-09 35, and FR-18 35. The first human extension review did not identify an obvious AI-missed testcase; this is the student's current assessment, not proof of complete coverage.

The reassessment found no confirmed documented-and-testable TB or EP without meaningful existing coverage. Residual uncertainty is attributable to specification blockers, partial schemas/state models, security-definition gaps, or behavior already represented by exploratory cases. The student-authored extension requirement is NOT YET SATISFIED because no student ideas or accepted HUMAN_ADDED tests have been supplied.

```text
FIRST HUMAN EXTENSION REVIEW

Student assessment:
No obvious AI-missed testcase was identified during the
first manual review of the 129-case AI-generated suite.

Extension requirement status:
NOT YET SATISFIED
```

## 2. Existing Coverage Inventory

| Coverage Dimension | FR-02 | FR-09 | FR-18 |
| --- | --- | --- | --- |
| nominal behavior | STRONG | BLOCKED | STRONG |
| required input classes | MODERATE | MODERATE | MODERATE |
| invalid-type classes | STRONG | STRONG | STRONG |
| omitted/null classes | STRONG | STRONG | STRONG |
| authentication | STRONG | MODERATE | STRONG |
| authorization | NOT_APPLICABLE | STRONG | STRONG |
| resource existence | MODERATE | STRONG | STRONG |
| response contract/schema | MODERATE | WEAK | WEAK |
| robustness | STRONG | STRONG | STRONG |
| state-dependent behavior | BLOCKED | BLOCKED | BLOCKED |
| security-oriented behavior | MODERATE | MODERATE | MODERATE |
| interaction/compound domains | MODERATE | MODERATE | MODERATE |
| repeated-operation behavior | BLOCKED | MODERATE | MODERATE |
| persistence/side effects | BLOCKED | BLOCKED | BLOCKED |
| exploratory behavior | STRONG | STRONG | STRONG |

These ratings summarize existing coverage only. WEAK and BLOCKED indicate evidence limits, not automatically missing testcases.

## 3. Test Density by Feature

### FR-02

```text
Feature: FR-02
Total quota-eligible tests: 35
READY: 4
BLOCKED: 6
EXPLORATORY_ONLY: 25

Domain-focused: 10
State-focused: 5
Security-focused: 2
Schema-focused: 4
Authentication-focused: 4
Authorization-focused: 0
Robustness-focused: 10
Business-rule-focused: 0
```

### FR-09

```text
Feature: FR-09
Total quota-eligible tests: 35
READY: 0
BLOCKED: 4
EXPLORATORY_ONLY: 31

Domain-focused: 16
State-focused: 2
Security-focused: 3
Schema-focused: 5
Authentication-focused: 0
Authorization-focused: 0
Robustness-focused: 4
Business-rule-focused: 5
```

### FR-18

```text
Feature: FR-18
Total quota-eligible tests: 35
READY: 10
BLOCKED: 2
EXPLORATORY_ONLY: 23

Domain-focused: 7
State-focused: 8
Security-focused: 1
Schema-focused: 3
Authentication-focused: 4
Authorization-focused: 2
Robustness-focused: 6
Business-rule-focused: 4
```

Technique counts use each quota-eligible case's recorded primary technique. A zero does not imply that the dimension is absent from secondary traceability.

## 4. Requirement Saturation

| TB-ID | Requirement | Existing Test IDs | Coverage Type | Saturation | Blocker |
| --- | --- | --- | --- | --- | --- |
| TB-FR02-001 | Method/path are `POST /api/login`. | TC-API-001–TC-API-013, TC-API-078, TC-API-088 | INPUT / COVERED | HEAVILY_COVERED | Base URL is document-level. |
| TB-FR02-002 | JSON example contains `email`. | TC-API-001–TC-API-005, TC-API-077–TC-API-082, TC-API-084, TC-API-086, TC-API-094 | INPUT / COVERED | HEAVILY_COVERED | Requiredness and validation are not specified. |
| TB-FR02-003 | JSON example contains `password`. | TC-API-001, TC-API-006–TC-API-009, TC-API-013, TC-API-077–TC-API-081, TC-API-083, TC-API-085, TC-API-087, TC-API-094 | INPUT / COVERED | HEAVILY_COVERED | Requiredness and validation are not specified. |
| TB-FR02-004 | Successful login returns JWT `token`. | TC-API-001, TC-API-074–TC-API-075, TC-API-089 | AUTHENTICATION / COVERED | MULTIPLE_CASES | Claims/lifetime are not specified. |
| TB-FR02-005 | Success status is `200 OK`. | TC-API-001, TC-API-074, TC-API-076 | RESPONSE_STATUS / COVERED | MULTIPLE_CASES | Failure statuses are not specified. |
| TB-FR02-006 | Success returns `token` and `user` information. | TC-API-001, TC-API-074–TC-API-076, TC-API-089, TC-API-095 | RESPONSE_SCHEMA / PARTIAL | PARTIAL | Overall and `user` schemas are not specified. |
| TB-FR02-007 | Account/credentials are implied by the login endpoint. | TC-API-001–TC-API-002, TC-API-006, TC-API-013, TC-API-084–TC-API-087, TC-API-090–TC-API-094 | DEPENDENCY / PARTIAL | PARTIAL | Not an explicit precondition. |
| TB-FR09-001 | Method/path are `POST /api/apply-coupon`. | TC-API-014–TC-API-028, TC-API-115 | INPUT / PARTIAL | PARTIAL | NONE |
| TB-FR09-002 | JSON example contains `code`. | TC-API-014–TC-API-018, TC-API-101–TC-API-103, TC-API-115 | INPUT / PARTIAL | PARTIAL | Requiredness/domain are not specified. |
| TB-FR09-003 | JSON example contains `total_amount`. | TC-API-014, TC-API-019–TC-API-021, TC-API-104–TC-API-106, TC-API-111–TC-API-112, TC-API-115 | INPUT / PARTIAL | PARTIAL | Requiredness/domain are not specified. |
| TB-FR09-004 | JSON example contains `user_id`. | TC-API-014, TC-API-022–TC-API-026, TC-API-107–TC-API-108, TC-API-110, TC-API-114–TC-API-115 | INPUT / PARTIAL | PARTIAL | Requiredness/domain/identity relationship are not specified. |
| TB-FR09-005 | Endpoint calculates the total after discount. | TC-API-014, TC-API-096–TC-API-098, TC-API-104–TC-API-106, TC-API-108–TC-API-113 | BUSINESS_RULE / BLOCKED | BLOCKED | Formula and eligibility are not specified. |
| TB-FR09-006 | Response is JSON containing `discount_amount`. | TC-API-014, TC-API-096, TC-API-098–TC-API-100, TC-API-113 | RESPONSE_SCHEMA / PARTIAL | PARTIAL | Type/value rule is not specified. |
| TB-FR09-007 | Response is JSON containing `final_amount`. | TC-API-014, TC-API-097–TC-API-100, TC-API-113 | RESPONSE_SCHEMA / PARTIAL | PARTIAL | Type/value rule is not specified. |
| TB-FR09-008 | Method/path are `GET /api/coupons`. | TC-API-029–TC-API-032 | INPUT / COVERED | MULTIPLE_CASES | Supporting endpoint. |
| TB-FR09-009 | Requires `Authorization: Bearer <token>`. | TC-API-029–TC-API-032 | AUTHENTICATION / COVERED | MULTIPLE_CASES | Failure behavior absent. |
| TB-FR09-010 | Endpoint is labeled “Dành cho Admin.” | TC-API-029–TC-API-030 | AUTHORIZATION / BLOCKED | BLOCKED | Exact role enforcement is ambiguous. |
| TB-FR09-011 | Requires `Authorization: Bearer <token>`. | TC-API-033–TC-API-038 | AUTHENTICATION / COVERED | HEAVILY_COVERED | NONE |
| TB-FR09-012 | Account must have Admin permission. | TC-API-033–TC-API-036 | AUTHORIZATION / COVERED | MULTIPLE_CASES | Failure behavior absent. |
| TB-FR09-013 | Creation example contains six named body fields. | TC-API-033, TC-API-037–TC-API-038 | INPUT / BLOCKED | BLOCKED | Requiredness and domains are not specified. |
| TB-FR09-014 | Requires `Authorization: Bearer <token>`. | TC-API-039–TC-API-045 | AUTHENTICATION / COVERED | HEAVILY_COVERED | NONE |
| TB-FR09-015 | Account must have Admin permission. | TC-API-039–TC-API-042 | AUTHORIZATION / COVERED | MULTIPLE_CASES | NONE |
| TB-FR18-001 | Method/path are `GET /api/admin/orders`. | TC-API-046–TC-API-049, TC-API-116–TC-API-120 | INPUT / COVERED | HEAVILY_COVERED | NONE |
| TB-FR18-002 | Operation lists orders for the entire system. | TC-API-046, TC-API-116–TC-API-118, TC-API-120, TC-API-128 | BUSINESS_RULE / PARTIAL | PARTIAL | Response schema absent. |
| TB-FR18-003 | Requires `Authorization: Bearer <token>`. | TC-API-046–TC-API-049, TC-API-116–TC-API-117 | AUTHENTICATION / COVERED | HEAVILY_COVERED | Failure behavior absent. |
| TB-FR18-004 | Account must have Admin permission. | TC-API-046–TC-API-049, TC-API-116–TC-API-117 | AUTHORIZATION / COVERED | HEAVILY_COVERED | Failure behavior absent. |
| TB-FR18-005 | Method/path identify an order by `id`. | TC-API-050–TC-API-060, TC-API-121–TC-API-124, TC-API-126–TC-API-128 | INPUT / PARTIAL | PARTIAL | `id` type/range are not specified. |
| TB-FR18-006 | JSON example contains `status: "confirmed"`. | TC-API-050–TC-API-054, TC-API-061–TC-API-066, TC-API-121–TC-API-124, TC-API-129 | INPUT / PARTIAL | PARTIAL | Requiredness not specified. |
| TB-FR18-007 | Documented status vocabulary is `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | TC-API-050–TC-API-054, TC-API-061–TC-API-066, TC-API-121, TC-API-124–TC-API-126, TC-API-129 | DOMAIN / COVERED | HEAVILY_COVERED | Transition relationships are not specified. |
| TB-FR18-008 | Operation updates order status. | TC-API-050–TC-API-054, TC-API-061–TC-API-066, TC-API-121, TC-API-125–TC-API-128 | BUSINESS_RULE / BLOCKED | BLOCKED | Exact valid transitions are absent. |
| TB-FR18-009 | Requires `Authorization: Bearer <token>`. | TC-API-050–TC-API-057, TC-API-129 | AUTHENTICATION / COVERED | HEAVILY_COVERED | NONE |
| TB-FR18-010 | Account must have Admin permission. | TC-API-050–TC-API-057, TC-API-129 | AUTHORIZATION / COVERED | HEAVILY_COVERED | NONE |
| TB-FR18-011 | Operation changes status to `canceled`. | TC-API-067, TC-API-071–TC-API-073 | STATE / BLOCKED | BLOCKED | Supporting state endpoint. |
| TB-FR18-012 | Cancellation is permitted only when the order is “chưa giao.” | TC-API-067, TC-API-070 | STATE / BLOCKED | BLOCKED | Phrase is not mapped to listed statuses. |
| TB-FR18-013 | Requires `Authorization: Bearer <token>`. | TC-API-067–TC-API-069 | AUTHENTICATION / COVERED | MULTIPLE_CASES | Required role not specified. |
| TB-FR18-014 | Admin account and Bearer token are explicit dependencies. | TC-API-050–TC-API-060, TC-API-067–TC-API-073 | DEPENDENCY / PARTIAL | PARTIAL | Existing order remains implied. |

All 36 TB items have traceability. PARTIAL and BLOCKED rows reflect requirement quality or oracle limits and are not converted into testcase suggestions.

## 5. Equivalence Partition Saturation

| EP-ID | Feature | Partition | Existing Test IDs | Coverage Status | Notes |
| --- | --- | --- | --- | --- | --- |
| EP-FR02-001 | FR-02 | JSON-string representation associated with an existing account and matching credential pair | TC-API-001, TC-API-006–TC-API-012, TC-API-074–TC-API-076, TC-API-081–TC-API-082, TC-API-084, TC-API-086, TC-API-089–TC-API-091, TC-API-095 | MULTI_COVERED | DEPENDENCY-DERIVED; Depends on `password` and account existence |
| EP-FR02-002 | FR-02 | JSON-string representation not associated with a usable credential pair | TC-API-002, TC-API-077, TC-API-082, TC-API-084, TC-API-086, TC-API-094 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Failure behavior not specified |
| EP-FR02-003 | FR-02 | Field omitted | TC-API-003, TC-API-078–TC-API-079 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness not specified |
| EP-FR02-004 | FR-02 | Field present with null-like JSON value | TC-API-004, TC-API-080 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling not specified |
| EP-FR02-005 | FR-02 | Field represented by a non-string JSON type | TC-API-005 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR02-006 | FR-02 | JSON-string representation matching the selected account's credential | TC-API-001–TC-API-005, TC-API-010–TC-API-012, TC-API-074–TC-API-076, TC-API-081, TC-API-083, TC-API-085, TC-API-087, TC-API-089–TC-API-091, TC-API-095 | MULTI_COVERED | DEPENDENCY-DERIVED; Depends on `email` and account existence |
| EP-FR02-007 | FR-02 | JSON-string representation not matching the selected account's credential | TC-API-006, TC-API-013, TC-API-077, TC-API-083, TC-API-085, TC-API-087, TC-API-090–TC-API-091, TC-API-094 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Invalid-credential behavior not specified |
| EP-FR02-008 | FR-02 | Field omitted | TC-API-007, TC-API-078–TC-API-079 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness not specified |
| EP-FR02-009 | FR-02 | Field present with null-like JSON value | TC-API-008, TC-API-080 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling not specified |
| EP-FR02-010 | FR-02 | Field represented by a non-string JSON type | TC-API-009 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR02-011 | FR-02 | Header indicates a JSON representation | TC-API-001–TC-API-009, TC-API-012 | MULTI_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR02-012 | FR-02 | Header omitted | TC-API-010 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR02-013 | FR-02 | Header indicates a non-JSON representation | TC-API-011 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Media-type behavior absent |
| EP-FR02-014 | FR-02 | Header omitted | TC-API-001–TC-API-011 | MULTI_COVERED | BLOCKER-DRIVEN; Request authentication not specified |
| EP-FR02-015 | FR-02 | Header present in any form | TC-API-012 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Effect on login not specified |
| EP-FR09-001 | FR-09 | JSON-string representation associated with a coupon resource | TC-API-014, TC-API-096–TC-API-102, TC-API-108–TC-API-110, TC-API-113, TC-API-115 | BLOCKED | DEPENDENCY-DERIVED; Depends on coupon existence and unspecified eligibility |
| EP-FR09-002 | FR-09 | JSON-string representation not associated with a coupon resource | TC-API-015, TC-API-101–TC-API-103 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Missing-coupon behavior not specified |
| EP-FR09-003 | FR-09 | Field omitted | TC-API-016 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness not specified |
| EP-FR09-004 | FR-09 | Field present with null-like JSON value | TC-API-017 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling not specified |
| EP-FR09-005 | FR-09 | Field represented by a non-string JSON type | TC-API-018 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR09-006 | FR-09 | JSON-number representation participating in discount calculation | TC-API-014, TC-API-096–TC-API-100, TC-API-104–TC-API-106, TC-API-110–TC-API-113, TC-API-115 | BLOCKED | DEPENDENCY-DERIVED; Depends on coupon and unspecified formula/eligibility |
| EP-FR09-007 | FR-09 | Field omitted | TC-API-019 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness not specified |
| EP-FR09-008 | FR-09 | Field present with null-like JSON value | TC-API-020 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling not specified |
| EP-FR09-009 | FR-09 | Field represented by a non-number JSON type | TC-API-021 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR09-010 | FR-09 | JSON-number representation associated with a user resource | TC-API-014, TC-API-096–TC-API-100, TC-API-107–TC-API-108, TC-API-110, TC-API-115 | BLOCKED | DEPENDENCY-DERIVED; User existence/identity semantics not specified |
| EP-FR09-011 | FR-09 | JSON-number representation not associated with a user resource | TC-API-022 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Missing-user behavior not specified |
| EP-FR09-012 | FR-09 | Field omitted | TC-API-023, TC-API-114 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness/identity semantics absent |
| EP-FR09-013 | FR-09 | Field present with null-like JSON value | TC-API-024 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling not specified |
| EP-FR09-014 | FR-09 | Field represented by a non-number JSON type | TC-API-025 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR09-015 | FR-09 | Header omitted | TC-API-014 | COVERED | BLOCKER-DRIVEN; Application authentication absent |
| EP-FR09-016 | FR-09 | Header present in any form | TC-API-026, TC-API-107, TC-API-114 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Effect and identity relationship absent |
| EP-FR09-017 | FR-09 | Header indicates a JSON representation | TC-API-014 | COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR09-018 | FR-09 | Header omitted | TC-API-027 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR09-019 | FR-09 | Header indicates a non-JSON representation | TC-API-028 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Media-type behavior absent |
| EP-FR09-020 | FR-09 | Bearer-form token associated with an Admin account | TC-API-029 | BLOCKED | DEPENDENCY-DERIVED; Admin enforcement is ambiguous |
| EP-FR09-021 | FR-09 | Bearer-form token associated with a non-Admin account | TC-API-030 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Admin label enforcement ambiguous |
| EP-FR09-022 | FR-09 | Header omitted | TC-API-031 | COVERED | SPEC-DERIVED; Violates explicit header requirement |
| EP-FR09-023 | FR-09 | Header present without documented Bearer form | TC-API-032 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR09-024 | FR-09 | Bearer-form token associated with an Admin account | TC-API-033, TC-API-037–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Both authentication and role requirements satisfied |
| EP-FR09-025 | FR-09 | Bearer-form token associated with a non-Admin account | TC-API-034 | COVERED | DEPENDENCY-DERIVED; Violates explicit Admin permission requirement |
| EP-FR09-026 | FR-09 | Header omitted | TC-API-035 | COVERED | SPEC-DERIVED; Violates explicit Bearer requirement |
| EP-FR09-027 | FR-09 | Header present without documented Bearer form | TC-API-036 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR09-028 | FR-09 | Field represented as a JSON string consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Overall creation validity unspecified |
| EP-FR09-029 | FR-09 | Field represented as a JSON string consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Allowed set and semantics unspecified |
| EP-FR09-030 | FR-09 | Field represented as a JSON number consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Bounds and relation to type unspecified |
| EP-FR09-031 | FR-09 | Field represented as a JSON number consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Bounds and application semantics unspecified |
| EP-FR09-032 | FR-09 | Field represented as a JSON string consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Format and expiration semantics unspecified |
| EP-FR09-033 | FR-09 | Field represented as a JSON number consistent with the example | TC-API-033–TC-API-038 | BLOCKED | SPEC-EXPLICIT; Bounds and usage semantics unspecified |
| EP-FR09-034 | FR-09 | Header indicates a JSON representation | TC-API-033–TC-API-036 | BLOCKED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR09-035 | FR-09 | Header omitted | TC-API-037 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR09-036 | FR-09 | Header indicates a non-JSON representation | TC-API-038 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Media-type behavior absent |
| EP-FR09-037 | FR-09 | Bearer-form token associated with an Admin account | TC-API-039, TC-API-043–TC-API-045 | MULTI_COVERED | SPEC-EXPLICIT; Both explicit requirements satisfied |
| EP-FR09-038 | FR-09 | Bearer-form token associated with a non-Admin account | TC-API-040 | COVERED | DEPENDENCY-DERIVED; Violates explicit Admin permission requirement |
| EP-FR09-039 | FR-09 | Header omitted | TC-API-041 | COVERED | SPEC-DERIVED; Violates explicit Bearer requirement |
| EP-FR09-040 | FR-09 | Header present without documented Bearer form | TC-API-042 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR09-041 | FR-09 | Path identifier associated with an existing coupon | TC-API-039–TC-API-042 | MULTI_COVERED | DEPENDENCY-DERIVED; Existence implied; response unspecified |
| EP-FR09-042 | FR-09 | Path identifier not associated with a coupon | TC-API-043 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Missing-resource behavior unspecified |
| EP-FR09-043 | FR-09 | Identifier segment omitted | TC-API-044 | COVERED | SPEC-DERIVED; Does not satisfy documented path shape |
| EP-FR09-044 | FR-09 | Identifier represented in an undocumented format/type region | TC-API-045 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; ID domain unspecified |
| EP-FR18-001 | FR-18 | Bearer-form token associated with an Admin account | TC-API-046, TC-API-116–TC-API-120, TC-API-128 | MULTI_COVERED | SPEC-EXPLICIT; Both explicit requirements satisfied |
| EP-FR18-002 | FR-18 | Bearer-form token associated with a non-Admin account | TC-API-047 | COVERED | DEPENDENCY-DERIVED; Violates Admin permission requirement |
| EP-FR18-003 | FR-18 | Header omitted | TC-API-048 | COVERED | SPEC-DERIVED; Violates Bearer requirement |
| EP-FR18-004 | FR-18 | Header present without documented Bearer form | TC-API-049 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR18-005 | FR-18 | Bearer-form token associated with an Admin account | TC-API-050–TC-API-054, TC-API-058–TC-API-066 | BLOCKED | SPEC-EXPLICIT; Both explicit requirements satisfied |
| EP-FR18-006 | FR-18 | Bearer-form token associated with a non-Admin account | TC-API-055, TC-API-129 | MULTI_COVERED | DEPENDENCY-DERIVED; Violates Admin permission requirement |
| EP-FR18-007 | FR-18 | Header omitted | TC-API-056 | COVERED | SPEC-DERIVED; Violates Bearer requirement |
| EP-FR18-008 | FR-18 | Header present without documented Bearer form | TC-API-057 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR18-009 | FR-18 | Path identifier associated with an existing order | TC-API-050–TC-API-057, TC-API-061–TC-API-066, TC-API-121, TC-API-124, TC-API-126–TC-API-128 | BLOCKED | DEPENDENCY-DERIVED; Existing resource implied; status behavior also dependent |
| EP-FR18-010 | FR-18 | Path identifier not associated with an order | TC-API-058 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Missing-resource behavior unspecified |
| EP-FR18-011 | FR-18 | Identifier segment omitted | TC-API-059 | COVERED | SPEC-DERIVED; Does not satisfy documented path shape |
| EP-FR18-012 | FR-18 | Identifier represented in an undocumented format/type region | TC-API-060 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; ID type/range unspecified |
| EP-FR18-013 | FR-18 | Requested target is `pending` | TC-API-050, TC-API-121, TC-API-124–TC-API-128 | BLOCKED | DEPENDENCY-DERIVED; Depends on current order state; transition rule absent |
| EP-FR18-014 | FR-18 | Requested target is `confirmed` | TC-API-051, TC-API-055–TC-API-060, TC-API-065–TC-API-066, TC-API-125–TC-API-126 | BLOCKED | DEPENDENCY-DERIVED; Example target; source-state rule absent |
| EP-FR18-015 | FR-18 | Requested target is `shipping` | TC-API-052, TC-API-125 | BLOCKED | DEPENDENCY-DERIVED; Depends on current state; transition rule absent |
| EP-FR18-016 | FR-18 | Requested target is `delivered` | TC-API-053, TC-API-125 | BLOCKED | DEPENDENCY-DERIVED; Depends on current state; transition rule absent |
| EP-FR18-017 | FR-18 | Requested target is `canceled` | TC-API-054, TC-API-125 | BLOCKED | DEPENDENCY-DERIVED; Admin transition rule absent |
| EP-FR18-018 | FR-18 | Value outside the documented status vocabulary | TC-API-061, TC-API-129 | MULTI_COVERED | SPEC-DERIVED; Outside the explicit set of order statuses |
| EP-FR18-019 | FR-18 | Field omitted | TC-API-062, TC-API-122–TC-API-123 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Requiredness unspecified |
| EP-FR18-020 | FR-18 | Field present with null-like JSON value | TC-API-063 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Null handling and type rule unspecified |
| EP-FR18-021 | FR-18 | Field represented by a non-string JSON type | TC-API-064 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Normative type not specified |
| EP-FR18-022 | FR-18 | Header indicates a JSON representation | TC-API-050–TC-API-064 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR18-023 | FR-18 | Header omitted | TC-API-065 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Header requirement absent |
| EP-FR18-024 | FR-18 | Header indicates a non-JSON representation | TC-API-066 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Media-type behavior absent |
| EP-FR18-025 | FR-18 support | Header follows documented Bearer form | TC-API-067, TC-API-070–TC-API-073 | BLOCKED | SPEC-EXPLICIT; Token validity/role behavior otherwise unspecified |
| EP-FR18-026 | FR-18 support | Header omitted | TC-API-068 | COVERED | SPEC-DERIVED; Violates Section 4 Bearer requirement |
| EP-FR18-027 | FR-18 support | Header present without documented Bearer form | TC-API-069 | COVERED | SPEC-DERIVED; Violates explicit header syntax |
| EP-FR18-028 | FR-18 support | Existing order satisfying textual condition “chưa giao” | TC-API-067–TC-API-069 | BLOCKED | DEPENDENCY-DERIVED; Transition target is `canceled`; status mapping ambiguous |
| EP-FR18-029 | FR-18 support | Existing order not satisfying textual condition “chưa giao” | TC-API-070 | BLOCKED | DEPENDENCY-DERIVED; Cancellation explicitly restricted |
| EP-FR18-030 | FR-18 support | Path identifier not associated with an order | TC-API-071 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; Missing-resource behavior unspecified |
| EP-FR18-031 | FR-18 support | Identifier segment omitted | TC-API-072 | COVERED | SPEC-DERIVED; Does not satisfy documented path shape |
| EP-FR18-032 | FR-18 support | Identifier represented in an undocumented format/type region | TC-API-073 | EXPLORATORY_COVERED | BLOCKER-DRIVEN; ID type/range unspecified |

```text
UNTESTED_AND_TESTABLE EPs:
NONE DETECTED
```

All 91 EP items are represented by existing logical coverage. This result does not prove completeness beyond the documented partition model.

## 6. Technique Saturation

| Technique | FR-02 Existing IDs | FR-09 Existing IDs | FR-18 Existing IDs | Saturation |
| --- | --- | --- | --- | --- |
| Equivalence Partitioning | TC-API-001–TC-API-013, TC-API-074–TC-API-087, TC-API-089–TC-API-091, TC-API-094–TC-API-095 | TC-API-014–TC-API-045, TC-API-096–TC-API-115 | TC-API-046–TC-API-073, TC-API-116–TC-API-129 | HEAVILY_COVERED |
| Boundary Value Analysis | NONE | NONE | NONE | NOT_APPLICABLE — no specification-backed executable boundaries |
| State testing | TC-API-013, TC-API-090–TC-API-093 | TC-API-108, TC-API-110 | TC-API-050–TC-API-054, TC-API-067, TC-API-070, TC-API-125–TC-API-126, TC-API-128 | BLOCKER_LIMITED |
| Authentication | TC-API-001–TC-API-002, TC-API-006, TC-API-089 | TC-API-031–TC-API-032, TC-API-035–TC-API-036, TC-API-041–TC-API-042 | TC-API-048–TC-API-049, TC-API-056–TC-API-057, TC-API-068–TC-API-069 | MULTIPLE_CASES |
| Authorization | NONE | TC-API-029–TC-API-030, TC-API-034, TC-API-040 | TC-API-047, TC-API-055 | MULTIPLE_CASES / FR-02 NOT_APPLICABLE |
| Response schema | TC-API-074–TC-API-077 | TC-API-096–TC-API-100 | TC-API-116, TC-API-118, TC-API-121 | PARTIAL_OR_EXPLORATORY |
| Security | TC-API-094–TC-API-095 | TC-API-026, TC-API-107, TC-API-114 | TC-API-129 | SECURITY_DEFINITION_LIMITED |
| Robustness | TC-API-010–TC-API-012, TC-API-078–TC-API-083, TC-API-088 | TC-API-027–TC-API-028, TC-API-037–TC-API-038, TC-API-045, TC-API-106, TC-API-115 | TC-API-065–TC-API-066, TC-API-073, TC-API-119, TC-API-122–TC-API-124 | HEAVILY_COVERED |
| Interaction testing | TC-API-081–TC-API-083, TC-API-094 | TC-API-026, TC-API-099–TC-API-100, TC-API-107, TC-API-110–TC-API-115 | TC-API-124–TC-API-129 | MULTIPLE_CASES |
| Repeated-operation behavior | TC-API-013, TC-API-089–TC-API-093 | TC-API-108, TC-API-110 | TC-API-120, TC-API-126, TC-API-128 | BLOCKER_OR_EXPLORATORY_LIMITED |

## 7. Unresolved Areas

| UA-ID | Feature | Unresolved Area | Cause | Already Represented by Existing Tests? | Student Investigation Value |
| --- | --- | --- | --- | --- | --- |
| UA-001 | FR-02 | Normative requiredness, type, and validation contract for login fields | SPEC_GAP | YES | HIGH |
| UA-002 | FR-02 | Failed-attempt counter and lockout threshold | LIMITED_STATE_MODEL | YES | HIGH |
| UA-003 | FR-02 | Lock duration, reset, and unlock behavior | LIMITED_STATE_MODEL | YES | HIGH |
| UA-004 | FR-02 | Failure status and error representation | LIMITED_SCHEMA | YES | MEDIUM |
| UA-005 | FR-02 | Complete user-information schema and permitted field exposure | LIMITED_SCHEMA | PARTIAL | HIGH |
| UA-006 | FR-02 | JWT claims, lifetime, reuse, and invalidation semantics | SPEC_GAP | YES | MEDIUM |
| UA-007 | FR-02 | Missing SEC-01–SEC-07 definitions | SECURITY_DEFINITION_MISSING | PARTIAL | HIGH |
| UA-008 | FR-09 | Requiredness and normative domains of application inputs | SPEC_GAP | YES | HIGH |
| UA-009 | FR-09 | Coupon applicability, eligibility, expiration, threshold, and usage semantics | BLOCKER | YES | HIGH |
| UA-010 | FR-09 | Discount calculation formula and rounding | BLOCKER | YES | HIGH |
| UA-011 | FR-09 | Authentication identity and body user relationship | SPEC_GAP | YES | HIGH |
| UA-012 | FR-09 | Application response types and value relationships | LIMITED_SCHEMA | PARTIAL | MEDIUM |
| UA-013 | FR-09 | Admin enforcement semantics for coupon listing | SPEC_GAP | YES | MEDIUM |
| UA-014 | FR-09 | Coupon-creation field contracts | SPEC_GAP | YES | HIGH |
| UA-015 | FR-09 | Coupon identifier domain and missing-resource response details | LIMITED_SCHEMA | YES | MEDIUM |
| UA-016 | FR-09 | Missing SEC-01–SEC-07 definitions | SECURITY_DEFINITION_MISSING | PARTIAL | HIGH |
| UA-017 | FR-18 | Admin order-list response schema and ordering | LIMITED_SCHEMA | YES | MEDIUM |
| UA-018 | FR-18 | Allowed source-to-target order transition model | LIMITED_STATE_MODEL | YES | HIGH |
| UA-019 | FR-18 | Status-update response and persistence contract | LIMITED_SCHEMA | YES | HIGH |
| UA-020 | FR-18 | Order identifier domain and missing-resource response details | SPEC_GAP | YES | MEDIUM |
| UA-021 | FR-18 | Mapping of “chưa giao” to documented order states | LIMITED_STATE_MODEL | YES | HIGH |
| UA-022 | FR-18 | Conflict, concurrency, and read-after-write semantics | LIMITED_STATE_MODEL | YES | MEDIUM |
| UA-023 | FR-18 | Missing SEC-01–SEC-07 definitions | SECURITY_DEFINITION_MISSING | PARTIAL | HIGH |

An unresolved area describes missing knowledge or evidence only; it is not a testcase objective.

## 8. Gap Classification

| Gap ID | Feature | Area | Gap Type | Evidence | Requires New Test? |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | ALL | Documented and testable TB/EP with no meaningful testcase | TYPE A — Genuine Test-Design Gap | None confirmed: 36/36 TB and 91/91 EP have traceability | POSSIBLY — HUMAN DECISION |
| GAP-002 | FR-02 | Lockout threshold, duration, reset, and unlock rules | TYPE B — Specification Gap | BLK-FR02-002, BLK-FR02-003 | BLOCKED |
| GAP-003 | FR-02 | Unspecified input and failure representations already observed | TYPE C — Existing Exploratory Coverage | Existing exploratory login cases and EP-FR02-002–015 | NO |
| GAP-004 | FR-09 | Eligibility, usage, formula, and rounding rules | TYPE B — Specification Gap | BLK-FR09-002, BLK-FR09-003, BLK-FR09-005, BLK-FR09-006 | BLOCKED |
| GAP-005 | FR-09 | Unspecified input and schema behavior already observed | TYPE C — Existing Exploratory Coverage | Existing application/admin exploratory cases | NO |
| GAP-006 | FR-18 | Allowed order transitions and persistence semantics | TYPE B — Specification Gap | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | BLOCKED |
| GAP-007 | FR-18 | Unspecified ID/body/schema handling already observed | TYPE C — Existing Exploratory Coverage | Existing Admin order exploratory cases | NO |
| GAP-008 | ALL | Additional coverage with the same objective, TB, EP, state relation, and oracle | TYPE D — Duplicate Opportunity Only | Current 129-case traceability and duplicate analysis | NO |
| GAP-009 | FR-02 | Numeric boundary analysis | TYPE E — Technique Not Applicable | Prompt 004 found no specification-backed executable boundary | NO |
| GAP-010 | FR-09 | Numeric or date boundary analysis | TYPE E — Technique Not Applicable | Prompt 004 found no specification-backed executable boundary | NO |
| GAP-011 | FR-18 | Identifier or state boundary analysis | TYPE E — Technique Not Applicable | Prompt 004 found no specification-backed executable boundary | NO |
| GAP-012 | ALL | Missing SEC-01–SEC-07 definitions | TYPE B — Specification Gap | BLK-ALL-001 | BLOCKED |

No confirmed Type A gap was detected. That conclusion records the current evidence review only and leaves the independent human decision open.

## 9. FR-02 Student Ideation Worksheet

### STUDENT-FR02-01

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-02

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-03

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-04

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-05

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-06

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-07

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR02-08

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

## 10. FR-09 Student Ideation Worksheet

### STUDENT-FR09-01

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-02

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-03

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-04

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-05

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-06

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-07

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR09-08

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

## 11. FR-18 Student Ideation Worksheet

### STUDENT-FR18-01

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-02

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-03

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-04

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-05

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-06

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-07

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

### STUDENT-FR18-08

```text
Student Test Idea:
STUDENT TO COMPLETE

Requirement / behavior being targeted:
STUDENT TO COMPLETE

Why I believe the AI suite missed this:
STUDENT TO COMPLETE

Existing closest AI testcase(s):
STUDENT TO COMPLETE

Why my case is not a duplicate:
STUDENT TO COMPLETE

New coverage added:
STUDENT TO COMPLETE

Expected test technique:
STUDENT TO COMPLETE

Spec evidence / TB:
STUDENT TO COMPLETE

Potential blocker:
STUDENT TO COMPLETE
```

## 12. Student Reflection Questions

### FR-02

- What behavior surprised me as missing after reviewing all login tests?
- Is there a relationship between two already-tested dimensions that AI never combined?
- Is there an observable security concern not already isolated?
- Does any current exploratory case hide a narrower independently useful objective?
- What would I personally test first if I had only five additional tests?

### FR-09

- Which coupon behavior would I distrust most despite the existing 35 cases?
- Is any business interaction insufficiently isolated?
- Is there any relationship between identity, coupon, total, and repeated use that I independently consider important?
- Are existing schema observations enough for my testing goals?
- What would I manually test that the AI suite does not express distinctly?

### FR-18

- Which Admin order operation has the greatest residual risk?
- Is there any interaction between authorization and state that I independently want to isolate?
- Is mutation isolation adequately represented?
- Is there any persistence concern that I personally consider important?
- What five tests would I prioritize if this were a production Admin API?

## 13. Future Duplicate-Check Procedure

Do not run this procedure until the student has supplied an idea. For each later student idea:

1. Determine whether an AI case already has the same logical objective.
2. Compare the TB coverage.
3. Compare the EP coverage.
4. Compare the state relation.
5. Compare the security objective.
6. Determine whether the idea adds a new oracle.
7. Determine whether it adds a new interaction.
8. Determine whether it adds any meaningful coverage.

If every comparison indicates existing logical coverage, classify the idea:

```text
DUPLICATE
```

Otherwise classify it:

```text
POTENTIALLY_NEW
```

This procedure validates a student-originated idea; it does not generate or rewrite the idea.

## 14. Student Authorship Record

### Student Extension Authorship Record

| Student Idea ID | Date | Idea Written By | AI Involvement at Ideation Stage | Later AI Validation Allowed? |
| --- | --- | --- | --- | --- |

Rows remain empty until the student independently writes ideas.

## 15. Extension Compliance Status

```text
NOT YET SATISFIED
```

```text
STUDENT EXTENSION RESULT

Student independently reviewed the AI-generated suite but
did not identify five additional non-duplicate tests per
selected feature.

Assignment extension requirement:
NOT SATISFIED

Reason:
No fabricated HUMAN_ADDED tests were created merely to
satisfy the numeric requirement.
```

## 16. Current Project Status

```text
AI TEST GENERATION: COMPLETE
AI TEST QUOTA: COMPLETE
STUDENT HUMAN AUDIT: COMPLETE
HUMAN AUDIT CORRECTIONS: COMPLETE

STUDENT EXTENSION REASSESSMENT: COMPLETE
STUDENT-ADDED TEST EXTENSION: NOT YET SATISFIED
CONCRETE TEST DATA DESIGN: NOT STARTED
POSTMAN IMPLEMENTATION: NOT STARTED
API EXECUTION: NOT STARTED
```

## 17. Machine-Usable Summary

```text
PROMPT_009_SUMMARY

Existing AI-generated cases:
129
FR-02 AI quota:
35
FR-09 AI quota:
35
FR-18 AI quota:
35

Genuine uncovered testable areas:
FR-02:
0 CONFIRMED
FR-09:
0 CONFIRMED
FR-18:
0 CONFIRMED

Student idea slots completed:
FR-02:
0
FR-09:
0
FR-18:
0

Accepted HUMAN_ADDED tests:
FR-02:
0
FR-09:
0
FR-18:
0

Student extension requirement:
NOT YET SATISFIED

Next action:
STUDENT INDEPENDENT IDEATION
```

