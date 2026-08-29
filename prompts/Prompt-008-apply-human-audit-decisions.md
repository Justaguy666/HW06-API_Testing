# Prompt 008 — Apply Human Audit Decisions and Normalize Audit Status

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Previous prompts:

* Prompt 001 — Requirement extraction
* Prompt 002 — Requirement verification and normalization
* Prompt 003 — Domain modeling and equivalence partitioning
* Prompt 004 — Boundary Value Analysis
* Prompt 005 — Initial logical testcase design
* Prompt 006 — Scope/quota compliance and gap closure
* Prompt 007 — Human Audit Worksheet Preparation

The student has now completed the human review.

Current authoritative human-review status:

```text
Student Decision pending fields: 0
Student Reason pending fields: 0
Student Correction Decision pending fields: 0

STUDENT HUMAN REVIEW: COMPLETE
```

However, some historical AI-generated descriptive text still contains phrases such as:

```text
pending student review
remain pending
student review pending
```

These stale phrases must now be normalized where they describe the **current audit status**.

Do not alter historical prompt logs.

---

# 1. Objectives

Perform four tasks:

1. validate the completed student human-review decisions,
2. apply approved human correction decisions to the logical testcase design,
3. normalize stale audit-status wording in current analysis artifacts,
4. recalculate suite status and coverage after human review.

This prompt must not override any student decision.

The authoritative hierarchy is:

```text
Student Decision
        ↓
Student Reason
        ↓
Student Correction Decision
        ↓
AI may apply, normalize, and validate
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
8. `analysis/human-audit-worksheet.md`

Also inspect prompt logs only to ensure they are **not modified**:

```text
prompts/Prompt-001-...
...
prompts/Prompt-007-...
prompts/prompt-log.md
```

Prompt logs are historical audit artifacts and must remain verbatim.

---

# 3. Student Decisions Are Authoritative

Do not modify:

* Student Decision
* Student Reason
* Student Correction Decision

Do not reinterpret them.

Do not replace a student decision with an AI recommendation.

If a student decision appears inconsistent with upstream evidence:

* flag it,
* preserve it,
* do not silently change it.

---

# 4. Validate Completion of Human Audit

Confirm:

```text
129 testcase rows exist.
129 Student Decision values are completed.
129 Student Reason values are completed.
129 Student Correction Decision values are completed.
```

No field may contain:

```text
PENDING HUMAN REVIEW
```

in the three student-owned columns.

Required table:

| Validation Item                       | Expected | Actual | Result |
| ------------------------------------- | -------: | -----: | ------ |
| Testcases                             |      129 |        |        |
| Completed Student Decision            |      129 |        |        |
| Completed Student Reason              |      129 |        |        |
| Completed Student Correction Decision |      129 |        |        |
| Pending student-owned fields          |        0 |        |        |

Result:

* PASS
* FAIL

---

# 5. Recalculate Human Audit Results

Count final student decisions.

Required table:

| Decision   | FR-02 | FR-09 | FR-18 | Cross-Feature | Total |
| ---------- | ----: | ----: | ----: | ------------: | ----: |
| VALID      |       |       |       |               |       |
| INVALID    |       |       |       |               |       |
| INCOMPLETE |       |       |       |               |       |

Also count correction decisions:

| Correction Decision    | Count |
| ---------------------- | ----: |
| NO_CHANGE              |       |
| CORRECT                |       |
| COMPLETE               |       |
| RECLASSIFY_EXPLORATORY |       |
| REMOVE_DUPLICATE       |       |
| REMOVE_OUT_OF_SCOPE    |       |

Do not use the old Prompt 007 AI recommendation counts as the human-review result.

---

# 6. Apply NO_CHANGE

For:

```text
Student Decision = VALID
Student Correction Decision = NO_CHANGE
```

preserve the logical testcase.

The testcase may still:

* reference a specification blocker,
* be exploratory,
* have partial schema oracle,
* have unspecified status codes,

provided the student approved that design.

Do not treat a blocker automatically as evidence that a testcase is incomplete.

---

# 7. Apply RECLASSIFY_EXPLORATORY

For every testcase whose correction is:

```text
RECLASSIFY_EXPLORATORY
```

update `analysis/test-case-design.md` so that the testcase clearly becomes an exploratory logical testcase.

Required changes where applicable:

```text
Expected Classification = EXPLORATORY
Readiness = EXPLORATORY_ONLY
```

Replace deterministic wording such as:

```text
Verify that...
Expected...
Must...
Should return...
```

when unsupported, with observational wording such as:

```text
Observe...
Characterize...
Record...
Compare...
```

Hard oracle layers that depend on missing rules must become observational or `UNSPECIFIED`.

Preserve:

* Test ID
* feature
* scope
* origin
* TB references
* EP references
* blocker references

Do not fabricate missing expected behavior.

---

# 8. Apply COMPLETE Decisions

For every testcase whose correction is:

```text
COMPLETE
```

do not invent missing specification rules.

Instead determine whether the testcase can be completed at the **logical-design level** by refining:

* observation goal,
* representation method,
* measurable criterion,
* precondition description,
* execution setup requirement.

Examples:

### Duplicate JSON members

Specify that later execution must use a raw representation capable of preserving duplicate member names.

Do not decide which duplicate member the server must select.

### Malformed JSON

Define that a concrete malformed JSON representation must be selected during test-data design.

Do not invent expected HTTP status.

### Sensitive field exposure

Define a human-review comparison method against fields documented as necessary/allowed.

Do not invent a forbidden-field catalog.

### Very-large numeric magnitude

Require a reproducible concrete magnitude during test-data design.

Do not label it a specification boundary.

### State setup blocked by missing rules

If logical completion remains impossible because an authoritative state transition or lockout rule is absent:

preserve:

```text
Readiness = BLOCKED
```

and explicitly state what must be discovered or supplied before execution.

`COMPLETE` does not authorize inventing missing requirements.

---

# 9. INVALID Handling

If any student testcase is marked:

```text
INVALID
```

apply the student's correction decision.

Allowed actions:

### CORRECT

Revise the logical testcase strictly according to the student's stated correction.

### REMOVE_DUPLICATE

Retain the original ID in the audit history but mark the testcase:

```text
Removed from executable suite
Reason: Human audit — duplicate
```

### REMOVE_OUT_OF_SCOPE

Mark it:

```text
Retained in audit history
Excluded from selected-feature executable scope
```

Never physically erase evidence of the AI-generated testcase from the human audit record.

---

# 10. Preserve AI Origin

All current 129 cases remain historically:

```text
Origin = AI_GENERATED
```

Human correction does not change their origin.

Do not relabel corrected AI cases as:

```text
HUMAN_ADDED
```

The HUMAN_ADDED phase occurs later.

---

# 11. Normalize Stale Audit Wording

Audit current non-prompt analysis artifacts for phrases including:

```text
pending student review
student review pending
remain pending
human review pending
```

Distinguish two categories.

## A. Current-status wording

If the phrase describes the current state of human review:

UPDATE IT.

Examples:

```text
Student review remains pending.
```

→

```text
Student human review is complete.
```

---

## B. Historical explanation

If the phrase appears inside a preserved description of what Prompt 007 originally recommended:

it may be rewritten in current analysis artifacts for clarity, provided the historical meaning is retained.

Example:

```text
retain as exploratory pending student review
```

may become:

```text
Prompt 007 recommended retaining this as exploratory;
the subsequent student review decision is recorded in
the Student Decision fields.
```

Do not make it appear that review is still pending.

---

# 12. Do Not Modify Prompt Logs

The following are immutable historical records:

```text
prompts/Prompt-001-...
prompts/Prompt-002-...
prompts/Prompt-003-...
prompts/Prompt-004-...
prompts/Prompt-005-...
prompts/Prompt-006-...
prompts/Prompt-007-...
```

If they contain:

```text
pending
```

leave them unchanged.

This includes Prompt 005 and Prompt 007 historical wording.

`prompts/prompt-log.md` may receive a new Prompt 008 index entry, but historical prompt text must not be rewritten.

---

# 13. Do Not Modify Domain Status Values Accidentally

The word:

```text
pending
```

may represent an actual order status.

Examples:

```text
pending
confirmed
shipping
delivered
canceled
```

Do not modify domain values merely because they contain the word `pending`.

Only normalize review-status language.

---

# 14. Update test-case-design.md

Apply all human-approved corrections.

For every testcase retain the standard logical-test fields.

Add or preserve a Human Audit section such as:

```text
Human Audit:
Decision:
Reason:
Correction:
Applied:
```

`Applied` must be:

* YES
* NOT_REQUIRED
* BLOCKED

Do not remove original traceability.

---

# 15. Update human-audit-worksheet.md

Preserve the completed student-owned fields.

Update:

```text
AI WORKSHEET PREPARATION: COMPLETE
STUDENT HUMAN REVIEW: COMPLETE
```

Remove stale statements implying the student review is still pending from current summary/status sections.

Do not remove AI Review Recommendation or AI Reason columns.

They are historical evidence showing what the AI recommended before the human decision.

Where useful, clarify:

```text
AI recommendation was produced before student review.
Student Decision is the authoritative final audit decision.
```

---

# 16. Update Coverage Matrix

Recalculate coverage after applying human decisions.

For each testcase account for whether it is:

* retained deterministic,
* retained exploratory,
* retained blocked,
* removed duplicate,
* removed out-of-scope.

Required summary:

```text
COVERED:
BLOCKED:
DEFERRED_EXPLORATORY:
REMOVED_AFTER_HUMAN_AUDIT:
TOTAL:
```

Do not count removed tests as active coverage.

---

# 17. Verify AI-Generated Quota After Human Audit

This is critical.

Count active quota-eligible AI-generated cases for:

```text
FR-02
FR-09
FR-18
```

Required table:

| Feature | Before Human Audit | Active After Human Audit | Minimum Required | Result |
| ------- | -----------------: | -----------------------: | ---------------: | ------ |
| FR-02   |                 35 |                          |               35 |        |
| FR-09   |                 35 |                          |               35 |        |
| FR-18   |                 35 |                          |               35 |        |

Result:

* PASS
* FAIL

An exploratory testcase may remain active and quota-eligible if:

* it is still a meaningful logical testcase,
* it remains in scope,
* and the student approved it.

Do not remove a case from quota merely because it is exploratory.

If quota falls below 35:

flag it explicitly.

Do not generate replacement tests in Prompt 008.

---

# 18. Current-State Audit

Search current analysis artifacts and classify all remaining occurrences of review-related `pending`.

Required table:

| File | Phrase / Context | Category | Action |
| ---- | ---------------- | -------- | ------ |

Category:

* STALE_CURRENT_STATUS
* HISTORICAL_DESCRIPTION
* DOMAIN_VALUE
* PROMPT_LOG
* OTHER

Action:

* UPDATED
* PRESERVED
* NOT_APPLICABLE

Goal:

```text
Stale current human-review status occurrences = 0
```

---

# 19. Required Final Response Structure

Use exactly:

# Prompt 008 — Apply Human Audit Decisions and Normalize Audit Status

## 1. Executive Summary

Include:

* total testcases,
* VALID,
* INVALID,
* INCOMPLETE,
* correction-decision counts,
* retained tests,
* removed tests,
* quota status,
* stale review-status occurrences remaining.

---

## 2. Human Audit Completion Validation

Validation table.

---

## 3. Final Human Audit Results

Decision counts.

---

## 4. Human Correction Application

### 4.1 NO_CHANGE

Summary.

### 4.2 RECLASSIFY_EXPLORATORY

List test IDs and resulting design changes.

### 4.3 COMPLETE

List test IDs and applied refinements / remaining blockers.

### 4.4 CORRECT

If any.

### 4.5 REMOVE_DUPLICATE

If any.

### 4.6 REMOVE_OUT_OF_SCOPE

If any.

---

## 5. Updated Logical Test Suite

Provide:

| Test ID | Feature | Scope | Human Decision | Human Correction | Final Classification | Final Readiness | Active? |
| ------- | ------- | ----- | -------------- | ---------------- | -------------------- | --------------- | ------- |

for all 129 cases.

---

## 6. Updated Coverage

Requirement / partition / exploratory / blocker coverage summary.

---

## 7. AI-Generated Quota Validation

35/35/35 validation table.

---

## 8. Stale Status Cleanup

List updated current-analysis occurrences.

Explicitly report prompt-log occurrences that were intentionally preserved.

---

## 9. Consistency Validation

Validate:

* 129 historical AI-generated IDs preserved,
* Student Decisions unchanged,
* Student Reasons unchanged,
* Student Correction Decisions unchanged,
* no testcase origin changed,
* no prompt logs rewritten,
* no order-status `pending` values accidentally changed,
* no undocumented rule introduced,
* quota accurately recalculated.

---

## 10. Current Project Status

Use:

```text
AI TEST GENERATION: COMPLETE
AI TEST QUOTA: COMPLETE
STUDENT HUMAN REVIEW: COMPLETE
HUMAN AUDIT CORRECTIONS: COMPLETE

HUMAN-ADDED TEST EXTENSION: PENDING
CONCRETE TEST DATA DESIGN: NOT STARTED
POSTMAN IMPLEMENTATION: NOT STARTED
API EXECUTION: NOT STARTED
```

---

## 11. Machine-Usable Summary

End exactly:

```text
PROMPT_008_SUMMARY

Total historical AI-generated cases:
Active AI-generated cases:

Human decisions:
VALID:
INVALID:
INCOMPLETE:

Corrections:
NO_CHANGE:
CORRECT:
COMPLETE:
RECLASSIFY_EXPLORATORY:
REMOVE_DUPLICATE:
REMOVE_OUT_OF_SCOPE:

FR-02 active quota-eligible:
FR-09 active quota-eligible:
FR-18 active quota-eligible:

Stale current review-status occurrences remaining:

Student human review:
COMPLETE

Next required phase:
STUDENT HUMAN-ADDED TEST EXTENSION
```

---

# 20. Important Constraints

* Do not alter student decisions.
* Do not alter student reasons.
* Do not alter student correction decisions.
* Do not generate new testcases.
* Do not create HUMAN_ADDED cases.
* Do not create concrete test data.
* Do not create Postman requests.
* Do not execute APIs.
* Do not inspect implementation code.
* Do not generate attack payloads.
* Do not invent SEC-01–SEC-07 definitions.
* Do not invent lockout rules.
* Do not invent coupon rules.
* Do not invent order transition rules.
* Do not fabricate response schemas.
* Do not rewrite historical prompt logs.
* Do not change legitimate order-status `pending` values.
* Preserve all 129 historical testcase IDs.

The objective is:

**Completed Student Human Review → Applied Corrections → Clean Current Artifacts**

not:

**AI re-reviews or replaces the student's decisions**.

---

# 21. Output Artifacts

Update:

```text
analysis/human-audit-worksheet.md
analysis/test-case-design.md
analysis/test-coverage-matrix.md
```

Create:

```text
analysis/human-audit-application-summary.md
```

Log Prompt 008 as:

```text
prompts/Prompt-008-apply-human-audit-decisions.md
```

Append only the Prompt 008 index entry to:

```text
prompts/prompt-log.md
```

Do not rewrite historical prompt contents.

