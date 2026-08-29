# Authoritative Full-Run Runtime Context

| Item | Value |
| --- | --- |
| Run label | `AUTHORITATIVE_INITIAL_FULL_RUN` |
| Started | 2026-08-30 04:35:21 +07:00 |
| Completed | 2026-08-30 04:35:36 +07:00 |
| SUT base URL | `http://localhost:3000` |
| Backend state | Running and reachable on port 3000 |
| Newman | 6.2.2 through `npx` |
| Node.js | v22.17.0 |
| Database reset | NO |
| Runtime fixture strategy | Fresh generated identities, runtime product/order discovery, sequence-local state |
| Admin prerequisite | RESOLVED; legitimate seed fixture available and unlocked |
| Collection | `postman/collections/HW06-API-Testing.postman_collection.json` |
| Private environment path | `postman/runtime/HW06-local.runtime.postman_environment.json` |

Pre-run static validation passed. The runtime environment, student identifier, base URL, and Admin fixture were checked without printing their private values.

The full run generated disposable users, modified in-memory Cart state, exercised login-attempt state, and performed resource-dependent operations. No database reset or direct business-state rewrite was used.

```text
DATABASE_RESET:
NO

RUNTIME_DB_DIRTY:
YES
```

