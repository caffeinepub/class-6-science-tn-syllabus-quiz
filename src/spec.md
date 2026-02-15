# Specification

## Summary
**Goal:** Configure the app to use the full custom domain `sciquiztn-knowledgebyte.in` on Internet Computer and add clear frontend documentation for custom-domain deployment plus Google Play Store publishing via Trusted Web Activity (Bubblewrap).

**Planned changes:**
- Update `frontend/public/.well-known/ic-domains` to include `sciquiztn-knowledgebyte.in` (full domain with TLD) so the app can be accessed via the custom domain.
- Update `frontend/CUSTOM_DOMAIN_DEPLOYMENT.md` with English, step-by-step instructions for connecting and verifying `sciquiztn-knowledgebyte.in`, explicitly pointing to `frontend/public/.well-known/ic-domains` and including a verification checklist.
- Add a new English guide under `frontend/` (or `frontend/docs/` if present) explaining how to publish the existing web app to Google Play using Bubblewrap/TWA, including prerequisites, build steps, start URL configuration, `.aab` output steps, and a Play Console submission checklist.
- Add required Play Store static images to `frontend/public/assets/generated/` and reference their exact filenames and intended usage from the TWA/Play Store publishing guide.

**User-visible outcome:** The app is reachable at `https://sciquiztn-knowledgebyte.in`, and the repo contains clear documentation for domain setup/verification and for packaging/submitting the web app to the Google Play Store via TWA, including referenced Play Store asset files.
