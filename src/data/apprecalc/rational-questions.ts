import { Question } from '@/types/quiz';

export const rationalQuestions: Question[] = [
  {
    "id": "rational-1",
    "type": "free-response",
    "question": "Instructions on Image",
    "image": "/images/apprecalc/rational1.png",
    "correctAnswer": "As the x-values increase without bound, the y-values approach but never reach -1",
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
    "question": "f(x) = 3x^2-1/2x^2+5x+7 What is the horizontal asymptote",
    "correctAnswer": "3/2",
    "explanation": "3x^2/2x^2"
  },
];
