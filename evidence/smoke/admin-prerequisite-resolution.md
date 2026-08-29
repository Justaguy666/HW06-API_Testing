# FR-18 Admin Prerequisite Resolution

## 1. Original failure

Prompt 024 observed HTTP 401 using `DOCUMENTED_CREDENTIAL_A` and HTTP 403 using `DOCUMENTED_CREDENTIAL_B`. `admin_token` remained empty, so TC-API-046 and TC-API-179 were runtime-blocked even though neither is a canonical blocked logical test.

## 2. Documentation comparison

| Label | Identifier | Documented Role | Password Explicitly Supplied? | Source | Sources Disagree? |
| --- | --- | --- | --- | --- | --- |
| DOCUMENTED_CREDENTIAL_A | `admin@eshop.com` | Admin | YES — redacted | `eshop-sut/setup_guide.md:103–105` | YES |
| DOCUMENTED_CREDENTIAL_B | `admin@eshop.com` | Admin | YES — redacted | `eshop-sut/README.md:23` | YES |

Both sources specify the same identity but different passwords. Credential values are intentionally not reproduced.

## 3. Database fixture inspection

The current SQLite database was opened with `sqlite3.OPEN_READONLY`.

| Admin Fixture | Exists? | Role | Account State | Credential Source Match? |
| ------------- | ------- | ---- | ------------- | ------------------------ |
| Local Admin fixture, ID 1, `admin@eshop.com` | YES; exactly one Admin account | `admin` | `login_attempts = 4`; temporary `locked_until` timestamp was expired before final retry | Current credential matches repository seed and DOCUMENTED_CREDENTIAL_B |

No password/hash, reset token, JWT, or private secret was printed or retained.

## 4. Seed fixture inspection

`eshop-sut/backend/database.js:13–21` drops and recreates the runtime tables whenever its initialization function runs. `database.js:90–94` creates one local Admin fixture. `server.js:4` loads this bootstrap module during server startup.

The seed password literal was classified `LOCAL_TEST_FIXTURE_SECRET`, compared without printing it, and found to match DOCUMENTED_CREDENTIAL_B but not DOCUMENTED_CREDENTIAL_A. Current database credential equality with the seed was checked as a boolean and returned true.

The database was therefore not an old fixture preventing reseeding. It contained the repository-defined Admin fixture but had accumulated failed-login/lock state from earlier conflicting credential attempts.

## 5. Root cause

Primary classification:

```text
ACCOUNT_STATE_PROBLEM
```

Evidence: the Admin identity and seed credential were correct, while the account recorded failed login attempts and a temporary lock timestamp. The final retry was delayed until that timestamp had expired.

A secondary documentation mismatch exists because the setup guide and SUT README publish different credentials.

## 6. Resolution action

- No password hash or role was mutated.
- No authentication or business logic was changed.
- No credential was guessed or brute-forced.
- No database reset was necessary.
- The legitimate repository-defined seed fixture was retained in the ignored runtime environment.
- The targeted retry was performed only after the existing lock expired.

## 7. Admin login retry

| Setup | Result | Observed HTTP Status | Runtime Token |
| --- | --- | ---: | --- |
| SETUP-005 Authenticate Administrator | PASS | 200 | POPULATED |

The request completed successfully according to the documented login transport contract and populated `admin_token`. The token is not present in retained evidence.

## 8. TC-API-046 retry

| Result | HTTP Status Observed | Assertions |
| --- | ---: | --- |
| PASS | 200 | 2 passed, 0 failed |

The authenticated Admin order-list request executed with its existing approved strategy. No new response-schema oracle was added.

## 9. TC-API-179 retry

| Result | HTTP Status Observed | Observation |
| --- | ---: | --- |
| OBSERVED_EXPLORATORY | 200 | Response Content-Type observed as `application/json; charset=utf-8` |

The Content-Type remains an exploratory observation rather than a deterministic media-type assertion.

## 10. Secret/redaction validation

- X-Student-Id present and non-empty: 3/3 targeted requests.
- Private Admin password retained in committed artifacts: 0.
- Admin token exposed: 0.
- Student identifier exposed in new evidence: 0.
- Raw Newman report/CLI files were removed after generating redacted artifacts.
- `postman/runtime/` remains Git-ignored.

## 11. Full-suite gate result

All runtime gates now pass: SUT reachable, Newman available, user/product/Admin setup operational, `admin_token` populated, both affected FR-18 smoke cases validly exercised, X-Student-Id verified, and static validation PASS.

```text
READY_FOR_FULL_NEWMAN_EXECUTION
```

The full suite was not executed.

