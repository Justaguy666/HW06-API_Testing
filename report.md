<center>

# Faculty of Information Technology (FIT) - Ho Chi Minh City University of Science (HCMUS)

# CS423 / CSC15003 - Software Testing (AI-augmented, 2026)

# HW06 - API Testing

</center>

## Student Information

| Field | Value |
| --- | --- |
| Student name | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Assignment | HW06-AI - API Testing |
| Date | 2026-08-30 |
| Public repository | https://github.com/Justaguy666/HW06-API_Testing |

## 1. Introduction

This report documents an AI-assisted API test design and execution project for three EShop REST API features. The work follows an AI-first, human-reviewed workflow where AI generates candidate artefacts at each stage and a human reviewer validates, corrects, and approves before advancing. The final suite contains 122 logical testcases (105 AI-generated, 17 student-authored), executed via Postman/Newman against a locally deployed EShop backend. The project produced a full CI/CD pipeline on GitHub Actions, three confirmed defects published as GitHub Issues, and a reusable Agent Skill design for AI-driven API test generation.

The authoritative Newman run recorded 1 FAIL_ASSERTION and 23 FAIL_SETUP results across 114 executable testcases. Subsequent root-cause triage explained these failures as arising from two SUT defects, one Postman implementation defect (fixed), one test-data setup limitation, and one specification ambiguity — not 24 independent product bugs.

## 2. System Under Test and Environment

**System Under Test:** EShop — Vietnamese e-commerce demo application for testing practice.

**Upstream repository:** https://github.com/ttbhanh/eshop-sut

**Test repository:** https://github.com/Justaguy666/HW06-API_Testing

| Component | Verified environment |
| --- | --- |
| Operating system | Microsoft Windows 11 |
| Node.js | Current LTS (project-pinned) |
| Test execution | Newman 6.2.2 (CLI-based Postman runner) |
| Collection format | Postman Collection v2.1 |
| Backend API | `http://127.0.0.1:3000` / configured equivalent |
| CI/CD | GitHub Actions (ubuntu-latest runner) |

Credentials and runtime environment values are supplied through environment variables and GitHub Secrets. Real secrets are not committed. The X-Student-Id header identifying the student was included in all API requests; it was sourced from the `STUDENT_ID` GitHub Secret at CI execution time.

## 3. Feature Selection

| Pool | Feature | Description |
| --- | --- | --- |
| A | FR-02 — Login and Account Lockout | User authentication, credential validation, failed-attempt counter, lockout threshold, lockout duration, locked behavior, admin access |
| B | FR-07 — Shopping Cart | Cart state, item management, quantity, removal, total calculation, cart-to-checkout flow |
| C | FR-18 — Order Management (Admin) | Admin order listing, status viewing, order update, order ownership validation |

**Historical note:** FR-09 (Coupon/Discount) was selected initially for Pool B and later superseded by FR-07. FR-09 testcases exist in the codebase as historical evidence only and are not counted in the current suite. Early design also produced cross-feature tests for FR-17 and FR-10; these were identified during Prompt 018 reconciliation and excluded from the current 105-test AI quota.

## 4. AI-First Testing Workflow

The project used the following controlled workflow:

```text
API specification
  → requirement extraction
  → verified test basis
  → domain modeling / EP
  → boundary analysis (BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC)
  → interaction / state / security analysis
  → logical testcase generation (AI candidates)
  → human audit (VALID / INVALID / INCOMPLETE)
  → student extension (HUMAN_ADDED)
  → concrete test data design
  → execution feasibility (114 executable / 8 blocked)
  → Postman implementation
  → controlled smoke execution
  → Admin prerequisite resolution
  → authoritative full Newman execution
  → root-cause triage
  → defect reporting and GitHub Issues
  → CI/CD pipeline
  → Agent Skill G9.5 design
  → final documentation
```

AI generated candidate artefacts at every stage. Human review validated, corrected, and accepted each stage before advancing. Expected results were never weakened to produce passing results. A failed testcase was classified before any change was considered.

## 5. Test Design

### 5.1 Logical Test Counts

| Origin | FR-02 | FR-07 | FR-18 | Total |
| --- | ---: | ---: | ---: | ---: |
| AI_GENERATED | 35 | 35 | 35 | 105 |
| HUMAN_ADDED | 6 | 6 | 5 | 17 |
| **Total** | **41** | **41** | **40** | **122** |

### 5.2 Techniques Applied

The test design applied the following techniques across all three features:

- **Equivalence Partitioning (EP):** VALID, INVALID (where specification supports documented response), CONDITIONAL, and EXPLORATORY partitions derived for each parameter dimension.
- **Boundary Value Analysis (BVA):** `BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC` for all selected features. The EShop API specification did not define explicit numeric or length boundaries for the in-scope parameters. Robustness representatives (e.g., very large integers, long strings) were modeled as EXPLORATORY_PROBE, not as BVA boundary candidates.
- **Interaction and state analysis:** Authentication flows, authorization role gates, cart session state, order lifecycle state, resource ownership and isolation.
- **Security coverage:** Authentication (SEC-01), authorization (SEC-02), input handling (SEC-03), information exposure (SEC-04), resource isolation (SEC-05). Rate limiting and token expiry were EXPLORATORY or BLOCKED_BY_SPEC.
- **Exploratory testing:** 73 of 105 AI-generated testcases are classified EXPLORATORY in technique coverage, testing behavior that the specification does not prescribe a deterministic outcome for.

### 5.3 Human Audit

All 105 AI-generated testcase candidates were reviewed by the student. Candidates were classified as VALID, INVALID, or INCOMPLETE. Key correction: the AI initially recommended classifying many exploratory testcases as INCOMPLETE. Human review established that an `EXPLORATORY_OBSERVATION` oracle is a valid, complete expected result. Exploratory ≠ incomplete.

### 5.4 Student Extension

The student independently authored 24 proposed testcases. AI evaluated their internal consistency only — AI did not generate the proposals. 17 were accepted as HUMAN_ADDED. FR18-05 was rejected: it attempted to relabel an AI-generated candidate as HUMAN_ADDED, violating provenance rules. The 17 accepted tests retain HUMAN_ADDED provenance permanently.

### 5.5 Execution Feasibility

| Class | Count | Testcase IDs |
| --- | ---: | --- |
| Executable (all classes) | 114 | — |
| Canonical blocked | 8 | TC-API-092, TC-API-093, TC-API-118, TC-API-121, TC-API-127, TC-API-128, TC-API-164, TC-API-181 |
| **Total logical tests** | **122** | |

The 8 canonically blocked tests could not be implemented defensibly due to undocumented state control, missing specification-backed oracles, or out-of-scope observation channels. They are documented in `postman-plan/blocked-test-register.md`.

## 6. Postman Implementation

The 114 executable testcases were implemented in a Postman collection with full test scripts. The collection structure includes setup requests, feature requests, and assertion scripts mapped from logical testcases.

A static validator (`postman/validation/validate-postman-build.js`) was used to verify collection structure before execution. Key results:

- Missing X-Student-Id headers: **0** (verified across all requests at build time)
- Verified executable testcase units: **114**
- Secret exposures: **0**

## 7. Execution

### 7.1 Controlled Smoke

**Source:** Prompt 024 | **Artefact:** `reports/newman/smoke/`

| Metric | Value |
| --- | ---: |
| Smoke logical tests | 9 |
| PASS | 3 |
| OBSERVED_EXPLORATORY | 4 |
| BLOCKED_RUNTIME_PREREQUISITE | 2 |

The 2 blocked smoke cases were caused by an Admin authentication prerequisite that was not yet resolved. Prompt 025 resolved this as an ACCOUNT_STATE_PROBLEM (temporary login-failure lock) without any authentication bypass or database manipulation.

### 7.2 Authoritative Full Newman Run

**Source:** Prompt 026 | **Artefact:** `reports/newman/full/authoritative-execution-summary.md`

This run is the immutable historical baseline. It was not rerun or overwritten after triage.

| Metric | Value |
| --- | ---: |
| Newman exit code | **1** |
| HTTP requests | 167 |
| Request failures | 0 |
| Assertions | 173 |
| Assertion failures | **1** |

| Logical Result | Count |
| --- | ---: |
| PASS | 10 |
| OBSERVED_EXPLORATORY | 80 |
| FAIL_ASSERTION | 1 |
| FAIL_SETUP | 23 |
| FAIL_REQUEST | 0 |
| INCOMPLETE_SEQUENCE | 0 |
| BLOCKED_RUNTIME_PREREQUISITE | 0 |
| **TOTAL** | **114** |

Successful/observed execution rate: **90 / 114 = 78.95%**

| Feature | Planned | PASS | OBSERVED | Fail Assertion | Fail Setup |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-02 | 39 | 4 | 35 | 0 | 0 |
| FR-07 | 40 | 2 | 37 | 0 | 1 |
| FR-18 | 35 | 4 | 8 | 1 | 22 |
| TOTAL | 114 | 10 | 80 | 1 | 23 |

## 8. Execution Triage

**Source:** Prompt 027 | **Artefact:** `analysis/execution-triage/triage-summary.md`

The authoritative run produced 27 failure candidates (26 runtime + 1 documentation). Root-cause triage reduced these to distinct root causes:

| Triage Group | Direct Cause | Affected Tests | Final Classification |
| --- | --- | ---: | --- |
| TRIAGE-001 | Non-Admin user accessed Admin order operations via HTTP 200 | TC-API-047 | CONFIRMED_SUT_DEFECT |
| TRIAGE-002/003 | POST /api/login returns HTTP 500 with no JSON body / wrong media type | TC-API-011, TC-API-078 | CONFIRMED_SUT_DEFECT (shared root) |
| TRIAGE-004 | Order-setup chain provisioned no order before discovery | 14 tests | POSTMAN_IMPLEMENTATION_DEFECT (FIXED) |
| TRIAGE-005 | Missing-product absence oracle unavailable | TC-API-155 | TEST_DATA_SETUP_LIMITATION |
| TRIAGE-006 | Conflicting Admin credential documentation | Documentation path | CONFIRMED_DOCUMENTATION_DEFECT |
| TRIAGE-007 | Order status transition/reset contract undocumented | 8 tests | SPECIFICATION_AMBIGUITY |

TRIAGE-004 was fixed by TRIAGE-FIX-001 without rerunning the full suite. The fix provisioned user-owned orders before discovery. The authoritative run evidence is preserved as-is.

## 9. Confirmed Defects

### DEFECT-001 — Broken Access Control on Admin Order Operations

| Field | Value |
| --- | --- |
| Type | SECURITY |
| Severity | HIGH |
| Feature | FR-18 |
| Finding | Authenticated non-Admin users can access Admin order list and update endpoints and receive HTTP 200 with order data. |
| Detected by | TC-API-047, TC-API-055 (targeted verification) |
| GitHub Issue | [#1 — \[FR-18\]\[Security\] Non-Admin user can access Admin order operations](https://github.com/Justaguy666/HW06-API_Testing/issues/1) |

### DEFECT-002 — Unhandled HTTP 500 on Missing Login Body

| Field | Value |
| --- | --- |
| Type | ROBUSTNESS |
| Severity | MEDIUM |
| Feature | FR-02 |
| Finding | POST /api/login returns an unhandled HTTP 500 (TypeError) when the request is sent without a JSON body or with a non-JSON Content-Type. |
| Detected by | TC-API-011, TC-API-078 |
| GitHub Issue | [#2 — \[FR-02\]\[Robustness\] Login returns HTTP 500 when JSON body is unavailable](https://github.com/Justaguy666/HW06-API_Testing/issues/2) |

### DEFECT-003 — Conflicting Admin Credential Documentation

| Field | Value |
| --- | --- |
| Type | DOCUMENTATION |
| Severity | LOW |
| Finding | `eshop-sut/setup_guide.md` and `eshop-sut/README.md` provide conflicting credentials for the same seeded Admin identity. |
| GitHub Issue | [#3 — \[Docs\] Conflicting seeded Admin credentials in setup guide and README](https://github.com/Justaguy666/HW06-API_Testing/issues/3) |

**Summary:**

| Type | Count |
| --- | ---: |
| Confirmed SUT defects | **2** |
| Confirmed documentation defects | **1** |
| **Total confirmed defects** | **3** |
| Published GitHub Issues | **3** |

## 10. Bug Evidence

| Defect | Markdown Report | Screenshot | GitHub Issue |
| --- | --- | --- | --- |
| DEFECT-001 | `bugs/reports/DEFECT-001.md` | `bugs/evidence/` | [#1](https://github.com/Justaguy666/HW06-API_Testing/issues/1) |
| DEFECT-002 | `bugs/reports/DEFECT-002.md` | `bugs/evidence/` | [#2](https://github.com/Justaguy666/HW06-API_Testing/issues/2) |
| DEFECT-003 | `bugs/reports/DEFECT-003.md` | `bugs/evidence/` | [#3](https://github.com/Justaguy666/HW06-API_Testing/issues/3) |

Non-defect triage findings (TRIAGE-004, TRIAGE-005, TRIAGE-007) were not published as bugs. All three published issues include genuine screenshots. Secret values (Admin passwords, tokens, student ID) are not visible in published evidence.

## 11. CI/CD Pipeline

**Source:** Prompt 029 | **Artefacts:** `.github/workflows/`, `evidence/ci/`

### 11.1 Passing CI Run — HW06 Newman CI

| Field | Value |
| --- | --- |
| Run ID | 33279580944 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279580944 |
| Conclusion | **success** |
| Newman exit code | **0** |
| HTTP requests | 6 |
| Assertions | 8 |
| Assertion failures | **0** |

Logical testcases covered: TC-API-001 (FR-02, AI_GENERATED), TC-API-130 (FR-07, AI_GENERATED), TC-API-048 (FR-18, AI_GENERATED), TC-API-173 (FR-18, HUMAN_ADDED).

This is a **representative regression subset**. It intentionally excludes:
- TC-API-047 (triggers DEFECT-001)
- Tests dependent on DEFECT-002 environment
- The 8 canonically blocked tests
- Tests requiring Admin provisioning chains

The passing subset proves CI pipeline function and regression capability for stable tests. It does not prove that all 114 executable tests pass.

### 11.2 Intentional Failure CI Run — HW06 Newman Intentional Failure Demo

| Field | Value |
| --- | --- |
| Run ID | 33279644102 |
| Run URL | https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279644102 |
| Conclusion | **failure** |
| Newman exit code | **1** |
| Assertions | 1 |
| Intentional assertion failures | **1** |
| Failure source | `[CI-DEMO-FAIL] Intentional CI failure demonstration` |

This failure is `CI_DEMO_ONLY`. It is not a product defect. It demonstrates that the CI pipeline correctly reports failure when assertions fail.

CI evidence screenshots are preserved in `evidence/ci/`:

- `HW06-Newman-CI-success.png`
- `HW06-Newman-intentional-failure.png`

## 12. Agent Skill G9.5

**Source:** Prompts 030, 030B | **Artefacts:** `agent-skill/`

The project designed a reusable Agent Skill — the **API Test Design Agent Skill** (`api-test-design`) — that formalizes the AI-assisted API test design workflow used in this project.

The skill specifies a 16-stage pipeline:

1. Specification Intake
2. Requirement Evidence Extraction (→ GATE-01)
3. Verified Test Basis
4. Domain Modeling
5. Boundary Analysis
6. Interaction and State Analysis
7. Security Coverage
8. Logical Test Generation
9. Duplicate Detection (→ GATE-02)
10. Human Audit Gate
11. Student Extension Gate (→ GATE-03)
12. Concrete Data Planning
13. Execution Feasibility (→ GATE-04)
14. Implementation Planning
15. Execution Result Interpretation (→ GATE-05)
16. Root-Cause Triage (→ GATE-06)

Six mandatory human gates prevent autonomous advancement. The skill includes algorithmic pseudocode, formal input/output contracts, 12 structural validation gates, a provenance policy, 12 documented limitations with mitigations, and a worked HW06 example.

**Architecture diagram:** The assignment requires a self-drawn diagram. No AI-generated diagram was produced (Mermaid = 0, PlantUML = 0, Graphviz = 0, ASCII architecture = 0, image files = 0). A manual drawing guide is provided in `agent-skill/diagram-drawing-guide.md`.

```text
MANUAL_G9_5_DIAGRAM:
PENDING_STUDENT_MANUAL_DRAWING
```

## 13. Limitations

| Limitation | Impact | Mitigation Applied |
| --- | --- | --- |
| Incomplete specification — invalid-input responses not documented | No deterministic oracle for many testcases | EXPLORATORY_OBSERVATION oracle; observation recorded |
| No contract-backed BVA boundaries | BVA_NOT_APPLICABLE for all features | Correctly documented as valid conclusion |
| Order state transition ambiguity | 8 TRIAGE-007 testcases blocked | SPECIFICATION_AMBIGUITY classification; canonical block register |
| Setup chain dependency | FAIL_SETUP cascading from one root | Root-cause triage grouped 14 failures under one fix |
| Missing-resource oracle unavailability | TC-API-155 blocked | TEST_DATA_SETUP_LIMITATION; not published as bug |
| Exploratory oracle limitations | 80 tests cannot be automatically pass/fail judged | Observational classification; human review of results |
| AI context / token costs | 32 prompts / substantial token investment | Staged artefact design with stable IDs |

## 14. Final Test Summary

| Metric | Final value |
| --- | ---: |
| Current features | 3 (FR-02, FR-07, FR-18) |
| AI_GENERATED logical tests | 105 |
| HUMAN_ADDED logical tests | 17 |
| Total logical tests | **122** |
| Planned executable | 114 |
| Canonical blocked | 8 |
| Authoritative Newman exit code | 1 |
| Newman PASS | 10 |
| Newman OBSERVED_EXPLORATORY | 80 |
| Newman FAIL_ASSERTION | 1 |
| Newman FAIL_SETUP | 23 |
| Successful/observed execution rate | 78.95% |
| Confirmed SUT defects | **2** |
| Confirmed documentation defects | **1** |
| Total confirmed defects | **3** |
| Published GitHub Issues | 3 |
| CI/CD | COMPLETE (passing + intentional-fail runs) |
| Agent Skill G9.5 | COMPLETE |
| Manual G9.5 diagram | PENDING |

## 15. Prompt / AI Interaction History

| Prompts | Count |
| --- | ---: |
| Numbered prompt files (Prompt-001 through Prompt-030, plus 028B and 030B) | 32 |
| Prompt-log entries | 32 |
| Phases covered | Requirement extraction, test basis, domain/EP/BVA, test design, human audit, student extension, test data, execution planning, Postman build, smoke, Admin resolution, full execution, triage, bug reporting, CI/CD, Agent Skill |

The suffix prompts (028B, 030B) address mid-project resolution requirements and are counted separately from their base prompts in naming. They are not renumbered as sequential prompts.

## 16. Conclusion

All three selected API features have complete logical test design, Postman implementation, Newman execution, failure triage, and defect evidence. The project demonstrates that test completeness and SUT correctness are different: a trustworthy suite records genuine failures rather than hiding them. The authoritative Newman run remains as-is with 24 failures — explained, not hidden — and the two confirmed SUT defects remain open as GitHub Issues #1 and #2.

The final deliverables provide traceable requirement-to-testcase coverage, human-audited AI-generated logical tests, student-authored human extension tests, a static-validated Postman collection, authoritative Newman evidence, root-cause triage documentation, three verified GitHub Issues, a working CI/CD pipeline, and a reusable Agent Skill design for AI-driven API test generation.

## Appendices

- Appendix A: [`ai/AI_audit_report.md`](ai/AI_audit_report.md)
- Appendix B: [`ai/AI_critique.md`](ai/AI_critique.md)
- Appendix C: [`analysis/current-selected-suite/`](analysis/current-selected-suite/)
- Appendix D: [`analysis/execution-triage/triage-summary.md`](analysis/execution-triage/triage-summary.md)
- Appendix E: [`bugs/`](bugs/)
- Appendix F: [`evidence/ci/ci-summary.md`](evidence/ci/ci-summary.md)
- Appendix G: [`agent-skill/README.md`](agent-skill/README.md)
- Appendix H: [`prompts/prompt-log.md`](prompts/prompt-log.md)

## Signature

| Field | Value |
| --- | --- |
| Student name (printed) | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Date | 2026-08-30 |
| Signature | Nguyen Minh Khoi |
