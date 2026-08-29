# Controlled Smoke Runtime Summary

## Runtime prerequisite audit

| Requirement | Available? | Version / State | Action |
| ----------- | ---------- | --------------- | ------ |
| Node.js | YES | v22.17.0; satisfies Node.js >=18 | USE_EXISTING |
| npm | YES | 10.9.2 | USE_EXISTING |
| Newman | YES | 6.2.2 through `npx --yes newman@6.2.2` | USE_EXISTING |
| Backend npm dependencies | YES | Installed locally with `npm install`; 135 packages | INSTALL_REQUIRED |
| SQLite seed database | YES | Existing database used; backend reported initialization/seed on startup | USE_EXISTING |
| Backend API | YES | Listening and TCP-reachable on `127.0.0.1:3000` | USE_EXISTING |

No frontend runtime was required for API smoke testing. The npm audit reported four dependency vulnerabilities; no broad `npm audit fix` mutation was performed.

## Startup and reachability

| Item | Result |
| --- | --- |
| Startup command | `node server.js` from `eshop-sut/backend` |
| Expected base URL | `http://localhost:3000` |
| Process state | RUNNING during smoke execution |
| TCP reachability | PASS on port 3000 |

## Runtime configuration

| Configuration | Classification | Notes |
| --- | --- | --- |
| `base_url` | AVAILABLE | Local documented API URL |
| `student_id` | AVAILABLE | Stored only in ignored runtime environment; value redacted |
| Primary user credentials | AVAILABLE | Generated and registered by setup; values not reported |
| Admin credential prerequisite | MISSING_BLOCKS_FEATURE_SMOKE | Both locally documented seed-password candidates failed authentication; values not reported |

Runtime environment used: `postman/runtime/HW06-local.runtime.postman_environment.json`. The entire `postman/runtime/` directory is ignored by Git.

## Setup execution

| Setup request | Result | Observed status | Notes |
| --- | --- | ---: | --- |
| Register Primary User | PASS | 200 | Disposable run-specific user created |
| Login Primary User | PASS | 200 | User token populated |
| Discover Existing Product | PASS | 200 | Product identifier/name/price populated |
| Confirm Existing Product | PASS | 200 | Discovered product confirmed |
| Login Admin — initial documented setup-guide credential | BLOCKED_PRIVATE_PREREQUISITE | 401 | Admin token remained empty |
| Login Admin — alternate credential documented in SUT README | BLOCKED_PRIVATE_PREREQUISITE | 403 | Targeted final validation retry; admin token remained empty |

## Runtime variables

| Variable | Required by Smoke? | Populated? | Source Request | Secret? |
| -------- | ------------------ | ---------- | -------------- | ------- |
| `base_url` | YES | POPULATED | Private runtime environment | NO |
| `student_id` | YES | POPULATED | Private runtime environment | YES |
| `user_token` | YES | POPULATED | Login Primary User | YES |
| `existing_product_id` | YES | POPULATED | Discover Existing Product | NO |
| `existing_product_name` | YES | POPULATED | Discover Existing Product | NO |
| `existing_product_price` | YES | POPULATED | Discover Existing Product | NO |
| `admin_token` | YES for TC-API-046/179 | EMPTY | Login Admin | YES |
| `existing_order_id` | NO for selected scope | EMPTY | Not executed | NO |
| `current_order_status` | NO for selected scope | EMPTY | Not executed | NO |

## PROMPT 025 — ADMIN PREREQUISITE FOLLOW-UP

The original Prompt 024 Admin failures remain recorded above. Read-only database and seed inspection established that the single Admin account matches the repository-defined local fixture, while its failed-attempt counter and temporary lock reflected earlier conflicting credential attempts.

No database reset or direct password/role mutation was required. After the lock expired, targeted SETUP-005 authentication returned HTTP 200 and populated `admin_token`. TC-API-046 then passed at HTTP 200, and TC-API-179 completed as an exploratory observation at HTTP 200.

Final Admin prerequisite status:

```text
RESOLVED
```

Final full-suite gate:

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```
