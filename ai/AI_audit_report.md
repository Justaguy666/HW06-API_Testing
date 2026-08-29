<center>

# Faculty of Information Technology (FIT) - Ho Chi Minh City University of Science (HCMUS)

# CS423 / CSC15003 - Software Testing (AI-augmented, 2026)

</center>

# AI Audit Report

## Student Information

| Field | Value |
| --- | --- |
| Student name (printed) | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Class / Cohort | Not provided |
| Assignment ID | HW06-AI - API Testing |
| Assignment date | 2026-08-30 |
| AI tool(s) used | Codex |
| AI used | [X] Yes  [ ] No |

## Declaration

I use AI tools for the tasks recorded below. AI was used to extract requirements from the API specification, build the verified test basis, derive equivalence partitions, conduct boundary analysis, generate logical testcases, design test data, build the Postman collection and test scripts, run Newman, triage failures, prepare bug reports, implement CI/CD workflows, design the Agent Skill G9.5 artefact, and draft documentation. I personally reviewed and accepted all final feature artefacts. Runtime reports, GitHub Issues, and CI/CD run evidence are genuine project artefacts and were not synthetically generated.

## General Prompt to Retrieve Logs

```prompt
Read the real entries in prompts/prompt-log.md and the corresponding saved prompts. Populate the AI Audit Report with the AI tool, date/time, prompt reference, output summary, and human review. Do not reconstruct missing interactions or timestamps.
```

The complete major prompts are preserved under [`prompts/`](prompts/). Concise interaction records are retained in [`prompts/prompt-log.md`](prompts/prompt-log.md).

## Interaction Records

### Interaction 1 — Prompt 001 — Requirement Extraction

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T09:11:40+07:00`
- **My prompt:** [`prompts/Prompt-001-analyze-api-specification.md`](prompts/Prompt-001-analyze-api-specification.md) — extract requirements from the EShop API specification.
- **The AI output:** Produced `analysis/requirement-analysis.md` mapping all API endpoints to functional requirement categories.
- **Human review:** Requirement extraction was verified line-for-line when logged.

### Interaction 2 — Prompt 002 — Verification and Normalization

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T09:23:56+07:00`
- **My prompt:** [`prompts/Prompt-002-verify-normalize-requirement-analysis.md`](prompts/Prompt-002-verify-normalize-requirement-analysis.md) — verify and normalize the requirement analysis.
- **The AI output:** Produced `analysis/verified-test-basis.md` (420 lines).
- **Human review:** Verified line-for-line: 420 lines. Confidence levels, unknown items, and example/requirement distinctions were checked.

### Interaction 3 — Prompt 003 — Domain Modeling and Equivalence Partitioning

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T09:32:46+07:00`
- **My prompt:** [`prompts/Prompt-003-domain-modeling-equivalence-partitioning.md`](prompts/Prompt-003-domain-modeling-equivalence-partitioning.md)
- **The AI output:** Produced `analysis/domain-model.md` (696 lines) deriving VALID, INVALID, CONDITIONAL, and EXPLORATORY partitions for all selected feature parameters.
- **Human review:** Verified 696 lines. EXPLORATORY partitions for undocumented invalid-input behaviors were confirmed as correctly labeled.

### Interaction 4 — Prompt 004 — Boundary Value Analysis

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T09:58:40+07:00`
- **My prompt:** [`prompts/Prompt-004-boundary-value-analysis.md`](prompts/Prompt-004-boundary-value-analysis.md)
- **The AI output:** Produced `analysis/boundary-value-analysis.md` (1,084 lines). Concluded `BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC` for all selected feature parameters — no specification-backed boundaries were found.
- **Human review:** Verified 1,084 lines. The BVA_NOT_APPLICABLE conclusion was confirmed as a correct finding, not a gap. Example literals were correctly not promoted to boundary values.

### Interaction 5 — Prompt 005 — Requirement-Driven Test-Case Design

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T10:16:31+07:00`
- **My prompt:** [`prompts/Prompt-005-test-case-design.md`](prompts/Prompt-005-test-case-design.md)
- **The AI output:** Produced `analysis/test-case-design.md` and `analysis/test-coverage-matrix.md` (1,017 lines total).
- **Human review:** Verified 1,017 lines. Early design included cross-feature scope leakage into FR-17 and FR-10; this was identified for later reconciliation.

### Interaction 6 — Prompt 006 — Scope Compliance and Gap Analysis

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T10:36:48+07:00`
- **My prompt:** [`prompts/Prompt-006-scope-compliance-test-design-gap-analysis.md`](prompts/Prompt-006-scope-compliance-test-design-gap-analysis.md)
- **The AI output:** Produced `analysis/scope-and-gap-analysis.md` and updated test design and coverage matrix (728 lines total).
- **Human review:** Scope leakage and test quota gaps were identified. Cross-feature FR-17 and FR-10 tests flagged for exclusion from current quota.

### Interaction 7 — Prompt 007 — Human Audit Worksheet

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T11:00:58+07:00`
- **My prompt:** [`prompts/Prompt-007-prepare-human-audit-worksheet.md`](prompts/Prompt-007-prepare-human-audit-worksheet.md)
- **The AI output:** Produced `analysis/human-audit-worksheet.md` (857 lines) with one row per AI-generated candidate.
- **Human review:** Verified 857 lines. Worksheet structure, IDs, and classification columns were checked.

### Interaction 8 — Prompt 008 — Apply Human Audit Decisions

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T15:30:58+07:00`
- **My prompt:** [`prompts/Prompt-008-apply-human-audit-decisions.md`](prompts/Prompt-008-apply-human-audit-decisions.md)
- **The AI output:** Applied human VALID/INVALID/INCOMPLETE decisions to test design, updated coverage matrix, and produced `analysis/human-audit-application-summary.md` (860 lines).
- **Human review:** Verified 860 lines. Early AI audit had over-classified many exploratory testcases as INCOMPLETE; this was corrected — a correctly defined exploratory testcase with EXPLORATORY_OBSERVATION oracle is VALID.

### Interaction 9 — Prompt 009 — Human Extension Reassessment

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T15:43:23+07:00`
- **My prompt:** [`prompts/Prompt-009-human-extension-reassessment.md`](prompts/Prompt-009-human-extension-reassessment.md)
- **The AI output:** Produced `analysis/student-extension-reassessment.md` and `analysis/student-extension-worksheet.md` (829 lines).
- **Human review:** Verified 829 lines.

### Interaction 10 — Prompt 010 — Populate Extension Candidates

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T16:25:48+07:00`
- **My prompt:** [`prompts/Prompt-010-populate-extension-candidates.md`](prompts/Prompt-010-populate-extension-candidates.md)
- **The AI output:** Populated extension candidate analysis; produced `analysis/ai-assisted-extension-candidate-analysis.md` (1,225 lines).
- **Human review:** Verified 1,225 lines.

### Interaction 11 — Prompt 011 — Switch Pool B Feature to FR-07

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T16:42:14+07:00`
- **My prompt:** [`prompts/Prompt-011-switch-pool-b-to-fr07.md`](prompts/Prompt-011-switch-pool-b-to-fr07.md) — switch selected Pool B feature from FR-09 to FR-07.
- **The AI output:** Produced `analysis/pool-b-feature-switch.md` and `analysis/fr07-requirement-analysis.md` (987 lines).
- **Human review:** Verified 987 lines. FR-09 was superseded; FR-07 became the canonical Pool B selection.

### Interaction 12 — Prompt 012 — Verify and Normalize FR-07 Test Basis

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T16:52:52+07:00`
- **My prompt:** [`prompts/Prompt-012-verify-normalize-fr07-test-basis.md`](prompts/Prompt-012-verify-normalize-fr07-test-basis.md)
- **The AI output:** Produced `analysis/fr07-verified-test-basis.md` (1,424 lines).
- **Human review:** Verified 1,424 lines.

### Interaction 13 — Prompt 013 — FR-07 Domain Modeling and EP

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T17:03:10+07:00`
- **My prompt:** [`prompts/Prompt-013-fr07-domain-modeling-equivalence-partitioning.md`](prompts/Prompt-013-fr07-domain-modeling-equivalence-partitioning.md)
- **The AI output:** Produced `analysis/fr07-domain-model.md` (1,383 lines).
- **Human review:** Verified 1,383 lines.

### Interaction 14 — Prompt 014 — FR-07 Boundary Value Analysis

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T17:10:14+07:00`
- **My prompt:** [`prompts/Prompt-014-fr07-boundary-value-analysis.md`](prompts/Prompt-014-fr07-boundary-value-analysis.md)
- **The AI output:** Produced `analysis/fr07-boundary-value-analysis.md` (1,347 lines). Again concluded BVA_NOT_APPLICABLE.
- **Human review:** Verified 1,347 lines. BVA non-applicability confirmed for FR-07.

### Interaction 15 — Prompt 015 — FR-07 Initial Logical Testcase Generation

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T17:21:30+07:00`
- **My prompt:** [`prompts/Prompt-015-fr07-initial-logical-testcase-generation.md`](prompts/Prompt-015-fr07-initial-logical-testcase-generation.md)
- **The AI output:** Produced `analysis/fr07-initial-test-case-design.md` and `analysis/fr07-initial-coverage-matrix.md` (1,500 lines).
- **Human review:** Verified 1,500 lines.

### Interaction 16 — Prompt 016 — FR-07 Scope, Quota, and Technique Gap Closure

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T17:33:32+07:00`
- **My prompt:** [`prompts/Prompt-016-fr07-scope-quota-technique-gap-closure.md`](prompts/Prompt-016-fr07-scope-quota-technique-gap-closure.md)
- **The AI output:** Updated FR-07 design and coverage matrix; produced `analysis/fr07-scope-and-gap-closure.md` (1,601 lines).
- **Human review:** Verified 1,601 lines.

### Interaction 17 — Prompt 017 — Prepare FR-07 Human Audit Worksheet

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T20:57:07+07:00`
- **My prompt:** [`prompts/Prompt-017-prepare-fr07-human-audit-worksheet.md`](prompts/Prompt-017-prepare-fr07-human-audit-worksheet.md)
- **The AI output:** Produced `analysis/fr07-human-audit-worksheet.md` (926 lines).
- **Human review:** Verified 926 lines.

### Interaction 18 — Prompt 018 — Reconcile Final Current Selected Suite

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T21:34:18+07:00`
- **My prompt:** [`prompts/Prompt-018-reconcile-current-selected-suite.md`](prompts/Prompt-018-reconcile-current-selected-suite.md)
- **The AI output:** Produced eight canonical artefacts under `analysis/current-selected-suite/` (1,194 lines total), establishing FR-02/FR-07/FR-18 as the final scope with 105 AI-generated tests and superseding FR-09.
- **Human review:** Verified 1,194 lines. Cross-feature exclusions (FR-17, FR-10) and historical FR-09 exclusions were reviewed and confirmed.

### Interaction 19 — Prompt 019 — Current-Scope Student Extension Reassessment

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T21:43:29+07:00`
- **My prompt:** [`prompts/Prompt-019-current-scope-student-extension-reassessment.md`](prompts/Prompt-019-current-scope-student-extension-reassessment.md)
- **The AI output:** Produced student extension reassessment and worksheet (1,176 lines). Confirmed HUMAN_ADDED baseline = 0; worksheet slots left for student authorship.
- **Human review:** Verified 1,176 lines.

### Interaction 20 — Prompt 020 — Validate and Integrate Student-Added Tests

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T22:06:58+07:00`
- **My prompt:** [`prompts/Prompt-020-validate-integrate-student-added-tests.md`](prompts/Prompt-020-validate-integrate-student-added-tests.md)
- **The AI output:** Accepted 17 student proposals as HUMAN_ADDED (FR-02: 6, FR-07: 6, FR-18: 5). Updated test design and coverage matrix (1,951 lines total). Rejected FR18-05 as a provenance-boundary violation.
- **Human review:** Verified 1,951 lines. HUMAN_ADDED provenance confirmed for all 17 accepted tests. Rejected proposal noted in record.

### Interaction 21 — Prompt 021 — Concrete Test Data Design

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-29T22:23:37+07:00`
- **My prompt:** [`prompts/Prompt-021-concrete-test-data-design.md`](prompts/Prompt-021-concrete-test-data-design.md)
- **The AI output:** Produced test-data catalogue, Postman variable plan, and testcase-data matrix (1,428 lines). Initially classified 23 testcases as blocked — later improved.
- **Human review:** Verified 1,428 lines. Some tests were over-classified as blocked; Prompt 022 improved this by separating missing oracle from execution impossible.

### Interaction 22 — Prompt 022 — Resolve Postman Execution Scope and Blocker Strategy

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T03:50:12+07:00`
- **My prompt:** [`prompts/Prompt-022-resolve-postman-execution-scope.md`](prompts/Prompt-022-resolve-postman-execution-scope.md)
- **The AI output:** Produced `postman-plan/` artefacts and an execution manifest. Reclassified 16 previously blocked tests as EXECUTABLE_EXPLORATORY, yielding 114 planned executable / 8 canonical blocked (1,030 lines).
- **Human review:** Verified 1,030 lines. The distinction between missing oracle (EXPLORATORY) and execution impossible (BLOCKED) was verified.

### Interaction 23 — Prompt 023 — Build Postman Collection, Environment, and Test Scripts

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T04:06:40+07:00`
- **My prompt:** [`prompts/Prompt-023-build-postman-collection-environment-tests.md`](prompts/Prompt-023-build-postman-collection-environment-tests.md)
- **The AI output:** Produced `postman/collections/HW06-API-Testing.postman_collection.json`, environment, traceability matrices, and static validator (1,657 lines). Static validator: PASS, 0 secret exposures.
- **Human review:** Verified 1,657 lines. X-Student-Id header verified present in all requests (0 missing). No API/Newman execution at this stage.

### Interaction 24 — Prompt 024 — Controlled Smoke Validation

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T04:22:48+07:00`
- **My prompt:** [`prompts/Prompt-024-postman-controlled-smoke-validation.md`](prompts/Prompt-024-postman-controlled-smoke-validation.md)
- **The AI output:** Produced smoke selection, smoke fix log, and smoke evidence. Smoke result: 9 logical tests (3 PASS, 4 OBSERVED_EXPLORATORY, 2 BLOCKED_RUNTIME_PREREQUISITE). Admin prerequisite unresolved at this stage.
- **Human review:** Smoke results reviewed. Two blocked cases caused by Admin authentication — later resolved in Prompt 025.

### Interaction 25 — Prompt 025 — Resolve FR-18 Admin Runtime Prerequisite

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T04:31:04+07:00`
- **My prompt:** [`prompts/Prompt-025-resolve-fr18-admin-runtime-prerequisite.md`](prompts/Prompt-025-resolve-fr18-admin-runtime-prerequisite.md)
- **The AI output:** Diagnosed root cause as ACCOUNT_STATE_PROBLEM — temporary lock caused by earlier failed-login attempts. Resolved without authentication bypass. SETUP-005 PASS; TC-API-046 PASS; TC-API-179 OBSERVED_EXPLORATORY. Full suite readiness: READY.
- **Human review:** Resolution approach verified: no password mutation, no brute force, no direct DB manipulation. Lock expired naturally.

### Interaction 26 — Prompt 026 — Full Newman Execution and Evidence

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T04:40:40+07:00`
- **My prompt:** [`prompts/Prompt-026-full-newman-execution-evidence.md`](prompts/Prompt-026-full-newman-execution-evidence.md)
- **The AI output:** Produced authoritative full Newman run: exit code 1, 167 HTTP requests, 173 assertions, 1 assertion failure, 10 PASS, 80 OBSERVED_EXPLORATORY, 1 FAIL_ASSERTION, 23 FAIL_SETUP. Evidence archived.
- **Human review:** Runtime evidence reviewed. This run is preserved as immutable historical baseline. 23 FAIL_SETUP not yet root-cause analysed at this stage.

### Interaction 27 — Prompt 027 — Triage Newman Failures

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T04:53:52+07:00`
- **My prompt:** [`prompts/Prompt-027-triage-newman-failures.md`](prompts/Prompt-027-triage-newman-failures.md)
- **The AI output:** Triaged 26 runtime + 1 documentation candidates into: 2 confirmed SUT defects (TRIAGE-001/002/003 sharing two root defects), 1 confirmed documentation defect (TRIAGE-006), 1 fixed Postman implementation defect (TRIAGE-004/TRIAGE-FIX-001), 1 test-data setup limitation (TRIAGE-005), 1 specification ambiguity (TRIAGE-007).
- **Human review:** Final defect classifications reviewed. Importantly, TRIAGE-004 (14 FAIL_SETUP) was identified as a Postman implementation defect — the order-setup chain did not provision an order before attempting discovery. This was fixed by TRIAGE-FIX-001.

### Interaction 28 — Prompt 028 — Defect Reports, GitHub Evidence

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T05:09:29+07:00`
- **My prompt:** [`prompts/Prompt-028-defect-reports-github-evidence.md`](prompts/Prompt-028-defect-reports-github-evidence.md)
- **The AI output:** Produced 3 markdown bug reports and 3 GitHub issue body files. Screenshots captured. GitHub creation blocked initially because `gh` CLI unavailable.
- **Human review:** Reports verified line-for-line: 1,576 lines.

### Interaction 28B — Prompt 028B — Resolve GitHub CLI and Publish Issues

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T05:29:17+07:00`
- **My prompt:** [`prompts/Prompt-028B-resolve-github-publication.md`](prompts/Prompt-028B-resolve-github-publication.md)
- **The AI output:** Installed GitHub CLI, authenticated, published GitHub Issues #1, #2, and #3. Duplicate audit: 0 pre-existing matching issues. All three issues created with correct titles and screenshots.
- **Human review:** Verified: 738 lines, GitHub CLI installed, issues verified at their URLs.

### Interaction 29 — Prompt 029 — Newman CI/CD

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T05:41:39+07:00`
- **My prompt:** [`prompts/Prompt-029-newman-ci-cd.md`](prompts/Prompt-029-newman-ci-cd.md)
- **The AI output:** Produced two GitHub Actions workflows (`newman-ci.yml`, `newman-intentional-fail.yml`), CI scripts, CI documentation, and evidence. Verified real GitHub Actions runs: passing run (RUN_ID: 33279580944, conclusion: success) and intentional-fail run (RUN_ID: 33279644102, conclusion: failure).
- **Human review:** Verified 1,780 lines. Representative passing subset (TC-API-001, TC-API-130, TC-API-048, TC-API-173) intentionally excludes known-defective and canonically blocked tests. Intentional-fail is CI_DEMO_ONLY, not a product defect.

### Interaction 30 — Prompt 030 — Agent Skill G9.5 Design

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T05:58:14+07:00`
- **My prompt:** [`prompts/Prompt-030-agent-skill-g9-5.md`](prompts/Prompt-030-agent-skill-g9-5.md)
- **The AI output:** Produced 11 artefacts under `agent-skill/` documenting the API Test Design Agent Skill including workflow (16 stages), algorithmic pseudocode, input/output contract, validation gates, AI/human provenance policy, HW06 example, limitations, and manual diagram drawing guide. Zero AI-generated diagrams.
- **Human review:** Diagram-prohibition audit: 0 violations. Prompt file was initially saved as a placeholder — caught and repaired in Prompt 030B.

### Interaction 30B — Prompt 030B — Repair Agent Skill Audit Consistency

- **Name of the AI tool:** Codex
- **Date and time:** `2026-08-30T06:12:14+07:00`
- **My prompt:** [`prompts/Prompt-030B-repair-agent-skill-audit-consistency.md`](prompts/Prompt-030B-repair-agent-skill-audit-consistency.md)
- **The AI output:** Restored full Prompt 030 verbatim text (replacing placeholder). Corrected `agent-skill/example-hw06.md` defect count from "Three GitHub issues confirmed as SUT defects" to the correct "Two SUT defects + one documentation defect." Diagram audit: 0 violations. Canonical validator: PASS.
- **Human review:** Repairs verified: line count 1,837, placeholder absent, defect count corrected, validator PASS.

## Human Review and Corrections

### Requirement Extraction and Test Basis (Prompts 001–004)

- Verified that example literals in the API specification were not promoted to requirement boundaries.
- Confirmed `BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC` as the correct conclusion for all three features — no specification-backed numeric or length boundaries exist for FR-02, FR-07, or FR-18 in the scope tested.

### Feature Selection and Scope (Prompts 011, 018)

- Decided to switch Pool B from FR-09 (Coupon/Discount) to FR-07 (Shopping Cart) based on student judgment.
- Reconciled cross-feature scope leakage: 17 FR-17 tests and 7 FR-10 tests generated in early prompts were excluded from the current quota; they remain in the codebase as historical evidence but are labeled SUPERSEDED or CROSS_FEATURE.
- Confirmed final scope: FR-02, FR-07, FR-18 only.

### Human Audit (Prompts 007–008, 017)

- Corrected AI over-classification: early audit recommendations had marked many exploratory testcases as INCOMPLETE. Human review established that a correctly formed `EXPLORATORY_OBSERVATION` oracle is a valid and complete testcase — exploratory ≠ incomplete.
- All 105 AI-generated testcase candidates received explicit human classification (VALID/INVALID/INCOMPLETE).

### Student Extension (Prompts 019–020)

- Student independently authored 24 proposed testcases.
- AI evaluated internal consistency only — AI did not author the proposed tests.
- 17 were accepted as HUMAN_ADDED (FR-02: 6, FR-07: 6, FR-18: 5).
- FR18-05 was rejected: proposing to relabel an AI-generated candidate as HUMAN_ADDED violated provenance rules.
- Origin = HUMAN_ADDED is immutable for all 17 accepted tests.

### Execution Planning (Prompts 021–022)

- Corrected over-classification of tests as blocked. Prompt 021 had initially classified 23 tests as blocked. Prompt 022 improved reasoning by distinguishing missing oracle (which still allows exploratory execution) from execution impossible (which cannot run at all). 16 tests were reclassified from BLOCKED to EXECUTABLE_EXPLORATORY.
- Final planning: 114 executable / 8 canonically blocked.

### Postman Implementation (Prompt 023)

- Verified X-Student-Id header present in all 167 runtime requests (0 missing).
- Confirmed static validator PASS before any execution.

### Admin Prerequisite Resolution (Prompt 025)

- Verified that no authentication bypass, password mutation, brute force, or direct database promotion was used.
- Lock expired naturally after failed-login state cleared.

### Failure Triage (Prompt 027)

- The single most important correction: the AI initially reported 27 failure candidates. Human triage revealed that 14 of the 23 FAIL_SETUP results were caused by a single Postman implementation defect (TRIAGE-004) — the order-setup chain did not provision an order before attempting order discovery.
- This was fixed (TRIAGE-FIX-001) without rerunning the full suite. The authoritative run remains as historical evidence.
- Final defect count: 2 SUT defects + 1 documentation defect = 3 total confirmed defects.

### CI/CD (Prompt 029)

- Verified that the CI passing subset intentionally excludes known-defective tests (DEFECT-001 and DEFECT-002) and the 8 canonically blocked tests. The passing subset proves regression capability on selected stable tests, not full suite passage.
- Confirmed that the intentional-fail run is CI_DEMO_ONLY — it is not a product defect.

### Agent Skill G9.5 Documentation (Prompts 030, 030B)

- Confirmed that no AI-generated diagram of any form was produced (Mermaid = 0, PlantUML = 0, Graphviz = 0, ASCII architecture = 0, image files = 0).
- Identified and repaired two documentation defects after initial Agent Skill delivery: (1) placeholder Prompt 030 file, (2) incorrect defect count in example-hw06.md.

## Evidence References

- Main report: [`report.md`](report.md)
- Prompt log: [`prompts/prompt-log.md`](prompts/prompt-log.md)
- Saved prompts: [`prompts/`](prompts/)
- Current selected suite: [`analysis/current-selected-suite/`](analysis/current-selected-suite/)
- Test data: [`test-data/`](test-data/)
- Postman collection: [`postman/collections/HW06-API-Testing.postman_collection.json`](postman/collections/HW06-API-Testing.postman_collection.json)
- Authoritative Newman run: [`reports/newman/full/authoritative-execution-summary.md`](reports/newman/full/authoritative-execution-summary.md)
- Execution triage: [`analysis/execution-triage/triage-summary.md`](analysis/execution-triage/triage-summary.md)
- Bug reports and traceability: [`bugs/`](bugs/)
- CI evidence: [`evidence/ci/ci-summary.md`](evidence/ci/ci-summary.md)
- Agent Skill: [`agent-skill/README.md`](agent-skill/README.md)
- GitHub Issues: [#1](https://github.com/Justaguy666/HW06-API_Testing/issues/1), [#2](https://github.com/Justaguy666/HW06-API_Testing/issues/2), [#3](https://github.com/Justaguy666/HW06-API_Testing/issues/3)
- CI passing run: https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279580944
- CI intentional-fail run: https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279644102

## Completeness Check

| Check | Status |
| --- | --- |
| AI usage declared | COMPLETE |
| Real timestamped interactions recorded | COMPLETE |
| Major prompts preserved | COMPLETE |
| AI outputs summarized | COMPLETE |
| Human corrections documented | COMPLETE |
| Evidence paths linked | COMPLETE |
| Missing historical timestamp fabricated | NO |
| AI mistakes and corrections documented | COMPLETE |
| Provenance policy documented | COMPLETE |
| Secret exposures in documentation | 0 |

## Signature

| Field | Value |
| --- | --- |
| Student name (printed) | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Course | CS423 / CSC15003 - Software Testing |
| Assignment | HW06-AI - API Testing |
| Date | 2026-08-30 |
| Signature | Nguyen Minh Khoi |
