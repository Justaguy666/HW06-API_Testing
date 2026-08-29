# SETUP-007 Missing-Product Diagnostic

Authoritative evidence showed the generated candidate request completed with HTTP 200 and an empty JSON object. The existing setup script retains a candidate only when the response is non-2xx, so `missing_product_id` was cleared.

The API specification documents product listing/detail operations but does not define missing-product status, body semantics, identifier allocation, or a deletion/provisioning mechanism that guarantees absence. Treating an empty object as a normative absence contract would invent behavior.

Final classification:

```text
TEST_DATA_SETUP_LIMITATION
```

Affected authoritative testcase: TC-API-155. The logical testcase remains valid; its absence precondition cannot currently be established with a specification-supported oracle.

