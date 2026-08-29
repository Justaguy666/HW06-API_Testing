# Confirmed Defect Register

## DEFECT-001

```text
Defect ID:
DEFECT-001

Source Triage ID:
TRIAGE-001

Title:
Authenticated non-Admin users can read and update system-wide Admin orders

Type:
SECURITY

Severity:
HIGH

Affected Feature:
FR-18 — Admin Order Management

Affected Endpoint:
GET /api/admin/orders
PUT /api/admin/orders/:id/status

Detected By Test IDs:
TC-API-047, TC-API-055

Specification Evidence:
api_specification.md section 6 states that all /api/admin/* APIs require a Bearer token and an Admin account. README.md lines 176–180 additionally require role = admin in the token.

Preconditions:
A normal user is registered and authenticated; its returned role is confirmed non-Admin and its token is populated. For update reproduction, an existing order is provisioned through documented APIs.

Minimal Reproduction:
1. Register and authenticate a normal user.
2. Confirm the returned user role is not admin without exposing its token.
3. Send GET /api/admin/orders with the normal-user Bearer token.
4. Optionally send PUT /api/admin/orders/:id/status for a legitimately provisioned order with the same token.

Expected Behavior:
The non-Admin caller must not obtain successful access to Admin-only order operations. No specific denial status is asserted.

Actual Behavior:
Both Admin-list repetitions returned HTTP 200. The targeted valid-order update also returned HTTP 200 using a confirmed non-Admin token.

Reproducibility:
REPRODUCED — GET 2/2; PUT 1/1 targeted verification.

Impact:
Any authenticated normal user may read system-wide order information and modify order status, violating role-based access control and risking confidentiality and integrity.

Evidence:
reports/newman/triage/tc-api-047/reproduction-report.json; reports/newman/triage/setup-009/post-fix/verification-report.json

Postman Defect?:
NO

Ready for Bug Report:
YES
```

## DEFECT-002

```text
Defect ID:
DEFECT-002

Source Triage ID:
TRIAGE-002, TRIAGE-003

Title:
Login endpoint returns an unhandled HTTP 500 when the JSON request body is unavailable

Type:
ROBUSTNESS

Severity:
MEDIUM

Affected Feature:
FR-02 — Login

Affected Endpoint:
POST /api/login

Detected By Test IDs:
TC-API-011, TC-API-078

Specification Evidence:
api_specification.md documents POST /api/login with a JSON credential body. It does not define an invalid-input status code; therefore no 400/422 oracle is claimed.

Preconditions:
The API is reachable. Submit either a syntactically deliverable non-JSON media-type request or a request with no body.

Minimal Reproduction:
1. POST /api/login with the TC-API-011 non-JSON media-type representation; observe the response.
2. Separately POST /api/login with no request body as TC-API-078; observe the response.

Expected Behavior:
The safely deliverable request should be handled without terminating in an unhandled internal server failure. No exact invalid-input response status is asserted.

Actual Behavior:
Both input classes repeatedly return HTTP 500 with an HTML error response showing the same unhandled TypeError caused by an unavailable request body.

Reproducibility:
REPRODUCED — TC-API-011 2/2; TC-API-078 2/2.

Impact:
Simple unsupported or absent login bodies trigger internal exception handling and expose implementation error details, reducing robustness and potentially aiding reconnaissance.

Evidence:
reports/newman/triage/tc-api-011/reproduction-report.json; reports/newman/triage/tc-api-078/reproduction-report.json

Postman Defect?:
NO

Ready for Bug Report:
YES
```

## DEFECT-003

```text
Defect ID:
DEFECT-003

Source Triage ID:
TRIAGE-006

Title:
Setup guide and repository README provide conflicting default Admin credentials

Type:
DOCUMENTATION

Severity:
LOW

Affected Feature:
Local Admin runtime setup

Affected Endpoint:
POST /api/login

Detected By Test IDs:
Runtime prerequisite validation; no logical Test ID

Specification Evidence:
setup_guide.md lines 103–105 and README.md line 23 identify the same default Admin identity but provide different password values. Repository seed comparison agrees with only one source.

Preconditions:
Initialize the local fixture through the repository bootstrap and attempt documented Admin login without altering the account.

Minimal Reproduction:
1. Compare the two credential references with values redacted.
2. Compare each to the seed fixture without printing the secret.
3. Authenticate after normal lock expiry using the seed-consistent source.

Expected Behavior:
Setup documentation should provide one consistent local Admin credential matching the repository seed fixture.

Actual Behavior:
The documents disagree; only one matches the seed and completes legitimate login.

Reproducibility:
REPRODUCED through static comparison and clean legitimate login evidence.

Impact:
Students following the setup guide can fail Admin authentication and trigger temporary account lockout, blocking FR-18 execution.

Evidence:
evidence/smoke/admin-prerequisite-resolution.md

Postman Defect?:
NO

Ready for Bug Report:
YES
```

