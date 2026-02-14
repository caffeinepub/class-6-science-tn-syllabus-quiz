import type { Question } from './types';

interface ValidationResult {
  success: boolean;
  questions?: Question[];
  error?: string;
}

/**
 * Normalizes a string for comparison by trimming whitespace, converting to lowercase,
 * and removing common punctuation.
 */
function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?()]/g, '');
}

/**
 * Attempts to find the index of a text answer within the options array.
 * Uses normalized comparison to handle case and whitespace differences.
 */
function findAnswerIndex(answerText: string, options: string[]): number {
  const normalizedAnswer = normalizeText(answerText);
  
  // First try exact normalized match
  for (let i = 0; i < options.length; i++) {
    if (normalizeText(options[i]) === normalizedAnswer) {
      return i;
    }
  }
  
  // Try partial match - answer text contains option or option contains answer
  for (let i = 0; i < options.length; i++) {
    const normalizedOption = normalizeText(options[i]);
    if (normalizedAnswer.includes(normalizedOption) || normalizedOption.includes(normalizedAnswer)) {
      return i;
    }
  }
  
  return -1;
}

export function validateQuestions(data: unknown): ValidationResult {
  if (!Array.isArray(data)) {
    return {
      success: false,
      error: 'Questions data must be an array. Please check the questions.js file format.',
    };
  }

  if (data.length === 0) {
    return {
      success: false,
      error: 'Questions array is empty. Please add questions to the questions.js file.',
    };
  }

  const validatedQuestions: Question[] = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const questionNum = i + 1;

    if (!item || typeof item !== 'object') {
      return {
        success: false,
        error: `Question ${questionNum}: Must be an object with question, options, and correctAnswer fields.`,
      };
    }

    if (typeof item.question !== 'string' || item.question.trim() === '') {
      return {
        success: false,
        error: `Question ${questionNum}: "question" field must be a non-empty string.`,
      };
    }

    if (!Array.isArray(item.options) || item.options.length === 0) {
      return {
        success: false,
        error: `Question ${questionNum}: "options" must be a non-empty array of strings.`,
      };
    }

    for (let j = 0; j < item.options.length; j++) {
      if (typeof item.options[j] !== 'string' || item.options[j].trim() === '') {
        return {
          success: false,
          error: `Question ${questionNum}: Option ${j + 1} must be a non-empty string.`,
        };
      }
    }

    // Determine correct answer index
    let correctAnswer = -1;

    // Check for numeric index fields
    if (typeof item.correctAnswer === 'number') {
      correctAnswer = item.correctAnswer;
    } else if (typeof item.correctIndex === 'number') {
      correctAnswer = item.correctIndex;
    } 
    // Check for text answer field
    else if (typeof item.answer === 'string') {
      correctAnswer = findAnswerIndex(item.answer, item.options);
      
      if (correctAnswer === -1) {
        return {
          success: false,
          error: `Question ${questionNum}: Could not match answer "${item.answer}" to any of the options: [${item.options.join(', ')}]. Please verify the answer text matches one of the options.`,
        };
      }
    }

    // Validate the final correctAnswer index
    if (correctAnswer < 0 || correctAnswer >= item.options.length) {
      return {
        success: false,
        error: `Question ${questionNum}: "correctAnswer" must be a valid index (0-${item.options.length - 1}) or a text answer matching one of the options.`,
      };
    }

    validatedQuestions.push({
      id: item.id ? String(item.id) : `q${i + 1}`,
      question: item.question,
      options: item.options,
      correctAnswer,
      chapter: item.chapter,
      topic: item.topic,
      unit: item.unit,
    });
  }

  return {
    success: true,
    questions: validatedQuestions,
  };
}
