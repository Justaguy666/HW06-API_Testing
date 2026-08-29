# Prompt 016 — FR-07 Scope, Quota, and Technique Gap Closure

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded Pool B:

* **FR-09: Discount Coupons**

Prompt 015 completed the initial FR-07 logical testcase generation.

Current FR-07 baseline:

```text
Test IDs:
TC-API-130 through TC-API-163

Initial FR-07 testcases:
34

Quota eligible:
34 / 35

Quota result:
SHORTFALL
```

Current classification:

```text
POSITIVE: 5
NEGATIVE: 0
CONDITIONAL: 4
EXPLORATORY: 25
TOTAL: 34
```

Current readiness:

```text
READY: 5
BLOCKED: 5
EXPLORATORY_ONLY: 24
TOTAL: 34
```

Current scope/origin:

```text
IN_SCOPE: 34
AI_GENERATED: 34
BVA testcases: 0
```

Current coverage:

```text
EP:
27 DIRECTLY_COVERED
3 COVERED_VIA_INTERACTION
6 BLOCKED

Interactions:
6 COVERED
1 PARTIAL
4 BLOCKED

TB:
13 / 13 accounted

Blockers:
12 / 12 accounted

Known duplicates:
0
```

Prompt 015 identified:

```text
6 GAP-FR07-* items
```

Authoritative inputs:

```text
eshop-sut/api_specification.md
analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
analysis/fr07-boundary-value-analysis.md
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
```

---

# 1. Purpose

Perform a controlled FR-07 gap-closure pass.

The objective is:

```text
34 high-quality FR-07 AI tests
        ↓
scope / coverage / technique audit
        ↓
identify genuine remaining value
        ↓
generate only defensible additions
        ↓
FR-07 quota >= 35
```

You must:

1. verify all 34 initial FR-07 tests,
2. verify their scope eligibility,
3. verify the six Prompt 015 gaps,
4. identify whether any true coverage gaps remain,
5. determine which gaps deserve additional logical tests,
6. add the minimum number of meaningful tests necessary,
7. reach at least 35 quota-eligible FR-07 AI-generated tests,
8. improve technique/oracle coverage only where genuinely justified,
9. reject superficial quota-filler tests,
10. produce the finalized pre-human-audit FR-07 suite.

Do not modify FR-02 or FR-18.

Do not reactivate FR-09.

---

# 2. Core Principle

The current quota shortfall is:

```text
1 testcase
```

This does NOT mean:

```text
generate exactly one arbitrary new testcase
```

Instead:

```text
analyze all remaining gaps
→ determine meaningful additions
→ generate the smallest defensible set
```

Possible valid outcomes include:

```text
35 total
36 total
37 total
...
```

but only where additional cases provide independent test value.

Quality > minimum count.

---

# 3. Scope

Work only on:

```text
FR-07 — Cart
```

Preserve:

```text
FR-02 — 35 / 35
FR-18 — 35 / 35
```

Keep historical:

```text
FR-09 — SUPERSEDED / HISTORICAL ONLY
```

---

# 4. Preserve Existing FR-07 IDs

Existing FR-07 IDs:

```text
TC-API-130
...
TC-API-163
```

must remain stable.

Do not:

* renumber,
* reuse,
* silently replace,
* delete without explicit audit reasoning.

Any newly generated testcase must start from:

```text
TC-API-164
```

and continue sequentially.

---

# 5. Existing Suite Validation

Before creating anything new, validate all 34 existing cases.

Required table:

| Test ID | Scope Valid? | TB Refs Valid? | EP Refs Valid? | INT Refs Valid? | Blocker Refs Valid? | Independent Value? | Keep? |
| ------- | ------------ | -------------- | -------------- | --------------- | ------------------- | ------------------ | ----- |

Allowed `Keep?`:

* YES
* REVIEW
* NO_DUPLICATE
* NO_SCOPE
* NO_UNSUPPORTED

Goal:

```text
34 retained unless evidence justifies otherwise.
```

Do not remove a case merely because it is exploratory.

---

# 6. Scope Compliance Audit

Re-verify every FR-07 case against feature boundaries.

Classification:

* IN_SCOPE
* SUPPORTING
* CROSS_FEATURE
* OUT_OF_SCOPE
* AMBIGUOUS

Only IN_SCOPE cases count toward quota.

Explicitly ensure no case primarily tests:

```text
FR-05 Product Listing/Search
FR-06 Product Detail
FR-08 Checkout
FR-09 Discount Coupons
FR-10 Order State Machine
```

A supporting product-existence precondition may remain part of a Cart testcase without becoming a Product testcase.

---

# 7. Quota Eligibility Audit

For all existing and newly generated cases:

```text
Quota Eligible = YES
```

only if:

```text
Scope = IN_SCOPE
Origin = AI_GENERATED
Primary objective tests FR-07 behavior
```

Required table:

| Test ID | Scope | Origin | Primary Objective FR-07? | Quota Eligible |
| ------- | ----- | ------ | ------------------------ | -------------- |

---

# 8. Reassess the Six Existing Gaps

Review every:

```text
GAP-FR07-*
```

from Prompt 015.

Required table:

| GAP-ID | Area | Existing Tests | Current Status | Independent Test Value? | Action |
| ------ | ---- | -------------- | -------------- | ----------------------- | ------ |

Current Status:

* STILL_OPEN
* PARTIALLY_COVERED
* ALREADY_COVERED
* BLOCKED
* NOT_MEANINGFUL

Action:

* ADD_TEST
* KEEP_AS_BLOCKED_GAP
* NO_NEW_TEST_NEEDED
* MERGE_WITH_OTHER_GAP

Do not assume every gap requires a testcase.

---

# 9. Gap Acceptance Criteria

A gap may produce a new testcase only if at least one applies:

```text
NEW_EP_COVERAGE
NEW_INTERACTION_COVERAGE
NEW_SEQUENCE_COVERAGE
NEW_STATE_ORACLE
NEW_SCHEMA_ORACLE
NEW_SECURITY_ORACLE
NEW_RESOURCE_ORACLE
NEW_CONTRACT_ISOLATION
NEW_ROBUSTNESS_CLASS
NEW_CROSS_REQUEST_OBSERVATION
```

If none apply:

```text
DO NOT GENERATE
```

---

# 10. EP Gap Audit

Review all 36 EPs.

Required table:

| EP-ID | Current Coverage | Existing Test IDs | New Test Needed? | Reason |
| ----- | ---------------- | ----------------- | ---------------- | ------ |

Current Coverage:

* DIRECTLY_COVERED
* COVERED_VIA_INTERACTION
* BLOCKED
* DEFERRED_EXPLORATORY
* NOT_MEANINGFUL_STANDALONE

Important:

A BLOCKED EP does not require another blocked testcase if an existing case already represents the blocked objective adequately.

Do not generate one test per blocked EP merely to increase quota.

---

# 11. Interaction Gap Audit

Review all 11:

```text
INT-FR07-*
```

Current baseline:

```text
6 COVERED
1 PARTIAL
4 BLOCKED
```

Required table:

| INT-ID | Current Status | Existing Tests | Independent Additional Value? | New Test? |
| ------ | -------------- | -------------- | ----------------------------- | --------- |

Prioritize the single PARTIAL interaction for detailed review.

A blocked interaction may remain blocked without generating another case.

---

# 12. TB Gap Audit

Verify all 13:

```text
TB-FR07-*
```

Required table:

| TB-ID | Existing Coverage | Oracle Strength | Additional Isolation Valuable? |
| ----- | ----------------- | --------------- | ------------------------------ |

Additional Isolation Valuable:

* YES
* NO
* BLOCKED

Do not add a testcase merely because a TB has only one test.

---

# 13. Technique Gap Audit

Evaluate existing primary techniques.

Required table:

| Technique | Existing Count | Coverage Strength | Gap? | Additional Test Justified? |
| --------- | -------------: | ----------------- | ---- | -------------------------- |

Techniques:

* DOMAIN
* AUTHENTICATION
* AUTHORIZATION
* RESOURCE
* STATE
* SEQUENCE
* INTERACTION
* ROBUSTNESS
* SCHEMA
* SECURITY
* BUSINESS_RULE
* BVA

For BVA:

```text
Existing Count = 0
Gap = NO
Reason = BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

Do not create a BVA testcase.

---

# 14. Oracle Gap Audit

Audit current oracle-layer coverage.

Required table:

| Oracle Layer | Strong Coverage | Partial Coverage | Unspecified | Additional Isolation Useful? |
| ------------ | --------------: | ---------------: | ----------: | ---------------------------- |

Oracle Layers:

* TRANSPORT
* SCHEMA
* SEMANTIC
* STATE
* SECURITY

Do not try to convert unsupported oracles into deterministic ones.

A new case may be generated to **isolate** a supported oracle even if another broader case already uses the same nominal request, provided it has clear independent contract value.

---

# 15. Readiness Gap Audit

Current baseline:

```text
READY: 5
BLOCKED: 5
EXPLORATORY_ONLY: 24
```

Do not treat this distribution as a defect.

The high number of exploratory tests is expected because the specification is incomplete.

Do not generate arbitrary READY cases to make statistics look balanced.

---

# 16. Security Coverage Audit

Formal SEC-01–SEC-07 remain unavailable if:

```text
BLK-ALL-001
```

still exists.

Do not invent them.

Review whether specification-backed FR-07 authentication/resource-access concerns have already been represented.

Required result:

| Security Area | Existing Tests | Coverage | New Test Needed? |
| ------------- | -------------- | -------- | ---------------- |

Possible values:

* COVERED
* PARTIAL
* BLOCKED_BY_SEC_DEFINITION
* NOT_APPLICABLE

---

# 17. Sequence / Consistency Audit

Pay special attention to Prompt 012/013 blockers relating to:

```text
repeated retrieval
read-after-add consistency
```

Determine whether existing tests already isolate:

```text
retrieve → retrieve
```

and:

```text
add → retrieve
```

as meaningful logical objectives.

Do not invent persistence semantics.

If a new case is justified, its oracle should remain:

```text
OBSERVATIONAL
```

or:

```text
PARTIAL
```

unless specification evidence supports more.

---

# 18. Resource / Mutation Isolation Audit

Review whether the suite distinguishes:

* operation response,
* resource mutation,
* subsequent observable Cart state,

where those concepts are represented by verified TB/DIM/INT artifacts.

Do not infer exact mutation behavior.

A new test may isolate a mutation/state observation only if it provides a different oracle from an existing operation-level case.

---

# 19. Representation Robustness Audit

Review whether the existing suite adequately covers domain-model representation classes.

Do not invent new representation types not present in the 36 EPs.

Do not generate:

* attack payloads,
* arbitrary giant strings,
* arbitrary numeric extremes,

solely for quota closure.

---

# 20. Candidate Additional Test Design

For each genuinely accepted gap, first create a candidate record:

| Candidate | Gap | Coverage Delta | Closest Existing Tests | Duplicate Risk | Accept? |
| --------- | --- | -------------- | ---------------------- | -------------- | ------- |

Coverage Delta:

* NEW_EP_COVERAGE
* NEW_INTERACTION
* NEW_SEQUENCE
* NEW_ORACLE
* NEW_STATE_OBSERVATION
* NEW_SCHEMA_ISOLATION
* NEW_SECURITY_ISOLATION
* NEW_ROBUSTNESS
* OTHER_JUSTIFIED

Duplicate Risk:

* LOW
* MEDIUM
* HIGH

Only LOW or MEDIUM candidates may proceed.

HIGH must be rejected or redesigned.

---

# 21. Minimum Necessary Generation

After candidate analysis, generate the smallest accepted set such that:

```text
FR-07 quota eligible >= 35
```

Do not stop at 35 if another candidate is clearly needed to close a genuine high-value gap already identified in this same audit.

But do not generate low-value extras after coverage is adequate.

---

# 22. New Testcase Origin

Every new test generated by Prompt 016:

```text
Origin = AI_GENERATED
```

Do not use:

```text
HUMAN_ADDED
STUDENT_AUTHORED
AI_ASSISTED_CANDIDATE
```

---

# 23. New Testcase ID Allocation

Start at:

```text
TC-API-164
```

Use sequential IDs.

Example:

```text
TC-API-164
TC-API-165
...
```

Do not leave gaps.

---

# 24. Required Testcase Schema

Every new testcase must include exactly the same logical schema used by Prompt 015:

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

BVA:
N/A — no specification-backed FR-07 boundary
```

---

# 25. Behavioral Classification

Allowed:

* POSITIVE
* NEGATIVE
* CONDITIONAL
* EXPLORATORY

Do not force NEGATIVE > 0.

Current:

```text
INVALID EP = 0
```

still applies.

---

# 26. Readiness

Allowed:

* READY
* BLOCKED
* EXPLORATORY_ONLY

Apply honestly.

Do not make quota closure depend on READY status.

Exploratory-only tests can be quota eligible if they are:

```text
IN_SCOPE
AI_GENERATED
meaningful logical tests
```

---

# 27. Oracle Discipline

For unsupported behavior:

```text
Observe
Characterize
Compare
Record
```

Do not use:

```text
must
should reject
must increment
must return 400
must persist
```

without verified evidence.

---

# 28. No Concrete Data

Do not create:

```text
product_id = 1
quantity = 2
```

as test data.

Use logical representations such as:

```text
existing documented product identifier class
documented number-shaped quantity class
```

Concrete data belongs to a later phase.

---

# 29. BVA Remains Zero

Prompt 014 established:

```text
Accepted boundaries = 0
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

Therefore:

```text
FR-07 BVA testcase count after Prompt 016 = 0
```

Do not change this conclusion.

---

# 30. Duplicate Audit — Existing vs New

Compare every new test against:

```text
TC-API-130 ... TC-API-163
```

Required table:

| New Test | Closest Existing Test(s) | Shared Objective | Coverage Delta | Duplicate Assessment |
| -------- | ------------------------ | ---------------- | -------------- | -------------------- |

Duplicate Assessment:

* UNIQUE
* PARTIAL_OVERLAP_BUT_INDEPENDENT_VALUE
* DUPLICATE

Any DUPLICATE must be removed before final output.

---

# 31. Duplicate Audit — New vs New

Required table:

| Test A | Test B | Overlap | Independent Value | Decision |
| ------ | ------ | ------- | ----------------- | -------- |

Decision:

* KEEP_BOTH
* MERGE
* REMOVE

Final newly generated set must contain zero known redundant duplicates.

---

# 32. Final EP Coverage Matrix

Recalculate all 36 EPs after gap closure.

Required table:

| EP-ID | Classification | Execution | Final Test IDs | Final Coverage |
| ----- | -------------- | --------- | -------------- | -------------- |

Final Coverage:

* COVERED
* COVERED_VIA_INTERACTION
* BLOCKED
* DEFERRED_EXPLORATORY
* NOT_MEANINGFUL_STANDALONE

Do not claim a blocked EP is covered merely because a blocked test references it.

---

# 33. Final Interaction Coverage

Recalculate all 11 interactions.

| INT-ID | Final Test IDs | Final Status | Notes |
| ------ | -------------- | ------------ | ----- |

Status:

* COVERED
* PARTIAL
* BLOCKED
* DEFERRED

---

# 34. Final TB Coverage

Recalculate all 13 TBs.

| TB-ID | Final Test IDs | Coverage | Oracle Strength |
| ----- | -------------- | -------- | --------------- |

Goal:

```text
Unaccounted TB = 0
```

---

# 35. Final Blocker Coverage

Recalculate all 12 FR-07 blockers plus any applicable global blocker.

| Blocker | Final Test IDs | Effect |
| ------- | -------------- | ------ |

Do not resolve blockers merely because additional tests exist.

---

# 36. Final Technique Coverage

Required table:

| Technique | Final Count | Test IDs |
| --------- | ----------: | -------- |

Include:

```text
BVA | 0 | N/A
```

---

# 37. Final Classification Summary

Required:

| Classification | Before | Added | Final |
| -------------- | -----: | ----: | ----: |
| POSITIVE       |      5 |       |       |
| NEGATIVE       |      0 |       |       |
| CONDITIONAL    |      4 |       |       |
| EXPLORATORY    |     25 |       |       |
| TOTAL          |     34 |       |       |

---

# 38. Final Readiness Summary

| Readiness        | Before | Added | Final |
| ---------------- | -----: | ----: | ----: |
| READY            |      5 |       |       |
| BLOCKED          |      5 |       |       |
| EXPLORATORY_ONLY |     24 |       |       |
| TOTAL            |     34 |       |       |

---

# 39. Final Scope Summary

All final quota cases should normally remain:

```text
IN_SCOPE
```

Required:

| Scope         | Before | Added | Final |
| ------------- | -----: | ----: | ----: |
| IN_SCOPE      |     34 |       |       |
| SUPPORTING    |      0 |       |       |
| CROSS_FEATURE |      0 |       |       |
| OUT_OF_SCOPE  |      0 |       |       |
| AMBIGUOUS     |      0 |       |       |

If a newly proposed case is not IN_SCOPE, do not use it solely to satisfy quota.

---

# 40. Final Quota Validation

Required table:

| Feature | Active AI-Generated Quota | Minimum | Result    |
| ------- | ------------------------: | ------: | --------- |
| FR-02   |                        35 |      35 | PRESERVED |
| FR-07   |                           |      35 |           |
| FR-18   |                        35 |      35 | PRESERVED |

FR-07 result:

* PASS
* FAIL

Overall selected suite target:

```text
105 quota-eligible AI-generated tests minimum
```

After FR-07 reaches 35:

```text
FR-02 35
+
FR-07 >=35
+
FR-18 35
=
>=105
```

---

# 41. Historical FR-09 Exclusion

Explicitly verify:

```text
FR-09 historical tests:
preserved = YES
current selected quota = NO
```

Do not accidentally count historical FR-09 cases in selected-suite totals.

---

# 42. Final FR-07 Pre-Human-Audit Suite

Create a complete final FR-07 suite consisting of:

```text
TC-API-130 ... final FR-07 ID
```

Preserve all retained Prompt 015 tests plus accepted new Prompt 016 tests.

Do not rewrite existing testcase semantics unless a genuine defect is identified.

If an existing case requires correction:

report separately.

Do not silently change it.

---

# 43. Human Audit Readiness

After quota closure validate that the FR-07 suite is ready for a separate human audit.

Conditions:

```text
quota >=35
scope normalized
all TB accounted
all EP accounted
all interactions accounted
all blockers traced
duplicate audit complete
BVA remains correctly N/A
stable testcase IDs
no concrete data
no unsupported hard oracle
```

Use:

```text
READY_FOR_HUMAN_AUDIT
```

or:

```text
NOT_READY_FOR_HUMAN_AUDIT
```

---

# 44. Do Not Perform Human Audit Yet

Prompt 016 must not classify the new FR-07 cases as final student:

* VALID
* INVALID
* INCOMPLETE

AI may perform design-quality validation, but final student audit belongs to the next human-audit phase.

Do not populate Student Decision fields.

---

# 45. Update FR-07 Artifacts

Update:

```text
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
```

to reflect the finalized pre-human-audit FR-07 suite.

Also create:

```text
analysis/fr07-scope-and-gap-closure.md
```

The initial filenames may remain for historical continuity, but add a clear status inside them:

```text
FR-07 PRE-HUMAN-AUDIT SUITE:
FINALIZED BY PROMPT 016
```

Do not modify combined historical FR-02/FR-09/FR-18 suite yet.

---

# 46. Required Final Response Structure

Use exactly:

# Prompt 016 — FR-07 Scope, Quota, and Technique Gap Closure

## 1. Executive Summary

Include:

* initial tests = 34,
* retained initial tests,
* six gaps reviewed,
* gaps producing new tests,
* new tests generated,
* final FR-07 test count,
* final quota,
* human-audit readiness.

---

## 2. Initial Suite Validation

34-row audit.

---

## 3. Scope Compliance Audit

---

## 4. Quota Eligibility Audit

---

## 5. Prompt 015 Gap Reassessment

Six gaps.

---

## 6. EP Gap Audit

36 EPs.

---

## 7. Interaction Gap Audit

11 interactions.

---

## 8. Test-Basis Gap Audit

13 TBs.

---

## 9. Technique Gap Audit

---

## 10. Oracle Gap Audit

---

## 11. Security Coverage Audit

---

## 12. Sequence and Consistency Audit

---

## 13. Resource and Mutation Audit

---

## 14. Representation Robustness Audit

---

## 15. Candidate Additional Tests

Candidate table.

---

## 16. New Logical Testcases

Full schema for all accepted new tests.

---

## 17. Existing-vs-New Duplicate Audit

---

## 18. New-vs-New Duplicate Audit

---

## 19. Final EP Coverage

36 EPs.

---

## 20. Final Interaction Coverage

11 interactions.

---

## 21. Final TB Coverage

13 TBs.

---

## 22. Final Blocker Coverage

---

## 23. Final Technique Coverage

---

## 24. Classification Summary

Before / added / final.

---

## 25. Readiness Summary

Before / added / final.

---

## 26. Scope Summary

Before / added / final.

---

## 27. Quota Validation

Use:

```text
FR-02:
35 / 35 — PRESERVED

FR-07:
N / 35 — PASS / FAIL

FR-18:
35 / 35 — PRESERVED

CURRENT SELECTED SUITE:
TOTAL / 105
```

---

## 28. FR-09 Historical Exclusion

---

## 29. Final FR-07 Test ID Range

Report:

```text
First:
TC-API-130

Last:
TC-API-NNN

Total:
N
```

---

## 30. Human Audit Readiness

Use exactly one:

```text
READY_FOR_HUMAN_AUDIT
```

or:

```text
NOT_READY_FOR_HUMAN_AUDIT
```

---

## 31. Quality Validation

Validate:

* all testcase IDs unique,
* all references exist,
* no unsupported hard oracle,
* no BVA case generated,
* no concrete payload generated,
* no implementation assumption,
* no FR-08 leakage,
* no FR-09 reactivation,
* no duplicate retained,
* quota calculated using IN_SCOPE AI_GENERATED tests only.

---

## 32. Current Project Status

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

FR-07 QUOTA GAP CLOSURE:
COMPLETE

FR-07 QUOTA:
N / 35

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

## 33. Machine-Usable Summary

End exactly:

```text
PROMPT_016_SUMMARY

Initial FR-07 tests:
34

Initial quota:
34 / 35

Prompt 015 gaps reviewed:
6

Gaps requiring new testcase:
Gaps closed without new testcase:
Gaps remaining blocked:

New AI-generated FR-07 tests:

New testcase IDs:

Final FR-07 tests:

Final classification:
POSITIVE:
NEGATIVE:
CONDITIONAL:
EXPLORATORY:

Final readiness:
READY:
BLOCKED:
EXPLORATORY_ONLY:

Final scope:
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
BLOCKED:
DEFERRED:

TB:
TOTAL: 13
UNACCOUNTED:

BVA testcases:
0

FR-02 quota:
35 / 35

FR-07 quota:
N / 35

FR-18 quota:
35 / 35

Current selected quota:
TOTAL / 105

Quota result:
PASS / FAIL

Human audit readiness:
READY_FOR_HUMAN_AUDIT / NOT_READY_FOR_HUMAN_AUDIT

Next required prompt:
PROMPT 017 — PREPARE FR-07 HUMAN AUDIT WORKSHEET
```

---

# 47. Important Constraints

* Work only on FR-07.
* Preserve TC-API-130–163 unless a genuine issue is documented.
* New IDs begin at TC-API-164.
* Generate the minimum meaningful number of new tests.
* Do not blindly generate one test for every gap.
* Do not generate superficial quota fillers.
* Origin must remain AI_GENERATED.
* Do not create HUMAN_ADDED cases.
* Do not perform student human audit.
* Do not alter FR-02.
* Do not alter FR-18.
* Do not reactivate FR-09.
* Do not generate FR-08 Checkout tests.
* Do not create coupon tests.
* Do not inspect implementation.
* Do not execute API requests.
* Do not generate concrete payloads.
* Do not create Postman requests.
* Do not invent Cart rules.
* Do not invent quantity limits.
* Do not invent stock rules.
* Do not invent persistence semantics.
* Do not invent duplicate-item semantics.
* Do not invent HTTP statuses.
* Do not invent response fields.
* Do not invent SEC-01–SEC-07.
* Keep BVA testcase count at 0.
* Preserve blockers.
* Exploratory tests may count toward quota when they are meaningful IN_SCOPE AI tests.

The objective is:

**34/35 Defensible FR-07 Suite → Genuine Gap Closure → ≥35/35 Pre-Human-Audit Suite**

not:

**Add one arbitrary testcase just because quota is short by one**.

---

# 48. Output Artifacts

Update:

```text
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
```

Create:

```text
analysis/fr07-scope-and-gap-closure.md
```

Log:

```text
prompts/Prompt-016-fr07-scope-quota-technique-gap-closure.md
```

Append Prompt 016 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–015 historical prompt content.
