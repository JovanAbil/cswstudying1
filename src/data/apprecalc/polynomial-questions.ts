import { Question } from '@/types/quiz';

export const polynomialQuestions: Question[] = [
  {
    "id": "polynomial-1",
    "type": "multiple-choice",
    "question": "The graph of a function k is shown in the figure. Which of the following best describes the behavior of the graph of k from point A to point B?",
    "image": "/images/apprecalc/polynomial10.png",
    "options": [
      { "label": "A", "value": "A", "text": "The graph of k is increasing and concave up", },
      { "label": "B", "value": "B", "text": "The graph of k is increasing and concave down", },
      { "label": "C", "value": "C", "text": "The graph of k is decreasing and concave up", },
      { "label": "D", "value": "D", "text": "The graph of k is decreasing and concave down", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-2",
    "type": "multiple-choice",
    "question": "The function g is decreasing at a decreasing rate. Which of the following could be the graph of g?",
    "options": [
      { "label": "A", "value": "A", "text": "", "image": "/images/apprecalc/polynomial6.png" },
      { "label": "B", "value": "B", "text": "", "image": "/images/apprecalc/polynomial7.png" },
      { "label": "C", "value": "C", "text": "", "image": "/images/apprecalc/polynomial8.png" },
      { "label": "D", "value": "D", "text": "", "image": "/images/apprecalc/polynomial9.png" }
    ],
    "correctAnswer": "D",
    "explanation": "A function that is decreasing at a decreasing rate has a negative first derivative (decreasing) and a positive second derivative (concave up). This means the graph slopes downward but curves upward."
  },
  {
    "id": "polynomial-3",
    "type": "multiple-choice",
    "question": "The function g is a polynomial with the following end behavior: lim_x-->-∞ g(x) = -∞ and lim_x-->∞ g(x) = -∞",
    "options": [
      { "label": "A", "value": "A", "text": "-4x^7-3x^3+x-6", },
      { "label": "B", "value": "B", "text": "-3x^6+5x^2+6x-1", },
      { "label": "C", "value": "C", "text": "3x^3+x^2-5x+1", },
      { "label": "D", "value": "D", "text": "2x^4-7x^3+3x^2+1", }
    ],
    "correctAnswer": "B",
    "explanation": " "
  },
  {
    "id": "polynomial-4",
    "type": "multiple-choice",
    "question": "What is the average rate of change of h over the interval 0<=x<=6",
    "image": "/images/apprecalc/polynomial5.png",
    "options": [
      { "label": "A", "value": "A", "text": "1/6", },
      { "label": "B", "value": "B", "text": "2/9", },
      { "label": "C", "value": "C", "text": "1/2", },
      { "label": "D", "value": "D", "text": "1", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-5",
    "type": "multiple-choice",
    "image": "/images/apprecalc/polynomial14.png",
    "question": "The table shows values of the odd and increasing function f at selected values of. What is the value a + b?",
    "options": [
      { "label": "A", "value": "A", "text": "-8" },
      { "label": "B", "value": "B", "text": "-2" },
      { "label": "C", "value": "C", "text": "8" },
      { "label": "D", "value": "D", "text": "16" }
    ],
    "correctAnswer": "A",
    "explanation": ""
  },
  {
    "id": "polynomial-6",
    "type": "multiple-choice",
    "question": "The graph of the polynomial function p is shown above. Which of the following could be an expression for p?",
    "image": "/images/apprecalc/polynomial4.png",
    "options": [
      { "label": "A", "value": "A", "text": "-1x/4 (x+2)(x-3)", },
      { "label": "B", "value": "B", "text": "-1x^2/4 (x-2)(x+3)", },
      { "label": "C", "value": "C", "text": "-1x^2/4 (x+2)(x-3)", },
      { "label": "D", "value": "D", "text": "1x^2/4 (x+2)(x-3)", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-7",
    "type": "multiple-choice",
    "question": "Selected values of the polynomial g are shown in the table above. Which of the following claim and explanation statements could be true about g?",
    "image": "/images/apprecalc/polynomial11.png",
    "options": [
      { "label": "A", "value": "A", "text": "The graph of g could be concave up because the average rates of change over consecutive equal-length input-value intervals are positive", },
      { "label": "B", "value": "B", "text": "The graph of g could be concave up because the average rates of change over consecutive equal-length input-value intervals are increasing", },
      { "label": "C", "value": "C", "text": "The graph of g could be concave down because the average rates of change over consecutive equal-length input-value intervals are negative", },
      { "label": "D", "value": "D", "text": "The graph of g could be concave down because the average rates of change over consecutive equal-length input-value intervals are decreasing", }
    ],
    "correctAnswer": "D",
    "explanation": " "
  },
  {
    "id": "polynomial-8",
    "type": "multiple-choice",
    "question": "The graph of the function f is shown. Which of the following statement pairs about f is correct?",
    "image": "/images/apprecalc/polynomial3.png",
    "options": [
      { "label": "A", "value": "A", "text": "The rate of change of f is positive and increasing", },
      { "label": "B", "value": "B", "text": "The rate of change of f is positive and decreasing", },
      { "label": "C", "value": "C", "text": "The rate of change of f is negative and increasing", },
      { "label": "D", "value": "D", "text": "The rate of change of f is negative and decreasing", }
    ],
    "correctAnswer": "B",
    "explanation": " "
  },
  {
    "id": "polynomial-9",
    "type": "multiple-choice",
    "question": "Let g be the even function with select input values shown. What is the average rate of change of g over the interval -2 <= x <= 4?",
    "image": "/images/apprecalc/polynomial12.png",
    "options": [
      { "label": "A", "value": "A", "text": "-2", },
      { "label": "B", "value": "B", "text": "-4/3", },
      { "label": "C", "value": "C", "text": "-1/2", },
      { "label": "D", "value": "D", "text": "5/3", }
    ],
    "correctAnswer": "D",
    "explanation": " "
  },
  {
    "id": "polynomial-10",
    "type": "multiple-choice",
    "question": "Let f(x) = 2x^2-3x+1 and g(x) = x^2-x+9. What are all the intervals for which f(x) <= g(x)",
    "options": [
      { "label": "A", "value": "A", "text": "[-4, 2]", },
      { "label": "B", "value": "B", "text": "[-2, 4]", },
      { "label": "C", "value": "C", "text": "(-∞, -4] and [2, ∞)", },
      { "label": "D", "value": "D", "text": "(-∞, -2] and [4, ∞)", }
    ],
    "correctAnswer": "B",
    "explanation": " "
  },
  {
    "id": "polynomial-11",
    "type": "multiple-choice",
    "question": "The polynoimal function h has degree 3. Which of the following tables could represent values for h?",
    "options": [
      { "label": "A", "value": "A", "text": "", "image": "/images/apprecalc/polynomial15.png", },
      { "label": "B", "value": "B", "text": "", "image": "/images/apprecalc/polynomial16.png", },
      { "label": "C", "value": "C", "text": "", "image": "/images/apprecalc/polynomial17.png", },
      { "label": "D", "value": "D", "text": "", "image": "/images/apprecalc/polynomial18.png", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-12",
    "type": "multiple-choice",
    "question": "The polynoimal function h has zeros at x = -2 (multiplicity 2), x = 2 (multiplicity 3) and x = 1 + 2i. What is the least possible degree of the polynomial function h?",
    "options": [
      { "label": "A", "value": "A", "text": "5", },
      { "label": "B", "value": "B", "text": "6", },
      { "label": "C", "value": "C", "text": "7", },
      { "label": "D", "value": "D", "text": "8", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-13",
    "type": "multiple-choice",
    "question": "The function f is given by f(x) = (2x^3)(x^2-1)(x^2+9). Which of the following describes the zeros of f?",
    "options": [
      { "label": "A", "value": "A", "text": "f has exactly three distinct real zeros.", },
      { "label": "B", "value": "B", "text": "f has exactly seven distinct real zeros", },
      { "label": "C", "value": "C", "text": "f has exactly two distinct real zeros and two non-real zeros", },
      { "label": "D", "value": "D", "text": "f has exactly three distinct real zeros and two non-real zeros", }
    ],
    "correctAnswer": "D",
    "explanation": " "
  },
  {
    "id": "polynomial-14",
    "type": "multiple-choice",
    "image": "/images/apprecalc/polynomial2.png",
    "question": "The graph of f is shown where the labeled points A, B, D, E represent the the x-values where f has a local extremum and point C represents where the graph of f has a point of inflection. On which of the following intervals is f negative and the graph of f concave up?",
    "options": [
      { "label": "A", "value": "A", "text": "The interval from A to B", },
      { "label": "B", "value": "B", "text": "The interval from B to C", },
      { "label": "C", "value": "C", "text": "The interval from C to D", },
      { "label": "D", "value": "D", "text": "The interval from D to E", }
    ],
    "correctAnswer": "C",
    "explanation": " "
  },
  {
    "id": "polynomial-15",
    "type": "multiple-choice",
    "image": "/images/apprecalc/polynomial1.png",
    "question": "The graph shows values for the polynomial function g at selected values of x. Which of the following describes the extreme values of g",
    "options": [
      { "label": "A", "value": "A", "text": "g has both a local maximum and an absolute maximum", },
      { "label": "B", "value": "B", "text": "g has a local maximum but not an absolute maximum", },
      { "label": "C", "value": "C", "text": "g does not have a local maximum but does have an absolute maximum", },
      { "label": "D", "value": "D", "text": "g has neither a local maximum nor an absolute maximum", }
    ],
    "correctAnswer": "B",
    "explanation": " "
  },
  {
    "id": "polynomial-16",
    "type": "free-response",
    "question": "Let f be the polynomial function give by f(x) = x^3 + x^2 - 6x. Determine the end behavior of f as x decreases without bound. Express your answer using the mathematical notation of a limit.",
    "correctAnswer": "lim_x-->-∞ f(x) = -∞",
    "explanation": "Math"
  },
  {
    "id": "polynomial-17",
    "type": "free-response",
    "question": "Let f be the polynomial function give by f(x) = x^3 + x^2 - 6x. Find all zeros of f(x) and indicate the multiplicity of each zero. Show the work that leads to your answer.",
    "correctAnswer": "When x = 0, -3, 2, it all have a multiplicity of 1.",
    "explanation": ""
  },
  {
    "id": "polynomial-18",
    "type": "free-response",
    "question": "Let f be the polynomial function give by f(x) = x^3 + x^2 - 6x. Determine the intervals where f(x) > 0. Show the work that leads to your answer.",
    "correctAnswer": "(-3, 0) U (2, ∞)",
    "explanation": ""
  },
  {
    "id": "polynomial-19",
    "type": "free-response",
    "question": "Let f be the polynomial function give by f(x) = x^3 + x^2 - 6x. Determine the number of relative minima and the number of relative maxima that occur for the function f.",
    "correctAnswer": "There is one local minimum and one local maximum but no global because it has an odd leading degree.",
    "explanation": ""
  },
  {
    "id": "polynomial-20",
    "type": "free-response",
    "question": "The function p is a polynomial function of degree 3. Zeros of p include -2 abd 1+sqrt(3). Write a possible expression for p(x) in standard form.",
    "correctAnswer": "p(x) = x^3 - 6x - 4",
    "explanation": ""
  },
  {
    "id": "polynomial-21",
    "type": "multiple-choice",
    "question": "[Calculator] The function f is 1.962x^3 - 5.672x^2 + 2.451x + 1.864, where -1 <= x <= 3. Which of the following values of x is a zero of f?",
    "options": [
      { "label": "A", "value": "A", "text": "0.248", },
      { "label": "B", "value": "B", "text": "1.210", },
      { "label": "C", "value": "C", "text": "1.679", },
      { "label": "D", "value": "D", "text": "2.153", }
    ],
    "correctAnswer": "B",
    "explanation": " "
  },
  {
    "id": "polynomial-22",
    "type": "multiple-choice",
    "question": "[Calculator] The function f is 1.962x^3 - 5.672x^2 + 2.451x + 1.864, where -1 <= x <= 3. On whihc of the following intervals is f decreasing?",
    "options": [
      { "label": "A", "value": "A", "text": "(-0.381, 1.210)", },
      { "label": "B", "value": "B", "text": "(0.248, 1.679)", },
      { "label": "C", "value": "C", "text": "(-1, -0.381) and (1.210, 2.061)", },
      { "label": "D", "value": "D", "text": "(-1, 0.248) and (1.679, 3)", }
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": "polynomial-23",
    "type": "multiple-choice",
    "question": "[Calculator] The function f is 1.962x^3 - 5.672x^2 + 2.451x + 1.864, where -1 <= x <= 3. Which of the following statements about the graph of f is correct?",
    "options": [
      { "label": "A", "value": "A", "text": "The graph of f has one distinct real zero and one local extremum on the interval -1 < x < 3.", },
      { "label": "B", "value": "B", "text": "The graph of f has one distinct real zero and two local extrema on the interval -1 < x < 3.", },
      { "label": "C", "value": "C", "text": "The graph of f has three distinct real zeros and one local extremum on the interval -1 < x < 3.", },
      { "label": "D", "value": "D", "text": "The graph of f has three distinct real zeros and two local extrema on the interval -1 < x < 3.", }
    ],
    "correctAnswer": "D",
    "explanation": ""
  },
  {
    "id": "polynomial-24",
    "type": "multiple-choice",
    "question": "[Calculator] The function f is 1.962x^3 - 5.672x^2 + 2.451x + 1.864, where -1 <= x <= 3. Which of the following values of x is an inflection point of f?",
    "options": [
      { "label": "A", "value": "A", "text": "-8.221", },
      { "label": "B", "value": "B", "text": ".964", },
      { "label": "C", "value": "C", "text": "1.679", },
      { "label": "D", "value": "D", "text": "11.143", }
    ],
    "correctAnswer": "B",
    "explanation": ""
  },
  {
    "id": "polynomial-25",
    "type": "free-response",
    "question": "[Calculator] The number of cars in the parking lot of a gym can be modeled by the quartic polynomial C(t) = -0.016t^4+0.52t^3-5.4t^2+19t+20 where t is the number of hours since the gym opened at 6 a.m (t = 0 is 6 a.m). At 6 a.m 20 people were at the gym, find the average rate of change of C from t = 2 to t = 5",
    "correctAnswer": "-1.768",
    "explanation": "(C(5) - C(2))/5-2 = -1.768"
  }, 
  {
    "id": "polynomial-26",
    "type": "free-response",
    "question": "[Calculator] The number of cars in the parking lot of a gym can be modeled by the quartic polynomial C(t) = -0.016t^4+0.52t^3-5.4t^2+19t+20 where t is the number of hours since the gym opened at 6 a.m (t = 0 is 6 a.m). At 6 a.m 20 people were at the gym, find the average rate of change of C from t = 2 to t = 5, interpret your average rate of change in the context of the problem",
    "correctAnswer": "On the interval 2 hours since 6 a.m to 5 hours since 6 a.m, the cars in the parking lot decreased by 1.768 cars per hour since 6 a.m.",
    "explanation": "(C(5) - C(2))/5-2 = -1.768"
  }, 
  {
    "id": "polynomial-27",
    "type": "free-response",
    "question": "[Calculator] The number of cars in the parking lot of a gym can be modeled by the quartic polynomial C(t) = -0.016t^4+0.52t^3-5.4t^2+19t+20 where t is the number of hours since the gym opened at 6 a.m (t = 0 is 6 a.m). At 6 a.m 20 people were at the gym, find all the values of t, as decimal approximations, for which C(t) = 41, or indicate that there are no such values.",
    "correctAnswer": "When C(t) = 41, t ~ 2.292, 3.114",
    "explanation": "Calculator"
  },
  {
    "id": "polynomial-28",
    "type": "free-response",
    "image": "/images/apprecalc/polynomial13.png",
    "question": "Let f be an increasing function defined for x >= 0. The table gives values for f(x) at selected values of x. Based on the table, which of the following function types best models the function: linear, quadratic, or neither?",
    "correctAnswer": "Function f is a quadratic function.",
    "explanation": ""
  },
  {
    "id": "polynomial-29",
    "type": "free-response",
    "image": "/images/apprecalc/polynomial13.png",
    "question": "Let f be an increasing function defined for x >= 0. The table gives values for f(x) at selected values of x. Give a reason why this function is quadratic based on the relationship between the change in output values of f and the change in input vales of f. Refer to the values of the table in your reasoning.",
    "correctAnswer": "It is a quadratic function because of over consecutive equal length input value intervals and because going from x = 1, 2, 3 is y = -10, -5, 4 which has a constant second difference of 4 between those values which prove it is a quadratic.",
    "explanation": ""
  },
];
