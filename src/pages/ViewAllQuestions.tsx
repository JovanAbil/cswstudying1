import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import MathText from '@/components/MathText';
import QuestionTable from '@/components/QuestionTable';
import useCustomUnits from '@/hooks/useCustomUnits';

// Import all question sets from existing paths
import { polynomialQuestions } from '@/data/apprecalc/polynomial-questions';
import { rationalQuestions } from '@/data/apprecalc/rational-questions';
import { exponentialQuestions } from '@/data/apprecalc/exponential-questions';
import { logarithmicQuestions } from '@/data/apprecalc/logarithmic-questions';
import { trigonometricQuestions } from '@/data/apprecalc/trigonometric-questions';
import { polarQuestions } from '@/data/apprecalc/polar-questions';
import { parametricQuestions } from '@/data/apprecalc/parametric-questions';
import { vectorsMatricesQuestions } from '@/data/apprecalc/vectorsMatrices-questions';
import { biochemistryQuestions } from '@/data/biology/biochemistry-questions';
import { cellstructureQuestions } from '@/data/biology/cellstructure-questions';
import { cellenergeticsQuestions } from '@/data/biology/cellenergetics-questions';
import { cellgrowthQuestions } from '@/data/biology/cellgrowth-questions';
import { geneticsQuestions } from '@/data/biology/genetics-questions';
import { molecularQuestions } from '@/data/biology/molecular-questions';
import { evolutionQuestions } from '@/data/biology/evolution-questions';
import { ecologyQuestions } from '@/data/biology/ecology-questions';
import { metricQuestions } from '@/data/chemistry/metric-questions';
import { atomicQuestions } from '@/data/chemistry/atomic-questions';
import { compoundsQuestions } from '@/data/chemistry/compounds-questions';
import { gasesQuestions } from '@/data/chemistry/gases-questions';
import { solutionsQuestions } from '@/data/chemistry/solutions-questions';
import { reactionsQuestions } from '@/data/chemistry/reactions-questions';
import { stoichiometryQuestions } from '@/data/chemistry/stoichiometry-questions';
import { acidbasesQuestions } from '@/data/chemistry/acidbases-questions';
import { metricDQuestions } from '@/data/chemistryDarone/metricD-questions';
import { atomicDQuestions } from '@/data/chemistryDarone/atomicD-questions';
import { compoundsDQuestions } from '@/data/chemistryDarone/compoundsD-questions';
import { gasesDQuestions } from '@/data/chemistryDarone/gasesD-questions';
import { solutionsDQuestions } from '@/data/chemistryDarone/solutionsD-questions';
import { reactionsDQuestions } from '@/data/chemistryDarone/reactionsD-questions';
import { stoichiometryDQuestions } from '@/data/chemistryDarone/stoichiometryD-questions';
import { acidbasesDQuestions } from '@/data/chemistryDarone/acidbasesD-questions';
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
import { generalQuestions } from '@/data/memory/general-questions';
import { general2Questions } from '@/data/memory/general2-questions';
import { general3Questions } from '@/data/memory/general3-questions';
import { unit1Questions } from '@/data/practice/unit1-questions';
import { gasQuestions } from '@/data/practice/gas-questions';
import { logQuestions } from '@/data/practice/log-questions';
import { Question } from '@/types/quiz';

const ViewAllQuestions = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const { data: customUnitsData, isLoaded: customUnitsLoaded } = useCustomUnits();

  // Check if this is a custom topic
  const isCustomTopic = subject?.startsWith('custom-');
  const customUnitId = isCustomTopic ? subject.replace('custom-', '') : null;

  // Load custom questions
  useEffect(() => {
    if (isCustomTopic && customUnitsLoaded && customUnitId && unitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      setCustomQuestions(topic?.questions || []);
    }
  }, [isCustomTopic, customUnitsLoaded, customUnitId, unitId, customUnitsData]);

  const questionMap: Record<string, Question[]> = useMemo(() => ({
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
    'memory-general': generalQuestions, 'memory-general2': general2Questions, 'memory-general3': general3Questions,
    'practice-unit1': unit1Questions, 'practice-gases': gasQuestions, 'practice-log': logQuestions,
  }), []);

  const questions = isCustomTopic ? customQuestions : (questionMap[`${subject}-${unitId}`] || []);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success('Question ID copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get topic name for custom topics
  const getTopicName = () => {
    if (isCustomTopic && customUnitId) {
      const unit = customUnitsData.units.find(u => u.id === customUnitId);
      const topic = unit?.topics.find(t => t.id === unitId);
      return topic?.name || unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isCustomTopic && !customUnitsLoaded) {
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(`/unit/${subject}/${unitId}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit
        </Button>
        <h1 className="text-3xl font-display font-bold mb-2">All Questions - {getTopicName()}</h1>
        <p className="text-muted-foreground mb-8">{questions.length} questions total</p>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">#{index + 1}</span>
                  <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{question.id}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyId(question.id)} className="h-8 w-8 p-0">
                    {copiedId === question.id ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${question.type === 'multiple-choice' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                  {question.type === 'multiple-choice' ? 'MC' : 'FRQ'}
                </span>
              </div>
              {question.table && <QuestionTable data={question.table} enableChemistry={subject === 'chemistry'} />}
              {question.image && <div className="mb-4 flex justify-center"><img src={question.image} alt="Question" className="max-w-xl max-h-64 object-contain rounded-lg border-2 border-border" /></div>}
              <MathText tag="p" className="text-base mb-4" enableChemistry={subject === 'chemistry'}>{question.question}</MathText>
              {question.type === 'multiple-choice' && (
                <div className="space-y-2 mb-4">
                  {question.options.map((option) => (
                    <div key={option.value} className={`p-3 rounded-lg border ${option.value === question.correctAnswer ? 'border-success bg-success/10' : 'border-border'}`}>
                      {option.image ? <img src={option.image} alt={`Option`} className="max-w-md max-h-48 object-contain rounded" /> : <MathText enableChemistry={subject === 'chemistry'}>{option.text}</MathText>}
                      {option.value === question.correctAnswer && <span className="ml-2 text-success font-semibold text-sm">✓</span>}
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'free-response' && (
                <div className="p-3 rounded-lg border border-success bg-success/10">
                  <p className="text-sm font-semibold mb-1">Answer:</p>
                  <MathText enableChemistry={subject === 'chemistry'}>{question.correctAnswer}</MathText>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllQuestions;