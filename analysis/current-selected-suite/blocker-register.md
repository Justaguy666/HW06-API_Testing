# Blocker Register — Current Selected Suite

Only blockers still applicable to FR-02, FR-07, FR-18, or the shared security traceability layer are listed. BLK-FR18-002 is historical cross-feature cancellation context and is excluded.

| Blocker | Feature | Description | Affected Tests | Downstream Effect |
| --- | --- | --- | --- | --- |
| BLK-FR02-001 | FR-02 | Requiredness and validation rules for `email` and `password`. | TC-API-003, TC-API-004, TC-API-005, TC-API-007, TC-API-008, TC-API-009, TC-API-010, TC-API-011, TC-API-078, TC-API-079, TC-API-080, TC-API-081, TC-API-082, TC-API-083, TC-API-084, TC-API-085, TC-API-086, TC-API-087, TC-API-088 | TEST_DATA, EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR02-002 | FR-02 | Failed-attempt counter and lockout threshold. | TC-API-013, TC-API-090, TC-API-091, TC-API-092, TC-API-093 | STATE_SETUP, EXPECTED_RESULT |
| BLK-FR02-003 | FR-02 | Lock duration and unlock behavior. | TC-API-013, TC-API-092, TC-API-093 | STATE_SETUP, EXECUTION |
| BLK-FR02-004 | FR-02 | Failure status codes and error schema. | TC-API-002, TC-API-006, TC-API-012, TC-API-013, TC-API-077, TC-API-078, TC-API-079, TC-API-080, TC-API-081, TC-API-082, TC-API-083, TC-API-084, TC-API-085, TC-API-086, TC-API-087, TC-API-088, TC-API-090, TC-API-091, TC-API-092, TC-API-093, TC-API-094 | EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR02-005 | FR-02 | Exact `user` response schema and permitted sensitive fields. | TC-API-001, TC-API-095 | POSTMAN_ASSERTION, SECURITY |
| BLK-FR02-006 | FR-02 | JWT claims, lifetime, and invalidation. | TC-API-001, TC-API-089 | SECURITY, EXPECTED_RESULT |
| BLK-FR07-001 | FR-07 | Body-member requiredness, normative types, and validation. | TC-API-133, TC-API-139, TC-API-140, TC-API-141, TC-API-142, TC-API-143, TC-API-144, TC-API-145, TC-API-146, TC-API-147, TC-API-148, TC-API-149, TC-API-150, TC-API-151, TC-API-152 | TEST_DATA, EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR07-002 | FR-07 | Meaning of `id`, `name`, `price`, and Product relationship. | TC-API-133, TC-API-141, TC-API-142, TC-API-143, TC-API-144, TC-API-145, TC-API-146, TC-API-147, TC-API-154, TC-API-155, TC-API-164 | TEST_DATA, STATE_SETUP |
| BLK-FR07-003 | FR-07 | Quantity integer/range/stock domain. | TC-API-133, TC-API-150, TC-API-151, TC-API-152, TC-API-164 | TEST_DATA, STATE_SETUP, EXPECTED_RESULT |
| BLK-FR07-004 | FR-07 | Cart ownership and token-to-Cart mapping. | TC-API-131, TC-API-156, TC-API-157 | STATE_SETUP, SECURITY |
| BLK-FR07-005 | FR-07 | Exact add mutation and resulting Cart state. | TC-API-134, TC-API-139, TC-API-153, TC-API-154, TC-API-155, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | STATE_SETUP, EXPECTED_RESULT |
| BLK-FR07-006 | FR-07 | Repeated add, duplicate, accumulation/replacement semantics. | TC-API-134, TC-API-160 | EXPECTED_RESULT |
| BLK-FR07-007 | FR-07 | Cart creation, lifetime, session scope, and persistence. | TC-API-131, TC-API-134, TC-API-156, TC-API-158, TC-API-161 | STATE_SETUP, EXECUTION |
| BLK-FR07-008 | FR-07 | Success/error statuses and response schemas. | TC-API-130, TC-API-131, TC-API-132, TC-API-134, TC-API-135, TC-API-136, TC-API-137, TC-API-138, TC-API-139, TC-API-140, TC-API-142, TC-API-143, TC-API-145, TC-API-146, TC-API-148, TC-API-149, TC-API-151, TC-API-152, TC-API-153, TC-API-155, TC-API-158, TC-API-159, TC-API-160, TC-API-161, TC-API-162, TC-API-163 | EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR07-009 | FR-07 | Price authority, currency, precision, formulas, and rounding. | TC-API-133, TC-API-147, TC-API-148, TC-API-149, TC-API-153 | EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR07-010 | FR-07 | Product existence, availability, deletion, inventory, and stock. | TC-API-141, TC-API-150, TC-API-154, TC-API-155, TC-API-164 | STATE_SETUP, EXECUTION |
| BLK-FR07-011 | FR-07 | Missing/malformed Bearer failure behavior. | TC-API-130, TC-API-132, TC-API-135, TC-API-136, TC-API-137, TC-API-138 | SECURITY, EXPECTED_RESULT |
| BLK-FR07-012 | FR-07 | Repeated retrieval consistency and visibility/order after add. | TC-API-156, TC-API-158, TC-API-159, TC-API-161, TC-API-162 | STATE_SETUP, EXPECTED_RESULT |
| BLK-FR18-001 | FR-18 | Concrete Admin order transition matrix. | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-121, TC-API-124, TC-API-125, TC-API-126, TC-API-127, TC-API-128 | STATE_SETUP, EXPECTED_RESULT |
| BLK-FR18-003 | FR-18 | `id` and `status` requiredness/type constraints. | TC-API-058, TC-API-060, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066, TC-API-122, TC-API-123, TC-API-124 | TEST_DATA, EXPECTED_RESULT |
| BLK-FR18-004 | FR-18 | Initial/final states and idempotence. | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-125, TC-API-126, TC-API-127, TC-API-128 | STATE_SETUP, EXPECTED_RESULT |
| BLK-FR18-005 | FR-18 | Success/error statuses and response schemas. | TC-API-046, TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-059, TC-API-061, TC-API-116, TC-API-118, TC-API-119, TC-API-120, TC-API-121, TC-API-122, TC-API-123, TC-API-124, TC-API-125, TC-API-126, TC-API-127, TC-API-128, TC-API-129 | EXPECTED_RESULT, POSTMAN_ASSERTION |
| BLK-FR18-006 | FR-18 | Missing/invalid-token and non-admin failure behavior. | TC-API-047, TC-API-048, TC-API-049, TC-API-055, TC-API-056, TC-API-057, TC-API-129 | SECURITY, EXPECTED_RESULT |
| BLK-ALL-001 | ALL | SEC-01–SEC-07 definitions and mappings. | TC-API-001, TC-API-002, TC-API-006, TC-API-047, TC-API-048, TC-API-049, TC-API-055, TC-API-056, TC-API-057, TC-API-089, TC-API-094, TC-API-095, TC-API-129 | SECURITY, POSTMAN_ASSERTION |

The affected-test field is recalculated from the canonical 105-case traceability. A blocker remains active even when it limits oracle depth rather than making every referenced case non-executable.
