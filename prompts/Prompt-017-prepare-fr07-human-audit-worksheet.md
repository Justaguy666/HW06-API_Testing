# Prompt 017 — Prepare FR-07 Human Audit Worksheet

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded feature:

* **FR-09: Discount Coupons**

Prompt 016 finalized the FR-07 pre-human-audit AI-generated suite.

Current FR-07 state:

```text
Testcases:
TC-API-130 through TC-API-164

Total:
35

Quota eligible:
35 / 35

Origin:
AI_GENERATED = 35

Scope:
IN_SCOPE = 35
```

Classification:

```text
POSITIVE: 5
NEGATIVE: 0
CONDITIONAL: 5
EXPLORATORY: 25
TOTAL: 35
```

Readiness:

```text
READY: 5
BLOCKED: 6
EXPLORATORY_ONLY: 24
TOTAL: 35
```

Coverage:

```text
EPs accounted:
36 / 36

Interactions accounted:
11 / 11

TB items accounted:
13 / 13

FR-07 blockers accounted:
12 / 12

Known duplicate testcase:
0

BVA testcase:
0
```

Status:

```text
READY_FOR_HUMAN_AUDIT
```

---

# 1. Purpose

Prepare a structured human-audit worksheet for all 35 FR-07 AI-generated logical testcases.

The transformation is:

```text
Finalized FR-07 AI Suite
        ↓
AI Evidence Review
        ↓
Human Audit Worksheet
        ↓
STUDENT HUMAN REVIEW
```

This prompt performs only worksheet preparation.

It must NOT perform the student's final audit decision.

---

# 2. Authoritative Inputs

Use:

```text
eshop-sut/api_specification.md

analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
analysis/fr07-boundary-value-analysis.md
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
analysis/fr07-scope-and-gap-closure.md
```

Do not use:

* implementation source,
* frontend behavior,
* database implementation,
* runtime observations,
* Postman,
* Newman,
* execution results.

---

# 3. Scope

Audit only:

```text
TC-API-130 ... TC-API-164
```

Do not re-audit:

```text
TC-API-001 ... TC-API-129
```

Do not modify FR-02 or FR-18.

Do not reactivate FR-09.

---

# 4. Human-Audit Principle

The AI may provide an advisory recommendation.

Allowed AI recommendations:

```text
RECOMMEND_VALID
RECOMMEND_INVALID
RECOMMEND_INCOMPLETE
```

However, these are not the final audit result.

For every testcase the following student-owned fields must remain:

```text
Student Decision:
PENDING HUMAN REVIEW

Student Reason:
PENDING HUMAN REVIEW

Student Correction Decision:
PENDING HUMAN REVIEW
```

The student will later decide.

---

# 5. Student Decision Values

The student will later choose exactly one:

```text
VALID
INVALID
INCOMPLETE
```

Do not populate this value during Prompt 017.

---

# 6. Student Correction Values

Possible later correction decisions are:

```text
NO_CHANGE
CORRECT
COMPLETE
RECLASSIFY_EXPLORATORY
REMOVE_DUPLICATE
REMOVE_OUT_OF_SCOPE
```

Do not choose one for the student.

---

# 7. Audit Every Testcase

For every testcase verify:

1. testcase ID,
2. FR-07 scope,
3. quota eligibility,
4. AI_GENERATED origin,
5. primary objective,
6. TB references,
7. PARAM / DIM references,
8. EP references,
9. INT references,
10. blocker references,
11. requirement support,
12. precondition sufficiency,
13. transport oracle,
14. schema oracle,
15. semantic oracle,
16. state oracle,
17. security oracle,
18. deterministic-result support,
19. exploratory quality,
20. duplicate risk,
21. blocker effect,
22. readiness classification,
23. BVA classification.

---

# 8. Requirement Support

For each testcase classify:

```text
YES
PARTIAL
EXPLORATORY
NO
```

## YES

The objective and required hard assertions are supported.

## PARTIAL

Some part is supported but another part depends on missing specification information.

## EXPLORATORY

The objective deliberately investigates unspecified behavior without inventing a hard result.

## NO

The testcase relies on unsupported or contradicted behavior.

Do not classify exploratory behavior as unsupported solely because its outcome is unspecified.

---

# 9. Oracle Audit

Audit these separately:

```text
Transport Oracle
Schema Oracle
Semantic Oracle
State Oracle
Security Oracle
```

Use:

```text
SUPPORTED
PARTIAL
NOT_SPECIFIED
NOT_APPLICABLE
```

Include a concise reason.

Do not strengthen an oracle beyond the specification.

---

# 10. Preconditions

Classify:

```text
COMPLETE
PARTIAL
BLOCKED
```

A testcase is BLOCKED when its required setup cannot be reproducibly established because of an unresolved rule/state/precondition.

A missing deterministic result alone does not necessarily make the precondition BLOCKED.

---

# 11. Exploratory Assessment

For every testcase classify:

```text
SHOULD_BE_DETERMINISTIC
WELL_FORMED_EXPLORATORY
NEEDS_REFINEMENT
NOT_MEANINGFUL
```

## SHOULD_BE_DETERMINISTIC

The specification already supplies enough contract information for supported assertions.

## WELL_FORMED_EXPLORATORY

The behavior is unspecified, but:

* the objective is meaningful,
* the observation is measurable,
* no hard result is invented.

## NEEDS_REFINEMENT

The idea is useful, but representation, setup, comparison criterion, or observation rule remains too abstract.

## NOT_MEANINGFUL

No independent testing value can be identified.

Do not mark a case `NEEDS_REFINEMENT` merely because it is exploratory.

---

# 12. Duplicate Analysis

Compare all 35 FR-07 cases.

Use:

```text
UNIQUE
PARTIAL_DUPLICATE
DUPLICATE
```

A partial overlap is not automatically a defect when a testcase isolates a different:

* oracle,
* interaction,
* state,
* sequence,
* response contract,
* risk.

Required duplicate table:

| Test A | Test B | Relationship | Independent Value | Recommendation |
| ------ | ------ | ------------ | ----------------- | -------------- |

---

# 13. Scope Audit

Reconfirm every testcase as:

```text
IN_SCOPE
SUPPORTING
CROSS_FEATURE
OUT_OF_SCOPE
AMBIGUOUS
```

Do not let FR-08 Checkout behavior become FR-07 merely because Cart may precede checkout.

Do not reactivate FR-09 coupon behavior.

Expected baseline:

```text
IN_SCOPE = 35
```

If any discrepancy is found, report it.

Do not silently alter the testcase.

---

# 14. Blocker Handling

A blocker does not automatically imply:

```text
RECOMMEND_INCOMPLETE
```

Determine whether it actually prevents:

* setup,
* objective,
* deterministic oracle,
* reproducible observation.

For example:

```text
input executable
+
result unspecified
```

may still constitute a well-formed exploratory testcase.

Distinguish:

```text
BLOCKER_AFFECTED_BUT_EXECUTABLE
BLOCKER_PREVENTS_SETUP
BLOCKER_LIMITS_ORACLE_ONLY
BLOCKER_PREVENTS_OBJECTIVE
```

---

# 15. BVA Audit

Prompt 014 established:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
Accepted boundaries = 0
```

Every FR-07 testcase should therefore retain:

```text
BVA:
N/A
```

Flag any testcase that incorrectly claims BVA.

Expected:

```text
BVA testcase = 0
```

---

# 16. AI Recommendation Rules

Use:

### RECOMMEND_VALID

when:

* objective is meaningful,
* design is internally coherent,
* supported hard assertions stay within specification,
* exploratory tests have a measurable observation goal.

### RECOMMEND_INCOMPLETE

when:

* required setup cannot be reproduced,
* representation remains abstract,
* observation criterion is not measurable,
* an important logical component is missing.

### RECOMMEND_INVALID

only when:

* objective contradicts verified requirements,
* traceability is false,
* unsupported business behavior is asserted as fact,
* testcase has no meaningful independent objective.

Do not force any recommendation category to be nonzero.

---

# 17. Issue Flags

Assign zero or more:

```text
SPEC_BLOCKER
MISSING_PRECONDITION
SCHEMA_GAP
STATE_GAP
SECURITY_GAP
EXPLORATORY_ORACLE_PROBLEM
POSSIBLE_DUPLICATE
SCOPE_RISK
TRACEABILITY_PROBLEM
UNSUPPORTED_HARD_ORACLE
REPRESENTATION_GAP
SEQUENCE_GAP
```

Do not add flags merely to populate the column.

---

# 18. Priority

Assign human-review priority:

```text
HIGH
MEDIUM
LOW
```

### HIGH

Prefer for:

* BLOCKED tests,
* CONDITIONAL tests,
* state/sequence uncertainty,
* security-sensitive cases,
* possible duplicates,
* questionable oracle support.

### MEDIUM

Meaningful exploratory cases involving notable ambiguity.

### LOW

Straightforward deterministic or well-formed exploratory cases with good traceability.

---

# 19. Required Worksheet Columns

Create one row for each:

```text
TC-API-130 ... TC-API-164
```

Use:

| Test ID | Endpoint | Scope | Quota Eligible | Primary Technique | TB Refs | EP Refs | INT Refs | Blocker Refs | Requirement Support | Expected Result Deterministic? | Preconditions | Transport Oracle | Schema Oracle | Semantic Oracle | State Oracle | Security Oracle | Duplicate Status | Exploratory Assessment | Issue Flags | Review Priority | AI Review Recommendation | AI Reason | Student Decision | Student Reason | Student Correction Decision |
| ------- | -------- | ----- | -------------- | ----------------- | ------- | ------- | -------- | ------------ | ------------------- | ------------------------------ | ------------- | ---------------- | ------------- | --------------- | ------------ | --------------- | ---------------- | ---------------------- | ----------- | --------------- | ------------------------ | --------- | ---------------- | -------------- | --------------------------- |

There must be exactly:

```text
35 worksheet rows
```

---

# 20. AI Reason

For each testcase provide a concise case-specific rationale covering:

```text
origin
objective
design classification
readiness
requirement/oracle support
blocker impact
duplicate assessment
recommendation reason
```

Do not use the exact same generic sentence for all cases.

---

# 21. Student Fields

For every one of the 35 rows, use exactly:

```text
Student Decision:
PENDING HUMAN REVIEW

Student Reason:
PENDING HUMAN REVIEW

Student Correction Decision:
PENDING HUMAN REVIEW
```

Expected pending cells:

```text
35 × 3 = 105
```

No student-owned value may be pre-filled.

---

# 22. AI Recommendation Summary

Required table:

| Recommendation       | Count |
| -------------------- | ----: |
| RECOMMEND_VALID      |       |
| RECOMMEND_INVALID    |       |
| RECOMMEND_INCOMPLETE |       |
| TOTAL                |    35 |

---

# 23. Priority Summary

Required:

| Priority | Count |
| -------- | ----: |
| HIGH     |       |
| MEDIUM   |       |
| LOW      |       |
| TOTAL    |    35 |

---

# 24. Exploratory Assessment Summary

Required:

| Assessment              | Count |
| ----------------------- | ----: |
| SHOULD_BE_DETERMINISTIC |       |
| WELL_FORMED_EXPLORATORY |       |
| NEEDS_REFINEMENT        |       |
| NOT_MEANINGFUL          |       |
| TOTAL                   |    35 |

---

# 25. Duplicate Summary

Required:

```text
UNIQUE:
PARTIAL_DUPLICATE:
DUPLICATE:
```

List every non-unique relationship explicitly.

---

# 26. Validation

Verify:

```text
Testcase rows = 35

TC-API-130 present = YES
TC-API-164 present = YES

Missing testcase IDs = 0
Duplicate testcase rows = 0

Invalid TB refs = 0
Invalid EP refs = 0
Invalid INT refs = 0
Invalid blocker refs = 0

Student Decision pending = 35
Student Reason pending = 35
Student Correction pending = 35

Total student-owned pending cells = 105

New testcase generated = 0
Existing testcase modified = 0
```

---

# 27. Do Not Modify Test Suite

Do not modify:

```text
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
analysis/fr07-scope-and-gap-closure.md
```

Prompt 017 prepares audit evidence only.

---

# 28. Human Audit Instructions

At the end provide a short human-review procedure.

The student should review HIGH first, then MEDIUM, then LOW.

For each row the student must fill:

```text
Student Decision
Student Reason
Student Correction Decision
```

Do not supply the final values.

---

# 29. Required Final Response Structure

Use exactly:

# Prompt 017 — Prepare FR-07 Human Audit Worksheet

## 1. Executive Summary

Include:

* 35 cases,
* quota 35/35,
* AI recommendation counts,
* priority counts,
* exploratory-assessment counts,
* duplicate findings,
* pending human fields.

## 2. Audit Method

## 3. FR-07 Human Audit Worksheet

35 rows.

## 4. High-Priority Review Queue

List HIGH cases and reasons.

## 5. Medium-Priority Review Queue

## 6. Duplicate Review

## 7. Oracle Review Summary

## 8. Blocker Review Summary

## 9. Traceability Validation

## 10. AI Recommendation Summary

## 11. Human Review Instructions

## 12. Validation

## 13. Current Project Status

Use:

```text
FR-07 AI TEST GENERATION:
COMPLETE

FR-07 QUOTA:
35 / 35 — PASS

FR-07 HUMAN AUDIT WORKSHEET:
COMPLETE

FR-07 STUDENT HUMAN REVIEW:
PENDING

FR-02:
PRESERVED

FR-18:
PRESERVED

FR-09:
SUPERSEDED — HISTORICAL ONLY
```

## 14. Machine-Usable Summary

End exactly:

```text
PROMPT_017_SUMMARY

FR-07 testcase rows:
35

Test ID range:
TC-API-130 — TC-API-164

AI recommendations:
VALID:
INVALID:
INCOMPLETE:

Priority:
HIGH:
MEDIUM:
LOW:

Exploratory assessment:
SHOULD_BE_DETERMINISTIC:
WELL_FORMED_EXPLORATORY:
NEEDS_REFINEMENT:
NOT_MEANINGFUL:

Duplicate status:
UNIQUE:
PARTIAL_DUPLICATE:
DUPLICATE:

Invalid TB refs:
Invalid EP refs:
Invalid INT refs:
Invalid blocker refs:

Student Decision pending:
35

Student Reason pending:
35

Student Correction Decision pending:
35

Total student-owned pending cells:
105

FR-07 student human review:
PENDING

Next required action:
STUDENT HUMAN REVIEW OF FR-07
```

---

# 30. Important Constraints

* Audit only TC-API-130–164.
* Do not generate new tests.
* Do not alter existing tests.
* Do not generate concrete test data.
* Do not execute APIs.
* Do not inspect implementation.
* Do not create Postman.
* Do not invent Cart rules.
* Do not invent HTTP statuses.
* Do not invent response schemas.
* Do not invent SEC-01–SEC-07.
* Do not convert unspecified behavior into deterministic failure.
* Do not automatically make blocker-affected tests incomplete.
* Do not perform the student's final audit.
* All 105 student-owned cells must remain PENDING HUMAN REVIEW.
* Preserve AI_GENERATED origin.
* Keep FR-09 historical.
* Preserve FR-02 and FR-18.

The objective is:

**35 FR-07 AI Tests → Structured AI Audit Evidence → Student Human Decision**

not:

**AI makes the final human-review decision**.

---

# 31. Output Artifacts

Create:

```text
analysis/fr07-human-audit-worksheet.md
```

Log:

```text
prompts/Prompt-017-prepare-fr07-human-audit-worksheet.md
```

Append exactly one Prompt 017 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–016 historical prompt contents.
