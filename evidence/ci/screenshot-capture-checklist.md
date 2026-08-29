# Screenshot Capture Checklist — Prompt 029

This agent cannot programmatically capture live GitHub Actions browser UI screenshots.
The two real run URLs below contain the genuine evidence. Capture screenshots manually using a browser.

## Required Screenshots

### 1. Passing CI Run

**Target URL:**
```
https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279580944
```

**Save as:**
```
evidence/ci/HW06-Newman-CI-success.png
```

**What to capture:**
- Full GitHub Actions run page showing workflow `HW06 Newman CI`
- All job steps visible with green ✓ checkmarks
- Run conclusion badge showing **"success"**
- Commit SHA `3ac0b3d` visible in the run header

---

### 2. Intentional-Fail Run

**Target URL:**
```
https://github.com/Justaguy666/HW06-API_Testing/actions/runs/33279644102
```

**Save as:**
```
evidence/ci/HW06-Newman-intentional-failure.png
```

**What to capture:**
- Full GitHub Actions run page showing workflow `HW06 Newman Intentional Failure Demo`
- Steps visible including:
  - ✓ `Run intentional Newman failure and preserve reports`
  - ✓ `Upload intentional-fail Newman reports`
  - ✗ `Mark the verified intentional demonstration red` (red X — deliberately fails)
- Run conclusion badge showing **"failure"**

---

## Verification

Both runs are backed by real GitHub Actions evidence:

| Artifact | Status |
|---|---|
| `hw06-newman-passing` (Run 33279580944) | AVAILABLE — downloaded to `reports/ci/passing/` |
| `hw06-newman-intentional-fail` (Run 33279644102) | AVAILABLE — downloaded to `reports/ci/intentional-fail/` |

Screenshots are the only remaining manual step. All other Prompt-029 completion gates are met.
