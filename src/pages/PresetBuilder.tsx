import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Play, Edit2, Trash2, Check } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import usePresets, { Preset } from '@/hooks/usePresets';
import MathText from '@/components/MathText';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
import { metricDQuestions } from '@/data/chemistryDarone/metricD-questions';
import { atomicDQuestions } from '@/data/chemistryDarone/atomicD-questions';
import { compoundsDQuestions } from '@/data/chemistryDarone/compoundsD-questions';
import { gasesDQuestions } from '@/data/chemistryDarone/gasesD-questions';
import { solutionsDQuestions } from '@/data/chemistryDarone/solutionsD-questions';
import { reactionsDQuestions } from '@/data/chemistryDarone/reactionsD-questions';
import { stoichiometryDQuestions } from '@/data/chemistryDarone/stoichiometryD-questions';
import { acidbasesDQuestions } from '@/data/chemistryDarone/acidbasesD-questions';
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
import { unit1Questions } from '@/data/practice/unit1-questions';
import { gasQuestions } from '@/data/practice/gas-questions';
import { logQuestions } from '@/data/practice/log-questions';
import { basicsQuestions } from '@/data/stock/basics-questions';
import { Question } from '@/types/quiz';

// Truncate question text for display - LaTeX aware
const truncateQuestion = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  
  // Find a safe truncation point that doesn't break LaTeX
  let truncateAt = maxLength;
  
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

const PresetBuilder = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { createPreset, updatePreset, deletePreset, getPresetsForUnit, getPreset } = usePresets();
  
  // Check if editing an existing preset
  const editingPresetId = location.state?.editingPresetId;
  const editingPreset = editingPresetId ? getPreset(editingPresetId) : undefined;
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(editingPreset?.questionIds || [])
  );
  const [presetName, setPresetName] = useState(editingPreset?.name || '');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

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
    'chemistryDarone-metric': metricDQuestions, 'chemistryDarone-atomic': atomicDQuestions,
    'chemistryDarone-compounds': compoundsDQuestions, 'chemistryDarone-gases': gasesDQuestions,
    'chemistryDarone-solutions': solutionsDQuestions, 'chemistryDarone-reactions': reactionsDQuestions,
    'chemistryDarone-stoichiometry': stoichiometryDQuestions, 'chemistryDarone-acidbases': acidbasesDQuestions,
    'world-history-religions': religionsQuestions, 'world-history-islam': islamQuestions,
    'world-history-renaissance': renaissanceQuestions, 'world-history-protestant': protestantQuestions,
    'world-history-unit5': worldHistoryUnit5Questions, 'world-history-unit6': worldHistoryUnit6Questions,
    'world-history-unit7': worldHistoryUnit7Questions, 'world-history-unit8': worldHistoryUnit8Questions,
    'world-history-unit9': worldHistoryUnit9Questions, 'world-history-unit10': worldHistoryUnit10Questions,
    'world-history-unit11': worldHistoryUnit11Questions,
    'memory-general': generalQuestions, 'memory-general2': general2Questions, 'memory-general3': general3Questions,
    'practice-unit1': unit1Questions, 'practice-gases': gasQuestions, 'practice-log': logQuestions,
    'stock-basics': basicsQuestions,
  }), []);

  const questions = questionMap[`${subject}-${unitId}`] || [];
  const unitPresets = getPresetsForUnit(subject || '', unitId || '');

  const toggleQuestion = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    setSelectedIds(new Set(questions.map(q => q.id)));
  };

  const clearAll = () => {
    setSelectedIds(new Set());
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast.error('Please enter a preset name');
      return;
    }
    if (selectedIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }

    if (editingPreset) {
      updatePreset(editingPreset.id, Array.from(selectedIds), presetName);
      toast.success('Preset updated!');
    } else {
      createPreset(presetName, subject || '', unitId || '', Array.from(selectedIds));
      toast.success('Preset saved!');
    }
    
    setShowSaveDialog(false);
    setPresetName('');
    if (!editingPreset) {
      setSelectedIds(new Set());
    }
  };

  const handleUsePreset = (preset: Preset) => {
    const presetQuestions = questions.filter(q => preset.questionIds.includes(q.id));
    navigate(`/quiz/${subject}/${unitId}/preset`, {
      state: { presetQuestions, presetName: preset.name }
    });
  };

  const handleEditPreset = (preset: Preset) => {
    setSelectedIds(new Set(preset.questionIds));
    setPresetName(preset.name);
    navigate(`/unit/${subject}/${unitId}/preset-builder`, {
      state: { editingPresetId: preset.id }
    });
  };

  const handleDeletePreset = (presetId: string) => {
    deletePreset(presetId);
    toast.success('Preset deleted');
  };

  const handleQuickStart = () => {
    if (selectedIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }
    const selectedQuestions = questions.filter(q => selectedIds.has(q.id));
    navigate(`/quiz/${subject}/${unitId}/preset`, {
      state: { presetQuestions: selectedQuestions, presetName: 'Quick Practice' }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(`/unit/${subject}/${unitId}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit
        </Button>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">
              {editingPreset ? `Editing: ${editingPreset.name}` : 'Build Custom Practice'}
            </h1>
            <p className="text-muted-foreground">
              {unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} • {questions.length} questions available
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={selectAll} size="sm">Select All</Button>
            <Button variant="outline" onClick={clearAll} size="sm">Clear All</Button>
          </div>
        </div>

        {/* Selected count and actions */}
        <Card className="p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">
              {selectedIds.size} selected
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              onClick={handleQuickStart}
              disabled={selectedIds.size === 0}
              className="bg-primary"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Practice
            </Button>
            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={selectedIds.size === 0}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingPreset ? 'Update Preset' : 'Save Preset'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingPreset ? 'Update Preset' : 'Save as Preset'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Preset name (e.g., Chapter 1 Review)"
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                  />
                  <p className="text-sm text-muted-foreground">
                    {selectedIds.size} questions will be saved
                  </p>
                  <Button onClick={handleSavePreset} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    {editingPreset ? 'Update' : 'Save'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Saved Presets */}
        {unitPresets.length > 0 && (
          <Card className="p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Saved Presets</h2>
            <div className="space-y-2">
              {unitPresets.map(preset => (
                <div 
                  key={preset.id} 
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div>
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-muted-foreground ml-2">({preset.questionIds.length} questions)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUsePreset(preset)}>
                      <Play className="mr-1 h-3 w-3" /> Use
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditPreset(preset)}>
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeletePreset(preset.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Question Grid - 3 columns with question text */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Select Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => toggleQuestion(question.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all relative ${
                  selectedIds.has(question.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {selectedIds.has(question.id) && (
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
                  enableChemistry={subject === 'chemistry' || subject === 'chemistryDarone'}
                >
                  {truncateQuestion(question.question, 120)}
                </MathText>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PresetBuilder;
