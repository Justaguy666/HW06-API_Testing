# Prompt 022 — Resolve Postman Execution Scope and Blocker Strategy

You are continuing my HW06 – API Testing project for the EShop SUT.

Prompt 021 completed concrete test-data design for the final current logical suite.

Current selected features:

* FR-02 — Login and Account Lockout
* FR-07 — Cart
* FR-18 — Order Management (Admin)

Current suite:

```text
AI_GENERATED:
105

HUMAN_ADDED:
17

TOTAL ACTIVE LOGICAL TESTS:
122
```

Prompt 021 produced:

```text
DATA items:
47

SETUP items:
14

Data readiness:
STATIC_READY = 2
RUNTIME_PROVISION_REQUIRED = 33
STATE_SETUP_REQUIRED = 8
EXPLORATORY_PROBE_READY = 56
BLOCKED_BY_SPEC = 23
```

Postman readiness:

```text
DATA_READY_FOR_POSTMAN = 2
DATA_READY_BUT_EXPLORATORY = 56
POSTMAN_SETUP_REQUIRED = 41
BLOCKED_BEFORE_POSTMAN = 23
```

Overall result:

```text
NOT_READY_FOR_POSTMAN_IMPLEMENTATION
```

The blocking areas include specification gaps around:

```text
FR-02:
account lockout setup / reset / threshold semantics

FR-07:
Cart ownership
Cart lifecycle
resource availability / stock-related state

FR-18:
empty-order state
order status transition setup / reset

Shared:
security / traceability oracle limitations
```

---

# 1. Purpose

Determine the exact executable scope for Postman/Newman without inventing missing requirements.

The transformation is:

```text
122 logical tests
        ↓
Execution-feasibility audit
        ↓
READY
EXPLORATORY
RUNTIME_SETUP
BLOCKED
        ↓
Defensible Postman implementation scope
        ↓
READY_FOR_POSTMAN_BUILD
```

This prompt must:

1. review all 122 testcase data-readiness entries,
2. distinguish implementation blockers from oracle-only blockers,
3. determine which tests can safely be implemented despite exploratory semantics,
4. determine which runtime setups are achievable through documented operations,
5. isolate genuinely non-executable tests,
6. define a skip/block documentation strategy,
7. produce a concrete implementation manifest for Prompt 023.

Do not build Postman yet.

---

# 2. Authoritative Inputs

Use:

```text
eshop-sut/api_specification.md
eshop-sut/setup_guide.md

analysis/current-selected-suite/test-case-design.md
analysis/current-selected-suite/test-coverage-matrix.md
analysis/current-selected-suite/blocker-register.md
analysis/current-selected-suite/student-extension-integration-summary.md

test-data/README.md
test-data/static-data-catalog.md
test-data/runtime-data-catalog.md
test-data/testcase-data-matrix.md
test-data/postman-variable-plan.md
```

You may inspect other current canonical analysis artifacts when needed.

---

# 3. Important Distinction

Do not treat these as equivalent:

```text
ORACLE_UNSPECIFIED
```

and:

```text
EXECUTION_IMPOSSIBLE
```

A testcase may be executable even when its expected semantic result is unspecified.

Such tests should normally become:

```text
EXECUTABLE_EXPLORATORY
```

not:

```text
BLOCKED
```

---

# 4. Final Execution Classification

Classify every one of the 122 active tests into exactly one:

```text
EXECUTABLE_DETERMINISTIC
EXECUTABLE_EXPLORATORY
EXECUTABLE_WITH_RUNTIME_SETUP
BLOCKED_SETUP_UNAVAILABLE
BLOCKED_STATE_UNAVAILABLE
BLOCKED_SCOPE_OR_CHANNEL
```

Definitions:

## EXECUTABLE_DETERMINISTIC

Request/setup and deterministic assertions are sufficiently supported.

## EXECUTABLE_EXPLORATORY

Request can be executed, but one or more semantic outcomes remain observational.

## EXECUTABLE_WITH_RUNTIME_SETUP

Execution is possible after documented runtime setup/provisioning.

## BLOCKED_SETUP_UNAVAILABLE

Required resource/state cannot be established with documented operations.

## BLOCKED_STATE_UNAVAILABLE

Required state transition/state reset cannot be established defensibly.

## BLOCKED_SCOPE_OR_CHANNEL

The observation requires a channel outside the defined API-testing scope.

---

# 5. Reassess the 23 BLOCKED_BY_SPEC Tests

Prompt 021 classified 23 tests as blocked.

Review each one individually.

Required table:

| Test ID | Feature | Current Blocker | Setup Missing? | Oracle Missing? | Executable Request? | New Execution Classification | Reason |
| ------- | ------- | --------------- | -------------- | --------------- | ------------------- | ---------------------------- | ------ |

Critical rule:

```text
missing expected result alone
≠
execution blocker
```

If the request can be issued and meaningful observations can be recorded, reclassify as:

```text
EXECUTABLE_EXPLORATORY
```

where appropriate.

Do not change the logical testcase classification itself.

This is execution planning only.

---

# 6. Reassess the 41 POSTMAN_SETUP_REQUIRED Tests

Review whether each SETUP dependency can be performed using documented operations.

Required:

| Test ID / Group | SETUP-ID | Setup Operation | Documented? | Automatable? | Result |
| --------------- | -------- | --------------- | ----------- | ------------ | ------ |

Result:

```text
AUTOMATABLE
MANUAL_PRECONDITION
UNAVAILABLE
```

Do not invent setup APIs.

---

# 7. FR-02 Execution Feasibility

Audit all 41 current FR-02 tests.

Special attention:

### Nominal login

Determine how credentials are obtained.

### Fresh account

If registration is documented, define registration as supporting setup.

### Lockout

Separate:

```text
ability to send repeated failed login attempts
```

from:

```text
ability to prove exact lock threshold
```

Repeated attempts may still be executable exploratory even if threshold semantics are unspecified.

### Lock reset/unlock

If reset cannot be established reproducibly, keep specific reset-dependent tests blocked.

### Rate-control observation

This can remain exploratory as long as the request sequence is finite and observational.

Required FR-02 summary:

```text
DETERMINISTIC:
EXPLORATORY:
RUNTIME_SETUP:
BLOCKED:
```

---

# 8. FR-07 Execution Feasibility

Audit all 41 current FR-07 tests.

Special attention:

### Authentication

Determine whether normal-user token acquisition is documented.

### Existing product

Determine whether a documented endpoint can discover an existing product.

### Missing product

Determine whether absence can be verified defensibly.

### Cart mutation

Determine which tests can run with a fresh user/cart context.

### Ownership/isolation

If two users can be provisioned, determine whether ownership/isolation can at least be observed.

Do not invent the expected isolation rule.

### Availability/stock

If required stock state cannot be intentionally established, keep only those tests genuinely dependent on it blocked.

Required FR-07 summary:

```text
DETERMINISTIC:
EXPLORATORY:
RUNTIME_SETUP:
BLOCKED:
```

---

# 9. FR-18 Execution Feasibility

Audit all 40 current FR-18 tests.

Special attention:

### Admin identity

Determine how an administrator credential/token is obtained.

### Wrong-role identity

Determine whether a non-admin identity can be provisioned.

### Existing order

Determine whether a documented API path can discover or establish one.

### Missing order

Determine whether a candidate can be verified absent.

### Status update

Separate:

```text
sending a status update request
```

from:

```text
proving an allowed/forbidden transition
```

The former may be executable exploratory.

### Empty-order state

If no documented way exists to create an empty system/user context, preserve those tests as blocked.

### Traceability observation

If no in-scope API-visible observation channel exists, classify that specific testcase:

```text
BLOCKED_SCOPE_OR_CHANNEL
```

Required FR-18 summary:

```text
DETERMINISTIC:
EXPLORATORY:
RUNTIME_SETUP:
BLOCKED:
```

---

# 10. Blocker Categories

Normalize active execution blockers into:

```text
BLKEXEC-SETUP
BLKEXEC-STATE
BLKEXEC-RESET
BLKEXEC-IDENTITY
BLKEXEC-RESOURCE
BLKEXEC-OBSERVATION_CHANNEL
```

These are execution-planning categories only.

Do NOT create new requirement blocker IDs.

---

# 11. Postman Implementation Policy

Define how Prompt 023 should treat each execution class.

Required policy:

| Execution Class               | Build Request? | Build Tests?                                          | Newman Execution? |
| ----------------------------- | -------------- | ----------------------------------------------------- | ----------------- |
| EXECUTABLE_DETERMINISTIC      | YES            | Hard supported assertions                             | YES               |
| EXECUTABLE_EXPLORATORY        | YES            | Transport + observational capture                     | YES               |
| EXECUTABLE_WITH_RUNTIME_SETUP | YES            | Setup + supported assertions/observations             | YES               |
| BLOCKED_SETUP_UNAVAILABLE     | Document only  | NO executable request unless meaningful independently | SKIP              |
| BLOCKED_STATE_UNAVAILABLE     | Document only  | NO                                                    | SKIP              |
| BLOCKED_SCOPE_OR_CHANNEL      | Document only  | NO                                                    | SKIP              |

Do not fake passing assertions for blocked tests.

---

# 12. Exploratory Assertion Policy

For exploratory executable tests, Postman may verify only supported basics such as:

```text
request completed
response exists
response time was captured
headers/body were recorded
JSON parseability only when justified
```

Do not assert:

```text
status == 400
status == 200
specific error message
specific schema
```

without contract evidence.

Observations may be recorded into Newman output.

---

# 13. Deterministic Assertion Manifest

For every deterministic executable test identify which assertion classes are supported:

```text
TRANSPORT
STATUS
SCHEMA
SEMANTIC
STATE
SECURITY
```

Required table:

| Test ID | Supported Assertion Layers | Unsupported Layers |
| ------- | -------------------------- | ------------------ |

Do not invent unsupported layers.

---

# 14. Runtime Setup Manifest

Create:

```text
postman-plan/runtime-setup-manifest.md
```

Required schema:

| SETUP-ID | Purpose | Operation | Output Variables | Consumers | Automatable |
| -------- | ------- | --------- | ---------------- | --------- | ----------- |

This is planning only.

No Postman script yet.

---

# 15. Execution Manifest

Create:

```text
postman-plan/execution-manifest.md
```

One row per active testcase.

Required columns:

| Test ID | Feature | Origin | Execution Class | Request Built Later? | Newman Later? | Required Setup | Assertion Strategy | Skip Reason |
| ------- | ------- | ------ | --------------- | -------------------- | ------------- | -------------- | ------------------ | ----------- |

Rows:

```text
122
```

---

# 16. Blocked-Test Register

Create:

```text
postman-plan/blocked-test-register.md
```

Only include genuinely blocked tests.

Required:

| Test ID | Feature | Block Type | Missing Capability | Why It Cannot Be Implemented Defensibly | Evidence Needed to Unblock |
| ------- | ------- | ---------- | ------------------ | --------------------------------------- | -------------------------- |

Do not count exploratory tests as blocked merely for unspecified outcome.

---

# 17. Coverage Impact of Skips

Calculate:

```text
Logical tests:
122

Executable tests:
N

Blocked/skipped:
M
```

with:

```text
N + M = 122
```

Then by feature:

| Feature | Logical | Executable | Blocked |
| ------- | ------: | ---------: | ------: |
| FR-02   |      41 |            |         |
| FR-07   |      41 |            |         |
| FR-18   |      40 |            |         |
| TOTAL   |     122 |            |         |

---

# 18. Assignment Compliance Interpretation

Distinguish:

```text
Logical testcase design requirement
```

from:

```text
Executable testcase limitation caused by missing specification/setup capability
```

Do not delete logical tests merely because execution is blocked.

Preserve them as evidence that the design identified missing testability.

---

# 19. X-Student-Id Policy

Every request built in Prompt 023 must include:

```text
X-Student-Id: {{student_id}}
```

Supporting setup requests must also include it where applicable.

Required validation:

```text
Planned executable requests missing student header:
0
```

---

# 20. Postman Folder Plan

Create a logical collection structure plan:

```text
HW06 API Testing
│
├── 00 - Setup
│
├── FR-02 - Login and Lockout
│   ├── Deterministic
│   ├── Exploratory
│   └── Stateful
│
├── FR-07 - Cart
│   ├── GET Cart
│   ├── POST Cart
│   └── Sequence
│
└── FR-18 - Admin Order Management
    ├── List Orders
    ├── Update Status
    └── Sequence / State
```

This is a plan only.

Do not create Postman JSON yet.

---

# 21. Test Naming Convention

Plan:

```text
[TC-API-NNN] <Title>
```

For example:

```text
[TC-API-165] Observe handling of an extreme-length email representation
```

Do not rename testcase IDs.

---

# 22. Newman Reporting Strategy

Plan to generate later:

```text
CLI output
JSON report
HTML report
```

where supported by installed Newman/reporters.

Do not run Newman now.

---

# 23. Evidence Strategy

Identify evidence categories needed later:

```text
Postman collection
Postman environment
Newman CLI
Newman HTML
request/response evidence
X-Student-Id evidence
bug evidence
CI evidence
```

Do not fabricate screenshots.

---

# 24. Create postman-plan Directory

Create:

```text
postman-plan/
├── README.md
├── execution-manifest.md
├── runtime-setup-manifest.md
├── blocked-test-register.md
└── collection-structure.md
```

---

# 25. README.md

Document:

* execution-class definitions,
* blocker policy,
* exploratory assertion policy,
* supported assertion principle,
* skip policy,
* X-Student-Id requirement,
* downstream Prompt 023 contract.

---

# 26. Update Test-Data Readiness

Update:

```text
test-data/testcase-data-matrix.md
```

only by adding execution-planning status where needed.

Do not alter underlying DATA mappings.

---

# 27. Update Canonical Coverage

Update:

```text
analysis/current-selected-suite/test-coverage-matrix.md
```

with:

```text
Execution Feasibility
```

section.

Keep logical coverage separate from executable coverage.

---

# 28. Readiness Gate

Prompt 022 is successful if the Postman implementation scope is now fully defined even if some tests remain blocked.

Therefore:

```text
READY_FOR_POSTMAN_BUILD
```

does NOT mean:

```text
all 122 tests executable
```

It means:

```text
every test is classified
+
every executable test has a setup/assertion strategy
+
every blocked test has a defensible documented skip reason
```

---

# 29. Required Final Response Structure

Use exactly:

# Prompt 022 — Resolve Postman Execution Scope and Blocker Strategy

## 1. Executive Summary

Include:

* logical tests = 122,
* executable tests,
* blocked tests,
* reclassified Prompt-021 blocked tests,
* Postman-build readiness.

## 2. Execution Classification Method

## 3. Prompt-021 Blocked-Test Reassessment

23 tests.

## 4. Runtime-Setup Reassessment

## 5. FR-02 Execution Feasibility

## 6. FR-07 Execution Feasibility

## 7. FR-18 Execution Feasibility

## 8. Execution Blocker Register

## 9. Deterministic Assertion Manifest

## 10. Exploratory Assertion Policy

## 11. Runtime Setup Manifest

## 12. Execution Manifest

122 rows.

## 13. Feature Execution Summary

## 14. Skip / Block Policy

## 15. Postman Folder Plan

## 16. X-Student-Id Plan

## 17. Newman Reporting Plan

## 18. Evidence Plan

## 19. Quality Validation

## 20. Postman Build Readiness

Use:

```text
READY_FOR_POSTMAN_BUILD
```

or:

```text
NOT_READY_FOR_POSTMAN_BUILD
```

## 21. Current Project Status

Use:

```text
LOGICAL TEST DESIGN:
122 TESTS — COMPLETE

CONCRETE TEST DATA:
COMPLETE

EXECUTION FEASIBILITY:
COMPLETE

POSTMAN BUILD:
NOT STARTED

NEWMAN EXECUTION:
NOT STARTED
```

## 22. Machine-Usable Summary

End exactly:

```text
PROMPT_022_SUMMARY

Logical tests:
122

Execution classification:
EXECUTABLE_DETERMINISTIC:
EXECUTABLE_EXPLORATORY:
EXECUTABLE_WITH_RUNTIME_SETUP:
BLOCKED_SETUP_UNAVAILABLE:
BLOCKED_STATE_UNAVAILABLE:
BLOCKED_SCOPE_OR_CHANNEL:

Executable total:

Blocked total:

FR-02:
Logical: 41
Executable:
Blocked:

FR-07:
Logical: 41
Executable:
Blocked:

FR-18:
Logical: 40
Executable:
Blocked:

Prompt-021 blocked tests reassessed:
23

Moved from blocked to executable exploratory:

Remaining genuinely blocked:

Execution manifest rows:
122

Missing execution classification:
0

Executable requests planned without X-Student-Id:
0

Postman implemented:
NO

Newman executed:
NO

Readiness:
READY_FOR_POSTMAN_BUILD / NOT_READY_FOR_POSTMAN_BUILD

Next required prompt if ready:
PROMPT 023 — BUILD POSTMAN COLLECTION, ENVIRONMENT, AND TEST SCRIPTS
```

---

# 30. Important Constraints

* Do not generate new logical testcases.
* Do not delete blocked logical testcases.
* Do not invent missing specification rules.
* Do not build Postman yet.
* Do not execute API calls.
* Do not use implementation behavior as requirement truth.
* Missing oracle does not automatically mean blocked execution.
* Preserve all 122 test IDs.
* Preserve AI/HUMAN origins.
* Do not invent lockout thresholds.
* Do not invent Cart ownership behavior.
* Do not invent stock/availability rules.
* Do not invent order transitions.
* Do not invent empty-state setup.
* Do not invent audit channels.
* Do not fake assertions for blocked tests.
* All future executable requests must carry X-Student-Id.

The objective is:

**122 Logical Tests → Defensible Executable/Blocked Partition → Postman Build Manifest**

not:

**Force all 122 tests to execute by inventing missing behavior**.

---

# 31. Output Artifacts

Create:

```text
postman-plan/README.md
postman-plan/execution-manifest.md
postman-plan/runtime-setup-manifest.md
postman-plan/blocked-test-register.md
postman-plan/collection-structure.md
```

Update only as necessary:

```text
test-data/testcase-data-matrix.md
analysis/current-selected-suite/test-coverage-matrix.md
```

Log:

```text
prompts/Prompt-022-resolve-postman-execution-scope.md
```

Append exactly one Prompt 022 entry to:

```text
prompts/prompt-log.md
```

Do not modify Prompt 001–021 historical prompt contents.
