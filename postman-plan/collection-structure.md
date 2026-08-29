# Planned Postman Collection Structure

No Postman JSON exists yet. Prompt 023 should use the following logical structure.

```text
HW06 API Testing
│
├── 00 - Setup
│   ├── Register Primary User
│   ├── Login Primary User
│   ├── Register / Login Secondary User
│   ├── Login Admin
│   ├── Discover Existing Product
│   ├── Verify Missing Product Candidate
│   ├── Discover Existing Order
│   └── Verify Missing Order Candidate
│
├── FR-02 - Login and Lockout
│   ├── Deterministic
│   ├── Exploratory
│   └── Stateful
│
├── FR-07 - Cart
│   ├── GET Cart
│   ├── POST Cart
│   └── Sequence
│
└── FR-18 - Admin Order Management
    ├── List Orders
    ├── Update Status
    └── Sequence / State
```

## Naming convention

Every testcase request must use:

```text
[TC-API-NNN] <Title>
```

Blocked tests remain documented in the collection plan/register but do not receive a fake executable request or passing assertion.

## Common request contract

Every executable testcase and supporting setup request must include:

```text
X-Student-Id: {{student_id}}
```

Authorization and Content-Type remain operation/test-specific.

## Planned reporting

Prompt 023 may prepare later Newman execution for CLI output, JSON report, and HTML report when the installed Newman/reporters support them. Prompt 022 neither installs reporters nor runs Newman.

## Planned evidence

- Postman collection and environment artifacts
- Newman CLI, JSON, and HTML results
- Request/response evidence with secrets redacted
- `X-Student-Id` request evidence
- Bug evidence tied to testcase IDs
- CI configuration and run evidence if CI is later requested

No screenshot or execution evidence is fabricated in this planning phase.
