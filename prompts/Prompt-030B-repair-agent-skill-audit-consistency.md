# Prompt 030B — Repair Prompt-Log Fidelity and Agent-Skill Factual Consistency

Continue the existing HW06 project.

Prompt 030 successfully completed the Agent Skill G9.5 design, but a post-completion audit identified two documentation defects that must be repaired before the final AI audit.

Do NOT redesign the Agent Skill.

Do NOT generate the architecture diagram.

Do NOT modify Postman, Newman, CI/CD, bug evidence, GitHub Issues, or logical testcases.

---

# 1. Current Valid State

Prompt 030 already produced:

```text
agent-skill/README.md
agent-skill/skill-specification.md
agent-skill/workflow.md
agent-skill/pseudocode.md
agent-skill/input-output-contract.md
agent-skill/validation-gates.md
agent-skill/provenance-and-ai-policy.md
agent-skill/example-hw06.md
agent-skill/limitations.md
agent-skill/diagram-drawing-guide.md
agent-skill/diagram-evidence/README.md
```

Current status:

```text
AGENT_SKILL_G9_5_COMPLETE

AI-generated diagram files:
0

Manual diagram:
PENDING_STUDENT_MANUAL_DRAWING
```

Existing Prompt 030 commit:

```text
e6f962b
```

Preserve it.

---

# 2. Repair 1 — Restore Full Prompt 030 Verbatim

The current file:

```text
prompts/Prompt-030-agent-skill-g9-5.md
```

is incorrect because it contains only a short reference/header rather than the complete Prompt 030 text.

This violates the project's prompt/audit-history convention.

Replace its contents with the COMPLETE EXACT Prompt 030 that the user originally supplied.

Requirements:

```text
FULL PROMPT TEXT PRESENT
NO SUMMARY SUBSTITUTE
NO "see conversation" SUBSTITUTE
NO "see handoff" SUBSTITUTE
NO OMITTED SECTIONS
```

Preserve the original section numbering and constraints.

Do NOT rewrite or improve the original prompt.

The objective is exact historical prompt preservation.

If the exact Prompt 030 text is available in the current conversation/context, use it verbatim.

If the exact text is genuinely unavailable, DO NOT fabricate it and report:

```text
PROMPT_030_EXACT_TEXT_UNAVAILABLE
```

instead.

---

# 3. Prompt Log

Inspect:

```text
prompts/prompt-log.md
```

Prompt 030 must have exactly one log entry.

Do NOT append a second Prompt 030 execution entry merely because the prompt artifact is being repaired.

Prompt 030B itself may receive exactly one separate log entry.

---

# 4. Repair 2 — Correct Defect Counts in HW06 Example

Inspect:

```text
agent-skill/example-hw06.md
```

Correct any statement that says or implies:

```text
Confirmed SUT defects = 3
```

The authoritative classification is:

```text
Confirmed SUT defects:
2

Confirmed documentation defects:
1

Total confirmed defects:
3
```

GitHub mapping:

```text
Issue #1 → confirmed SUT security defect
Issue #2 → confirmed SUT robustness defect
Issue #3 → confirmed documentation defect
```

Do not change the confirmed total of 3 defects.

Do not alter defect classifications elsewhere unless the same factual typo exists.

---

# 5. Repository-Wide Consistency Check

Search relevant documentation for inconsistent phrases such as:

```text
Confirmed SUT defects: 3
3 SUT defects
all three SUT defects
```

Limit fixes only to genuine factual inconsistencies.

Do NOT globally rewrite historical runtime reports.

Historical Prompt 026/027 evidence must retain its original recorded state.

---

# 6. Verify Agent-Skill Facts

Final expected HW06 example facts:

```text
Selected features:
FR-02
FR-07
FR-18

AI_GENERATED:
105

HUMAN_ADDED:
17

Logical tests:
122

Planned executable:
114

Canonical blocked:
8

Confirmed SUT defects:
2

Confirmed documentation defects:
1

Total confirmed defects:
3
```

---

# 7. Diagram Rule Must Remain Intact

Do NOT create:

```text
Mermaid
PlantUML
Graphviz
ASCII architecture diagram
PNG
JPG
SVG
drawio
```

inside `agent-skill/`.

The only intended future diagram remains:

```text
agent-skill/diagram-evidence/api-test-design-agent-diagram.png
```

and it must be manually created by the student.

---

# 8. Re-run Diagram-Prohibition Audit

Verify:

```text
AI-generated diagram files:
0

Mermaid diagram definitions:
0

PlantUML definitions:
0

Graphviz definitions:
0

ASCII architecture diagrams:
0
```

Descriptive mentions of prohibited formats do not count as diagrams.

---

# 9. Re-run Canonical Validator

Run:

```powershell
node postman/validation/validate-postman-build.js
```

Expected:

```text
PASS
```

Prompt 030B must not change Postman artifacts.

---

# 10. Prompt Fidelity Validation

Validate:

```text
prompts/Prompt-030-agent-skill-g9-5.md
```

is no longer a short placeholder/reference.

Report:

```text
PROMPT_030_FULL_TEXT:
PRESENT
```

and:

```text
PROMPT_030_PLACEHOLDER_TEXT:
ABSENT
```

If an exact byte-for-byte comparison mechanism is available against the current conversation source, use it.

Do not claim exactness without a defensible source.

---

# 11. Save Prompt 030B

Create:

```text
prompts/Prompt-030B-repair-agent-skill-audit-consistency.md
```

containing this prompt exactly.

Append exactly one Prompt 030B entry to:

```text
prompts/prompt-log.md
```

Do not alter Prompt 001–029 historical prompt files.

---

# 12. Git Safety

Run:

```powershell
git status --short
git diff --check
```

Ensure unrelated runtime artifacts are not staged.

Expected changed scope should be limited primarily to:

```text
prompts/Prompt-030-agent-skill-g9-5.md
prompts/Prompt-030B-repair-agent-skill-audit-consistency.md
prompts/prompt-log.md
agent-skill/example-hw06.md
```

plus another agent-skill documentation file only if the same confirmed factual typo genuinely exists.

---

# 13. Commit

After validation passes:

```text
docs: repair Agent Skill audit consistency
```

Push normally.

Do not force push.

---

# 14. Completion Gate

Report:

```text
PROMPT_030B_COMPLETE
```

only if:

```text
full Prompt 030 text restored
Prompt 030 log count = 1
Prompt 030B log count = 1
SUT defect count = 2
documentation defect count = 1
total confirmed defect count = 3
AI-generated diagrams = 0
canonical Postman validator = PASS
git diff --check = PASS
```

---

# 15. Required Final Summary

End with:

```text
PROMPT_030B_SUMMARY

Prompt 030 full text restored:
YES / NO

Prompt 030 placeholder removed:
YES / NO

Prompt 030 log entries:
1

Prompt 030B log entries:
1

Confirmed SUT defects in Agent Skill example:
2

Confirmed documentation defects:
1

Total confirmed defects:
3

AI-generated diagram files:
0

Manual diagram:
PENDING_STUDENT_MANUAL_DRAWING

Canonical Postman validator:
PASS / FAIL

git diff --check:
PASS / FAIL

Status:
PROMPT_030B_COMPLETE / INCOMPLETE

Next required prompt if complete:
PROMPT 031 — FINAL AI AUDIT, AI CRITIQUE, AND DELIVERABLE DOCUMENTATION
```
