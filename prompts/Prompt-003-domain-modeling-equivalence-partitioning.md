# Prompt 003 — Domain Modeling and Equivalence Partitioning

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

The previous steps have already been completed:

* Prompt 001 extracted requirements from `api_specification.md`.
* Prompt 002 audited and normalized those requirements.
* `verified-test-basis.md` now contains:

  * the verified normalized requirement model,
  * 36 test-basis items,
  * specification ambiguities,
  * and 20 test-design blockers.

Your task in Prompt 003 is to transform the verified test basis into a **parameter-domain model and equivalence-partition model**.

Do **not generate executable test cases yet**.

Do **not generate concrete test values yet**.

---

# 1. Input Documents and Source Priority

Use:

1. `verified-test-basis.md` — primary working test basis.
2. `api_specification.md` — authoritative source for verification when necessary.

If the two appear inconsistent:

* treat `api_specification.md` as authoritative,
* explicitly record the inconsistency,
* do not silently resolve it.

Do not inspect:

* source code,
* README files,
* database implementation,
* frontend validation,
* existing Postman tests.

---

# 2. Objective

For every input parameter involved in FR-02, FR-09, and FR-18:

1. identify its domain,
2. identify valid and invalid equivalence partitions,
3. identify conditional partitions,
4. identify specification gaps that prevent deterministic partitioning,
5. distinguish specification-derived partitions from test-design-derived robustness partitions,
6. establish traceability back to the verified test basis.

The resulting model will later be used for:

* Boundary Value Analysis,
* state-transition analysis,
* security analysis,
* schema-validation analysis,
* and final test-case generation.

---

# 3. Partition Classification

Every partition must use exactly one of these classifications.

## VALID

An input class that satisfies the verified specification.

## INVALID

An input class that violates an explicit verified requirement.

## CONDITIONAL

Validity depends on another input, state, resource, role, or precondition.

## EXPLORATORY

A useful test-design class for an area where the specification does not define deterministic behavior.

Do not label something INVALID if the specification does not actually make it invalid.

For unspecified behavior, prefer:

**EXPLORATORY**

or

**CONDITIONAL**

as appropriate.

---

# 4. Partition Basis Classification

Every partition must also state how it was obtained.

Use exactly one of:

### SPEC-EXPLICIT

Directly stated in the specification.

### SPEC-DERIVED

Logically derived from an explicit specification constraint.

Example:

If a field is explicitly `required`, then:

* present → potentially valid
* omitted → invalid

### TYPE-DERIVED

Derived from an explicitly specified data type.

Example:

If a parameter is explicitly defined as a string, a non-string input may be considered a type-invalid robustness partition.

This is a test-design derivation, not a new business requirement.

### DEPENDENCY-DERIVED

Derived from an explicit dependency between fields/resources/states.

### BLOCKER-DRIVEN

Created because the specification leaves behavior undefined.

These partitions must normally be classified as EXPLORATORY.

---

# 5. Step A — Build the Complete Parameter Inventory

First identify every input surface relevant to the selected APIs.

Include:

* path parameters,
* query parameters,
* request headers,
* authentication inputs,
* body fields,
* state-dependent inputs,
* identifiers used to reference existing resources.

Do not omit an input merely because it has no explicit validation constraint.

Produce one row per parameter.

Required table:

| PARAM-ID | Feature | Endpoint | Location | Parameter | Specified Type | Required? | Explicit Constraints | Dependency | TB References |
| -------- | ------- | -------- | -------- | --------- | -------------- | --------- | -------------------- | ---------- | ------------- |

Use IDs:

* `P-FR02-001...`
* `P-FR09-001...`
* `P-FR18-001...`

If information is unavailable, write:

**Not specified**

---

# 6. Step B — Model the Domain of Each Parameter

For every parameter, describe its abstract domain before partitioning it.

Required table:

| PARAM-ID | Parameter | Base Domain | Explicit Valid Domain | Explicit Invalid Domain | Unknown / Unspecified Region |
| -------- | --------- | ----------- | --------------------- | ----------------------- | ---------------------------- |

Examples of domain dimensions that may be relevant only when supported by the test basis:

* presence,
* type,
* format,
* length,
* numeric range,
* enum/set membership,
* identifier existence,
* ownership,
* account state,
* order state,
* coupon state,
* authentication state,
* role.

Do not invent minimums, maximums, formats, enum members, or state rules.

---

# 7. Step C — Generate Equivalence Partitions

Create equivalence partitions for **every parameter**.

Each partition must have a unique ID.

Use:

* `EP-FR02-001...`
* `EP-FR09-001...`
* `EP-FR18-001...`

Required table:

| EP-ID | PARAM-ID | Feature | Endpoint | Parameter | Partition Description | Classification | Basis | Governing Requirement | Dependency / Condition | Deterministic Expected Behavior? |
| ----- | -------- | ------- | -------- | --------- | --------------------- | -------------- | ----- | --------------------- | ---------------------- | -------------------------------- |

`Classification` must be:

* VALID
* INVALID
* CONDITIONAL
* EXPLORATORY

`Basis` must be:

* SPEC-EXPLICIT
* SPEC-DERIVED
* TYPE-DERIVED
* DEPENDENCY-DERIVED
* BLOCKER-DRIVEN

`Deterministic Expected Behavior?` must be:

* YES
* PARTIAL
* NO

Do not include concrete values such as:

* `"abc@gmail.com"`
* `-1`
* `999`
* specific SQL injection strings

at this stage.

Describe classes abstractly instead.

Example:

* syntactically valid email
* malformed email
* required field omitted
* value outside documented enumeration
* existing order identifier
* non-existing order identifier

---

# 8. Step D — FR-02 Specific Domain Analysis

For FR-02, explicitly examine all known domain dimensions related to:

## Credentials

* email
* password

## Presence

* field present
* field missing
* null if relevant to the documented schema

## Type

* correct documented type
* incorrect type where the type is explicitly defined

## Account-related conditions

Keep these separate from pure input partitions where necessary:

* account exists / does not exist
* account state
* locked / unlocked if explicitly supported
* credential correctness

Do not invent:

* lockout threshold,
* lockout duration,
* counter reset rules,
* unlock timing.

If they remain unspecified, link them to the appropriate blocker from Prompt 002.

---

# 9. Step E — FR-09 Specific Domain Analysis

For FR-09, identify every coupon-related input and dependency.

Separate clearly:

### Input domain

Examples may include, only if present in the verified basis:

* coupon code,
* cart/order reference,
* monetary values,
* identifiers.

### Resource-condition domain

Examples:

* coupon exists / does not exist
* coupon eligibility state
* cart/order dependency

### Unspecified business-rule regions

If the specification does not define:

* expiration behavior,
* minimum order,
* usage limit,
* percentage limits,
* per-user restrictions,
* active/inactive status,

do not manufacture partitions declaring these valid or invalid.

Instead create BLOCKER-DRIVEN exploratory partitions only when useful.

---

# 10. Step F — FR-18 Specific Domain Analysis

For FR-18, separate:

## Pure input domains

For example:

* order ID,
* requested order status,
* request body fields.

## Authorization domains

For example:

* authenticated admin,
* authenticated non-admin,
* unauthenticated request,

only when supported by the verified security/authentication basis.

## Resource domains

For example:

* existing order,
* non-existing order.

## State-dependent domains

If requested status validity depends on the current order state, classify the partition as:

**CONDITIONAL**

Do not create a complete transition matrix unless the specification explicitly defines one.

Detailed state-transition modeling will occur in a later prompt.

---

# 11. Step G — Identify Compound and Dependent Domains

Some API behaviors cannot be tested correctly by varying one parameter independently.

Identify interactions such as:

* credential × account existence,
* credential correctness × account state,
* coupon × cart/order state,
* order ID × resource existence,
* requested status × current order state,
* authentication × role.

Required table:

| DEP-ID | Feature | Factor A | Factor B | Relationship | Source / TB Reference | Testing Significance |
| ------ | ------- | -------- | -------- | ------------ | --------------------- | -------------------- |

Use IDs:

* `DEP-FR02-001...`
* `DEP-FR09-001...`
* `DEP-FR18-001...`

Do not generate Cartesian-product test combinations yet.

---

# 12. Step H — Traceability Coverage Check

Verify that every relevant INPUT or DOMAIN test-basis item from Prompt 002 is represented by at least one parameter/domain/partition entry.

Required table:

| TB-ID | Feature | Requirement | Covered By PARAM-ID | Covered By EP-ID(s) | Coverage Status | Notes |
| ----- | ------- | ----------- | ------------------- | ------------------- | --------------- | ----- |

Coverage Status must be:

* COVERED
* PARTIALLY COVERED
* BLOCKED
* NOT APPLICABLE

Any unexplained `NOT COVERED` result is unacceptable.

If something cannot be partitioned due to specification ambiguity, classify it as:

**BLOCKED**

and link it to the corresponding blocker.

---

# 13. Step I — Blocker Impact Analysis

Reuse the blockers identified in Prompt 002.

Do not create duplicate blockers unless a genuinely new domain-design issue is discovered.

Required table:

| Blocker ID | Feature | Affected Parameter / Domain | Partitioning Impact | Current Handling | Later Testing Strategy |
| ---------- | ------- | --------------------------- | ------------------- | ---------------- | ---------------------- |

For `Current Handling`, use:

* EXPLORATORY PARTITION
* PARTIAL PARTITION
* NO DETERMINISTIC PARTITION
* NOT DOMAIN-RELATED

For `Later Testing Strategy`, use one of:

* Verify implementation behavior
* Cover through exploratory testing
* Resolve during state-transition analysis
* Resolve during security analysis
* Exclude from deterministic spec-based tests

---

# 14. Step J — Detect Over-Partitioning and Unsupported Assumptions

Audit your own partition model.

Identify any proposed partition that may accidentally introduce a rule not present in the specification.

Required table:

| Review ID | EP-ID | Potential Problem | Decision | Reason |
| --------- | ----- | ----------------- | -------- | ------ |

Decision must be:

* KEEP
* RECLASSIFY AS EXPLORATORY
* REMOVE
* NEEDS HUMAN REVIEW

This self-review step is mandatory.

---

# 15. Required Final Response Structure

Your response must use **exactly this top-level structure**.

# Prompt 003 — Domain Modeling and Equivalence Partitioning

## 1. Executive Summary

Provide:

* total parameters found,
* parameters by feature,
* total equivalence partitions,
* VALID count,
* INVALID count,
* CONDITIONAL count,
* EXPLORATORY count,
* deterministic partitions,
* non-deterministic partitions,
* blockers affecting domain testing.

Use this table:

| Metric | FR-02 | FR-09 | FR-18 | Total |
| ------ | ----: | ----: | ----: | ----: |

---

## 2. Parameter Inventory

### 2.1 FR-02

Parameter inventory table.

### 2.2 FR-09

Parameter inventory table.

### 2.3 FR-18

Parameter inventory table.

---

## 3. Parameter Domain Models

### 3.1 FR-02

Domain table.

### 3.2 FR-09

Domain table.

### 3.3 FR-18

Domain table.

---

## 4. Equivalence Partition Model

### 4.1 FR-02

Complete EP table.

### 4.2 FR-09

Complete EP table.

### 4.3 FR-18

Complete EP table.

---

## 5. Compound and Dependent Domains

Dependency table.

---

## 6. Test-Basis Traceability

Traceability coverage table.

---

## 7. Specification Blockers Affecting Domain Testing

Blocker impact table.

---

## 8. Unsupported-Assumption / Over-Partitioning Review

Self-review table.

---

## 9. Human Review Checklist

Produce a checklist for me to manually verify, including at minimum:

* [ ] Every endpoint input is represented.
* [ ] Every parameter has at least one domain model entry.
* [ ] Every explicit valid class is represented.
* [ ] Every explicit invalid class is represented.
* [ ] Conditional behavior is not incorrectly classified as globally valid/invalid.
* [ ] Unspecified constraints are not invented.
* [ ] Exploratory partitions are clearly separated from spec-derived partitions.
* [ ] All partitions trace back to verified test-basis items or blockers.
* [ ] FR-02 lockout rules were not invented.
* [ ] FR-09 coupon business rules were not invented.
* [ ] FR-18 transition rules were not invented.

Add any feature-specific checks you consider necessary.

---

## 10. Domain-Test Readiness Summary

For each feature assign:

* READY
* PARTIALLY READY
* BLOCKED

Use:

| Feature | Status | Deterministic Domain Coverage | Main Gaps | Recommended Next Step |
| ------- | ------ | ----------------------------- | --------- | --------------------- |

---

## 11. Machine-Usable Summary for Next Prompt

End the response with a compact section that can be consumed by later prompts.

Use exactly:

```text
DOMAIN_MODEL_SUMMARY

FR-02:
Parameters:
Partition IDs:
Dependencies:
Relevant Blockers:

FR-09:
Parameters:
Partition IDs:
Dependencies:
Relevant Blockers:

FR-18:
Parameters:
Partition IDs:
Dependencies:
Relevant Blockers:
```

Only list IDs and short labels here.

Do not introduce new analysis in this final section.

---

# 16. Important Constraints

You must obey all of the following:

* Do not generate test cases.
* Do not generate test-case IDs such as TC-001.
* Do not generate concrete test data.
* Do not perform Boundary Value Analysis yet.
* Do not generate exact boundary values unless they are merely being quoted as explicit specification constraints.
* Do not perform detailed state-transition test design yet.
* Do not generate attack payloads.
* Do not perform schema test-case generation.
* Do not inspect source code.
* Do not infer rules from the implementation.
* Do not use README as an authoritative requirement source.
* Do not invent undocumented constraints.
* Do not assume common e-commerce behavior.
* Do not convert specification gaps into business rules.
* Keep all Prompt 002 blockers visible.
* Preserve traceability to the verified test basis.

The objective of Prompt 003 is:

**Verified Test Basis → Parameter Domains → Equivalence Partitions**

not:

**Verified Test Basis → Test Cases**.
