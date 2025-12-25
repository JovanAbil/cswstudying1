import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Brain, ExternalLink, Eye, FileText, ClipboardList } from 'lucide-react';
import { unitStudyResources } from '@/data/study-resources';
import { unitAssignments } from '@/data/assignments/unit-assignments';

const UnitDetail = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();
  const resourceKey = `${subject}-${unitId}`;
  const studyResources = unitStudyResources[resourceKey] || [];
  const assignments = unitAssignments[resourceKey] || [];

  const getCategoryPath = () => {
    if (!subject) return '/';
    if (subject === 'precalc' || subject === 'practice') return '/category/math';
    if (subject.includes('biology') || subject.includes('chemistry')) return '/category/science';
    if (subject === 'world-history') return '/category/social';
    if (subject === 'memory') return '/category/other';
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

          {/* Study Resources */}
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

          {/* Homework Assignments Section */}
          {assignments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-accent" />
                Homework Assignments
              </h2>
              <div className="grid gap-4">
                {assignments.map((assignment) => (
                  <Card
                    key={assignment.id}
                    className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-accent group"
                    onClick={() => navigate(`/unit/${subject}/${unitId}/assignment/${assignment.id}/quiz/cram`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{assignment.name}</h3>
                        <p className="text-muted-foreground text-sm">{assignment.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          📝 {assignment.questionCount} questions
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Notes Section */}
          <Card 
            className="p-6 mb-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-secondary group bg-secondary/5"
            onClick={() => navigate(`/unit/${subject}/${unitId}/notes`)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Study Notes & Rules</h3>
                <p className="text-muted-foreground text-sm">View all notes and study guides for this unit</p>
              </div>
            </div>
          </Card>

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

          <h2 className="text-2xl font-display font-bold mb-4 mt-8">Practice Modes</h2>
          <div className="grid gap-6">
            <Card className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/unit/${subject}/${unitId}/quiz/cram`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg"><Brain className="h-8 w-8 text-primary" /></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Cram Study</h3>
                  <p className="text-muted-foreground mb-4">Practice ALL questions in this unit</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ Variable</span><span>📝 All questions</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;