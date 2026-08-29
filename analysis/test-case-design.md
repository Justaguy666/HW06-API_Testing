## A. Inputs Reviewed

- `eshop-sut/api_specification.md` — authoritative source.
- `analysis/verified-test-basis.md`, `analysis/domain-model.md`, and `analysis/boundary-value-analysis.md`.
- Prompt 002–004 logs only where needed for decision context.
- No source code, README, database, runtime, Postman suite, or implementation behavior was inspected.

## B. Test Design Summary (Prompt 005 Baseline)

The figures below preserve the 73-case baseline before the Prompt 006 scope audit and expansion. The authoritative updated totals are in section P.

```text
Parameters: 27
Partitions reviewed: 91

Candidate tests before minimization: 82
Final logical test cases: 73

POSITIVE: 3
NEGATIVE: 20
CONDITIONAL: 11
EXPLORATORY: 39

READY: 23
BLOCKED: 11
EXPLORATORY_ONLY: 39
```

## C. Test Cases by Endpoint (Prompt 005 Baseline)

| Endpoint / Operation | Positive | Negative | Conditional | Exploratory | Total |
| -------------------- | -------: | -------: | ----------: | ----------: | ----: |
| `POST /api/login` | 1 | 0 | 1 | 11 | 13 |
| `POST /api/apply-coupon` | 0 | 0 | 1 | 14 | 15 |
| `GET /api/coupons` | 0 | 2 | 1 | 1 | 4 |
| `POST /api/admin/coupons` | 0 | 3 | 1 | 2 | 6 |
| `DELETE /api/admin/coupons/:id` | 1 | 4 | 0 | 2 | 7 |
| `GET /api/admin/orders` | 1 | 3 | 0 | 0 | 4 |
| `PUT /api/admin/orders/:id/status` | 0 | 5 | 5 | 7 | 17 |
| `PUT /api/orders/:id/cancel` | 0 | 3 | 2 | 2 | 7 |
| **Total** | **3** | **20** | **11** | **39** | **73** |

## D. Test Case Inventory (TC-API-001–073 Baseline)

| Test ID | Endpoint | Primary Objective | Primary Partition | Category | Executability |
| ------- | -------- | ----------------- | ----------------- | -------- | ------------- |
| TC-API-001 | `POST /api/login` | Verify successful login for an existing account-associated matching credential pair. | EP-FR02-001 | POSITIVE | READY |
| TC-API-002 | `POST /api/login` | Observe handling of an email not associated with a usable credential pair. | EP-FR02-002 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-003 | `POST /api/login` | Observe omitted email handling. | EP-FR02-003 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-004 | `POST /api/login` | Observe null-like email handling. | EP-FR02-004 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-005 | `POST /api/login` | Observe non-string email handling. | EP-FR02-005 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-006 | `POST /api/login` | Observe handling of a password not matching the selected account. | EP-FR02-007 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-007 | `POST /api/login` | Observe omitted password handling. | EP-FR02-008 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-008 | `POST /api/login` | Observe null-like password handling. | EP-FR02-009 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-009 | `POST /api/login` | Observe non-string password handling. | EP-FR02-010 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-010 | `POST /api/login` | Observe behavior when Content-Type is omitted. | EP-FR02-012 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-011 | `POST /api/login` | Observe non-JSON media-type handling. | EP-FR02-013 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-012 | `POST /api/login` | Observe the effect of request Authorization on login. | EP-FR02-015 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-013 | `POST /api/login` | Characterize repeated failed-login and any lock/unlock transition once rules exist. | EP-FR02-007 | CONDITIONAL | BLOCKED |
| TC-API-014 | `POST /api/apply-coupon` | Verify documented coupon application for existing coupon/user and number-shaped total once eligibility/formula are known. | EP-FR09-001 | CONDITIONAL | BLOCKED |
| TC-API-015 | `POST /api/apply-coupon` | Observe non-existing coupon-code handling. | EP-FR09-002 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-016 | `POST /api/apply-coupon` | Observe omitted coupon-code handling. | EP-FR09-003 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-017 | `POST /api/apply-coupon` | Observe null-like coupon-code handling. | EP-FR09-004 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-018 | `POST /api/apply-coupon` | Observe non-string coupon-code handling. | EP-FR09-005 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-019 | `POST /api/apply-coupon` | Observe omitted total handling. | EP-FR09-007 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-020 | `POST /api/apply-coupon` | Observe null-like total handling. | EP-FR09-008 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-021 | `POST /api/apply-coupon` | Observe non-number total handling. | EP-FR09-009 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-022 | `POST /api/apply-coupon` | Observe non-existing user identifier handling. | EP-FR09-011 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-023 | `POST /api/apply-coupon` | Observe omitted user identifier handling. | EP-FR09-012 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-024 | `POST /api/apply-coupon` | Observe null-like user identifier handling. | EP-FR09-013 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-025 | `POST /api/apply-coupon` | Observe non-number user identifier handling. | EP-FR09-014 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-026 | `POST /api/apply-coupon` | Observe Authorization/token-identity effect on application. | EP-FR09-016 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-027 | `POST /api/apply-coupon` | Observe omitted Content-Type handling. | EP-FR09-018 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-028 | `POST /api/apply-coupon` | Observe non-JSON media-type handling. | EP-FR09-019 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-029 | `GET /api/coupons` | Verify list access using Admin-associated Bearer context once role enforcement is clarified. | EP-FR09-020 | CONDITIONAL | BLOCKED |
| TC-API-030 | `GET /api/coupons` | Observe list access with non-Admin-associated Bearer context. | EP-FR09-021 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-031 | `GET /api/coupons` | Verify rejection when required Authorization is omitted. | EP-FR09-022 | NEGATIVE | READY |
| TC-API-032 | `GET /api/coupons` | Verify rejection when Authorization lacks documented Bearer form. | EP-FR09-023 | NEGATIVE | READY |
| TC-API-033 | `POST /api/admin/coupons` | Verify coupon creation with Admin Bearer and all example-shaped fields once body validity is defined. | EP-FR09-024 | CONDITIONAL | BLOCKED |
| TC-API-034 | `POST /api/admin/coupons` | Verify non-Admin caller cannot create coupon. | EP-FR09-025 | NEGATIVE | READY |
| TC-API-035 | `POST /api/admin/coupons` | Verify unauthenticated caller cannot create coupon. | EP-FR09-026 | NEGATIVE | READY |
| TC-API-036 | `POST /api/admin/coupons` | Verify non-Bearer Authorization cannot create coupon. | EP-FR09-027 | NEGATIVE | READY |
| TC-API-037 | `POST /api/admin/coupons` | Observe create behavior without Content-Type. | EP-FR09-035 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-038 | `POST /api/admin/coupons` | Observe create behavior with non-JSON media type. | EP-FR09-036 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-039 | `DELETE /api/admin/coupons/:id` | Verify Admin Bearer can delete an existing coupon. | EP-FR09-037 | POSITIVE | READY |
| TC-API-040 | `DELETE /api/admin/coupons/:id` | Verify non-Admin caller cannot delete coupon. | EP-FR09-038 | NEGATIVE | READY |
| TC-API-041 | `DELETE /api/admin/coupons/:id` | Verify unauthenticated caller cannot delete coupon. | EP-FR09-039 | NEGATIVE | READY |
| TC-API-042 | `DELETE /api/admin/coupons/:id` | Verify non-Bearer Authorization cannot delete coupon. | EP-FR09-040 | NEGATIVE | READY |
| TC-API-043 | `DELETE /api/admin/coupons/:id` | Observe delete behavior for non-existing coupon identifier. | EP-FR09-042 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-044 | `DELETE /api/admin/coupons/:id` | Verify omitted identifier does not invoke documented delete operation. | EP-FR09-043 | NEGATIVE | READY |
| TC-API-045 | `DELETE /api/admin/coupons/:id` | Observe undocumented identifier representation handling. | EP-FR09-044 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-046 | `GET /api/admin/orders` | Verify authenticated Admin can retrieve orders for the entire system. | EP-FR18-001 | POSITIVE | READY |
| TC-API-047 | `GET /api/admin/orders` | Verify non-Admin caller cannot access system-wide orders. | EP-FR18-002 | NEGATIVE | READY |
| TC-API-048 | `GET /api/admin/orders` | Verify unauthenticated caller cannot access system-wide orders. | EP-FR18-003 | NEGATIVE | READY |
| TC-API-049 | `GET /api/admin/orders` | Verify non-Bearer Authorization cannot access system-wide orders. | EP-FR18-004 | NEGATIVE | READY |
| TC-API-050 | `PUT /api/admin/orders/:id/status` | Verify target status pending once an authoritative source-state rule exists. | EP-FR18-013 | CONDITIONAL | BLOCKED |
| TC-API-051 | `PUT /api/admin/orders/:id/status` | Verify target status confirmed once an authoritative source-state rule exists. | EP-FR18-014 | CONDITIONAL | BLOCKED |
| TC-API-052 | `PUT /api/admin/orders/:id/status` | Verify target status shipping once an authoritative source-state rule exists. | EP-FR18-015 | CONDITIONAL | BLOCKED |
| TC-API-053 | `PUT /api/admin/orders/:id/status` | Verify target status delivered once an authoritative source-state rule exists. | EP-FR18-016 | CONDITIONAL | BLOCKED |
| TC-API-054 | `PUT /api/admin/orders/:id/status` | Verify target status canceled once an authoritative source-state rule exists. | EP-FR18-017 | CONDITIONAL | BLOCKED |
| TC-API-055 | `PUT /api/admin/orders/:id/status` | Verify non-Admin caller cannot update order status. | EP-FR18-006 | NEGATIVE | READY |
| TC-API-056 | `PUT /api/admin/orders/:id/status` | Verify unauthenticated caller cannot update order status. | EP-FR18-007 | NEGATIVE | READY |
| TC-API-057 | `PUT /api/admin/orders/:id/status` | Verify non-Bearer Authorization cannot update order status. | EP-FR18-008 | NEGATIVE | READY |
| TC-API-058 | `PUT /api/admin/orders/:id/status` | Observe update behavior for non-existing order identifier. | EP-FR18-010 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-059 | `PUT /api/admin/orders/:id/status` | Verify omitted order identifier does not invoke documented update operation. | EP-FR18-011 | NEGATIVE | READY |
| TC-API-060 | `PUT /api/admin/orders/:id/status` | Observe undocumented order-ID representation handling. | EP-FR18-012 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-061 | `PUT /api/admin/orders/:id/status` | Verify status outside documented vocabulary is not applied. | EP-FR18-018 | NEGATIVE | READY |
| TC-API-062 | `PUT /api/admin/orders/:id/status` | Observe omitted status handling. | EP-FR18-019 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-063 | `PUT /api/admin/orders/:id/status` | Observe null-like status handling. | EP-FR18-020 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-064 | `PUT /api/admin/orders/:id/status` | Observe non-string status handling. | EP-FR18-021 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-065 | `PUT /api/admin/orders/:id/status` | Observe omitted Content-Type behavior. | EP-FR18-023 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-066 | `PUT /api/admin/orders/:id/status` | Observe non-JSON media-type behavior. | EP-FR18-024 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-067 | `PUT /api/orders/:id/cancel` | Verify cancellation changes an order satisfying “chưa giao” to canceled once setup mapping exists. | EP-FR18-028 | CONDITIONAL | BLOCKED |
| TC-API-068 | `PUT /api/orders/:id/cancel` | Verify unauthenticated caller cannot cancel order. | EP-FR18-026 | NEGATIVE | READY |
| TC-API-069 | `PUT /api/orders/:id/cancel` | Verify non-Bearer Authorization cannot cancel order. | EP-FR18-027 | NEGATIVE | READY |
| TC-API-070 | `PUT /api/orders/:id/cancel` | Verify cancellation is prohibited for an order not satisfying “chưa giao” once state mapping exists. | EP-FR18-029 | CONDITIONAL | BLOCKED |
| TC-API-071 | `PUT /api/orders/:id/cancel` | Observe cancellation behavior for non-existing order identifier. | EP-FR18-030 | EXPLORATORY | EXPLORATORY_ONLY |
| TC-API-072 | `PUT /api/orders/:id/cancel` | Verify omitted identifier does not invoke documented cancel operation. | EP-FR18-031 | NEGATIVE | READY |
| TC-API-073 | `PUT /api/orders/:id/cancel` | Observe undocumented order-ID representation handling for cancellation. | EP-FR18-032 | EXPLORATORY | EXPLORATORY_ONLY |

### Detailed Logical Test Cases

#### TC-API-001

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: POSITIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-001–P-FR02-004
  - Primary Partition: EP-FR02-001
  - Secondary Partition(s): EP-FR02-006, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-005, BLK-FR02-006 (oracle depth only)
- **Objective**
  - Primary test objective: Verify successful login for an existing account-associated matching credential pair.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Account-associated email representation and matching password representation.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — 200 OK.
  - Schema Oracle: SUPPORTED — JWT token string and user information; detailed schema NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — successful login returns authentication information.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-002

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-001
  - Primary Partition: EP-FR02-002
  - Secondary Partition(s): EP-FR02-006, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-004
- **Objective**
  - Primary test objective: Observe handling of an email not associated with a usable credential pair.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Non-associated email; other credential condition nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe handling of an email not associated with a usable credential pair. No authoritative hard oracle exists.

#### TC-API-003

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-001
  - Primary Partition: EP-FR02-003
  - Secondary Partition(s): EP-FR02-006, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe omitted email handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Email omitted; all unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted email handling. No authoritative hard oracle exists.

#### TC-API-004

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-001
  - Primary Partition: EP-FR02-004
  - Secondary Partition(s): EP-FR02-006, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe null-like email handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Email is null-like; all unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe null-like email handling. No authoritative hard oracle exists.

#### TC-API-005

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-001
  - Primary Partition: EP-FR02-005
  - Secondary Partition(s): EP-FR02-006, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe non-string email handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Email uses a non-string JSON type; unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-string email handling. No authoritative hard oracle exists.

#### TC-API-006

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-002
  - Primary Partition: EP-FR02-007
  - Secondary Partition(s): EP-FR02-001, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-004
- **Objective**
  - Primary test objective: Observe handling of a password not matching the selected account.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Account-associated email with non-matching password representation.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe handling of a password not matching the selected account. No authoritative hard oracle exists.

#### TC-API-007

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-002
  - Primary Partition: EP-FR02-008
  - Secondary Partition(s): EP-FR02-001, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe omitted password handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Password omitted; unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted password handling. No authoritative hard oracle exists.

#### TC-API-008

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-002
  - Primary Partition: EP-FR02-009
  - Secondary Partition(s): EP-FR02-001, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe null-like password handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Password is null-like; unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe null-like password handling. No authoritative hard oracle exists.

#### TC-API-009

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-002
  - Primary Partition: EP-FR02-010
  - Secondary Partition(s): EP-FR02-001, EP-FR02-011, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe non-string password handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Password uses a non-string JSON type; unrelated fields nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-string password handling. No authoritative hard oracle exists.

#### TC-API-010

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-003
  - Primary Partition: EP-FR02-012
  - Secondary Partition(s): EP-FR02-001, EP-FR02-006, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe behavior when Content-Type is omitted.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Matching credential body with Content-Type omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe behavior when Content-Type is omitted. No authoritative hard oracle exists.

#### TC-API-011

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-003
  - Primary Partition: EP-FR02-013
  - Secondary Partition(s): EP-FR02-001, EP-FR02-006, EP-FR02-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-001
- **Objective**
  - Primary test objective: Observe non-JSON media-type handling.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Matching credential conditions with non-JSON media type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-JSON media-type handling. No authoritative hard oracle exists.

#### TC-API-012

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-004
  - Primary Partition: EP-FR02-015
  - Secondary Partition(s): EP-FR02-001, EP-FR02-006, EP-FR02-011
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-004
- **Objective**
  - Primary test objective: Observe the effect of request Authorization on login.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. Authorization header present; matching credentials otherwise nominal.
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Authorization header present; matching credentials otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe the effect of request Authorization on login. No authoritative hard oracle exists.

#### TC-API-013

- **Identity**
  - Endpoint / operation: Login
  - Method: `POST /api/login`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §1.2; TB-FR02-001–TB-FR02-007
  - Parameter(s): P-FR02-002 and implied account state
  - Primary Partition: EP-FR02-007
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR02-002, BLK-FR02-003, BLK-FR02-004
- **Objective**
  - Primary test objective: Characterize repeated failed-login and any lock/unlock transition once rules exist.
- **Preconditions**
  - Authentication context: No prerequisite request authentication documented. 
  - Resource/system state: Existing-account/credential context as stated by the case.
  - Nominal baseline assumptions: JSON-shaped credential request; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Repeated non-matching credential condition; no count or duration selected.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-014

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-001–P-FR09-005
  - Primary Partition: EP-FR09-001
  - Secondary Partition(s): EP-FR09-006, EP-FR09-010, EP-FR09-015, EP-FR09-017
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-002, BLK-FR09-003, BLK-FR09-004, BLK-FR09-005
- **Objective**
  - Primary test objective: Verify documented coupon application for existing coupon/user and number-shaped total once eligibility/formula are known.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Existing coupon code, number-shaped total, existing user identifier, omitted auth, JSON-shaped representation.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: SUPPORTED conditionally — discount_amount and final_amount field names only.
  - Semantic Oracle: SUPPORTED at high level — calculates total after discount; formula NOT SPECIFIED.
  - State Oracle: NOT APPLICABLE; usage mutation NOT SPECIFIED.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-015

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-001
  - Primary Partition: EP-FR09-002
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-002
- **Objective**
  - Primary test objective: Observe non-existing coupon-code handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Code not associated with coupon.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-existing coupon-code handling. No authoritative hard oracle exists.

#### TC-API-016

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-001
  - Primary Partition: EP-FR09-003
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe omitted coupon-code handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Code omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted coupon-code handling. No authoritative hard oracle exists.

#### TC-API-017

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-001
  - Primary Partition: EP-FR09-004
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe null-like coupon-code handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Code null-like.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe null-like coupon-code handling. No authoritative hard oracle exists.

#### TC-API-018

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-001
  - Primary Partition: EP-FR09-005
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe non-string coupon-code handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Code uses non-string JSON type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-string coupon-code handling. No authoritative hard oracle exists.

#### TC-API-019

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-002
  - Primary Partition: EP-FR09-007
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-003
- **Objective**
  - Primary test objective: Observe omitted total handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - total_amount omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted total handling. No authoritative hard oracle exists.

#### TC-API-020

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-002
  - Primary Partition: EP-FR09-008
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-003
- **Objective**
  - Primary test objective: Observe null-like total handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - total_amount null-like.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe null-like total handling. No authoritative hard oracle exists.

#### TC-API-021

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-002
  - Primary Partition: EP-FR09-009
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-003
- **Objective**
  - Primary test objective: Observe non-number total handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - total_amount uses non-number JSON type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-number total handling. No authoritative hard oracle exists.

#### TC-API-022

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-003
  - Primary Partition: EP-FR09-011
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-004
- **Objective**
  - Primary test objective: Observe non-existing user identifier handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - user_id not associated with user.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-existing user identifier handling. No authoritative hard oracle exists.

#### TC-API-023

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-003
  - Primary Partition: EP-FR09-012
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-004
- **Objective**
  - Primary test objective: Observe omitted user identifier handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - user_id omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted user identifier handling. No authoritative hard oracle exists.

#### TC-API-024

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-003
  - Primary Partition: EP-FR09-013
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-004
- **Objective**
  - Primary test objective: Observe null-like user identifier handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - user_id null-like.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe null-like user identifier handling. No authoritative hard oracle exists.

#### TC-API-025

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-003
  - Primary Partition: EP-FR09-014
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-004
- **Objective**
  - Primary test objective: Observe non-number user identifier handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - user_id uses non-number JSON type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-number user identifier handling. No authoritative hard oracle exists.

#### TC-API-026

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-004
  - Primary Partition: EP-FR09-016
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-004
- **Objective**
  - Primary test objective: Observe Authorization/token-identity effect on application.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. Authorization present; relation to user_id unresolved.
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Authorization present; relation to user_id unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe Authorization/token-identity effect on application. No authoritative hard oracle exists.

#### TC-API-027

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-005
  - Primary Partition: EP-FR09-018
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe omitted Content-Type handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Content-Type omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe omitted Content-Type handling. No authoritative hard oracle exists.

#### TC-API-028

- **Identity**
  - Endpoint / operation: Apply coupon
  - Method: `POST /api/apply-coupon`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.1; TB-FR09-001–TB-FR09-007
  - Parameter(s): P-FR09-005
  - Primary Partition: EP-FR09-019
  - Secondary Partition(s): Compatible EP-FR09 nominal partitions
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe non-JSON media-type handling.
- **Preconditions**
  - Authentication context: Application authentication is NOT SPECIFIED. 
  - Resource/system state: Coupon/user resource conditions as stated; eligibility/usage unresolved.
  - Nominal baseline assumptions: Example-shaped logical body; unrelated inputs remain conceptual nominal.
- **Logical Input**
  - Non-JSON Content-Type condition.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe non-JSON media-type handling. No authoritative hard oracle exists.

#### TC-API-029

- **Identity**
  - Endpoint / operation: List coupons
  - Method: `GET /api/coupons`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §5.2; TB-FR09-008–TB-FR09-010
  - Parameter(s): P-FR09-006
  - Primary Partition: EP-FR09-020
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-007
- **Objective**
  - Primary test objective: Verify list access using Admin-associated Bearer context once role enforcement is clarified.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer-form token associated with Admin.
  - Resource/system state: Coupon-list contents/schema NOT SPECIFIED.
  - Nominal baseline assumptions: No body; only the target auth dimension varies.
- **Logical Input**
  - Bearer-form token associated with Admin.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-030

- **Identity**
  - Endpoint / operation: List coupons
  - Method: `GET /api/coupons`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §5.2; TB-FR09-008–TB-FR09-010
  - Parameter(s): P-FR09-006
  - Primary Partition: EP-FR09-021
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-007
- **Objective**
  - Primary test objective: Observe list access with non-Admin-associated Bearer context.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer-form token associated with non-Admin.
  - Resource/system state: Coupon-list contents/schema NOT SPECIFIED.
  - Nominal baseline assumptions: No body; only the target auth dimension varies.
- **Logical Input**
  - Bearer-form token associated with non-Admin.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - Observation Goal: Observe list access with non-Admin-associated Bearer context. No authoritative hard oracle exists.

#### TC-API-031

- **Identity**
  - Endpoint / operation: List coupons
  - Method: `GET /api/coupons`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §5.2; TB-FR09-008–TB-FR09-010
  - Parameter(s): P-FR09-006
  - Primary Partition: EP-FR09-022
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: NONE
- **Objective**
  - Primary test objective: Verify rejection when required Authorization is omitted.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization header omitted.
  - Resource/system state: Coupon-list contents/schema NOT SPECIFIED.
  - Nominal baseline assumptions: No body; only the target auth dimension varies.
- **Logical Input**
  - Authorization header omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-032

- **Identity**
  - Endpoint / operation: List coupons
  - Method: `GET /api/coupons`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §5.2; TB-FR09-008–TB-FR09-010
  - Parameter(s): P-FR09-006
  - Primary Partition: EP-FR09-023
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: NONE
- **Objective**
  - Primary test objective: Verify rejection when Authorization lacks documented Bearer form.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization present without Bearer form.
  - Resource/system state: Coupon-list contents/schema NOT SPECIFIED.
  - Nominal baseline assumptions: No body; only the target auth dimension varies.
- **Logical Input**
  - Authorization present without Bearer form.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-033

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-007–P-FR09-014
  - Primary Partition: EP-FR09-024
  - Secondary Partition(s): EP-FR09-028–EP-FR09-034
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001, BLK-FR09-002, BLK-FR09-003, BLK-FR09-005
- **Objective**
  - Primary test objective: Verify coupon creation with Admin Bearer and all example-shaped fields once body validity is defined.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer plus six example-shaped body fields.
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Admin Bearer plus six example-shaped body fields.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED conditionally — operation creates a coupon if accepted.
  - State Oracle: SUPPORTED conditionally — coupon resource created if accepted.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-034

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-007
  - Primary Partition: EP-FR09-025
  - Secondary Partition(s): EP-FR09-028–EP-FR09-034
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Admin caller cannot create coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Admin Bearer; body otherwise nominal.
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Non-Admin Bearer; body otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-035

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-007
  - Primary Partition: EP-FR09-026
  - Secondary Partition(s): EP-FR09-028–EP-FR09-034
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify unauthenticated caller cannot create coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization omitted; body otherwise nominal.
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Authorization omitted; body otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-036

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-007
  - Primary Partition: EP-FR09-027
  - Secondary Partition(s): EP-FR09-028–EP-FR09-034
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Bearer Authorization cannot create coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Bearer Authorization; body otherwise nominal.
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Non-Bearer Authorization; body otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-037

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-014
  - Primary Partition: EP-FR09-035
  - Secondary Partition(s): EP-FR09-024, EP-FR09-028–EP-FR09-033
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe create behavior without Content-Type.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Admin context and example-shaped body; Content-Type omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe create behavior without Content-Type. No authoritative hard oracle exists.

#### TC-API-038

- **Identity**
  - Endpoint / operation: Create coupon
  - Method: `POST /api/admin/coupons`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-011–TB-FR09-013
  - Parameter(s): P-FR09-014
  - Primary Partition: EP-FR09-036
  - Secondary Partition(s): EP-FR09-024, EP-FR09-028–EP-FR09-033
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe create behavior with non-JSON media type.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Coupon creation fixture condition as stated; field validity unresolved.
  - Nominal baseline assumptions: All six example-shaped body fields; unrelated inputs nominal.
- **Logical Input**
  - Admin context and example-shaped body; non-JSON Content-Type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe create behavior with non-JSON media type. No authoritative hard oracle exists.

#### TC-API-039

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: POSITIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-015, P-FR09-016
  - Primary Partition: EP-FR09-037
  - Secondary Partition(s): EP-FR09-041
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (response contract only)
- **Objective**
  - Primary test objective: Verify Admin Bearer can delete an existing coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Existing coupon identifier and Admin Bearer.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Existing coupon identifier and Admin Bearer.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — successful delete; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — target coupon deleted.
  - State Oracle: SUPPORTED — target coupon no longer exists.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-040

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-015
  - Primary Partition: EP-FR09-038
  - Secondary Partition(s): EP-FR09-041
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Admin caller cannot delete coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Admin Bearer; existing coupon.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Non-Admin Bearer; existing coupon.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-041

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-015
  - Primary Partition: EP-FR09-039
  - Secondary Partition(s): EP-FR09-041
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify unauthenticated caller cannot delete coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization omitted; existing coupon.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Authorization omitted; existing coupon.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-042

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-015
  - Primary Partition: EP-FR09-040
  - Secondary Partition(s): EP-FR09-041
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Bearer Authorization cannot delete coupon.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Bearer Authorization; existing coupon.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Non-Bearer Authorization; existing coupon.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-043

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-016
  - Primary Partition: EP-FR09-042
  - Secondary Partition(s): EP-FR09-037
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-002
- **Objective**
  - Primary test objective: Observe delete behavior for non-existing coupon identifier.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier not associated with coupon.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Admin Bearer; identifier not associated with coupon.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe delete behavior for non-existing coupon identifier. No authoritative hard oracle exists.

#### TC-API-044

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-016
  - Primary Partition: EP-FR09-043
  - Secondary Partition(s): EP-FR09-037
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify omitted identifier does not invoke documented delete operation.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier segment omitted.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Admin Bearer; identifier segment omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-045

- **Identity**
  - Endpoint / operation: Delete coupon
  - Method: `DELETE /api/admin/coupons/:id`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.4; TB-FR09-014–TB-FR09-015
  - Parameter(s): P-FR09-016
  - Primary Partition: EP-FR09-044
  - Secondary Partition(s): EP-FR09-037
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR09-001
- **Objective**
  - Primary test objective: Observe undocumented identifier representation handling.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier in undocumented representation region.
  - Resource/system state: Coupon existence condition as stated.
  - Nominal baseline assumptions: Documented path shape and Admin Bearer context unless primary objective changes one factor.
- **Logical Input**
  - Admin Bearer; identifier in undocumented representation region.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe undocumented identifier representation handling. No authoritative hard oracle exists.

#### TC-API-046

- **Identity**
  - Endpoint / operation: List all orders (Admin)
  - Method: `GET /api/admin/orders`
  - Category: POSITIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-001–TB-FR18-004
  - Parameter(s): P-FR18-001
  - Primary Partition: EP-FR18-001
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-005 (schema/status only)
- **Objective**
  - Primary test objective: Verify authenticated Admin can retrieve orders for the entire system.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin-associated Bearer token.
  - Resource/system state: Known system-order set conceptually available.
  - Nominal baseline assumptions: No body/query; Admin Bearer context unless auth is the primary mutation.
- **Logical Input**
  - Admin-associated Bearer token.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — successful operation; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — result covers orders for the entire system.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-047

- **Identity**
  - Endpoint / operation: List all orders (Admin)
  - Method: `GET /api/admin/orders`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-001–TB-FR18-004
  - Parameter(s): P-FR18-001
  - Primary Partition: EP-FR18-002
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Admin caller cannot access system-wide orders.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Admin Bearer.
  - Resource/system state: Known system-order set conceptually available.
  - Nominal baseline assumptions: No body/query; Admin Bearer context unless auth is the primary mutation.
- **Logical Input**
  - Non-Admin Bearer.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-048

- **Identity**
  - Endpoint / operation: List all orders (Admin)
  - Method: `GET /api/admin/orders`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-001–TB-FR18-004
  - Parameter(s): P-FR18-001
  - Primary Partition: EP-FR18-003
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify unauthenticated caller cannot access system-wide orders.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization omitted.
  - Resource/system state: Known system-order set conceptually available.
  - Nominal baseline assumptions: No body/query; Admin Bearer context unless auth is the primary mutation.
- **Logical Input**
  - Authorization omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-049

- **Identity**
  - Endpoint / operation: List all orders (Admin)
  - Method: `GET /api/admin/orders`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-001–TB-FR18-004
  - Parameter(s): P-FR18-001
  - Primary Partition: EP-FR18-004
  - Secondary Partition(s): NONE
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Bearer Authorization cannot access system-wide orders.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Bearer Authorization.
  - Resource/system state: Known system-order set conceptually available.
  - Nominal baseline assumptions: No body/query; Admin Bearer context unless auth is the primary mutation.
- **Logical Input**
  - Non-Bearer Authorization.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: NOT APPLICABLE.
- **Cleanup Requirement**
  - NONE.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-050

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002–P-FR18-005
  - Primary Partition: EP-FR18-013
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- **Objective**
  - Primary test objective: Verify target status pending once an authoritative source-state rule exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Existing order; requested target pending; source state unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-051

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002–P-FR18-005
  - Primary Partition: EP-FR18-014
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- **Objective**
  - Primary test objective: Verify target status confirmed once an authoritative source-state rule exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Existing order; requested target confirmed; source state unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-052

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002–P-FR18-005
  - Primary Partition: EP-FR18-015
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- **Objective**
  - Primary test objective: Verify target status shipping once an authoritative source-state rule exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Existing order; requested target shipping; source state unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-053

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002–P-FR18-005
  - Primary Partition: EP-FR18-016
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- **Objective**
  - Primary test objective: Verify target status delivered once an authoritative source-state rule exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Existing order; requested target delivered; source state unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-054

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002–P-FR18-005
  - Primary Partition: EP-FR18-017
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-001, BLK-FR18-004, BLK-FR18-005
- **Objective**
  - Primary test objective: Verify target status canceled once an authoritative source-state rule exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. 
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Existing order; requested target canceled; source state unresolved.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: NOT SPECIFIED.
  - State Oracle: NOT SPECIFIED.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-055

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002
  - Primary Partition: EP-FR18-006
  - Secondary Partition(s): EP-FR18-009, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Admin caller cannot update order status.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Admin Bearer; other inputs nominal.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Non-Admin Bearer; other inputs nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-056

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002
  - Primary Partition: EP-FR18-007
  - Secondary Partition(s): EP-FR18-009, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify unauthenticated caller cannot update order status.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization omitted; other inputs nominal.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Authorization omitted; other inputs nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-057

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-002
  - Primary Partition: EP-FR18-008
  - Secondary Partition(s): EP-FR18-009, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Bearer Authorization cannot update order status.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Bearer Authorization; other inputs nominal.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Non-Bearer Authorization; other inputs nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-058

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-003
  - Primary Partition: EP-FR18-010
  - Secondary Partition(s): EP-FR18-005, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe update behavior for non-existing order identifier.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier not associated with order.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; identifier not associated with order.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe update behavior for non-existing order identifier. No authoritative hard oracle exists.

#### TC-API-059

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-003
  - Primary Partition: EP-FR18-011
  - Secondary Partition(s): EP-FR18-005, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-005 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify omitted order identifier does not invoke documented update operation.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier segment omitted.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; identifier segment omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-060

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-003
  - Primary Partition: EP-FR18-012
  - Secondary Partition(s): EP-FR18-005, EP-FR18-014, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe undocumented order-ID representation handling.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; identifier in undocumented region.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; identifier in undocumented region.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe undocumented order-ID representation handling. No authoritative hard oracle exists.

#### TC-API-061

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-004
  - Primary Partition: EP-FR18-018
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-005 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify status outside documented vocabulary is not applied.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; status outside documented set.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; status outside documented set.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-062

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-004
  - Primary Partition: EP-FR18-019
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe omitted status handling.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; status omitted.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; status omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe omitted status handling. No authoritative hard oracle exists.

#### TC-API-063

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-004
  - Primary Partition: EP-FR18-020
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe null-like status handling.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; status null-like.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; status null-like.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe null-like status handling. No authoritative hard oracle exists.

#### TC-API-064

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-004
  - Primary Partition: EP-FR18-021
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-022
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe non-string status handling.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; status non-string.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; status non-string.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe non-string status handling. No authoritative hard oracle exists.

#### TC-API-065

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-005
  - Primary Partition: EP-FR18-023
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe omitted Content-Type behavior.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; example-target body; Content-Type omitted.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; example-target body; Content-Type omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe omitted Content-Type behavior. No authoritative hard oracle exists.

#### TC-API-066

- **Identity**
  - Endpoint / operation: Update order status (Admin)
  - Method: `PUT /api/admin/orders/:id/status`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §6 and §6.2; TB-FR18-005–TB-FR18-010
  - Parameter(s): P-FR18-005
  - Primary Partition: EP-FR18-024
  - Secondary Partition(s): EP-FR18-005, EP-FR18-009, EP-FR18-014
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe non-JSON media-type behavior.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Admin Bearer; existing order; example target; non-JSON Content-Type.
  - Resource/system state: Existing order/current state as stated; transition matrix unresolved.
  - Nominal baseline assumptions: Existing order, documented target-status vocabulary, JSON-shaped body and Admin Bearer context.
- **Logical Input**
  - Admin Bearer; existing order; example target; non-JSON Content-Type.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe non-JSON media-type behavior. No authoritative hard oracle exists.

#### TC-API-067

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-006, P-FR18-007
  - Primary Partition: EP-FR18-028
  - Secondary Partition(s): EP-FR18-025
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-002, BLK-FR18-004
- **Objective**
  - Primary test objective: Verify cancellation changes an order satisfying “chưa giao” to canceled once setup mapping exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer form; existing order satisfying textual predicate.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Bearer form; existing order satisfying textual predicate.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — qualifying cancellation targets canceled.
  - State Oracle: SUPPORTED — qualifying order becomes canceled.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-068

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-006
  - Primary Partition: EP-FR18-026
  - Secondary Partition(s): EP-FR18-028
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify unauthenticated caller cannot cancel order.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Authorization omitted; candidate order otherwise nominal.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Authorization omitted; candidate order otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-069

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-006
  - Primary Partition: EP-FR18-027
  - Secondary Partition(s): EP-FR18-028
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-006 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify non-Bearer Authorization cannot cancel order.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Non-Bearer Authorization; candidate order otherwise nominal.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Non-Bearer Authorization; candidate order otherwise nominal.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-070

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: CONDITIONAL
  - Executability: BLOCKED
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-007
  - Primary Partition: EP-FR18-029
  - Secondary Partition(s): EP-FR18-025
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-002, BLK-FR18-004
- **Objective**
  - Primary test objective: Verify cancellation is prohibited for an order not satisfying “chưa giao” once state mapping exists.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer form; existing order outside textual predicate.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Bearer form; existing order outside textual predicate.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — cancellation prohibited outside textual predicate.
  - State Oracle: SUPPORTED — order must not become canceled.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Logical case retained, but setup and/or oracle is blocked.

#### TC-API-071

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-007
  - Primary Partition: EP-FR18-030
  - Secondary Partition(s): EP-FR18-025
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe cancellation behavior for non-existing order identifier.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer form; identifier not associated with order.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Bearer form; identifier not associated with order.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe cancellation behavior for non-existing order identifier. No authoritative hard oracle exists.

#### TC-API-072

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: NEGATIVE
  - Executability: READY
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-007
  - Primary Partition: EP-FR18-031
  - Secondary Partition(s): EP-FR18-025
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-005 (exact failure contract only)
- **Objective**
  - Primary test objective: Verify omitted identifier does not invoke documented cancel operation.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer form; identifier segment omitted.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Bearer form; identifier segment omitted.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: SUPPORTED — request rejected or documented operation not invoked; code NOT SPECIFIED.
  - Schema Oracle: NOT SPECIFIED.
  - Semantic Oracle: SUPPORTED — invalid/protected operation must not succeed.
  - State Oracle: SUPPORTED — target resource remains unchanged.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - One primary objective; unknown status codes/messages are not asserted.

#### TC-API-073

- **Identity**
  - Endpoint / operation: Cancel order
  - Method: `PUT /api/orders/:id/cancel`
  - Category: EXPLORATORY
  - Executability: EXPLORATORY_ONLY
- **Traceability**
  - Requirement source: api_specification.md §4 and §4.6; TB-FR18-011–TB-FR18-013
  - Parameter(s): P-FR18-007
  - Primary Partition: EP-FR18-032
  - Secondary Partition(s): EP-FR18-025
  - BVA Reference: NONE — Prompt 004 found no supported executable boundary.
  - Blocker Reference: BLK-FR18-003
- **Objective**
  - Primary test objective: Observe undocumented order-ID representation handling for cancellation.
- **Preconditions**
  - Authentication context: Authorization context as stated by the case. Bearer form; identifier in undocumented region.
  - Resource/system state: Existing-order and “chưa giao” condition as stated; concrete status mapping unresolved.
  - Nominal baseline assumptions: Documented path and Bearer-form header unless one is the primary mutation.
- **Logical Input**
  - Bearer form; identifier in undocumented region.
- **Execution**
  - 1. Establish the stated logical preconditions. 2. Construct the request with only the primary factor varied. 3. Submit during a later execution phase. 4. Evaluate only the supported oracle layers.
- **Expected / Oracle**
  - Transport Oracle: NOT SPECIFIED — observe acceptance/rejection/status.
  - Schema Oracle: NOT SPECIFIED — observe returned structure.
  - Semantic Oracle: NOT SPECIFIED — observe accept/reject/coerce/ignore behavior.
  - State Oracle: NOT SPECIFIED — observe mutation.
- **Cleanup Requirement**
  - Logical cleanup/fixture restoration if the operation mutates state.
- **Notes**
  - Observation Goal: Observe undocumented order-ID representation handling for cancellation. No authoritative hard oracle exists.

## E. Partition Coverage

```text
COVERED: 29
BLOCKED: 22
DEFERRED_EXPLORATORY: 40
NOT_SELECTED: 0
TOTAL: 91
```

The complete 91-row disposition is in `analysis/test-coverage-matrix.md`.

- BLOCKED: EP-FR09-001, EP-FR09-006, EP-FR09-010, EP-FR09-020, EP-FR09-024, EP-FR09-028–EP-FR09-034; EP-FR18-005, EP-FR18-009, EP-FR18-013–EP-FR18-017, EP-FR18-025, EP-FR18-028, EP-FR18-029.
- DEFERRED_EXPLORATORY: EP-FR02-002–EP-FR02-005, EP-FR02-007–EP-FR02-010, EP-FR02-012–EP-FR02-013, EP-FR02-015; EP-FR09-002–EP-FR09-005, EP-FR09-007–EP-FR09-009, EP-FR09-011–EP-FR09-014, EP-FR09-016, EP-FR09-018–EP-FR09-019, EP-FR09-021, EP-FR09-035–EP-FR09-036, EP-FR09-042, EP-FR09-044; EP-FR18-010, EP-FR18-012, EP-FR18-019–EP-FR18-024, EP-FR18-030, EP-FR18-032.
- NOT_SELECTED: none; compatible nominal partitions are secondary coverage rather than duplicate cases.

## F. Requirement Coverage

```text
COVERED: 18
PARTIAL: 12
BLOCKED: 6
NOT TESTABLE: 0
```

The complete 36-row requirement matrix is in `analysis/test-coverage-matrix.md`.

## G. BVA Integration

```text
BVA-derived concrete cases: 0
```

Prompt 004 found no supported numeric, length, count, temporal, or ordered-discrete boundary. No concrete/symbolic boundary test or fabricated BVA ID was added.

## H. Blocked Cases

| Test ID | Blocker ID | Missing Information | Impact |
| ------- | ---------- | ------------------- | ------ |
| TC-API-013 | BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 | Characterize repeated failed-login and any lock/unlock transition once rules exist. | No deterministic setup and/or oracle. |
| TC-API-014 | BLK-FR09-002, BLK-FR09-003, BLK-FR09-004, BLK-FR09-005 | Verify documented coupon application for existing coupon/user and number-shaped total once eligibility/formula are known. | No deterministic setup and/or oracle. |
| TC-API-029 | BLK-FR09-007 | Verify list access using Admin-associated Bearer context once role enforcement is clarified. | No deterministic setup and/or oracle. |
| TC-API-033 | BLK-FR09-001, BLK-FR09-002, BLK-FR09-003, BLK-FR09-005 | Verify coupon creation with Admin Bearer and all example-shaped fields once body validity is defined. | No deterministic setup and/or oracle. |
| TC-API-050 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | Verify target status pending once an authoritative source-state rule exists. | No deterministic setup and/or oracle. |
| TC-API-051 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | Verify target status confirmed once an authoritative source-state rule exists. | No deterministic setup and/or oracle. |
| TC-API-052 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | Verify target status shipping once an authoritative source-state rule exists. | No deterministic setup and/or oracle. |
| TC-API-053 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | Verify target status delivered once an authoritative source-state rule exists. | No deterministic setup and/or oracle. |
| TC-API-054 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 | Verify target status canceled once an authoritative source-state rule exists. | No deterministic setup and/or oracle. |
| TC-API-067 | BLK-FR18-002, BLK-FR18-004 | Verify cancellation changes an order satisfying “chưa giao” to canceled once setup mapping exists. | No deterministic setup and/or oracle. |
| TC-API-070 | BLK-FR18-002, BLK-FR18-004 | Verify cancellation is prohibited for an order not satisfying “chưa giao” once state mapping exists. | No deterministic setup and/or oracle. |

## I. Exploratory Cases

| Test ID | Observation Goal | Why No Hard Oracle Exists |
| ------- | ---------------- | ------------------------- |
| TC-API-002 | Observe handling of an email not associated with a usable credential pair. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-003 | Observe omitted email handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-004 | Observe null-like email handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-005 | Observe non-string email handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-006 | Observe handling of a password not matching the selected account. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-007 | Observe omitted password handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-008 | Observe null-like password handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-009 | Observe non-string password handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-010 | Observe behavior when Content-Type is omitted. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-011 | Observe non-JSON media-type handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-012 | Observe the effect of request Authorization on login. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-015 | Observe non-existing coupon-code handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-016 | Observe omitted coupon-code handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-017 | Observe null-like coupon-code handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-018 | Observe non-string coupon-code handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-019 | Observe omitted total handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-020 | Observe null-like total handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-021 | Observe non-number total handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-022 | Observe non-existing user identifier handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-023 | Observe omitted user identifier handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-024 | Observe null-like user identifier handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-025 | Observe non-number user identifier handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-026 | Observe Authorization/token-identity effect on application. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-027 | Observe omitted Content-Type handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-028 | Observe non-JSON media-type handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-030 | Observe list access with non-Admin-associated Bearer context. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-037 | Observe create behavior without Content-Type. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-038 | Observe create behavior with non-JSON media type. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-043 | Observe delete behavior for non-existing coupon identifier. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-045 | Observe undocumented identifier representation handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-058 | Observe update behavior for non-existing order identifier. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-060 | Observe undocumented order-ID representation handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-062 | Observe omitted status handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-063 | Observe null-like status handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-064 | Observe non-string status handling. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-065 | Observe omitted Content-Type behavior. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-066 | Observe non-JSON media-type behavior. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-071 | Observe cancellation behavior for non-existing order identifier. | Requiredness, type, resource, media, identity, or response behavior is not specified. |
| TC-API-073 | Observe undocumented order-ID representation handling for cancellation. | Requiredness, type, resource, media, identity, or response behavior is not specified. |

## J. Oracle Coverage

| Oracle Layer | SUPPORTED | NOT SPECIFIED | NOT APPLICABLE | Notes |
| --- | ---: | ---: | ---: | --- |
| Transport oracle | 23 | 50 | 0 | READY cases support success/rejection; only login specifies exact 200. |
| Schema oracle | 2 | 71 | 0 | Login success and conditional coupon-application fields only. |
| Semantic oracle | 27 | 46 | 0 | READY cases plus high-level apply/create/cancel rules. |
| State oracle | 19 | 23 | 31 | Protected mutations, deletion, conditional creation/cancel; others absent or N/A. |

## K. Minimization Decisions

- Merged three standalone FR-02 nominal-condition candidates into TC-API-001.
- Merged two duplicate coupon-application nominal-field candidates into TC-API-014.
- Merged two Admin coupon-create nominal auth/body candidates into TC-API-033.
- Removed one duplicate valid-Admin delete candidate with identical coverage.
- Removed one duplicate confirmed-status candidate already represented by TC-API-051.
- Kept invalid factors isolated; kept exploratory probes only where they target distinct EPs.

## L. Files Created/Updated

- `analysis/test-case-design.md`
- `analysis/test-coverage-matrix.md`
- `prompts/Prompt-005-test-case-design.md`
- `prompts/prompt-log.md`

No automation or execution artifact was created.

## M. Human Review Required

- Confirm whether all 39 exploratory probes have sufficient information value.
- Confirm retaining TC-API-013 despite absent normative lockout rules.
- Clarify Admin enforcement for `GET /api/coupons`.
- Clarify the status meaning of “chưa giao”.
- Confirm keeping five Admin target-status candidates separate.
- Confirm rejection-with-unspecified-HTTP-code as an acceptable READY oracle.
- Approve or revise the 73-case suite before test-data design.

Status: PENDING STUDENT REVIEW

## N. Validation

| Validation Item | Result |
| --- | --- |
| verified-test-basis read | PASS |
| domain-model read | PASS |
| boundary-value-analysis read | PASS |
| all 27 parameters accounted for | PASS |
| all 91 partitions accounted for | PASS |
| existing partition/blocker IDs preserved | PASS |
| no invented boundary values | PASS |
| no concrete final dataset | PASS |
| no attack payload | PASS |
| no API request executed | PASS |
| one primary objective per test | PASS |
| one-invalid-factor-at-a-time | PASS |
| positive cases minimized | PASS |
| conditional/exploratory classifications disciplined | PASS |
| four oracle layers separated | PASS |
| unknown HTTP codes not invented | PASS |
| coverage matrices exist | PASS |
| human review pending | PASS |
| prompt logged exactly | PASS |

## O. Next Step

After student review, derive concrete and reusable API test data for the approved logical test cases while preserving partition and requirement traceability.


## P. Prompt 006 Scope-Compliant AI Expansion

This section adds exactly 56 in-scope, quota-eligible logical cases after the scope audit: 22 for FR-02, 20 for FR-09, and 14 for FR-18. Every case remains abstract and is marked `AI_GENERATED`; no concrete data, request payload, attack string, or fabricated response contract is introduced.

### Updated suite totals

| Metric | Count |
| --- | ---: |
| Existing Prompt 005 cases | 73 |
| Existing in-scope quota-eligible cases | 49 |
| Existing cross-feature/supporting cases | 24 |
| New Prompt 006 in-scope cases | 56 |
| Final logical suite | 129 |
| Final in-scope quota-eligible cases | 105 |

### Updated classification and readiness totals

| Dimension | Value | Count |
| --- | --- | ---: |
| Expected Classification | POSITIVE | 7 |
| Expected Classification | NEGATIVE | 20 |
| Expected Classification | CONDITIONAL | 27 |
| Expected Classification | EXPLORATORY | 75 |
| Readiness | READY | 27 |
| Readiness | BLOCKED | 27 |
| Readiness | EXPLORATORY_ONLY | 75 |

## P.02 FR-02 New In-Scope Cases

### TC-API-074 — Validate the documented successful-login transport status.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-074 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Validate the documented successful-login transport status. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR02-004, TB-FR02-005, TB-FR02-006 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account and matching credential pair are available. |
| Input Condition | Documented matching credential classes. |
| Action | Submit the login operation. |
| Transport Oracle | 200 OK. |
| Schema Oracle | Response represents the documented success result. |
| Semantic Oracle | A JWT token and user information are returned. |
| State Oracle | UNSPECIFIED |
| Expected Classification | POSITIVE |
| Readiness | READY |
| Blocker | N/A |
| Coverage Added | TB-FR02-005; success transport oracle |
| Why Non-Duplicate | Separates the explicit status assertion from TC-API-001's broad happy-path objective. |

### TC-API-075 — Validate that successful login returns a JWT token value.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-075 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Validate that successful login returns a JWT token value. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR02-004, TB-FR02-006 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account and matching credential pair are available. |
| Input Condition | Documented matching credential classes. |
| Action | Submit the login operation. |
| Transport Oracle | 200 OK. |
| Schema Oracle | A token element is present and represents a string JWT token as documented. |
| Semantic Oracle | The response supplies the authentication token. |
| State Oracle | UNSPECIFIED |
| Expected Classification | POSITIVE |
| Readiness | READY |
| Blocker | N/A |
| Coverage Added | TB-FR02-004; token schema focus |
| Why Non-Duplicate | Adds a dedicated token contract check rather than only exercising successful authentication. |

### TC-API-076 — Validate that successful login returns user information.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-076 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Validate that successful login returns user information. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR02-005, TB-FR02-006 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account and matching credential pair are available. |
| Input Condition | Documented matching credential classes. |
| Action | Submit the login operation. |
| Transport Oracle | 200 OK. |
| Schema Oracle | User information is present; its undocumented internal fields are not asserted. |
| Semantic Oracle | The response includes user information. |
| State Oracle | UNSPECIFIED |
| Expected Classification | POSITIVE |
| Readiness | READY |
| Blocker | N/A |
| Coverage Added | TB-FR02-006; user-information presence |
| Why Non-Duplicate | Adds the documented user-information presence oracle while preserving the incomplete schema blocker. |

### TC-API-077 — Characterize the response contract for unsuccessful login.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-077 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize the response contract for unsuccessful login. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR02-002, TB-FR02-003 |
| Partition References | EP-FR02-002, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A credential pair that does not authenticate is available. |
| Input Condition | One credential is outside the matching-pair class while the other remains nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe status, media type, and error-body shape without asserting undocumented fields. |
| Semantic Oracle | Authentication does not succeed; exact failure representation is observed. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-004 |
| Coverage Added | Failure-response schema observation |
| Why Non-Duplicate | Existing invalid-credential cases focus on input classes, not a consolidated failure-contract observation. |

### TC-API-078 — Observe handling when the request body is absent.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-078 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe handling when the request body is absent. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-001, TB-FR02-002, TB-FR02-003 |
| Partition References | EP-FR02-003, EP-FR02-008 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | The login endpoint is reachable. |
| Input Condition | No request body is supplied. |
| Action | Invoke login without a body. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether the operation rejects, defaults, or otherwise handles the absent body. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Body-level robustness interaction |
| Why Non-Duplicate | TC-API-003 and TC-API-007 omit one field at a time; this case targets absence of the body container. |

### TC-API-079 — Observe handling of an empty JSON object.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-079 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe handling of an empty JSON object. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-002, TB-FR02-003 |
| Partition References | EP-FR02-003, EP-FR02-008 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | JSON request handling is available. |
| Input Condition | The body is a JSON object with neither documented field. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe handling of the intentionally combined missing-field interaction. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Missing-email × missing-password interaction |
| Why Non-Duplicate | Distinct from single-field omission because the interaction itself is the objective. |

### TC-API-080 — Observe handling when both documented credential fields are null-like.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-080 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe handling when both documented credential fields are null-like. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-002, TB-FR02-003 |
| Partition References | EP-FR02-004, EP-FR02-009 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | JSON request handling is available. |
| Input Condition | Both documented credential fields use null-like JSON values. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe handling of the combined null-like credential interaction. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Null-email × null-password interaction |
| Why Non-Duplicate | Single-field null cases already exist; this deliberately audits their interaction. |

### TC-API-081 — Observe tolerance of an undocumented login request member.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-081 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe tolerance of an undocumented login request member. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-002, TB-FR02-003 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A matching credential pair is available. |
| Input Condition | Nominal documented fields plus one additional undocumented member. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe whether the response contract changes. |
| Semantic Oracle | Observe whether the extra member is ignored, rejected, or otherwise handled. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Unknown-member robustness class |
| Why Non-Duplicate | No existing case examines request extensibility or unknown-member handling. |

### TC-API-082 — Observe duplicate email-member handling at the representation layer.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-082 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe duplicate email-member handling at the representation layer. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-002 |
| Partition References | EP-FR02-001, EP-FR02-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A request representation capable of expressing duplicate members is available. |
| Input Condition | Two email members represent conflicting account-association classes; password remains nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe parsing and response shape. |
| Semantic Oracle | Observe which representation rule, rejection, or other handling occurs. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Duplicate-member parsing interaction |
| Why Non-Duplicate | No existing test addresses ambiguous duplicate representation of the email member. |

### TC-API-083 — Observe duplicate password-member handling at the representation layer.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-083 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe duplicate password-member handling at the representation layer. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-003 |
| Partition References | EP-FR02-006, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A request representation capable of expressing duplicate members is available. |
| Input Condition | Two password members represent matching and non-matching classes; email remains nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe parsing and response shape. |
| Semantic Oracle | Observe which representation rule, rejection, or other handling occurs. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Duplicate-member parsing interaction |
| Why Non-Duplicate | Complements the email duplicate case with a distinct authentication-sensitive member. |

### TC-API-084 — Characterize surrounding-whitespace handling for email.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-084 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize surrounding-whitespace handling for email. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR02-002, TB-FR02-007 |
| Partition References | EP-FR02-001, EP-FR02-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account credential pair is available. |
| Input Condition | Email representation differs from the associated account only by surrounding whitespace; password is nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether email whitespace is preserved, normalized, or rejected. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Email normalization class |
| Why Non-Duplicate | Existing email partitions do not distinguish normalization behavior. |

### TC-API-085 — Characterize surrounding-whitespace handling for password.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-085 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize surrounding-whitespace handling for password. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR02-003, TB-FR02-007 |
| Partition References | EP-FR02-006, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account credential pair is available. |
| Input Condition | Password representation differs from the matching credential only by surrounding whitespace; email is nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether password whitespace is preserved, normalized, or rejected. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Password normalization class |
| Why Non-Duplicate | Adds a credential-specific normalization observation not represented by generic mismatch. |

### TC-API-086 — Characterize email case-normalization behavior.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-086 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize email case-normalization behavior. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR02-002, TB-FR02-007 |
| Partition References | EP-FR02-001, EP-FR02-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An account with alphabetic email characters is available. |
| Input Condition | Email differs only in letter case from the associated account; password is nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether email comparison is case-normalized or case-sensitive. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Email comparison class |
| Why Non-Duplicate | No existing case distinguishes account identity normalization from an unrelated email. |

### TC-API-087 — Characterize password case sensitivity.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-087 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize password case sensitivity. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR02-003, TB-FR02-007 |
| Partition References | EP-FR02-006, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A matching password containing alphabetic characters is available. |
| Input Condition | Password differs only in letter case; email is nominal. |
| Action | Submit the login operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe credential comparison behavior without assuming a password policy. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Password comparison class |
| Why Non-Duplicate | Distinguishes a controlled comparison property from the broad wrong-password partition. |

### TC-API-088 — Observe malformed JSON representation handling.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-088 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Observe malformed JSON representation handling. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR02-001 |
| Partition References | N/A |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | The endpoint accepts an HTTP request body. |
| Input Condition | Body representation is not parseable as JSON; no concrete malformed string is defined. |
| Action | Invoke login with the malformed-representation class. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe response status, media type, and body shape. |
| Semantic Oracle | Observe parser-level handling without an attack payload. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-001, BLK-FR02-004 |
| Coverage Added | Malformed-representation robustness class |
| Why Non-Duplicate | Existing cases change values or media type but do not target JSON parse failure. |

### TC-API-089 — Characterize token behavior across repeated successful logins.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-089 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize token behavior across repeated successful logins. |
| Test Origin | AI_GENERATED |
| Primary Technique | AUTHENTICATION |
| Requirement References | TB-FR02-004, TB-FR02-006 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account and matching credential pair are available. |
| Input Condition | The same documented matching credential class is used in repeated login operations. |
| Action | Perform two successful login operations and compare observable token properties. |
| Transport Oracle | 200 OK for each successful operation. |
| Schema Oracle | Each success includes a token and user information; token relationship is unspecified. |
| Semantic Oracle | Observe whether tokens are reused or newly issued. |
| State Oracle | Observe any externally visible token-lifecycle effect. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR02-006 |
| Coverage Added | JWT lifecycle sequence |
| Why Non-Duplicate | TC-API-001 validates one success; this case targets repeated-login token lifecycle. |

### TC-API-090 — Characterize failed-attempt counter behavior after a successful login.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-090 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize failed-attempt counter behavior after a successful login. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR02-007 |
| Partition References | EP-FR02-001, EP-FR02-006, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An account exists and its failed-attempt state can be observed once defined. |
| Input Condition | A successful login is followed by a non-matching credential attempt. |
| Action | Perform the ordered login sequence. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | Expected counter effect is UNSPECIFIED until lockout rules exist. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR02-002, BLK-FR02-004 |
| Coverage Added | Account-lockout sequence ordering |
| Why Non-Duplicate | TC-API-013 covers repeated failures generally; this sequence isolates success-before-failure behavior. |

### TC-API-091 — Characterize whether successful login resets prior failed attempts.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-091 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize whether successful login resets prior failed attempts. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR02-007 |
| Partition References | EP-FR02-001, EP-FR02-006, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An account has accumulated observable failed attempts below any eventual threshold. |
| Input Condition | One or more failed attempts are followed by a matching credential pair. |
| Action | Perform the ordered login sequence. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Successful authentication behavior is known, but counter-reset semantics are not. |
| State Oracle | Expected counter reset is UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR02-002, BLK-FR02-004 |
| Coverage Added | Failed-then-success state sequence |
| Why Non-Duplicate | Adds reset semantics rather than another threshold repetition. |

### TC-API-092 — Characterize login behavior while an account is in a locked state.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-092 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize login behavior while an account is in a locked state. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR02-007 |
| Partition References | N/A |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A reproducibly locked account can be established once lockout rules are supplied. |
| Input Condition | Matching credentials are submitted while the account is locked. |
| Action | Submit the login operation in the locked state. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | Locked-state handling is UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 |
| Coverage Added | Locked-account state condition |
| Why Non-Duplicate | Targets the locked state itself, whereas TC-API-013 targets the transition into it. |

### TC-API-093 — Characterize login behavior after any lock duration elapses.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-093 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Characterize login behavior after any lock duration elapses. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR02-007 |
| Partition References | N/A |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A locked account and controllable elapsed-time condition can be established once defined. |
| Input Condition | Matching credentials are submitted after the eventual unlock condition. |
| Action | Submit login after the specified unlock condition once authoritative rules exist. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | Unlock and post-unlock behavior are UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 |
| Coverage Added | Time-dependent unlock state |
| Why Non-Duplicate | Adds post-lock temporal recovery coverage distinct from lock-entry behavior. |

### TC-API-094 — Compare failure disclosure for unknown account and wrong password classes.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-094 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Compare failure disclosure for unknown account and wrong password classes. |
| Test Origin | AI_GENERATED |
| Primary Technique | SECURITY |
| Requirement References | TB-FR02-002, TB-FR02-003, TB-FR02-007 |
| Partition References | EP-FR02-002, EP-FR02-007 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | Both non-associated-email and wrong-password conditions can be represented abstractly. |
| Input Condition | Run the two failure classes with otherwise nominal requests. |
| Action | Compare observable failure statuses and response shapes. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe whether failure representations differ. |
| Semantic Oracle | Observe possible account-enumeration disclosure without asserting a required equivalence. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-004, BLK-ALL-001 |
| Coverage Added | Security-oriented failure-disclosure comparison |
| Why Non-Duplicate | Existing cases observe each invalid credential independently but do not compare disclosure. |

### TC-API-095 — Audit successful user information for unintended sensitive-field exposure.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-095 |
| Feature | FR-02 |
| Endpoint / Operation | POST /api/login |
| Title | Audit successful user information for unintended sensitive-field exposure. |
| Test Origin | AI_GENERATED |
| Primary Technique | SECURITY |
| Requirement References | TB-FR02-006 |
| Partition References | EP-FR02-001, EP-FR02-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing account and matching credential pair are available. |
| Input Condition | Documented matching credential classes. |
| Action | Submit login and inspect only the returned user-information field set. |
| Transport Oracle | 200 OK. |
| Schema Oracle | User information is present; allowed and forbidden internal fields are UNSPECIFIED. |
| Semantic Oracle | Record exposed field names for human security review without inventing a forbidden-field list. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR02-005, BLK-ALL-001 |
| Coverage Added | Sensitive-field exposure observation |
| Why Non-Duplicate | TC-API-076 checks presence; this case separately audits disclosure risk. |
## P.09 FR-09 New In-Scope Cases

### TC-API-096 — Validate presence of documented discount_amount in a successful application response.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-096 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Validate presence of documented discount_amount in a successful application response. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR09-005, TB-FR09-006 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing eligible coupon/user combination and valid total can be established once rules exist. |
| Input Condition | Nominal documented input classes. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Response JSON contains discount_amount; type is UNSPECIFIED. |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | TB-FR09-006; response-field presence |
| Why Non-Duplicate | TC-API-014 broadly targets calculation; this case isolates one documented response member. |

### TC-API-097 — Validate presence of documented final_amount in a successful application response.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-097 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Validate presence of documented final_amount in a successful application response. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR09-005, TB-FR09-007 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing eligible coupon/user combination and valid total can be established once rules exist. |
| Input Condition | Nominal documented input classes. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Response JSON contains final_amount; type is UNSPECIFIED. |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | TB-FR09-007; response-field presence |
| Why Non-Duplicate | Isolates the second documented response member for diagnosable schema coverage. |

### TC-API-098 — Validate the documented successful response as JSON.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-098 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Validate the documented successful response as JSON. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR09-005, TB-FR09-006, TB-FR09-007 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An eligible application can be established once eligibility is defined. |
| Input Condition | Nominal documented input classes. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Successful response is JSON and contains the two documented field names; other structure is not asserted. |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-006 |
| Coverage Added | Successful response media/schema container |
| Why Non-Duplicate | Adds the explicit JSON-container contract rather than a calculation oracle. |

### TC-API-099 — Characterize types of the documented response amount fields.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-099 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize types of the documented response amount fields. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR09-006, TB-FR09-007 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A response containing the documented fields can be obtained. |
| Input Condition | Nominal application input classes. |
| Action | Apply the coupon and inspect the two field representations. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Record the runtime types of discount_amount and final_amount; expected types are UNSPECIFIED. |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-006 |
| Coverage Added | Response-field type observation |
| Why Non-Duplicate | Presence is covered separately; this targets the explicitly blocked type contract. |

### TC-API-100 — Characterize undocumented members in the coupon-application response.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-100 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize undocumented members in the coupon-application response. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR09-006, TB-FR09-007 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A coupon-application response can be obtained. |
| Input Condition | Nominal documented input classes. |
| Action | Apply the coupon and inventory top-level response members. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Record additional members without asserting they are prohibited. |
| Semantic Oracle | UNSPECIFIED |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-006 |
| Coverage Added | Response-shape discovery |
| Why Non-Duplicate | Existing cases do not inventory the incomplete response schema. |

### TC-API-101 — Characterize coupon-code case-normalization behavior.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-101 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize coupon-code case-normalization behavior. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR09-002 |
| Partition References | EP-FR09-001, EP-FR09-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A stored coupon code with alphabetic characters exists. |
| Input Condition | Code differs from the stored representation only by letter case; other inputs remain nominal. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether code lookup is case-normalized or case-sensitive. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-002, BLK-FR09-006 |
| Coverage Added | Coupon-code comparison class |
| Why Non-Duplicate | Distinct from non-existing code because the relationship to an existing code is controlled. |

### TC-API-102 — Characterize surrounding-whitespace handling for coupon code.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-102 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize surrounding-whitespace handling for coupon code. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR09-002 |
| Partition References | EP-FR09-001, EP-FR09-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A stored coupon code exists. |
| Input Condition | Code differs from the stored representation only by surrounding whitespace; other inputs remain nominal. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether code whitespace is preserved, normalized, or rejected. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-002, BLK-FR09-006 |
| Coverage Added | Coupon-code normalization class |
| Why Non-Duplicate | Adds whitespace normalization coverage rather than another arbitrary unknown code. |

### TC-API-103 — Observe handling of an empty-string coupon-code class.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-103 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Observe handling of an empty-string coupon-code class. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR09-002 |
| Partition References | EP-FR09-002 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | Other documented inputs use nominal classes. |
| Input Condition | Code is a string representation with no content. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe handling without assuming requiredness or minimum length. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-002, BLK-FR09-006 |
| Coverage Added | Distinct string-content class |
| Why Non-Duplicate | Existing cases cover omitted, null, non-string, and unknown code but not the empty string class. |

### TC-API-104 — Characterize a non-positive total_amount class.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-104 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize a non-positive total_amount class. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR09-003, TB-FR09-005 |
| Partition References | EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing coupon/user combination is available. |
| Input Condition | total_amount is numeric but belongs to a non-positive conceptual class; no concrete boundary value is selected. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe eligibility/calculation handling without asserting an unsupported numeric rule. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Numeric sign-class coverage |
| Why Non-Duplicate | TC-API-019–021 cover absence/null/type, not a distinct numeric semantic class. |

### TC-API-105 — Characterize a fractional total_amount representation.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-105 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize a fractional total_amount representation. |
| Test Origin | AI_GENERATED |
| Primary Technique | DOMAIN |
| Requirement References | TB-FR09-003, TB-FR09-005 |
| Partition References | EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing coupon/user combination is available. |
| Input Condition | total_amount is represented by a fractional numeric value; no concrete amount is defined. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe field representation in the response. |
| Semantic Oracle | Observe acceptance and any calculation/rounding behavior. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Fractional-number class |
| Why Non-Duplicate | Adds rounding-sensitive representation coverage without fabricating a rounding oracle. |

### TC-API-106 — Characterize a very-large-magnitude total_amount class.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-106 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize a very-large-magnitude total_amount class. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR09-003, TB-FR09-005 |
| Partition References | EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing coupon/user combination is available. |
| Input Condition | total_amount is numeric with a very large representable magnitude; no concrete threshold is claimed. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe numeric handling without treating any invented magnitude as a boundary. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Numeric-magnitude robustness class |
| Why Non-Duplicate | Tests representation robustness distinct from type-invalid and ordinary-number classes. |

### TC-API-107 — Characterize user_id and authenticated-identity mismatch.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-107 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize user_id and authenticated-identity mismatch. |
| Test Origin | AI_GENERATED |
| Primary Technique | SECURITY |
| Requirement References | TB-FR09-004 |
| Partition References | EP-FR09-010, EP-FR09-016 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | Two abstract user identities and an authentication context can be represented. |
| Input Condition | Body user_id identifies a different user from the authenticated context; other fields are nominal. |
| Action | Apply the coupon under the mismatched identity condition. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether identity ownership is enforced; expected behavior is UNSPECIFIED. |
| State Oracle | Observe any usage attribution only if externally visible. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-004, BLK-FR09-005, BLK-FR09-006, BLK-ALL-001 |
| Coverage Added | Identity-binding security interaction |
| Why Non-Duplicate | TC-API-026 observes token presence generally; this case controls a specific mismatch. |

### TC-API-108 — Characterize repeated application of the same coupon by the same user.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-108 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize repeated application of the same coupon by the same user. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR09-004, TB-FR09-005 |
| Partition References | EP-FR09-001, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An applicable coupon/user combination can be established and repeated use can be observed. |
| Input Condition | The same nominal application condition is submitted more than once. |
| Action | Perform the application sequence. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Calculation behavior is UNSPECIFIED after repeated use. |
| State Oracle | Usage persistence and enforcement are UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-005, BLK-FR09-006 |
| Coverage Added | Per-user usage state |
| Why Non-Duplicate | No existing case targets state persistence across applications. |

### TC-API-109 — Characterize application of an expired coupon condition.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-109 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize application of an expired coupon condition. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR09-005 |
| Partition References | EP-FR09-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A coupon whose expiration condition can be established from authoritative data is available. |
| Input Condition | Coupon is in an expired condition; total and user classes are otherwise nominal. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Eligibility result is UNSPECIFIED because expiration semantics are absent. |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-006 |
| Coverage Added | Expiration eligibility condition |
| Why Non-Duplicate | Non-existing code is already covered; this adds a distinct existing-but-expired condition. |

### TC-API-110 — Characterize application of the same coupon across two user identities.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-110 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize application of the same coupon across two user identities. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR09-004, TB-FR09-005 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An existing coupon, a nominal total class, and two existing user identities are available. |
| Input Condition | The same coupon and total classes are applied once for each distinct user_id. |
| Action | Perform the two application operations as an ordered observation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe both response representations. |
| Semantic Oracle | Observe whether results differ by user identity without inventing an eligibility rule. |
| State Oracle | Cross-user usage and attribution behavior are UNSPECIFIED. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-004, BLK-FR09-005, BLK-FR09-006 |
| Coverage Added | Cross-user coupon-usage interaction |
| Why Non-Duplicate | TC-API-108 repeats use by one user; this case isolates whether usage or eligibility is scoped across distinct user identities. |

### TC-API-111 — Characterize total_amount below a coupon's stored minimum-order relation.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-111 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize total_amount below a coupon's stored minimum-order relation. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR09-003, TB-FR09-005 |
| Partition References | EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A coupon exposing a minimum-order attribute exists; semantics are not assumed. |
| Input Condition | total_amount is lower than that stored attribute; no concrete values are selected. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe the relationship outcome without asserting threshold semantics. |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Minimum-order relational class |
| Why Non-Duplicate | Adds a cross-field relation supported by the documented coupon-management model, not an invented numeric boundary. |

### TC-API-112 — Characterize total_amount equal to a coupon's stored minimum-order relation.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-112 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize total_amount equal to a coupon's stored minimum-order relation. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR09-003, TB-FR09-005 |
| Partition References | EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A coupon exposing a minimum-order attribute exists; semantics are not assumed. |
| Input Condition | total_amount equals that stored attribute abstractly; no concrete boundary is fabricated. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe equality handling without claiming inclusive/exclusive semantics. |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-002, BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Minimum-order equality relation |
| Why Non-Duplicate | Complements the below relation with the equality interaction needed to learn inclusivity. |

### TC-API-113 — Characterize discount type and discount value interaction.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-113 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize discount type and discount value interaction. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR09-005, TB-FR09-006, TB-FR09-007 |
| Partition References | EP-FR09-001, EP-FR09-006 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A coupon with observable discount type/value attributes exists. |
| Input Condition | Nominal application inputs target one documented stored coupon configuration. |
| Action | Apply the coupon and compare returned amounts to the coupon configuration only after rules are supplied. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Documented response fields are expected; their types remain UNSPECIFIED. |
| Semantic Oracle | Formula and rounding outcome are UNSPECIFIED. |
| State Oracle | UNSPECIFIED |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR09-003, BLK-FR09-006 |
| Coverage Added | Discount-configuration interaction |
| Why Non-Duplicate | Adds business-rule interaction coverage rather than another code/input validity case. |

### TC-API-114 — Characterize Authorization identity when body user_id is omitted.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-114 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Characterize Authorization identity when body user_id is omitted. |
| Test Origin | AI_GENERATED |
| Primary Technique | SECURITY |
| Requirement References | TB-FR09-004 |
| Partition References | EP-FR09-012, EP-FR09-016 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated context is available. |
| Input Condition | Body omits user_id while Authorization supplies an identity; code and total are nominal. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether authenticated identity substitutes for, conflicts with, or does not affect the omitted body identity. |
| State Oracle | Observe attribution only if externally visible. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-004, BLK-FR09-005, BLK-FR09-006, BLK-ALL-001 |
| Coverage Added | Omitted-body-identity × authenticated-context interaction |
| Why Non-Duplicate | TC-API-023 omits user_id without making authenticated identity the purpose. |

### TC-API-115 — Observe tolerance of an undocumented coupon-application request member.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-115 |
| Feature | FR-09 |
| Endpoint / Operation | POST /api/apply-coupon |
| Title | Observe tolerance of an undocumented coupon-application request member. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR09-001, TB-FR09-002, TB-FR09-003, TB-FR09-004 |
| Partition References | EP-FR09-001, EP-FR09-006, EP-FR09-010 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | Nominal documented input classes can be represented. |
| Input Condition | Nominal fields plus one additional undocumented member. |
| Action | Apply the coupon. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe whether the response contract changes. |
| Semantic Oracle | Observe whether the extra member is ignored, rejected, or otherwise handled. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR09-001, BLK-FR09-006 |
| Coverage Added | Unknown-member robustness class |
| Why Non-Duplicate | No existing coupon-application case examines request extensibility. |
## P.18 FR-18 New In-Scope Cases

### TC-API-116 — Characterize the admin order-list response schema.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-116 |
| Feature | FR-18 |
| Endpoint / Operation | GET /api/admin/orders |
| Title | Characterize the admin order-list response schema. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004 |
| Partition References | EP-FR18-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin context exists. |
| Input Condition | Documented Admin Bearer context. |
| Action | Retrieve the system-wide order list. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Record response media type, container shape, and member fields; all are UNSPECIFIED. |
| Semantic Oracle | Response represents system-wide orders. |
| State Oracle | No state change is expected from the read operation, but idempotence is not specified. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-005 |
| Coverage Added | Admin-list response-shape discovery |
| Why Non-Duplicate | TC-API-046 tests access and semantics but lacks a dedicated incomplete-schema observation. |

### TC-API-117 — Verify that Admin order listing is system-wide.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-117 |
| Feature | FR-18 |
| Endpoint / Operation | GET /api/admin/orders |
| Title | Verify that Admin order listing is system-wide. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004 |
| Partition References | EP-FR18-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin context and orders attributable to more than one user exist. |
| Input Condition | Documented Admin Bearer context. |
| Action | Retrieve the Admin order list. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Returned order collection represents orders for the entire system, not only the Admin's personal orders. |
| State Oracle | UNSPECIFIED |
| Expected Classification | POSITIVE |
| Readiness | READY |
| Blocker | N/A |
| Coverage Added | TB-FR18-002; system-wide inclusion semantics |
| Why Non-Duplicate | TC-API-046 establishes retrieval generally; this isolates the explicit toàn hệ thống requirement. |

### TC-API-118 — Characterize the response shape when the system has no orders.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-118 |
| Feature | FR-18 |
| Endpoint / Operation | GET /api/admin/orders |
| Title | Characterize the response shape when the system has no orders. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR18-001, TB-FR18-002 |
| Partition References | EP-FR18-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin context and an abstract no-orders state can be established. |
| Input Condition | Documented Admin Bearer context in a system with no orders. |
| Action | Retrieve the Admin order list. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the empty-result representation; exact container is UNSPECIFIED. |
| Semantic Oracle | Observe representation of the system-wide no-orders condition. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-005 |
| Coverage Added | Empty-collection schema variant |
| Why Non-Duplicate | Existing list cases do not target the empty domain state. |

### TC-API-119 — Observe handling of an undocumented query parameter.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-119 |
| Feature | FR-18 |
| Endpoint / Operation | GET /api/admin/orders |
| Title | Observe handling of an undocumented query parameter. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR18-001 |
| Partition References | EP-FR18-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin context exists. |
| Input Condition | The documented path includes an additional unspecified query member. |
| Action | Retrieve the Admin order list. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe whether the extra query member is ignored, rejected, or changes behavior. |
| State Oracle | UNSPECIFIED |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-005 |
| Coverage Added | Query extensibility robustness class |
| Why Non-Duplicate | No existing Admin-list case examines undocumented query handling. |

### TC-API-120 — Characterize consistency across repeated Admin order-list reads.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-120 |
| Feature | FR-18 |
| Endpoint / Operation | GET /api/admin/orders |
| Title | Characterize consistency across repeated Admin order-list reads. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR18-001, TB-FR18-002 |
| Partition References | EP-FR18-001 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin context exists and no intervening order mutation occurs. |
| Input Condition | The same documented read condition is repeated. |
| Action | Retrieve the Admin order list twice without an intervening mutation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe both response shapes. |
| Semantic Oracle | Compare observable collections without asserting ordering or idempotence rules absent from the specification. |
| State Oracle | No mutation should be inferred; formal idempotence oracle is UNSPECIFIED. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-005 |
| Coverage Added | Repeated-read interaction |
| Why Non-Duplicate | Adds read-consistency observation distinct from one-time retrieval. |

### TC-API-121 — Characterize the successful status-update response schema.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-121 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Characterize the successful status-update response schema. |
| Test Origin | AI_GENERATED |
| Primary Technique | SCHEMA |
| Requirement References | TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008 |
| Partition References | EP-FR18-009, EP-FR18-013 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin, existing order, and allowed source/target relation can be established once transitions are defined. |
| Input Condition | Existing order identifier and one documented status class. |
| Action | Update the order status. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Record response media type, container, and fields; all are UNSPECIFIED. |
| Semantic Oracle | Observe acknowledgement of the targeted status update. |
| State Oracle | Observe the resulting status if externally visible. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-001, BLK-FR18-005 |
| Coverage Added | Admin-update success schema discovery |
| Why Non-Duplicate | Existing status cases focus on target classes and authorization, not the update response schema. |

### TC-API-122 — Observe handling when the status-update request body is absent.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-122 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Observe handling when the status-update request body is absent. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR18-005, TB-FR18-006 |
| Partition References | EP-FR18-019 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin and existing order are available. |
| Input Condition | No request body is supplied. |
| Action | Invoke the Admin status-update operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe body-level handling without asserting requiredness. |
| State Oracle | Observe whether order state remains unchanged if it can be verified; exact oracle is UNSPECIFIED. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-003, BLK-FR18-005 |
| Coverage Added | Absent-body robustness class |
| Why Non-Duplicate | TC-API-062 omits status within a body; this targets absence of the body container. |

### TC-API-123 — Observe handling of an empty JSON object for status update.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-123 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Observe handling of an empty JSON object for status update. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR18-005, TB-FR18-006 |
| Partition References | EP-FR18-019 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin and existing order are available. |
| Input Condition | A JSON object contains no status member. |
| Action | Invoke the Admin status-update operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation. |
| Semantic Oracle | Observe empty-object handling without asserting requiredness. |
| State Oracle | Observe whether order state remains unchanged if externally verifiable; exact oracle is UNSPECIFIED. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-003, BLK-FR18-005 |
| Coverage Added | Empty-object representation class |
| Why Non-Duplicate | Separates an explicit empty object from both an absent body and single-member omission representation. |

### TC-API-124 — Observe tolerance of an undocumented request member during a nominal status update.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-124 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Observe tolerance of an undocumented request member during a nominal status update. |
| Test Origin | AI_GENERATED |
| Primary Technique | ROBUSTNESS |
| Requirement References | TB-FR18-005, TB-FR18-006, TB-FR18-007 |
| Partition References | EP-FR18-009, EP-FR18-013 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin and an allowed update context are available once transition rules exist. |
| Input Condition | A documented status class plus one additional undocumented member. |
| Action | Invoke the Admin status-update operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe whether the response contract changes. |
| Semantic Oracle | Observe whether the extra member is ignored, rejected, or otherwise handled. |
| State Oracle | Observe the target state only after an allowed transition is defined. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-001, BLK-FR18-003, BLK-FR18-005 |
| Coverage Added | Unknown-member robustness class |
| Why Non-Duplicate | No existing Admin update case examines request extensibility. |

### TC-API-125 — Characterize an update whose target status equals the current status.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-125 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Characterize an update whose target status equals the current status. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR18-007, TB-FR18-008 |
| Partition References | EP-FR18-013, EP-FR18-014, EP-FR18-015, EP-FR18-016, EP-FR18-017 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin and an order with a known current documented status are available. |
| Input Condition | Target status is the same documented value as the current status. |
| Action | Invoke the Admin status-update operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Same-state update semantics are UNSPECIFIED. |
| State Oracle | Idempotence and resulting state behavior are UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 |
| Coverage Added | Same-state transition condition |
| Why Non-Duplicate | TC-API-050–054 cover target values, not the source-equals-target relation. |

### TC-API-126 — Characterize conflicting status updates to the same order.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-126 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Characterize conflicting status updates to the same order. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR18-005, TB-FR18-007, TB-FR18-008 |
| Partition References | EP-FR18-009, EP-FR18-013, EP-FR18-014 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin and existing order are available; two distinct documented target statuses are selected abstractly. |
| Input Condition | Two update operations target the same order with distinct documented status classes. |
| Action | Issue the logically conflicting updates under a controlled ordering or concurrency model once defined. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Conflict resolution is UNSPECIFIED. |
| State Oracle | Final state and ordering behavior are UNSPECIFIED. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 |
| Coverage Added | Multi-update state interaction |
| Why Non-Duplicate | Existing cases are single-operation target-state checks. |

### TC-API-127 — Observe isolation of an Admin status update to the targeted order.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-127 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Observe isolation of an Admin status update to the targeted order. |
| Test Origin | AI_GENERATED |
| Primary Technique | BUSINESS_RULE |
| Requirement References | TB-FR18-005, TB-FR18-008 |
| Partition References | EP-FR18-009, EP-FR18-013 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | Two existing orders and an authenticated Admin are available; an allowed transition is established once rules exist. |
| Input Condition | One order identifier is targeted; another order acts as a non-target control. |
| Action | Update the targeted order and observe both orders through an available in-scope read. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | UNSPECIFIED |
| Semantic Oracle | Observe whether only the identified order is affected; exact transition result remains dependent on rules. |
| State Oracle | Observe target and non-target states without inventing transition semantics. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 |
| Coverage Added | Target-isolation interaction |
| Why Non-Duplicate | No existing case uses a second order as a control for identifier targeting. |

### TC-API-128 — Characterize update persistence through subsequent Admin order listing.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-128 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Characterize update persistence through subsequent Admin order listing. |
| Test Origin | AI_GENERATED |
| Primary Technique | STATE |
| Requirement References | TB-FR18-002, TB-FR18-005, TB-FR18-008 |
| Partition References | EP-FR18-001, EP-FR18-009, EP-FR18-013 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | An authenticated Admin, existing order, and allowed transition are available once the transition matrix exists. |
| Input Condition | Existing order identifier and a documented target status. |
| Action | Update the order, then retrieve the system-wide Admin order list. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | List and update response schemas are UNSPECIFIED. |
| Semantic Oracle | Observe whether the read reflects the update. |
| State Oracle | Persistence and final-state oracle are UNSPECIFIED until transition rules and schemas exist. |
| Expected Classification | CONDITIONAL |
| Readiness | BLOCKED |
| Blocker | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 |
| Coverage Added | Cross-operation state persistence |
| Why Non-Duplicate | Existing cases do not connect the two in-scope Admin operations in a state-verification sequence. |

### TC-API-129 — Characterize authorization-versus-validation precedence.

| Field | Required Content |
| --- | --- |
| Test ID | TC-API-129 |
| Feature | FR-18 |
| Endpoint / Operation | PUT /api/admin/orders/:id/status |
| Title | Characterize authorization-versus-validation precedence. |
| Test Origin | AI_GENERATED |
| Primary Technique | SECURITY |
| Requirement References | TB-FR18-006, TB-FR18-007, TB-FR18-009, TB-FR18-010 |
| Partition References | EP-FR18-006, EP-FR18-018 |
| BVA References | N/A |
| Security Reference | N/A |
| Preconditions | A non-Admin authenticated context and an existing order are available. |
| Input Condition | Insufficient role is intentionally combined with a status outside the documented vocabulary to study precedence. |
| Action | Invoke the Admin status-update operation. |
| Transport Oracle | UNSPECIFIED |
| Schema Oracle | Observe the response representation without asserting precedence. |
| Semantic Oracle | Observe whether authorization or validation is evaluated first; no preferred result is invented. |
| State Oracle | Observe that no state conclusion is made unless externally verified. |
| Expected Classification | EXPLORATORY |
| Readiness | EXPLORATORY_ONLY |
| Blocker | BLK-FR18-005, BLK-FR18-006, BLK-ALL-001 |
| Coverage Added | Authorization × validation precedence |
| Why Non-Duplicate | TC-API-055 and TC-API-061 isolate each fault; this case deliberately studies their interaction. |
