# Prompt 015 — FR-07 Initial Logical Testcase Generation

```text
FR-07 PRE-HUMAN-AUDIT SUITE:
FINALIZED BY PROMPT 016
```

## 1. Executive Summary

The finalized pre-human-audit FR-07 suite contains **35** sequential AI-generated logical testcases, `TC-API-130` through `TC-API-164`. Prompt 016 retained all 34 initial cases and added one independently valuable blocked interaction case for `INT-FR07-005`. All 35 are in scope and quota eligible, producing **35 / 35 — PASS**.

Classification is 5 POSITIVE, 0 NEGATIVE, 5 CONDITIONAL, and 25 EXPLORATORY. Readiness is 5 READY, 6 BLOCKED, and 24 EXPLORATORY_ONLY. All 36 EPs are accounted for: 27 directly covered, 3 covered through interactions, and 6 represented by blocked cases. Of 11 interactions, 6 are covered, 1 partial, and 4 blocked; the previously unrepresented blocked `INT-FR07-005` now has a dedicated case but remains blocked by specification gaps. All 13 TBs and 12 blockers are accounted for.

No BVA case, concrete payload, exact unsupported status, response field, ownership rule, persistence rule, duplicate-item rule, stock rule, or numerical boundary is introduced. The suite emphasizes isolated contracts, representation domains, authentication contexts, resource/state dependencies, sequences, and observational schema/semantic goals.

## 2. Generation Method

Cases were generated in this order: endpoint transport contracts; operation-purpose and request-contract coverage; endpoint-specific authentication; body/member EPs; price/quantity interaction; resource and ownership contexts; lifecycle and repeated/cross-operation sequences; focused response/schema observation. Each case has one primary objective, one primary technique, explicit oracle layers, and blocker-aware wording.

Documented method/path claims may use deterministic verification. Where acceptance, status, schema, state, ownership, calculation, or repeated behavior is unspecified, objectives use observe/characterize/record language. No case is labeled BVA because Prompt 014 accepted zero boundaries.

## 3. Stable ID Allocation

```text
Existing maximum testcase ID:
TC-API-129

First new FR-07 testcase ID:
TC-API-130

Allocated range:
TC-API-130 through TC-API-164

IDs allocated:
35
```

Historical testcase IDs, including superseded FR-09 cases, remain unchanged and are not reused.

## 4. FR-07 Initial Logical Test Suite

### TC-API-130 — GET Cart endpoint transport contract

- Test ID: TC-API-130
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: GET Cart endpoint transport contract
- Primary Objective: Verify that the documented Cart retrieval operation is addressed through the specified GET method and `/api/cart` path.
- Primary Technique: BUSINESS_RULE
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-001, TB-FR07-002
- PARAM / DIM Refs: PARAM-FR07-001, DIM-FR07-005
- EP Refs: EP-FR07-001, EP-FR07-032
- INT Refs: INT-FR07-001
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: POSITIVE
- Readiness: READY
- Preconditions: An authentication context matching the documented Bearer representation is available.
- Logical Input Condition: Documented GET Cart authentication and single-operation classes.
- Logical Action: Address the Cart retrieval operation using its documented method and path.
- Transport Oracle: SUPPORTED — method and path are explicit; no response status is asserted.
- Schema Oracle: UNSPECIFIED — no GET response shape is documented.
- Semantic Oracle: NOT_APPLICABLE — this case isolates endpoint transport.
- State Oracle: NOT_APPLICABLE
- Security Oracle: PARTIAL — documented authentication context is present; outcome rules are outside this objective.
- Expected Result Deterministic?: YES
- Exploratory Observation Goal: Record response details only as secondary observations without converting them into requirements.
- Why This Test Exists: Provides an independent hard oracle for the GET method/path contract.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: documented GET authentication context.
  Factor B / Sequence: one GET Cart invocation.
  Why not covered by standalone EP tests: the interaction establishes that the documented auth context accompanies the specific Cart operation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-131 — GET Cart retrieve-purpose contract

- Test ID: TC-API-131
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: GET Cart retrieve-purpose contract
- Primary Objective: Verify the documented purpose of the GET Cart operation while observing the otherwise unspecified returned Cart representation.
- Primary Technique: BUSINESS_RULE
- Secondary Technique: DOMAIN, SCHEMA
- TB Refs: TB-FR07-002, TB-FR07-003, TB-FR07-011
- PARAM / DIM Refs: PARAM-FR07-001, DIM-FR07-005
- EP Refs: EP-FR07-001, EP-FR07-032
- INT Refs: INT-FR07-001
- Blocker Refs: BLK-FR07-004, BLK-FR07-007, BLK-FR07-008
- Behavior Classification: POSITIVE
- Readiness: READY
- Preconditions: A documented authentication context is available; no specific Cart contents are assumed.
- Logical Input Condition: Single retrieval under the documented authentication context.
- Logical Action: Invoke the documented GET Cart operation and observe the returned resource representation.
- Transport Oracle: PARTIAL — endpoint is explicit; response status is unspecified.
- Schema Oracle: UNSPECIFIED — no fields, types, or container are documented.
- Semantic Oracle: PARTIAL — retrieve-Cart purpose is explicit; exact semantic content is not.
- State Oracle: UNSPECIFIED — owner, empty state, lifetime, and persistence are absent.
- Security Oracle: PARTIAL — authentication context is supported; ownership is unspecified.
- Expected Result Deterministic?: PARTIAL
- Exploratory Observation Goal: Characterize the returned container, members, types, and apparent Cart semantics without asserting them.
- Why This Test Exists: Separates resource-purpose coverage from the endpoint method/path oracle.
- Duplicate Risk: PARTIAL_OVERLAP
- Interaction Factors: Factor A: documented GET authentication context.
  Factor B / Sequence: retrieve-Cart operation.
  Why not covered by standalone EP tests: operation purpose and authentication context must be observed together, while response details remain non-normative.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-132 — POST Cart endpoint transport contract

- Test ID: TC-API-132
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart endpoint transport contract
- Primary Objective: Verify that the documented add-to-Cart operation is addressed through the specified POST method and `/api/cart` path.
- Primary Technique: BUSINESS_RULE
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-004, TB-FR07-013
- PARAM / DIM Refs: PARAM-FR07-002, DIM-FR07-005
- EP Refs: EP-FR07-004, EP-FR07-034
- INT Refs: INT-FR07-002
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: POSITIVE
- Readiness: READY
- Preconditions: A documented authentication context and logically documented-shape request context are available.
- Logical Input Condition: Documented POST Cart authentication and single-operation classes.
- Logical Action: Address the add-to-Cart operation using its documented method and path.
- Transport Oracle: SUPPORTED — method and path are explicit; no response status is asserted.
- Schema Oracle: UNSPECIFIED — no POST response shape is documented.
- Semantic Oracle: NOT_APPLICABLE — this case isolates endpoint transport.
- State Oracle: NOT_APPLICABLE
- Security Oracle: PARTIAL — documented authentication context is present; outcome rules are outside this objective.
- Expected Result Deterministic?: YES
- Exploratory Observation Goal: Record response details only as secondary observations.
- Why This Test Exists: Provides an independent hard oracle for the POST method/path contract.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: documented POST authentication context.
  Factor B / Sequence: one POST Cart invocation.
  Why not covered by standalone EP tests: it couples the required auth context to the exact Cart operation without testing body semantics.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-133 — POST documented JSON request-shape contract

- Test ID: TC-API-133
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST documented JSON request-shape contract
- Primary Objective: Verify only that the add-to-Cart contract documents a JSON-shaped body containing the four example members, without treating them as a complete required schema.
- Primary Technique: SCHEMA
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-006, TB-FR07-007, TB-FR07-008, TB-FR07-009
- PARAM / DIM Refs: DIM-FR07-001, PARAM-FR07-003, PARAM-FR07-004, PARAM-FR07-005, PARAM-FR07-006
- EP Refs: EP-FR07-007, EP-FR07-010, EP-FR07-014, EP-FR07-018, EP-FR07-022
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009
- Behavior Classification: POSITIVE
- Readiness: READY
- Preconditions: A documented authentication context is available.
- Logical Input Condition: JSON-shaped body using the documented member representation classes; literal values are not required.
- Logical Action: Invoke POST Cart with the logical documented-shape request class.
- Transport Oracle: PARTIAL — endpoint is explicit; response status is unspecified.
- Schema Oracle: PARTIAL — JSON body and four example members are supported; normative requiredness/types are not.
- Semantic Oracle: PARTIAL — add purpose exists; acceptance and member semantics are unspecified.
- State Oracle: UNSPECIFIED — mutation result is absent.
- Security Oracle: PARTIAL — authentication context is supported; ownership is unspecified.
- Expected Result Deterministic?: PARTIAL
- Exploratory Observation Goal: Record validation and response behavior without promoting observed schema rules.
- Why This Test Exists: Provides focused request-contract coverage independent of add-state semantics.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON-shaped body representation.
  Factor B / Sequence: documented-shape classes for id, name, price, and quantity.
  Why not covered by standalone EP tests: the body container/member relationship is the contract objective.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-134 — POST add-to-Cart semantic-purpose contract

- Test ID: TC-API-134
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST add-to-Cart semantic-purpose contract
- Primary Objective: Verify the documented add-to-Cart purpose while avoiding assumptions about exact mutation, accumulation, or response.
- Primary Technique: BUSINESS_RULE
- Secondary Technique: STATE
- TB Refs: TB-FR07-004, TB-FR07-010, TB-FR07-012, TB-FR07-013
- PARAM / DIM Refs: PARAM-FR07-002, DIM-FR07-005
- EP Refs: EP-FR07-004, EP-FR07-034
- INT Refs: INT-FR07-002
- Blocker Refs: BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008
- Behavior Classification: POSITIVE
- Readiness: READY
- Preconditions: A documented authentication context and documented-shape logical body are available.
- Logical Input Condition: Single add invocation with no assumed prior Cart state.
- Logical Action: Invoke the documented POST Cart operation once.
- Transport Oracle: PARTIAL — endpoint is explicit; response status is unspecified.
- Schema Oracle: UNSPECIFIED — response schema is absent.
- Semantic Oracle: PARTIAL — add-to-Cart purpose is explicit; exact result is not.
- State Oracle: PARTIAL — a mutation concept exists; pre/post state is unspecified.
- Security Oracle: PARTIAL — authentication is explicit; ownership is not.
- Expected Result Deterministic?: PARTIAL
- Exploratory Observation Goal: Characterize the returned result and any observable mutation without asserting quantity or persistence rules.
- Why This Test Exists: Separates semantic operation-purpose coverage from transport and request-schema cases.
- Duplicate Risk: PARTIAL_OVERLAP
- Interaction Factors: Factor A: documented POST authentication context.
  Factor B / Sequence: single add invocation.
  Why not covered by standalone EP tests: the objective is the operation meaning under its required context, not either factor alone.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-135 — GET Cart with authentication context absent

- Test ID: TC-API-135
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: GET Cart with authentication context absent
- Primary Objective: Observe handling when the required GET Cart authentication context is absent.
- Primary Technique: AUTHENTICATION
- Secondary Technique: SECURITY, ROBUSTNESS
- TB Refs: TB-FR07-001, TB-FR07-002
- PARAM / DIM Refs: PARAM-FR07-001
- EP Refs: EP-FR07-002
- INT Refs: INT-FR07-001
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: No authentication context is supplied; no Cart state is assumed.
- Logical Input Condition: Authentication-absent class for GET Cart.
- Logical Action: Invoke GET Cart without the documented header context.
- Transport Oracle: UNSPECIFIED — exact failure status is absent.
- Schema Oracle: UNSPECIFIED — error shape is absent.
- Semantic Oracle: PARTIAL — omission conflicts with an explicit header requirement; service behavior is unspecified.
- State Oracle: NOT_APPLICABLE
- Security Oracle: PARTIAL — the required context is known, but enforcement result is not.
- Expected Result Deterministic?: PARTIAL
- Exploratory Observation Goal: Record acceptance/rejection, status, response shape, and disclosure behavior without prescribing them.
- Why This Test Exists: Isolates omission of a specification-required context for GET.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: authentication-absent class.
  Factor B / Sequence: GET Cart operation.
  Why not covered by standalone EP tests: enforcement is operation-specific even though the header rule is section-level.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-136 — GET Cart with non-conforming authentication representation

- Test ID: TC-API-136
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: GET Cart with non-conforming authentication representation
- Primary Objective: Observe handling when GET Cart receives an authentication representation different from the documented Bearer form.
- Primary Technique: AUTHENTICATION
- Secondary Technique: SECURITY, ROBUSTNESS
- TB Refs: TB-FR07-001, TB-FR07-002
- PARAM / DIM Refs: PARAM-FR07-001
- EP Refs: EP-FR07-003
- INT Refs: INT-FR07-001
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: An authentication representation is present but does not match the documented form.
- Logical Input Condition: Present non-conforming authentication representation for GET Cart.
- Logical Action: Invoke GET Cart under that authentication representation.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: NOT_APPLICABLE
- Security Oracle: PARTIAL — documented form is known; malformed handling is not.
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize enforcement, response, and disclosure behavior.
- Why This Test Exists: Distinguishes malformed/present context from complete omission.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: present non-conforming auth representation.
  Factor B / Sequence: GET Cart operation.
  Why not covered by standalone EP tests: outcome may differ by endpoint and by absence versus malformed presence.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-137 — POST Cart with authentication context absent

- Test ID: TC-API-137
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with authentication context absent
- Primary Objective: Observe handling when the required POST Cart authentication context is absent while body representation remains nominal.
- Primary Technique: AUTHENTICATION
- Secondary Technique: SECURITY, ROBUSTNESS
- TB Refs: TB-FR07-004, TB-FR07-013
- PARAM / DIM Refs: PARAM-FR07-002, DIM-FR07-001
- EP Refs: EP-FR07-005, EP-FR07-007
- INT Refs: INT-FR07-002
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A documented-shape logical body is available; authentication context is omitted.
- Logical Input Condition: Authentication-absent class for POST Cart with nominal body context.
- Logical Action: Invoke POST Cart without the documented header context.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: PARTIAL — omission conflicts with an explicit header requirement; enforcement is unspecified.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: PARTIAL
- Exploratory Observation Goal: Record enforcement, response, and whether any observable mutation appears, without asserting an outcome.
- Why This Test Exists: Isolates POST authentication omission from request-body errors.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: authentication-absent class.
  Factor B / Sequence: POST add operation with nominal body context.
  Why not covered by standalone EP tests: isolation prevents body behavior from confounding authentication observation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-138 — POST Cart with non-conforming authentication representation

- Test ID: TC-API-138
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with non-conforming authentication representation
- Primary Objective: Observe handling when POST Cart receives an authentication representation different from the documented Bearer form.
- Primary Technique: AUTHENTICATION
- Secondary Technique: SECURITY, ROBUSTNESS
- TB Refs: TB-FR07-004, TB-FR07-013
- PARAM / DIM Refs: PARAM-FR07-002, DIM-FR07-001
- EP Refs: EP-FR07-006, EP-FR07-007
- INT Refs: INT-FR07-002
- Blocker Refs: BLK-FR07-008, BLK-FR07-011
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A nominal logical body is available; an authentication representation is present but non-conforming.
- Logical Input Condition: Present non-conforming authentication representation with nominal POST body context.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize enforcement, response, and any observable state exposure.
- Why This Test Exists: Distinguishes malformed/present auth from omission for POST.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: present non-conforming auth representation.
  Factor B / Sequence: POST add operation.
  Why not covered by standalone EP tests: endpoint-specific enforcement and possible mutation exposure are the interaction risk.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-139 — POST Cart with request body absent

- Test ID: TC-API-139
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with request body absent
- Primary Objective: Observe handling when the entire POST Cart body is absent while authentication context is nominal.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-010
- PARAM / DIM Refs: DIM-FR07-001
- EP Refs: EP-FR07-008
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-005, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A documented authentication context is available.
- Logical Input Condition: Request-body-absent representation class.
- Logical Action: Invoke POST Cart without a body representation.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED — body requiredness/error schema absent.
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL — nominal auth context only.
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record parsing, acceptance/rejection, response, and apparent state behavior.
- Why This Test Exists: Isolates container absence from individual-member omission.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: body-absent representation.
  Factor B / Sequence: add operation with nominal auth.
  Why not covered by standalone EP tests: whole-body absence differs from member-level representation conditions.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-140 — POST Cart with non-JSON-shaped body representation

- Test ID: TC-API-140
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with non-JSON-shaped body representation
- Primary Objective: Observe handling when the POST Cart body is present but not JSON-shaped.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005
- PARAM / DIM Refs: DIM-FR07-001
- EP Refs: EP-FR07-009
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A documented authentication context is available.
- Logical Input Condition: Present body representation outside the documented JSON shape, without an attack payload.
- Logical Action: Invoke POST Cart with that abstract representation class.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED — parsing/media contract absent.
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record parsing, response, and whether the service exposes a stable contract.
- Why This Test Exists: Distinguishes present unsupported representation from body absence.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: non-JSON-shaped body class.
  Factor B / Sequence: POST body-processing context.
  Why not covered by standalone EP tests: this targets container parsing rather than any member.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-141 — POST Cart with another number-shaped id

- Test ID: TC-API-141
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with another number-shaped id
- Primary Objective: Observe behavior for a number-shaped `id` other than the specification example, without assuming identifier validity.
- Primary Technique: DOMAIN
- Secondary Technique: RESOURCE
- TB Refs: TB-FR07-005, TB-FR07-006, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-003, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-011
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-010
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members use documented-shape classes.
- Logical Input Condition: Another number-shaped `id`; no sign, range, or existence meaning is imposed.
- Logical Action: Invoke POST Cart once.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: PARTIAL — member/example shape documented; normative type absent.
- Semantic Oracle: UNSPECIFIED — identity/resource semantics absent.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize acceptance and observed interpretation of the member.
- Why This Test Exists: Prevents the single example literal from becoming an accidental unique-valid rule.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: other number-shaped id class.
  Why not covered by standalone EP tests: the member must be interpreted within its containing body.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-142 — POST Cart with id omitted

- Test ID: TC-API-142
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with id omitted
- Primary Objective: Observe handling when body member `id` is omitted and unrelated members remain in documented-shape classes.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-006
- PARAM / DIM Refs: PARAM-FR07-003, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-012
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Omitted `id` member only.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED — requiredness/error schema absent.
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether omission is accepted, rejected, defaulted, or otherwise handled, without selecting an expected outcome.
- Why This Test Exists: Isolates the `id` requiredness gap.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: id-omitted class.
  Why not covered by standalone EP tests: member omission is meaningful only within a present body.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-143 — POST Cart with id representation unlike example

- Test ID: TC-API-143
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with id representation unlike example
- Primary Objective: Observe handling when `id` uses a non-example JSON representation class while unrelated factors remain nominal.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-006
- PARAM / DIM Refs: PARAM-FR07-003, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-013
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: `id` represented by a null-like or other non-example JSON kind, abstractly.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED — normative type/nullability absent.
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize representation validation and response.
- Why This Test Exists: Separates type/nullability uncertainty from omission and other numeric values.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: non-example id representation.
  Why not covered by standalone EP tests: container parsing and member interpretation jointly determine the observation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-144 — POST Cart with another string-shaped name

- Test ID: TC-API-144
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with another string-shaped name
- Primary Objective: Observe behavior for a string-shaped `name` different from the example without assuming format, length, or source rules.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-007
- PARAM / DIM Refs: PARAM-FR07-004, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-015
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Another string-shaped name representation.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: PARTIAL — example is string-shaped; normative type/constraints absent.
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record acceptance and apparent interpretation without asserting a name rule.
- Why This Test Exists: Avoids treating the example name as the only accepted literal.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: other string-shaped name class.
  Why not covered by standalone EP tests: name behavior is observed only as part of the POST body contract.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-145 — POST Cart with name omitted

- Test ID: TC-API-145
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with name omitted
- Primary Objective: Observe handling when `name` is omitted and unrelated members remain nominal.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-007
- PARAM / DIM Refs: PARAM-FR07-004, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-016
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Omitted `name` member only.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record handling of the omitted member.
- Why This Test Exists: Isolates the `name` requiredness gap.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: name-omitted class.
  Why not covered by standalone EP tests: member omission requires a present body and nominal surrounding fields.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-146 — POST Cart with name representation unlike example

- Test ID: TC-API-146
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with name representation unlike example
- Primary Objective: Observe handling when `name` uses a null-like or other non-example JSON representation.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-007
- PARAM / DIM Refs: PARAM-FR07-004, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-017
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Non-example `name` representation class.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize type/nullability handling.
- Why This Test Exists: Separates representation uncertainty from omission and alternate string content.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: non-example name representation.
  Why not covered by standalone EP tests: member interpretation depends on body parsing.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-147 — POST Cart with another number-shaped price

- Test ID: TC-API-147
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with another number-shaped price
- Primary Objective: Observe behavior for a number-shaped `price` other than the example without assuming range, currency, precision, or authority.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-008, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-005, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-019
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-009
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Another number-shaped price representation; no boundary subclass is chosen.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: PARTIAL — numeric-shaped example only.
- Semantic Oracle: UNSPECIFIED — price semantics/authority absent.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize acceptance and any apparent interpretation without calculating totals.
- Why This Test Exists: Prevents the example price from becoming an accidental boundary or required literal.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: other number-shaped price class.
  Why not covered by standalone EP tests: price is meaningful only in the add request context.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-148 — POST Cart with price omitted

- Test ID: TC-API-148
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with price omitted
- Primary Objective: Observe handling when `price` is omitted and unrelated members remain nominal.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-008
- PARAM / DIM Refs: PARAM-FR07-005, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-020
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-009, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Omitted `price` member only.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record handling of price omission without assuming server-side authority.
- Why This Test Exists: Isolates price requiredness and authority uncertainty.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: price-omitted class.
  Why not covered by standalone EP tests: omission is interpreted within a present add body.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-149 — POST Cart with price representation unlike example

- Test ID: TC-API-149
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with price representation unlike example
- Primary Objective: Observe handling when `price` uses a null-like or other non-example JSON representation.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-008
- PARAM / DIM Refs: PARAM-FR07-005, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-021
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-009, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Non-example price representation class.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize representation validation and response.
- Why This Test Exists: Separates price representation handling from range-like robustness.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: non-example price representation.
  Why not covered by standalone EP tests: member handling requires the body context.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-150 — POST Cart with another number-shaped quantity

- Test ID: TC-API-150
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with another number-shaped quantity
- Primary Objective: Observe behavior for a number-shaped quantity other than the example without treating zero, sign, fraction, or magnitude as a BVA class.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-009, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-006, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-023
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-003, BLK-FR07-010
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Another number-shaped quantity from the broad exploratory EP; no numeric subclass is prescribed.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: PARTIAL — numeric-shaped example only.
- Semantic Oracle: UNSPECIFIED — quantity domain and stock relation absent.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize handling while recording the chosen subclass later as observation metadata, not a hard partition.
- Why This Test Exists: Provides broad numeric robustness coverage without fake boundaries.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: other number-shaped quantity class.
  Why not covered by standalone EP tests: quantity is processed only within the add body.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-151 — POST Cart with quantity omitted

- Test ID: TC-API-151
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with quantity omitted
- Primary Objective: Observe handling when `quantity` is omitted and unrelated members remain nominal.
- Primary Technique: DOMAIN
- Secondary Technique: ROBUSTNESS
- TB Refs: TB-FR07-005, TB-FR07-009
- PARAM / DIM Refs: PARAM-FR07-006, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-024
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-003, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Omitted `quantity` member only.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether omission is accepted, rejected, or interpreted, without predicting it.
- Why This Test Exists: Isolates quantity requiredness uncertainty.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: quantity-omitted class.
  Why not covered by standalone EP tests: omission must be evaluated inside a present body.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-152 — POST Cart with quantity representation unlike example

- Test ID: TC-API-152
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart with quantity representation unlike example
- Primary Objective: Observe handling when `quantity` uses a null-like or other non-example JSON representation.
- Primary Technique: ROBUSTNESS
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-005, TB-FR07-009
- PARAM / DIM Refs: PARAM-FR07-006, DIM-FR07-001
- EP Refs: EP-FR07-007, EP-FR07-025
- INT Refs: INT-FR07-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-003, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; unrelated members remain nominal.
- Logical Input Condition: Non-example quantity representation class.
- Logical Action: Invoke POST Cart.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Characterize type/nullability handling.
- Why This Test Exists: Separates representation robustness from broad number-shaped quantity exploration.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: JSON body representation.
  Factor B / Sequence: non-example quantity representation.
  Why not covered by standalone EP tests: member handling is part of the body contract.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-153 — Price and quantity relationship observation

- Test ID: TC-API-153
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Price and quantity relationship observation
- Primary Objective: Observe whether the service exposes any relationship between supplied number-shaped price and quantity without assuming a formula, authority, rounding, or total field.
- Primary Technique: INTERACTION
- Secondary Technique: BUSINESS_RULE, ROBUSTNESS
- TB Refs: TB-FR07-008, TB-FR07-009, TB-FR07-010, TB-FR07-012
- PARAM / DIM Refs: PARAM-FR07-005, PARAM-FR07-006
- EP Refs: EP-FR07-019, EP-FR07-023, EP-FR07-034
- INT Refs: INT-FR07-006
- Blocker Refs: BLK-FR07-005, BLK-FR07-008, BLK-FR07-009
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Nominal auth/body context; both members use number-shaped classes.
- Logical Input Condition: Price class × quantity class, with no mathematical expected value.
- Logical Action: Invoke POST Cart and observe response/state indications, if any.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED — no calculation formula or fields are documented.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether any calculation, normalization, or authority behavior is observable without declaring it correct.
- Why This Test Exists: The interaction cannot be assessed by testing price or quantity alone.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: number-shaped price class.
  Factor B / Sequence: number-shaped quantity class in the same add operation.
  Why not covered by standalone EP tests: only their joint use could reveal a calculation/authority relationship.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-154 — Add with referenced resource established as existing

- Test ID: TC-API-154
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Add with referenced resource established as existing
- Primary Objective: Characterize add behavior when the submitted reference can be established as an existing resource, if the ambiguous reference dependency is later resolved.
- Primary Technique: RESOURCE
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-006, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-003, DIM-FR07-002
- EP Refs: EP-FR07-026, EP-FR07-034
- INT Refs: INT-FR07-004
- Blocker Refs: BLK-FR07-002, BLK-FR07-005, BLK-FR07-010
- Behavior Classification: CONDITIONAL
- Readiness: BLOCKED
- Preconditions: The body-id-to-resource relationship and a reproducible existing-resource setup must be specified.
- Logical Input Condition: Documented-shape identifier representation mapped to an established existing resource.
- Logical Action: Invoke POST Cart once after the precondition becomes reproducible.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED — existence acceptance behavior absent.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record how resource existence affects add behavior after setup becomes authoritative.
- Why This Test Exists: Separates reference existence from identifier representation.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: identifier representation.
  Factor B / Sequence: referenced resource exists.
  Why not covered by standalone EP tests: representation alone cannot establish the resource dependency.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-155 — Add with referenced resource established as non-existing

- Test ID: TC-API-155
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Add with referenced resource established as non-existing
- Primary Objective: Characterize add behavior when the submitted reference can be established as non-existing, if the ambiguous reference dependency is later resolved.
- Primary Technique: RESOURCE
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-006, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-003, DIM-FR07-002
- EP Refs: EP-FR07-027, EP-FR07-034
- INT Refs: INT-FR07-004
- Blocker Refs: BLK-FR07-002, BLK-FR07-005, BLK-FR07-008, BLK-FR07-010
- Behavior Classification: CONDITIONAL
- Readiness: BLOCKED
- Preconditions: The body-id-to-resource relationship and reproducible non-existing-resource setup must be specified.
- Logical Input Condition: Documented-shape identifier representation mapped to an established non-existing resource.
- Logical Action: Invoke POST Cart once after the precondition becomes reproducible.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED — no missing-resource behavior is documented.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record handling without asserting rejection or a status.
- Why This Test Exists: Complements the existing-resource condition with a distinct dependency class.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: identifier representation.
  Factor B / Sequence: referenced resource does not exist.
  Why not covered by standalone EP tests: resource state is independent of wire representation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-156 — Cart observation under the same authentication context

- Test ID: TC-API-156
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart and POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Cart observation under the same authentication context
- Primary Objective: Characterize Cart association when the same documented authentication context is used across Cart operations, after ownership setup rules become reproducible.
- Primary Technique: AUTHORIZATION
- Secondary Technique: AUTHENTICATION, STATE
- TB Refs: TB-FR07-001, TB-FR07-003, TB-FR07-010, TB-FR07-013
- PARAM / DIM Refs: PARAM-FR07-001, PARAM-FR07-002, DIM-FR07-003
- EP Refs: EP-FR07-028
- INT Refs: INT-FR07-007
- Blocker Refs: BLK-FR07-004, BLK-FR07-007, BLK-FR07-012
- Behavior Classification: CONDITIONAL
- Readiness: BLOCKED
- Preconditions: Authoritative token-to-Cart mapping and reproducible same-context state setup are required.
- Logical Input Condition: Same documented authentication context across scoped Cart operations.
- Logical Action: Perform logically related Cart operations under that context and observe association.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: UNSPECIFIED — ownership association is absent.
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether operations appear associated with one Cart without declaring one-Cart-per-user semantics.
- Why This Test Exists: Directly addresses the ownership dependency without inventing its rule.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: same authentication context.
  Factor B / Sequence: Cart retrieval/add operations.
  Why not covered by standalone EP tests: ownership is a relationship across context and operation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-157 — Cart observation across different authentication contexts

- Test ID: TC-API-157
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Cart observation across different authentication contexts
- Primary Objective: Observe potential Cart isolation across different authentication contexts only after a reproducible ownership setup is specified.
- Primary Technique: SECURITY
- Secondary Technique: AUTHORIZATION, INTERACTION
- TB Refs: TB-FR07-003
- PARAM / DIM Refs: DIM-FR07-003
- EP Refs: EP-FR07-029
- INT Refs: INT-FR07-007
- Blocker Refs: BLK-FR07-004, BLK-ALL-001
- Behavior Classification: EXPLORATORY
- Readiness: BLOCKED
- Preconditions: At least two reproducible authentication contexts and an authoritative ownership/access rule are required.
- Logical Input Condition: Different documented authentication contexts observing the Cart endpoint.
- Logical Action: Retrieve Cart under each context and compare observations without asserting isolation.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: UNSPECIFIED
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record similarities/differences and potential disclosure indicators; do not call them violations without a rule.
- Why This Test Exists: Provides security-relevant ownership observation distinct from same-context association.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: different authentication contexts.
  Factor B / Sequence: GET Cart observations.
  Why not covered by standalone EP tests: isolation is inherently cross-context.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-158 — First versus later Cart access lifecycle observation

- Test ID: TC-API-158
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: First versus later Cart access lifecycle observation
- Primary Objective: Characterize first and later Cart access only after lifecycle/reset/persistence setup can be established reproducibly.
- Primary Technique: STATE
- Secondary Technique: SEQUENCE
- TB Refs: TB-FR07-003, TB-FR07-011
- PARAM / DIM Refs: DIM-FR07-004, DIM-FR07-005
- EP Refs: EP-FR07-030, EP-FR07-031, EP-FR07-032
- INT Refs: INT-FR07-008
- Blocker Refs: BLK-FR07-007, BLK-FR07-008, BLK-FR07-012
- Behavior Classification: CONDITIONAL
- Readiness: BLOCKED
- Preconditions: An authoritative definition of first/later access and reproducible Cart lifecycle setup are required.
- Logical Input Condition: First-access context followed by later access in the same documented auth context.
- Logical Action: Perform the two logical accesses after setup is available.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Compare observations without asserting creation, persistence, expiry, or equality.
- Why This Test Exists: Targets lifecycle position, which a single GET cannot cover.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: first/later lifecycle context.
  Factor B / Sequence: GET Cart operation.
  Why not covered by standalone EP tests: lifecycle behavior emerges only across accesses.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-159 — Repeated GET Cart consistency observation

- Test ID: TC-API-159
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Repeated GET Cart consistency observation
- Primary Objective: Compare repeated retrievals without intervening mutation while avoiding any idempotence or equality expectation.
- Primary Technique: SEQUENCE
- Secondary Technique: STATE
- TB Refs: TB-FR07-002, TB-FR07-003, TB-FR07-011
- PARAM / DIM Refs: PARAM-FR07-001, DIM-FR07-005
- EP Refs: EP-FR07-032, EP-FR07-033
- INT Refs: INT-FR07-011
- Blocker Refs: BLK-FR07-008, BLK-FR07-012
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A stable documented authentication context is available; no mutation is performed between retrievals.
- Logical Input Condition: Repeated GET sequence without intervening mutation.
- Logical Action: Step A: invoke GET Cart.
→ Step B: invoke GET Cart again under the same logical context.
→ Observe C: compare transport, shape, and semantic observations.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record stability/differences without requiring identical responses.
- Why This Test Exists: Covers the explicit repeated-retrieval blocker and sequence EP.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: repeated GET sequence.
  Factor B / Sequence: stable documented authentication context.
  Why not covered by standalone EP tests: consistency is relational across observations.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-160 — Repeated add of the same submitted reference/body

- Test ID: TC-API-160
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Repeated add of the same submitted reference/body
- Primary Objective: Characterize repeated add behavior for the same logical submitted reference/body without assuming accumulation, replacement, or duplicate rows.
- Primary Technique: SEQUENCE
- Secondary Technique: STATE, INTERACTION
- TB Refs: TB-FR07-004, TB-FR07-010, TB-FR07-012
- PARAM / DIM Refs: PARAM-FR07-003, PARAM-FR07-006, DIM-FR07-005
- EP Refs: EP-FR07-034, EP-FR07-035
- INT Refs: INT-FR07-009
- Blocker Refs: BLK-FR07-005, BLK-FR07-006, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A documented authentication/body context is available; the same logical submitted representation can be repeated.
- Logical Input Condition: Repeated POST sequence with the same submitted reference/body class.
- Logical Action: Step A: invoke POST Cart once.
→ Step B: invoke POST Cart again with the same logical class.
→ Observe C: record response/state indications.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record accumulation/replacement/duplication indications as observations only.
- Why This Test Exists: Directly covers repeated-add semantics not reachable through a single POST.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: repeated add sequence.
  Factor B / Sequence: same identifier and quantity representation classes.
  Why not covered by standalone EP tests: duplicate semantics arise only from repetition.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-161 — Add followed by Cart retrieval observation

- Test ID: TC-API-161
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart → GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Add followed by Cart retrieval observation
- Primary Objective: Characterize read-after-add visibility without assuming persistence, ordering, equality, or item presence.
- Primary Technique: SEQUENCE
- Secondary Technique: STATE, INTERACTION
- TB Refs: TB-FR07-002, TB-FR07-003, TB-FR07-004, TB-FR07-010, TB-FR07-011, TB-FR07-012
- PARAM / DIM Refs: PARAM-FR07-001, PARAM-FR07-002, DIM-FR07-004, DIM-FR07-005
- EP Refs: EP-FR07-034, EP-FR07-036
- INT Refs: INT-FR07-010
- Blocker Refs: BLK-FR07-005, BLK-FR07-007, BLK-FR07-008, BLK-FR07-012
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Documented authentication and body contexts are available; no persistence guarantee is assumed.
- Logical Input Condition: Single add followed by retrieval in the same logical auth context.
- Logical Action: Step A: invoke POST Cart.
→ Step B: invoke GET Cart.
→ Observe C: compare available response/state indications.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: UNSPECIFIED
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether/how the add appears related to the retrieval, without a hard visibility oracle.
- Why This Test Exists: Covers the cross-operation sequence and read-after-write blocker.
- Duplicate Risk: UNIQUE
- Interaction Factors: Factor A: add-then-retrieve sequence.
  Factor B / Sequence: same logical lifecycle/auth context.
  Why not covered by standalone EP tests: visibility is an inter-operation relation.
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-162 — GET Cart response-contract characterization

- Test ID: TC-API-162
- Feature: FR-07 — Cart
- Endpoint / Operation: GET /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: GET Cart response-contract characterization
- Primary Objective: Characterize the undocumented GET response status, container, fields, types, and semantic shape without adopting them as requirements.
- Primary Technique: SCHEMA
- Secondary Technique: DOMAIN
- TB Refs: TB-FR07-003, TB-FR07-011
- PARAM / DIM Refs: PARAM-FR07-001, DIM-FR07-005
- EP Refs: EP-FR07-032
- INT Refs: None
- Blocker Refs: BLK-FR07-008, BLK-FR07-012
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: A documented authentication context is available.
- Logical Input Condition: Single nominal GET operation; response is treated only as an observation target.
- Logical Action: Invoke GET Cart and record each oracle layer separately.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: PARTIAL — retrieve purpose only.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Create an observation record for status, container, member presence/types, and apparent semantics without enforcing it.
- Why This Test Exists: Provides focused response/schema evidence separate from resource-purpose and transport tests.
- Duplicate Risk: PARTIAL_OVERLAP
- Interaction Factors: N/A
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-163 — POST Cart response and mutation-result characterization

- Test ID: TC-API-163
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: POST Cart response and mutation-result characterization
- Primary Objective: Characterize the undocumented POST response and mutation-result contract without inventing status, fields, or state effects.
- Primary Technique: SCHEMA
- Secondary Technique: STATE
- TB Refs: TB-FR07-010, TB-FR07-012
- PARAM / DIM Refs: PARAM-FR07-002, DIM-FR07-005
- EP Refs: EP-FR07-034
- INT Refs: None
- Blocker Refs: BLK-FR07-005, BLK-FR07-008
- Behavior Classification: EXPLORATORY
- Readiness: EXPLORATORY_ONLY
- Preconditions: Documented authentication and logical body contexts are available.
- Logical Input Condition: Single nominal POST operation; response/result is observation-only.
- Logical Action: Invoke POST Cart and record response and observable state indications separately.
- Transport Oracle: UNSPECIFIED
- Schema Oracle: UNSPECIFIED
- Semantic Oracle: PARTIAL — add purpose only.
- State Oracle: UNSPECIFIED
- Security Oracle: PARTIAL
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record status, shape, members/types, semantic message, and state indications without asserting correctness beyond the operation label.
- Why This Test Exists: Provides focused response/mutation-result evidence separate from nominal add-purpose coverage.
- Duplicate Risk: PARTIAL_OVERLAP
- Interaction Factors: N/A
- BVA: N/A — no specification-backed FR-07 boundary

### TC-API-164 — Quantity × referenced resource availability interaction

- Test ID: TC-API-164
- Feature: FR-07 — Cart
- Endpoint / Operation: POST /api/cart
- Scope: IN_SCOPE
- Quota Eligible: YES
- Origin: AI_GENERATED
- Title: Quantity × referenced resource availability interaction
- Primary Objective: Characterize how the number-shaped quantity domain interacts with an established referenced-resource availability or stock context, only if that dependency can later be defined and reproduced.
- Primary Technique: INTERACTION
- Secondary Technique: RESOURCE, DOMAIN
- TB Refs: TB-FR07-006, TB-FR07-009, TB-FR07-010
- PARAM / DIM Refs: PARAM-FR07-003, PARAM-FR07-006, DIM-FR07-002
- EP Refs: EP-FR07-023, EP-FR07-026, EP-FR07-034
- INT Refs: INT-FR07-005
- Blocker Refs: BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-010
- Behavior Classification: CONDITIONAL
- Readiness: BLOCKED
- Preconditions: An authoritative body-id-to-resource relationship, reproducible existing-resource context, and defined availability or stock setup are required.
- Logical Input Condition: A number-shaped quantity class is combined with an established referenced-resource availability context; no numeric boundary or stock rule is assumed.
- Logical Action: Invoke POST Cart once after the interaction preconditions become reproducible.
- Transport Oracle: UNSPECIFIED — no response status is documented.
- Schema Oracle: PARTIAL — the request example contains id and quantity members; normative validation and response schema are absent.
- Semantic Oracle: UNSPECIFIED — no quantity-to-resource or stock behavior is defined.
- State Oracle: UNSPECIFIED — exact add mutation and resulting Cart state are absent.
- Security Oracle: PARTIAL — documented authentication context applies; ownership is unspecified.
- Expected Result Deterministic?: NO
- Exploratory Observation Goal: Record whether and how resource availability appears to interact with quantity handling without asserting acceptance, rejection, clamping, stock enforcement, or mutation semantics.
- Why This Test Exists: TC-API-150 isolates quantity representation and TC-API-154 isolates resource existence; neither covers their interaction, which is explicitly represented by INT-FR07-005.
- Duplicate Risk: PARTIAL_OVERLAP
- BVA: N/A — no specification-backed FR-07 boundary

## 5. EP Coverage Matrix

| EP-ID | Classification | Execution | Test IDs | Coverage |
| --- | --- | --- | --- | --- |
| EP-FR07-001 | VALID | READY | TC-API-130, TC-API-131 | COVERED |
| EP-FR07-002 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-135 | COVERED |
| EP-FR07-003 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-136 | COVERED |
| EP-FR07-004 | VALID | READY | TC-API-132, TC-API-133, TC-API-134 | COVERED |
| EP-FR07-005 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-137 | COVERED |
| EP-FR07-006 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-138 | COVERED |
| EP-FR07-007 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-008 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-139 | COVERED |
| EP-FR07-009 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-140 | COVERED |
| EP-FR07-010 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-011 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-141 | COVERED |
| EP-FR07-012 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-142 | COVERED |
| EP-FR07-013 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-143 | COVERED |
| EP-FR07-014 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-015 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-144 | COVERED |
| EP-FR07-016 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-145 | COVERED |
| EP-FR07-017 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-146 | COVERED |
| EP-FR07-018 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-019 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-147, TC-API-153 | COVERED |
| EP-FR07-020 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-148 | COVERED |
| EP-FR07-021 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-149 | COVERED |
| EP-FR07-022 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-023 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-150, TC-API-153, TC-API-164 | COVERED |
| EP-FR07-024 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-151 | COVERED |
| EP-FR07-025 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-152 | COVERED |
| EP-FR07-026 | CONDITIONAL | BLOCKED | TC-API-154, TC-API-164 | BLOCKED |
| EP-FR07-027 | CONDITIONAL | BLOCKED | TC-API-155 | BLOCKED |
| EP-FR07-028 | CONDITIONAL | BLOCKED | TC-API-156 | BLOCKED |
| EP-FR07-029 | EXPLORATORY | BLOCKED | TC-API-157 | BLOCKED |
| EP-FR07-030 | CONDITIONAL | BLOCKED | TC-API-158 | BLOCKED |
| EP-FR07-031 | EXPLORATORY | BLOCKED | TC-API-158 | BLOCKED |
| EP-FR07-032 | VALID | READY | TC-API-130, TC-API-131, TC-API-159, TC-API-162 | COVERED |
| EP-FR07-033 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-159 | COVERED_VIA_INTERACTION |
| EP-FR07-034 | VALID | READY | TC-API-132, TC-API-133, TC-API-134, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | COVERED |
| EP-FR07-035 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-160 | COVERED_VIA_INTERACTION |
| EP-FR07-036 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-161 | COVERED_VIA_INTERACTION |

Coverage totals: 27 `COVERED`, 3 `COVERED_VIA_INTERACTION`, 6 `BLOCKED`, 0 `DEFERRED_EXPLORATORY`, and 0 `NOT_MEANINGFUL_STANDALONE`.

## 6. Interaction Coverage Matrix

| INT-ID | Test IDs | Coverage Status | Reason |
| --- | --- | --- | --- |
| INT-FR07-001 | TC-API-130, TC-API-131, TC-API-135, TC-API-136 | COVERED | GET authentication classes are isolated against the GET operation. |
| INT-FR07-002 | TC-API-132, TC-API-134, TC-API-137, TC-API-138 | COVERED | POST authentication classes are isolated against the add operation. |
| INT-FR07-003 | TC-API-133, TC-API-139–TC-API-152 | COVERED | Body representation and each documented member class receive focused coverage. |
| INT-FR07-004 | TC-API-154, TC-API-155 | BLOCKED | Cases exist, but body-id-to-resource setup cannot be established from the specification. |
| INT-FR07-005 | TC-API-164 | BLOCKED | A dedicated case now represents the interaction, but quantity-to-product/stock setup and behavior remain unspecified. |
| INT-FR07-006 | TC-API-153 | COVERED | Focused observational price × quantity interaction. |
| INT-FR07-007 | TC-API-156, TC-API-157 | BLOCKED | Ownership context requires unavailable token-to-Cart rules/setup. |
| INT-FR07-008 | TC-API-158 | BLOCKED | First/later lifecycle context cannot be reproduced authoritatively. |
| INT-FR07-009 | TC-API-160 | COVERED | Repeated add isolates identifier/quantity sequence semantics. |
| INT-FR07-010 | TC-API-161 | COVERED | Add-to-retrieve sequence isolates visibility/persistence uncertainty. |
| INT-FR07-011 | TC-API-159 | PARTIAL | Repeated GET is executable, but ownership/context semantics remain unavailable. |

Interaction totals: 6 `COVERED`, 1 `PARTIAL`, 0 `DEFERRED`, and 4 `BLOCKED`.

## 7. Test-Basis Coverage Matrix

| TB-ID | Test IDs | Coverage Status | Oracle Strength |
| --- | --- | --- | --- |
| TB-FR07-001 | TC-API-130, TC-API-135, TC-API-136, TC-API-156 | COVERED | PARTIAL |
| TB-FR07-002 | TC-API-130, TC-API-131, TC-API-159, TC-API-162 | COVERED | DETERMINISTIC |
| TB-FR07-003 | TC-API-131, TC-API-156–TC-API-159, TC-API-161, TC-API-162 | PARTIAL | PARTIAL |
| TB-FR07-004 | TC-API-132, TC-API-134, TC-API-160, TC-API-161, TC-API-163 | COVERED | DETERMINISTIC |
| TB-FR07-005 | TC-API-133, TC-API-139–TC-API-152 | COVERED | PARTIAL |
| TB-FR07-006 | TC-API-133, TC-API-141–TC-API-143, TC-API-154, TC-API-155, TC-API-164 | COVERED | PARTIAL |
| TB-FR07-007 | TC-API-133, TC-API-144–TC-API-146 | COVERED | PARTIAL |
| TB-FR07-008 | TC-API-133, TC-API-147–TC-API-149, TC-API-153 | COVERED | PARTIAL |
| TB-FR07-009 | TC-API-133, TC-API-150–TC-API-153, TC-API-164 | COVERED | PARTIAL |
| TB-FR07-010 | TC-API-134, TC-API-153–TC-API-161, TC-API-163, TC-API-164 | PARTIAL | PARTIAL |
| TB-FR07-011 | TC-API-162 | BLOCKED | NONE |
| TB-FR07-012 | TC-API-163 | BLOCKED | NONE |
| TB-FR07-013 | TC-API-132, TC-API-137, TC-API-138 | COVERED | PARTIAL |

`Unaccounted TB = 0`. TB-FR07-011 and TB-FR07-012 are response-contract gaps; their observation cases cannot create a deterministic schema oracle.

## 8. Blocker Coverage Matrix

| Blocker | Affected Tests | Effect |
| --- | --- | --- |
| BLK-FR07-001 | TC-API-133, TC-API-139–TC-API-152 | LIMITS_SCHEMA_ORACLE |
| BLK-FR07-002 | TC-API-141–TC-API-149, TC-API-154, TC-API-155, TC-API-164 | LIMITS_SEMANTIC_ORACLE |
| BLK-FR07-003 | TC-API-150–TC-API-153, TC-API-164 | EXPLORATORY_ONLY |
| BLK-FR07-004 | TC-API-156, TC-API-157 | LIMITS_SECURITY_ORACLE |
| BLK-FR07-005 | TC-API-134, TC-API-154, TC-API-155, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | LIMITS_STATE_ORACLE |
| BLK-FR07-006 | TC-API-160 | LIMITS_STATE_ORACLE |
| BLK-FR07-007 | TC-API-131, TC-API-156, TC-API-158, TC-API-161 | BLOCKS_SETUP |
| BLK-FR07-008 | TC-API-130–TC-API-163 | LIMITS_TRANSPORT_ORACLE; LIMITS_SCHEMA_ORACLE |
| BLK-FR07-009 | TC-API-147–TC-API-153 | LIMITS_SEMANTIC_ORACLE |
| BLK-FR07-010 | TC-API-141, TC-API-150, TC-API-154, TC-API-155, TC-API-164 | BLOCKS_SETUP |
| BLK-FR07-011 | TC-API-130–TC-API-138 | LIMITS_SECURITY_ORACLE |
| BLK-FR07-012 | TC-API-159, TC-API-161 | LIMITS_STATE_ORACLE |

Shared BLK-ALL-001 is referenced only by TC-API-157 and remains separate from the 12 FR-07-specific blockers.

## 9. Duplicate Audit

| Test A | Test B | Overlap | Independent Value | Decision |
| --- | --- | --- | --- | --- |
| TC-API-130 | TC-API-131 | Same GET operation | Transport method/path versus resource-purpose/semantic observation | KEEP_BOTH |
| TC-API-131 | TC-API-162 | Same nominal GET context | Retrieve-purpose contract versus isolated response/schema characterization | KEEP_BOTH |
| TC-API-132 | TC-API-134 | Same POST operation | Transport method/path versus add-purpose semantics | KEEP_BOTH |
| TC-API-133 | TC-API-134 | Same nominal POST context | Request shape versus operation semantic purpose | KEEP_BOTH |
| TC-API-134 | TC-API-163 | Same nominal POST context | Add-purpose contract versus isolated response/mutation-result characterization | KEEP_BOTH |
| TC-API-135 | TC-API-136 | GET authentication abnormality | Missing context versus present non-conforming representation | KEEP_BOTH |
| TC-API-137 | TC-API-138 | POST authentication abnormality | Missing context versus present non-conforming representation | KEEP_BOTH |
| TC-API-139 | TC-API-140 | Body representation abnormality | Absent body versus present non-JSON-shaped body | KEEP_BOTH |
| TC-API-142, TC-API-145, TC-API-148, TC-API-151 | Each other | Omitted body member | Different documented member and blocker/oracle semantics | KEEP_BOTH |
| TC-API-141, TC-API-144, TC-API-147, TC-API-150 | Each other | Alternate example-shaped value | Identifier, name, price, and quantity have distinct semantic gaps | KEEP_BOTH |
| TC-API-154 | TC-API-155 | Resource existence dependency | Existing versus non-existing resource contexts | KEEP_BOTH |
| TC-API-156 | TC-API-157 | Ownership context | Same-context association versus cross-context isolation | KEEP_BOTH |
| TC-API-159 | TC-API-160 | Repeated operation | Repeated retrieval versus repeated add | KEEP_BOTH |
| TC-API-160 | TC-API-161 | Mutation sequence | Repeated add versus add-then-retrieve | KEEP_BOTH |

Known redundant duplicates retained: **0**.

## 10. Technique Coverage

| Technique | Test Count | Test IDs |
| --- | ---: | --- |
| BUSINESS_RULE | 4 | TC-API-130, TC-API-131, TC-API-132, TC-API-134 |
| SCHEMA | 3 | TC-API-133, TC-API-162, TC-API-163 |
| AUTHENTICATION | 4 | TC-API-135–TC-API-138 |
| ROBUSTNESS | 6 | TC-API-139, TC-API-140, TC-API-143, TC-API-146, TC-API-149, TC-API-152 |
| DOMAIN | 8 | TC-API-141, TC-API-142, TC-API-144, TC-API-145, TC-API-147, TC-API-148, TC-API-150, TC-API-151 |
| INTERACTION | 2 | TC-API-153, TC-API-164 |
| RESOURCE | 2 | TC-API-154, TC-API-155 |
| AUTHORIZATION | 1 | TC-API-156 |
| SECURITY | 1 | TC-API-157 |
| STATE | 1 | TC-API-158 |
| SEQUENCE | 3 | TC-API-159–TC-API-161 |
| BVA | 0 | N/A |
| TOTAL | 35 | TC-API-130–TC-API-164 |

## 11. Classification Summary

| Classification | Count |
| --- | ---: |
| POSITIVE | 5 |
| NEGATIVE | 0 |
| CONDITIONAL | 5 |
| EXPLORATORY | 25 |
| TOTAL | 35 |

No deterministic NEGATIVE case is fabricated from the zero INVALID EP count.

## 12. Readiness Summary

| Readiness | Count |
| --- | ---: |
| READY | 5 |
| BLOCKED | 6 |
| EXPLORATORY_ONLY | 24 |
| TOTAL | 35 |

## 13. Scope Summary

| Scope | Count |
| --- | ---: |
| IN_SCOPE | 35 |
| SUPPORTING | 0 |
| CROSS_FEATURE | 0 |
| OUT_OF_SCOPE | 0 |
| AMBIGUOUS | 0 |
| TOTAL | 35 |

## 14. Quota Evaluation

```text
FR-07 quota-eligible AI tests:
35 / 35

Result:
PASS
```

All 35 cases are IN_SCOPE, AI_GENERATED, and directly test FR-07 behavior. Readiness does not change origin/scope quota eligibility. TC-API-164 was accepted for new interaction coverage, not as a superficial value variant.

## 15. Prompt 016 Gap-Closure Result

| GAP-ID | Final Treatment | Test Addition | Remaining Constraint |
| --- | --- | --- | --- |
| GAP-FR07-001 | Quota closed through the accepted interaction candidate | TC-API-164 | None for quota; quality constraints remain |
| GAP-FR07-002 | Dedicated quantity × referenced-resource interaction added | TC-API-164 | Interaction remains BLOCKED by product/stock specification gaps |
| GAP-FR07-003 | No new case; TC-API-159 and TC-API-157 already isolate repetition and cross-context concerns | None | INT-FR07-011 remains PARTIAL due ownership rules |
| GAP-FR07-004 | Keep as blocked gap; existing blocked cases are adequate representations | None | BLK-FR07-002/004/007/010 unresolved |
| GAP-FR07-005 | No new case; TC-API-162/163 already provide the only defensible observation-only isolation | None | Deterministic response/schema contract absent |
| GAP-FR07-006 | Keep as blocked global gap | None | SEC-01–SEC-07 unavailable via BLK-ALL-001 |

No further testcase ID is reserved or pre-generated after TC-API-164.

## 16. Quality Validation

| Check | Result |
| --- | --- |
| Every test has one primary objective | PASS |
| Every TB ref exists | PASS |
| Every EP ref exists | PASS |
| Every INT ref exists | PASS |
| Every blocker ref exists | PASS |
| No unsupported boundary used | PASS |
| No concrete payload generated | PASS |
| No exact unsupported HTTP status invented | PASS |
| No response field invented | PASS |
| No Cart rule invented | PASS |
| No BVA test generated | PASS |
| No duplicate retained without independent value | PASS |
| FR-09 not reactivated | PASS |
| FR-08 checkout not absorbed | PASS |

## 17. Current Project Status

```text
POOL B:
FR-07

FR-07 REQUIREMENT EXTRACTION:
COMPLETE

FR-07 TEST BASIS:
COMPLETE

FR-07 DOMAIN MODEL:
COMPLETE

FR-07 BVA:
COMPLETE

FR-07 INITIAL AI TEST GENERATION:
COMPLETE

FR-07 QUOTA:
35 / 35

FR-07 QUOTA GAP CLOSURE:
COMPLETE

FR-07 HUMAN AUDIT:
NOT STARTED

FR-02:
PRESERVED — 35 / 35

FR-18:
PRESERVED — 35 / 35

FR-09:
SUPERSEDED — HISTORICAL ONLY
```

## 18. Machine-Usable Summary

```text
PROMPT_015_SUMMARY

Existing maximum historical testcase ID:
TC-API-129

First FR-07 testcase ID:
TC-API-130

FR-07 testcases generated:
35

Quota-eligible AI tests:
35

Classification:
POSITIVE:
5
NEGATIVE:
0
CONDITIONAL:
5
EXPLORATORY:
25

Readiness:
READY:
5
BLOCKED:
6
EXPLORATORY_ONLY:
24

Scope:
IN_SCOPE:
35
SUPPORTING:
0
CROSS_FEATURE:
0
OUT_OF_SCOPE:
0
AMBIGUOUS:
0

EPs:
TOTAL: 36
COVERED:
27
COVERED_VIA_INTERACTION:
3
BLOCKED:
6
DEFERRED_EXPLORATORY:
0
NOT_MEANINGFUL_STANDALONE:
0

Interactions:
TOTAL: 11
COVERED:
6
PARTIAL:
1
DEFERRED:
0
BLOCKED:
4

TB items:
TOTAL: 13
UNACCOUNTED:
0

BVA testcases:
0

Quota:
35 / 35

Quota status:
PASS

Gap items reviewed by Prompt 016:
6

New testcase added by Prompt 016:
TC-API-164

Human audit readiness:
READY_FOR_HUMAN_AUDIT

Next required prompt:
PROMPT 016 — FR-07 SCOPE, QUOTA, AND TECHNIQUE GAP CLOSURE
```
