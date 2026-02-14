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

