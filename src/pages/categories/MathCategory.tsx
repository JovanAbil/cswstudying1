import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, Trophy, Brain, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';

const MathCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();

  const subjects = [
    {
      id: 'precalc',
      name: 'AP Precalculus',
      units: [
        { id: 'polynomial', name: 'Polynomial' },
        { id: 'rational', name: 'Rational' },
        { id: 'exponential', name: 'Exponential' },
        { id: 'logarithmic', name: 'Logarithmic' },
        { id: 'trigonometric', name: 'Trigonometric (Not Updated)' },
        { id: 'polar', name: 'Polar (Not Updated)' },
        { id: 'parametric', name: 'Parametric (Not Updated)' },
        { id: 'vectorsMatrices', name: 'Vectors and Matrices (Not Updated)' },
      ],
    },
  ];

  const practiceUnits = [
    { id: 'log', name: 'Logarithms Practice', subject: 'practice' },
  ];

  const memoryUnits = [
    { id: 'general3', name: 'Rates of Change - AP Precalc', subject: 'memory' },
  ];

  const wrongCount = getWrongAnswerCount('precalc');

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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-math/10">
            <Calculator className="w-7 h-7 text-math" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-math">Mathematics</h1>
            <p className="text-muted-foreground">Precalculus, Algebra, and more</p>
          </div>
        </div>

        {subjects.map((subject) => (
          <div key={subject.id} className="mb-12">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
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
                  className="border-math text-math hover:bg-math hover:text-math-foreground"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Course Challenge
                </Button>
              </div>
            </div>
            {wrongCount === 0 && (
              <Card className="p-4 mb-4 border-dashed bg-muted/30">
                <p className="text-sm text-muted-foreground text-center">
                  No targeted practice available yet - complete some quizzes first!
                </p>
              </Card>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subject.units.map((unit) => (
                <Card
                  key={unit.id}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-math group"
                  onClick={() => navigate(`/unit/${subject.id}/${unit.id}`)}
                >
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {unit.name}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Practice Units */}
        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Practice Assignments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {practiceUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-math group bg-math/5"
                onClick={() => navigate(`/unit/${unit.subject}/${unit.id}`)}
              >
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {unit.name}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Memory Training */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-other" />
            <h2 className="text-2xl font-display font-bold">Memory Training</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {memoryUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group bg-other/5"
                onClick={() => navigate(`/unit/${unit.subject}/${unit.id}`)}
              >
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {unit.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathCategory;
