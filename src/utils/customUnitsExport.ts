import { CustomUnit, CustomTopic } from '@/hooks/useCustomUnits';
import { Question } from '@/types/quiz';
import JSZip from 'jszip';

// Storage key for imported course challenge questions
const IMPORTED_QUESTIONS_KEY = 'imported-course-questions';

export interface ImportedQuestionSet {
  id: string;
  name: string;
  questions: Question[];
  importedAt: number;
}

// Get all imported question sets for a subject
export const getImportedQuestions = (subject: string): ImportedQuestionSet[] => {
  try {
    const stored = localStorage.getItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error('Failed to load imported questions');
  }
  return [];
};

// Save imported question set
export const saveImportedQuestions = (subject: string, questionSet: ImportedQuestionSet) => {
  const existing = getImportedQuestions(subject);
  const updated = [...existing, questionSet];
  localStorage.setItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`, JSON.stringify(updated));
};

// Remove imported question set
export const removeImportedQuestions = (subject: string, setId: string) => {
  const existing = getImportedQuestions(subject);
  const updated = existing.filter(qs => qs.id !== setId);
  localStorage.setItem(`${IMPORTED_QUESTIONS_KEY}-${subject}`, JSON.stringify(updated));
};

// Generate TypeScript content for any topic (built-in or custom)
export const generateBuiltInTopicFile = (questions: Question[], topicName: string, mathEnabled: boolean = false): string => {
  const variableName = toVariableName(topicName) + 'Questions';
  
  const formatQuestion = (q: Question, indent: string): string => {
    const lines: string[] = [];
    lines.push(`${indent}{`);
    lines.push(`${indent}  id: "${q.id}",`);
    lines.push(`${indent}  type: "${q.type}",`);
    lines.push(`${indent}  question: ${JSON.stringify(q.question)},`);
    
    if (q.type === 'multiple-choice' && q.options) {
      lines.push(`${indent}  options: ${JSON.stringify(q.options)},`);
    }
    
    lines.push(`${indent}  correctAnswer: ${JSON.stringify(q.correctAnswer)},`);
    lines.push(`${indent}  explanation: ${JSON.stringify(q.explanation || '')},`);
    
    if (q.image) {
      lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
    }
    
    // Include calculator field if true
    if (q.calculator) {
      lines.push(`${indent}  calculator: true,`);
    }
    
    lines.push(`${indent}},`);
    return lines.join('\n');
  };

  return `import { Question } from '@/types/quiz';

// Topic: ${topicName}
// Math Enabled: ${mathEnabled}
// Questions: ${questions.length}

export const ${variableName}: Question[] = [
${questions.map(q => formatQuestion(q, '  ')).join('\n')}
];
`;
};

// Download built-in topic as .ts file
export const downloadBuiltInTopic = (questions: Question[], topicName: string, mathEnabled: boolean = false) => {
  const content = generateBuiltInTopicFile(questions, topicName, mathEnabled);
  const filename = `${toSafeName(topicName)}-questions.ts`;
  
  const blob = new Blob([content], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Convert name to a safe filename/variable name
const toSafeName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

// Convert name to a valid JS variable name
const toVariableName = (name: string): string => {
  const safe = toSafeName(name);
  // Ensure it starts with a letter
  if (/^[0-9]/.test(safe)) {
    return 'q' + safe.replace(/-/g, '');
  }
  return safe.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
};

// Generate TypeScript content for a topic (with optional image path rewriting for unit export)
export const generateTopicFileContent = (topic: CustomTopic, unitName: string, rewriteImagePaths: boolean = false): string => {
  const variableName = `${toVariableName(topic.name)}Questions`;
  const topicPrefix = toSafeName(topic.name);
  
  const questionsWithIds = topic.questions.map((q, index) => {
    const newId = `${topicPrefix}-${index + 1}`;
    return { ...q, id: newId };
  });

  const formatQuestion = (q: Question, indent: string, qIndex: number): string => {
    const lines: string[] = [];
    lines.push(`${indent}{`);
    lines.push(`${indent}  id: "${q.id}",`);
    lines.push(`${indent}  type: "${q.type}",`);
    lines.push(`${indent}  question: ${JSON.stringify(q.question)},`);
    
    if (q.type === 'multiple-choice' && q.options) {
      lines.push(`${indent}  options: ${JSON.stringify(q.options)},`);
    }
    
    lines.push(`${indent}  correctAnswer: ${JSON.stringify(q.correctAnswer)},`);
    lines.push(`${indent}  explanation: ${JSON.stringify(q.explanation || '')},`);
    
    if (q.image) {
      if (rewriteImagePaths && q.image.startsWith('data:')) {
        // Rewrite to proper public path for unit export
        lines.push(`${indent}  image: "/images/${toSafeName(unitName)}/${topicPrefix}-q${qIndex + 1}.png",`);
      } else if (q.image.startsWith('data:')) {
        // For simple topic download, keep base64 with a note
        lines.push(`${indent}  // Note: Base64 image embedded - consider moving to public folder`);
        lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
      } else {
        lines.push(`${indent}  image: ${JSON.stringify(q.image)},`);
      }
    }
    
    // Include calculator field if true
    if (q.calculator) {
      lines.push(`${indent}  calculator: true,`);
    }
    
    lines.push(`${indent}},`);
    return lines.join('\n');
  };

  const content = `import { Question } from '@/types/quiz';

// Topic: ${topic.name}
// Math Enabled: ${topic.mathEnabled}
// Questions: ${topic.questions.length}

export const ${variableName}: Question[] = [
${questionsWithIds.map((q, i) => formatQuestion(q, '  ', i)).join('\n')}
];
`;

  return content;
};

// Generate metadata file for a unit
export const generateUnitMetadata = (unit: CustomUnit): string => {
  return `// Unit: ${unit.name}
// Teacher: ${unit.teacherName}
// Subject: ${unit.subject}
// Topics: ${unit.topics.length}
// Total Questions: ${unit.topics.reduce((sum, t) => sum + t.questions.length, 0)}

export const unitMetadata = {
  name: ${JSON.stringify(unit.name)},
  teacherName: ${JSON.stringify(unit.teacherName)},
  subject: ${JSON.stringify(unit.subject)},
  topics: [
${unit.topics.map(t => `    {
      name: ${JSON.stringify(t.name)},
      file: "./${toSafeName(t.name)}-questions.ts",
      mathEnabled: ${t.mathEnabled},
      testType: ${JSON.stringify(t.testType)},
      testDate: ${JSON.stringify(t.testDate)},
      questionCount: ${t.questions.length},
    },`).join('\n')}
  ],
};
`;
};

// Download a single topic as .ts file
export const downloadTopic = (topic: CustomTopic, unitName: string) => {
  const content = generateTopicFileContent(topic, unitName);
  const filename = `${toSafeName(topic.name)}-questions.ts`;
  
  const blob = new Blob([content], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

// Helper to extract image extension from base64 data URL
const getImageExtension = (dataUrl: string): string => {
  const match = dataUrl.match(/data:image\/([a-zA-Z]+);/);
  return match ? match[1] : 'png';
};

// Helper to convert base64 to binary
const base64ToBlob = (dataUrl: string): Uint8Array => {
  const base64 = dataUrl.split(',')[1];
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Download entire unit as a zip folder with proper structure:
// - public/images/(unit name)/ - for images
// - src/data/(unit name)/ - for .ts files
export const downloadUnit = async (unit: CustomUnit) => {
  const zip = new JSZip();
  const folderName = toSafeName(unit.name);
  
  // Create folder structure
  const publicImagesFolder = zip.folder(`public/images/${folderName}`);
  const srcDataFolder = zip.folder(`src/data/${folderName}`);
  
  if (!publicImagesFolder || !srcDataFolder) return;
  
  // Track if we have any images
  let hasImages = false;
  
  // Process each topic - extract images first
  for (const topic of unit.topics) {
    const topicPrefix = toSafeName(topic.name);
    
    topic.questions.forEach((q, qIndex) => {
      if (q.image && q.image.startsWith('data:')) {
        hasImages = true;
        const ext = getImageExtension(q.image);
        const filename = `${topicPrefix}-q${qIndex + 1}.${ext}`;
        const imageData = base64ToBlob(q.image);
        publicImagesFolder.file(filename, imageData);
      }
    });
  }
  
  // Add metadata file to src/data/(unit)/
  srcDataFolder.file('index.ts', generateUnitMetadata(unit));
  
  // Add each topic file with rewritten image paths
  for (const topic of unit.topics) {
    const content = generateTopicFileContent(topic, unit.name, true); // true = rewrite image paths
    const filename = `${toSafeName(topic.name)}-questions.ts`;
    srcDataFolder.file(filename, content);
  }
  
  // Add a README for clarity
  const readme = `# ${unit.name}

## Folder Structure

This unit export contains:

### src/data/${folderName}/
- \`index.ts\` - Unit metadata with topic list
- \`*-questions.ts\` - Question files for each topic

### public/images/${folderName}/
- Image files referenced by questions
${!hasImages ? '\n(No images in this unit)' : ''}

## How to Import

1. Copy \`src/data/${folderName}/\` to your project's \`src/data/\` folder
2. Copy \`public/images/${folderName}/\` to your project's \`public/images/\` folder
3. Import the questions in your code:

\`\`\`typescript
import { unitMetadata } from '@/data/${folderName}';
import { topicNameQuestions } from '@/data/${folderName}/topic-name-questions';
\`\`\`
`;
  zip.file('README.md', readme);
  
  // Generate and download zip
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${folderName}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};

// Helper function to unescape string literals (convert \n to actual newlines, etc.)
const unescapeString = (str: string): string => {
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
};

// Helper function to extract string value from a field, handling nested braces in LaTeX
const extractStringField = (content: string, fieldName: string): string | null => {
  const fieldStart = content.indexOf(`${fieldName}:`);
  if (fieldStart === -1) return null;
  
  // Find the quote after the colon
  let i = fieldStart + fieldName.length + 1;
  while (i < content.length && /\s/.test(content[i])) i++;
  
  const quoteChar = content[i];
  if (quoteChar !== '"' && quoteChar !== "'") return null;
  
  // Now find the closing quote, accounting for escaped quotes
  i++;
  let value = '';
  while (i < content.length) {
    if (content[i] === '\\' && i + 1 < content.length) {
      // Escaped character - include both
      value += content[i] + content[i + 1];
      i += 2;
    } else if (content[i] === quoteChar) {
      // Found closing quote - unescape and return
      return unescapeString(value);
    } else {
      value += content[i];
      i++;
    }
  }
  return null;
};

// Parse uploaded .ts file content to extract questions
export const parseTopicFile = (content: string): { questions: Question[], mathEnabled: boolean } | null => {
  try {
    // Extract math enabled from comment
    const mathMatch = content.match(/Math Enabled:\s*(true|false)/i);
    const mathEnabled = mathMatch ? mathMatch[1].toLowerCase() === 'true' : false;
    
    // Find the array content between [ and ]
    const arrayMatch = content.match(/:\s*Question\[\]\s*=\s*\[([\s\S]*)\];?\s*$/);
    if (!arrayMatch) return null;
    
    const arrayContent = arrayMatch[1];
    
    // Parse questions using brace-counting approach
    const questions: Question[] = [];
    
    // Find each question object by counting braces
    let depth = 0;
    let start = -1;
    
    for (let i = 0; i < arrayContent.length; i++) {
      const char = arrayContent[i];
      
      // Skip string contents
      if (char === '"' || char === "'") {
        const quoteChar = char;
        i++;
        while (i < arrayContent.length) {
          if (arrayContent[i] === '\\' && i + 1 < arrayContent.length) {
            i += 2; // Skip escaped char
          } else if (arrayContent[i] === quoteChar) {
            break;
          } else {
            i++;
          }
        }
        continue;
      }
      
      if (char === '{') {
        if (depth === 0) start = i;
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0 && start !== -1) {
          const questionStr = arrayContent.substring(start, i + 1);
          
          // Extract fields using our robust string extractor
          const id = extractStringField(questionStr, 'id');
          const type = extractStringField(questionStr, 'type');
          const questionText = extractStringField(questionStr, 'question');
          const correctAnswer = extractStringField(questionStr, 'correctAnswer');
          const explanation = extractStringField(questionStr, 'explanation');
          const image = extractStringField(questionStr, 'image');
          
          if (id && type && questionText && correctAnswer) {
            if (type === 'free-response') {
              const q: Question = {
                id,
                type: 'free-response',
                question: questionText,
                correctAnswer,
                explanation: explanation || '',
              };
              if (image) q.image = image;
              questions.push(q);
            } else if (type === 'multiple-choice') {
              // Extract options array
              const optionsMatch = questionStr.match(/options:\s*\[/);
              const options: { label: string; value: string; text: string; image?: string }[] = [];
              
              if (optionsMatch) {
                const optStart = questionStr.indexOf('[', optionsMatch.index);
                let optDepth = 0;
                let optObjStart = -1;
                
                for (let j = optStart; j < questionStr.length; j++) {
                  const c = questionStr[j];
                  
                  // Skip strings
                  if (c === '"' || c === "'") {
                    const qc = c;
                    j++;
                    while (j < questionStr.length) {
                      if (questionStr[j] === '\\' && j + 1 < questionStr.length) {
                        j += 2;
                      } else if (questionStr[j] === qc) {
                        break;
                      } else {
                        j++;
                      }
                    }
                    continue;
                  }
                  
                  if (c === '[') {
                    optDepth++;
                  } else if (c === ']') {
                    optDepth--;
                    if (optDepth === 0) break;
                  } else if (c === '{' && optDepth === 1) {
                    optObjStart = j;
                  } else if (c === '}' && optDepth === 1 && optObjStart !== -1) {
                    const optStr = questionStr.substring(optObjStart, j + 1);
                    const label = extractStringField(optStr, 'label');
                    const value = extractStringField(optStr, 'value');
                    const text = extractStringField(optStr, 'text');
                    const optImage = extractStringField(optStr, 'image');
                    
                    if (label && value && text) {
                      options.push({
                        label,
                        value,
                        text,
                        ...(optImage ? { image: optImage } : {}),
                      });
                    }
                    optObjStart = -1;
                  }
                }
              }
              
              const q: Question = {
                id,
                type: 'multiple-choice',
                question: questionText,
                options,
                correctAnswer,
                explanation: explanation || '',
              };
              if (image) q.image = image;
              questions.push(q);
            }
          }
          
          start = -1;
        }
      }
    }
    
    return { questions, mathEnabled };
  } catch (error) {
    console.error('Failed to parse topic file:', error);
    return null;
  }
};

// Parse unit metadata file
export const parseUnitMetadata = (content: string): { 
  name: string; 
  teacherName?: string;
  subject?: string;
  topics: { name: string; file: string; mathEnabled: boolean; testType?: string; testDate?: string }[] 
} | null => {
  try {
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    if (!nameMatch) return null;
    
    // Extract teacher name and subject
    const teacherMatch = content.match(/teacherName:\s*["']([^"']+)["']/);
    const subjectMatch = content.match(/subject:\s*["']([^"']+)["']/);
    
    const topicsMatch = content.match(/topics:\s*\[([\s\S]*?)\]/);
    if (!topicsMatch) return { 
      name: nameMatch[1], 
      teacherName: teacherMatch?.[1],
      subject: subjectMatch?.[1],
      topics: [] 
    };
    
    const topics: { name: string; file: string; mathEnabled: boolean; testType?: string; testDate?: string }[] = [];
    const topicRegex = /\{[^{}]+\}/g;
    const topicMatches = topicsMatch[1].match(topicRegex);
    
    if (topicMatches) {
      for (const match of topicMatches) {
        const tNameMatch = match.match(/name:\s*["']([^"']+)["']/);
        const tFileMatch = match.match(/file:\s*["']([^"']+)["']/);
        const tMathMatch = match.match(/mathEnabled:\s*(true|false)/);
        const tTestTypeMatch = match.match(/testType:\s*["']([^"']+)["']/);
        const tTestDateMatch = match.match(/testDate:\s*["']([^"']+)["']/);
        
        if (tNameMatch && tFileMatch) {
          topics.push({
            name: tNameMatch[1],
            file: tFileMatch[1],
            mathEnabled: tMathMatch ? tMathMatch[1] === 'true' : false,
            testType: tTestTypeMatch?.[1],
            testDate: tTestDateMatch?.[1],
          });
        }
      }
    }
    
    return { 
      name: nameMatch[1], 
      teacherName: teacherMatch?.[1],
      subject: subjectMatch?.[1],
      topics 
    };
  } catch (error) {
    console.error('Failed to parse unit metadata:', error);
    return null;
  }
};
