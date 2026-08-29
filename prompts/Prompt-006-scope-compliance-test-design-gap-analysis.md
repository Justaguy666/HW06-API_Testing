# Prompt 006 — Scope Compliance and Test-Design Gap Analysis

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected assignment features are strictly:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Previous artifacts:

1. `api_specification.md`
2. `analysis/verified-test-basis.md`
3. `analysis/domain-model.md`
4. `analysis/boundary-value-analysis.md`
5. `analysis/test-case-design.md`
6. `analysis/test-coverage-matrix.md`

Current logical test-design result:

* 27 parameters
* 91 equivalence partitions
* 73 logical test cases
* FR-02 currently: 13 cases
* FR-09 currently: 32 cases
* FR-18 currently: 28 cases

No API execution or concrete test dataset has been created.

Your task is to audit the current logical test suite for:

1. selected-feature scope correctness,
2. per-feature test-count compliance,
3. technique coverage,
4. requirement coverage,
5. missing deterministic and exploratory test-design opportunities.

Do **not create concrete test data yet**.

Do **not create Postman requests yet**.

---

# 1. Authoritative Source and Scope Rules

Use `api_specification.md` as the authoritative source.

The assignment selection is fixed:

```text
FR-02
FR-09
FR-18
```

Do not silently expand the assignment scope to other features.

An endpoint may be counted toward a selected feature only if the specification provides a defensible relationship between that endpoint and that feature.

Pay particular attention to possible overlap with:

* FR-10 — Order state machine
* FR-17 — Coupon management CRUD

Do not assume that an endpoint belongs to FR-09 merely because it manipulates coupons.

Do not assume that an endpoint belongs to FR-18 merely because it manipulates orders.

---

# 2. Audit Endpoint-to-Feature Mapping

Review every endpoint currently appearing in the 73 logical test cases.

Required table:

| Endpoint / Operation | Current Feature | Specification Feature(s) | Scope Classification | Can Count Toward Selected Feature Quota? | Evidence / Reason |
| -------------------- | --------------- | ------------------------ | -------------------- | ---------------------------------------- | ----------------- |

`Scope Classification` must be exactly one of:

* IN_SCOPE
* SUPPORTING
* CROSS_FEATURE
* OUT_OF_SCOPE
* AMBIGUOUS

Definitions:

### IN_SCOPE

The endpoint directly implements FR-02, FR-09, or FR-18.

### SUPPORTING

The endpoint is needed as setup/precondition for testing a selected feature but is not itself the selected feature.

### CROSS_FEATURE

The endpoint primarily belongs to another functional requirement but interacts with a selected feature.

### OUT_OF_SCOPE

The endpoint has no defensible role in the selected feature testing scope.

### AMBIGUOUS

The specification does not permit deterministic mapping.

Only `IN_SCOPE` test cases may automatically count toward the ≥35 target.

`SUPPORTING` and `CROSS_FEATURE` cases must be reported separately.

---

# 3. Audit Every Existing Test Case

Review all existing:

```text
TC-API-001 ... TC-API-073
```

Do not renumber them.

Required table:

| Test ID | Current Feature | Endpoint | Scope Classification | Primary Requirement | Primary Technique | Readiness | Keep? | Quota Eligible? | Reason |
| ------- | --------------- | -------- | -------------------- | ------------------- | ----------------- | --------- | ----- | --------------- | ------ |

`Primary Technique` must be one of:

* DOMAIN
* STATE
* SECURITY
* SCHEMA
* BUSINESS_RULE
* AUTHENTICATION
* AUTHORIZATION
* ROBUSTNESS

`Readiness`:

* READY
* BLOCKED
* EXPLORATORY_ONLY

`Keep?`:

* KEEP
* KEEP_AS_SUPPORTING
* RECLASSIFY
* REMOVE_DUPLICATE
* NEEDS_HUMAN_REVIEW

Do not delete an existing case merely because it is cross-feature.

Preserve it when useful, but do not count it incorrectly toward the selected feature quota.

---

# 4. Recalculate the True Per-Feature Test Count

After scope audit, calculate:

| Metric                         | FR-02 | FR-09 | FR-18 |
| ------------------------------ | ----: | ----: | ----: |
| Existing logical cases         |       |       |       |
| IN_SCOPE cases                 |       |       |       |
| Supporting/cross-feature cases |       |       |       |
| Quota-eligible cases           |       |       |       |
| Required minimum               |    35 |    35 |    35 |
| Shortfall                      |       |       |       |

The requirement target is:

```text
>= 35 AI-generated test cases per selected API/feature
```

Do not use supporting setup cases to artificially satisfy this target.

---

# 5. Technique Coverage Audit

For each selected feature, audit coverage across:

* Domain partitions
* State/state-dependent behavior
* Security
* Response schema
* Authentication
* Authorization
* Business rules

Required matrix:

| Technique | FR-02 | FR-09 | FR-18 | Evidence | Gap? |
| --------- | ----- | ----- | ----- | -------- | ---- |

Coverage rating:

* STRONG
* PARTIAL
* WEAK
* NOT_APPLICABLE
* BLOCKED

Explain every `WEAK`, `PARTIAL`, or `BLOCKED` rating.

---

# 6. Domain Coverage Audit

Use the 91 equivalence partitions from Prompt 003.

For each selected feature calculate:

| Feature | Partitions | Covered | Blocked | Exploratory Deferred | Uncovered |
| ------- | ---------: | ------: | ------: | -------------------: | --------: |

Then identify all partitions that could reasonably produce an additional independent logical test without introducing duplicate coverage.

Do not force one test per partition.

Preserve the minimization principle.

---

# 7. State Coverage Audit

Do not invent state transitions.

Identify:

* existing state-oriented logical cases,
* state-dependent cases,
* blocked state cases,
* missing state coverage supported by the specification.

Required table:

| Feature | State / Condition | Existing Test IDs | Coverage | Blocker | Additional Test Opportunity? |
| ------- | ----------------- | ----------------- | -------- | ------- | ---------------------------- |

For FR-02 focus on account-lockout-related state only where supported.

For FR-18 distinguish:

* admin order-management behavior,
* generic order state-machine behavior,
* user cancellation behavior.

Do not silently treat all order-state functionality as FR-18.

---

# 8. Security Coverage Audit

Map existing cases to SEC-01 through SEC-07.

Required table:

| SEC Requirement | FR-02 Test IDs | FR-09 Test IDs | FR-18 Test IDs | Coverage | Missing Opportunity |
| --------------- | -------------- | -------------- | -------------- | -------- | ------------------- |

Coverage:

* COVERED
* PARTIAL
* NOT_APPLICABLE
* BLOCKED
* MISSING

Do not generate attack payloads.

At this stage describe only logical attack classes such as:

* unauthenticated access,
* insufficient role,
* malformed input class,
* identifier manipulation,
* injection-class input,

when supported by the security requirements.

---

# 9. Schema Validation Coverage Audit

Review every documented response status/schema for selected in-scope endpoints.

Required table:

| Feature | Endpoint | Response Status / Variant | Schema Defined? | Existing Schema Test IDs | Coverage | Gap |
| ------- | -------- | ------------------------- | --------------- | ------------------------ | -------- | --- |

Then summarize:

```text
Schema variants documented:
Schema variants currently covered:
Schema variants not covered:
Schema variants blocked because specification is incomplete:
```

Do not invent missing response fields.

---

# 10. Identify Additional AI-Test Candidates

Only after completing the audits above, identify additional AI-generated logical test cases required to:

1. close meaningful technique gaps,
2. improve requirement/partition coverage,
3. reach at least 35 **IN_SCOPE quota-eligible cases for each selected feature**.

Do not generate filler cases simply to reach 35.

Each new case must add at least one of:

* new requirement coverage,
* new partition coverage,
* new state coverage,
* new security coverage,
* new response-schema coverage,
* a distinct valid/invalid interaction.

Use new IDs continuing after the current maximum:

```text
TC-API-074
TC-API-075
...
```

Do not reuse or renumber TC-API-001–073.

---

# 11. Required Schema for Every New Logical Test Case

Every newly generated logical test case must use exactly these fields:

| Field                   | Required Content                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| Test ID                 | `TC-API-NNN`                                                                                     |
| Feature                 | FR-02 / FR-09 / FR-18                                                                            |
| Endpoint / Operation    | In-scope endpoint                                                                                |
| Title                   | Short unique objective                                                                           |
| Test Origin             | `AI_GENERATED`                                                                                   |
| Primary Technique       | DOMAIN / STATE / SECURITY / SCHEMA / BUSINESS_RULE / AUTHENTICATION / AUTHORIZATION / ROBUSTNESS |
| Requirement References  | TB IDs                                                                                           |
| Partition References    | EP IDs where applicable                                                                          |
| BVA References          | Existing BVA IDs only, otherwise `N/A`                                                           |
| Security Reference      | SEC ID or `N/A`                                                                                  |
| Preconditions           | Abstract conditions only                                                                         |
| Input Condition         | Abstract input class only                                                                        |
| Action                  | Logical API operation                                                                            |
| Transport Oracle        | Supported expectation or `UNSPECIFIED`                                                           |
| Schema Oracle           | Supported expectation or `UNSPECIFIED`                                                           |
| Semantic Oracle         | Supported expectation or `UNSPECIFIED`                                                           |
| State Oracle            | Supported expectation or `UNSPECIFIED`                                                           |
| Expected Classification | POSITIVE / NEGATIVE / CONDITIONAL / EXPLORATORY                                                  |
| Readiness               | READY / BLOCKED / EXPLORATORY_ONLY                                                               |
| Blocker                 | Blocker ID(s) or `N/A`                                                                           |
| Coverage Added          | Requirement / partition / security / schema / state IDs newly covered                            |
| Why Non-Duplicate       | Explain what this case adds over existing cases                                                  |

Do not create concrete values.

Do not create JSON payloads.

Do not create attack strings.

---

# 12. Test Design Rules for New Cases

Apply all rules below.

## One primary fault per deterministic negative case

Do not combine multiple invalid factors unless the interaction itself is the purpose of the test.

## Preserve exploratory status

If expected behavior cannot be determined from the specification:

```text
Readiness = EXPLORATORY_ONLY
```

and use an observation goal rather than a fabricated expected result.

## Preserve blockers

Do not remove Prompt 002 blockers simply to make a testcase READY.

## Avoid duplicates

A testcase is not new simply because:

* the title is changed,
* an arbitrary value is changed,
* the same partition is represented with another example,
* the same security condition is repeated without new coverage.

## Prefer meaningful missing coverage

Prioritize:

1. explicit untested requirements,
2. schema variants,
3. security requirements,
4. state-dependent conditions,
5. uncovered equivalence partitions,
6. meaningful interactions.

---

# 13. Quota Compliance Validation

After additional cases are generated, recalculate:

| Feature | Original Quota-Eligible | Added AI Cases | Final Quota-Eligible | Requirement | Result |
| ------- | ----------------------: | -------------: | -------------------: | ----------: | ------ |
| FR-02   |                         |                |                      |        >=35 |        |
| FR-09   |                         |                |                      |        >=35 |        |
| FR-18   |                         |                |                      |        >=35 |        |

`Result`:

* PASS
* FAIL

Do not report PASS unless each feature independently reaches at least 35 quota-eligible AI-generated logical cases.

---

# 14. Coverage Recalculation

Recalculate after expansion:

## Partition Coverage

```text
COVERED:
BLOCKED:
DEFERRED_EXPLORATORY:
NOT_SELECTED:
TOTAL:
```

## Requirement Coverage

```text
COVERED:
PARTIAL:
BLOCKED:
NOT_TESTABLE:
TOTAL:
```

## Technique Coverage

Report per feature:

```text
DOMAIN
STATE
SECURITY
SCHEMA
AUTHENTICATION
AUTHORIZATION
BUSINESS_RULE
```

---

# 15. Do Not Perform Human-Added Extension Yet

HW06 later requires at least five test cases created by the student that AI missed.

Do **not** create those cases in this prompt.

All cases generated by this prompt must be explicitly marked:

```text
Test Origin = AI_GENERATED
```

The student-authored extension will occur only after human audit of the complete AI-generated suite.

---

# 16. Required Final Response Structure

Use exactly this top-level response structure:

# Prompt 006 — Scope Compliance and Test-Design Gap Analysis

## 1. Executive Summary

Use:

| Metric                         | FR-02 | FR-09 | FR-18 | Total |
| ------------------------------ | ----: | ----: | ----: | ----: |
| Existing cases                 |       |       |       |       |
| IN_SCOPE cases                 |       |       |       |       |
| Supporting/cross-feature cases |       |       |       |       |
| Existing quota-eligible cases  |       |       |       |       |
| Minimum required               |    35 |    35 |    35 |   105 |
| Additional AI cases generated  |       |       |       |       |
| Final quota-eligible cases     |       |       |       |       |

Then provide at most five concise findings.

---

## 2. Endpoint-to-Feature Scope Audit

Endpoint scope table.

---

## 3. Existing Test-Case Scope Audit

Complete TC-API-001–073 audit table.

---

## 4. True Per-Feature Quota Analysis

Quota table.

---

## 5. Technique Coverage Audit

Technique matrix.

---

## 6. Domain/Partition Coverage Audit

Domain coverage tables and gaps.

---

## 7. State Coverage Audit

State coverage table.

---

## 8. Security Coverage Audit

SEC-01–SEC-07 table.

---

## 9. Schema Validation Coverage Audit

Schema table.

---

## 10. Additional AI-Generated Logical Test Cases

Group by:

### 10.1 FR-02

New test cases.

### 10.2 FR-09

New test cases.

### 10.3 FR-18

New test cases.

---

## 11. Updated Test Inventory

Provide:

| Test ID | Feature | Endpoint | Origin | Primary Technique | Readiness | Scope | Quota Eligible |
| ------- | ------- | -------- | ------ | ----------------- | --------- | ----- | -------------- |

for all existing and new logical cases.

---

## 12. Updated Coverage Summary

Partition, requirement, state, security, and schema coverage.

---

## 13. Quota Compliance Validation

Final PASS/FAIL table.

---

## 14. Remaining Blockers

Preserve blocker IDs and show their current impact.

---

## 15. Human Review Checklist

At minimum:

* [ ] Every existing test was checked for feature scope.
* [ ] FR-17 coupon-management behavior was not silently counted as FR-09.
* [ ] FR-10 order-state behavior was not silently counted as FR-18.
* [ ] Supporting/setup operations were distinguished from selected-feature tests.
* [ ] Each selected feature has at least 35 quota-eligible AI-generated cases.
* [ ] New cases add real coverage and are not filler.
* [ ] No unsupported expected result was invented.
* [ ] Blocked tests remain blocked.
* [ ] Exploratory tests retain observation goals.
* [ ] SEC-01–SEC-07 coverage was explicitly audited.
* [ ] Response-schema coverage was explicitly audited.
* [ ] No concrete data was generated.
* [ ] No attack payload was generated.
* [ ] No student-authored extension cases were generated.

---

## 16. Student Review Required

Produce a compact list of decisions that require my personal review.

Do not make these decisions on my behalf.

---

## 17. Machine-Usable Summary

End exactly with:

```text
PROMPT_006_SUMMARY

FR-02:
IN_SCOPE endpoints:
Quota-eligible AI test IDs:
Count:
Technique gaps:
Relevant blockers:

FR-09:
IN_SCOPE endpoints:
Quota-eligible AI test IDs:
Count:
Technique gaps:
Relevant blockers:

FR-18:
IN_SCOPE endpoints:
Quota-eligible AI test IDs:
Count:
Technique gaps:
Relevant blockers:

Cross-feature/supporting test IDs:

New AI-generated test IDs:

Human review required:
```

Do not add new analysis in this section.

---

# 17. Important Constraints

* Do not create concrete test data.
* Do not create Postman requests.
* Do not execute APIs.
* Do not inspect implementation source code.
* Do not generate attack payloads.
* Do not fabricate BVA values.
* Do not fabricate response schemas.
* Do not invent business rules.
* Do not invent state-transition rules.
* Do not resolve blockers using common e-commerce assumptions.
* Do not renumber TC-API-001–073.
* Do not count setup/supporting endpoints toward a selected feature unless the specification explicitly makes them part of that feature.
* Do not create student-authored extension cases.
* Preserve full TB/EP/blocker traceability.

The objective is:

**Existing Logical Suite → Scope Audit → Technique Gap Audit → ≥35 Valid AI-Generated Logical Cases per Selected Feature**

not:

**Generate arbitrary cases until the counter reaches 35**.

---

# 18. Output Artifacts

Save/update:

```text
analysis/test-case-design.md
analysis/test-coverage-matrix.md
analysis/scope-and-gap-analysis.md
```

Log this prompt as:

```text
prompts/Prompt-006-scope-compliance-test-design-gap-analysis.md
```

