# Domain and Partition Summary — Current Selected Suite

This compact inventory is optimized for downstream test-data design. Feature-local IDs remain separate.

## Parameter and dimension inventory

| ID | Feature | Type | Description | Active? |
| --- | --- | --- | --- | --- |
| P-FR02-001 | FR-02 | PARAM | `POST /api/login` — Body ``email``; None | YES |
| P-FR02-002 | FR-02 | PARAM | `POST /api/login` — Body ``password``; None | YES |
| P-FR02-003 | FR-02 | PARAM | `POST /api/login` — Header ``Content-Type``; Body is shown as JSON; header rule Not specified | YES |
| P-FR02-004 | FR-02 | PARAM | `POST /api/login` — Header ``Authorization``; No request auth requirement documented | YES |
| P-FR18-001 | FR-18 | PARAM | `GET /api/admin/orders` — Header ``Authorization``; Bearer token; account must have Admin permission | YES |
| P-FR18-002 | FR-18 | PARAM | `PUT /api/admin/orders/:id/status` — Header ``Authorization``; Bearer token; account must have Admin permission | YES |
| P-FR18-003 | FR-18 | PARAM | `PUT /api/admin/orders/:id/status` — Path ``id``; Identifies order; format/range Not specified | YES |
| P-FR18-004 | FR-18 | PARAM | `PUT /api/admin/orders/:id/status` — Body ``status``; Documented set: `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | YES |
| P-FR18-005 | FR-18 | PARAM | `PUT /api/admin/orders/:id/status` — Header ``Content-Type``; Body is shown as JSON; header rule Not specified | YES |
| PARAM-FR07-001 | FR-07 | PARAM | `GET /api/cart` — Authentication header context; Exact form `Authorization: Bearer <token>` is required; token rules/failure behavior absent | YES |
| PARAM-FR07-002 | FR-07 | PARAM | `POST /api/cart` — Authentication header context; Exact form `Authorization: Bearer <token>` is required; token rules/failure behavior absent | YES |
| PARAM-FR07-003 | FR-07 | PARAM | `POST /api/cart` — Body member `id`; Example uses numeric literal `1`; normative type/semantics absent | YES |
| PARAM-FR07-004 | FR-07 | PARAM | `POST /api/cart` — Body member `name`; Example uses string literal `"Sản phẩm A"`; normative type/constraints absent | YES |
| PARAM-FR07-005 | FR-07 | PARAM | `POST /api/cart` — Body member `price`; Example uses numeric literal `100000`; normative type/domain absent | YES |
| PARAM-FR07-006 | FR-07 | PARAM | `POST /api/cart` — Body member `quantity`; Example uses numeric literal `2`; normative type/domain absent | YES |
| DIM-FR07-001 | FR-07 | DIM | POST request-body representation/presence; §4.2 explicitly documents “Body (JSON),” while TB-FR07-005 and BLK-FR07-001 require representation treatment beyond individual members | YES |
| DIM-FR07-002 | FR-07 | DIM | Referenced resource existence context; Body `id` may denote a resource but linkage/existence behavior is unresolved | YES |
| DIM-FR07-003 | FR-07 | DIM | Authentication-to-Cart ownership context; Bearer authentication is explicit, but token-to-Cart ownership is unresolved | YES |
| DIM-FR07-004 | FR-07 | DIM | Cart access/lifecycle context; Retrieval/add exist, while Cart creation, first access, persistence, and later access are unresolved | YES |
| DIM-FR07-005 | FR-07 | DIM | Single/repeated/cross-operation sequence context; Both operations exist and blockers explicitly cover repeated add, repeated GET, and read-after-add | YES |

## Equivalence-partition inventory

| EP-ID | Feature | Classification | Active Test IDs | Coverage |
| --- | --- | --- | --- | --- |
| EP-FR02-001 | FR-02 | CONDITIONAL | TC-API-001, TC-API-006, TC-API-007, TC-API-008, TC-API-009, TC-API-010, TC-API-011, TC-API-012, TC-API-074, TC-API-075, TC-API-076, TC-API-081, TC-API-082, TC-API-084, TC-API-086, TC-API-089, TC-API-090, TC-API-091, TC-API-095 | COVERED |
| EP-FR02-002 | FR-02 | EXPLORATORY | TC-API-002, TC-API-077, TC-API-082, TC-API-084, TC-API-086, TC-API-094 | DEFERRED_EXPLORATORY |
| EP-FR02-003 | FR-02 | EXPLORATORY | TC-API-003, TC-API-078, TC-API-079 | DEFERRED_EXPLORATORY |
| EP-FR02-004 | FR-02 | EXPLORATORY | TC-API-004, TC-API-080 | DEFERRED_EXPLORATORY |
| EP-FR02-005 | FR-02 | EXPLORATORY | TC-API-005 | DEFERRED_EXPLORATORY |
| EP-FR02-006 | FR-02 | CONDITIONAL | TC-API-001, TC-API-002, TC-API-003, TC-API-004, TC-API-005, TC-API-010, TC-API-011, TC-API-012, TC-API-074, TC-API-075, TC-API-076, TC-API-081, TC-API-083, TC-API-085, TC-API-087, TC-API-089, TC-API-090, TC-API-091, TC-API-095 | COVERED |
| EP-FR02-007 | FR-02 | EXPLORATORY | TC-API-006, TC-API-013, TC-API-077, TC-API-083, TC-API-085, TC-API-087, TC-API-090, TC-API-091, TC-API-094 | DEFERRED_EXPLORATORY |
| EP-FR02-008 | FR-02 | EXPLORATORY | TC-API-007, TC-API-078, TC-API-079 | DEFERRED_EXPLORATORY |
| EP-FR02-009 | FR-02 | EXPLORATORY | TC-API-008, TC-API-080 | DEFERRED_EXPLORATORY |
| EP-FR02-010 | FR-02 | EXPLORATORY | TC-API-009 | DEFERRED_EXPLORATORY |
| EP-FR02-011 | FR-02 | EXPLORATORY | TC-API-001, TC-API-002, TC-API-003, TC-API-004, TC-API-005, TC-API-006, TC-API-007, TC-API-008, TC-API-009, TC-API-012 | COVERED |
| EP-FR02-012 | FR-02 | EXPLORATORY | TC-API-010 | DEFERRED_EXPLORATORY |
| EP-FR02-013 | FR-02 | EXPLORATORY | TC-API-011 | DEFERRED_EXPLORATORY |
| EP-FR02-014 | FR-02 | EXPLORATORY | TC-API-001, TC-API-002, TC-API-003, TC-API-004, TC-API-005, TC-API-006, TC-API-007, TC-API-008, TC-API-009, TC-API-010, TC-API-011 | COVERED |
| EP-FR02-015 | FR-02 | EXPLORATORY | TC-API-012 | DEFERRED_EXPLORATORY |
| EP-FR07-001 | FR-07 | VALID | TC-API-130, TC-API-131 | COVERED |
| EP-FR07-002 | FR-07 | EXPLORATORY | TC-API-135 | COVERED |
| EP-FR07-003 | FR-07 | EXPLORATORY | TC-API-136 | COVERED |
| EP-FR07-004 | FR-07 | VALID | TC-API-132, TC-API-134 | COVERED |
| EP-FR07-005 | FR-07 | EXPLORATORY | TC-API-137 | COVERED |
| EP-FR07-006 | FR-07 | EXPLORATORY | TC-API-138 | COVERED |
| EP-FR07-007 | FR-07 | VALID | TC-API-133, TC-API-137, TC-API-138, TC-API-141, TC-API-142, TC-API-143, TC-API-144, TC-API-145, TC-API-146, TC-API-147, TC-API-148, TC-API-149, TC-API-150, TC-API-151, TC-API-152 | COVERED |
| EP-FR07-008 | FR-07 | EXPLORATORY | TC-API-139 | COVERED |
| EP-FR07-009 | FR-07 | EXPLORATORY | TC-API-140 | COVERED |
| EP-FR07-010 | FR-07 | VALID | TC-API-133 | COVERED |
| EP-FR07-011 | FR-07 | EXPLORATORY | TC-API-141 | COVERED |
| EP-FR07-012 | FR-07 | EXPLORATORY | TC-API-142 | COVERED |
| EP-FR07-013 | FR-07 | EXPLORATORY | TC-API-143 | COVERED |
| EP-FR07-014 | FR-07 | VALID | TC-API-133 | COVERED |
| EP-FR07-015 | FR-07 | EXPLORATORY | TC-API-144 | COVERED |
| EP-FR07-016 | FR-07 | EXPLORATORY | TC-API-145 | COVERED |
| EP-FR07-017 | FR-07 | EXPLORATORY | TC-API-146 | COVERED |
| EP-FR07-018 | FR-07 | VALID | TC-API-133 | COVERED |
| EP-FR07-019 | FR-07 | EXPLORATORY | TC-API-147, TC-API-153 | COVERED |
| EP-FR07-020 | FR-07 | EXPLORATORY | TC-API-148 | COVERED |
| EP-FR07-021 | FR-07 | EXPLORATORY | TC-API-149 | COVERED |
| EP-FR07-022 | FR-07 | VALID | TC-API-133 | COVERED |
| EP-FR07-023 | FR-07 | EXPLORATORY | TC-API-150, TC-API-153, TC-API-164 | COVERED |
| EP-FR07-024 | FR-07 | EXPLORATORY | TC-API-151 | COVERED |
| EP-FR07-025 | FR-07 | EXPLORATORY | TC-API-152 | COVERED |
| EP-FR07-026 | FR-07 | CONDITIONAL | TC-API-154, TC-API-164 | BLOCKED |
| EP-FR07-027 | FR-07 | CONDITIONAL | TC-API-155 | BLOCKED |
| EP-FR07-028 | FR-07 | CONDITIONAL | TC-API-156 | BLOCKED |
| EP-FR07-029 | FR-07 | EXPLORATORY | TC-API-157 | BLOCKED |
| EP-FR07-030 | FR-07 | CONDITIONAL | TC-API-158 | BLOCKED |
| EP-FR07-031 | FR-07 | EXPLORATORY | TC-API-158 | BLOCKED |
| EP-FR07-032 | FR-07 | VALID | TC-API-130, TC-API-131, TC-API-158, TC-API-159, TC-API-162 | COVERED |
| EP-FR07-033 | FR-07 | EXPLORATORY | TC-API-159 | COVERED_VIA_INTERACTION |
| EP-FR07-034 | FR-07 | VALID | TC-API-132, TC-API-134, TC-API-153, TC-API-154, TC-API-155, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | COVERED |
| EP-FR07-035 | FR-07 | EXPLORATORY | TC-API-160 | COVERED_VIA_INTERACTION |
| EP-FR07-036 | FR-07 | EXPLORATORY | TC-API-161 | COVERED_VIA_INTERACTION |
| EP-FR18-001 | FR-18 | VALID | TC-API-046, TC-API-116, TC-API-117, TC-API-118, TC-API-119, TC-API-120, TC-API-128 | COVERED |
| EP-FR18-002 | FR-18 | INVALID | TC-API-047 | COVERED |
| EP-FR18-003 | FR-18 | INVALID | TC-API-048 | COVERED |
| EP-FR18-004 | FR-18 | INVALID | TC-API-049 | COVERED |
| EP-FR18-005 | FR-18 | VALID | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-058, TC-API-059, TC-API-060, TC-API-061, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066 | BLOCKED |
| EP-FR18-006 | FR-18 | INVALID | TC-API-055, TC-API-129 | COVERED |
| EP-FR18-007 | FR-18 | INVALID | TC-API-056 | COVERED |
| EP-FR18-008 | FR-18 | INVALID | TC-API-057 | COVERED |
| EP-FR18-009 | FR-18 | CONDITIONAL | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-055, TC-API-056, TC-API-057, TC-API-061, TC-API-062, TC-API-063, TC-API-064, TC-API-065, TC-API-066, TC-API-121, TC-API-124, TC-API-126, TC-API-127, TC-API-128 | BLOCKED |
| EP-FR18-010 | FR-18 | EXPLORATORY | TC-API-058 | DEFERRED_EXPLORATORY |
| EP-FR18-011 | FR-18 | INVALID | TC-API-059 | COVERED |
| EP-FR18-012 | FR-18 | EXPLORATORY | TC-API-060 | DEFERRED_EXPLORATORY |
| EP-FR18-013 | FR-18 | CONDITIONAL | TC-API-050, TC-API-121, TC-API-124, TC-API-125, TC-API-126, TC-API-127, TC-API-128 | BLOCKED |
| EP-FR18-014 | FR-18 | CONDITIONAL | TC-API-051, TC-API-055, TC-API-056, TC-API-057, TC-API-058, TC-API-059, TC-API-060, TC-API-065, TC-API-066, TC-API-125, TC-API-126 | BLOCKED |
| EP-FR18-015 | FR-18 | CONDITIONAL | TC-API-052, TC-API-125 | BLOCKED |
| EP-FR18-016 | FR-18 | CONDITIONAL | TC-API-053, TC-API-125 | BLOCKED |
| EP-FR18-017 | FR-18 | CONDITIONAL | TC-API-054, TC-API-125 | BLOCKED |
| EP-FR18-018 | FR-18 | INVALID | TC-API-061, TC-API-129 | COVERED |
| EP-FR18-019 | FR-18 | EXPLORATORY | TC-API-062, TC-API-122, TC-API-123 | DEFERRED_EXPLORATORY |
| EP-FR18-020 | FR-18 | EXPLORATORY | TC-API-063 | DEFERRED_EXPLORATORY |
| EP-FR18-021 | FR-18 | EXPLORATORY | TC-API-064 | DEFERRED_EXPLORATORY |
| EP-FR18-022 | FR-18 | EXPLORATORY | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-055, TC-API-056, TC-API-057, TC-API-058, TC-API-059, TC-API-060, TC-API-061, TC-API-062, TC-API-063, TC-API-064 | DEFERRED_EXPLORATORY |
| EP-FR18-023 | FR-18 | EXPLORATORY | TC-API-065 | DEFERRED_EXPLORATORY |
| EP-FR18-024 | FR-18 | EXPLORATORY | TC-API-066 | DEFERRED_EXPLORATORY |

## EP coverage totals

| Feature | Total EP | Covered | Interaction | Blocked | Deferred |
| --- | --- | --- | --- | --- | --- |
| FR-02 | 15 | 4 | 0 | 0 | 11 |
| FR-07 | 36 | 27 | 3 | 6 | 0 |
| FR-18 | 24 | 9 | 0 | 7 | 8 |
| TOTAL | 75 | 40 | 3 | 13 | 19 |

## Interaction and state summary

| Feature | Coverage Dimension | Active Test IDs | Status |
| --- | --- | --- | --- |
| FR-07 | INT-FR07-001 | TC-API-130, TC-API-131, TC-API-135, TC-API-136 | COVERED |
| FR-07 | INT-FR07-002 | TC-API-132, TC-API-134, TC-API-137, TC-API-138 | COVERED |
| FR-07 | INT-FR07-003 | TC-API-133, TC-API-139–TC-API-152 | COVERED |
| FR-07 | INT-FR07-004 | TC-API-154, TC-API-155 | BLOCKED |
| FR-07 | INT-FR07-005 | TC-API-164 | BLOCKED |
| FR-07 | INT-FR07-006 | TC-API-153 | COVERED |
| FR-07 | INT-FR07-007 | TC-API-156, TC-API-157 | BLOCKED |
| FR-07 | INT-FR07-008 | TC-API-158 | BLOCKED |
| FR-07 | INT-FR07-009 | TC-API-160 | COVERED |
| FR-07 | INT-FR07-010 | TC-API-161 | COVERED |
| FR-07 | INT-FR07-011 | TC-API-159 | PARTIAL |
| FR-02 | AUTHENTICATION | TC-API-001, TC-API-002, TC-API-006, TC-API-089 | COVERED_WITH_BLOCKERS |
| FR-02 | STATE | TC-API-013, TC-API-090, TC-API-091, TC-API-092, TC-API-093 | BLOCKED |
| FR-02 | SECURITY | TC-API-094, TC-API-095 | DEFERRED_EXPLORATORY |
| FR-18 | AUTHENTICATION | TC-API-048, TC-API-049, TC-API-056, TC-API-057 | COVERED |
| FR-18 | AUTHORIZATION | TC-API-047, TC-API-055 | COVERED |
| FR-18 | STATE | TC-API-050, TC-API-051, TC-API-052, TC-API-053, TC-API-054, TC-API-125, TC-API-126, TC-API-128 | COVERED_WITH_BLOCKERS |
| FR-18 | RESOURCE / BUSINESS_RULE | TC-API-046, TC-API-117, TC-API-120, TC-API-127 | COVERED_WITH_BLOCKERS |

FR-07 preserves all INT-FR07 identifiers. FR-02 and FR-18 use existing case technique metadata; no interaction IDs were retroactively invented.
