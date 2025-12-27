//Damiani
import { Question } from '@/types/quiz';

export const exponentialQuestions: Question[] = [
  {
    id: "exponential-1",
    type: "multiple-choice",
    question: "Selected values of the terms of an arithmetic sequence a_n are graphed in the figure above. Which of following is an expression for the n'th term of the arithmetic sequence?",
    image: "/images/apprecalc/exponential14.png",
    options: [
      { "label": "A", "value": "A", "text": "a_n = 1 + 2(n-6)/3" },
      { "label": "B", "value": "B", "text": "a_n = 5 + 2(n-6)/3" },
      { "label": "C", "value": "C", "text": "a_n = 5 + 2(n+6)/3" },
      { "label": "D", "value": "D", "text": "a_n = 5 + 3(n-6)/2" }
    ],
    correctAnswer: "B",
    explanation: "."
  },
  {
    id: "exponential-2",
    type: "multiple-choice",
    question: "Let m(x) = 5(2/3)^x-1. Which of the following statements about m is correct?",
    options: [
      { "label": "A", "value": "A", "text": "m is increasing and the graph of m is concave up" },
      { "label": "B", "value": "B", "text": "m is increasing and the graph of m is concave down" },
      { "label": "C", "value": "C", "text": "m is deceeasing and the graph of m is concave up" },
      { "label": "D", "value": "D", "text": "m is decreasing and the graph of m is concave down" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-3",
    type: "multiple-choice",
    question: "The function g is an exponential function that increases at a decreasing rate for all values of x. Which of the following pairs of limit statements could describe the end behaviors for the graph of g?",
    options: [
      { "label": "A", "value": "A", "text": "lim_x--> -∞ g(x) = -∞ and lim_x-->∞ g(x) = 0" },
      { "label": "B", "value": "B", "text": "lim_x--> -∞ g(x) = -∞ and lim_x-->∞ g(x) = ∞" },
      { "label": "C", "value": "C", "text": "lim_x--> -∞ g(x) = 0 and lim_x-->∞ g(x) = ∞" },
      { "label": "D", "value": "D", "text": "lim_x--> -∞ g(x) = ∞ and lim_x-->∞ g(x) = 0" }
    ],
    correctAnswer: "A",
    explanation: "."
  },
  {
    id: "exponential-4",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential8.png",
    question: "Selected values of function g are given in table above. Which of the following statements about g is most appropriate?",
    options: [
      { "label": "A", "value": "A", "text": "g could be linear because over equal-length input-value intervals, the output values change at a constant rate." },
      { "label": "B", "value": "B", "text": "g could be linear because the output values change linearly as the input values change proportionally" },
      { "label": "C", "value": "C", "text": "g could be exponential because over equal-length input-value intervals, the output values change proportionally" },
      { "label": "D", "value": "D", "text": "g could be exponential because the output values change linearly as the input values change proportionally" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-5",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential9.png",
    question: "The exponential function h is defined by h(x) = ab^x, where a and b are positive constants. The table above gives values of h(x) at selected values of x. Which of the following statements is true.",
    options: [
      { "label": "A", "value": "A", "text": "h demonstrates exponential decay because 0 < a < 1 and b > 1" },
      { "label": "B", "value": "B", "text": "h demonstrates exponential decay because a > 0 and 0 < b < 1" },
      { "label": "C", "value": "C", "text": "h demonstrates exponential growth because a > 0 and 0 < b < 1" },
      { "label": "D", "value": "D", "text": "h demonstrates exponential growth because a > 0 and b > 1" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-6",
    type: "multiple-choice",
    question: "Which of the following functions is an equivalent form of the function k(x) = 4 * 9^2x",
    options: [
      { "label": "A", "value": "A", "text": "k(x) = (36)^2x" },
      { "label": "B", "value": "B", "text": "k(x) = 4(3)^x" },
      { "label": "C", "value": "C", "text": "k(x) = 4(81)^x" },
      { "label": "D", "value": "D", "text": "k(x) = 16(81)^x" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-7",
    type: "multiple-choice",
    question: "The function f is given by f(x) = 2x. For any function g(x), which of the following is true?",
    options: [
      { "label": "A", "value": "A", "text": "g(f(x)) is a vertical dilation of g by a factor of 2, and f(g(x)) is a horizontal dilation of g by a factor of 2" },
      { "label": "B", "value": "B", "text": "g(f(x)) is a vertical dilation of g by a factor of 2, and f(g(x)) is a horizontal dilation of g by a factor of 1/2" },
      { "label": "C", "value": "C", "text": "g(f(x)) is a horizontal dilation of g by a factor of 2, and f(g(x)) is a vertical dilation of g by a factor of 2" },
      { "label": "D", "value": "D", "text": "g(f(x)) is a horizontal dilation of g by a factor of 1/2, and f(g(x)) is a vertical dilation of g by a factor of 2" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-8",
    type: "multiple-choice",
    question: "Which of the following functions is an equivalent form of the function y = 3^(x+3)?",
    options: [
      { "label": "A", "value": "A", "text": "y = 27^x" },
      { "label": "B", "value": "B", "text": "y = 9(3)^x" },
      { "label": "C", "value": "C", "text": "y = 27+3^x" },
      { "label": "D", "value": "D", "text": "y = 27(3)^x" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-9",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential10.png",
    question: "After returning home from running a half marathon, Mr. Damiani notices a large number of crabgrass in his yard and decides to apply weed killer to his yard. The decreasing function D gives the number of crabgrass in his yard. The table above gives values of D(t) for selected values of t, in days, since Mr. Damiani applied week killer to his yard. If a model is constructed to represent these data, which of the following best applies to this situation?",
    options: [
      { "label": "A", "value": "A", "text": "y = 81(1/3)^t" },
      { "label": "B", "value": "B", "text": "y = 81(2/3)^t" },
      { "label": "C", "value": "C", "text": "y = 81-27(t)" },
      { "label": "D", "value": "D", "text": "y = 81-2t/3" }
    ],
    correctAnswer: "B",
    explanation: "."
  },
  {
    id: "exponential-10",
    type: "multiple-choice",
    question: "From 2011 - 2015, the number of electric vehicles purchased in Norway grew exponentially, The percent of all new vehicles purchased that were electroic modeled by the function E, which increased by 96.8% each year. In 2011 (t=0), 1.6% of all new cars purchased in Norway were electric. If t is measured in months, which of the following is an expression for E(t)? (Note: There are twelve months in one year.)",
    options: [
      { "label": "A", "value": "A", "text": "1.6(0.968)^(t/12)" },
      { "label": "B", "value": "B", "text": "1.6(0.968)^(12t)" },
      { "label": "C", "value": "C", "text": "1.6(1.968)^(t/12)" },
      { "label": "D", "value": "D", "text": "1.6(1.968)^(12t)" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-11",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential15.png",
    question: "A quadratic regression was used to develop a model for a given set of data. The figure above shows a graph of the residuals of the quadratic regression. Which of the following statements about the quadratic regression is true?",
    options: [
      { "label": "A", "value": "A", "text": "The quadratic model is not appropriate because there is a clear pattern in the graph of the residuals." },
      { "label": "B", "value": "B", "text": "The quadratic model is not appropriate because there are more positive residual values than negative residual values." },
      { "label": "C", "value": "C", "text": "The quadratic model is appropriate because there is a linear pattern in the graph of the residuals" },
      { "label": "D", "value": "D", "text": "The quadratic model is appropriate because none of the residuals fall outside the pattern in the graph of the residuals" }
    ],
    correctAnswer: "A",
    explanation: "."
  },
  {
    id: "exponential-12",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential16.png",
    question: "A set of data was used to create a linear, a quadratic, and an exponential regression model. The residual plots for the three models are shown above. Based on the three residual plots, which of the following could be an appropriate model for the data?",
    options: [
      { "label": "A", "value": "A", "text": "5.7 - 2.9x" },
      { "label": "B", "value": "B", "text": "-1.3x^2 + 2.1x + 0.3" },
      { "label": "C", "value": "C", "text": "-0.3(1.72)^x" },
      { "label": "D", "value": "D", "text": "-0.3 + 2.4log(x)" }
    ],
    correctAnswer: "A",
    explanation: "."
  },
  {
    id: "exponential-13",
    type: "multiple-choice",
    question: "If p(x) = 2x-4, which of the following is an expression for p^-1(x)?",
    options: [
      { "label": "A", "value": "A", "text": "4x + 2" },
      { "label": "B", "value": "B", "text": "x/2 + 4" },
      { "label": "C", "value": "C", "text": "2(x + 4)" },
      { "label": "D", "value": "D", "text": "1(x+4)/2" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-14",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential13.png",
    question: "The graph of piecewise-linear function h is shown in the figure. Values of the decreasing function k are given in the table above for selected values of x. The maximum value of h^-1 is: ",
    options: [
      { "label": "A", "value": "A", "text": "1/5" },
      { "label": "B", "value": "B", "text": "1/4" },
      { "label": "C", "value": "C", "text": "4" },
      { "label": "D", "value": "D", "text": "5" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-15",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential13.png",
    question: "The graph of piecewise-linear function h is shown in the figure. Values of the decreasing function k are given in the table above for selected values of x. Which of the following gives the domain of h^-1?",
    options: [
      { "label": "A", "value": "A", "text": "[-3, 5]" },
      { "label": "B", "value": "B", "text": "[-4, -3]" },
      { "label": "C", "value": "C", "text": "[-4, 4]" },
      { "label": "D", "value": "D", "text": "[-5, 3]" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-16",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential13.png",
    question: "The graph of piecewise-linear function h is shown in the figure. Values of the decreasing function k are given in the table above for selected values of x. h(k(3)) = ",
    options: [
      { "label": "A", "value": "A", "text": "-7" },
      { "label": "B", "value": "B", "text": "-4" },
      { "label": "C", "value": "C", "text": "-3" },
      { "label": "D", "value": "D", "text": "0" }
    ],
    correctAnswer: "B",
    explanation: "."
  },
  {
    id: "exponential-17",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential13.png",
    question: "The graph of piecewise-linear function h is shown in the figure. Values of the decreasing function k are given in the table above for selected values of x. k^-1(h(-3)) = ",
    options: [
      { "label": "A", "value": "A", "text": "-8" },
      { "label": "B", "value": "B", "text": "2" },
      { "label": "C", "value": "C", "text": "3" },
      { "label": "D", "value": "D", "text": "4" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-18",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential13.png",
    question: "The graph of piecewise-linear function h is shown in the figure. Values of the decreasing function k are given in the table above for selected values of x. h^-1(k^-1(3)) = ",
    options: [
      { "label": "A", "value": "A", "text": "-7" },
      { "label": "B", "value": "B", "text": "-4" },
      { "label": "C", "value": "C", "text": "-3" },
      { "label": "D", "value": "D", "text": "-1" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-19",
    type: "free-response",
    image: "/images/apprecalc/exponential12.png",
    question: "The table presents values for an exponential function f at selected values of x, where f(x) = a(b)^x + k. Find the value of b.",
    correctAnswer: "b = 2",
    explanation: "."
  },
  {
    id: "exponential-20",
    type: "free-response",
    image: "/images/apprecalc/exponential12.png",
    question: "The table presents values for an exponential function f at selected values of x, where f(x) = a(b)^x + k. Use the given data to write two equations that can be used to find values for the constants a and k in the expression for f(x).",
    correctAnswer: "a(2)^0 + k = 1, a(2)^1 + k = 4",
    explanation: "."
  },
  {
    id: "exponential-21",
    type: "free-response",
    image: "/images/apprecalc/exponential12.png",
    question: "The table presents values for an exponential function f at selected values of x, where f(x) = a(b)^x + k. Use the two equations that can be used to find values for the constants a and k in the expression for f(x). What is the values of a and k",
    correctAnswer: "a = 3, k = -2, f(x) = 3(2)^x - 2",
    explanation: "."
  },
  {
    id: "exponential-22",
    type: "free-response",
    image: "/images/apprecalc/exponential12.png",
    question: "Find the value of f(f(1))",
    correctAnswer: "f(f(1)) = 46",
    explanation: "."
  },
  {
    id: "exponential-23",
    type: "free-response",
    question: "Using the equation f(x) = 3(2)^x - 2, find the value of f(-2)",
    correctAnswer: "f(-2) = -5/4",
    explanation: "."
  },
  {
    id: "exponential-24",
    type: "multiple-choice",
    question: "[Calculator] The growth of a bacteria in a culture is modeled by y = 2.3(e)^(1.5t), where t is the measured in days. At what time t is the number of bacteria approximately 210?",
    options: [
      { "label": "A", "value": "A", "text": "t = 3.009 days" },
      { "label": "B", "value": "B", "text": "t = 3.063 days" },
      { "label": "C", "value": "C", "text": "t = 5.612 days" },
      { "label": "D", "value": "D", "text": "t = 5.758 days" }
    ],
    correctAnswer: "A",
    explanation: "."
  },
  {
    id: "exponential-25",
    type: "multiple-choice",
    question: "[Calculator] During flu season at one school, Administrators feared that the flu was spreading exponentially. Ten students had the flu three days after the initial flu case, and 20 students had the flu one week after the initial flu case. If an exponential regression function F(t) is used to model the number of students F who have the flue t days after the initial flu case, what is the predicted number of students who will have the flu two weeks after the initial case?",
    options: [
      { "label": "A", "value": "A", "text": "28" },
      { "label": "B", "value": "B", "text": "38" },
      { "label": "C", "value": "C", "text": "67" },
      { "label": "D", "value": "D", "text": "113" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-26",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential1.png",
    question: "[Calculator] The function i gives the total number of iPhones sold worldwide yearly from 2007-2012. The table above gives the number of iPhones sold, in millions, for the years 2007 - 2012. A quadratic regression y = at^2 + bt + c is used to model the function i. What is the residual for the number of iPhones sold (in millions) in year 2009?",
    options: [
      { "label": "A", "value": "A", "text": "-12.742" },
      { "label": "B", "value": "B", "text": "1.801" },
      { "label": "C", "value": "C", "text": "5.954" },
      { "label": "D", "value": "D", "text": "18.929" }
    ],
    correctAnswer: "B",
    explanation: "."
  },
  {
    id: "exponential-27",
    type: "multiple-choice",
    question: "[Calculator] The popluation of deer in a forest is modeled by a team of wildlife biologists. Two function models are created: D(t) = 0.21t^2 + 1.72t + 6.18 and E(t) = 5.02(1.19)^t, where t = 0 represents 2020 and 0 <= t <= 20. What is the earliest calender year that the population predicted by the exponential model exceeds that predicted by the quadratic model?",
    options: [
      { "label": "A", "value": "A", "text": "2034" },
      { "label": "B", "value": "B", "text": "2035" },
      { "label": "C", "value": "C", "text": "2037" },
      { "label": "D", "value": "D", "text": "2039" }
    ],
    correctAnswer: "C",
    explanation: "."
  },
  {
    id: "exponential-28",
    type: "multiple-choice",
    question: "[Calculator] A geometric sequence g_n has known terms g_4 = 9 and g_7 30.375. What is the value of g_12?",
    options: [
      { "label": "A", "value": "A", "text": "66.000" },
      { "label": "B", "value": "B", "text": "85.500" },
      { "label": "C", "value": "C", "text": "129.746" },
      { "label": "D", "value": "D", "text": "230.660" }
    ],
    correctAnswer: "D",
    explanation: "."
  },
  {
    id: "exponential-29",
    type: "multiple-choice",
    image: "/images/apprecalc/exponential2.png",
    question: "[Calculator] The table above gives values of the function y = f(x) for selected values of x. Which of the following input-output pairs describes f^-1?",
    options: [
      { "label": "A", "value": "A", "text": "", "image": "/images/apprecalc/exponential3.png" },
      { "label": "B", "value": "B", "text": "", "image": "/images/apprecalc/exponential4.png" },
      { "label": "C", "value": "C", "text": "", "image": "/images/apprecalc/exponential5.png" },
      { "label": "D", "value": "D", "text": "", "image": "/images/apprecalc/exponential6.png" }
    ],
    correctAnswer: "B",
    explanation: "."
  },
  {
    id: "exponential-30",
    type: "free-response",
    image: "/images/apprecalc/exponential7.png",
    question: "[Calculator] An online newspaper has tried adjusting its prices to deal with rising inflation without losing so many customers as to make the price increase counterproductive. The newspaper started out free and then tried two different prices in two different months and looked at the number of subscribers, in thousands, in each month. The table shows the subscriber and price data. The number of subscribers can be modeled by the function S given by S(p) = ab^p, where S(p) is the number of subscribers, in thousands, for a subscription price of p dollars. Use the given data to find the average rate of change, in thousands of subscribers per dollar, from p=0 to p=13.5. Express your answer as a decimal approximation. Show the computations that lead to your answer.",
    correctAnswer: "-6.6267",
    explanation: "."
  },
  {
    id: "exponential-31",
    type: "free-response",
    image: "/images/apprecalc/exponential7.png",
    question: "[Calculator] An online newspaper has tried adjusting its prices to deal with rising inflation without losing so many customers as to make the price increase counterproductive. The newspaper started out free and then tried two different prices in two different months and looked at the number of subscribers, in thousands, in each month. The table shows the subscriber and price data. The number of subscribers can be modeled by the function S given by S(p) = ab^p, where S(p) is the number of subscribers, in thousands, for a subscription price of p dollars. Use the given data to find the average rate of change, in thousands of subscribers per dollar, from p=0 to p=13.5. Using the average rate of change, interpret the meaning in the context of the problem.",
    correctAnswer: "On the interval from $0 in price to $13.5 in price, the amount of subscribers decreased by an average rate of 6.6267 dollars in price per subscribers (in thousands).",
    explanation: "."
  },
  {
    id: "exponential-32",
    type: "free-response",
    image: "/images/apprecalc/exponential7.png",
    question: "[Calculator] An online newspaper has tried adjusting its prices to deal with rising inflation without losing so many customers as to make the price increase counterproductive. The newspaper started out free and then tried two different prices in two different months and looked at the number of subscribers, in thousands, in each month. The table shows the subscriber and price data. Use the given data to write two equations that can be used to find the values for the contstants a and b.",
    correctAnswer: "a(b)^12 = 66.96, a(b)^0 = 150",
    explanation: "."
  },
  {
    id: "exponential-33",
    type: "free-response",
    image: "/images/apprecalc/exponential7.png",
    question: "[Calculator] An online newspaper has tried adjusting its prices to deal with rising inflation without losing so many customers as to make the price increase counterproductive. The newspaper started out free and then tried two different prices in two different months and looked at the number of subscribers, in thousands, in each month. The table shows the subscriber and price data. Use the given data to write two equations and find the values of a and b",
    correctAnswer: "a = 150, b = 0.934997282926",
    explanation: "."
  },
  {
    id: "exponential-34",
    type: "free-response",
    image: "/images/apprecalc/exponential7.png",
    question: "[Calculator] An online newspaper has tried adjusting its prices to deal with rising inflation without losing so many customers as to make the price increase counterproductive. The newspaper started out free and then tried two different prices in two different months and looked at the number of subscribers, in thousands, in each month. The table shows the subscriber and price data. Use the given data to write two equations and find the values of a and b and does the function S(p) model exponential growth or exponential decay? Explain your answer based on your values of a and b.",
    correctAnswer: "The function S(p) models exponential decay because the value b is less than 1 and greater than 0 which means it decreases and since the starting value is at a=150 which is high, it will decrease.",
    explanation: "."
  },
];
