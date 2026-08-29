# Verified Test Basis — Current Selected Suite

Only the stable FR-02, FR-07, and FR-18 current-basis IDs are active. TB-FR18-011–013 support historical cross-feature cancellation cases and are not part of the selected basis.

| TB-ID | Feature | Requirement | Testability | Active Test IDs | Blocker |
| --- | --- | --- | --- | --- | --- |
| TB-FR02-001 | FR-02 | Method/path are `POST /api/login`. | TESTABLE | TC-API-010, TC-API-011, TC-API-012, TC-API-078, TC-API-088 | BLK-FR02-001, BLK-FR02-004 |
| TB-FR02-002 | FR-02 | JSON example contains `email`. | PARTIALLY_TESTABLE | TC-API-002, TC-API-003, TC-API-004, TC-API-005, TC-API-077, TC-API-078, TC-API-079, TC-API-080, TC-API-081, TC-API-082, TC-API-084, TC-API-086, TC-API-094 | BLK-ALL-001, BLK-FR02-001, BLK-FR02-004 |
| TB-FR02-003 | FR-02 | JSON example contains `password`. | PARTIALLY_TESTABLE | TC-API-006, TC-API-007, TC-API-008, TC-API-009, TC-API-077, TC-API-078, TC-API-079, TC-API-080, TC-API-081, TC-API-083, TC-API-085, TC-API-087, TC-API-094 | BLK-ALL-001, BLK-FR02-001, BLK-FR02-004 |
| TB-FR02-004 | FR-02 | Successful login returns JWT `token`. | TESTABLE | TC-API-001, TC-API-074, TC-API-075, TC-API-089 | BLK-ALL-001, BLK-FR02-005, BLK-FR02-006 |
| TB-FR02-005 | FR-02 | Success status is `200 OK`. | TESTABLE | TC-API-001, TC-API-074, TC-API-076 | BLK-ALL-001, BLK-FR02-005, BLK-FR02-006 |
| TB-FR02-006 | FR-02 | Success returns `token` and `user` information. | PARTIALLY_TESTABLE | TC-API-001, TC-API-074, TC-API-075, TC-API-076, TC-API-089, TC-API-095 | BLK-ALL-001, BLK-FR02-005, BLK-FR02-006 |
| TB-FR02-007 | FR-02 | Account/credentials are implied by the login endpoint. | PARTIALLY_TESTABLE | TC-API-002, TC-API-006, TC-API-013, TC-API-084, TC-API-085, TC-API-086, TC-API-087, TC-API-090, TC-API-091, TC-API-092, TC-API-093, TC-API-094 | BLK-ALL-001, BLK-FR02-001, BLK-FR02-002, BLK-FR02-003, BLK-FR02-004 |
| TB-FR07-001 | FR-07 | The GET Cart endpoint requires header `Authorization: Bearer <token>` | PARTIALLY_TESTABLE | TC-API-130, TC-API-135, TC-API-136, TC-API-156 | BLK-FR07-004, BLK-FR07-007, BLK-FR07-008, BLK-FR07-011, BLK-FR07-012 |
| TB-FR07-002 | FR-07 | The documented retrieve-Cart operation uses `GET /api/cart` | TESTABLE | TC-API-130, TC-API-131, TC-API-135, TC-API-136, TC-API-159, TC-API-161 | BLK-FR07-004, BLK-FR07-005, BLK-FR07-007, BLK-FR07-008, BLK-FR07-011, BLK-FR07-012 |
| TB-FR07-003 | FR-07 | The documented purpose of `GET /api/cart` is to retrieve the Cart | PARTIALLY_TESTABLE | TC-API-131, TC-API-156, TC-API-157, TC-API-158, TC-API-159, TC-API-161, TC-API-162 | BLK-FR07-004, BLK-FR07-005, BLK-FR07-007, BLK-FR07-008, BLK-FR07-012 |
| TB-FR07-004 | FR-07 | The documented add-to-Cart operation uses `POST /api/cart` | TESTABLE | TC-API-132, TC-API-134, TC-API-137, TC-API-138, TC-API-160, TC-API-161 | BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008, BLK-FR07-011, BLK-FR07-012 |
| TB-FR07-005 | FR-07 | The specification supplies a JSON request-body example for add-to-Cart | PARTIALLY_TESTABLE | TC-API-133, TC-API-139, TC-API-140, TC-API-141, TC-API-142, TC-API-143, TC-API-144, TC-API-145, TC-API-146, TC-API-147, TC-API-148, TC-API-149, TC-API-150, TC-API-151, TC-API-152 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-008, BLK-FR07-009, BLK-FR07-010 |
| TB-FR07-006 | FR-07 | The JSON example contains body member `id` represented by literal `1` | PARTIALLY_TESTABLE | TC-API-133, TC-API-141, TC-API-142, TC-API-143, TC-API-154, TC-API-155, TC-API-164 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-008, BLK-FR07-009, BLK-FR07-010 |
| TB-FR07-007 | FR-07 | The JSON example contains body member `name` represented by literal `"Sản phẩm A"` | PARTIALLY_TESTABLE | TC-API-133, TC-API-144, TC-API-145, TC-API-146 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-008, BLK-FR07-009 |
| TB-FR07-008 | FR-07 | The JSON example contains body member `price` represented by literal `100000` | PARTIALLY_TESTABLE | TC-API-133, TC-API-147, TC-API-148, TC-API-149, TC-API-153 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-008, BLK-FR07-009 |
| TB-FR07-009 | FR-07 | The JSON example contains body member `quantity` represented by literal `2` | PARTIALLY_TESTABLE | TC-API-133, TC-API-150, TC-API-151, TC-API-152, TC-API-153, TC-API-164 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-005, BLK-FR07-008, BLK-FR07-009, BLK-FR07-010 |
| TB-FR07-010 | FR-07 | The documented purpose of `POST /api/cart` is to add to the Cart | PARTIALLY_TESTABLE | TC-API-134, TC-API-139, TC-API-141, TC-API-147, TC-API-150, TC-API-153, TC-API-154, TC-API-155, TC-API-156, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-004, BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008, BLK-FR07-009, BLK-FR07-010, BLK-FR07-012 |
| TB-FR07-011 | FR-07 | The specification provides no response status, body, fields, types, semantic result, or exact schema for GET Cart | BLOCKED | TC-API-131, TC-API-158, TC-API-159, TC-API-161, TC-API-162 | BLK-FR07-004, BLK-FR07-005, BLK-FR07-007, BLK-FR07-008, BLK-FR07-012 |
| TB-FR07-012 | FR-07 | The specification provides no response status, body, fields, types, semantic result, or exact schema for POST Cart | BLOCKED | TC-API-134, TC-API-153, TC-API-160, TC-API-161, TC-API-163 | BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008, BLK-FR07-009, BLK-FR07-012 |
| TB-FR07-013 | FR-07 | The POST Cart endpoint requires header `Authorization: Bearer <token>` | PARTIALLY_TESTABLE | TC-API-132, TC-API-134, TC-API-137, TC-API-138, TC-API-156 | BLK-FR07-004, BLK-FR07-005, BLK-FR07-006, BLK-FR07-007, BLK-FR07-008, BLK-FR07-011, BLK-FR07-012 |
| TB-FR18-001 | FR-18 | Method/path are `GET /api/admin/orders`. | TESTABLE | TC-API-046, TC-API-116, TC-API-117, TC-API-118, TC-API-119, TC-API-120 | BLK-FR18-005 |
| TB-FR18-002 | FR-18 | Operation lists orders for the entire system. | TESTABLE | TC-API-046, TC-API-116, TC-API-117, TC-API-118, TC-API-120, TC-API-128 | BLK-FR18-001, BLK-FR18-004, BLK-FR18-005 |
| TB-FR18-003 | FR-18 | Requires `Authorization: Bearer <token>`. | TESTABLE | TC-API-046, TC-API-048, TC-API-049, TC-API-116, TC-API-117 | BLK-ALL-001, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-004 | FR-18 | Account must have Admin permission. | TESTABLE | TC-API-046, TC-API-047, TC-API-116, TC-API-117 | BLK-ALL-001, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-005 | FR-18 | Method/path identify an order by `id`. | PARTIALLY_TESTABLE | TC-API-058, TC-API-059, TC-API-060, TC-API-121, TC-API-122, TC-API-123, TC-API-124, TC-API-126, TC-API-127, TC-API-128 | BLK-FR18-001, BLK-FR18-003, BLK-FR18-004, BLK-FR18-005 |
| TB-FR18-006 | FR-18 | JSON example contains `status: "confirmed"`. | PARTIALLY_TESTABLE | TC-API-061, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066, TC-API-121, TC-API-122, TC-API-123, TC-API-124, TC-API-129 | BLK-ALL-001, BLK-FR18-001, BLK-FR18-003, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-007 | FR-18 | Documented status vocabulary is `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | TESTABLE | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-061, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066, TC-API-121, TC-API-124, TC-API-125, TC-API-126, TC-API-129 | BLK-ALL-001, BLK-FR18-001, BLK-FR18-003, BLK-FR18-004, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-008 | FR-18 | Operation updates order status. | PARTIALLY_TESTABLE | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-061, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066, TC-API-121, TC-API-125, TC-API-126, TC-API-127, TC-API-128 | BLK-FR18-001, BLK-FR18-003, BLK-FR18-004, BLK-FR18-005 |
| TB-FR18-009 | FR-18 | Requires `Authorization: Bearer <token>`. | TESTABLE | TC-API-056, TC-API-057, TC-API-129 | BLK-ALL-001, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-010 | FR-18 | Account must have Admin permission. | TESTABLE | TC-API-055, TC-API-129 | BLK-ALL-001, BLK-FR18-005, BLK-FR18-006 |
| TB-FR18-014 | FR-18 | Admin account and Bearer token are explicit dependencies. | TESTABLE | NONE | TRACEABILITY_GAP — dependency is active but no current case explicitly cites it |

TB-FR18-014 remains an active dependency basis item. Its absence from current per-case TB references is preserved as a traceability gap rather than silently changing human-audited cases.

## Inventory totals

| Feature | Current TB Count |
| --- | --- |
| FR-02 | 7 |
| FR-07 | 13 |
| FR-18 | 11 |
| TOTAL | 31 |
