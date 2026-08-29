# HW06 — Prompt 005: Requirement-Driven API Test Case Design

You are continuing my individual **HW06 – API Testing** assignment.

Student ID:

`23127070`

Project root:

`C:\Users\LEGION 5\Downloads\ST\Homeworks\HW06-API_Testing`

Your task is to derive a **traceable API test-case suite** from the already verified test basis, equivalence partitions, and boundary analysis.

This prompt is **test-case design only**.

Do NOT:

* execute the API;
* implement automation;
* create concrete payload values unless strictly required to express the logical test condition;
* generate attack strings;
* invent missing boundaries;
* resolve requirement blockers by assumption.

---

# 1. Read Existing Analysis First

Read all relevant existing artifacts, especially:

`analysis/verified-test-basis.md`

`analysis/domain-model.md`

`analysis/boundary-value-analysis.md`

and the authoritative requirement/API source files identified by Prompt 002.

Also inspect:

`prompts/Prompt-002-*`
`prompts/Prompt-003-*`
`prompts/Prompt-004-*`

only where needed to understand analysis decisions.

Do not replace the conclusions already established without new authoritative evidence.

---

# 2. Current Verified State

Previous analysis established:

## Verified Test Basis

* 20 unresolved blockers
* authoritative evidence distinguished from assumptions
* no test cases generated yet

## Domain Modeling / Equivalence Partitioning

* 27 parameters
* 91 equivalence partitions

Partition classification:

* `VALID`: 5
* `INVALID`: 21
* `CONDITIONAL`: 20
* `EXPLORATORY`: 45

## Boundary Value Analysis

* 27 parameters analyzed
* 0 parameters with sufficiently supported executable numeric/string boundaries
* 18 parameters not suitable for BVA
* 9 parameters blocked by specification
* no fabricated `BC-*`
* no fabricated `BV-*`
* no fabricated `BR-*`

Treat these as the starting point.

---

# 3. Main Goal

Create a requirement-driven set of API test cases that provides strong coverage of:

`verified requirements`
+
`equivalence partitions`
+
`applicable state/conditional behavior`

without inventing unsupported expectations.

The test suite must answer:

* Which verified behavior is being tested?
* Which partition is covered?
* Which parameter is responsible for the test objective?
* Which other parameters must remain nominal?
* What oracle is actually supported?
* Is the case executable now?
* Is it blocked?
* Is it exploratory?
* Why does this case exist?

---

# 4. Do Not Generate One Case Per Partition Mechanically

Do NOT assume:

`91 partitions = 91 test cases`

Instead perform deliberate test minimization.

Where one test can legitimately cover multiple compatible partitions:

* identify the primary partition under test;
* identify secondary covered partitions;
* keep one primary test objective.

Do not combine unrelated invalid conditions into one negative test.

For invalid-input tests prefer:

`one invalid factor at a time`

with all unrelated parameters held at nominal valid values.

---

# 5. Preserve Partition IDs

Every case must trace to the existing partition IDs from:

`domain-model.md`

Do not rename or regenerate the existing partition identifiers.

Each test case must contain:

`Primary Partition`

and optionally:

`Secondary Partitions`

Example conceptual format:

`Primary: EP-P03-INVALID-02`

`Secondary: EP-P01-VALID-01`

Use the actual IDs from the repository, not invented examples.

---

# 6. Preserve Parameter IDs

Use the existing parameter IDs/names from the domain model.

Do not silently change:

* parameter names;
* request location;
* datatype;
* semantic meaning;
* required/optional classification.

---

# 7. Source Priority

When deciding expected behavior, use this priority:

1. authoritative assignment/API specification;
2. verified API contract / authoritative source identified by Prompt 002;
3. verified domain-analysis conclusion;
4. conditional evidence;
5. exploratory assumption.

Never promote levels 4–5 into hard requirement assertions without justification.

---

# 8. Test Case Categories

Each proposed case must be assigned exactly one design category:

`POSITIVE`

`NEGATIVE`

`CONDITIONAL`

`EXPLORATORY`

Interpretation:

### POSITIVE

Supported valid behavior with a defined expected oracle.

### NEGATIVE

Supported invalid behavior with a defined rejection/error oracle.

### CONDITIONAL

Behavior depends on unresolved requirement, state, precondition, or external constraint.

### EXPLORATORY

Useful behavior to probe but no authoritative pass/fail oracle exists yet.

Do not call exploratory behavior a negative test simply because it may fail.

---

# 9. Executability Status

Each case must also have exactly one:

`READY`

`BLOCKED`

`EXPLORATORY_ONLY`

Definitions:

### READY

Enough information exists to execute the case and determine pass/fail.

### BLOCKED

The logical case is justified but one or more required facts are unresolved.

### EXPLORATORY_ONLY

The API may be probed, but no requirement-backed pass/fail oracle exists.

---

# 10. BVA Integration

Prompt 004 found:

`0 supported executable boundaries`

Therefore:

Do NOT create BVA-specific cases unless Prompt 005 discovers genuinely new authoritative evidence not previously considered.

Do NOT generate arbitrary cases such as:

`min - 1`
`min`
`min + 1`
`max - 1`
`max`
`max + 1`

without an actual defined boundary.

If a test case involves a BVA-blocked parameter, reference the BVA blocker instead.

---

# 11. Nominal Baseline Concept

For each endpoint/request model, define a conceptual:

`Nominal Valid Baseline`

This should represent the minimum known-valid request condition supported by evidence.

Do not yet hardcode concrete values if those values belong in the later Test Data phase.

Example conceptual baseline:

* valid authentication context;
* required fields present;
* known-valid datatype;
* no conflicting parameters;
* normal resource state.

Document what remains unresolved.

---

# 12. One Primary Objective Per Test

Each test case must have exactly one primary reason to exist.

Good:

`Verify required parameter X is rejected when omitted.`

Bad:

`Omit X, give Y wrong type, make Z malformed, and verify error.`

The latter makes root-cause interpretation impossible.

---

# 13. Positive Coverage

Design enough positive cases to demonstrate the known valid request behavior.

Do not create duplicate happy-path cases without coverage value.

Positive tests should cover:

* required valid flow;
* meaningful valid variants supported by distinct equivalence partitions;
* optional parameter absence/presence where requirement-supported;
* relevant state-dependent valid behavior.

---

# 14. Negative Coverage

For each authoritative `INVALID` partition, determine whether a dedicated negative case is needed.

Each negative case should preferably mutate exactly one target factor from the nominal valid baseline.

Possible logical conditions include, only where supported:

* required parameter omitted;
* wrong datatype;
* invalid enum/member;
* semantically invalid value;
* invalid resource state;
* invalid relationship between parameters;
* unauthorized/forbidden access.

Do not invent expected HTTP codes or messages.

---

# 15. Conditional Partitions

There are 20 `CONDITIONAL` partitions.

For each one decide:

`testable now`
or
`blocked`

If testable:

create a `CONDITIONAL` case with the exact precondition.

If blocked:

create a candidate test case only if useful, but mark:

`Executability: BLOCKED`

and reference the blocker ID.

Do not resolve the blocker with an assumption.

---

# 16. Exploratory Partitions

There are 45 `EXPLORATORY` partitions.

Do NOT blindly create 45 exploratory tests.

Select exploratory probes only where they have meaningful information value, for example:

* unspecified null handling;
* unspecified unknown field handling;
* implementation-defined coercion;
* unbounded input behavior;
* undocumented combination behavior.

For these:

`Expected Result`

must NOT contain an invented pass/fail requirement.

Instead use:

`Observation Goal`

such as:

`Observe whether the API accepts, rejects, coerces, or ignores the condition.`

---

# 17. Blocker Traceability

Reuse the blocker IDs from Prompt 002.

Do not create duplicate blocker records when an existing blocker already represents the issue.

Each blocked case must contain:

`Blocked By: <blocker ID(s)>`

If new blockers are genuinely discovered, assign new IDs using the existing blocker convention and explain why they are new.

---

# 18. Expected Result Discipline

Every READY case must separate:

`Expected HTTP behavior`

`Expected response contract`

`Expected state effect`

where applicable.

Only state what evidence supports.

For example, if requirement only says:

`request must be rejected`

but does not define status code:

do NOT write:

`Expected HTTP 400`

unless another authoritative source supports it.

Instead:

`Expected: request rejected`

`HTTP code: NOT SPECIFIED`

---

# 19. Response Oracle Structure

For every non-exploratory test, explicitly define available oracle layers:

### Transport Oracle

Examples:

* success/rejection;
* status code if specified.

### Schema Oracle

Examples:

* required response fields;
* datatype;
* object/array structure.

### Semantic Oracle

Examples:

* returned resource matches request;
* forbidden transition does not occur.

### State Oracle

Examples:

* database/resource state changes;
* resource remains unchanged after rejection.

Use:

`SUPPORTED`
`NOT SPECIFIED`
`NOT APPLICABLE`

for each oracle layer.

---

# 20. Authentication / Authorization

Where authentication or authorization is part of the endpoint contract, treat it as an explicit test dimension.

Do not mix authentication failure with unrelated parameter validation unless the test objective is specifically precedence/order-of-validation behavior.

If validation order is unspecified, avoid asserting which error must occur first.

---

# 21. Inter-Parameter Constraints

Review domain-model relationships.

When a partition is invalid only because:

`A + B combination`

is invalid:

create a relationship test rather than attributing the failure to A alone.

Document:

`Constraint Under Test`

and keep other values nominal.

---

# 22. State-Dependent Cases

If behavior depends on system/resource state, define:

`Required Initial State`

Examples:

* resource exists;
* resource does not exist;
* user owns resource;
* user does not own resource;
* previous request completed;
* entity in specific lifecycle state.

Do not invent setup mechanisms yet.

Test-data/setup implementation belongs to later prompts.

---

# 23. Test Case IDs

Assign stable IDs using:

`TC-API-001`
`TC-API-002`
...

unless the repository already defines another HW06 convention.

Do not encode expected status such as PASS/FAIL into the ID.

IDs must remain stable for later:

`test data`
`automation`
`execution`
`bug traceability`.

---

# 24. Required Test Case Schema

Every test case must contain all of these fields:

### Identity

* Test Case ID
* Endpoint / operation
* Method
* Category
* Executability

### Traceability

* Requirement source
* Parameter(s)
* Primary Partition
* Secondary Partition(s)
* BVA Reference
* Blocker Reference

### Objective

* Primary test objective

### Preconditions

* Authentication context
* Resource/system state
* Nominal baseline assumptions

### Logical Input

Do NOT yet provide fully concrete data.

Describe conditions such as:

`valid registered user ID`

`parameter X omitted`

`known-valid enum member`

`invalid enum member not in allowed set`

### Execution

* Logical steps

### Expected / Oracle

* Transport Oracle
* Schema Oracle
* Semantic Oracle
* State Oracle

### Cleanup Requirement

Describe logical cleanup if state mutation occurs.

### Notes

* ambiguity;
* source limitation;
* exploratory goal;
* rationale.

All fields are mandatory.

Use:

`N/A`
`NOT SPECIFIED`
`NONE`

rather than silently omitting a field.

---

# 25. Coverage Matrix

Create a complete matrix:

| Parameter | Partition ID | Classification | Covered By Test(s) | Coverage Status | Reason |
| --------- | ------------ | -------------- | ------------------ | --------------- | ------ |

Coverage Status must be one:

`COVERED`

`BLOCKED`

`DEFERRED_EXPLORATORY`

`NOT_SELECTED`

For `NOT_SELECTED`, explain why the partition is redundant or low-value.

Do not leave partitions silently uncovered.

---

# 26. Requirement Coverage Matrix

Also create:

| Requirement / Rule | Test Cases | Status |
| ------------------ | ---------- | ------ |

Status:

`COVERED`

`PARTIAL`

`BLOCKED`

`NOT TESTABLE`

This is separate from partition coverage.

---

# 27. Case Minimization Review

After generating candidate tests, run a minimization pass.

Identify:

* exact duplicates;
* cases differing only in irrelevant values;
* tests that accidentally combine multiple invalid factors;
* exploratory probes with low information value;
* positive cases that add no new partition/rule coverage.

Remove redundant cases.

Do NOT optimize solely for the lowest number of cases.

Preserve meaningful defect-detection capability.

---

# 28. Pairwise / Combinatorial Testing

Do NOT introduce pairwise, all-pairs, orthogonal arrays, or combinatorial test generation in this prompt unless the requirement explicitly calls for it.

This prompt is based on:

`requirements`
+
`equivalence partitioning`
+
`verified constraints`

Combinatorial coverage can be designed separately if justified later.

---

# 29. Security / Attack Payloads

Do NOT generate:

* SQL injection strings;
* XSS payloads;
* path traversal payloads;
* command injection payloads;
* large fuzz strings;
* malformed encoding attacks.

Those belong to a later robustness/security prompt.

This prompt may only identify a future robustness test dimension.

---

# 30. Concrete Test Data

Do NOT assign concrete final values such as:

`username = abc@example.com`

unless that literal value is itself part of the authoritative specification.

Use logical data descriptions.

Concrete reusable values belong to the next Test Data prompt.

---

# 31. No Execution

Do NOT:

* start servers;
* send API requests;
* call Postman;
* run Newman;
* run pytest;
* run Playwright;
* run curl;
* inspect runtime behavior to overwrite the requirement.

This phase remains static test design.

---

# 32. Files to Create

Create:

`analysis/test-case-design.md`

This is the authoritative logical test-case design.

Optionally create:

`analysis/test-coverage-matrix.md`

if separating the coverage matrix materially improves readability.

Do not create automation files.

---

# 33. Human-Review Section

At the end of `test-case-design.md`, include:

`## Human Review Required`

List decisions that specifically require student confirmation.

Examples:

* whether a conditional case is worth retaining;
* whether an exploratory case has enough value;
* whether a requirement oracle is sufficiently authoritative;
* whether a redundant case should be removed.

Do NOT automatically mark:

`Student Approved`

or equivalent.

Use:

`PENDING STUDENT REVIEW`

---

# 34. AI Audit

Save the exact prompt as:

`prompts/Prompt-005-test-case-design.md`

following the project's actual naming convention.

Update the AI prompt log using the established audit format.

The prompt log must preserve the exact prompt text.

Do not fabricate previous interactions.

---

# 35. Validation Checklist

Before completion verify:

* [ ] verified-test-basis read
* [ ] domain-model read
* [ ] boundary-value-analysis read
* [ ] all 27 parameters accounted for
* [ ] all 91 partitions accounted for in coverage matrix
* [ ] existing partition IDs preserved
* [ ] existing blocker IDs preserved
* [ ] no invented boundary values
* [ ] no concrete final test dataset generated
* [ ] no attack payload generated
* [ ] no API request executed
* [ ] one primary objective per test
* [ ] invalid cases use one-invalid-factor-at-a-time where appropriate
* [ ] positive cases minimized
* [ ] conditional cases explicitly classified
* [ ] exploratory cases have observation goals, not fake requirements
* [ ] transport/schema/semantic/state oracles separated
* [ ] unknown HTTP codes are not invented
* [ ] blocked tests identify blockers
* [ ] every partition has an explicit coverage disposition
* [ ] requirement coverage matrix exists
* [ ] case minimization performed
* [ ] human review remains pending
* [ ] prompt logged exactly

---

# 36. Required Final Response Structure

Return exactly the following sections.

## A. Inputs Reviewed

List the authoritative files and analysis artifacts actually read.

## B. Test Design Summary

Return:

```text
Parameters: <count>
Partitions reviewed: <count>

Candidate tests before minimization: <count>
Final logical test cases: <count>

POSITIVE: <count>
NEGATIVE: <count>
CONDITIONAL: <count>
EXPLORATORY: <count>

READY: <count>
BLOCKED: <count>
EXPLORATORY_ONLY: <count>
```

## C. Test Cases by Endpoint

| Endpoint / Operation | Positive | Negative | Conditional | Exploratory | Total |
| -------------------- | -------: | -------: | ----------: | ----------: | ----: |

## D. Test Case Inventory

| Test ID | Endpoint | Primary Objective | Primary Partition | Category | Executability |
| ------- | -------- | ----------------- | ----------------- | -------- | ------------- |

List every final logical test case.

## E. Partition Coverage

Return:

```text
COVERED: <count>
BLOCKED: <count>
DEFERRED_EXPLORATORY: <count>
NOT_SELECTED: <count>
TOTAL: 91
```

Then identify all non-covered partitions with reason.

## F. Requirement Coverage

Summarize:

```text
COVERED:
PARTIAL:
BLOCKED:
NOT TESTABLE:
```

with counts.

## G. BVA Integration

Explicitly state how Prompt 004 affected the test design.

Expected if no new evidence exists:

```text
BVA-derived concrete cases: 0
```

Explain why.

## H. Blocked Cases

| Test ID | Blocker ID | Missing Information | Impact |
| ------- | ---------- | ------------------- | ------ |

## I. Exploratory Cases

| Test ID | Observation Goal | Why No Hard Oracle Exists |
| ------- | ---------------- | ------------------------- |

## J. Oracle Coverage

Summarize how many cases have:

```text
Transport oracle
Schema oracle
Semantic oracle
State oracle
```

Distinguish `SUPPORTED` from `NOT SPECIFIED`.

## K. Minimization Decisions

List meaningful cases removed/merged and why.

Do not list trivial editorial cleanup.

## L. Files Created/Updated

List actual files only.

## M. Human Review Required

List decisions requiring student confirmation.

End with exactly:

```text
Status: PENDING STUDENT REVIEW
```

## N. Validation

Use only:

```text
PASS
FAIL
NOT VERIFIED
```

for every validation item.

## O. Next Step

If the logical test suite is complete enough for concrete data design:

```text
After student review, derive concrete and reusable API test data for the approved logical test cases while preserving partition and requirement traceability.
```

If major blockers prevent meaningful test design:

```text
Resolve the identified specification blockers before deriving concrete API test data.
```

Do not execute the next step.
