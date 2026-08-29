# Workflow — API Test Design Agent Skill

Each stage is described using the fields: Stage, Purpose, Inputs, Processing, Outputs, Validation, Human Gate, and Failure/Stop Condition.

---

## Stage S-01 — Specification Intake

**Purpose:**
Ingest the API specification and produce a structured inventory of all documented elements.

**Inputs:**
- Raw API specification (OpenAPI, RAML, or custom document)
- Assignment rules (selected feature scope)

**Processing:**
- Parse the specification format
- Enumerate all operations (method + path pairs)
- For each operation, extract: parameters, request body schema, response schemas, authentication requirements, authorization requirements, documented business rules, example values (kept separately)
- Identify documented error codes and their conditions (if any)
- Identify resource relationships and ownership rules

**Outputs:**
- Specification inventory: list of operations with extracted attributes
- Example registry (separate from rules — examples are NOT promoted to requirements at this stage)
- Authentication scheme list
- Authorization role list (from spec)

**Validation:**
- All listed endpoints appear in the specification
- No inferred endpoints are included
- Example registry is distinct from requirement registry

**Human Gate:** None at this stage (structural parsing)

**Failure/Stop Condition:**
- Specification is unreadable or unparseable → BLOCKER: SPEC_PARSE_FAILURE; halt and notify

---

## Stage S-02 — Requirement Evidence Extraction

**Purpose:**
Convert raw specification statements into structured, evidenced requirement records.

**Inputs:**
- Specification inventory (from S-01)
- Assignment rules

**Processing:**
For each documented statement:
- Classify as EXPLICIT_REQUIREMENT, DOCUMENTED_EXAMPLE, or UNKNOWN
- For EXPLICIT_REQUIREMENT: record source location, exact evidence text, interpretation, and confidence level (SUPPORTED, CONDITIONAL, UNKNOWN)
- For DOCUMENTED_EXAMPLE: record that it is an example only; do not promote to requirement
- For UNKNOWN: create an UNKNOWN_BEHAVIOR record; candidate for BLOCKER

**Outputs:**
- Requirement inventory: structured list of requirements with full evidence records
- Unknown behavior list

**Validation:**
- Every requirement has a non-empty source location
- Every requirement has a non-empty exact evidence field
- No DOCUMENTED_EXAMPLE is classified as EXPLICIT_REQUIREMENT
- Confidence is one of: SUPPORTED, CONDITIONAL, UNKNOWN

**Human Gate:** GATE-01 — Human reviews requirement interpretations and approves or corrects them before S-03 proceeds

**Failure/Stop Condition:**
- Human rejects critical requirement interpretations → revise and re-present before advancing

---

## Stage S-03 — Verified Test Basis

**Purpose:**
Build a structured test basis from verified, approved requirements only.

**Inputs:**
- Approved requirement inventory (post GATE-01)
- Unknown behavior list

**Processing:**
- Organize requirements into test basis categories:
  - Endpoint behavior
  - Parameter behavior
  - Schema
  - Authentication
  - Authorization
  - State
  - Business rules
  - Error handling
  - Security requirements
- Convert each UNKNOWN_BEHAVIOR into a formal BLOCKER record
- Assign a Blocker ID and description to each blocker

**Outputs:**
- Verified test basis (structured by category)
- Blocker register (initial version)

**Validation:**
- Every test basis entry traces to an approved requirement
- Every UNKNOWN item has a corresponding BLOCKER record
- No invented content appears without a BLOCKER marker

**Human Gate:** None (output of GATE-01 feeds directly)

**Failure/Stop Condition:**
- If blocker count makes meaningful testing impossible, escalate to GATE-01 for requirement clarification

---

## Stage S-04 — Domain Modeling

**Purpose:**
Derive equivalence partitions for each parameter and dimension.

**Inputs:**
- Verified test basis (from S-03)
- Assignment rules

**Processing:**
For each parameter or input dimension in scope:
- Identify VALID partition(s) — documented valid inputs
- Identify INVALID partition(s) — only where the specification documents invalid behavior
- Identify CONDITIONAL partition(s) — where behavior depends on context/state
- Identify EXPLORATORY partition(s) — where behavior is undocumented but execution is meaningful

Important rule: If the specification does not document a response for invalid input on a given parameter, the INVALID partition is marked EXPLORATORY rather than assigned an invented expected status.

**Outputs:**
- EP (equivalence partition) catalog: one entry per partition per dimension
- Each EP entry: parameter, class, description, requirement ref, specification evidence

**Validation:**
- No INVALID partition exists without a specification-documented response
- EXPLORATORY partitions are explicitly labeled as such
- Every partition references at least one requirement or blocker

**Human Gate:** None (feeds directly into S-05 and S-06)

**Failure/Stop Condition:**
- If a parameter has no documented behavior at all → all partitions become EXPLORATORY or BLOCKED

---

## Stage S-05 — Boundary Analysis

**Purpose:**
Apply BVA only where a specification-backed boundary exists.

**Inputs:**
- EP catalog (from S-04)
- Verified test basis (from S-03)

**Processing:**
For each parameter dimension:
- Check whether the specification explicitly defines a minimum, maximum, length constraint, or ordering boundary
- If yes: create boundary candidates at On, Off, and Nominal points
- If the only available information is an example literal: do NOT treat the example as a boundary — return BVA_NOT_APPLICABLE for that dimension
- If no boundary is defined: return BVA_NOT_APPLICABLE for that dimension

BVA_NOT_APPLICABLE is a valid, expected result — not a gap or deficiency.

**Outputs:**
- BVA result set: one entry per dimension; either boundary candidates or BVA_NOT_APPLICABLE with explanation
- Updated EP catalog (boundary partitions linked to BVA entries)

**Validation:**
- No boundary candidate exists without a specification-documented boundary source
- BVA_NOT_APPLICABLE entries have an explanation
- No example literal appears as a boundary value without justification

**Human Gate:** None

**Failure/Stop Condition:**
- If all dimensions return BVA_NOT_APPLICABLE: this is a valid outcome; record it and proceed

---

## Stage S-06 — Interaction and State Analysis

**Purpose:**
Identify dependencies, interactions, and state transitions across parameters, roles, and resources.

**Inputs:**
- EP catalog (from S-04)
- Verified test basis (from S-03)
- Authentication and authorization scheme list (from S-01)

**Processing:**
- Identify parameter interactions (e.g., mutually exclusive fields, conditional requirements)
- Identify authentication interactions (valid token, expired token, missing token, wrong role)
- Identify authorization interactions (user A cannot access user B's resource)
- Identify state transitions (e.g., create → read → update → delete; checkout flow)
- Identify resource lifecycle rules (ownership, isolation)

Constraint: Do not invent state transitions that are not documented. If a transition is unknown:
- If execution is possible without a known outcome: EXPLORATORY
- If execution requires knowledge of an undocumented rule: BLOCKED_BY_SPEC

**Outputs:**
- Interaction catalog
- State transition map (from spec only)
- BLOCKED_BY_SPEC records for unknown transitions

**Validation:**
- Every state transition references a specification source
- BLOCKED_BY_SPEC entries have a description of what is unknown

**Human Gate:** GATE-01 review covers state interpretation if needed

**Failure/Stop Condition:**
- Critical state required for test execution is BLOCKED_BY_SPEC → add to blocker register

---

## Stage S-07 — Security Coverage

**Purpose:**
Map specification security requirements to test design categories.

**Inputs:**
- Authentication scheme list (from S-01)
- Authorization role list (from S-01)
- Verified test basis — security requirements category (from S-03)
- Assignment-defined security categories (e.g., SEC-01 through SEC-07)

**Processing:**
- For each assignment-defined security category: check whether the specification supports a testable claim
- Map supported categories to: authentication, authorization, input handling, information exposure, resource isolation
- Do not invent security behavior not documented in the specification
- Mark unsupported categories as EXPLORATORY or BLOCKED_BY_SPEC

**Outputs:**
- Security coverage map: assignment SEC-ID → test design category → specification support status

**Validation:**
- No security testcase assumes a behavior not in the specification
- BLOCKED and EXPLORATORY security items are explicitly labeled

**Human Gate:** None at this stage (rolls into S-08)

**Failure/Stop Condition:**
- If a required assignment security category cannot be addressed from the specification → escalate to GATE-01

---

## Stage S-08 — Logical Test Generation

**Purpose:**
Generate candidate logical testcases from the verified test basis, EP catalog, BVA results, interaction catalog, and security coverage.

**Inputs:**
- All outputs of S-03 through S-07

**Processing:**
For each combination of test objective worth pursuing:
- Create one testcase per primary objective (atomicity rule)
- Assign: Test ID, Feature, Objective, Preconditions, Input class, Action, Expected result class, Requirement refs, EP refs, BVA refs, Interaction refs, Security refs, Origin (AI_GENERATED or AI_ASSISTED_CANDIDATE), Readiness, Blocker refs

Expected result rules:
- If spec explicitly states outcome → DETERMINISTIC_ORACLE with the specified result
- If execution is meaningful but outcome undocumented → EXPLORATORY_OBSERVATION
- If outcome cannot be determined → BLOCKED_ORACLE; add to blocker register

**Outputs:**
- Candidate testcase suite (pre-deduplication)

**Validation:**
- Every testcase has a single primary objective
- Every DETERMINISTIC_ORACLE references a specification source
- No invented HTTP status codes
- Every testcase has an Origin field

**Human Gate:** None yet (deduplication first in S-09)

**Failure/Stop Condition:**
- If no testcases can be generated for a required feature due to blockers → escalate to GATE-01

---

## Stage S-09 — Duplicate Detection

**Purpose:**
Remove full duplicates from the candidate suite before human review.

**Inputs:**
- Candidate testcase suite (from S-08)

**Processing:**
For each candidate pair, compare across:
- Objective
- Input partition class
- State precondition
- Endpoint
- Assertion target
- Coverage delta (what new information does this test add?)

Classify each candidate as:
- UNIQUE — no overlap with any other candidate
- PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE — overlaps in some dimensions but adds independent coverage
- DUPLICATE — fully redundant; reject

Reject DUPLICATE candidates; retain UNIQUE and PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE.

**Outputs:**
- Deduplicated candidate testcase suite
- Duplicate report (lists rejected candidates and reason)

**Validation:**
- All retained testcase IDs are unique
- Rejected candidates are recorded, not silently deleted

**Human Gate:** None (feeds into GATE-02)

**Failure/Stop Condition:**
- If deduplication eliminates all candidates for a feature → escalate to GATE-02 with note

---

## Stage S-10 — Human Audit Gate (GATE-02)

**Purpose:**
Mandatory human review of every AI-generated testcase.

**Inputs:**
- Deduplicated candidate testcase suite (from S-09)
- Human audit worksheet

**Processing:**
Present each candidate to the human for classification:
- VALID — testcase is correct, complete, and well-formed → retain
- INVALID — testcase is incorrect, fabricated, or unsupported → deactivate (do not delete; record)
- INCOMPLETE — testcase is partially correct but needs revision → revise and re-review

Human must provide reasoning for every classification.

The AI must not auto-approve its own candidates.

Note: A correctly formed EXPLORATORY_OBSERVATION testcase may be classified VALID. Exploratory ≠ incomplete.

**Outputs:**
- Approved testcase suite (VALID only)
- Rejected testcase log
- Revision queue (INCOMPLETE)

**Validation:**
- Every candidate has a human classification
- Every classification has a human-authored reasoning note
- No candidate advances to S-11 without human approval

**Human Gate:** GATE-02 (mandatory halt)

**Failure/Stop Condition:**
- If human approves zero testcases for a required feature → escalate with explanation before proceeding

---

## Stage S-11 — Student Extension Gate (GATE-03)

**Purpose:**
Accept independently authored student testcases and confirm their provenance.

**Inputs:**
- Assignment rules (required HUMAN_ADDED count)
- Approved testcase suite (from S-10)

**Processing:**
- Student authors testcases independently, outside the AI pipeline
- Each student testcase is assigned Origin = HUMAN_ADDED
- A `Student Authorship Source` note is required for each HUMAN_ADDED testcase
- Student testcases are reviewed by the human for internal consistency (not re-generated by AI)

Provenance rule: An AI-generated candidate that a human subsequently edits becomes AI_ASSISTED_CANDIDATE. It does not become HUMAN_ADDED. HUMAN_ADDED requires the student to have authored the testcase independently, before or without AI involvement.

**Outputs:**
- Combined testcase suite (VALID approved + HUMAN_ADDED)
- Provenance audit trail for all HUMAN_ADDED entries

**Validation:**
- HUMAN_ADDED count meets assignment requirement
- Every HUMAN_ADDED entry has a Student Authorship Source note
- No AI_GENERATED or AI_ASSISTED_CANDIDATE entry is re-labeled HUMAN_ADDED

**Human Gate:** GATE-03 (mandatory confirmation)

**Failure/Stop Condition:**
- Insufficient HUMAN_ADDED testcases → student must author additional ones before proceeding

---

## Stage S-12 — Concrete Data Planning

**Purpose:**
Assign data readiness classes to approved testcases.

**Inputs:**
- Combined testcase suite (from S-11)

**Processing:**
For each testcase determine its data readiness:
- STATIC_READY — all required data is available at design time
- RUNTIME_PROVISION_REQUIRED — data must be provisioned (e.g., via setup requests) before execution
- STATE_SETUP_REQUIRED — the SUT must be in a specific state that requires setup
- EXPLORATORY_PROBE_READY — data for execution exists; outcome is exploratory
- BLOCKED_BY_SPEC — required data cannot be defined without undocumented information

Boundary integrity rule: If a testcase uses a boundary value (e.g., 4096-character string), note whether the specification defines this as a boundary (BVA) or whether it is a robustness probe (ROBUSTNESS_PROBE, not BVA).

**Outputs:**
- Data readiness map for the combined testcase suite
- Updated blocker register (new BLOCKED_BY_SPEC entries)

**Validation:**
- No STATIC_READY testcase requires runtime data that was not noted
- Boundary values are correctly classified (BVA vs. ROBUSTNESS_PROBE)

**Human Gate:** None (feeds into GATE-04 via S-13)

---

## Stage S-13 — Execution Feasibility

**Purpose:**
Classify each testcase by its execution feasibility.

**Inputs:**
- Combined testcase suite with data readiness (from S-12)
- Blocker register

**Processing:**
Classify each testcase as:
- EXECUTABLE_DETERMINISTIC — can be executed with a deterministic oracle
- EXECUTABLE_EXPLORATORY — can be executed; oracle is observational
- EXECUTABLE_WITH_RUNTIME_SETUP — can be executed after setup chain completes
- BLOCKED_SETUP_UNAVAILABLE — required setup data or endpoint is unavailable
- BLOCKED_STATE_UNAVAILABLE — required SUT state cannot be achieved
- BLOCKED_SCOPE_OR_CHANNEL — outside the current test scope or execution channel

Critical distinction: A testcase with a missing oracle (EXPLORATORY_OBSERVATION) is not the same as a testcase that cannot be executed. Both conditions must be separately classified.

**Outputs:**
- Execution feasibility classification for all testcases
- Canonical blocked testcase list (with blocker IDs)

**Validation:**
- BLOCKED classes have referenced Blocker IDs
- Missing-oracle cases are not conflated with execution-impossible cases

**Human Gate:** GATE-04 — human reviews execution blockers and approves canonical blocked list

**Failure/Stop Condition:**
- Blocker prevents testing of a required feature → escalate to assignment contact if needed

---

## Stage S-14 — Implementation Planning

**Purpose:**
Optionally map approved logical testcases to a tool-specific execution plan.

**Inputs:**
- Approved, feasibility-classified testcase suite
- Target tool (e.g., Postman/Newman, Karate, RestAssured)

**Processing:**
- For each EXECUTABLE_* testcase, map to a tool-specific request definition
- Preserve logical semantics exactly — implementation must not silently change objectives
- Map setup dependencies to setup request chains
- Do not implement BLOCKED testcases as fake-pass requests

**Outputs:**
- Tool-specific execution plan (optional)
- Implementation notes

**Validation:**
- Every implemented request maps to exactly one logical testcase
- No testcase semantics are silently changed by implementation
- No BLOCKED testcase appears in the executable plan

**Human Gate:** None for planning; GATE-06 covers final audit

---

## Stage S-15 — Execution Result Interpretation

**Purpose:**
Classify execution results without over-claiming defects.

**Inputs:**
- Execution results (if available)
- Approved testcase suite

**Processing:**
For each executed testcase classify the result as:
- PASS — all assertions satisfied; oracle matched
- OBSERVED_EXPLORATORY — execution completed; observation recorded; no deterministic oracle to match
- FAIL_ASSERTION — request succeeded but assertion failed
- FAIL_REQUEST — request itself failed (network, timeout, etc.)
- FAIL_SETUP — a prerequisite setup step failed
- INCOMPLETE_SEQUENCE — a required sequence of requests did not complete
- BLOCKED_RUNTIME_PREREQUISITE — a runtime prerequisite was unavailable

Critical rule: FAIL_ASSERTION does not automatically mean CONFIRMED_SUT_DEFECT. Further triage (S-16) is required.

**Outputs:**
- Classified execution results
- Defect candidates (unconfirmed)

**Validation:**
- No result is classified CONFIRMED_SUT_DEFECT without human confirmation at GATE-05
- FAIL_SETUP results trigger root-cause analysis in S-16

**Human Gate:** GATE-05 — human confirms defect candidates

---

## Stage S-16 — Root-Cause Triage

**Purpose:**
Group execution failures by root cause to avoid misattributing multiple symptoms to independent defects.

**Inputs:**
- Classified execution results (from S-15)

**Processing:**
- Group FAIL_SETUP failures by setup step; one failed setup may explain many testcase failures
- For each group, identify the most likely root cause
- Classify each root cause as one of:
  - CONFIRMED_SUT_DEFECT
  - CONFIRMED_DOCUMENTATION_DEFECT
  - POSTMAN_IMPLEMENTATION_DEFECT
  - TEST_DATA_SETUP_LIMITATION
  - SPECIFICATION_AMBIGUITY
  - EXPECTED_EXPLORATORY_OBSERVATION
  - ENVIRONMENT_RUNTIME_ISSUE
  - INSUFFICIENT_EVIDENCE

**Outputs:**
- Root-cause triage table
- Final defect register (human-confirmed defects)
- Final blocker register (updated)

**Validation:**
- Every failure has a root cause classification
- CONFIRMED_SUT_DEFECT entries have human confirmation (GATE-05)
- Grouped failures reference their shared root cause

**Human Gate:** GATE-05 (defect confirmation) and GATE-06 (final artefact audit)

**Failure/Stop Condition:**
- Insufficient evidence to classify a root cause → INSUFFICIENT_EVIDENCE; do not guess
