# Specification

## Summary
**Goal:** Provide end-to-end guidance for publishing the existing web app to Google Play Store via Trusted Web Activity (Bubblewrap), and clarify that only Internet Identity authentication is supported in-app.

**Planned changes:**
- Update repository documentation with a step-by-step TWA/Bubblewrap workflow for producing signed Android build artifacts (AAB/APK), including package name/signing key guidance, required manifest/icon checks, Digital Asset Links verification, and Play Console release steps using the documented production domain.
- Add an in-app “Authentication” help section/screen explaining that Internet Identity is the supported sign-in method and that Firebase-based providers (Google, Microsoft/Outlook, phone OTP, email/password) are not available in this build environment.

**User-visible outcome:** Developers can follow the documentation to package and submit the app to the Play Console as a TWA, and users can view a clear in-app explanation of supported authentication (Internet Identity only).
