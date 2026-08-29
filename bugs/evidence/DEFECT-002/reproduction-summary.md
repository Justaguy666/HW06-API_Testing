# DEFECT-002 Reproduction Summary

This evidence package is derived from the preserved isolated Newman triage runs. Response bodies are summarized without local stack paths.

| Variant | Test | Request representation | Observed status | Reproduction |
| --- | --- | --- | ---: | ---: |
| A | TC-API-011 | `Content-Type: text/plain`, raw non-JSON body | 500 | 2/2 |
| B | TC-API-078 | No request body | 500 | 2/2 |

Both responses were HTML internal-error pages and the sanitized JSON reports identify the same unavailable-body `TypeError` root condition.

Genuine sources:

- `reports/newman/triage/tc-api-011/reproduction-cli.txt`
- `reports/newman/triage/tc-api-011/reproduction-report.json`
- `reports/newman/triage/tc-api-078/reproduction-cli.txt`
- `reports/newman/triage/tc-api-078/reproduction-report.json`

