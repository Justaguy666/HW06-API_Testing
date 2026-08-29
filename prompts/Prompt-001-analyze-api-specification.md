# Prompt 001 — Analyze API Specification for Selected Features

You are assisting me with HW06 – API Testing for the EShop SUT.

I have selected the following three features for this assignment:

* Pool A — **FR-02: Login and Account Lockout**
* Pool B — **FR-09: Discount Coupons**
* Pool C — **FR-18: Order Management (Admin)**

I will provide the SUT's `api_specification.md`.

Your task in this step is to **analyze and extract the testing-relevant requirements from the specification only**.

Do **not generate test cases yet**.

## Objectives

For each selected feature, identify all API endpoints that implement or directly support that feature.

For every relevant endpoint, extract the following information strictly from the provided specification:

1. **Feature and endpoint mapping**

   * Feature ID
   * Feature name
   * HTTP method
   * Endpoint/path
   * Purpose of the endpoint

2. **Authentication and authorization**

   * Whether authentication is required
   * Required role(s)
   * Token/header requirements
   * Any ownership or access-control restrictions

3. **Request inputs**
   Categorize every input as:

   * Path parameter
   * Query parameter
   * Header
   * Request body field

   For each input, identify:

   * Name
   * Data type
   * Required / optional
   * Valid constraints
   * Allowed values
   * Format requirements
   * Minimum / maximum values or lengths
   * Default values, if specified
   * Relationships or dependencies with other inputs

4. **Business rules**
   Extract all business rules relevant to:

   * Login
   * Failed login attempts
   * Account lockout
   * Coupon validation/application
   * Coupon eligibility
   * Coupon expiration or usage restrictions
   * Admin order operations
   * Order status changes

5. **State-related behavior**
   Identify any states and transitions involved in the selected features.

   For each stateful resource, provide:

   * Possible states
   * Valid transitions explicitly stated in the specification
   * Invalid or prohibited transitions explicitly stated in the specification
   * Preconditions for transitions

6. **Response specification**
   For each endpoint:

   * Expected success status code(s)
   * Expected error status code(s)
   * Response body structure
   * Required response fields
   * Field types
   * Error response structure

7. **Security requirements**
   Map all applicable **SEC-01 through SEC-07** requirements to the selected APIs.

   For each mapping, explain:

   * Which API/endpoint is affected
   * What the security requirement requires
   * Why it is relevant to that endpoint

8. **Dependencies and test preconditions**
   Identify resources or prior actions required before testing each API, such as:

   * Existing user
   * User role
   * Locked/unlocked account
   * Existing coupon
   * Coupon state
   * Existing order
   * Current order state
   * Admin account

9. **Specification ambiguities**
   Create a separate list of anything that is:

   * Missing
   * Ambiguous
   * Contradictory
   * Under-specified

   Do not invent a rule to resolve an ambiguity.

## Important constraints

* Use **only information explicitly supported by `api_specification.md`**.
* Do not assume behavior based on common REST conventions or e-commerce systems.
* Do not infer undocumented validation constraints.
* Do not generate test cases in this step.
* Do not propose expected results unless they are supported by the specification.
* If information is unavailable, write **"Not specified"**.
* Clearly distinguish explicit specification statements from any interpretation.
* Preserve exact requirement IDs such as FR-02, FR-09, FR-18, and SEC-01–SEC-07.

## Required output

Produce the result in this structure:

### 1. FR-02 — Login and Account Lockout

#### 1.1 Relevant endpoints

#### 1.2 Inputs and constraints

#### 1.3 Authentication / authorization

#### 1.4 Business rules

#### 1.5 States and transitions

#### 1.6 Response schemas

#### 1.7 Applicable security requirements

#### 1.8 Preconditions and dependencies

#### 1.9 Specification ambiguities

### 2. FR-09 — Discount Coupons

Use the same subsections.

### 3. FR-18 — Order Management (Admin)

Use the same subsections.

### 4. Cross-Feature Dependency Matrix

Create a table:

| Dependency / Resource | FR-02 | FR-09 | FR-18 | Notes |
| --------------------- | ----- | ----- | ----- | ----- |

### 5. Requirement Traceability Table

Create a table:

| Requirement ID | API / Endpoint | Requirement / Rule | Source Section | Testing Relevance |
| -------------- | -------------- | ------------------ | -------------- | ----------------- |

### 6. Open Questions / Specification Gaps

List all points that must be clarified or verified against the implementation before detailed test design begins.

Remember: **this is requirement analysis, not test-case generation.**
