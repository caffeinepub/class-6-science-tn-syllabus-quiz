import type { QuizState } from './types';

export interface CommittedCounts {
  correct: number;
  wrong: number;
}

/**
 * Computes correct and wrong counts from committed quiz answers only.
 * Treats null selectedOption (timeouts) as wrong.
 */
export function getCommittedCounts(quizState: QuizState): CommittedCounts {
  let correct = 0;
  let wrong = 0;

  for (const answer of quizState.answers) {
    const question = quizState.questions.find(q => q.id === answer.questionId);
    if (!question) continue;

    if (answer.selectedOption !== null && answer.selectedOption === question.correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  }

  return { correct, wrong };
}
