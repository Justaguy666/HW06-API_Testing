# Prompt 019 — Current-Scope Student Extension Reassessment and Human Worksheet

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 018 reconciled the project into the canonical current selected suite.

Current selected features:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Superseded historical feature:

* **FR-09: Discount Coupons**

Current canonical suite:

```text
FR-02:
35 / 35 AI-generated tests

FR-07:
35 / 35 AI-generated tests

FR-18:
35 / 35 AI-generated tests

TOTAL:
105 / 105 — PASS
```

Current canonical directory:

```text
analysis/current-selected-suite/
```

Prompt 018 established:

```text
Current TB count:
FR-02 = 7
FR-07 = 13
FR-18 = 11
TOTAL = 31

Current EP count:
FR-02 = 15
FR-07 = 36
FR-18 = 24
TOTAL = 75

Active blockers:
24

Active full duplicates:
0

Stale FR-09 references:
0
```

One known traceability issue remains:

```text
TB-FR18-014
```

is a valid dependency-basis item but is not directly referenced by a testcase after human audit.

The assignment requires:

```text
Student extension:
>= 5 student-authored additional logical tests
per selected API / feature
```

Therefore the minimum current extension requirement is:

```text
FR-02 >= 5
FR-07 >= 5
FR-18 >= 5

TOTAL >= 15 STUDENT-ADDED TESTS
```

---

# 1. Purpose

Prepare the current selected suite for genuine student-authored test extension.

The transformation is:

```text
105 AI-generated current tests
        ↓
Coverage / technique / risk reassessment
        ↓
Identify areas AI may have missed
        ↓
Prepare HUMAN-OWNED extension worksheet
        ↓
STUDENT creates >=5 tests per feature
```

This prompt must:

1. reassess the canonical current suite,
2. identify genuine residual coverage opportunities,
3. identify areas where AI-generated tests may have been weak,
4. identify uncovered or weakly covered TB / EP / interaction / oracle / blocker dimensions,
5. explicitly review `TB-FR18-014`,
6. prepare at least 5 human-owned extension slots per selected feature,
7. explain what kind of independent value a student test should add,
8. preserve authorship integrity.

This prompt must **not write the student's tests**.

---

# 2. Authoritative Inputs

Use the canonical current-state artifacts:

```text
analysis/current-selected-suite/selected-features.md
analysis/current-selected-suite/verified-test-basis.md
analysis/current-selected-suite/domain-and-partition-summary.md
analysis/current-selected-suite/boundary-analysis-summary.md
analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
analysis/current-selected-suite/blocker-register.md
analysis/current-selected-suite/suite-reconciliation-summary.md
```

Historical artifacts may be inspected only where needed to understand provenance.

Also inspect:

```text
analysis/student-extension-reassessment.md
analysis/student-extension-worksheet.md
analysis/ai-assisted-extension-candidate-analysis.md
```

only to determine historical provenance.

---

# 3. Historical Extension Integrity

Previous extension artifacts were created under the old selected feature set:

```text
FR-02
FR-09
FR-18
```

They must not automatically satisfy the current requirement.

Use:

```text
OLD FR-09 EXTENSION WORK:
HISTORICAL ONLY
```

Any previously generated AI candidate remains:

```text
AI_ASSISTED_CANDIDATE
```

It must never be silently relabeled:

```text
HUMAN_ADDED
STUDENT_AUTHORED
```

FR-02 and FR-18 historical AI-assisted candidates may be inspected only as evidence of what AI already suggested.

They do not count as student extension unless the student independently creates or substantially redesigns a testcase and explicitly records that authorship.

---

# 4. Student Extension Requirement

The current minimum requirement is:

| Feature | Required Student Tests |
| ------- | ---------------------: |
| FR-02   |                   >= 5 |
| FR-07   |                   >= 5 |
| FR-18   |                   >= 5 |
| TOTAL   |                  >= 15 |

These must be genuine student additions beyond the AI-generated current suite.

They do not replace the 105 AI-generated quota tests.

---

# 5. Authorship Categories

Use exactly:

```text
AI_GENERATED
AI_ASSISTED_CANDIDATE
HUMAN_ADDED
```

For Prompt 019:

```text
HUMAN_ADDED = 0
```

because the student has not yet authored the worksheet entries.

Do not populate HUMAN_ADDED content.

---

# 6. Reassess Current Coverage

Review all current selected feature coverage.

For each feature analyze:

* test-basis coverage,
* EP coverage,
* state coverage,
* interaction coverage,
* sequence coverage,
* authentication,
* authorization,
* resource access,
* schema,
* semantic oracle,
* state oracle,
* security,
* robustness,
* dependencies,
* blocker-driven uncertainty.

Required summary:

| Feature | Area | Existing Coverage | Residual Opportunity | Strength |
| ------- | ---- | ----------------- | -------------------- | -------- |

Strength:

* STRONG
* ADEQUATE
* PARTIAL
* BLOCKED
* WEAK

---

# 7. Do Not Invent Missing Requirements

A residual opportunity may be identified from:

```text
weak coverage
partial oracle isolation
state interaction
sequence interaction
dependency behavior
uncovered traceability
blocker-aware exploration
security-relevant context
```

but not from invented requirements.

Do not manufacture:

* HTTP statuses,
* schemas,
* min/max values,
* state rules,
* authorization rules,
* Cart behavior,
* business constraints.

---

# 8. FR-02 Reassessment

Analyze all 35 current FR-02 AI tests.

Identify whether independent student value could still come from areas such as, only where supported:

* login state interaction,
* account lockout sequence,
* repeated authentication attempts,
* token/schema isolation,
* error-contract observation,
* recovery/unlock uncertainty,
* malformed representation,
* security-relevant behavior.

Do not generate tests.

Required table:

| FR-02 Opportunity ID | Coverage Area | Existing AI Coverage | Why Additional Human Thinking May Help | Relevant TB/EP/Blocker |
| -------------------- | ------------- | -------------------- | -------------------------------------- | ---------------------- |

IDs:

```text
EXTGAP-FR02-001
EXTGAP-FR02-002
...
```

---

# 9. FR-07 Reassessment

Analyze all 35 current FR-07 AI tests.

FR-07 currently has:

```text
36 EP
11 INT
12 FR-07 blockers
0 BVA tests
```

BVA remains:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

Possible residual areas may involve, only if genuinely supported:

* add → retrieve sequence,
* repeated retrieval,
* representation handling,
* product-resource dependency,
* authentication isolation,
* response contract,
* observational consistency,
* blocker-aware Cart behavior.

Do not generate tests.

Required table:

| FR-07 Opportunity ID | Coverage Area | Existing AI Coverage | Why Additional Human Thinking May Help | Relevant TB/EP/INT/Blocker |
| -------------------- | ------------- | -------------------- | -------------------------------------- | -------------------------- |

IDs:

```text
EXTGAP-FR07-001
EXTGAP-FR07-002
...
```

---

# 10. FR-18 Reassessment

Analyze all 35 current FR-18 AI tests.

Explicitly audit:

```text
TB-FR18-014
```

because Prompt 018 identified:

```text
valid dependency basis
but no direct testcase reference after human audit
```

Determine exactly whether this represents:

```text
TRACEABILITY_ONLY_GAP
TEST_COVERAGE_GAP
DEPENDENCY_SETUP_ONLY
POTENTIAL_EXTENSION_OPPORTUNITY
```

Do not automatically generate a testcase solely to reference the TB.

Required explanation:

```text
TB-FR18-014 status:
Reason:
Does it justify a student-added testcase?:
YES / NO / POSSIBLY
```

Then analyze other genuine FR-18 opportunities.

Required table:

| FR-18 Opportunity ID | Coverage Area | Existing AI Coverage | Why Additional Human Thinking May Help | Relevant TB/EP/Blocker |
| -------------------- | ------------- | -------------------- | -------------------------------------- | ---------------------- |

IDs:

```text
EXTGAP-FR18-001
EXTGAP-FR18-002
...
```

---

# 11. AI Miss Analysis

The assignment requires explaining why AI missed each student-added test.

Prompt 019 should prepare **categories of possible AI weakness**, not write the eventual explanation for the student.

Allowed categories:

```text
OVER_GENERALIZATION
INSUFFICIENT_STATE_COMBINATION
INSUFFICIENT_SEQUENCE_DEPTH
ORACLE_NOT_ISOLATED
DEPENDENCY_OVERLOOKED
SECURITY_CONTEXT_UNDEREXPLORED
ROBUSTNESS_CLASS_UNDEREXPLORED
TRACEABILITY_GAP
HUMAN_RISK_INSIGHT
OTHER_STUDENT_JUSTIFIED
```

Required table:

| Category | Description | Current Suite Evidence |
| -------- | ----------- | ---------------------- |

Do not preselect a category for a future student test.

---

# 12. Technique Diversity Guidance

Student additions should not be five superficial variations of the same test.

Potential techniques include:

```text
DOMAIN
STATE
SEQUENCE
INTERACTION
AUTHENTICATION
AUTHORIZATION
RESOURCE
ROBUSTNESS
SCHEMA
SECURITY
BUSINESS_RULE
DEPENDENCY
```

BVA may only be used where an explicit boundary exists.

Do not encourage FR-07 BVA because its current BVA result is N/A.

---

# 13. Duplicate Avoidance Guidance

A student-added test must add at least one independent delta:

```text
NEW_EP_RELATION
NEW_INTERACTION
NEW_SEQUENCE
NEW_STATE_OBSERVATION
NEW_ORACLE_ISOLATION
NEW_SECURITY_PERSPECTIVE
NEW_RESOURCE_CONTEXT
NEW_DEPENDENCY_CONTEXT
NEW_ROBUSTNESS_PERSPECTIVE
NEW_HUMAN_RISK_INSIGHT
```

If none exists:

```text
REJECT AS DUPLICATE
```

---

# 14. Prepare Student Extension Worksheet

Create exactly:

```text
8 slots for FR-02
8 slots for FR-07
8 slots for FR-18
```

Total:

```text
24 human ideation slots
```

The requirement is only 5 per feature, but 8 slots provide room for rejection/refinement.

---

# 15. Slot IDs

Use:

```text
HUMAN-FR02-01 ... HUMAN-FR02-08
HUMAN-FR07-01 ... HUMAN-FR07-08
HUMAN-FR18-01 ... HUMAN-FR18-08
```

These are worksheet slot IDs only.

They are not final testcase IDs.

Do not allocate `TC-API-*` IDs yet.

---

# 16. Worksheet Fields

For every slot use:

```text
Slot ID:
Feature:

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION
```

---

# 17. Do Not Fill Student Content

All substantive test-design fields in all 24 slots must remain:

```text
STUDENT TO COMPLETE
```

Do not provide:

* suggested title,
* suggested payload,
* suggested objective,
* candidate test,
* expected result,
* test steps.

Prompt 019 identifies **where gaps may exist**, not what exact student testcase to write.

---

# 18. Gap-to-Slot Mapping

You may map each worksheet slot to one or more general opportunity IDs.

Example structure:

| Slot | Suggested Opportunity Areas |
| ---- | --------------------------- |

But this must only contain:

```text
EXTGAP-FRxx-*
```

IDs.

Do not provide a testcase idea.

The student may ignore the mapping.

---

# 19. Minimum Adoption Rule

The worksheet must state:

```text
At least 5 accepted HUMAN_ADDED tests per feature are required.
```

Therefore:

```text
FR-02:
minimum accepted slots = 5

FR-07:
minimum accepted slots = 5

FR-18:
minimum accepted slots = 5
```

---

# 20. Student Authorship Confirmation

Every adopted test must later contain a student confirmation such as:

```text
I independently selected and authored this additional test objective after reviewing the AI-generated suite.
```

Do not pre-fill this confirmation.

The student must explicitly provide it.

---

# 21. Previous AI-Assisted Candidates

Audit existing:

```text
analysis/ai-assisted-extension-candidate-analysis.md
analysis/student-extension-worksheet.md
```

Classify each previous candidate as:

```text
HISTORICAL_AI_CANDIDATE_FR09
AI_CANDIDATE_CURRENT_FR02
AI_CANDIDATE_CURRENT_FR18
OTHER
```

Do not copy their substantive testcase content into the new human worksheet.

For FR-02 and FR-18, these existing AI suggestions are especially useful for **duplicate avoidance**:

```text
If the student independently proposes substantially the same idea,
it must be disclosed as overlap with an existing AI candidate.
```

---

# 22. FR-07 Provenance

FR-07 did not exist in the original extension-candidate workflow.

Therefore create a clean current status:

```text
FR-07 previous student extension:
NONE

FR-07 current human extension:
NOT STARTED
```

Do not generate AI candidate tests for FR-07 in Prompt 019.

---

# 23. Current Extension Status

After worksheet creation, report:

```text
FR-02 HUMAN_ADDED:
0 / 5

FR-07 HUMAN_ADDED:
0 / 5

FR-18 HUMAN_ADDED:
0 / 5

TOTAL:
0 / 15
```

Result:

```text
STUDENT_EXTENSION_NOT_YET_SATISFIED
```

This is expected.

---

# 24. Extension Workflow

Document:

```text
Prompt 019
Current-scope reassessment + empty human worksheet
        ↓
STUDENT fills candidate extension tests
        ↓
STUDENT selects >=5 per feature
        ↓
Prompt 020
Validate, de-duplicate, trace, and integrate
student-authored tests
        ↓
Current logical suite complete
        ↓
Concrete test-data design
```

---

# 25. No AI Test Generation

Prompt 019 must generate:

```text
AI_GENERATED tests = 0
AI_ASSISTED_CANDIDATE tests = 0
HUMAN_ADDED tests = 0
```

Only gap-analysis metadata and empty human-owned slots are created.

---

# 26. Canonical-Suite Preservation

Do not modify:

```text
analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
```

The current 105 AI-generated suite remains authoritative until student tests are validated.

Do not add incomplete human slots into the canonical testcase suite.

---

# 27. Output Artifact — Reassessment

Create:

```text
analysis/current-selected-suite/student-extension-reassessment.md
```

Required sections:

1. Current suite baseline
2. Extension requirement
3. FR-02 residual opportunity analysis
4. FR-07 residual opportunity analysis
5. FR-18 residual opportunity analysis
6. TB-FR18-014 investigation
7. AI-miss category framework
8. Technique diversity
9. Duplicate avoidance
10. Historical AI candidate handling
11. Current extension status
12. Human workflow

---

# 28. Output Artifact — Worksheet

Create:

```text
analysis/current-selected-suite/student-extension-worksheet.md
```

It must contain:

```text
24 slots
8 FR-02
8 FR-07
8 FR-18
```

with all student-owned substantive fields empty.

---

# 29. Extension Gap Summary

Required table:

| Feature | Opportunity Areas | Human Slots | Required Accepted |
| ------- | ----------------: | ----------: | ----------------: |
| FR-02   |                   |           8 |                 5 |
| FR-07   |                   |           8 |                 5 |
| FR-18   |                   |           8 |                 5 |

Do not interpret Opportunity Areas as testcase count.

---

# 30. Traceability-Gap Summary

Explicitly report:

| Gap         | Feature | Type | Extension Relevance |
| ----------- | ------- | ---- | ------------------- |
| TB-FR18-014 | FR-18   |      |                     |

Extension Relevance:

* HIGH
* MEDIUM
* LOW
* NONE

Give reasoning without proposing a testcase.

---

# 31. Validation

Required:

```text
Current AI suite modified:
NO

New TC-API IDs allocated:
0

AI-generated extension tests:
0

AI-assisted candidate tests:
0

HUMAN_ADDED tests:
0

Human worksheet slots:
24

FR-02 slots:
8

FR-07 slots:
8

FR-18 slots:
8

Student-owned substantive fields pre-filled:
0
```

---

# 32. Quality Validation

Validate:

| Check                                      | Result    |
| ------------------------------------------ | --------- |
| Current features = FR02/FR07/FR18          | PASS/FAIL |
| FR09 kept historical                       | PASS/FAIL |
| 105 AI suite unchanged                     | PASS/FAIL |
| TB-FR18-014 explicitly reviewed            | PASS/FAIL |
| Previous AI candidates not relabeled human | PASS/FAIL |
| 24 empty human slots created               | PASS/FAIL |
| No concrete test generated                 | PASS/FAIL |
| No TC-API ID allocated                     | PASS/FAIL |
| No implementation assumption               | PASS/FAIL |
| No invented requirement                    | PASS/FAIL |

---

# 33. Required Final Response Structure

Use exactly:

# Prompt 019 — Current-Scope Student Extension Reassessment

## 1. Executive Summary

Include:

* selected features,
* AI suite = 105,
* student extension = 0/15,
* residual opportunity counts,
* TB-FR18-014 status,
* worksheet slots = 24.

## 2. Extension Requirement

## 3. FR-02 Residual Opportunity Analysis

## 4. FR-07 Residual Opportunity Analysis

## 5. FR-18 Residual Opportunity Analysis

## 6. TB-FR18-014 Review

## 7. AI-Miss Category Framework

## 8. Technique Diversity Guidance

## 9. Duplicate Avoidance

## 10. Historical AI Candidate Handling

## 11. FR-02 Worksheet Slots

8 slots.

## 12. FR-07 Worksheet Slots

8 slots.

## 13. FR-18 Worksheet Slots

8 slots.

## 14. Gap-to-Slot Mapping

## 15. Extension Status

Use:

```text
FR-02:
0 / 5

FR-07:
0 / 5

FR-18:
0 / 5

TOTAL:
0 / 15

STUDENT_EXTENSION_NOT_YET_SATISFIED
```

## 16. Validation

## 17. Student Instructions

Explain that the student must independently fill the worksheet and select at least five tests per feature.

## 18. Current Project Status

Use:

```text
CURRENT AI SUITE:
105 / 105 — COMPLETE

FR-02 STUDENT EXTENSION:
NOT STARTED

FR-07 STUDENT EXTENSION:
NOT STARTED

FR-18 STUDENT EXTENSION:
NOT STARTED

STUDENT EXTENSION:
0 / 15

CONCRETE TEST DATA:
NOT STARTED

POSTMAN:
NOT STARTED

EXECUTION:
NOT STARTED
```

## 19. Machine-Usable Summary

End exactly:

```text
PROMPT_019_SUMMARY

Current selected features:
FR-02
FR-07
FR-18

Current AI-generated suite:
105

FR-02 opportunity areas:
FR-07 opportunity areas:
FR-18 opportunity areas:

TB-FR18-014 status:
TB-FR18-014 extension relevance:

Human worksheet slots:
24

FR-02 slots:
8

FR-07 slots:
8

FR-18 slots:
8

AI-generated extension tests:
0

AI-assisted extension candidates generated:
0

HUMAN_ADDED tests:
0

Student extension:
FR-02: 0 / 5
FR-07: 0 / 5
FR-18: 0 / 5
TOTAL: 0 / 15

Current AI suite modified:
NO

Next required action:
STUDENT COMPLETES CURRENT-SCOPE EXTENSION WORKSHEET

Next AI prompt after student completion:
PROMPT 020 — VALIDATE AND INTEGRATE STUDENT-ADDED TESTS
```

---

# 34. Important Constraints

* Do not generate student tests.
* Do not suggest exact testcases.
* Do not allocate TC-API IDs.
* Do not create HUMAN_ADDED content.
* Do not create AI_ASSISTED_CANDIDATE content.
* Do not reuse FR-09 extension candidates.
* Do not relabel AI candidate content as human authored.
* Do not modify the current 105 AI-generated suite.
* Do not modify completed human-audit decisions.
* Do not inspect implementation.
* Do not execute APIs.
* Do not generate concrete test data.
* Do not create Postman requests.
* Do not invent requirements.
* Do not resolve blockers by assumption.
* Do not force every residual opportunity to become a testcase.
* Preserve authorship provenance.

The objective is:

**Reconciled 105-Test AI Suite → Human Extension Opportunity Map**

not:

**AI writes the required human-added tests**.

---

# 35. Output Artifacts

Create:

```text
analysis/current-selected-suite/student-extension-reassessment.md
analysis/current-selected-suite/student-extension-worksheet.md
```

Log:

```text
prompts/Prompt-019-current-scope-student-extension-reassessment.md
```

Append exactly one Prompt 019 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–018 historical prompt contents.
