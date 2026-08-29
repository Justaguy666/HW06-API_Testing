# Prompt 014 — FR-07 Boundary Value Analysis

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded Pool B:

* **FR-09: Discount Coupons**

Prompt 013 completed FR-07 domain modeling and equivalence partitioning.

Current authoritative FR-07 baseline:

```text
FR-07 endpoints / operations: 2
FR-07 parameters: 6
FR-07 derived dimensions: 5

FR-07 verified test-basis items: 13
FR-07 blockers: 12

Equivalence partitions: 36
VALID: 9
INVALID: 0
CONDITIONAL: 4
EXPLORATORY: 23

Execution:
READY: 9
BLOCKED: 6
EXPLORATORY_ONLY: 21

Interaction dimensions: 11

Unaccounted TB items: 0
Unaccounted blockers: 0
Non-atomic EPs: 0
Unsupported boundaries introduced: 0

FR-07 testcases: 0
FR-07 quota: 0 / 35

BVA readiness:
READY_FOR_BVA_ANALYSIS
```

Authoritative domain artifact:

```text
analysis/fr07-domain-model.md
```

Authoritative verified basis:

```text
analysis/fr07-verified-test-basis.md
```

---

# 1. Purpose

Perform a rigorous Boundary Value Analysis for FR-07.

The purpose is to determine whether any FR-07 input/domain dimension has a **specification-backed ordered boundary** suitable for classical BVA.

The transformation is:

```text
Verified FR-07 Test Basis
        +
FR-07 Domain Model
        ↓
Ordered-Domain Audit
        ↓
Specification Boundary Verification
        ↓
Boundary Value Analysis
```

Your tasks are:

1. inspect every FR-07 parameter and derived domain dimension,
2. determine whether it is ordered,
3. determine whether explicit boundaries exist,
4. distinguish specification boundaries from merely interesting numeric values,
5. create BVA boundary records only where justified,
6. explicitly document N/A when no specification-backed boundary exists,
7. preserve blocker-driven uncertainty,
8. prepare authoritative BVA conclusions for logical test generation.

Do not generate logical testcases.

Do not generate Postman data.

Do not invent boundaries.

---

# 2. Authoritative Sources

Use:

```text
eshop-sut/api_specification.md
analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
```

Historical context may be inspected only as needed:

```text
analysis/fr07-requirement-analysis.md
analysis/pool-b-feature-switch.md
```

Do not use:

* backend implementation,
* frontend code,
* database schema,
* README behavior,
* runtime observations,
* Postman,
* Newman,
* previous execution evidence.

---

# 3. Scope

Work only on:

```text
FR-07 — Cart
```

Do not modify or re-run analysis for:

```text
FR-02
FR-18
```

Keep:

```text
FR-09 — SUPERSEDED / HISTORICAL ONLY
```

---

# 4. Core BVA Rule

Classical BVA requires a meaningful ordered domain with an authoritative boundary.

A value being numeric does **not** automatically imply that BVA is applicable.

Examples:

```text
quantity is numeric
```

does NOT establish:

```text
minimum = 1
maximum = N
zero invalid
negative invalid
fractional invalid
```

unless the specification explicitly states those rules.

Similarly:

```text
product_id is numeric-looking
```

does not establish a semantic minimum or maximum.

---

# 5. Boundary Evidence Classification

For every potential boundary use exactly one:

```text
SPEC_EXPLICIT
SPEC_DERIVED
TYPE_LIMIT_ONLY
EXAMPLE_LITERAL_ONLY
BLOCKER_UNRESOLVED
NO_BOUNDARY
```

Definitions:

## SPEC_EXPLICIT

The API specification explicitly states the boundary.

Example structure:

```text
quantity >= X
```

## SPEC_DERIVED

A true boundary follows directly and unambiguously from a documented ordered rule.

Use sparingly.

## TYPE_LIMIT_ONLY

A programming/data representation may theoretically have a type limit, but the API contract does not define it as a business/API boundary.

This is NOT sufficient for normal BVA.

## EXAMPLE_LITERAL_ONLY

A literal appears in an example but does not define a range boundary.

Examples:

```text
price = 100000
name = "Sản phẩm A"
```

## BLOCKER_UNRESOLVED

A boundary-like rule may exist but is unspecified.

## NO_BOUNDARY

The dimension is not meaningfully bounded by the specification.

---

# 6. BVA Applicability Classification

For every parameter/dimension classify:

```text
APPLICABLE
REVIEW_ONLY
NOT_APPLICABLE
BLOCKED
```

Definitions:

### APPLICABLE

At least one authoritative ordered boundary exists.

### REVIEW_ONLY

The domain is ordered/numeric, but no specification-backed boundary exists.

### NOT_APPLICABLE

The domain is categorical/non-ordered or BVA is conceptually inappropriate.

### BLOCKED

A potentially meaningful boundary depends on unresolved specification information.

---

# 7. Inventory All FR-07 Parameters and Dimensions

Review:

```text
PARAM-FR07-*
DIM-FR07-*
```

Required table:

| ID | Dimension | Endpoint / Context | Domain Type | Ordered? | BVA Applicability | Reason |
| -- | --------- | ------------------ | ----------- | -------- | ----------------- | ------ |

Domain Type:

* NUMERIC
* IDENTIFIER
* STRING
* ENUM_LIKE
* BOOLEAN_LIKE
* AUTH_CONTEXT
* RESOURCE_STATE
* SEQUENCE
* REPRESENTATION
* OTHER

Do not skip derived dimensions.

---

# 8. Quantity BVA Audit

Audit quantity in detail.

Required table:

| Quantity Property            | Specification Evidence | Boundary Exists? | Boundary Value | BVA Status |
| ---------------------------- | ---------------------- | ---------------- | -------------- | ---------- |
| Minimum                      |                        |                  |                |            |
| Maximum                      |                        |                  |                |            |
| Zero relationship            |                        |                  |                |            |
| Negative relationship        |                        |                  |                |            |
| Fractional relationship      |                        |                  |                |            |
| Integer-only constraint      |                        |                  |                |            |
| Stock-based upper limit      |                        |                  |                |            |
| Numeric representation limit |                        |                  |                |            |

Do not infer:

```text
minimum = 1
```

from common Cart behavior.

If no minimum/maximum exists:

```text
BVA Status = REVIEW_ONLY
```

---

# 9. Identifier BVA Audit

Audit every identifier dimension.

Potential identifiers may include, only where present:

* product identifier,
* cart/item identifier.

Required table:

| Identifier | Type Evidence | Ordered Semantically? | Explicit Min/Max? | BVA Applicable? | Reason |
| ---------- | ------------- | --------------------- | ----------------- | --------------- | ------ |

Important:

Even if an identifier is represented as a number:

```text
ID = 1
```

does not mean:

```text
0 is boundary
1 is minimum
MAX_INT is upper boundary
```

unless documented.

Existence vs non-existence is an EP/resource-domain issue, not BVA.

---

# 10. String / Representation BVA Audit

Inspect string-like or representation-like dimensions.

Examples may include:

* body members,
* authorization representation,
* string identifiers.

Determine whether the specification defines:

* minimum length,
* maximum length,
* exact length,
* allowed character count,
* format length.

Required table:

| Dimension | Length Constraint | Explicit Boundary? | BVA Status |
| --------- | ----------------- | ------------------ | ---------- |

If none exist:

```text
NOT_APPLICABLE
```

or:

```text
REVIEW_ONLY
```

as appropriate.

Do not invent empty-string boundaries unless the specification defines string non-emptiness.

---

# 11. Authentication BVA Audit

Authentication is generally categorical.

Verify whether any ordered domain exists.

Required result:

| Auth Dimension | Ordered? | Boundary? | BVA Status | Reason |
| -------------- | -------- | --------- | ---------- | ------ |

Do not manufacture boundary values for:

* token length,
* header length,
* JWT size,

unless specification defines them.

---

# 12. Resource-State BVA Audit

Inspect derived states such as:

```text
product exists / does not exist
item present / absent
cart before add / after add
```

These are state/equivalence dimensions, not classical numeric boundaries.

Required table:

| State Dimension | Ordered? | Classical BVA Applicable? | Better Technique |
| --------------- | -------- | ------------------------- | ---------------- |

Better Technique:

* EP
* STATE
* SEQUENCE
* INTERACTION
* RESOURCE_EXISTENCE

---

# 13. Repeated-Operation / Sequence BVA Audit

Inspect:

```text
single retrieval
repeated retrieval
add → retrieval
```

Determine whether repetition count has a specification boundary.

Do not infer:

```text
1 request
2 requests
N requests
```

as BVA merely because a sequence count exists.

Required table:

| Sequence Dimension | Count Boundary Defined? | BVA Status | Better Technique |
| ------------------ | ----------------------- | ---------- | ---------------- |

---

# 14. Price and Example Literal Audit

The specification contains literals including:

```text
name = "Sản phẩm A"
price = 100000
```

Audit them explicitly.

Required table:

| Literal | Role in Specification | Boundary Evidence? | BVA Use |
| ------- | --------------------- | ------------------ | ------- |

Expected principle:

```text
Example literal ≠ boundary
```

unless the specification explicitly defines it as such.

Do not generate:

```text
99999
100000
100001
```

solely because `100000` appears in an example.

---

# 15. EP-to-BVA Mapping

Review all:

```text
EP-FR07-001
...
EP-FR07-036
```

Required table:

| EP-ID | Dimension | Ordered? | Boundary Relation | BVA Candidate? | Reason |
| ----- | --------- | -------- | ----------------- | -------------- | ------ |

Boundary Relation:

* AT_BOUNDARY_CLASS
* BELOW_BOUNDARY_CLASS
* ABOVE_BOUNDARY_CLASS
* ORDERED_NO_BOUNDARY
* NON_ORDERED
* BLOCKED
* NOT_APPLICABLE

Do not alter EP classifications.

---

# 16. Blocker-to-BVA Mapping

Review all 12 FR-07 blockers.

Identify which blockers prevent legitimate BVA.

Required table:

| Blocker ID | Boundary Area | Effect on BVA | Resolution Needed? |
| ---------- | ------------- | ------------- | ------------------ |

Effect:

* PREVENTS_MINIMUM
* PREVENTS_MAXIMUM
* PREVENTS_VALIDITY_CLASSIFICATION
* PREVENTS_STOCK_BOUNDARY
* PREVENTS_LENGTH_BOUNDARY
* NO_BVA_EFFECT
* OTHER

---

# 17. Candidate Boundary Registry

Create a registry of every plausible boundary considered.

Required schema:

| BC-ID | Dimension | Candidate Boundary | Evidence Class | Accepted for BVA? | Reason |
| ----- | --------- | ------------------ | -------------- | ----------------- | ------ |

IDs:

```text
BC-FR07-001
BC-FR07-002
...
```

Important:

A candidate boundary may be rejected.

Example:

```text
Candidate: quantity = 0
Evidence: BLOCKER_UNRESOLVED
Accepted: NO
```

Do not convert rejected candidates into test inputs.

---

# 18. Accepted Boundary Registry

Only if a candidate boundary is supported:

assign:

```text
BV-FR07-001
BV-FR07-002
...
```

Required table:

| BV-ID | Dimension | Boundary Rule | Boundary Value / Symbol | Evidence | TB Refs | EP Refs |
| ----- | --------- | ------------- | ----------------------- | -------- | ------- | ------- |

If no accepted boundaries exist:

state exactly:

```text
Accepted FR-07 specification-backed boundaries: 0
```

This is a valid result.

---

# 19. Classical BVA Value Sets

Only for accepted boundaries, derive logical value positions:

```text
just below
at boundary
just above
```

or:

```text
min
min + delta
max - delta
max
```

where appropriate.

Do NOT generate concrete values when the specification does not provide enough information.

Required table only if accepted boundaries exist:

| BV-ID | Logical Position | Concrete Value Available? | Value | Basis |
| ----- | ---------------- | ------------------------- | ----- | ----- |

If no accepted boundaries exist:

omit actual values and explicitly report N/A.

---

# 20. Robustness vs BVA Separation

Distinguish BVA from robustness testing.

Potential future robustness ideas such as:

```text
very large number
negative number
fractional quantity
huge identifier
long string
```

must not automatically be labeled BVA.

Required table:

| Domain Class | BVA? | Robustness? | EP? | Reason |
| ------------ | ---- | ----------- | --- | ------ |

This distinction is critical.

---

# 21. BVA vs EP Separation

Do not duplicate equivalence partitions as BVA cases unless a true boundary exists.

Required principles:

```text
EP asks:
Which semantic/input class does this value belong to?

BVA asks:
What happens at the edge between ordered classes?
```

For FR-07, explicitly identify any EP classes that look numeric but do not have a documented edge.

---

# 22. BVA vs State Testing Separation

State changes such as:

```text
item absent → add → item present
```

are not BVA.

Repeated operation sequences are not BVA unless the spec defines a count threshold.

Required table:

| Candidate Concern | Correct Technique | Reason |
| ----------------- | ----------------- | ------ |

---

# 23. BVA vs Security Testing Separation

Do not classify malformed or missing authentication as BVA.

Use:

```text
AUTHENTICATION
SECURITY
ROBUSTNESS
EP
```

as appropriate.

---

# 24. BVA Coverage Matrix

Create:

| PARAM / DIM | Ordered? | Explicit Boundary | Candidate BC IDs | Accepted BV IDs | Final BVA Status |
| ----------- | -------- | ----------------- | ---------------- | --------------- | ---------------- |

Final BVA Status:

* COVERED_WITH_BVA
* REVIEWED_NO_BOUNDARY
* NOT_APPLICABLE
* BLOCKED

Every FR-07 parameter/dimension must appear.

---

# 25. Test-Basis BVA Traceability

Trace all 13 verified TB items.

Required table:

| TB-ID | BVA Relevant? | Boundary IDs | Reason |
| ----- | ------------- | ------------ | ------ |

Use:

* YES
* NO
* BLOCKED

Do not force every TB into BVA.

---

# 26. Interaction BVA Relevance

Review the 11:

```text
INT-FR07-*
```

Required table:

| INT-ID | Contains Ordered Boundary? | BVA Relevant? | Better Technique |
| ------ | -------------------------- | ------------- | ---------------- |

Most interaction relations may appropriately be:

```text
BVA Relevant = NO
```

---

# 27. Unsupported Boundary Audit

Search the analysis for any accidental assumptions such as:

```text
quantity >= 1
quantity > 0
product_id > 0
minimum product id = 1
maximum quantity
maximum cart size
stock limit
maximum request size
string minimum length
string maximum length
```

Required table:

| Suspected Boundary Claim | Found? | Supported? | Action |
| ------------------------ | ------ | ---------- | ------ |

Action:

* KEEP
* REMOVE
* RECLASSIFY_AS_EXPLORATORY
* NOT_PRESENT

Goal:

```text
Unsupported accepted boundaries = 0
```

---

# 28. Boundary Completeness Statement

Produce a precise statement answering:

```text
Does FR-07 contain any executable specification-backed
boundary suitable for classical Boundary Value Analysis?
```

Answer exactly one:

```text
YES
```

or:

```text
NO
```

Then explain why.

A `NO` answer is fully acceptable.

---

# 29. BVA Result Classification

Classify overall FR-07 BVA outcome:

```text
BVA_APPLICABLE
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
BVA_PARTIALLY_APPLICABLE
BVA_BLOCKED
```

Definitions:

### BVA_APPLICABLE

One or more usable specification-backed boundaries exist.

### BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC

No authoritative boundaries exist.

### BVA_PARTIALLY_APPLICABLE

Some domains have boundaries; others do not.

### BVA_BLOCKED

The specification clearly requires boundary-related behavior but lacks the actual values needed to model it.

---

# 30. Do Not Inflate Test Quota

The assignment later requires:

```text
FR-07 >= 35 AI-generated logical testcases
```

Do not use BVA to artificially inflate that number.

If BVA produces:

```text
0 cases
```

that is acceptable.

Later quota will be satisfied using legitimate:

* EP coverage,
* interaction coverage,
* state coverage,
* sequence coverage,
* authentication/security coverage,
* response/schema coverage,
* robustness/exploratory coverage.

---

# 31. BVA Output Count

Required table:

| Metric                            | Count |
| --------------------------------- | ----: |
| Candidate boundaries reviewed     |       |
| Accepted boundaries               |       |
| Rejected / unsupported boundaries |       |
| BVA logical value positions       |       |
| Concrete BVA values               |       |

Do not manufacture nonzero counts.

---

# 32. BVA Quality Validation

Validate:

| Check                                  | Result    | Notes |
| -------------------------------------- | --------- | ----- |
| All PARAMs reviewed                    | PASS/FAIL |       |
| All DIMs reviewed                      | PASS/FAIL |       |
| All 36 EPs mapped                      | PASS/FAIL |       |
| All 12 blockers considered             | PASS/FAIL |       |
| All 13 TBs traced                      | PASS/FAIL |       |
| All 11 interactions reviewed           | PASS/FAIL |       |
| No example literal treated as boundary | PASS/FAIL |       |
| No ID min/max invented                 | PASS/FAIL |       |
| No quantity minimum invented           | PASS/FAIL |       |
| No stock boundary invented             | PASS/FAIL |       |
| No BVA testcase generated              | PASS/FAIL |       |
| No concrete test payload generated     | PASS/FAIL |       |

---

# 33. Logical-Test-Design Readiness

After BVA, determine whether FR-07 is ready for initial logical test generation.

Required conditions:

```text
Domain model complete
EP inventory stable
Interaction inventory stable
BVA conclusion explicit
Unsupported boundaries removed
TB traceability complete
Blocker traceability complete
No testcases generated prematurely
```

Use:

```text
READY_FOR_LOGICAL_TEST_GENERATION
```

or:

```text
NOT_READY_FOR_LOGICAL_TEST_GENERATION
```

If not ready:

list exact structural issues.

Do not resolve missing rules by assumption.

---

# 34. Output Artifact

Create:

```text
analysis/fr07-boundary-value-analysis.md
```

This becomes the authoritative FR-07 BVA artifact.

Do not modify:

```text
analysis/boundary-value-analysis.md
```

from the historical combined FR-02/FR-09/FR-18 workflow.

Combined artifacts will be reconciled later.

---

# 35. Required Final Response Structure

Use exactly:

# Prompt 014 — FR-07 Boundary Value Analysis

## 1. Executive Summary

Include:

* parameter count,
* derived-dimension count,
* EP count,
* candidate boundaries,
* accepted boundaries,
* rejected boundaries,
* final BVA classification,
* logical-test-generation readiness.

---

## 2. BVA Method

---

## 3. Parameter and Dimension Applicability

---

## 4. Quantity Boundary Audit

---

## 5. Identifier Boundary Audit

---

## 6. String and Representation Boundary Audit

---

## 7. Authentication Boundary Audit

---

## 8. Resource-State Boundary Audit

---

## 9. Sequence Boundary Audit

---

## 10. Example Literal Audit

---

## 11. EP-to-BVA Mapping

36 EPs.

---

## 12. Blocker-to-BVA Mapping

12 blockers.

---

## 13. Candidate Boundary Registry

---

## 14. Accepted Boundary Registry

---

## 15. Classical BVA Value Positions

If none:

```text
N/A — no accepted specification-backed boundary.
```

---

## 16. Robustness vs BVA

---

## 17. BVA vs EP

---

## 18. BVA vs State Testing

---

## 19. BVA vs Security Testing

---

## 20. BVA Coverage Matrix

---

## 21. Test-Basis Traceability

13 TBs.

---

## 22. Interaction BVA Relevance

11 interactions.

---

## 23. Unsupported Boundary Audit

---

## 24. Boundary Completeness Statement

---

## 25. Overall BVA Classification

Use exactly one:

```text
BVA_APPLICABLE
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
BVA_PARTIALLY_APPLICABLE
BVA_BLOCKED
```

---

## 26. BVA Count Summary

---

## 27. Quality Validation

---

## 28. Logical-Test-Generation Readiness

Use exactly one:

```text
READY_FOR_LOGICAL_TEST_GENERATION
```

or:

```text
NOT_READY_FOR_LOGICAL_TEST_GENERATION
```

---

## 29. Current Project Status

Use:

```text
POOL B:
FR-07

FR-07 REQUIREMENT EXTRACTION:
COMPLETE

FR-07 TEST BASIS VERIFICATION:
COMPLETE

FR-07 DOMAIN MODEL:
COMPLETE

FR-07 BVA:
COMPLETE

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

---

## 30. Machine-Usable Summary

End exactly:

```text
PROMPT_014_SUMMARY

FR-07 parameters:
6

Derived dimensions:
5

Equivalence partitions:
36

Candidate boundaries reviewed:

Accepted specification-backed boundaries:

Rejected / unsupported boundaries:

BVA logical value positions:

Concrete BVA values:

FR-07 BVA classification:
BVA_APPLICABLE / BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC / BVA_PARTIALLY_APPLICABLE / BVA_BLOCKED

Unsupported accepted boundaries:

BVA testcases generated:
0

Logical test generation readiness:
READY_FOR_LOGICAL_TEST_GENERATION / NOT_READY_FOR_LOGICAL_TEST_GENERATION

FR-07 quota:
0 / 35

Next required prompt:
PROMPT 015 — FR-07 INITIAL LOGICAL TESTCASE GENERATION
```

---

# 36. Important Constraints

* Work only on FR-07.
* Preserve Prompt 013 EP IDs.
* Do not alter EP classifications.
* Do not generate logical testcases.
* Do not generate concrete test data.
* Do not create Postman requests.
* Do not execute APIs.
* Do not inspect implementation.
* Do not infer quantity minimum or maximum.
* Do not infer quantity >= 1.
* Do not infer quantity integer-only semantics.
* Do not infer product-ID boundaries.
* Do not infer item-ID boundaries.
* Do not infer stock limits.
* Do not infer maximum Cart size.
* Do not infer request-size boundaries.
* Do not infer string-length constraints.
* Do not use programming-language integer limits as API boundaries.
* Do not treat example literals as boundaries.
* Do not treat existence/non-existence as BVA.
* Do not treat state transitions as BVA.
* Do not treat malformed authentication as BVA.
* Do not invent SEC definitions.
* Do not inflate later quota through fake boundaries.

The objective is:

**FR-07 Domain Model → Defensible Boundary Analysis**

not:

**Find boundary values merely because the feature contains numeric inputs**.

---

# 37. Output Artifacts

Create:

```text
analysis/fr07-boundary-value-analysis.md
```

Log:

```text
prompts/Prompt-014-fr07-boundary-value-analysis.md
```

Append Prompt 014 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–013 historical prompt contents.
