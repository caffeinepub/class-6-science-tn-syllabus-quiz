import type { QuizState, QuizResult } from './types';

export function calculateScore(quizState: QuizState): QuizResult {
  const totalQuestions = quizState.questions.length;
  let correctAnswers = 0;

  for (const answer of quizState.answers) {
    const question = quizState.questions.find(q => q.id === answer.questionId);
    if (question && answer.selectedOption !== null && question.correctAnswer === answer.selectedOption) {
      correctAnswers++;
    }
  }

  const percentage = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100) 
    : 0;

  return {
    totalQuestions,
    correctAnswers,
    percentage,
  };
}
