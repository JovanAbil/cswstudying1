import { Question } from '@/types/quiz';

export const rationalQuestions: Question[] = [
  //End behavior
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
    "question": "f(x) = (3x^2-1)/(2x^2+5x+7) Left End Behavior: ",
    "correctAnswer": "lim_x-->-∞ f(x) = 3/2",
    "explanation": "3x^2/2x^2"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "f(x) = (3x^2-1)/(2x^2+5x+7) Right End Behavior: ",
    "correctAnswer": "lim_x-->∞ f(x) = 3/2",
    "explanation": "3x^2/2x^2"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (3x^7+4x^2+7)/(x^2-3)^3 Left End Behavior: ",
    "correctAnswer": "lim_x-->-∞ g(x) = -∞",
    "explanation": "3x^7/x^6"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (3x^7+4x^2+7)/(x^2-3)^3 Right End Behavior: ",
    "correctAnswer": "lim_x-->∞ g(x) = ∞",
    "explanation": "3x^7/x^6"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (5x^3-2x^2-1)/(x^4-6) Left End Behavior",
    "correctAnswer": "lim_x-->-∞ h(x) = 0",
    "explanation": "5x^3/x^4"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (5x^3-2x^2-1)/(x^4-6) Right End Behavior",
    "correctAnswer": "lim_x-->∞ h(x) = 0",
    "explanation": "5x^3/x^4"
  },
  //Terms
  {
    "id": "rational-",
    "type": "free-response",
    "question": "What is a horizontal asymptote and how to find it on a rational expression?",
    "correctAnswer": "It is parallel to the x-axis and it is the highest degree terms on both the numerator and denominator divided by eachother.",
    "explanation": "N/A"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "What is a vertical asymptote and how to find it on a rational expression?",
    "correctAnswer": "It is parallel to the y-axis and it is the factored expressions on the denominator",
    "explanation": "N/A"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "What is a zero in a rational expression and how to find it on a rational expression?",
    "correctAnswer": "A zero is when y=0, it is found by the numerator on a rational expression",
    "explanation": "N/A"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "What is a hole in a rational expression and how to find it on a rational expression?",
    "correctAnswer": "It is when an expression is fully factored on both the numerator and the denominator, find it by dividing the factors until both are gone.",
    "explanation": "N/A"
  },
  //Asymptotes, Zeros, Holes Practice
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (5x^3-2x^2-1)/(x^4-6) Horizontal Asymptote: ",
    "correctAnswer": "0",
    "explanation": "5x^3/x^4"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (3x^7+4x^2+7)/(x^2-3)^3 Horizontal Asymptote: ",
    "correctAnswer": "None",
    "explanation": "3x^7/x^6, 3x, if x is on the numerator, its a linear 'asymptote (not correct term)' which means it isn't an asymptote"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "f(x) = (3x^2-1)/(2x^2+5x+7) Horizontal Asymptote: ",
    "correctAnswer": "3/2",
    "explanation": "3x^2/2x^2"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "f(x) = (x^2+x-6)/(x^2+4x-5) Vertical Asymptote(s): ",
    "correctAnswer": "x = -5, 1",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "f(x) = (x^2+x-6)/(x^2+4x-5) Zero(s): ",
    "correctAnswer": "x = -3, 2",
    "explanation": "Factor out the top"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "f(x) = (x^2+x-6)/(x^2+4x-5) Hole: ",
    "correctAnswer": "None",
    "explanation": "No factors were removed"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (x^2-9x+18)/(x^2-8x+12) Vertical Asymptote(s): ",
    "correctAnswer": "x = 2",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (x^2-9x+18)/(x^2-8x+12) Zero(s): ",
    "correctAnswer": "x = 3",
    "explanation": "Factor out the top"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "g(x) = (x^2-9x+18)/(x^2-8x+12) Hole: ",
    "correctAnswer": "x = 6",
    "explanation": "Factor (x-6) was removed from both numerator and denominator"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Vertical Asymptote(s): ",
    "correctAnswer": "x = 1/2",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Zero(s): ",
    "correctAnswer": "x = 0, 8",
    "explanation": "Factor out the top"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Hole: ",
    "correctAnswer": "x = -4",
    "explanation": "Factor (x+4) was removed from both numerator and denominator"
  },
  
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Vertical Asymptote(s): ",
    "correctAnswer": "x = 1/2",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Zero(s): ",
    "correctAnswer": "x = 0, 8",
    "explanation": "Factor out the top"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "h(x) = (x^3-4x^2-32x)/(2x^2+7x-4) Hole: ",
    "correctAnswer": "x = -4",
    "explanation": "Factor (x+4) was removed from both numerator and denominator"
  },

  {
    "id": "rational-",
    "type": "free-response",
    "question": "j(x) = (x^2+3x-10)/(x^2-4x+4) Vertical Asymptote(s): ",
    "correctAnswer": "x = 2",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "j(x) = (x^2+3x-10)/(x^2-4x+4) Zero(s): ",
    "correctAnswer": "x = -5",
    "explanation": "Factor out the top"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "j(x) = (x^2+3x-10)/(x^2-4x+4) Hole: ",
    "correctAnswer": "None",
    "explanation": "No factors were completely removed"
  },

  {
    "id": "rational-",
    "type": "free-response",
    "question": "k(x) = (x-3)/(x^2+7x-30) Vertical Asymptote(s): ",
    "correctAnswer": "x = -10",
    "explanation": "Factor out the bottom"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "k(x) = (x-3)/(x^2+7x-30) Zero(s): ",
    "correctAnswer": "None",
    "explanation": "Factors in top were factored out"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "k(x) = (x-3)/(x^2+7x-30) Hole: ",
    "correctAnswer": "x = 3",
    "explanation": "Factored out (x-3) from both numerator and denominator"
  },

  //Creating rational functions based on information
  {
    "id": "rational-",
    "type": "free-response",
    "question": "Create a rational function with a hole at x = 3 and vertical asymptotes at x = 1 and x = -4",
    "correctAnswer": "Answers may vary; f(x) = (x-3)/(x-3)(x-1)(x+4)",
    "explanation": "N/A"
  },
  {
    "id": "rational-",
    "type": "free-response",
    "question": "Create a rational function with zeros at x = -1 and x = 2, vertical asymptote at x = 5, and a horizontal asymptote of y=3/4",
    "correctAnswer": "Answers may vary; f(x) = 3(x+1)(x-2)/4(x-5)^2",
    "explanation": "N/A"
  },
];
