# Prompt 030 — Design Agent Skill G9.5 for AI-Driven API Test Generation

You are continuing my HW06 – API Testing project.

Current project state:

```text
LOGICAL TEST DESIGN:
COMPLETE

POSTMAN IMPLEMENTATION:
COMPLETE

FULL NEWMAN EXECUTION:
COMPLETE

EXECUTION TRIAGE:
COMPLETE

BUG REPORTING:
COMPLETE

GITHUB ISSUES:
3 / 3 — COMPLETE

CI/CD:
COMPLETE

AGENT SKILL G9.5:
NOT STARTED
```

The remaining assignment requirement is Agent Skill G9.5.

The assignment requires designing an:

```text
AI-driven API test generator from an API specification
```

including:

```text
architecture/design
pseudocode
self-drawn diagram
```

CRITICAL ASSIGNMENT CONSTRAINT:

```text
THE AI MUST NOT GENERATE THE DIAGRAM ITSELF.
```

Therefore this prompt must design the skill and prepare the material needed for me to draw the diagram manually, but must NOT create the actual diagram.

---

# 1. Purpose

Design a reusable Agent Skill that takes an API specification as input and assists a human tester in producing auditable API logical testcases.

The intended transformation is:

```text
API Specification
      ↓
Requirement Extraction
      ↓
Verified Test Basis
      ↓
Parameter / State Modeling
      ↓
EP / BVA / Interaction Analysis
      ↓
Security Coverage
      ↓
Logical Test Generation
      ↓
Human Audit
      ↓
Student Extension
      ↓
Executable-Test Planning
      ↓
Traceability + Evidence
```

The skill must embody the disciplined workflow demonstrated in this HW06 project.

It must NOT merely say:

```text
Ask an LLM to generate API tests.
```

It must define:

* inputs,
* outputs,
* agent stages,
* validation gates,
* provenance,
* uncertainty handling,
* human review,
* anti-hallucination controls,
* traceability.

---

# 2. Assignment Scope

The Agent Skill is a DESIGN artifact.

Do not implement a full autonomous production agent.

Do not build an LLM backend.

Do not call external LLM APIs.

Do not generate a new Postman suite.

Do not run API tests.

The deliverable is:

```text
Agent Skill specification
+
architecture/design explanation
+
pseudocode
+
manual diagram specification
+
example using HW06
+
limitations
```

---

# 3. Use This HW06 as Design Evidence

Use the actual lessons from the completed workflow, including:

```text
requirements analysis
verified test basis
domain partitioning
boundary analysis
logical testcase generation
human audit
student-added tests
concrete data design
execution feasibility
Postman implementation
Newman execution
failure triage
bug reporting
```

Do not fabricate additional project outcomes.

Do not modify existing historical artifacts.

---

# 4. Skill Name

Use:

```text
API Test Design Agent Skill
```

Short identifier:

```text
api-test-design
```

Purpose statement:

```text
Transform an API specification into a traceable,
human-audited API test design without inventing
undocumented requirements.
```

---

# 5. Agent Skill Directory

Create:

```text
agent-skill/
├── README.md
├── skill-specification.md
├── workflow.md
├── pseudocode.md
├── input-output-contract.md
├── validation-gates.md
├── provenance-and-ai-policy.md
├── example-hw06.md
├── limitations.md
├── diagram-drawing-guide.md
└── diagram-evidence/
    └── README.md
```

Do not create an actual diagram file.

---

# 6. Critical Diagram Prohibition

Do NOT generate:

```text
PNG
JPG
SVG
PDF diagram
Mermaid
PlantUML
Graphviz
draw.io XML
ASCII-art architecture diagram
PowerPoint diagram
```

Do NOT create any visual or diagram syntax that can be considered an AI-generated diagram.

The assignment explicitly requires:

```text
self-drawn diagram
```

The student must draw it manually.

---

# 7. What AI May Provide for the Diagram

AI may create only:

```text
agent-skill/diagram-drawing-guide.md
```

This file may contain:

* list of components that should appear,
* component responsibilities,
* list of conceptual connections,
* labels suggested for arrows,
* suggested left-to-right or top-to-bottom arrangement,
* checklist for manual drawing.

It must NOT present the complete diagram visually.

For example, allowed:

```text
Component to draw:
Requirement Extractor

Purpose:
Extract only explicitly documented API behavior.

Suggested outgoing conceptual relationship:
Requirement Extractor supplies verified requirement units to Test Basis Builder.
```

Not allowed:

```text
[Requirement Extractor] --> [Test Basis Builder]
```

because that would effectively generate the diagram.

---

# 8. Diagram Evidence Directory

Create:

```text
agent-skill/diagram-evidence/README.md
```

State:

```text
The architecture diagram must be drawn manually by the student.

No AI-generated diagram is stored here.

Expected final manually created file:
agent-skill/diagram-evidence/api-test-design-agent-diagram.png
```

Do NOT create that PNG.

---

# 9. Core Agent Stages

The skill should contain these conceptual stages.

## Stage 1 — Specification Intake

Responsibilities:

* read API specification,
* identify operations/endpoints,
* identify parameters,
* identify documented schemas,
* identify authentication/authorization,
* identify documented business rules,
* identify examples separately from rules.

Output:

```text
Requirement Inventory
```

---

# 10. Stage 2 — Requirement Evidence Extraction

Each extracted rule should include:

```text
Requirement ID
Source location
Exact evidence
Interpretation
Confidence
```

The agent must distinguish:

```text
EXPLICIT_REQUIREMENT
DOCUMENTED_EXAMPLE
UNKNOWN
```

An example value is NOT automatically a boundary.

---

# 11. Stage 3 — Verified Test Basis

Construct a test basis from specification evidence.

Required categories:

```text
endpoint behavior
parameter behavior
schema
authentication
authorization
state
business rules
error handling
security requirements
```

Unknown information becomes:

```text
BLOCKER
```

rather than an invented rule.

---

# 12. Stage 4 — Domain Modeling

For each parameter/dimension determine:

```text
VALID
INVALID
CONDITIONAL
EXPLORATORY
```

as supported.

The agent must not force an INVALID partition where the specification does not support one.

---

# 13. Stage 5 — Boundary Analysis

Perform BVA only when a specification-backed boundary exists.

Rule:

```text
example literal
≠
boundary
```

Possible output:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

This must be considered a valid result.

---

# 14. Stage 6 — Interaction / State Analysis

Identify:

```text
parameter interactions
authentication interactions
authorization interactions
state transitions
sequence behavior
resource ownership
resource lifecycle
```

Do not invent state transitions.

Unknown transition rule:

```text
BLOCKED_BY_SPEC
```

or:

```text
EXPLORATORY
```

depending on executability.

---

# 15. Stage 7 — Security Coverage

Include design support for the assignment's security coverage:

```text
SEC-01
SEC-02
SEC-03
SEC-04
SEC-05
SEC-06
SEC-07
```

Use the project definition if those IDs are documented.

Do not invent what a missing SEC definition means.

The skill should support categories such as:

```text
authentication
authorization
input handling
information exposure
resource isolation
```

only where supported by source requirements.

---

# 16. Stage 8 — Logical Test Generation

Each logical testcase should contain at minimum:

```text
Test ID
Feature
Objective
Preconditions
Input class
Action
Expected result / observation
Requirement refs
EP refs
Boundary refs
Interaction refs
Security refs
Origin
Readiness
Blocker refs
```

Logical tests should remain independent from Postman implementation.

---

# 17. Atomicity Rule

Default:

```text
ONE PRIMARY TEST OBJECTIVE
```

Avoid combining unrelated failure reasons in one testcase.

For multi-representative robustness ideas, define:

```text
one field/member/family per execution
```

where appropriate.

---

# 18. Expected Result Discipline

The skill must explicitly distinguish:

```text
DETERMINISTIC_ORACLE
EXPLORATORY_OBSERVATION
BLOCKED_ORACLE
```

Do not fabricate:

```text
HTTP 400
HTTP 401
HTTP 403
HTTP 404
HTTP 422
```

unless supported by the specification.

---

# 19. Stage 9 — Duplicate Detection

Before accepting a generated testcase compare:

```text
objective
input class
endpoint
state
assertion target
coverage delta
```

Classify:

```text
UNIQUE
PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE
DUPLICATE
```

Do not inflate test counts with duplicates.

---

# 20. Stage 10 — Human Audit Gate

Every AI-generated testcase must be reviewed by a human.

Human classifications:

```text
VALID
INVALID
INCOMPLETE
```

Human review must include reasoning.

Important:

```text
exploratory
≠
automatically incomplete
```

A correctly defined exploratory testcase may be VALID.

---

# 21. Stage 11 — Student Extension Gate

The design should support a required number of human/student-origin tests.

Critical provenance rule:

```text
AI-generated candidate
cannot later be relabeled
HUMAN_ADDED
```

A testcase may be:

```text
AI_GENERATED
AI_ASSISTED_CANDIDATE
HUMAN_ADDED
```

Origins must remain auditable.

---

# 22. Provenance Metadata

Every testcase must retain:

```text
Origin
Generation Stage
Human Review Status
Modification History
Source Requirements
```

For HUMAN_ADDED cases:

```text
Student Authorship Source
```

must be explicit.

---

# 23. Stage 12 — Concrete Data Planning

The skill may define, but does not have to execute:

```text
STATIC_READY
RUNTIME_PROVISION_REQUIRED
STATE_SETUP_REQUIRED
EXPLORATORY_PROBE_READY
BLOCKED_BY_SPEC
```

Data values must preserve boundary integrity.

For example:

```text
4096-character string
```

may be:

```text
ROBUSTNESS_PROBE
NOT_A_BOUNDARY
```

unless the specification defines 4096 as a boundary.

---

# 24. Stage 13 — Execution Feasibility

Distinguish:

```text
missing oracle
```

from:

```text
execution impossible
```

Execution classes:

```text
EXECUTABLE_DETERMINISTIC
EXECUTABLE_EXPLORATORY
EXECUTABLE_WITH_RUNTIME_SETUP
BLOCKED_SETUP_UNAVAILABLE
BLOCKED_STATE_UNAVAILABLE
BLOCKED_SCOPE_OR_CHANNEL
```

This should be one of the important lessons from HW06.

---

# 25. Stage 14 — Implementation Planning

Optionally transform approved logical tests into an execution plan for tools such as:

```text
Postman/Newman
Karate
RestAssured
```

But the Agent Skill's primary artifact remains the logical design.

Implementation must never silently change logical semantics.

---

# 26. Stage 15 — Execution Result Interpretation

If later connected to test execution, classify results as:

```text
PASS
OBSERVED_EXPLORATORY
FAIL_ASSERTION
FAIL_REQUEST
FAIL_SETUP
INCOMPLETE_SEQUENCE
BLOCKED_RUNTIME_PREREQUISITE
```

Do not equate:

```text
test execution failure
```

with:

```text
confirmed SUT defect
```

---

# 27. Stage 16 — Triage

When test execution is available:

```text
many failed tests
```

may originate from:

```text
one root setup failure
```

The agent must group failures by root cause.

Final categories may include:

```text
CONFIRMED_SUT_DEFECT
CONFIRMED_DOCUMENTATION_DEFECT
POSTMAN_IMPLEMENTATION_DEFECT
TEST_DATA_SETUP_LIMITATION
SPECIFICATION_AMBIGUITY
EXPECTED_EXPLORATORY_OBSERVATION
ENVIRONMENT_RUNTIME_ISSUE
INSUFFICIENT_EVIDENCE
```

---

# 28. Human-in-the-Loop Gates

Identify mandatory human approval gates.

At minimum:

```text
GATE-01:
Requirement interpretation approval

GATE-02:
AI testcase audit

GATE-03:
Student-added testcase confirmation

GATE-04:
Execution blocker review

GATE-05:
Defect confirmation

GATE-06:
Final artifact audit
```

The agent must not autonomously bypass these gates.

---

# 29. Hallucination Controls

The skill must include explicit controls:

```text
NO invented endpoint
NO invented HTTP status
NO invented schema
NO invented role
NO invented state transition
NO invented numeric boundary
NO invented missing-resource semantics
NO fabricated execution evidence
NO fabricated screenshot
NO fabricated GitHub issue
```

---

# 30. Evidence Hierarchy

Define source authority roughly as:

```text
1. Assignment / official API specification
2. Explicit supporting documentation
3. Human-approved interpretation
4. Runtime observation
5. Implementation inspection
```

Important:

```text
Implementation inspection
```

must NOT automatically become requirement truth.

It may be used for:

```text
runtime fixture diagnosis
implementation root-cause diagnosis
```

but not to rewrite specification expectations.

---

# 31. Confidence / Uncertainty

For extracted claims support:

```text
SUPPORTED
CONDITIONAL
UNKNOWN
```

or equivalent.

Unknown items should create:

```text
blocker / exploratory opportunity
```

not hallucinated expected results.

---

# 32. Input Contract

Create:

```text
agent-skill/input-output-contract.md
```

Inputs should include:

```text
API specification
assignment rules
selected feature scope
optional supporting documentation
optional execution environment information
optional historical tests
```

---

# 33. Output Contract

Outputs should include:

```text
requirement inventory
verified test basis
parameter/domain model
EP catalog
BVA result
interaction/state catalog
security coverage
logical testcase suite
human audit worksheet
student extension worksheet
traceability matrix
blocker register
execution feasibility
```

Optional downstream outputs:

```text
concrete data design
Postman plan
execution result interpretation
defect candidates
```

---

# 34. Skill Workflow File

Create:

```text
agent-skill/workflow.md
```

For every stage include:

```text
Stage
Purpose
Inputs
Processing
Outputs
Validation
Human Gate
Failure / Stop Condition
```

---

# 35. Validation Gates File

Create:

```text
agent-skill/validation-gates.md
```

Include machine-checkable or reviewable gates such as:

```text
all test IDs unique
all requirement references valid
all origins populated
no unsupported boundaries
no unsupported deterministic expected results
all AI-generated tests audited
student-origin tests provenance verified
all blockers referenced
duplicate analysis complete
```

---

# 36. Skill Specification

Create:

```text
agent-skill/skill-specification.md
```

Include:

```text
Name
Goal
Scope
Non-goals
Inputs
Outputs
Core workflow
Decision rules
Human review requirements
Safety / hallucination controls
Failure behavior
Auditability
```

---

# 37. Pseudocode Requirement

Create:

```text
agent-skill/pseudocode.md
```

The pseudocode must be algorithmic, not vague prose.

Include top-level function conceptually similar to:

```text
GENERATE_API_TEST_DESIGN(spec, assignment_rules, selected_scope)
```

Do not implement actual production code.

---

# 38. Required Top-Level Pseudocode Logic

Conceptually cover:

```text
parse specification
extract requirements
verify evidence
build blockers
derive parameter domains
derive EP
derive BVA only if justified
derive interactions
derive security coverage
generate candidate tests
deduplicate
human audit gate
accept/reject/revise
collect human extension
validate provenance
build traceability
determine readiness
return artifacts
```

---

# 39. Pseudocode — Requirement Extraction

Include logic such as:

```text
FOR each documented statement:
    IF explicit behavior:
        create requirement
    ELSE IF example:
        mark example
    ELSE:
        do not promote to requirement
```

---

# 40. Pseudocode — Boundary Decision

Explicitly encode:

```text
IF specification defines numeric/length/order boundary:
    create BVA candidates
ELSE:
    return BVA_NOT_APPLICABLE
```

Do not infer boundary from example literals.

---

# 41. Pseudocode — Expected Result

Encode:

```text
IF expected result supported:
    deterministic oracle
ELSE IF request can be meaningfully executed:
    exploratory observation
ELSE:
    blocker
```

---

# 42. Pseudocode — Duplicate Analysis

Encode comparison using:

```text
objective
input partition
state
endpoint
assertion target
coverage delta
```

Reject full duplicates.

---

# 43. Pseudocode — Human Audit

Include:

```text
FOR each AI testcase:
    require human classification
    require reasoning

    IF VALID:
        retain
    ELSE IF INVALID:
        deactivate/correct
    ELSE IF INCOMPLETE:
        revise and re-review
```

Do not let AI self-approve the entire suite.

---

# 44. Pseudocode — Provenance

Ensure:

```text
origin never silently changes
```

Specifically:

```text
AI_ASSISTED_CANDIDATE
cannot become HUMAN_ADDED
```

unless actual independent human authorship is documented before AI integration.

---

# 45. HW06 Example

Create:

```text
agent-skill/example-hw06.md
```

Use a small, factual example based on this project.

Possible lessons:

```text
BVA could legitimately be zero.

FR-07 had exploratory partitions because the
specification did not define invalid behavior.

Execution blockers were separated from missing oracles.

23 execution failures were later explained by a small
number of root causes.

Human-added tests retained HUMAN_ADDED provenance.
```

Do not reproduce the full 122-test suite.

---

# 46. Example Outcome Facts

Use only verified project facts such as:

```text
current selected features:
FR-02
FR-07
FR-18

AI-generated logical tests:
105

HUMAN_ADDED:
17

logical total:
122
```

If using execution facts:

```text
114 executable planned
8 canonical blocked
```

Do not imply all 114 passed.

---

# 47. Lessons from Execution

The example may explain why the Agent Skill needs:

```text
execution feasibility
setup dependency tracking
root-cause triage
exploratory-result handling
```

For example:

```text
a large group of FAIL_SETUP results may stem from
one missing setup chain rather than many product bugs.
```

---

# 48. Limitations

Create:

```text
agent-skill/limitations.md
```

Discuss at minimum:

```text
incomplete specifications
ambiguous requirements
LLM hallucination
security-domain uncertainty
state explosion
combinatorial explosion
runtime fixture availability
oracle problem
duplicate generation
prompt sensitivity
context-window limits
human-review dependency
```

---

# 49. Mitigation Strategies

For each important limitation provide a mitigation.

Examples:

```text
Incomplete specification
→ blockers + exploratory tests

Hallucinated expected status
→ evidence-required oracle gate

Combinatorial explosion
→ equivalence partitions + interaction prioritization

Duplicate tests
→ coverage-delta duplicate analysis

Context limits
→ staged artifacts and stable IDs

AI provenance risk
→ immutable origin metadata
```

---

# 50. AI Policy / Provenance File

Create:

```text
agent-skill/provenance-and-ai-policy.md
```

Include:

```text
AI may:
extract
propose
compare
structure
generate candidates

Human must:
audit
approve
author student extension
confirm final defects
draw required diagram manually
```

---

# 51. Diagram Drawing Guide

Create:

```text
agent-skill/diagram-drawing-guide.md
```

Do NOT draw the diagram.

Recommend a manually drawn diagram containing conceptual components such as:

```text
Specification Input
Requirement Extractor
Evidence Verifier
Test Basis Builder
Domain / EP / BVA Analyzer
Interaction / Security Analyzer
Logical Test Generator
Duplicate Detector
Human Audit Gate
Student Extension Gate
Traceability Builder
Execution Feasibility Analyzer
Output Repository
```

For each component provide:

```text
what it represents
what information enters
what information leaves
what the student should label manually
```

---

# 52. Manual Diagram Layout Guidance

You MAY state prose such as:

```text
A left-to-right layout is recommended.

Place specification-related components on the left,
test-design components in the center,
and audit/output components on the right.

Human gates should be visually distinguishable.
```

Do NOT provide a finished node-and-arrow diagram.

---

# 53. Manual Diagram Checklist

Include:

```text
[ ] API specification input shown
[ ] requirement verification shown
[ ] test design analysis shown
[ ] AI generation shown
[ ] human audit shown
[ ] student extension shown
[ ] traceability shown
[ ] blocker/uncertainty path shown
[ ] output artifacts shown
[ ] diagram manually drawn by student
```

---

# 54. Student Diagram Placeholder

`agent-skill/diagram-evidence/README.md` must say:

```text
STATUS:
PENDING_STUDENT_MANUAL_DRAWING
```

Expected eventual artifact:

```text
agent-skill/diagram-evidence/api-test-design-agent-diagram.png
```

But DO NOT create it.

---

# 55. README

Create:

```text
agent-skill/README.md
```

Include:

```text
assignment requirement
skill objective
file index
workflow overview in prose
human-in-the-loop principle
diagram policy
how HW06 informed the design
```

Clearly state:

```text
The diagram is intentionally not AI-generated.
```

---

# 56. Quality Validation

Create a quality section verifying:

| Check                           | Expected |
| ------------------------------- | -------- |
| Skill design exists             | PASS     |
| Input/output contract           | PASS     |
| Workflow defined                | PASS     |
| Pseudocode defined              | PASS     |
| Human audit gate                | PASS     |
| Student extension provenance    | PASS     |
| Anti-hallucination controls     | PASS     |
| BVA non-applicability supported | PASS     |
| Execution/oracle distinction    | PASS     |
| Root-cause triage principle     | PASS     |
| Diagram generated by AI         | NO       |
| Mermaid present                 | 0        |
| PlantUML present                | 0        |
| Graphviz present                | 0        |
| ASCII architecture diagram      | 0        |
| Manual diagram guide            | PASS     |

---

# 57. Diagram-Prohibition Static Audit

Search:

```text
agent-skill/
```

for:

````text
```mermaid
@startuml
digraph
````

and ensure zero generated diagram definitions.

Also verify no:

```text
.png
.jpg
.svg
.drawio
```

diagram file was generated by this prompt.

The only allowed diagram directory artifact from AI is:

```text
diagram-evidence/README.md
```

---

# 58. No Runtime Changes

Prompt 030 must NOT modify:

```text
Postman collection
CI workflows
bug reports
GitHub issues
Newman reports
SUT
```

unless merely cross-referenced in documentation.

---

# 59. Prompt Logging

Save:

```text
prompts/Prompt-030-agent-skill-g9-5.md
```

Append exactly one Prompt 030 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–028B historical prompt contents.

---

# 60. Git Procedure

After all validation passes, create a dedicated commit:

```text
docs: design AI-driven API test generation agent skill
```

Do not combine unrelated changes.

Push normally.

Do not force push.

---

# 61. Completion Gate

Report:

```text
AGENT_SKILL_G9_5_COMPLETE
```

when:

```text
skill specification complete
workflow complete
input/output contract complete
validation gates complete
pseudocode complete
provenance policy complete
HW06 example complete
limitations complete
manual diagram guide complete
AI-generated diagram count = 0
```

The manually drawn diagram itself may remain:

```text
PENDING_STUDENT_MANUAL_DRAWING
```

because the assignment explicitly requires student/manual authorship.

---

# 62. Required Final Response Structure

Use exactly:

# Prompt 030 — Agent Skill G9.5

## 1. Executive Summary

## 2. Skill Objective

## 3. Inputs

## 4. Outputs

## 5. Core Workflow

## 6. Requirement Evidence Model

## 7. Domain / EP / BVA Strategy

## 8. Interaction and Security Strategy

## 9. Logical Test Generation

## 10. Duplicate Control

## 11. Human Audit

## 12. Student Extension Provenance

## 13. Execution Feasibility

## 14. Triage Principle

## 15. Validation Gates

## 16. Hallucination Controls

## 17. Pseudocode

## 18. HW06 Example

## 19. Limitations

## 20. AI / Human Responsibility

## 21. Manual Diagram Guide

## 22. Diagram-Prohibition Validation

## 23. Artifacts Generated

## 24. Quality Validation

## 25. Agent Skill Status

Use:

```text
AGENT_SKILL_G9_5_COMPLETE
```

or:

```text
AGENT_SKILL_G9_5_INCOMPLETE
```

## 26. Current Project Status

Use:

```text
BUG REPORTING:
COMPLETE

CI/CD:
COMPLETE

AGENT SKILL G9.5:
COMPLETE

MANUAL G9.5 DIAGRAM:
PENDING_STUDENT_MANUAL_DRAWING

FINAL AI AUDIT:
NOT STARTED
```

## 27. Machine-Usable Summary

End exactly:

```text
PROMPT_030_SUMMARY

Skill:
API Test Design Agent Skill

Skill specification:
COMPLETE / INCOMPLETE

Workflow:
COMPLETE / INCOMPLETE

Input/output contract:
COMPLETE / INCOMPLETE

Pseudocode:
COMPLETE / INCOMPLETE

Validation gates:
COMPLETE / INCOMPLETE

AI provenance policy:
COMPLETE / INCOMPLETE

HW06 example:
COMPLETE / INCOMPLETE

Limitations:
COMPLETE / INCOMPLETE

Human audit gate:
PRESENT / MISSING

Student extension provenance:
PRESENT / MISSING

Unsupported-boundary prevention:
PRESENT / MISSING

Exploratory-oracle handling:
PRESENT / MISSING

Execution-feasibility stage:
PRESENT / MISSING

Root-cause triage principle:
PRESENT / MISSING

AI-generated diagram files:
0

Mermaid diagrams:
0

PlantUML diagrams:
0

Graphviz diagrams:
0

ASCII architecture diagrams:
0

Manual diagram guide:
AVAILABLE / MISSING

Manual diagram:
PENDING_STUDENT_MANUAL_DRAWING

Status:
AGENT_SKILL_G9_5_COMPLETE /
AGENT_SKILL_G9_5_INCOMPLETE

Next required prompt:
PROMPT 031 — FINAL AI AUDIT, AI CRITIQUE, AND DELIVERABLE DOCUMENTATION
```

---

# 63. Output Artifacts

Create:

```text
agent-skill/README.md
agent-skill/skill-specification.md
agent-skill/workflow.md
agent-skill/pseudocode.md
agent-skill/input-output-contract.md
agent-skill/validation-gates.md
agent-skill/provenance-and-ai-policy.md
agent-skill/example-hw06.md
agent-skill/limitations.md
agent-skill/diagram-drawing-guide.md
agent-skill/diagram-evidence/README.md
```

Create:

```text
prompts/Prompt-030-agent-skill-g9-5.md
```

Append exactly one Prompt 030 entry to:

```text
prompts/prompt-log.md
```

---

# 64. Final Constraints

* Do not generate the architecture diagram.
* Do not use Mermaid.
* Do not use PlantUML.
* Do not use Graphviz.
* Do not use ASCII-art diagram.
* Do not create a diagram image.
* Student must manually draw the required diagram.
* AI may only provide a prose drawing guide.
* Do not invent API requirements.
* Do not imply examples are boundaries.
* Preserve exploratory outcomes.
* Preserve immutable AI/HUMAN provenance.
* Human audit is mandatory.
* Student extension cannot be AI-generated and relabeled.
* Implementation behavior is not requirement authority.
* Do not modify historical test artifacts.
* Do not modify CI.
* Do not modify bugs.
* Do not run tests.
* Do not create additional testcase IDs.

The objective is:

**Auditable AI-Assisted API Test Design Skill + Human Oversight + Student-Drawn Architecture Diagram**

not:

**Autonomous AI invents requirements and produces everything itself**.
