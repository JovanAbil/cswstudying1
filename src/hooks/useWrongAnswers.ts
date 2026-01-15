import { useState, useEffect } from 'react';
import { Question, WrongAnswer, SubjectWrongAnswers } from '@/types/quiz';

const STORAGE_KEY = 'quiz-wrong-answers';

interface AllWrongAnswers {
  [subject: string]: SubjectWrongAnswers;
}

// Export format for target presets
export interface TargetPresetExport {
  version: 1;
  subject: string;
  exportedAt: number;
  questionIds: string[];
  questions: Question[];
}

// Import validation result
export interface TargetPresetValidation {
  valid: boolean;
  missingQuestionIds: string[];
  foundQuestionIds: string[];
  totalImported: number;
}

export const useWrongAnswers = () => {
  const [wrongAnswers, setWrongAnswers] = useState<AllWrongAnswers>({});

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWrongAnswers(JSON.parse(stored));
      } catch {
        console.error('Failed to parse wrong answers from storage');
      }
    }
  }, []);

  // Save to localStorage whenever wrongAnswers changes
  const saveToStorage = (data: AllWrongAnswers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setWrongAnswers(data);
  };

  // Add wrong answers after a quiz
  const addWrongAnswers = (subject: string, unitId: string, questions: Question[]) => {
    const newWrongAnswers = { ...wrongAnswers };
    
    if (!newWrongAnswers[subject]) {
      newWrongAnswers[subject] = {};
    }

    // Replace the wrong answers for this unit (don't append, replace with latest)
    newWrongAnswers[subject][unitId] = questions.map(q => ({
      questionId: q.id,
      question: q,
      timestamp: Date.now(),
    }));

    saveToStorage(newWrongAnswers);
  };

  // Get wrong answers for a subject
  const getSubjectWrongAnswers = (subject: string): SubjectWrongAnswers => {
    return wrongAnswers[subject] || {};
  };

  // Get all wrong answers for a subject as a flat array
  const getAllWrongQuestionsForSubject = (subject: string): Question[] => {
    const subjectData = wrongAnswers[subject] || {};
    const allQuestions: Question[] = [];
    
    Object.values(subjectData).forEach(unitWrong => {
      unitWrong.forEach(wa => {
        // Avoid duplicates by question ID
        if (!allQuestions.find(q => q.id === wa.question.id)) {
          allQuestions.push(wa.question);
        }
      });
    });

    return allQuestions;
  };

  // Clear wrong answers for a subject
  const clearSubjectWrongAnswers = (subject: string) => {
    const newWrongAnswers = { ...wrongAnswers };
    delete newWrongAnswers[subject];
    saveToStorage(newWrongAnswers);
  };

  // Get count of wrong answers for a subject
  const getWrongAnswerCount = (subject: string): number => {
    return getAllWrongQuestionsForSubject(subject).length;
  };

  // Export target preset as JSON
  const exportTargetPreset = (subject: string): TargetPresetExport | null => {
    const questions = getAllWrongQuestionsForSubject(subject);
    if (questions.length === 0) return null;

    return {
      version: 1,
      subject,
      exportedAt: Date.now(),
      questionIds: questions.map(q => q.id),
      questions,
    };
  };

  // Download target preset as JSON file
  const downloadTargetPreset = (subject: string) => {
    const preset = exportTargetPreset(subject);
    if (!preset) return;

    const content = JSON.stringify(preset, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `target-preset-${subject}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Validate imported target preset against available questions
  const validateTargetPreset = (
    importedData: TargetPresetExport,
    availableQuestions: Question[]
  ): TargetPresetValidation => {
    const availableIds = new Set(availableQuestions.map(q => q.id));
    const foundQuestionIds: string[] = [];
    const missingQuestionIds: string[] = [];

    for (const qId of importedData.questionIds) {
      if (availableIds.has(qId)) {
        foundQuestionIds.push(qId);
      } else {
        missingQuestionIds.push(qId);
      }
    }

    return {
      valid: missingQuestionIds.length === 0,
      missingQuestionIds,
      foundQuestionIds,
      totalImported: importedData.questionIds.length,
    };
  };

  // Import target preset (replaces current wrong answers for the subject)
  const importTargetPreset = (
    subject: string,
    importedData: TargetPresetExport,
    availableQuestions: Question[]
  ): TargetPresetValidation => {
    const validation = validateTargetPreset(importedData, availableQuestions);
    
    // Only import if all questions are valid
    if (validation.valid) {
      const newWrongAnswers = { ...wrongAnswers };
      
      // Create a map of available questions for quick lookup
      const questionsMap = new Map(availableQuestions.map(q => [q.id, q]));
      
      // Create a single unit entry with all imported questions
      newWrongAnswers[subject] = {
        'imported': importedData.questionIds.map(qId => ({
          questionId: qId,
          question: questionsMap.get(qId)!,
          timestamp: Date.now(),
        })),
      };
      
      saveToStorage(newWrongAnswers);
    }

    return validation;
  };

  // Parse uploaded JSON file
  const parseTargetPresetFile = async (file: File): Promise<TargetPresetExport | null> => {
    try {
      const content = await file.text();
      const data = JSON.parse(content);
      
      // Basic validation
      if (
        data.version === 1 &&
        typeof data.subject === 'string' &&
        Array.isArray(data.questionIds) &&
        Array.isArray(data.questions)
      ) {
        return data as TargetPresetExport;
      }
      return null;
    } catch {
      return null;
    }
  };

  return {
    addWrongAnswers,
    getSubjectWrongAnswers,
    getAllWrongQuestionsForSubject,
    clearSubjectWrongAnswers,
    getWrongAnswerCount,
    exportTargetPreset,
    downloadTargetPreset,
    validateTargetPreset,
    importTargetPreset,
    parseTargetPresetFile,
  };
};

export default useWrongAnswers;