# FR-07 Initial Coverage Matrix — Finalized by Prompt 016

```text
FR-07 PRE-HUMAN-AUDIT SUITE:
FINALIZED BY PROMPT 016

FR-07 STUDENT HUMAN REVIEW:
COMPLETE

FR-07 HUMAN-AUDIT NORMALIZATION:
CORRECTIONS APPLIED
```

This artifact is the coverage-focused companion to `analysis/fr07-initial-test-case-design.md`. It includes the retained Prompt 015 suite plus TC-API-164 and records the applied Prompt 017 human-audit decisions.

## Coverage Baseline

- Testcase range: `TC-API-130`–`TC-API-164`
- Generated / quota eligible: 35 / 35
- FR-07 quota: 35 / 35 — PASS
- EPs: 36 total; 27 covered, 3 covered via interaction, 6 blocked
- Interactions: 11 total; 6 covered, 1 partial, 4 blocked
- TB items: 13 total; 0 unaccounted
- FR-07 blockers: 12 total; 0 unaccounted
- BVA testcases: 0

## 5. EP Coverage Matrix

| EP-ID | Classification | Execution | Test IDs | Coverage |
| --- | --- | --- | --- | --- |
| EP-FR07-001 | VALID | READY | TC-API-130, TC-API-131 | COVERED |
| EP-FR07-002 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-135 | COVERED |
| EP-FR07-003 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-136 | COVERED |
| EP-FR07-004 | VALID | READY | TC-API-132, TC-API-133, TC-API-134 | COVERED |
| EP-FR07-005 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-137 | COVERED |
| EP-FR07-006 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-138 | COVERED |
| EP-FR07-007 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-008 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-139 | COVERED |
| EP-FR07-009 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-140 | COVERED |
| EP-FR07-010 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-011 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-141 | COVERED |
| EP-FR07-012 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-142 | COVERED |
| EP-FR07-013 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-143 | COVERED |
| EP-FR07-014 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-015 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-144 | COVERED |
| EP-FR07-016 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-145 | COVERED |
| EP-FR07-017 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-146 | COVERED |
| EP-FR07-018 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-019 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-147, TC-API-153 | COVERED |
| EP-FR07-020 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-148 | COVERED |
| EP-FR07-021 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-149 | COVERED |
| EP-FR07-022 | VALID | READY | TC-API-133 | COVERED |
| EP-FR07-023 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-150, TC-API-153, TC-API-164 | COVERED |
| EP-FR07-024 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-151 | COVERED |
| EP-FR07-025 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-152 | COVERED |
| EP-FR07-026 | CONDITIONAL | BLOCKED | TC-API-154, TC-API-164 | BLOCKED |
| EP-FR07-027 | CONDITIONAL | BLOCKED | TC-API-155 | BLOCKED |
| EP-FR07-028 | CONDITIONAL | BLOCKED | TC-API-156 | BLOCKED |
| EP-FR07-029 | EXPLORATORY | BLOCKED | TC-API-157 | BLOCKED |
| EP-FR07-030 | CONDITIONAL | BLOCKED | TC-API-158 | BLOCKED |
| EP-FR07-031 | EXPLORATORY | BLOCKED | TC-API-158 | BLOCKED |
| EP-FR07-032 | VALID | READY | TC-API-130, TC-API-131, TC-API-159, TC-API-162 | COVERED |
| EP-FR07-033 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-159 | COVERED_VIA_INTERACTION |
| EP-FR07-034 | VALID | READY | TC-API-132, TC-API-133, TC-API-134, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | COVERED |
| EP-FR07-035 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-160 | COVERED_VIA_INTERACTION |
| EP-FR07-036 | EXPLORATORY | EXPLORATORY_ONLY | TC-API-161 | COVERED_VIA_INTERACTION |

Coverage totals: 27 `COVERED`, 3 `COVERED_VIA_INTERACTION`, 6 `BLOCKED`, 0 `DEFERRED_EXPLORATORY`, and 0 `NOT_MEANINGFUL_STANDALONE`.

## 6. Interaction Coverage Matrix

| INT-ID | Test IDs | Coverage Status | Reason |
| --- | --- | --- | --- |
| INT-FR07-001 | TC-API-130, TC-API-131, TC-API-135, TC-API-136 | COVERED | GET authentication classes are isolated against the GET operation. |
| INT-FR07-002 | TC-API-132, TC-API-134, TC-API-137, TC-API-138 | COVERED | POST authentication classes are isolated against the add operation. |
| INT-FR07-003 | TC-API-133, TC-API-139–TC-API-152 | COVERED | Body representation and each documented member class receive focused coverage. |
| INT-FR07-004 | TC-API-154, TC-API-155 | BLOCKED | Cases exist, but body-id-to-resource setup cannot be established from the specification. |
| INT-FR07-005 | TC-API-164 | BLOCKED | A dedicated case now represents the interaction, but quantity-to-product/stock setup and behavior remain unspecified. |
| INT-FR07-006 | TC-API-153 | COVERED | Focused observational price × quantity interaction. |
| INT-FR07-007 | TC-API-156, TC-API-157 | BLOCKED | Ownership context requires unavailable token-to-Cart rules/setup. |
| INT-FR07-008 | TC-API-158 | BLOCKED | First/later lifecycle context cannot be reproduced authoritatively. |
| INT-FR07-009 | TC-API-160 | COVERED | Repeated add isolates identifier/quantity sequence semantics. |
| INT-FR07-010 | TC-API-161 | COVERED | Add-to-retrieve sequence isolates visibility/persistence uncertainty. |
| INT-FR07-011 | TC-API-159 | PARTIAL | Repeated GET is executable, but ownership/context semantics remain unavailable. |

Interaction totals: 6 `COVERED`, 1 `PARTIAL`, 0 `DEFERRED`, and 4 `BLOCKED`.

## 7. Test-Basis Coverage Matrix

| TB-ID | Test IDs | Coverage Status | Oracle Strength |
| --- | --- | --- | --- |
| TB-FR07-001 | TC-API-130, TC-API-135, TC-API-136, TC-API-156 | COVERED | PARTIAL |
| TB-FR07-002 | TC-API-130, TC-API-131, TC-API-159, TC-API-162 | COVERED | DETERMINISTIC |
| TB-FR07-003 | TC-API-131, TC-API-156–TC-API-159, TC-API-161, TC-API-162 | PARTIAL | PARTIAL |
| TB-FR07-004 | TC-API-132, TC-API-134, TC-API-160, TC-API-161, TC-API-163 | COVERED | DETERMINISTIC |
| TB-FR07-005 | TC-API-133, TC-API-139–TC-API-152 | COVERED | PARTIAL |
| TB-FR07-006 | TC-API-133, TC-API-141–TC-API-143, TC-API-154, TC-API-155, TC-API-164 | COVERED | PARTIAL |
| TB-FR07-007 | TC-API-133, TC-API-144–TC-API-146 | COVERED | PARTIAL |
| TB-FR07-008 | TC-API-133, TC-API-147–TC-API-149, TC-API-153 | COVERED | PARTIAL |
| TB-FR07-009 | TC-API-133, TC-API-150–TC-API-153, TC-API-164 | COVERED | PARTIAL |
| TB-FR07-010 | TC-API-134, TC-API-153–TC-API-161, TC-API-163, TC-API-164 | PARTIAL | PARTIAL |
| TB-FR07-011 | TC-API-162 | BLOCKED | NONE |
| TB-FR07-012 | TC-API-163 | BLOCKED | NONE |
| TB-FR07-013 | TC-API-132, TC-API-137, TC-API-138 | COVERED | PARTIAL |

`Unaccounted TB = 0`. TB-FR07-011 and TB-FR07-012 are response-contract gaps; their observation cases cannot create a deterministic schema oracle.

## 8. Blocker Coverage Matrix

| Blocker | Affected Tests | Effect |
| --- | --- | --- |
| BLK-FR07-001 | TC-API-133, TC-API-139–TC-API-152 | LIMITS_SCHEMA_ORACLE |
| BLK-FR07-002 | TC-API-141–TC-API-149, TC-API-154, TC-API-155, TC-API-164 | LIMITS_SEMANTIC_ORACLE |
| BLK-FR07-003 | TC-API-150–TC-API-153, TC-API-164 | EXPLORATORY_ONLY |
| BLK-FR07-004 | TC-API-156, TC-API-157 | LIMITS_SECURITY_ORACLE |
| BLK-FR07-005 | TC-API-134, TC-API-154, TC-API-155, TC-API-160, TC-API-161, TC-API-163, TC-API-164 | LIMITS_STATE_ORACLE |
| BLK-FR07-006 | TC-API-160 | LIMITS_STATE_ORACLE |
| BLK-FR07-007 | TC-API-131, TC-API-156, TC-API-158, TC-API-161 | BLOCKS_SETUP |
| BLK-FR07-008 | TC-API-130–TC-API-163 | LIMITS_TRANSPORT_ORACLE; LIMITS_SCHEMA_ORACLE |
| BLK-FR07-009 | TC-API-147–TC-API-153 | LIMITS_SEMANTIC_ORACLE |
| BLK-FR07-010 | TC-API-141, TC-API-150, TC-API-154, TC-API-155, TC-API-164 | BLOCKS_SETUP |
| BLK-FR07-011 | TC-API-130–TC-API-138 | LIMITS_SECURITY_ORACLE |
| BLK-FR07-012 | TC-API-159, TC-API-161 | LIMITS_STATE_ORACLE |

Shared BLK-ALL-001 is referenced only by TC-API-157 and remains separate from the 12 FR-07-specific blockers.

## 9. Duplicate Audit

| Test A | Test B | Overlap | Independent Value | Decision |
| --- | --- | --- | --- | --- |
| TC-API-130 | TC-API-131 | Same GET operation | Transport method/path versus resource-purpose/semantic observation | KEEP_BOTH |
| TC-API-131 | TC-API-162 | Same nominal GET context | Retrieve-purpose contract versus isolated response/schema characterization | KEEP_BOTH |
| TC-API-132 | TC-API-134 | Same POST operation | Transport method/path versus add-purpose semantics | KEEP_BOTH |
| TC-API-133 | TC-API-134 | Same nominal POST context | Request shape versus operation semantic purpose | KEEP_BOTH |
| TC-API-134 | TC-API-163 | Same nominal POST context | Add-purpose contract versus isolated response/mutation-result characterization | KEEP_BOTH |
| TC-API-135 | TC-API-136 | GET authentication abnormality | Missing context versus present non-conforming representation | KEEP_BOTH |
| TC-API-137 | TC-API-138 | POST authentication abnormality | Missing context versus present non-conforming representation | KEEP_BOTH |
| TC-API-139 | TC-API-140 | Body representation abnormality | Absent body versus present non-JSON-shaped body | KEEP_BOTH |
| TC-API-142, TC-API-145, TC-API-148, TC-API-151 | Each other | Omitted body member | Different documented member and blocker/oracle semantics | KEEP_BOTH |
| TC-API-141, TC-API-144, TC-API-147, TC-API-150 | Each other | Alternate example-shaped value | Identifier, name, price, and quantity have distinct semantic gaps | KEEP_BOTH |
| TC-API-154 | TC-API-155 | Resource existence dependency | Existing versus non-existing resource contexts | KEEP_BOTH |
| TC-API-156 | TC-API-157 | Ownership context | Same-context association versus cross-context isolation | KEEP_BOTH |
| TC-API-159 | TC-API-160 | Repeated operation | Repeated retrieval versus repeated add | KEEP_BOTH |
| TC-API-160 | TC-API-161 | Mutation sequence | Repeated add versus add-then-retrieve | KEEP_BOTH |

Known redundant duplicates retained: **0**.

## 10. Technique Coverage

| Technique | Test Count | Test IDs |
| --- | ---: | --- |
| BUSINESS_RULE | 4 | TC-API-130, TC-API-131, TC-API-132, TC-API-134 |
| SCHEMA | 3 | TC-API-133, TC-API-162, TC-API-163 |
| AUTHENTICATION | 4 | TC-API-135–TC-API-138 |
| ROBUSTNESS | 6 | TC-API-139, TC-API-140, TC-API-143, TC-API-146, TC-API-149, TC-API-152 |
| DOMAIN | 8 | TC-API-141, TC-API-142, TC-API-144, TC-API-145, TC-API-147, TC-API-148, TC-API-150, TC-API-151 |
| INTERACTION | 2 | TC-API-153, TC-API-164 |
| RESOURCE | 2 | TC-API-154, TC-API-155 |
| AUTHORIZATION | 1 | TC-API-156 |
| SECURITY | 1 | TC-API-157 |
| STATE | 1 | TC-API-158 |
| SEQUENCE | 3 | TC-API-159–TC-API-161 |
| BVA | 0 | N/A |
| TOTAL | 35 | TC-API-130–TC-API-164 |

## 11. Classification Summary

| Classification | Count |
| --- | ---: |
| POSITIVE | 5 |
| NEGATIVE | 0 |
| CONDITIONAL | 5 |
| EXPLORATORY | 25 |
| TOTAL | 35 |

No deterministic NEGATIVE case is fabricated from the zero INVALID EP count.

## 12. Readiness Summary

| Readiness | Count |
| --- | ---: |
| READY | 5 |
| BLOCKED | 6 |
| EXPLORATORY_ONLY | 24 |
| TOTAL | 35 |

## 13. Scope Summary

| Scope | Count |
| --- | ---: |
| IN_SCOPE | 35 |
| SUPPORTING | 0 |
| CROSS_FEATURE | 0 |
| OUT_OF_SCOPE | 0 |
| AMBIGUOUS | 0 |
| TOTAL | 35 |

## 14. Quota Evaluation

```text
FR-07 quota-eligible AI tests:
35 / 35

Result:
PASS
```

All 35 cases are IN_SCOPE, AI_GENERATED, and directly test FR-07 behavior. Readiness does not change origin/scope quota eligibility. TC-API-164 was accepted for new interaction coverage, not as a superficial value variant.

## 15. Prompt 016 Gap-Closure Result

| GAP-ID | Final Treatment | Test Addition | Remaining Constraint |
| --- | --- | --- | --- |
| GAP-FR07-001 | Quota closed through the accepted interaction candidate | TC-API-164 | None for quota; quality constraints remain |
| GAP-FR07-002 | Dedicated quantity × referenced-resource interaction added | TC-API-164 | Interaction remains BLOCKED by product/stock specification gaps |
| GAP-FR07-003 | No new case; TC-API-159 and TC-API-157 already isolate repetition and cross-context concerns | None | INT-FR07-011 remains PARTIAL due ownership rules |
| GAP-FR07-004 | Keep as blocked gap; existing blocked cases are adequate representations | None | BLK-FR07-002/004/007/010 unresolved |
| GAP-FR07-005 | No new case; TC-API-162/163 already provide the only defensible observation-only isolation | None | Deterministic response/schema contract absent |
| GAP-FR07-006 | Keep as blocked global gap | None | SEC-01–SEC-07 unavailable via BLK-ALL-001 |

No further testcase ID is reserved or pre-generated after TC-API-164.

## 16. Prompt 017 Human-Audit Coverage

This section is authoritative for the active FR-07 testcase disposition after student review. Human correction `COMPLETE` refines or records the missing execution dependency; it does not create a specification rule or make a blocked case executable.

### 16.1 Active testcase disposition

| Testcase Disposition | Count | Test IDs |
| --- | ---: | --- |
| COVERED | 5 | TC-API-130–TC-API-134 |
| BLOCKED | 6 | TC-API-154–TC-API-158, TC-API-164 |
| DEFERRED_EXPLORATORY | 24 | TC-API-135–TC-API-153, TC-API-159–TC-API-163 |
| REMOVED_AFTER_HUMAN_AUDIT | 0 | NONE |
| **TOTAL** | **35** | TC-API-130–TC-API-164 |

### 16.2 Human decisions and correction application

| Audit Item | Count | Test IDs / Result |
| --- | ---: | --- |
| VALID | 29 | All except TC-API-154–TC-API-158 and TC-API-164 |
| INVALID | 0 | NONE |
| INCOMPLETE | 6 | TC-API-154–TC-API-158, TC-API-164 |
| NO_CHANGE / NOT_REQUIRED | 29 | Retained without design correction |
| COMPLETE / BLOCKED | 6 | Missing setup made explicit; readiness remains BLOCKED |
| Removed | 0 | NONE |

### 16.3 COMPLETE decisions that remain blocked

| Test ID | Missing execution dependency | Coverage effect |
| --- | --- | --- |
| TC-API-154 | Authoritative body-`id` resource mapping and reproducible existing-resource fixture | Retains blocked resource-existence coverage |
| TC-API-155 | Authoritative body-`id` resource mapping and reproducible non-existing-resource fixture | Retains blocked missing-resource coverage |
| TC-API-156 | Authoritative token-to-Cart mapping and same-context Cart-state fixture | Retains blocked ownership coverage |
| TC-API-157 | Two auth contexts, ownership/access rule, and allowed disclosure comparison basis | Retains blocked cross-context security coverage |
| TC-API-158 | First/later definitions and reproducible creation/reset/lifetime/persistence setup | Retains blocked lifecycle coverage |
| TC-API-164 | Resource linkage, availability/stock state, and selected number-shaped quantity class | Retains blocked INT-FR07-005 interaction coverage |

### 16.4 Coverage and quota after audit

| Coverage Family | Total | Accounted | Result |
| --- | ---: | ---: | --- |
| EP | 36 | 36 | PASS |
| Interaction | 11 | 11 | PASS |
| TB | 13 | 13 | PASS |
| FR-07 blocker | 12 | 12 | PASS |
| BVA testcase | 0 | 0 | NOT_APPLICABLE |

| Feature | Before Human Audit | Active After Human Audit | Minimum Required | Result |
| --- | ---: | ---: | ---: | --- |
| FR-07 | 35 | 35 | 35 | PASS |

No EP, interaction, TB item, blocker, or testcase is removed. Classification and readiness totals remain 5 POSITIVE, 0 NEGATIVE, 5 CONDITIONAL, 25 EXPLORATORY; 5 READY, 6 BLOCKED, and 24 EXPLORATORY_ONLY.

## Coverage Integrity

- Every testcase is `AI_GENERATED`, `IN_SCOPE`, and quota eligible.
- TC-API-164 adds independent INT-FR07-005 representation but remains blocked by the specification.
- No supporting, cross-feature, out-of-scope, or ambiguous case is counted.
- Blocked/observational cases do not receive invented deterministic oracles.
- No FR-08, FR-09, implementation, execution, concrete payload, or BVA case is included.
- Student human review is complete; all 35 decisions and corrections are recorded in the normalized design suite.
- The six `COMPLETE` corrections remain BLOCKED because the authoritative setup/rules are absent.
