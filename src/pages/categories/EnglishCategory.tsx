import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Trophy, Lock, Brain } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';

const EnglishCategory = () => {
  const subjects = [
    {
      id: 'english',
      name: 'English Language Arts',
      units: [],
      comingSoon: true,
    },
  ];

  const practiceUnits = [
    { id: 'unit1', name: 'English Midterm Practice; Phase 4', subject: 'practice' },
  ];

  const memoryUnits: { id: string; name: string; subject: string }[] = [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <a href="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </a>

        <div className="flex items-center gap-4 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-english/10">
            <BookOpen className="w-7 h-7 text-english" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-english">English</h1>
            <p className="text-muted-foreground">Literature, Writing, and Language Arts</p>
          </div>
        </div>

        {subjects.map((subject) => (
          <div key={subject.id} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
                {subject.comingSoon && (
                  <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">Coming Soon</span>
                )}
              </div>
            </div>
            {subject.comingSoon && (
              <Card className="p-12 text-center border-dashed">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Units Coming Soon</h3>
                <p className="text-muted-foreground">English units are being developed.</p>
              </Card>
            )}
          </div>
        ))}

        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Practice Assignments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {practiceUnits.map((unit) => (
              <a key={unit.id} href={`/unit/${unit.subject}/${unit.id}`}>
                <Card 
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-english group bg-english/5 h-full"
                >
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{unit.name}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-other" />
            <h2 className="text-2xl font-display font-bold">Memory Training</h2>
          </div>
          <Card className="p-6 border-dashed text-center bg-muted/30">
            <p className="text-muted-foreground">No memory training units available yet</p>
          </Card>
        </div>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnglishCategory;
