# Diagram Drawing Guide — API Test Design Agent Skill

**Important:** This file contains a prose description only. No diagram has been generated here. The student must draw the architecture diagram manually and save it as `diagram-evidence/api-test-design-agent-diagram.png`.

---

## Layout Recommendation

A left-to-right layout is recommended for this diagram.

- Place specification-related components (intake and extraction) on the left side
- Place test design analysis components (domain, BVA, interactions, security, generation) in the center
- Place audit and output components (human gates, traceability, outputs) on the right side

Human gate components should be visually distinguishable from automated analysis components — for example, by using a different shape (such as a diamond or a rounded rectangle with a border) or a different fill color.

---

## Component List

Draw each of the following components as a labeled box or node. Below each component are the things you should label manually: what enters, what leaves, and what the component represents.

---

### Component 1 — API Specification Input

**What it represents:**
The source document — OpenAPI, RAML, or custom specification — that the entire pipeline depends on.

**What enters:**
Raw specification document (file or URL)
Assignment rules (selected feature scope, security categories, required HUMAN_ADDED count)

**What leaves:**
Raw specification content flowing into the Specification Intake component

**Label suggestion:** "API Specification + Assignment Rules"

---

### Component 2 — Specification Intake

**What it represents:**
The parsing stage that reads the specification and produces a structured inventory of endpoints, parameters, schemas, authentication schemes, and documented examples.

**What enters:**
Raw API specification, assignment rules

**What leaves:**
Specification inventory (operations list, example registry, auth scheme list, role list)

**Label suggestion:** "Specification Intake (S-01)"

---

### Component 3 — Requirement Extractor

**What it represents:**
The extraction stage that classifies each specification statement as EXPLICIT_REQUIREMENT, DOCUMENTED_EXAMPLE, or UNKNOWN — with source reference and confidence.

**What enters:**
Specification inventory

**What leaves:**
Requirement inventory (requirements + examples + unknowns)

**Label suggestion:** "Requirement Extractor (S-02)"

**Note for drawing:** A connection should flow from Requirement Extractor to the GATE-01 component before proceeding further. This represents the mandatory human halt.

---

### Component 4 — GATE-01: Requirement Approval (Human Gate)

**What it represents:**
The first mandatory human review point. Human approves, corrects, or rejects requirement interpretations.

**What enters:**
Requirement inventory (from Requirement Extractor)

**What leaves:**
Approved requirement inventory

**Label suggestion:** "GATE-01: Requirement Interpretation Approval (Human)"

**Visual distinction:** Draw this as a different shape (e.g., diamond or double-bordered rectangle) to indicate it is a human gate, not an automated step.

---

### Component 5 — Test Basis Builder

**What it represents:**
Constructs the verified test basis from approved requirements, organized by category (endpoint behavior, schema, auth, state, business rules, error handling, security). Unknown items become BLOCKER records.

**What enters:**
Approved requirement inventory

**What leaves:**
Verified test basis, initial blocker register

**Label suggestion:** "Test Basis Builder (S-03)"

---

### Component 6 — Domain / EP / BVA Analyzer

**What it represents:**
Three related analysis steps that operate on the verified test basis:
- Domain Modeling (S-04): derives VALID, INVALID, CONDITIONAL, EXPLORATORY equivalence partitions
- Boundary Analysis (S-05): applies BVA only where spec-backed boundaries exist; returns BVA_NOT_APPLICABLE otherwise
- Interaction and State Analysis (S-06): identifies parameter interactions, auth/authz dependencies, state transitions

**What enters:**
Verified test basis

**What leaves:**
EP catalog, BVA result set, interaction and state catalog

**Label suggestion:** "Domain / EP / BVA / Interaction Analyzer (S-04 to S-06)"

**Note for drawing:** You may draw S-04, S-05, and S-06 as three separate sub-boxes within a larger grouped box, or as three sequential boxes connected by arrows.

---

### Component 7 — Security Analyzer

**What it represents:**
Maps assignment security categories (e.g., SEC-01 through SEC-07) to test design categories using only specification-supported claims.

**What enters:**
Verified test basis (security category), authentication scheme list, authorization role list

**What leaves:**
Security coverage map (per-SEC-ID with support status)

**Label suggestion:** "Security Coverage Analyzer (S-07)"

---

### Component 8 — Logical Test Generator

**What it represents:**
Produces candidate logical testcases from the test basis, EP catalog, BVA results, interaction catalog, and security coverage map. Each candidate has a single primary objective and an oracle class (DETERMINISTIC_ORACLE, EXPLORATORY_OBSERVATION, or BLOCKED_ORACLE).

**What enters:**
EP catalog, BVA results, interaction catalog, security coverage map, verified test basis

**What leaves:**
Candidate logical testcase suite (pre-deduplication)

**Label suggestion:** "Logical Test Generator (S-08)"

---

### Component 9 — Duplicate Detector

**What it represents:**
Compares candidates across objective, input partition, state, endpoint, assertion target, and coverage delta. Rejects full duplicates; retains unique and independent-value candidates.

**What enters:**
Candidate testcase suite

**What leaves:**
Deduplicated candidate suite, duplicate report

**Label suggestion:** "Duplicate Detector (S-09)"

---

### Component 10 — GATE-02: Human Audit Gate (Human Gate)

**What it represents:**
The second mandatory human review point. Every AI-generated testcase is classified as VALID, INVALID, or INCOMPLETE. No AI self-approval.

**What enters:**
Deduplicated candidate suite

**What leaves:**
Approved testcase suite (VALID only), rejected log, revision queue

**Label suggestion:** "GATE-02: AI Testcase Audit (Human)"

**Visual distinction:** Use the same distinguishing style as GATE-01.

---

### Component 11 — GATE-03: Student Extension Gate (Human Gate)

**What it represents:**
The student authors independent HUMAN_ADDED testcases. The human confirms their provenance. AI-generated candidates cannot be relabeled as HUMAN_ADDED here.

**What enters:**
Student-authored testcases, assignment HUMAN_ADDED count requirement

**What leaves:**
Confirmed HUMAN_ADDED testcase suite

**Label suggestion:** "GATE-03: Student Extension (Human)"

**Visual distinction:** Use the same distinguishing style as the other human gates.

---

### Component 12 — Execution Feasibility Analyzer

**What it represents:**
Classifies each approved testcase by its execution feasibility: EXECUTABLE_DETERMINISTIC, EXECUTABLE_EXPLORATORY, EXECUTABLE_WITH_RUNTIME_SETUP, BLOCKED_SETUP_UNAVAILABLE, BLOCKED_STATE_UNAVAILABLE, or BLOCKED_SCOPE_OR_CHANNEL. Separates "missing oracle" from "execution impossible."

**What enters:**
Combined testcase suite (approved + HUMAN_ADDED), blocker register

**What leaves:**
Feasibility classification map, updated blocker register

**Label suggestion:** "Execution Feasibility Analyzer (S-13)"

**Note for drawing:** Draw an arrow from this component to GATE-04 (blocker review).

---

### Component 13 — Traceability Builder

**What it represents:**
Constructs the traceability matrix linking every testcase to its requirement IDs, EP IDs, and blocker IDs.

**What enters:**
Combined approved testcase suite, approved requirement inventory

**What leaves:**
Traceability matrix

**Label suggestion:** "Traceability Builder"

---

### Component 14 — Output Repository

**What it represents:**
The final collection of all artefacts produced by the skill, subject to GATE-06 final audit.

**What enters:**
All outputs: requirement inventory, test basis, EP catalog, BVA results, interaction catalog, security map, testcase suite, audit log, traceability matrix, blocker register, feasibility map

**What leaves:**
Final deliverable artefact set

**Label suggestion:** "Output Repository (GATE-06: Final Audit)"

---

## Connection List

The following conceptual connections should appear in the diagram as labeled arrows. Do NOT draw the arrows yourself based on this list — it is provided only as a guide for what you should draw.

| From | Arrow label | To |
|---|---|---|
| API Specification Input | supplies raw spec | Specification Intake |
| Specification Intake | delivers inventory | Requirement Extractor |
| Requirement Extractor | delivers for review | GATE-01: Requirement Approval |
| GATE-01 | approved requirements | Test Basis Builder |
| Test Basis Builder | verified test basis | Domain / EP / BVA Analyzer |
| Test Basis Builder | verified test basis | Security Analyzer |
| Test Basis Builder | BLOCKER records | Execution Feasibility Analyzer |
| Domain / EP / BVA Analyzer | EP + BVA + interaction catalog | Logical Test Generator |
| Security Analyzer | security coverage map | Logical Test Generator |
| Logical Test Generator | candidate testcases | Duplicate Detector |
| Duplicate Detector | deduplicated candidates | GATE-02: Human Audit Gate |
| GATE-02 | approved testcases | Traceability Builder |
| GATE-02 | approved testcases | Execution Feasibility Analyzer |
| GATE-03: Student Extension | HUMAN_ADDED testcases | Traceability Builder |
| GATE-03: Student Extension | HUMAN_ADDED testcases | Execution Feasibility Analyzer |
| Execution Feasibility Analyzer | feasibility map + blockers | Output Repository |
| Traceability Builder | traceability matrix | Output Repository |
| Duplicate Detector | duplicate report | Output Repository |
| All stages | BLOCKER records | Output Repository |

---

## Manual Drawing Checklist

Before submitting the diagram, verify that each of the following is visible:

- [ ] API specification input shown at the entry point
- [ ] Requirement extraction component shown
- [ ] GATE-01 human approval gate shown (visually distinguished)
- [ ] Test basis builder shown
- [ ] Domain / EP / BVA / Interaction analysis shown
- [ ] Security analysis shown
- [ ] Logical test generator shown
- [ ] Duplicate detector shown
- [ ] GATE-02 human audit gate shown (visually distinguished)
- [ ] GATE-03 student extension gate shown (visually distinguished)
- [ ] Execution feasibility analyzer shown
- [ ] Traceability builder shown
- [ ] Output repository shown
- [ ] Blocker/uncertainty path shown (BLOCKER records flowing to output or back to human gate)
- [ ] Diagram drawn manually by the student (not AI-generated)

---

## Final Note

The component descriptions and connection list above are provided to help you design the diagram, not to substitute for it. The manual drawing captures your understanding of the architecture — it is a required assessment deliverable that AI must not create.
