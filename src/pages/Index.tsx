import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Microscope, Beaker, Landmark } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const precalcUnits = [
    { id: 'polynomial', name: 'Polynomial' },
    { id: 'rational', name: 'Rational' },
    { id: 'exponential', name: 'Exponential' },
    { id: 'logarithmic', name: 'Logarithmic' },
    { id: 'trigonometric', name: 'Trigonometric' },
    { id: 'polar', name: 'Polar' },
    { id: 'parametric', name: 'Parametric' },
    { id: 'vectorsMatrices', name: 'Vectors and Matrices' },
  ];

  const biologyUnits = [
    { id: 'biochemistry', name: 'BioChem' },
    { id: 'cellstructure', name: 'Cell Structure & Functions' },
    { id: 'cellenergetics', name: 'Cell Energetics-Photosynthesis & Cell Respirations' },
    { id: 'cellgrowth', name: 'Cell Growth & Division' },
    { id: 'genetics', name: 'Genetics' },
    { id: 'molecular', name: 'Molecular Biology' },
    { id: 'evolution', name: 'Darwins Theory of Evolution' },
    { id: 'ecology', name: 'Ecology' },
  ];

  const chemistryUnits = [
    { id: 'metric', name: 'Matter and Measurement' },
    { id: 'atomic', name: 'Atomic Theory' },
    { id: 'compounds', name: 'Compounds' },
    { id: 'gases', name: 'Gases' },
    { id: 'solutions', name: 'Solutions' },
    { id: 'reactions', name: 'Chemical Reactions' },
    { id: 'stoichiometry', name: 'Stoichiometry' },
    { id: 'acidbases', name: 'Acids and Bases' },
  ];

  const worldHistoryUnits = [
    { id: 'religions', name: 'Religions' },
    { id: 'unit2', name: 'Unit 2' },
    { id: 'unit3', name: 'Unit 3' },
    { id: 'unit4', name: 'Unit 4' },
    { id: 'unit5', name: 'Unit 5' },
    { id: 'unit6', name: 'Unit 6' },
    { id: 'unit7', name: 'Unit 7' },
    { id: 'unit8', name: 'Unit 8' },
    { id: 'unit8', name: 'Unit 9' },
    { id: 'unit8', name: 'Unit 10' },
    { id: 'unit8', name: 'Unit 11' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Practice Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master your classes with interactive practice tests and daily exercises!
          </p>
        </div>

        {/* AP Precalc Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">AP Precalculus</h2>
            </div>
            <Button
              onClick={() => navigate('/course-challenge/precalc')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Course Challenge
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {precalcUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary group"
                onClick={() => navigate(`/unit/precalc/${unit.id}`)}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">{unit.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Biology Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                <Microscope className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-success">Biology</h2>
            </div>
            <Button
              onClick={() => navigate('/course-challenge/biology')}
              variant="outline"
              className="border-success text-success hover:bg-success hover:text-white"
            >
              Course Challenge
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {biologyUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-success group"
                onClick={() => navigate(`/unit/biology/${unit.id}`)}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">{unit.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chemistry Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
                <Beaker className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-accent">Chemistry</h2>
            </div>
            <Button
              onClick={() => navigate('/course-challenge/chemistry')}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-foreground"
            >
              Course Challenge
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chemistryUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-accent group"
                onClick={() => navigate(`/unit/chemistry/${unit.id}`)}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">{unit.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* World History Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-lg">
                <Landmark className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-destructive">World History</h2>
            </div>
            <Button
              onClick={() => navigate('/course-challenge/world-history')}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              Course Challenge
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {worldHistoryUnits.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-destructive group"
                onClick={() => navigate(`/unit/world-history/${unit.id}`)}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">{unit.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-secondary/10 border-secondary">
              <h3 className="text-lg font-semibold mb-2 text-secondary">📚 Daily Practice</h3>
              <p className="text-sm text-muted-foreground">
                Quick 10-question sessions to keep your skills sharp
              </p>
            </Card>
            <Card className="p-6 bg-accent/10 border-accent">
              <h3 className="text-lg font-semibold mb-2 text-accent">📝 Full Tests</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive 30-question assessments to test your mastery
              </p>
            </Card>
            <Card className="p-6 bg-primary/10 border-primary">
              <h3 className="text-lg font-semibold mb-2 text-primary">🎯 Course Challenge</h3>
              <p className="text-sm text-muted-foreground">
                30 random questions from all units to test your overall knowledge
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
