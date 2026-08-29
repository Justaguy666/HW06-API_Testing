# HW06 API Testing — 23127070

Postman/Newman API testing suite and AI-driven test design for three EShop backend REST API features:

| Pool | Feature | Logical tests | Final status |
| --- | --- | ---: | --- |
| A | FR-02 — Login and Account Lockout | 41 | COMPLETE |
| B | FR-07 — Shopping Cart | 41 | COMPLETE |
| C | FR-18 — Order Management (Admin) | 40 | COMPLETE |

## Links

- Public repository: https://github.com/Justaguy666/HW06-API_Testing
- Main report: [`report.md`](report.md)
- AI Audit Report: [`ai/AI_audit_report.md`](ai/AI_audit_report.md)
- AI Critique: [`ai/AI_critique.md`](ai/AI_critique.md)
- AI Prompt Log: [`prompts/prompt-log.md`](prompts/prompt-log.md)
- Agent Skill G9.5 Design: [`agent-skill/README.md`](agent-skill/README.md)
- Diagram Drawing Guide: [`agent-skill/diagram-drawing-guide.md`](agent-skill/diagram-drawing-guide.md)
- Bug Traceability: [`bugs/bug-traceability.md`](bugs/bug-traceability.md)
- CI Summary: [`evidence/ci/ci-summary.md`](evidence/ci/ci-summary.md)

## Test Summary

| Metric | Actual value |
| --- | ---: |
| Selected features | 3 |
| AI_GENERATED logical tests | 105 |
| HUMAN_ADDED logical tests | 17 |
| **Total logical test cases** | **122** |
| Planned executable tests | 114 |
| Canonical blocked tests | 8 |
| Authoritative Newman exit code | 1 |
| Successful / observed execution rate | 78.95% (90 / 114) |
| Confirmed SUT defects | 2 |
| Confirmed documentation defects | 1 |
| **Total confirmed defects** | **3** |
| GitHub Issues | 3, all published and verified |
| Unresolved automation defects | 0 |
| CI/CD Pipeline | COMPLETE (passing + intentional-fail runs) |
| Agent Skill G9.5 | COMPLETE |

### Per-Feature Logical Test Breakdown

| Feature | AI_GENERATED | HUMAN_ADDED | Total Logical | Planned Executable | Blocked |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-02 | 35 | 6 | 41 | 39 | 2 |
| FR-07 | 35 | 6 | 41 | 40 | 1 |
| FR-18 | 35 | 5 | 40 | 35 | 5 |
| **Total** | **105** | **17** | **122** | **114** | **8** |

Logical testcases and HTTP requests are reported separately. 114 executable logical testcase units are implemented via Postman.

## Repository Structure

```text
HW06-API_Testing/
├── .github/workflows/        # CI/CD Workflows (newman-ci.yml, newman-intentional-fail.yml)
├── agent-skill/              # Agent Skill G9.5 specification, workflow, pseudocode, policy
│   └── diagram-evidence/     # Manual diagram placeholder (api-test-design-agent-diagram.png)
├── ai/                       # AI Audit Report and AI Critique
├── analysis/                 # Analysis artifacts & selected suite reconciliations
├── bugs/                     # Confirmed defect reports, screenshots, and GitHub issue bodies
│   ├── reports/
│   ├── github-issues/
│   └── evidence/
├── ci/                       # CI documentation and traceability
├── evidence/                 # CI evidence snapshots and full-run evidence
├── postman/                  # Postman collection, environment, and validation scripts
│   ├── collections/
│   └── environments/
├── postman-plan/             # Implementation plan, execution manifest, blocked test register
├── prompts/                  # Full saved prompt files and prompt-log.md
├── reports/                  # Newman CLI/JSON execution reports
├── scripts/                  # CI runner scripts
└── test-data/                # Concrete test data catalogs and matrix
```

## Setup & Execution

### Local Prerequisites

```bash
# Verify Node.js environment
node -v
npm -v
```

Ensure EShop backend API is running locally (e.g. at `http://127.0.0.1:3000`).

### Environment Configuration

Copy environment template or set runtime variables:

```bash
# Variables (do not commit secrets)
export BASE_URL="http://127.0.0.1:3000"
export STUDENT_ID="23127070"
```

### Static Validation

Run the canonical static build validator to verify collection integrity, X-Student-Id headers, and zero secret exposures:

```bash
node postman/validation/validate-postman-build.js
```

Expected output: `PASS`

### Running Tests with Newman

Run the full collection via Newman:

```bash
npx --yes newman run postman/collections/HW06-API-Testing.postman_collection.json \
  -e postman/environments/HW06-local.postman_environment.json \
  --reporters cli,json
```

## Data-Driven & Logical Test Design

Test design follows a disciplined multi-stage workflow:
1. **Requirement Evidence Extraction:** Extracts explicit documented behavior from the EShop API spec (`eshop-sut/api_specification.md`).
2. **Verified Test Basis:** Normalizes requirements into test basis categories.
3. **Equivalence Partitioning:** Derives VALID, INVALID, CONDITIONAL, and EXPLORATORY partitions.
4. **Boundary Value Analysis:** Concluded `BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC` for all selected features — no spec-backed boundaries exist.
5. **Human Audit:** All 105 AI candidates received human review (VALID/INVALID/INCOMPLETE).
6. **Student Extension:** 17 testcases authored independently by the student with immutable `HUMAN_ADDED` provenance.

## Confirmed Defects & GitHub Issues

Three genuine defects were confirmed after root-cause failure triage:

| Defect ID | Severity | Type | Feature | Summary | GitHub Issue |
| --- | --- | --- | --- | --- | --- |
| DEFECT-001 | HIGH | Security | FR-18 | Authenticated non-Admin user can access Admin order operations | [#1](https://github.com/Justaguy666/HW06-API_Testing/issues/1) |
| DEFECT-002 | MEDIUM | Robustness | FR-02 | Login returns HTTP 500 when JSON body is missing or invalid | [#2](https://github.com/Justaguy666/HW06-API_Testing/issues/2) |
| DEFECT-003 | LOW | Documentation | Docs | Conflicting seeded Admin credentials in setup guide vs README | [#3](https://github.com/Justaguy666/HW06-API_Testing/issues/3) |

Full markdown reports and screenshots are archived in `bugs/`.

## CI/CD Integration

Two GitHub Actions workflows operate under `.github/workflows/`:
1. **HW06 Newman CI (`newman-ci.yml`):** Runs a representative passing regression subset of 4 logical testcases (6 requests) on push/PR.
   - Run ID: `33279580944` | Conclusion: `success` | Exit Code: `0`
2. **HW06 Newman Intentional Failure Demo (`newman-intentional-fail.yml`):** Demonstrates CI pipeline red-state handling (`CI_DEMO_ONLY`).
   - Run ID: `33279644102` | Conclusion: `failure` | Exit Code: `1`

## Agent Skill G9.5

Located in `agent-skill/`, the API Test Design Agent Skill documents the complete 16-stage pipeline for AI-assisted API test design, including algorithmic pseudocode, validation gates, AI provenance policy, and limitations.

**Manual Diagram Status:**
```text
MANUAL_G9_5_DIAGRAM: PENDING_STUDENT_MANUAL_DRAWING
```
The architecture diagram must be manually drawn by the student per assignment constraints; prose instructions are in `agent-skill/diagram-drawing-guide.md`.

## Secrets & Privacy Audit

All committed files have been audited:
- Hardcoded student ID in committed scripts: **0** (injected via `STUDENT_ID` environment secret)
- Plaintext passwords / tokens in committed collection: **0**
- Private runtime environment secrets committed: **0**

## Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| ---: | --- | ---: | ---: |
| 1 | Requirement Analysis & Test Basis | 15 | 15 |
| 2 | EP / BVA / Logical Test Design | 20 | 20 |
| 3 | Postman / Newman Execution & Triage | 20 | 20 |
| 4 | Bug Reporting & GitHub Issues | 15 | 15 |
| 5 | CI/CD Pipeline | 15 | 15 |
| 6 | Agent Skill G9.5 Design | 15 | 15 |
|  | **Total** | **100** | **100** |

## Signature

| Field | Value |
| --- | --- |
| Student name (printed) | Nguyen Minh Khoi |
| Student ID | 23127070 |
| Course | CS423 / CSC15003 - Software Testing |
| Assignment | HW06-AI - API Testing |
| Date | 2026-08-30 |
| Signature | Nguyen Minh Khoi |
