# Pool B Feature Switch Record — FR-09 to FR-07

## Decision

```text
CURRENT_SELECTED_FEATURES

Pool A:
FR-02 — Login and Account Lockout

Pool B:
FR-07 — Cart

Pool C:
FR-18 — Order Management (Admin)

Superseded Selection:
FR-09 — Discount Coupons
```

Switch reason:

```text
Student explicitly changed the selected Pool B feature
after completing the previous FR-09 analysis and design workflow.
```

The decision changes only the current Pool B selection. It does not invalidate, rename, or erase the work completed under Prompts 001–010.

## Scope Transition

| Pool | Previous Selection | Current Selection | Decision |
| --- | --- | --- | --- |
| A | FR-02 — Login and Account Lockout | FR-02 — Login and Account Lockout | KEEP |
| B | FR-09 — Discount Coupons | FR-07 — Cart | SWITCH |
| C | FR-18 — Order Management (Admin) | FR-18 — Order Management (Admin) | KEEP |

FR-09 is now classified as `SUPERSEDED_SELECTED_FEATURE`. FR-07 is classified as `NEW_SELECTED_POOL_B_FEATURE`.

## Historical Preservation Rules

- Prompts 001–010 and their outputs remain immutable historical evidence.
- Existing FR-09 test cases remain historical `AI_GENERATED` cases.
- Existing human-audit decisions for FR-09 remain historical evidence.
- No FR-09 case or extension candidate counts toward the current Pool B quota.
- FR-09 identifiers remain reserved to their historical records and must not be reused.
- No FR-09 case or candidate may be renamed or relabeled as FR-07.
- Prompt 010 FR-09 candidate slots are classified as `HISTORICAL_AI_ASSISTED_CANDIDATES_FOR_SUPERSEDED_FEATURE`.
- Prompt 010 FR-02 and FR-18 candidates remain potentially relevant to their preserved features.

## Current Quota State

| Feature | Current Selected AI Cases | Minimum Required | Status |
| --- | ---: | ---: | --- |
| FR-02 | 35 | 35 | PRESERVED |
| FR-07 | 0 | 35 | REBUILD REQUIRED |
| FR-18 | 35 | 35 | PRESERVED |

Current selected quota is `70 / 105`. The 35 historical FR-09 cases contribute `0` to this total.

## Artifact Registry and Migration Treatment

| Artifact | Classification | Migration Treatment |
| --- | --- | --- |
| `analysis/verified-test-basis.md` | HISTORICAL_SUPERSEDED | Preserve the complete prior output; its FR-09 portion is historical. Build a separate FR-07 basis. |
| `analysis/domain-model.md` | HISTORICAL_SUPERSEDED | Preserve the prior FR-09 model and partitions; create FR-07 modeling later. |
| `analysis/boundary-value-analysis.md` | HISTORICAL_SUPERSEDED | Preserve old decisions; perform new FR-07 BVA only after its domain model is verified. |
| `analysis/test-case-design.md` | HISTORICAL_SUPERSEDED | Keep FR-09 cases unchanged and excluded from current quota; add FR-07 cases only in a later prompt. |
| `analysis/test-coverage-matrix.md` | HISTORICAL_SUPERSEDED | Preserve the old matrix as historical; rebuild current combined coverage later. |
| `analysis/scope-and-gap-analysis.md` | HISTORICAL_SUPERSEDED | Preserve old FR-09 scope and quota analysis; conduct FR-07 gap closure later. |
| `analysis/human-audit-worksheet.md` | HISTORICAL_SUPERSEDED | Preserve FR-09 audit rows and decisions as historical human-review evidence. |
| `analysis/human-audit-application-summary.md` | HISTORICAL_SUPERSEDED | Preserve the applied decisions; do not transfer them to FR-07. |
| `analysis/student-extension-reassessment.md` | HISTORICAL_SUPERSEDED | Preserve prior selected-scope reassessment; reassess current Pool B after FR-07 audit. |
| `analysis/student-extension-worksheet.md` | HISTORICAL_SUPERSEDED | Preserve all old candidates; classify only FR-09 candidate slots as historical superseded. |
| `analysis/ai-assisted-extension-candidate-analysis.md` | HISTORICAL_SUPERSEDED | Preserve Prompt 010 analysis; exclude its FR-09 candidates from current extension work. |
| `analysis/pool-b-feature-switch.md` | UPDATE_CURRENT_SCOPE_METADATA | This file is the formal current-scope decision record. |
| `analysis/fr07-requirement-analysis.md` | REBUILD_FR07_ONLY | New clean FR-07 requirement foundation; no EPs or test cases are included. |

`PRESERVE_UNCHANGED` applies to the FR-02 and FR-18 content embedded in the historical outputs. `HISTORICAL_SUPERSEDED` applies to the old selected-scope context and all FR-09-specific content. The existing files themselves are not rewritten in Prompt 011.

## ID Isolation

- All historical FR-09 requirement, parameter, partition, blocker, and test identifiers remain assigned to FR-09.
- FR-07 uses independent `TB-FR07-*`, `PARAM-FR07-*`, `OP-FR07-*`, and `BLK-FR07-*` namespaces.
- The future FR-07 equivalence-partition namespace is reserved but no partition IDs are allocated in Prompt 011.
- No FR-07 test-case IDs are allocated in Prompt 011.

## Migration Workflow

```text
Prompt 011
Pool B switch + FR-07 requirement extraction
        ↓
Prompt 012
Verify and normalize FR-07 test basis
        ↓
Prompt 013
FR-07 domain model + equivalence partitioning
        ↓
Prompt 014
FR-07 BVA
        ↓
Prompt 015
FR-07 initial logical test generation
        ↓
Prompt 016
FR-07 scope / quota / technique gap closure
        ↓
Prompt 017
FR-07 human-audit worksheet preparation
        ↓
STUDENT HUMAN REVIEW — FR-07
        ↓
Prompt 018
Apply FR-07 human decisions
        ↓
Prompt 019
Rebuild combined current suite:
FR-02 + FR-07 + FR-18
        ↓
Rebuild current student extension candidates
        ↓
Student extension
        ↓
Concrete test data design
```

FR-02 and FR-18 are preserved and are not regenerated by this workflow.
