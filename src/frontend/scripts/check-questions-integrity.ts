#!/usr/bin/env node
/**
 * Questions Integrity Check Script
 * 
 * This script validates all quiz question data files (Class 6-10) to ensure:
 * 1. Files can be imported without syntax errors
 * 2. Data structure matches expected format
 * 3. All questions have valid correctAnswer indices
 * 
 * Run this before building AAB to catch data issues early.
 * 
 * Usage: node frontend/scripts/check-questions-integrity.ts
 * or: npm run check:questions (if added to package.json)
 */

import { validateQuestions } from '../src/quiz/validateQuestions.js';

interface QuestionFile {
  level: string;
  path: string;
  displayName: string;
}

const questionFiles: QuestionFile[] = [
  { level: '6', path: '../src/data/questions.js', displayName: 'Class 6' },
  { level: '7', path: '../src/data/questions_class7.js', displayName: 'Class 7' },
  { level: '8', path: '../src/data/questions_class8.js', displayName: 'Class 8' },
  { level: '9', path: '../src/data/questions_class9.js', displayName: 'Class 9' },
  { level: '10', path: '../src/data/questions_class10.js', displayName: 'Class 10' },
];

async function checkQuestionsIntegrity(): Promise<void> {
  console.log('🔍 Starting questions integrity check...\n');
  
  let hasErrors = false;
  const results: Array<{ level: string; status: 'pass' | 'fail'; message: string }> = [];

  for (const file of questionFiles) {
    try {
      console.log(`Checking ${file.displayName}...`);
      
      // Attempt to import the file
      let questionsData;
      try {
        const module = await import(file.path);
        questionsData = module.default;
      } catch (importError: unknown) {
        const errorMessage = importError instanceof Error ? importError.message : String(importError);
        hasErrors = true;
        results.push({
          level: file.displayName,
          status: 'fail',
          message: `❌ Import failed: ${errorMessage}`,
        });
        console.error(`  ❌ Failed to import: ${errorMessage}\n`);
        continue;
      }

      // Validate the data structure
      const validation = validateQuestions(questionsData);
      
      if (!validation.success) {
        hasErrors = true;
        results.push({
          level: file.displayName,
          status: 'fail',
          message: `❌ Validation failed: ${validation.error}`,
        });
        console.error(`  ❌ Validation failed: ${validation.error}\n`);
      } else {
        const questionCount = validation.questions?.length || 0;
        results.push({
          level: file.displayName,
          status: 'pass',
          message: `✅ Valid (${questionCount} questions)`,
        });
        console.log(`  ✅ Valid (${questionCount} questions)\n`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      hasErrors = true;
      results.push({
        level: file.displayName,
        status: 'fail',
        message: `❌ Unexpected error: ${errorMessage}`,
      });
      console.error(`  ❌ Unexpected error: ${errorMessage}\n`);
    }
  }

  // Print summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('QUESTIONS INTEGRITY CHECK SUMMARY');
  console.log('═══════════════════════════════════════════════════════\n');
  
  for (const result of results) {
    console.log(`${result.level}: ${result.message}`);
  }
  
  console.log('\n═══════════════════════════════════════════════════════\n');

  if (hasErrors) {
    console.error('❌ Questions integrity check FAILED');
    console.error('\nOne or more question files have errors. Please fix them before building.\n');
    console.error('Common issues:');
    console.error('  • Syntax errors (missing brackets, quotes, commas)');
    console.error('  • Truncated files (incomplete export statement)');
    console.error('  • Invalid correctAnswer indices');
    console.error('  • Missing required fields (question, options, correctAnswer)\n');
    process.exit(1);
  } else {
    console.log('✅ All question files passed integrity check!');
    console.log('Safe to proceed with build.\n');
    process.exit(0);
  }
}

// Run the check
checkQuestionsIntegrity().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('Fatal error running integrity check:', errorMessage);
  process.exit(1);
});
