import { Question } from '@/types/quiz';

/**
 * FAKE/PRACTICE DATA for Atomic Structure
 * 
 * These questions are shown when the real test is locked.
 * They should be similar in topic but NOT the actual test questions.
 * 
 * To enable this fake data:
 * 1. Go to src/data/test-schedule-config.ts
 * 2. Uncomment or add: 'chemistry-atomic': { testDate: '2025-01-20', hasFakeData: true }
 */

export const atomicQuestions: Question[] = [
  {
    id: 'fake-atomic-1',
    type: 'multiple-choice',
    question: 'Practice: What is the charge of a proton?',
    options: [
      { label: 'A', value: 'a', text: '+1' },
      { label: 'B', value: 'b', text: '-1' },
      { label: 'C', value: 'c', text: '0' },
      { label: 'D', value: 'd', text: '+2' },
    ],
    correctAnswer: 'a',
    explanation: 'This is practice content. Protons have a +1 charge.',
  },
  {
    id: 'fake-atomic-2',
    type: 'multiple-choice',
    question: 'Practice: Where are electrons located in an atom?',
    options: [
      { label: 'A', value: 'a', text: 'In the nucleus' },
      { label: 'B', value: 'b', text: 'In electron shells around the nucleus' },
      { label: 'C', value: 'c', text: 'Scattered randomly' },
      { label: 'D', value: 'd', text: 'Between atoms' },
    ],
    correctAnswer: 'b',
    explanation: 'This is practice content. Electrons orbit the nucleus in shells.',
  },
  {
    id: 'fake-atomic-3',
    type: 'free-response',
    question: 'Practice: Define atomic number.',
    correctAnswer: 'The number of protons in an atom',
    explanation: 'This is practice content. Atomic number = number of protons.',
  },
  // Add more practice questions as needed...
];
