import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { unitNotes } from '@/data/notes/unit-notes';
import MathText from '@/components/MathText';

const UnitNotes = () => {
  const { subject, unitId } = useParams();
  const navigate = useNavigate();
  const noteKey = `${subject}-${unitId}`;
  const notes = unitNotes[noteKey] || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(`/unit/${subject}/${unitId}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Unit
        </Button>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <BookOpen className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary font-display">
                {unitId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} - Notes
              </h1>
              <p className="text-muted-foreground">Study guides and rules for this unit</p>
            </div>
          </div>

          {notes.length > 0 ? (
            <div className="space-y-6">
              {notes.map((note, index) => (
                <Card key={index} className="p-6">
                  <h2 className="text-xl font-semibold mb-4">{note.title}</h2>
                  <div className="prose prose-sm max-w-none">
                    <MathText tag="div" className="whitespace-pre-wrap leading-relaxed" enableChemistry={subject?.includes('chemistry')}>
                      {note.content}
                    </MathText>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-dashed">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notes Available</h3>
              <p className="text-muted-foreground">
                Notes for this unit haven't been added yet.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitNotes;