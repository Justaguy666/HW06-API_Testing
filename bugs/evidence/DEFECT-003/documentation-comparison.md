# DEFECT-003 Documentation Comparison

This is a redacted display copy derived from the genuine repository files. The source files are unchanged.

| Fact | Result |
| --- | --- |
| Same Admin identity documented | YES — `admin@eshop.com` |
| Password values conflict | YES |
| Seed matches exactly one documented credential | YES |
| Legitimate runtime login confirms that credential | YES |

## Genuine source A

```text
eshop-sut/setup_guide.md:103-105
Default Admin identity: admin@eshop.com
Password: [DOCUMENTED_CREDENTIAL_A — REDACTED]
```

## Genuine source B

```text
eshop-sut/README.md:21-24
Default Admin identity: admin@eshop.com
Password: [DOCUMENTED_CREDENTIAL_B — REDACTED]
```

The labels intentionally preserve the fact that two different values are documented without reproducing either value. Seed comparison and the legitimate login result are recorded in `evidence/smoke/admin-prerequisite-resolution.md`.

