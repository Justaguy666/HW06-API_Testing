# Prompt 013 — FR-07 Domain Modeling and Equivalence Partitioning

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded Pool B:

* **FR-09: Discount Coupons**

Prompt 012 completed verification and normalization of the FR-07 test basis.

Current authoritative FR-07 baseline:

```text
FR-07 endpoints / operations: 2
FR-07 parameters / test dimensions: 6
FR-07 verified test-basis items: 13
FR-07 blockers: 12

FR-07 EPs: 0
FR-07 BVA cases: 0
FR-07 testcases: 0

FR-07 quota:
0 / 35

Domain-modeling readiness:
READY_FOR_DOMAIN_MODELING
```

The authoritative FR-07 input artifact is:

```text
analysis/fr07-verified-test-basis.md
```

---

# 1. Purpose

Build the formal FR-07 domain model and equivalence partitions that will be used by later BVA and logical-test-design prompts.

The transformation is:

```text
Verified FR-07 Test Basis
        ↓
Parameter / State / Context Modeling
        ↓
Equivalence Partitions
        ↓
Coverage-Ready FR-07 Domain Model
```

Your tasks are:

1. model every testable FR-07 input/domain dimension,
2. construct specification-supported equivalence partitions,
3. preserve uncertainty as CONDITIONAL or EXPLORATORY,
4. model resource/state context where relevant,
5. model authentication and representation contexts separately,
6. identify cross-parameter interactions without converting them into testcases,
7. trace every partition to TB, parameter, and blocker IDs,
8. validate that every retained TB is accounted for,
9. prepare the basis for Prompt 014 BVA.

Do not generate BVA cases.

Do not generate testcases.

Do not generate concrete test values unless they are literal values explicitly provided by the specification and are needed only to document the domain.

---

# 2. Authoritative Sources

Primary authoritative source:

```text
eshop-sut/api_specification.md
```

Authoritative normalized FR-07 analysis:

```text
analysis/fr07-verified-test-basis.md
```

May also inspect for migration context:

```text
analysis/pool-b-feature-switch.md
analysis/fr07-requirement-analysis.md
```

Do not use:

* implementation source,
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

Preserve without modification:

```text
FR-02
FR-18
```

Keep:

```text
FR-09 — SUPERSEDED / HISTORICAL ONLY
```

Do not create FR-09 partitions.

---

# 4. Stable Existing IDs

Preserve all verified IDs from Prompt 012:

```text
OP-FR07-*
PARAM-FR07-*
TB-FR07-*
BLK-FR07-*
```

Do not renumber them.

Create equivalence partition IDs using:

```text
EP-FR07-001
EP-FR07-002
EP-FR07-003
...
```

Sequentially with no gaps in newly created EP IDs.

Do not reuse historical:

```text
EP-FR09-*
```

---

# 5. Domain Modeling Principles

Use equivalence partitioning only when a meaningful logical class can be justified from one of:

```text
SPEC_EXPLICIT
SPEC_DERIVED
TYPE_DERIVED
DEPENDENCY_DERIVED
BLOCKER_DRIVEN
```

Definitions:

## SPEC_EXPLICIT

The class is explicitly stated by the API specification.

## SPEC_DERIVED

The class follows directly from an explicitly documented operation/resource relationship without adding a business rule.

## TYPE_DERIVED

The specification establishes a representation/type and the partition distinguishes conforming versus non-conforming representations.

## DEPENDENCY_DERIVED

The partition represents a required supporting resource/context such as existence versus non-existence.

## BLOCKER_DRIVEN

The specification leaves a behavior undefined, but the dimension is still meaningful for exploratory testing.

Do not derive classes solely from:

```text
common API practice
REST convention
frontend expectations
typical cart behavior
implementation intuition
OWASP best practice
```

---

# 6. Partition Classification

Every EP must receive exactly one behavioral classification:

```text
VALID
INVALID
CONDITIONAL
EXPLORATORY
```

Use carefully.

## VALID

The specification supports that the class satisfies the documented requirement.

## INVALID

The specification explicitly supports that the class violates a documented requirement.

Do NOT mark something INVALID merely because it looks unusual.

## CONDITIONAL

Its validity depends on an unresolved business/resource/state rule.

## EXPLORATORY

The class is meaningful to exercise, but the specification does not define acceptance/rejection semantics.

Important:

```text
Unspecified ≠ Invalid
```

Prefer EXPLORATORY when behavior is not defined.

---

# 7. Execution Classification

Each EP must also have:

```text
Execution Status
```

Allowed:

* READY
* BLOCKED
* EXPLORATORY_ONLY

Rules:

### READY

Sufficient information exists to construct the logical class and later evaluate at least one supported oracle.

### BLOCKED

The partition requires a state/precondition/rule that cannot currently be established.

### EXPLORATORY_ONLY

The class can be exercised but its behavioral oracle remains unspecified.

Behavior classification and execution status are separate.

Example:

```text
Classification: EXPLORATORY
Execution Status: EXPLORATORY_ONLY
```

---

# 8. Inventory the Six Existing Parameters / Dimensions

Start from all six:

```text
PARAM-FR07-*
```

Required table:

| PARAM-ID | Endpoint | Dimension | Location | Verified Type / Shape | TB Refs | Blocker Refs | Domain Model Role |
| -------- | -------- | --------- | -------- | --------------------- | ------- | ------------ | ----------------- |

Domain Model Role:

* PRIMARY_INPUT
* AUTH_CONTEXT
* REPRESENTATION_CONTEXT
* RESOURCE_CONTEXT
* STATE_CONTEXT
* SUPPORTING_CONTEXT

Do not invent additional parameters merely to increase EP count.

---

# 9. Detect Legitimate Derived Dimensions

A derived domain dimension may be added only when it is necessary to model a verified TB or blocker and is not adequately represented by the six parameters.

Examples of possible dimension types, only if supported:

* product existence state,
* cart/item presence state,
* authentication state,
* repeated-operation context,
* read-after-write context.

If a derived dimension is needed, assign:

```text
DIM-FR07-001
DIM-FR07-002
...
```

Required table:

| DIM-ID | Dimension | Derivation Basis | Related TB | Related Blocker | Add? |
| ------ | --------- | ---------------- | ---------- | --------------- | ---- |

Do not call derived dimensions API parameters.

---

# 10. Endpoint Representation Context

Model representation-level domains separately where meaningful.

Possible representation dimensions include only if relevant:

* request body present/absent,
* JSON-shaped/non-JSON-shaped representation,
* documented member present/omitted,
* documented type/non-documented type.

Do not automatically generate all Cartesian combinations.

Required table:

| Endpoint | Representation Dimension | Supported Basis | Model as EP? | Reason |
| -------- | ------------------------ | --------------- | ------------ | ------ |

---

# 11. Authentication Domain

For each FR-07 endpoint model authentication only according to Prompt 012 verification.

Potential abstract classes:

```text
documented authentication context
missing authentication context
non-conforming authentication representation
```

only when justified.

Do not import FR-18 authentication behavior.

Required table:

| Endpoint | Auth Class | Basis | Classification | Oracle Support | Blocker |
| -------- | ---------- | ----- | -------------- | -------------- | ------- |

If the specification does not define missing/malformed behavior:

those classes should generally be:

```text
EXPLORATORY
```

not automatically INVALID.

---

# 12. Product Identifier Domain

Model the product/item identifier domain using only verified evidence.

Potential classes may include, if justified:

* existing resource reference,
* non-existing resource reference,
* omitted representation,
* null-like representation,
* wrong JSON type.

Do not assume:

```text
ID > 0
integer ID
UUID
numeric string
```

without evidence.

Required table:

| Logical Class | Evidence Basis | Behavioral Classification | Execution Status | Blocker |
| ------------- | -------------- | ------------------------- | ---------------- | ------- |

---

# 13. Quantity Domain

Model quantity carefully.

Distinguish:

1. documented representation/type,
2. resource/business meaning,
3. unsupported numeric assumptions.

Potential domain classes should be added only where justified.

Examples that may be modeled if specification permits:

```text
number-shaped quantity
omitted quantity
null-like quantity
non-number quantity
```

Numeric subclasses such as:

```text
zero
negative
fractional
very large
```

must NOT automatically be treated as specification partitions.

They may be modeled as EXPLORATORY only if logically useful and explicitly linked to the corresponding blocker.

Do not claim BVA.

Required table:

| Quantity Class | Basis | Classification | Execution | BVA Candidate? | Blocker |
| -------------- | ----- | -------------- | --------- | -------------- | ------- |

`BVA Candidate?`:

* YES_SPEC_BOUNDARY
* POSSIBLE_BUT_UNSPECIFIED
* NO

---

# 14. Resource Existence Domain

Model resource existence only where an operation depends on it.

Potential logical classes:

```text
referenced product exists
referenced product does not exist
```

and any cart/item state explicitly necessary.

Required table:

| Resource Context | Operation | Basis | Classification | Execution | Oracle Support |
| ---------------- | --------- | ----- | -------------- | --------- | -------------- |

Do not assume exact error status for missing resource.

---

# 15. Cart State Context

Determine whether logical state classes are required.

Candidate abstract state descriptions may include only when justified:

```text
cart before add
cart after add
item absent
item present
```

Do not create a formal state machine.

Required table:

| State Context | Evidence / Derivation | Related Operation | Related TB | Blocker |
| ------------- | --------------------- | ----------------- | ---------- | ------- |

Distinguish:

```text
SPEC_SUPPORTED_STATE
LOGICAL_SETUP_STATE
BLOCKED_STATE
```

---

# 16. Repeated-Operation Domain

Prompt 012 added a blocker for repeated retrieval/read-after-add consistency.

Model repeated-operation contexts if they are meaningful for later exploratory/state testing.

Possible abstract relations:

```text
single retrieval
repeated retrieval without intervening mutation
add followed by retrieval
```

only if supported as useful dimensions by TB/blocker traceability.

Do not assert what the responses must be unless specified.

Required table:

| Sequence Context | Related Operations | Classification | Execution | Oracle Type | Blocker |
| ---------------- | ------------------ | -------------- | --------- | ----------- | ------- |

Oracle Type:

* DETERMINISTIC
* PARTIAL
* OBSERVATIONAL
* NONE

---

# 17. Response-Domain Modeling

Response fields are primarily oracle dimensions rather than request partitions.

Do not create EPs for every undocumented response member.

Instead classify response-contract dimensions:

| Response Aspect | Endpoint | Support | Downstream Test Value |
| --------------- | -------- | ------- | --------------------- |

Support:

* FULL
* PARTIAL
* UNSPECIFIED

Downstream Test Value:

* DETERMINISTIC_ORACLE
* PARTIAL_ORACLE
* OBSERVATION_ONLY

Only create an EP if the response itself constitutes a meaningful input/state domain for a later interaction.

---

# 18. Calculation / Price Domain

The specification contains literal example values such as:

```text
name = "Sản phẩm A"
price = 100000
```

Treat literal example values carefully.

They may document:

```text
example response representation
```

but must not automatically establish:

* a general price boundary,
* required value,
* currency rule,
* calculation formula,
* minimum/maximum.

Do not create an EP like:

```text
price = 100000 VALID
price != 100000 INVALID
```

unless the specification explicitly requires that.

Required table:

| Price / Calculation Aspect | Basis | Partition Needed? | Reason |
| -------------------------- | ----- | ----------------- | ------ |

---

# 19. Create Equivalence Partitions

For every final EP use this schema:

| Field                 | Required |
| --------------------- | -------- |
| EP-ID                 | YES      |
| Feature               | YES      |
| Endpoint / Context    | YES      |
| PARAM-ID / DIM-ID     | YES      |
| Partition Description | YES      |
| Basis                 | YES      |
| Classification        | YES      |
| Execution Status      | YES      |
| TB Refs               | YES      |
| Blocker Refs          | YES      |
| Oracle Support        | YES      |
| BVA Relevance         | YES      |
| Notes                 | YES      |

Oracle Support:

* DETERMINISTIC
* PARTIAL
* OBSERVATIONAL
* NONE

BVA Relevance:

* SPEC_BOUNDARY
* ORDERED_DOMAIN_NO_BOUNDARY
* NON_ORDERED_DOMAIN
* UNSPECIFIED_BOUNDARY
* NOT_APPLICABLE

---

# 20. Partition Atomicity

Each EP must represent one logical equivalence class.

Do not combine unrelated factors.

Bad:

```text
missing product_id and invalid quantity
```

Good:

```text
product identifier omitted
```

Interaction between partitions belongs in the interaction inventory, not in an individual EP.

Required validation table:

| EP-ID | Atomic? | Issue | Action |
| ----- | ------- | ----- | ------ |

Goal:

```text
Non-atomic EPs unresolved = 0
```

---

# 21. Partition Disjointness

Within the same parameter/dimension, partitions should be logically distinguishable.

Identify accidental overlaps.

Required table:

| PARAM / DIM | EP-A | EP-B | Overlap? | Resolution |
| ----------- | ---- | ---- | -------- | ---------- |

Resolution:

* DISJOINT
* ACCEPTABLE_CONTEXTUAL_OVERLAP
* REFINE
* REMOVE

Do not force mathematical disjointness where blocker-driven exploratory classes naturally overlap; explain it.

---

# 22. Partition Completeness

For each parameter/dimension assess whether the modeled EPs reasonably account for the testable domain supported by the current specification.

Use:

* COMPLETE_FOR_SPEC
* PARTIAL_DUE_TO_BLOCKER
* PARTIAL_BY_DESIGN
* NOT_APPLICABLE

Required table:

| PARAM / DIM | EP IDs | Completeness | Missing Area | Blocker |
| ----------- | ------ | ------------ | ------------ | ------- |

Do not claim universal input-space completeness.

`COMPLETE_FOR_SPEC` means only complete relative to the available specification.

---

# 23. Interaction Inventory

Because later test generation must reach ≥35 meaningful cases without superficial variants, create an interaction inventory.

Do NOT create interaction testcases.

Identify meaningful relationships among already-modeled dimensions.

Required schema:

| INT-ID | Dimension A | Dimension B / Sequence | Why Interaction Matters | TB Refs | Blocker | Candidate Technique |
| ------ | ----------- | ---------------------- | ----------------------- | ------- | ------- | ------------------- |

IDs:

```text
INT-FR07-001
INT-FR07-002
...
```

Candidate Technique:

* INTERACTION
* STATE
* SEQUENCE
* AUTHENTICATION
* RESOURCE
* ROBUSTNESS
* CONTRACT

Examples of structure only:

```text
auth context × cart operation
product existence × add operation
add mutation → retrieval observation
```

Do not state expected outcomes if unspecified.

---

# 24. Avoid Cartesian Explosion

Do not claim every EP combination deserves a separate testcase.

For every interaction included, require at least one rationale:

```text
different business risk
different state implication
different authorization context
different resource existence dependency
different observable contract
different sequence semantics
```

Reject interactions that differ only by superficial values.

Required summary:

```text
Potential Cartesian combinations:
Meaningful interactions retained:
Superficial combinations excluded:
```

The exact number of Cartesian combinations is optional if calculating it would be misleading because dimensions are endpoint-specific.

---

# 25. Test-Basis Coverage

Trace all 13 verified TBs.

Required table:

| TB-ID | Related PARAM / DIM | Related EP IDs | Interaction IDs | Coverage Status |
| ----- | ------------------- | -------------- | --------------- | --------------- |

Coverage Status:

* COVERED
* PARTIAL
* BLOCKED
* CONTEXT_ONLY

Goal:

```text
Unaccounted verified TBs = 0
```

A TB does not need a unique EP if it is an oracle/dependency/context rule.

---

# 26. Parameter Coverage

Required table:

| PARAM-ID | EP Count | EP IDs | TB Coverage | Status |
| -------- | -------: | ------ | ----------- | ------ |

Every retained primary input parameter should have meaningful domain treatment.

If no partitions are appropriate:

state why.

---

# 27. Blocker Coverage

Trace all 12 current blockers.

Required table:

| Blocker ID | Affected PARAM / DIM | Affected EP IDs | Affected Interaction IDs | Effect |
| ---------- | -------------------- | --------------- | ------------------------ | ------ |

Effect:

* CLASSIFICATION_UNCERTAINTY
* ORACLE_UNCERTAINTY
* PRECONDITION_BLOCK
* STATE_BLOCK
* SCHEMA_BLOCK
* SECURITY_BLOCK
* BVA_BLOCK

Goal:

```text
Unaccounted FR-07 blockers = 0
```

---

# 28. Security Gap Handling

If:

```text
BLK-ALL-001
```

still applies because SEC-01–SEC-07 definitions are missing:

preserve it.

Do not fabricate security partitions merely to satisfy security coverage.

Authentication/ownership-related classes may still be modeled from FR-07-specific specification evidence.

Clearly distinguish:

```text
FR07_SPEC_SECURITY_CONTEXT
```

from:

```text
SEC_01_TO_SEC_07_REQUIREMENTS
```

---

# 29. BVA Candidate Audit

Prompt 014 will perform actual BVA analysis.

Here only classify each ordered/numeric-like domain.

Required table:

| PARAM / DIM | Ordered? | Explicit Boundary? | Candidate for Prompt 014 | Reason |
| ----------- | -------- | ------------------ | ------------------------ | ------ |

Candidate:

* YES
* REVIEW_ONLY
* NO

Important:

Do not produce:

```text
min-1
min
min+1
```

or any actual boundary cases.

If quantity has no explicit lower/upper specification:

use:

```text
Explicit Boundary: NO
Candidate: REVIEW_ONLY
```

---

# 30. EP Count Quality Check

Do not target an arbitrary number of EPs.

The count should emerge from the specification.

Validate:

```text
Each EP has a unique purpose.
No EP exists solely to inflate later testcase count.
No literal-value variants were split without semantic reason.
No undocumented numeric boundary was introduced.
No feature-neighbor behavior was absorbed into FR-07.
```

Report:

| Quality Check | Result | Notes |
| ------------- | ------ | ----- |

Result:

* PASS
* FAIL

---

# 31. Classification Summary

Required counts:

| Classification | Count |
| -------------- | ----: |
| VALID          |       |
| INVALID        |       |
| CONDITIONAL    |       |
| EXPLORATORY    |       |
| TOTAL          |       |

Also:

| Execution Status | Count |
| ---------------- | ----: |
| READY            |       |
| BLOCKED          |       |
| EXPLORATORY_ONLY |       |
| TOTAL            |       |

Do not force any category to be nonzero.

In particular, `INVALID = 0` is acceptable if the specification defines no deterministic invalid classes.

---

# 32. Basis Summary

Required table:

| Basis              | EP Count |
| ------------------ | -------: |
| SPEC_EXPLICIT      |          |
| SPEC_DERIVED       |          |
| TYPE_DERIVED       |          |
| DEPENDENCY_DERIVED |          |
| BLOCKER_DRIVEN     |          |

---

# 33. Domain Modeling Readiness for BVA

Validate:

* all six parameters reviewed,
* derived dimensions justified,
* 13 TB items accounted for,
* 12 FR-07 blockers accounted for,
* EP IDs unique,
* EPs atomic,
* no unsupported boundary introduced,
* interactions inventoried,
* no testcases generated.

Use:

```text
READY_FOR_BVA_ANALYSIS
```

or:

```text
NOT_READY_FOR_BVA_ANALYSIS
```

If not ready, list exact structural problems.

---

# 34. Output Artifact

Create:

```text
analysis/fr07-domain-model.md
```

This artifact becomes the authoritative FR-07 domain/EP input for Prompt 014.

Do not modify historical combined:

```text
analysis/domain-model.md
```

yet.

Combined selected-feature artifacts will be rebuilt later.

---

# 35. Required Final Response Structure

Use exactly:

# Prompt 013 — FR-07 Domain Modeling and Equivalence Partitioning

## 1. Executive Summary

Include:

* endpoints,
* parameters,
* derived dimensions,
* TB count,
* blocker count,
* EP total,
* classification counts,
* execution-status counts,
* interaction count,
* BVA readiness.

---

## 2. Parameter and Dimension Inventory

PARAM + DIM tables.

---

## 3. Representation Context Analysis

---

## 4. Authentication Domain

---

## 5. Product / Item Identifier Domain

---

## 6. Quantity Domain

---

## 7. Resource Existence Domain

---

## 8. Cart State Context

---

## 9. Repeated-Operation Context

---

## 10. Response / Contract Domain

---

## 11. Price and Calculation Analysis

---

## 12. Equivalence Partition Catalog

Full EP table.

---

## 13. Partition Atomicity

---

## 14. Partition Disjointness

---

## 15. Partition Completeness

---

## 16. Interaction Inventory

INT table.

---

## 17. Cartesian-Explosion Control

Summary.

---

## 18. Test-Basis Traceability

13-TB table.

---

## 19. Parameter Traceability

---

## 20. Blocker Traceability

12-blocker table.

---

## 21. Security Gap Handling

---

## 22. BVA Candidate Audit

---

## 23. Classification Summary

---

## 24. Basis Summary

---

## 25. Quality Validation

---

## 26. BVA Readiness

Use exactly one:

```text
READY_FOR_BVA_ANALYSIS
```

or:

```text
NOT_READY_FOR_BVA_ANALYSIS
```

---

## 27. Current Project Status

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

---

## 28. Machine-Usable Summary

End exactly:

```text
PROMPT_013_SUMMARY

FR-07 endpoints:
2

FR-07 parameters:
6

Derived dimensions:

Verified TB items:
13

FR-07 blockers:
12

Equivalence partitions:
TOTAL:
VALID:
INVALID:
CONDITIONAL:
EXPLORATORY:

Execution status:
READY:
BLOCKED:
EXPLORATORY_ONLY:

Interaction dimensions:

Unaccounted TB items:
Unaccounted blockers:
Non-atomic EPs unresolved:
Unsupported boundaries introduced:

BVA readiness:
READY_FOR_BVA_ANALYSIS / NOT_READY_FOR_BVA_ANALYSIS

FR-07 testcases generated:
0

FR-07 quota:
0 / 35

Next required prompt:
PROMPT 014 — FR-07 BOUNDARY VALUE ANALYSIS
```

---

# 36. Important Constraints

* Work only on FR-07.
* Use `fr07-verified-test-basis.md` as the normalized basis.
* Preserve all valid OP/PARAM/TB/BLK IDs.
* Create stable EP-FR07 IDs.
* Do not generate testcases.
* Do not generate BVA cases.
* Do not generate concrete payloads.
* Do not generate attack payloads.
* Do not execute APIs.
* Do not implement Postman.
* Do not inspect implementation.
* Do not infer quantity >= 1.
* Do not infer integer-only quantity.
* Do not infer product-ID numeric boundaries.
* Do not infer stock rules.
* Do not infer duplicate-item accumulation.
* Do not infer Cart persistence.
* Do not infer read-after-write consistency.
* Do not infer calculation formulas.
* Do not infer ownership.
* Do not infer HTTP error statuses.
* Do not invent response fields.
* Do not invent SEC-01–SEC-07.
* Do not treat unspecified behavior as INVALID.
* Do not inflate EP count merely to support the 35-case quota.
* Do not absorb FR-08 checkout behavior.
* Do not reactivate FR-09 coupon behavior.

The objective is:

**Verified FR-07 Basis → Defensible Domain Model + EP Inventory**

not:

**Manufacture enough partitions to reach 35 tests**.

---

# 37. Output Artifacts

Create:

```text
analysis/fr07-domain-model.md
```

Log:

```text
prompts/Prompt-013-fr07-domain-modeling-equivalence-partitioning.md
```

Append Prompt 013 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–012 historical prompt content.
