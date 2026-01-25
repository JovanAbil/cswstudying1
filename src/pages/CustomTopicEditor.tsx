import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Minus, Save, Trash2, Calculator, Image, GripVertical, Pencil } from 'lucide-react';
import { useCustomUnits, CustomTopic, TestType } from '@/hooks/useCustomUnits';
import { Question, MultipleChoiceQuestion, FreeResponseQuestion } from '@/types/quiz';
import MathBuilderSidebar from '@/components/MathBuilderSidebar';
import MathQuickInput from '@/components/MathQuickInput';
import { useToast } from '@/hooks/use-toast';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

interface EditingQuestion {
  type: 'mcq' | 'frq';
  question: string;
  answer: string;
  explanation: string;
  image: string;
  options: { label: string; text: string; image?: string }[];
  calculator: boolean;
}

const defaultMcqOptions = [
  { label: 'A', text: '' },
  { label: 'B', text: '' },
  { label: 'C', text: '' },
  { label: 'D', text: '' },
];

const CustomTopicEditor = () => {
  const navigate = useNavigate();
  const { unitId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  
  const { updateTopic, addTopic, getUnit } = useCustomUnits();
  const { toast } = useToast();

  const [topicName, setTopicName] = useState('');
  const [mathEnabled, setMathEnabled] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [testType, setTestType] = useState<TestType>('homework');
  const [testDate, setTestDate] = useState(new Date().toISOString().split('T')[0]);
  const [showMathWarning, setShowMathWarning] = useState(false);
  const [showMathSidebar, setShowMathSidebar] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [activeTextField, setActiveTextField] = useState<string | null>(null);
  const textFieldRefs = useRef<{ [key: string]: HTMLTextAreaElement | HTMLInputElement | null }>({});
  const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Question being edited
  const [editingQuestion, setEditingQuestion] = useState<EditingQuestion | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [lastAutosave, setLastAutosave] = useState<Date | null>(null);

  // Load existing topic data - read directly from localStorage to avoid stale closures
  useEffect(() => {
    if (!unitId) return;
    
    if (!isNew && topicId) {
      // Read directly from localStorage to get fresh data
      const stored = localStorage.getItem('custom-units-data');
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          const unit = parsedData.units?.find((u: any) => u.id === unitId);
          const topic = unit?.topics?.find((t: any) => t.id === topicId);
          if (topic) {
            setTopicName(topic.name);
            setMathEnabled(topic.mathEnabled);
            setQuestions(topic.questions || []);
            setTestType(topic.testType || 'homework');
            setTestDate(topic.testDate || new Date().toISOString().split('T')[0]);
          }
        } catch (e) {
          console.error('Failed to load topic data:', e);
        }
      }
    }
  }, [unitId, topicId, isNew]);

  // Autosave every 3 minutes
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      // Only autosave if we have data worth saving
      if (!unitId || !topicName.trim()) return;
      
      const topicData: Omit<CustomTopic, 'id'> & { id?: string } = {
        name: topicName,
        mathEnabled,
        questions,
        testType,
        testDate,
      };

      if (isNew) {
        // For new topics, create a draft in localStorage
        const draftKey = `custom-topic-draft-${unitId}`;
        localStorage.setItem(draftKey, JSON.stringify(topicData));
      } else if (topicId) {
        // For existing topics, save directly
        updateTopic(unitId, topicId, topicData);
      }
      
      setLastAutosave(new Date());
      toast({ 
        title: 'Autosaved', 
        description: 'Your progress has been saved automatically',
        duration: 2000
      });
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(autosaveInterval);
  }, [unitId, topicId, topicName, mathEnabled, questions, testType, testDate, isNew, updateTopic, toast]);

  // Load draft for new topics
  useEffect(() => {
    if (isNew && unitId) {
      const draftKey = `custom-topic-draft-${unitId}`;
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          setTopicName(parsedDraft.name || '');
          setMathEnabled(parsedDraft.mathEnabled ?? true);
          setQuestions(parsedDraft.questions || []);
          setTestType(parsedDraft.testType || 'homework');
          setTestDate(parsedDraft.testDate || new Date().toISOString().split('T')[0]);
        } catch (e) {
          console.error('Failed to load draft:', e);
        }
      }
    }
  }, [isNew, unitId]);

  const handleMathToggle = (enabled: boolean) => {
    if (!enabled && mathEnabled) {
      // Check if any questions contain math
      const hasMath = questions.some(q => 
        q.question.includes('$') || 
        q.correctAnswer.includes('$') || 
        (q.explanation && q.explanation.includes('$'))
      );
      
      if (hasMath) {
        setShowMathWarning(true);
        return;
      }
    }
    setMathEnabled(enabled);
  };

  const confirmDisableMath = () => {
    setMathEnabled(false);
    setShowMathWarning(false);
  };

  const startNewQuestion = (type: 'mcq' | 'frq') => {
    setEditingQuestion({
      type,
      question: '',
      answer: '',
      explanation: '',
      image: '',
      options: type === 'mcq' ? [...defaultMcqOptions] : [],
      calculator: false,
    });
    setEditingIndex(null);
  };

  const editQuestion = (index: number) => {
    const q = questions[index];
    if (q.type === 'multiple-choice') {
      setEditingQuestion({
        type: 'mcq',
        question: q.question,
        answer: q.correctAnswer,
        explanation: q.explanation || '',
        image: q.image || '',
        options: q.options.map(o => ({ label: o.label, text: o.text, image: o.image })),
        calculator: q.calculator || false,
      });
    } else {
      setEditingQuestion({
        type: 'frq',
        question: q.question,
        answer: q.correctAnswer,
        explanation: q.explanation || '',
        image: q.image || '',
        options: [],
        calculator: q.calculator || false,
      });
    }
    setEditingIndex(index);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Image too large',
        description: 'Please upload an image smaller than 2MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (editingQuestion) {
        setEditingQuestion({ ...editingQuestion, image: event.target?.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const addOption = () => {
    if (!editingQuestion || editingQuestion.type !== 'mcq') return;
    const labels = 'ABCDEFGHIJ';
    const nextLabel = labels[editingQuestion.options.length] || `${editingQuestion.options.length + 1}`;
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, { label: nextLabel, text: '' }],
    });
  };

  const removeOption = (index: number) => {
    if (!editingQuestion || editingQuestion.type !== 'mcq') return;
    if (editingQuestion.options.length <= 2) {
      toast({
        title: 'Minimum options',
        description: 'MCQ questions must have at least 2 options',
        variant: 'destructive',
      });
      return;
    }
    const newOptions = editingQuestion.options.filter((_, i) => i !== index);
    // Re-label options
    const labels = 'ABCDEFGHIJ';
    const relabeled = newOptions.map((o, i) => ({ ...o, label: labels[i] || `${i + 1}` }));
    
    // If the removed option was the answer, reset answer
    const removedLabel = editingQuestion.options[index].label;
    const newAnswer = editingQuestion.answer === removedLabel ? '' : editingQuestion.answer;
    
    setEditingQuestion({ ...editingQuestion, options: relabeled, answer: newAnswer });
  };

  const updateOption = (index: number, text: string) => {
    if (!editingQuestion || editingQuestion.type !== 'mcq') return;
    const newOptions = [...editingQuestion.options];
    newOptions[index] = { ...newOptions[index], text };
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const handleOptionImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingQuestion) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Image too large',
        description: 'Please upload an image smaller than 2MB',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newOptions = [...editingQuestion.options];
      newOptions[index] = { ...newOptions[index], image: event.target?.result as string };
      setEditingQuestion({ ...editingQuestion, options: newOptions });
    };
    reader.readAsDataURL(file);
  };

  const removeOptionImage = (index: number) => {
    if (!editingQuestion) return;
    const newOptions = [...editingQuestion.options];
    newOptions[index] = { ...newOptions[index], image: undefined };
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const saveQuestion = () => {
    if (!editingQuestion) return;

    // Validation
    if (!editingQuestion.question.trim()) {
      toast({ title: 'Question required', variant: 'destructive' });
      return;
    }
    if (!editingQuestion.answer.trim()) {
      toast({ title: 'Answer required', variant: 'destructive' });
      return;
    }
    if (editingQuestion.type === 'mcq') {
      const emptyOptions = editingQuestion.options.filter(o => !o.text.trim());
      if (emptyOptions.length > 0) {
        toast({ title: 'All options must have text', variant: 'destructive' });
        return;
      }
      if (!editingQuestion.options.find(o => o.label === editingQuestion.answer)) {
        toast({ title: 'Answer must match an option label (A, B, C, etc.)', variant: 'destructive' });
        return;
      }
    }

    const questionId = editingIndex !== null 
      ? questions[editingIndex].id 
      : `custom-q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    let newQuestion: Question;

    if (editingQuestion.type === 'mcq') {
      newQuestion = {
        id: questionId,
        type: 'multiple-choice',
        question: editingQuestion.question,
        options: editingQuestion.options.map(o => ({ label: o.label, value: o.label, text: o.text, image: o.image })),
        correctAnswer: editingQuestion.answer,
        explanation: editingQuestion.explanation || undefined,
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
      } as MultipleChoiceQuestion;
    } else {
      newQuestion = {
        id: questionId,
        type: 'free-response',
        question: editingQuestion.question,
        correctAnswer: editingQuestion.answer,
        explanation: editingQuestion.explanation || undefined,
        image: editingQuestion.image || undefined,
        calculator: editingQuestion.calculator || undefined,
      } as FreeResponseQuestion;
    }

    if (editingIndex !== null) {
      const newQuestions = [...questions];
      newQuestions[editingIndex] = newQuestion;
      setQuestions(newQuestions);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    setEditingQuestion(null);
    setEditingIndex(null);
    toast({ title: 'Question saved!' });
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingQuestion(null);
      setEditingIndex(null);
    }
  };

  const handleMathInsert = (latex: string) => {
    if (!activeTextField || !textFieldRefs.current[activeTextField]) return;
    
    const field = textFieldRefs.current[activeTextField];
    if (!field) return;

    const start = field.selectionStart || 0;
    const end = field.selectionEnd || 0;
    const currentValue = field.value;
    const newValue = currentValue.substring(0, start) + latex + currentValue.substring(end);

    // Update the correct field
    if (editingQuestion) {
      if (activeTextField === 'question') {
        setEditingQuestion({ ...editingQuestion, question: newValue });
      } else if (activeTextField === 'answer') {
        setEditingQuestion({ ...editingQuestion, answer: newValue });
      } else if (activeTextField === 'explanation') {
        setEditingQuestion({ ...editingQuestion, explanation: newValue });
      } else if (activeTextField.startsWith('option-')) {
        const optionIndex = parseInt(activeTextField.split('-')[1]);
        updateOption(optionIndex, newValue);
      }
    }

    // Move cursor after inserted text
    setTimeout(() => {
      if (field) {
        const newPos = start + latex.length;
        field.setSelectionRange(newPos, newPos);
        field.focus();
      }
    }, 0);
  };

  // Check if form has any data that should be saved
  const hasUnsavedData = () => {
    return topicName.trim() !== '' || questions.length > 0;
  };

  // Validate required fields
  const validateFields = (): boolean => {
    if (!topicName.trim()) {
      toast({ title: 'Topic name is required', variant: 'destructive' });
      return false;
    }
    if (!testType) {
      toast({ title: 'Please select if this is a test or homework', variant: 'destructive' });
      return false;
    }
    if (!testDate) {
      toast({ title: 'Test date is required', variant: 'destructive' });
      return false;
    }
    return true;
  };

  // Handle back button click
  const handleBackClick = () => {
    if (hasUnsavedData()) {
      setShowBackWarning(true);
    } else {
      navigate('/category/other');
    }
  };

  // Save and go back
  const handleSaveAndBack = () => {
    if (validateFields()) {
      saveTopic();
    }
    setShowBackWarning(false);
  };

  const saveTopic = () => {
    if (!validateFields()) return;
    if (!unitId) return;

    const topicData: Omit<CustomTopic, 'id'> & { id?: string } = {
      name: topicName,
      mathEnabled,
      questions,
      testType,
      testDate,
    };

    if (isNew) {
      const newTopic = addTopic(unitId, topicData);
      // Clear draft after successful save
      const draftKey = `custom-topic-draft-${unitId}`;
      localStorage.removeItem(draftKey);
      toast({ title: 'Topic created!' });
      navigate(`/category/other`, { replace: true });
    } else if (topicId) {
      updateTopic(unitId, topicId, topicData);
      toast({ title: 'Topic saved!' });
      navigate(`/category/other`, { replace: true });
    }
  };

  const unit = unitId ? getUnit(unitId) : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button variant="ghost" onClick={handleBackClick} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Other
        </Button>

        <h1 className="text-3xl font-display font-bold mb-2">
          {isNew ? 'Create New Topic' : 'Edit Topic'}
        </h1>
        {unit && <p className="text-muted-foreground mb-6">in {unit.name}</p>}

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic-name">Topic Name *</Label>
              <Input
                id="topic-name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="e.g., Quadratic Equations"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="test-type">Type *</Label>
                <Select value={testType} onValueChange={(value) => setTestType(value as TestType)}>
                  <SelectTrigger id="test-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="homework">Homework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="test-date">Date Received *</Label>
                <Input
                  id="test-date"
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Math Functions</Label>
                <p className="text-sm text-muted-foreground">
                  Enable LaTeX math rendering for this topic
                </p>
              </div>
              <Switch checked={mathEnabled} onCheckedChange={handleMathToggle} />
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => startNewQuestion('frq')}>
              <Plus className="mr-2 h-4 w-4" />
              Add FRQ
            </Button>
            <Button variant="outline" onClick={() => startNewQuestion('mcq')}>
              <Plus className="mr-2 h-4 w-4" />
              Add MCQ
            </Button>
          </div>
        </div>

        {/* Existing questions list */}
        {questions.length > 0 && !editingQuestion && (
          <div className="space-y-2 mb-6">
            {questions.map((q, index) => (
              <Card key={q.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs font-medium px-2 py-1 rounded bg-muted flex-shrink-0">
                    {q.type === 'multiple-choice' ? 'MCQ' : 'FRQ'}
                  </span>
                  {q.calculator && (
                    <span title="Calculator question">
                      <Calculator className="h-4 w-4 text-primary flex-shrink-0" />
                    </span>
                  )}
                  <span className="truncate text-sm">{q.question}</span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => editQuestion(index)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteQuestion(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Question editor */}
        {editingQuestion && (
          <Card className="p-6 mb-6 border-primary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {editingIndex !== null ? 'Edit' : 'New'} {editingQuestion.type === 'mcq' ? 'Multiple Choice' : 'Free Response'} Question
              </h3>
              {mathEnabled && (
                <Button variant="outline" size="sm" onClick={() => setShowMathSidebar(true)}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Math Builder
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {/* Image upload */}
              <div className="space-y-2">
                <Label>Image (optional)</Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <label className="cursor-pointer">
                      <Image className="mr-2 h-4 w-4" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </Button>
                  {editingQuestion.image && (
                    <div className="flex items-center gap-2">
                      <img src={editingQuestion.image} alt="Preview" className="h-16 w-16 object-cover rounded" />
                      <Button variant="ghost" size="icon" onClick={() => setEditingQuestion({ ...editingQuestion, image: '' })}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Question text */}
              <div className="space-y-2">
                <Label htmlFor="q-question">Question *</Label>
                <Textarea
                  id="q-question"
                  ref={(el) => { textFieldRefs.current['question'] = el; }}
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  onFocus={() => setActiveTextField('question')}
                  placeholder="Enter your question..."
                  rows={3}
                />
              </div>

              {/* MCQ Options */}
              {editingQuestion.type === 'mcq' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Options *</Label>
                    <Button variant="outline" size="sm" onClick={addOption}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {editingQuestion.options.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-center font-medium">{option.label}</span>
                        <Input
                          ref={(el) => { textFieldRefs.current[`option-${index}`] = el; }}
                          value={option.text}
                          onChange={(e) => updateOption(index, e.target.value)}
                          onFocus={() => setActiveTextField(`option-${index}`)}
                          placeholder={`Option ${option.label}...`}
                          className="flex-1"
                        />
                        <Button variant="ghost" size="icon" asChild className="relative">
                          <label className="cursor-pointer">
                            <Image className="h-4 w-4" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleOptionImageUpload(index, e)}
                            />
                          </label>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => removeOption(index)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                      {option.image && (
                        <div className="flex items-center gap-2 ml-10">
                          <img src={option.image} alt={`Option ${option.label}`} className="h-12 w-12 object-cover rounded border" />
                          <Button variant="ghost" size="sm" onClick={() => removeOptionImage(index)}>
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Answer */}
              <div className="space-y-2">
                <Label htmlFor="q-answer">
                  {editingQuestion.type === 'mcq' ? 'Correct Answer (A, B, C, etc.) *' : 'Correct Answer *'}
                </Label>
                {editingQuestion.type === 'mcq' ? (
                  <Input
                    id="q-answer"
                    value={editingQuestion.answer}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value.toUpperCase() })}
                    placeholder="A"
                    className="w-20"
                  />
                ) : (
                  <div>
                    <Textarea
                      id="q-answer"
                      ref={(el) => { 
                        textFieldRefs.current['answer'] = el; 
                        (answerTextareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
                      }}
                      value={editingQuestion.answer}
                      onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                      onFocus={() => setActiveTextField('answer')}
                      placeholder="Enter the correct answer..."
                      rows={2}
                    />
                    {mathEnabled && (
                      <MathQuickInput
                        textareaRef={answerTextareaRef as React.RefObject<HTMLTextAreaElement>}
                        value={editingQuestion.answer}
                        onChange={(newValue) => setEditingQuestion({ ...editingQuestion, answer: newValue })}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div className="space-y-2">
                <Label htmlFor="q-explanation">Explanation (optional)</Label>
                <Textarea
                  id="q-explanation"
                  ref={(el) => { textFieldRefs.current['explanation'] = el; }}
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                  onFocus={() => setActiveTextField('explanation')}
                  placeholder="Explain the answer..."
                  rows={2}
                />
              </div>

              {/* Calculator Toggle - only show if math is enabled */}
              {mathEnabled && (
                <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Calculator className="h-5 w-5 text-primary" />
                    <div>
                      <Label htmlFor="calc-toggle" className="font-medium">Calculator Question</Label>
                      <p className="text-sm text-muted-foreground">
                        Mark this question as requiring a calculator
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="calc-toggle"
                    checked={editingQuestion.calculator}
                    onCheckedChange={(checked) => setEditingQuestion({ ...editingQuestion, calculator: checked })}
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={saveQuestion}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Question
                </Button>
                <Button variant="outline" onClick={() => { setEditingQuestion(null); setEditingIndex(null); }}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Separator className="my-6" />

        <Button onClick={saveTopic} size="lg" className="w-full">
          <Save className="mr-2 h-5 w-5" />
          Save Topic
        </Button>
      </div>

      {/* Math Builder Sidebar */}
      <MathBuilderSidebar
        isOpen={showMathSidebar}
        onClose={() => setShowMathSidebar(false)}
        onInsert={handleMathInsert}
      />

      {/* Math Warning Dialog */}
      <AlertDialog open={showMathWarning} onOpenChange={setShowMathWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Math Functions?</AlertDialogTitle>
            <AlertDialogDescription>
              Warning: If you disable math functions, you cannot use any LaTeX math formatting (like $x^2$ or fractions) in this topic. Existing math formatting may not render correctly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisableMath}>
              Disable Math
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Back Warning Dialog */}
      <AlertDialog open={showBackWarning} onOpenChange={setShowBackWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save before leaving?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved content. Please fill in all required fields (Topic Name, Type, and Date) to save your topic, or cancel to discard changes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate('/category/other')}>Discard & Leave</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAndBack}>
              Save Topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container mx-auto px-4 pb-8">
        <AdPlaceholder position="bottom" />
      </div>
      <Footer />
    </div>
  );
};

export default CustomTopicEditor;
