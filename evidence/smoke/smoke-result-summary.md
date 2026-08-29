# Controlled Smoke Result Summary

HTTP statuses below are observed runtime facts and are not automatically specification oracles.

| Test ID | Feature | Origin | Result | HTTP Status Observed | Assertions | Notes |
| ------- | ------- | ------ | ------ | -------------------- | ---------- | ----- |
| TC-API-001 | FR-02 | AI_GENERATED | PASS | 200 | 3 passed | Supported successful-login assertions passed |
| TC-API-003 | FR-02 | AI_GENERATED | OBSERVED_EXPLORATORY | 401 | 1 transport assertion passed | Omitted-email behavior observed |
| TC-API-165 | FR-02 | HUMAN_ADDED | OBSERVED_EXPLORATORY | 401 | 1 transport assertion passed | Extreme-length email behavior observed |
| TC-API-130 | FR-07 | AI_GENERATED | PASS | 200 | 2 passed | Authenticated GET Cart mechanics passed |
| TC-API-161 | FR-07 | AI_GENERATED | OBSERVED_EXPLORATORY | 200, 200 | 2 transport assertions passed | POST then GET completed; response changed from empty to populated |
| TC-API-173 | FR-07 | HUMAN_ADDED | OBSERVED_EXPLORATORY | 200 | 1 transport assertion passed | JSON Content-Type observed |
| TC-API-046 | FR-18 | AI_GENERATED | BLOCKED_RUNTIME_PREREQUISITE | 401 | 2 transport assertions passed | Admin authentication was not established, so the objective was not validly exercised |
| TC-API-048 | FR-18 | AI_GENERATED | PASS | 401 | 2 passed | Supported unauthenticated-denial assertion passed |
| TC-API-179 | FR-18 | HUMAN_ADDED | BLOCKED_RUNTIME_PREREQUISITE | 401 | 1 transport assertion passed | Admin prerequisite absent; response is not treated as the intended authenticated observation |

Result totals:

| Classification | Count |
| --- | ---: |
| PASS | 3 |
| OBSERVED_EXPLORATORY | 4 |
| FAIL_ASSERTION | 0 |
| FAIL_REQUEST | 0 |
| FAIL_SETUP | 0 |
| BLOCKED_RUNTIME_PREREQUISITE | 2 |

The initial Newman run executed 15 HTTP requests: five setup requests and ten testcase-step requests. The targeted final validation run executed one Admin setup request and the two affected FR-18 requests only.

