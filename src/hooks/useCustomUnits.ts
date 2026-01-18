import { useState, useEffect } from 'react';
import { Question } from '@/types/quiz';

const STORAGE_KEY = 'custom-units-data';

export type SubjectType = 'Math' | 'English' | 'Science' | 'Social Studies' | 'Other';
export type TestType = 'test' | 'homework';

export interface CustomTopic {
  id: string;
  name: string;
  mathEnabled: boolean;
  questions: Question[];
  // New fields for date-based test visibility
  testType: TestType;
  testDate: string; // ISO date string when test was received
  enableUntil?: string; // Optional: date when to switch to fake data (defaults to August of next year)
}

export interface CustomUnit {
  id: string;
  name: string;
  teacherName: string;
  subject: SubjectType;
  topics: CustomTopic[];
}

export interface CustomUnitsData {
  units: CustomUnit[];
}

const generateId = () => `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useCustomUnits = () => {
  const [data, setData] = useState<CustomUnitsData>({ units: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        console.error('Failed to parse custom units from storage');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage using functional update to avoid stale closures
  const saveToStorage = (updater: (current: CustomUnitsData) => CustomUnitsData) => {
    setData(current => {
      const newData = updater(current);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  };

  // Add a new unit
  const addUnit = (name: string, teacherName: string, subject: SubjectType): CustomUnit => {
    const newUnit: CustomUnit = {
      id: generateId(),
      name,
      teacherName,
      subject,
      topics: [],
    };
    saveToStorage(current => ({ units: [...current.units, newUnit] }));
    return newUnit;
  };

  // Update a unit
  const updateUnit = (unitId: string, updates: { name?: string; teacherName?: string; subject?: SubjectType }) => {
    saveToStorage(current => ({
      units: current.units.map(u => u.id === unitId ? { ...u, ...updates } : u),
    }));
  };

  // Delete a unit
  const deleteUnit = (unitId: string) => {
    saveToStorage(current => ({
      units: current.units.filter(u => u.id !== unitId),
    }));
  };

  // Add a topic to a unit
  const addTopic = (unitId: string, topic: Omit<CustomTopic, 'id'>): CustomTopic => {
    const newTopic: CustomTopic = {
      id: generateId(),
      ...topic,
    };
    saveToStorage(current => ({
      units: current.units.map(u => 
        u.id === unitId 
          ? { ...u, topics: [...u.topics, newTopic] }
          : u
      ),
    }));
    return newTopic;
  };

  // Update a topic
  const updateTopic = (unitId: string, topicId: string, updates: Partial<CustomTopic>) => {
    saveToStorage(current => ({
      units: current.units.map(u => 
        u.id === unitId 
          ? { 
              ...u, 
              topics: u.topics.map(t => 
                t.id === topicId ? { ...t, ...updates } : t
              )
            }
          : u
      ),
    }));
  };

  // Delete a topic
  const deleteTopic = (unitId: string, topicId: string) => {
    saveToStorage(current => ({
      units: current.units.map(u => 
        u.id === unitId 
          ? { ...u, topics: u.topics.filter(t => t.id !== topicId) }
          : u
      ),
    }));
  };

  // Get a specific unit
  const getUnit = (unitId: string): CustomUnit | undefined => {
    return data.units.find(u => u.id === unitId);
  };

  // Get a specific topic
  const getTopic = (unitId: string, topicId: string): CustomTopic | undefined => {
    const unit = getUnit(unitId);
    return unit?.topics.find(t => t.id === topicId);
  };

  // Get all questions for a unit (for course challenge)
  const getUnitQuestions = (unitId: string): Question[] => {
    const unit = getUnit(unitId);
    if (!unit) return [];
    return unit.topics.flatMap(t => t.questions);
  };

  // Get questions for a topic
  const getTopicQuestions = (unitId: string, topicId: string): Question[] => {
    const topic = getTopic(unitId, topicId);
    return topic?.questions || [];
  };

  return {
    data,
    isLoaded,
    addUnit,
    updateUnit,
    deleteUnit,
    addTopic,
    updateTopic,
    deleteTopic,
    getUnit,
    getTopic,
    getUnitQuestions,
    getTopicQuestions,
  };
};

export default useCustomUnits;
