# Limitations — API Test Design Agent Skill

This document describes known limitations of the skill design and the mitigations provided.

---

## L-01 — Incomplete Specifications

**Limitation:**
Many real-world API specifications omit error handling, edge case behavior, boundary constraints, and security requirements. The skill can only design testcases from what is documented.

**Impact:**
- Reduces deterministic oracle coverage
- Increases proportion of exploratory testcases
- Creates more BLOCKER records

**Mitigation:**
- UNKNOWN items become BLOCKER or EXPLORATORY records rather than invented requirements
- Exploratory testcases are treated as valid first-class outputs
- Human at GATE-01 can resolve ambiguity through authoritative clarification

---

## L-02 — Ambiguous Requirements

**Limitation:**
Specification language can be ambiguous, especially for boundary conditions, error responses, and conditional behavior. The same sentence may be interpreted multiple ways.

**Impact:**
- AI may extract a plausible but incorrect interpretation
- Multiple testcases may be designed around conflicting interpretations

**Mitigation:**
- Confidence level (SUPPORTED, CONDITIONAL, UNKNOWN) is attached to every requirement
- Human GATE-01 review specifically targets ambiguous interpretations
- Ambiguous items can be escalated to specification owners before testcase design proceeds

---

## L-03 — LLM Hallucination Risk

**Limitation:**
AI language models can invent plausible-sounding content: HTTP status codes, schema fields, role names, or state transitions that do not appear in the specification.

**Impact:**
- Incorrect oracle values in testcases
- Testcases that test non-existent behavior

**Mitigation:**
- Evidence-required oracle gate: every DETERMINISTIC_ORACLE must reference a specification source
- GATE-02 human audit is specifically designed to catch hallucinated oracles
- Validation gate VG-05 enforces non-empty source fields for all deterministic oracles
- Implementation inspection is explicitly excluded from requirement authority

---

## L-04 — Security Domain Uncertainty

**Limitation:**
Security behavior (authentication failure modes, authorization enforcement detail, rate limiting, token expiry) is frequently under-specified or entirely absent from REST API specifications.

**Impact:**
- Many security testcases must be EXPLORATORY_OBSERVATION rather than DETERMINISTIC_ORACLE
- SEC categories may be fully BLOCKED_BY_SPEC if the specification provides no coverage

**Mitigation:**
- Security coverage map explicitly labels each SEC category with its specification support status
- Unsupported SEC categories are documented as BLOCKED rather than fabricated
- Exploratory security tests are retained as observational evidence-gathering exercises

---

## L-05 — State Explosion

**Limitation:**
For APIs with rich state models (e.g., order lifecycle, cart state, user account state), the number of meaningful state combinations grows exponentially with the number of state variables.

**Impact:**
- Full combinatorial state coverage is infeasible for non-trivial systems
- Important state interactions may be missed by a partial selection

**Mitigation:**
- Domain modeling uses equivalence partitions to group states
- Interaction analysis focuses on documented transitions only
- Exploratory boundary states are labeled as robustness probes rather than systematic BVA

---

## L-06 — Combinatorial Explosion

**Limitation:**
The number of parameter combinations for an endpoint with n parameters grows combinatorially. Exhaustive pairwise or higher-order testing is impractical for most real systems.

**Impact:**
- Candidate generation can produce an unmanageably large number of testcases
- Human audit time increases with candidate count

**Mitigation:**
- Equivalence partitioning groups similar inputs into representative classes
- One representative per partition (atomicity rule) limits redundancy
- Duplicate detection removes redundant candidates before human review
- Each-choice coverage (one value from each partition) is the default strategy; higher-order interaction is reserved for documented cross-parameter dependencies

---

## L-07 — Runtime Fixture Availability

**Limitation:**
Many testcases require runtime setup: user accounts, product IDs, order IDs, authentication tokens. These cannot all be determined at design time.

**Impact:**
- Testcase concrete data plans are incomplete until execution time
- Setup failures during execution can cascade to many dependent testcases

**Mitigation:**
- Data readiness classification (STATIC_READY, RUNTIME_PROVISION_REQUIRED, STATE_SETUP_REQUIRED) is assigned in S-12
- Setup chains are explicitly modeled in S-13 (execution feasibility)
- Root-cause triage in S-16 groups cascading failures by shared setup root cause

---

## L-08 — Oracle Problem

**Limitation:**
For many API behaviors, there is no single correct expected result that can be determined from the specification alone. This is especially true for:
- Sorting and ordering without a defined sort key
- Error messages (content may vary)
- Timestamps, generated IDs, non-deterministic values

**Impact:**
- Cannot verify exact response content for many exploratory cases
- Testcases must use partial assertions or observational records

**Mitigation:**
- OracleClass distinguishes DETERMINISTIC_ORACLE, EXPLORATORY_OBSERVATION, and BLOCKED_ORACLE
- Exploratory testcases record observations without asserting a specific expected value
- Human GATE-02 review ensures that exploratory testcases are not incorrectly labeled DETERMINISTIC_ORACLE

---

## L-09 — Duplicate Generation

**Limitation:**
Systematic equivalence partitioning and feature-by-feature generation naturally produce candidates that are logically equivalent to existing testcases, even across different features.

**Impact:**
- Inflated candidate count before deduplication
- Human audit burden increases

**Mitigation:**
- Duplicate detection in S-09 uses a multi-dimensional comparison (objective, input partition, state, endpoint, assertion target, coverage delta)
- PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE retains candidates that add new coverage
- Only UNIQUE and PARTIAL_OVERLAP candidates enter the human audit

---

## L-10 — Prompt Sensitivity

**Limitation:**
The quality of AI-generated testcase candidates depends heavily on the quality and specificity of the prompting strategy used to drive the AI component. Poorly framed prompts produce vague, overlapping, or fabricated candidates.

**Impact:**
- Low-quality candidate generation requires more human correction at GATE-02
- More AI_ASSISTED_CANDIDATE relabeling occurs

**Mitigation:**
- The skill design enforces structured extraction stages (S-01 through S-07) before generation (S-08)
- These structured inputs constrain what the AI can generate to specification-derived content
- Human GATE-02 provides a consistent backstop regardless of prompt quality

---

## L-11 — Context Window Limits

**Limitation:**
AI language models have finite context windows. A large API specification may not fit entirely within one context window along with all accumulated stage outputs.

**Impact:**
- The AI may produce inconsistent outputs across different parts of the specification
- References to earlier stages may become inaccurate as context is refreshed

**Mitigation:**
- Staged artefact design: each stage produces a stable, independently readable artefact
- Stable requirement IDs, EP IDs, and blocker IDs allow referencing across context boundaries without reprocessing the entire history
- Human GATE-01 review at the requirement stage ensures a stable foundation before proceeding

---

## L-12 — Human Review Dependency

**Limitation:**
The skill explicitly requires human judgment at six mandatory gates. If human review is unavailable, abbreviated, or low-quality, the skill's safety guarantees degrade significantly.

**Impact:**
- Hallucinated oracles may pass through if GATE-02 is rubber-stamped
- Provenance violations may go undetected if GATE-03 is not thorough
- Defects may be confirmed or denied incorrectly if GATE-05 evidence is insufficient

**Mitigation:**
- Gate requirements are defined in detail (see `validation-gates.md`) to provide a concrete checklist
- Gates cannot be skipped — the skill design explicitly requires reasoning notes, not just classifications
- The design acknowledges that gate quality is proportional to human effort invested

---

## Summary

| Limitation | Primary Mitigation |
|---|---|
| Incomplete specifications | Blockers + exploratory tests |
| Ambiguous requirements | GATE-01 with confidence levels |
| LLM hallucination | Evidence-required oracle gate + GATE-02 |
| Security domain uncertainty | Per-category support labeling + exploratory |
| State explosion | EP-based state grouping |
| Combinatorial explosion | Equivalence partitions + duplicate detection |
| Runtime fixture availability | Readiness classes + setup chain modeling |
| Oracle problem | OracleClass enum + observational records |
| Duplicate generation | Coverage-delta duplicate analysis |
| Prompt sensitivity | Structured pre-generation stages |
| Context window limits | Stable artefact IDs across stages |
| Human review dependency | Detailed gate checklists with reasoning requirement |
