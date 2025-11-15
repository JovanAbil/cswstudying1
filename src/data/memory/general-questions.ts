import { Question } from '@/types/quiz';

export const generalQuestions: Question[] = [
  {
    "id": "memory-1",
    "type": "multiple-choice",
    "question": "What is the capital of France?",
    "options": [
      { "label": "A", "value": "A", "text": "London" },
      { "label": "B", "value": "B", "text": "Berlin" },
      { "label": "C", "value": "C", "text": "Paris" },
      { "label": "D", "value": "D", "text": "Madrid" }
    ],
    "correctAnswer": "C",
    "explanation": "Paris is the capital and most populous city of France."
  },
  {
    "id": "memory-2",
    "type": "free-response",
    "question": "What year did World War II end?",
    "correctAnswer": "1945",
    "explanation": "World War II ended in 1945, with Germany surrendering in May and Japan in August."
  },
  {
    "id": "memory-3",
    "type": "multiple-choice",
    "question": "Who painted the Mona Lisa?",
    "options": [
      { "label": "A", "value": "A", "text": "Vincent van Gogh" },
      { "label": "B", "value": "B", "text": "Leonardo da Vinci" },
      { "label": "C", "value": "C", "text": "Pablo Picasso" },
      { "label": "D", "value": "D", "text": "Michelangelo" }
    ],
    "correctAnswer": "B",
    "explanation": "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
  },
  {
    "id": "memory-4",
    "type": "multiple-choice",
    "question": "What is the largest planet in our solar system?",
    "options": [
      { "label": "A", "value": "A", "text": "Saturn" },
      { "label": "B", "value": "B", "text": "Jupiter" },
      { "label": "C", "value": "C", "text": "Neptune" },
      { "label": "D", "value": "D", "text": "Earth" }
    ],
    "correctAnswer": "B",
    "explanation": "Jupiter is the largest planet in our solar system, with a mass more than twice that of all the other planets combined."
  },
  {
    "id": "memory-5",
    "type": "free-response",
    "question": "What is the chemical symbol for gold?",
    "correctAnswer": "Au",
    "explanation": "The chemical symbol for gold is Au, derived from the Latin word 'aurum'."
  },
  {
    "id": "memory-6",
    "type": "multiple-choice",
    "question": "Which ocean is the largest?",
    "options": [
      { "label": "A", "value": "A", "text": "Atlantic Ocean" },
      { "label": "B", "value": "B", "text": "Indian Ocean" },
      { "label": "C", "value": "C", "text": "Arctic Ocean" },
      { "label": "D", "value": "D", "text": "Pacific Ocean" }
    ],
    "correctAnswer": "D",
    "explanation": "The Pacific Ocean is the largest ocean on Earth, covering more than 30% of the planet's surface."
  },
  {
    "id": "memory-7",
    "type": "multiple-choice",
    "question": "How many continents are there?",
    "options": [
      { "label": "A", "value": "A", "text": "5" },
      { "label": "B", "value": "B", "text": "6" },
      { "label": "C", "value": "C", "text": "7" },
      { "label": "D", "value": "D", "text": "8" }
    ],
    "correctAnswer": "C",
    "explanation": "There are 7 continents: Africa, Antarctica, Asia, Europe, North America, Australia/Oceania, and South America."
  },
  {
    "id": "memory-8",
    "type": "free-response",
    "question": "What is the speed of light in meters per second? (Use scientific notation: 3e8)",
    "correctAnswer": "3e8",
    "explanation": "The speed of light in a vacuum is approximately 3 × 10^8 meters per second (300,000,000 m/s)."
  },
  {
    "id": "memory-9",
    "type": "multiple-choice",
    "question": "Who wrote 'Romeo and Juliet'?",
    "options": [
      { "label": "A", "value": "A", "text": "Charles Dickens" },
      { "label": "B", "value": "B", "text": "William Shakespeare" },
      { "label": "C", "value": "C", "text": "Jane Austen" },
      { "label": "D", "value": "D", "text": "Mark Twain" }
    ],
    "correctAnswer": "B",
    "explanation": "William Shakespeare wrote the tragedy 'Romeo and Juliet' around 1594-1595."
  },
  {
    "id": "memory-10",
    "type": "multiple-choice",
    "question": "What is the smallest unit of life?",
    "options": [
      { "label": "A", "value": "A", "text": "Atom" },
      { "label": "B", "value": "B", "text": "Molecule" },
      { "label": "C", "value": "C", "text": "Cell" },
      { "label": "D", "value": "D", "text": "Organ" }
    ],
    "correctAnswer": "C",
    "explanation": "The cell is the smallest unit of life that can replicate independently and perform all necessary life functions."
  }
];
