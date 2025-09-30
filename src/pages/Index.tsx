import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const units = [
    { id: '1a', name: 'Unit 1A' },
    { id: '1b', name: 'Unit 1B' },
    { id: '2a', name: 'Unit 2A' },
    { id: '2b', name: 'Unit 2B' },
    { id: '3a', name: 'Unit 3A' },
    { id: '3b', name: 'Unit 3B' },
    { id: '4a', name: 'Unit 4A' },
    { id: '4b', name: 'Unit 4B' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary">
            AP Precalc
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master precalculus concepts with interactive practice tests and daily exercises
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">Select a Unit</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {units.map((unit) => (
              <Card
                key={unit.id}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary group"
                onClick={() => navigate(`/unit/${unit.id}`)}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 text-primary group-hover:scale-110 transition-transform">
                    {unit.id.toUpperCase()}
                  </div>
                  <p className="text-sm text-muted-foreground">{unit.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-secondary/20 border-secondary">
              <h3 className="text-lg font-semibold mb-2 text-secondary">📚 Daily Practice</h3>
              <p className="text-sm text-muted-foreground">
                Quick 10-question sessions to keep your skills sharp
              </p>
            </Card>
            <Card className="p-6 bg-accent/20 border-accent">
              <h3 className="text-lg font-semibold mb-2 text-accent">📝 Full Tests</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive 30-question assessments to test your mastery
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
