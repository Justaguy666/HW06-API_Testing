# Prompt 011 — Switch Selected Pool B Feature from FR-09 to FR-07 and Rebuild the FR-07 Test Basis

You are continuing my HW06 – API Testing project for the EShop SUT.

The project previously selected:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

The student has now explicitly changed the Pool B selection.

The new selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Therefore:

```text
FR-02 = KEEP
FR-09 = SUPERSEDED
FR-07 = NEW SELECTED POOL B FEATURE
FR-18 = KEEP
```

This is an intentional student scope decision.

---

# 1. Purpose

Perform only the first Pool B migration step.

Your tasks are:

1. formally record the feature switch from FR-09 to FR-07,
2. preserve all existing FR-09 work as historical audit evidence,
3. determine the exact authoritative scope of FR-07 from the API specification,
4. extract and normalize the initial FR-07 requirements,
5. identify FR-07 parameters, business rules, dependencies, resource/state relationships, and blockers,
6. distinguish FR-07 from neighboring Pool B features,
7. establish a rebuild plan for FR-07 only.

Do **not** generate FR-07 testcases yet.

The intended transformation is:

```text
Old selected scope
FR-02 + FR-09 + FR-18

        ↓

Pool B scope migration

        ↓

New selected scope
FR-02 + FR-07 + FR-18
```

---

# 2. Authoritative Source

Use:

```text
eshop-sut/api_specification.md
```

as the authoritative source.

Existing analysis artifacts may be inspected only to:

* preserve FR-02,
* preserve FR-18,
* identify historical FR-09 work,
* avoid ID collisions,
* preserve the previous workflow structure.

Do not infer requirements from:

* source implementation,
* frontend behavior,
* README,
* database schema,
* runtime behavior,
* Postman requests,
* previous execution results.

---

# 3. Historical FR-09 Work Must Be Preserved

Prompts 001–010 and existing FR-09 analysis represent work that was actually performed.

Do not rewrite or delete historical content.

FR-09 must now be classified as:

```text
SUPERSEDED_SELECTED_FEATURE
```

This means:

* FR-09 AI-generated testcases remain historical `AI_GENERATED`,
* previous human audit decisions remain historical evidence,
* FR-09 testcases do not count toward current Pool B quota,
* FR-09 extension candidates do not count toward current extension work,
* FR-09 IDs must not be reused for FR-07,
* FR-09 cases must never be relabeled as FR-07.

---

# 4. Current Selected Scope

Create:

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

Do not invent another reason.

---

# 5. Current Quota State

Immediately after the switch:

```text
FR-02 = 35 / 35 — PRESERVED
FR-07 = 0 / 35 — REBUILD REQUIRED
FR-18 = 35 / 35 — PRESERVED
```

Required table:

| Feature | Current Selected AI Cases | Minimum Required | Status           |
| ------- | ------------------------: | ---------------: | ---------------- |
| FR-02   |                        35 |               35 | PRESERVED        |
| FR-07   |                         0 |               35 | REBUILD REQUIRED |
| FR-18   |                        35 |               35 | PRESERVED        |

Do not count any FR-09 case toward FR-07.

---

# 6. Identify Exact FR-07 Endpoint Scope

Read the specification and identify all operations explicitly belonging to:

```text
FR-07: Cart
```

For every potentially related endpoint classify:

* IN_SCOPE
* SUPPORTING
* CROSS_FEATURE
* OUT_OF_SCOPE
* AMBIGUOUS

Required table:

| Endpoint / Operation | Specification Feature | FR-07 Relationship | Classification | Evidence |
| -------------------- | --------------------- | ------------------ | -------------- | -------- |

Do not assume an endpoint belongs to FR-07 merely because it mentions:

* product,
* item,
* quantity,
* checkout,
* order.

---

# 7. Separate FR-07 from Neighboring Features

Explicitly distinguish FR-07 from at least:

```text
FR-05 — Product Listing / Search
FR-06 — Product Detail
FR-08 — Checkout
FR-09 — Discount Coupons
FR-10 — Order State Machine
```

Required comparison:

| Dimension                     | FR-07 Cart | Neighboring Feature |
| ----------------------------- | ---------- | ------------------- |
| Actor                         |            |                     |
| Main responsibility           |            |                     |
| Resource                      |            |                     |
| Read behavior                 |            |                     |
| Mutation behavior             |            |                     |
| Authentication                |            |                     |
| Ownership                     |            |                     |
| State dependency              |            |                     |
| Typical supporting dependency |            |                     |

For every related endpoint determine whether overlap is:

* NO_OVERLAP
* SUPPORTING_OVERLAP
* CROSS_FEATURE_OVERLAP
* AMBIGUOUS

Do not let checkout or coupon behavior count automatically as FR-07 coverage.

---

# 8. FR-07 Functional Operation Inventory

Extract all explicitly documented Cart operations.

Possible categories must only be included if supported by the specification:

* retrieve cart,
* add item,
* update item quantity,
* remove item,
* clear cart,
* calculate/display cart total,
* other documented cart operations.

Required table:

| Operation ID | Endpoint | Method | Operation | FR-07 Scope | Evidence |
| ------------ | -------- | ------ | --------- | ----------- | -------- |

Assign stable IDs:

```text
OP-FR07-001
OP-FR07-002
...
```

Do not invent missing operations.

---

# 9. FR-07 Parameter Inventory

Assign stable IDs:

```text
PARAM-FR07-001
PARAM-FR07-002
...
```

Required table:

| PARAM-ID | Endpoint | Location | Parameter / Condition | Type / Shape | Required? | Constraints | Evidence |
| -------- | -------- | -------- | --------------------- | ------------ | --------- | ----------- | -------- |

Location values:

* PATH
* QUERY
* HEADER
* BODY
* AUTH_CONTEXT
* RESOURCE_STATE

Potential parameters may include only if documented:

* product identifier,
* cart item identifier,
* quantity,
* user identity,
* authorization,
* other body members.

If type, requiredness, minimum, maximum, or format is missing:

```text
NOT SPECIFIED
```

Do not infer conventional Cart validation rules.

---

# 10. Cart Resource Model

Determine the specification-backed logical resource model.

Required table:

| Resource Aspect           | Specification Evidence | Known? | Notes |
| ------------------------- | ---------------------- | ------ | ----- |
| Cart owner                |                        |        |       |
| Cart lifetime             |                        |        |       |
| Cart items                |                        |        |       |
| Product reference         |                        |        |       |
| Quantity                  |                        |        |       |
| Price                     |                        |        |       |
| Subtotal                  |                        |        |       |
| Total                     |                        |        |       |
| Persistence               |                        |        |       |
| Empty-cart representation |                        |        |       |

Use:

* VERIFIED
* PARTIAL
* NOT_SPECIFIED

Do not infer persistence or calculation semantics.

---

# 11. Authentication / Authorization / Ownership

Analyze separately.

### Authentication

Determine:

* whether Cart endpoints require Authorization,
* expected Bearer form if specified,
* behavior if Authorization is missing,
* behavior if malformed.

### Ownership

Determine:

* whether Cart belongs to the authenticated user,
* whether user ID is provided explicitly,
* whether another user's cart can be targeted,
* whether ownership is inferred from token.

If unspecified:

```text
NOT SPECIFIED
```

Create a blocker rather than assuming.

---

# 12. Quantity Domain

Extract only specification-backed information concerning quantity.

Required table:

| Aspect              | Specification Value | Evidence | Test-Design Impact |
| ------------------- | ------------------- | -------- | ------------------ |
| Type                |                     |          |                    |
| Requiredness        |                     |          |                    |
| Zero allowed?       |                     |          |                    |
| Negative allowed?   |                     |          |                    |
| Fractional allowed? |                     |          |                    |
| Minimum             |                     |          |                    |
| Maximum             |                     |          |                    |
| Stock relationship  |                     |          |                    |

If absent:

```text
NOT SPECIFIED
```

Do not invent:

```text
quantity >= 1
```

unless explicitly supported.

---

# 13. Product / Item Validity

Determine what the specification says about:

* existing product,
* nonexistent product,
* unavailable product,
* duplicate product already in cart,
* product inventory,
* deleted product,
* invalid product identifier.

Only record explicitly supported information.

Required table:

| Condition | Specification Support | Deterministic Behavior Available? | Notes |
| --------- | --------------------- | --------------------------------- | ----- |

---

# 14. Cart State and Mutation Model

Identify state-changing operations.

Potential logical states, only if supported:

```text
EMPTY
NON_EMPTY
ITEM_PRESENT
ITEM_ABSENT
```

Do not invent a formal state machine where the specification provides none.

Required table:

| Operation | Before State | Mutation | After State | Deterministic? | Evidence |
| --------- | ------------ | -------- | ----------- | -------------- | -------- |

If transition semantics are unspecified:

mark:

```text
PARTIAL / NOT SPECIFIED
```

---

# 15. Repeated-Operation Semantics

Explicitly identify whether the specification defines behavior for:

* adding the same product twice,
* updating the same item repeatedly,
* removing an already-removed item,
* retrieving cart repeatedly,
* quantity accumulation versus replacement.

Required table:

| Repeated Operation | Defined? | Documented Behavior | Blocker Needed? |
| ------------------ | -------- | ------------------- | --------------- |

Do not assume add-to-cart increments quantity.

---

# 16. Calculation Rules

Determine whether Cart includes calculated fields such as:

* unit price,
* quantity,
* subtotal,
* total.

Required table:

| Calculation | Formula Explicit? | Input Fields | Rounding Defined? | Currency Defined? |
| ----------- | ----------------- | ------------ | ----------------- | ----------------- |

Do not infer:

```text
subtotal = price × quantity
```

unless explicitly specified as a required Cart contract.

If logically suggested but not stated:

mark it as:

```text
SPECIFICATION GAP
```

---

# 17. Response Contract

For every FR-07 endpoint extract:

| Endpoint | Scenario | Documented Status | Response Container | Documented Fields | Field Types | Exact Schema? |
| -------- | -------- | ----------------- | ------------------ | ----------------- | ----------- | ------------- |

`Exact Schema?`:

* YES
* PARTIAL
* NO

Do not fabricate:

* IDs,
* timestamps,
* total fields,
* error objects,
* nested product fields.

---

# 18. Error Behavior

Identify explicitly documented behavior for:

* nonexistent product,
* invalid item,
* invalid quantity,
* missing fields,
* authorization failures,
* empty cart,
* unsupported body,
* malformed identifier.

Required table:

| Error Condition | Expected Behavior Specified? | Status Specified? | Schema Specified? |
| --------------- | ---------------------------- | ----------------- | ----------------- |

Missing behavior must become a blocker/exploratory region.

---

# 19. Security Mapping

Review security-related requirements relevant to Cart.

If SEC-01–SEC-07 definitions remain unavailable, retain:

```text
BLK-ALL-001
```

Do not invent their definitions.

Also identify Cart-specific security concerns only if supported by the specification, such as:

* authentication,
* ownership,
* object access.

Do not convert general security best practices into specification requirements.

---

# 20. Dependency Analysis

FR-07 may depend on other features for setup.

Identify only supported dependencies.

Required table:

| Dependency ID | Feature / Resource | Dependency Purpose | Setup Only? | Counts as FR-07? |
| ------------- | ------------------ | ------------------ | ----------- | ---------------- |

Potential examples only if supported:

* authentication/login,
* product existence,
* product listing/detail,
* checkout.

Use:

* SETUP_ONLY
* SUPPORTING
* CROSS_FEATURE
* IN_SCOPE
* AMBIGUOUS

Do not count a setup dependency toward FR-07 quota unless it directly tests Cart behavior.

---

# 21. FR-07 Blockers

Create stable blocker IDs:

```text
BLK-FR07-001
BLK-FR07-002
...
```

Required table:

| Blocker ID | Missing Information | Affected Area | Test-Design Impact | Handling |
| ---------- | ------------------- | ------------- | ------------------ | -------- |

Handling:

* KEEP_EXPLORATORY
* BLOCK_DETERMINISTIC_ORACLE
* VERIFY_LATER
* SPEC_UPDATE_REQUIRED

Do not resolve blockers here.

---

# 22. Initial FR-07 Test Basis

Create stable IDs:

```text
TB-FR07-001
TB-FR07-002
...
```

Required table:

| TB-ID | Feature | Endpoint | Requirement Type | Verified Requirement | Source | Testable? | Notes |
| ----- | ------- | -------- | ---------------- | -------------------- | ------ | --------- | ----- |

Requirement Type:

* ENDPOINT
* INPUT
* AUTHENTICATION
* AUTHORIZATION
* OWNERSHIP
* BUSINESS_RULE
* RESOURCE
* STATE
* RESPONSE
* SCHEMA
* SECURITY
* DEPENDENCY

Do not generate EPs yet.

Do not generate testcases yet.

---

# 23. ID Isolation

FR-07 must use new IDs.

Never reuse:

```text
TB-FR09-*
PARAM-FR09-*
EP-FR09-*
BLK-FR09-*
```

Future FR-07 IDs must use:

```text
TB-FR07-*
PARAM-FR07-*
EP-FR07-*
BLK-FR07-*
```

Do not allocate future testcase IDs yet.

---

# 24. Artifact Impact Analysis

Classify current artifacts using:

* PRESERVE_UNCHANGED
* HISTORICAL_SUPERSEDED
* REBUILD_FR07_ONLY
* UPDATE_CURRENT_SCOPE_METADATA

Analyze at minimum:

```text
analysis/verified-test-basis.md
analysis/domain-model.md
analysis/boundary-value-analysis.md
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/scope-and-gap-analysis.md
analysis/human-audit-worksheet.md
analysis/human-audit-application-summary.md
analysis/student-extension-reassessment.md
analysis/student-extension-worksheet.md
analysis/ai-assisted-extension-candidate-analysis.md
```

Required table:

| Artifact | Classification | Required Action | Reason |
| -------- | -------------- | --------------- | ------ |

Do not rewrite all artifacts in Prompt 011.

---

# 25. FR-09 Extension Candidate Handling

Prompt 010 generated extension candidates for the old feature selection.

FR-09 candidate slots must now be classified:

```text
HISTORICAL_AI_ASSISTED_CANDIDATES_FOR_SUPERSEDED_FEATURE
```

They must:

* remain in audit history,
* not be counted for FR-07,
* not be adopted as current Pool B extension,
* not be renamed to FR-07.

FR-02 and FR-18 candidates remain potentially relevant.

---

# 26. Migration Workflow

Generate the following migration plan:

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

Do not regenerate FR-02 or FR-18.

---

# 27. Required Final Response

Use exactly:

# Prompt 011 — Pool B Feature Switch to FR-07

## 1. Executive Summary

Include old Pool B, new Pool B, preserved features, superseded feature, current selected quota.

## 2. Scope Migration Decision

## 3. Historical Preservation Rules

## 4. FR-07 Endpoint Scope

## 5. FR-07 vs Neighboring Features

## 6. FR-07 Functional Operation Inventory

## 7. FR-07 Parameter Inventory

## 8. Cart Resource Model

## 9. Authentication / Authorization / Ownership

## 10. Quantity Domain

## 11. Product / Item Validity

## 12. Cart State and Mutation Model

## 13. Repeated Operation Semantics

## 14. Calculation Rules

## 15. Response Contract

## 16. Error Behavior

## 17. Security Mapping

## 18. Dependency Analysis

## 19. FR-07 Blockers

## 20. Initial FR-07 Test Basis

## 21. Artifact Impact Analysis

## 22. Current Quota State

Use:

| Feature | Current | Required | Status           |
| ------- | ------: | -------: | ---------------- |
| FR-02   |      35 |       35 | PRESERVED        |
| FR-07   |       0 |       35 | REBUILD REQUIRED |
| FR-18   |      35 |       35 | PRESERVED        |

## 23. Migration Workflow

## 24. Current Project Status

Use:

```text
POOL B FEATURE SWITCH: COMPLETE

FR-02:
PRESERVED

FR-09:
SUPERSEDED — HISTORICAL ONLY

FR-07:
REQUIREMENT EXTRACTION COMPLETE
TEST DESIGN NOT STARTED

FR-18:
PRESERVED

CURRENT SELECTED FEATURE QUOTA:
70 / 105

FR-07:
0 / 35
```

## 25. Machine-Usable Summary

End exactly:

```text
PROMPT_011_SUMMARY

Old Pool B:
FR-09

New Pool B:
FR-07

Current selected features:
FR-02
FR-07
FR-18

Preserved:
FR-02 AI cases: 35
FR-18 AI cases: 35

FR-09:
Historical cases preserved: YES
Counts toward current quota: NO

FR-07 endpoints:
FR-07 operations:
FR-07 parameters:
FR-07 test-basis items:
FR-07 blockers:

FR-07 current quota:
0 / 35

Current selected quota:
70 / 105

Next required prompt:
PROMPT 012 — VERIFY AND NORMALIZE FR-07 TEST BASIS
```

---

# 28. Constraints

* Do not delete FR-09 work.
* Do not rename FR-09 tests to FR-07.
* Do not count FR-09 toward FR-07.
* Do not modify Prompt 001–010 historical content.
* Do not regenerate FR-02.
* Do not regenerate FR-18.
* Do not generate FR-07 testcases yet.
* Do not generate FR-07 EPs yet.
* Do not create concrete test data.
* Do not implement Postman.
* Do not execute APIs.
* Do not inspect source implementation.
* Do not invent Cart operations.
* Do not assume quantity >= 1 unless specified.
* Do not assume add-same-item increments quantity.
* Do not assume pricing formulas.
* Do not assume stock validation.
* Do not assume Cart persistence.
* Do not invent ownership rules.
* Do not invent response schemas.
* Do not invent HTTP statuses.
* Do not invent SEC definitions.
* Preserve specification gaps as blockers.

The objective is:

**FR-09 historical scope → FR-07 clean requirement foundation**

not:

**rename the old Pool B artifacts**.

---

# 29. Output Artifacts

Create:

```text
analysis/pool-b-feature-switch.md
analysis/fr07-requirement-analysis.md
```

Log:

```text
prompts/Prompt-011-switch-pool-b-to-fr07.md
```

Append Prompt 011 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–010 historical prompt content.
