# Test Coverage Matrix — Current Selected Suite

## Feature quota

| Feature | Active AI-Generated In-Scope Tests | Required | Result |
| --- | --- | --- | --- |
| FR-02 | 35 | 35 | PASS |
| FR-07 | 35 | 35 | PASS |
| FR-18 | 35 | 35 | PASS |
| TOTAL | 105 | 105 | PASS |

## Test-basis coverage

| Feature | Current TB | With Explicit Active-Test Refs | Result |
| --- | --- | --- | --- |
| FR-02 | 7 | 7 | PASS |
| FR-07 | 13 | 13 | PASS |
| FR-18 | 11 | 10 | TRACEABILITY_GAP: TB-FR18-014 |
| TOTAL | 31 | 30 | ONE DEPENDENCY TRACE GAP |

TB-FR18-014 remains active as a verified dependency, but the post-human-audit per-case TB fields do not explicitly cite it. Prompt 018 does not alter those audited fields.

## EP coverage

| Feature | Total EP | Covered | Interaction | Blocked | Deferred |
| --- | --- | --- | --- | --- | --- |
| FR-02 | 15 | 4 | 0 | 0 | 11 |
| FR-07 | 36 | 27 | 3 | 6 | 0 |
| FR-18 | 24 | 9 | 0 | 7 | 8 |
| TOTAL | 75 | 40 | 3 | 13 | 19 |

## Interaction and state coverage

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

## Classification summary

| Classification | FR-02 | FR-07 | FR-18 | Total |
| --- | --- | --- | --- | --- |
| POSITIVE | 4 | 5 | 2 | 11 |
| NEGATIVE | 0 | 0 | 8 | 8 |
| CONDITIONAL | 6 | 5 | 2 | 13 |
| EXPLORATORY | 25 | 25 | 23 | 73 |

## Readiness summary

| Readiness | FR-02 | FR-07 | FR-18 | Total |
| --- | --- | --- | --- | --- |
| READY | 4 | 5 | 10 | 19 |
| BLOCKED | 6 | 6 | 2 | 14 |
| EXPLORATORY_ONLY | 25 | 24 | 23 | 72 |

## Human-audit summary

| Human Decision / Application | FR-02 | FR-07 | FR-18 | Total |
| --- | --- | --- | --- | --- |
| VALID | 25 | 29 | 26 | 80 |
| INCOMPLETE | 10 | 6 | 9 | 25 |
| INVALID | 0 | 0 | 0 | 0 |
| NO_CHANGE / NOT_REQUIRED | 25 | 29 | 26 | 80 |
| CORRECTION APPLIED | 4 | 0 | 7 | 11 |
| CORRECTION BLOCKED | 6 | 6 | 2 | 14 |

## Technique coverage

| Technique | FR-02 | FR-07 | FR-18 | Total |
| --- | --- | --- | --- | --- |
| AUTHENTICATION | 4 | 4 | 4 | 12 |
| AUTHORIZATION | 0 | 1 | 2 | 3 |
| BUSINESS_RULE | 0 | 4 | 4 | 8 |
| DOMAIN | 10 | 8 | 7 | 25 |
| INTERACTION | 0 | 2 | 0 | 2 |
| RESOURCE | 0 | 2 | 0 | 2 |
| ROBUSTNESS | 10 | 6 | 6 | 22 |
| SCHEMA | 4 | 3 | 3 | 10 |
| SECURITY | 2 | 1 | 1 | 4 |
| SEQUENCE | 0 | 3 | 0 | 3 |
| STATE | 5 | 1 | 8 | 14 |

BVA is absent because all three feature analyses accepted zero specification-backed boundaries; it is not counted as a represented technique.

## Scope validation

| Feature | IN_SCOPE | Supporting | Cross-Feature | Out-of-Scope | Ambiguous |
| --- | --- | --- | --- | --- | --- |
| FR-02 | 35 | 0 | 0 | 0 | 0 |
| FR-07 | 35 | 0 | 0 | 0 | 0 |
| FR-18 | 35 | 0 | 0 | 0 | 0 |
| TOTAL | 105 | 0 | 0 | 0 | 0 |

## Blocker effect summary

| Feature | Active Blockers | Blocked Tests | Exploratory-Only Tests |
| --- | --- | --- | --- |
| FR-02 | 6 | 6 | 25 |
| FR-07 | 12 | 6 | 24 |
| FR-18 | 5 | 2 | 23 |
| Shared | 1 | Traceability-limiting | Traceability-limiting |
| TOTAL | 24 | 14 | 72 |

## Duplicate validation

| Test A | Test B | Relationship | Independent Value | Status |
| --- | --- | --- | --- | --- |
| TC-API-074 | TC-API-001 | Focused status contract versus broad successful login | Isolates transport status | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-075 | TC-API-001 | Focused schema contract versus broad successful login | Isolates response schema | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-076 | TC-API-001 | Focused semantic contract versus broad successful login | Isolates success semantics | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-117 | TC-API-046 | Focused list-purpose contract versus broad admin list | Isolates system-wide list semantics | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-130 | TC-API-131 | Same GET operation | Transport versus retrieve-purpose oracle | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-132 | TC-API-134 | Same POST operation | Transport versus add-purpose oracle | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-131 | TC-API-162 | GET purpose versus focused schema observation | Semantic purpose versus response-shape observation | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-134 | TC-API-163 | POST purpose versus focused response observation | Mutation purpose versus result-shape observation | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-150 | TC-API-164 | Quantity domain overlaps resource interaction | Standalone representation versus quantity/resource setup | PARTIAL_OVERLAP_ACCEPTABLE |
| TC-API-154 | TC-API-164 | Resource existence overlaps quantity/resource interaction | Existence context versus stock-linked interaction | PARTIAL_OVERLAP_ACCEPTABLE |

**Active full duplicates: 0.** Same techniques across different features are not duplicates.

## Historical exclusions

- FR-09 quota tests: 35 historical superseded cases; excluded.
- Cross-feature tests: 24 historical cases; excluded.
- Current quota contamination from historical cases: 0.

# Prompt 020 — Student Extension Coverage Addendum

## AI / student / combined counts

| Feature | AI Coverage Tests | Student Extension Tests | Combined Active Tests |
| --- | ---: | ---: | ---: |
| FR-02 | 35 | 6 | 41 |
| FR-07 | 35 | 6 | 41 |
| FR-18 | 35 | 5 | 40 |
| TOTAL | 105 | 17 | 122 |

The AI quota remains 105/105. HUMAN_ADDED tests are reported separately and do not become AI quota tests.

## Student proposal outcome

| Feature | Proposed | Accepted | Rejected | Needs Revision | Required | Result |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| FR-02 | 6 | 6 | 0 | 0 | 5 | PASS |
| FR-07 | 6 | 6 | 0 | 0 | 5 | PASS |
| FR-18 | 6 | 5 | 1 | 0 | 5 | PASS |
| TOTAL | 18 | 17 | 1 | 0 | 15 | PASS |

## Classification and readiness before / after

| Layer | POSITIVE | NEGATIVE | CONDITIONAL | EXPLORATORY | TOTAL |
| --- | ---: | ---: | ---: | ---: | ---: |
| AI coverage | 11 | 8 | 13 | 73 | 105 |
| Student extension | 0 | 0 | 0 | 17 | 17 |
| Combined coverage | 11 | 8 | 13 | 90 | 122 |

| Layer | READY | BLOCKED | EXPLORATORY_ONLY | TOTAL |
| --- | ---: | ---: | ---: | ---: |
| AI coverage | 19 | 14 | 72 | 105 |
| Student extension | 0 | 0 | 17 | 17 |
| Combined coverage | 19 | 14 | 89 | 122 |

## Primary-technique coverage before / after

| Technique | AI Coverage | Student Extension | Combined |
| --- | ---: | ---: | ---: |
| AUTHENTICATION | 12 | 0 | 12 |
| AUTHORIZATION | 3 | 0 | 3 |
| BUSINESS_RULE | 8 | 0 | 8 |
| DOMAIN | 25 | 3 | 28 |
| INTERACTION | 2 | 1 | 3 |
| RESOURCE | 2 | 0 | 2 |
| ROBUSTNESS | 22 | 7 | 29 |
| SCHEMA | 10 | 4 | 14 |
| SECURITY | 4 | 1 | 5 |
| SEQUENCE | 3 | 1 | 4 |
| STATE | 14 | 0 | 14 |
| TOTAL | 105 | 17 | 122 |

## Student traceability

| Final Test | Student Proposal | TB Refs | PARAM / DIM Refs | EP Refs | INT Refs | Blockers |
| --- | --- | --- | --- | --- | --- | --- |
| TC-API-165 | TC-PROP-FR02-01 | TB-FR02-002 | P-FR02-001 | EP-FR02-002 | NONE | BLK-FR02-001, BLK-FR02-004 |
| TC-API-166 | TC-PROP-FR02-02 | TB-FR02-003 | P-FR02-002 | EP-FR02-007 | NONE | BLK-FR02-001, BLK-FR02-004 |
| TC-API-167 | TC-PROP-FR02-03 | TB-FR02-002, TB-FR02-003 | P-FR02-001, P-FR02-002 | EP-FR02-002, EP-FR02-007 | NONE | BLK-FR02-001, BLK-FR02-004 |
| TC-API-168 | TC-PROP-FR02-04 | TB-FR02-002, TB-FR02-003 | P-FR02-001, P-FR02-002 | EP-FR02-002, EP-FR02-007 | NONE | BLK-FR02-001, BLK-FR02-004, BLK-ALL-001 |
| TC-API-169 | TC-PROP-FR02-05 | TB-FR02-002, TB-FR02-003, TB-FR02-007 | P-FR02-001, P-FR02-002 | EP-FR02-002, EP-FR02-007 | NONE | BLK-FR02-001, BLK-FR02-004 |
| TC-API-170 | TC-PROP-FR02-06 | TB-FR02-001, TB-FR02-007 | P-FR02-001, P-FR02-002 | EP-FR02-001, EP-FR02-006 | NONE | BLK-FR02-002, BLK-FR02-004, BLK-ALL-001 |
| TC-API-171 | TC-PROP-FR07-01 | TB-FR07-005, TB-FR07-009, TB-FR07-010 | PARAM-FR07-006, DIM-FR07-001 | EP-FR07-023 | INT-FR07-003 | BLK-FR07-001, BLK-FR07-003, BLK-FR07-010 |
| TC-API-172 | TC-PROP-FR07-02 | TB-FR07-005, TB-FR07-009, TB-FR07-010 | PARAM-FR07-006, DIM-FR07-001 | EP-FR07-023 | INT-FR07-003 | BLK-FR07-001, BLK-FR07-003, BLK-FR07-010 |
| TC-API-173 | TC-PROP-FR07-03 | TB-FR07-003, TB-FR07-011 | PARAM-FR07-001 | EP-FR07-032 | NONE | BLK-FR07-008, BLK-FR07-012 |
| TC-API-174 | TC-PROP-FR07-04 | TB-FR07-010, TB-FR07-012 | PARAM-FR07-002 | EP-FR07-034 | NONE | BLK-FR07-005, BLK-FR07-008 |
| TC-API-175 | TC-PROP-FR07-05 | TB-FR07-005 | DIM-FR07-001 | EP-FR07-007, EP-FR07-009 | INT-FR07-003 | BLK-FR07-001, BLK-FR07-008 |
| TC-API-176 | TC-PROP-FR07-06 | TB-FR07-005, TB-FR07-006, TB-FR07-008, TB-FR07-009, TB-FR07-010 | PARAM-FR07-003, PARAM-FR07-005, PARAM-FR07-006, DIM-FR07-001 | EP-FR07-011, EP-FR07-019, EP-FR07-023 | INT-FR07-003 | BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009, BLK-FR07-010 |
| TC-API-177 | TC-PROP-FR18-01 | TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004 | P-FR18-001 | EP-FR18-001 | NONE | BLK-FR18-005 |
| TC-API-178 | TC-PROP-FR18-02 | TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004 | P-FR18-001 | EP-FR18-001 | NONE | BLK-FR18-005 |
| TC-API-179 | TC-PROP-FR18-03 | TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004 | P-FR18-001 | EP-FR18-001 | NONE | BLK-FR18-005 |
| TC-API-180 | TC-PROP-FR18-04 | TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008, TB-FR18-009, TB-FR18-010 | P-FR18-002, P-FR18-003, P-FR18-004 | EP-FR18-005, EP-FR18-009, EP-FR18-013 | NONE | BLK-FR18-001, BLK-FR18-005 |
| TC-API-181 | TC-PROP-FR18-06 | TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008, TB-FR18-009, TB-FR18-010 | P-FR18-002, P-FR18-003, P-FR18-004 | EP-FR18-005, EP-FR18-009, EP-FR18-013 | NONE | BLK-FR18-001, BLK-FR18-005, BLK-ALL-001 |

No new TB, PARAM, DIM, EP, INT, or blocker identifier was created. Human risk subclasses use the closest broader existing partition and an explicit `HUMAN_RISK_SUBCLASS` delta.

## BVA preservation

| Feature | Student BVA Tests | Result |
| --- | ---: | --- |
| FR-02 | 0 | No boundary invented |
| FR-07 | 0 | BVA_NOT_APPLICABLE_FROM_CURRENT_SPEC preserved |
| FR-18 | 0 | No boundary invented |
| TOTAL | 0 | PASS |

## Coverage interpretation

- AI coverage is the unchanged 105-test baseline.
- Student extension coverage consists of TC-API-165–181 and origin HUMAN_ADDED.
- Combined coverage is 122 active logical tests.
- FR18-05 is rejected and contributes no coverage or final ID.
- Concrete data selection, Postman design, and execution remain deferred.

