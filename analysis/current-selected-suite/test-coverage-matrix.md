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
