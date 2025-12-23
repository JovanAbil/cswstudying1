import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
//AP Precalc
import { polynomialQuestions } from '@/data/apprecalc/polynomial-questions';
import { rationalQuestions } from '@/data/apprecalc/rational-questions';
import { exponentialQuestions } from '@/data/apprecalc/exponential-questions';
import { logarithmicQuestions } from '@/data/apprecalc/logarithmic-questions';
import { trigonometricQuestions } from '@/data/apprecalc/trigonometric-questions';
import { polarQuestions } from '@/data/apprecalc/polar-questions';
import { parametricQuestions } from '@/data/apprecalc/parametric-questions';
import { vectorsMatricesQuestions } from '@/data/apprecalc/vectorsMatrices-questions';
//Valenti
import { biochemistryQuestions } from '@/data/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/biology/genetics-questions';
import { molecularQuestions } from '@/data/biology/molecular-questions';
import { evolutionQuestions } from '@/data/biology/evolution-questions';
import { ecologyQuestions } from '@/data/biology/ecology-questions';
//Griffiths
import { metricQuestions } from '@/data/chemistry/metric-questions';
import { atomicQuestions } from '@/data/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/chemistry/acidbases-questions';
//Darone
import { metricDQuestions } from '@/data/chemistryDarone/metricD-questions';
import { atomicDQuestions } from '@/data/chemistryDarone/atomicD-questions';
import { compoundsDQuestions } from '@/data/chemistryDarone/compoundsD-questions';
import { gasesDQuestions } from '@/data/chemistryDarone/gasesD-questions';
import { solutionsDQuestions } from '@/data/chemistryDarone/solutionsD-questions';
import { reactionsDQuestions } from '@/data/chemistryDarone/reactionsD-questions';
import { stoichiometryDQuestions } from '@/data/chemistryDarone/stoichiometryD-questions';
import { acidbasesDQuestions } from '@/data/chemistryDarone/acidbasesD-questions';
//Stella
import { religionsQuestions } from '@/data/worldhistory/religions-questions';
import { islamQuestions } from '@/data/worldhistory/islam-questions';
import { renaissanceQuestions } from '@/data/worldhistory/renaissance-questions';
import { protestantQuestions } from '@/data/worldhistory/protestant-questions';
import { worldHistoryUnit5Questions } from '@/data/worldhistory/world-history-unit5';
import { worldHistoryUnit6Questions } from '@/data/worldhistory/world-history-unit6';
import { worldHistoryUnit7Questions } from '@/data/worldhistory/world-history-unit7';
import { worldHistoryUnit8Questions } from '@/data/worldhistory/world-history-unit8';
import { worldHistoryUnit9Questions } from '@/data/worldhistory/world-history-unit9';
import { worldHistoryUnit10Questions } from '@/data/worldhistory/world-history-unit10';
import { worldHistoryUnit11Questions } from '@/data/worldhistory/world-history-unit11';
//Memory
import { generalQuestions } from '@/data/memory/general-questions';
import { general2Questions } from '@/data/memory/general2-questions';
import { general3Questions } from '@/data/memory/general3-questions';
//Practice
import { unit1Questions } from '@/data/practice/unit1-questions';
import { gasQuestions } from '@/data/practice/gas-questions';
import { logQuestions } from '@/data/practice/log-questions';
//Others
import { Question, QuizAttempt } from '@/types/quiz';
import { toast } from 'sonner';
import QuestionTable from '@/components/QuestionTable';
import MathText from '@/components/MathText';

const Quiz = () => {
  const { subject, unitId, quizType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Memoize selectedUnits to prevent infinite loop
  const selectedUnits = useMemo(() => location.state?.selectedUnits || [], [location.state?.selectedUnits]);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  useEffect(() => {
    const questionCount = quizType === 'daily' ? 10 : quizType === 'cram' ? Infinity : 30;
    
    const questionMap: Record<string, Question[]> = {
      'precalc-polynomial': polynomialQuestions, 'precalc-rational': rationalQuestions,
      'precalc-exponential': exponentialQuestions, 'precalc-logarithmic': logarithmicQuestions,
      'precalc-trigonometric': trigonometricQuestions, 'precalc-polar': polarQuestions,
      'precalc-parametric': parametricQuestions, 'precalc-vectorsMatrices': vectorsMatricesQuestions,
      'biology-biochemistry': biochemistryQuestions, 'biology-cellstructure': cellstructureQuestions,
      'biology-cellenergetics': cellenergeticsQuestions, 'biology-cellgrowth': cellgrowthQuestions,
      'biology-genetics': geneticsQuestions, 'biology-molecular': molecularQuestions,
      'biology-evolution': evolutionQuestions, 'biology-ecology': ecologyQuestions,
      'chemistry-metric': metricQuestions, 'chemistry-atomic': atomicQuestions,
      'chemistry-compounds': compoundsQuestions, 'chemistry-gases': gasesQuestions,
      'chemistry-solutions': solutionsQuestions, 'chemistry-reactions': reactionsQuestions,
      'chemistry-stoichiometry': stoichiometryQuestions, 'chemistry-acidbases': acidbasesQuestions,
      'chemistryDarone-metric': metricDQuestions, 'chemistryDarone-atomic': atomicDQuestions,
      'chemistryDarone-compounds': compoundsDQuestions, 'chemistryDarone-gases': gasesDQuestions,
      'chemistryDarone-solutions': solutionsDQuestions, 'chemistryDarone-reactions': reactionsDQuestions,
      'chemistryDarone-stoichiometry': stoichiometryDQuestions, 'chemistryDarone-acidbases': acidbasesDQuestions,
      'world-history-religions': religionsQuestions, 'world-history-islam': islamQuestions,
      'world-history-renaissance': renaissanceQuestions, 'world-history-protestant': protestantQuestions,
      'world-history-unit5': worldHistoryUnit5Questions, 'world-history-unit6': worldHistoryUnit6Questions,
      'world-history-unit7': worldHistoryUnit7Questions, 'world-history-unit8': worldHistoryUnit8Questions,
      'world-history-unit9': worldHistoryUnit9Questions, 'world-history-unit10': worldHistoryUnit10Questions,
      'world-history-unit11': worldHistoryUnit11Questions, 
      'memory-general': generalQuestions, 'memory-general2': general2Questions, 'memory-general3': general3Questions, 'practice-unit1': unit1Questions, 'practice-gases': gasQuestions,
      'practice-log': logQuestions,
      // Note: chemistryDarone, world-history-kohl,
    };
    
    let allQuestions: Question[] = [];
    if (selectedUnits.length > 0) {
      selectedUnits.forEach((unit: string) => {
        allQuestions = [...allQuestions, ...(questionMap[`${subject}-${unit}`] || [])];
      });
    } else {
      allQuestions = questionMap[`${subject}-${unitId}`] || [];
    }
    
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    
    if (selected.length > 0) {
      setQuestions(selected);
      setAttempts(selected.map(q => ({
        questionId: q.id, userAnswer: null, isCorrect: null, selfGraded: q.type === 'free-response'
      })));
      setCurrentIndex(0);
      setCurrentAnswer('');
      setIsSubmitted(false);
      setShowGrading(false);
    }
  }, [subject, unitId, quizType, selectedUnits]);

  const currentQuestion = questions[currentIndex];
  const currentAttempt = attempts[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  // Shuffle options when question changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'multiple-choice') {
      const shuffled = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!isSubmitted) {
          handleSubmit();
        } else if (currentQuestion.type === 'multiple-choice' || currentAttempt.isCorrect !== null) {
          handleNext();
        }
      }
      
      // Self-grading keyboard shortcuts for free-response questions
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
  }, [isSubmitted, currentAnswer, currentQuestion, currentAttempt, currentIndex, showGrading]);

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
      setShuffledOptions([]);
    } else {
      // Quiz complete
      const score = attempts.filter(a => a.isCorrect).length;
      const total = attempts.length;
      navigate('/results', { 
        state: { 
          score, 
          total,
          subject,
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
          onClick={() => navigate(selectedUnits.length > 0 ? `/course-challenge/${subject}` : `/unit/${subject}/${unitId}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {selectedUnits.length > 0 ? 'Back to Challenge' : 'Back to Unit'}
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
              {shuffledOptions.map((option) => (
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
