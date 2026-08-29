# Setup-to-Postman Traceability Matrix

| SETUP-ID | Postman Request / Folder | Produced Variables | Consumer Tests | Status |
| --- | --- | --- | --- | --- |
| SETUP-001 | Collection-level pre-request guard | base_url, student_id, run_id, generated benign values | All executable tests | MANUAL_PRECONDITION |
| SETUP-002 | 00 - Setup / FR-02 Setup / [SETUP-002] Register Primary User | user_email, user_password | FR-02 matching-account tests; Cart identity base | IMPLEMENTED |
| SETUP-003 | 00 - Setup / FR-02 Setup / [SETUP-003] Login Primary User | user_token | Authenticated FR-07 tests | IMPLEMENTED |
| SETUP-004 | 00 - Setup / FR-07 Setup and FR-18 Setup / [SETUP-004] requests | user_b_token, wrong_role_token | Cross-user Cart and wrong-role Admin tests | IMPLEMENTED |
| SETUP-005 | 00 - Setup / FR-18 Setup / [SETUP-005] Login Admin | admin_token | Protected FR-18 tests | MANUAL_CREDENTIAL_PRECONDITION |
| SETUP-006 | 00 - Setup / FR-07 Setup / [SETUP-006] Product requests | existing_product_id, name, price | Resource-bound FR-07 tests | IMPLEMENTED |
| SETUP-007 | 00 - Setup / FR-07 Setup / [SETUP-007] Verify Missing Product Candidate | missing_product_id after evidence | TC-API-155 | IMPLEMENTED |
| SETUP-008 | 00 - Setup primary/secondary registration and login sequence | fresh user token/context | TC-API-156–161 | COMPOSED_FROM_IMPLEMENTED_SETUP |
| SETUP-009 | 00 - Setup / FR-18 Setup / [SETUP-009] Add Product to Secondary Cart → Checkout Secondary Order Fixture → Discover Existing Orders | existing_order_id, current_order_status | Existing-order FR-18 tests | IMPLEMENTED_AFTER_TRIAGE_FIX_001 |
| SETUP-010 | Integrated into [SETUP-009] Admin-list absence derivation | missing_order_id | TC-API-058 | IMPLEMENTED |
| SETUP-011 | 00 - Setup / FR-18 Setup / [SETUP-011] Add Product to Wrong-Role User Cart → Checkout Wrong-Role User Order Fixture → [SETUP-009] Discover Existing Orders | existing_order_id, second_order_id | TC-API-117 | IMPLEMENTED_AFTER_TRIAGE_FIX_001 |
| SETUP-012 | No request — unavailable empty-order setup | NONE | TC-API-118 | UNAVAILABLE |
| SETUP-013 | No request — unavailable exact lock/unlock setup | NONE | TC-API-092–093 | UNAVAILABLE |
| SETUP-014 | No request — unavailable guaranteed transition/reset | NONE | TC-API-121, 127–128 | UNAVAILABLE |
