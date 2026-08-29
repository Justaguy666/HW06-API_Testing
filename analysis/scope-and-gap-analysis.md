# Prompt 006 — Scope Compliance and Test-Design Gap Analysis

## 1. Executive Summary

| Metric | FR-02 | FR-09 | FR-18 | Total |
| --- | ---: | ---: | ---: | ---: |
| Existing cases | 13 | 32 | 28 | 73 |
| IN_SCOPE cases | 13 | 15 | 21 | 49 |
| Supporting/cross-feature cases | 0 | 17 | 7 | 24 |
| Existing quota-eligible cases | 13 | 15 | 21 | 49 |
| Minimum required | 35 | 35 | 35 | 105 |
| Additional AI cases generated | 22 | 20 | 14 | 56 |
| Final quota-eligible cases | 35 | 35 | 35 | 105 |

- FR-09 was overstated by 17 cases because Admin coupon list/CRUD belongs primarily to coupon management rather than coupon application.
- FR-18 was overstated by 7 cases because generic/user cancellation is not the Admin order-management operation.
- Exactly 56 meaningful in-scope cases were added as TC-API-074–129; no prior ID was changed.
- The expanded suite reaches 35 quota-eligible AI cases per selected feature, but many remain blocked or exploratory because the specification is incomplete.
- No BVA value, response field, security requirement, business rule, state transition, concrete datum, payload, or API result was fabricated.

## 2. Endpoint-to-Feature Scope Audit

| Endpoint / Operation | Current Feature | Specification Feature(s) | Scope Classification | Can Count Toward Selected Feature Quota? | Evidence / Reason |
| --- | --- | --- | --- | --- | --- |
| `POST /api/login` | FR-02 | Authentication §1.2; selected FR-02 login portion | IN_SCOPE | YES | The endpoint directly implements login. The specification does not define lockout behavior. |
| `POST /api/apply-coupon` | FR-09 | Coupons §5.1; selected FR-09 application portion | IN_SCOPE | YES | Directly calculates a total after discount and documents discount_amount/final_amount. |
| `GET /api/coupons` | FR-09 | Admin coupon list §5.2; coupon-management overlap | CROSS_FEATURE | NO | Admin coupon listing is management/discovery, not coupon application; retained as support. |
| `POST /api/admin/coupons` | FR-09 | Admin coupon CRUD §6.4; FR-17 overlap | CROSS_FEATURE | NO | Creates coupon resources and primarily belongs to coupon management; may prepare FR-09 state. |
| `DELETE /api/admin/coupons/:id` | FR-09 | Admin coupon CRUD §6.4; FR-17 overlap | CROSS_FEATURE | NO | Deletes coupon resources and primarily belongs to coupon management; may clean up FR-09 state. |
| `GET /api/admin/orders` | FR-18 | Admin order management §6.2 | IN_SCOPE | YES | Direct Admin operation listing orders for the entire system. |
| `PUT /api/admin/orders/:id/status` | FR-18 | Admin order management §6.2 | IN_SCOPE | YES | Direct Admin operation for order-status management. |
| `PUT /api/orders/:id/cancel` | FR-18 | User/generic order cancellation §4.6; FR-10 overlap | CROSS_FEATURE | NO | Generic cancellation and its chưa giao condition are not the Admin operations in §6.2. |

The authoritative specification uses sections and operation descriptions rather than FR identifiers. The selected FR labels therefore act only as assignment labels; endpoint inclusion is grounded in specification §§1.2, 5.1, and 6.2. CRUD setup remains useful but is not quota-eligible.

## 3. Existing Test-Case Scope Audit

| Test ID | Current Feature | Endpoint | Scope Classification | Primary Requirement | Primary Technique | Readiness | Keep? | Quota Eligible? | Reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-API-001 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-004–006 | AUTHENTICATION | READY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-002 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-002, TB-FR02-007 | AUTHENTICATION | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-003 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-004 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-005 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-006 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-003, TB-FR02-007 | AUTHENTICATION | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-007 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-008 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-009 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-010 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-001 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-011 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-001 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-012 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-001 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-013 | FR-02 | `POST /api/login` | IN_SCOPE | TB-FR02-007 | STATE | BLOCKED | KEEP | YES | Directly exercises the selected login endpoint in specification §1.2. |
| TC-API-014 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-005–007 | BUSINESS_RULE | BLOCKED | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-015 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-016 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-017 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-018 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-002 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-019 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-020 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-021 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-003 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-022 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-004 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-023 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-004 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-024 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-004 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-025 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-004 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-026 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-004 | SECURITY | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-027 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-001 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-028 | FR-09 | `POST /api/apply-coupon` | IN_SCOPE | TB-FR09-001 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises coupon application in specification §5.1. |
| TC-API-029 | FR-09 | `GET /api/coupons` | CROSS_FEATURE | TB-FR09-008–010 | AUTHORIZATION | BLOCKED | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-030 | FR-09 | `GET /api/coupons` | CROSS_FEATURE | TB-FR09-008–010 | AUTHORIZATION | EXPLORATORY_ONLY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-031 | FR-09 | `GET /api/coupons` | CROSS_FEATURE | TB-FR09-009 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-032 | FR-09 | `GET /api/coupons` | CROSS_FEATURE | TB-FR09-009 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-033 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-011–013 | BUSINESS_RULE | BLOCKED | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-034 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-012 | AUTHORIZATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-035 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-011 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-036 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-011 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-037 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-013 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-038 | FR-09 | `POST /api/admin/coupons` | CROSS_FEATURE | TB-FR09-013 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-039 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014–015 | BUSINESS_RULE | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-040 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-015 | AUTHORIZATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-041 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-042 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014 | AUTHENTICATION | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-043 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014 | DOMAIN | EXPLORATORY_ONLY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-044 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014 | DOMAIN | READY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-045 | FR-09 | `DELETE /api/admin/coupons/:id` | CROSS_FEATURE | TB-FR09-014 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP_AS_SUPPORTING | NO | Coupon list/CRUD is Admin coupon management (§5.2/§6.4), useful for support but not the selected coupon-application operation. |
| TC-API-046 | FR-18 | `GET /api/admin/orders` | IN_SCOPE | TB-FR18-001–004 | BUSINESS_RULE | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-047 | FR-18 | `GET /api/admin/orders` | IN_SCOPE | TB-FR18-004 | AUTHORIZATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-048 | FR-18 | `GET /api/admin/orders` | IN_SCOPE | TB-FR18-003 | AUTHENTICATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-049 | FR-18 | `GET /api/admin/orders` | IN_SCOPE | TB-FR18-003 | AUTHENTICATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-050 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-007–008 | STATE | BLOCKED | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-051 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-007–008 | STATE | BLOCKED | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-052 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-007–008 | STATE | BLOCKED | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-053 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-007–008 | STATE | BLOCKED | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-054 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-007–008 | STATE | BLOCKED | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-055 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-010 | AUTHORIZATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-056 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-009 | AUTHENTICATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-057 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-009 | AUTHENTICATION | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-058 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-005 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-059 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-005 | DOMAIN | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-060 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-005 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-061 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | DOMAIN | READY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-062 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-063 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-064 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | DOMAIN | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-065 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-066 | FR-18 | `PUT /api/admin/orders/:id/status` | IN_SCOPE | TB-FR18-006–008 | ROBUSTNESS | EXPLORATORY_ONLY | KEEP | YES | Directly exercises Admin order management in specification §6.2. |
| TC-API-067 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-011–012 | STATE | BLOCKED | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-068 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-013 | AUTHENTICATION | READY | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-069 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-013 | AUTHENTICATION | READY | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-070 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-012 | STATE | BLOCKED | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-071 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-011 | DOMAIN | EXPLORATORY_ONLY | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-072 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-011 | DOMAIN | READY | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |
| TC-API-073 | FR-18 | `PUT /api/orders/:id/cancel` | CROSS_FEATURE | TB-FR18-011 | ROBUSTNESS | EXPLORATORY_ONLY | RECLASSIFY | NO | User cancellation belongs to §4.6 and generic order-state behavior, not the Admin order-management operations in §6.2. |

No existing test is deleted. TC-API-029–045 are retained as cross-feature support for coupon discovery/setup/cleanup. TC-API-067–073 are reclassified to generic cancellation/state-machine coverage and remain outside the FR-18 quota.

## 4. True Per-Feature Quota Analysis

| Metric | FR-02 | FR-09 | FR-18 |
| --- | ---: | ---: | ---: |
| Existing logical cases | 13 | 32 | 28 |
| IN_SCOPE cases | 13 | 15 | 21 |
| Supporting/cross-feature cases | 0 | 17 | 7 |
| Quota-eligible cases | 13 | 15 | 21 |
| Required minimum | 35 | 35 | 35 |
| Shortfall | 22 | 20 | 14 |

The shortfall is calculated before Prompt 006 expansion and excludes every SUPPORTING/CROSS_FEATURE operation.

## 5. Technique Coverage Audit

This matrix rates the original 73-case suite after correcting scope. SECURITY is distinct from authentication/authorization, and only in-scope cases affect the feature rating.

| Technique | FR-02 | FR-09 | FR-18 | Evidence | Gap? |
| --- | --- | --- | --- | --- | --- |
| Domain partitions | STRONG | STRONG | STRONG | TC-API-002–012; 015–025; 050–066 cover the modeled input classes. | No uncovered EP remains, but many oracles are exploratory. |
| State/state-dependent behavior | BLOCKED | BLOCKED | BLOCKED | TC-API-013; TC-API-014; TC-API-050–054 are state/rule dependent. | Lockout, coupon usage/eligibility, and Admin transition rules are absent. |
| Security | WEAK | WEAK | PARTIAL | TC-API-026 and Admin access cases are security-relevant; no SEC mapping exists. | BLK-ALL-001 prevents normative SEC coverage. |
| Response schema | PARTIAL | PARTIAL | WEAK | TC-API-001 and 014 touch the two partially documented success variants; Admin schemas are absent. | Error variants, types, and Admin response shapes are unspecified. |
| Authentication | STRONG | BLOCKED | STRONG | TC-API-001–013; TC-API-026; TC-API-048–049 and 056–057. | FR-09 application authentication is unspecified. |
| Authorization | NOT_APPLICABLE | BLOCKED | STRONG | Login has no role contract; FR-09 Admin CRUD cases are cross-feature; FR-18 has TC-API-047 and 055. | FR-09 application has no authorization contract. |
| Business rules | BLOCKED | BLOCKED | PARTIAL | Lockout is absent; coupon calculation is incomplete; Admin listing is system-wide and statuses are enumerated. | Formula/eligibility and transition matrix are missing. |

Every PARTIAL, WEAK, or BLOCKED rating follows a named blocker; adding logical cases cannot turn missing specification into a deterministic oracle.

## 6. Domain/Partition Coverage Audit

| Feature | Partitions | Covered | Blocked | Exploratory Deferred | Uncovered |
| --- | ---: | ---: | ---: | ---: | ---: |
| FR-02 | 15 | 4 | 0 | 11 | 0 |
| FR-09 | 44 | 13 | 12 | 19 | 0 |
| FR-18 | 32 | 12 | 10 | 10 | 0 |
| Total | 91 | 29 | 22 | 40 | 0 |

The counts reproduce the Prompt 005 matrix. Scope correction does not erase partitions: EP-FR09-020–044 and EP-FR18-025–032 remain modeled, but their cases are cross-feature and non-quota.

Independent, non-duplicate additions are not forced one-per-partition:

| Feature | Additional opportunity classes | New Test IDs | Why independent |
| --- | --- | --- | --- |
| FR-02 | Success schema facets, body/representation robustness, normalization, lockout sequences, security disclosure | TC-API-074–095 | Adds schema, interaction, state-sequence, and security-observation objectives beyond single EP representatives. |
| FR-09 | Response-field facets, code/number semantics, identity binding, usage/eligibility, request extensibility | TC-API-096–115 | Adds distinct relations and interactions without inventing exact eligibility/formula results. |
| FR-18 | Admin list/update schemas, empty/read consistency, body robustness, same-state/conflict/persistence, precedence | TC-API-116–129 | Uses only the two in-scope Admin operations and separates Admin behavior from cancellation. |

No new BVA case is introduced because Prompt 004 found no specification-backed numeric boundary.

## 7. State Coverage Audit

| Feature | State / Condition | Existing Test IDs | Coverage | Blocker | Additional Test Opportunity? |
| --- | --- | --- | --- | --- | --- |
| FR-02 | Repeated failures and possible lock entry | TC-API-013 | BLOCKED | BLK-FR02-002 | TC-API-090–092 split sequence ordering and locked-state condition. |
| FR-02 | Unlock after time | None | BLOCKED | BLK-FR02-003 | TC-API-093 records the future time-dependent opportunity. |
| FR-02 | Token lifecycle across successful logins | TC-API-001 only as one success | BLOCKED | BLK-FR02-006 | TC-API-089 isolates repeat-login token behavior. |
| FR-09 | Eligibility state: existence/expiration/threshold | TC-API-014–015 | BLOCKED | BLK-FR09-002 | TC-API-109–113 distinguish existing-but-ineligible and relational conditions. |
| FR-09 | Per-user repeated use/persistence | None | BLOCKED | BLK-FR09-005 | TC-API-108 and TC-API-110 add same-user and cross-user application sequences. |
| FR-18 | Admin target status vocabulary | TC-API-050–054 | BLOCKED | BLK-FR18-001 | Existing cases cover values; no transition outcome is invented. |
| FR-18 | Same-state, conflicting updates, persistence | None | BLOCKED | BLK-FR18-001, BLK-FR18-004 | TC-API-125–128 add distinct Admin state interactions. |
| FR-18 cross-feature | Generic/user cancellation to canceled | TC-API-067, TC-API-070 | BLOCKED; CROSS_FEATURE | BLK-FR18-002 | Retain for FR-10/cancellation review; do not count for FR-18. |
| FR-18 cross-feature | Cancellation authentication and identifier handling | TC-API-068–073 | READY/EXPLORATORY; CROSS_FEATURE | BLK-FR18-005, BLK-FR18-006 | No additional quota case; existing cases are reclassified. |

The specification supports named status values and the Admin update operation, but not a source-to-target matrix. Therefore new state cases remain blocked where a transition oracle is required.

## 8. Security Coverage Audit

The authoritative API specification and verified test basis do not define SEC-01 through SEC-07. Consequently, assigning any existing case to one of those IDs would fabricate traceability.

| SEC Requirement | FR-02 Test IDs | FR-09 Test IDs | FR-18 Test IDs | Coverage | Missing Opportunity |
| --- | --- | --- | --- | --- | --- |
| SEC-01 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-01 text and applicability. |
| SEC-02 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-02 text and applicability. |
| SEC-03 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-03 text and applicability. |
| SEC-04 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-04 text and applicability. |
| SEC-05 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-05 text and applicability. |
| SEC-06 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-06 text and applicability. |
| SEC-07 | Not traceable: definition absent | Not traceable: definition absent | Not traceable: definition absent | BLOCKED | Obtain the normative SEC-07 text and applicability. |

Security-relevant but non-normative candidates are FR-02 TC-API-094–095; FR-09 TC-API-026, 107, 114; and FR-18 TC-API-047–049, 055–057, 129. Cross-feature Admin coupon and cancellation auth cases remain useful but do not count toward selected-feature quotas. No attack payload is designed.

## 9. Schema Validation Coverage Audit

| Feature | Endpoint | Response Status / Variant | Schema Defined? | Existing Schema Test IDs | Coverage | Gap |
| --- | --- | --- | --- | --- | --- | --- |
| FR-02 | `POST /api/login` | Success: 200 OK | PARTIAL | TC-API-001; added TC-API-074–076 | PARTIAL | Token/user are named, but full token and user schemas are absent. |
| FR-02 | `POST /api/login` | Failure variants | NO | Added TC-API-077 as observation | BLOCKED | Failure statuses and error schema absent. |
| FR-09 | `POST /api/apply-coupon` | Successful JSON response | PARTIAL | TC-API-014; added TC-API-096–100 | PARTIAL | Two fields are named; status, types, remaining shape, and formula are absent. |
| FR-09 | `POST /api/apply-coupon` | Error/eligibility variants | NO | TC-API-015–028; added observations | BLOCKED | Statuses and error bodies absent. |
| FR-18 | `GET /api/admin/orders` | Authorized list, including empty condition | NO | TC-API-046; added TC-API-116, 118 | BLOCKED | Status and collection/item schema absent. |
| FR-18 | `PUT /api/admin/orders/:id/status` | Successful update | NO | TC-API-050–054; added TC-API-121 | BLOCKED | Success status/body absent. |
| FR-18 | `PUT /api/admin/orders/:id/status` | Input/auth/error variants | NO | TC-API-055–066; added observations | BLOCKED | Exact statuses and error schemas absent. |

```text
Schema variants documented: 2 partial success variants
Schema variants currently covered: 2 partial success variants
Schema variants not covered: 0 documented variants
Schema variants blocked because specification is incomplete: 5 response families
```

The five blocked families are login failures, coupon-application errors/eligibility, Admin list, Admin update success, and Admin update input/auth errors.

## 10. Additional AI-Generated Logical Test Cases

All cases below are IN_SCOPE, quota-eligible, and marked AI_GENERATED. They contain no concrete value or payload.

### 10.1 FR-02

#### TC-API-074 — Validate the documented successful-login transport status.

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

#### TC-API-075 — Validate that successful login returns a JWT token value.

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

#### TC-API-076 — Validate that successful login returns user information.

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

#### TC-API-077 — Characterize the response contract for unsuccessful login.

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

#### TC-API-078 — Observe handling when the request body is absent.

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

#### TC-API-079 — Observe handling of an empty JSON object.

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

#### TC-API-080 — Observe handling when both documented credential fields are null-like.

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

#### TC-API-081 — Observe tolerance of an undocumented login request member.

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

#### TC-API-082 — Observe duplicate email-member handling at the representation layer.

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

#### TC-API-083 — Observe duplicate password-member handling at the representation layer.

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

#### TC-API-084 — Characterize surrounding-whitespace handling for email.

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

#### TC-API-085 — Characterize surrounding-whitespace handling for password.

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

#### TC-API-086 — Characterize email case-normalization behavior.

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

#### TC-API-087 — Characterize password case sensitivity.

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

#### TC-API-088 — Observe malformed JSON representation handling.

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

#### TC-API-089 — Characterize token behavior across repeated successful logins.

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

#### TC-API-090 — Characterize failed-attempt counter behavior after a successful login.

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

#### TC-API-091 — Characterize whether successful login resets prior failed attempts.

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

#### TC-API-092 — Characterize login behavior while an account is in a locked state.

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

#### TC-API-093 — Characterize login behavior after any lock duration elapses.

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

#### TC-API-094 — Compare failure disclosure for unknown account and wrong password classes.

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

#### TC-API-095 — Audit successful user information for unintended sensitive-field exposure.

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

### 10.2 FR-09

#### TC-API-096 — Validate presence of documented discount_amount in a successful application response.

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

#### TC-API-097 — Validate presence of documented final_amount in a successful application response.

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

#### TC-API-098 — Validate the documented successful response as JSON.

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

#### TC-API-099 — Characterize types of the documented response amount fields.

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

#### TC-API-100 — Characterize undocumented members in the coupon-application response.

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

#### TC-API-101 — Characterize coupon-code case-normalization behavior.

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

#### TC-API-102 — Characterize surrounding-whitespace handling for coupon code.

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

#### TC-API-103 — Observe handling of an empty-string coupon-code class.

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

#### TC-API-104 — Characterize a non-positive total_amount class.

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

#### TC-API-105 — Characterize a fractional total_amount representation.

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

#### TC-API-106 — Characterize a very-large-magnitude total_amount class.

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

#### TC-API-107 — Characterize user_id and authenticated-identity mismatch.

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

#### TC-API-108 — Characterize repeated application of the same coupon by the same user.

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

#### TC-API-109 — Characterize application of an expired coupon condition.

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

#### TC-API-110 — Characterize application of the same coupon across two user identities.

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

#### TC-API-111 — Characterize total_amount below a coupon's stored minimum-order relation.

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

#### TC-API-112 — Characterize total_amount equal to a coupon's stored minimum-order relation.

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

#### TC-API-113 — Characterize discount type and discount value interaction.

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

#### TC-API-114 — Characterize Authorization identity when body user_id is omitted.

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

#### TC-API-115 — Observe tolerance of an undocumented coupon-application request member.

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

### 10.3 FR-18

#### TC-API-116 — Characterize the admin order-list response schema.

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

#### TC-API-117 — Verify that Admin order listing is system-wide.

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

#### TC-API-118 — Characterize the response shape when the system has no orders.

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

#### TC-API-119 — Observe handling of an undocumented query parameter.

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

#### TC-API-120 — Characterize consistency across repeated Admin order-list reads.

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

#### TC-API-121 — Characterize the successful status-update response schema.

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

#### TC-API-122 — Observe handling when the status-update request body is absent.

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

#### TC-API-123 — Observe handling of an empty JSON object for status update.

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

#### TC-API-124 — Observe tolerance of an undocumented request member during a nominal status update.

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

#### TC-API-125 — Characterize an update whose target status equals the current status.

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

#### TC-API-126 — Characterize conflicting status updates to the same order.

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

#### TC-API-127 — Observe isolation of an Admin status update to the targeted order.

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

#### TC-API-128 — Characterize update persistence through subsequent Admin order listing.

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

#### TC-API-129 — Characterize authorization-versus-validation precedence.

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

## 11. Updated Test Inventory

| Test ID | Feature | Endpoint | Origin | Primary Technique | Readiness | Scope | Quota Eligible |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-API-001 | FR-02 | `POST /api/login` | AI_GENERATED | AUTHENTICATION | READY | IN_SCOPE | YES |
| TC-API-002 | FR-02 | `POST /api/login` | AI_GENERATED | AUTHENTICATION | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-003 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-004 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-005 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-006 | FR-02 | `POST /api/login` | AI_GENERATED | AUTHENTICATION | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-007 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-008 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-009 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-010 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-011 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-012 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-013 | FR-02 | `POST /api/login` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-014 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | BLOCKED | IN_SCOPE | YES |
| TC-API-015 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-016 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-017 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-018 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-019 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-020 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-021 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-022 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-023 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-024 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-025 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-026 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-027 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-028 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-029 | FR-09 | `GET /api/coupons` | AI_GENERATED | AUTHORIZATION | BLOCKED | CROSS_FEATURE | NO |
| TC-API-030 | FR-09 | `GET /api/coupons` | AI_GENERATED | AUTHORIZATION | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-031 | FR-09 | `GET /api/coupons` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-032 | FR-09 | `GET /api/coupons` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-033 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | BUSINESS_RULE | BLOCKED | CROSS_FEATURE | NO |
| TC-API-034 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | AUTHORIZATION | READY | CROSS_FEATURE | NO |
| TC-API-035 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-036 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-037 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-038 | FR-09 | `POST /api/admin/coupons` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-039 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | BUSINESS_RULE | READY | CROSS_FEATURE | NO |
| TC-API-040 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | AUTHORIZATION | READY | CROSS_FEATURE | NO |
| TC-API-041 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-042 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-043 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-044 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | DOMAIN | READY | CROSS_FEATURE | NO |
| TC-API-045 | FR-09 | `DELETE /api/admin/coupons/:id` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-046 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | BUSINESS_RULE | READY | IN_SCOPE | YES |
| TC-API-047 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | AUTHORIZATION | READY | IN_SCOPE | YES |
| TC-API-048 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | AUTHENTICATION | READY | IN_SCOPE | YES |
| TC-API-049 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | AUTHENTICATION | READY | IN_SCOPE | YES |
| TC-API-050 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-051 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-052 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-053 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-054 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-055 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | AUTHORIZATION | READY | IN_SCOPE | YES |
| TC-API-056 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | AUTHENTICATION | READY | IN_SCOPE | YES |
| TC-API-057 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | AUTHENTICATION | READY | IN_SCOPE | YES |
| TC-API-058 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-059 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | READY | IN_SCOPE | YES |
| TC-API-060 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-061 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | READY | IN_SCOPE | YES |
| TC-API-062 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-063 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-064 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-065 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-066 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-067 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | STATE | BLOCKED | CROSS_FEATURE | NO |
| TC-API-068 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-069 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | AUTHENTICATION | READY | CROSS_FEATURE | NO |
| TC-API-070 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | STATE | BLOCKED | CROSS_FEATURE | NO |
| TC-API-071 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-072 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | DOMAIN | READY | CROSS_FEATURE | NO |
| TC-API-073 | FR-18 | `PUT /api/orders/:id/cancel` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | CROSS_FEATURE | NO |
| TC-API-074 | FR-02 | `POST /api/login` | AI_GENERATED | SCHEMA | READY | IN_SCOPE | YES |
| TC-API-075 | FR-02 | `POST /api/login` | AI_GENERATED | SCHEMA | READY | IN_SCOPE | YES |
| TC-API-076 | FR-02 | `POST /api/login` | AI_GENERATED | SCHEMA | READY | IN_SCOPE | YES |
| TC-API-077 | FR-02 | `POST /api/login` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-078 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-079 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-080 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-081 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-082 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-083 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-084 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-085 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-086 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-087 | FR-02 | `POST /api/login` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-088 | FR-02 | `POST /api/login` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-089 | FR-02 | `POST /api/login` | AI_GENERATED | AUTHENTICATION | BLOCKED | IN_SCOPE | YES |
| TC-API-090 | FR-02 | `POST /api/login` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-091 | FR-02 | `POST /api/login` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-092 | FR-02 | `POST /api/login` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-093 | FR-02 | `POST /api/login` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-094 | FR-02 | `POST /api/login` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-095 | FR-02 | `POST /api/login` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-096 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SCHEMA | BLOCKED | IN_SCOPE | YES |
| TC-API-097 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SCHEMA | BLOCKED | IN_SCOPE | YES |
| TC-API-098 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SCHEMA | BLOCKED | IN_SCOPE | YES |
| TC-API-099 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-100 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-101 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-102 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-103 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-104 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-105 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | DOMAIN | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-106 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-107 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-108 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-109 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | BLOCKED | IN_SCOPE | YES |
| TC-API-110 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-111 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | BLOCKED | IN_SCOPE | YES |
| TC-API-112 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | BLOCKED | IN_SCOPE | YES |
| TC-API-113 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | BUSINESS_RULE | BLOCKED | IN_SCOPE | YES |
| TC-API-114 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-115 | FR-09 | `POST /api/apply-coupon` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-116 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-117 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | BUSINESS_RULE | READY | IN_SCOPE | YES |
| TC-API-118 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-119 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-120 | FR-18 | `GET /api/admin/orders` | AI_GENERATED | BUSINESS_RULE | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-121 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | SCHEMA | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-122 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-123 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-124 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | ROBUSTNESS | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-125 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-126 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-127 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | BUSINESS_RULE | EXPLORATORY_ONLY | IN_SCOPE | YES |
| TC-API-128 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | STATE | BLOCKED | IN_SCOPE | YES |
| TC-API-129 | FR-18 | `PUT /api/admin/orders/:id/status` | AI_GENERATED | SECURITY | EXPLORATORY_ONLY | IN_SCOPE | YES |

Inventory totals: 129 AI-generated logical cases, comprising 105 IN_SCOPE quota-eligible cases and 24 cross-feature/supporting cases. There are no student-authored extension cases.

## 12. Updated Coverage Summary

### Partition coverage

```text
COVERED: 29
BLOCKED: 22
DEFERRED_EXPLORATORY: 40
NOT_SELECTED: 0
TOTAL: 91
```

The expansion intentionally adds schema, state-sequence, security-observation, robustness, and interaction coverage. It does not falsely upgrade any partition whose oracle remains blocked or exploratory.

### Requirement coverage

```text
COVERED: 18
PARTIAL: 12
BLOCKED: 6
NOT_TESTABLE: 0
TOTAL: 36
```

New test IDs improve the number and separation of checks traced to existing TB items, but authoritative requirement dispositions remain unchanged because no missing rule was supplied.

### Technique coverage after expansion

| Technique | FR-02 | FR-09 | FR-18 |
| --- | --- | --- | --- |
| DOMAIN | STRONG | STRONG | STRONG |
| STATE | BLOCKED | BLOCKED | BLOCKED |
| SECURITY | WEAK | WEAK | PARTIAL |
| SCHEMA | PARTIAL | PARTIAL | WEAK |
| AUTHENTICATION | STRONG | BLOCKED | STRONG |
| AUTHORIZATION | NOT_APPLICABLE | BLOCKED | STRONG |
| BUSINESS_RULE | BLOCKED | BLOCKED | PARTIAL |

New cases close logical-design gaps but cannot close specification gaps. ROBUSTNESS was also expanded in all three features, although it is outside the required seven-line recalculation list.

### State, security, and schema status

- State: new sequence/interaction cases exist for all selected features; deterministic lockout, coupon-usage, and Admin-transition assertions remain blocked.
- Security: logical access/disclosure/identity classes exist, but all SEC-01–SEC-07 ID mappings remain blocked by BLK-ALL-001.
- Schema: the two partial documented success variants now have focused cases; five endpoint/response families remain blocked by incomplete schemas.

## 13. Quota Compliance Validation

| Feature | Original Quota-Eligible | Added AI Cases | Final Quota-Eligible | Requirement | Result |
| --- | ---: | ---: | ---: | ---: | --- |
| FR-02 | 13 | 22 | 35 | >=35 | PASS |
| FR-09 | 15 | 20 | 35 | >=35 | PASS |
| FR-18 | 21 | 14 | 35 | >=35 | PASS |

PASS means count compliance only. It does not mean every case is executable or every requirement is deterministic.

## 14. Remaining Blockers

| Blocker ID | Scope | Missing basis | Current impact |
| --- | --- | --- | --- |
| BLK-FR02-001 | FR-02 | Requiredness/validation of email/password | TC-API-002–012, 078–088 remain observational; deterministic negative oracles unavailable. |
| BLK-FR02-002 | FR-02 | Failed-attempt counter and threshold | TC-API-013, 090–093 cannot assert lockout transitions. |
| BLK-FR02-003 | FR-02 | Lock duration/unlock behavior | TC-API-092–093 cannot assert timed states. |
| BLK-FR02-004 | FR-02 | Failure statuses/error schema | FR-02 failure and robustness cases cannot assert transport/error schema. |
| BLK-FR02-005 | FR-02 | Exact user schema/sensitive fields | TC-API-076 and 095 cannot validate a complete allow/deny field set. |
| BLK-FR02-006 | FR-02 | JWT claims/lifetime/invalidation | TC-API-075 is limited to documented token representation; TC-API-089 remains blocked. |
| BLK-FR09-001 | FR-09 | Input requiredness/domains | Input-class outcomes including TC-API-101–106 and 115 remain exploratory. |
| BLK-FR09-002 | FR-09 | Coupon eligibility conditions | TC-API-014, 096–098, 109–112 cannot assert eligibility. |
| BLK-FR09-003 | FR-09 | Formula and rounding | TC-API-014, 096–099, 104–106, 111–113 cannot calculate an oracle. |
| BLK-FR09-004 | FR-09 | Authentication/user ownership | TC-API-026, 107, 114 cannot assert identity binding. |
| BLK-FR09-005 | FR-09 | Usage persistence/per-user enforcement | TC-API-108 and identity-related sequences lack state oracle. |
| BLK-FR09-006 | FR-09 | Statuses and field types | Schema/error cases remain partial or exploratory. |
| BLK-FR09-007 | FR-09 cross-feature | Role enforcement for GET /api/coupons | TC-API-029–030 remain blocked/exploratory and non-quota. |
| BLK-FR18-001 | FR-18 | Admin transition matrix | TC-API-050–054, 121, 124–128 cannot assert transition validity. |
| BLK-FR18-002 | FR-18 cross-feature | Meaning of chưa giao | TC-API-067 and 070 remain blocked and non-quota. |
| BLK-FR18-003 | FR-18 | id/status constraints | TC-API-058–064 and 122–124 retain exploratory input handling. |
| BLK-FR18-004 | FR-18 | Initial/final states and idempotence | TC-API-125–128 cannot assert state sequences. |
| BLK-FR18-005 | FR-18 | Statuses and response schemas | Admin list/update schema coverage remains observational. |
| BLK-FR18-006 | FR-18 | Exact auth failure status/schema | Authorization/authentication semantics are testable, exact failure contracts are not. |
| BLK-ALL-001 | All | SEC-01–SEC-07 definitions/mappings | No case can be normatively traced to SEC IDs; security audit remains blocked. |

All Prompt 002 blocker IDs are preserved. None is resolved through a common e-commerce assumption.

## 15. Human Review Checklist

- [ ] Every existing test was checked for feature scope.
- [ ] FR-17 coupon-management behavior was not silently counted as FR-09.
- [ ] FR-10 order-state behavior was not silently counted as FR-18.
- [ ] Supporting/setup operations were distinguished from selected-feature tests.
- [ ] Each selected feature has at least 35 quota-eligible AI-generated cases.
- [ ] New cases add real coverage and are not filler.
- [ ] No unsupported expected result was invented.
- [ ] Blocked tests remain blocked.
- [ ] Exploratory tests retain observation goals.
- [ ] SEC-01–SEC-07 coverage was explicitly audited.
- [ ] Response-schema coverage was explicitly audited.
- [ ] No concrete data was generated.
- [ ] No attack payload was generated.
- [ ] No student-authored extension cases were generated.

## 16. Student Review Required

- Confirm with the instructor whether the quota is graded per feature or per single endpoint; this artifact uses the stricter in-scope feature interpretation.
- Confirm that §5.2/§6.4 coupon management is FR-17 and must remain outside FR-09 quota.
- Confirm that §4.6 user/generic cancellation is FR-10 or another non-FR-18 requirement and must remain outside FR-18 quota.
- Obtain the authoritative SEC-01–SEC-07 definitions before approving security traceability.
- Decide whether duplicate-member, normalization, large-magnitude, and precedence observations are acceptable logical-test granularity for the course.
- Review whether the abstract minimum-order relation cases are acceptable despite absent application semantics; retain BLOCKED status unless clarified.
- Approve the 56 additions before creating the separate minimum-five student-authored extension.
- Obtain missing response contracts and state/business rules before converting BLOCKED/EXPLORATORY_ONLY cases into executable assertions.

## 17. Machine-Usable Summary

```text
PROMPT_006_SUMMARY

FR-02:
IN_SCOPE endpoints: POST /api/login
Quota-eligible AI test IDs: TC-API-001–TC-API-013, TC-API-074–TC-API-095
Count: 35
Technique gaps: STATE BLOCKED; SECURITY WEAK; SCHEMA PARTIAL; BUSINESS_RULE BLOCKED
Relevant blockers: BLK-FR02-001–BLK-FR02-006, BLK-ALL-001

FR-09:
IN_SCOPE endpoints: POST /api/apply-coupon
Quota-eligible AI test IDs: TC-API-014–TC-API-028, TC-API-096–TC-API-115
Count: 35
Technique gaps: STATE BLOCKED; SECURITY WEAK; SCHEMA PARTIAL; AUTHENTICATION BLOCKED; AUTHORIZATION BLOCKED; BUSINESS_RULE BLOCKED
Relevant blockers: BLK-FR09-001–BLK-FR09-006, BLK-ALL-001

FR-18:
IN_SCOPE endpoints: GET /api/admin/orders; PUT /api/admin/orders/:id/status
Quota-eligible AI test IDs: TC-API-046–TC-API-066, TC-API-116–TC-API-129
Count: 35
Technique gaps: STATE BLOCKED; SECURITY PARTIAL; SCHEMA WEAK; BUSINESS_RULE PARTIAL
Relevant blockers: BLK-FR18-001, BLK-FR18-003–BLK-FR18-006, BLK-ALL-001

Cross-feature/supporting test IDs: TC-API-029–TC-API-045, TC-API-067–TC-API-073

New AI-generated test IDs: TC-API-074–TC-API-129

Human review required: Confirm feature boundaries and SEC definitions; approve abstract exploratory classes; supply missing state, business, and schema rules before execution.
```
