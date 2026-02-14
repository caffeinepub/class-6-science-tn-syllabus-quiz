export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter?: string;
  topic?: string;
  unit?: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number | null;
}

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
  shuffleEnabled: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
}
