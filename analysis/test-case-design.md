## A. Inputs Reviewed

- `eshop-sut/api_specification.md` — authoritative source.
- `analysis/verified-test-basis.md`, `analysis/domain-model.md`, and `analysis/boundary-value-analysis.md`.
- Prompt 002–004 logs only where needed for decision context.
- No source code, README, database, runtime, Postman suite, or implementation behavior was inspected.

## B. Test Design Summary

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

## C. Test Cases by Endpoint

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

## D. Test Case Inventory

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

