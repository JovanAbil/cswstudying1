import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, Play, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useCustomUnits from '@/hooks/useCustomUnits';
import usePresets, { Preset } from '@/hooks/usePresets';
import MathText from '@/components/MathText';
import { Question } from '@/types/quiz';

const truncateQuestion = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
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

  const subjectPresets = getPresetsForSubject(subjectKey);

  const allQuestionsByTopic = useMemo(() => {
    if (!unit) return [] as { topicId: string; topicName: string; questions: Question[] }[];
    return unit.topics.map(t => ({ topicId: t.id, topicName: t.name, questions: t.questions }));
  }, [unit]);

  useEffect(() => {
    // If unit changes, clear selections
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
        <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
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
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        <Button variant="ghost" onClick={() => navigate(`/custom-unit/${unit.id}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course Challenge
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{unit.name} — Custom Practice Builder</h1>
          <p className="text-muted-foreground">Select questions from any topic to create a custom set</p>
        </div>

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

        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Saved Presets</h3>
          {subjectPresets.length > 0 ? (
            <div className="grid gap-3">
              {subjectPresets.map(preset => (
                <div key={preset.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({preset.questionIds.length} questions)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditPreset(preset)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deletePreset(preset.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No saved presets yet.</p>
          )}
        </Card>

        {allQuestionsByTopic.map(({ topicId, topicName, questions }) => (
          <Card key={topicId} className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">{topicName}</h3>
            <div className="space-y-2">
              {questions.map(q => {
                const selected = selectedQuestionIds.has(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => toggleQuestion(q.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm text-muted-foreground mb-1">{q.id}</div>
                        <MathText className="text-sm" enableChemistry={false}>
                          {truncateQuestion(q.question)}
                        </MathText>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">{selected ? '✓' : ''}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}

        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomUnitChallengePresetBuilder;
