import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BookOpen, FileText } from 'lucide-react';

const Unit = () => {
  const { unitId } = useParams();
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

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-3 text-primary">
            Unit {unitId?.toUpperCase()}
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Choose your practice mode
          </p>

          <div className="grid gap-6">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary"
                  onClick={() => navigate(`/unit/${unitId}/quiz/daily`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/20 rounded-lg">
                  <BookOpen className="h-8 w-8 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Daily Practice</h3>
                  <p className="text-muted-foreground mb-4">
                    Quick practice session with 10 carefully selected questions
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ ~15 minutes</span>
                    <span>📝 10 questions</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-accent"
                  onClick={() => navigate(`/unit/${unitId}/quiz/full`)}>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">Full Test</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive assessment covering all topics in this unit
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⏱️ ~45 minutes</span>
                    <span>📝 30 questions</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unit;
