# Prompt 010 — AI-Assisted Extension Candidate Population

## 1. Executive Summary

| Metric | FR-02 | FR-09 | FR-18 | Total |
| --- | ---: | ---: | ---: | ---: |
| Candidates generated | 8 | 8 | 8 | 24 |
| Non-duplicate | 5 | 5 | 5 | 15 |
| Partial overlap but adds value | 3 | 3 | 3 | 9 |
| Blocked by spec | 5 | 4 | 4 | 13 |
| Ready for data design | 2 | 0 | 2 | 4 |
| Needs refinement | 1 | 4 | 2 | 7 |

All 24 worksheet slots are populated as `AI_ASSISTED_CANDIDATE`. None is adopted, labeled `HUMAN_ADDED`, or integrated into the 129-test suite.

## 2. Existing Suite Baseline

The duplicate baseline is TC-API-001–TC-API-129:

- Historical AI-generated cases: 129.
- Human decisions: 96 VALID, 33 INCOMPLETE, 0 INVALID.
- Final readiness: 27 READY, 15 BLOCKED, 87 EXPLORATORY_ONLY.
- Active quota-eligible cases: FR-02 35, FR-09 35, FR-18 35.
- Requirement traceability: 36/36 TB accounted for.
- Partition traceability: 91/91 EP accounted for.
- Confirmed UNTESTED_AND_TESTABLE EPs: 0.

Candidate novelty therefore depends on a new interaction, sequence, oracle, persistence relationship, recovery behavior, isolation focus, security focus, or production-risk focus—not a new literal or single-factor EP variant.

## 3. FR-02 Candidates

### STUDENT-FR02-01

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
After a failure sequence is applied to Account A while Account B remains nominal, submit valid login requests for both accounts and observe whether any lockout-related state or failure disclosure leaks across account boundaries.

Requirement / behavior being targeted:
Account-state isolation across credentials and repeated requests.

Why the existing AI suite may have missed or under-isolated this:
The suite covers repeated failures and locked-state behavior for one account, but it does not isolate whether that state is scoped independently across two accounts.

Existing closest AI testcase(s):
TC-API-013, TC-API-092

Existing testcase objective summary:
TC-API-013 characterizes repeated failures and any lock transition for one account. TC-API-092 characterizes login while that account is locked.

Why this candidate is not a duplicate:
This candidate adds Account A × Account B state isolation and a second-account control oracle; neither closest case observes cross-account effects.

Coverage delta:
NEW_ISOLATION_ORACLE + NEW_STATE_ORACLE

New coverage added:
STATE + ISOLATION + RISK_BASED

Expected test technique:
Risk-Based Testing

Spec evidence / TB:
TB-FR02-002, TB-FR02-003, TB-FR02-007. Lockout scope remains unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006, EP-FR02-007; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 — lockout trigger, duration, and failure contract are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-02

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Across a repeated non-matching-password sequence for one account, record the transport, schema, and disclosure characteristics at each step and compare whether the failure contract changes when any lockout state becomes observable.

Requirement / behavior being targeted:
Cross-request failure-contract consistency during state evolution.

Why the existing AI suite may have missed or under-isolated this:
The suite covers a single unsuccessful response and a repeated-failure state sequence separately, but it does not dedicate an oracle to failure-contract evolution across that sequence.

Existing closest AI testcase(s):
TC-API-013, TC-API-077, TC-API-094

Existing testcase objective summary:
TC-API-013 targets repeated-failure state behavior. TC-API-077 records one unsuccessful response contract. TC-API-094 compares disclosure for unknown-account and wrong-password classes.

Why this candidate is not a duplicate:
This candidate adds a step-by-step sequence and consistency/security oracle over the same account as state evolves; the existing cases do not compare response disclosure across attempt positions.

Coverage delta:
NEW_SEQUENCE + NEW_CONSISTENCY_ORACLE + NEW_SECURITY_ORACLE

New coverage added:
SEQUENCE + CONSISTENCY + SECURITY

Expected test technique:
Sequence Testing

Spec evidence / TB:
TB-FR02-003, TB-FR02-007. Failure and lockout details remain unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-007; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-002, BLK-FR02-004 — attempt threshold and failure response contract are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-03

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Submit one reproducibly malformed raw login request, then immediately submit a valid matching-credential request and verify the documented success contract while observing whether the malformed request leaves any visible residual effect.

Requirement / behavior being targeted:
Parser/error recovery followed by nominal authentication.

Why the existing AI suite may have missed or under-isolated this:
Malformed representation handling and nominal success are isolated in separate tests; the recovery relationship between consecutive requests is not a standalone objective.

Existing closest AI testcase(s):
TC-API-001, TC-API-088

Existing testcase objective summary:
TC-API-088 observes one malformed JSON request. TC-API-001 verifies the documented successful-login result for matching credentials.

Why this candidate is not a duplicate:
This candidate adds an ordered malformed → valid sequence and a recovery oracle on the second request rather than rechecking either request independently.

Coverage delta:
NEW_SEQUENCE + NEW_RECOVERY_ORACLE

New coverage added:
SEQUENCE + RECOVERY + ROBUSTNESS

Expected test technique:
Error Guessing

Spec evidence / TB:
TB-FR02-001, TB-FR02-004, TB-FR02-005, TB-FR02-006. Malformed-request behavior remains unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006; malformed representation has no new EP claimed.

Potential blocker:
BLK-FR02-004 — the first response status/schema is unspecified; the documented success oracle remains available for the second request.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
LOW

Execution feasibility:
READY_FOR_DATA_DESIGN

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-04

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
After a controlled sequence of failed login attempts that does not assume a threshold, submit a matching-credential login and compare its status plus required token/user elements with the baseline successful-login contract.

Requirement / behavior being targeted:
Success-contract consistency after prior authentication failures.

Why the existing AI suite may have missed or under-isolated this:
The suite studies failed-attempt reset behavior and success schema separately, but it does not isolate the post-failure success contract as a cross-request contract oracle.

Existing closest AI testcase(s):
TC-API-074, TC-API-075, TC-API-076, TC-API-091

Existing testcase objective summary:
TC-API-074–076 isolate documented success status, token, and user information. TC-API-091 studies whether success resets prior failed attempts.

Why this candidate is not a duplicate:
This candidate compares the complete documented success contract before and after a failure history; TC-API-091 focuses on counter state rather than response-contract consistency.

Coverage delta:
NEW_SEQUENCE + NEW_SCHEMA_ORACLE + NEW_CONSISTENCY_ORACLE

New coverage added:
SEQUENCE + SCHEMA + CONSISTENCY

Expected test technique:
Contract Testing

Spec evidence / TB:
TB-FR02-004, TB-FR02-005, TB-FR02-006, TB-FR02-007. Counter behavior remains unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006, EP-FR02-007; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-002, BLK-FR02-004, BLK-FR02-005 — failure-state setup and full user/error schemas are incomplete.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
MEDIUM

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-05

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
When an account has an observable lockout-related condition, submit the login request with both matching credentials and an otherwise undocumented Authorization header, then observe precedence, disclosure, and any account-state effect.

Requirement / behavior being targeted:
Authorization-header × account-state security interaction on login.

Why the existing AI suite may have missed or under-isolated this:
The existing suite isolates an Authorization header on login and locked-account behavior independently, without combining them as a security-precedence objective.

Existing closest AI testcase(s):
TC-API-012, TC-API-092

Existing testcase objective summary:
TC-API-012 observes the effect of Authorization on a nominal login request. TC-API-092 characterizes matching-credential login while an account is locked.

Why this candidate is not a duplicate:
This candidate exercises Authorization-header presence × locked-account state and adds precedence plus state-observation oracles absent from both isolated cases.

Coverage delta:
NEW_INTERACTION + NEW_SECURITY_ORACLE + NEW_STATE_ORACLE

New coverage added:
INTERACTION + SECURITY + STATE

Expected test technique:
Security Testing

Spec evidence / TB:
TB-FR02-001, TB-FR02-007. Request Authorization and lockout precedence remain unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006, EP-FR02-015; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-002, BLK-FR02-003, BLK-FR02-004, BLK-ALL-001 — lockout and security mappings are unavailable.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-06

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Issue two coordinated successful login requests for the same account and compare status, required response elements, user identity, and token relationship without asserting whether token values must match.

Requirement / behavior being targeted:
Concurrent successful-login response and token consistency.

Why the existing AI suite may have missed or under-isolated this:
Repeated successful login is represented sequentially, while coordinated overlap and its response-consistency risk are not isolated.

Existing closest AI testcase(s):
TC-API-001, TC-API-089

Existing testcase objective summary:
TC-API-001 verifies one successful login. TC-API-089 compares token behavior across repeated successful logins without a concurrency relationship.

Why this candidate is not a duplicate:
This candidate adds coordinated-request interaction and a cross-response consistency oracle; it does not merely repeat the sequential token comparison.

Coverage delta:
NEW_INTERACTION + NEW_CONSISTENCY_ORACLE + NEW_RISK_FOCUS

New coverage added:
INTERACTION + CONSISTENCY + RISK_BASED

Expected test technique:
Robustness Testing

Spec evidence / TB:
TB-FR02-004, TB-FR02-005, TB-FR02-006. Token relationship under coordinated requests remains unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-006 — JWT lifecycle and issuance relationships are unspecified.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-07

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
For one account with an email representation suitable for normalization observation, alternate baseline and case/whitespace variants across successful login attempts and compare returned user identity consistency without asserting normalization rules.

Requirement / behavior being targeted:
Credential-representation × returned-identity consistency.

Why the existing AI suite may have missed or under-isolated this:
Case and whitespace handling are covered independently, while their relationship to the user identity returned across requests is not isolated.

Existing closest AI testcase(s):
TC-API-076, TC-API-084, TC-API-086

Existing testcase objective summary:
TC-API-084 observes surrounding email whitespace. TC-API-086 observes email case normalization. TC-API-076 checks that successful login includes user information.

Why this candidate is not a duplicate:
This candidate adds a cross-request identity-consistency oracle linking representation behavior to the returned user object, rather than retesting acceptance of each variant.

Coverage delta:
NEW_INTERACTION + NEW_CONSISTENCY_ORACLE

New coverage added:
INTERACTION + CONSISTENCY + AUTHENTICATION

Expected test technique:
Pairwise / Interaction Testing

Spec evidence / TB:
TB-FR02-002, TB-FR02-006, TB-FR02-007. Email normalization and user-schema details remain unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-002, EP-FR02-006; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-001, BLK-FR02-005 — normalization rules and user identity schema are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
READY_FOR_DATA_DESIGN

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR02-08

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Capture a token from a documented successful login, pass the same account through an observable failed-attempt/lockout/recovery sequence, then perform another successful login and compare the pre- and post-sequence token artifacts without asserting lifecycle rules.

Requirement / behavior being targeted:
Token issuance relationship across account-state recovery.

Why the existing AI suite may have missed or under-isolated this:
Token comparison across repeated successes and lockout recovery are covered separately, but the intervening state sequence is not part of the token-comparison objective.

Existing closest AI testcase(s):
TC-API-089, TC-API-091, TC-API-093

Existing testcase objective summary:
TC-API-089 compares tokens across repeated successes. TC-API-091 studies success after failures. TC-API-093 observes login after any lock duration.

Why this candidate is not a duplicate:
This candidate adds the full success → failure/lockout → recovery → success sequence and a persistence relationship between token artifacts on both sides.

Coverage delta:
NEW_SEQUENCE + NEW_PERSISTENCE_ORACLE + NEW_STATE_ORACLE

New coverage added:
SEQUENCE + PERSISTENCE + STATE

Expected test technique:
State Transition Testing

Spec evidence / TB:
TB-FR02-004, TB-FR02-006, TB-FR02-007. Lockout and JWT lifecycle details remain unspecified.

Relevant EP:
EP-FR02-001, EP-FR02-006, EP-FR02-007; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR02-002, BLK-FR02-003, BLK-FR02-006 — lockout setup/recovery and token lifecycle are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

## 4. FR-09 Candidates

### STUDENT-FR09-01

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Using one coupon lifecycle, perform Admin creation, a nominal application observation, Admin deletion, and a second application attempt, then compare resource visibility and application behavior across the sequence.

Requirement / behavior being targeted:
Coupon management-to-application lifecycle persistence.

Why the existing AI suite may have missed or under-isolated this:
Creation, application, and deletion exist as separate logical objectives, but their cross-endpoint lifecycle relationship is not isolated.

Existing closest AI testcase(s):
TC-API-014, TC-API-033, TC-API-039

Existing testcase objective summary:
TC-API-033 covers Admin creation once body validity is known. TC-API-014 covers nominal application once eligibility/formula are known. TC-API-039 verifies Admin deletion of an existing coupon.

Why this candidate is not a duplicate:
This candidate adds create → apply → delete → reapply sequencing plus persistence across management and application endpoints.

Coverage delta:
NEW_SEQUENCE + NEW_PERSISTENCE_ORACLE

New coverage added:
SEQUENCE + PERSISTENCE + BUSINESS_RULE

Expected test technique:
Sequence Testing

Spec evidence / TB:
TB-FR09-001, TB-FR09-005, TB-FR09-011, TB-FR09-012, TB-FR09-013, TB-FR09-014, TB-FR09-015. Lifecycle behavior detail remains unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010, EP-FR09-024, EP-FR09-037, EP-FR09-041; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-001, BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 — creation validity, applicability, calculation, and responses are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-02

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Apply the same coupon in an interleaved User A → User B → User A sequence and observe whether any usage state appears user-scoped, coupon-scoped, or shared without asserting a usage rule.

Requirement / behavior being targeted:
Interleaved cross-user usage-state isolation.

Why the existing AI suite may have missed or under-isolated this:
The suite covers repeat use by one user and use across two users separately, but does not isolate an interleaved sequence returning to the first user.

Existing closest AI testcase(s):
TC-API-108, TC-API-110

Existing testcase objective summary:
TC-API-108 observes repeated application by the same user. TC-API-110 observes application of the same coupon across two user identities.

Why this candidate is not a duplicate:
This candidate adds A → B → A ordering and a state-isolation oracle that can distinguish cross-user interference from independent single-user behavior.

Coverage delta:
NEW_SEQUENCE + NEW_STATE_ORACLE + NEW_ISOLATION_ORACLE

New coverage added:
SEQUENCE + STATE + ISOLATION

Expected test technique:
State Transition Testing

Spec evidence / TB:
TB-FR09-004, TB-FR09-005. Per-user usage behavior remains unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 — eligibility, usage persistence, and response details are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-03

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Submit an application whose body user_id and authenticated identity are intentionally misaligned, then retry with aligned identity and otherwise unchanged coupon/total conditions, observing recovery and whether the first request consumed visible usage state.

Requirement / behavior being targeted:
Identity-mismatch failure recovery and side-effect isolation.

Why the existing AI suite may have missed or under-isolated this:
Identity mismatch and repeated use are isolated, while retry recovery and potential state consumption after mismatch are not a dedicated objective.

Existing closest AI testcase(s):
TC-API-107, TC-API-108

Existing testcase objective summary:
TC-API-107 characterizes authenticated identity versus body user_id mismatch. TC-API-108 observes repeated application state for one user.

Why this candidate is not a duplicate:
This candidate adds mismatch → corrected retry ordering, a recovery oracle, and a state-consumption check after the first request.

Coverage delta:
NEW_SEQUENCE + NEW_RECOVERY_ORACLE + NEW_STATE_ORACLE

New coverage added:
SEQUENCE + RECOVERY + STATE

Expected test technique:
Error Guessing

Spec evidence / TB:
TB-FR09-004, TB-FR09-005. Application authentication/identity behavior remains unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010, EP-FR09-016; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-004, BLK-FR09-005, BLK-FR09-006 — identity authorization, usage effects, and failure response are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-04

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
For one coupon/user condition, submit two ordered applications with distinct documented-number total classes and compare response-amount relationships plus any usage-state effect without asserting a formula or threshold.

Requirement / behavior being targeted:
Total-amount variation × repeated-use state and response consistency.

Why the existing AI suite may have missed or under-isolated this:
Total representations, response fields, and repeated use are covered separately, while their ordered interaction is not isolated.

Existing closest AI testcase(s):
TC-API-099, TC-API-108, TC-API-111, TC-API-112

Existing testcase objective summary:
TC-API-099 observes response amount types. TC-API-108 targets repeated use. TC-API-111–112 characterize below/equal stored minimum-order relations.

Why this candidate is not a duplicate:
This candidate links total variation across a sequence to both response consistency and usage-state observation; existing cases isolate those dimensions.

Coverage delta:
NEW_INTERACTION + NEW_CONSISTENCY_ORACLE + NEW_STATE_ORACLE

New coverage added:
INTERACTION + CONSISTENCY + STATE

Expected test technique:
Pairwise / Interaction Testing

Spec evidence / TB:
TB-FR09-003, TB-FR09-005, TB-FR09-006, TB-FR09-007. Formula, thresholds, and usage effects remain unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-002, BLK-FR09-003, BLK-FR09-005, BLK-FR09-006 — eligibility, formula, usage, and response types are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-05

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Create one coupon through the Admin operation, observe the Admin coupon list, delete that coupon, and observe the list again to correlate resource identity and lifecycle visibility.

Requirement / behavior being targeted:
Coupon-management read-after-write persistence and identity correlation.

Why the existing AI suite may have missed or under-isolated this:
Admin create, list, and delete operations are covered independently, but no existing case links their observable resource lifecycle.

Existing closest AI testcase(s):
TC-API-029, TC-API-033, TC-API-039

Existing testcase objective summary:
TC-API-029 observes Admin-associated list access. TC-API-033 covers creation. TC-API-039 verifies deletion of an existing coupon.

Why this candidate is not a duplicate:
This candidate adds create → list → delete → list cross-request persistence and identity-correlation oracles across three operations.

Coverage delta:
NEW_SEQUENCE + NEW_PERSISTENCE_ORACLE + NEW_ISOLATION_ORACLE

New coverage added:
SEQUENCE + PERSISTENCE + ISOLATION

Expected test technique:
Contract Testing

Spec evidence / TB:
TB-FR09-008, TB-FR09-009, TB-FR09-010, TB-FR09-011, TB-FR09-012, TB-FR09-013, TB-FR09-014, TB-FR09-015. List/create response schemas remain unspecified.

Relevant EP:
EP-FR09-020, EP-FR09-024, EP-FR09-037, EP-FR09-041; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-001, BLK-FR09-006, BLK-FR09-007 — creation validity, response schema, and list role enforcement are incomplete.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-06

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Issue two coordinated applications of the same coupon/user/total condition and compare responses plus any observable usage effect without asserting idempotency or usage-limit behavior.

Requirement / behavior being targeted:
Coordinated duplicate-application risk and persistence.

Why the existing AI suite may have missed or under-isolated this:
Sequential repeated use exists, but coordinated overlap and its risk to usage-state consistency are not isolated.

Existing closest AI testcase(s):
TC-API-108

Existing testcase objective summary:
TC-API-108 characterizes sequential repeated application by the same user.

Why this candidate is not a duplicate:
This candidate adds coordinated-request interaction and a persistence/race-risk oracle rather than another sequential repetition.

Coverage delta:
NEW_INTERACTION + NEW_PERSISTENCE_ORACLE + NEW_RISK_FOCUS

New coverage added:
INTERACTION + PERSISTENCE + RISK_BASED

Expected test technique:
Robustness Testing

Spec evidence / TB:
TB-FR09-004, TB-FR09-005. Coordinated usage behavior remains unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 — eligibility, usage persistence, and response details are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-07

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Across independently established expired, minimum-order-related, and repeated-use conditions, record the response contract and compare whether status, schema, and disclosed reason remain distinguishable and internally consistent without asserting acceptance or rejection.

Requirement / behavior being targeted:
Cross-condition business-failure response consistency.

Why the existing AI suite may have missed or under-isolated this:
Each business condition has an exploratory case, while the suite lacks a dedicated cross-condition contract/disclosure comparison.

Existing closest AI testcase(s):
TC-API-108, TC-API-109, TC-API-111, TC-API-112

Existing testcase objective summary:
TC-API-108 observes repeated-use behavior. TC-API-109 observes an expired condition. TC-API-111–112 observe below/equal minimum-order relations.

Why this candidate is not a duplicate:
This candidate adds a common contract and disclosure oracle across multiple business conditions; it does not add another single-condition outcome test.

Coverage delta:
NEW_SCHEMA_ORACLE + NEW_CONSISTENCY_ORACLE + NEW_RISK_FOCUS

New coverage added:
SCHEMA + CONSISTENCY + RISK_BASED

Expected test technique:
Risk-Based Testing

Spec evidence / TB:
TB-FR09-005, TB-FR09-006, TB-FR09-007. Eligibility and error-contract details remain unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 — business-condition setup, usage, and response contracts are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR09-08

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Combine an authenticated-identity/body-user mismatch with an independently established coupon business-condition failure and observe which concern is surfaced first plus whether any usage state changes.

Requirement / behavior being targeted:
Authorization/identity × business-condition precedence.

Why the existing AI suite may have missed or under-isolated this:
Identity mismatch and business-condition behavior are isolated independently; their security/business precedence is not represented.

Existing closest AI testcase(s):
TC-API-107, TC-API-109, TC-API-111

Existing testcase objective summary:
TC-API-107 targets identity mismatch. TC-API-109 targets expiration condition. TC-API-111 targets a below-minimum relation.

Why this candidate is not a duplicate:
This candidate adds a deliberate security × business-rule interaction, precedence observation, and side-effect check absent from the independent cases.

Coverage delta:
NEW_INTERACTION + NEW_SECURITY_ORACLE + NEW_RISK_FOCUS

New coverage added:
INTERACTION + SECURITY + RISK_BASED

Expected test technique:
Security Testing

Spec evidence / TB:
TB-FR09-004, TB-FR09-005. Authentication identity and business-condition precedence remain unspecified.

Relevant EP:
EP-FR09-001, EP-FR09-006, EP-FR09-010, EP-FR09-016; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR09-002, BLK-FR09-004, BLK-FR09-005, BLK-FR09-006, BLK-ALL-001 — identity, eligibility, usage, response, and SEC mappings are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

## 5. FR-18 Candidates

### STUDENT-FR18-01

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
For two distinguishable existing orders, perform an allowed-if-known update on Order A followed by an allowed-if-known update on Order B, then read the Admin list and compare each order by ID for independent persistence.

Requirement / behavior being targeted:
Sequential multi-order mutation isolation and persistence.

Why the existing AI suite may have missed or under-isolated this:
The suite observes one target against a non-target control, but does not isolate two ordered mutations that should remain correlated to separate IDs.

Existing closest AI testcase(s):
TC-API-127, TC-API-128

Existing testcase objective summary:
TC-API-127 compares one targeted order with a non-target control. TC-API-128 observes one update through a later Admin list.

Why this candidate is not a duplicate:
This candidate adds A update → B update → list sequencing and verifies independent persistence of two mutations rather than one mutation plus an untouched control.

Coverage delta:
NEW_SEQUENCE + NEW_PERSISTENCE_ORACLE + NEW_ISOLATION_ORACLE

New coverage added:
SEQUENCE + PERSISTENCE + ISOLATION

Expected test technique:
Sequence Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-007, TB-FR18-008. Transition and persistence details remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009, EP-FR18-013–EP-FR18-017; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 — valid transitions, persistence, and response contracts are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-02

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Sandwich a non-Admin status-update attempt between two Admin operations on the same order, using Admin list observations before and after to verify authorization-side-effect isolation and recovery of the later authorized path.

Requirement / behavior being targeted:
Unauthorized mutation isolation within an authorized operation sequence.

Why the existing AI suite may have missed or under-isolated this:
Authorization rejection and update persistence are represented separately, while an unauthorized attempt embedded in an authorized sequence is not.

Existing closest AI testcase(s):
TC-API-055, TC-API-128

Existing testcase objective summary:
TC-API-055 verifies a non-Admin caller cannot update status. TC-API-128 observes one Admin update through a later list.

Why this candidate is not a duplicate:
This candidate adds authorized → unauthorized → authorized ordering, a recovery oracle, and state snapshots around the unauthorized operation.

Coverage delta:
NEW_SEQUENCE + NEW_RECOVERY_ORACLE + NEW_SECURITY_ORACLE + NEW_ISOLATION_ORACLE

New coverage added:
SEQUENCE + RECOVERY + SECURITY + ISOLATION

Expected test technique:
Security Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-008, TB-FR18-009, TB-FR18-010. Exact transition and failure contracts remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-006, EP-FR18-009; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-004, BLK-FR18-005, BLK-FR18-006 — transition setup and exact failure/success responses are incomplete.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-03

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Submit an update with a status outside the documented vocabulary, capture the order through the Admin list, then submit a documented target-status request and observe whether the valid-path request remains operable and correlated to the same order.

Requirement / behavior being targeted:
Validation-failure recovery and state continuity.

Why the existing AI suite may have missed or under-isolated this:
Invalid status rejection and documented target-status handling are isolated, but the recovery sequence on one order is not.

Existing closest AI testcase(s):
TC-API-050, TC-API-061, TC-API-128

Existing testcase objective summary:
TC-API-061 checks that an out-of-vocabulary status is not applied. TC-API-050 observes a documented target. TC-API-128 connects an update to a later list.

Why this candidate is not a duplicate:
This candidate adds invalid → read → documented-target sequencing and a recovery/state-continuity oracle after validation failure.

Coverage delta:
NEW_SEQUENCE + NEW_RECOVERY_ORACLE + NEW_STATE_ORACLE

New coverage added:
SEQUENCE + RECOVERY + STATE

Expected test technique:
Error Guessing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008. Valid transition details remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009, EP-FR18-013, EP-FR18-018; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 — source-to-target validity and response/persistence details are undefined.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
LOW

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-04

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Read one order, submit a same-state status update, and read again, comparing order identity, observed state, and response contract without asserting whether same-state updates must succeed.

Requirement / behavior being targeted:
Read-before/read-after consistency for same-state mutation.

Why the existing AI suite may have missed or under-isolated this:
Same-state update behavior and generic read-after-write persistence are separate cases; the suite does not isolate their combined idempotence/contract relationship.

Existing closest AI testcase(s):
TC-API-125, TC-API-128

Existing testcase objective summary:
TC-API-125 characterizes a target equal to current status. TC-API-128 characterizes persistence through later listing.

Why this candidate is not a duplicate:
This candidate adds explicit before/after snapshots around the same-state condition and a cross-request consistency oracle.

Coverage delta:
NEW_SEQUENCE + NEW_STATE_ORACLE + NEW_CONSISTENCY_ORACLE

New coverage added:
SEQUENCE + STATE + CONSISTENCY

Expected test technique:
State Transition Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-007, TB-FR18-008. Same-state semantics remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009, EP-FR18-013–EP-FR18-017; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 — idempotence, transition, and response rules are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
BLOCKED_BY_SPEC

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-05

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Using two independently established Admin identities, read the same order set and perform separate updates on distinguishable orders, then compare actor-independent authorization, response shape, and order identity correlation.

Requirement / behavior being targeted:
Multi-Admin actor consistency across read and mutation operations.

Why the existing AI suite may have missed or under-isolated this:
Admin versus non-Admin behavior is covered, but equivalently authorized actors are not compared across the same contract and resource set.

Existing closest AI testcase(s):
TC-API-046, TC-API-050, TC-API-117

Existing testcase objective summary:
TC-API-046 verifies one Admin can list orders. TC-API-050 observes one documented target update. TC-API-117 verifies that one Admin listing is system-wide.

Why this candidate is not a duplicate:
This candidate adds an authorized-actor interaction and consistency oracle across two Admin identities rather than another role failure.

Coverage delta:
NEW_INTERACTION + NEW_SECURITY_ORACLE + NEW_CONSISTENCY_ORACLE

New coverage added:
INTERACTION + SECURITY + CONSISTENCY

Expected test technique:
Risk-Based Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004, TB-FR18-005, TB-FR18-008, TB-FR18-009, TB-FR18-010. Multi-Admin equivalence remains unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-005, BLK-ALL-001 — transition/response details and SEC mappings are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
LOW

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-06

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
Coordinate an Admin order-list read with an Admin status update and then perform a follow-up list, recording whether each response is internally consistent and correlates the targeted order by ID without asserting snapshot atomicity.

Requirement / behavior being targeted:
Concurrent read/update cross-request consistency.

Why the existing AI suite may have missed or under-isolated this:
Repeated reads and update persistence are covered sequentially; coordinated read/update overlap and snapshot-consistency risk are not isolated.

Existing closest AI testcase(s):
TC-API-120, TC-API-128

Existing testcase objective summary:
TC-API-120 compares repeated Admin list reads without mutation. TC-API-128 observes an update followed by a list.

Why this candidate is not a duplicate:
This candidate adds coordinated read/write interaction and internal snapshot consistency; it does not repeat either sequential pattern.

Coverage delta:
NEW_INTERACTION + NEW_CONSISTENCY_ORACLE + NEW_RISK_FOCUS

New coverage added:
INTERACTION + CONSISTENCY + RISK_BASED

Expected test technique:
Robustness Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-008. Snapshot and persistence semantics remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 — transition, snapshot, persistence, and response details are undefined.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
EXPLORATORY

Duplicate Risk:
MEDIUM

Execution feasibility:
NEEDS_TEST_DATA_REFINEMENT

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-07

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
For an Admin update targeting one of at least two distinguishable orders, correlate the path ID, any identity exposed in the update response, and the matching entry in a subsequent Admin list without asserting undocumented response fields.

Requirement / behavior being targeted:
Path-to-response-to-list resource identity consistency.

Why the existing AI suite may have missed or under-isolated this:
Update response schema, target isolation, and persistence are covered separately, while resource identity correlation across all three observations is not a dedicated oracle.

Existing closest AI testcase(s):
TC-API-121, TC-API-127, TC-API-128

Existing testcase objective summary:
TC-API-121 observes the update response schema. TC-API-127 checks target/non-target isolation. TC-API-128 observes later list persistence.

Why this candidate is not a duplicate:
This candidate adds a contract-level identity-correlation oracle connecting path, response, and subsequent list, while preserving schema uncertainty.

Coverage delta:
NEW_SCHEMA_ORACLE + NEW_ISOLATION_ORACLE + NEW_CONSISTENCY_ORACLE

New coverage added:
SCHEMA + ISOLATION + CONSISTENCY

Expected test technique:
Contract Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-008. Update/list response identity fields remain unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-005, EP-FR18-009; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-001, BLK-FR18-005 — transition and response schemas are incomplete.

Expected oracle style:
OBSERVATIONAL

Evidence Strength:
PARTIAL

Duplicate Risk:
LOW

Execution feasibility:
READY_FOR_DATA_DESIGN

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

### STUDENT-FR18-08

```text
Candidate Origin:
AI_ASSISTED_CANDIDATE

Student Test Idea:
With two distinguishable orders, attempt a documented-status update on Order A as a non-Admin, then use an Admin list to compare Order A and control Order B for mutation isolation.

Requirement / behavior being targeted:
Authorization × target/non-target mutation isolation.

Why the existing AI suite may have missed or under-isolated this:
Non-Admin rejection and Admin target isolation are independent objectives; their combination with a two-order state oracle is not represented.

Existing closest AI testcase(s):
TC-API-055, TC-API-127, TC-API-129

Existing testcase objective summary:
TC-API-055 verifies non-Admin update denial. TC-API-127 observes target/non-target isolation for an Admin update. TC-API-129 studies authorization-versus-validation precedence.

Why this candidate is not a duplicate:
This candidate adds a two-order post-attempt state oracle specifically for authorization failure, rather than another rejection or precedence check.

Coverage delta:
NEW_INTERACTION + NEW_SECURITY_ORACLE + NEW_ISOLATION_ORACLE

New coverage added:
INTERACTION + SECURITY + ISOLATION

Expected test technique:
Pairwise / Interaction Testing

Spec evidence / TB:
TB-FR18-001, TB-FR18-002, TB-FR18-005, TB-FR18-007, TB-FR18-009, TB-FR18-010. Exact failure response remains unspecified.

Relevant EP:
EP-FR18-001, EP-FR18-006, EP-FR18-009, EP-FR18-013–EP-FR18-017; existing EP interaction only — no new EP claimed.

Potential blocker:
BLK-FR18-005, BLK-FR18-006 — exact failure status/schema and list/update response details are incomplete.

Expected oracle style:
PARTIAL

Evidence Strength:
PARTIAL

Duplicate Risk:
MEDIUM

Execution feasibility:
READY_FOR_DATA_DESIGN

Student Adoption Decision:
PENDING STUDENT DECISION

Student Adoption Reason:
PENDING STUDENT DECISION
```

## 6. Existing-Suite Duplicate Audit

| Candidate ID | Closest Existing TC | Same Objective? | New Interaction? | New Oracle? | New Sequence? | Final Duplicate Assessment |
| --- | --- | --- | --- | --- | --- | --- |
| STUDENT-FR02-01 | TC-API-013, TC-API-092 | NO | NO | YES | NO | NON_DUPLICATE |
| STUDENT-FR02-02 | TC-API-013, TC-API-077, TC-API-094 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR02-03 | TC-API-001, TC-API-088 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR02-04 | TC-API-074, TC-API-075, TC-API-076, TC-API-091 | PARTIAL | NO | YES | YES | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR02-05 | TC-API-012, TC-API-092 | NO | YES | YES | NO | NON_DUPLICATE |
| STUDENT-FR02-06 | TC-API-001, TC-API-089 | PARTIAL | YES | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR02-07 | TC-API-076, TC-API-084, TC-API-086 | PARTIAL | YES | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR02-08 | TC-API-089, TC-API-091, TC-API-093 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR09-01 | TC-API-014, TC-API-033, TC-API-039 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR09-02 | TC-API-108, TC-API-110 | PARTIAL | NO | YES | YES | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR09-03 | TC-API-107, TC-API-108 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR09-04 | TC-API-099, TC-API-108, TC-API-111, TC-API-112 | NO | YES | YES | NO | NON_DUPLICATE |
| STUDENT-FR09-05 | TC-API-029, TC-API-033, TC-API-039 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR09-06 | TC-API-108 | PARTIAL | YES | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR09-07 | TC-API-108, TC-API-109, TC-API-111, TC-API-112 | PARTIAL | NO | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR09-08 | TC-API-107, TC-API-109, TC-API-111 | NO | YES | YES | NO | NON_DUPLICATE |
| STUDENT-FR18-01 | TC-API-127, TC-API-128 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR18-02 | TC-API-055, TC-API-128 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR18-03 | TC-API-050, TC-API-061, TC-API-128 | NO | NO | YES | YES | NON_DUPLICATE |
| STUDENT-FR18-04 | TC-API-125, TC-API-128 | PARTIAL | NO | YES | YES | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR18-05 | TC-API-046, TC-API-050, TC-API-117 | NO | YES | YES | NO | NON_DUPLICATE |
| STUDENT-FR18-06 | TC-API-120, TC-API-128 | PARTIAL | YES | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |
| STUDENT-FR18-07 | TC-API-121, TC-API-127, TC-API-128 | NO | NO | YES | NO | NON_DUPLICATE |
| STUDENT-FR18-08 | TC-API-055, TC-API-127, TC-API-129 | PARTIAL | YES | YES | NO | PARTIAL_OVERLAP_BUT_ADDS_VALUE |

No candidate is `DUPLICATE_REJECTED`. Candidates with partial overlap retain a concrete new oracle, sequence, or interaction.

## 7. Cross-Candidate Duplicate Audit

| Candidate A | Candidate B | Overlap | Decision |
| --- | --- | --- | --- |
| STUDENT-FR02-01 | STUDENT-FR02-02 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-01 | STUDENT-FR02-03 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-01 | STUDENT-FR02-04 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-01 | STUDENT-FR02-05 | Shared NEW_STATE_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-01 | STUDENT-FR02-06 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-01 | STUDENT-FR02-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-01 | STUDENT-FR02-08 | Limited shared NEW_STATE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-02 | STUDENT-FR02-03 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR02-02 | STUDENT-FR02-04 | Shared NEW_SEQUENCE + NEW_CONSISTENCY_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-02 | STUDENT-FR02-05 | Limited shared NEW_SECURITY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-02 | STUDENT-FR02-06 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-02 | STUDENT-FR02-07 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-02 | STUDENT-FR02-08 | Shared NEW_SEQUENCE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-03 | STUDENT-FR02-04 | Shared NEW_SEQUENCE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-03 | STUDENT-FR02-05 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-03 | STUDENT-FR02-06 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-03 | STUDENT-FR02-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-03 | STUDENT-FR02-08 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR02-04 | STUDENT-FR02-05 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR02-04 | STUDENT-FR02-06 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-04 | STUDENT-FR02-07 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-04 | STUDENT-FR02-08 | Shared NEW_SEQUENCE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-05 | STUDENT-FR02-06 | Limited shared NEW_INTERACTION; distinct target relationship | DISTINCT |
| STUDENT-FR02-05 | STUDENT-FR02-07 | Limited shared NEW_INTERACTION; distinct target relationship | DISTINCT |
| STUDENT-FR02-05 | STUDENT-FR02-08 | Limited shared NEW_STATE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-06 | STUDENT-FR02-07 | Limited shared NEW_INTERACTION + NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR02-06 | STUDENT-FR02-08 | Shared feature risk; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR02-07 | STUDENT-FR02-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-01 | STUDENT-FR09-02 | Shared NEW_SEQUENCE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-01 | STUDENT-FR09-03 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR09-01 | STUDENT-FR09-04 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-01 | STUDENT-FR09-05 | Shared NEW_SEQUENCE + NEW_PERSISTENCE_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-01 | STUDENT-FR09-06 | Limited shared NEW_PERSISTENCE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-01 | STUDENT-FR09-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-01 | STUDENT-FR09-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-02 | STUDENT-FR09-03 | Limited shared NEW_SEQUENCE + NEW_STATE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-02 | STUDENT-FR09-04 | Limited shared NEW_STATE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-02 | STUDENT-FR09-05 | Limited shared NEW_SEQUENCE + NEW_ISOLATION_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-02 | STUDENT-FR09-06 | Shared feature risk; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-02 | STUDENT-FR09-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-02 | STUDENT-FR09-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-03 | STUDENT-FR09-04 | Limited shared NEW_STATE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-03 | STUDENT-FR09-05 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR09-03 | STUDENT-FR09-06 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-03 | STUDENT-FR09-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-03 | STUDENT-FR09-08 | Shared feature risk; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-04 | STUDENT-FR09-05 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-04 | STUDENT-FR09-06 | Shared NEW_INTERACTION; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-04 | STUDENT-FR09-07 | Shared NEW_CONSISTENCY_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR09-04 | STUDENT-FR09-08 | Limited shared NEW_INTERACTION; distinct target relationship | DISTINCT |
| STUDENT-FR09-05 | STUDENT-FR09-06 | Limited shared NEW_PERSISTENCE_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR09-05 | STUDENT-FR09-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-05 | STUDENT-FR09-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR09-06 | STUDENT-FR09-07 | Limited shared NEW_RISK_FOCUS; distinct target relationship | DISTINCT |
| STUDENT-FR09-06 | STUDENT-FR09-08 | Limited shared NEW_INTERACTION + NEW_RISK_FOCUS; distinct target relationship | DISTINCT |
| STUDENT-FR09-07 | STUDENT-FR09-08 | Shared NEW_RISK_FOCUS; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-01 | STUDENT-FR18-02 | Limited shared NEW_SEQUENCE + NEW_ISOLATION_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-01 | STUDENT-FR18-03 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR18-01 | STUDENT-FR18-04 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR18-01 | STUDENT-FR18-05 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-01 | STUDENT-FR18-06 | Shared feature risk; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-01 | STUDENT-FR18-07 | Limited shared NEW_ISOLATION_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-01 | STUDENT-FR18-08 | Shared NEW_ISOLATION_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-02 | STUDENT-FR18-03 | Limited shared NEW_SEQUENCE + NEW_RECOVERY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-02 | STUDENT-FR18-04 | Limited shared NEW_SEQUENCE; distinct target relationship | DISTINCT |
| STUDENT-FR18-02 | STUDENT-FR18-05 | Limited shared NEW_SECURITY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-02 | STUDENT-FR18-06 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-02 | STUDENT-FR18-07 | Limited shared NEW_ISOLATION_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-02 | STUDENT-FR18-08 | Shared NEW_SECURITY_ORACLE + NEW_ISOLATION_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-03 | STUDENT-FR18-04 | Shared NEW_SEQUENCE + NEW_STATE_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-03 | STUDENT-FR18-05 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-03 | STUDENT-FR18-06 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-03 | STUDENT-FR18-07 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-03 | STUDENT-FR18-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-04 | STUDENT-FR18-05 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-04 | STUDENT-FR18-06 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-04 | STUDENT-FR18-07 | Shared NEW_CONSISTENCY_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-04 | STUDENT-FR18-08 | No material objective/oracle overlap | DISTINCT |
| STUDENT-FR18-05 | STUDENT-FR18-06 | Shared NEW_INTERACTION + NEW_CONSISTENCY_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |
| STUDENT-FR18-05 | STUDENT-FR18-07 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-05 | STUDENT-FR18-08 | Limited shared NEW_INTERACTION + NEW_SECURITY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-06 | STUDENT-FR18-07 | Limited shared NEW_CONSISTENCY_ORACLE; distinct target relationship | DISTINCT |
| STUDENT-FR18-06 | STUDENT-FR18-08 | Limited shared NEW_INTERACTION; distinct target relationship | DISTINCT |
| STUDENT-FR18-07 | STUDENT-FR18-08 | Shared NEW_ISOLATION_ORACLE; objectives and operation sequences remain different | ACCEPTABLE_PARTIAL_OVERLAP |

All 84 within-feature pairs were compared. No pair requires `REPLACE`.

## 8. Coverage Delta Summary

| Coverage Delta | FR-02 Count | FR-09 Count | FR-18 Count |
| --- | ---: | ---: | ---: |
| NEW_INTERACTION | 3 | 3 | 3 |
| NEW_SEQUENCE | 4 | 4 | 4 |
| NEW_STATE_ORACLE | 3 | 3 | 2 |
| NEW_SECURITY_ORACLE | 2 | 1 | 3 |
| NEW_SCHEMA_ORACLE | 1 | 1 | 1 |
| NEW_PERSISTENCE_ORACLE | 1 | 3 | 1 |
| NEW_ISOLATION_ORACLE | 1 | 2 | 4 |
| NEW_RECOVERY_ORACLE | 1 | 1 | 2 |
| NEW_CONSISTENCY_ORACLE | 4 | 2 | 4 |
| NEW_RISK_FOCUS | 1 | 3 | 1 |

Counts are non-exclusive because one candidate may add multiple deltas.

## 9. Technique Diversity

| Feature | Primary Technique | Count | Candidate IDs |
| --- | --- | ---: | --- |
| FR-02 | Risk-Based Testing | 1 | STUDENT-FR02-01 |
| FR-02 | Sequence Testing | 1 | STUDENT-FR02-02 |
| FR-02 | Error Guessing | 1 | STUDENT-FR02-03 |
| FR-02 | Contract Testing | 1 | STUDENT-FR02-04 |
| FR-02 | Security Testing | 1 | STUDENT-FR02-05 |
| FR-02 | Robustness Testing | 1 | STUDENT-FR02-06 |
| FR-02 | Pairwise / Interaction Testing | 1 | STUDENT-FR02-07 |
| FR-02 | State Transition Testing | 1 | STUDENT-FR02-08 |
| FR-09 | Sequence Testing | 1 | STUDENT-FR09-01 |
| FR-09 | State Transition Testing | 1 | STUDENT-FR09-02 |
| FR-09 | Error Guessing | 1 | STUDENT-FR09-03 |
| FR-09 | Pairwise / Interaction Testing | 1 | STUDENT-FR09-04 |
| FR-09 | Contract Testing | 1 | STUDENT-FR09-05 |
| FR-09 | Robustness Testing | 1 | STUDENT-FR09-06 |
| FR-09 | Risk-Based Testing | 1 | STUDENT-FR09-07 |
| FR-09 | Security Testing | 1 | STUDENT-FR09-08 |
| FR-18 | Sequence Testing | 1 | STUDENT-FR18-01 |
| FR-18 | Security Testing | 1 | STUDENT-FR18-02 |
| FR-18 | Error Guessing | 1 | STUDENT-FR18-03 |
| FR-18 | State Transition Testing | 1 | STUDENT-FR18-04 |
| FR-18 | Risk-Based Testing | 1 | STUDENT-FR18-05 |
| FR-18 | Robustness Testing | 1 | STUDENT-FR18-06 |
| FR-18 | Contract Testing | 1 | STUDENT-FR18-07 |
| FR-18 | Pairwise / Interaction Testing | 1 | STUDENT-FR18-08 |

Each feature uses eight distinct primary techniques; no technique exceeds the maximum of two candidates.

## 10. Blocker Analysis

| Candidate ID | Existing Blocker IDs | Blocked/limited aspect | Execution Feasibility |
| --- | --- | --- | --- |
| STUDENT-FR02-01 | BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 | lockout trigger, duration, and failure contract are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR02-02 | BLK-FR02-002, BLK-FR02-004 | attempt threshold and failure response contract are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR02-03 | BLK-FR02-004 | the first response status/schema is unspecified; the documented success oracle remains available for the second request. | READY_FOR_DATA_DESIGN |
| STUDENT-FR02-04 | BLK-FR02-002, BLK-FR02-004, BLK-FR02-005 | failure-state setup and full user/error schemas are incomplete. | BLOCKED_BY_SPEC |
| STUDENT-FR02-05 | BLK-FR02-002, BLK-FR02-003, BLK-FR02-004, BLK-ALL-001 | lockout and security mappings are unavailable. | BLOCKED_BY_SPEC |
| STUDENT-FR02-06 | BLK-FR02-006 | JWT lifecycle and issuance relationships are unspecified. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR02-07 | BLK-FR02-001, BLK-FR02-005 | normalization rules and user identity schema are incomplete. | READY_FOR_DATA_DESIGN |
| STUDENT-FR02-08 | BLK-FR02-002, BLK-FR02-003, BLK-FR02-006 | lockout setup/recovery and token lifecycle are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR09-01 | BLK-FR09-001, BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 | creation validity, applicability, calculation, and responses are incomplete. | BLOCKED_BY_SPEC |
| STUDENT-FR09-02 | BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 | eligibility, usage persistence, and response details are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR09-03 | BLK-FR09-004, BLK-FR09-005, BLK-FR09-006 | identity authorization, usage effects, and failure response are undefined. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR09-04 | BLK-FR09-002, BLK-FR09-003, BLK-FR09-005, BLK-FR09-006 | eligibility, formula, usage, and response types are incomplete. | BLOCKED_BY_SPEC |
| STUDENT-FR09-05 | BLK-FR09-001, BLK-FR09-006, BLK-FR09-007 | creation validity, response schema, and list role enforcement are incomplete. | BLOCKED_BY_SPEC |
| STUDENT-FR09-06 | BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 | eligibility, usage persistence, and response details are undefined. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR09-07 | BLK-FR09-002, BLK-FR09-005, BLK-FR09-006 | business-condition setup, usage, and response contracts are incomplete. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR09-08 | BLK-FR09-002, BLK-FR09-004, BLK-FR09-005, BLK-FR09-006, BLK-ALL-001 | identity, eligibility, usage, response, and SEC mappings are incomplete. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR18-01 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | valid transitions, persistence, and response contracts are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR18-02 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005, BLK-FR18-006 | transition setup and exact failure/success responses are incomplete. | BLOCKED_BY_SPEC |
| STUDENT-FR18-03 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | source-to-target validity and response/persistence details are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR18-04 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | idempotence, transition, and response rules are undefined. | BLOCKED_BY_SPEC |
| STUDENT-FR18-05 | BLK-FR18-001, BLK-FR18-005, BLK-ALL-001 | transition/response details and SEC mappings are incomplete. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR18-06 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | transition, snapshot, persistence, and response details are undefined. | NEEDS_TEST_DATA_REFINEMENT |
| STUDENT-FR18-07 | BLK-FR18-001, BLK-FR18-005 | transition and response schemas are incomplete. | READY_FOR_DATA_DESIGN |
| STUDENT-FR18-08 | BLK-FR18-005, BLK-FR18-006 | exact failure status/schema and list/update response details are incomplete. | READY_FOR_DATA_DESIGN |

Blockers constrain oracle strength or setup. They are preserved and are not converted into requirements.

## 11. Priority Ranking

| Feature | Priority | Candidate ID | Risk / value focus | Duplicate Assessment | Feasibility |
| --- | ---: | --- | --- | --- | --- |
| FR-02 | 1 | STUDENT-FR02-01 | Account-state isolation across credentials and repeated requests. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-02 | 2 | STUDENT-FR02-02 | Cross-request failure-contract consistency during state evolution. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-02 | 3 | STUDENT-FR02-03 | Parser/error recovery followed by nominal authentication. | NON_DUPLICATE | READY_FOR_DATA_DESIGN |
| FR-02 | 4 | STUDENT-FR02-04 | Success-contract consistency after prior authentication failures. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | BLOCKED_BY_SPEC |
| FR-02 | 5 | STUDENT-FR02-06 | Concurrent successful-login response and token consistency. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | NEEDS_TEST_DATA_REFINEMENT |
| FR-02 | 6 | STUDENT-FR02-08 | Token issuance relationship across account-state recovery. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-02 | 7 | STUDENT-FR02-05 | Authorization-header × account-state security interaction on login. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-02 | 8 | STUDENT-FR02-07 | Credential-representation × returned-identity consistency. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | READY_FOR_DATA_DESIGN |
| FR-09 | 1 | STUDENT-FR09-01 | Coupon management-to-application lifecycle persistence. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-09 | 2 | STUDENT-FR09-05 | Coupon-management read-after-write persistence and identity correlation. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-09 | 3 | STUDENT-FR09-02 | Interleaved cross-user usage-state isolation. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | BLOCKED_BY_SPEC |
| FR-09 | 4 | STUDENT-FR09-03 | Identity-mismatch failure recovery and side-effect isolation. | NON_DUPLICATE | NEEDS_TEST_DATA_REFINEMENT |
| FR-09 | 5 | STUDENT-FR09-06 | Coordinated duplicate-application risk and persistence. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | NEEDS_TEST_DATA_REFINEMENT |
| FR-09 | 6 | STUDENT-FR09-04 | Total-amount variation × repeated-use state and response consistency. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-09 | 7 | STUDENT-FR09-08 | Authorization/identity × business-condition precedence. | NON_DUPLICATE | NEEDS_TEST_DATA_REFINEMENT |
| FR-09 | 8 | STUDENT-FR09-07 | Cross-condition business-failure response consistency. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | NEEDS_TEST_DATA_REFINEMENT |
| FR-18 | 1 | STUDENT-FR18-02 | Unauthorized mutation isolation within an authorized operation sequence. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-18 | 2 | STUDENT-FR18-01 | Sequential multi-order mutation isolation and persistence. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-18 | 3 | STUDENT-FR18-03 | Validation-failure recovery and state continuity. | NON_DUPLICATE | BLOCKED_BY_SPEC |
| FR-18 | 4 | STUDENT-FR18-07 | Path-to-response-to-list resource identity consistency. | NON_DUPLICATE | READY_FOR_DATA_DESIGN |
| FR-18 | 5 | STUDENT-FR18-08 | Authorization × target/non-target mutation isolation. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | READY_FOR_DATA_DESIGN |
| FR-18 | 6 | STUDENT-FR18-06 | Concurrent read/update cross-request consistency. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | NEEDS_TEST_DATA_REFINEMENT |
| FR-18 | 7 | STUDENT-FR18-04 | Read-before/read-after consistency for same-state mutation. | PARTIAL_OVERLAP_BUT_ADDS_VALUE | BLOCKED_BY_SPEC |
| FR-18 | 8 | STUDENT-FR18-05 | Multi-Admin actor consistency across read and mutation operations. | NON_DUPLICATE | NEEDS_TEST_DATA_REFINEMENT |

Priority 1 is the strongest AI recommendation within each feature. Ranking does not constitute student adoption.

## 12. Recommended Five Per Feature

```text
FR-02 Recommended Five:
STUDENT-FR02-01
STUDENT-FR02-02
STUDENT-FR02-03
STUDENT-FR02-04
STUDENT-FR02-06

FR-09 Recommended Five:
STUDENT-FR09-01
STUDENT-FR09-05
STUDENT-FR09-02
STUDENT-FR09-03
STUDENT-FR09-06

FR-18 Recommended Five:
STUDENT-FR18-02
STUDENT-FR18-01
STUDENT-FR18-03
STUDENT-FR18-07
STUDENT-FR18-08
```

These are AI recommendations for student review only.

## 13. Authorship Boundary

```text
All 24 candidates are AI_ASSISTED_CANDIDATE.

None is labeled HUMAN_ADDED.

Student adoption/modification is still required.
```

The worksheet slot labels are not adopted test IDs and do not establish student authorship.

## 14. Validation

| Validation Item | Result |
| --- | --- |
| 24/24 slots populated | PASS |
| No `STUDENT TO COMPLETE` remains in candidate fields | PASS |
| Only Student Adoption Decision and Student Adoption Reason remain pending in candidate slots | PASS |
| Every candidate cites at least one existing TC-API ID | PASS |
| All closest TC IDs exist in TC-API-001–TC-API-129 | PASS |
| All cited TB IDs exist in the 36-item verified basis | PASS |
| All cited EP IDs exist, or existing-interaction/no-new-EP wording is used | PASS |
| All cited blocker IDs exist | PASS |
| No new requirement ID fabricated | PASS |
| No new EP ID fabricated | PASS |
| No BVA boundary claimed | PASS |
| No concrete test data generated | PASS |
| No API executed and no implementation inspected | PASS |
| Existing testcase design, audit worksheet, and coverage matrix unchanged | PASS |
| Candidate Origin is AI_ASSISTED_CANDIDATE for 24/24 | PASS |
| Duplicate Risk is LOW or MEDIUM for 24/24 | PASS |
| Duplicate-rejected candidates remaining | 0 |
| Cross-candidate pairs requiring replacement | 0 |

## 15. Current Status

```text
AI TEST GENERATION: COMPLETE
AI TEST QUOTA: COMPLETE
STUDENT HUMAN AUDIT: COMPLETE
HUMAN AUDIT CORRECTIONS: COMPLETE
EXTENSION REASSESSMENT: COMPLETE

AI-ASSISTED EXTENSION CANDIDATES: COMPLETE
STUDENT CANDIDATE ADOPTION: PENDING
STUDENT-ADDED EXTENSION: NOT YET SATISFIED

CONCRETE TEST DATA DESIGN: NOT STARTED
POSTMAN IMPLEMENTATION: NOT STARTED
API EXECUTION: NOT STARTED
```

## 16. Machine-Usable Summary

```text
PROMPT_010_SUMMARY

Candidates generated:
FR-02:
8
FR-09:
8
FR-18:
8

Recommended five:
FR-02:
STUDENT-FR02-01, STUDENT-FR02-02, STUDENT-FR02-03, STUDENT-FR02-04, STUDENT-FR02-06
FR-09:
STUDENT-FR09-01, STUDENT-FR09-05, STUDENT-FR09-02, STUDENT-FR09-03, STUDENT-FR09-06
FR-18:
STUDENT-FR18-02, STUDENT-FR18-01, STUDENT-FR18-03, STUDENT-FR18-07, STUDENT-FR18-08

Duplicate-rejected candidates remaining:
0

AI-assisted candidates:
24

Human-added accepted tests:
0

Student candidate adoption:
PENDING

Next required phase:
STUDENT REVIEW AND ADOPTION OF EXTENSION CANDIDATES
```
