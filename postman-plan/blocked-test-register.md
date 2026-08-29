# Blocked-Test Register

Only genuinely non-executable tests are listed. Unspecified result/status/schema alone is not a skip reason.

| Test ID | Feature | Block Type | Missing Capability | Why It Cannot Be Implemented Defensibly | Evidence Needed to Unblock |
| --- | --- | --- | --- | --- | --- |
| TC-API-092 | FR-02 | BLKEXEC-STATE | Reproducibly locked account | Repeated requests are possible, but the testcase specifically requires a known locked state and no threshold/state channel is documented. | Lock threshold plus API-visible locked-state or supported setup procedure |
| TC-API-093 | FR-02 | BLKEXEC-STATE / BLKEXEC-RESET | Known lock duration and reproducible post-unlock state | Neither the starting locked state nor elapsed unlock condition can be established. | Lock duration, unlock condition, and reset/setup procedure |
| TC-API-164 | FR-07 | BLKEXEC-RESOURCE | Product availability/stock state | Product discovery is possible, but no documented availability/stock member or state-control operation supports the required interaction. | API-visible availability/stock definition and setup mechanism |
| TC-API-118 | FR-18 | BLKEXEC-SETUP | System-wide empty-order state | No documented operation can remove all orders or create an isolated empty-order datastore. | Supported isolated empty environment or documented order cleanup/reset |
| TC-API-121 | FR-18 | BLKEXEC-STATE | Guaranteed successful allowed status transition | The objective is the successful-update response schema; a request can be sent, but success cannot be established without a transition matrix. | Authoritative transition matrix and source-state setup |
| TC-API-127 | FR-18 | BLKEXEC-STATE / BLKEXEC-RESET | Successful isolated target mutation | Two orders may be found, but isolation cannot be evaluated without a known successful target transition and reset path. | Allowed transition, externally visible resulting state, and reset strategy |
| TC-API-128 | FR-18 | BLKEXEC-STATE / BLKEXEC-RESET | Successful update whose persistence can be checked | Persistence requires first establishing that an allowed mutation occurred; that state cannot be guaranteed. | Allowed transition, visible success/state oracle, and reset strategy |
| TC-API-181 | FR-18 | BLKEXEC-OBSERVATION_CHANNEL | In-scope traceability channel | The API specification documents no traceability/audit response field or endpoint; logs/database/filesystem are outside scope. | Documented API-visible trace/correlation field or endpoint |

## Counts

| Final execution class | Count |
| --- | ---: |
| BLOCKED_SETUP_UNAVAILABLE | 2 |
| BLOCKED_STATE_UNAVAILABLE | 5 |
| BLOCKED_SCOPE_OR_CHANNEL | 1 |
| TOTAL | 8 |
