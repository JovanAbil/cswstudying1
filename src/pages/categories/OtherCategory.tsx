import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowLeft, Sparkles, Trophy, Brain, Target, Plus, Trash2, Pencil } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import useCustomUnits from '@/hooks/useCustomUnits';
import { useToast } from '@/hooks/use-toast';

const OtherCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();
  const { data, addUnit, updateUnit, deleteUnit, deleteTopic, isLoaded } = useCustomUnits();
  const { toast } = useToast();

  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState<string | null>(null);
  const [showDeleteUnit, setShowDeleteUnit] = useState<string | null>(null);
  const [showDeleteTopic, setShowDeleteTopic] = useState<{ unitId: string; topicId: string } | null>(null);
  const [unitName, setUnitName] = useState('');

  const builtInSubjects = [
    {
      id: 'memory',
      name: 'Memory Training',
      units: [
        { id: 'general', name: 'Polyatomic Ions - Chemistry' },
        { id: 'general2', name: 'Molecular Geometry - Chemistry' },
        { id: 'general3', name: 'Rates of Change - AP Precalc' },
      ],
    },
  ];

  const handleAddUnit = () => {
    if (!unitName.trim()) {
      toast({ title: 'Please enter a unit name', variant: 'destructive' });
      return;
    }
    addUnit(unitName.trim());
    setUnitName('');
    setShowAddUnit(false);
    toast({ title: 'Unit created!' });
  };

  const handleEditUnit = () => {
    if (!unitName.trim() || !showEditUnit) {
      toast({ title: 'Please enter a unit name', variant: 'destructive' });
      return;
    }
    updateUnit(showEditUnit, unitName.trim());
    setUnitName('');
    setShowEditUnit(null);
    toast({ title: 'Unit updated!' });
  };

  const handleDeleteUnit = () => {
    if (!showDeleteUnit) return;
    deleteUnit(showDeleteUnit);
    setShowDeleteUnit(null);
    toast({ title: 'Unit deleted' });
  };

  const handleDeleteTopic = () => {
    if (!showDeleteTopic) return;
    deleteTopic(showDeleteTopic.unitId, showDeleteTopic.topicId);
    setShowDeleteTopic(null);
    toast({ title: 'Topic deleted' });
  };

  const openEditUnit = (unitId: string, currentName: string) => {
    setUnitName(currentName);
    setShowEditUnit(unitId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-other/10">
            <Sparkles className="w-7 h-7 text-other" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-other">Other</h1>
            <p className="text-muted-foreground">Memory training and miscellaneous</p>
          </div>
        </div>

        {/* Built-in subjects */}
        {builtInSubjects.map((subject) => {
          const wrongCount = getWrongAnswerCount(subject.id);
          
          return (
            <div key={subject.id} className="mb-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-other" />
                  <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {wrongCount > 0 && (
                    <Button
                      onClick={() => navigate(`/quiz/${subject.id}/wrong/cram`, { 
                        state: { wrongQuestions: getAllWrongQuestionsForSubject(subject.id) } 
                      })}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Targeted Practice ({wrongCount})
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate(`/course-challenge/${subject.id}`)}
                    variant="outline"
                    className="border-other text-other hover:bg-other hover:text-other-foreground"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Course Challenge
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subject.units.map((unit) => (
                  <Card
                    key={unit.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group"
                    onClick={() => navigate(`/unit/${subject.id}/${unit.id}`)}
                  >
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {unit.name}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Custom Units Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-other" />
              <h2 className="text-2xl font-display font-bold">Custom Units</h2>
            </div>
            <Button
              onClick={() => { setUnitName(''); setShowAddUnit(true); }}
              variant="outline"
              className="border-other text-other hover:bg-other hover:text-other-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          </div>

          {!isLoaded ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : data.units.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground mb-4">No custom units yet. Create one to get started!</p>
              <Button onClick={() => { setUnitName(''); setShowAddUnit(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Unit
              </Button>
            </Card>
          ) : (
            <div className="space-y-8">
              {data.units.map((unit) => (
                <div key={unit.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold">{unit.name}</h3>
                    <Button variant="ghost" size="icon" onClick={() => openEditUnit(unit.id, unit.name)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setShowDeleteUnit(unit.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {unit.topics.map((topic) => (
                      <Card
                        key={topic.id}
                        className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group relative"
                        onClick={() => navigate(`/unit/custom-${unit.id}/${topic.id}`)}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/custom-topic/${unit.id}/${topic.id}`);
                            }}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteTopic({ unitId: unit.id, topicId: topic.id });
                            }}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {topic.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topic.questions.length} question{topic.questions.length !== 1 ? 's' : ''}
                        </p>
                      </Card>
                    ))}
                    {/* Add Topic Card */}
                    <Card
                      className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-dashed hover:border-other flex items-center justify-center"
                      onClick={() => navigate(`/custom-topic/${unit.id}/new?new=true`)}
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Plus className="h-6 w-6" />
                        <p className="text-sm font-medium">Add Topic</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Unit Dialog */}
      <Dialog open={showAddUnit} onOpenChange={setShowAddUnit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Unit</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Unit name (e.g., Algebra Practice)"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddUnit()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUnit(false)}>Cancel</Button>
            <Button onClick={handleAddUnit}>Create Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={!!showEditUnit} onOpenChange={() => setShowEditUnit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Unit name"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEditUnit()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditUnit(null)}>Cancel</Button>
            <Button onClick={handleEditUnit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Unit Dialog */}
      <AlertDialog open={!!showDeleteUnit} onOpenChange={() => setShowDeleteUnit(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the unit and all its topics and questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUnit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Topic Dialog */}
      <AlertDialog open={!!showDeleteTopic} onOpenChange={() => setShowDeleteTopic(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Topic?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the topic and all its questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTopic} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OtherCategory;
