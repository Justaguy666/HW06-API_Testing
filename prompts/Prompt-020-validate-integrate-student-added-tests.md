# Prompt 020 — Validate, Normalize, and Integrate Student-Authored Additional Testcases

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 019 prepared the current-scope human extension worksheet.

The student has now independently authored **18 additional testcase proposals**:

```text
FR-02: 6 proposals
FR-07: 6 proposals
FR-18: 6 proposals

TOTAL:
18 student-authored proposals
```

The assignment requires:

```text
FR-02 >= 5 HUMAN_ADDED tests
FR-07 >= 5 HUMAN_ADDED tests
FR-18 >= 5 HUMAN_ADDED tests

TOTAL >= 15
```

These proposals were supplied by the student before this Codex integration step.

Therefore their provenance must be preserved.

---

# 1. Purpose

Validate, normalize, de-duplicate, trace, and integrate the student's 18 testcase proposals into the canonical current selected suite.

The transformation is:

```text
Student-authored proposals
        ↓
Scope validation
        ↓
Specification-support validation
        ↓
Duplicate comparison
        ↓
Traceability normalization
        ↓
Metadata normalization
        ↓
Accepted HUMAN_ADDED tests
        ↓
Allocate TC-API IDs
        ↓
Integrate into canonical suite
```

This prompt must NOT invent replacement testcase ideas.

---

# 2. Current Canonical State

Current selected features:

```text
FR-02 — Login and Account Lockout
FR-07 — Cart
FR-18 — Order Management (Admin)
```

Superseded:

```text
FR-09 — HISTORICAL ONLY
```

Current AI-generated suite:

```text
FR-02 = 35
FR-07 = 35
FR-18 = 35

TOTAL = 105 / 105
```

The 105 AI-generated tests must remain unchanged.

---

# 3. Authoritative Inputs

Use:

```text
eshop-sut/api_specification.md

analysis/current-selected-suite/selected-features.md
analysis/current-selected-suite/verified-test-basis.md
analysis/current-selected-suite/domain-and-partition-summary.md
analysis/current-selected-suite/boundary-analysis-summary.md
analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
analysis/current-selected-suite/blocker-register.md
analysis/current-selected-suite/suite-reconciliation-summary.md

analysis/current-selected-suite/student-extension-reassessment.md
analysis/current-selected-suite/student-extension-worksheet.md
```

Also inspect historical:

```text
analysis/ai-assisted-extension-candidate-analysis.md
analysis/student-extension-worksheet.md
```

only for duplicate/provenance comparison.

Do not use implementation behavior as requirement authority.

---

# 4. Authorship Integrity

The 18 proposals below were explicitly authored and supplied by the student.

Before validation classify them as:

```text
STUDENT_AUTHORED_CANDIDATE
```

If accepted into the suite:

```text
Origin = HUMAN_ADDED
```

Never classify them as:

```text
AI_GENERATED
AI_ASSISTED_CANDIDATE
```

Codex may:

* normalize terminology,
* normalize metadata,
* attach existing traceability IDs,
* clarify observational wording,
* classify duplicate risk,
* classify scope,
* classify readiness.

Codex must NOT silently change the student's substantive test objective into a different testcase.

If substantive redesign would be required, use:

```text
NEEDS_STUDENT_REVISION
```

instead of rewriting the idea.

---

# 5. Validation Outcomes

Every student proposal must receive exactly one:

```text
ACCEPT
ACCEPT_WITH_METADATA_NORMALIZATION
NEEDS_STUDENT_REVISION
REJECT_DUPLICATE
REJECT_OUT_OF_SCOPE
REJECT_NO_INDEPENDENT_VALUE
REJECT_UNSUPPORTED_OBJECTIVE
```

Only:

```text
ACCEPT
ACCEPT_WITH_METADATA_NORMALIZATION
```

may become `HUMAN_ADDED`.

---

# 6. Important Quota Rule

A minimum of:

```text
5 accepted HUMAN_ADDED tests per feature
```

is required.

However:

```text
Do NOT accept a weak testcase merely to reach quota.
```

If a feature finishes below 5 accepted tests:

report:

```text
STUDENT_EXTENSION_SHORTFALL
```

and identify which proposals need student revision.

Do not invent replacement tests.

---

# 7. Existing Test IDs

Historical testcase IDs:

```text
TC-API-001 ... TC-API-164
```

must remain unchanged.

Do not renumber them.

Allocate new IDs only after proposal validation.

The first possible new ID is:

```text
TC-API-165
```

Assign IDs sequentially only to accepted proposals.

Rejected proposals receive no `TC-API-*` ID.

---

# 8. Proposal IDs

Preserve the student's temporary proposal IDs:

```text
TC-PROP-FR02-01 ... TC-PROP-FR02-06
TC-PROP-FR07-01 ... TC-PROP-FR07-06
TC-PROP-FR18-01 ... TC-PROP-FR18-06
```

Store:

```text
Student Proposal ID
```

in each integrated HUMAN_ADDED testcase for provenance.

---

# 9. General Normalization Rules

For all proposals:

### Extreme values

Do NOT call an extreme value:

```text
boundary
BVA
overflow boundary
```

unless the specification explicitly defines that boundary.

Use:

```text
ROBUSTNESS
EXTREME_REPRESENTATION
EXTREME_MAGNITUDE
```

instead.

### Unspecified behavior

Use:

```text
Observe
Characterize
Record
Compare
```

Do not write:

```text
must reject
should return 400
must preserve
must throttle
```

unless specification evidence supports it.

### Security

Do not invent SEC-01–SEC-07.

Do not create concrete attack payloads.

### Concrete data

Do not yet assign arbitrary exact values such as:

```text
1000000-character email
INT_MAX
SQL injection string
```

Keep logical input classes abstract.

---

# 10. Student Proposal — FR-02-01

```text
Student Proposal ID:
TC-PROP-FR02-01

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Observe handling of an extreme-length email representation.

Primary Objective:
Observe endpoint behavior when the email input is syntactically email-shaped but has an unusually large representation length while password remains nominal.

Primary Technique:
ROBUSTNESS

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Important:

```text
This is NOT BVA.
```

No minimum or maximum email length may be inferred.

---

# 11. Student Proposal — FR-02-02

```text
Student Proposal ID:
TC-PROP-FR02-02

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Observe handling of an extreme-length password representation.

Primary Objective:
Observe endpoint behavior when the password representation is unusually large while email remains nominal.

Primary Technique:
ROBUSTNESS

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Do not infer password length boundaries.

---

# 12. Student Proposal — FR-02-03

```text
Student Proposal ID:
TC-PROP-FR02-03

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Observe Unicode / non-ASCII representation handling in credential fields.

Primary Objective:
Characterize handling of non-ASCII credential representations such as accented characters or other Unicode characters.

Primary Technique:
DOMAIN

Secondary Technique:
ROBUSTNESS

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Atomicity rule:

Vary one credential field at a time while keeping the other nominal.

Do not require an account containing those characters to exist unless the canonical test basis supports such setup.

---

# 13. Student Proposal — FR-02-04

```text
Student Proposal ID:
TC-PROP-FR02-04

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Observe special-character-class handling in credential representations.

Primary Objective:
Observe representation-level handling of credential input containing special-character classes such as quotation, bracket, escape, or control-character categories.

Primary Technique:
ROBUSTNESS

Secondary Technique:
SECURITY

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_SECURITY_PERSPECTIVE
```

Important:

Do not define:

* SQL injection payloads,
* XSS payloads,
* command injection payloads,
* exploit strings.

The testcase concerns character classes only.

Vary one credential field at a time.

---

# 14. Student Proposal — FR-02-05

```text
Student Proposal ID:
TC-PROP-FR02-05

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Characterize semantic confusion when email and password values are positionally swapped.

Primary Objective:
Observe behavior when a password-intended string is supplied as email and an email-intended string is supplied as password while both remain valid JSON string representations.

Primary Technique:
INTERACTION

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_INTERACTION
```

Explicitly compare with existing non-matching credential-pair tests.

Possible result:

```text
PARTIAL_OVERLAP_BUT_INDEPENDENT_VALUE
```

is acceptable only if semantic role reversal provides a distinct objective.

---

# 15. Student Proposal — FR-02-06

```text
Student Proposal ID:
TC-PROP-FR02-06

Feature:
FR-02

Endpoint:
POST /api/login

Normalized Title:
Observe throttling or rate-control signals across repeated login requests.

Primary Objective:
Characterize observable rate-control behavior across multiple closely spaced requests independently of account-lockout semantics.

Primary Technique:
ROBUSTNESS

Secondary Technique:
SECURITY / SEQUENCE

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_SEQUENCE
```

Scope must be reviewed carefully.

Do not assume rate limiting exists.

Do not assume it belongs to application rather than gateway/infrastructure.

Compare explicitly against lockout testcase:

```text
TC-API-013
```

If the objective cannot remain meaningfully FR-02 IN_SCOPE:

use:

```text
REJECT_OUT_OF_SCOPE
```

or:

```text
NEEDS_STUDENT_REVISION
```

---

# 16. Student Proposal — FR-07-01

```text
Student Proposal ID:
TC-PROP-FR07-01

Feature:
FR-07

Endpoint:
POST /api/cart

Normalized Title:
Observe handling of a negative-number-shaped quantity value.

Primary Objective:
Characterize behavior when quantity belongs to the negative-number subclass while all other documented members remain nominal.

Primary Technique:
DOMAIN

Secondary Technique:
ROBUSTNESS

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Important:

```text
negative ≠ INVALID
```

under the current specification.

Not BVA.

Compare explicitly against the generic number-shaped quantity testcase already present.

---

# 17. Student Proposal — FR-07-02

```text
Student Proposal ID:
TC-PROP-FR07-02

Feature:
FR-07

Endpoint:
POST /api/cart

Normalized Title:
Observe handling of a fractional quantity representation.

Primary Objective:
Characterize behavior when quantity is represented by a fractional numeric value while other members remain nominal.

Primary Technique:
DOMAIN

Secondary Technique:
ROBUSTNESS

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Do not infer integer-only semantics.

Not BVA.

---

# 18. Student Proposal — FR-07-03

```text
Student Proposal ID:
TC-PROP-FR07-03

Feature:
FR-07

Endpoint:
GET /api/cart

Normalized Title:
Observe the response Content-Type contract for GET Cart.

Primary Objective:
Record the actual response media-type / Content-Type representation independently from response-body observations.

Primary Technique:
SCHEMA

Secondary Technique:
CONTRACT

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ORACLE_ISOLATION
```

The specification does not define a hard expected media type unless canonical evidence proves otherwise.

---

# 19. Student Proposal — FR-07-04

```text
Student Proposal ID:
TC-PROP-FR07-04

Feature:
FR-07

Endpoint:
POST /api/cart

Normalized Title:
Observe the response Content-Type contract for POST Cart.

Primary Objective:
Record the response Content-Type independently from body semantic observations for the Cart mutation endpoint.

Primary Technique:
SCHEMA

Secondary Technique:
CONTRACT

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ORACLE_ISOLATION
```

Do not infer `application/json` unless specification evidence supports it.

---

# 20. Student Proposal — FR-07-05

```text
Student Proposal ID:
TC-PROP-FR07-05

Feature:
FR-07

Endpoint:
POST /api/cart

Normalized Title:
Observe handling of an array-shaped Cart request body.

Primary Objective:
Characterize behavior when the request-body top-level representation is an array of item-like objects rather than the documented single-object shape.

Primary Technique:
ROBUSTNESS

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Do not assume:

```text
batch add is supported
batch add is rejected
```

Compare against existing non-object / malformed representation cases.

---

# 21. Student Proposal — FR-07-06

```text
Student Proposal ID:
TC-PROP-FR07-06

Feature:
FR-07

Endpoint:
POST /api/cart

Normalized Title:
Observe handling of an extreme-magnitude numeric Cart member.

Primary Objective:
Characterize processing of an unusually large-magnitude numeric representation in a numeric Cart member without claiming a documented upper boundary.

Primary Technique:
ROBUSTNESS

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Important:

```text
NOT BVA
NOT an overflow-boundary testcase
```

For atomic execution:

vary only one numeric member at a time.

The logical test may describe the shared robustness class, but concrete-data design later must isolate each execution variation.

---

# 22. Student Proposal — FR-18-01

```text
Student Proposal ID:
TC-PROP-FR18-01

Feature:
FR-18

Endpoint:
GET /api/admin/orders

Normalized Title:
Observe structured pagination/filter-shaped query-parameter behavior.

Primary Objective:
Characterize how the order-listing endpoint handles common structured query-parameter families such as pagination-shaped or filter-shaped parameters when those parameters are not defined by the current specification.

Primary Technique:
ROBUSTNESS

Secondary Technique:
DOMAIN

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Compare explicitly against:

```text
TC-API-119
```

which already tests an undocumented query parameter.

Accept only if this proposal adds independent value by testing a structured semantic query family rather than merely changing the query-parameter name.

Otherwise:

```text
REJECT_DUPLICATE
```

or:

```text
NEEDS_STUDENT_REVISION
```

---

# 23. Student Proposal — FR-18-02

```text
Student Proposal ID:
TC-PROP-FR18-02

Feature:
FR-18

Endpoint:
GET /api/admin/orders

Normalized Title:
Characterize order-list sort stability across repeated reads without mutation.

Primary Objective:
Compare ordering of the observable order-list sequence across repeated reads when no intentional intervening mutation occurs.

Primary Technique:
SEQUENCE

Secondary Technique:
STATE / SCHEMA

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_STATE_OBSERVATION
```

Compare against:

```text
TC-API-120
```

The new case is acceptable only if TC-API-120 compares observable collections without independently evaluating element ordering.

Do not infer that order must be stable.

---

# 24. Student Proposal — FR-18-03

```text
Student Proposal ID:
TC-PROP-FR18-03

Feature:
FR-18

Endpoint:
GET /api/admin/orders

Normalized Title:
Observe the response Content-Type contract for admin order listing.

Primary Objective:
Record response Content-Type independently from body/schema observations.

Primary Technique:
SCHEMA

Secondary Technique:
CONTRACT

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ORACLE_ISOLATION
```

Compare against TC-API-116.

---

# 25. Student Proposal — FR-18-04

```text
Student Proposal ID:
TC-PROP-FR18-04

Feature:
FR-18

Endpoint:
PUT /api/admin/orders/:id/status

Normalized Title:
Observe the response Content-Type contract for status update.

Primary Objective:
Record response Content-Type independently from status-update semantic and state observations.

Primary Technique:
SCHEMA

Secondary Technique:
CONTRACT

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ORACLE_ISOLATION
```

No hard response media-type oracle may be invented.

---

# 26. Student Proposal — FR-18-05

```text
Student Proposal ID:
TC-PROP-FR18-05

Feature:
FR-18

Endpoint:
PUT /api/admin/orders/:id/status

Normalized Title:
Observe handling of an identifier representation outside the documented identifier shape.

Primary Objective:
Characterize handling of a path identifier representation that does not conform to the documented identifier representation, if such a representation is explicitly established by the canonical test basis.

Primary Technique:
DOMAIN

Secondary Technique:
ROBUSTNESS

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE
```

Critical validation:

Do NOT assume the identifier must be:

```text
numeric
UUID
positive integer
```

unless canonical specification evidence supports that shape.

Compare against:

```text
TC-API-058
TC-API-060
```

If the specification defines no syntactic identifier shape and the case adds no independent class beyond TC-API-060:

use:

```text
REJECT_NO_INDEPENDENT_VALUE
```

or:

```text
NEEDS_STUDENT_REVISION
```

---

# 27. Student Proposal — FR-18-06

```text
Student Proposal ID:
TC-PROP-FR18-06

Feature:
FR-18

Endpoint:
PUT /api/admin/orders/:id/status

Normalized Title:
Observe in-scope traceability metadata associated with a status-update action.

Primary Objective:
Characterize whether the status-update interaction exposes any observable traceability metadata or other in-scope evidence associated with the mutation.

Primary Technique:
SECURITY

Secondary Technique:
SCHEMA / STATE

Expected Classification:
EXPLORATORY

Proposed Coverage Delta:
NEW_SECURITY_PERSPECTIVE
```

Important:

Do NOT assume:

* an audit-log endpoint exists,
* audit logging is required,
* a database audit table exists,
* traceability must be visible.

Do NOT inspect implementation.

The observation must remain restricted to interfaces already within the test scope.

If no in-scope observation channel exists:

classify:

```text
NEEDS_STUDENT_REVISION
```

or:

```text
REJECT_OUT_OF_SCOPE
```

Do not create an audit-log testcase by assumption.

---

# 28. Candidate Atomicity Validation

For each proposal validate:

```text
ONE_PRIMARY_OBJECTIVE
```

Special attention:

```text
FR02-03
FR02-04
FR07-06
FR18-01
```

If multiple execution data variants exist, they may remain under one logical testcase only when they represent the same semantic class.

Do not split one student-authored proposal into multiple HUMAN_ADDED tests solely to increase extension count.

---

# 29. Duplicate Comparison Against AI Suite

Compare every proposal against all 105 current AI-generated tests.

Required table:

| Proposal | Closest AI Test(s) | Relationship | Independent Coverage Delta | Decision |
| -------- | ------------------ | ------------ | -------------------------- | -------- |

Relationship:

```text
UNIQUE
PARTIAL_OVERLAP
DUPLICATE
```

Partial overlap may be accepted only with explicit independent coverage delta.

---

# 30. Duplicate Comparison Against Historical AI Candidates

For FR-02 and FR-18 also compare against historical:

```text
AI_CANDIDATE_CURRENT_FR02
AI_CANDIDATE_CURRENT_FR18
```

Required table:

| Student Proposal | Historical AI Candidate | Overlap | Student-Specific Delta | Provenance Impact |
| ---------------- | ----------------------- | ------- | ---------------------- | ----------------- |

Do not automatically reject overlap.

But preserve disclosure.

If the substantive objective is essentially identical to a prior AI candidate and no student-specific delta exists:

flag:

```text
AUTHORSHIP_OVERLAP_REQUIRES_REVIEW
```

Do not falsely represent it as purely independent.

FR-07 has no previous extension candidates.

---

# 31. Traceability Normalization

For every accepted proposal assign only existing relevant:

```text
TB-FRxx-*
PARAM-FRxx-*
DIM-FRxx-*
EP-FRxx-*
INT-FRxx-*
BLK-FRxx-*
```

Do not create new TB/EP/INT/blocker IDs solely for these student tests.

If no existing EP exactly represents the student's robustness subclass:

the testcase may still use the closest broader EP plus:

```text
Coverage Delta:
HUMAN_RISK_SUBCLASS
```

Do not fabricate a new partition.

---

# 32. Blocker Discipline

A student test may remain meaningful even if the expected behavior is unspecified.

Use:

```text
EXPLORATORY_ONLY
```

where executable but no deterministic oracle exists.

Use:

```text
BLOCKED
```

only when setup/execution itself cannot be established.

Do not automatically reject blocker-affected tests.

---

# 33. Normalized Testcase Schema

Every accepted HUMAN_ADDED testcase must include:

```text
Test ID:
Student Proposal ID:

Feature:
Endpoint / Operation:
Scope:
Origin:
Active:

Title:
Primary Objective:

Primary Technique:
Secondary Technique:

Coverage Delta:

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

Exploratory Observation Goal:

Closest Existing AI Tests:
Duplicate Relationship:
Independent Value:

Historical AI-Candidate Overlap:

Student Authorship Source:
STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

BVA:

Integration Status:
```

---

# 34. BVA Rules

FR-07:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

Therefore all FR-07 additions remain:

```text
BVA = N/A
```

For FR-02 / FR-18 do not introduce BVA unless their canonical boundary analysis explicitly supports it.

Extreme length/magnitude alone is not BVA.

---

# 35. ID Allocation

After validation:

1. preserve proposal order,
2. allocate IDs to accepted proposals only,
3. begin at `TC-API-165`,
4. use continuous accepted-test IDs.

Recommended ordering:

```text
accepted FR-02 proposals
→ accepted FR-07 proposals
→ accepted FR-18 proposals
```

Required mapping:

| Proposal ID | Validation Result | Final TC-API ID |
| ----------- | ----------------- | --------------- |

Rejected/revision-required proposals:

```text
Final TC-API ID = NONE
```

---

# 36. Extension Validation Per Feature

Required:

| Feature | Proposed | Accepted HUMAN_ADDED | Required | Result |
| ------- | -------: | -------------------: | -------: | ------ |
| FR-02   |        6 |                      |        5 |        |
| FR-07   |        6 |                      |        5 |        |
| FR-18   |        6 |                      |        5 |        |
| TOTAL   |       18 |                      |       15 |        |

Result:

```text
PASS
SHORTFALL
```

Do not count proposals awaiting revision.

---

# 37. Preserve AI Quota Separately

After integration report separately:

```text
AI_GENERATED:
105 / 105
```

and:

```text
HUMAN_ADDED:
N / 15
```

Do not combine these into an AI quota.

Canonical active suite size becomes:

```text
105 + accepted HUMAN_ADDED
```

---

# 38. Update Student Extension Worksheet

Update:

```text
analysis/current-selected-suite/student-extension-worksheet.md
```

Map the 18 student proposals into their appropriate human slots.

Preserve unused slots.

For each populated slot include:

```text
Student Proposal ID
Student-authored content
Validation result
Final TC-API ID if accepted
Duplicate assessment
Traceability
```

Do not rewrite unused slot content.

---

# 39. Update Canonical Test Design

Update:

```text
analysis/current-selected-suite/test-case-design.md
```

Append accepted HUMAN_ADDED testcases after the 105 current AI-generated tests.

Do not alter the semantics of existing AI-generated cases.

Clearly separate:

```text
PART A — AI_GENERATED CURRENT SUITE

PART B — HUMAN_ADDED STUDENT EXTENSION
```

---

# 40. Update Coverage Matrix

Update:

```text
analysis/current-selected-suite/test-coverage-matrix.md
```

Show before/after coverage.

Required distinction:

```text
AI coverage
Student extension coverage
Combined coverage
```

Do not rewrite AI coverage as though student additions were AI tests.

---

# 41. Update Student Extension Reassessment

Update:

```text
analysis/current-selected-suite/student-extension-reassessment.md
```

Add:

```text
STUDENT EXTENSION VALIDATION RESULT
```

and per-feature accepted counts.

Preserve the original residual opportunity analysis.

---

# 42. Create Integration Summary

Create:

```text
analysis/current-selected-suite/student-extension-integration-summary.md
```

Required sections:

1. Student proposal baseline
2. Validation rules
3. Proposal-by-proposal result
4. Duplicate audit
5. Historical AI-candidate overlap
6. Accepted test mapping
7. Rejected/revision-required proposals
8. Traceability
9. Per-feature extension quota
10. Final suite counts
11. Authorship preservation
12. Next phase readiness

---

# 43. No Replacement Generation

If any feature has fewer than five accepted proposals:

```text
DO NOT GENERATE REPLACEMENTS
```

Report:

```text
FR-xx STUDENT_EXTENSION_SHORTFALL
```

and list proposal IDs requiring student revision.

---

# 44. Concrete Test Data Still Deferred

Do not assign concrete values for:

* extreme length,
* Unicode examples,
* special characters,
* negative/fractional values,
* extreme magnitude,
* repeated-request count,
* query parameter values.

Those belong to the next phase:

```text
CONCRETE TEST DATA DESIGN
```

This prompt remains logical-test integration.

---

# 45. Postman Still Deferred

Do not:

* create collection requests,
* write scripts,
* add assertions,
* create environment variables,
* execute APIs.

---

# 46. Validation

Validate:

```text
Original AI tests:
105

Original AI tests modified:
0

Student proposals:
18

Student proposals accounted:
18

Accepted HUMAN_ADDED:
N

Rejected:
N

Needs revision:
N

New TC-API IDs:
N

Duplicate final TC IDs:
0

New AI_GENERATED tests:
0

New AI_ASSISTED_CANDIDATE tests:
0

BVA fabricated:
0

Unsupported hard oracle introduced:
0
```

---

# 47. Downstream Readiness

If:

```text
FR-02 HUMAN_ADDED >= 5
FR-07 HUMAN_ADDED >= 5
FR-18 HUMAN_ADDED >= 5
```

and no provenance conflict remains unresolved:

report:

```text
READY_FOR_CONCRETE_TEST_DATA_DESIGN
```

Otherwise:

```text
NOT_READY_FOR_CONCRETE_TEST_DATA_DESIGN
```

---

# 48. Required Final Response Structure

Use exactly:

# Prompt 020 — Validate and Integrate Student-Added Tests

## 1. Executive Summary

Include:

* 18 proposals reviewed,
* accepted/rejected/revision counts,
* accepted per feature,
* final HUMAN_ADDED total,
* final active suite count,
* downstream readiness.

## 2. Authorship and Provenance Validation

## 3. FR-02 Proposal Validation

Six proposals.

## 4. FR-07 Proposal Validation

Six proposals.

## 5. FR-18 Proposal Validation

Six proposals.

## 6. Duplicate Audit Against 105 AI Tests

## 7. Historical AI-Candidate Overlap Audit

## 8. Traceability Normalization

## 9. Atomicity Validation

## 10. Proposal-to-Final-ID Mapping

## 11. Accepted HUMAN_ADDED Testcases

Full normalized schema.

## 12. Rejected / Revision-Required Proposals

## 13. FR-02 Extension Result

## 14. FR-07 Extension Result

## 15. FR-18 Extension Result

## 16. Overall Student Extension Result

Use:

```text
FR-02:
N / 5

FR-07:
N / 5

FR-18:
N / 5

TOTAL:
N / 15

PASS / SHORTFALL
```

## 17. AI Quota Preservation

Use:

```text
AI_GENERATED:
105 / 105 — PASS
```

## 18. Final Active Suite

Use:

```text
AI_GENERATED:
105

HUMAN_ADDED:
N

TOTAL ACTIVE LOGICAL TESTS:
105 + N
```

## 19. Coverage Delta Summary

## 20. Authorship Integrity Summary

## 21. Quality Validation

## 22. Concrete-Test-Data Readiness

Use exactly one:

```text
READY_FOR_CONCRETE_TEST_DATA_DESIGN
```

or:

```text
NOT_READY_FOR_CONCRETE_TEST_DATA_DESIGN
```

## 23. Current Project Status

Use:

```text
CURRENT SELECTED FEATURES:
FR-02
FR-07
FR-18

AI-GENERATED TEST DESIGN:
105 / 105 — COMPLETE

STUDENT EXTENSION:
N / 15 — PASS / SHORTFALL

LOGICAL TEST DESIGN:
COMPLETE / INCOMPLETE

CONCRETE TEST DATA:
NOT STARTED

POSTMAN:
NOT STARTED

EXECUTION:
NOT STARTED
```

## 24. Machine-Usable Summary

End exactly:

```text
PROMPT_020_SUMMARY

Student proposals reviewed:
18

FR-02 proposals:
6
FR-02 accepted:
FR-02 rejected:
FR-02 needs revision:

FR-07 proposals:
6
FR-07 accepted:
FR-07 rejected:
FR-07 needs revision:

FR-18 proposals:
6
FR-18 accepted:
FR-18 rejected:
FR-18 needs revision:

Accepted HUMAN_ADDED total:

Student extension:
FR-02: N / 5
FR-07: N / 5
FR-18: N / 5
TOTAL: N / 15

Student extension result:
PASS / SHORTFALL

AI_GENERATED suite:
105 / 105

Final active logical tests:

New AI_GENERATED tests:
0

New AI_ASSISTED_CANDIDATE tests:
0

Human-added testcase ID range:

Full duplicates introduced:
0

Unsupported hard oracles introduced:
0

BVA tests fabricated:
0

Concrete-test-data readiness:
READY_FOR_CONCRETE_TEST_DATA_DESIGN / NOT_READY_FOR_CONCRETE_TEST_DATA_DESIGN

Next required prompt if PASS:
PROMPT 021 — CONCRETE TEST DATA DESIGN

Next required action if SHORTFALL:
STUDENT REVISES REJECTED OR REVISION-REQUIRED EXTENSION PROPOSALS
```

---

# 49. Output Artifacts

Update:

```text
analysis/current-selected-suite/student-extension-worksheet.md
analysis/current-selected-suite/student-extension-reassessment.md
analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
```

Create:

```text
analysis/current-selected-suite/student-extension-integration-summary.md
```

Log:

```text
prompts/Prompt-020-validate-integrate-student-added-tests.md
```

Append exactly one Prompt 020 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–019 historical prompt contents.

---

# 50. Final Constraints

* The 18 proposals originate from the student.
* Preserve proposal IDs.
* Accepted tests must be `HUMAN_ADDED`.
* Never relabel them `AI_GENERATED`.
* Do not create replacement test ideas.
* Do not silently redesign student objectives.
* Do not accept duplicates to satisfy quota.
* Do not alter the existing 105 AI-generated tests.
* Do not renumber historical test IDs.
* Do not inspect implementation.
* Do not execute APIs.
* Do not create concrete payloads.
* Do not create Postman.
* Do not invent response contracts.
* Do not invent validation rules.
* Do not invent identifier formats.
* Do not invent rate limiting.
* Do not invent audit logging.
* Do not convert extreme values into BVA without specification evidence.
* Preserve all authorship and provenance evidence.

The objective is:

**18 Student-Authored Proposals → Validated HUMAN_ADDED Extension**

not:

**Codex generates additional tests for the student**.
