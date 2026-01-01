import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ExternalLink, Eye, Brain, FileText, BookOpen, ClipboardList, Target } from 'lucide-react';
import { unitStudyResources } from '@/data/study-resources';
import { unitAssignments } from '@/data/assignments/unit-assignments';
import usePresets from '@/hooks/usePresets';

const UnitDetail = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();
  const resourceKey = `${subject}-${unitId}`;
  const studyResources = unitStudyResources[resourceKey] || [];
  const unitContent = unitAssignments[resourceKey];
  const { getPresetsForUnit } = usePresets();
  const presets = getPresetsForUnit(subject || '', unitId || '');

  const getCategoryPath = () => {
    if (!subject) return '/';
    if (subject === 'precalc') return '/category/math';
    if (subject === 'practice') {
      // Route back to English for English practice units
      if (unitId === 'unit1' || unitId === 'log') return '/category/english';
      return '/category/math';
    }
    if (subject.includes('biology') || subject.includes('chemistry')) return '/category/science';
    if (subject === 'world-history') return '/category/social';
    if (subject === 'memory') return '/category/other';
    if (subject === 'stock') return '/stock';
    return '/';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(getCategoryPath())} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subject
        </Button>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-3 text-primary font-display">
            {unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <p className="text-center text-muted-foreground mb-8">Choose your practice mode</p>

          {studyResources.length > 0 && (
            <Card className="mb-8 p-6 bg-muted/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5" /> Helpful Study Resources
              </h3>
              <div className="space-y-2">
                {studyResources.map((resource, index) => (
                  <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                    <ExternalLink className="h-4 w-4" /> {resource.title}
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* View All Questions */}
          <Card className="p-6 mb-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent group bg-accent/5"
            onClick={() => navigate(`/unit/${subject}/${unitId}/view-all`)}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/20 rounded-lg"><Eye className="h-8 w-8 text-accent" /></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">View All Questions</h3>
                <p className="text-muted-foreground text-sm">Browse all questions with their IDs</p>
              </div>
            </div>
          </Card>

          {/* Custom Preset Builder */}
          <Card className="p-6 mb-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-destructive group bg-destructive/5"
            onClick={() => navigate(`/unit/${subject}/${unitId}/preset-builder`)}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-destructive/20 rounded-lg"><Target className="h-8 w-8 text-destructive" /></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Build Custom Practice</h3>
                <p className="text-muted-foreground text-sm">
                  Select specific questions & save presets
                  {presets.length > 0 && <span className="ml-2 text-destructive font-medium">({presets.length} saved)</span>}
                </p>
              </div>
            </div>
          </Card>

          {/* Cram Study */}
          <h2 className="text-2xl font-display font-bold mb-4 mt-8">Practice Modes</h2>
          <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary mb-8"
            onClick={() => navigate(`/unit/${subject}/${unitId}/quiz/cram`)}>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg"><Brain className="h-8 w-8 text-primary" /></div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Cram Study</h3>
                <p className="text-muted-foreground mb-4">Practice ALL questions</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⏱️ Variable</span><span>📝 All questions</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Homework Assignments Section */}
          {unitContent && unitContent.assignments.length > 0 && (
            <>
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                <ClipboardList className="h-6 w-6" /> Homework Assignments
              </h2>
              <div className="grid gap-4 mb-8">
                {unitContent.assignments.map((assignment) => (
                  <Card key={assignment.id} className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-english bg-english/5"
                    onClick={() => navigate(`/unit/${subject}/${unitId}/assignment/${assignment.id}/quiz/cram`)}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-english/20 rounded-lg"><FileText className="h-6 w-6 text-english" /></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{assignment.name}</h3>
                        {assignment.notes && (
                          <p className="text-muted-foreground text-sm">{assignment.notes}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Notes Section */}
          {unitContent && unitContent.assignments.some(a => a.notes) && (
            <>
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6" /> Study Notes
              </h2>
              <Card className="p-6 mb-8 bg-science/5 border-science/20 cursor-pointer hover:shadow-lg"
                onClick={() => navigate(`/unit/${subject}/${unitId}/notes`)}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-science/20 rounded-lg"><BookOpen className="h-6 w-6 text-science" /></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">View All Notes & Rules</h3>
                    <p className="text-muted-foreground text-sm">Study guide for this unit</p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
