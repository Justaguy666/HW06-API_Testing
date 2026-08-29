# Prompt 012 — Verify and Normalize FR-07 Test Basis

You are continuing my HW06 – API Testing project for the EShop SUT.

The current selected feature set is:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-07: Cart**
* Pool C — **FR-18: Order Management (Admin)**

Historical superseded Pool B:

* **FR-09: Discount Coupons**

Prompt 011 completed the Pool B migration and initial FR-07 requirement extraction.

Current FR-07 baseline from Prompt 011:

```text
FR-07 endpoints / operations: 2
FR-07 parameters: 6
FR-07 initial test-basis items: 12
FR-07 blockers: 11
FR-07 EPs: 0
FR-07 testcases: 0

FR-07 quota:
0 / 35
```

Current selected-feature quota:

```text
FR-02: 35 / 35 — PRESERVED
FR-07: 0 / 35 — REBUILD REQUIRED
FR-18: 35 / 35 — PRESERVED

TOTAL:
70 / 105
```

---

# 1. Purpose

Verify and normalize the initial FR-07 test basis created by Prompt 011 before domain modeling begins.

The purpose is:

```text
Raw FR-07 Requirement Extraction
        ↓
Evidence Verification
        ↓
Normalized FR-07 Test Basis
        ↓
Stable Inputs for EP / BVA / Test Design
```

Perform:

1. verify every FR-07 requirement against `api_specification.md`,
2. verify endpoint-to-feature scope,
3. verify parameter definitions,
4. verify business rules,
5. verify authentication / authorization / ownership claims,
6. verify Cart resource/state claims,
7. verify response contracts,
8. verify dependencies,
9. verify all 11 blockers,
10. remove unsupported assumptions from the current test basis,
11. add missing specification-backed test-basis items if Prompt 011 omitted them,
12. establish the authoritative FR-07 basis for Prompt 013.

Do not generate equivalence partitions.

Do not generate testcases.

---

# 2. Authoritative Sources

Primary authoritative source:

```text
eshop-sut/api_specification.md
```

Input analysis:

```text
analysis/pool-b-feature-switch.md
analysis/fr07-requirement-analysis.md
```

Historical project artifacts may be read only for:

* ID consistency,
* methodology consistency,
* preserving FR-02,
* preserving FR-18,
* preserving superseded FR-09 history.

Do not use implementation behavior as requirement authority.

Do not inspect:

* backend source code,
* frontend source code,
* database,
* README behavior,
* runtime API results,
* Postman collections,
* Newman reports.

---

# 3. Scope Boundary

This prompt applies only to:

```text
FR-07 — Cart
```

Do not modify or re-audit:

```text
FR-02
FR-18
```

Do not reactivate:

```text
FR-09
```

FR-09 remains:

```text
SUPERSEDED — HISTORICAL ONLY
```

---

# 4. Verification Classification

For every extracted statement classify using exactly one:

```text
VERIFIED
PARTIALLY_VERIFIED
UNSUPPORTED
CONTRADICTED
AMBIGUOUS
MISSING
```

Definitions:

## VERIFIED

The statement is explicitly supported by the authoritative specification.

## PARTIALLY_VERIFIED

Part of the statement is supported, but at least one detail exceeds available evidence.

## UNSUPPORTED

The specification does not provide evidence for the statement.

## CONTRADICTED

The specification explicitly conflicts with the statement.

## AMBIGUOUS

Multiple interpretations are possible from the specification.

## MISSING

A specification-backed requirement exists but Prompt 011 did not capture it.

---

# 5. Verify FR-07 Endpoint Scope

Verify the 2 operations identified by Prompt 011.

Required table:

| Endpoint / Operation | Prompt 011 Classification | Specification Evidence | Verification | Final Scope |
| -------------------- | ------------------------- | ---------------------- | ------------ | ----------- |

Final Scope:

* IN_SCOPE
* SUPPORTING
* CROSS_FEATURE
* OUT_OF_SCOPE
* AMBIGUOUS

Confirm whether the number of true FR-07 in-scope operations remains:

```text
2
```

If not, report the corrected number.

Do not preserve the count merely because Prompt 011 reported it.

---

# 6. Verify FR-07 vs Neighboring Feature Boundaries

Recheck all relationships between FR-07 and:

```text
FR-05 — Product Listing / Search
FR-06 — Product Detail
FR-08 — Checkout
FR-09 — Discount Coupons
FR-10 — Order State Machine
```

Required table:

| Related Feature | Shared Resource / Operation | Relationship | Evidence | Quota Consequence |
| --------------- | --------------------------- | ------------ | -------- | ----------------- |

Relationship:

* NO_OVERLAP
* SUPPORTING_OVERLAP
* CROSS_FEATURE_OVERLAP
* AMBIGUOUS

Quota Consequence:

* COUNTS_FR07
* DOES_NOT_COUNT_FR07
* SUPPORTING_ONLY
* REQUIRES_LATER_REVIEW

Explicitly ensure that:

```text
Checkout behavior ≠ automatically Cart behavior
Coupon behavior ≠ automatically Cart behavior
Product behavior ≠ automatically Cart behavior
```

---

# 7. Verify Functional Operations

Verify every:

```text
OP-FR07-*
```

from Prompt 011.

Required table:

| OP-ID | Operation | Endpoint | Evidence | Verification | Final Classification |
| ----- | --------- | -------- | -------- | ------------ | -------------------- |

Final Classification:

* RETAIN
* REFINE
* REMOVE_UNSUPPORTED
* ADD_MISSING

If a missing operation is explicitly present in the specification:

assign the next unused:

```text
OP-FR07-NNN
```

Do not renumber existing valid IDs.

---

# 8. Verify Parameters

Verify all 6 existing:

```text
PARAM-FR07-*
```

For every parameter inspect:

* existence,
* location,
* name,
* type,
* requiredness,
* allowed domain,
* format,
* nullability,
* resource relationship,
* authentication relationship.

Required table:

| PARAM-ID | Parameter | Location | Prompt 011 Claim | Specification Evidence | Verification | Final Normalized Definition |
| -------- | --------- | -------- | ---------------- | ---------------------- | ------------ | --------------------------- |

Do not infer conventional API constraints.

Examples of prohibited inference:

```text
quantity must be integer
quantity >= 1
product_id > 0
cart item ID must exist
Authorization must be Bearer
```

unless supported.

---

# 9. Missing Parameter Detection

After verifying the six existing parameters, independently inspect each FR-07 endpoint.

Determine whether Prompt 011 missed any:

* PATH parameters,
* QUERY parameters,
* BODY fields,
* HEADERS,
* auth context,
* resource state input dimensions.

Required table:

| Candidate Missing Parameter | Endpoint | Evidence | Classification | Action |
| --------------------------- | -------- | -------- | -------------- | ------ |

Classification:

* MISSING
* NOT_A_PARAMETER
* SUPPORTING_CONTEXT
* AMBIGUOUS

If genuinely missing:

assign:

```text
PARAM-FR07-007+
```

Do not renumber existing IDs.

---

# 10. Verify Requiredness

Create a dedicated requiredness matrix:

| Parameter | Requiredness | Evidence Strength | Deterministic Invalid-Case Possible? |
| --------- | ------------ | ----------------- | ------------------------------------ |

Requiredness:

* REQUIRED
* OPTIONAL
* NOT_SPECIFIED
* CONTEXT_DEPENDENT

Deterministic Invalid-Case Possible:

* YES
* NO
* PARTIAL

Do not interpret an example request body as proof of requiredness.

---

# 11. Verify Quantity Domain

Independently verify quantity.

Required table:

| Quantity Property     | Prompt 011 Value | Specification Evidence | Final Verification |
| --------------------- | ---------------- | ---------------------- | ------------------ |
| Type                  |                  |                        |                    |
| Required              |                  |                        |                    |
| Integer-only          |                  |                        |                    |
| Zero                  |                  |                        |                    |
| Negative              |                  |                        |                    |
| Fractional            |                  |                        |                    |
| Minimum               |                  |                        |                    |
| Maximum               |                  |                        |                    |
| Stock relationship    |                  |                        |                    |
| Overflow / size limit |                  |                        |                    |

Use:

```text
VERIFIED
NOT_SPECIFIED
AMBIGUOUS
```

where appropriate.

Critical rule:

Do not derive a BVA boundary from:

```text
quantity conceptually should be positive
```

unless the specification supplies that boundary.

---

# 12. Verify Product / Item Identifier Domain

For every product/cart-item identifier verify:

* type,
* existence requirement,
* path/body position,
* omitted representation,
* invalid representation,
* non-existing resource behavior.

Required table:

| Identifier | Property | Evidence | Verification | Test-Design Implication |
| ---------- | -------- | -------- | ------------ | ----------------------- |

Do not assume:

```text
positive integer ID
```

unless documented.

---

# 13. Verify Authentication

Verify authentication separately for each FR-07 endpoint.

Required table:

| Endpoint | Authentication Required? | Scheme | Missing Auth Behavior | Malformed Auth Behavior | Verification |
| -------- | ------------------------ | ------ | --------------------- | ----------------------- | ------------ |

Allowed normalized values include:

```text
VERIFIED
PARTIAL
NOT_SPECIFIED
```

Do not transfer authentication rules from FR-18 or FR-09.

---

# 14. Verify Authorization / Ownership

Verify whether the specification explicitly establishes:

* cart ownership,
* authenticated-user association,
* cross-user access restrictions,
* user_id parameter,
* token-derived identity,
* Admin behavior.

Required table:

| Ownership / Authorization Claim | Evidence | Verification | Final Rule |
| ------------------------------- | -------- | ------------ | ---------- |

If absent:

```text
NOT SPECIFIED
```

Do not assume one cart per user.

---

# 15. Verify Cart Resource Model

Re-audit the Prompt 011 resource model.

Required table:

| Resource Aspect    | Prompt 011 Assessment | Specification Evidence | Final Assessment |
| ------------------ | --------------------- | ---------------------- | ---------------- |
| Cart owner         |                       |                        |                  |
| Cart lifetime      |                       |                        |                  |
| Empty cart         |                       |                        |                  |
| Item identity      |                       |                        |                  |
| Product reference  |                       |                        |                  |
| Quantity           |                       |                        |                  |
| Price              |                       |                        |                  |
| Subtotal           |                       |                        |                  |
| Total              |                       |                        |                  |
| Persistence        |                       |                        |                  |
| Duplicate products |                       |                        |                  |

Final Assessment:

* VERIFIED
* PARTIAL
* NOT_SPECIFIED
* UNSUPPORTED

---

# 16. Verify State / Mutation Semantics

For each mutating operation verify:

```text
pre-state
operation
post-state
```

Required table:

| Operation | Pre-State Claim | Mutation Claim | Post-State Claim | Verification |
| --------- | --------------- | -------------- | ---------------- | ------------ |

Do not create a formal Cart state machine unless explicitly supported.

Only retain abstract states if logically necessary and specification-compatible, such as:

```text
resource exists
resource does not exist
item present
item absent
```

but mark derivation source clearly.

---

# 17. Verify Repeated-Operation Semantics

Check whether the specification defines:

* same item added repeatedly,
* repeated quantity update,
* repeated removal,
* retrieval after mutation,
* accumulation vs replacement.

Required table:

| Repeated Behavior | Specification Evidence | Verification | Hard Oracle Available? |
| ----------------- | ---------------------- | ------------ | ---------------------- |

Do not infer idempotence.

Do not infer quantity accumulation.

---

# 18. Verify Calculation Rules

Recheck all possible calculations.

Required table:

| Calculation Claim | Evidence | Verification | Deterministic Oracle Available? |
| ----------------- | -------- | ------------ | ------------------------------- |

Examples:

* quantity × price,
* subtotal,
* total,
* aggregation across cart items,
* rounding,
* currency.

If formula is absent:

```text
NOT SPECIFIED
```

Do not mark mathematical common sense as specification evidence.

---

# 19. Verify Response Contracts

For every FR-07 endpoint/scenario:

| Endpoint | Scenario | Status | Response Shape | Fields | Types | Verification |
| -------- | -------- | ------ | -------------- | ------ | ----- | ------------ |

Separate:

* transport oracle,
* schema oracle,
* semantic oracle,
* state oracle.

Use:

```text
SUPPORTED
PARTIAL
NOT_SPECIFIED
NOT_APPLICABLE
```

Do not combine these oracle layers.

---

# 20. Exact Schema Audit

Determine exactly what schema assertions can later be generated.

Required table:

| Endpoint | Documented Response Member | Presence Supported? | Type Supported? | Value Semantics Supported? |
| -------- | -------------------------- | ------------------- | --------------- | -------------------------- |

This is important because the assignment requires exact response-schema validation where supported.

Do not fabricate exact schemas where only examples exist.

---

# 21. Verify Error Conditions

For every potentially invalid condition already extracted:

| Condition | Error Behavior Defined? | Status Defined? | Error Schema Defined? | Final Classification |
| --------- | ----------------------- | --------------- | --------------------- | -------------------- |

Final Classification:

* DETERMINISTIC_NEGATIVE
* EXPLORATORY_NEGATIVE
* BLOCKED
* NOT_SPECIFIED

Do not automatically make all invalid-looking inputs deterministic negative tests.

---

# 22. Verify Security Basis

Recheck security evidence relevant to FR-07.

If SEC-01–SEC-07 definitions remain unavailable:

retain:

```text
BLK-ALL-001
```

Required table:

| Security Topic | Specification Evidence | FR-07 Relevance | Normative Security Oracle Available? |
| -------------- | ---------------------- | --------------- | ------------------------------------ |

Topics may include only where relevant:

* authentication,
* authorization,
* object ownership,
* information disclosure,
* input handling.

Do not invent OWASP requirements as specification requirements.

---

# 23. Verify Dependencies

Verify every dependency extracted in Prompt 011.

Required table:

| Dependency | Prompt 011 Classification | Evidence | Final Classification | Quota Effect |
| ---------- | ------------------------- | -------- | -------------------- | ------------ |

Final Classification:

* IN_SCOPE
* SUPPORTING_ONLY
* SETUP_ONLY
* CROSS_FEATURE
* AMBIGUOUS
* REMOVE_UNSUPPORTED

Do not count setup operations as FR-07 tests.

---

# 24. Verify the 11 Existing Blockers

Audit every:

```text
BLK-FR07-001
...
BLK-FR07-011
```

Required table:

| Blocker ID | Prompt 011 Missing Information | Still Missing? | Evidence | Final Status |
| ---------- | ------------------------------ | -------------- | -------- | ------------ |

Final Status:

* RETAIN
* REFINE
* RESOLVED_BY_SPEC
* REMOVE_UNSUPPORTED

A blocker may be removed only when specification evidence resolves it.

Do not resolve blockers through implementation assumptions.

---

# 25. Missing Blocker Detection

After verifying the 11 blockers, determine whether additional blockers are needed.

For each missing uncertainty ask whether it affects:

* domain modeling,
* expected result,
* schema,
* state,
* authentication,
* ownership,
* repeated behavior,
* calculation,
* dependency,
* security.

Required table:

| Candidate Blocker | Affected Area | Evidence Gap | Add? |
| ----------------- | ------------- | ------------ | ---- |

If added:

assign the next unused:

```text
BLK-FR07-012+
```

Never renumber existing blocker IDs.

---

# 26. Verify the 12 Existing Test-Basis Items

Audit:

```text
TB-FR07-001
...
TB-FR07-012
```

Required table:

| TB-ID | Requirement | Prompt 011 Status | Specification Evidence | Verification | Action |
| ----- | ----------- | ----------------- | ---------------------- | ------------ | ------ |

Action:

* RETAIN
* REFINE
* REMOVE_UNSUPPORTED
* SPLIT
* MERGE_NOT_ALLOWED

Do not merge IDs if doing so destroys traceability.

If one TB contains multiple independently testable requirements:

prefer:

```text
SPLIT
```

and preserve the original ID as appropriate.

---

# 27. Detect Missing Test-Basis Items

Independently re-read both FR-07 operations.

Identify any explicit specification requirement not represented by an existing TB.

Required table:

| Missing Requirement | Endpoint | Requirement Type | Evidence | Add? |
| ------------------- | -------- | ---------------- | -------- | ---- |

If added:

assign:

```text
TB-FR07-013+
```

Do not add inferred best practices.

---

# 28. Normalize Test-Basis Schema

Final FR-07 test basis must use:

| Field                          | Required |
| ------------------------------ | -------- |
| TB-ID                          | YES      |
| Feature                        | YES      |
| Endpoint                       | YES      |
| Requirement Type               | YES      |
| Requirement Statement          | YES      |
| Verification Status            | YES      |
| Evidence                       | YES      |
| Testability                    | YES      |
| Deterministic Oracle Available | YES      |
| Related PARAM IDs              | YES      |
| Related Blocker IDs            | YES      |
| Notes                          | YES      |

Requirement Type:

* ENDPOINT
* INPUT
* AUTHENTICATION
* AUTHORIZATION
* OWNERSHIP
* RESOURCE
* BUSINESS_RULE
* STATE
* RESPONSE
* SCHEMA
* SECURITY
* DEPENDENCY

Testability:

* TESTABLE
* PARTIALLY_TESTABLE
* EXPLORATORY_ONLY
* BLOCKED

Deterministic Oracle Available:

* YES
* PARTIAL
* NO

---

# 29. Requirement Atomicity Check

Every final TB must represent one meaningful testable rule or contract.

Flag:

```text
NON_ATOMIC
```

if a TB combines independent requirements.

Required table:

| TB-ID | Atomic? | Problem | Normalization |
| ----- | ------- | ------- | ------------- |

Goal:

```text
NON_ATOMIC unresolved = 0
```

---

# 30. Parameter-to-Test-Basis Traceability

Create:

| PARAM-ID | Related TB IDs | Coverage Relationship | Blocker |
| -------- | -------------- | --------------------- | ------- |

Every retained parameter should relate to at least one TB or be explicitly classified as setup/supporting context.

Do not create EPs.

---

# 31. Blocker-to-Test-Basis Traceability

Create:

| Blocker ID | Affected TB IDs | Affected Oracle Layer |
| ---------- | --------------- | --------------------- |

Oracle layer:

* PRECONDITION
* TRANSPORT
* SCHEMA
* SEMANTIC
* STATE
* SECURITY
* EXECUTABILITY

Multiple values allowed.

---

# 32. Oracle Support Summary

Required table:

| Oracle Layer | Fully Supported TBs | Partially Supported TBs | Unsupported / Blocked TBs |
| ------------ | ------------------- | ----------------------- | ------------------------- |

Layers:

* TRANSPORT
* SCHEMA
* SEMANTIC
* STATE
* SECURITY

This summary must describe support only.

Do not generate actual tests.

---

# 33. FR-07 Readiness for Domain Modeling

Determine whether the normalized basis is ready for Prompt 013.

Validate:

```text
Endpoint scope normalized
Parameters normalized
TB IDs stable
Blockers stable
Unsupported assumptions removed
Neighboring-feature scope separated
No EPs generated
No testcases generated
```

Required result:

```text
READY_FOR_DOMAIN_MODELING
```

or:

```text
NOT_READY_FOR_DOMAIN_MODELING
```

If NOT_READY:

state exact blockers.

Do not solve them through assumptions.

---

# 34. Update Artifact

Create:

```text
analysis/fr07-verified-test-basis.md
```

This becomes the authoritative FR-07 verified basis for downstream prompts.

Do not replace historical:

```text
analysis/fr07-requirement-analysis.md
```

Prompt 011 remains the raw extraction artifact.

---

# 35. Do Not Modify Combined Historical Artifacts Yet

Do not update:

```text
analysis/verified-test-basis.md
analysis/domain-model.md
analysis/boundary-value-analysis.md
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/human-audit-worksheet.md
```

Those combined artifacts will be reconciled later after FR-07 reaches the appropriate pipeline stage.

Prompt 012 should remain FR-07-specific.

---

# 36. Required Final Response Structure

Use exactly:

# Prompt 012 — Verify and Normalize FR-07 Test Basis

## 1. Executive Summary

Include:

* Prompt 011 endpoints,
* Prompt 011 parameters,
* Prompt 011 TBs,
* Prompt 011 blockers,
* final verified counts,
* additions/removals/refinements,
* domain-modeling readiness.

---

## 2. Endpoint Scope Verification

Endpoint table.

---

## 3. Neighboring Feature Boundary Verification

Scope comparison.

---

## 4. Functional Operation Verification

OP table.

---

## 5. Parameter Verification

Parameter table.

---

## 6. Missing Parameter Analysis

Missing-parameter table.

---

## 7. Requiredness Verification

Requiredness table.

---

## 8. Quantity Domain Verification

Quantity table.

---

## 9. Identifier Domain Verification

Identifier table.

---

## 10. Authentication Verification

Authentication table.

---

## 11. Authorization and Ownership Verification

Ownership table.

---

## 12. Cart Resource Model Verification

Resource-model table.

---

## 13. State and Mutation Verification

State table.

---

## 14. Repeated-Operation Verification

Repeated-operation table.

---

## 15. Calculation Rule Verification

Calculation table.

---

## 16. Response Contract Verification

Response table.

---

## 17. Exact Schema Audit

Schema table.

---

## 18. Error Behavior Verification

Error table.

---

## 19. Security Basis Verification

Security table.

---

## 20. Dependency Verification

Dependency table.

---

## 21. Existing Blocker Verification

11-blocker verification table.

---

## 22. Missing Blocker Analysis

New-blocker analysis.

---

## 23. Existing Test-Basis Verification

12-TB verification table.

---

## 24. Missing Test-Basis Analysis

Missing-requirement table.

---

## 25. Final Normalized FR-07 Test Basis

Full final TB table.

---

## 26. Requirement Atomicity Validation

Atomicity table.

---

## 27. Parameter Traceability

PARAM → TB table.

---

## 28. Blocker Traceability

BLK → TB table.

---

## 29. Oracle Support Summary

Oracle table.

---

## 30. Validation

Validate:

* endpoint refs,
* operation IDs,
* parameter IDs,
* TB IDs,
* blocker IDs,
* no duplicate IDs,
* no unsupported hard requirements,
* no EP IDs generated,
* no testcase IDs generated,
* no implementation assumptions introduced.

---

## 31. Domain Modeling Readiness

Use exactly one:

```text
READY_FOR_DOMAIN_MODELING
```

or:

```text
NOT_READY_FOR_DOMAIN_MODELING
```

---

## 32. Current Project Status

Use:

```text
POOL B:
FR-07

FR-07 REQUIREMENT EXTRACTION:
COMPLETE

FR-07 TEST BASIS VERIFICATION:
COMPLETE

FR-07 DOMAIN MODEL:
NOT STARTED

FR-07 BVA:
NOT STARTED

FR-07 AI TEST GENERATION:
NOT STARTED

FR-07 QUOTA:
0 / 35

FR-02:
PRESERVED — 35 / 35

FR-18:
PRESERVED — 35 / 35

FR-09:
SUPERSEDED — HISTORICAL ONLY
```

---

## 33. Machine-Usable Summary

End exactly:

```text
PROMPT_012_SUMMARY

FR-07 endpoint count:
FR-07 operation count:

Parameters before verification:
6

Parameters after verification:

Test-basis items before verification:
12

Test-basis items after verification:

Blockers before verification:
11

Blockers after verification:

Unsupported requirements removed:
Contradicted requirements:
Missing requirements added:
Ambiguous requirements retained:

Unresolved non-atomic TBs:

EPs generated:
0

Testcases generated:
0

Domain modeling readiness:
READY_FOR_DOMAIN_MODELING / NOT_READY_FOR_DOMAIN_MODELING

FR-07 quota:
0 / 35

Next required prompt:
PROMPT 013 — FR-07 DOMAIN MODELING AND EQUIVALENCE PARTITIONING
```

---

# 37. Important Constraints

* Work only on FR-07.
* Preserve FR-02.
* Preserve FR-18.
* Keep FR-09 historical.
* Treat `api_specification.md` as authoritative.
* Do not inspect implementation.
* Do not generate EPs.
* Do not generate BVA.
* Do not generate testcases.
* Do not generate concrete test data.
* Do not create Postman requests.
* Do not execute APIs.
* Do not infer conventional Cart rules.
* Do not infer quantity minimums.
* Do not infer quantity integer-only behavior.
* Do not infer stock behavior.
* Do not infer duplicate-item behavior.
* Do not infer Cart ownership.
* Do not infer persistence.
* Do not infer calculations.
* Do not fabricate response schemas.
* Do not fabricate HTTP statuses.
* Do not invent SEC definitions.
* Preserve missing information as blockers.
* Preserve stable IDs whenever valid.
* Add new IDs only when supported evidence was genuinely omitted.

The objective is:

**FR-07 Raw Extraction → Verified Atomic Test Basis**

not:

**FR-07 Test Generation**.

---

# 38. Output Artifacts

Create:

```text
analysis/fr07-verified-test-basis.md
```

Log:

```text
prompts/Prompt-012-verify-normalize-fr07-test-basis.md
```

Append Prompt 012 to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–011 historical prompt contents.
