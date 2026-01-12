import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Trophy, Home, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { Question, QuizAttempt } from '@/types/quiz';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface ExtendedAttempt extends QuizAttempt {
  question: Question;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addWrongAnswers } = useWrongAnswers();
  const { score, total, subject, unitId, quizType, attempts, timeElapsed } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    // Save wrong answers to localStorage
    if (attempts && subject) {
      const extAttempts = attempts as ExtendedAttempt[];
      const wrongQuestions = extAttempts
        .filter(a => !a.isCorrect)
        .map(a => a.question);
      
      if (wrongQuestions.length > 0) {
        addWrongAnswers(subject, unitId || 'course-challenge', wrongQuestions);
      }
    }
  }, [location.state, navigate, attempts, subject, unitId, addWrongAnswers]);

  if (!location.state) {
    return null;
  }

  const percentage = Math.round((score / total) * 100);
  
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', message: 'Outstanding!', color: 'text-success' };
    if (percentage >= 80) return { grade: 'B', message: 'Great job!', color: 'text-primary' };
    if (percentage >= 70) return { grade: 'C', message: 'Good effort!', color: 'text-accent' };
    if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!', color: 'text-muted-foreground' };
    return { grade: 'F', message: 'More study needed', color: 'text-destructive' };
  };

  const gradeInfo = getGrade();

  const extendedAttempts = attempts as ExtendedAttempt[];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="py-8 px-4 flex-1">
        <Card className="p-8 md:p-12 mb-8 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Unit {unitId?.toUpperCase()} - {quizType === 'daily' ? 'Daily Practice' : 'Full Test'}
            </p>

            <div className="bg-muted rounded-lg p-8 mb-8">
              <div className={`text-6xl font-display font-bold mb-2 ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </div>
              <p className="text-xl font-semibold mb-4">{gradeInfo.message}</p>
              
              <div className="text-3xl font-bold mb-2">
                {score} / {total}
              </div>
              <p className="text-muted-foreground mb-4">Correct Answers</p>
              
              <Progress value={percentage} className="h-3 mb-4" />
              <p className="text-sm text-muted-foreground mb-4">{percentage}% Score</p>
              
              {timeElapsed !== undefined && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="timer-display">Time: {formatTime(timeElapsed)}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-8 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-display font-bold mb-6">Review Your Answers</h2>
          <p className="text-muted-foreground mb-6">
            Review each question to understand what to study next
          </p>

          <div className="space-y-6">
            {extendedAttempts
              .sort((a, b) => {
                if (a.isCorrect === b.isCorrect) return 0;
                return a.isCorrect ? 1 : -1;
              })
              .map((attempt, index) => {
              const question = attempt.question;
              const isCorrect = attempt.isCorrect;
              
              return (
                <div key={attempt.questionId}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex-shrink-0 mt-1 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <XCircle className="h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        Question {index + 1}
                      </h3>
                      
                       {question.table && (
                        <div className="mb-3">
                          <QuestionTable data={question.table} enableChemistry={subject === 'chemistry'} />
                        </div>
                      )}
                      
                      {question.image && (
                        <div className="mb-3 flex justify-center">
                          <img 
                            src={question.image} 
                            alt="Question diagram" 
                            className="max-w-2xl max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-border"
                          />
                        </div>
                      )}
                      
                      <MathText tag="p" className="text-sm mb-3" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>

                      {question.type === 'multiple-choice' ? (
                        <div className="space-y-2 mb-3">
                          {question.options.map((option) => {
                            const isUserAnswer = attempt.userAnswer === option.value;
                            const isCorrectAnswer = option.value === question.correctAnswer;
                            
                            return (
                              <div
                                key={option.value}
                                className={`p-3 rounded-lg border-2 text-sm ${
                                  isCorrectAnswer
                                    ? 'border-success bg-success/10'
                                    : isUserAnswer && !isCorrect
                                    ? 'border-destructive bg-destructive/10'
                                    : 'border-border'
                                }`}
                              >
                                <span className="font-semibold mr-2">{option.label})</span>
                                {option.image ? (
                                  <img 
                                    src={option.image} 
                                    alt={`Option ${option.label}`}
                                    className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
                                  />
                                ) : (
                                  <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                                )}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-success font-semibold">✓ Correct</span>
                                )}
                                {isUserAnswer && !isCorrect && (
                                  <span className="ml-2 text-destructive font-semibold">Your answer</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2 mb-3">
                          <div className="p-3 bg-muted rounded-lg text-sm">
                            <p className="font-semibold mb-1">Your Answer:</p>
                            {question.displayAs === 'paragraph' ? (
                              <MathText tag="div" className="whitespace-pre-wrap" enableChemistry={subject === 'chemistry'}>{attempt.userAnswer || '(No answer)'}</MathText>
                            ) : (
                              <MathText tag="p" enableChemistry={subject === 'chemistry'}>{attempt.userAnswer || '(No answer)'}</MathText>
                            )}
                          </div>
                          <div className={`p-3 rounded-lg border-2 border-success bg-success/10 text-sm`}>
                            <p className="font-semibold mb-1">Correct Answer:</p>
                            {question.displayAs === 'paragraph' ? (
                              <MathText tag="div" className="whitespace-pre-wrap" enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                            ) : (
                              <MathText tag="p" enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                            )}
                          </div>
                        </div>
                      )}

                      {question.explanation && (
                        <div className="p-3 bg-primary/5 rounded-lg text-sm">
                          <p className="font-semibold mb-1">Explanation:</p>
                          <MathText tag="p" className="whitespace-pre-line" enableChemistry={subject === 'chemistry'}>{question.explanation}</MathText>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {index < extendedAttempts.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="min-w-[200px]"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Results;