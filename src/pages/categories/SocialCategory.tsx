import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Landmark, Trophy } from 'lucide-react';

const SocialCategory = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'world-history',
      name: 'World History (Stella)',
      units: [
        { id: 'religions', name: 'Religions' },
        { id: 'islam', name: 'Islam' },
        { id: 'renaissance', name: 'Renaissance' },
        { id: 'protestant', name: 'Protestant' },
        { id: 'unit5', name: 'Unit 5 (Not Updated)' },
        { id: 'unit6', name: 'Unit 6 (Not Updated)' },
        { id: 'unit7', name: 'Unit 7 (Not Updated)' },
        { id: 'unit8', name: 'Unit 8 (Not Updated)' },
        { id: 'unit9', name: 'Unit 9 (Not Updated)' },
        { id: 'unit10', name: 'Unit 10 (Not Updated)' },
        { id: 'unit11', name: 'Unit 11 (Not Updated)' },
      ],
    },
    {
      id: 'apush',
      name: 'AP US History',
      units: [],
      hasChallenge: true,
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-social/10">
            <Landmark className="w-7 h-7 text-social" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-social">Social Studies</h1>
            <p className="text-muted-foreground">World History, US History, and more</p>
          </div>
        </div>

        {subjects.map((subject) => (
          <div key={subject.id} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">{subject.name}</h2>
              <Button
                onClick={() => navigate(`/course-challenge/${subject.id}`)}
                variant="outline"
                className="border-social text-social hover:bg-social hover:text-social-foreground"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Course Challenge
              </Button>
            </div>
            {subject.units.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subject.units.map((unit) => (
                  <Card
                    key={unit.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-social group"
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
        ))}
      </div>
    </div>
  );
};

export default SocialCategory;