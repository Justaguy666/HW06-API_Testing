# Pseudocode — API Test Design Agent Skill

This pseudocode is algorithmic. It describes the control flow and decision logic of the skill without implementing a production system.

Notation:
- `FUNCTION name(params) -> ReturnType` defines a callable procedure
- `STRUCT Name { fields }` defines a data structure
- `ENUM Name { values }` defines a fixed value set
- `FOR`, `IF`, `RETURN`, `HALT` have their conventional meanings
- `GATE(id)` denotes a mandatory human approval halt

---

## Data Structures

```
STRUCT Requirement {
    id:             String          -- e.g., "REQ-001"
    source:         String          -- specification location
    exact_evidence: String          -- verbatim text from spec
    interpretation: String          -- agent's reading
    confidence:     ConfidenceLevel
}

ENUM ConfidenceLevel { SUPPORTED, CONDITIONAL, UNKNOWN }

STRUCT Blocker {
    id:          String
    description: String
    stage:       String
    affects:     List<String>   -- testcase IDs or dimension IDs
}

STRUCT EP {
    id:            String
    parameter:     String
    class:         EPClass
    description:   String
    req_refs:      List<String>
    spec_evidence: String
}

ENUM EPClass { VALID, INVALID, CONDITIONAL, EXPLORATORY }

STRUCT BVAResult {
    dimension:   String
    applicable:  Boolean
    candidates:  List<BoundaryCandidate>   -- empty if not applicable
    reason:      String
}

STRUCT BoundaryCandidate {
    label: String       -- ON, OFF_BELOW, OFF_ABOVE, NOMINAL
    value: String
    source: String      -- spec reference
}

STRUCT LogicalTestcase {
    id:              String
    feature:         String
    objective:       String
    preconditions:   String
    input_class:     String
    action:          String
    expected_result: ExpectedResult
    req_refs:        List<String>
    ep_refs:         List<String>
    bva_refs:        List<String>
    interaction_refs: List<String>
    security_refs:   List<String>
    origin:          Origin
    readiness:       ReadinessClass
    blocker_refs:    List<String>
    audit_status:    AuditStatus
    authorship_note: String       -- required for HUMAN_ADDED
}

STRUCT ExpectedResult {
    class:       OracleClass
    description: String
    source:      String    -- spec ref (required if DETERMINISTIC_ORACLE)
}

ENUM OracleClass {
    DETERMINISTIC_ORACLE,
    EXPLORATORY_OBSERVATION,
    BLOCKED_ORACLE
}

ENUM Origin {
    AI_GENERATED,
    AI_ASSISTED_CANDIDATE,
    HUMAN_ADDED
}

ENUM AuditStatus { PENDING, VALID, INVALID, INCOMPLETE }

ENUM ReadinessClass {
    STATIC_READY,
    RUNTIME_PROVISION_REQUIRED,
    STATE_SETUP_REQUIRED,
    EXPLORATORY_PROBE_READY,
    BLOCKED_BY_SPEC
}

ENUM FeasibilityClass {
    EXECUTABLE_DETERMINISTIC,
    EXECUTABLE_EXPLORATORY,
    EXECUTABLE_WITH_RUNTIME_SETUP,
    BLOCKED_SETUP_UNAVAILABLE,
    BLOCKED_STATE_UNAVAILABLE,
    BLOCKED_SCOPE_OR_CHANNEL
}

STRUCT SkillArtifacts {
    requirement_inventory:    List<Requirement>
    test_basis:               TestBasis
    ep_catalog:               List<EP>
    bva_results:              List<BVAResult>
    interaction_catalog:      List<Interaction>
    security_coverage:        SecurityCoverageMap
    testcase_suite:           List<LogicalTestcase>
    blocker_register:         List<Blocker>
    traceability_matrix:      TraceabilityMatrix
    feasibility_map:          Map<String, FeasibilityClass>
    duplicate_report:         DuplicateReport
    audit_log:                AuditLog
}
```

---

## Top-Level Entry Point

```
FUNCTION GENERATE_API_TEST_DESIGN(
    spec:             APISpecification,
    assignment_rules: AssignmentRules,
    selected_scope:   FeatureScope
) -> SkillArtifacts:

    -- Stage 1: Specification Intake
    inventory = SPECIFICATION_INTAKE(spec, selected_scope)
    IF inventory.parse_failure:
        HALT("BLOCKER: SPEC_PARSE_FAILURE — " + inventory.error)

    -- Stage 2: Requirement Evidence Extraction
    req_inventory = EXTRACT_REQUIREMENTS(inventory)

    -- GATE-01: Human reviews requirement interpretations
    approved_reqs = GATE("GATE-01", req_inventory)
    IF approved_reqs.rejected_count > 0:
        revised = REVISE_REQUIREMENTS(approved_reqs.rejected)
        approved_reqs = GATE("GATE-01", revised)  -- re-present after revision

    -- Stage 3: Verified Test Basis
    test_basis, initial_blockers = BUILD_TEST_BASIS(approved_reqs)

    -- Stages 4-7: Analysis
    ep_catalog    = DOMAIN_MODELING(test_basis, assignment_rules)
    bva_results   = BOUNDARY_ANALYSIS(ep_catalog, test_basis)
    interactions  = INTERACTION_ANALYSIS(test_basis, ep_catalog)
    security_map  = SECURITY_COVERAGE(test_basis, assignment_rules)

    -- Stage 8: Logical Test Generation
    candidates = GENERATE_CANDIDATES(
        test_basis, ep_catalog, bva_results,
        interactions, security_map
    )

    -- Stage 9: Duplicate Detection
    deduped, dup_report = DEDUPLICATE(candidates)

    -- GATE-02: Human audits AI-generated testcases
    approved_tests = GATE("GATE-02", deduped)

    -- Stage 11: Student Extension
    human_tests = COLLECT_STUDENT_EXTENSION(assignment_rules)
    VALIDATE_PROVENANCE(human_tests)   -- must be HUMAN_ADDED

    -- GATE-03: Confirm student provenance
    confirmed_human = GATE("GATE-03", human_tests)

    combined_suite = approved_tests + confirmed_human

    -- Stage 12: Concrete Data Planning
    data_map, new_blockers = DATA_PLANNING(combined_suite)

    -- Stage 13: Execution Feasibility
    feasibility_map, final_blockers = EXECUTION_FEASIBILITY(
        combined_suite, data_map, initial_blockers + new_blockers
    )

    -- GATE-04: Human reviews blockers
    GATE("GATE-04", final_blockers)

    -- Build traceability matrix
    traceability = BUILD_TRACEABILITY(combined_suite, approved_reqs)

    -- GATE-06: Final artefact audit
    GATE("GATE-06", SkillArtifacts {
        requirement_inventory: approved_reqs,
        test_basis: test_basis,
        ep_catalog: ep_catalog,
        bva_results: bva_results,
        interaction_catalog: interactions,
        security_coverage: security_map,
        testcase_suite: combined_suite,
        blocker_register: final_blockers,
        traceability_matrix: traceability,
        feasibility_map: feasibility_map,
        duplicate_report: dup_report,
        audit_log: COMPILE_AUDIT_LOG()
    })

    RETURN artifacts
```

---

## Stage 2: Requirement Extraction

```
FUNCTION EXTRACT_REQUIREMENTS(inventory: SpecificationInventory) -> RequirementInventory:

    requirements = []
    examples     = []
    unknowns     = []

    FOR each statement IN inventory.documented_statements:

        IF statement.type == EXPLICIT_BEHAVIOR:
            req = Requirement {
                id:             GENERATE_REQ_ID(),
                source:         statement.location,
                exact_evidence: statement.verbatim_text,
                interpretation: INTERPRET(statement),
                confidence:     ASSESS_CONFIDENCE(statement)
            }
            requirements.append(req)

        ELSE IF statement.type == EXAMPLE:
            -- Examples are recorded but NOT promoted to requirements
            examples.append({
                source: statement.location,
                text:   statement.verbatim_text,
                note:   "DOCUMENTED_EXAMPLE — not a requirement boundary"
            })

        ELSE:
            -- Unknown or ambiguous statements become UNKNOWN records
            unknowns.append({
                source:      statement.location,
                text:        statement.verbatim_text,
                disposition: "UNKNOWN"
            })
            -- Do NOT invent an interpretation

    RETURN RequirementInventory {
        requirements: requirements,
        examples:     examples,
        unknowns:     unknowns
    }
```

---

## Stage 5: Boundary Analysis Decision

```
FUNCTION BOUNDARY_ANALYSIS(
    ep_catalog: List<EP>,
    test_basis: TestBasis
) -> List<BVAResult>:

    results = []

    FOR each dimension IN UNIQUE_DIMENSIONS(ep_catalog):

        spec_boundary = FIND_SPEC_BOUNDARY(dimension, test_basis)

        IF spec_boundary IS NOT NULL:
            -- Specification explicitly defines a boundary
            candidates = [
                BoundaryCandidate { label: "ON",        value: spec_boundary.value,      source: spec_boundary.ref },
                BoundaryCandidate { label: "OFF_BELOW",  value: spec_boundary.value - 1,  source: spec_boundary.ref },
                BoundaryCandidate { label: "OFF_ABOVE",  value: spec_boundary.value + 1,  source: spec_boundary.ref },
                BoundaryCandidate { label: "NOMINAL",    value: spec_boundary.typical,    source: spec_boundary.ref }
            ]
            results.append(BVAResult {
                dimension:   dimension,
                applicable:  TRUE,
                candidates:  candidates,
                reason:      "Specification defines explicit boundary at " + spec_boundary.value
            })

        ELSE IF ONLY_EXAMPLE_AVAILABLE(dimension):
            -- Example literal is NOT a boundary
            results.append(BVAResult {
                dimension:   dimension,
                applicable:  FALSE,
                candidates:  [],
                reason:      "BVA_NOT_APPLICABLE — only example literal available; not a specification boundary"
            })

        ELSE:
            -- No boundary information at all
            results.append(BVAResult {
                dimension:   dimension,
                applicable:  FALSE,
                candidates:  [],
                reason:      "BVA_NOT_APPLICABLE — no boundary defined in specification"
            })

    -- BVA_NOT_APPLICABLE is a valid result — do not fabricate boundaries
    RETURN results
```

---

## Stage 8: Expected Result Oracle Decision

```
FUNCTION DETERMINE_ORACLE(
    objective:   TestObjective,
    test_basis:  TestBasis,
    blockers:    List<Blocker>
) -> ExpectedResult:

    spec_outcome = FIND_SPEC_OUTCOME(objective, test_basis)

    IF spec_outcome IS NOT NULL:
        -- Specification explicitly states the outcome
        RETURN ExpectedResult {
            class:       DETERMINISTIC_ORACLE,
            description: spec_outcome.description,
            source:      spec_outcome.ref
        }

    ELSE IF CAN_EXECUTE_MEANINGFULLY(objective):
        -- Execution is possible and observation has value, but outcome is not prescribed
        RETURN ExpectedResult {
            class:       EXPLORATORY_OBSERVATION,
            description: "Observe and record actual behavior",
            source:      "No specification constraint; observation only"
        }

    ELSE:
        -- Execution is not possible or the oracle is completely unknown
        blocker = CREATE_BLOCKER(
            description: "Cannot determine expected result for: " + objective.description,
            stage:       "S-08"
        )
        RETURN ExpectedResult {
            class:       BLOCKED_ORACLE,
            description: "See blocker " + blocker.id,
            source:      ""
        }

    -- Never fabricate a specific HTTP status (400, 401, 403, etc.)
    -- without a spec_outcome reference.
```

---

## Stage 9: Duplicate Detection

```
FUNCTION DEDUPLICATE(
    candidates: List<LogicalTestcase>
) -> (List<LogicalTestcase>, DuplicateReport):

    retained = []
    rejected = []

    FOR each candidate IN candidates:
        match = FIND_MATCH(candidate, retained)

        IF match IS NULL:
            candidate.dedup_status = UNIQUE
            retained.append(candidate)

        ELSE IF HAS_INDEPENDENT_COVERAGE_VALUE(candidate, match):
            candidate.dedup_status = PARTIAL_OVERLAP_WITH_INDEPENDENT_VALUE
            retained.append(candidate)

        ELSE:
            candidate.dedup_status = DUPLICATE
            rejected.append({
                candidate: candidate,
                reason:    "Fully redundant with " + match.id,
                match_id:  match.id
            })

    RETURN (retained, DuplicateReport { retained: retained, rejected: rejected })

FUNCTION HAS_INDEPENDENT_COVERAGE_VALUE(
    candidate: LogicalTestcase,
    existing:  LogicalTestcase
) -> Boolean:
    -- Compare across all dimensions simultaneously
    -- Return TRUE only if at least one dimension differs meaningfully

    IF candidate.objective    != existing.objective:    RETURN TRUE
    IF candidate.input_class  != existing.input_class:  RETURN TRUE
    IF candidate.preconditions != existing.preconditions: RETURN TRUE
    IF candidate.action       != existing.action:       RETURN TRUE
    -- assertion target (inferred from expected_result focus)
    IF ASSERTION_TARGET(candidate) != ASSERTION_TARGET(existing): RETURN TRUE

    RETURN FALSE   -- all dimensions identical → DUPLICATE
```

---

## Stage 10: Human Audit Gate

```
FUNCTION GATE_02_HUMAN_AUDIT(
    candidates: List<LogicalTestcase>
) -> List<LogicalTestcase>:

    approved  = []
    rejected  = []
    to_revise = []

    FOR each testcase IN candidates:

        -- Present to human; wait for response
        review = PRESENT_TO_HUMAN(testcase)

        -- Human must provide BOTH classification AND reasoning
        IF review.reasoning IS EMPTY:
            HALT("Human reasoning required for testcase " + testcase.id)

        IF review.classification == VALID:
            retained_testcase = testcase
            retained_testcase.audit_status = VALID
            approved.append(retained_testcase)

        ELSE IF review.classification == INVALID:
            testcase.audit_status = INVALID
            rejected.append({ testcase: testcase, reason: review.reasoning })

        ELSE IF review.classification == INCOMPLETE:
            testcase.audit_status = INCOMPLETE
            to_revise.append({ testcase: testcase, notes: review.reasoning })

    -- Re-present INCOMPLETE testcases after revision
    FOR each item IN to_revise:
        revised = HUMAN_REVISES(item.testcase, item.notes)
        re_review = PRESENT_TO_HUMAN(revised)
        IF re_review.classification == VALID:
            revised.audit_status = VALID
            approved.append(revised)
        ELSE:
            rejected.append({ testcase: revised, reason: re_review.reasoning })

    -- AI MUST NOT auto-approve any testcase in this function
    RETURN approved
```

---

## Provenance Enforcement

```
FUNCTION VALIDATE_PROVENANCE(testcases: List<LogicalTestcase>):

    FOR each tc IN testcases:

        IF tc.origin == HUMAN_ADDED:
            IF tc.authorship_note IS EMPTY:
                HALT("HUMAN_ADDED testcase " + tc.id + " missing authorship note")

            -- Verify independence — was this truly authored by the student
            -- before or without AI involvement?
            IF WAS_DERIVED_FROM_AI_CANDIDATE(tc):
                HALT("Provenance violation: " + tc.id +
                     " was derived from an AI candidate but is labeled HUMAN_ADDED. " +
                     "Correct origin is AI_ASSISTED_CANDIDATE.")

        IF tc.origin == AI_ASSISTED_CANDIDATE:
            -- Valid if a human modified an AI candidate
            -- origin must remain AI_ASSISTED_CANDIDATE, not HUMAN_ADDED
            PASS

        IF tc.origin == AI_GENERATED:
            -- Valid if unmodified AI output; must have passed GATE-02
            IF tc.audit_status != VALID:
                HALT("AI_GENERATED testcase " + tc.id + " has not passed GATE-02 audit")

    -- Origin is immutable after assignment — no silent changes permitted
```

---

## Execution Feasibility Classification

```
FUNCTION EXECUTION_FEASIBILITY(
    testcases:    List<LogicalTestcase>,
    data_map:     DataReadinessMap,
    blockers:     List<Blocker>
) -> (Map<String, FeasibilityClass>, List<Blocker>):

    feasibility = {}
    new_blockers = []

    FOR each tc IN testcases:
        readiness = data_map[tc.id]

        IF tc.expected_result.class == BLOCKED_ORACLE:
            -- Missing oracle does NOT mean execution is impossible
            -- Classify separately
            IF readiness IN [STATIC_READY, EXPLORATORY_PROBE_READY]:
                feasibility[tc.id] = EXECUTABLE_EXPLORATORY
            ELSE IF readiness == RUNTIME_PROVISION_REQUIRED:
                feasibility[tc.id] = EXECUTABLE_WITH_RUNTIME_SETUP
            ELSE:
                feasibility[tc.id] = BLOCKED_SETUP_UNAVAILABLE
                new_blockers.append(CREATE_BLOCKER(tc))

        ELSE IF readiness == STATIC_READY:
            feasibility[tc.id] = EXECUTABLE_DETERMINISTIC

        ELSE IF readiness == RUNTIME_PROVISION_REQUIRED:
            feasibility[tc.id] = EXECUTABLE_WITH_RUNTIME_SETUP

        ELSE IF readiness == STATE_SETUP_REQUIRED:
            IF STATE_ACHIEVABLE(tc):
                feasibility[tc.id] = EXECUTABLE_WITH_RUNTIME_SETUP
            ELSE:
                feasibility[tc.id] = BLOCKED_STATE_UNAVAILABLE
                new_blockers.append(CREATE_BLOCKER(tc))

        ELSE IF readiness == BLOCKED_BY_SPEC:
            feasibility[tc.id] = BLOCKED_SCOPE_OR_CHANNEL
            new_blockers.append(CREATE_BLOCKER(tc))

    RETURN (feasibility, blockers + new_blockers)
```

---

## Root-Cause Triage

```
FUNCTION ROOT_CAUSE_TRIAGE(
    results: List<ExecutionResult>
) -> TriageReport:

    -- Group by setup chain first: many failures may share one root cause
    setup_failures = FILTER(results, FAIL_SETUP)
    setup_groups   = GROUP_BY_SETUP_STEP(setup_failures)

    triage_entries = []

    FOR each group IN setup_groups:
        root_cause = IDENTIFY_ROOT_CAUSE(group)
        classification = CLASSIFY_ROOT_CAUSE(root_cause)

        -- classification is one of:
        --   CONFIRMED_SUT_DEFECT (requires GATE-05 human confirmation)
        --   CONFIRMED_DOCUMENTATION_DEFECT
        --   POSTMAN_IMPLEMENTATION_DEFECT
        --   TEST_DATA_SETUP_LIMITATION
        --   SPECIFICATION_AMBIGUITY
        --   EXPECTED_EXPLORATORY_OBSERVATION
        --   ENVIRONMENT_RUNTIME_ISSUE
        --   INSUFFICIENT_EVIDENCE

        IF classification == CONFIRMED_SUT_DEFECT:
            -- Must be confirmed by human at GATE-05 — never auto-confirmed
            GATE("GATE-05", { root_cause: root_cause, affected: group })

        triage_entries.append({
            root_cause:     root_cause,
            classification: classification,
            affected_tests:  group.test_ids
        })

    -- Remaining non-setup failures
    assertion_failures = FILTER(results, FAIL_ASSERTION)
    FOR each failure IN assertion_failures:
        IF NOT ALREADY_GROUPED(failure):
            triage_entries.append(TRIAGE_INDIVIDUALLY(failure))

    RETURN TriageReport { entries: triage_entries }
```
