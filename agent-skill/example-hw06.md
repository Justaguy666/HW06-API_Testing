# HW06 Worked Example — API Test Design Agent Skill

This document illustrates how the API Test Design Agent Skill applies to the HW06 project. It uses only verified project facts. No outcomes are invented or exaggerated.

---

## Project Context

**System Under Test:** EShop backend REST API
**Assignment scope:** FR-02 (product listing), FR-07 (shopping cart), FR-18 (order management)
**Security categories:** SEC-01 through SEC-07 (authentication, authorization, input handling, information exposure, resource isolation)

---

## Skill Application by Stage

### S-01 — Specification Intake

Applied to the HW06 API specification, the intake stage identified:
- Three in-scope feature areas (product listing, cart, order management)
- Multiple operations per feature (list, create, read, update, delete, checkout, etc.)
- An authentication scheme requiring JWT-based login
- An authorization model distinguishing regular users from administrators
- Example values in the specification (e.g., example product IDs, example order data)

Lesson: The specification contained both explicit behavior rules and example values. Keeping them separate was essential to avoid promoting examples to requirements in S-02.

---

### S-02 — Requirement Evidence Extraction

For FR-07 (shopping cart), the extraction stage found:
- Explicit requirements for adding items, updating quantities, and removing items
- Explicit authentication requirements (user must be logged in)
- **No documented response for invalid inputs** (e.g., negative quantity, zero quantity, non-existent product ID)

Result for FR-07 invalid-input parameters:
- Confidence: UNKNOWN
- Disposition: UNKNOWN_BEHAVIOR → BLOCKER

This demonstrates the key rule: the absence of documented invalid-input behavior does not become an assumed HTTP 400 response. It becomes an exploratory opportunity.

---

### S-03 — Verified Test Basis

The test basis for FR-07 included:
- Documented valid operations (EXPLICIT_REQUIREMENT)
- Documented authentication requirement (EXPLICIT_REQUIREMENT)
- Documented ownership isolation (regular user cannot modify another user's cart)

Missing from the test basis:
- No documented boundary on cart quantity values
- No documented response for invalid product IDs in cart operations
- These became BLOCKER records, not invented expectations

---

### S-04 — Domain Modeling

For FR-07 cart quantity parameter, domain modeling produced:

| Partition class | Description | Spec support |
|---|---|---|
| VALID | Positive integer quantity (e.g., 1, 2, 5) | Explicit |
| INVALID | Negative quantity, zero | EXPLORATORY (no documented response) |
| CONDITIONAL | Quantity exceeding stock? | UNKNOWN — no spec coverage |
| EXPLORATORY | Very large quantity | EXPLORATORY_PROBE |

Lesson: The INVALID partition was not discarded — it was retained as EXPLORATORY because the behavior is worth observing even without a deterministic oracle.

---

### S-05 — Boundary Analysis

The HW06 specification did not define explicit numeric boundaries on:
- Cart quantity values
- Product name length
- Order item counts

Result: BVA_NOT_APPLICABLE for all these dimensions.

Project evidence: This is verified — zero BVA testcases appear in the HW06 logical testcase suite for these parameters, because BVA_NOT_APPLICABLE was the correct and justified result.

Lesson: BVA returning zero applicable boundaries is a valid and expected outcome when a specification uses only example values without defining min/max constraints.

---

### S-06 — Interaction and State Analysis

The skill identified the following key interactions in HW06:

1. **Authentication dependency:** Cart and order operations require a valid JWT. Tests for unauthenticated access became a security coverage item (SEC-01).

2. **Authorization isolation:** User A's cart cannot be accessed by User B. Tests for cross-user isolation became security coverage items (SEC-04, SEC-05).

3. **State dependency:** Order checkout requires an existing cart with items. The order tests depended on a prior cart-setup state. This became a STATE_SETUP_REQUIRED readiness classification for several order testcases.

4. **Execution sequence:** Register → Login → Add to cart → Checkout was the minimum viable execution chain for several FR-18 testcases.

---

### S-07 — Security Coverage

The seven security categories were mapped to the specification:

| Assignment ID | Category | Spec support | Result |
|---|---|---|---|
| SEC-01 | Authentication | Explicit (JWT required) | Testcases designed |
| SEC-02 | Authorization roles | Explicit (admin vs. user) | Testcases designed |
| SEC-03 | Input handling | Partial — some parameters only | Exploratory testcases designed |
| SEC-04 | Information exposure | Explicit (ownership isolation) | Testcases designed |
| SEC-05 | Resource isolation | Explicit (user-owned resources) | Testcases designed |
| SEC-06 | Rate limiting | Not documented | BLOCKED_BY_SPEC |
| SEC-07 | Token handling | Partial — expiry not documented | EXPLORATORY |

---

### S-08 — Logical Test Generation

The skill generated candidate testcases across all three features and security categories.

Final counts after completing the full HW06 workflow:

| Provenance | Count |
|---|---|
| AI_GENERATED | 105 |
| HUMAN_ADDED | 17 |
| **Total logical testcases** | **122** |

Atomicity: Every testcase had a single primary objective. Where multiple invalid conditions were worth testing, each received its own testcase.

---

### S-09 — Duplicate Detection

Duplicate analysis identified and rejected several candidates that tested the same objective, input partition, and endpoint as an existing candidate. Rejected duplicates were logged but not silently discarded.

The final logical suite of 122 testcases contained zero full duplicates.

---

### S-10 — Human Audit Gate

All 105 AI-generated candidates underwent human review. Candidates that tested undocumented behavior as DETERMINISTIC_ORACLE (with invented expected HTTP statuses) were reclassified INVALID or corrected to EXPLORATORY_OBSERVATION.

The audit process was the primary mechanism for catching hallucinated oracle claims.

---

### S-11 — Student Extension Gate

17 testcases were authored independently by the student with HUMAN_ADDED provenance. Each carried an authorship note. None were relabeled from AI_GENERATED.

---

### S-12 and S-13 — Data Planning and Execution Feasibility

Of the 122 logical testcases:
- 114 were classified as executable (various readiness classes)
- 8 were classified as canonically blocked (BLOCKED_SCOPE_OR_CHANNEL or BLOCKED_STATE_UNAVAILABLE)

The 8 blocked testcases remained in the logical suite with BLOCKER references. They were not implemented as fake-pass requests.

---

### S-16 — Root-Cause Triage — Key Lesson

When Newman execution was run on the full suite, a significant number of failures occurred. Triage analysis found that:
- Many failures shared a common root cause related to setup chain dependencies
- Several test failures were FAIL_SETUP, not FAIL_ASSERTION — meaning the SUT was not defective, but the test execution environment was missing a prerequisite
- After grouping by root cause, the number of genuine SUT defect candidates was much smaller than the raw failure count suggested

This is the key lesson that motivated the root-cause triage stage in the skill design: **many test failures ≠ many independent defects**.

Three GitHub issues were confirmed as genuine SUT defects after human review.

---

## Summary of Skill Design Decisions Motivated by HW06

| Lesson from HW06 | Design decision in skill |
|---|---|
| BVA returned zero applicable results | BVA_NOT_APPLICABLE is a first-class valid outcome |
| FR-07 had undocumented invalid-input behavior | EXPLORATORY partitions are valid and retained |
| Many failures traced to few root causes | Root-cause triage is a mandatory stage (S-16) |
| Some tests could not execute due to setup limitations | Execution feasibility (S-13) separates missing-oracle from execution-impossible |
| HUMAN_ADDED provenance was critical to the assignment | Provenance immutability rule P-02 prohibits AI→HUMAN relabeling |
| Implementation inspection revealed setup issues | Evidence hierarchy: implementation is not requirement authority |
| 8 testcases were canonically blocked | BLOCKED classes are documented outputs, not failures of the skill |
