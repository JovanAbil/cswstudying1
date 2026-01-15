import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Brain, Lock, Trophy, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

// Import question files
import { basicsQuestions } from '@/data/stock/basics-questions';

// Personal units - add your units here
const stockUnits = [
  {
    id: 'basics',
    name: 'Basics',
    questionCount: basicsQuestions.length,
  },
  // Add more units as needed:
  // {
  //   id: 'technical-analysis',
  //   name: 'Technical Analysis',
  //   questionCount: technicalQuestions.length,
  // },
];

const StockPage = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();
  
  const wrongCount = getWrongAnswerCount('stock');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-primary">Personal Units</h1>
            <p className="text-muted-foreground">Private practice materials</p>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex gap-2 flex-wrap mb-6">
          {wrongCount > 0 && (
            <Button
              onClick={() => navigate(`/quiz/stock/wrong/cram`, { 
                state: { wrongQuestions: getAllWrongQuestionsForSubject('stock') } 
              })}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Target className="mr-2 h-4 w-4" />
              Targeted Practice ({wrongCount})
            </Button>
          )}
          <Link to="/course-challenge/stock">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Course Challenge
            </Button>
          </Link>
        </div>

        {wrongCount === 0 && (
          <Card className="p-4 mb-6 border-dashed bg-muted/30">
            <p className="text-sm text-muted-foreground text-center">
              No targeted practice available yet - complete some quizzes first!
            </p>
          </Card>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Your Units</h2>
          {stockUnits.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stockUnits.map((unit) => (
                <Link key={unit.id} to={`/unit/stock/${unit.id}`}>
                  <Card
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary group h-full"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold mb-1 group-hover:text-foreground">{unit.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {unit.questionCount} questions
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-8 border-dashed text-center">
              <p className="text-muted-foreground mb-2">No units configured yet</p>
              <p className="text-sm text-muted-foreground">
                Add units to the stockUnits array in StockPage.tsx
              </p>
            </Card>
          )}
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-3">How to Add Personal Units</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Create a new question file in <code className="bg-background px-1 rounded">src/data/stock/</code> (e.g., <code className="bg-background px-1 rounded">myunit-questions.ts</code>)</li>
            <li>Export your questions array (follow the format in <code className="bg-background px-1 rounded">basics-questions.ts</code>)</li>
            <li>Import your questions at the top of this file</li>
            <li>Add your unit to the <code className="bg-background px-1 rounded">stockUnits</code> array</li>
            <li>Add the mapping in <code className="bg-background px-1 rounded">Quiz.tsx</code> questionMap: <code className="bg-background px-1 rounded">'stock-myunit': myUnitQuestions</code></li>
          </ol>
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

export default StockPage;
