# Prompt 007 — Prepare Human Audit Worksheet for AI-Generated Test Cases

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Previous prompts have completed:

* Prompt 001 — requirement extraction
* Prompt 002 — verified and normalized test basis
* Prompt 003 — domain modeling and equivalence partitioning
* Prompt 004 — Boundary Value Analysis
* Prompt 005 — initial logical test-case design
* Prompt 006 — scope compliance, gap analysis, and quota completion

Current status:

```text
Total logical test cases: 129

Selected-feature quota-eligible:
FR-02: 35
FR-09: 35
FR-18: 35
Total quota-eligible: 105

Cross-feature / supporting cases:
TC-API-029–045 → primarily coupon management / FR-17
TC-API-067–073 → primarily cancellation / FR-10
```

All current logical test cases were AI-generated.

No API execution, concrete test dataset, Postman request, implementation inspection, or attack payload generation has occurred.

---

# 1. Objective

Prepare a structured **Human Audit Worksheet** for all AI-generated logical test cases.

The student, not the AI, must make the final audit decision for every test case.

Your role in this prompt is to:

1. collect the evidence required to review each test,
2. verify traceability,
3. identify potential problems,
4. identify unsupported assumptions,
5. identify missing test information,
6. provide an AI recommendation,
7. leave the final student audit fields explicitly unresolved.

Do not finalize a testcase as VALID, INVALID, or INCOMPLETE on behalf of the student.

The required workflow is:

```text
AI-generated testcase
        ↓
Evidence extraction
        ↓
AI review recommendation
        ↓
Potential issue flags
        ↓
HUMAN DECISION
        ↓
VALID / INVALID / INCOMPLETE
```

---

# 2. Input Artifacts

Use:

1. `api_specification.md`
2. `analysis/verified-test-basis.md`
3. `analysis/domain-model.md`
4. `analysis/boundary-value-analysis.md`
5. `analysis/test-case-design.md`
6. `analysis/test-coverage-matrix.md`
7. `analysis/scope-and-gap-analysis.md`

Source priority:

```text
api_specification.md
        ↓
verified-test-basis.md
        ↓
domain-model.md
        ↓
boundary-value-analysis.md
        ↓
test-case-design.md
        ↓
test-coverage-matrix.md
        ↓
scope-and-gap-analysis.md
```

Do not inspect:

* application source code,
* README behavior descriptions,
* frontend validation,
* database implementation,
* runtime behavior,
* existing Postman tests.

---

# 3. Audit Population

Audit all AI-generated logical test cases currently retained in the design.

This includes:

```text
TC-API-001 ... TC-API-129
```

Do not renumber them.

Do not remove cross-feature/supporting cases from the audit merely because they are not quota-eligible.

Every AI-generated testcase that remains in the project must be reviewable.

---

# 4. Human Audit Labels

The final human decision must use exactly one of:

## VALID

Use when the student determines that:

* the testcase is supported by the verified test basis,
* its objective is meaningful,
* its preconditions are sufficient,
* its input condition is correct,
* its oracle does not invent behavior,
* and it is implementable as designed.

---

## INVALID

Use when the testcase contains a substantive error such as:

* contradicting specification,
* wrong endpoint,
* wrong feature attribution,
* incorrect expected result,
* invalid requirement mapping,
* invented business rule,
* invented state rule,
* unsupported security behavior,
* duplicate objective that adds no meaningful coverage.

An INVALID case must later be corrected or removed.

---

## INCOMPLETE

Use when the testcase concept is useful but cannot yet be executed or evaluated correctly because information is missing.

Examples:

* missing precondition,
* unspecified expected status,
* incomplete response schema,
* unresolved blocker,
* insufficient state information,
* unspecified business rule,
* missing test oracle.

An INCOMPLETE case must later be completed where possible or explicitly retained as exploratory.

---

# 5. Important Human-Review Rule

Do not populate the final audit fields:

```text
Student Decision
Student Reason
Student Correction Decision
```

with a final answer.

Use:

```text
PENDING HUMAN REVIEW
```

for all three fields.

You may provide a separate:

```text
AI Review Recommendation
```

but it must never be presented as the student's final audit decision.

---

# 6. Audit Evidence Required for Every Test Case

For every test case collect:

### Identity

* Test ID
* Feature
* Endpoint
* Scope classification
* Quota eligibility

### Traceability

* TB references
* EP references
* BVA references
* SEC references
* Blocker references

### Design

* Objective/title
* Primary technique
* Preconditions
* Input condition
* Action
* Expected classification
* readiness

### Oracles

* Transport oracle
* Schema oracle
* Semantic oracle
* State oracle

### Origin

* AI_GENERATED

---

# 7. Traceability Verification

Verify all references used by each testcase.

For each reference classify:

* VERIFIED
* MISSING
* INCORRECT
* NOT_APPLICABLE

Check:

```text
TC → TB
TC → EP
TC → BC/BV/BR
TC → SEC
TC → Blocker
```

Do not invent missing traceability.

If an ID referenced by a testcase does not exist in the upstream artifacts, flag it explicitly.

---

# 8. Requirement-Support Verification

For each testcase answer the following audit questions:

### A. Is the tested behavior supported by the specification?

Classification:

* YES
* PARTIAL
* NO
* EXPLORATORY

### B. Is the expected result deterministic from the specification?

Classification:

* YES
* PARTIAL
* NO

### C. Does the testcase introduce an undocumented rule?

Classification:

* NO
* POSSIBLY
* YES

### D. Is the test objective distinct from existing tests?

Classification:

* YES
* PARTIAL_OVERLAP
* DUPLICATE

---

# 9. Oracle Audit

Audit each oracle independently.

For each testcase assess:

| Oracle Layer | Assessment                                         |
| ------------ | -------------------------------------------------- |
| Transport    | SUPPORTED / PARTIAL / UNSUPPORTED / NOT_APPLICABLE |
| Schema       | SUPPORTED / PARTIAL / UNSUPPORTED / NOT_APPLICABLE |
| Semantic     | SUPPORTED / PARTIAL / UNSUPPORTED / NOT_APPLICABLE |
| State        | SUPPORTED / PARTIAL / UNSUPPORTED / NOT_APPLICABLE |

Flag any hard oracle that is unsupported by the authoritative specification.

Example problem:

```text
Expected HTTP 400
```

when the specification does not define HTTP 400 for that condition.

Such a testcase may need to become exploratory rather than deterministic.

---

# 10. Preconditions Audit

For each testcase determine whether all necessary preconditions are represented.

Check where relevant:

* account existence,
* account lock state,
* authentication state,
* user role,
* coupon existence,
* coupon condition,
* cart/order context,
* order existence,
* current order state,
* admin account,
* resource ownership.

Assessment:

* COMPLETE
* PARTIAL
* MISSING
* BLOCKED

Do not infer unspecified preconditions.

---

# 11. Scope Audit

Preserve Prompt 006 classifications.

Check especially:

### FR-09

Do not silently classify FR-17 Coupon Management CRUD tests as FR-09 quota tests.

### FR-18

Do not silently classify FR-10 cancellation/state-machine tests as FR-18 quota tests.

For each case preserve:

* IN_SCOPE
* SUPPORTING
* CROSS_FEATURE
* OUT_OF_SCOPE
* AMBIGUOUS

Flag any inconsistency with Prompt 006.

---

# 12. Blocker Audit

For every testcase with a blocker:

1. verify that the blocker exists,
2. verify that it actually affects the case,
3. explain what information is missing,
4. determine which part of the testcase is affected.

Use:

* INPUT
* PRECONDITION
* ORACLE
* STATE
* SECURITY
* SCHEMA
* BUSINESS_RULE
* EXECUTABILITY

Do not resolve blockers using general REST or e-commerce assumptions.

---

# 13. Exploratory Test Audit

For every `EXPLORATORY_ONLY` testcase verify that:

* no unsupported hard oracle exists,
* an Observation Goal is present,
* the observation goal is measurable,
* the case identifies what behavior should be recorded,
* the case does not disguise an assumption as an expectation.

Assessment:

* WELL_FORMED_EXPLORATORY
* NEEDS_REFINEMENT
* SHOULD_BE_DETERMINISTIC
* NOT_MEANINGFUL

Do not turn exploratory cases into deterministic cases unless supported by the specification.

---

# 14. Duplicate and Redundancy Audit

Compare logical objectives, not merely titles.

Flag tests that only differ by:

* arbitrary example value,
* wording,
* equivalent input from the same partition,
* duplicate authentication condition,
* duplicate schema assertion,
* duplicate state condition.

Classification:

* UNIQUE
* COMPLEMENTARY
* PARTIAL_DUPLICATE
* FULL_DUPLICATE

Do not automatically delete duplicates.

Flag them for student review.

---

# 15. AI Review Recommendation

For every testcase provide exactly one:

* RECOMMEND_VALID
* RECOMMEND_INVALID
* RECOMMEND_INCOMPLETE

This is only an AI recommendation.

It is not the required student audit result.

Provide a concise justification based only on the verified artifacts.

---

# 16. Issue Flags

Assign zero or more issue flags to each testcase.

Allowed flags:

* `TRACEABILITY_GAP`
* `UNSUPPORTED_ORACLE`
* `MISSING_PRECONDITION`
* `SPEC_BLOCKER`
* `SCOPE_MISMATCH`
* `POSSIBLE_DUPLICATE`
* `INVENTED_RULE`
* `EXPLORATORY_ORACLE_PROBLEM`
* `SCHEMA_GAP`
* `STATE_GAP`
* `SECURITY_GAP`
* `NONE`

Do not create additional flag names.

---

# 17. Human Audit Worksheet Schema

Produce one row for every testcase using exactly:

| Test ID | Feature | Endpoint | Scope | Quota Eligible | Primary Technique | TB Refs | EP Refs | SEC Refs | Blocker Refs | Requirement Support | Expected Result Deterministic? | Preconditions | Transport Oracle | Schema Oracle | Semantic Oracle | State Oracle | Duplicate Status | Exploratory Assessment | Issue Flags | AI Review Recommendation | AI Reason | Student Decision | Student Reason | Student Correction Decision |
| ------- | ------- | -------- | ----- | -------------- | ----------------- | ------- | ------- | -------- | ------------ | ------------------- | ------------------------------ | ------------- | ---------------- | ------------- | --------------- | ------------ | ---------------- | ---------------------- | ----------- | ------------------------ | --------- | ---------------- | -------------- | --------------------------- |

For every testcase:

```text
Student Decision = PENDING HUMAN REVIEW
Student Reason = PENDING HUMAN REVIEW
Student Correction Decision = PENDING HUMAN REVIEW
```

---

# 18. Student Correction Decision

After human review, the student will later fill this field using one of:

* NO_CHANGE
* CORRECT
* COMPLETE
* RECLASSIFY_EXPLORATORY
* REMOVE_DUPLICATE
* REMOVE_OUT_OF_SCOPE

Do not choose one now.

---

# 19. Cases Requiring Priority Human Attention

Create a separate list prioritizing cases with:

1. unsupported hard oracles,
2. scope mismatches,
3. invented rules,
4. missing traceability,
5. blockers,
6. duplicate risks,
7. exploratory-design problems.

Use:

| Priority | Test ID | Feature | Problem | Why Student Must Review |
| -------- | ------- | ------- | ------- | ----------------------- |

Priority:

* HIGH
* MEDIUM
* LOW

---

# 20. Per-Feature Human Audit Summary

For each selected feature summarize the AI recommendations.

Required table:

| Metric                   | FR-02 | FR-09 | FR-18 | Cross-Feature / Supporting | Total |
| ------------------------ | ----: | ----: | ----: | -------------------------: | ----: |
| Tests reviewed           |       |       |       |                            |       |
| RECOMMEND_VALID          |       |       |       |                            |       |
| RECOMMEND_INVALID        |       |       |       |                            |       |
| RECOMMEND_INCOMPLETE     |       |       |       |                            |       |
| Blocker-affected         |       |       |       |                            |       |
| Possible duplicates      |       |       |       |                            |       |
| Unsupported-oracle flags |       |       |       |                            |       |
| Priority HIGH review     |       |       |       |                            |       |

These are AI recommendations only.

Do not call them human audit results.

---

# 21. Audit Completeness Validation

Validate:

* all TC IDs are unique,
* all retained TC-API-001 through TC-API-129 are represented,
* every testcase has an AI recommendation,
* every testcase has all three student fields set to `PENDING HUMAN REVIEW`,
* no student decision was fabricated,
* all TB references exist or are flagged,
* all EP references exist or are flagged,
* all blocker references exist or are flagged,
* scope classification remains consistent with Prompt 006,
* no new testcase was generated.

Required table:

| Validation Item | Result | Evidence |
| --------------- | ------ | -------- |

Result:

* PASS
* FAIL

---

# 22. Required Final Response Structure

Use exactly this top-level structure:

# Prompt 007 — Human Audit Worksheet Preparation

## 1. Executive Summary

Provide:

| Metric | FR-02 | FR-09 | FR-18 | Cross-Feature / Supporting | Total |
| ------ | ----: | ----: | ----: | -------------------------: | ----: |

Include:

* testcase count,
* AI recommended valid,
* AI recommended invalid,
* AI recommended incomplete,
* blocker-affected,
* priority review count.

Then provide at most five concise observations.

---

## 2. Audit Method

Briefly explain:

* authoritative sources,
* audit criteria,
* distinction between AI recommendation and human decision.

---

## 3. Human Audit Worksheet

### 3.1 FR-02

Complete worksheet rows.

### 3.2 FR-09

Complete worksheet rows.

### 3.3 FR-18

Complete worksheet rows.

### 3.4 Cross-Feature / Supporting Cases

Complete worksheet rows.

---

## 4. Traceability Issues

List any invalid/missing TB, EP, SEC, BVA, or blocker references.

---

## 5. Oracle Issues

List cases with unsupported or partial hard oracles.

---

## 6. Preconditions and Dependency Issues

List incomplete preconditions.

---

## 7. Scope Issues

List any mismatch with Prompt 006.

---

## 8. Blocker-Affected Tests

Provide blocker-to-test mapping.

---

## 9. Exploratory Test Quality Review

Summarize exploratory case quality and list cases needing refinement.

---

## 10. Duplicate / Redundancy Review

List partial/full duplicate candidates.

---

## 11. Priority Human Review Queue

Priority table.

---

## 12. AI Recommendation Summary

Per-feature recommendation counts.

Explicitly state:

```text
These are AI recommendations and are not the student's final human-audit classifications.
```

---

## 13. Human Review Instructions

Give a short procedure for the student:

```text
For each testcase:

1. Read the testcase.
2. Read the AI recommendation.
3. Check the cited TB/EP/spec evidence.
4. Decide VALID / INVALID / INCOMPLETE yourself.
5. Write your own concise reason.
6. If INVALID or INCOMPLETE, record the required correction.
7. Do not accept an AI recommendation without checking its evidence.
```

---

## 14. Validation

Validation table.

---

## 15. Human Review Status

Report:

```text
AI WORKSHEET PREPARATION: COMPLETE

STUDENT HUMAN REVIEW: PENDING
```

Do not claim that HW06 human audit is complete.

---

## 16. Machine-Usable Summary

End with exactly:

```text
PROMPT_007_SUMMARY

Total AI-generated cases reviewed:
AI recommendation counts:
Priority HIGH test IDs:
Unsupported-oracle test IDs:
Traceability-gap test IDs:
Possible-duplicate test IDs:
Blocker-affected test IDs:
Exploratory cases needing refinement:

Student final decisions completed:
NO

Next required activity:
STUDENT HUMAN REVIEW
```

Do not introduce new analysis here.

---

# 23. Important Constraints

You must obey all of the following:

* Do not make the student's final VALID / INVALID / INCOMPLETE decision.
* Do not fabricate human review.
* Do not write student reasoning on the student's behalf.
* Do not mark the HW06 audit as complete.
* Do not create new test cases.
* Do not create concrete test data.
* Do not create Postman requests.
* Do not execute APIs.
* Do not inspect source code.
* Do not generate attack payloads.
* Do not resolve blockers using undocumented assumptions.
* Do not alter the 35/35/35 quota result.
* Do not silently move FR-17 tests into FR-09.
* Do not silently move FR-10 tests into FR-18.
* Preserve existing testcase IDs.
* Preserve TB/EP/blocker traceability.
* Clearly distinguish AI recommendations from human decisions.

The objective is:

**129 AI-Generated Logical Tests → Structured Evidence → AI Recommendations → Student Human Audit**

not:

**AI performs the human audit for the student**.

---

# 24. Output Artifact

Create:

```text
analysis/human-audit-worksheet.md
```

Log this prompt as:

```text
prompts/Prompt-007-prepare-human-audit-worksheet.md
```

Do not modify `analysis/test-case-design.md` yet.

Corrections to the test design must occur only after the student has completed the human review.

