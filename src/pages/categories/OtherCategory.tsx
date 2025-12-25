import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Trophy, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';

const OtherCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();

  const subjects = [
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-other/10">
            <Sparkles className="w-7 h-7 text-other" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-other">Other</h1>
            <p className="text-muted-foreground">Memory training and miscellaneous</p>
          </div>
        </div>

        {subjects.map((subject) => {
          const wrongCount = getWrongAnswerCount(subject.id);
          const wrongQuestions = getAllWrongQuestionsForSubject(subject.id);

          return (
            <div key={subject.id} className="mb-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
                <div className="flex gap-3">
                  {wrongCount > 0 ? (
                    <Button
                      onClick={() => navigate(`/unit/${subject.id}/targeted-practice/quiz/cram`, { 
                        state: { wrongQuestions } 
                      })}
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Targeted Practice ({wrongCount})
                    </Button>
                  ) : (
                    <Button variant="outline" disabled className="opacity-50">
                      <Target className="mr-2 h-4 w-4" />
                      You haven't done anything yet!
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate(`/course-challenge/${subject.id}`)}
                    variant="outline"
                    className="border-other text-other hover:bg-other hover:text-other-foreground"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Course Challenge
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subject.units.map((unit) => (
                  <Card
                    key={unit.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group"
                    onClick={() => navigate(`/unit/${subject.id}/${unit.id}`)}
                  >
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {unit.name}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OtherCategory;