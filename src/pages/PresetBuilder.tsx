import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, Play, Edit2, Trash2, Check, Download, Upload, Lock } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import usePresets, { Preset } from '@/hooks/usePresets';
import useCustomUnits from '@/hooks/useCustomUnits';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import MathText from '@/components/MathText';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Question } from '@/types/quiz';

// Use centralized question loader with date-based switching
import { getQuestionMap, getTopicLockInfo } from '@/utils/questionLoader';

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
  const { data: customUnitsData, isLoaded: customUnitsLoaded } = useCustomUnits();
  
  // Check if this is a custom topic
  const isCustomTopic = subject?.startsWith('custom-');
  const customUnitId = isCustomTopic ? subject.replace('custom-', '') : null;
  
  // Check if editing an existing preset
  const editingPresetId = location.state?.editingPresetId;
  const editingPreset = editingPresetId ? getPreset(editingPresetId) : undefined;
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(editingPreset?.questionIds || [])
  );
  const [presetName, setPresetName] = useState(editingPreset?.name || '');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [importError, setImportError] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Load custom questions
  useEffect(() => {
    if (isCustomTopic && customUnitsLoaded && customUnitId && unitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      setCustomQuestions(topic?.questions || []);
    }
  }, [isCustomTopic, customUnitsLoaded, customUnitId, unitId, customUnitsData]);

  // Get questions using the centralized loader (applies date-based switching)
  const questionMap = useMemo(() => getQuestionMap(), []);
  
  const questionKey = `${subject}-${unitId}`;
  const lockInfo = getTopicLockInfo(questionKey);

  const questions = isCustomTopic ? customQuestions : (questionMap[questionKey] || []);
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
    // Use replace + unique timestamp to force Quiz.tsx to re-mount and pick up new state
    navigate(`/quiz/${subject}/${unitId}/preset?t=${Date.now()}`, {
      state: { presetQuestions, presetName: preset.name, startNewAttempt: true },
      replace: true,
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

  const handleDownloadPreset = (preset: Preset) => {
    const exportData = {
      version: 1,
      preset: {
        name: preset.name,
        subject: preset.subject,
        unitId: preset.unitId,
        questionIds: preset.questionIds,
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.name.replace(/[^a-zA-Z0-9]/g, '_')}_preset.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Preset downloaded!');
  };

  const handleImportPreset = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (!data.preset || !data.preset.questionIds || !Array.isArray(data.preset.questionIds)) {
          setImportError({ show: true, message: 'Invalid preset file format.' });
          return;
        }

        const importedIds = data.preset.questionIds as string[];
        const availableIds = new Set(questions.map(q => q.id));
        const missingIds = importedIds.filter(id => !availableIds.has(id));
        const validIds = importedIds.filter(id => availableIds.has(id));

        if (validIds.length === 0) {
          setImportError({ 
            show: true, 
            message: `Import failed: None of the ${importedIds.length} questions in this preset exist in the current dataset. This preset may be from a different topic or the questions have been updated.`
          });
          return;
        }

        if (missingIds.length > 0) {
          setImportError({ 
            show: true, 
            message: `Import failed: ${missingIds.length} out of ${importedIds.length} questions are missing from the current dataset. The preset cannot be imported because it requires questions that don't exist here.`
          });
          return;
        }

        // All questions exist - create the preset
        const newPreset = createPreset(
          data.preset.name || 'Imported Preset',
          subject || '',
          unitId || '',
          validIds
        );
        toast.success(`Preset "${newPreset.name}" imported successfully!`);
      } catch (err) {
        setImportError({ show: true, message: 'Failed to parse preset file. Please ensure it\'s a valid JSON file.' });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleQuickStart = () => {
    if (selectedIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }
    const selectedQuestions = questions.filter(q => selectedIds.has(q.id));
    // Use replace + unique timestamp to force Quiz.tsx to re-mount and pick up new state
    navigate(`/quiz/${subject}/${unitId}/preset?t=${Date.now()}`, {
      state: { presetQuestions: selectedQuestions, presetName: 'Quick Practice', startNewAttempt: true },
      replace: true,
    });
  };

  // Get topic name for custom topics
  const getTopicName = () => {
    if (isCustomTopic && customUnitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      return topic?.name || unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isCustomTopic && !customUnitsLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button variant="ghost" onClick={() => navigate(`/unit/${subject}/${unitId}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit
        </Button>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">
              {editingPreset ? `Editing: ${editingPreset.name}` : 'Build Custom Practice'}
            </h1>
            <p className="text-muted-foreground">
              {getTopicName()} • {questions.length} questions available
              {lockInfo.isLocked && ' (Practice mode)'}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={selectAll} size="sm">Select All</Button>
            <Button variant="outline" onClick={clearAll} size="sm">Clear All</Button>
          </div>
        </div>

        {/* Lock status indicator */}
        {lockInfo.isLocked && (
          <Card className="mb-6 p-4 border-amber-500/50 bg-amber-500/10">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-semibold text-amber-700 dark:text-amber-400">Practice Mode Active</p>
                <p className="text-sm text-muted-foreground">
                  These are practice questions. Real test questions will be available 
                  {lockInfo.unlockDate && ` on ${lockInfo.unlockDate.toLocaleDateString()}`}.
                </p>
              </div>
            </div>
          </Card>
        )}

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
        {/* Import Error Dialog */}
        <AlertDialog open={importError.show} onOpenChange={(open) => setImportError({ ...importError, show: open })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Import Failed</AlertDialogTitle>
              <AlertDialogDescription>{importError.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setImportError({ show: false, message: '' })}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Saved Presets */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Saved Presets</h2>
            <Button variant="outline" size="sm" asChild>
              <label className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Import Preset
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportPreset}
                />
              </label>
            </Button>
          </div>
          {unitPresets.length > 0 ? (
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
                    <Button size="sm" variant="outline" onClick={() => handleDownloadPreset(preset)}>
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeletePreset(preset.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No saved presets yet. Select questions and save them as a preset, or import one.</p>
          )}
        </Card>

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

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PresetBuilder;
