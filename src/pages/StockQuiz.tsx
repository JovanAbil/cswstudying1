import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle2, XCircle, Home } from 'lucide-react';
import useQuizTimer from '@/hooks/useQuizTimer';
import QuizTimer from '@/components/QuizTimer';
import { Question, QuizAttempt } from '@/types/quiz';
import { toast } from 'sonner';
import MathText from '@/components/MathText';
import { stockQuestions } from '@/data/stock/stock-questions';

// Secret personal quiz page - accessible only via direct link /stock/
const StockQuiz = () => {
  const navigate = useNavigate();
  const timer = useQuizTimer();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const allQuestions = [...stockQuestions].sort(() => Math.random() - 0.5);
    
    if (allQuestions.length > 0) {
      setQuestions(allQuestions);
      setAttempts(allQuestions.map(q => ({
        questionId: q.id, userAnswer: null, isCorrect: null, selfGraded: q.type === 'free-response'
      })));
      setCurrentIndex(0);
      setCurrentAnswer('');
      setIsSubmitted(false);
      setShowGrading(false);
      timer.reset();
      timer.start();
    }
  }, []);

  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'multiple-choice') {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isSubmitted && currentQuestion?.type === 'multiple-choice') {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= shuffledOptions.length) {
          setCurrentAnswer(shuffledOptions[keyNum - 1].value);
          return;
        }
      }

      if (e.key === 'Enter') {
        if (!isSubmitted) {
          handleSubmit();
        } else if (currentQuestion?.type === 'multiple-choice' || currentAttempt?.isCorrect !== null) {
          handleNext();
        }
      }
      
      if (showGrading && currentQuestion?.type === 'free-response') {
        if (e.key === 'ArrowRight') {
          handleSelfGrade(true);
        } else if (e.key === 'ArrowLeft') {
          handleSelfGrade(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSubmitted, currentAnswer, currentQuestion, currentAttempt, currentIndex, showGrading, shuffledOptions]);

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

  const handleSkip = () => {
    const newAttempts = [...attempts];
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      userAnswer: '(Skipped)',
      isCorrect: false
    };
    setAttempts(newAttempts);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsSubmitted(false);
      setShowGrading(false);
      setShuffledOptions([]);
    } else {
      timer.stop();
      setIsComplete(true);
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
      setShuffledOptions([]);
    } else {
      timer.stop();
      setIsComplete(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">No Stock Questions</h2>
          <p className="text-muted-foreground mb-6">Add questions to src/data/stock/stock-questions.ts</p>
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  if (isComplete) {
    const score = attempts.filter(a => a.isCorrect).length;
    const total = attempts.length;
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Stock Quiz Complete!</h1>
            <div className="text-5xl font-bold text-primary mb-4">{percentage}%</div>
            <p className="text-xl mb-6">{score} / {total} correct</p>
            <Button onClick={() => navigate('/')} size="lg">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <QuizTimer formatted={timer.formatted} isRunning={timer.isRunning} />
        </div>

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

        <Card className="p-8 animate-fade-in">
          <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed">
            {currentQuestion.question}
          </MathText>

          {currentQuestion.type === 'multiple-choice' ? (
            <RadioGroup
              value={currentAnswer}
              onValueChange={setCurrentAnswer}
              disabled={isSubmitted}
              className="space-y-3"
            >
              {shuffledOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    isSubmitted && option.value === currentQuestion.correctAnswer
                      ? 'border-success bg-success/10'
                      : isSubmitted && option.value === currentAnswer && currentAnswer !== currentQuestion.correctAnswer
                      ? 'border-destructive bg-destructive/10'
                      : currentAnswer === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer flex items-start gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-muted text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <MathText>{option.text}</MathText>
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
            <Input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Enter your answer"
              className="text-lg"
            />
          )}

          {isSubmitted && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <MathText tag="p" className="whitespace-pre-line text-sm">{currentQuestion.explanation}</MathText>
            </div>
          )}

          {isSubmitted && currentQuestion.type === 'free-response' && (
            <div className="mt-6 p-4 bg-primary/5 border-2 border-primary rounded-lg">
              <h4 className="font-semibold mb-2">Correct Answer:</h4>
              <MathText tag="p" className="text-lg mb-4">{currentQuestion.correctAnswer}</MathText>
              
              {showGrading && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Did you get this correct?</p>
                  <div className="flex gap-3">
                    <Button onClick={() => handleSelfGrade(true)} variant="outline"
                      className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> I got it right
                    </Button>
                    <Button onClick={() => handleSelfGrade(false)} variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <XCircle className="mr-2 h-4 w-4" /> I got it wrong
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {!isSubmitted ? (
              <>
                <Button onClick={handleSkip} variant="outline" size="lg" className="border-muted-foreground text-muted-foreground hover:bg-muted">
                  Skip
                </Button>
                <Button onClick={handleSubmit} className="flex-1" size="lg">
                  Submit Answer
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleNext} 
                className="flex-1" 
                size="lg"
                disabled={currentQuestion.type === 'free-response' && showGrading}
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StockQuiz;