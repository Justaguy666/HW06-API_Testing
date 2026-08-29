# Current-Scope Student Extension Worksheet

## 1. Instructions and Authorship Boundary

This worksheet contains 24 human-owned ideation slots. Slot IDs are not testcase IDs, and no `TC-API-*` identifier is allocated.

```text
At least 5 accepted HUMAN_ADDED tests per feature are required.

FR-02:
minimum accepted slots = 5

FR-07:
minimum accepted slots = 5

FR-18:
minimum accepted slots = 5
```

All substantive fields remain `STUDENT TO COMPLETE`. The student must independently author each proposed test and later provide an explicit authorship confirmation. Prompt 019 generated no test title, objective, input, action, expected result, or test step.

Authorship categories used by the project:

```text
AI_GENERATED
AI_ASSISTED_CANDIDATE
HUMAN_ADDED
```

Prompt 019 baseline `HUMAN_ADDED` count was 0. Prompt 020 accepted 17 student proposals as `HUMAN_ADDED`.

## 2. FR-02 Worksheet Slots

### HUMAN-FR02-01

Slot ID:
HUMAN-FR02-01

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-01

Student Test Title:
Observe handling of an extreme-length email representation.

Student Primary Objective:
Observe endpoint behavior when the email input is syntactically email-shaped but has an unusually large representation length while password remains nominal.

Why Existing AI Suite Missed This:
The AI suite covers omission, type, whitespace, and case but does not isolate extreme representation length.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR02-002

PARAM / DIM Refs:
P-FR02-001

EP Refs:
EP-FR02-002

INT Refs:
NONE

Blocker Refs:
BLK-FR02-001, BLK-FR02-004

Preconditions:
A JSON-shaped login request can be submitted; password remains in one nominal string class. No account association is required for the email observation.

Logical Input Condition:
Email is syntactically email-shaped and unusually large in representation length; no numeric length threshold is selected yet.

Logical Action:
Submit the login operation once with only the email representation class varied and record observable behavior.

Expected / Observation Strategy:
Record transport, response representation, and handling of the extreme-length email class. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-003–005, TC-API-084; relationship: PARTIAL_OVERLAP; independent value: Isolates an extreme-length string subclass without treating length as a boundary.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-165

Historical AI-Candidate Overlap:
NONE; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE — one email representation class.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR02-02

Slot ID:
HUMAN-FR02-02

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-02

Student Test Title:
Observe handling of an extreme-length password representation.

Student Primary Objective:
Observe endpoint behavior when the password representation is unusually large while email remains nominal.

Why Existing AI Suite Missed This:
The AI suite covers omission, type, whitespace, and case but does not isolate extreme password representation length.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR02-003

PARAM / DIM Refs:
P-FR02-002

EP Refs:
EP-FR02-007

INT Refs:
NONE

Blocker Refs:
BLK-FR02-001, BLK-FR02-004

Preconditions:
A JSON-shaped login request can be submitted; email remains in one nominal string class.

Logical Input Condition:
Password is unusually large in representation length; no minimum, maximum, or exact size is selected yet.

Logical Action:
Submit the login operation once with only the password representation class varied and record observable behavior.

Expected / Observation Strategy:
Record transport, response representation, and handling of the extreme-length password class. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-009, TC-API-085, TC-API-087; relationship: PARTIAL_OVERLAP; independent value: Isolates an extreme-length password-string subclass without inferring a password boundary.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-166

Historical AI-Candidate Overlap:
NONE; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE — one password representation class.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR02-03

Slot ID:
HUMAN-FR02-03

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-03

Student Test Title:
Observe Unicode / non-ASCII representation handling in credential fields.

Student Primary Objective:
Characterize handling of non-ASCII credential representations such as accented characters or other Unicode characters.

Why Existing AI Suite Missed This:
The AI suite does not isolate Unicode/non-ASCII credential representation as a human-risk subclass.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
DOMAIN

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR02-002, TB-FR02-003

PARAM / DIM Refs:
P-FR02-001, P-FR02-002

EP Refs:
EP-FR02-002, EP-FR02-007

INT Refs:
NONE

Blocker Refs:
BLK-FR02-001, BLK-FR02-004

Preconditions:
A JSON-shaped login request can be submitted. No account containing the selected representation is presumed.

Logical Input Condition:
One credential field uses a non-ASCII string representation while the other remains nominal; fields are varied in separate executions.

Logical Action:
Submit one execution per credential-field position and record observable handling.

Expected / Observation Strategy:
Compare observable handling by credential-field position for the same Unicode representation class. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-005, TC-API-009, TC-API-084–087; relationship: PARTIAL_OVERLAP; independent value: Adds a Unicode/non-ASCII representation subclass; execution varies one credential field at a time.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-167

Historical AI-Candidate Overlap:
PARTIAL thematic overlap with credential-representation analysis; closest: STUDENT-FR02-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE — Unicode representation; field positions are controlled execution variants.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR02-04

Slot ID:
HUMAN-FR02-04

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-04

Student Test Title:
Observe special-character-class handling in credential representations.

Student Primary Objective:
Observe representation-level handling of credential input containing special-character classes such as quotation, bracket, escape, or control-character categories.

Why Existing AI Suite Missed This:
Existing robustness cases do not independently apply a security-oriented character-class lens.

AI-Miss Category:
SECURITY_CONTEXT_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_SECURITY_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR02-002, TB-FR02-003

PARAM / DIM Refs:
P-FR02-001, P-FR02-002

EP Refs:
EP-FR02-002, EP-FR02-007

INT Refs:
NONE

Blocker Refs:
BLK-FR02-001, BLK-FR02-004, BLK-ALL-001

Preconditions:
A JSON-shaped login request can be submitted. No attack payload or exploit behavior is presumed.

Logical Input Condition:
One credential field contains one abstract special-character class while the other remains nominal; fields are varied separately.

Logical Action:
Submit one execution per selected character class and credential-field position, recording only interface-visible behavior.

Expected / Observation Strategy:
Characterize handling and disclosure for abstract special-character classes. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-005, TC-API-009, TC-API-088, TC-API-094; relationship: PARTIAL_OVERLAP; independent value: Adds character-class security observation without defining an exploit payload.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-168

Historical AI-Candidate Overlap:
NONE; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE — character-class handling; classes/field positions are controlled variants.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR02-05

Slot ID:
HUMAN-FR02-05

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-05

Student Test Title:
Characterize semantic confusion when email and password values are positionally swapped.

Student Primary Objective:
Observe behavior when a password-intended string is supplied as email and an email-intended string is supplied as password while both remain valid JSON string representations.

Why Existing AI Suite Missed This:
Existing AI tests vary credential correctness independently but do not isolate semantic role reversal.

AI-Miss Category:
INSUFFICIENT_STATE_COMBINATION

Primary Technique:
INTERACTION

Coverage Delta:
NEW_INTERACTION

TB Refs:
TB-FR02-002, TB-FR02-003, TB-FR02-007

PARAM / DIM Refs:
P-FR02-001, P-FR02-002

EP Refs:
EP-FR02-002, EP-FR02-007

INT Refs:
NONE

Blocker Refs:
BLK-FR02-001, BLK-FR02-004

Preconditions:
Two JSON string representations with distinguishable email-intended and password-intended semantic roles are available.

Logical Input Condition:
The two representations are supplied in the opposite credential-field positions.

Logical Action:
Submit the login operation and record handling of the role-reversal interaction.

Expected / Observation Strategy:
Distinguish positional role reversal from ordinary wrong-email or wrong-password conditions. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-002, TC-API-006; relationship: PARTIAL_OVERLAP; independent value: Semantic role reversal is a two-field interaction, distinct from a generic non-matching credential pair.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-169

Historical AI-Candidate Overlap:
LOW thematic overlap with credential-representation interaction; closest: STUDENT-FR02-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR02-06

Slot ID:
HUMAN-FR02-06

Feature:
FR-02

Student Proposal ID:
TC-PROP-FR02-06

Student Test Title:
Observe throttling or rate-control signals across repeated login requests.

Student Primary Objective:
Characterize observable rate-control behavior across multiple closely spaced requests independently of account-lockout semantics.

Why Existing AI Suite Missed This:
AI repetition cases focus on login/account state and do not isolate rate-control observation.

AI-Miss Category:
INSUFFICIENT_SEQUENCE_DEPTH

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_SEQUENCE + NEW_SECURITY_PERSPECTIVE

TB Refs:
TB-FR02-001, TB-FR02-007

PARAM / DIM Refs:
P-FR02-001, P-FR02-002

EP Refs:
EP-FR02-001, EP-FR02-006

INT Refs:
NONE

Blocker Refs:
BLK-FR02-002, BLK-FR02-004, BLK-ALL-001

Preconditions:
A stable logical login condition can be repeated. Request count and pacing remain abstract until concrete-data design.

Logical Input Condition:
The same logical login request class is submitted multiple times at a closely spaced but not-yet-concretized cadence.

Logical Action:
Issue the sequence to the documented login interface and record response/status/header/timing signals without attributing them to a specific layer.

Expected / Observation Strategy:
Compare observable responses across request positions independently from a claimed account-lockout transition. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-013, TC-API-077, TC-API-089–093; relationship: PARTIAL_OVERLAP; independent value: Focuses on interface-visible request-pacing signals rather than account lockout state.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-170

Historical AI-Candidate Overlap:
PARTIAL overlap with repeated-request failure-contract observation; closest: STUDENT-FR02-02.

Atomicity:
ONE_PRIMARY_OBJECTIVE — request-pacing sequence.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR02-07

Slot ID:
HUMAN-FR02-07

Feature:
FR-02

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

### HUMAN-FR02-08

Slot ID:
HUMAN-FR02-08

Feature:
FR-02

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

## 3. FR-07 Worksheet Slots

### HUMAN-FR07-01

Slot ID:
HUMAN-FR07-01

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-01

Student Test Title:
Observe handling of a negative-number-shaped quantity value.

Student Primary Objective:
Characterize behavior when quantity belongs to the negative-number subclass while all other documented members remain nominal.

Why Existing AI Suite Missed This:
TC-API-150 keeps all non-example numbers broad and does not independently focus sign risk.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
DOMAIN

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR07-005, TB-FR07-009, TB-FR07-010

PARAM / DIM Refs:
PARAM-FR07-006, DIM-FR07-001

EP Refs:
EP-FR07-023

INT Refs:
INT-FR07-003

Blocker Refs:
BLK-FR07-001, BLK-FR07-003, BLK-FR07-010

Preconditions:
Documented authentication and JSON-shaped body contexts are available; unrelated members remain nominal.

Logical Input Condition:
Quantity uses the negative-number subclass. No invalidity or boundary is inferred.

Logical Action:
Invoke POST Cart once with only quantity varied and record observable behavior.

Expected / Observation Strategy:
Record handling of the negative-number human-risk subclass. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-150; relationship: PARTIAL_OVERLAP; independent value: Isolates the sign-related human-risk subclass within the broad number-shaped quantity EP.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-171

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR07-02

Slot ID:
HUMAN-FR07-02

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-02

Student Test Title:
Observe handling of a fractional quantity representation.

Student Primary Objective:
Characterize behavior when quantity is represented by a fractional numeric value while other members remain nominal.

Why Existing AI Suite Missed This:
TC-API-150 keeps all non-example numbers broad and does not independently focus fractional representation risk.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
DOMAIN

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR07-005, TB-FR07-009, TB-FR07-010

PARAM / DIM Refs:
PARAM-FR07-006, DIM-FR07-001

EP Refs:
EP-FR07-023

INT Refs:
INT-FR07-003

Blocker Refs:
BLK-FR07-001, BLK-FR07-003, BLK-FR07-010

Preconditions:
Documented authentication and JSON-shaped body contexts are available; unrelated members remain nominal.

Logical Input Condition:
Quantity uses a fractional numeric representation. No integer-only rule or boundary is inferred.

Logical Action:
Invoke POST Cart once with only quantity varied and record observable behavior.

Expected / Observation Strategy:
Record handling of the fractional-number human-risk subclass. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-150; relationship: PARTIAL_OVERLAP; independent value: Isolates the fractional-representation human-risk subclass within the broad number-shaped quantity EP.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-172

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR07-03

Slot ID:
HUMAN-FR07-03

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-03

Student Test Title:
Observe the response Content-Type contract for GET Cart.

Student Primary Objective:
Record the actual response media-type / Content-Type representation independently from response-body observations.

Why Existing AI Suite Missed This:
The AI response-contract case is broad and does not dedicate an independent media-type oracle.

AI-Miss Category:
ORACLE_NOT_ISOLATED

Primary Technique:
SCHEMA

Coverage Delta:
NEW_ORACLE_ISOLATION

TB Refs:
TB-FR07-003, TB-FR07-011

PARAM / DIM Refs:
PARAM-FR07-001

EP Refs:
EP-FR07-032

INT Refs:
NONE

Blocker Refs:
BLK-FR07-008, BLK-FR07-012

Preconditions:
A documented GET Cart authentication context is available.

Logical Input Condition:
One nominal GET Cart invocation; the response media type is the isolated observation target.

Logical Action:
Invoke GET Cart and record the response Content-Type/media-type representation separately from body content.

Expected / Observation Strategy:
Produce a reproducible response-media-type observation without adopting it as a requirement. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-162; relationship: PARTIAL_OVERLAP; independent value: Separates response media type from TC-API-162's broader response-contract characterization.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-173

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR07-04

Slot ID:
HUMAN-FR07-04

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-04

Student Test Title:
Observe the response Content-Type contract for POST Cart.

Student Primary Objective:
Record the response Content-Type independently from body semantic observations for the Cart mutation endpoint.

Why Existing AI Suite Missed This:
The AI response/mutation case is broad and does not dedicate an independent media-type oracle.

AI-Miss Category:
ORACLE_NOT_ISOLATED

Primary Technique:
SCHEMA

Coverage Delta:
NEW_ORACLE_ISOLATION

TB Refs:
TB-FR07-010, TB-FR07-012

PARAM / DIM Refs:
PARAM-FR07-002

EP Refs:
EP-FR07-034

INT Refs:
NONE

Blocker Refs:
BLK-FR07-005, BLK-FR07-008

Preconditions:
Documented POST Cart authentication and logical body contexts are available.

Logical Input Condition:
One nominal POST Cart invocation; the response media type is the isolated observation target.

Logical Action:
Invoke POST Cart and record the response Content-Type/media-type representation separately from body/state observations.

Expected / Observation Strategy:
Produce a reproducible response-media-type observation without adopting it as a requirement. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-163; relationship: PARTIAL_OVERLAP; independent value: Separates response media type from TC-API-163's broader response/mutation-result characterization.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-174

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR07-05

Slot ID:
HUMAN-FR07-05

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-05

Student Test Title:
Observe handling of an array-shaped Cart request body.

Student Primary Objective:
Characterize behavior when the request-body top-level representation is an array of item-like objects rather than the documented single-object shape.

Why Existing AI Suite Missed This:
Existing AI cases cover the documented object and broad non-JSON shape but not a structured array subclass.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR07-005

PARAM / DIM Refs:
DIM-FR07-001

EP Refs:
EP-FR07-007, EP-FR07-009

INT Refs:
INT-FR07-003

Blocker Refs:
BLK-FR07-001, BLK-FR07-008

Preconditions:
A documented authentication context is available. The body remains syntactically JSON.

Logical Input Condition:
The top-level JSON representation is an array of item-like objects rather than the documented single-object example.

Logical Action:
Invoke POST Cart with the array-shaped body and record interface-visible handling.

Expected / Observation Strategy:
Distinguish structured JSON-array handling from nominal-object and non-JSON representation classes. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-133, TC-API-140; relationship: PARTIAL_OVERLAP; independent value: Isolates a structured JSON array top level, distinct from the documented object and a non-JSON/malformed representation.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-175

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR07-06

Slot ID:
HUMAN-FR07-06

Feature:
FR-07

Student Proposal ID:
TC-PROP-FR07-06

Student Test Title:
Observe handling of an extreme-magnitude numeric Cart member.

Student Primary Objective:
Characterize processing of an unusually large-magnitude numeric representation in a numeric Cart member without claiming a documented upper boundary.

Why Existing AI Suite Missed This:
AI number-shaped cases are broad and do not independently focus magnitude risk.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR07-005, TB-FR07-006, TB-FR07-008, TB-FR07-009, TB-FR07-010

PARAM / DIM Refs:
PARAM-FR07-003, PARAM-FR07-005, PARAM-FR07-006, DIM-FR07-001

EP Refs:
EP-FR07-011, EP-FR07-019, EP-FR07-023

INT Refs:
INT-FR07-003

Blocker Refs:
BLK-FR07-001, BLK-FR07-002, BLK-FR07-003, BLK-FR07-009, BLK-FR07-010

Preconditions:
Documented authentication and JSON body contexts are available; unrelated members remain nominal.

Logical Input Condition:
Exactly one numeric Cart member uses an unusually large-magnitude number-shaped representation; no exact magnitude or upper boundary is selected yet.

Logical Action:
Invoke one execution per selected numeric-member position, varying only that member and recording observable handling.

Expected / Observation Strategy:
Compare handling of the same extreme-magnitude risk class by numeric-member position. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-141, TC-API-147, TC-API-150; relationship: PARTIAL_OVERLAP; independent value: Isolates magnitude risk within existing broad number-shaped member EPs; one member is varied per execution.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-176

Historical AI-Candidate Overlap:
NOT_APPLICABLE — FR-07 had no historical extension candidates; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE — magnitude risk; member positions are controlled execution variants.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR07-07

Slot ID:
HUMAN-FR07-07

Feature:
FR-07

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

### HUMAN-FR07-08

Slot ID:
HUMAN-FR07-08

Feature:
FR-07

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

## 4. FR-18 Worksheet Slots

### HUMAN-FR18-01

Slot ID:
HUMAN-FR18-01

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-01

Student Test Title:
Observe structured pagination/filter-shaped query-parameter behavior.

Student Primary Objective:
Characterize how the order-listing endpoint handles common structured query-parameter families such as pagination-shaped or filter-shaped parameters when those parameters are not defined by the current specification.

Why Existing AI Suite Missed This:
TC-API-119 treats one extra query member generically and does not isolate structured family semantics.

AI-Miss Category:
ROBUSTNESS_CLASS_UNDEREXPLORED

Primary Technique:
ROBUSTNESS

Coverage Delta:
NEW_ROBUSTNESS_PERSPECTIVE + HUMAN_RISK_SUBCLASS

TB Refs:
TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004

PARAM / DIM Refs:
P-FR18-001

EP Refs:
EP-FR18-001

INT Refs:
NONE

Blocker Refs:
BLK-FR18-005

Preconditions:
An authenticated Admin context is available. No query support is presumed.

Logical Input Condition:
One structured semantic query-parameter family is selected per execution; exact names/values remain deferred.

Logical Action:
Invoke the documented Admin order-list endpoint with the selected structured query family and record observable behavior.

Expected / Observation Strategy:
Distinguish structured semantic query-family handling from a generic extra query member. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-119; relationship: PARTIAL_OVERLAP; independent value: Targets one structured semantic query family per execution rather than an arbitrary undocumented query member.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-177

Historical AI-Candidate Overlap:
NONE; closest: NONE.

Atomicity:
ONE_PRIMARY_OBJECTIVE — structured query-family handling; one family per execution.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR18-02

Slot ID:
HUMAN-FR18-02

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-02

Student Test Title:
Characterize order-list sort stability across repeated reads without mutation.

Student Primary Objective:
Compare ordering of the observable order-list sequence across repeated reads when no intentional intervening mutation occurs.

Why Existing AI Suite Missed This:
The broad repeated-read AI case explicitly avoids an isolated ordering oracle.

AI-Miss Category:
ORACLE_NOT_ISOLATED

Primary Technique:
SEQUENCE

Coverage Delta:
NEW_STATE_OBSERVATION + NEW_ORACLE_ISOLATION

TB Refs:
TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004

PARAM / DIM Refs:
P-FR18-001

EP Refs:
EP-FR18-001

INT Refs:
NONE

Blocker Refs:
BLK-FR18-005

Preconditions:
An authenticated Admin context is available and no intentional intervening mutation occurs.

Logical Input Condition:
The same Admin order-list read condition is repeated.

Logical Action:
Retrieve the list repeatedly and compare only observable element ordering.

Expected / Observation Strategy:
Record whether observable element ordering changes across the controlled read sequence. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-120; relationship: PARTIAL_OVERLAP; independent value: TC-API-120 compares collections without independently evaluating element ordering.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-178

Historical AI-Candidate Overlap:
LOW thematic overlap with cross-request consistency; closest: STUDENT-FR18-06.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR18-03

Slot ID:
HUMAN-FR18-03

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-03

Student Test Title:
Observe the response Content-Type contract for admin order listing.

Student Primary Objective:
Record response Content-Type independently from body/schema observations.

Why Existing AI Suite Missed This:
TC-API-116 records multiple response facets together; this student proposal isolates media type.

AI-Miss Category:
ORACLE_NOT_ISOLATED

Primary Technique:
SCHEMA

Coverage Delta:
NEW_ORACLE_ISOLATION

TB Refs:
TB-FR18-001, TB-FR18-002, TB-FR18-003, TB-FR18-004

PARAM / DIM Refs:
P-FR18-001

EP Refs:
EP-FR18-001

INT Refs:
NONE

Blocker Refs:
BLK-FR18-005

Preconditions:
An authenticated Admin context is available.

Logical Input Condition:
One nominal Admin order-list invocation; response media type is the isolated observation target.

Logical Action:
Invoke GET /api/admin/orders and record Content-Type/media type separately from response body.

Expected / Observation Strategy:
Produce a reproducible response-media-type observation. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-116; relationship: PARTIAL_OVERLAP; independent value: Creates a focused media-type oracle separate from TC-API-116's broad response-schema characterization.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-179

Historical AI-Candidate Overlap:
PARTIAL schema-theme overlap; closest: STUDENT-FR18-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR18-04

Slot ID:
HUMAN-FR18-04

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-04

Student Test Title:
Observe the response Content-Type contract for status update.

Student Primary Objective:
Record response Content-Type independently from status-update semantic and state observations.

Why Existing AI Suite Missed This:
TC-API-121 records multiple response facets together; this student proposal isolates media type.

AI-Miss Category:
ORACLE_NOT_ISOLATED

Primary Technique:
SCHEMA

Coverage Delta:
NEW_ORACLE_ISOLATION

TB Refs:
TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008, TB-FR18-009, TB-FR18-010

PARAM / DIM Refs:
P-FR18-002, P-FR18-003, P-FR18-004

EP Refs:
EP-FR18-005, EP-FR18-009, EP-FR18-013

INT Refs:
NONE

Blocker Refs:
BLK-FR18-001, BLK-FR18-005

Preconditions:
An authenticated Admin, an existing order, and one documented target-status class are available; transition validity remains unspecified.

Logical Input Condition:
One status-update invocation; response media type is the isolated observation target.

Logical Action:
Invoke the documented status-update endpoint and record Content-Type/media type separately from body/state observations.

Expected / Observation Strategy:
Produce a reproducible status-update response-media-type observation. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-121; relationship: PARTIAL_OVERLAP; independent value: Creates a focused media-type oracle separate from TC-API-121's broad update-response characterization.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT

Final TC-API ID:
TC-API-180

Historical AI-Candidate Overlap:
PARTIAL schema-theme overlap; closest: STUDENT-FR18-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE.

Adoption Decision:
ACCEPT

### HUMAN-FR18-05

Slot ID:
HUMAN-FR18-05

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-05

Student Test Title:
Observe handling of an identifier representation outside the documented identifier shape.

Student Primary Objective:
Characterize handling of a path identifier representation that does not conform to the documented identifier representation, if such a representation is explicitly established by the canonical test basis.

Why Existing AI Suite Missed This:
The proposed class is already the objective of TC-API-060 and cannot be distinguished by a documented identifier shape.

AI-Miss Category:
OVER_GENERALIZATION

Primary Technique:
DOMAIN

Coverage Delta:
NONE — no independent class established

TB Refs:
TB-FR18-005

PARAM / DIM Refs:
P-FR18-003

EP Refs:
EP-FR18-012

INT Refs:
NONE

Blocker Refs:
BLK-FR18-003

Preconditions:
Not integrated; no specification-backed identifier shape can establish the proposed contrast.

Logical Input Condition:
Student-proposed undocumented identifier representation; no distinct canonical subclass exists.

Logical Action:
Not integrated.

Expected / Observation Strategy:
Not integrated. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-058, TC-API-060; relationship: DUPLICATE; independent value: NONE — the specification defines no identifier shape, and TC-API-060 already covers the undocumented format/type region.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
REJECT_NO_INDEPENDENT_VALUE

Final TC-API ID:
NONE

Historical AI-Candidate Overlap:
LOW path-identity theme overlap; closest: STUDENT-FR18-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE, but duplicate.

Adoption Decision:
REJECT_NO_INDEPENDENT_VALUE

### HUMAN-FR18-06

Slot ID:
HUMAN-FR18-06

Feature:
FR-18

Student Proposal ID:
TC-PROP-FR18-06

Student Test Title:
Observe in-scope traceability metadata associated with a status-update action.

Student Primary Objective:
Characterize whether the status-update interaction exposes any observable traceability metadata or other in-scope evidence associated with the mutation.

Why Existing AI Suite Missed This:
The AI response-schema case is broad and does not isolate a security/traceability observation perspective.

AI-Miss Category:
SECURITY_CONTEXT_UNDEREXPLORED

Primary Technique:
SECURITY

Coverage Delta:
NEW_SECURITY_PERSPECTIVE + NEW_ORACLE_ISOLATION

TB Refs:
TB-FR18-005, TB-FR18-006, TB-FR18-007, TB-FR18-008, TB-FR18-009, TB-FR18-010

PARAM / DIM Refs:
P-FR18-002, P-FR18-003, P-FR18-004

EP Refs:
EP-FR18-005, EP-FR18-009, EP-FR18-013

INT Refs:
NONE

Blocker Refs:
BLK-FR18-001, BLK-FR18-005, BLK-ALL-001

Preconditions:
An authenticated Admin, existing order, and documented target-status class are available. No audit-log endpoint or storage mechanism is presumed.

Logical Input Condition:
One in-scope status-update interaction; only response headers/body already exposed by the endpoint are observation channels.

Logical Action:
Invoke the status-update endpoint and record whether traceability-oriented metadata is observable within the existing response interface.

Expected / Observation Strategy:
Record the presence or absence and representation of traceability-oriented metadata visible through the existing endpoint response. No unsupported hard oracle is asserted.

Duplicate Comparison:
Closest AI tests: TC-API-121; relationship: PARTIAL_OVERLAP; independent value: Restricts the observation to traceability-oriented metadata visible in the existing response interface, distinct from generic body-schema inventory.

Student Authorship Confirmation:
PROVENANCE RECORDED — STUDENT PROVIDED PROPOSAL BEFORE CODEX INTEGRATION

Validation Result:
ACCEPT_WITH_METADATA_NORMALIZATION

Final TC-API ID:
TC-API-181

Historical AI-Candidate Overlap:
PARTIAL response-schema theme overlap; closest: STUDENT-FR18-07.

Atomicity:
ONE_PRIMARY_OBJECTIVE — in-scope response metadata only.

Adoption Decision:
ACCEPT_WITH_METADATA_NORMALIZATION

### HUMAN-FR18-07

Slot ID:
HUMAN-FR18-07

Feature:
FR-18

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

### HUMAN-FR18-08

Slot ID:
HUMAN-FR18-08

Feature:
FR-18

Student Test Title:
STUDENT TO COMPLETE

Student Primary Objective:
STUDENT TO COMPLETE

Why Existing AI Suite Missed This:
STUDENT TO COMPLETE

AI-Miss Category:
STUDENT TO COMPLETE

Primary Technique:
STUDENT TO COMPLETE

Coverage Delta:
STUDENT TO COMPLETE

TB Refs:
STUDENT TO COMPLETE

PARAM / DIM Refs:
STUDENT TO COMPLETE

EP Refs:
STUDENT TO COMPLETE

INT Refs:
STUDENT TO COMPLETE

Blocker Refs:
STUDENT TO COMPLETE

Preconditions:
STUDENT TO COMPLETE

Logical Input Condition:
STUDENT TO COMPLETE

Logical Action:
STUDENT TO COMPLETE

Expected / Observation Strategy:
STUDENT TO COMPLETE

Duplicate Comparison:
STUDENT TO COMPLETE

Student Authorship Confirmation:
STUDENT TO COMPLETE

Adoption Decision:
PENDING STUDENT DECISION

## 5. Gap-to-Slot Mapping

This optional mapping contains opportunity IDs only and is not a testcase recommendation. The student may ignore or change it.

| Slot | Suggested Opportunity Areas |
| --- | --- |
| HUMAN-FR02-01 | EXTGAP-FR02-001 |
| HUMAN-FR02-02 | EXTGAP-FR02-002 |
| HUMAN-FR02-03 | EXTGAP-FR02-003 |
| HUMAN-FR02-04 | EXTGAP-FR02-004 |
| HUMAN-FR02-05 | EXTGAP-FR02-005 |
| HUMAN-FR02-06 | EXTGAP-FR02-006 |
| HUMAN-FR02-07 | EXTGAP-FR02-007 |
| HUMAN-FR02-08 | EXTGAP-FR02-008 |
| HUMAN-FR07-01 | EXTGAP-FR07-001 |
| HUMAN-FR07-02 | EXTGAP-FR07-002 |
| HUMAN-FR07-03 | EXTGAP-FR07-003 |
| HUMAN-FR07-04 | EXTGAP-FR07-004 |
| HUMAN-FR07-05 | EXTGAP-FR07-005 |
| HUMAN-FR07-06 | EXTGAP-FR07-006 |
| HUMAN-FR07-07 | EXTGAP-FR07-007 |
| HUMAN-FR07-08 | EXTGAP-FR07-008 |
| HUMAN-FR18-01 | EXTGAP-FR18-001 |
| HUMAN-FR18-02 | EXTGAP-FR18-002 |
| HUMAN-FR18-03 | EXTGAP-FR18-003 |
| HUMAN-FR18-04 | EXTGAP-FR18-004 |
| HUMAN-FR18-05 | EXTGAP-FR18-005 |
| HUMAN-FR18-06 | EXTGAP-FR18-006 |
| HUMAN-FR18-07 | EXTGAP-FR18-007 |
| HUMAN-FR18-08 | EXTGAP-FR18-008 |

## 6. Adoption, Provenance, and Validation

Before adopting a slot, the student must:

1. demonstrate an independent coverage delta;
2. compare it with all 105 current AI-generated cases;
3. compare FR-02/FR-18 ideas with historical AI-assisted candidates;
4. disclose any substantial overlap;
5. retain blockers and unspecified behavior;
6. independently provide the authorship confirmation;
7. accept at least five slots per feature.

```text
FR-07 previous student extension:
NONE

FR-07 current human extension:
NOT STARTED

AI-generated extension tests:
0

AI-assisted candidate tests generated:
0

HUMAN_ADDED tests:
0
```

| Validation Item | Count / Result |
| --- | --- |
| Human worksheet slots | 24 |
| FR-02 slots | 8 |
| FR-07 slots | 8 |
| FR-18 slots | 8 |
| Student-owned substantive fields pre-filled | 0 |
| New TC-API IDs allocated | 0 |
| Current AI suite modified | NO |



