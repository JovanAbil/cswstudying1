import { Question } from '@/types/quiz';

export const rationalQuestions: Question[] = [
  // --- End behavior (keep images + 2 examples) ---
  {
    "id": "rational-1",
    "type": "free-response",
    "question": "Instructions on Image",
    "image": "/images/apprecalc/rational1.png",
    "correctAnswer": "As the x-values decrease without bound, the y-values approach but never reach -1",
    "explanation": "The image shows the horizontal asymptote to be -1 which is what will never have a value but the function will try to keep approaching."
  },
  {
    "id": "rational-2",
    "type": "free-response",
    "question": "Instructions on Image",
    "image": "/images/apprecalc/rational2.png",
    "correctAnswer": "As the x-values increase without bound, the y-values decrease without bound",
    "explanation": "The image shows the horizontal asymptote to be a negative linear which is treated like a regular function."
  },
  {
    "id": "rational-3",
    "type": "free-response",
    "question": "f(x) = (3x^2-1)/(2x^2+5x+7) Left End Behavior:",
    "correctAnswer": "lim_x-->-∞ f(x) = 3/2",
    "explanation": "3x^2/2x^2"
  },
  {
    "id": "rational-4",
    "type": "free-response",
    "question": "g(x) = (3x^7+4x^2+7)/(x^2-3)^3 Right End Behavior:",
    "correctAnswer": "lim_x-->∞ g(x) = ∞",
    "explanation": "3x^7/x^6"
  },

  // --- Terms ---
  {
    "id": "rational-9",
    "type": "free-response",
    "question": "What is a horizontal asymptote and how to find it on a rational expression?",
    "correctAnswer": "It is parallel to the x-axis and it is the highest degree terms on both the numerator and denominator divided by each other.",
    "explanation": "N/A"
  },
  {
    "id": "rational-10",
    "type": "free-response",
    "question": "What is a vertical asymptote and how to find it on a rational expression?",
    "correctAnswer": "It is parallel to the y-axis and it is the factored expressions on the denominator.",
    "explanation": "N/A"
  },

  // --- Asymptotes, Zeros, Holes Practice ---
  {
    "id": "rational-15",
    "type": "free-response",
    "question": "f(x) = (3x^2-1)/(2x^2+5x+7) Horizontal Asymptote:",
    "correctAnswer": "3/2",
    "explanation": "3x^2/2x^2"
  },
  {
    "id": "rational-16",
    "type": "free-response",
    "question": "f(x) = (x^2+x-6)/(x^2+4x-5) Vertical Asymptote(s):",
    "correctAnswer": "x = -5, 1",
    "explanation": "Factor out the bottom"
  },

  // --- Creating rational functions ---
  {
    "id": "rational-34",
    "type": "free-response",
    "question": "Create a rational function with a hole at x = 3 and vertical asymptotes at x = 1 and x = -4",
    "correctAnswer": "f(x) = (x-3)/(x-3)(x-1)(x+4)",
    "explanation": "N/A"
  },
  {
    "id": "rational-35",
    "type": "free-response",
    "question": "Create a rational function with zeros at x = -1 and x = 2, vertical asymptote at x = 5, and a horizontal asymptote of y=3/4",
    "correctAnswer": "f(x) = 3(x+1)(x-2)/4(x-5)^2",
    "explanation": "N/A"
  },

  // --- Limits ---
  {
    "id": "rational-36a",
    "type": "free-response",
    "question": "The function f(x) = (x^2-4x-12)/(x-3). Answer: a. lim_x-->3^- f(x) =  b. lim_x-->3^+ f(x) =",
    "correctAnswer": "a. ∞ b. -∞",
    "explanation": "N/A"
  },
  {
    "id": "rational-36c",
    "type": "free-response",
    "question": "The function f(x) = -(x^2-9)/(x^2-3x). Answer: a. lim_x-->0^- f(x) =  b. lim_x-->0^+ f(x) =",
    "correctAnswer": "a. ∞ b. -∞",
    "explanation": "N/A"
  },

  // --- Inequalities ---
  {
    "id": "rational-37a",
    "type": "free-response",
    "question": "The function (x-3)/(x+5) > 0.",
    "correctAnswer": "(-∞, -5) U [3, ∞)",
    "explanation": "N/A"
  },
  {
    "id": "rational-37b",
    "type": "free-response",
    "question": "The function (x^2+5x-6)/(x+2) <= 0.",
    "correctAnswer": "(-∞, -6] U (-2, 1]",
    "explanation": "N/A"
  },

  // --- Slant Asymptotes ---
  {
    "id": "rational-38a",
    "type": "free-response",
    "question": "Find the slant and state the slant asymptote for f(x) = (x^2-6x+7)/(x+1).",
    "correctAnswer": "slant: x-7",
    "explanation": "N/A"
  },
  {
    "id": "rational-38d",
    "type": "free-response",
    "question": "Find the slant and state the slant asymptote for f(x) = (2x^3-x^2+1)/(x^2+x+1).",
    "correctAnswer": "slant: 2x-2",
    "explanation": "N/A"
  },
];
