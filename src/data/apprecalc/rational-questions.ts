import { Question } from '@/types/quiz';

export const rationalQuestions: Question[] = [
  {
    "id": "rational-1",
    "type": "multiple-choice",
    "question": "Which of the following rational functions have a horizontal asymptote. $f(x) = \\frac{3x^2+x-1}{x^2+4}$  $g(x)=\\frac{(x+1)(2x-3)^2}{(5x-7)^2}$  $h(x)= \\frac{x-4}{x^3+x^2-6}$",
    "options": [
      { "label": "A", "value": "A", "text": "f(x) only" },
      { "label": "B", "value": "B", "text": "f(x) and g(x) only" },
      { "label": "C", "value": "C", "text": "f(x) and h(x) only" },
      { "label": "D", "value": "D", "text": "All functions" }
    ],
    "correctAnswer": "C",
    "explanation": "They both have x cancelled out or x is the greater denominator."
  },
  {
    "id": "rational-2",
    "type": "multiple-choice",
    "question": "Let k be the rational function defined by $k(x) = \\frac{(x-3)^3(x+2)^3}{(x-3)^2(x+2)^4}$ Which of the following statements about the graph of k is correct?",
    "options": [
      { "label": "A", "value": "A", "text": "The graph of k has a vertical asymptote at x = -2 and a hole at x = 3" },
      { "label": "B", "value": "B", "text": "The graph of k has a vertical asymptote at x = 3 and a hole at x = -2" },
      { "label": "C", "value": "C", "text": "The graph of k has vertical asymptotes at x = -2 and x = 3" },
      { "label": "D", "value": "D", "text": "The graph of k has holes at x = -2 and x = 3" }
    ],
    "correctAnswer": "A",
    "explanation": "Factoring"
  },
  {
    "id": "rational-3",
    "type": "multiple-choice",
    "question": "What is the coefficient of the x^3 term in the expansion of (x-3)^5?",
    "options": [
      { "label": "A", "value": "A", "text": "60" },
      { "label": "B", "value": "B", "text": "-60" },
      { "label": "C", "value": "C", "text": "90" },
      { "label": "D", "value": "D", "text": "-90" }
    ],
    "correctAnswer": "C",
    "explanation": "Pascals Triangle"
  },
  {
    "id": "rational-4",
    "type": "multiple-choice",
    "question": "The graph of the rational function h has a horizontal asymptote of y = -3. Which of the following could be an expression for h(x)",
    "options": [
      { "label": "A", "value": "A", "text": "(x^2-4x+7)/(-3x^2+5)" },
      { "label": "B", "value": "B", "text": "(3x^2-5x-2)/(x^2-x+1)" },
      { "label": "C", "value": "C", "text": "(-3x^3+x-2)/(x^2+5x-6)" },
      { "label": "D", "value": "D", "text": "(-6x^3+7x^2-12)/(2x^3+11)" }
    ],
    "correctAnswer": "D",
    "explanation": "Fits the criteria"
  },
  {
    "id": "rational-5",
    "type": "multiple-choice",
    "question": "The graph of the rational function r is shown above. On the interval (-∞, 1), the graph of r is:",
    "image": "/images/apprecalc/rational1.png",
    "options": [
      { "label": "A", "value": "A", "text": "decreasing at a decreasing rate" },
      { "label": "B", "value": "B", "text": "decreasing at an increasing rate" },
      { "label": "C", "value": "C", "text": "increasing at a decreasing rate" },
      { "label": "D", "value": "D", "text": "increasing at an increasing rate" }
    ],
    "correctAnswer": "A",
    "explanation": "."
  },
  {
    "id": "rational-6",
    "type": "multiple-choice",
    "question": "Use the rational function $f(x) = \\frac{(2x-7)(x-2)}{x^2-5x+6}$. $\\lim_{x \\to 3^+} f(x) = $",
    "options": [
      { "label": "A", "value": "A", "text": "2" },
      { "label": "B", "value": "B", "text": "3" },
      { "label": "C", "value": "C", "text": "-∞" },
      { "label": "D", "value": "D", "text": "∞" }
    ],
    "correctAnswer": "C",
    "explanation": "Use sign chart"
  },
  {
    "id": "rational-7",
    "type": "multiple-choice",
    "question": "Use the rational function $f(x) = \\frac{(2x-7)(x-2)}{x^2-5x+6}$. $\\lim_{x \\to -\\infty} f(x) = $",
    "options": [
      { "label": "A", "value": "A", "text": "2" },
      { "label": "B", "value": "B", "text": "3" },
      { "label": "C", "value": "C", "text": "-∞" },
      { "label": "D", "value": "D", "text": "∞" }
    ],
    "correctAnswer": "A",
    "explanation": "Use horizontal asymptote"
  },
  {
    "id": "rational-8",
    "type": "multiple-choice",
    "question": "Use the rational function $f(x) = \\frac{(2x-7)(x-2)}{x^2-5x+6}$. $\\lim_{x \\to 2^-} f(x) = $",
    "options": [
      { "label": "A", "value": "A", "text": "2" },
      { "label": "B", "value": "B", "text": "3" },
      { "label": "C", "value": "C", "text": "-∞" },
      { "label": "D", "value": "D", "text": "∞" }
    ],
    "correctAnswer": "B",
    "explanation": "Use sign chart"
  },
  {
    "id": "rational-9",
    "type": "multiple-choice",
    "question": "The function y = f(x) has the domain -6 <= x <= 10 and range 0 <= y <= 4. The graph of y = h(x) is the result of the transformation h(x) = 3f(x-4)+2. Which of the following gives the range of h(x)?",
    "options": [
      { "label": "A", "value": "A", "text": "-2 <= y <= 10" },
      { "label": "B", "value": "B", "text": "2 <= y <= 6" },
      { "label": "C", "value": "C", "text": "2 <= y <= 14" },
      { "label": "D", "value": "D", "text": "6 <= y <= 18" }
    ],
    "correctAnswer": "C",
    "explanation": "Inverse x transformation, y transformation by plugging into equation"
  },
  {
    "id": "rational-10",
    "type": "multiple-choice",
    "question": "Let $g(x) = \\frac{(x-2)^2(x+3)^3(x-4)^2}{(x-2)^3(x+3)^2}$ The graph of g has zeros at which of the following values of x?",
    "options": [
      { "label": "A", "value": "A", "text": "x = 4 only" },
      { "label": "B", "value": "B", "text": "x = 4 and x = -3 only" },
      { "label": "C", "value": "C", "text": "x = 2 and x = -3 only" },
      { "label": "D", "value": "D", "text": "x = 4, x = 2, and x = -3" }
    ],
    "correctAnswer": "A",
    "explanation": "4 is not factored out from the top"
  },
  {
    "id": "rational-11",
    "type": "multiple-choice",
    "question": "Let $k(x) = \\frac{3x^2-4x+12}{x+2}$ Which of the following is the equation of the slant asymptote of the graph of k?",
    "options": [
      { "label": "A", "value": "A", "text": "y=3x-2" },
      { "label": "B", "value": "B", "text": "y=3x+2" },
      { "label": "C", "value": "C", "text": "y=3x-6" },
      { "label": "D", "value": "D", "text": "y=3x-10" }
    ],
    "correctAnswer": "D",
    "explanation": "Divide the top by the bottom"
  },
  {
    "id": "rational-12",
    "type": "multiple-choice",
    "question": "The graph of y = k(x), consisting of three line segments, is shown for -2 <= x <= 4. The graph of y = m(x) is the result of transforming the graph of k. Which of the following gives the transformation from k to m.?",
    "image": "/images/apprecalc/rational2.png",
    "options": [
      { "label": "A", "value": "A", "text": "m(x) = k(2x)" },
      { "label": "B", "value": "B", "text": "m(x) = -k(x/2)" },
      { "label": "C", "value": "C", "text": "m(x) = 2k(x)" },
      { "label": "D", "value": "D", "text": "m(x) = (1/2)k(x)" }
    ],
    "correctAnswer": "A",
    "explanation": "Take the domain of m and then find the inverse to get it from -2 to -1; it would be 1/2 and the inverse is 2 so the answer is 2"
  },
  {
    "id": "rational-13",
    "type": "multiple-choice",
    "question": "The tables give values of f and g at selected values of x. The graph of y = g(x) is the result of transforming the graph of f. Which of the following could be the transformation from f to g?",
    "image": "/images/apprecalc/rational3.png",
    "options": [
      { "label": "A", "value": "A", "text": "g(x) = f(x-4)-1" },
      { "label": "B", "value": "B", "text": "g(x) = f(x-4)+1" },
      { "label": "C", "value": "C", "text": "g(x) = f(x+4)-1" },
      { "label": "D", "value": "D", "text": "g(x) = f(x+4)+1" }
    ],
    "correctAnswer": "A",
    "explanation": "Math"
  },
  {
    "id": "rational-14",
    "type": "multiple-choice",
    "question": "A rational function k is given by $k(x) = \\frac{-2(x+1)^2(x-3)}{x-7}$ What are all intervals on which k(x) ≤ 0?",
    "options": [
      { "label": "A", "value": "A", "text": "[3, 7)" },
      { "label": "B", "value": "B", "text": "[-1, 3] U (7, ∞)" },
      { "label": "C", "value": "C", "text": "(-∞, -1] U [3, 7)" },
      { "label": "D", "value": "D", "text": "(-∞, 3] U (7, ∞)" }
    ],
    "correctAnswer": "D",
    "explanation": "Sign chart"
  },
  {
    "id": "rational-15",
    "type": "multiple-choice",
    "question": "A track athlete is running laps. The graph shows the average rate of change from the previous lap. A function model T is constructed for the time of each lap. Which of the following statements best supports the selection of the model of a model for T?",
    "image": "/images/apprecalc/rational4.png",
    "options": [
      { "label": "A", "value": "A", "text": "Since the rate of change is roughly linear, a linear model is best for T" },
      { "label": "B", "value": "B", "text": "Since the rate of change is roughly linear, a quadratic model is best for T" },
      { "label": "C", "value": "C", "text": "Since the rate of change is roughly linear, a cubic model is best for T" },
      { "label": "D", "value": "D", "text": "Since the rate of change is negative and positive, a quadratic model is best for T" }
    ],
    "correctAnswer": "B",
    "explanation": "Cubic and the negative and positive options are obviously wrong, it isn't linear because the rate of change would stay the same and this graph represents the rate of change, so it is quadratic."
  },
  {
    "id": "rational-16",
    "type": "multiple-choice",
    "question": "[Calculator] An aquarium is building a tank for a shark and has determined that the function V(x) = -x^3 + 2.5x^2 + 5.5x - 7 will model the volume, V, in hundreds of gallons, based on the width of x of the tank. Which of the following is a reasonable domain for V(x)?",
    "options": [
      { "label": "A", "value": "A", "text": "-2 < x < 3.5" },
      { "label": "B", "value": "B", "text": "1 < x < 2" },
      { "label": "C", "value": "C", "text": "x > 1" },
      { "label": "D", "value": "D", "text": "1 < x < 3.5" }
    ],
    "correctAnswer": "D",
    "explanation": "x or y can't be negative or 0"
  },
  {
    "id": "rational-17",
    "type": "multiple-choice",
    "question": "[Calculator] The current I (in amperes) in an electrical conductor is inversely proportional to the resistance R (in ohms) of the conductor. If the current is 6 amperes when the resistance is 341 ohms, what is the current when the resistance if 737 ohms?",
    "options": [
      { "label": "A", "value": "A", "text": "2.8 amps" },
      { "label": "B", "value": "B", "text": "0.36 amps" },
      { "label": "C", "value": "C", "text": "0.08 amps" },
      { "label": "D", "value": "D", "text": "13 amps" }
    ],
    "correctAnswer": "A",
    "explanation": "x = a/y; 6 = a/341 6*341 = 2046, 2046/737 = 2.776 ~ 2.8"
  },
  {
    "id": "rational-18",
    "type": "multiple-choice",
    "question": "[Calculator] A car rental company charges a flat fee of $45 to rent a car and $30 per day for the first five days it is rented. Afterwards, the company charges $45 per day for every day over the first five days. Which of the following functions C(x) gives the cost C, in dollars, of the car rental after x days?",
    "options": [
      { "label": "A", "value": "A", "text": "C(x) = { 30x {0 <= x <= 5}, 45x {x > 5}" },
      { "label": "B", "value": "B", "text": "C(x) = { 45+30x {0 <= x <= 5}, 45x {x > 5}" },
      { "label": "C", "value": "C", "text": "C(x) = { 45+30x {0 <= x <= 5}, 195+45(x-5) {x > 5}" },
      { "label": "D", "value": "D", "text": "C(x) = { 45+30x {0 <= x <= 5}, 195+45x {x > 5}" }
    ],
    "correctAnswer": "C",
    "explanation": "Math"
  },
  {
    "id": "rational-19",
    "type": "multiple-choice",
    "question": "[Calculator] An artisan who sells her crafts online has found that, if she spends t hours on a craft, the average consumer satisfaction rating out of 5 can be modeled by the function S(t) = 0.11t^3 - 0.98t^2 + 2.81t + 1.5. For 1 <= t <= 5, which of the following is true?",
    "options": [
      { "label": "A", "value": "A", "text": "The range of S(t) is [1.5, 4.8]. This means the artisan typically spends between 1.5 and 4.8 hours on crafts." },
      { "label": "B", "value": "B", "text": "The range of S(t) is [1.5, 4.8]. This means the average satisfaction scores for this artisan's crafts are between 1.5 and 4.8 out of 5" },
      { "label": "C", "value": "C", "text": "The range of S(t) is [3.44, 4.8]. This means the artisan typically spends between 3.44 and 4.8 hours on crafts" },
      { "label": "D", "value": "D", "text": "The range of S(t) is [3.44, 4.8]. This means the average satisfaction scores for this artisan's crafts are between 3.44 and 4.8 out of 5" }
    ],
    "correctAnswer": "D",
    "explanation": "Logical thinking"
  },
  {
    "id": "rational-20",
    "type": "multiple-choice",
    "question": "[Calculator] Find the average rate of change of the function $r(x) = \\frac{0.5x^2+2}{0.7x^3-1}$ over the interval $-2 \\leq x \\leq 1$.",
    "options": [
      { "label": "A", "value": "A", "text": "2.578" },
      { "label": "B", "value": "B", "text": "-2.578" },
      { "label": "C", "value": "C", "text": "7.727" },
      { "label": "D", "value": "D", "text": "-8.939" }
    ],
    "correctAnswer": "B",
    "explanation": "Use the calculator"
  },
  {
    "id": "rational-21",
    "type": "multiple-choice",
    "question": "[Calculator] Selected values of x are displayed above for the polynomial function f(x). Which of the following statements is true?",
    "image": "/images/apprecalc/rational5.png",
    "options": [
      { "label": "A", "value": "A", "text": "The function is quadratic because second differences are a nonzero constant" },
      { "label": "B", "value": "B", "text": "The function is quadratic because third differences are a nonzero constant" },
      { "label": "C", "value": "C", "text": "The function is cubic because second differences are a nonzero constant" },
      { "label": "D", "value": "D", "text": "The function is cubic because third differences are a nonzero constant" }
    ],
    "correctAnswer": "D",
    "explanation": "Math"
  },
  {
    "id": "rational-22",
    "type": "free-response",
    "question": "Let g be a rational function defined as $g(x) = \\frac{f(x)}{x^2+4x-12}$, where f(x) is a polynomial. Write one possible expression for f(x) such that the graph of g has a hole at x = 2 and zero at x = 1.",
    "correctAnswer": "$f(x) = (x-1)(x-2)$",
    "explanation": "Logic"
  },
  {
    "id": "rational-23",
    "type": "free-response",
    "question": "Let g be a rational function defined as $g(x) = \\frac{f(x)}{x^2+4x-12}$, where f(x) is a polynomial. Write one possible expression for f(x) such that the graph of g has a horizontal asymptote of y = 2.",
    "correctAnswer": "$f(x) = 2(x-1)(x+2)$",
    "explanation": "Logic"
  },
  {
    "id": "rational-25",
    "type": "free-response",
    "question": "If $f(x) = (x+6)(x+4)$, identify any vertical asymptotes for the graph of g where $g(x) = \\frac{f(x)}{x^2+4x-12}$, or state that the graph of g has no vertical asymptotes.",
    "correctAnswer": "If $f(x) = (x+6)(x+4)$, there is a vertical asymptote at x = 2.",
    "explanation": "Logic"
  },
  {
    "id": "rational-26",
    "type": "free-response",
    "question": "If $g(x) = -3(x+1)^5(x-3)^2$, evaluate the following limits: a) $\\lim_{x \\to -\\infty} g(x) = $ b) $\\lim_{x \\to \\infty} g(x) = $",
    "correctAnswer": "a) $\\infty$ b) $-\\infty$",
    "explanation": "Finding the vertical asymptote using the highest degree numerator and the denominator"
  },
  {
    "id": "rational-27",
    "type": "free-response",
    "question": "[Calculator] The number of active accounts on the social media app Instagram has grown drastically since 2013. The table gives the number of active Instagram accounts, in billions, for selected years since 2013. The quadratic function A models the number of active Instagram accounts, in billions, as a function of time t in years since 2013. A quadratic model A(t) = at^2 + bt + c can be used to model the relationship of the quantities. Write the equation for A(t)",
    "image": "/images/apprecalc/rational6.png",
    "correctAnswer": "A(t) = 0.0172261t^2 + 0.0753753t + 0.118392",
    "explanation": "Calculator"
  },
  {
    "id": "rational-28",
    "type": "free-response",
    "question": "[Calculator] The number of active accounts on the social media app Instagram has grown drastically since 2013. The table gives the number of active Instagram accounts, in billions, for selected years since 2013. The quadratic function A models the number of active Instagram accounts, in billions, as a function of time t in years since 2013. A quadratic model A(t) = at^2 + bt + c can be used to model the relationship of the quantities. Using the function A(t), predict the number of active Instagram accounts for the year 2025.",
    "image": "/images/apprecalc/rational6.png",
    "correctAnswer": "The number of active Instagram accounts for the year 2025 is predicted to be around 3.50345 billion accounts.",
    "explanation": "Calculator"
  },
  {
    "id": "rational-29",
    "type": "free-response",
    "question": "[Calculator] The number of active accounts on the social media app Instagram has grown drastically since 2013. The table gives the number of active Instagram accounts, in billions, for selected years since 2013. The quadratic function A models the number of active Instagram accounts, in billions, as a function of time t in years since 2013. A quadratic model A(t) = at^2 + bt + c can be used to model the relationship of the quantities. Using the function A(t), predict the year the number of active Instagram accounts reach 10 billion.",
    "image": "/images/apprecalc/rational6.png",
    "correctAnswer": "The year the number of active Instagram accounts reach 10 billion is predicted to be 2034.86271 or during 2034",
    "explanation": "Calculator"
  },
  {
    "id": "rational-30",
    "type": "free-response",
    "question": "[Calculator] The number of active accounts on the social media app Instagram has grown drastically since 2013. The table gives the number of active Instagram accounts, in billions, for selected years since 2013. The quadratic function A models the number of active Instagram accounts, in billions, as a function of time t in years since 2013. Using the given data to find the average rate of change in the number of accounts, in accounts per year, from t = 2 to t = 7. Express your answer a decimal approximation.",
    "image": "/images/apprecalc/rational6.png",
    "correctAnswer": "0.186",
    "explanation": "Calculator"
  },
  {
    "id": "rational-31",
    "type": "free-response",
    "question": "[Calculator] The number of active accounts on the social media app Instagram has grown drastically since 2013. The table gives the number of active Instagram accounts, in billions, for selected years since 2013. The quadratic function A models the number of active Instagram accounts, in billions, as a function of time t in years since 2013. Using the given data to find the average rate of change in the number of accounts, in accounts per year, from t = 2 to t = 7. Then use the average rate of change to estimate the number of accounts for the year 2018.",
    "image": "/images/apprecalc/rational6.png",
    "correctAnswer": "y = 0.186x + 0.118392, It will be around 1.048392 billion accounts for the year 2018 according to the 0.186 rate of change",
    "explanation": "Calculator"
  },
];
