import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Trophy, Lock, Brain, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';

const EnglishCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();

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

  const practiceWrongCount = getWrongAnswerCount('practice');
  const practiceWrongQuestions = getAllWrongQuestionsForSubject('practice');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

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
                  <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    Coming Soon
                  </span>
                )}
              </div>
              {!subject.comingSoon && (
                <Button
                  onClick={() => navigate(`/course-challenge/${subject.id}`)}
                  variant="outline"
                  className="border-english text-english hover:bg-english hover:text-english-foreground"
                >
                  <Trophy className="mr-2 h-4 w-4" />
                  Course Challenge
                </Button>
              )}
            </div>
            
            {subject.comingSoon ? (
              <Card className="p-12 text-center border-dashed">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Units Coming Soon</h3>
                <p className="text-muted-foreground">
                  English units are being developed. Check back soon!
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subject.units.map((unit: any) => (
                  <Card
                    key={unit.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-english group"
                    onClick={() => navigate(`/unit/${subject.id}/${unit.id}`)}
                  >
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {unit.name}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Practice Units */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-2xl font-display font-bold">Practice Assignments</h2>
            {practiceWrongCount > 0 ? (
              <Button
                onClick={() => navigate(`/unit/practice/targeted-practice/quiz/cram`, { 
                  state: { wrongQuestions: practiceWrongQuestions } 
                })}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Target className="mr-2 h-4 w-4" />
                Targeted Practice ({practiceWrongCount})
              </Button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {practiceUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-english group bg-english/5"
                onClick={() => navigate(`/unit/${unit.subject}/${unit.id}`)}
              >
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {unit.name}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Memory Units - Hidden if empty */}
        {memoryUnits.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-6 w-6 text-other" />
              <h2 className="text-2xl font-display font-bold">Memory Training</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {memoryUnits.map((unit) => (
                <Card
                  key={unit.id}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group bg-other/5"
                  onClick={() => navigate(`/unit/${unit.subject}/${unit.id}`)}
                >
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {unit.name}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnglishCategory;