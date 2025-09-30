import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Home, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, unitId, quizType } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  const percentage = Math.round((score / total) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', message: 'Outstanding!', color: 'text-success' };
    if (percentage >= 80) return { grade: 'B', message: 'Great job!', color: 'text-primary' };
    if (percentage >= 70) return { grade: 'C', message: 'Good effort!', color: 'text-accent' };
    if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!', color: 'text-muted-foreground' };
    return { grade: 'F', message: 'More study needed', color: 'text-destructive' };
  };

  const gradeInfo = getGrade();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-8">
            Unit {unitId?.toUpperCase()} - {quizType === 'daily' ? 'Daily Practice' : 'Full Test'}
          </p>

          <div className="bg-muted rounded-lg p-8 mb-8">
            <div className={`text-6xl font-bold mb-2 ${gradeInfo.color}`}>
              {gradeInfo.grade}
            </div>
            <p className="text-xl font-semibold mb-4">{gradeInfo.message}</p>
            
            <div className="text-3xl font-bold mb-2">
              {score} / {total}
            </div>
            <p className="text-muted-foreground mb-4">Correct Answers</p>
            
            <Progress value={percentage} className="h-3 mb-2" />
            <p className="text-sm text-muted-foreground">{percentage}% Score</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate(`/unit/${unitId}/quiz/${quizType}`)}
              size="lg"
              className="w-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Results;
