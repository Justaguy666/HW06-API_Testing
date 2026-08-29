# API Test Design Agent Skill

**Skill identifier:** `api-test-design`
**Version:** 1.0.0
**Assignment requirement:** G9.5 — Design an AI-driven API test generator from an API specification

---

## Assignment Requirement

Assignment section G9.5 requires the design of an AI-assisted agent skill that:

- Takes an API specification as input
- Produces a traceable, human-audited API test design
- Demonstrates architecture, pseudocode, and a self-drawn diagram
- Keeps the human tester in the loop at every gate

---

## Skill Objective

> Transform an API specification into a traceable, human-audited API test design without inventing undocumented requirements.

This skill does **not** autonomously generate and deploy a final test suite. It assists a human tester through a disciplined pipeline where every AI-generated artefact is reviewed, audited, and approved before it advances.

---

## File Index

| File | Purpose |
|---|---|
| `README.md` | This file — overview and orientation |
| `skill-specification.md` | Full skill specification: name, goal, scope, rules |
| `workflow.md` | Stage-by-stage workflow with gates |
| `pseudocode.md` | Algorithmic pseudocode for all stages |
| `input-output-contract.md` | Formal input and output contracts |
| `validation-gates.md` | Machine-checkable and reviewable gates |
| `provenance-and-ai-policy.md` | AI/human responsibility boundaries and provenance rules |
| `example-hw06.md` | Concrete example using the HW06 project |
| `limitations.md` | Known limitations and mitigations |
| `diagram-drawing-guide.md` | Instructions for the student to draw the architecture diagram manually |
| `diagram-evidence/README.md` | Placeholder for the manually drawn diagram |

---

## Workflow Overview (Prose)

The skill operates across sixteen conceptual stages:

1. **Specification Intake** — read and parse the API specification; identify endpoints, parameters, schemas, auth rules, and business rules.
2. **Requirement Evidence Extraction** — classify each documented statement as EXPLICIT_REQUIREMENT, DOCUMENTED_EXAMPLE, or UNKNOWN. Record the source location and exact evidence.
3. **Verified Test Basis** — build a structured test basis from verified requirements only. Unknown gaps become BLOCKER records.
4. **Domain Modeling** — for each parameter dimension derive VALID, INVALID, CONDITIONAL, and EXPLORATORY equivalence partitions — only where the specification supports them.
5. **Boundary Analysis** — apply BVA only where the specification explicitly defines a numeric, length, or ordering boundary. Return BVA_NOT_APPLICABLE otherwise.
6. **Interaction and State Analysis** — identify cross-parameter interactions, authentication/authorization dependencies, and state transitions, without inventing undocumented transitions.
7. **Security Coverage** — map the specification's security requirements to test design categories (authentication, authorization, input handling, information exposure, resource isolation).
8. **Logical Test Generation** — produce candidate logical testcases, each with a single primary objective, a defined expected result class (DETERMINISTIC_ORACLE, EXPLORATORY_OBSERVATION, or BLOCKED_ORACLE), and full requirement traceability.
9. **Duplicate Detection** — compare candidates across objective, input partition, state, endpoint, assertion target, and coverage delta; reject full duplicates.
10. **Human Audit Gate (GATE-02)** — every AI-generated candidate must receive a human classification of VALID, INVALID, or INCOMPLETE with explicit reasoning.
11. **Student Extension Gate (GATE-03)** — student authors independent HUMAN_ADDED testcases; provenance is immutable.
12. **Concrete Data Planning** — assign readiness class to each approved testcase; flag data that must be provisioned at runtime.
13. **Execution Feasibility** — classify testcases by execution class; separate missing-oracle from execution-impossible.
14. **Implementation Planning** — optionally map approved logical tests to a tool-specific execution plan (e.g., Postman/Newman).
15. **Execution Result Interpretation** — when execution is available, classify results without conflating test failure with confirmed defect.
16. **Root-Cause Triage** — group failures by root cause; produce a structured defect/blocker register.

---

## Human-in-the-Loop Principle

No AI-generated artefact is automatically accepted. Six mandatory human gates govern:

- **GATE-01** — requirement interpretation approval
- **GATE-02** — AI testcase audit
- **GATE-03** — student extension confirmation
- **GATE-04** — execution blocker review
- **GATE-05** — defect confirmation
- **GATE-06** — final artefact audit

The agent must halt and wait at each gate. It must not autonomously bypass them.

---

## Diagram Policy

> **The architecture diagram is intentionally not AI-generated.**

The assignment explicitly requires a self-drawn diagram. This repository contains only a prose drawing guide (`diagram-drawing-guide.md`) and a placeholder directory (`diagram-evidence/`). The actual diagram must be drawn manually by the student.

No PNG, JPG, SVG, Mermaid, PlantUML, Graphviz, draw.io XML, or ASCII-art architecture diagram was generated by this prompt.

---

## How HW06 Informed This Design

Every design decision in this skill traces back to a lesson learned during the HW06 project:

- **BVA legitimately returned zero applicable boundaries** — the specification used example values, not documented min/max constraints. The skill encodes this as a valid result.
- **FR-07 required exploratory partitions** — documented behavior covered success; invalid-input handling was undocumented. Exploratory testcases are explicitly valid outputs.
- **23 execution failures traced to a small number of root causes** — root-cause triage is a first-class skill stage rather than an afterthought.
- **HUMAN_ADDED provenance is immutable** — the skill explicitly prohibits relabeling an AI-generated candidate as HUMAN_ADDED.
- **Missing oracle ≠ execution impossible** — the execution feasibility stage separates these two conditions.

See `example-hw06.md` for concrete references.
