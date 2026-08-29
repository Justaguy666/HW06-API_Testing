# SETUP-014 Transition-State Diagnostic

TRIAGE-FIX-001 now provisions and discovers existing orders and their current statuses. It does not establish a guaranteed allowed source-to-target transition or a reset path.

The verified API specification provides the update operation and target vocabulary but does not define a complete transition matrix, initial-state guarantees, idempotence, or reset semantics. Therefore the precondition required by the affected transition tests remains under-specified.

Final classification:

```text
SPECIFICATION_AMBIGUITY
```

Affected authoritative tests: TC-API-050–054 and TC-API-124–126.

