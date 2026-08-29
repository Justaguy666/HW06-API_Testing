<center>

# Faculty of Information Technology - Ho Chi Minh City University of Science

# CS423 / CSC15003 - Software Testing (AI-augmented, 2026)

</center>

# AI Critique

The most important weakness of the AI-assisted API test design was that the AI generated plausible content before the boundaries of specification evidence were fully understood. In early design prompts, the AI produced cross-feature testcases touching FR-17 (Product Management) and FR-10 (Review/Rating) when the assigned scope was FR-02, FR-07, and FR-18. These 24 out-of-scope tests had to be identified and excluded during the Prompt 018 reconciliation — they exist in the codebase as historical evidence only. A syntactically and structurally valid testcase is not automatically in-scope.

A second significant weakness appeared in how the AI handled expected results. During the human audit stage (Prompts 007–008), the AI had initially recommended classifying many exploratory testcases as INCOMPLETE — conflating "no deterministic oracle" with "insufficient testcase." Human review corrected this: a testcase with a correctly defined `EXPLORATORY_OBSERVATION` oracle is a valid and complete testcase. The exploratory/deterministic distinction is central to testing undocumented API behavior, and the AI's initial confusion would have inflated the apparent deficiency count.

A third weakness appeared in execution planning. Prompt 021 initially classified 23 testcases as blocked after finding no documented expected status codes for those inputs. Prompt 022 improved this by separating two genuinely different conditions: missing oracle (which permits exploratory execution and observation) versus execution impossible (which cannot proceed at all). This correction reclassified 16 tests from BLOCKED to EXECUTABLE_EXPLORATORY and substantially expanded useful test coverage without inventing oracle claims.

The most consequential AI defect was in the Postman implementation: the order-setup chain (SETUP-009/011) attempted to discover order IDs without having first provisioned a user-owned order. This caused 14 of the 23 FAIL_SETUP results in the authoritative Newman run. Root-cause triage (Prompt 027) identified this as a POSTMAN_IMPLEMENTATION_DEFECT and fixed it (TRIAGE-FIX-001). Without triage, these 14 failures could have been misattributed to the SUT, producing false defect reports.

Two documentation defects were also identified after initial delivery. Prompt 030 initially stored only a 9-line placeholder instead of the full verbatim prompt text, violating the project's prompt-history convention. The Agent Skill example file (example-hw06.md) incorrectly stated "Three GitHub issues were confirmed as genuine SUT defects" when the correct classification is two confirmed SUT defects and one confirmed documentation defect. Both were identified by post-delivery audit and repaired in Prompt 030B. These errors demonstrate that AI-produced documentation requires the same level of human review as AI-produced test artefacts.

These failures occurred because the AI generalized from common testing patterns and structural completeness without sufficient knowledge of the specific SUT's specification gaps, the project's provenance rules, and the precise semantics of exploratory testing. Human review corrected the scope, the oracle classification, the execution feasibility reasoning, the Postman implementation, and the documentation accuracy. Importantly, expected results were never weakened to make results look better: the authoritative Newman run records 1 FAIL_ASSERTION and 23 FAIL_SETUP, and the final confirmed defects include two security/robustness SUT defects that remain open GitHub Issues.

The AI's strongest contributions were in breadth and auditability: it maintained stable, unique testcase IDs (TC-API-001 through TC-API-181) across 30+ prompt interactions without collision or renumbering; it produced complete requirement traceability from every testcase to its source requirement; it enforced provenance immutability (the 17 HUMAN_ADDED tests remain HUMAN_ADDED; no AI-generated candidate was silently relabeled); it correctly concluded BVA_NOT_APPLICABLE for all feature parameters rather than fabricating numeric boundaries; it separated execution failures by root cause to avoid inflating defect counts; and it produced zero secret exposures across 167 HTTP requests and all CI artefacts.

The main lesson is that collaboration with AI needs explicit gates at every stage: read authoritative specification evidence, verify requirement interpretations before test basis construction, review AI oracle classifications against the actual specification, audit Postman implementations before execution, triage all failures before reporting any as bugs, and audit all generated documentation for factual consistency. AI is effective for breadth, structure, and systematic coverage — but specification fidelity, oracle correctness, provenance integrity, and final defect confirmation must remain human responsibilities.

## Specific Strengths

1. **Stable ID management:** TC-API-001 through TC-API-181 maintained across 30+ prompts without collision or renumbering.
2. **Provenance enforcement:** HUMAN_ADDED origin is immutable for all 17 student-authored tests; no AI relabeling occurred.
3. **BVA discipline:** Correctly concluded BVA_NOT_APPLICABLE for all selected features rather than fabricating boundaries from example literals.
4. **Exploratory semantics:** Correctly modeled EXPLORATORY_OBSERVATION as a valid oracle class, enabling 80 testcases to execute observationally rather than being blocked.
5. **Root-cause triage:** Correctly grouped 14 FAIL_SETUP results under one Postman implementation root cause rather than reporting 14 independent SUT defects.
6. **Secret management:** Zero secret exposures in 167 HTTP requests, all CI artefacts, and all generated documentation.
7. **Blocker documentation:** Maintained a canonical register of 8 blocked testcases with specific, non-fabricated block reasons for each.

## Specific Weaknesses

1. **Scope drift:** Generated 24 out-of-scope tests (FR-17, FR-10) requiring reconciliation in Prompt 018.
2. **Exploratory/incomplete conflation:** Initially over-classified exploratory testcases as INCOMPLETE, requiring human correction in Prompts 007–008.
3. **Blocked/exploratory conflation:** Initially over-classified 16 testcases as blocked (Prompt 021), requiring separation of missing oracle from execution impossible (Prompt 022).
4. **Postman implementation gap:** Order-setup chain failed to provision a fixture before attempting discovery, causing 14 cascading FAIL_SETUP failures.
5. **Documentation factual errors:** Prompt 030 stored a placeholder instead of full prompt text; example-hw06.md incorrectly stated three SUT defects instead of two SUT + one documentation defect.

## Improvement Recommendations

1. **Explicit scope checkpoint:** Before generating any testcases, require a human-approved scope statement that names exactly which feature IDs are in scope. Reject AI generation until the checkpoint passes.
2. **Oracle class pre-commitment:** Before test generation, establish and commit the oracle classification policy (especially EXPLORATORY_OBSERVATION vs. BLOCKED_ORACLE) so that the AI cannot retroactively reclassify or mislabel.
3. **Setup-chain dry run:** Before full-suite execution, require the AI to trace each FAIL_SETUP dependency chain and verify that setup provisioning requests run in the correct order with the correct data flow.
4. **Post-delivery documentation audit:** After each documentation deliverable, run a structured fact-check against canonical artefacts (defect counts, test counts, provenance classifications) before committing.
5. **Consolidated scope/quota enforcement:** Consolidate the scope-compliance check (currently spread across Prompts 005–006 and 018) into a single mandatory gate immediately after the first test-generation prompt, to prevent accumulation of out-of-scope test IDs that must be retroactively excluded.

## Signature

| Field | Value |
| --- | --- |
| Student name (printed) | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Course | CS423 / CSC15003 - Software Testing |
| Assignment | HW06-AI - API Testing |
| Date | 2026-08-30 |
| Signature | Nguyen Minh Khoi |
