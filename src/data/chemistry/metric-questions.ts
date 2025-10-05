import { Question } from '@/types/quiz';

export const metricQuestions: Question[] = [
  
  {
    id: 'metric-14',
    type: 'multiple-choice',
    question: 'In the paragraph above, there is 9 underlined properties. How many of the properties are chemical properties?',
    image: "/images/chemistry/metric1.png",
    options: [
      { "label": "A", "value": "A", "text": "2", },
      { "label": "B", "value": "B", "text": "3", },
      { "label": "C", "value": "C", "text": "4", },
      { "label": "D", "value": "D", "text": "5", }
    ],
    correctAnswer: 'B',
    explanation: 'Well-defined intermetallic compounds, pryophoric, react explosively with water'
  },
];
