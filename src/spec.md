# Specification

## Summary
**Goal:** Redeploy the app using a new Internet Computer canister ID and update the frontend configuration so it targets the newly deployed backend, while keeping any existing custom domain setup intact.

**Planned changes:**
- Provision/select a new canister ID (different from the previous deployment) and redeploy the app so it is served from the new canister.
- Update frontend canister/agent configuration used by `createActorWithConfig` to reference the newly deployed backend canister ID (without modifying immutable hook/main files).
- Verify custom domain setup remains consistent: keep `frontend/public/.well-known/ic-domains` containing `sciquiztn-knowledgebyte.in` exactly and avoid regressions in `frontend/CUSTOM_DOMAIN_DEPLOYMENT.md`.

**User-visible outcome:** The app is reachable at a new canister `icp0.io` URL, and the UI loads and connects to the backend without canister-resolution errors, with custom domain configuration unchanged.
