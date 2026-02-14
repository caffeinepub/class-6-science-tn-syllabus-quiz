import { validateQuestions } from './validateQuestions';
import type { Question } from './types';
import questionsClass6 from '../data/questions.js';
import questionsClass7 from '../data/questions_class7.js';
import questionsClass8 from '../data/questions_class8.js';
import questionsClass9 from '../data/questions_class9.js';
import questionsClass10 from '../data/questions_class10.js';

interface LoadResult {
  success: boolean;
  questions?: Question[];
  error?: string;
}

export function loadQuestions(quizLevel: 'class6' | 'class7' | 'class8' | 'class9' | 'class10' = 'class6'): LoadResult {
  try {
    // Select the appropriate questions data based on quiz level
    const questionsData = 
      quizLevel === 'class10' ? questionsClass10 :
      quizLevel === 'class9' ? questionsClass9 :
      quizLevel === 'class8' ? questionsClass8 :
      quizLevel === 'class7' ? questionsClass7 :
      questionsClass6;
    
    const levelLabel = 
      quizLevel === 'class10' ? 'Class 10' :
      quizLevel === 'class9' ? 'Class 9' :
      quizLevel === 'class8' ? 'Class 8' :
      quizLevel === 'class7' ? 'Class 7' :
      'Class 6';
    
    // Validate the questions
    const result = validateQuestions(questionsData);
    
    // If validation failed, add level context to error message
    if (!result.success && result.error) {
      return {
        success: false,
        error: `${levelLabel}: ${result.error}`,
      };
    }
    
    return result;
  } catch (error) {
    const levelLabel = 
      quizLevel === 'class10' ? 'Class 10' :
      quizLevel === 'class9' ? 'Class 9' :
      quizLevel === 'class8' ? 'Class 8' :
      quizLevel === 'class7' ? 'Class 7' :
      'Class 6';
    
    if (error instanceof Error) {
      if (error.message.includes('Cannot find module')) {
        const fileName = 
          quizLevel === 'class10' ? 'questions_class10.js' :
          quizLevel === 'class9' ? 'questions_class9.js' :
          quizLevel === 'class8' ? 'questions_class8.js' :
          quizLevel === 'class7' ? 'questions_class7.js' :
          'questions.js';
        return {
          success: false,
          error: `${levelLabel} questions file not found. Please create frontend/src/data/${fileName} with your quiz questions.`,
        };
      }
      return {
        success: false,
        error: `${levelLabel}: Error loading questions: ${error.message}`,
      };
    }
    return {
      success: false,
      error: `${levelLabel}: An unexpected error occurred while loading questions.`,
    };
  }
}
