// Secret Stock Questions
// This file stores personal questions for the secret /stock/ route
//
// HOW TO ADD QUESTIONS:
// Add Question objects to the stockQuestions array below
//
// QUESTION FORMAT:
// {
//   id: "stock-1",                    // Unique ID
//   type: "multiple-choice",          // or "free-response"
//   question: "Your question here",
//   options: [                        // Only for multiple-choice
//     { label: "A", value: "a", text: "Option text" },
//     { label: "B", value: "b", text: "Option text" },
//     { label: "C", value: "c", text: "Option text" },
//     { label: "D", value: "d", text: "Option text" },
//   ],
//   correctAnswer: "a",               // The correct option value or answer text
//   explanation: "Why this is correct", // Optional
// }

import { Question } from '@/types/quiz';

export const stockQuestions: Question[] = [
  // Add your personal questions here
  // Example:
  // {
  //   id: "stock-1",
  //   type: "multiple-choice",
  //   question: "What is 2 + 2?",
  //   options: [
  //     { label: "A", value: "a", text: "3" },
  //     { label: "B", value: "b", text: "4" },
  //     { label: "C", value: "c", text: "5" },
  //     { label: "D", value: "d", text: "6" },
  //   ],
  //   correctAnswer: "b",
  //   explanation: "Basic arithmetic: 2 + 2 = 4",
  // },
];

export default stockQuestions;