# Postman Static Build Validation

Command executed:

```text
node postman/validation/validate-postman-build.js
```

This command performed local/static file validation only. It did not start the SUT, send HTTP requests, or run Newman.

## Result

```text
PASS
```

## Metrics

| Metric | Result |
| --- | ---: |
| Logical testcase IDs accounted in traceability | 122 |
| Executable testcase units | 114 |
| Blocked logical tests documented | 8 |
| Total HTTP request items | 152 |
| Testcase HTTP request items | 137 |
| Supporting setup request items | 15 |
| Environment variables | 25 |
| AI_GENERATED executable units | 98 |
| HUMAN_ADDED executable units | 16 |
| Duplicate implementation IDs | 0 |
| Unknown implementation IDs | 0 |
| HTTP requests missing `X-Student-Id` | 0 |
| Plaintext secrets | 0 |
| Unsupported hard assertions | 0 |
| Blocked fake-pass requests | 0 |

## Checks

| Check | Result |
| --- | --- |
| Collection JSON parseable | PASS |
| Environment JSON parseable/importable | PASS |
| Collection schema is Postman v2.1 | PASS |
| Collection name and scope metadata valid | PASS |
| Collection contains only the canonical `item` hierarchy | PASS |
| 114 executable IDs represented exactly once | PASS |
| Eight blocked IDs absent from executable units | PASS |
| All 122 IDs represented in traceability | PASS |
| HUMAN_ADDED provenance/proposal IDs retained | PASS |
| Every request carries `X-Student-Id: {{student_id}}` | PASS |
| Every JSON-designated raw body is syntactically parseable | PASS |
| Every `pm.test()` name contains its testcase ID | PASS |
| No fake-pass assertion | PASS |
| No unsupported exact-status assertion | PASS |
| No fabricated runtime Product/order ID | PASS |
| All 14 SETUP IDs represented in setup traceability | PASS |
| Secret audit | PASS |

## Readiness

```text
READY_FOR_POSTMAN_EXECUTION_VALIDATION
```
