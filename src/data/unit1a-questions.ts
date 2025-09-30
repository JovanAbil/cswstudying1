import { Question } from '@/types/quiz';

export const unit1aQuestions: Question[] = [
  {
    id: '1a-1',
    type: 'multiple-choice',
    question: 'Let g(x) = 2x² + 5x - 12. On what intervals is g(x) ≥ 0?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'D',
    explanation: '(A) [-3/2, 4]\n(B) [-4, 3/2]\n(C) (-∞, -3/2) and (4, ∞)\n(D) (-∞, -4) and (3/2, ∞)'
  },
  {
    id: '1a-2',
    type: 'multiple-choice',
    question: 'The polynomial function h has zeros of x = 3 (multiplicity of 2), x = -4 (multiplicity of 3), x = 2i and x = 5 - 3i. What is the least possible degree of h?',
    options: [
      { label: 'A', value: '4' },
      { label: 'B', value: '6' },
      { label: 'C', value: '7' },
      { label: 'D', value: '9' }
    ],
    correctAnswer: '9',
    explanation: 'Complex zeros come in conjugate pairs. Total: 2 + 3 + 2 + 2 = 9'
  },
  {
    id: '1a-3',
    type: 'multiple-choice',
    question: 'Which statement about function h is correct? (A) The rate of change of h is positive and decreasing. (B) The rate of change of h is negative and decreasing. (C) The function h is negative and decreasing. (D) The function h is negative and the rate of change of h is negative.',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'B'
  },
  {
    id: '1a-4',
    type: 'multiple-choice',
    question: 'Selected values of polynomial function g: x = -6, -4, -3, -2, 2, b, 6 with f(x) = -4, -5, 5, 1, a, 5, c. Which statement pair could be true?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C',
    explanation: '(A) g is odd, concave down\n(B) g is odd, concave up\n(C) g is even, concave down\n(D) g is even, concave up'
  },
  {
    id: '1a-5',
    type: 'free-response',
    question: 'The even function f has values: x = -7, -5, -3, -1, 1 with g(x) = -13, -12, -8, -3, 3. What is the value of a + b + c?',
    correctAnswer: '0',
    explanation: 'For even functions, f(-x) = f(x). Using symmetry: a + b + c = 0'
  },
  {
    id: '1a-6',
    type: 'multiple-choice',
    question: 'Which statement about function g is correct? (A) g is increasing at an increasing rate. (B) g is increasing at a decreasing rate. (C) g is decreasing at an increasing rate. (D) g is decreasing at a decreasing rate.',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'A'
  },
  {
    id: '1a-7',
    type: 'multiple-choice',
    question: 'Which statement about function h is correct? (A) h is increasing at an increasing rate. (B) h is increasing at a decreasing rate. (C) h is decreasing at an increasing rate. (D) h is decreasing at a decreasing rate.',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C'
  },
  {
    id: '1a-8',
    type: 'multiple-choice',
    question: 'Which statement about function k is correct? (A) k is increasing at an increasing rate. (B) k is increasing at a decreasing rate. (C) k is decreasing at an increasing rate. (D) k is decreasing at a decreasing rate.',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'B'
  },
  {
    id: '1a-9',
    type: 'multiple-choice',
    question: 'Let g(x) = 4x⁵ - 2x⁴ + 3x - 1. Which limit statement about the end behavior of g is correct?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'B',
    explanation: '(A) lim(x→-∞) = -∞, lim(x→∞) = -∞\n(B) lim(x→-∞) = -∞, lim(x→∞) = ∞\n(C) lim(x→-∞) = ∞, lim(x→∞) = -∞\n(D) lim(x→-∞) = ∞, lim(x→∞) = ∞'
  },
  {
    id: '1a-10',
    type: 'multiple-choice',
    question: 'Let h(x) = -2x(x-3)²(x+4)³. Which limit statement about the end behavior of h is correct?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C',
    explanation: '(A) lim(x→-∞) = -∞, lim(x→∞) = -∞\n(B) lim(x→-∞) = -∞, lim(x→∞) = ∞\n(C) lim(x→-∞) = ∞, lim(x→∞) = -∞\n(D) lim(x→-∞) = ∞, lim(x→∞) = ∞'
  },
  {
    id: '1a-11',
    type: 'multiple-choice',
    question: 'Let polynomial f be an odd function such that f(-4) = 5 is the location of a local minimum. Which statement must be true?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'B',
    explanation: '(A) f(4) = -5 is local min\n(B) f(4) = -5 is local max\n(C) f(4) = 5 is local min\n(D) f(4) = 5 is local max'
  },
  {
    id: '1a-12',
    type: 'multiple-choice',
    question: 'Let h(x) = {3x² + 1, x < 4; 4x - 9, x ≥ 4}. What is the average rate of change of h over [0, 5]?',
    options: [
      { label: 'A', value: '2' },
      { label: 'B', value: '4' },
      { label: 'C', value: '6' },
      { label: 'D', value: '15' }
    ],
    correctAnswer: '4',
    explanation: 'h(0) = 1, h(5) = 11. AROC = (11-1)/(5-0) = 2'
  },
  {
    id: '1a-13',
    type: 'multiple-choice',
    question: 'Which could be the expression for polynomial function f? (A) -x(x+2)(x-3)² (B) -x(x+2)(x-3) (C) -x²(x+2)(x-3)² (D) x²(x+2)(x-3)²',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'A'
  },
  {
    id: '1a-14',
    type: 'multiple-choice',
    question: 'Let g(x) = -2x(x+4)³(x-7)⁴. What are all intervals where g(x) < 0?',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C',
    explanation: '(A) (-4, 0) only\n(B) (-4, 0) and (7, ∞)\n(C) (-∞, -4) and (0, ∞)\n(D) (-∞, -4), (0, 7), and (7, ∞)'
  },
  {
    id: '1a-15',
    type: 'free-response',
    question: 'Let f(x) = -1.352x⁵ + 3.051x⁴ - 1.964x² + 6.542, where -1 ≤ x ≤ 2. How many relative minima and maxima does f have on [-1, 2]?',
    correctAnswer: '2 minima, 2 maxima',
    explanation: 'Graph analysis shows 2 relative minima and 2 relative maxima'
  },
  {
    id: '1a-16',
    type: 'free-response',
    question: 'Let g(x) = 3.526x⁴ - 5.152x³ + 0.789x² - 2.665x - 4.152, -1 ≤ x ≤ 2. At what x-value does g have a local minimum or maximum?',
    correctAnswer: 'x = 1.143',
    explanation: 'Using calculator: local minimum at x = 1.143'
  },
  {
    id: '1a-17',
    type: 'free-response',
    question: 'For g(x) from previous problem, on what complete interval is g decreasing over [-1, 2]?',
    correctAnswer: '(-0.653, 1.143)',
    explanation: 'g is decreasing from x = -0.653 to x = 1.143'
  },
  {
    id: '1a-18',
    type: 'free-response',
    question: 'Let h(x) = 2.351x³ - 7.662x² + 2.117x + 1.302, -1 ≤ x ≤ 3. Find all zeros of h.',
    correctAnswer: 'x ≈ -0.422, 0.456, 3.225',
    explanation: 'Use calculator to find approximate zeros'
  },
  {
    id: '1a-19',
    type: 'free-response',
    question: 'Let f(x) = x³ + 2x² - 21x + 18. Find all intervals where f(x) < 0.',
    correctAnswer: '(-3, 1)',
    explanation: 'Factor to find zeros, then test intervals'
  },
  {
    id: '1a-20',
    type: 'free-response',
    question: 'Let k(x) = 2x⁴ + 9x³ - 5x². Find all intervals where k(x) ≥ 0.',
    correctAnswer: '[-5, 0] ∪ [0, ∞)',
    explanation: 'Factor: x²(2x² + 9x - 5) and solve'
  },
  {
    id: '1a-21',
    type: 'free-response',
    question: 'Given x = 1 - 3i is a zero of f(x) = x⁴ + 8x³ - 15x² + 110x - 50, find all remaining zeros.',
    correctAnswer: 'x = 1 + 3i, x = -5, x = 1',
    explanation: 'Complex zeros come in pairs. Use synthetic division.'
  },
  {
    id: '1a-22',
    type: 'multiple-choice',
    question: 'Which could be an expression for polynomial k? (A) -(1/20)(x+4)²(x+1)(x-2) (B) (1/20)(x+4)²(x+1)(x-2) (C) (1/20)(x-4)²(x-1)(x+2) (D) (1/20)(x+4)(x+1)(x-2)',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'B'
  },
  {
    id: '1a-23',
    type: 'multiple-choice',
    question: 'Which could be an expression for polynomial p? (A) (1/2)(x+3)(x-2) (B) (1/2)x(x+3)(x-2) (C) -(1/2)x(x+3)(x-2) (D) -(1/2)x²(x+3)(x-2)',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C'
  },
  {
    id: '1a-24',
    type: 'multiple-choice',
    question: 'Which could be the equation for f? (A) f(x) = (1/20)(x+2)(x-3) (B) f(x) = (1/20)(x-2)²(x+3)² (C) f(x) = -(1/20)(x+2)²(x-3)² (D) f(x) = (1/20)(x+2)²(x-3)²(x²+1)',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'C'
  },
  {
    id: '1a-25',
    type: 'free-response',
    question: 'Find where g(x) > 0 (use interval notation based on graph).',
    correctAnswer: 'Varies by graph',
    explanation: 'Identify intervals where graph is above x-axis'
  },
  {
    id: '1a-26',
    type: 'free-response',
    question: 'Find where g(x) ≤ 0 (use interval notation based on graph).',
    correctAnswer: 'Varies by graph',
    explanation: 'Identify intervals where graph is on or below x-axis'
  },
  {
    id: '1a-27',
    type: 'free-response',
    question: 'Solve: x³ + 2x² - 11x + 12 ≥ 0 (interval notation)',
    correctAnswer: '[-4, 1] ∪ [3, ∞)',
    explanation: 'Factor and find critical points, then test intervals'
  },
  {
    id: '1a-28',
    type: 'free-response',
    question: 'Solve: 3x³ - 12x² - 21x + 30 < 0 (interval notation)',
    correctAnswer: '(-∞, -2) ∪ (1, 5)',
    explanation: 'Factor out 3, find zeros, test intervals'
  },
  {
    id: '1a-29',
    type: 'free-response',
    question: 'Find zeros with multiplicity for f(x) = 5(x-3)⁴(x+2)(x-1)',
    correctAnswer: 'x = 3 (mult. 4), x = -2 (mult. 1), x = 1 (mult. 1)',
    explanation: 'Read multiplicity from exponents'
  },
  {
    id: '1a-30',
    type: 'multiple-choice',
    question: 'The table shows x: 1, 3, 5, 7, 9 with f(x): -2, -1, 3, 10, 20. Which statement best fits? (A) f is linear, rate constant (B) f is linear, rate linear (C) f is quadratic, rate constant (D) f is quadratic, rate linear',
    options: [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
      { label: 'D', value: 'D' }
    ],
    correctAnswer: 'D',
    explanation: 'Second differences are constant, indicating quadratic'
  }
];
