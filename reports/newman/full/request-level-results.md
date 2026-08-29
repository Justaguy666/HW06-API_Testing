# Authoritative Request-Level Results

| Request | Parent Test ID | Feature | HTTP Status | Newman Error | Assertion Failures | Execution Time |
| ------- | -------------- | ------- | ----------: | ------------ | -----------------: | -------------: |
| [SETUP-002] Register Primary User | SETUP-002 | SETUP | 200 | — | 0 | 38 ms |
| [SETUP-003] Login Primary User | SETUP-003 | SETUP | 200 | — | 0 | 5 ms |
| [SETUP-004] Register Secondary User | SETUP-004 | SETUP | 200 | — | 0 | 16 ms |
| [SETUP-004] Login Secondary User | SETUP-004 | SETUP | 200 | — | 0 | 4 ms |
| [SETUP-006] Discover Existing Product | SETUP-006 | SETUP | 200 | — | 0 | 4 ms |
| [SETUP-006] Confirm Existing Product | SETUP-006 | SETUP | 200 | — | 0 | 3 ms |
| [SETUP-007] Verify Missing Product Candidate | SETUP-007 | SETUP | 200 | — | 0 | 4 ms |
| [SETUP-004] Register Wrong-Role User | SETUP-004 | SETUP | 200 | — | 0 | 23 ms |
| [SETUP-004] Login Wrong-Role User | SETUP-004 | SETUP | 200 | — | 0 | 4 ms |
| [SETUP-005] Login Admin | SETUP-005 | SETUP | 200 | — | 0 | 4 ms |
| [SETUP-009] Discover Existing Orders | SETUP-009 | SETUP | 200 | — | 0 | 4 ms |
| [TC-API-001] Verify successful login for an existing account-associated matching credential pair | TC-API-001 | FR-02 | 200 | — | 0 | 7 ms |
| [TC-API-002] Observe handling of an email not associated with a usable credential pair | TC-API-002 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-006] Observe handling of a password not matching the selected account | TC-API-006 | FR-02 | 401 | — | 0 | 4 ms |
| [TC-API-012] Observe the effect of request Authorization on login | TC-API-012 | FR-02 | 200 | — | 0 | 3 ms |
| [TC-API-074] Validate the documented successful-login transport status | TC-API-074 | FR-02 | 200 | — | 0 | 3 ms |
| [TC-API-075] Validate that successful login returns a JWT token value | TC-API-075 | FR-02 | 200 | — | 0 | 3 ms |
| [TC-API-076] Validate that successful login returns user information | TC-API-076 | FR-02 | 200 | — | 0 | 3 ms |
| [TC-API-077] Characterize the response contract for unsuccessful login | TC-API-077 | FR-02 | 401 | — | 0 | 5 ms |
| [TC-API-081] Observe tolerance of an undocumented login request member | TC-API-081 | FR-02 | 200 | — | 0 | 4 ms |
| [TC-API-082] Observe duplicate email-member handling at the representation layer | TC-API-082 | FR-02 | 200 | — | 0 | 4 ms |
| [TC-API-083] Observe duplicate password-member handling at the representation layer | TC-API-083 | FR-02 | 200 | — | 0 | 4 ms |
| [TC-API-084] Characterize surrounding-whitespace handling for email | TC-API-084 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-085] Characterize surrounding-whitespace handling for password | TC-API-085 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-086] Characterize email case-normalization behavior | TC-API-086 | FR-02 | 401 | — | 0 | 5 ms |
| [TC-API-087] Characterize password case sensitivity | TC-API-087 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-095] Audit successful user information for unintended sensitive-field exposure | TC-API-095 | FR-02 | 403 | — | 0 | 3 ms |
| [TC-API-003] Observe omitted email handling | TC-API-003 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-004] Observe null-like email handling | TC-API-004 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-005] Observe non-string email handling | TC-API-005 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-007] Observe omitted password handling | TC-API-007 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-008] Observe null-like password handling | TC-API-008 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-009] Observe non-string password handling | TC-API-009 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-010] Observe behavior when Content-Type is omitted | TC-API-010 | FR-02 | 403 | — | 0 | 2 ms |
| [TC-API-011] Observe non-JSON media-type handling | TC-API-011 | FR-02 | 500 | — | 0 | 4 ms |
| [TC-API-078] Observe handling when the request body is absent | TC-API-078 | FR-02 | 500 | — | 0 | 4 ms |
| [TC-API-079] Observe handling of an empty JSON object | TC-API-079 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-080] Observe handling when both documented credential fields are null-like | TC-API-080 | FR-02 | 401 | — | 0 | 3 ms |
| [TC-API-088] Observe malformed JSON representation handling | TC-API-088 | FR-02 | 400 | — | 0 | 3 ms |
| [TC-API-165] Observe handling of an extreme-length email representation | TC-API-165 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-166] Observe handling of an extreme-length password representation | TC-API-166 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Accented Latin Email | TC-API-167 | FR-02 | 401 | — | 0 | 3 ms |
| Step 2 - Non-Latin Email | TC-API-167 | FR-02 | 401 | — | 0 | 2 ms |
| Step 3 - Supplementary-Plane Password | TC-API-167 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Quotation Class | TC-API-168 | FR-02 | 401 | — | 0 | 4 ms |
| Step 2 - Bracket Class | TC-API-168 | FR-02 | 401 | — | 0 | 3 ms |
| Step 3 - Backslash Class | TC-API-168 | FR-02 | 401 | — | 0 | 2 ms |
| Step 4 - Escaped Newline Class | TC-API-168 | FR-02 | 401 | — | 0 | 2 ms |
| [TC-API-169] Characterize semantic confusion when email and password values are positionally swapped | TC-API-169 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 4 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 2 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 2 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 4 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 2 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 4 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 2 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 4 ms |
| Step 1 - Finite Rate-Control Probe | TC-API-170 | FR-02 | 401 | — | 0 | 3 ms |
| Step 1 - Failed Login Observation 1 | TC-API-013 | FR-02 | 403 | — | 0 | 3 ms |
| Step 2 - Failed Login Observation 2 | TC-API-013 | FR-02 | 403 | — | 0 | 5 ms |
| Step 3 - Failed Login Observation 3 | TC-API-013 | FR-02 | 403 | — | 0 | 2 ms |
| Step 4 - Matching Login Observation | TC-API-013 | FR-02 | 403 | — | 0 | 2 ms |
| Step 1 - First Successful Login | TC-API-089 | FR-02 | 403 | — | 0 | 3 ms |
| Step 2 - Second Successful Login | TC-API-089 | FR-02 | 403 | — | 0 | 2 ms |
| Step 1 - Successful Login | TC-API-090 | FR-02 | 403 | — | 0 | 3 ms |
| Step 2 - Failed Login Observation | TC-API-090 | FR-02 | 403 | — | 0 | 2 ms |
| Step 1 - Failed Login Observation | TC-API-091 | FR-02 | 403 | — | 0 | 3 ms |
| Step 2 - Successful Login Observation | TC-API-091 | FR-02 | 403 | — | 0 | 3 ms |
| Step 1 - Unknown Account Failure | TC-API-094 | FR-02 | 401 | — | 0 | 3 ms |
| Step 2 - Wrong Password Failure | TC-API-094 | FR-02 | 403 | — | 0 | 3 ms |
| [TC-API-130] GET Cart endpoint transport contract | TC-API-130 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-131] GET Cart retrieve-purpose contract | TC-API-131 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-135] GET Cart with authentication context absent | TC-API-135 | FR-07 | 401 | — | 0 | 2 ms |
| [TC-API-136] GET Cart with non-conforming authentication representation | TC-API-136 | FR-07 | 403 | — | 0 | 2 ms |
| [TC-API-156] Cart observation under the same authentication context | TC-API-156 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-162] GET Cart response-contract characterization | TC-API-162 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-173] Observe the response Content-Type contract for GET Cart | TC-API-173 | FR-07 | 200 | — | 0 | 2 ms |
| [TC-API-132] POST Cart endpoint transport contract | TC-API-132 | FR-07 | 200 | — | 0 | 2 ms |
| [TC-API-133] POST documented JSON request-shape contract | TC-API-133 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-134] POST add-to-Cart semantic-purpose contract | TC-API-134 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-137] POST Cart with authentication context absent | TC-API-137 | FR-07 | 401 | — | 0 | 2 ms |
| [TC-API-138] POST Cart with non-conforming authentication representation | TC-API-138 | FR-07 | 403 | — | 0 | 3 ms |
| [TC-API-139] POST Cart with request body absent | TC-API-139 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-140] POST Cart with non-JSON-shaped body representation | TC-API-140 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-141] POST Cart with another number-shaped id | TC-API-141 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-142] POST Cart with id omitted | TC-API-142 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-143] POST Cart with id representation unlike example | TC-API-143 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-144] POST Cart with another string-shaped name | TC-API-144 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-145] POST Cart with name omitted | TC-API-145 | FR-07 | 200 | — | 0 | 2 ms |
| [TC-API-146] POST Cart with name representation unlike example | TC-API-146 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-147] POST Cart with another number-shaped price | TC-API-147 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-148] POST Cart with price omitted | TC-API-148 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-149] POST Cart with price representation unlike example | TC-API-149 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-150] POST Cart with another number-shaped quantity | TC-API-150 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-151] POST Cart with quantity omitted | TC-API-151 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-152] POST Cart with quantity representation unlike example | TC-API-152 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-153] Price and quantity relationship observation | TC-API-153 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-154] Add with referenced resource established as existing | TC-API-154 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-155] Add with referenced resource established as non-existing | TC-API-155 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-163] POST Cart response and mutation-result characterization | TC-API-163 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-171] Observe handling of a negative-number-shaped quantity value | TC-API-171 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-172] Observe handling of a fractional quantity representation | TC-API-172 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-174] Observe the response Content-Type contract for POST Cart | TC-API-174 | FR-07 | 200 | — | 0 | 3 ms |
| [TC-API-175] Observe handling of an array-shaped Cart request body | TC-API-175 | FR-07 | 200 | — | 0 | 5 ms |
| Step 1 - User A GET Cart | TC-API-157 | FR-07 | 200 | — | 0 | 3 ms |
| Step 2 - User B GET Cart | TC-API-157 | FR-07 | 200 | — | 0 | 2 ms |
| Step 1 - First GET Cart | TC-API-158 | FR-07 | 200 | — | 0 | 4 ms |
| Step 2 - Later GET Cart | TC-API-158 | FR-07 | 200 | — | 0 | 4 ms |
| Step 1 - First GET Cart | TC-API-159 | FR-07 | 200 | — | 0 | 4 ms |
| Step 2 - Later GET Cart | TC-API-159 | FR-07 | 200 | — | 0 | 4 ms |
| Step 1 - First POST Cart | TC-API-160 | FR-07 | 200 | — | 0 | 3 ms |
| Step 2 - Repeated POST Cart | TC-API-160 | FR-07 | 200 | — | 0 | 4 ms |
| Step 1 - POST Cart | TC-API-161 | FR-07 | 200 | — | 0 | 4 ms |
| Step 2 - GET Cart Observation | TC-API-161 | FR-07 | 200 | — | 0 | 3 ms |
| Step 1 - Large ID Probe | TC-API-176 | FR-07 | 200 | — | 0 | 4 ms |
| Step 2 - Large Price Probe | TC-API-176 | FR-07 | 200 | — | 0 | 3 ms |
| Step 3 - Large Quantity Probe | TC-API-176 | FR-07 | 200 | — | 0 | 4 ms |
| [TC-API-046] Verify authenticated Admin can retrieve orders for the entire system | TC-API-046 | FR-18 | 200 | — | 0 | 4 ms |
| [TC-API-047] Verify non-Admin caller cannot access system-wide orders | TC-API-047 | FR-18 | 200 | — | 1 | 3 ms |
| [TC-API-048] Verify unauthenticated caller cannot access system-wide orders | TC-API-048 | FR-18 | 401 | — | 0 | 4 ms |
| [TC-API-049] Verify non-Bearer Authorization cannot access system-wide orders | TC-API-049 | FR-18 | 403 | — | 0 | 3 ms |
| [TC-API-116] Characterize the admin order-list response schema | TC-API-116 | FR-18 | 200 | — | 0 | 4 ms |
| [TC-API-117] Verify that Admin order listing is system-wide | TC-API-117 | FR-18 | 200 | — | 0 | 5 ms |
| [TC-API-119] Observe handling of an undocumented query parameter | TC-API-119 | FR-18 | 200 | — | 0 | 4 ms |
| [TC-API-179] Observe the response Content-Type contract for admin order listing | TC-API-179 | FR-18 | 200 | — | 0 | 5 ms |
| [TC-API-050] Verify target status pending once an authoritative source-state rule exists | TC-API-050 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-051] Verify target status confirmed once an authoritative source-state rule exists | TC-API-051 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-052] Verify target status shipping once an authoritative source-state rule exists | TC-API-052 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-053] Verify target status delivered once an authoritative source-state rule exists | TC-API-053 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-054] Verify target status canceled once an authoritative source-state rule exists | TC-API-054 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-055] Verify non-Admin caller cannot update order status | TC-API-055 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-056] Verify unauthenticated caller cannot update order status | TC-API-056 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-057] Verify non-Bearer Authorization cannot update order status | TC-API-057 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-058] Observe update behavior for non-existing order identifier | TC-API-058 | FR-18 | 404 | — | 0 | 4 ms |
| [TC-API-059] Verify omitted order identifier does not invoke documented update operation | TC-API-059 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-060] Observe undocumented order-ID representation handling | TC-API-060 | FR-18 | 404 | — | 0 | 5 ms |
| [TC-API-061] Verify status outside documented vocabulary is not applied | TC-API-061 | FR-18 | 404 | — | 0 | 6 ms |
| [TC-API-062] Observe omitted status handling | TC-API-062 | FR-18 | 404 | — | 0 | 1 ms |
| [TC-API-063] Observe null-like status handling | TC-API-063 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-064] Observe non-string status handling | TC-API-064 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-065] Observe omitted Content-Type behavior | TC-API-065 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-066] Observe non-JSON media-type behavior | TC-API-066 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-122] Observe handling when the status-update request body is absent | TC-API-122 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-123] Observe handling of an empty JSON object for status update | TC-API-123 | FR-18 | 404 | — | 0 | 2 ms |
| [TC-API-124] Observe tolerance of an undocumented request member during a nominal status update | TC-API-124 | FR-18 | 404 | — | 0 | 3 ms |
| [TC-API-129] Characterize authorization-versus-validation precedence | TC-API-129 | FR-18 | 404 | — | 0 | 4 ms |
| Step 1 - First Admin Order List | TC-API-120 | FR-18 | 200 | — | 0 | 4 ms |
| Step 2 - Second Admin Order List | TC-API-120 | FR-18 | 200 | — | 0 | 4 ms |
| [TC-API-125] Characterize an update whose target status equals the current status | TC-API-125 | FR-18 | 404 | — | 0 | 2 ms |
| Step 1 - First Status Target | TC-API-126 | FR-18 | 404 | — | 0 | 2 ms |
| Step 2 - Conflicting Status Target | TC-API-126 | FR-18 | 404 | — | 0 | 2 ms |
| Step 1 - Pagination-Shaped Query | TC-API-177 | FR-18 | 200 | — | 0 | 4 ms |
| Step 2 - Filter-Shaped Query | TC-API-177 | FR-18 | 200 | — | 0 | 5 ms |
| Step 1 - First Admin Order List | TC-API-178 | FR-18 | 200 | — | 0 | 4 ms |
| Step 2 - Second Admin Order List | TC-API-178 | FR-18 | 200 | — | 0 | 6 ms |
| [TC-API-180] Observe the response Content-Type contract for status update | TC-API-180 | FR-18 | 404 | — | 0 | 3 ms |
