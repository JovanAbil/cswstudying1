import { Question } from '@/types/quiz';

export const polynomialQuestions: Question[] = [
  {
    "id": "polynomial-52",
    "type": "free-response",
    "question": "The graph of the polynomial function f is shown above, where −5 ≤ x ≤ 5. The function f has local extrema at x = −2 and x = 2, and the graph of f has a point of inflection at x = 0.",
    "image": "/images/apprecalc/polynomial-graph-extrema.png",
    "correctAnswer": "1a) (-5, -2) ∪ (2, 5)\n1b) (-5, 0)",
    "explanation": "1a) The function f is increasing where the graph has a positive slope. From the graph, this occurs on the intervals (-5, -2) and (2, 5), which are before the local maximum at x = -2 and after the local minimum at x = 2.\n\n1b) The graph of f is concave down where the curve opens downward. From the graph and the given information that there is a point of inflection at x = 0, the function is concave down on the interval (-5, 0)."
  },
];
