# Static Test-Data Catalog

All items in this file are pre-run representations or observation instructions. A placeholder is not a committed secret.

## Shared

### DATA-SHARED-001

- Data ID: DATA-SHARED-001
- Feature: SHARED
- Category: ENVIRONMENT
- Purpose: Locate the EShop API without duplicating its host in requests.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `{{base_url}}`, default candidate `http://localhost:3000`, verified when the environment is prepared.
- Specification Role: The API specification documents the base URL.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-001–013, TC-API-046–066, TC-API-074–095, TC-API-116–181 (active selected IDs only)
- Setup Dependency: SETUP-001
- Blocker Refs: NONE
- Notes: The value is environment-level and is not repeated in request definitions.

### DATA-SHARED-002

- Data ID: DATA-SHARED-002
- Feature: SHARED
- Category: HEADER
- Purpose: Supply the assignment-required student trace header.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `X-Student-Id: {{student_id}}`.
- Specification Role: Assignment execution requirement; not an EShop behavioral oracle.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: All 122 active tests
- Setup Dependency: SETUP-001
- Blocker Refs: NONE
- Notes: The actual student ID is stored only in a private local environment.

### DATA-SHARED-003

- Data ID: DATA-SHARED-003
- Feature: SHARED
- Category: HEADER
- Purpose: Represent the normal JSON request media type.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `Content-Type: application/json`.
- Specification Role: Request bodies are documented as JSON examples; exact failure behavior is not defined.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: Body-bearing nominal FR-02, FR-07, and FR-18 tests except cases that intentionally omit or vary the header
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR07-001, BLK-FR18-003
- Notes: This is request representation, not a response Content-Type oracle.

### DATA-SHARED-004

- Data ID: DATA-SHARED-004
- Feature: SHARED
- Category: AUTH
- Purpose: Provide unauthenticated and non-Bearer request contexts.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Variant A omits `Authorization`; variant B uses `Authorization: Basic probe-credentials`; execute one variant per case.
- Specification Role: Protected Cart/Admin operations document Bearer authentication; failure details are unspecified.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-048, TC-API-049, TC-API-056, TC-API-057, TC-API-135–138
- Setup Dependency: NONE
- Blocker Refs: BLK-FR07-011, BLK-FR18-006
- Notes: `probe-credentials` is deliberately not a real credential or token.

### DATA-SHARED-005

- Data ID: DATA-SHARED-005
- Feature: SHARED
- Category: EXPECTED_OBSERVATION
- Purpose: Capture observable response evidence without inventing unsupported assertions.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Record status, headers, raw body, parsed top-level kind when parseable, elapsed time, and selected before/after observations.
- Specification Role: Supports partial/exploratory oracles across the canonical suite.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: All exploratory or partially specified active tests
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-004, BLK-FR07-008, BLK-FR18-005
- Notes: Recording does not imply a required value.

### DATA-SHARED-006

- Data ID: DATA-SHARED-006
- Feature: SHARED
- Category: EXPECTED_OBSERVATION
- Purpose: Record response `Content-Type` exactly as received.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Capture the header verbatim, including parameters, or record `ABSENT`.
- Specification Role: No exact response media type is documented for the targeted operations.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-173, TC-API-174, TC-API-179, TC-API-180
- Setup Dependency: operation-specific setup only
- Blocker Refs: BLK-FR07-008, BLK-FR18-005
- Notes: Do not assert `application/json`.

## FR-02

### DATA-FR02-003

- Data ID: DATA-FR02-003
- Feature: FR-02
- Category: BODY
- Purpose: Represent isolated credential-member presence and JSON-type variations.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Email variants: omitted, `null`, boolean `true`; password variants: omitted, `null`, object `{}`. Keep the other member as a benign string.
- Specification Role: The example contains `email` and `password`; requiredness and normative types are unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-003–005, TC-API-007–009
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001
- Notes: One member is varied per execution; outcomes remain observational.

### DATA-FR02-004

- Data ID: DATA-FR02-004
- Feature: FR-02
- Category: HEADER
- Purpose: Represent login transport variations safely.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Variant A omits `Content-Type`; B uses `text/plain`; C adds `Authorization: Bearer representation-probe`; D uses raw malformed JSON `{"email":`.
- Specification Role: Login method/path and JSON body example are documented; these handling rules are not.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-010–012, TC-API-088
- Setup Dependency: Runtime credentials only where the case requests a matching pair
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: Variant D is representation robustness, not an attack payload.

### DATA-FR02-005

- Data ID: DATA-FR02-005
- Feature: FR-02
- Category: BODY
- Purpose: Represent whole-body and duplicate-member variations.
- Concrete / Runtime: STATIC
- Value / Logical Generator: No body; `{}`; `{"email":null,"password":null}`; nominal fields plus `"probe":"extra"`; raw JSON with two `email` keys; raw JSON with two `password` keys.
- Specification Role: Only the two-member example is documented; duplicate/extra handling is unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-078–083
- Setup Dependency: SETUP-002 where matching/conflicting credential classes are needed
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: Duplicate-key requests must be sent as raw text to preserve representation.

### DATA-FR02-009

- Data ID: DATA-FR02-009
- Feature: FR-02
- Category: EXPECTED_OBSERVATION
- Purpose: Compare failure disclosure and audit successful user data.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Normalize only observable status/body shape/message class; for success inventory returned user-field names and flag credential/token/secret-like fields for human review.
- Specification Role: Failure schema and permitted user fields are unspecified.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-077, TC-API-094, TC-API-095
- Setup Dependency: SETUP-002
- Blocker Refs: BLK-FR02-004, BLK-FR02-005, BLK-ALL-001
- Notes: Store evidence securely; do not commit returned tokens or personal data.

### DATA-FR02-010

- Data ID: DATA-FR02-010
- Feature: FR-02
- Category: ROBUSTNESS_PROBE
- Purpose: Supply a reproducible extreme-length email representation.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `LONG_EMAIL_PROBE(4096)` = `repeat("a",4096) + "@example.invalid"`.
- Specification Role: Human risk subclass; no account association is assumed.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-165
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: Probe Rationale: a deliberately large reproducible representation selected for robustness observation; not a claimed valid/invalid threshold.

### DATA-FR02-011

- Data ID: DATA-FR02-011
- Feature: FR-02
- Category: ROBUSTNESS_PROBE
- Purpose: Supply a reproducible extreme-length password representation.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `LONG_STRING_PROBE(4096,"A")`.
- Specification Role: Human risk subclass; no maximum password length is documented.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-166
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: Probe Rationale: a deliberately large reproducible representation selected for robustness observation; not a claimed valid/invalid threshold.

### DATA-FR02-012

- Data ID: DATA-FR02-012
- Feature: FR-02
- Category: ROBUSTNESS_PROBE
- Purpose: Cover a minimal reproducible Unicode set.
- Concrete / Runtime: STATIC
- Value / Logical Generator: One field at a time: accented Latin `tést@example.invalid`; non-Latin `测试@example.invalid`; supplementary-plane password `Pass😀word1!`.
- Specification Role: Unicode representation is unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-167
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: Three representatives cover the requested classes without multiplying logical tests.

### DATA-FR02-013

- Data ID: DATA-FR02-013
- Feature: FR-02
- Category: ROBUSTNESS_PROBE
- Purpose: Represent safe special-character classes without exploit payloads.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Insert one class at a time into a benign string: quotation `"`; bracket `[]`; backslash `\`; JSON escaped newline `\n`.
- Specification Role: Character-class behavior is unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-168
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR02-004, BLK-ALL-001
- Notes: No SQLi, XSS, or command-injection string is supplied.

### DATA-FR02-014

- Data ID: DATA-FR02-014
- Feature: FR-02
- Category: BODY
- Purpose: Provide distinguishable positionally swapped credential values.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Baseline roles `email-intended@example.invalid` and `Password-Role-Only!`; swapped body assigns the password-intended string to `email` and the email-intended string to `password`.
- Specification Role: Both documented members are present as strings; semantic swap behavior is unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-169
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-001, BLK-FR02-004
- Notes: This is a two-field interaction observation, not an authentication-success setup.

### DATA-FR02-015

- Data ID: DATA-FR02-015
- Feature: FR-02
- Category: ROBUSTNESS_PROBE
- Purpose: Define a finite endpoint-level rate-control observation.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Send 20 identical non-matching login requests at 2 requests/second; record each status, relevant headers, body class, and latency.
- Specification Role: Rate limiting is not documented.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-170
- Setup Dependency: NONE
- Blocker Refs: BLK-FR02-002, BLK-FR02-004, BLK-ALL-001
- Notes: `EXPLORATORY PROBE — NOT A DOCUMENTED THROTTLING THRESHOLD`; throttling is not required to occur.

## FR-07

### DATA-FR07-002

- Data ID: DATA-FR07-002
- Feature: FR-07
- Category: BODY
- Purpose: Preserve the documented Cart JSON representation without asserting resource existence.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}`.
- Specification Role: Exact example representation in the API specification.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-132–134, TC-API-137–140, TC-API-142–153, TC-API-160–163, TC-API-174–176 where a representation-only baseline is sufficient
- Setup Dependency: SETUP-003 for authenticated execution
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009
- Notes: Literal `1` is an example value, not a guaranteed existing product ID.

### DATA-FR07-004

- Data ID: DATA-FR07-004
- Feature: FR-07
- Category: BODY
- Purpose: Represent member omission and type variation one field at a time.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Omit selected member; `id:null`; `name:{}`; `price:"100000"`; `quantity:"2"`. Unrelated fields retain DATA-FR07-002 values.
- Specification Role: Example members exist, but requiredness and normative types are unspecified.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-142–143, TC-API-145–146, TC-API-148–149, TC-API-151–152
- Setup Dependency: SETUP-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-008, BLK-FR07-009
- Notes: Results are observational, not deterministic invalid assertions.

### DATA-FR07-005

- Data ID: DATA-FR07-005
- Feature: FR-07
- Category: FIELD_VALUE
- Purpose: Supply alternate example-shaped scalar representatives.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `id:2`, `name:"Sản phẩm B"`, `price:125000`, `quantity:3`; vary one member per execution.
- Specification Role: Broad number/string-shaped exploratory partitions.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-141, TC-API-144, TC-API-147, TC-API-150, TC-API-153
- Setup Dependency: SETUP-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009, BLK-FR07-010
- Notes: `id:2` does not claim that product 2 exists.

### DATA-FR07-006

- Data ID: DATA-FR07-006
- Feature: FR-07
- Category: BODY
- Purpose: Represent non-documented top-level body shapes.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Non-JSON text `cart-probe`; JSON array `[ {"id":1,"name":"Sản phẩm A","price":100000,"quantity":2} ]`.
- Specification Role: The documented request is a JSON object.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-140, TC-API-175
- Setup Dependency: SETUP-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-008
- Notes: These are safe representation probes, not exploit payloads.

### DATA-FR07-011

- Data ID: DATA-FR07-011
- Feature: FR-07
- Category: ROBUSTNESS_PROBE
- Purpose: Supply negative, fractional, and extreme-magnitude numeric representatives.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Quantity `-1`; quantity `1.5`; `LARGE_NUMBER_PROBE()` = `1000000000000`, applied to exactly one of `id`, `price`, or `quantity` per execution.
- Specification Role: Exploratory numeric subclasses; the API only provides numeric examples.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-171, TC-API-172, TC-API-176
- Setup Dependency: SETUP-003
- Blocker Refs: BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009, BLK-FR07-010
- Notes: Values are `EXPLORATORY`, not deterministic invalid inputs, limits, or overflow claims.

### DATA-FR07-012

- Data ID: DATA-FR07-012
- Feature: FR-07
- Category: EXPECTED_OBSERVATION
- Purpose: Characterize Cart transport, response, mutation visibility, and response media type.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Record response via DATA-SHARED-005; for focused media-type tests also apply DATA-SHARED-006; for sequence cases compare observations without requiring accumulation, persistence, stock, or ordering.
- Specification Role: Cart response contracts and mutation semantics are unspecified.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-130–140, TC-API-153–163, TC-API-171–176
- Setup Dependency: Operation-specific SETUP IDs
- Blocker Refs: BLK-FR07-005, BLK-FR07-006, BLK-FR07-008, BLK-FR07-009, BLK-FR07-012
- Notes: No `application/json`, duplicate accumulation, or stock outcome is asserted.

## FR-18

### DATA-FR18-005

- Data ID: DATA-FR18-005
- Feature: FR-18
- Category: FIELD_VALUE
- Purpose: Supply the complete documented status vocabulary.
- Concrete / Runtime: STATIC
- Value / Logical Generator: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; choose one target per execution.
- Specification Role: Explicit categorical vocabulary in the Admin order-status API.
- Boundary Status: NOT_APPLICABLE
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-050–054, TC-API-121, TC-API-124–128, TC-API-180–181
- Setup Dependency: SETUP-009 and, where transition validity matters, SETUP-014
- Blocker Refs: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- Notes: Vocabulary membership does not define a permitted transition.

### DATA-FR18-006

- Data ID: DATA-FR18-006
- Feature: FR-18
- Category: BODY
- Purpose: Represent identifier, body, status, and extra-member variations.
- Concrete / Runtime: STATIC
- Value / Logical Generator: ID representation `order-probe`; status outside vocabulary `unknown_status`; no body; `{}`; `{"status":null}`; `{"status":42}`; nominal status plus `"probe":"extra"`; omit path segment for TC-API-059.
- Specification Role: ID format and status validation details are unspecified; the five status strings are the only documented vocabulary.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: YES
- Used By Test IDs: TC-API-059–066, TC-API-122–124, TC-API-129
- Setup Dependency: SETUP-005 and SETUP-009 as applicable
- Blocker Refs: BLK-FR18-003, BLK-FR18-005, BLK-FR18-006
- Notes: `unknown_status` is categorical outside-set data, not a boundary.

### DATA-FR18-007

- Data ID: DATA-FR18-007
- Feature: FR-18
- Category: EXPECTED_OBSERVATION
- Purpose: Characterize Admin list and update responses without inventing schemas.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Inventory top-level JSON kind, item count if array-like, observable field names/types, status, headers, and body; undocumented simple query is `probe=1`.
- Specification Role: List purpose is documented; exact response schemas/statuses are not.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: YES
- Used By Test IDs: TC-API-046, TC-API-116–121
- Setup Dependency: SETUP-005
- Blocker Refs: BLK-FR18-005
- Notes: Do not commit order/customer response values.

### DATA-FR18-011

- Data ID: DATA-FR18-011
- Feature: FR-18
- Category: ROBUSTNESS_PROBE
- Purpose: Supply compact structured undocumented query families.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Execution A `page=1&limit=2` (`UNDOCUMENTED_QUERY_PROBE`, pagination-shaped); execution B `status=pending` (`UNDOCUMENTED_QUERY_PROBE`, filter-shaped).
- Specification Role: GET Admin orders documents no query support.
- Boundary Status: NOT_A_BOUNDARY
- Sensitive: NO
- Reusable: NO
- Used By Test IDs: TC-API-177
- Setup Dependency: SETUP-005
- Blocker Refs: BLK-FR18-005
- Notes: One family per execution; support, filtering, or pagination is not asserted.

### DATA-FR18-012

- Data ID: DATA-FR18-012
- Feature: FR-18
- Category: SEQUENCE
- Purpose: Compare observable ordering across stable repeated reads.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Capture observable order-identity sequence A, immediately repeat the same authenticated request with no intentional mutation, then capture sequence B.
- Specification Role: Ordering is undocumented.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-120, TC-API-178
- Setup Dependency: SETUP-005
- Blocker Refs: BLK-FR18-005
- Notes: Same admin, same endpoint, no intentional mutation; no required ordering is defined.

### DATA-FR18-013

- Data ID: DATA-FR18-013
- Feature: FR-18
- Category: EXPECTED_OBSERVATION
- Purpose: Restrict status-update traceability inspection to the API-visible response.
- Concrete / Runtime: STATIC
- Value / Logical Generator: Record only response headers and body fields that visibly identify/correlate the action; otherwise record `NO IN-SCOPE TRACEABILITY CHANNEL DOCUMENTED`.
- Specification Role: No audit-log or traceability channel is documented.
- Boundary Status: NOT_APPLICABLE
- Sensitive: YES
- Reusable: NO
- Used By Test IDs: TC-API-181
- Setup Dependency: SETUP-005, SETUP-009
- Blocker Refs: BLK-FR18-001, BLK-FR18-005, BLK-ALL-001
- Notes: Database tables, server logs, filesystem, and implementation-only tracing are excluded.
