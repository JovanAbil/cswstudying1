import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Play, Pencil, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Question } from '@/types/quiz';
import { usePresets, Preset } from '@/hooks/usePresets';
import MathText from '@/components/MathText';

// Import all question sets
import { polynomialQuestions } from '@/data/apprecalc/polynomial-questions';
import { rationalQuestions } from '@/data/apprecalc/rational-questions';
import { exponentialQuestions } from '@/data/apprecalc/exponential-questions';
import { logarithmicQuestions } from '@/data/apprecalc/logarithmic-questions';
import { trigonometricQuestions } from '@/data/apprecalc/trigonometric-questions';
import { polarQuestions } from '@/data/apprecalc/polar-questions';
import { parametricQuestions } from '@/data/apprecalc/parametric-questions';
import { vectorsMatricesQuestions } from '@/data/apprecalc/vectorsMatrices-questions';
import { biochemistryQuestions } from '@/data/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/biology/genetics-questions';
import { molecularQuestions } from '@/data/biology/molecular-questions';
import { evolutionQuestions } from '@/data/biology/evolution-questions';
import { ecologyQuestions } from '@/data/biology/ecology-questions';
import { metricQuestions } from '@/data/chemistry/metric-questions';
import { atomicQuestions } from '@/data/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/chemistry/acidbases-questions';
import { religionsQuestions } from '@/data/worldhistory/religions-questions';
import { islamQuestions } from '@/data/worldhistory/islam-questions';
import { renaissanceQuestions } from '@/data/worldhistory/renaissance-questions';
import { protestantQuestions } from '@/data/worldhistory/protestant-questions';
import { worldHistoryUnit5Questions } from '@/data/worldhistory/world-history-unit5';
import { worldHistoryUnit6Questions } from '@/data/worldhistory/world-history-unit6';
import { worldHistoryUnit7Questions } from '@/data/worldhistory/world-history-unit7';
import { worldHistoryUnit8Questions } from '@/data/worldhistory/world-history-unit8';
import { worldHistoryUnit9Questions } from '@/data/worldhistory/world-history-unit9';
import { worldHistoryUnit10Questions } from '@/data/worldhistory/world-history-unit10';
import { worldHistoryUnit11Questions } from '@/data/worldhistory/world-history-unit11';
import { generalQuestions } from '@/data/memory/general-questions';
import { general2Questions } from '@/data/memory/general2-questions';
import { general3Questions } from '@/data/memory/general3-questions';

// Truncate question text for display - LaTeX aware
const truncateQuestion = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  
  // Find a safe truncation point that doesn't break LaTeX
  let truncateAt = maxLength;
  const textToCheck = text.substring(0, maxLength + 50);
  
  // Count $ signs to ensure we don't cut in the middle of LaTeX
  let dollarCount = 0;
  for (let i = 0; i < Math.min(maxLength, text.length); i++) {
    if (text[i] === '$') dollarCount++;
  }
  
  // If odd number of $, we're inside LaTeX - find the closing $
  if (dollarCount % 2 === 1) {
    const nextDollar = text.indexOf('$', maxLength);
    if (nextDollar !== -1 && nextDollar < maxLength + 80) {
      truncateAt = nextDollar + 1;
    } else {
      // Find the last $ before maxLength and truncate before it
      const lastDollar = text.lastIndexOf('$', maxLength);
      if (lastDollar > 20) {
        truncateAt = lastDollar;
      }
    }
  }
  
  return text.substring(0, truncateAt) + '...';
};

const CourseChallengePresetBuilder = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { createPreset, updatePreset, deletePreset, getPresetsForSubject, getPreset } = usePresets();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [presetName, setPresetName] = useState('');
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);

  const questionMap: Record<string, Question[]> = useMemo(() => ({
    'precalc-polynomial': polynomialQuestions, 'precalc-rational': rationalQuestions,
    'precalc-exponential': exponentialQuestions, 'precalc-logarithmic': logarithmicQuestions,
    'precalc-trigonometric': trigonometricQuestions, 'precalc-polar': polarQuestions,
    'precalc-parametric': parametricQuestions, 'precalc-vectorsMatrices': vectorsMatricesQuestions,
    'biology-biochemistry': biochemistryQuestions, 'biology-cellstructure': cellstructureQuestions,
    'biology-cellenergetics': cellenergeticsQuestions, 'biology-cellgrowth': cellgrowthQuestions,
    'biology-genetics': geneticsQuestions, 'biology-molecular': molecularQuestions,
    'biology-evolution': evolutionQuestions, 'biology-ecology': ecologyQuestions,
    'chemistry-metric': metricQuestions, 'chemistry-atomic': atomicQuestions,
    'chemistry-compounds': compoundsQuestions, 'chemistry-gases': gasesQuestions,
    'chemistry-solutions': solutionsQuestions, 'chemistry-reactions': reactionsQuestions,
    'chemistry-stoichiometry': stoichiometryQuestions, 'chemistry-acidbases': acidbasesQuestions,
    'world-history-religions': religionsQuestions, 'world-history-islam': islamQuestions,
    'world-history-renaissance': renaissanceQuestions, 'world-history-protestant': protestantQuestions,
    'world-history-unit5': worldHistoryUnit5Questions, 'world-history-unit6': worldHistoryUnit6Questions,
    'world-history-unit7': worldHistoryUnit7Questions, 'world-history-unit8': worldHistoryUnit8Questions,
    'world-history-unit9': worldHistoryUnit9Questions, 'world-history-unit10': worldHistoryUnit10Questions,
    'world-history-unit11': worldHistoryUnit11Questions,
    'memory-general': generalQuestions, 'memory-general2': general2Questions, 'memory-general3': general3Questions,
  }), []);

  const getUnits = () => {
    switch (subject) {
      case 'precalc':
        return [
          { id: 'polynomial', name: 'Unit 1A - Polynomial' },
          { id: 'rational', name: 'Unit 1B - Rational' },
          { id: 'exponential', name: 'Unit 2A - Exponential' },
          { id: 'logarithmic', name: 'Unit 2B - Logarithmic' },
          { id: 'trigonometric', name: 'Unit 3A - Trigonometric' },
          { id: 'polar', name: 'Unit 3B - Polar' },
          { id: 'parametric', name: 'Unit 4A - Parametric' },
          { id: 'vectorsMatrices', name: 'Unit 4B - Vectors/Matrices' },
        ];
      case 'biology':
        return [
          { id: 'biochemistry', name: 'Unit 1 - Biochemistry' },
          { id: 'cellstructure', name: 'Unit 2 - Cell Structure' },
          { id: 'cellenergetics', name: 'Unit 3 - Cell Energetics' },
          { id: 'cellgrowth', name: 'Unit 4 - Cell Growth' },
          { id: 'genetics', name: 'Unit 5 - Genetics' },
          { id: 'molecular', name: 'Unit 6 - Molecular Biology' },
          { id: 'evolution', name: 'Unit 7 - Evolution' },
          { id: 'ecology', name: 'Unit 8 - Ecology' },
        ];
      case 'chemistry':
        return [
          { id: 'metric', name: 'Unit 1 - Metric' },
          { id: 'atomic', name: 'Unit 2 - Atomic' },
          { id: 'compounds', name: 'Unit 3 - Compounds' },
          { id: 'gases', name: 'Unit 4 - Gases' },
          { id: 'solutions', name: 'Unit 5 - Solutions' },
          { id: 'reactions', name: 'Unit 6 - Reactions' },
          { id: 'stoichiometry', name: 'Unit 7 - Stoichiometry' },
          { id: 'acidbases', name: 'Unit 8 - Acids & Bases' },
        ];
      case 'world-history':
        return [
          { id: 'religions', name: 'Unit 1 - Religions' },
          { id: 'islam', name: 'Unit 2 - Islam' },
          { id: 'renaissance', name: 'Unit 3 - Renaissance' },
          { id: 'protestant', name: 'Unit 4 - Protestant' },
          { id: 'unit5', name: 'Unit 5' },
          { id: 'unit6', name: 'Unit 6' },
          { id: 'unit7', name: 'Unit 7' },
          { id: 'unit8', name: 'Unit 8' },
          { id: 'unit9', name: 'Unit 9' },
          { id: 'unit10', name: 'Unit 10' },
          { id: 'unit11', name: 'Unit 11' },
        ];
      case 'memory':
        return [
          { id: 'general', name: 'Polyatomic Ions' },
          { id: 'general2', name: 'Molecular Geometry' },
          { id: 'general3', name: 'General 3' },
        ];
      default:
        return [];
    }
  };

  const units = getUnits();
  const subjectPresets = getPresetsForSubject(subject || '');

  // Get all questions for this subject grouped by unit
  const allQuestionsByUnit = useMemo(() => {
    const result: { unit: { id: string; name: string }; questions: Question[] }[] = [];
    units.forEach(unit => {
      const questions = questionMap[`${subject}-${unit.id}`] || [];
      if (questions.length > 0) {
        result.push({ unit, questions });
      }
    });
    return result;
  }, [subject, units, questionMap]);

  const toggleQuestion = (questionId: string) => {
    const newSelected = new Set(selectedQuestionIds);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestionIds(newSelected);
  };

  const selectAll = () => {
    const allIds = new Set<string>();
    allQuestionsByUnit.forEach(({ questions }) => {
      questions.forEach(q => allIds.add(q.id));
    });
    setSelectedQuestionIds(allIds);
  };

  const clearAll = () => {
    setSelectedQuestionIds(new Set());
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error('Please enter a preset name');
      return;
    }
    if (selectedQuestionIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }

    if (editingPresetId) {
      updatePreset(editingPresetId, Array.from(selectedQuestionIds), presetName);
      toast.success('Preset updated!');
    } else {
      createPreset(presetName, subject || '', 'course-challenge', Array.from(selectedQuestionIds));
      toast.success('Preset saved!');
    }

    setPresetName('');
    setShowSaveForm(false);
    setEditingPresetId(null);
    setSelectedQuestionIds(new Set());
  };

  const handleEditPreset = (preset: Preset) => {
    setEditingPresetId(preset.id);
    setPresetName(preset.name);
    setSelectedQuestionIds(new Set(preset.questionIds));
    setShowSaveForm(true);
  };

  const handleDeletePreset = (presetId: string) => {
    deletePreset(presetId);
    toast.success('Preset deleted');
  };

  const handleUsePreset = (preset: Preset) => {
    // Get the actual question objects from the IDs
    const allQuestions: Question[] = [];
    allQuestionsByUnit.forEach(({ questions }) => {
      allQuestions.push(...questions);
    });
    
    const presetQuestions = allQuestions.filter(q => preset.questionIds.includes(q.id));
    
    navigate(`/quiz/${subject}/course-challenge/cram`, {
      state: { presetQuestions }
    });
  };

  const handleStartPractice = () => {
    if (selectedQuestionIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }

    const allQuestions: Question[] = [];
    allQuestionsByUnit.forEach(({ questions }) => {
      allQuestions.push(...questions);
    });
    
    const selectedQs = allQuestions.filter(q => selectedQuestionIds.has(q.id));
    
    navigate(`/quiz/${subject}/course-challenge/cram`, {
      state: { presetQuestions: selectedQs }
    });
  };

  const getSubjectTitle = () => {
    switch (subject) {
      case 'precalc': return 'AP Precalculus';
      case 'biology': return 'Biology';
      case 'chemistry': return 'Chemistry';
      case 'world-history': return 'World History';
      case 'memory': return 'Memory';
      default: return 'Course';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/course-challenge/${subject}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course Challenge
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{getSubjectTitle()} - Custom Practice Builder</h1>
          <p className="text-muted-foreground">
            Select questions from any unit to create a custom practice set
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={selectAll} variant="outline" size="sm">
            Select All
          </Button>
          <Button onClick={clearAll} variant="outline" size="sm">
            Clear All
          </Button>
          <Button 
            onClick={() => setShowSaveForm(true)} 
            variant="outline" 
            size="sm"
            disabled={selectedQuestionIds.size === 0}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Preset
          </Button>
          <Button 
            onClick={handleStartPractice} 
            size="sm"
            disabled={selectedQuestionIds.size === 0}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Practice ({selectedQuestionIds.size})
          </Button>
        </div>

        {/* Save Preset Form */}
        {showSaveForm && (
          <Card className="p-4 mb-6">
            <div className="flex gap-3 items-center">
              <Input
                placeholder="Enter preset name..."
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSavePreset}>
                <Check className="mr-2 h-4 w-4" />
                {editingPresetId ? 'Update' : 'Save'}
              </Button>
              <Button variant="ghost" onClick={() => {
                setShowSaveForm(false);
                setEditingPresetId(null);
                setPresetName('');
              }}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Saved Presets */}
        {subjectPresets.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Saved Presets</h3>
            <div className="grid gap-3">
              {subjectPresets.map(preset => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ({preset.questionIds.length} questions)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUsePreset(preset)}>
                      <Play className="mr-1 h-3 w-3" /> Use
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditPreset(preset)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePreset(preset.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Question Selection by Unit */}
        {allQuestionsByUnit.map(({ unit, questions }) => (
          <Card key={unit.id} className="p-6 mb-4">
            <h3 className="text-lg font-semibold mb-4">{unit.name} ({questions.length} questions)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all relative ${
                    selectedQuestionIds.has(q.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {selectedQuestionIds.has(q.id) && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mb-1 font-medium">
                    Q{index + 1}
                  </div>
                  <MathText 
                    tag="div" 
                    className="text-sm leading-snug line-clamp-3"
                    enableChemistry={subject === 'chemistry'}
                  >
                    {truncateQuestion(q.question, 120)}
                  </MathText>
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseChallengePresetBuilder;
