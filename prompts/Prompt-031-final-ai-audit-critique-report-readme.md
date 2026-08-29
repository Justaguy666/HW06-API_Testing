# Prompt 031 — Complete AI Audit Report, AI Critique, Final Report, and README from Provided Templates

You are continuing my HW06 – API Testing project.

This is the final documentation phase before the repository-wide compliance audit.

Current project state:

```text
REQUIREMENT ANALYSIS:
COMPLETE

VERIFIED TEST BASIS:
COMPLETE

DOMAIN / EP / BVA:
COMPLETE

AI LOGICAL TEST DESIGN:
105 / 105 — COMPLETE

HUMAN AUDIT:
COMPLETE

STUDENT EXTENSION:
17 HUMAN_ADDED — COMPLETE

TOTAL LOGICAL TESTS:
122

EXECUTION FEASIBILITY:
114 EXECUTABLE / 8 CANONICALLY BLOCKED — COMPLETE

POSTMAN:
COMPLETE

SMOKE EXECUTION:
COMPLETE

AUTHORITATIVE NEWMAN EXECUTION:
COMPLETE

EXECUTION TRIAGE:
COMPLETE

CONFIRMED DEFECTS:
3

GITHUB ISSUES:
3 / 3 — COMPLETE

BUG SCREENSHOTS:
COMPLETE

CI/CD:
COMPLETE

AGENT SKILL G9.5:
COMPLETE

FINAL DOCUMENTATION:
NOT STARTED
```

Prompt 030B repaired:

```text
Prompt 030 full-text preservation:
COMPLETE

Agent Skill defect-count consistency:
COMPLETE
```

---

# 1. Purpose

Complete these final submission-facing documentation artifacts:

```text
AI_audit_report
AI_critique
Final report
README
```

using the templates supplied together with this prompt.

The goal is:

```text
Existing repository evidence
        +
Provided templates
        ↓
Fact-checked final documentation
        ↓
AI transparency
        +
Human contribution evidence
        +
Test-design summary
        +
Execution summary
        +
Defect summary
        +
CI/CD summary
        +
Agent Skill summary
        ↓
READY_FOR_FINAL_COMPLIANCE_AUDIT
```

This prompt is DOCUMENTATION ONLY.

Do not redesign the tests.

Do not rerun the full API suite.

Do not change confirmed defect classifications.

Do not rewrite historical evidence.

---

# 2. Template Authority

I will provide one or more template files with this prompt.

The templates are authoritative for:

```text
section order
required headings
required tables
required fields
formatting expectations
```

You MUST inspect every provided template before editing repository documentation.

Do NOT replace the template structure with your own preferred format.

Do NOT remove template sections merely because information is unavailable.

If a template field cannot be supported by repository evidence:

```text
state the limitation explicitly
```

instead of inventing content.

---

# 3. Template Discovery

At the beginning, identify all files supplied with this prompt and determine which correspond to:

```text
AI_audit_report
AI_critique
report
README
```

Report:

| Deliverable  | Template Detected | Template Path / Name |
| ------------ | ----------------- | -------------------- |
| AI Audit     |                   |                      |
| AI Critique  |                   |                      |
| Final Report |                   |                      |
| README       |                   |                      |

If multiple variants exist, inspect them before choosing.

Do not silently ignore a supplied template.

---

# 4. Existing Repository Is the Factual Source

Use repository evidence as the source of truth.

Important sources include, but are not limited to:

```text
analysis/
analysis/current-selected-suite/
analysis/execution-triage/

test-data/

postman/
postman-plan/

reports/newman/
reports/ci/

evidence/

bugs/

agent-skill/

ci/

prompts/
prompts/prompt-log.md

.github/workflows/
```

Use:

```text
eshop-sut/api_specification.md
eshop-sut/setup_guide.md
eshop-sut/README.md
```

only where relevant to documented requirements/setup facts.

Do not invent project facts from memory.

---

# 5. Preserve Historical Truth

Do not rewrite historical results to reflect later fixes.

For example:

```text
Prompt 026 authoritative run:
PASS = 10
OBSERVED_EXPLORATORY = 80
FAIL_ASSERTION = 1
FAIL_SETUP = 23
```

must remain the authoritative historical first full run.

Later Prompt 027 triage explained/fixed some setup failures, but it must NOT rewrite Prompt 026 as if those failures never occurred.

Use language such as:

```text
The authoritative initial run recorded 23 FAIL_SETUP results.

Subsequent triage showed that 14 of these were caused by
one Postman order-provisioning defect, while 8 depended on
a specification ambiguity and 1 remained a setup limitation.
```

---

# 6. Canonical Current Scope

The final selected feature scope is:

```text
FR-02 — Login and Account Lockout
FR-07 — Cart
FR-18 — Order Management (Admin)
```

FR-09 is historical/superseded only.

Do not list FR-09 as a current selected feature.

---

# 7. Canonical Logical-Test Counts

Use:

```text
AI_GENERATED:
105

HUMAN_ADDED:
17

TOTAL LOGICAL TESTS:
122
```

Feature totals:

```text
FR-02:
41

FR-07:
41

FR-18:
40
```

Do not claim 129 tests as the final current suite.

129 belongs to an earlier historical stage.

---

# 8. AI Test Quota

The current AI-generated quota is:

```text
FR-02:
35

FR-07:
35

FR-18:
35

TOTAL:
105 / 105
```

Student-added tests are additional and must not be counted toward the AI quota.

---

# 9. HUMAN_ADDED Provenance

Current student-authored extension:

```text
17 accepted HUMAN_ADDED tests
```

Feature distribution:

```text
FR-02:
6

FR-07:
6

FR-18:
5
```

These originated from student proposals before Codex integration.

Preserve:

```text
Origin = HUMAN_ADDED
```

Do not describe them as AI-generated.

Do not describe rejected proposal FR18-05 as an accepted testcase.

---

# 10. Human Audit

Document the human-review process accurately.

Important facts:

```text
AI recommendations were advisory.

Human review retained the final authority.

Exploratory tests were not automatically considered incomplete.

Logical tests were reviewed for:
VALID
INVALID
INCOMPLETE
```

Do not imply the AI self-approved its own generated tests.

---

# 11. Domain / EP / BVA Findings

Important final principle:

```text
BVA accepted boundaries across current selected scope:
0
```

This is NOT missing work.

The specifications did not provide defensible specification-backed numeric/length boundaries for the selected APIs.

Use:

```text
BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC
```

where appropriate.

Do not reinterpret robustness representatives such as:

```text
4096 characters
-1
1.5
1000000000000
```

as specification boundaries.

---

# 12. Execution Feasibility

Final planning state:

```text
LOGICAL TESTS:
122

PLANNED EXECUTABLE:
114

CANONICAL BLOCKED:
8
```

Canonical blocked IDs:

```text
TC-API-092
TC-API-093
TC-API-118
TC-API-121
TC-API-127
TC-API-128
TC-API-164
TC-API-181
```

Do not claim that all 122 were executable.

---

# 13. Postman Implementation

Document:

```text
Executable logical testcase units represented:
114

Canonical blocked tests documented:
8

Original HTTP request items at Prompt 023:
148
```

After triage setup improvements, the collection structure changed.

If reporting the current collection count, derive it from the CURRENT artifact rather than assuming the Prompt-023 value.

Do not confuse:

```text
logical testcase count
```

with:

```text
HTTP request count
```

because sequence tests and setup requests create multiple HTTP requests.

---

# 14. X-Student-Id

The assignment requirement:

```text
X-Student-Id
```

was included in all API requests.

Key verified facts include:

```text
Prompt 023 static validation:
missing header = 0

Prompt 026 authoritative runtime:
167 requests checked
missing header = 0
empty resolved header = 0
```

Actual student ID must remain redacted from public documentation/evidence unless the template explicitly requires it and assignment rules permit it.

Do not expose private values unnecessarily.

---

# 15. Controlled Smoke

Summarize Prompt 024 accurately:

```text
Smoke logical tests:
9

PASS:
3

OBSERVED_EXPLORATORY:
4

BLOCKED_RUNTIME_PREREQUISITE:
2
```

The two runtime-blocked cases were due to Admin authentication at that stage.

Prompt 025 subsequently resolved this prerequisite.

Do not call those two smoke results product bugs.

---

# 16. Admin Prerequisite Resolution

Prompt 025 established:

```text
Root cause:
ACCOUNT_STATE_PROBLEM
```

The legitimate Admin fixture existed.

Earlier incorrect/conflicting credential attempts caused failed-login state and temporary lock.

The lock expired normally.

No:

```text
authentication bypass
direct password mutation
direct role promotion
brute force
```

was used.

---

# 17. Authoritative Full Newman Run

Use the Prompt 026 facts exactly:

```text
Newman exit code:
1

Logical tests accounted:
114 / 114

PASS:
10

OBSERVED_EXPLORATORY:
80

FAIL_ASSERTION:
1

FAIL_SETUP:
23

FAIL_REQUEST:
0

INCOMPLETE_SEQUENCE:
0

BLOCKED_RUNTIME_PREREQUISITE:
0
```

Successful/observed:

```text
90 / 114
78.95%
```

Raw:

```text
Requests:
167

Request failures:
0

Assertions:
173

Assertion failures:
1

Setup requests:
11

Setup failures:
2
```

Do not falsely describe this run as all-pass.

---

# 18. Execution Triage

Prompt 027 reduced 27 candidate findings:

```text
26 runtime candidates
1 documentation candidate
```

into:

```text
Confirmed SUT defects:
2

Confirmed documentation defects:
1

Postman implementation defects:
1 — FIXED

Test-data/setup limitation roots:
1

Specification ambiguity roots:
1
```

Do not say:

```text
3 confirmed SUT defects
```

The correct classification is:

```text
2 SUT
+
1 documentation
=
3 total confirmed defects
```

---

# 19. Confirmed Defects

## DEFECT-001

```text
Type:
SECURITY

Severity:
HIGH

Finding:
Authenticated non-Admin users can access Admin order operations.

Affected evidence:
TC-API-047
TC-API-055 targeted verification

GitHub Issue:
#1
```

## DEFECT-002

```text
Type:
ROBUSTNESS

Severity:
MEDIUM

Finding:
POST /api/login returns an unhandled HTTP 500 when
the expected JSON body is unavailable.

Detected by:
TC-API-011
TC-API-078

GitHub Issue:
#2
```

## DEFECT-003

```text
Type:
DOCUMENTATION

Severity:
LOW

Finding:
setup_guide.md and README.md provide conflicting credentials
for the same seeded Admin identity.

GitHub Issue:
#3
```

Do not expose the Admin passwords.

---

# 20. Bug Evidence

Final bug reporting state:

```text
Confirmed defects:
3

Markdown bug reports:
3

Genuine screenshots:
3

GitHub Issues:
3

Secret exposures:
0
```

Do not classify non-defect triage findings as bugs.

---

# 21. CI/CD

CI/CD is COMPLETE.

Passing representative regression subset:

```text
TC-API-001
TC-API-130
TC-API-048
TC-API-173
```

Passing subset size:

```text
4 logical testcases
```

It intentionally excludes:

```text
confirmed defect tests
canonical blocked tests
SETUP-007 limitation
SETUP-014 ambiguity
```

This is a representative regression CI subset.

It is NOT evidence that all 114 executable tests pass.

---

# 22. Passing GitHub Actions Run

Use the real recorded values from:

```text
evidence/ci/passing-run.md
```

Known verified facts:

```text
RUN_ID:
33279580944

CONCLUSION:
success

Newman exit code:
0

Requests:
6

Assertions:
8

Assertion failures:
0
```

Use the repository-recorded run URL.

Do not invent or alter it.

---

# 23. Intentional-Fail CI

The second workflow is:

```text
CI_DEMO_ONLY
```

It does NOT correspond to a logical TC-API ID.

Use:

```text
RUN_ID:
33279644102

CONCLUSION:
failure

Newman exit code:
1

Assertions:
1

Intentional assertion failures:
1
```

Failure source:

```text
[CI-DEMO-FAIL] Intentional CI failure demonstration
```

This is intentional CI evidence.

It is NOT a product defect.

---

# 24. CI Screenshots

If the genuine CI screenshots are now available under:

```text
evidence/ci/
```

include them in the relevant report/README references where the template expects evidence.

Expected names may include:

```text
HW06-Newman-CI-success.png
HW06-Newman-intentional-failure.png
```

Verify actual filenames before referencing.

Do not invent screenshot paths.

---

# 25. Agent Skill G9.5

Document:

```text
Skill:
API Test Design Agent Skill

Short ID:
api-test-design
```

The skill includes:

```text
requirement extraction
evidence verification
verified test basis
domain/EP/BVA analysis
interaction/state/security analysis
logical testcase generation
duplicate control
human audit
student extension provenance
execution feasibility
execution interpretation
root-cause triage
```

---

# 26. Manual Diagram Rule

The architecture diagram must be student-drawn.

Before finalizing documentation, inspect:

```text
agent-skill/diagram-evidence/
```

If the student-created diagram now exists:

reference it.

If it does not exist:

state:

```text
MANUAL_DIAGRAM_PENDING
```

Do NOT generate it.

Do NOT fabricate completion.

---

# 27. Prompt / AI History

Use:

```text
prompts/prompt-log.md
```

and:

```text
prompts/Prompt-*.md
```

to describe the AI-assisted workflow.

Do not manually invent the number of prompts without deriving it.

Count:

```text
Prompt 001
...
Prompt 030
Prompt 030B
```

and any additional real prompt artifacts that exist.

---

# 28. AI Audit Report

Create/update the deliverable specified by the supplied AI Audit template.

Expected target should normally be something similar to:

```text
AI_audit_report.md
```

but use the template's intended repository path/name if explicitly specified.

The AI Audit should document at least where the template supports it:

```text
AI tools used
purpose of AI usage
major prompt phases
AI-generated artifacts
human review activities
AI mistakes discovered
AI corrections
student-authored work
provenance controls
AI limitations
verification mechanisms
evidence references
final responsibility
```

---

# 29. AI Audit — Required Honesty

The AI Audit must explicitly include important AI mistakes/corrections.

Examples from this project include:

```text
Initial scope leakage into FR-17 / FR-10
→ later reconciliation

FR-09 selected initially
→ switched to FR-07

Early human audit recommendations overly marked blockers as incomplete
→ later human review corrected exploratory validity interpretation

Prompt 021 considered 23 tests blocked before Postman
→ Prompt 022 separated missing oracle from execution impossibility
→ 16 became executable observationally

Prompt 023/026 order setup chain did not provision an order before discovery
→ Prompt 027 identified POSTMAN_IMPLEMENTATION_DEFECT
→ TRIAGE-FIX-001 fixed it

Prompt 030 prompt file was saved initially as a placeholder
→ Prompt 030B restored full verbatim prompt

Agent Skill example incorrectly implied 3 SUT defects
→ Prompt 030B corrected to 2 SUT + 1 documentation
```

This is important evidence that AI output was critically reviewed rather than blindly accepted.

---

# 30. AI Audit — Human Contributions

Clearly identify human/student contributions.

Include where supported:

```text
feature-selection decisions
human testcase audit
accept/reject/incomplete classifications
student-proposed HUMAN_ADDED tests
manual GitHub/device authentication approval
manual CI screenshot capture
manual Agent Skill diagram
final submission review
```

Do not attribute student work to AI.

---

# 31. AI Audit — Provenance

Discuss:

```text
AI_GENERATED
AI_ASSISTED_CANDIDATE
HUMAN_ADDED
```

and the rule:

```text
AI-assisted candidate cannot later be silently relabeled HUMAN_ADDED
```

Explain how the final 17 student tests preserve their origin.

---

# 32. AI Audit — Evidence References

Use repository-relative paths.

Examples:

```text
analysis/current-selected-suite/
test-data/
postman/
reports/newman/
analysis/execution-triage/
bugs/
evidence/
ci/
agent-skill/
prompts/
```

Do not write absolute:

```text
C:\Users\...
```

into final deliverables unless a template explicitly requires local environment detail.

---

# 33. AI Critique

Create/update the deliverable specified by the supplied AI Critique template.

Expected target usually resembles:

```text
AI_critique.md
```

Use the exact template structure.

The critique should evaluate AI performance, not merely praise it.

---

# 34. AI Critique — Required Areas

Where compatible with the template, evaluate:

```text
Strengths

Weaknesses

Hallucination risk

Over-generation / verbosity

Scope control

Requirement fidelity

Test-design quality

Traceability support

Security-test quality

Execution planning

Code/Postman quality

Failure diagnosis

Documentation quality

Human-review burden

Efficiency / token cost

Context-window limitations

How the workflow could be improved
```

---

# 35. AI Critique — Specific Weaknesses

Include concrete examples.

At minimum discuss:

### Scope drift

Early design produced cross-feature tests:

```text
FR-17
FR-10
```

which later required scope reconciliation.

### Over-classification of incompleteness

Early AI audit treated many exploratory/blocker cases as incomplete.

Human review improved this distinction.

### Testability vs requirement gap

Prompt 021 initially classified too many tests as blocked.

Prompt 022 improved reasoning by separating:

```text
missing oracle
```

from:

```text
execution impossible
```

### Harness defect

Order discovery assumed fixture existence rather than provisioning it.

### Documentation error

Prompt 030 initially stored a placeholder instead of the complete prompt.

### Factual consistency error

Agent Skill example incorrectly stated three SUT defects.

These show why human review is necessary.

---

# 36. AI Critique — Specific Strengths

Examples:

```text
stable IDs
strong provenance
traceability
blocker management
clear EP/BVA discipline
no invented boundaries
explicit exploratory semantics
root-cause grouping
secret handling
evidence preservation
CI green/red demonstration
```

Support claims with repository artifacts.

---

# 37. AI Critique — Token / Workflow Cost

Discuss the trade-off:

```text
high auditability
vs
high prompt count / token cost
```

This project used many staged prompts because each stage:

```text
generated
reviewed
reconciled
validated
executed
triaged
documented
```

separately.

Evaluate whether some stages could be consolidated safely in future.

Do not imply staged prompting was unnecessary if it materially improved auditability.

---

# 38. Final Report

Create/update the report specified by the provided report template.

Expected target may be:

```text
report.md
```

but follow the supplied template name/path.

The report should synthesize the entire assignment.

---

# 39. Final Report — Project Overview

Include:

```text
course / assignment context if supplied by template
selected API features
testing methodology
AI-first workflow
human review model
test-design scale
tooling
execution approach
defect findings
CI/CD
Agent Skill
```

Do not include unrelated course/project history.

---

# 40. Final Report — Test Design Summary

Accurately summarize:

```text
105 AI_GENERATED
17 HUMAN_ADDED
122 total
```

Include selected features and counts.

Discuss:

```text
EP
domain testing
BVA
interaction/state
security
exploratory testing
```

without inventing technique coverage.

---

# 41. Final Report — Human Audit

Explain:

```text
AI test generation
→ human audit
→ correction/reconciliation
→ student extension
```

This is central to the assignment.

---

# 42. Final Report — Execution

Include both:

```text
execution planning:
114 executable / 8 canonical blocked
```

and:

```text
authoritative initial Newman result
```

Do not collapse these into a simple "90 passed".

Use result classes correctly:

```text
PASS
OBSERVED_EXPLORATORY
FAIL_ASSERTION
FAIL_SETUP
```

---

# 43. Final Report — Failure Triage

Explain why:

```text
26 runtime candidates
+
1 documentation candidate
```

did not become 27 bugs.

Show root-cause grouping and final result:

```text
2 SUT defects
1 documentation defect
1 fixed Postman defect
1 setup limitation
1 specification ambiguity
```

This is a significant testing-quality finding.

---

# 44. Final Report — Bugs

Summarize Issues:

```text
#1 — Security / Broken Access Control
#2 — Robustness / HTTP 500 login handling
#3 — Documentation / conflicting Admin credentials
```

Use real GitHub links from repository artifacts if the template expects links.

Do not manually type URLs from memory if mappings exist.

---

# 45. Final Report — CI/CD

Document both:

```text
real passing GitHub Actions run
real intentional-fail GitHub Actions run
```

Explain why the passing subset is only representative.

Do not state that CI proves the entire suite passes.

---

# 46. Final Report — Agent Skill

Summarize G9.5.

If manual diagram exists:

include/reference it according to template.

If missing:

do not fabricate it.

---

# 47. Final Report — Limitations

Discuss real limitations:

```text
incomplete specification
lack of contract-backed BVA boundaries
order-transition ambiguity
missing-resource setup limitations
exploratory oracle limitations
runtime state dependence
AI context/token costs
```

---

# 48. README

Create/update the root repository README according to the provided template.

The README should make the submission navigable.

It should not duplicate the entire final report.

---

# 49. README — Required Navigation

Where compatible with the template, link to:

```text
final report
AI audit
AI critique
prompt log
current selected suite
test data
Postman collection
Newman reports
triage
bug reports
GitHub issues
CI/CD
Agent Skill
diagram evidence
```

Use repository-relative links.

---

# 50. README — Quick Status

Provide a concise final status table.

Example factual content:

| Area                  | Status              |
| --------------------- | ------------------- |
| Current features      | FR-02, FR-07, FR-18 |
| AI tests              | 105                 |
| HUMAN_ADDED           | 17                  |
| Logical tests         | 122                 |
| Planned executable    | 114                 |
| Canonical blocked     | 8                   |
| Confirmed SUT defects | 2                   |
| Documentation defects | 1                   |
| GitHub issues         | 3                   |
| CI/CD                 | Complete            |
| Agent Skill           | Complete            |

If manual diagram exists:

```text
Manual G9.5 diagram:
Complete
```

Otherwise:

```text
Pending
```

Do not lie to make the table all green.

---

# 51. README — Repository Structure

Provide a concise directory map in text/code format if the template calls for one.

This is repository navigation, NOT the prohibited Agent Skill architecture diagram.

It is allowed to show a filesystem tree.

---

# 52. README — How to Run

Where template expects execution instructions, document defensibly:

```text
SUT startup
Postman import
environment configuration
Newman execution
CI workflows
```

Do not expose:

```text
Admin password
tokens
student ID
```

Use variables/placeholders.

---

# 53. README — Secrets

Explicitly state that private runtime values are excluded from Git.

Do not expose them in examples.

---

# 54. Template Placeholder Cleanup

After filling all four deliverables, scan for unresolved template placeholders such as:

```text
TODO
TBD
<fill here>
[Your Name]
[Insert ...]
Lorem ipsum
PLACEHOLDER
```

Do not remove a placeholder if it represents a genuinely student-only field that cannot be inferred.

Instead clearly flag it in the final response.

---

# 55. Cross-Document Consistency

The following facts must match across:

```text
AI_audit_report
AI_critique
report
README
```

Required facts:

```text
Current features:
FR-02, FR-07, FR-18

AI_GENERATED:
105

HUMAN_ADDED:
17

Logical:
122

Planned executable:
114

Canonical blocked:
8

Confirmed SUT defects:
2

Confirmed documentation defects:
1

Total confirmed defects:
3

GitHub issues:
3

CI/CD:
COMPLETE

Agent Skill:
COMPLETE
```

---

# 56. GitHub Issue Consistency

Read:

```text
bugs/github-issues/issue-mapping.md
```

or equivalent final mapping.

Ensure all four deliverables use the actual issue numbers and URLs.

Do not fabricate GitHub URLs.

---

# 57. Prompt Fidelity / AI Log

Audit:

```text
prompts/prompt-log.md
```

against prompt files.

Important:

```text
Prompt 030 full text restored
Prompt 030B present
```

Do not claim perfect prompt-history completeness until verified.

Report any:

```text
missing prompt file
duplicate prompt-log entry
placeholder prompt
```

as a documentation blocker.

---

# 58. Prompt Count

Compute rather than assume:

```text
number of prompt files
number of prompt-log entries
```

Explain the counting convention if suffix prompts such as:

```text
028B
030B
```

are present.

Do not call Prompt 030B "Prompt 31".

---

# 59. AI-Generated Diagram Audit

The G9.5 requirement prohibits AI-generated architecture diagram.

Verify:

```text
agent-skill/
```

contains no AI-generated architecture diagram artifact.

If a manually drawn student diagram is now present:

it is allowed.

Document:

```text
Manual student diagram:
PRESENT
```

Do not describe it as AI-generated.

---

# 60. Security / Privacy Audit

Scan final documentation for:

```text
plaintext passwords
JWTs
Bearer tokens
GitHub auth tokens
student ID
private runtime environment values
```

Expected:

```text
FINAL_DOC_SECRET_EXPOSURES = 0
```

Sensitive values should remain:

```text
REDACTED
```

or variable placeholders.

---

# 61. Absolute Path Audit

Final submission-facing docs should avoid local absolute paths such as:

```text
C:\Users\LEGION 5\...
```

Use repository-relative paths.

Historical raw evidence may contain local context if already preserved, but final docs should not.

---

# 62. AI Audit Consistency Check

The AI Audit must not falsely claim:

```text
AI independently authored HUMAN_ADDED tests
AI-generated student diagram
all Newman tests passed
all logical tests executable
three SUT defects
BVA coverage existed
```

---

# 63. AI Critique Consistency Check

The critique must not be generic.

Require at least:

```text
5 concrete strengths
5 concrete weaknesses / risks
5 specific improvement recommendations
```

Each should connect to this project.

---

# 64. Report Consistency Check

The final report must distinguish:

```text
historical intermediate states
```

from:

```text
final current state
```

Examples:

```text
FR-09 historical
129-test historical suite
Prompt-026 initial failure counts
Prompt-027 post-triage interpretation
```

Do not accidentally present historical values as final values.

---

# 65. README Consistency Check

README should represent the FINAL submission state.

Historical details belong primarily in the report/audit.

Keep README concise and navigable.

---

# 66. Evidence Links

For report/audit claims where practical, reference repository artifacts such as:

```text
analysis/current-selected-suite/suite-reconciliation-summary.md
reports/newman/full/authoritative-execution-summary.md
analysis/execution-triage/triage-summary.md
bugs/bug-traceability.md
evidence/ci/ci-summary.md
agent-skill/README.md
prompts/prompt-log.md
```

Do not create broken links.

---

# 67. Template Fidelity Validation

For every deliverable compare against its provided template.

Report:

```text
required sections:
N

sections populated:
N

sections missing:
0
```

If the template has student-specific identity fields, preserve supplied values exactly.

Do not infer private identity data that is not supplied in template/project files.

---

# 68. Output Paths

Use paths specified by the templates.

If the templates do not dictate paths, use:

```text
AI_audit_report.md
AI_critique.md
report.md
README.md
```

at the repository root.

If pre-existing submission structure clearly places them elsewhere, preserve that structure.

Do not create duplicate competing copies.

---

# 69. Do Not Modify Historical Evidence

Do not modify content under these categories merely to make final documentation cleaner:

```text
reports/newman/full/authoritative-*
reports/newman/triage/
evidence/full-run/
evidence/smoke/
historical Prompt files
historical analysis artifacts
```

Documentation may reference them.

---

# 70. Do Not Rerun Full Test Suite

No new full Newman run is necessary.

No new bug triage is necessary.

No new GitHub issues are necessary.

This is documentation consolidation only.

---

# 71. README / Report Link Verification

Check every local Markdown link added to final docs.

Verify target paths exist.

Report:

```text
BROKEN_FINAL_DOC_LINKS = 0
```

Ignore external network availability for GitHub URLs, but ensure URL syntax/mappings match recorded real issue/run URLs.

---

# 72. Markdown Quality

Run appropriate checks for:

```text
malformed tables
broken code fences
trailing merge markers
accidental binary content
```

Run:

```powershell
git diff --check
```

Expected:

```text
PASS
```

---

# 73. Final Documentation Validation Artifact

Create:

```text
analysis/final-documentation-validation.md
```

Include:

```text
Template fidelity

Cross-document count consistency

Feature consistency

Defect consistency

GitHub mapping consistency

CI mapping consistency

Agent Skill consistency

Prompt-log consistency

Secret audit

Absolute-path audit

Broken-link audit

Placeholder audit
```

---

# 74. Quality Gate

Required:

| Check                         | Expected |
| ----------------------------- | -------- |
| AI Audit completed            | PASS     |
| AI Critique completed         | PASS     |
| Final report completed        | PASS     |
| README completed              | PASS     |
| Template structures preserved | PASS     |
| Current features correct      | PASS     |
| AI test count                 | 105      |
| HUMAN_ADDED count             | 17       |
| Logical total                 | 122      |
| Confirmed SUT defects         | 2        |
| Documentation defects         | 1        |
| Total defects                 | 3        |
| GitHub issues                 | 3        |
| CI/CD                         | COMPLETE |
| Agent Skill                   | COMPLETE |
| Prompt fidelity               | PASS     |
| Secret exposures              | 0        |
| Broken final-doc links        | 0        |
| Unsupported claims            | 0        |

---

# 75. Manual Diagram Gate

Before final status inspect the expected Agent Skill diagram path.

If a genuine manually drawn student diagram exists:

```text
MANUAL_G9_5_DIAGRAM:
COMPLETE
```

If absent:

```text
MANUAL_G9_5_DIAGRAM:
PENDING
```

Do NOT create it.

Its absence should be highlighted for Prompt 032.

---

# 76. Git Procedure

Before commit:

```powershell
git status --short
git diff --check
```

Stage ONLY final documentation and related validation/prompt artifacts.

Do not stage:

```text
private runtime environments
runtime DB changes
temporary screenshots
secret-bearing reports
unrelated files
```

Commit:

```text
docs: complete HW06 final reports and AI audit
```

Push normally.

Do not force push.

---

# 77. Save Prompt

Save this full Prompt 031 as:

```text
prompts/Prompt-031-final-ai-audit-critique-report-readme.md
```

Append exactly one Prompt 031 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–030B historical prompt text.

---

# 78. Completion Gate

Report:

```text
FINAL_DOCUMENTATION_COMPLETE
```

only when:

```text
AI Audit complete
AI Critique complete
Report complete
README complete
templates fully handled
cross-document counts consistent
no unsupported claims
no secrets
links valid
validation artifact created
```

Manual diagram may be independently reported as COMPLETE/PENDING.

---

# 79. Required Final Response Structure

Use exactly:

# Prompt 031 — Final Documentation

## 1. Executive Summary

Include:

```text
templates detected
AI Audit status
AI Critique status
Report status
README status
manual diagram status
validation status
```

## 2. Template Inventory

## 3. AI Audit Report

## 4. AI Critique

## 5. Final Report

## 6. README

## 7. Cross-Document Consistency

## 8. Prompt / AI Log Audit

## 9. Execution-Fact Validation

## 10. Defect-Fact Validation

## 11. CI/CD Validation

## 12. Agent Skill Validation

## 13. Manual Diagram Status

## 14. Secret / Privacy Audit

## 15. Link / Placeholder Audit

## 16. Documentation Validation

## 17. Git Commit

## 18. Final Documentation Status

Use:

```text
FINAL_DOCUMENTATION_COMPLETE
```

or:

```text
FINAL_DOCUMENTATION_INCOMPLETE
```

## 19. Current Project Status

Use:

```text
LOGICAL TEST DESIGN:
COMPLETE

POSTMAN / NEWMAN:
COMPLETE

BUG REPORTING:
COMPLETE

CI/CD:
COMPLETE

AGENT SKILL G9.5:
COMPLETE

FINAL AI AUDIT:
COMPLETE

AI CRITIQUE:
COMPLETE

FINAL REPORT:
COMPLETE

README:
COMPLETE

MANUAL G9.5 DIAGRAM:
COMPLETE / PENDING

FINAL COMPLIANCE AUDIT:
NOT STARTED
```

## 20. Machine-Usable Summary

End exactly:

```text
PROMPT_031_SUMMARY

Templates detected:
AI_AUDIT:
AI_CRITIQUE:
REPORT:
README:

AI Audit:
COMPLETE / INCOMPLETE

AI Critique:
COMPLETE / INCOMPLETE

Final report:
COMPLETE / INCOMPLETE

README:
COMPLETE / INCOMPLETE

Current features:
FR-02
FR-07
FR-18

AI_GENERATED:
105

HUMAN_ADDED:
17

Logical tests:
122

Planned executable:
114

Canonical blocked:
8

Confirmed SUT defects:
2

Confirmed documentation defects:
1

Total confirmed defects:
3

GitHub issues:
3

CI/CD:
COMPLETE

Agent Skill G9.5:
COMPLETE

Manual G9.5 diagram:
COMPLETE / PENDING

Prompt fidelity:
PASS / FAIL

Final doc secret exposures:
0

Broken final-doc links:
0

Unresolved template placeholders:

Validation:
PASS / FAIL

Git commit SHA:

Status:
FINAL_DOCUMENTATION_COMPLETE /
FINAL_DOCUMENTATION_INCOMPLETE

Next required prompt if complete:
PROMPT 032 — FINAL REPOSITORY COMPLIANCE, SUBMISSION, AND PACKAGING AUDIT
```

---

# 80. Final Constraints

* Follow the provided templates.
* Do not replace template structure.
* Do not invent unsupported information.
* Preserve historical truth.
* Use final current feature scope only.
* Preserve 105 AI_GENERATED.
* Preserve 17 HUMAN_ADDED.
* Preserve 122 logical tests.
* Preserve 114 planned executable and 8 canonical blocked.
* Preserve 2 confirmed SUT defects.
* Preserve 1 confirmed documentation defect.
* Preserve 3 total confirmed defects.
* Do not expose secrets.
* Do not expose Admin password.
* Do not expose student ID unnecessarily.
* Do not claim all Newman tests passed.
* Do not claim all logical tests executable.
* Do not claim the CI passing subset represents the full suite.
* Do not report the CI intentional failure as a SUT bug.
* Do not generate the manual G9.5 diagram.
* Do not alter existing GitHub Issues.
* Do not modify authoritative execution evidence.
* Do not rerun the full suite.
* Preserve AI/HUMAN provenance.
* Critique the AI critically, not cosmetically.
* Use repository-relative links in final documentation.

The objective is:

**Evidence-backed final documentation that accurately explains what AI did, what the student did, what was tested, what failed, what was learned, and what remains limited.**
