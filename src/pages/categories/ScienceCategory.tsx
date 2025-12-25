import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FlaskConical, Trophy, Brain, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';

const ScienceCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();

  const subjects = [
    {
      id: 'apbio',
      name: 'AP Biology',
      units: [],
      hasChallenge: true,
    },
    {
      id: 'biology',
      name: 'Biology (Valenti)',
      units: [
        { id: 'biochemistry', name: 'BioChem' },
        { id: 'cellstructure', name: 'Cell Structure & Functions' },
        { id: 'cellenergetics', name: 'Cell Energetics-Photosynthesis & Cell Respirations' },
        { id: 'cellgrowth', name: 'Cell Growth & Division' },
        { id: 'genetics', name: 'Genetics (Not Updated)' },
        { id: 'molecular', name: 'Molecular Biology (Not Updated)' },
        { id: 'evolution', name: 'Darwins Theory of Evolution (Not Updated)' },
        { id: 'ecology', name: 'Ecology (Not Updated)' },
      ],
    },
    {
      id: 'apchem',
      name: 'AP Chemistry',
      units: [],
      hasChallenge: true,
    },
    {
      id: 'chemistry',
      name: 'Chemistry (Massarotti)',
      units: [
        { id: 'metric', name: 'Matter and Measurement' },
        { id: 'atomic', name: 'Atomic Theory' },
        { id: 'compounds', name: 'Compounds' },
        { id: 'gases', name: 'Gases' },
        { id: 'solutions', name: 'Solutions (Not Updated)' },
        { id: 'reactions', name: 'Chemical Reactions (Not Updated)' },
        { id: 'stoichiometry', name: 'Stoichiometry (Not Updated)' },
        { id: 'acidbases', name: 'Acids and Bases (Not Updated)' },
      ],
    },
    {
      id: 'chemistryDarone',
      name: 'Chemistry (Darone)',
      units: [
        { id: 'metric', name: 'Matter and Measurement' },
        { id: 'atomic', name: 'Atomic Theory' },
        { id: 'compounds', name: 'Compounds' },
        { id: 'gases', name: 'Gases' },
        { id: 'solutions', name: 'Solutions (Not Updated)' },
        { id: 'reactions', name: 'Chemical Reactions (Not Updated)' },
        { id: 'stoichiometry', name: 'Stoichiometry (Not Updated)' },
        { id: 'acidbases', name: 'Acids and Bases (Not Updated)' },
      ],
    },
  ];

  const practiceUnits = [
    { id: 'gases', name: 'Gases Practice', subject: 'practice' },
  ];

  const memoryUnits = [
    { id: 'general', name: 'Polyatomic Ions - Chemistry', subject: 'memory' },
    { id: 'general2', name: 'Molecular Geometry - Chemistry', subject: 'memory' },
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-science/10">
            <FlaskConical className="w-7 h-7 text-science" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-science">Science</h1>
            <p className="text-muted-foreground">Biology, Chemistry, and more</p>
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
                  {subject.units.length > 0 && (
                    wrongCount > 0 ? (
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
                    )
                  )}
                  <Button
                    onClick={() => navigate(`/course-challenge/${subject.id}`)}
                    variant="outline"
                    className="border-science text-science hover:bg-science hover:text-science-foreground"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Course Challenge
                  </Button>
                </div>
              </div>
              {subject.units.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subject.units.map((unit) => (
                    <Card
                      key={unit.id}
                      className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-science group"
                      onClick={() => navigate(`/unit/${subject.id}/${unit.id}`)}
                    >
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {unit.name}
                      </p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 border-dashed text-center">
                  <p className="text-muted-foreground">Use Course Challenge for practice</p>
                </Card>
              )}
            </div>
          );
        })}

        {/* Practice Units */}
        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Practice Assignments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {practiceUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-science group bg-science/5"
                onClick={() => navigate(`/unit/${unit.subject}/${unit.id}`)}
              >
                <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {unit.name}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Memory Units */}
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
      </div>
    </div>
  );
};

export default ScienceCategory;