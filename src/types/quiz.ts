export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  explanation?: string;
}

export interface FreeResponseQuestion {
  id: string;
  type: 'free-response';
  question: string;
  correctAnswer: string;
  explanation?: string;
}

export type Question = MultipleChoiceQuestion | FreeResponseQuestion;

export interface QuizAttempt {
  questionId: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
  selfGraded?: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  attempts: QuizAttempt[];
  isSubmitted: boolean;
  isComplete: boolean;
}
