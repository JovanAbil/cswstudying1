import { Question } from '@/types/quiz';

export const unit1aQuestions: Question[] = [
  {
    id: '1a-1',
    type: 'multiple-choice',
    question: 'Let g(x) = 2x² + 5x - 12. On what intervals is g(x) ≥ 0?',
    options: [
      { label: 'A', value: 'A', text: '[-3/2, 4]' },
      { label: 'B', value: 'B', text: '[-4, 3/2]' },
      { label: 'C', value: 'C', text: '(-∞, -3/2) and (4, ∞)' },
      { label: 'D', value: 'D', text: '(-∞, -4] ∪ [1.5, ∞)' }
    ],
    correctAnswer: 'D',
    explanation: 'Roots at x = -4 and x = 3/2 (or 1.5). Since the parabola opens upward (positive leading coefficient), g(x) ≥ 0 on (-∞, -4] ∪ [1.5, ∞).'
  },
  {
    id: '1a-2',
    type: 'multiple-choice',
    question: 'The polynomial function h has zeros of x = 3 (multiplicity 2), x = -4 (multiplicity 3), x = 2i and x = 5 - 3i. What is the least possible degree of h?',
    options: [
      { label: 'A', value: 'A', text: '4' },
      { label: 'B', value: 'B', text: '6' },
      { label: 'C', value: 'C', text: '7' },
      { label: 'D', value: 'D', text: '9' }
    ],
    correctAnswer: 'D',
    explanation: 'Degree 9: must include conjugates of complex roots (2 + 3 + 2 + 2 = 9).'
  },
  {
    id: '1a-3',
    type: 'multiple-choice',
    question: 'Let g(x) = 4x⁵ - 2x⁴ + 3x - 1. Which limit statement about the end behavior of g is correct?',
    options: [
      { label: 'A', value: 'A', text: 'lim(x→-∞) g(x) = -∞ and lim(x→∞) g(x) = -∞' },
      { label: 'B', value: 'B', text: 'lim(x→-∞) g(x) = -∞ and lim(x→∞) g(x) = ∞' },
      { label: 'C', value: 'C', text: 'lim(x→-∞) g(x) = ∞ and lim(x→∞) g(x) = -∞' },
      { label: 'D', value: 'D', text: 'lim(x→-∞) g(x) = ∞ and lim(x→∞) g(x) = ∞' }
    ],
    correctAnswer: 'B',
    explanation: 'Odd degree, positive lead ⇒ g(x)→-∞ as x→-∞, g(x)→+∞ as x→+∞.'
  },
  {
    id: '1a-4',
    type: 'multiple-choice',
    question: 'Let h(x) = -2x(x-3)²(x+4)³. Which limit statement about the end behavior of h is correct?',
    options: [
      { label: 'A', value: 'A', text: 'lim(x→-∞) h(x) = -∞ and lim(x→∞) h(x) = -∞' },
      { label: 'B', value: 'B', text: 'lim(x→-∞) h(x) = -∞ and lim(x→∞) h(x) = ∞' },
      { label: 'C', value: 'C', text: 'lim(x→-∞) h(x) = ∞ and lim(x→∞) h(x) = -∞' },
      { label: 'D', value: 'D', text: 'lim(x→-∞) h(x) = ∞ and lim(x→∞) h(x) = ∞' }
    ],
    correctAnswer: 'A',
    explanation: 'Even degree (6), negative lead ⇒ both ends → -∞.'
  },
  {
    id: '1a-5',
    type: 'multiple-choice',
    question: 'Let the polynomial f be an odd function such that f(-4) = 5 is the location of a local minimum. Which statement must be true?',
    options: [
      { label: 'A', value: 'A', text: 'f(4) = -5 is the location of a local minimum' },
      { label: 'B', value: 'B', text: 'f(4) = -5 is the location of a local maximum' },
      { label: 'C', value: 'C', text: 'f(4) = 5 is the location of a local minimum' },
      { label: 'D', value: 'D', text: 'f(4) = 5 is the location of a local maximum' }
    ],
    correctAnswer: 'B',
    explanation: 'By odd symmetry ⇒ f(4) = -5 and local max at x = 4.'
  },
  {
    id: '1a-6',
    type: 'multiple-choice',
    question: 'Let h(x) = {3x² + 1 for x < 4; 4x - 9 for x ≥ 4}. What is the average rate of change of h over [0, 5]?',
    options: [
      { label: 'A', value: 'A', text: '2' },
      { label: 'B', value: 'B', text: '4' },
      { label: 'C', value: 'C', text: '6' },
      { label: 'D', value: 'D', text: '15' }
    ],
    correctAnswer: 'A',
    explanation: 'h(5)-h(0)/5 = 11-1/5 = 2.'
  }
];
