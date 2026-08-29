# Input/Output Contract — API Test Design Agent Skill

---

## Input Contract

### Required Inputs

#### Input 1 — API Specification

| Field | Value |
|---|---|
| Description | The primary API specification document |
| Formats accepted | OpenAPI 3.x (YAML or JSON), OpenAPI 2.x (Swagger), RAML, custom natural-language API document |
| Required fields | At minimum: endpoint paths, HTTP methods, parameter definitions, response definitions |
| Constraints | Must be the authoritative source; implementation code is NOT a substitute |
| If absent | HALT — skill cannot proceed without a specification |

#### Input 2 — Assignment Rules

| Field | Value |
|---|---|
| Description | Rules that govern the scope, provenance, and required outputs of this test design exercise |
| Includes | Selected functional requirement scope (e.g., FR-02, FR-07, FR-18); required HUMAN_ADDED testcase count; provenance policy; security coverage IDs (e.g., SEC-01 through SEC-07) |
| If absent | Use defaults; escalate ambiguity to GATE-01 |

#### Input 3 — Selected Feature Scope

| Field | Value |
|---|---|
| Description | The subset of features or functional requirements to test in this iteration |
| Format | List of feature IDs or endpoint identifiers |
| Constraints | Must reference features present in the API specification |

---

### Optional Inputs

#### Input 4 — Supporting Documentation

Examples: sequence diagrams, business rule documents, user stories, data dictionaries.

Used to corroborate specification requirements. Never used to invent requirements not in the primary specification.

#### Input 5 — Execution Environment Information

Examples: base URL, authentication mechanism, known limitations, available test accounts.

Used to populate the execution feasibility stage. Not used to define expected results.

#### Input 6 — Historical Testcase Suite

Example: a prior Postman collection or test design document.

Used to avoid duplicating existing coverage. Prior tests are not blindly re-accepted — they must still pass the provenance and validation rules of this skill.

---

## Output Contract

### Core Required Outputs

#### Output 1 — Requirement Inventory

| Field | Value |
|---|---|
| Contents | All extracted requirements with source reference, exact evidence, interpretation, confidence level |
| Format | Structured list; one record per requirement |
| Validation | Every record has a non-empty source and exact evidence; no invented requirements |

#### Output 2 — Verified Test Basis

| Field | Value |
|---|---|
| Contents | Requirements organized by category: endpoint behavior, parameter behavior, schema, authentication, authorization, state, business rules, error handling, security |
| Format | Structured document |
| Validation | Every entry traces to an approved requirement; UNKNOWN gaps have BLOCKER records |

#### Output 3 — Parameter Domain and EP Catalog

| Field | Value |
|---|---|
| Contents | For each parameter: VALID, INVALID, CONDITIONAL, and EXPLORATORY equivalence partitions with specification evidence |
| Format | Structured list; one EP record per partition per dimension |
| Validation | No INVALID partition without specification-documented response |

#### Output 4 — BVA Result

| Field | Value |
|---|---|
| Contents | For each parameter dimension: boundary candidates or BVA_NOT_APPLICABLE with explanation |
| Format | Structured list |
| Validation | No boundary candidate without specification-documented boundary; BVA_NOT_APPLICABLE is a valid result |

#### Output 5 — Interaction and State Catalog

| Field | Value |
|---|---|
| Contents | Parameter interactions, authentication/authorization interactions, state transitions |
| Format | Structured catalog |
| Validation | Every state transition references a specification source |

#### Output 6 — Security Coverage Map

| Field | Value |
|---|---|
| Contents | Assignment SEC-ID mapped to test design category and specification support status |
| Format | Mapping table |
| Validation | No security claim without specification support |

#### Output 7 — Logical Testcase Suite

| Field | Value |
|---|---|
| Contents | Complete set of approved logical testcases |
| Format | Structured list; one record per testcase |
| Mandatory fields per record | Test ID, Feature, Objective, Preconditions, Input class, Action, Expected result (with oracle class and source), Requirement refs, EP refs, BVA refs, Interaction refs, Security refs, Origin, Readiness, Blocker refs, Audit status |
| Validation | All IDs unique; all origins populated; all DETERMINISTIC_ORACLE entries have spec source; all AI_GENERATED entries have VALID audit status |

#### Output 8 — Human Audit Worksheet

| Field | Value |
|---|---|
| Contents | For each AI-generated candidate: human classification (VALID/INVALID/INCOMPLETE) and human reasoning |
| Format | Audit log |
| Validation | Every candidate has a classification; every classification has reasoning |

#### Output 9 — Student Extension Worksheet

| Field | Value |
|---|---|
| Contents | All HUMAN_ADDED testcases with authorship notes |
| Format | Structured list |
| Validation | Count meets assignment requirement; every entry has authorship note; no AI origin is re-labeled |

#### Output 10 — Traceability Matrix

| Field | Value |
|---|---|
| Contents | Map from each logical testcase ID to its requirement IDs, EP IDs, and blocker IDs |
| Format | Table or structured map |
| Validation | Every testcase traces to at least one requirement; every requirement is covered by at least one testcase or a documented gap |

#### Output 11 — Blocker Register

| Field | Value |
|---|---|
| Contents | All identified blockers with ID, description, stage of origin, and affected testcase/dimension IDs |
| Format | Structured list |
| Validation | Every BLOCKED testcase references a blocker ID |

#### Output 12 — Execution Feasibility Classification

| Field | Value |
|---|---|
| Contents | For each testcase: its feasibility class (EXECUTABLE_DETERMINISTIC, EXECUTABLE_EXPLORATORY, EXECUTABLE_WITH_RUNTIME_SETUP, BLOCKED_*) |
| Format | Map |
| Validation | Missing oracle is not conflated with execution impossible |

---

### Optional Downstream Outputs

#### Output 13 — Concrete Data Design

For each testcase: specific input values, boundary values, or runtime data provisioning plan.

#### Output 14 — Tool-Specific Execution Plan

Mapping of approved logical testcases to requests in a tool such as Postman/Newman, Karate, or RestAssured.

Constraint: Logical semantics must not be silently changed by implementation.

#### Output 15 — Execution Result Interpretation

If execution has been run: classified results (PASS, OBSERVED_EXPLORATORY, FAIL_ASSERTION, FAIL_REQUEST, FAIL_SETUP, INCOMPLETE_SEQUENCE, BLOCKED_RUNTIME_PREREQUISITE).

#### Output 16 — Defect Candidates

Unconfirmed defect candidates from execution triage. Human confirmation required before any entry becomes CONFIRMED_SUT_DEFECT.
