import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Brain, Lock } from 'lucide-react';

// Personal units - add your units here
const stockUnits = [
  {
    id: 'stock-unit1',
    name: 'Personal Unit 1 (Coming Soon)',
    subject: 'stock',
    questionCount: 0,
    enabled: false,
  },
  // Add more units as needed:
  // {
  //   id: 'stock-myunit',
  //   name: 'My Custom Unit',
  //   subject: 'stock',
  //   questionCount: 25,
  //   enabled: true,
  // },
];

const StockPage = () => {
  const navigate = useNavigate();

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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-primary">Personal Units</h1>
            <p className="text-muted-foreground">Private practice materials</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-display font-bold mb-6">Your Units</h2>
          {stockUnits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stockUnits.map((unit) => (
                <Card
                  key={unit.id}
                  className={`p-6 border-2 transition-all ${
                    unit.enabled 
                      ? 'hover:shadow-lg hover:scale-105 cursor-pointer hover:border-primary' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => unit.enabled && navigate(`/unit/${unit.subject}/${unit.id}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{unit.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {unit.enabled ? `${unit.questionCount} questions` : 'Not yet configured'}
                      </p>
                    </div>
                    {unit.enabled && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/unit/${unit.subject}/${unit.id}/view-all`);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View All
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 border-dashed text-center">
              <p className="text-muted-foreground mb-2">No units configured yet</p>
              <p className="text-sm text-muted-foreground">
                Add units to the stockUnits array in StockPage.tsx
              </p>
            </Card>
          )}
        </div>

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-3">How to Add Personal Units</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Create a new question file in <code className="bg-background px-1 rounded">src/data/stock/</code></li>
            <li>Add the unit to the <code className="bg-background px-1 rounded">stockUnits</code> array in this file</li>
            <li>Add the question mapping in <code className="bg-background px-1 rounded">Quiz.tsx</code></li>
            <li>Set <code className="bg-background px-1 rounded">enabled: true</code> when ready</li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default StockPage;
