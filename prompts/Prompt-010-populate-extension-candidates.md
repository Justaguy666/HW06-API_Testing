# Prompt 010 — Populate Student Extension Worksheet with AI-Assisted Non-Duplicate Test Candidates

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected assignment features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Previous work is complete through Prompt 009.

Current state:

```text
Existing historical AI-generated testcases: 129

Quota-eligible:
FR-02: 35
FR-09: 35
FR-18: 35

Human audit:
VALID: 96
INCOMPLETE: 33
INVALID: 0

Final readiness:
READY: 27
BLOCKED: 15
EXPLORATORY_ONLY: 87

Requirement traceability:
36 / 36 TB covered or accounted for

Equivalence partition traceability:
91 / 91 EP covered or accounted for

UNTESTED_AND_TESTABLE EP:
0 confirmed
```

Prompt 009 created:

```text
analysis/student-extension-reassessment.md
analysis/student-extension-worksheet.md
```

The worksheet currently contains:

```text
FR-02: 8 empty slots
FR-09: 8 empty slots
FR-18: 8 empty slots
Total: 24 slots
```

Each field currently contains:

```text
STUDENT TO COMPLETE
```

---

# 1. Purpose

Populate all 24 extension slots with **high-quality AI-assisted candidate test ideas**.

The candidates must:

1. add meaningful coverage beyond the existing 129-test AI suite,
2. avoid simple equivalence-partition duplication,
3. prefer risk-based, interaction, sequence, state, security, isolation, persistence, and contract-oriented coverage,
4. explicitly identify the closest existing testcase(s),
5. explain why the new candidate is not a duplicate,
6. trace to existing TB/EP/blockers where applicable,
7. not invent undocumented requirements,
8. preserve uncertainty where the specification is incomplete.

This prompt may generate testcase ideas.

Therefore all generated ideas must be clearly labeled:

```text
AI_ASSISTED_CANDIDATE
```

Do not label them:

```text
HUMAN_ADDED
```

The student will later independently review, modify, accept, or reject them.

---

# 2. Input Artifacts

Use all of the following:

1. `api_specification.md`
2. `analysis/verified-test-basis.md`
3. `analysis/domain-model.md`
4. `analysis/boundary-value-analysis.md`
5. `analysis/test-case-design.md`
6. `analysis/test-coverage-matrix.md`
7. `analysis/scope-and-gap-analysis.md`
8. `analysis/human-audit-worksheet.md`
9. `analysis/human-audit-application-summary.md`
10. `analysis/student-extension-reassessment.md`
11. `analysis/student-extension-worksheet.md`

Do not inspect implementation source code.

Do not execute APIs.

Do not use runtime behavior.

---

# 3. Existing Suite Is the Duplicate Baseline

Treat all 129 existing testcases as the duplicate baseline.

Before proposing any candidate, inspect the existing suite and determine:

* same objective?
* same input condition?
* same state relationship?
* same actor/authorization context?
* same security concern?
* same response oracle?
* same mutation oracle?
* same repeated-operation behavior?
* same interaction between factors?

A new candidate is NOT meaningfully new merely because:

* it uses a different literal value,
* it changes wording,
* it uses another member of the same EP,
* it repeats the same authentication failure,
* it repeats the same schema assertion,
* it changes only an arbitrary identifier.

---

# 4. Candidate Priority

Because Prompt 009 found:

```text
UNTESTED_AND_TESTABLE EP = 0
```

do not prioritize new single-factor EP tests.

Prefer the following dimensions, in this order:

1. INTERACTION
2. STATE INTERACTION
3. SEQUENCE
4. PERSISTENCE
5. MUTATION ISOLATION
6. SECURITY INTERACTION
7. AUTHORIZATION × BUSINESS CONDITION
8. CONTRACT / ORACLE ISOLATION
9. ERROR RECOVERY
10. CROSS-REQUEST CONSISTENCY
11. RISK-BASED BEHAVIOR
12. ROBUSTNESS INTERACTION

---

# 5. Feature-Specific Candidate Strategy

## FR-02 — Login and Account Lockout

The existing suite already contains broad coverage of:

* successful login,
* unknown email,
* wrong password,
* omitted fields,
* null fields,
* wrong types,
* Content-Type behavior,
* extra members,
* whitespace,
* case sensitivity,
* repeated login,
* lockout-related exploratory/state cases,
* account enumeration,
* user information disclosure,
* response contract.

Do not merely reproduce these.

Prefer candidate ideas involving meaningful relationships among:

```text
credential validity
× account state
× repeated requests
× lockout state
× token behavior
× failure disclosure
× response consistency
× recovery
```

Do not invent lockout thresholds or durations.

---

## FR-09 — Discount Coupons

The existing suite already contains broad coverage of:

* coupon existence,
* omitted/null/wrong-type code,
* total_amount variations,
* user_id variations,
* Content-Type,
* response fields,
* case/whitespace handling,
* repeated coupon use,
* cross-user behavior,
* expiry-related exploratory coverage,
* minimum-order-related exploratory coverage,
* discount configuration,
* authorization/user identity relationships.

Do not repeat these as single-factor cases.

Prefer interactions among:

```text
coupon identity
× user identity
× authentication identity
× total amount
× usage history
× response amounts
× repeated application
× persistence
× cross-user effects
```

Do not invent coupon formulas, limits, expiry semantics, or usage rules.

---

## FR-18 — Admin Order Management

The existing suite already contains broad coverage of:

* Admin order listing,
* Admin/non-Admin authentication/authorization,
* missing/invalid order identifier,
* valid/invalid status vocabulary,
* missing/null/wrong-type status,
* Content-Type,
* undocumented members,
* response-schema observations,
* individual target statuses,
* same-state update,
* conflicting updates,
* persistence observation,
* target/non-target isolation,
* authorization-versus-validation precedence.

Do not merely duplicate those.

Prefer meaningful interactions among:

```text
Admin role
× order identity
× current order state
× target state
× repeated update
× multiple orders
× read-after-write
× isolation
× authorization
× response consistency
```

Do not invent a state-transition matrix.

---

# 6. Candidate Acceptance Test

Before including a candidate, calculate:

```text
Candidate novelty =
new interaction
OR new sequence
OR new oracle
OR new mutation observation
OR new security risk isolation
OR new persistence relationship
OR new recovery behavior
```

If none apply:

```text
REJECT AS DUPLICATE
```

and generate a different candidate.

Do not place rejected candidates in the final worksheet.

---

# 7. Duplicate Confidence

For each final candidate assign:

```text
Duplicate Risk:
LOW
MEDIUM
HIGH
```

Only candidates with:

```text
LOW
or
MEDIUM
```

may be retained.

Prefer LOW.

If HIGH:

replace the candidate.

---

# 8. Candidate Evidence Strength

Assign:

```text
Evidence Strength:
STRONG
PARTIAL
EXPLORATORY
```

Definitions:

### STRONG

Objective is directly supported by existing verified requirements.

### PARTIAL

Part of the objective is supported, but some expected behavior is unspecified.

### EXPLORATORY

The candidate intentionally investigates unspecified behavior without a hard oracle.

Do not reject a candidate merely because it is exploratory.

---

# 9. Fill All 24 Worksheet Slots

Populate exactly:

```text
STUDENT-FR02-01
STUDENT-FR02-02
STUDENT-FR02-03
STUDENT-FR02-04
STUDENT-FR02-05
STUDENT-FR02-06
STUDENT-FR02-07
STUDENT-FR02-08

STUDENT-FR09-01
STUDENT-FR09-02
STUDENT-FR09-03
STUDENT-FR09-04
STUDENT-FR09-05
STUDENT-FR09-06
STUDENT-FR09-07
STUDENT-FR09-08

STUDENT-FR18-01
STUDENT-FR18-02
STUDENT-FR18-03
STUDENT-FR18-04
STUDENT-FR18-05
STUDENT-FR18-06
STUDENT-FR18-07
STUDENT-FR18-08
```

No slot may retain:

```text
STUDENT TO COMPLETE
```

except student-owned adoption fields introduced later in this prompt.

---

# 10. Required Fields for Every Slot

Every slot must contain exactly these fields:

```text
Candidate Origin:

Student Test Idea:

Requirement / behavior being targeted:

Why the existing AI suite may have missed or under-isolated this:

Existing closest AI testcase(s):

Existing testcase objective summary:

Why this candidate is not a duplicate:

Coverage delta:

New coverage added:

Expected test technique:

Spec evidence / TB:

Relevant EP:

Potential blocker:

Expected oracle style:

Evidence Strength:

Duplicate Risk:

Execution feasibility:

Student Adoption Decision:

Student Adoption Reason:
```

---

# 11. Fixed Candidate Origin

For all 24:

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE
```

Never use:

```text
HUMAN_ADDED
STUDENT_AUTHORED
HUMAN_GENERATED
```

---

# 12. Student Test Idea

Write a concise logical testcase idea.

It must contain:

* condition/setup,
* operation,
* observation or verification focus.

Example structure only:

```text
Under condition A and condition B, perform operation C and
verify/observe D.
```

Do not generate concrete test data yet.

---

# 13. Requirement / Behavior Being Targeted

Describe the underlying risk or behavior.

Examples of acceptable category wording:

```text
cross-condition consistency
state interaction
authorization interaction
side-effect isolation
read-after-write persistence
failure recovery
response consistency
identity consistency
```

Do not invent a new requirement.

---

# 14. Why AI May Have Missed It

Do not claim the model made an error without evidence.

Use precise explanations such as:

```text
The existing AI suite primarily isolates the two factors
independently but does not isolate their interaction as a
separate logical objective.
```

or:

```text
The existing suite covers the response and state behaviors
separately, while this candidate introduces a dedicated
cross-request oracle.
```

or:

```text
This is a risk-based interaction rather than an uncovered
equivalence partition, so it was not exposed by the
partition-centered design process.
```

---

# 15. Closest Existing Testcases

Every candidate must cite at least one existing:

```text
TC-API-NNN
```

Prefer 1–3 closest tests.

Do not cite unrelated tests merely to populate the field.

---

# 16. Existing Objective Summary

For every cited existing testcase briefly summarize what it already checks.

Example:

```text
TC-API-xxx checks factor A independently.
TC-API-yyy checks factor B independently.
```

---

# 17. Why Not Duplicate

This must state a concrete coverage delta.

Good:

```text
The existing tests verify A and B independently.
This candidate verifies A × B and adds a persistent-state
oracle after the second operation.
```

Bad:

```text
This test is different.
```

---

# 18. Coverage Delta

Use one or more:

```text
NEW_INTERACTION
NEW_SEQUENCE
NEW_STATE_ORACLE
NEW_SECURITY_ORACLE
NEW_SCHEMA_ORACLE
NEW_PERSISTENCE_ORACLE
NEW_ISOLATION_ORACLE
NEW_RECOVERY_ORACLE
NEW_CONSISTENCY_ORACLE
NEW_RISK_FOCUS
```

At least one is mandatory.

---

# 19. New Coverage Added

Write human-readable coverage.

Example:

```text
INTERACTION + PERSISTENCE
```

Allowed labels:

* INTERACTION
* STATE
* SECURITY
* AUTHENTICATION
* AUTHORIZATION
* SCHEMA
* SEQUENCE
* PERSISTENCE
* ISOLATION
* RECOVERY
* CONSISTENCY
* ROBUSTNESS
* BUSINESS_RULE
* RISK_BASED

---

# 20. Expected Test Technique

Choose one or more:

* Risk-Based Testing
* State Transition Testing
* Pairwise / Interaction Testing
* Sequence Testing
* Security Testing
* Error Guessing
* Contract Testing
* Schema Testing
* Negative Testing
* Robustness Testing

Do not claim BVA unless Prompt 004 supports it.

---

# 21. Spec Evidence / TB

Use existing TB IDs only.

Do not create new TB IDs.

If the candidate is exploratory and no single TB fully defines the behavior, cite the closest governing TBs and explicitly state:

```text
Behavior detail remains unspecified.
```

---

# 22. Relevant EP

Use existing EP IDs if relevant.

If the candidate is interaction-based and no new EP exists, use:

```text
Existing EP interaction only — no new EP claimed.
```

Do not fabricate an EP.

---

# 23. Potential Blocker

Use existing blocker IDs only.

If none:

```text
N/A
```

If blocked:

explain exactly which part is blocked.

---

# 24. Expected Oracle Style

Choose one:

```text
DETERMINISTIC
PARTIAL
OBSERVATIONAL
```

Use `OBSERVATIONAL` whenever the specification does not determine the expected behavior.

Do not fabricate deterministic results.

---

# 25. Execution Feasibility

Choose:

```text
READY_FOR_DATA_DESIGN
NEEDS_TEST_DATA_REFINEMENT
BLOCKED_BY_SPEC
```

This assesses logical feasibility only.

Do not execute anything.

---

# 26. Student-Owned Adoption Fields

For all 24 candidates leave:

```text
Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

These are the only fields allowed to remain pending.

The student will later choose:

```text
ACCEPT
MODIFY
REJECT
```

Do not make this decision for the student.

---

# 27. Diversity Requirement

Within each feature's 8 candidates:

* no more than 2 candidates may use the same primary technique,
* at least 3 distinct coverage-delta categories must appear,
* at least one candidate should be sequence-oriented where relevant,
* at least one candidate should examine state/persistence/isolation where relevant,
* at least one candidate should be risk/security-oriented where relevant.

Do not force a category when genuinely not applicable.

---

# 28. Quality Ranking

After generating all eight candidates per feature, rank them:

```text
Priority:
1
2
...
8
```

Ranking criteria:

1. production risk,
2. novelty versus existing 129 tests,
3. specification support,
4. executability,
5. value as student extension.

Priority 1 is strongest.

---

# 29. Recommended Five

For each feature identify:

```text
Recommended five candidates for student review:
```

Select the strongest five from the eight.

This is an AI recommendation only.

Do not mark them accepted.

Required format:

```text
FR-02 Recommended Five:
STUDENT-FR02-xx
...

FR-09 Recommended Five:
...

FR-18 Recommended Five:
...
```

---

# 30. Duplicate Recheck

After all 24 candidates are drafted, perform a second-pass duplicate audit.

Required table:

| Candidate ID | Closest Existing TC | Same Objective? | New Interaction? | New Oracle? | New Sequence? | Final Duplicate Assessment |
| ------------ | ------------------- | --------------- | ---------------- | ----------- | ------------- | -------------------------- |

Final assessment:

* NON_DUPLICATE
* PARTIAL_OVERLAP_BUT_ADDS_VALUE
* DUPLICATE_REJECTED

Any candidate assessed:

```text
DUPLICATE_REJECTED
```

must be replaced before final output.

Final worksheet must contain zero rejected candidates.

---

# 31. Internal Cross-Candidate Duplicate Check

Also compare the 8 candidates inside each feature.

Required table:

| Candidate A | Candidate B | Overlap | Decision |
| ----------- | ----------- | ------- | -------- |

Decision:

* DISTINCT
* ACCEPTABLE_PARTIAL_OVERLAP
* REPLACE

Replace any pair whose overlap adds no meaningful coverage.

---

# 32. Do Not Modify the Existing 129-Test Suite

Do not modify:

```text
analysis/test-case-design.md
analysis/human-audit-worksheet.md
analysis/test-coverage-matrix.md
```

in this prompt.

The candidate extension remains a separate design artifact until the student adopts candidates.

---

# 33. Update Student Extension Worksheet

Replace every:

```text
STUDENT TO COMPLETE
```

candidate field in:

```text
analysis/student-extension-worksheet.md
```

with the generated candidate content.

Preserve the worksheet structure.

Add at the top:

```text
IMPORTANT AUTHORSHIP NOTE

The candidate ideas in this worksheet were produced with AI
assistance during Prompt 010.

They are not yet classified as HUMAN_ADDED.

The student must independently review, modify where needed,
and explicitly ACCEPT or REJECT each candidate before any
candidate may be integrated into the executable test suite.
```

---

# 34. Create Candidate Analysis Artifact

Create:

```text
analysis/ai-assisted-extension-candidate-analysis.md
```

It must contain:

* candidate inventory,
* duplicate analysis,
* cross-candidate comparison,
* priority ranking,
* recommended five per feature,
* blocker summary,
* coverage-delta summary.

---

# 35. Extension Status

Do not mark:

```text
STUDENT-ADDED TEST EXTENSION: COMPLETE
```

yet.

Report:

```text
AI-ASSISTED EXTENSION CANDIDATE GENERATION: COMPLETE
STUDENT CANDIDATE ADOPTION: PENDING
STUDENT-ADDED TEST EXTENSION: NOT YET SATISFIED
```

until the student explicitly adopts/modifies sufficient candidates.

---

# 36. Required Final Response Structure

Use exactly:

# Prompt 010 — AI-Assisted Extension Candidate Population

## 1. Executive Summary

Include:

| Metric                         | FR-02 | FR-09 | FR-18 | Total |
| ------------------------------ | ----: | ----: | ----: | ----: |
| Candidates generated           |     8 |     8 |     8 |    24 |
| Non-duplicate                  |       |       |       |       |
| Partial overlap but adds value |       |       |       |       |
| Blocked by spec                |       |       |       |       |
| Ready for data design          |       |       |       |       |
| Needs refinement               |       |       |       |       |

---

## 2. Existing Suite Baseline

Summarize the 129-test baseline.

---

## 3. FR-02 Candidates

All 8 fully populated candidates.

---

## 4. FR-09 Candidates

All 8 fully populated candidates.

---

## 5. FR-18 Candidates

All 8 fully populated candidates.

---

## 6. Existing-Suite Duplicate Audit

Complete duplicate table.

---

## 7. Cross-Candidate Duplicate Audit

Complete comparison table.

---

## 8. Coverage Delta Summary

Required table:

| Coverage Delta | FR-02 Count | FR-09 Count | FR-18 Count |
| -------------- | ----------: | ----------: | ----------: |

---

## 9. Technique Diversity

Required table.

---

## 10. Blocker Analysis

Candidate-to-blocker table.

---

## 11. Priority Ranking

Rank 1–8 per feature.

---

## 12. Recommended Five Per Feature

AI recommendation only.

---

## 13. Authorship Boundary

Explicitly state:

```text
All 24 candidates are AI_ASSISTED_CANDIDATE.

None is labeled HUMAN_ADDED.

Student adoption/modification is still required.
```

---

## 14. Validation

Validate:

* 24/24 slots populated,
* no `STUDENT TO COMPLETE` remains in candidate fields,
* only adoption fields remain pending,
* all closest TC IDs exist,
* all cited TB IDs exist,
* all cited EP IDs exist or N/A interaction wording is used,
* all blocker IDs exist,
* no new requirement IDs were fabricated,
* no new EP IDs were fabricated,
* no concrete test data generated,
* no existing testcase modified,
* no duplicate-rejected candidate remains.

---

## 15. Current Status

Use:

```text
AI TEST GENERATION: COMPLETE
AI TEST QUOTA: COMPLETE
STUDENT HUMAN AUDIT: COMPLETE
HUMAN AUDIT CORRECTIONS: COMPLETE
EXTENSION REASSESSMENT: COMPLETE

AI-ASSISTED EXTENSION CANDIDATES: COMPLETE
STUDENT CANDIDATE ADOPTION: PENDING
STUDENT-ADDED EXTENSION: NOT YET SATISFIED

CONCRETE TEST DATA DESIGN: NOT STARTED
POSTMAN IMPLEMENTATION: NOT STARTED
API EXECUTION: NOT STARTED
```

---

## 16. Machine-Usable Summary

End exactly:

```text
PROMPT_010_SUMMARY

Candidates generated:
FR-02:
FR-09:
FR-18:

Recommended five:
FR-02:
FR-09:
FR-18:

Duplicate-rejected candidates remaining:

AI-assisted candidates:
24

Human-added accepted tests:
0

Student candidate adoption:
PENDING

Next required phase:
STUDENT REVIEW AND ADOPTION OF EXTENSION CANDIDATES
```

---

# 37. Important Constraints

* Populate all 24 candidate slots.
* Do not leave candidate fields empty.
* Do not label AI-generated candidate ideas HUMAN_ADDED.
* Do not fabricate student authorship.
* Do not modify the existing 129 tests.
* Do not modify human-audit decisions.
* Do not generate concrete data.
* Do not execute APIs.
* Do not create Postman requests.
* Do not inspect implementation source.
* Do not invent business rules.
* Do not invent state transitions.
* Do not invent SEC definitions.
* Do not invent TB IDs.
* Do not invent EP IDs.
* Do not invent BVA boundaries.
* Preserve blockers.
* Prefer observational oracle when behavior is unspecified.
* Every candidate must demonstrate a concrete coverage delta over the existing suite.

The objective is:

**129-Test Saturated AI Suite → 24 High-Value AI-Assisted Extension Candidates → Student Adoption Review**

not:

**Generate 24 superficial variants merely to fill the worksheet**.

---

# 38. Output Artifacts

Update:

```text
analysis/student-extension-worksheet.md
```

Create:

```text
analysis/ai-assisted-extension-candidate-analysis.md
```

Log:

```text
prompts/Prompt-010-populate-extension-candidates.md
```

Append Prompt 010 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–009 logs.
