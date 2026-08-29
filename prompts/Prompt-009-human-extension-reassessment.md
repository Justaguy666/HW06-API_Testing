# Prompt 009 — Human Extension Reassessment and Student Ideation Worksheet

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected assignment features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Previous phases are complete:

* Prompt 001 — Requirement extraction
* Prompt 002 — Requirement verification
* Prompt 003 — Domain modeling and equivalence partitioning
* Prompt 004 — Boundary Value Analysis
* Prompt 005 — Initial AI testcase design
* Prompt 006 — Scope/quota gap closure
* Prompt 007 — Human audit worksheet preparation
* Student human review
* Prompt 008 — Human audit decision application

Current suite status:

```text
Historical AI-generated testcases: 129

Human decisions:
VALID: 96
INCOMPLETE: 33
INVALID: 0

Final readiness:
READY: 27
BLOCKED: 15
EXPLORATORY_ONLY: 87

Quota-eligible AI-generated tests:
FR-02: 35
FR-09: 35
FR-18: 35
```

The student has manually reviewed the current AI-generated suite and currently believes that the suite is strong enough that **no obvious AI-missed testcase has yet been identified**.

This statement is the student's current assessment.

Do not reinterpret it as proof that no gaps exist.

---

# 1. Purpose

The assignment requires a student-authored extension phase.

The purpose of Prompt 009 is therefore to support a **second independent human gap-analysis pass** without allowing AI to generate the student-authored testcases.

Your task is to:

1. summarize what the AI suite already covers,
2. identify where coverage is already saturated,
3. identify where uncertainty or unexplored design dimensions remain,
4. distinguish:

   * actual coverage gaps,
   * specification blockers,
   * intentionally exploratory behavior,
   * already-covered dimensions,
5. prepare a structured worksheet for the student to independently propose additional tests,
6. detect duplicates after the student later fills those ideas.

You must **not create student-added testcase ideas**.

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
8. `analysis/human-audit-worksheet.md`
9. `analysis/human-audit-application-summary.md`

Do not inspect:

* implementation source,
* database implementation,
* frontend code,
* runtime behavior,
* Postman results,
* existing API execution evidence.

---

# 3. Critical Authorship Rule

Do not generate:

* new testcase objectives,
* new testcase titles,
* new input combinations,
* new security scenarios,
* new state-transition scenarios,
* new robustness scenarios,
* new test IDs.

Do not propose statements such as:

```text
You could test...
Try testing...
Add a testcase where...
Consider testing...
```

These would constitute AI-generated testcase ideation.

The HUMAN_ADDED test ideas must originate from the student.

---

# 4. Preserve the Current Student Assessment

Record:

```text
FIRST HUMAN EXTENSION REVIEW

Student assessment:
No obvious AI-missed testcase was identified during the
first manual review of the 129-case AI-generated suite.

Extension requirement status:
NOT YET SATISFIED
```

Do not change this into:

```text
AI missed nothing.
```

Absence of an identified gap is not evidence of complete coverage.

---

# 5. Feature Coverage Inventory

For each selected feature create a compact inventory of what is already covered.

Required table:

| Coverage Dimension | FR-02 | FR-09 | FR-18 |
| ------------------ | ----- | ----- | ----- |

Dimensions:

* nominal behavior
* required input classes
* invalid-type classes
* omitted/null classes
* authentication
* authorization
* resource existence
* response contract/schema
* robustness
* state-dependent behavior
* security-oriented behavior
* interaction/compound domains
* repeated-operation behavior
* persistence/side effects
* exploratory behavior

For each cell use:

* STRONG
* MODERATE
* WEAK
* BLOCKED
* NOT_APPLICABLE

This table summarizes existing coverage only.

Do not turn a WEAK/BLOCKED result into a testcase suggestion.

---

# 6. Existing-Test Density Analysis

For every selected feature report:

```text
Feature:
Total quota-eligible tests:
READY:
BLOCKED:
EXPLORATORY_ONLY:

Domain-focused:
State-focused:
Security-focused:
Schema-focused:
Authentication-focused:
Authorization-focused:
Robustness-focused:
Business-rule-focused:
```

The purpose is to help the student understand where the AI suite is dense or sparse.

Do not infer that a low count necessarily means a missing testcase.

---

# 7. Requirement Saturation Matrix

For every TB item belonging to FR-02, FR-09, or FR-18:

| TB-ID | Requirement | Existing Test IDs | Coverage Type | Saturation | Blocker |
| ----- | ----------- | ----------------- | ------------- | ---------- | ------- |

`Saturation`:

* SINGLE_CASE
* MULTIPLE_CASES
* HEAVILY_COVERED
* PARTIAL
* BLOCKED

Do not create new test suggestions from PARTIAL/BLOCKED rows.

---

# 8. Equivalence Partition Saturation

For all EP items:

| EP-ID | Feature | Partition | Existing Test IDs | Coverage Status | Notes |
| ----- | ------- | --------- | ----------------- | --------------- | ----- |

Coverage Status:

* COVERED
* MULTI_COVERED
* EXPLORATORY_COVERED
* BLOCKED
* NOT_TESTABLE_FROM_SPEC

Explicitly identify whether any EP is genuinely:

```text
UNTESTED_AND_TESTABLE
```

If such EP exists, report only its ID and description.

Do not convert it into a testcase.

---

# 9. Technique Saturation

Create:

| Technique | FR-02 Existing IDs | FR-09 Existing IDs | FR-18 Existing IDs | Saturation |
| --------- | ------------------ | ------------------ | ------------------ | ---------- |

Techniques:

* Equivalence Partitioning
* Boundary Value Analysis
* State testing
* Authentication
* Authorization
* Response schema
* Security
* Robustness
* Interaction testing
* Repeated-operation behavior

For BVA preserve the existing conclusion that no specification-backed executable boundaries exist unless upstream artifacts say otherwise.

---

# 10. Identify Unresolved Areas Without Creating Tests

Produce:

| UA-ID | Feature | Unresolved Area | Cause | Already Represented by Existing Tests? | Student Investigation Value |
| ----- | ------- | --------------- | ----- | -------------------------------------- | --------------------------- |

`Cause`:

* SPEC_GAP
* BLOCKER
* EXPLORATORY_ONLY
* LIMITED_SCHEMA
* LIMITED_STATE_MODEL
* SECURITY_DEFINITION_MISSING
* OTHER

`Already Represented`:

* YES
* PARTIAL
* NO

`Student Investigation Value`:

* HIGH
* MEDIUM
* LOW

Important:

An unresolved area is **not a testcase suggestion**.

Describe only the missing knowledge or coverage dimension.

---

# 11. Distinguish Gap Types

Classify every apparent gap as:

## TYPE A — Genuine Test-Design Gap

A documented and testable requirement/partition exists but has no meaningful testcase.

This is the strongest candidate area for student investigation.

Do not generate the testcase.

---

## TYPE B — Specification Gap

The desired behavior itself is undefined.

Adding another deterministic testcase would not solve the gap.

---

## TYPE C — Existing Exploratory Coverage

The behavior is unspecified but is already covered through observation-based testing.

Do not incorrectly claim this is missing.

---

## TYPE D — Duplicate Opportunity Only

Additional tests would merely repeat existing logical coverage.

Do not recommend creating them.

---

## TYPE E — Technique Not Applicable

Example:

No valid BVA boundary exists.

Do not treat non-applicability as a coverage deficiency.

Required table:

| Gap ID | Feature | Area | Gap Type | Evidence | Requires New Test? |
| ------ | ------- | ---- | -------- | -------- | ------------------ |

For `Requires New Test?`, use:

* POSSIBLY — HUMAN DECISION
* NO
* BLOCKED

Never use:

```text
YES — add testcase X
```

---

# 12. Student Ideation Worksheet

Create exactly 5 empty slots for each selected feature.

These slots must be completely empty of testcase ideas.

## FR-02

### STUDENT-FR02-01

```text
Student Test Idea:

Requirement / behavior being targeted:

Why I believe the AI suite missed this:

Existing closest AI testcase(s):

Why my case is not a duplicate:

New coverage added:

Expected test technique:

Spec evidence / TB:

Potential blocker:
```

Repeat through:

```text
STUDENT-FR02-05
```

---

## FR-09

Create:

```text
STUDENT-FR09-01
...
STUDENT-FR09-05
```

with the same fields.

---

## FR-18

Create:

```text
STUDENT-FR18-01
...
STUDENT-FR18-05
```

with the same fields.

All fields must contain exactly:

```text
STUDENT TO COMPLETE
```

Do not prefill any idea.

---

# 13. Optional Extra Student Slots

Create three additional empty slots per feature:

```text
STUDENT-FR02-06
STUDENT-FR02-07
STUDENT-FR02-08

STUDENT-FR09-06
STUDENT-FR09-07
STUDENT-FR09-08

STUDENT-FR18-06
STUDENT-FR18-07
STUDENT-FR18-08
```

These are optional buffer ideas.

Again:

```text
STUDENT TO COMPLETE
```

only.

---

# 14. Student Reflection Questions

Provide questions, not answers.

For FR-02:

* What behavior surprised me as missing after reviewing all login tests?
* Is there a relationship between two already-tested dimensions that AI never combined?
* Is there an observable security concern not already isolated?
* Does any current exploratory case hide a narrower independently useful objective?
* What would I personally test first if I had only five additional tests?

For FR-09:

* Which coupon behavior would I distrust most despite the existing 35 cases?
* Is any business interaction insufficiently isolated?
* Is there any relationship between identity, coupon, total, and repeated use that I independently consider important?
* Are existing schema observations enough for my testing goals?
* What would I manually test that the AI suite does not express distinctly?

For FR-18:

* Which Admin order operation has the greatest residual risk?
* Is there any interaction between authorization and state that I independently want to isolate?
* Is mutation isolation adequately represented?
* Is there any persistence concern that I personally consider important?
* What five tests would I prioritize if this were a production Admin API?

Do not answer these questions.

---

# 15. Duplicate-Check Procedure for Later Student Ideas

Define the procedure to use after the student fills the worksheet.

For every student idea later check:

1. Does an AI case already have the same logical objective?
2. Does it cover the same TB?
3. Does it cover the same EP?
4. Does it exercise the same state relation?
5. Does it have the same security objective?
6. Does it add a new oracle?
7. Does it add a new interaction?
8. Does it add any meaningful coverage?

If all answers indicate existing coverage:

```text
DUPLICATE
```

Otherwise:

```text
POTENTIALLY_NEW
```

Do not perform this check until the student has actually supplied the ideas.

---

# 16. Student-Authorship Evidence

Prepare a section:

```text
Student Extension Authorship Record
```

with:

| Student Idea ID | Date | Idea Written By | AI Involvement at Ideation Stage | Later AI Validation Allowed? |
| --------------- | ---- | --------------- | -------------------------------- | ---------------------------- |
| ...             | ...  | STUDENT         | NONE                             | YES                          |

Leave testcase rows to be completed later.

The purpose is to make the AI/human boundary explicit.

---

# 17. What If the Student Still Finds No Missing Tests?

Document this explicitly.

If all 15 mandatory student slots remain empty after the second human review, report:

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

Do not falsely mark the extension phase complete.

Do not fabricate student tests.

---

# 18. Required Final Response Structure

Use exactly:

# Prompt 009 — Human Extension Reassessment

## 1. Executive Summary

Include:

* existing AI cases,
* quota,
* first human extension conclusion,
* whether genuine uncovered testable areas were detected,
* student extension status.

---

## 2. Existing Coverage Inventory

Coverage-dimension table.

---

## 3. Test Density by Feature

Counts.

---

## 4. Requirement Saturation

TB table.

---

## 5. Equivalence Partition Saturation

EP table.

---

## 6. Technique Saturation

Technique table.

---

## 7. Unresolved Areas

UA table.

---

## 8. Gap Classification

Gap table.

---

## 9. FR-02 Student Ideation Worksheet

Eight empty student slots.

---

## 10. FR-09 Student Ideation Worksheet

Eight empty student slots.

---

## 11. FR-18 Student Ideation Worksheet

Eight empty student slots.

---

## 12. Student Reflection Questions

Questions only.

---

## 13. Future Duplicate-Check Procedure

Procedure only.

---

## 14. Student Authorship Record

Empty authorship table.

---

## 15. Extension Compliance Status

Use exactly one:

```text
SATISFIED
```

only if the student has independently supplied at least five accepted non-duplicate tests for each feature.

Otherwise:

```text
NOT YET SATISFIED
```

---

## 16. Current Project Status

Use:

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

unless the student has actually populated and approved the required extension.

---

## 17. Machine-Usable Summary

End exactly:

```text
PROMPT_009_SUMMARY

Existing AI-generated cases:
FR-02 AI quota:
FR-09 AI quota:
FR-18 AI quota:

Genuine uncovered testable areas:
FR-02:
FR-09:
FR-18:

Student idea slots completed:
FR-02:
FR-09:
FR-18:

Accepted HUMAN_ADDED tests:
FR-02:
FR-09:
FR-18:

Student extension requirement:
SATISFIED / NOT YET SATISFIED

Next action:
STUDENT INDEPENDENT IDEATION
```

---

# 19. Important Constraints

* Do not generate new testcases.
* Do not generate testcase ideas.
* Do not create HUMAN_ADDED IDs.
* Do not suggest specific new scenarios.
* Do not populate student ideation slots.
* Do not fabricate student authorship.
* Do not mark the extension requirement complete without student-created tests.
* Do not alter the existing 129 AI-generated tests.
* Do not alter human-audit decisions.
* Do not inspect implementation.
* Do not execute APIs.
* Do not create Postman requests.
* Do not create concrete test data.
* Do not invent SEC definitions.
* Do not invent specification rules.
* Do not convert blockers into requirements.

The objective is:

**Existing 129-Test AI Suite → Independent Human Reassessment → Student Ideation Workspace**

not:

**AI generates the required student-added tests**.

---

# 20. Output Artifacts

Create:

```text
analysis/student-extension-reassessment.md
analysis/student-extension-worksheet.md
```

Log:

```text
prompts/Prompt-009-human-extension-reassessment.md
```

Append the Prompt 009 index entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–008 logs.

