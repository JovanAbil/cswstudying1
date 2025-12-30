import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Trophy, ExternalLink, Wrench, Target } from 'lucide-react';
import { toast } from 'sonner';
import { courseChallengeResources } from '@/data/study-resources';
import { useWrongAnswers } from '@/hooks/useWrongAnswers';
const CourseChallenge = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const { getAllWrongQuestionsForSubject, getWrongAnswerCount } = useWrongAnswers();
  
  const wrongAnswers = getAllWrongQuestionsForSubject(subject || '');
  const wrongCount = getWrongAnswerCount(subject || '');

  const getUnits = () => {
    switch (subject) {
      case 'precalc':
        return [
          { id: 'polynomial', name: 'Unit 1A - Polynomial Functions' },
          { id: 'rational', name: 'Unit 1B - Rational Functions' },
          { id: 'exponential', name: 'Unit 2A - Exponential Functions' },
          { id: 'logarithmic', name: 'Unit 2B - Logarithmic Functions' },
          { id: 'trigonometric', name: 'Unit 3A - Trigonometric Functions' },
          { id: 'polar', name: 'Unit 3B - Polar Functions' },
          { id: 'parametric', name: 'Unit 4A - Parametric Functions' },
          { id: 'vectorsMatrices', name: 'Unit 4B - Vectors and Matrices' },
        ];
      case 'biology':
        return [
          { id: 'biochemistry', name: 'Unit 1 - Biochemistry' },
          { id: 'cellstructure', name: 'Unit 2 - Cell Structure & Function' },
          { id: 'cellenergetics', name: 'Unit 3 - Cell Energetics' },
          { id: 'cellgrowth', name: 'Unit 4 - Cell Growth & Division' },
          { id: 'genetics', name: 'Unit 5 - Genetics' },
          { id: 'molecular', name: 'Unit 6 - Molecular Biology' },
          { id: 'evolution', name: 'Unit 7 - Evolution' },
          { id: 'ecology', name: 'Unit 8 - Ecology' },
        ];
    
      case 'chemistry':
        return [
          { id: 'metric', name: 'Unit 1 - Metric Conversions' },
          { id: 'atomic', name: 'Unit 2 - Atomic Structure' },
          { id: 'compounds', name: 'Unit 3 - Compounds' },
          { id: 'gases', name: 'Unit 4 - Gases' },
          { id: 'solutions', name: 'Unit 5 - Solutions' },
          { id: 'reactions', name: 'Unit 6 - Reactions' },
          { id: 'stoichiometry', name: 'Unit 7 - Stoichiometry' },
          { id: 'acidbases', name: 'Unit 8 - Acids & Bases' },
        ];

       case 'chemistryDarone':
        return [
          { id: 'metric', name: 'Unit 1 - Metric Conversions' },
          { id: 'atomic', name: 'Unit 2 - Atomic Structure' },
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
          { id: 'unit4', name: 'Unit 4 - Protestant' },
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
          { id: 'general', name: 'Polyatomic Ions - Chemistry' },
          { id: 'general2', name: 'Molecular Geometry - Chemistry' },
        ];

      case 'practice':
        return [
          { id: 'unit1', name: 'Temp' },
        ];

      default:
        return [];
    }
  };

  const units = getUnits();
  
  // Get study resources for this course challenge
  const studyResources = courseChallengeResources[subject || ''] || [];

  const handleUnitToggle = (unitId: string) => {
    setSelectedUnits(prev =>
      prev.includes(unitId)
        ? prev.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const handleStartChallenge = () => {
    if (selectedUnits.length === 0) {
      toast.error('Please select at least one unit');
      return;
    }
    navigate(`/quiz/${subject}/challenge/test`, { state: { selectedUnits } });
  };

  const handleStartCramMode = () => {
    const allUnitIds = units.map(u => u.id);
    navigate(`/quiz/${subject}/challenge/cram`, { state: { selectedUnits: allUnitIds } });
  };

  const handleSelectAll = () => {
    if (selectedUnits.length === units.length) {
      setSelectedUnits([]);
    } else {
      setSelectedUnits(units.map(u => u.id));
    }
  };

  const getSubjectColor = () => {
    switch (subject) {
      case 'precalc': return 'primary';
      case 'biology': return 'success';
      case 'chemistry': return 'accent';
      case 'world-history': return 'destructive';
      case 'memory': return 'purple-500';
      default: return 'primary';
    }
  };

  const color = getSubjectColor();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            {subject === 'precalc' && 'AP Precalculus'}
            {subject === 'biology' && 'Biology'}
            {subject === 'chemistry' && 'Chemistry'}
            {subject === 'world-history' && 'World History'}
            {subject === 'memory' && 'Memory'}
            {' '}Course Challenge
          </h1>
          <p className="text-muted-foreground text-lg">
            Select units to test your knowledge with 30 random questions
          </p>
        </div>

        {/* Study Resources Section */}
        {studyResources.length > 0 && (
          <Card className="mb-6 p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Helpful Study Resources
            </h3>
            <div className="space-y-2">
              {studyResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {resource.title}
                </a>
              ))}
            </div>
          </Card>
        )}

        <Card className="p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Select Units</h2>
            <Button
              onClick={handleSelectAll}
              variant="outline"
              size="sm"
            >
              {selectedUnits.length === units.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {units.map((unit) => (
              <div
                key={unit.id}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedUnits.includes(unit.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleUnitToggle(unit.id)}
              >
                <Checkbox
                  id={unit.id}
                  checked={selectedUnits.includes(unit.id)}
                  onCheckedChange={() => handleUnitToggle(unit.id)}
                />
                <Label htmlFor={unit.id} className="flex-1 cursor-pointer">
                  {unit.name}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleStartChallenge}
            className="flex-1"
            size="lg"
            disabled={selectedUnits.length === 0}
          >
            Start Challenge ({selectedUnits.length} {selectedUnits.length === 1 ? 'unit' : 'units'} selected)
          </Button>
          <Button
            onClick={handleStartCramMode}
            variant="outline"
            size="lg"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Cram Mode (All Units)
          </Button>
        </div>

        {/* Custom Practice & Targeted Practice */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card 
            className="p-6 cursor-pointer hover:border-primary transition-all"
            onClick={() => navigate(`/course-challenge/${subject}/preset-builder`)}
          >
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Build Custom Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Select specific questions from any unit
                </p>
              </div>
            </div>
          </Card>

          {wrongCount > 0 && (
            <Card 
              className="p-6 cursor-pointer hover:border-destructive transition-all border-destructive/50"
              onClick={() => navigate(`/quiz/${subject}/targeted/cram`, { 
                state: { wrongQuestions: wrongAnswers } 
              })}
            >
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-destructive" />
                <div>
                  <h3 className="font-semibold">Targeted Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    Review {wrongCount} questions you got wrong
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Card className="mt-8 p-6 bg-muted">
          <h3 className="font-semibold mb-2">📝 Challenge Details</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Challenge Mode:</strong> 30 random questions from selected units</li>
            <li>• <strong>Cram Mode:</strong> All questions from every unit for comprehensive review</li>
            <li>• Questions are randomized each time</li>
            <li>• Review shows wrong answers first, then correct answers</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default CourseChallenge;
