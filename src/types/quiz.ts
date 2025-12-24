export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: { label: string; value: string; text: string; image?: string }[];
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
  displayAs?: 'paragraph';
}

export type Question = MultipleChoiceQuestion | FreeResponseQuestion;

export interface QuizAttempt {
  questionId: string;
  userAnswer: string | null;
  isCorrect: boolean | null;
  selfGraded?: boolean;
  skipped?: boolean;
}

export interface QuizState {
  currentQuestionIndex: number;
  attempts: QuizAttempt[];
  isSubmitted: boolean;
  isComplete: boolean;
}

// Homework Assignment Types
export interface HomeworkAssignment {
  id: string;
  name: string;
  notes?: string; // Markdown or plain text notes for the assignment
}

export interface UnitContent {
  assignments: HomeworkAssignment[];
  testId?: string; // Reference to the test question set
}

// Wrong answers storage for targeted practice
export interface WrongAnswer {
  questionId: string;
  question: Question;
  timestamp: number;
}

export interface SubjectWrongAnswers {
  [unitId: string]: WrongAnswer[];
}