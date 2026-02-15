# Science Quiz Application - Class 6, Class 7, Class 8, Class 9 & Class 10

A beautiful, interactive quiz application for Class 6, Class 7, Class 8, Class 9, and Class 10 Science (Tamil Nadu Syllabus).

## Features

- 📚 Multiple-choice questions covering Class 6, Class 7, Class 8, Class 9, and Class 10 Science topics
- 🔀 Optional shuffle mode to randomize question order
- 📊 Real-time progress tracking
- 🎯 Instant scoring and performance feedback
- 📝 Comprehensive answer review
- 🎨 Beautiful, responsive design with light/dark mode support
- 🔐 Secure authentication using Internet Identity
- 🎵 Background music with volume controls
- 📱 Fully responsive design

## Production Deployment

**Live URL:** `https://sciquiztn-knowledgebyte.in`

This app is deployed on the Internet Computer with a custom domain. For custom domain configuration details, see `frontend/CUSTOM_DOMAIN_DEPLOYMENT.md`.

## Google Play Store Publishing

Want to publish this app to the Google Play Store as an Android app? See the comprehensive guide:

📱 **[Play Store TWA Publishing Guide](./PLAY_STORE_TWA_PUBLISHING_GUIDE.md)**

This guide covers:
- Packaging the web app as a Trusted Web Activity (TWA) using Bubblewrap
- Digital Asset Links configuration for TWA verification
- Complete Play Console submission workflow
- Required assets and store listing preparation

**Note:** The production domain `https://sciquiztn-knowledgebyte.in` is used for TWA hosting and verification.

## Deployment

### Backend Canister Configuration

The frontend connects to the backend canister using configuration in `frontend/src/config.ts`. After deploying to a new canister ID:

1. Run `dfx generate backend` to update the canister ID references
2. The build process will automatically populate the canister ID from the dfx-generated files
3. The frontend reads the backend canister ID at runtime from environment variables or the generated canister configuration

**Important**: Always run `dfx generate backend` after deploying or redeploying the backend canister to ensure the frontend can connect properly.

## Quiz Levels

The application supports five quiz levels:
- **Class 6 Science** - Questions from `frontend/src/data/questions.js`
- **Class 7 Science** - Questions from `frontend/src/data/questions_class7.js`
- **Class 8 Science** - Questions from `frontend/src/data/questions_class8.js`
- **Class 9 Science** - Questions from `frontend/src/data/questions_class9.js`
- **Class 10 Science** - Questions from `frontend/src/data/questions_class10.js`

Users can switch between quiz levels using the tabs in the header (switching is only allowed on the start screen).

## Questions File Format

All quiz questions are stored in separate data files. These files can be edited to update questions without changing any other code.

### Class 6 Questions
File: `frontend/src/data/questions.js`

### Class 7 Questions
File: `frontend/src/data/questions_class7.js`

### Class 8 Questions
File: `frontend/src/data/questions_class8.js`

### Class 9 Questions
File: `frontend/src/data/questions_class9.js`

### Class 10 Questions
File: `frontend/src/data/questions_class10.js`

### Required Format

All questions files must export a default array of question objects. Each question must have:

- **question** (string): The question text
- **options** (string[]): Array of answer choices (minimum 2 options)
- **correctAnswer** (number): Index of the correct option (0-based) OR
- **answer** (string): Text of the correct answer (will be matched to options)

### Optional Fields

- **id** (string | number): Unique identifier (auto-generated if not provided)
- **unit** (string): Unit name or chapter
- **chapter** (string): Chapter name or number
- **topic** (string): Topic within the chapter

### Example

