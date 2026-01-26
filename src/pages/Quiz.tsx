import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import MathQuickInput from '@/components/MathQuickInput';
import { ArrowLeft, CheckCircle2, XCircle, Lock } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import useQuizTimer from '@/hooks/useQuizTimer';
import QuizTimer from '@/components/QuizTimer';
import useCustomUnits from '@/hooks/useCustomUnits';

// Use centralized question loader with date-based switching
import { getQuestionMap, getTopicLockInfo } from '@/utils/questionLoader';

import { Question, QuizAttempt } from '@/types/quiz';
import { toast } from 'sonner';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';

import {
  buildRouteKey,
  clearInProgressQuiz,
  loadInProgressQuiz,
  saveInProgressQuiz,
} from '@/utils/inProgressQuizStorage';

const Quiz = () => {
  const frqInputRef = useRef<HTMLInputElement>(null);
  const { subject, unitId, quizType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const timer = useQuizTimer();
  const { data: customUnitsData, isLoaded: customUnitsLoaded } = useCustomUnits();
  
  // Calculator section parameter - when true, puts calculator questions at the end
  const calculatorSectionEnabled = searchParams.get('calculatorSection') === 'true';
  
  const selectedUnits = useMemo(() => location.state?.selectedUnits || [], [location.state?.selectedUnits]);
  const wrongQuestions = useMemo(() => location.state?.wrongQuestions || [], [location.state?.wrongQuestions]);
  const presetQuestions = useMemo(() => location.state?.presetQuestions || [], [location.state?.presetQuestions]);
  const startNewAttempt = useMemo(() => !!location.state?.startNewAttempt, [location.state?.startNewAttempt]);
  
  // Check if this is a custom topic quiz
  const isCustomTopic = subject?.startsWith('custom-');
  const customUnitId = isCustomTopic ? subject.replace('custom-', '') : null;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const routeKey = useMemo(() => buildRouteKey(subject, unitId, quizType), [subject, unitId, quizType]);

  // Get questions using the centralized loader (applies date-based switching)
  const questionMap = useMemo(() => getQuestionMap(), []);
  
  // Get lock info for the current topic
  const questionKey = `${subject}-${unitId}`;
  const lockInfo = getTopicLockInfo(questionKey);

  useEffect(() => {
    // If user explicitly starts a new attempt, wipe any saved progress for this route.
    if (startNewAttempt) {
      clearInProgressQuiz(routeKey);
    }

    // Wait for custom units to load if this is a custom topic
    if (isCustomTopic && !customUnitsLoaded) {
      return;
    }

    // Try to restore an in-progress attempt first (so leaving/reloading the site doesn't reset).
    if (!startNewAttempt) {
      const saved = loadInProgressQuiz(routeKey);
      if (saved && saved.questions.length > 0) {
        setQuestions(saved.questions);
        setAttempts(saved.attempts);
        setCurrentIndex(saved.currentIndex);
        setCurrentAnswer(saved.currentAnswer);
        setIsSubmitted(saved.isSubmitted);
        setShowGrading(saved.showGrading);
        timer.reset();
        timer.set(saved.timerSeconds);
        timer.start();
        return;
      }
    }
    
    const totalQuestions = 30;
    const questionCount = quizType === 'daily' ? 10 : quizType === 'cram' ? Infinity : totalQuestions;
    
    let allQuestions: Question[] = [];
    
    // Handle preset questions from preset builder
    if (presetQuestions.length > 0) {
      allQuestions = [...presetQuestions].sort(() => Math.random() - 0.5);
    }
    // Handle wrong questions from targeted practice
    else if (wrongQuestions.length > 0) {
      allQuestions = [...wrongQuestions].sort(() => Math.random() - 0.5);
    } 
    // Handle custom topic / custom unit challenge
    else if (isCustomTopic && customUnitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      if (!unit) {
        allQuestions = [];
      }
      // If selectedUnits are provided, treat them as topicIds (course-challenge style for custom units)
      else if (selectedUnits.length > 0) {
        const topics = unit.topics.filter(t => selectedUnits.includes(t.id));

        if (quizType === 'test') {
          // Distribute 30 questions evenly across selected topics
          const numTopics = topics.length;
          const base = numTopics > 0 ? Math.floor(totalQuestions / numTopics) : 0;
          let remainder = numTopics > 0 ? totalQuestions % numTopics : 0;

          topics.forEach(topic => {
            const shuffledTopic = [...topic.questions].sort(() => Math.random() - 0.5);
            let toTake = base;
            if (remainder > 0) {
              toTake += 1;
              remainder -= 1;
            }
            allQuestions = [...allQuestions, ...shuffledTopic.slice(0, Math.min(toTake, shuffledTopic.length))];
          });
          allQuestions = allQuestions.sort(() => Math.random() - 0.5);
        } else {
          // Cram mode across selected topics
          topics.forEach(topic => {
            allQuestions = [...allQuestions, ...topic.questions];
          });
          allQuestions = allQuestions.sort(() => Math.random() - 0.5);
        }
      }
      // Otherwise, single topic
      else if (unitId) {
        const topic = unit.topics.find(t => t.id === unitId);
        const customQuestions = topic?.questions || [];
        const shuffled = [...customQuestions].sort(() => Math.random() - 0.5);
        allQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));
      }
    }
    else if (selectedUnits.length > 0 && quizType === 'test') {
      // Course challenge: distribute 30 questions evenly across selected units
      const numUnits = selectedUnits.length;
      const baseQuestionsPerUnit = Math.floor(totalQuestions / numUnits);
      let remainder = totalQuestions % numUnits;
      
      selectedUnits.forEach((unit: string) => {
        const unitQuestions = questionMap[`${subject}-${unit}`] || [];
        const shuffledUnit = [...unitQuestions].sort(() => Math.random() - 0.5);
        
        // Calculate how many questions to take from this unit
        let questionsToTake = baseQuestionsPerUnit;
        if (remainder > 0) {
          questionsToTake += 1;
          remainder -= 1;
        }
        
        // Take the calculated number of questions (or all if fewer available)
        const selected = shuffledUnit.slice(0, Math.min(questionsToTake, shuffledUnit.length));
        allQuestions = [...allQuestions, ...selected];
      });
      
      // Shuffle the final combined list
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
    } else if (selectedUnits.length > 0) {
      // Cram mode: all questions from all units
      selectedUnits.forEach((unit: string) => {
        allQuestions = [...allQuestions, ...(questionMap[`${subject}-${unit}`] || [])];
      });
      allQuestions = allQuestions.sort(() => Math.random() - 0.5);
    } else {
      // Single unit quiz
      allQuestions = questionMap[`${subject}-${unitId}`] || [];
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      allQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    }
    
    // If calculator section is enabled, reorder questions so calculator questions are at the end
    if (calculatorSectionEnabled) {
      const nonCalcQuestions = allQuestions.filter(q => !q.calculator);
      const calcQuestions = allQuestions.filter(q => q.calculator === true);
      allQuestions = [...nonCalcQuestions, ...calcQuestions];
    }
    
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, unitId, quizType, selectedUnits, wrongQuestions, presetQuestions, questionMap, isCustomTopic, customUnitId, customUnitsLoaded, calculatorSectionEnabled, routeKey, startNewAttempt]);

  // Persist progress so leaving/reloading doesn't lose work
  useEffect(() => {
    if (!questions.length || !attempts.length) return;
    saveInProgressQuiz({
      version: 1,
      routeKey,
      updatedAt: Date.now(),
      questions,
      attempts,
      currentIndex,
      currentAnswer,
      isSubmitted,
      showGrading,
      timerSeconds: timer.seconds,
      meta: {
        subject,
        unitId,
        quizType,
        calculatorSectionEnabled,
      },
    });
  }, [questions, attempts, currentIndex, currentAnswer, isSubmitted, showGrading, timer.seconds, routeKey, subject, unitId, quizType, calculatorSectionEnabled]);

  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  
  // Calculate if we're in the "skipped section" (revisiting skipped questions)
  const isInSkippedSection = attempts.length > 0 && 
    attempts.every(a => a.userAnswer !== null || a.skipped);
  
  // Total skipped = all questions with skipped: true (this stays constant)
  const totalSkipped = attempts.filter(a => a.skipped).length;
  
  // How many skipped questions have been finalized (answered or skipped again)
  const finalizedSkippedCount = attempts.filter(a => a.userAnswer === 'SKIPPED_FINAL').length;
  
  // Current position in skipped section = finalized + 1 (for current question)
  const currentSkippedPosition = isInSkippedSection ? finalizedSkippedCount + 1 : 0;
  
  // Progress: for skipped section, base on finalized skips + non-skipped answered
  const answeredCount = attempts.filter(a => a.userAnswer !== null && !a.skipped).length;
  const progress = isInSkippedSection
    ? ((answeredCount + finalizedSkippedCount + 1) / questions.length) * 100
    : ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'multiple-choice') {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Number keys 1-9 for selecting options - don't prevent default, just select answer
      if (!isSubmitted && currentQuestion?.type === 'multiple-choice') {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= shuffledOptions.length) {
          e.preventDefault(); // Prevent the number from being typed
          setCurrentAnswer(shuffledOptions[keyNum - 1].value);
          // Remove focus from any button that might be focused (like Skip)
          if (document.activeElement instanceof HTMLButtonElement) {
            document.activeElement.blur();
          }
          return;
        }
      }

      if (e.key === 'Enter') {
        // Prevent Enter from triggering focused buttons
        if (document.activeElement instanceof HTMLButtonElement) {
          e.preventDefault();
        }
        if (!isSubmitted) {
          handleSubmit();
        } else if (currentQuestion.type === 'multiple-choice' || currentAttempt.isCorrect !== null) {
          handleNext();
        }
      }
      
      if (showGrading && currentQuestion.type === 'free-response') {
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

  const handleSelfGrade = (isCorrect: boolean) => {
    const newAttempts = [...attempts];
    newAttempts[currentIndex].isCorrect = isCorrect;
    setAttempts(newAttempts);
    setShowGrading(false);
  };

  const handleSkip = () => {
    const newAttempts = [...attempts];
    
    // Check if this question was already skipped before (revisiting in skipped section)
    const wasAlreadySkipped = newAttempts[currentIndex].skipped && 
      (newAttempts[currentIndex].userAnswer === null || newAttempts[currentIndex].userAnswer === 'SKIPPED');
    
    // If skipping again in skipped section, mark as FINAL (no more revisits)
    const skipMarker = wasAlreadySkipped ? 'SKIPPED_FINAL' : 'SKIPPED';
    
    newAttempts[currentIndex] = {
      ...newAttempts[currentIndex],
      userAnswer: skipMarker,
      isCorrect: false,
      skipped: true
    };
    
    // Find the next question to show
    // Priority 1: Next unanswered question after current index
    let nextIndex = -1;
    for (let i = currentIndex + 1; i < questions.length; i++) {
      if (newAttempts[i].userAnswer === null) {
        nextIndex = i;
        break;
      }
    }
    
    // Priority 2: Any unanswered question from the beginning (wrap around)
    if (nextIndex === -1) {
      for (let i = 0; i < currentIndex; i++) {
        if (newAttempts[i].userAnswer === null) {
          nextIndex = i;
          break;
        }
      }
    }
    
    // Priority 3: Find next skipped question that can be revisited (userAnswer === 'SKIPPED', not 'SKIPPED_FINAL')
    if (nextIndex === -1) {
      for (let i = currentIndex + 1; i < questions.length; i++) {
        if (newAttempts[i].skipped && newAttempts[i].userAnswer === 'SKIPPED') {
          // Reset it so user can answer
          newAttempts[i] = {
            ...newAttempts[i],
            userAnswer: null,
            isCorrect: null,
            skipped: true
          };
          nextIndex = i;
          break;
        }
      }
    }
    
    // Priority 4: Find skipped question from beginning (wrap around)
    if (nextIndex === -1) {
      for (let i = 0; i < currentIndex; i++) {
        if (newAttempts[i].skipped && newAttempts[i].userAnswer === 'SKIPPED') {
          // Reset it so user can answer
          newAttempts[i] = {
            ...newAttempts[i],
            userAnswer: null,
            isCorrect: null,
            skipped: true
          };
          nextIndex = i;
          break;
        }
      }
    }
    
    setAttempts(newAttempts);
    
    // If no next question found, all questions are done - go to results
    if (nextIndex === -1) {
      const finalTime = timer.stop();
      const score = newAttempts.filter(a => a.isCorrect).length;
      const total = newAttempts.length;

      clearInProgressQuiz(routeKey);

      navigate('/results', { 
        state: { 
          score, 
          total,
          subject,
          unitId, 
          quizType,
          timeElapsed: finalTime,
          attempts: newAttempts.map((a, i) => ({
            ...a,
            question: questions[i]
          }))
        } 
      });
      return;
    }
    
    setCurrentIndex(nextIndex);
    setCurrentAnswer('');
    setIsSubmitted(false);
    setShowGrading(false);
    setShuffledOptions([]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer('');
      setIsSubmitted(false);
      setShowGrading(false);
      setShuffledOptions([]);
    } else {
      const finalTime = timer.stop();
      const score = attempts.filter(a => a.isCorrect).length;
      const total = attempts.length;

      // Completed quizzes shouldn't be resumable
      clearInProgressQuiz(routeKey);

      navigate('/results', { 
        state: { 
          score, 
          total,
          subject,
          unitId, 
          quizType,
          timeElapsed: finalTime,
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
        <div className="text-center animate-fade-in">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => {
              // For targeted practice (wrong questions), go back to category
              if (wrongQuestions.length > 0) {
                if (['precalc'].includes(subject || '')) navigate('/category/math');
                else if (['biology', 'chemistry'].includes(subject || '')) navigate('/category/science');
                else if (['world-history'].includes(subject || '')) navigate('/category/social');
                else if (['memory', 'practice'].includes(subject || '')) navigate('/category/other');
                else navigate('/');
              }
              // For course challenge, go back to course challenge
              else if (selectedUnits.length > 0) {
                navigate(`/course-challenge/${subject}`);
              }
              // For custom topics, go back to the custom unit in Other category
              else if (isCustomTopic) {
                navigate('/category/other');
              }
              // For single unit, go back to unit detail
              else {
                navigate(`/unit/${subject}/${unitId}`);
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {wrongQuestions.length > 0 ? 'Back to Category' : selectedUnits.length > 0 ? 'Back to Challenge' : 'Back to Unit'}
          </Button>
          <QuizTimer formatted={timer.formatted} isRunning={timer.isRunning} />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              {isInSkippedSection && totalSkipped > 0 ? (
                <>
                  Skipped Question {currentSkippedPosition} of {totalSkipped}
                  <span className="ml-2 px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-medium">
                    Review
                  </span>
                </>
              ) : (
                <>
                  Question {currentIndex + 1} of {questions.length}
                  {attempts[currentIndex]?.skipped && (
                    <span className="ml-2 px-2 py-0.5 bg-warning/20 text-warning text-xs rounded-full font-medium">
                      [Skipped]
                    </span>
                  )}
                </>
              )}
            </h2>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 animate-fade-in">
          {currentQuestion.table && (
            <QuestionTable data={currentQuestion.table} enableChemistry={subject === 'chemistry'} />
          )}
          
          {currentQuestion.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={currentQuestion.image} 
                alt="Question diagram" 
                className="max-w-2xl max-h-96 w-auto h-auto object-contain rounded-lg border-2 border-border"
              />
            </div>
          )}
          
          <MathText tag="h3" className="text-xl font-semibold mb-6 leading-relaxed" enableChemistry={subject === 'chemistry'}>
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
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <span className="font-semibold mr-2 text-muted-foreground">{index + 1}.</span>
                    {option.image ? (
                      <img 
                        src={option.image} 
                        alt={`Option ${index + 1}`}
                        className="max-w-md max-h-64 w-auto h-auto object-contain rounded border border-border mt-2"
                      />
                    ) : (
                      <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>
                    )}
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
                ref={frqInputRef}
                type="text"
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                disabled={isSubmitted}
                placeholder="Enter your answer"
                className="text-lg"
              />
              {!isSubmitted && (
                <MathQuickInput
                  inputRef={frqInputRef}
                  value={currentAnswer}
                  onChange={setCurrentAnswer}
                  useUnicode={true}
                />
              )}
            </div>
          )}

          {isSubmitted && currentQuestion.explanation && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <MathText tag="p" className="whitespace-pre-line text-sm" enableChemistry={subject === 'chemistry'}>{currentQuestion.explanation}</MathText>
            </div>
          )}

          {isSubmitted && currentQuestion.type === 'free-response' && (
            <div className="mt-6 p-4 bg-primary/5 border-2 border-primary rounded-lg">
              <h4 className="font-semibold mb-2">Correct Answer:</h4>
              <MathText tag="p" className="text-lg mb-4" enableChemistry={subject === 'chemistry'}>{currentQuestion.correctAnswer}</MathText>
              
              {showGrading && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Did you get this correct?</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleSelfGrade(true)}
                      variant="outline"
                      className="flex-1 border-success text-success hover:bg-success hover:text-success-foreground"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      I got it right
                    </Button>
                    <Button
                      onClick={() => handleSelfGrade(false)}
                      variant="outline"
                      className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
              <>
                <Button onClick={handleSkip} variant="outline" size="lg" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
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

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </Card>
    </div>
    <Footer />
  </div>
);
};

export default Quiz;
