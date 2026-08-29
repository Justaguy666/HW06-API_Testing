# Blocked Logical Tests

Blocked tests are preserved in logical and traceability artifacts. No executable or fake-pass testcase unit is created for these IDs.

| Test ID | Feature | Reason | Logical Test Preserved? | Executed by Newman? |
| --- | --- | --- | --- | --- |
| TC-API-092 | FR-02 | A reproducibly locked account cannot be established. | YES | NO |
| TC-API-093 | FR-02 | Lock duration and reproducible unlock/reset are unavailable. | YES | NO |
| TC-API-118 | FR-18 | No documented operation establishes a system-wide empty-order state. | YES | NO |
| TC-API-121 | FR-18 | No transition matrix can establish the successful-update precondition. | YES | NO |
| TC-API-127 | FR-18 | No allowed transition/reset can establish an observable successful mutation for isolation. | YES | NO |
| TC-API-128 | FR-18 | No allowed transition/reset can establish a successful mutation whose persistence can be evaluated. | YES | NO |
| TC-API-164 | FR-07 | No documented stock/availability state or setup channel exists. | YES | NO |
| TC-API-181 | FR-18 | No in-scope API-visible traceability channel is documented. | YES | NO |
