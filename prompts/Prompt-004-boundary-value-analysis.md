# Prompt 004 — Boundary Value Analysis

You are continuing my HW06 – API Testing work for the EShop SUT.

The selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

The previous steps have already been completed:

* Prompt 001 — Requirement extraction
* Prompt 002 — Requirement verification and normalization
* Prompt 003 — Domain modeling and equivalence partitioning

Current Prompt 003 results:

* 27 parameters
* 91 equivalence partitions
* 5 VALID
* 21 INVALID
* 20 CONDITIONAL
* 45 EXPLORATORY
* 20 specification/test-design blockers preserved

No executable test cases, concrete test data, boundary values, or attack payloads have been generated yet.

Your task in Prompt 004 is to perform a disciplined **Boundary Value Analysis (BVA)** over the domain model created in Prompt 003.

The objective is:

**Verified Domain Model → BVA Eligibility → Boundary Model → Boundary Coverage Requirements**

Do **not generate final test cases yet**.

---

# 1. Input Documents and Source Priority

Use the following inputs:

1. `analysis/domain-model.md`

   * primary input for parameters, equivalence partitions, dependencies, and blockers.

2. `analysis/verified-test-basis.md`

   * verified requirement basis.

3. `api_specification.md`

   * authoritative specification used only when verification against the original source is required.

Source priority:

```text
api_specification.md
        ↓
verified-test-basis.md
        ↓
domain-model.md
```

If inconsistencies exist:

* record them,
* do not silently resolve them,
* treat `api_specification.md` as authoritative.

Do not inspect:

* source code,
* README,
* database schema,
* frontend validation,
* existing Postman tests,
* implementation behavior.

---

# 2. Main Objectives

For every parameter identified in Prompt 003:

1. determine whether Boundary Value Analysis is applicable,
2. explain why BVA is applicable or not applicable,
3. identify every explicit lower/upper boundary supported by the specification,
4. derive valid boundary-neighbor positions where logically justified,
5. preserve symbolic boundaries when appropriate,
6. identify boundaries that cannot be determined due to specification gaps,
7. trace every boundary back to:

   * PARAM-ID,
   * EP-ID,
   * TB-ID,
   * and Blocker ID when relevant.

Do not force BVA onto parameters for which BVA is not meaningful.

---

# 3. BVA Eligibility Rules

Classify every parameter using exactly one of:

## ELIGIBLE-NUMERIC

Use when the parameter has a meaningful ordered numeric domain with an explicit boundary.

Examples:

* explicit minimum
* explicit maximum
* explicit numeric interval

---

## ELIGIBLE-LENGTH

Use when the specification explicitly defines a length constraint.

Examples:

* minimum string length
* maximum string length
* fixed length

---

## ELIGIBLE-COUNT

Use when a count/cardinality boundary is explicitly specified.

Examples:

* retry limit
* quantity limit
* item count limit

Only use if the value is explicitly specified.

---

## ELIGIBLE-TEMPORAL

Use when an explicit time/date boundary exists.

Examples:

* expiry timestamp
* start/end date
* time interval

Do not invent expiry semantics.

---

## ELIGIBLE-ORDERED-DISCRETE

Use only when an explicitly ordered discrete domain has meaningful adjacent values.

Do not use this classification for order-state transitions unless the specification explicitly defines them as an ordered value domain.

State-transition testing will be handled separately.

---

## NOT-ELIGIBLE-CATEGORICAL

Examples:

* enum without numeric/ordered boundary meaning
* role
* Boolean categories
* arbitrary identifiers

---

## NOT-ELIGIBLE-FORMAT

Use where the relevant constraint is primarily structural or syntactic rather than ordered.

Examples:

* email format
* token syntax

Such inputs belong primarily to equivalence partitioning, not BVA.

---

## NOT-ELIGIBLE-IDENTIFIER

Examples:

* order ID
* user ID
* resource IDs

unless the specification explicitly defines numeric range constraints for the ID itself.

Do not treat:

```text
existing ID / non-existing ID
```

as boundary values.

Those are equivalence partitions.

---

## BLOCKED-BY-SPEC

Use when a domain might logically possess boundaries, but the specification does not define enough information to identify them.

Example:

A password may plausibly have a minimum length, but if the API specification provides no minimum length:

```text
BVA eligibility = BLOCKED-BY-SPEC
```

Do not invent one.

---

# 4. Boundary Source Classification

Every identified boundary must have exactly one source classification:

## SPEC-EXPLICIT

The actual boundary is directly specified.

Example:

```text
minimum = 1
```

---

## SPEC-DERIVED

The boundary position is logically derived from an explicit specification boundary.

Example:

If:

```text
minimum = 1
```

then the positions:

```text
min - 1
min
min + 1
```

may be derived.

---

## DOMAIN-DERIVED

A neighboring boundary position derived from an explicitly ordered domain already verified in Prompt 003.

Do not use DOMAIN-DERIVED to invent a new business constraint.

---

## BLOCKER-DRIVEN

The specification indicates the concept exists but does not provide enough detail to determine an actual boundary.

No concrete boundary values may be generated for these entries.

---

# 5. BVA Models

For applicable domains use one of these models.

## Lower Boundary

For explicit lower bound `min`:

```text
min - δ
min
min + δ
```

where `δ` is the smallest meaningful unit for the domain.

---

## Upper Boundary

For explicit upper bound `max`:

```text
max - δ
max
max + δ
```

---

## Closed Interval

For:

```text
min ≤ x ≤ max
```

consider:

```text
min - δ
min
min + δ

max - δ
max
max + δ
```

---

## Exclusive Boundary

If:

```text
x > min
```

or:

```text
x < max
```

preserve the inclusiveness/exclusiveness exactly.

Do not silently convert:

```text
>
```

into:

```text
≥
```

or vice versa.

---

# 6. Concrete vs Symbolic Boundary Values

Concrete values may only be emitted if the boundary itself is explicitly supported by the specification.

Example:

If specification states:

```text
quantity >= 1
```

then:

```text
0
1
2
```

may be represented.

However, if the specification only conceptually refers to:

```text
maximum failed login attempts
```

without giving the threshold:

do not invent:

```text
4
5
6
```

Instead use symbolic representation:

```text
LOCK_THRESHOLD - 1
LOCK_THRESHOLD
LOCK_THRESHOLD + 1
```

and mark:

```text
Concrete Value Available = NO
Reason = threshold not specified
```

If even the existence of a quantitative boundary is unsupported, do not introduce a symbolic boundary either.

---

# 7. Step A — BVA Eligibility Audit

Audit all 27 parameters from Prompt 003.

Every PARAM-ID must appear exactly once.

Required table:

| PARAM-ID | Feature | Endpoint | Parameter | Relevant EP-IDs | Domain Type | BVA Classification | Explicit Boundary Present? | Reason | Relevant Blocker |
| -------- | ------- | -------- | --------- | --------------- | ----------- | ------------------ | -------------------------- | ------ | ---------------- |

`BVA Classification` must be exactly one of:

* ELIGIBLE-NUMERIC
* ELIGIBLE-LENGTH
* ELIGIBLE-COUNT
* ELIGIBLE-TEMPORAL
* ELIGIBLE-ORDERED-DISCRETE
* NOT-ELIGIBLE-CATEGORICAL
* NOT-ELIGIBLE-FORMAT
* NOT-ELIGIBLE-IDENTIFIER
* BLOCKED-BY-SPEC

Do not omit non-BVA parameters.

The purpose of this table is to demonstrate that every parameter was considered.

---

# 8. Step B — Extract Explicit Boundary Constraints

For every BVA-eligible parameter, identify its verified boundary constraints.

Required table:

| BC-ID | PARAM-ID | Feature | Parameter | Constraint | Lower Bound | Upper Bound | Inclusive / Exclusive | Unit | Source | TB Reference |
| ----- | -------- | ------- | --------- | ---------- | ----------- | ----------- | --------------------- | ---- | ------ | ------------ |

Use IDs:

* `BC-FR02-001...`
* `BC-FR09-001...`
* `BC-FR18-001...`

If only one boundary exists:

write:

```text
Not specified
```

for the other.

Do not infer symmetrical limits.

---

# 9. Step C — Construct Boundary Positions

For each verified boundary constraint, construct the relevant BVA positions.

Use unique IDs:

* `BV-FR02-001...`
* `BV-FR09-001...`
* `BV-FR18-001...`

Required table:

| BV-ID | BC-ID | PARAM-ID | EP-ID | Boundary | Position | Abstract Value | Concrete Value | Expected Partition | Validity | Source Basis |
| ----- | ----- | -------- | ----- | -------- | -------- | -------------- | -------------- | ------------------ | -------- | ------------ |

`Position` must use one of:

* BELOW
* ON
* ABOVE
* JUST-BELOW
* JUST-ABOVE
* FIRST
* LAST

Use only positions meaningful to that specific boundary.

`Validity`:

* VALID
* INVALID
* CONDITIONAL
* EXPLORATORY
* UNKNOWN

`Concrete Value`:

* actual value, only where justified,
* otherwise `Not available`.

Do not generate arbitrary example values unrelated to a boundary.

---

# 10. Step D — Validate Boundary-to-Partition Consistency

Every BV entry must agree with the equivalence partitions from Prompt 003.

Example:

If Prompt 003 says:

```text
EP-X = below explicit minimum → INVALID
```

then the BVA position immediately below that minimum must not suddenly be classified VALID.

Required table:

| Check ID | BV-ID | EP-ID | BVA Classification | EP Classification | Consistent? | Explanation |
| -------- | ----- | ----- | ------------------ | ----------------- | ----------- | ----------- |

`Consistent?`:

* YES
* NO
* PARTIAL
* BLOCKED

If inconsistent:

do not silently modify Prompt 003.

Flag it for human review.

---

# 11. Step E — FR-02 Boundary Analysis

Analyze FR-02 specifically.

Potential domain dimensions must only be considered when present in the verified basis.

Review:

### Email

Check whether any explicit:

* minimum length,
* maximum length,
* fixed size,
* numeric constraint

exists.

Do not treat email-format syntax itself as BVA unless a quantitative boundary is explicitly specified.

---

### Password

Check whether explicit:

* minimum length,
* maximum length,
* character-count rule

exists.

Do not assume conventional password policies.

---

### Failed login count / lockout

Check whether the specification provides an explicit lock threshold.

If the threshold remains unspecified:

classify it appropriately as:

```text
BLOCKED-BY-SPEC
```

Do not invent:

```text
3 attempts
5 attempts
10 attempts
```

If Prompt 002 contains a blocker for this rule, preserve its ID.

---

# 12. Step F — FR-09 Boundary Analysis

Review all FR-09 parameters and coupon-related business rules.

Check whether the verified specification explicitly defines quantitative boundaries such as:

* coupon value
* discount percentage
* minimum order amount
* maximum discount
* usage limit
* expiration boundary
* quantity
* code length

Do not assume any of these exist merely because they are typical coupon attributes.

If a rule is not defined:

```text
BLOCKED-BY-SPEC
```

or another non-eligible category as appropriate.

Clearly distinguish:

```text
no boundary exists in this domain
```

from:

```text
a boundary might exist, but specification does not define it
```

---

# 13. Step G — FR-18 Boundary Analysis

Review FR-18 parameters.

Be particularly careful with:

### Order ID

Existence/non-existence is an equivalence partition issue.

Do not apply BVA simply because an ID is represented numerically.

Only use BVA if the specification explicitly defines a numeric range for the ID.

---

### Order status

Do not treat:

```text
pending
confirmed
shipping
delivered
```

as numeric boundary positions merely because they may appear sequential.

Those belong to state-transition analysis unless an explicit ordered-value constraint exists.

---

### Other request parameters

Apply BVA only where quantitative boundaries are explicitly supported.

---

# 14. Step H — Blocked Boundary Analysis

For every domain where BVA cannot be completed because of a specification gap, create:

| BB-ID | Feature | PARAM-ID | Potential Boundary Concept | Missing Information | Related Blocker | Impact | Handling |
| ----- | ------- | -------- | -------------------------- | ------------------- | --------------- | ------ | -------- |

Use IDs:

```text
BB-FR02-001...
BB-FR09-001...
BB-FR18-001...
```

`Handling` must be one of:

* NO SPEC-BASED BVA
* SYMBOLIC ONLY
* EXPLORATORY LATER
* VERIFY IMPLEMENTATION LATER
* HUMAN REVIEW REQUIRED

Do not treat these rows as actual BVA test requirements.

---

# 15. Step I — BVA Coverage Traceability

Verify coverage against Prompt 003.

Required table:

| PARAM-ID | EP-ID(s) | BVA Status | BC-ID(s) | BV-ID(s) | Blocker | Coverage Result | Notes |
| -------- | -------- | ---------- | -------- | -------- | ------- | --------------- | ----- |

`Coverage Result`:

* COVERED
* NOT BVA APPLICABLE
* BLOCKED
* PARTIAL
* NEEDS HUMAN REVIEW

Every PARAM-ID from Prompt 003 must appear.

---

# 16. Step J — BVA Self-Audit

Audit your own BVA model for common errors.

Check specifically for:

* invented minimums,
* invented maximums,
* treating formats as numeric boundaries,
* treating resource existence as BVA,
* treating enums as BVA without ordering,
* treating state transitions as BVA,
* treating implementation conventions as requirements,
* confusing null/missing with numeric boundaries,
* using concrete values unsupported by the specification,
* introducing boundaries not present in Prompt 003.

Required table:

| Review ID | Item | Potential Problem | Decision | Reason |
| --------- | ---- | ----------------- | -------- | ------ |

`Decision`:

* KEEP
* REMOVE
* RECLASSIFY
* BLOCK
* NEEDS HUMAN REVIEW

---

# 17. Boundary Requirements for Later Test Generation

Do not create complete test cases.

Instead create abstract boundary coverage requirements.

Use IDs:

* `BR-FR02-001...`
* `BR-FR09-001...`
* `BR-FR18-001...`

Required table:

| BR-ID | Feature | PARAM-ID | BV-ID(s) | Coverage Requirement | Deterministic? | TB Reference |
| ----- | ------- | -------- | -------- | -------------------- | -------------- | ------------ |

Example abstract requirement:

```text
Verify behavior immediately below, at, and immediately above
the explicitly specified minimum quantity.
```

Not:

```text
Send quantity=0 and expect HTTP 400.
```

The latter is already too close to a concrete test case unless both value and response are directly established and the test-generation phase has begun.

---

# 18. Required Final Response Structure

Your response must use exactly the following top-level structure.

# Prompt 004 — Boundary Value Analysis

## 1. Executive Summary

Use:

| Metric                        | FR-02 | FR-09 | FR-18 | Total |
| ----------------------------- | ----: | ----: | ----: | ----: |
| Parameters reviewed           |       |       |       |       |
| BVA eligible                  |       |       |       |       |
| Not BVA applicable            |       |       |       |       |
| Blocked by specification      |       |       |       |       |
| Explicit boundary constraints |       |       |       |       |
| Boundary positions            |       |       |       |       |
| Boundary requirements         |       |       |       |       |

Then provide no more than 5 concise observations.

---

## 2. BVA Eligibility Matrix

### 2.1 FR-02

Eligibility table.

### 2.2 FR-09

Eligibility table.

### 2.3 FR-18

Eligibility table.

---

## 3. Explicit Boundary Constraints

### 3.1 FR-02

BC table.

### 3.2 FR-09

BC table.

### 3.3 FR-18

BC table.

If none exist for a feature, explicitly state:

```text
No deterministic specification-based boundary constraints identified.
```

Do not fabricate rows.

---

## 4. Boundary Value Model

### 4.1 FR-02

BV table.

### 4.2 FR-09

BV table.

### 4.3 FR-18

BV table.

---

## 5. Boundary-to-Equivalence-Partition Consistency

Consistency table.

---

## 6. Feature-Specific Analysis

### 6.1 FR-02 — Login and Account Lockout

Summarize:

* eligible BVA dimensions,
* non-BVA dimensions,
* blocked dimensions,
* lockout-specific gaps.

### 6.2 FR-09 — Discount Coupons

Summarize:

* eligible quantitative domains,
* coupon rules without defined boundaries,
* relevant blockers.

### 6.3 FR-18 — Order Management (Admin)

Summarize:

* eligible quantitative domains,
* identifiers excluded from BVA,
* state-related fields deferred to state-transition analysis.

---

## 7. Blocked Boundary Analysis

BB table.

---

## 8. BVA Coverage Traceability

Coverage table.

---

## 9. BVA Self-Audit

Self-audit table.

---

## 10. Boundary Coverage Requirements

BR table.

---

## 11. Human Review Checklist

Produce at minimum:

* [ ] All 27 parameters from Prompt 003 were reviewed.
* [ ] BVA was applied only to ordered domains.
* [ ] No numeric boundary was invented.
* [ ] No string-length limit was invented.
* [ ] Email format was not incorrectly treated as BVA.
* [ ] Missing/null was not incorrectly treated as numeric BVA.
* [ ] Existing/non-existing IDs were not treated as boundaries.
* [ ] FR-02 lockout threshold was not invented.
* [ ] FR-09 coupon constraints were not invented.
* [ ] FR-18 order states were not treated as numeric boundaries.
* [ ] Every concrete boundary value is traceable to the specification.
* [ ] Every blocked boundary links to the appropriate blocker.
* [ ] BVA classifications remain consistent with Prompt 003 EP classifications.
* [ ] No final test cases were generated.

Add feature-specific checks where necessary.

---

## 12. BVA Readiness Assessment

Use:

| Feature | Status | Eligible Domains | Deterministic Boundaries | Main Blockers | Ready for Test Generation? |
| ------- | ------ | ---------------: | -----------------------: | ------------- | -------------------------- |

`Status`:

* READY
* PARTIALLY READY
* BLOCKED
* NO BVA APPLICABLE

Do not interpret `NO BVA APPLICABLE` as a defect.

---

## 13. Machine-Usable Summary for Later Prompts

End with exactly:

```text
BVA_MODEL_SUMMARY

FR-02:
Eligible PARAM-IDs:
BC-IDs:
BV-IDs:
BR-IDs:
Blocked PARAM-IDs:
Relevant Blockers:

FR-09:
Eligible PARAM-IDs:
BC-IDs:
BV-IDs:
BR-IDs:
Blocked PARAM-IDs:
Relevant Blockers:

FR-18:
Eligible PARAM-IDs:
BC-IDs:
BV-IDs:
BR-IDs:
Blocked PARAM-IDs:
Relevant Blockers:
```

Only IDs and short labels.

Do not introduce new analysis here.

---

# 19. Important Constraints

You must obey all of the following:

* Do not generate final test cases.
* Do not create `TC-*` IDs.
* Do not create Postman requests.
* Do not generate attack payloads.
* Do not perform security test design yet.
* Do not perform detailed state-transition test design yet.
* Do not perform response-schema test generation yet.
* Do not invent test data unrelated to a verified boundary.
* Do not invent minimum or maximum values.
* Do not invent string-length limits.
* Do not invent account-lockout thresholds.
* Do not invent coupon limits.
* Do not invent coupon expiration rules.
* Do not infer numeric constraints from implementation types.
* Do not apply BVA merely because an identifier is numeric.
* Do not apply BVA to resource existence.
* Do not apply BVA to categorical role values.
* Do not convert order states into artificial numeric boundaries.
* Do not inspect implementation code.
* Preserve Prompt 002 blockers.
* Preserve Prompt 003 PARAM-ID and EP-ID identifiers.
* Explicitly report when BVA is not applicable.

A small number of valid BVA targets is acceptable.

Correct technique selection is more important than artificially producing boundary values.

The objective of this prompt is:

**27 Parameters → BVA Eligibility → Verified Boundaries → Abstract Boundary Coverage Requirements**

not:

**27 Parameters → Force Boundary Tests for Everything**.

---

# 20. Output Artifact

Save the complete result as:

```text
analysis/boundary-value-analysis.md
```

The output must be self-contained enough for later prompts to consume without re-deriving BVA from scratch.
