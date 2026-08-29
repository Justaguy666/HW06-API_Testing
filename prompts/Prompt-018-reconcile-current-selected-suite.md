# Prompt 018 — Reconcile Final Current Selected Suite After Pool B Migration

You are continuing my HW06 – API Testing project for the EShop SUT.

All analysis, AI testcase generation, quota closure, human review, and human-audit correction phases for the **current selected features** have now been completed.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

The previous Pool B selection:

* **FR-09: Discount Coupons**

is now:

```text
SUPERSEDED — HISTORICAL ONLY
```

---

# 1. Purpose

Reconcile the project into one clean, authoritative, current selected-suite state.

The transformation is:

```text
Historical original suite
FR-02 + FR-09 + FR-18
        +
FR-07 replacement workflow
        +
Completed human audits
        ↓
CURRENT SELECTED SUITE
FR-02 + FR-07 + FR-18
```

This prompt must:

1. establish the canonical current selected feature set,
2. preserve all historical FR-09 evidence,
3. combine FR-02, FR-07, and FR-18 test design into one current suite,
4. rebuild current traceability,
5. rebuild current coverage,
6. calculate current quota,
7. separate active current tests from historical/cross-feature tests,
8. establish canonical inputs for the next phases,
9. prepare the project for student extension and concrete test-data design.

Do not generate new testcases.

---

# 2. Current Authoritative Feature State

Use:

```text
CURRENT_SELECTED_FEATURES

Pool A:
FR-02 — Login and Account Lockout

Pool B:
FR-07 — Cart

Pool C:
FR-18 — Order Management (Admin)

SUPERSEDED_FEATURE:
FR-09 — Discount Coupons
```

---

# 3. Authoritative Inputs

Use the finalized current artifacts for each feature.

## FR-02

Use the existing finalized/human-audited FR-02 data from:

```text
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/human-audit-worksheet.md
analysis/human-audit-application-summary.md
```

Extract only FR-02 current selected-feature information.

---

## FR-07

Use:

```text
analysis/fr07-verified-test-basis.md
analysis/fr07-domain-model.md
analysis/fr07-boundary-value-analysis.md
analysis/fr07-initial-test-case-design.md
analysis/fr07-initial-coverage-matrix.md
analysis/fr07-scope-and-gap-closure.md
analysis/fr07-human-audit-worksheet.md
```

and any completed FR-07 human-audit application artifact if it exists.

Use the final post-human-review FR-07 state.

---

## FR-18

Use the existing finalized/human-audited FR-18 data from:

```text
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/human-audit-worksheet.md
analysis/human-audit-application-summary.md
```

Extract only FR-18 current selected-feature information.

---

# 4. Historical FR-09 Preservation

FR-09 must remain fully preserved as historical evidence.

Do not:

* delete FR-09 tests,
* rename FR-09 tests,
* reuse FR-09 IDs,
* count FR-09 toward current quota,
* include FR-09 in current selected coverage.

Classify historical FR-09 information as:

```text
SUPERSEDED_SELECTED_FEATURE
```

Its role is:

```text
AUDIT_TRAIL_ONLY
```

---

# 5. Preserve Test IDs

All historical testcase IDs remain immutable.

Current selected feature IDs are expected to include:

```text
FR-02:
existing historical TC-API IDs assigned to FR-02

FR-07:
TC-API-130 through TC-API-164

FR-18:
existing historical TC-API IDs assigned to FR-18
```

Do not renumber any testcase.

Do not attempt to make current selected testcase IDs contiguous.

Gaps caused by superseded FR-09/cross-feature tests are intentional historical evidence.

---

# 6. Determine Final Active Tests

For every testcase relevant to FR-02, FR-07, and FR-18 determine:

```text
ACTIVE_CURRENT_SELECTED_TEST
```

or:

```text
INACTIVE_AFTER_HUMAN_AUDIT
```

or:

```text
HISTORICAL_SUPERSEDED
```

or:

```text
HISTORICAL_CROSS_FEATURE
```

Required table:

| Test ID | Feature | Historical Origin | Current Status | Scope | Quota Eligible |
| ------- | ------- | ----------------- | -------------- | ----- | -------------- |

Only:

```text
ACTIVE_CURRENT_SELECTED_TEST
+
IN_SCOPE
+
AI_GENERATED
+
Quota Eligible = YES
```

counts toward the AI test quota.

---

# 7. Final Selected Quota

Required minimum:

```text
FR-02 >= 35
FR-07 >= 35
FR-18 >= 35
```

Expected baseline:

```text
FR-02 = 35
FR-07 = 35
FR-18 = 35

TOTAL = 105
```

Do not assume these counts.

Recalculate them from active post-human-audit tests.

Required table:

| Feature | Active AI-Generated In-Scope Tests | Required | Result |
| ------- | ---------------------------------: | -------: | ------ |
| FR-02   |                                    |       35 |        |
| FR-07   |                                    |       35 |        |
| FR-18   |                                    |       35 |        |
| TOTAL   |                                    |      105 |        |

Result:

* PASS
* FAIL

If below quota:

report the exact cause.

Do not generate replacement tests.

---

# 8. Separate Selected and Non-Selected Tests

Classify every historical testcase into one:

```text
CURRENT_FR02
CURRENT_FR07
CURRENT_FR18
SUPERSEDED_FR09
CROSS_FEATURE_FR17
CROSS_FEATURE_FR10
OTHER_HISTORICAL
```

Required summary table:

| Classification | Count | Test IDs | Current Quota? |
| -------------- | ----: | -------- | -------------- |

This prevents historical cases from contaminating the current suite.

---

# 9. Reconcile Test Basis

Build a canonical current test-basis inventory containing only:

```text
TB-FR02-*
TB-FR07-*
TB-FR18-*
```

Exclude from active current basis:

```text
TB-FR09-*
```

but preserve it historically.

Required table:

| TB-ID | Feature | Requirement | Testability | Active Test IDs | Blocker |
| ----- | ------- | ----------- | ----------- | --------------- | ------- |

Do not invent or renumber TB IDs.

---

# 10. Reconcile Parameter / Dimension Model

Create a selected-feature inventory for:

```text
FR-02
FR-07
FR-18
```

Required:

| ID | Feature | Type | Description | Active? |
| -- | ------- | ---- | ----------- | ------- |

Include relevant:

* PARAM IDs,
* DIM IDs.

Do not duplicate logically identical IDs across features.

Feature-local IDs remain separate.

---

# 11. Reconcile EP Coverage

Combine the current EP inventories of:

```text
FR-02
FR-07
FR-18
```

Do not include FR-09 EPs in current selected coverage.

Required table:

| EP-ID | Feature | Classification | Active Test IDs | Coverage |
| ----- | ------- | -------------- | --------------- | -------- |

Coverage:

* COVERED
* COVERED_VIA_INTERACTION
* BLOCKED
* DEFERRED_EXPLORATORY
* NOT_MEANINGFUL_STANDALONE

Required summary:

| Feature | Total EP | Covered | Interaction | Blocked | Deferred |
| ------- | -------: | ------: | ----------: | ------: | -------: |
| FR-02   |          |         |             |         |          |
| FR-07   |       36 |         |             |         |          |
| FR-18   |          |         |             |         |          |

---

# 12. Interaction / State Coverage

Reconcile meaningful:

* state,
* sequence,
* interaction,
* resource,
* authentication,
* authorization

coverage.

FR-07 uses:

```text
INT-FR07-*
```

Preserve those IDs.

For FR-02/FR-18, use existing design metadata rather than inventing interaction IDs retroactively.

Required table:

| Feature | Coverage Dimension | Active Test IDs | Status |
| ------- | ------------------ | --------------- | ------ |

---

# 13. BVA Reconciliation

Preserve historical BVA conclusions.

FR-07:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
Accepted boundaries = 0
BVA tests = 0
```

Do not reinterpret this as missing coverage.

Required table:

| Feature | BVA Result                           | Accepted Boundaries | BVA Tests |
| ------- | ------------------------------------ | ------------------: | --------: |
| FR-02   |                                      |                     |           |
| FR-07   | BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC |                   0 |         0 |
| FR-18   |                                      |                     |           |

Use existing evidence for FR-02/FR-18.

---

# 14. Reconcile Blockers

Create the canonical current blocker inventory.

Include:

```text
BLK-FR02-*
BLK-FR07-*
BLK-FR18-*
BLK-ALL-001
```

where still applicable.

FR-09 blockers remain historical only.

Required table:

| Blocker | Feature | Missing Information | Active Test IDs | Current Status |
| ------- | ------- | ------------------- | --------------- | -------------- |

Current Status:

* ACTIVE
* LIMITS_ORACLE
* BLOCKS_SETUP
* BLOCKS_STATE
* HISTORICAL_ONLY

Do not mark blockers resolved merely because human review completed.

---

# 15. Final Test Classification Summary

For current selected active tests only:

| Classification | FR-02 | FR-07 | FR-18 | Total |
| -------------- | ----: | ----: | ----: | ----: |
| POSITIVE       |       |       |       |       |
| NEGATIVE       |       |       |       |       |
| CONDITIONAL    |       |       |       |       |
| EXPLORATORY    |       |       |       |       |

Use actual post-human-audit values.

---

# 16. Final Readiness Summary

Required:

| Readiness        | FR-02 | FR-07 | FR-18 | Total |
| ---------------- | ----: | ----: | ----: | ----: |
| READY            |       |       |       |       |
| BLOCKED          |       |       |       |       |
| EXPLORATORY_ONLY |       |       |       |       |

Do not treat exploratory tests as defective.

---

# 17. Final Technique Coverage

Required:

| Technique | FR-02 | FR-07 | FR-18 | Total |
| --------- | ----: | ----: | ----: | ----: |

Use only techniques actually represented.

Possible techniques include:

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
BVA
```

Do not invent technique classifications.

---

# 18. Final Scope Validation

Every current selected quota testcase must be:

```text
IN_SCOPE
```

Required table:

| Feature | IN_SCOPE | Supporting | Cross-Feature | Out-of-Scope | Ambiguous |
| ------- | -------: | ---------: | ------------: | -----------: | --------: |

Historical cross-feature cases may remain outside the current canonical suite.

---

# 19. Duplicate Validation

Revalidate duplicates across the **current selected suite**.

Do not treat same testing technique across different features as duplicate.

Required table for any overlaps:

| Test A | Test B | Relationship | Independent Value | Status |
| ------ | ------ | ------------ | ----------------- | ------ |

Status:

* DISTINCT
* PARTIAL_OVERLAP_ACCEPTABLE
* DUPLICATE

Goal:

```text
Active full duplicates = 0
```

---

# 20. Cross-Feature Consistency Audit

Check whether current selected tests accidentally rely on superseded FR-09 assumptions.

Search FR-02/FR-07/FR-18 current active artifacts for:

* FR-09 references,
* Coupon requirements,
* coupon blockers,
* coupon EPs,
* coupon quota references.

Classify occurrences:

```text
HISTORICAL_REFERENCE
SUPPORTING_CONTEXT
STALE_CURRENT_REFERENCE
```

All:

```text
STALE_CURRENT_REFERENCE
```

must be removed from canonical current artifacts.

Do not modify historical Prompt 001–017 files.

---

# 21. Create Canonical Current-Suite Directory

Create:

```text
analysis/current-selected-suite/
```

This directory represents the authoritative **current project state**, while old root-level analysis files remain historical workflow artifacts.

Create inside:

```text
analysis/current-selected-suite/
├── selected-features.md
├── verified-test-basis.md
├── domain-and-partition-summary.md
├── boundary-analysis-summary.md
├── test-case-design.md
├── test-coverage-matrix.md
├── blocker-register.md
└── suite-reconciliation-summary.md
```

Do not move or delete existing artifacts.

---

# 22. selected-features.md

Create:

```text
CURRENT_SELECTED_FEATURES

Pool A:
FR-02 — Login and Account Lockout

Pool B:
FR-07 — Cart

Pool C:
FR-18 — Order Management (Admin)

Superseded:
FR-09 — Discount Coupons
```

Include scope-switch history.

---

# 23. verified-test-basis.md

Create the canonical combined:

```text
FR-02
+
FR-07
+
FR-18
```

test basis.

Preserve stable TB IDs.

Exclude superseded FR-09 TBs from active sections.

---

# 24. domain-and-partition-summary.md

Create canonical:

* PARAM inventory,
* DIM inventory,
* EP inventory,
* interaction/state summary.

Do not reproduce unnecessary historical analysis prose.

This file should be optimized for downstream test-data design.

---

# 25. boundary-analysis-summary.md

Create concise per-feature BVA status.

Do not duplicate full BVA artifacts.

Required emphasis:

```text
which explicit boundaries exist
which do not
which must not be invented
```

---

# 26. test-case-design.md

This becomes the canonical current logical suite.

Include only current selected feature tests:

```text
FR-02
FR-07
FR-18
```

Do not include active FR-09 tests.

Historical testcase IDs may therefore appear non-contiguous.

This is intentional.

Each testcase must preserve:

* Test ID
* Feature
* Endpoint
* Scope
* Origin
* Classification
* Readiness
* TB refs
* EP refs
* blockers
* logical input
* action
* oracle layers
* human-audit status

Do not generate new test content.

---

# 27. test-coverage-matrix.md

Create current selected coverage only.

Include:

* feature quota,
* TB coverage,
* EP coverage,
* interaction/state coverage,
* technique coverage,
* blocker effect,
* readiness.

Do not count FR-09.

---

# 28. blocker-register.md

Create a concise canonical list of unresolved blockers that downstream phases must respect.

Required fields:

| Blocker | Feature | Description | Affected Tests | Downstream Effect |
| ------- | ------- | ----------- | -------------- | ----------------- |

Downstream Effect:

* TEST_DATA
* EXPECTED_RESULT
* POSTMAN_ASSERTION
* STATE_SETUP
* SECURITY
* EXECUTION

This file will later be especially important when converting logical cases to executable tests.

---

# 29. suite-reconciliation-summary.md

Document:

```text
old scope
→ Pool B migration
→ current scope
```

Include:

* FR-09 historical exclusion,
* FR-07 integration,
* quota result,
* active test counts,
* historical test counts,
* unresolved blockers,
* next phase.

---

# 30. Historical Artifact Policy

Root-level:

```text
analysis/*.md
```

remains the workflow/history layer.

New:

```text
analysis/current-selected-suite/*
```

is the canonical current-state layer.

Use this rule explicitly:

```text
Historical artifacts:
DO NOT DELETE OR REWRITE FOR CLEANUP

Canonical artifacts:
USE FOR ALL FUTURE DOWNSTREAM PHASES
```

---

# 31. Student Extension Status

Do not mark extension complete.

The previous extension candidate artifacts were created against the old feature set containing FR-09.

Therefore:

```text
FR-09 extension candidates:
HISTORICAL ONLY

FR-02 extension candidates:
REVIEW REQUIRED

FR-07 extension candidates:
NOT YET BUILT / REVIEW REQUIRED

FR-18 extension candidates:
REVIEW REQUIRED
```

Current extension status:

```text
STUDENT EXTENSION:
NOT YET SATISFIED
```

Do not automatically carry FR-09 candidate slots into FR-07.

---

# 32. Determine Next Phase

After reconciliation, determine whether the project is ready for:

```text
STUDENT EXTENSION
```

before concrete test data.

Required result:

```text
READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION
```

or:

```text
NOT_READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION
```

Do not perform the extension in Prompt 018.

---

# 33. Repository Structure Recommendation

Create directories only when required by current or immediately next phases.

At this stage create only:

```text
analysis/current-selected-suite/
```

Do not yet create unnecessary empty:

```text
postman/
reports/
bugs/
evidence/
```

unless Git tracking requires a placeholder or the next prompt uses them.

Avoid speculative directory clutter.

---

# 34. Integrity Validation

Validate:

| Check                                 | Expected              |
| ------------------------------------- | --------------------- |
| Current selected features             | FR-02 / FR-07 / FR-18 |
| FR-09 classified historical           | PASS                  |
| Historical testcase IDs preserved     | PASS                  |
| Current testcase IDs preserved        | PASS                  |
| No new testcase generated             | PASS                  |
| No test ID renumbering                | PASS                  |
| No FR-09 current quota                | PASS                  |
| No stale coupon rule in current suite | PASS                  |
| No unsupported hard oracle introduced | PASS                  |
| Human audit metadata preserved        | PASS                  |
| FR-07 BVA conclusion preserved        | PASS                  |
| Current quota recalculated            | PASS                  |
| Current canonical artifacts created   | PASS                  |

---

# 35. Required Final Response Structure

Use exactly:

# Prompt 018 — Reconcile Final Current Selected Suite

## 1. Executive Summary

Include:

* current features,
* superseded feature,
* current AI quota,
* active selected tests,
* historical excluded tests,
* canonical artifact status.

## 2. Scope Reconciliation

## 3. Test-ID Preservation

## 4. Current vs Historical Test Classification

## 5. Current Feature Quota

## 6. Test-Basis Reconciliation

## 7. Parameter / Dimension Reconciliation

## 8. EP Coverage Reconciliation

## 9. Interaction / State Coverage

## 10. BVA Reconciliation

## 11. Blocker Reconciliation

## 12. Classification Summary

## 13. Readiness Summary

## 14. Technique Coverage

## 15. Scope Validation

## 16. Duplicate Validation

## 17. Stale FR-09 Reference Audit

## 18. Canonical Artifact Creation

List all files created in:

```text
analysis/current-selected-suite/
```

## 19. Historical Artifact Preservation

## 20. Student Extension Status

## 21. Downstream Readiness

Use:

```text
READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION
```

or:

```text
NOT_READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION
```

## 22. Quality Validation

## 23. Current Project Status

Use:

```text
CURRENT SELECTED FEATURES:
FR-02
FR-07
FR-18

FR-02 ANALYSIS / GENERATION / HUMAN AUDIT:
COMPLETE

FR-07 ANALYSIS / GENERATION / HUMAN AUDIT:
COMPLETE

FR-18 ANALYSIS / GENERATION / HUMAN AUDIT:
COMPLETE

FR-09:
SUPERSEDED — HISTORICAL ONLY

SELECTED-SUITE RECONCILIATION:
COMPLETE

CURRENT AI TEST QUOTA:
TOTAL / 105

STUDENT EXTENSION:
NOT YET SATISFIED

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
PROMPT_018_SUMMARY

Current selected features:
FR-02
FR-07
FR-18

Superseded:
FR-09

Current quota:
FR-02:
FR-07:
FR-18:
TOTAL:

Current active selected tests:

Historical superseded tests:

Historical cross-feature tests:

Current TB count:
FR-02:
FR-07:
FR-18:
TOTAL:

Current EP count:
FR-02:
FR-07:
FR-18:
TOTAL:

Active blockers:

Active full duplicates:

Stale FR-09 current references:

Canonical directory:
analysis/current-selected-suite/

Canonical artifacts created:
8

Selected-suite reconciliation:
COMPLETE

Student extension:
NOT YET SATISFIED

Downstream readiness:
READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION / NOT_READY_FOR_CURRENT_SCOPE_STUDENT_EXTENSION

Next required prompt:
PROMPT 019 — CURRENT-SCOPE STUDENT EXTENSION
```

---

# 36. Important Constraints

* Do not generate testcases.
* Do not generate extension test ideas.
* Do not generate HUMAN_ADDED tests.
* Do not alter completed human audit decisions.
* Do not renumber testcase IDs.
* Do not delete historical FR-09 artifacts.
* Do not count FR-09 in current quota.
* Do not change historical prompt files.
* Do not inspect implementation.
* Do not execute APIs.
* Do not generate concrete test data.
* Do not create Postman requests.
* Do not invent requirements.
* Do not invent Cart behavior.
* Do not resolve blockers through assumptions.
* Preserve all historical provenance.
* Canonical current-state artifacts must be derived only from already-approved current feature data.

The objective is:

**Completed Feature-Level Work → One Authoritative Current Selected Suite**

not:

**More testcase generation or another audit pass**.

---

# 37. Output Artifacts

Create:

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

Log:

```text
prompts/Prompt-018-reconcile-current-selected-suite.md
```

Append exactly one Prompt 018 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–017 historical prompt contents.
