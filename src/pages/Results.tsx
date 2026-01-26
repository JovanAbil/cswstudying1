import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Trophy, Home, CheckCircle2, XCircle, Clock, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Question, QuizAttempt } from '@/types/quiz';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExtendedAttempt extends QuizAttempt {
  question: Question;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addWrongAnswers } = useWrongAnswers();
  const { score, total, subject, unitId, quizType, attempts, timeElapsed } = location.state || {};

  // Preset download dialog state - must be before any early returns
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const defaultPresetName = `Wrong Answers - ${subject || ''} ${unitId || 'Course Challenge'}`;
  const [presetName, setPresetName] = useState(defaultPresetName);

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
  
  const wrongAttempts = extendedAttempts.filter(a => !a.isCorrect);

  const handleOpenDownloadDialog = () => {
    if (wrongAttempts.length === 0) {
      toast.error('No wrong answers to download');
      return;
    }
    setPresetName(defaultPresetName);
    setShowDownloadDialog(true);
  };

  const handleDownloadWrongAnswers = () => {
    const presetData = {
      version: 1,
      preset: {
        id: `wrong-answers-${Date.now()}`,
        name: presetName.trim() || defaultPresetName,
        questionIds: wrongAttempts.map(a => a.questionId),
      }
    };

    const safeFileName = (presetName.trim() || defaultPresetName)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '');

    const blob = new Blob([JSON.stringify(presetData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeFileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadDialog(false);
    toast.success('Wrong answers downloaded as preset!');
  };

  const getSubjectDisplayName = (s: string) => {
    const names: Record<string, string> = {
      'apprecalc': 'AP Precalculus',
      'chemistry': 'Chemistry',
      'biology': 'Biology',
      'worldhistory': 'World History',
      'memory': 'Memory Training',
      'stock': 'Stock Market',
    };
    return names[s] || s;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        {/* Top Home Button */}
        <div className="flex justify-start mb-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

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

        {/* Download Wrong Answers Section */}
        {wrongAttempts.length > 0 && (
          <Card className="p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">Download Wrong Answers as Preset</h3>
                <p className="text-sm text-muted-foreground">
                  You got {wrongAttempts.length} question{wrongAttempts.length !== 1 ? 's' : ''} wrong. 
                  Download them as a preset file to use in <span className="font-medium">{getSubjectDisplayName(subject)}</span>'s 
                  {unitId === 'course-challenge' ? ' Course Challenge' : ` Unit ${unitId?.toUpperCase()}`} Preset Builder.
                </p>
              </div>
              <Button onClick={handleOpenDownloadDialog} className="shrink-0">
                <Download className="mr-2 h-4 w-4" />
                Download Preset
              </Button>
            </div>
          </Card>
        )}

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
          <Link to="/">
            <Button
              size="lg"
              className="min-w-[200px]"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Download Preset Name Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Preset</DialogTitle>
            <DialogDescription>
              Enter a name for your preset file containing {wrongAttempts.length} wrong question{wrongAttempts.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="preset-name">Preset Name</Label>
            <Input
              id="preset-name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name..."
              className="mt-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDownloadWrongAnswers();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleDownloadWrongAnswers}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Results;
