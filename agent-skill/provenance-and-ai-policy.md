# Provenance and AI Policy — API Test Design Agent Skill

---

## Purpose

This document defines the boundary between what AI may do and what a human must do in the API Test Design Agent Skill. It also defines the immutable provenance rules that govern testcase origin tracking.

---

## AI Responsibilities

The AI component of this skill is permitted to:

- **Extract** documented statements from the API specification
- **Classify** statements as EXPLICIT_REQUIREMENT, DOCUMENTED_EXAMPLE, or UNKNOWN
- **Propose** test basis categories and content (subject to human approval at GATE-01)
- **Generate** equivalence partitions (subject to specification evidence)
- **Generate** boundary candidates (only where specification defines explicit boundaries)
- **Generate** interaction and state candidates (only from documented behavior)
- **Generate** candidate logical testcases (subject to human audit at GATE-02)
- **Compare** candidates for duplication
- **Structure** the traceability matrix
- **Classify** execution results (subject to human confirmation at GATE-05)
- **Group** execution failures by root cause
- **Produce** the diagram drawing guide (prose description only — no visual output)

---

## Human Responsibilities

A human must:

- **Audit** every AI-generated requirement interpretation (GATE-01)
- **Approve or reject** every AI-generated testcase candidate (GATE-02)
- **Author** all HUMAN_ADDED testcases independently (GATE-03)
- **Confirm** the student extension provenance (GATE-03)
- **Review** the execution blocker register (GATE-04)
- **Confirm** every CONFIRMED_SUT_DEFECT with explicit evidence (GATE-05)
- **Approve** the final artefact set (GATE-06)
- **Draw** the required architecture diagram manually (not AI-generated)

---

## Origin Classification

### AI_GENERATED

Applied when:
- The testcase was created entirely by the AI component
- The human has not made substantive changes to its content

Rules:
- Must pass GATE-02 audit before being retained
- Audit status must be VALID before inclusion in final suite
- Origin cannot be changed to HUMAN_ADDED

---

### AI_ASSISTED_CANDIDATE

Applied when:
- The testcase started as an AI_GENERATED candidate
- A human has made substantive modifications (e.g., changed the objective, corrected the oracle, added preconditions)

Rules:
- Retains AI origin marker to acknowledge AI contribution
- Is NOT equivalent to HUMAN_ADDED
- Must still pass GATE-02 audit

---

### HUMAN_ADDED

Applied when:
- The testcase was authored by the student independently
- The authorship preceded or was fully independent of AI generation
- The student can provide an authorship source note

Rules:
- Cannot be applied retroactively to an AI_GENERATED or AI_ASSISTED_CANDIDATE testcase
- Requires a non-empty `authorship_note` field
- Confirmed at GATE-03

---

## Provenance Immutability Rules

1. **Rule P-01:** A testcase's origin field is set at creation and may only be changed under the following conditions:
   - AI_GENERATED → AI_ASSISTED_CANDIDATE (when human makes substantive edits)
   - No other changes are permitted

2. **Rule P-02:** AI_GENERATED → HUMAN_ADDED is explicitly prohibited.

3. **Rule P-03:** AI_ASSISTED_CANDIDATE → HUMAN_ADDED is explicitly prohibited.

4. **Rule P-04:** The modification history must record any origin change with a timestamp and reason.

5. **Rule P-05:** If there is any doubt about whether a testcase was AI-influenced, it must be classified AI_ASSISTED_CANDIDATE rather than HUMAN_ADDED.

---

## Hallucination Controls

The following behaviors are explicitly prohibited for the AI component:

| Prohibited Behavior | Reason |
|---|---|
| Inventing an endpoint not in the specification | Creates false test obligations |
| Assigning an HTTP status code without specification support | Fabricates an oracle |
| Inventing a schema field not in the specification | Tests non-existent behavior |
| Inventing a user role not in the specification | Tests non-existent authorization |
| Inventing a state transition not in the specification | Tests undocumented behavior |
| Treating an example literal as a boundary value | Misapplies BVA without justification |
| Fabricating execution evidence (run IDs, screenshots, logs) | Creates false test records |
| Fabricating GitHub issues or bug reports | Creates false defect records |
| Promoting implementation behavior to specification authority | Conflates code and contract |
| Auto-approving its own output at any mandatory gate | Bypasses human oversight |
| Drawing the required architecture diagram | Violates the assignment's self-drawn requirement |

---

## Evidence Hierarchy

When determining what is authoritative, apply this hierarchy (highest to lowest):

| Priority | Source | Use |
|---|---|---|
| 1 | Official API specification / assignment document | Defines expected API behavior and test requirements |
| 2 | Explicit supporting documentation | Corroborates specification; does not override it |
| 3 | Human-approved interpretation | Resolves ambiguity within the bounds of the spec |
| 4 | Runtime observation | Useful for triage and fixture diagnosis only |
| 5 | Implementation inspection | Useful for root-cause diagnosis; must NOT become requirement authority |

**Critical rule:** An observation at priority 4 or 5 does not override a claim at priority 1. If the implementation behaves differently from the specification, the specification defines the expected result — and the difference is a candidate defect, not a reason to update expected results.

---

## Confidence Levels for Requirements

| Level | Meaning |
|---|---|
| SUPPORTED | Claim is directly and explicitly stated in the specification |
| CONDITIONAL | Claim is implied by the specification under specific conditions |
| UNKNOWN | Claim cannot be determined from available specification evidence |

UNKNOWN confidence → creates a BLOCKER or EXPLORATORY record. Never fabricates a SUPPORTED claim.

---

## Diagram Policy

The architecture diagram for the skill's pipeline is **required to be drawn manually by the student**.

The AI may:
- Describe which components should appear (prose only)
- Describe conceptual relationships between components (prose only)
- Provide a layout suggestion (prose only)
- Provide a manual drawing checklist

The AI must NOT:
- Generate Mermaid syntax
- Generate PlantUML syntax
- Generate Graphviz syntax
- Generate draw.io XML
- Generate ASCII-art architecture representations
- Generate any PNG, JPG, SVG, or PDF diagram file
- Present a complete node-and-arrow diagram in any form

Compliance verification: Search `agent-skill/` for any of the following — all must return zero matches:
- ` ```mermaid `
- `@startuml`
- `digraph`
- Any `.png`, `.jpg`, `.svg`, or `.drawio` file created by AI
