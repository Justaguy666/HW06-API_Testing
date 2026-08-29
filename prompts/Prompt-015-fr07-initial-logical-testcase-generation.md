# Prompt 015 — FR-07 Initial Logical Testcase Generation

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded Pool B:

* **FR-09: Discount Coupons**

Prompt 014 completed FR-07 Boundary Value Analysis.

Current authoritative FR-07 baseline:

```text
Endpoints / operations: 2
Parameters: 6
Derived dimensions: 5
Verified TB items: 13
Blockers: 12

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

BVA candidate boundaries reviewed: 21
Accepted specification-backed boundaries: 0
Rejected / unsupported boundaries: 21

BVA classification:
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC

Logical-test-generation readiness:
READY_FOR_LOGICAL_TEST_GENERATION
```

FR-07 currently has:

```text
0 logical testcases
0 / 35 quota
```

Authoritative inputs:

```text
analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
analysis/fr07-boundary-value-analysis.md
```

---

# 1. Purpose

Generate the **initial AI logical testcase suite for FR-07**.

The purpose is:

```text
Verified FR-07 Test Basis
        +
36 Equivalence Partitions
        +
11 Meaningful Interactions
        +
BVA Conclusion
        ↓
Initial FR-07 Logical Test Suite
```

This prompt should prioritize:

1. defensible test objectives,
2. EP coverage,
3. interaction coverage,
4. state/resource coverage,
5. authentication and security-relevant coverage,
6. response/schema coverage,
7. sequence and repeated-operation coverage,
8. robustness coverage,
9. blocker-aware exploratory coverage.

Do not generate superficial variants merely to reach 35.

Prompt 016 will later perform quota and technique gap closure.

---

# 2. Scope

Work only on:

```text
FR-07 — Cart
```

Do not generate new tests for:

```text
FR-02
FR-18
FR-09
```

FR-09 remains:

```text
SUPERSEDED — HISTORICAL ONLY
```

---

# 3. Authoritative Sources

Use only:

```text
eshop-sut/api_specification.md
analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
analysis/fr07-boundary-value-analysis.md
```

May inspect:

```text
analysis/fr07-requirement-analysis.md
analysis/pool-b-feature-switch.md
```

for historical context only.

Do not inspect:

* source implementation,
* frontend code,
* database,
* README behavior,
* runtime API results,
* Postman,
* Newman,
* test execution evidence.

---

# 4. Stable IDs

Preserve:

```text
OP-FR07-*
PARAM-FR07-*
DIM-FR07-*
TB-FR07-*
EP-FR07-*
INT-FR07-*
BLK-FR07-*
BC-FR07-*
```

Do not create new TB, EP, INT, or blocker IDs in this prompt.

Logical testcase IDs must continue after the highest historical testcase ID already used in the project.

Before creating cases:

1. inspect the historical test-suite ID space,
2. identify the maximum existing `TC-API-NNN`,
3. allocate FR-07 testcase IDs sequentially from the next unused number,
4. never reuse historical FR-09 testcase IDs,
5. never renumber previous cases.

Report:

```text
Existing maximum testcase ID:
First new FR-07 testcase ID:
```

---

# 5. Test Origin

Every FR-07 case generated in Prompt 015 must be:

```text
Origin = AI_GENERATED
```

Do not label any as:

```text
HUMAN_ADDED
STUDENT_AUTHORED
AI_ASSISTED_CANDIDATE
```

---

# 6. Logical-Test Design Principle

Each testcase must have one primary objective.

Avoid combining multiple unrelated failures.

Good:

```text
Observe handling when the documented product identifier
is omitted while unrelated conditions remain nominal.
```

Bad:

```text
Test missing product ID, invalid quantity, invalid auth,
and malformed JSON together.
```

Interactions are allowed only when the interaction itself is the test objective.

---

# 7. Use Existing EPs as Primary Input Basis

Review all 36:

```text
EP-FR07-001 ... EP-FR07-036
```

For each EP determine whether it deserves:

* direct coverage,
* interaction coverage,
* deferred coverage,
* blocked coverage.

Required EP coverage classifications:

```text
DIRECTLY_COVERED
COVERED_VIA_INTERACTION
BLOCKED
DEFERRED_EXPLORATORY
NOT_MEANINGFUL_AS_STANDALONE
```

Do not automatically generate one testcase per EP.

---

# 8. Behavioral Classification

Each testcase must use exactly one:

```text
POSITIVE
NEGATIVE
CONDITIONAL
EXPLORATORY
```

Rules:

## POSITIVE

A specification-supported nominal/accepted behavior exists.

## NEGATIVE

The specification provides enough evidence that the input/context violates a documented requirement.

Important:

FR-07 currently has:

```text
INVALID EPs = 0
```

Therefore do not fabricate deterministic NEGATIVE cases.

A NEGATIVE testcase is allowed only if the verified test basis genuinely supports a failure expectation.

## CONDITIONAL

The objective is meaningful, but required setup or business behavior depends on unresolved rules.

## EXPLORATORY

The input/context is executable and meaningful, but acceptance/rejection or semantic outcome is unspecified.

---

# 9. Readiness Classification

Each testcase must use:

```text
READY
BLOCKED
EXPLORATORY_ONLY
```

## READY

Can later be translated to executable test data with at least one supported oracle.

## BLOCKED

Cannot currently establish the required precondition/state/rule.

## EXPLORATORY_ONLY

Can be executed later, but expected behavior must remain observational.

Do not make a testcase READY merely to improve statistics.

---

# 10. Oracle Layers

For each testcase separately model:

```text
Transport Oracle
Schema Oracle
Semantic Oracle
State Oracle
Security Oracle
```

Each layer must use:

```text
SUPPORTED
PARTIAL
UNSPECIFIED
NOT_APPLICABLE
```

Include a concise explanation.

Do not write unsupported exact HTTP status codes.

Do not invent response fields.

Do not invent state effects.

---

# 11. Deterministic vs Observational Wording

If behavior is supported:

```text
Verify ...
Validate ...
Confirm ...
```

may be used.

If behavior is unspecified:

use:

```text
Observe ...
Characterize ...
Record ...
Compare ...
```

Do not write:

```text
should reject
must return 400
must ignore
must increment
must preserve
```

unless directly supported.

---

# 12. Initial Generation Strategy

Generate cases in this order:

## Layer A — Nominal Operation Coverage

Cover the documented nominal behavior of both FR-07 operations.

Prefer focused tests for:

* transport contract,
* documented response contract,
* documented resource semantics.

Do not duplicate the exact same nominal objective unnecessarily.

---

## Layer B — Primary Input / EP Coverage

Cover meaningful classes from the 36 EPs.

Prioritize:

```text
VALID
then CONDITIONAL
then meaningful EXPLORATORY
```

Do not force every BLOCKER_DRIVEN EP into an individual testcase.

---

## Layer C — Authentication Context

Cover authentication-related domains separately for each endpoint where meaningful.

Distinguish:

```text
GET cart authentication context
POST/add-cart authentication context
```

Do not import FR-18 auth semantics.

---

## Layer D — Resource Existence

Cover meaningful product/resource classes.

Distinguish:

* existing referenced resource,
* non-existing referenced resource,

when represented in the verified domain model.

Do not invent exact error behavior.

---

## Layer E — Quantity Representation

Cover only classes already present in the domain model.

Potential examples only where EPs already exist:

* documented number-shaped quantity,
* omitted,
* null-like,
* non-number,
* exploratory numeric subclasses.

Do not introduce new quantity partitions.

Do not call zero/negative/fractional values BVA.

---

## Layer F — Representation Robustness

Use existing EPs for representation-level conditions such as:

* missing body,
* unsupported representation,
* undocumented members,

only where the domain model already supports them.

Do not create attack payloads.

---

## Layer G — Interaction Coverage

Use meaningful:

```text
INT-FR07-*
```

relationships.

Interaction cases must add value beyond single-factor EP tests.

For each interaction testcase explain:

```text
Why interaction coverage is needed:
```

---

## Layer H — State / Sequence Coverage

Use existing logical contexts such as:

```text
add → retrieve
repeated retrieve
resource state before / after operation
```

only when represented by DIM/INT/TB/blocker artifacts.

Do not invent expected persistence or read-after-write semantics.

Use observational wording where needed.

---

## Layer I — Schema / Contract Coverage

Generate focused schema/contract cases only where the verified basis provides meaningful documented fields or structure.

Prefer isolated contract tests when they provide independent value.

Do not fabricate exact schema validation beyond documented members.

---

## Layer J — Security-Relevant Coverage

Use only specification-backed FR-07 contexts plus known missing SEC definitions.

Do not invent SEC-01–SEC-07.

Possible coverage may remain exploratory.

Clearly separate:

```text
FR-07 authentication/resource-access observation
```

from:

```text
formal SEC-01–SEC-07 coverage
```

---

# 13. BVA Rule

Prompt 014 concluded:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

Therefore:

```text
BVA testcase count in Prompt 015 = 0
```

Do not generate cases labeled BVA.

Numeric robustness tests may exist only if already represented by EPs.

Their technique must be:

```text
ROBUSTNESS
DOMAIN
EXPLORATORY
```

not BVA.

---

# 14. Technique Classification

Each testcase must have exactly one primary technique:

```text
DOMAIN
AUTHENTICATION
AUTHORIZATION
RESOURCE
STATE
SEQUENCE
INTERACTION
ROBUSTNESS
SCHEMA
SECURITY
BUSINESS_RULE
```

Optional secondary techniques may be listed separately.

Do not use:

```text
BVA
```

for FR-07 under the current specification.

---

# 15. Scope Classification

Each generated testcase must be classified:

```text
IN_SCOPE
SUPPORTING
CROSS_FEATURE
OUT_OF_SCOPE
AMBIGUOUS
```

Only:

```text
IN_SCOPE
```

may later count toward FR-07 quota.

The initial generation should strongly prefer IN_SCOPE cases.

Do not generate FR-08 Checkout cases merely because Cart feeds checkout.

Do not regenerate FR-09 Coupon tests.

---

# 16. Quota Eligibility

Each testcase must contain:

```text
Quota Eligible:
YES / NO
```

Use YES only when:

```text
Scope = IN_SCOPE
Origin = AI_GENERATED
Objective directly tests FR-07 behavior
```

Supporting setup tests do not count.

---

# 17. Required Testcase Schema

Every testcase must include:

```text
Test ID:
Feature:
Endpoint / Operation:
Scope:
Quota Eligible:
Origin:

Title:
Primary Objective:

Primary Technique:
Secondary Technique:

TB Refs:
PARAM / DIM Refs:
EP Refs:
INT Refs:
Blocker Refs:

Behavior Classification:
Readiness:

Preconditions:

Logical Input Condition:

Logical Action:

Transport Oracle:
Schema Oracle:
Semantic Oracle:
State Oracle:
Security Oracle:

Expected Result Deterministic?:
YES / PARTIAL / NO

Exploratory Observation Goal:

Why This Test Exists:

Duplicate Risk:
UNIQUE / PARTIAL_OVERLAP / POSSIBLE_DUPLICATE

BVA:
N/A — no specification-backed FR-07 boundary
```

Do not use concrete request payloads.

---

# 18. Preconditions

Preconditions must be logical only.

Examples of acceptable abstraction:

```text
A referenced product resource exists.
```

```text
An authentication context matching the documented
representation is available.
```

```text
A resource state required by the sequence can be
established if the relevant blocker is later resolved.
```

Do not create concrete IDs/accounts/products.

---

# 19. Logical Inputs

Use semantic classes, not literals.

Good:

```text
Existing product identifier representation.
Number-shaped quantity representation.
```

Bad:

```text
product_id = 1
quantity = 2
```

unless the purpose is merely referencing a specification example, and even then prefer abstraction.

---

# 20. Explicit Treatment of Specification Examples

The specification contains example literals such as:

```text
id = 1
name = "Sản phẩm A"
price = 100000
quantity = 2
```

Do not make them unique testcase categories.

They may be referenced as examples of documented shape only.

Do not infer:

* valid range,
* boundary,
* required literal,
* pricing rule.

---

# 21. Blocker Handling

A testcase may reference one or more:

```text
BLK-FR07-*
BLK-ALL-001
```

A blocker does not automatically mean the testcase must be BLOCKED.

Use:

## BLOCKED

when the missing information prevents establishing:

* precondition,
* required state,
* executable logical setup.

Use:

## EXPLORATORY_ONLY

when the input can be exercised but outcome is unspecified.

Use:

## READY

when enough of the objective is still deterministically testable despite partial gaps.

---

# 22. Interaction Case Rules

For any case using:

```text
INT-FR07-*
```

include:

```text
Interaction Factors:
Factor A:
Factor B / Sequence:

Why not covered by standalone EP tests:
```

Do not create interaction cases where only wording changes.

---

# 23. Sequence Case Rules

For sequence-oriented cases use logical notation:

```text
Step A
→ Step B
→ Observe C
```

Do not assume:

```text
C must equal X
```

unless supported.

For read-after-add consistency, preserve blocker-driven uncertainty.

---

# 24. Duplicate Control

Before finalizing each case compare against all other newly generated FR-07 cases.

Classify:

```text
UNIQUE
PARTIAL_OVERLAP
POSSIBLE_DUPLICATE
```

Partial overlap is acceptable only if the cases isolate different:

* oracle layers,
* interactions,
* states,
* security risks,
* response contracts.

Required duplicate audit:

| Test A | Test B | Overlap | Independent Value | Decision |
| ------ | ------ | ------- | ----------------- | -------- |

Decision:

* KEEP_BOTH
* MERGE
* REMOVE_DUPLICATE

Final suite must contain zero known redundant duplicates.

---

# 25. Initial Suite Size

Do not force exactly 35.

Generate the smallest defensible initial suite that meaningfully covers the FR-07 model.

Expected behavior:

```text
Initial suite may be < 35.
```

Prompt 016 will perform quota gap closure.

However, do not stop prematurely if many of the 36 EPs and 11 interactions clearly justify additional unique cases.

Quality > arbitrary initial count.

---

# 26. EP Coverage Matrix

After generation create:

| EP-ID | Classification | Execution | Test IDs | Coverage |
| ----- | -------------- | --------- | -------- | -------- |

Coverage:

```text
COVERED
COVERED_VIA_INTERACTION
BLOCKED
DEFERRED_EXPLORATORY
NOT_MEANINGFUL_STANDALONE
```

All 36 EPs must be accounted for.

---

# 27. Interaction Coverage Matrix

For all 11:

```text
INT-FR07-*
```

create:

| INT-ID | Test IDs | Coverage Status | Reason |
| ------ | -------- | --------------- | ------ |

Coverage Status:

* COVERED
* PARTIAL
* DEFERRED
* BLOCKED

Do not force all 11 to have a testcase if doing so adds no independent value.

---

# 28. Test-Basis Coverage Matrix

For all 13:

```text
TB-FR07-*
```

create:

| TB-ID | Test IDs | Coverage Status | Oracle Strength |
| ----- | -------- | --------------- | --------------- |

Coverage Status:

* COVERED
* PARTIAL
* BLOCKED
* CONTEXT_ONLY

Oracle Strength:

* DETERMINISTIC
* PARTIAL
* OBSERVATIONAL
* NONE

Goal:

```text
Unaccounted TB = 0
```

---

# 29. Blocker Coverage Matrix

For all 12:

```text
BLK-FR07-*
```

create:

| Blocker | Affected Tests | Effect |
| ------- | -------------- | ------ |

Effect:

* BLOCKS_SETUP
* LIMITS_TRANSPORT_ORACLE
* LIMITS_SCHEMA_ORACLE
* LIMITS_SEMANTIC_ORACLE
* LIMITS_STATE_ORACLE
* LIMITS_SECURITY_ORACLE
* EXPLORATORY_ONLY

---

# 30. Technique Coverage Summary

Required table:

| Technique | Test Count | Test IDs |
| --------- | ---------: | -------- |

Include all primary techniques used.

Explicitly include:

```text
BVA | 0 | N/A
```

---

# 31. Classification Summary

Required:

| Classification | Count |
| -------------- | ----: |
| POSITIVE       |       |
| NEGATIVE       |       |
| CONDITIONAL    |       |
| EXPLORATORY    |       |
| TOTAL          |       |

Do not force NEGATIVE > 0.

---

# 32. Readiness Summary

Required:

| Readiness        | Count |
| ---------------- | ----: |
| READY            |       |
| BLOCKED          |       |
| EXPLORATORY_ONLY |       |
| TOTAL            |       |

---

# 33. Scope Summary

Required:

| Scope         | Count |
| ------------- | ----: |
| IN_SCOPE      |       |
| SUPPORTING    |       |
| CROSS_FEATURE |       |
| OUT_OF_SCOPE  |       |
| AMBIGUOUS     |       |
| TOTAL         |       |

---

# 34. Quota Summary

Required:

```text
Initial FR-07 quota-eligible AI tests:
N / 35
```

Do not report PASS unless:

```text
N >= 35
```

Status:

```text
PASS
SHORTFALL
```

A SHORTFALL is expected and acceptable in Prompt 015.

---

# 35. Gap Inventory for Prompt 016

If quota < 35 or technique coverage remains weak, prepare a gap inventory.

Required table:

| GAP-ID | Area | Existing Coverage | Potential Additional Value | Constraint |
| ------ | ---- | ----------------- | -------------------------- | ---------- |

IDs:

```text
GAP-FR07-001
GAP-FR07-002
...
```

Important:

This table describes coverage gaps.

Do not pre-generate the additional testcase IDs.

Potential areas:

* uncovered EP,
* under-covered interaction,
* schema isolation,
* auth isolation,
* state/sequence isolation,
* robustness class,
* contract oracle,
* resource behavior.

Do not create fake gaps solely because quota is short.

---

# 36. Initial Logical Suite Quality Audit

Validate:

| Check                                           | Result    |
| ----------------------------------------------- | --------- |
| Every test has one primary objective            | PASS/FAIL |
| Every TB ref exists                             | PASS/FAIL |
| Every EP ref exists                             | PASS/FAIL |
| Every INT ref exists                            | PASS/FAIL |
| Every blocker ref exists                        | PASS/FAIL |
| No unsupported boundary used                    | PASS/FAIL |
| No concrete payload generated                   | PASS/FAIL |
| No exact unsupported HTTP status invented       | PASS/FAIL |
| No response field invented                      | PASS/FAIL |
| No Cart rule invented                           | PASS/FAIL |
| No BVA test generated                           | PASS/FAIL |
| No duplicate retained without independent value | PASS/FAIL |
| FR-09 not reactivated                           | PASS/FAIL |
| FR-08 checkout not absorbed                     | PASS/FAIL |

---

# 37. Do Not Modify Combined Historical Suite Yet

Do not update:

```text
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/human-audit-worksheet.md
```

These still represent historical FR-02 / FR-09 / FR-18 work.

FR-07 remains isolated until later reconciliation.

---

# 38. Output Artifacts

Create:

```text
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
```

These become the inputs for Prompt 016.

---

# 39. Required Final Response Structure

Use exactly:

# Prompt 015 — FR-07 Initial Logical Testcase Generation

## 1. Executive Summary

Include:

* initial testcase count,
* quota-eligible count,
* POSITIVE / NEGATIVE / CONDITIONAL / EXPLORATORY counts,
* READY / BLOCKED / EXPLORATORY_ONLY counts,
* EP coverage,
* interaction coverage,
* TB coverage,
* quota result.

---

## 2. Generation Method

---

## 3. Stable ID Allocation

---

## 4. FR-07 Initial Logical Test Suite

List every generated testcase using the required full schema.

---

## 5. EP Coverage Matrix

36 EPs.

---

## 6. Interaction Coverage Matrix

11 interactions.

---

## 7. Test-Basis Coverage Matrix

13 TBs.

---

## 8. Blocker Coverage Matrix

12 blockers.

---

## 9. Duplicate Audit

---

## 10. Technique Coverage

---

## 11. Classification Summary

---

## 12. Readiness Summary

---

## 13. Scope Summary

---

## 14. Quota Evaluation

Use:

```text
FR-07 quota-eligible AI tests:
N / 35

Result:
PASS / SHORTFALL
```

---

## 15. Gap Inventory for Prompt 016

---

## 16. Quality Validation

---

## 17. Current Project Status

Use:

```text
POOL B:
FR-07

FR-07 REQUIREMENT EXTRACTION:
COMPLETE

FR-07 TEST BASIS:
COMPLETE

FR-07 DOMAIN MODEL:
COMPLETE

FR-07 BVA:
COMPLETE

FR-07 INITIAL AI TEST GENERATION:
COMPLETE

FR-07 QUOTA:
N / 35

FR-07 QUOTA GAP CLOSURE:
NOT STARTED

FR-07 HUMAN AUDIT:
NOT STARTED

FR-02:
PRESERVED — 35 / 35

FR-18:
PRESERVED — 35 / 35

FR-09:
SUPERSEDED — HISTORICAL ONLY
```

---

## 18. Machine-Usable Summary

End exactly:

```text
PROMPT_015_SUMMARY

Existing maximum historical testcase ID:

First FR-07 testcase ID:

FR-07 testcases generated:

Quota-eligible AI tests:

Classification:
POSITIVE:
NEGATIVE:
CONDITIONAL:
EXPLORATORY:

Readiness:
READY:
BLOCKED:
EXPLORATORY_ONLY:

Scope:
IN_SCOPE:
SUPPORTING:
CROSS_FEATURE:
OUT_OF_SCOPE:
AMBIGUOUS:

EPs:
TOTAL: 36
COVERED:
COVERED_VIA_INTERACTION:
BLOCKED:
DEFERRED_EXPLORATORY:
NOT_MEANINGFUL_STANDALONE:

Interactions:
TOTAL: 11
COVERED:
PARTIAL:
DEFERRED:
BLOCKED:

TB items:
TOTAL: 13
UNACCOUNTED:

BVA testcases:
0

Quota:
N / 35

Quota status:
PASS / SHORTFALL

Gap items for Prompt 016:

Next required prompt:
PROMPT 016 — FR-07 SCOPE, QUOTA, AND TECHNIQUE GAP CLOSURE
```

---

# 40. Important Constraints

* Generate only FR-07 logical tests.
* Origin must be AI_GENERATED.
* Do not generate HUMAN_ADDED tests.
* Do not modify FR-02.
* Do not modify FR-18.
* Do not reactivate FR-09.
* Do not generate checkout tests.
* Do not generate coupon tests.
* Do not inspect implementation.
* Do not execute APIs.
* Do not generate concrete payloads.
* Do not generate Postman.
* Do not generate attack payloads.
* Do not invent HTTP statuses.
* Do not invent response members.
* Do not invent Cart ownership.
* Do not invent duplicate-item semantics.
* Do not invent quantity accumulation.
* Do not invent persistence.
* Do not invent read-after-write consistency.
* Do not invent stock behavior.
* Do not invent quantity minimum/maximum.
* Do not invent BVA cases.
* Do not invent SEC-01–SEC-07.
* Do not force INVALID/NEGATIVE cases.
* Do not force 35 cases in this prompt.
* Preserve blocker uncertainty.
* Prefer observational tests when behavior is unspecified.
* Every testcase must provide meaningful independent test value.

The objective is:

**36 EP + 11 interactions → High-Quality Initial FR-07 Logical Suite**

not:

**Generate 35 superficial cases immediately**.

---

# 41. Output Files

Create:

```text
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
```

Log:

```text
prompts/Prompt-015-fr07-initial-logical-testcase-generation.md
```

Append Prompt 015 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–014 historical prompt contents.
