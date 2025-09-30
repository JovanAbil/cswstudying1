import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { unit1aQuestions } from '@/data/unit1a-questions';
import { Question, QuizAttempt } from '@/types/quiz';
import { toast } from 'sonner';

const Quiz = () => {
  const { unitId, quizType } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGrading, setShowGrading] = useState(false);

  useEffect(() => {
    // Get questions based on unit and type
    const questionCount = quizType === 'daily' ? 10 : 30;
    const allQuestions = unitId === '1a' ? unit1aQuestions : [];
    
    // Shuffle and select questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    
    setQuestions(selected);
    setAttempts(selected.map(q => ({
      questionId: q.id,
      userAnswer: null,
      isCorrect: null,
      selfGraded: q.type === 'free-response'
    })));
  }, [unitId, quizType]);

  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = () => {
    if (!currentAnswer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    const newAttempts = [...attempts];
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      userAnswer: currentAnswer
    };

    if (currentQuestion.type === 'multiple-choice') {
      const isCorrect = currentAnswer === currentQuestion.correctAnswer;
      newAttempts[currentIndex].isCorrect = isCorrect;
      setAttempts(newAttempts);
      setIsSubmitted(true);
    } else {
      setAttempts(newAttempts);
      setIsSubmitted(true);
      setShowGrading(true);
    }
  };

  const handleSelfGrade = (isCorrect: boolean) => {
    const newAttempts = [...attempts];
    newAttempts[currentIndex].isCorrect = isCorrect;
    setAttempts(newAttempts);
    setShowGrading(false);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsSubmitted(false);
      setShowGrading(false);
    } else {
      // Quiz complete
      const score = attempts.filter(a => a.isCorrect).length;
      const total = attempts.length;
      navigate('/results', { 
        state: { 
          score, 
          total, 
          unitId, 
          quizType,
          attempts: attempts.map((a, i) => ({
            ...a,
            question: questions[i]
          }))
        } 
      });
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(`/unit/${unitId}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Unit
        </Button>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8">
          <h3 className="text-xl font-semibold mb-6 leading-relaxed">
            {currentQuestion.question}
          </h3>

          {currentQuestion.type === 'multiple-choice' ? (
            <RadioGroup
              value={currentAnswer}
              onValueChange={setCurrentAnswer}
              disabled={isSubmitted}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    isSubmitted && option.value === currentQuestion.correctAnswer
                      ? 'border-success bg-success/10'
                      : isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer
                      ? 'border-destructive bg-destructive/10'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                  {isSubmitted && option.value === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                disabled={isSubmitted}
                placeholder="Enter your answer"
                className="text-lg"
              />
            </div>
          )}

          {isSubmitted && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <p className="whitespace-pre-line text-sm">{currentQuestion.explanation}</p>
            </div>
          )}

          {isSubmitted && currentQuestion.type === 'free-response' && (
            <div className="mt-6 p-4 bg-primary/5 border-2 border-primary rounded-lg">
              <h4 className="font-semibold mb-2">Correct Answer:</h4>
              <p className="text-lg mb-4">{currentQuestion.correctAnswer}</p>
              
              {showGrading && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Did you get this correct?</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleSelfGrade(true)}
                      variant="outline"
                      className="flex-1 border-success text-success hover:bg-success hover:text-white"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      I got it right
                    </Button>
                    <Button
                      onClick={() => handleSelfGrade(false)}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      I got it wrong
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {!isSubmitted ? (
              <Button onClick={handleSubmit} className="flex-1" size="lg">
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                className="flex-1" 
                size="lg"
                disabled={currentQuestion.type === 'free-response' && currentAttempt.isCorrect === null}
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
