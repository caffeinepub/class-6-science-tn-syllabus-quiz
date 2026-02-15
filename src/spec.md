# Specification

## Summary
**Goal:** Unblock frontend deployment and Android AAB packaging by repairing malformed quiz question datasets and adding a fail-fast integrity check to the build workflow.

**Planned changes:**
- Repair/complete the quiz question data modules for Class 6–10 so each file is a valid JavaScript module exporting a complete default array and the frontend bundler can compile.
- Add a pre-build questions integrity check that imports all Class 6–10 datasets and runs the existing question validation logic, failing with clear English errors and a non-zero exit code when invalid.
- Update the Android AAB release build script to run the integrity check before Bubblewrap steps and stop early with a clear error if validation fails.

**User-visible outcome:** The app builds successfully without questions import/parse crashes, quizzes for Class 6–10 can start from level selection, and the AAB release build fails early with actionable errors if question data is broken.
