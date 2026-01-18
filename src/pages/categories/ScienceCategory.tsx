import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FlaskConical, Trophy, Brain, Target } from 'lucide-react';
import useWrongAnswers from '@/hooks/useWrongAnswers';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { NeededCoursesPopup } from '@/components/NeededCoursesPopup';
import { usePopupCooldown } from '@/hooks/usePopupSettings';

const ScienceCategory = () => {
  const navigate = useNavigate();
  const { getWrongAnswerCount, getAllWrongQuestionsForSubject } = useWrongAnswers();
  const shouldShowPopup = usePopupCooldown('science');
  const [showNeededCourses, setShowNeededCourses] = useState(false);

  useEffect(() => {
    if (shouldShowPopup) {
      setShowNeededCourses(true);
    }
  }, [shouldShowPopup]);

  const subjects = [
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
  ];

  const practiceUnits = [

  ];

  const memoryUnits = [
    { id: 'general', name: 'Polyatomic Ions - Chemistry', subject: 'memory' },
    { id: 'general2', name: 'Molecular Geometry - Chemistry', subject: 'memory' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NeededCoursesPopup 
        category="science" 
        isOpen={showNeededCourses} 
        onClose={() => setShowNeededCourses(false)} 
      />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <Link to="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

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
          
          return (
            <div key={subject.id} className="mb-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
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
                      className="border-science text-science hover:bg-science hover:text-science-foreground"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Course Challenge
                    </Button>
                  </Link>
                </div>
              </div>
              {subject.units.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {subject.units.map((unit) => (
                    <Link key={unit.id} to={`/unit/${subject.id}/${unit.id}`}>
                      <Card
                        className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-science group h-full"
                      >
                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {unit.name}
                        </p>
                      </Card>
                    </Link>
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


        {/* Memory Training */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-6 w-6 text-other" />
            <h2 className="text-2xl font-display font-bold">Memory Training</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {memoryUnits.map((unit) => (
              <Link key={unit.id} to={`/unit/${unit.subject}/${unit.id}`}>
                <Card
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-other group bg-other/5 h-full"
                >
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {unit.name}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
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

export default ScienceCategory;
