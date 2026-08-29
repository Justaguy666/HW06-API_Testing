# Skill Specification — API Test Design Agent Skill

**Skill identifier:** `api-test-design`
**Version:** 1.0.0

---

## Name

API Test Design Agent Skill

---

## Goal

Assist a human tester in transforming an API specification into a complete, traceable, human-audited set of logical API testcases — without inventing requirements, statuses, schemas, or state transitions that are not explicitly supported by the source specification.

---

## Scope

This skill covers:

- Parsing and structuring an API specification
- Extracting requirements with evidence and confidence
- Building a verified test basis
- Deriving equivalence partitions, boundaries, and interactions
- Generating security-aware logical testcases
- Detecting duplicates before human review
- Guiding human audit of AI-generated testcases
- Supporting student authorship of independent human-added testcases
- Planning concrete data and execution feasibility
- Optionally mapping to a tool-specific execution plan
- Interpreting execution results without over-claiming defects
- Root-cause triage

---

## Non-Goals

This skill does **not**:

- Autonomously approve its own output at any gate
- Implement an LLM backend or call external LLM APIs
- Run API tests directly
- Generate, execute, or modify Postman collections
- Replace human judgment at any mandatory gate
- Invent requirements from implementation behaviour
- Relabel AI-generated tests as human-authored
- Draw the required architecture diagram (see `diagram-drawing-guide.md`)

---

## Inputs

See `input-output-contract.md` for the full contract.

Core required inputs:
1. API specification (OpenAPI, RAML, custom document, etc.)
2. Assignment rules (feature scope, student-extension count, provenance policy)
3. Selected feature/functional requirement scope

Optional inputs:
- Supporting documentation
- Execution environment information
- Historical testcase suite (for continuity or deduplication)

---

## Outputs

See `input-output-contract.md` for the full contract.

Core outputs:
1. Requirement inventory
2. Verified test basis
3. Parameter domain and EP catalog
4. BVA result (may be BVA_NOT_APPLICABLE)
5. Interaction and state catalog
6. Security coverage mapping
7. Logical testcase suite (with full provenance metadata)
8. Human audit worksheet
9. Student extension worksheet
10. Traceability matrix
11. Blocker register
12. Execution feasibility classification

Optional outputs:
- Concrete data design
- Tool-specific execution plan
- Execution result interpretation
- Defect candidates

---

## Core Workflow

See `workflow.md` for stage-by-stage detail.

The sixteen stages are:

| Stage | Name |
|---|---|
| S-01 | Specification Intake |
| S-02 | Requirement Evidence Extraction |
| S-03 | Verified Test Basis |
| S-04 | Domain Modeling |
| S-05 | Boundary Analysis |
| S-06 | Interaction and State Analysis |
| S-07 | Security Coverage |
| S-08 | Logical Test Generation |
| S-09 | Duplicate Detection |
| S-10 | Human Audit Gate |
| S-11 | Student Extension Gate |
| S-12 | Concrete Data Planning |
| S-13 | Execution Feasibility |
| S-14 | Implementation Planning |
| S-15 | Execution Result Interpretation |
| S-16 | Root-Cause Triage |

---

## Decision Rules

### DR-01: Evidence-Only Requirements

A statement becomes a requirement only if it is explicitly documented. An example literal is not a requirement. An inferred behaviour is not a requirement.

### DR-02: Boundary Justification

BVA is applied only when the specification explicitly defines a numeric, length, or ordering boundary. If no boundary is defined, the result is `BVA_NOT_APPLICABLE`. This is a valid result.

### DR-03: Oracle Classification

Every expected result must be classified:

- `DETERMINISTIC_ORACLE` — the specification explicitly states the outcome
- `EXPLORATORY_OBSERVATION` — execution is meaningful but the outcome is not prescribed
- `BLOCKED_ORACLE` — the outcome cannot be determined from the current evidence

Fabricating `HTTP 400`, `HTTP 403`, or any specific status without specification support is prohibited.

### DR-04: Duplicate Rejection

A candidate testcase that duplicates an existing testcase across objective, input partition, state, endpoint, assertion target, and coverage delta is rejected. Partial overlap with independent coverage value is retained.

### DR-05: Provenance Immutability

A testcase's origin (`AI_GENERATED`, `AI_ASSISTED_CANDIDATE`, `HUMAN_ADDED`) is set at creation and must never be changed silently. An AI-generated candidate that a human subsequently modifies becomes `AI_ASSISTED_CANDIDATE`; it cannot become `HUMAN_ADDED`.

### DR-06: Implementation Is Not Requirement Authority

Runtime implementation behaviour may inform root-cause diagnosis or fixture setup. It must not rewrite the expected results recorded in logical testcases.

### DR-07: Exploratory Tests Are Valid

An exploratory testcase with a correctly defined `EXPLORATORY_OBSERVATION` oracle is a valid, complete testcase. It is not automatically incomplete.

---

## Human Review Requirements

| Gate ID | Trigger | Required Human Action |
|---|---|---|
| GATE-01 | After S-02 | Approve or correct requirement interpretations |
| GATE-02 | After S-09 | Classify each AI testcase as VALID / INVALID / INCOMPLETE |
| GATE-03 | After S-11 | Confirm student-authored testcase provenance |
| GATE-04 | After S-13 | Review execution blockers; approve or resolve |
| GATE-05 | After S-15 | Confirm defect candidates (not AI-auto-confirmed) |
| GATE-06 | Final | Approve the complete artefact set |

---

## Safety and Hallucination Controls

See `provenance-and-ai-policy.md` for the complete policy.

Controls include:

- All claims require a source reference
- HTTP statuses require explicit specification support
- Schemas require explicit specification support
- State transitions require explicit specification support
- Roles require explicit specification support
- No fabricated run IDs, screenshot evidence, or GitHub issues
- Human gates cannot be bypassed autonomously

---

## Failure Behaviour

If the skill encounters a condition it cannot resolve from the specification, it must:

1. Create a `BLOCKER` record with an explicit description
2. Halt advancement of the affected testcase
3. Present the blocker to the human at the next gate
4. Never invent a resolution

---

## Auditability

Every artefact produced by the skill must contain:

- Creation stage
- Source specification references
- Confidence level
- Human review status
- Modification history (if applicable)

The traceability matrix must link every logical testcase back to at least one requirement ID.
