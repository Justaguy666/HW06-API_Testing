# Validation Gates — API Test Design Agent Skill

These gates are checkpoints that must pass before the skill advances to the next stage. Some are machine-checkable; others require human review.

---

## Structural Validation Gates

These can be checked programmatically against the artefact structure.

### VG-01 — All Testcase IDs Are Unique

| Check | All testcase ID values in the combined suite are distinct |
|---|---|
| Method | Sort and compare; detect duplicates |
| Expected | 0 duplicate IDs |
| Failure action | Assign new IDs; re-check before advancing |

### VG-02 — All Requirement References Are Valid

| Check | Every `req_refs` entry in every testcase resolves to a known Requirement ID |
|---|---|
| Method | Cross-reference testcase req_refs against requirement inventory |
| Expected | 0 dangling references |
| Failure action | Remove invalid refs or add missing requirements; escalate to GATE-01 |

### VG-03 — All Origins Populated

| Check | Every testcase has a non-empty `origin` field |
|---|---|
| Method | Scan all testcases |
| Expected | 0 testcases with null or empty origin |
| Failure action | Assign correct origin before advancing |

### VG-04 — No Unsupported Boundaries

| Check | Every BVA candidate references a specification-documented boundary source |
|---|---|
| Method | Inspect `source` field of every BoundaryCandidate |
| Expected | 0 boundary candidates with empty source |
| Failure action | Remove candidate or locate specification source |

### VG-05 — No Unsupported Deterministic Oracles

| Check | Every DETERMINISTIC_ORACLE expected result has a non-empty `source` field referencing the specification |
|---|---|
| Method | Filter testcases where oracle class == DETERMINISTIC_ORACLE; inspect source field |
| Expected | 0 DETERMINISTIC_ORACLE entries without a spec source |
| Failure action | Reclassify to EXPLORATORY_OBSERVATION or locate spec source |

### VG-06 — All AI-Generated Testcases Audited

| Check | Every testcase with origin == AI_GENERATED has audit_status == VALID |
|---|---|
| Method | Filter by origin; check audit_status |
| Expected | 0 AI_GENERATED testcases with audit_status != VALID |
| Failure action | Present unaudited testcases to GATE-02 before advancing |

### VG-07 — Student-Origin Testcase Count Meets Assignment Requirement

| Check | Count of testcases with origin == HUMAN_ADDED >= assignment_rules.required_human_added |
|---|---|
| Method | Count HUMAN_ADDED testcases |
| Expected | Count >= required number |
| Failure action | Student authors additional testcases |

### VG-08 — Student-Origin Provenance Notes Present

| Check | Every HUMAN_ADDED testcase has a non-empty `authorship_note` |
|---|---|
| Method | Filter by origin == HUMAN_ADDED; check authorship_note |
| Expected | 0 HUMAN_ADDED testcases without authorship note |
| Failure action | Add authorship note or reclassify origin |

### VG-09 — All Blockers Referenced

| Check | Every BLOCKED_* feasibility classification and every BLOCKED_ORACLE oracle references a Blocker ID |
|---|---|
| Method | Cross-reference blocker_refs against blocker register |
| Expected | 0 blocked testcases without a blocker reference |
| Failure action | Create a blocker record for each unreferenced blocked condition |

### VG-10 — Duplicate Analysis Completed

| Check | Every retained testcase has a `dedup_status` of UNIQUE or PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE |
|---|---|
| Method | Inspect dedup_status field |
| Expected | 0 retained testcases with DUPLICATE status |
| Failure action | Remove any inadvertently retained duplicates |

### VG-11 — No AI-Generated Testcase Re-Labeled as HUMAN_ADDED

| Check | No testcase whose generation history includes an AI stage has origin == HUMAN_ADDED |
|---|---|
| Method | Inspect provenance audit trail |
| Expected | 0 violations |
| Failure action | Correct origin to AI_ASSISTED_CANDIDATE |

### VG-12 — Traceability Matrix Is Complete

| Check | Every testcase ID appears in the traceability matrix; every traceability matrix entry has at least one requirement ref |
|---|---|
| Method | Cross-reference testcase suite against matrix |
| Expected | 0 testcases absent from matrix; 0 matrix entries without requirement ref |
| Failure action | Add missing entries |

---

## Human Review Gates

These require human judgment and cannot be fully automated.

### GATE-01 — Requirement Interpretation Approval

**Trigger:** After Stage S-02

**Human reviews:**
- Are extracted requirements accurate interpretations of the specification?
- Are example literals correctly excluded from requirement claims?
- Are UNKNOWN items correctly classified?

**Human must:**
- Approve, correct, or reject each flagged interpretation
- Provide a written reasoning note for any rejection or correction

**Pass condition:** Human approves all requirement records (or revised versions)

**Fail action:** Revise and re-present; do not advance without approval

---

### GATE-02 — AI Testcase Audit

**Trigger:** After Stage S-09

**Human reviews:**
- Is each AI-generated testcase logically sound?
- Does it have a single, clear objective?
- Is the oracle class correct?
- Is the expected result supported by the specification?

**Human must:**
- Classify each candidate: VALID, INVALID, or INCOMPLETE
- Provide reasoning for every classification
- Not auto-approve any candidate

**Pass condition:** Every candidate has a human classification with reasoning

**Fail action:** Re-present with corrections; do not advance INCOMPLETE testcases without revision

---

### GATE-03 — Student Extension Confirmation

**Trigger:** After Stage S-11

**Human reviews:**
- Were the HUMAN_ADDED testcases genuinely authored by the student?
- Are they independent of AI-generated candidates?
- Are authorship notes sufficient?

**Pass condition:** All HUMAN_ADDED testcases confirmed; provenance notes verified

**Fail action:** Reclassify as AI_ASSISTED_CANDIDATE if independence is in doubt; student authors new testcases

---

### GATE-04 — Execution Blocker Review

**Trigger:** After Stage S-13

**Human reviews:**
- Are the blocker descriptions accurate?
- Are any blockers resolvable (e.g., by obtaining access, updating setup)?
- Is the canonical blocked testcase list correct?

**Pass condition:** Human approves the blocker register and canonical blocked list

**Fail action:** Attempt to resolve blockers; if unresolvable, confirm as canonical

---

### GATE-05 — Defect Confirmation

**Trigger:** After Stage S-15

**Human reviews:**
- Do the defect candidates represent genuine SUT defects?
- Are CONFIRMED_SUT_DEFECT classifications justified by evidence?

**Human must:**
- Not accept AI auto-confirmation of defects
- Provide specific evidence for each CONFIRMED_SUT_DEFECT

**Pass condition:** Every CONFIRMED_SUT_DEFECT has human-authored evidence

**Fail action:** Reclassify as INSUFFICIENT_EVIDENCE if evidence is insufficient

---

### GATE-06 — Final Artefact Audit

**Trigger:** After all stages

**Human reviews:**
- Does the complete artefact set meet the assignment requirements?
- Are all structural VGs satisfied?
- Is the traceability matrix complete?
- Is the blocker register accurate?
- Is the AI-generated diagram count zero?

**Pass condition:** Human approves the final artefact set

**Fail action:** Identify and fix deficiencies; re-audit
