# Prompt 020 — Student Extension Integration Summary

## 1. Student Proposal Baseline

The student supplied 18 proposals before Codex integration: six each for FR-02, FR-07, and FR-18. All entered validation as `STUDENT_AUTHORED_CANDIDATE`.

## 2. Validation Rules

Scope, specification support, independent value, atomicity, duplicate risk, blocker discipline, and authorship provenance were validated. Extreme representations were treated as robustness classes rather than BVA, and unspecified outcomes remained observational.

## 3. Proposal-by-Proposal Result

| Proposal | Closest AI Test(s) | Relationship | Independent Coverage Delta | Decision |
| --- | --- | --- | --- | --- |
| TC-PROP-FR02-01 | TC-API-003–005, TC-API-084 | PARTIAL_OVERLAP | Isolates an extreme-length string subclass without treating length as a boundary. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR02-02 | TC-API-009, TC-API-085, TC-API-087 | PARTIAL_OVERLAP | Isolates an extreme-length password-string subclass without inferring a password boundary. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR02-03 | TC-API-005, TC-API-009, TC-API-084–087 | PARTIAL_OVERLAP | Adds a Unicode/non-ASCII representation subclass; execution varies one credential field at a time. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR02-04 | TC-API-005, TC-API-009, TC-API-088, TC-API-094 | PARTIAL_OVERLAP | Adds character-class security observation without defining an exploit payload. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR02-05 | TC-API-002, TC-API-006 | PARTIAL_OVERLAP | Semantic role reversal is a two-field interaction, distinct from a generic non-matching credential pair. | ACCEPT |
| TC-PROP-FR02-06 | TC-API-013, TC-API-077, TC-API-089–093 | PARTIAL_OVERLAP | Focuses on interface-visible request-pacing signals rather than account lockout state. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR07-01 | TC-API-150 | PARTIAL_OVERLAP | Isolates the sign-related human-risk subclass within the broad number-shaped quantity EP. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR07-02 | TC-API-150 | PARTIAL_OVERLAP | Isolates the fractional-representation human-risk subclass within the broad number-shaped quantity EP. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR07-03 | TC-API-162 | PARTIAL_OVERLAP | Separates response media type from TC-API-162's broader response-contract characterization. | ACCEPT |
| TC-PROP-FR07-04 | TC-API-163 | PARTIAL_OVERLAP | Separates response media type from TC-API-163's broader response/mutation-result characterization. | ACCEPT |
| TC-PROP-FR07-05 | TC-API-133, TC-API-140 | PARTIAL_OVERLAP | Isolates a structured JSON array top level, distinct from the documented object and a non-JSON/malformed representation. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR07-06 | TC-API-141, TC-API-147, TC-API-150 | PARTIAL_OVERLAP | Isolates magnitude risk within existing broad number-shaped member EPs; one member is varied per execution. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR18-01 | TC-API-119 | PARTIAL_OVERLAP | Targets one structured semantic query family per execution rather than an arbitrary undocumented query member. | ACCEPT_WITH_METADATA_NORMALIZATION |
| TC-PROP-FR18-02 | TC-API-120 | PARTIAL_OVERLAP | TC-API-120 compares collections without independently evaluating element ordering. | ACCEPT |
| TC-PROP-FR18-03 | TC-API-116 | PARTIAL_OVERLAP | Creates a focused media-type oracle separate from TC-API-116's broad response-schema characterization. | ACCEPT |
| TC-PROP-FR18-04 | TC-API-121 | PARTIAL_OVERLAP | Creates a focused media-type oracle separate from TC-API-121's broad update-response characterization. | ACCEPT |
| TC-PROP-FR18-05 | TC-API-058, TC-API-060 | DUPLICATE | NONE — the specification defines no identifier shape, and TC-API-060 already covers the undocumented format/type region. | REJECT_NO_INDEPENDENT_VALUE |
| TC-PROP-FR18-06 | TC-API-121 | PARTIAL_OVERLAP | Restricts the observation to traceability-oriented metadata visible in the existing response interface, distinct from generic body-schema inventory. | ACCEPT_WITH_METADATA_NORMALIZATION |

## 4. Duplicate Audit

Seventeen proposals retain an explicit independent delta despite partial overlap. TC-PROP-FR18-05 is a full objective duplicate of TC-API-060 under the available identifier basis and is rejected.

Active full duplicates introduced: 0.

## 5. Historical AI-Candidate Overlap

| Student Proposal | Historical AI Candidate | Overlap | Student-Specific Delta | Provenance Impact |
| --- | --- | --- | --- | --- |
| TC-PROP-FR02-01 | NONE | NONE | No substantive historical AI-candidate match. | NO_CONFLICT |
| TC-PROP-FR02-02 | NONE | NONE | No substantive historical AI-candidate match. | NO_CONFLICT |
| TC-PROP-FR02-03 | STUDENT-FR02-07 | PARTIAL thematic overlap with credential-representation analysis | Student proposal isolates Unicode representation rather than cross-request returned-identity consistency. | DISCLOSED |
| TC-PROP-FR02-04 | NONE | NONE | No substantive historical AI-candidate objective matches character-class handling. | NO_CONFLICT |
| TC-PROP-FR02-05 | STUDENT-FR02-07 | LOW thematic overlap with credential-representation interaction | Student proposal targets positional role reversal, not normalization-to-returned-identity consistency. | DISCLOSED |
| TC-PROP-FR02-06 | STUDENT-FR02-02 | PARTIAL overlap with repeated-request failure-contract observation | Student proposal separates endpoint-level rate-control signals from account-state evolution. | DISCLOSED |
| TC-PROP-FR18-01 | NONE | NONE | No historical FR-18 candidate targets structured query families. | NO_CONFLICT |
| TC-PROP-FR18-02 | STUDENT-FR18-06 | LOW thematic overlap with cross-request consistency | Student proposal isolates ordering across non-mutating reads; historical candidate coordinates a read with mutation. | DISCLOSED |
| TC-PROP-FR18-03 | STUDENT-FR18-07 | PARTIAL schema-theme overlap | Student proposal isolates response media type; historical candidate correlates resource identity across path/response/list. | DISCLOSED |
| TC-PROP-FR18-04 | STUDENT-FR18-07 | PARTIAL schema-theme overlap | Student proposal isolates media type; historical candidate correlates resource identity. | DISCLOSED |
| TC-PROP-FR18-05 | STUDENT-FR18-07 | LOW path-identity theme overlap | No student-specific independent delta survives current-suite comparison. | DISCLOSED |
| TC-PROP-FR18-06 | STUDENT-FR18-07 | PARTIAL response-schema theme overlap | Student proposal applies an in-scope security/traceability perspective rather than path-to-resource identity correlation. | DISCLOSED |

FR-07 has no historical extension candidates. All overlaps are disclosed; none changes the student proposals' recorded origin.

## 6. Accepted Test Mapping

| Proposal ID | Validation Result | Final TC-API ID |
| --- | --- | --- |
| TC-PROP-FR02-01 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-165 |
| TC-PROP-FR02-02 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-166 |
| TC-PROP-FR02-03 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-167 |
| TC-PROP-FR02-04 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-168 |
| TC-PROP-FR02-05 | ACCEPT | TC-API-169 |
| TC-PROP-FR02-06 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-170 |
| TC-PROP-FR07-01 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-171 |
| TC-PROP-FR07-02 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-172 |
| TC-PROP-FR07-03 | ACCEPT | TC-API-173 |
| TC-PROP-FR07-04 | ACCEPT | TC-API-174 |
| TC-PROP-FR07-05 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-175 |
| TC-PROP-FR07-06 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-176 |
| TC-PROP-FR18-01 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-177 |
| TC-PROP-FR18-02 | ACCEPT | TC-API-178 |
| TC-PROP-FR18-03 | ACCEPT | TC-API-179 |
| TC-PROP-FR18-04 | ACCEPT | TC-API-180 |
| TC-PROP-FR18-05 | REJECT_NO_INDEPENDENT_VALUE | NONE |
| TC-PROP-FR18-06 | ACCEPT_WITH_METADATA_NORMALIZATION | TC-API-181 |

Accepted ID range: `TC-API-165–181`, continuous across accepted proposals only.

## 7. Rejected / Revision-Required Proposals

| Proposal | Outcome | Reason | Final ID |
| --- | --- | --- | --- |
| TC-PROP-FR18-05 | REJECT_NO_INDEPENDENT_VALUE | No documented identifier shape distinguishes it from TC-API-060's undocumented format/type region. | NONE |

Needs student revision: NONE. Replacement tests generated: 0.

## 8. Traceability

| Final Test | Proposal | TB Refs | PARAM / DIM Refs | EP Refs | INT Refs | Blockers |
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

No new traceability identifier was fabricated.

## 9. Per-Feature Extension Quota

| Feature | Proposed | Accepted HUMAN_ADDED | Required | Result |
| --- | ---: | ---: | ---: | --- |
| FR-02 | 6 | 6 | 5 | PASS |
| FR-07 | 6 | 6 | 5 | PASS |
| FR-18 | 6 | 5 | 5 | PASS |
| TOTAL | 18 | 17 | 15 | PASS |

## 10. Final Suite Counts

| Origin | FR-02 | FR-07 | FR-18 | Total |
| --- | ---: | ---: | ---: | ---: |
| AI_GENERATED | 35 | 35 | 35 | 105 |
| HUMAN_ADDED | 6 | 6 | 5 | 17 |
| ACTIVE LOGICAL SUITE | 41 | 41 | 40 | 122 |

## 11. Authorship Preservation

Each accepted case records its Student Proposal ID, origin `HUMAN_ADDED`, and source `STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION`. No proposal was relabeled AI-generated or AI-assisted, and no replacement idea was created.

## 12. Next Phase Readiness

All three features meet the minimum of five accepted HUMAN_ADDED tests. No unresolved provenance conflict remains.

```text
READY_FOR_CONCRETE_TEST_DATA_DESIGN
```

