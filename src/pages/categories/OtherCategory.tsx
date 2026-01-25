import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { ArrowLeft, Sparkles, Trophy, Brain, Target, Plus, Trash2, Pencil, Download, Upload, AlertTriangle, FolderPlus, ExternalLink, Send } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import useCustomUnits, { CustomTopic, SubjectType, TestType } from '@/hooks/useCustomUnits';
import { useToast } from '@/hooks/use-toast';
import { downloadUnit, downloadTopic, parseTopicFile, parseUnitMetadata } from '@/utils/customUnitsExport';
import JSZip from 'jszip';
import { Footer } from '@/components/Footer';
import { StorageUsageBar } from '@/components/StorageUsageBar';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const OtherCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();
  const { data, addUnit, updateUnit, deleteUnit, deleteTopic, addTopic, isLoaded } = useCustomUnits();
  const { toast } = useToast();

  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showEditUnit, setShowEditUnit] = useState<string | null>(null);
  const [showDeleteUnit, setShowDeleteUnit] = useState<string | null>(null);
  const [showDeleteTopic, setShowDeleteTopic] = useState<{ unitId: string; topicId: string } | null>(null);
  const [unitName, setUnitName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [unitSubject, setUnitSubject] = useState<SubjectType | ''>('');
  
  const unitUploadRef = useRef<HTMLInputElement>(null);
  const topicUploadRef = useRef<HTMLInputElement>(null);
  const [uploadTargetUnitId, setUploadTargetUnitId] = useState<string | null>(null);

  const builtInSubjects = [
    {
      id: 'memory',
      name: 'Memory Training',
      units: [
        { id: 'general', name: 'Polyatomic Ions - Chemistry' },
        { id: 'general2', name: 'Molecular Geometry - Chemistry' },
        { id: 'general3', name: 'Rates of Change - AP Precalc' },
      ],
    },
  ];

  const handleAddUnit = () => {
    if (!unitName.trim()) {
      toast({ title: 'Please enter a unit name', variant: 'destructive' });
      return;
    }
    if (!teacherName.trim()) {
      toast({ title: 'Please enter the teacher name', variant: 'destructive' });
      return;
    }
    if (!unitSubject) {
      toast({ title: 'Please select a subject', variant: 'destructive' });
      return;
    }
    addUnit(unitName.trim(), teacherName.trim(), unitSubject);
    setUnitName('');
    setTeacherName('');
    setUnitSubject('');
    setShowAddUnit(false);
    toast({ title: 'Unit created!' });
  };

  const handleEditUnit = () => {
    if (!unitName.trim() || !showEditUnit) {
      toast({ title: 'Please enter a unit name', variant: 'destructive' });
      return;
    }
    if (!teacherName.trim()) {
      toast({ title: 'Please enter the teacher name', variant: 'destructive' });
      return;
    }
    if (!unitSubject) {
      toast({ title: 'Please select a subject', variant: 'destructive' });
      return;
    }
    updateUnit(showEditUnit, { name: unitName.trim(), teacherName: teacherName.trim(), subject: unitSubject });
    setUnitName('');
    setTeacherName('');
    setUnitSubject('');
    setShowEditUnit(null);
    toast({ title: 'Unit updated!' });
  };

  const handleDeleteUnit = () => {
    if (!showDeleteUnit) return;
    deleteUnit(showDeleteUnit);
    setShowDeleteUnit(null);
    toast({ title: 'Unit deleted' });
  };

  const handleDeleteTopic = () => {
    if (!showDeleteTopic) return;
    deleteTopic(showDeleteTopic.unitId, showDeleteTopic.topicId);
    setShowDeleteTopic(null);
    toast({ title: 'Topic deleted' });
  };

  const openEditUnit = (unitId: string, currentName: string) => {
    const unit = data.units.find(u => u.id === unitId);
    setUnitName(currentName);
    setTeacherName(unit?.teacherName || '');
    setUnitSubject(unit?.subject || '');
    setShowEditUnit(unitId);
  };

  // Handle unit download
  const handleDownloadUnit = async (unit: typeof data.units[0]) => {
    try {
      await downloadUnit(unit);
      toast({ title: `Downloaded ${unit.name}.zip` });
    } catch (error) {
      toast({ title: 'Failed to download unit', variant: 'destructive' });
    }
  };

  // Handle topic download
  const handleDownloadTopic = (topic: CustomTopic, unitName: string) => {
    try {
      downloadTopic(topic, unitName);
      toast({ title: `Downloaded ${topic.name}` });
    } catch (error) {
      toast({ title: 'Failed to download topic', variant: 'destructive' });
    }
  };

  // Handle unit upload (zip file)
  const handleUnitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const zip = await JSZip.loadAsync(file);
      
      // Find the src/data/{folder}/ path by looking for index.ts
      let indexFile: JSZip.JSZipObject | null = null;
      let srcDataFolder = '';
      let publicImagesFolder = '';
      
      // Search for index.ts in various possible locations
      const allFiles = Object.keys(zip.files);
      for (const filePath of allFiles) {
        if (filePath.endsWith('index.ts') && !zip.files[filePath].dir) {
          indexFile = zip.files[filePath];
          // Extract the folder path (e.g., "src/data/unit-name/" from "src/data/unit-name/index.ts")
          srcDataFolder = filePath.substring(0, filePath.lastIndexOf('/') + 1);
          // Derive the public images folder from the unit name
          const folderName = srcDataFolder.split('/').filter(Boolean).pop() || '';
          publicImagesFolder = `public/images/${folderName}/`;
          break;
        }
      }
      
      if (!indexFile) {
        toast({ title: 'Invalid unit file: missing index.ts in src/data/', variant: 'destructive' });
        return;
      }
      
      const indexContent = await indexFile.async('string');
      const metadata = parseUnitMetadata(indexContent);
      
      if (!metadata) {
        toast({ title: 'Failed to parse unit metadata', variant: 'destructive' });
        return;
      }
      
      // Build a map of image paths to base64 data from the zip
      const imageMap: Record<string, string> = {};
      for (const filePath of allFiles) {
        // Check if this is an image in public/images/
        if (filePath.startsWith('public/images/') && !zip.files[filePath].dir) {
          const ext = filePath.split('.').pop()?.toLowerCase();
          if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext || '')) {
            try {
              const imageData = await zip.files[filePath].async('base64');
              const mimeType = ext === 'svg' ? 'image/svg+xml' : `image/${ext === 'jpg' ? 'jpeg' : ext}`;
              // Store with the path as it would appear in question.image (e.g., "/images/unit-name/topic-q1.png")
              const publicPath = filePath.replace('public', '');
              imageMap[publicPath] = `data:${mimeType};base64,${imageData}`;
            } catch (err) {
              console.warn('Failed to load image:', filePath);
            }
          }
        }
      }
      
      // Create the unit - use metadata for teacher/subject if available, else defaults
      const newUnit = addUnit(
        metadata.name, 
        metadata.teacherName || 'Imported', 
        (metadata.subject as SubjectType) || 'Math'
      );
      
      // Import each topic
      for (const topicMeta of metadata.topics) {
        const topicFileName = topicMeta.file.replace('./', '');
        // Look for the topic file in the src/data folder
        const topicFile = zip.file(srcDataFolder + topicFileName) || zip.file(topicFileName);
        
        if (topicFile) {
          const topicContent = await topicFile.async('string');
          const parsed = parseTopicFile(topicContent);
          
          if (parsed) {
            // Replace image paths with base64 data from the zip
            const questionsWithImages = parsed.questions.map(q => {
              if (q.image && imageMap[q.image]) {
                return { ...q, image: imageMap[q.image] };
              }
              return q;
            });
            
            addTopic(newUnit.id, {
              name: topicMeta.name,
              mathEnabled: topicMeta.mathEnabled,
              questions: questionsWithImages,
              testType: (topicMeta.testType as TestType) || 'homework',
              testDate: topicMeta.testDate || new Date().toISOString().split('T')[0],
            });
          }
        }
      }
      
      toast({ title: `Imported unit: ${metadata.name} with ${Object.keys(imageMap).length} images` });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Failed to import unit', variant: 'destructive' });
    }
    
    // Reset input
    if (unitUploadRef.current) {
      unitUploadRef.current.value = '';
    }
  };

  // Handle topic upload (.ts file)
  const handleTopicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetUnitId) return;
    
    try {
      const content = await file.text();
      const parsed = parseTopicFile(content);
      
      if (!parsed) {
        toast({ title: 'Failed to parse topic file', variant: 'destructive' });
        return;
      }
      
      // Extract topic name from filename or comment
      const nameMatch = content.match(/Topic:\s*(.+)/);
      const topicName = nameMatch ? nameMatch[1].trim() : file.name.replace(/-questions\.ts$/, '').replace(/-/g, ' ');
      
      addTopic(uploadTargetUnitId, {
        name: topicName,
        mathEnabled: parsed.mathEnabled,
        questions: parsed.questions,
        testType: 'homework', // Default for imported topics
        testDate: new Date().toISOString().split('T')[0],
      });
      
      toast({ title: `Imported topic: ${topicName}` });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Failed to import topic', variant: 'destructive' });
    }
    
    // Reset
    setUploadTargetUnitId(null);
    if (topicUploadRef.current) {
      topicUploadRef.current.value = '';
    }
  };

  const triggerTopicUpload = (unitId: string) => {
    setUploadTargetUnitId(unitId);
    topicUploadRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-other/10">
            <Sparkles className="w-7 h-7 text-other" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-other">Other</h1>
            <p className="text-muted-foreground">Memory training and miscellaneous</p>
          </div>
        </div>

        {/* Built-in subjects */}
        {builtInSubjects.map((subject) => {
          const wrongCount = getWrongAnswerCount(subject.id);
          
          return (
            <div key={subject.id} className="mb-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-other" />
                  <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {wrongCount > 0 && (
                    <Button
                      onClick={() => navigate(`/quiz/${subject.id}/wrong/cram`, { 
                        state: { wrongQuestions: getAllWrongQuestionsForSubject(subject.id) } 
                      })}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Targeted Practice ({wrongCount})
                    </Button>
                  )}
                  <Link to={`/course-challenge/${subject.id}`}>
                    <Button
                      variant="outline"
                      className="border-other text-other hover:bg-other hover:text-other-foreground"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Course Challenge
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subject.units.map((unit) => (
                  <Link key={unit.id} to={`/unit/${subject.id}/${unit.id}`}>
                    <Card
                      className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group"
                    >
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {unit.name}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={unitUploadRef}
          accept=".zip"
          className="hidden"
          onChange={handleUnitUpload}
        />
        <input
          type="file"
          ref={topicUploadRef}
          accept=".ts"
          className="hidden"
          onChange={handleTopicUpload}
        />

        {/* Custom Units Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Plus className="h-6 w-6 text-other" />
                <h2 className="text-2xl font-display font-bold">Custom Units</h2>
              </div>
              <StorageUsageBar />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => unitUploadRef.current?.click()}
                variant="outline"
                className="border-other text-other hover:bg-other hover:text-other-foreground"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Unit
              </Button>
              <Button
                onClick={() => { setUnitName(''); setShowAddUnit(true); }}
                variant="outline"
                className="border-other text-other hover:bg-other hover:text-other-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Unit
              </Button>
            </div>
          </div>

          {!isLoaded ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : data.units.length === 0 ? (
            <Card className="p-8 text-center border-dashed">
              <p className="text-muted-foreground mb-4">No custom units yet. Create one to get started!</p>
              <Button onClick={() => { setUnitName(''); setShowAddUnit(true); }}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Unit
              </Button>
            </Card>
          ) : (
            <div className="space-y-8">
              {data.units.map((unit) => (
                <div key={unit.id}>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className="text-lg font-semibold">{unit.name}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-other text-other hover:bg-other hover:text-other-foreground"
                      onClick={() => navigate(`/custom-unit/${unit.id}`)}
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Course Challenge
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditUnit(unit.id, unit.name)} title="Edit unit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadUnit(unit)} title="Download unit">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => triggerTopicUpload(unit.id)} title="Import topic">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setShowDeleteUnit(unit.id)} title="Delete unit">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {unit.topics.map((topic) => (
                      <Card
                        key={topic.id}
                        className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group relative"
                        onClick={() => navigate(`/unit/custom-${unit.id}/${topic.id}`)}
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/custom-topic/${unit.id}/${topic.id}`);
                            }}
                            title="Edit topic"
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadTopic(topic, unit.name);
                            }}
                            title="Download topic"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteTopic({ unitId: unit.id, topicId: topic.id });
                            }}
                            title="Delete topic"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {topic.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topic.questions.length} question{topic.questions.length !== 1 ? 's' : ''}
                        </p>
                      </Card>
                    ))}
                    {/* Add Topic Card */}
                    <Card
                      className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-dashed hover:border-other flex items-center justify-center"
                      onClick={() => navigate(`/custom-topic/${unit.id}/new?new=true`)}
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Plus className="h-6 w-6" />
                        <p className="text-sm font-medium">Add Topic</p>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Custom Units Info & Warnings */}
          <Card className="p-6 mt-8 border-2 border-other/20 bg-other/5">
            <div className="space-y-6">
              {/* Submit Content */}
              <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/30">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Submit Content to the Website
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Want your custom content featured on Practice Hub? Use the form below to submit your unit along with your email. 
                  <span className="font-medium text-foreground"> If you email @abilash.jovan@charterschool.org after sending a submission, I'll review it as soon as possible.</span> 
                  Otherwise, submissions will be uploaded on my own time when I check (1-7 days).
                </p>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScH4-fL-fvpJMoKAyoPvkCLiDekx7-vp_pbdkm4-Sisc1nqxw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Submission Form
                </a>
              </div>

              {/* Creating Custom Content */}
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FolderPlus className="h-5 w-5 text-other" />
                  Creating Custom Content
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Click <span className="font-medium text-foreground">"+ Add Unit"</span> above to create a new unit</li>
                  <li>Click <span className="font-medium text-foreground">"+ Add topic"</span> within your unit</li>
                  <li>Use the Topic Editor to add questions (MCQ or FRQ)</li>
                  <li>Enable <span className="font-medium text-foreground">"Math Mode"</span> for LaTeX rendering</li>
                  <li>Upload images for questions using the image upload button</li>
                </ol>
              </div>

              {/* Import/Export */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-lg border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Download className="h-5 w-5 text-science" />
                    Exporting
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <span className="font-medium text-foreground">Download Unit</span> - Exports as .zip with all topics</li>
                    <li>• <span className="font-medium text-foreground">Download Topic</span> - Exports as a single .ts file</li>
                    <li>• Share files with classmates or back up your content</li>
                  </ul>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-math" />
                    Importing
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <span className="font-medium text-foreground">Import Unit</span> - Upload .zip for full unit</li>
                    <li>• <span className="font-medium text-foreground">Import Topic</span> - Upload .ts to add to unit</li>
                  </ul>
                </div>
              </div>

              {/* Browser Cache Warning */}
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Browser Storage Limitations
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Custom units are stored in your browser's <span className="font-medium text-foreground">localStorage</span></li>
                  <li>• <span className="font-medium text-destructive">Clearing browser data will delete all custom content</span></li>
                  <li>• Storage limit is approximately <span className="font-medium text-foreground">5-10 MB</span></li>
                  <li>• Images are stored as Base64, increasing storage usage</li>
                  <li>• <span className="font-medium text-foreground">Regularly export your units as backups!</span></li>
                  <li>• Custom content is <span className="font-medium text-foreground">device-specific</span></li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Unit Dialog */}
      <Dialog open={showAddUnit} onOpenChange={setShowAddUnit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Unit</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unit-name">Unit Name *</Label>
              <Input
                id="unit-name"
                placeholder="Unit name (e.g., Algebra Practice)"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher-name">Teacher Name *</Label>
              <Input
                id="teacher-name"
                placeholder="Teacher name (e.g., Mr. Smith)"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit-subject">Subject *</Label>
              <Select value={unitSubject} onValueChange={(value) => setUnitSubject(value as SubjectType)}>
                <SelectTrigger id="unit-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAddUnit(false); setUnitName(''); setTeacherName(''); setUnitSubject(''); }}>Cancel</Button>
            <Button onClick={handleAddUnit}>Create Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Unit Dialog */}
      <Dialog open={!!showEditUnit} onOpenChange={() => { setShowEditUnit(null); setUnitName(''); setTeacherName(''); setUnitSubject(''); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-unit-name">Unit Name *</Label>
              <Input
                id="edit-unit-name"
                placeholder="Unit name"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-teacher-name">Teacher Name *</Label>
              <Input
                id="edit-teacher-name"
                placeholder="Teacher name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-unit-subject">Subject *</Label>
              <Select value={unitSubject} onValueChange={(value) => setUnitSubject(value as SubjectType)}>
                <SelectTrigger id="edit-unit-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowEditUnit(null); setUnitName(''); setTeacherName(''); setUnitSubject(''); }}>Cancel</Button>
            <Button onClick={handleEditUnit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Unit Dialog */}
      <AlertDialog open={!!showDeleteUnit} onOpenChange={() => setShowDeleteUnit(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the unit and all its topics and questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUnit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Topic Dialog */}
      <AlertDialog open={!!showDeleteTopic} onOpenChange={() => setShowDeleteTopic(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Topic?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the topic and all its questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTopic} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bottom Ad Placeholder */}
      <div className="container mx-auto px-4 pb-8">
        <AdPlaceholder position="bottom" />
      </div>
      <Footer />
    </div>
  );
};

export default OtherCategory;
