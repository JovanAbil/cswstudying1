export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: { label: string; value: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  table?: TableData;
  image?: string;
}

export interface FreeResponseQuestion {
  id: string;
  type: 'free-response';
  question: string;
  correctAnswer: string;
  explanation?: string;
  table?: TableData;
  image?: string;
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
