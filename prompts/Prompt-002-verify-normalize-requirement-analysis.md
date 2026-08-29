# Prompt 002 — Verify and Normalize Requirement Analysis

You are continuing my HW06 – API Testing analysis for the EShop SUT.

The selected features are:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

Two input documents will be provided:

1. `api_specification.md` — the authoritative specification.
2. `Prompt-001-requirement-analysis.md` — the requirement analysis produced in Prompt 001.

Your task is to **audit, verify, and normalize the Prompt 001 analysis against the API specification**.

Do **not generate test cases yet**.

---

## 1. Verification Rules

Treat `api_specification.md` as the **single source of truth**.

For every meaningful statement in `Prompt-001-requirement-analysis.md`, classify it as one of:

* **VERIFIED** — explicitly supported by the API specification.
* **PARTIALLY VERIFIED** — some parts are supported, but the statement contains additional interpretation.
* **UNSUPPORTED** — not stated or supported by the specification.
* **CONTRADICTED** — conflicts with the specification.
* **AMBIGUOUS** — the specification itself is unclear or incomplete.
* **MISSING** — an important requirement exists in the specification but was omitted from Prompt 001.

Do not validate a statement merely because it is common REST, security, or e-commerce behavior.

---

## 2. Audit FR-02 — Login and Account Lockout

Verify all extracted information related to FR-02, including:

### Endpoint mapping

* HTTP method
* path
* endpoint purpose

### Inputs

* email
* password
* headers
* any other request inputs

Verify:

* type
* required/optional status
* format constraints
* length constraints
* allowed values
* dependencies

### Authentication behavior

Verify:

* whether login itself requires authentication
* returned authentication information
* any account-status requirements

### Account lockout

Identify exactly what is specified regarding:

* failed login attempts
* lock state
* unlock behavior
* thresholds
* counters
* responses

If a threshold or rule is absent, preserve it as:

**Not specified**

Do not infer one.

### Responses

Verify:

* success status
* failure statuses
* response body
* error body
* required fields

### Security

Verify which SEC requirements actually apply to FR-02.

---

## 3. Audit FR-09 — Discount Coupons

Verify all extracted information related to FR-09.

Pay special attention to distinguishing:

* coupon creation/administration behavior
* coupon validation
* coupon application
* discount calculation
* coupon eligibility
* coupon existence
* expiry
* usage limits
* cart/order dependencies

Do not assume conventional coupon behavior unless explicitly stated.

For every coupon rule such as:

* minimum order value
* expiration date
* percentage range
* fixed discount
* maximum discount
* usage count
* per-user usage limit
* active/inactive status

classify it according to the specification.

If no such rule exists in `api_specification.md`, write:

**Not specified**

---

## 4. Audit FR-18 — Order Management (Admin)

Verify all extracted information related to FR-18.

Pay particular attention to:

### Authorization

* authentication requirement
* admin role requirement
* access restrictions

### Inputs

* order ID
* requested status
* body fields
* headers
* path/query parameters

### Order states

Identify every state explicitly present in the specification.

### State transitions

Separate:

#### Explicitly allowed transitions

Only transitions directly supported by the specification.

#### Explicitly prohibited transitions

Only transitions directly prohibited by the specification.

#### Unspecified transitions

Transitions for which the specification provides insufficient information.

Do not construct a state-transition matrix from common e-commerce behavior.

### Responses

Verify:

* success status codes
* error status codes
* response schemas
* error schemas

### Security

Verify which SEC requirements actually apply to FR-18, especially authorization and privilege-related requirements.

---

## 5. Audit SEC-01 through SEC-07 Mapping

Create the following table:

| Security Requirement | FR-02 | FR-09 | FR-18 | Evidence from Spec | Verification |
| -------------------- | ----- | ----- | ----- | ------------------ | ------------ |

Allowed values for `Verification`:

* VERIFIED
* PARTIALLY VERIFIED
* UNSUPPORTED
* AMBIGUOUS

Do not classify a security requirement as applicable solely because a generic security attack could theoretically target the endpoint.

There must be a defensible connection to the specification.

---

## 6. Audit Response Schemas

For every selected endpoint, verify the extracted response schema.

Create:

| Feature | Endpoint | Status | Field | Type | Required? | Verification |
| ------- | -------- | ------ | ----- | ---- | --------- | ------------ |

Pay attention to:

* missing fields
* incorrect field names
* incorrect types
* undocumented assumed fields
* inconsistent response structures

Do not fill missing schema information yourself.

---

## 7. Audit Preconditions and Dependencies

Verify all prerequisites claimed in Prompt 001.

Examples:

* existing user
* valid credentials
* locked account
* existing cart
* existing coupon
* existing order
* administrator account
* particular order state

For each dependency classify it as:

| Dependency | Feature | Classification | Evidence / Reason |
| ---------- | ------- | -------------- | ----------------- |

Classification:

* EXPLICIT
* IMPLIED-BY-ENDPOINT
* UNSUPPORTED
* AMBIGUOUS

Use `IMPLIED-BY-ENDPOINT` sparingly and clearly distinguish it from an explicit requirement.

---

## 8. Identify Hallucinations or Over-Inference

Produce a dedicated section:

### Potential Hallucinations / Unsupported Assumptions

List every Prompt 001 statement that:

* introduces a constraint absent from the specification
* invents a business rule
* assumes an HTTP status
* assumes an error message
* assumes a security behavior
* assumes a state transition
* assumes a parameter boundary
* assumes conventional e-commerce behavior

Use this format:

| ID | Feature | Prompt 001 Statement | Problem | Corrected Version |
| -- | ------- | -------------------- | ------- | ----------------- |

If the correct version cannot be determined, use:

**Not specified**

---

## 9. Identify Missing Requirements

Check whether Prompt 001 failed to extract anything relevant from the specification.

Create:

| ID | Feature | Missing Requirement | Source Section | Why Testing-Relevant |
| -- | ------- | ------------------- | -------------- | -------------------- |

Do not manufacture missing requirements.

---

## 10. Normalize the Requirement Model

After completing the audit, produce a clean final requirement model containing **only verified information**.

For each feature use:

### FR-XX — Feature Name

#### A. Endpoints

#### B. Inputs and Explicit Constraints

#### C. Authentication / Authorization

#### D. Business Rules

#### E. States and Explicit State Rules

#### F. Response Codes

#### G. Response Schema

#### H. Applicable Security Requirements

#### I. Preconditions / Dependencies

#### J. Unspecified or Ambiguous Items

Anything not explicitly supported must be moved into section J instead of being presented as fact.

---

## 11. Create the Verified Test-Basis Matrix

Produce this final table:

| TB-ID | Feature | Endpoint | Requirement Type | Verified Requirement | Source | Testable? | Notes |
| ----- | ------- | -------- | ---------------- | -------------------- | ------ | --------- | ----- |

Where `Requirement Type` is one of:

* INPUT
* DOMAIN
* AUTHENTICATION
* AUTHORIZATION
* BUSINESS_RULE
* STATE
* SECURITY
* RESPONSE_STATUS
* RESPONSE_SCHEMA
* DEPENDENCY

`Testable?` must be:

* YES
* PARTIAL
* NO

Use sequential IDs:

* TB-FR02-001...
* TB-FR09-001...
* TB-FR18-001...

This matrix will become the authoritative test basis for later test-design prompts.

---

## 12. Produce a Test-Design Blocker List

Finally produce:

### Test-Design Blockers

Identify specification gaps that prevent deterministic test-case design.

Use:

| Blocker ID | Feature | Missing Information | Impact on Testing | Recommended Handling |
| ---------- | ------- | ------------------- | ----------------- | -------------------- |

For `Recommended Handling`, choose only from:

* Verify against implementation later
* Keep expected result unspecified
* Exclude from spec-based test design
* Mark as exploratory test candidate

Do not resolve the blocker yourself.

---

# Important Constraints

* Do not generate test cases.
* Do not generate test data.
* Do not propose boundary values unless explicitly defined by the specification.
* Do not inspect source code.
* Do not use README documentation as an additional source of truth.
* Do not rely on general REST conventions.
* Do not rely on common e-commerce behavior.
* Do not silently correct the specification.
* Do not invent security requirements.
* Do not invent state-transition rules.
* Preserve **Not specified** wherever the authoritative specification is incomplete.
* Clearly distinguish facts from interpretation.

The objective of Prompt 002 is to create a **verified and normalized test basis**, not a test suite.
