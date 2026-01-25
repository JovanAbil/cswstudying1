import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, Play, Save, Trash2, Pencil, Download, Upload } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useCustomUnits from '@/hooks/useCustomUnits';
import usePresets, { Preset } from '@/hooks/usePresets';
import MathText from '@/components/MathText';
import { Question } from '@/types/quiz';

// Truncate question text for display - LaTeX aware
const truncateQuestion = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  
  let truncateAt = maxLength;
  
  let dollarCount = 0;
  for (let i = 0; i < Math.min(maxLength, text.length); i++) {
    if (text[i] === '$') dollarCount++;
  }
  
  if (dollarCount % 2 === 1) {
    const nextDollar = text.indexOf('$', maxLength);
    if (nextDollar !== -1 && nextDollar < maxLength + 80) {
      truncateAt = nextDollar + 1;
    } else {
      const lastDollar = text.lastIndexOf('$', maxLength);
      if (lastDollar > 20) {
        truncateAt = lastDollar;
      }
    }
  }
  
  return text.substring(0, truncateAt) + '...';
};

const CustomUnitChallengePresetBuilder = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { data, isLoaded } = useCustomUnits();
  const { createPreset, updatePreset, deletePreset, getPresetsForSubject } = usePresets();

  const subjectKey = `custom-${unitId || ''}`;
  const unit = data.units.find(u => u.id === unitId);

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [presetName, setPresetName] = useState('');
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [importError, setImportError] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const subjectPresets = getPresetsForSubject(subjectKey);

  const allQuestionsByTopic = useMemo(() => {
    if (!unit) return [] as { topicId: string; topicName: string; questions: Question[] }[];
    return unit.topics.map(t => ({ topicId: t.id, topicName: t.name, questions: t.questions }));
  }, [unit]);

  useEffect(() => {
    setSelectedQuestionIds(new Set());
  }, [unitId]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
          <Button variant="ghost" onClick={() => navigate('/category/other')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-2">Custom unit not found</h1>
            <p className="text-muted-foreground">This unit may have been deleted.</p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleQuestion = (questionId: string) => {
    setSelectedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const selectAll = () => {
    const allIds = new Set<string>();
    allQuestionsByTopic.forEach(({ questions }) => questions.forEach(q => allIds.add(q.id)));
    setSelectedQuestionIds(allIds);
  };

  const clearAll = () => setSelectedQuestionIds(new Set());

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
      createPreset(presetName, subjectKey, 'course-challenge', Array.from(selectedQuestionIds));
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
        const fileData = JSON.parse(e.target?.result as string);
        
        if (!fileData.preset || !fileData.preset.questionIds || !Array.isArray(fileData.preset.questionIds)) {
          setImportError({ show: true, message: 'Invalid preset file format.' });
          return;
        }

        const importedIds = fileData.preset.questionIds as string[];
        const allQuestions: Question[] = [];
        allQuestionsByTopic.forEach(({ questions }) => {
          allQuestions.push(...questions);
        });
        const availableIds = new Set(allQuestions.map(q => q.id));
        const missingIds = importedIds.filter(id => !availableIds.has(id));
        const validIds = importedIds.filter(id => availableIds.has(id));

        if (validIds.length === 0) {
          setImportError({ 
            show: true, 
            message: `Import failed: None of the ${importedIds.length} questions in this preset exist in the current dataset. This preset may be from a different unit or the questions have been updated.`
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

        const newPreset = createPreset(
          fileData.preset.name || 'Imported Preset',
          subjectKey,
          'course-challenge',
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

  const handleUsePreset = (preset: Preset) => {
    const allQuestions: Question[] = [];
    allQuestionsByTopic.forEach(({ questions }) => {
      allQuestions.push(...questions);
    });
    
    const presetQuestions = allQuestions.filter(q => preset.questionIds.includes(q.id));
    
    navigate(`/quiz/${subjectKey}/course-challenge/cram`, {
      state: { presetQuestions, startNewAttempt: true }
    });
  };

  const handleStartPractice = () => {
    if (selectedQuestionIds.size === 0) {
      toast.error('Please select at least one question');
      return;
    }
    const allQs = allQuestionsByTopic.flatMap(t => t.questions);
    const selectedQs = allQs.filter(q => selectedQuestionIds.has(q.id));

    navigate(`/quiz/${subjectKey}/course-challenge/cram`, {
      state: { presetQuestions: selectedQs, startNewAttempt: true },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button variant="ghost" onClick={() => navigate(`/custom-unit/${unit.id}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Challenge
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{unit.name} — Custom Practice Builder</h1>
          <p className="text-muted-foreground">Select questions from any topic to create a custom set</p>
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
            <Save className="mr-2 h-4 w-4" /> Save Preset
          </Button>
          <Button onClick={handleStartPractice} size="sm" disabled={selectedQuestionIds.size === 0}>
            <Play className="mr-2 h-4 w-4" /> Start Practice ({selectedQuestionIds.size})
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
                <Check className="mr-2 h-4 w-4" /> {editingPresetId ? 'Update' : 'Save'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowSaveForm(false);
                  setEditingPresetId(null);
                  setPresetName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

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
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Saved Presets</h3>
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
          {subjectPresets.length > 0 ? (
            <div className="grid gap-3">
              {subjectPresets.map(preset => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({preset.questionIds.length} questions)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUsePreset(preset)}>
                      <Play className="mr-1 h-3 w-3" /> Use
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditPreset(preset)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadPreset(preset)}>
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeletePreset(preset.id)}>
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

        {/* Question Selection by Topic */}
        {allQuestionsByTopic.map(({ topicId, topicName, questions }) => (
          <Card key={topicId} className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">{topicName}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {questions.map((q, index) => {
                const selected = selectedQuestionIds.has(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleQuestion(q.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all relative ${
                      selected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {selected && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mb-1 font-medium">Q{index + 1}</div>
                    <MathText 
                      tag="div" 
                      className="text-sm leading-snug line-clamp-3" 
                      enableChemistry={false}
                    >
                      {truncateQuestion(q.question)}
                    </MathText>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomUnitChallengePresetBuilder;
