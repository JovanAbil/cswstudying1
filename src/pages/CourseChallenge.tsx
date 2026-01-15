import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, ExternalLink, Wrench, Target, Upload, X, FileText, Download } from 'lucide-react';
import { courseChallengeResources } from '@/data/study-resources';
import { useWrongAnswers, TargetPresetValidation } from '@/hooks/useWrongAnswers';
import { parseTopicFile, getImportedQuestions, saveImportedQuestions, removeImportedQuestions, ImportedQuestionSet, generateBuiltInTopicFile } from '@/utils/customUnitsExport';
import { toast } from 'sonner';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import RemoveConfirmDialog from '@/components/RemoveConfirmDialog';
import TargetPresetImportDialog from '@/components/TargetPresetImportDialog';
import { Question } from '@/types/quiz';

// Import all question sets for validation
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

const CourseChallenge = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { 
    getAllWrongQuestionsForSubject, 
    getWrongAnswerCount,
    downloadTargetPreset,
    importTargetPreset,
    parseTargetPresetFile,
  } = useWrongAnswers();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const targetPresetInputRef = useRef<HTMLInputElement>(null);
  const [importedSets, setImportedSets] = useState<ImportedQuestionSet[]>([]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [setToRemove, setSetToRemove] = useState<{ id: string; name: string } | null>(null);
  const [importValidation, setImportValidation] = useState<TargetPresetValidation | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  
  // Load imported question sets
  useEffect(() => {
    setImportedSets(getImportedQuestions(subject || ''));
  }, [subject]);
  
  const wrongAnswers = getAllWrongQuestionsForSubject(subject || '');
  const wrongCount = getWrongAnswerCount(subject || '');

  // Get all available questions for the current subject (for validation)
  const allAvailableQuestions = useMemo((): Question[] => {
    switch (subject) {
      case 'precalc':
        return [
          ...polynomialQuestions, ...rationalQuestions, ...exponentialQuestions,
          ...logarithmicQuestions, ...trigonometricQuestions, ...polarQuestions,
          ...parametricQuestions, ...vectorsMatricesQuestions,
        ];
      case 'biology':
        return [
          ...biochemistryQuestions, ...cellstructureQuestions, ...cellenergeticsQuestions,
          ...cellgrowthQuestions, ...geneticsQuestions, ...molecularQuestions,
          ...evolutionQuestions, ...ecologyQuestions,
        ];
      case 'chemistry':
        return [
          ...metricQuestions, ...atomicQuestions, ...compoundsQuestions,
          ...gasesQuestions, ...solutionsQuestions, ...reactionsQuestions,
          ...stoichiometryQuestions, ...acidbasesQuestions,
        ];
      case 'world-history':
        return [
          ...religionsQuestions, ...islamQuestions, ...renaissanceQuestions,
          ...protestantQuestions, ...worldHistoryUnit5Questions, ...worldHistoryUnit6Questions,
          ...worldHistoryUnit7Questions, ...worldHistoryUnit8Questions,
          ...worldHistoryUnit9Questions, ...worldHistoryUnit10Questions,
          ...worldHistoryUnit11Questions,
        ];
      case 'memory':
        return [...generalQuestions, ...general2Questions, ...general3Questions];
      default:
        return [];
    }
  }, [subject]);

  const getUnits = () => {
    switch (subject) {
      case 'precalc':
        return [
          { id: 'polynomial', name: 'Unit 1A - Polynomial Functions' },
          { id: 'rational', name: 'Unit 1B - Rational Functions' },
          { id: 'exponential', name: 'Unit 2A - Exponential Functions' },
          { id: 'logarithmic', name: 'Unit 2B - Logarithmic Functions' },
          { id: 'trigonometric', name: 'Unit 3A - Trigonometric Functions' },
          { id: 'polar', name: 'Unit 3B - Polar Functions' },
          { id: 'parametric', name: 'Unit 4A - Parametric Functions' },
          { id: 'vectorsMatrices', name: 'Unit 4B - Vectors and Matrices' },
        ];
      case 'biology':
        return [
          { id: 'biochemistry', name: 'Unit 1 - Biochemistry' },
          { id: 'cellstructure', name: 'Unit 2 - Cell Structure & Function' },
          { id: 'cellenergetics', name: 'Unit 3 - Cell Energetics' },
          { id: 'cellgrowth', name: 'Unit 4 - Cell Growth & Division' },
          { id: 'genetics', name: 'Unit 5 - Genetics' },
          { id: 'molecular', name: 'Unit 6 - Molecular Biology' },
          { id: 'evolution', name: 'Unit 7 - Evolution' },
          { id: 'ecology', name: 'Unit 8 - Ecology' },
        ];
    
      case 'chemistry':
        return [
          { id: 'metric', name: 'Unit 1 - Metric Conversions' },
          { id: 'atomic', name: 'Unit 2 - Atomic Structure' },
          { id: 'compounds', name: 'Unit 3 - Compounds' },
          { id: 'gases', name: 'Unit 4 - Gases' },
          { id: 'solutions', name: 'Unit 5 - Solutions' },
          { id: 'reactions', name: 'Unit 6 - Reactions' },
          { id: 'stoichiometry', name: 'Unit 7 - Stoichiometry' },
          { id: 'acidbases', name: 'Unit 8 - Acids & Bases' },
        ];

      
      case 'world-history':
        return [
          { id: 'religions', name: 'Unit 1 - Religions' },
          { id: 'islam', name: 'Unit 2 - Islam' },
          { id: 'renaissance', name: 'Unit 3 - Renaissance' },
          { id: 'unit4', name: 'Unit 4 - Protestant' },
          { id: 'unit5', name: 'Unit 5' },
          { id: 'unit6', name: 'Unit 6' },
          { id: 'unit7', name: 'Unit 7' },
          { id: 'unit8', name: 'Unit 8' },
          { id: 'unit9', name: 'Unit 9' },
          { id: 'unit10', name: 'Unit 10' },
          { id: 'unit11', name: 'Unit 11' },
        ];

        
      case 'memory':
        return [
          { id: 'general', name: 'Polyatomic Ions - Chemistry' },
          { id: 'general2', name: 'Molecular Geometry - Chemistry' },
        ];

      case 'practice':
        return [
          { id: 'unit1', name: 'Temp' },
        ];

      default:
        return [];
    }
  };

  const units = getUnits();
  
  // Get study resources for this course challenge
  const studyResources = courseChallengeResources[subject || ''] || [];

  const handleStartCramMode = () => {
    const allUnitIds = units.map(u => u.id);
    // Include imported questions in cram mode
    const allImportedQuestions = importedSets.flatMap(s => s.questions);
    navigate(`/quiz/${subject}/challenge/cram`, { 
      state: { 
        selectedUnits: allUnitIds,
        importedQuestions: allImportedQuestions
      } 
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      try {
        const content = await file.text();
        const parsed = parseTopicFile(content);
        
        if (parsed && parsed.questions.length > 0) {
          const newSet: ImportedQuestionSet = {
            id: `imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name.replace('-questions.ts', '').replace(/-/g, ' '),
            questions: parsed.questions,
            importedAt: Date.now(),
          };
          
          saveImportedQuestions(subject || '', newSet);
          setImportedSets(prev => [...prev, newSet]);
          toast.success(`Imported ${parsed.questions.length} questions from ${file.name}`);
        } else {
          toast.error(`Could not parse questions from ${file.name}`);
        }
      } catch (error) {
        toast.error(`Failed to read ${file.name}`);
      }
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImported = (setId: string) => {
    removeImportedQuestions(subject || '', setId);
    setImportedSets(prev => prev.filter(s => s.id !== setId));
    setRemoveDialogOpen(false);
    setSetToRemove(null);
    toast.success('Removed imported questions');
  };

  const handleDownloadImported = (set: ImportedQuestionSet) => {
    const content = generateBuiltInTopicFile(set.questions, set.name, false);
    const filename = `${set.name.replace(/\s+/g, '-').toLowerCase()}-questions.ts`;
    
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  const openRemoveDialog = (setId: string, setName: string) => {
    setSetToRemove({ id: setId, name: setName });
    setRemoveDialogOpen(true);
  };

  // Handle downloading target preset
  const handleDownloadTargetPreset = () => {
    downloadTargetPreset(subject || '');
    toast.success('Target preset downloaded!');
  };

  // Handle uploading target preset
  const handleTargetPresetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedData = await parseTargetPresetFile(file);
      
      if (!importedData) {
        toast.error('Invalid target preset file format');
        return;
      }

      // Validate and import
      const validation = importTargetPreset(subject || '', importedData, allAvailableQuestions);
      
      if (validation.valid) {
        toast.success(`Imported ${validation.foundQuestionIds.length} questions to target practice!`);
      } else {
        // Show error dialog
        setImportValidation(validation);
        setImportDialogOpen(true);
      }
    } catch (error) {
      toast.error('Failed to read target preset file');
    }

    // Reset file input
    if (targetPresetInputRef.current) {
      targetPresetInputRef.current.value = '';
    }
  };

  const totalImportedQuestions = importedSets.reduce((sum, s) => sum + s.questions.length, 0);

  // Determine which category to go back to
  const getCategoryPath = () => {
    if (['precalc'].includes(subject || '')) return '/category/math';
    if (['biology', 'chemistry'].includes(subject || '')) return '/category/science';
    if (['world-history'].includes(subject || '')) return '/category/social';
    if (['memory', 'practice'].includes(subject || '')) return '/category/other';
    return '/';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <Button
          variant="ghost"
          onClick={() => navigate(getCategoryPath())}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Category
        </Button>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            {subject === 'precalc' && 'AP Precalculus'}
            {subject === 'biology' && 'Biology'}
            {subject === 'chemistry' && 'Chemistry'}
            {subject === 'world-history' && 'World History'}
            {subject === 'memory' && 'Memory'}
            {' '}Course Challenge
          </h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge with all questions from every unit
          </p>
        </div>

        {/* Study Resources Section */}
        {studyResources.length > 0 && (
          <Card className="mb-6 p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              Helpful Study Resources
            </h3>
            <div className="space-y-2">
              {studyResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {resource.title}
                </a>
              ))}
            </div>
          </Card>
        )}

        {/* Import Custom Questions Box */}
        <Card className="mb-6 p-6 border-2 border-dashed border-primary/50 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Import Custom Questions</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Upload .ts question files to add custom practice to this course challenge
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".ts"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Question Files
              </Button>

              {/* Show imported sets */}
              {importedSets.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Imported ({totalImportedQuestions} questions total):</p>
                  {importedSets.map(set => (
                    <div key={set.id} className="flex items-center justify-between bg-background rounded-lg p-2 border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium capitalize">{set.name}</span>
                        <span className="text-xs text-muted-foreground">({set.questions.length} questions)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadImported(set)}
                          className="h-8 w-8 p-0 text-primary hover:text-primary"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openRemoveDialog(set.id, set.name)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        <Button
          onClick={handleStartCramMode}
          className="w-full"
          size="lg"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Cram Mode (All Units{totalImportedQuestions > 0 ? ` + ${totalImportedQuestions} imported` : ''})
        </Button>

        {/* Custom Practice & Targeted Practice */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Card 
            className="p-6 cursor-pointer hover:border-primary transition-all"
            onClick={() => navigate(`/course-challenge/${subject}/preset-builder`)}
          >
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Build Custom Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Select specific questions from any unit
                  {totalImportedQuestions > 0 && ` (includes ${totalImportedQuestions} imported)`}
                </p>
              </div>
            </div>
          </Card>

          {/* Target Practice Section */}
          <Card className={`p-6 transition-all ${wrongCount > 0 ? 'border-destructive/50' : 'border-dashed'}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Target className={`h-6 w-6 ${wrongCount > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
                <div>
                  <h3 className="font-semibold">Targeted Practice</h3>
                  <p className="text-sm text-muted-foreground">
                    {wrongCount > 0 
                      ? `Review ${wrongCount} questions you got wrong`
                      : 'Complete some quizzes first to build your target list'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {wrongCount > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadTargetPreset();
                      }}
                      title="Download target preset"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-destructive hover:bg-destructive/90"
                      onClick={() => navigate(`/quiz/${subject}/targeted/cram`, { 
                        state: { wrongQuestions: wrongAnswers } 
                      })}
                    >
                      Practice
                    </Button>
                  </>
                )}
                <input
                  ref={targetPresetInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleTargetPresetUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => targetPresetInputRef.current?.click()}
                  title="Upload target preset"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-6 bg-muted">
          <h3 className="font-semibold mb-2">📝 Challenge Details</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Cram Mode:</strong> All questions from every unit for comprehensive review</li>
            <li>• Questions are randomized each time</li>
            <li>• Review shows wrong answers first, then correct answers</li>
            <li>• <strong>Import:</strong> Upload .ts files from downloaded topics to add custom questions</li>
          </ul>
        </Card>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
      
      {/* Remove Confirmation Dialog */}
      <RemoveConfirmDialog
        isOpen={removeDialogOpen}
        onClose={() => {
          setRemoveDialogOpen(false);
          setSetToRemove(null);
        }}
        onConfirm={() => setToRemove && handleRemoveImported(setToRemove.id)}
        fileName={setToRemove?.name || ''}
      />

      {/* Target Preset Import Error Dialog */}
      <TargetPresetImportDialog
        isOpen={importDialogOpen}
        onClose={() => {
          setImportDialogOpen(false);
          setImportValidation(null);
        }}
        validation={importValidation}
      />
    </div>
  );
};

export default CourseChallenge;
