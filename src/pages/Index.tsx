import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Calculator, BookOpen, FlaskConical, Landmark, Sparkles, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Precalculus, Algebra, and more',
    icon: Calculator,
    color: 'math',
    path: '/category/math',
  },
  {
    id: 'english',
    name: 'English',
    description: 'Literature, Writing, and Language Arts',
    icon: BookOpen,
    color: 'english',
    path: '/category/english',
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Biology, Chemistry, and more',
    icon: FlaskConical,
    color: 'science',
    path: '/category/science',
  },
  {
    id: 'social',
    name: 'Social Studies',
    description: 'World History, US History, and more',
    icon: Landmark,
    color: 'social',
    path: '/category/social',
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Memory training and miscellaneous',
    icon: Sparkles,
    color: 'other',
    path: '/category/other',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
              Practice Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Master your classes at CSW with interactive practice tests and daily exercises. 
              Choose a subject category to get started.
            </p>
            <p className="text-sm text-muted-foreground/70">
              Reach out to abilash.jovan@charterschool.org with question banks to add new courses!
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`group relative overflow-hidden p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-${category.color} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(category.path)}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${category.color}/10 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 text-${category.color}`} />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className={`flex items-center text-${category.color} font-medium`}>
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-science/5 border-science/20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-science">📚 Daily Practice</h3>
              <p className="text-sm text-muted-foreground">
                Quick 10-question sessions to keep your skills sharp
              </p>
            </Card>
            <Card className="p-6 bg-english/5 border-english/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-english">📝 Full Tests</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive 30-question tests for thorough review
              </p>
            </Card>
            <Card className="p-6 bg-math/5 border-math/20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-math">🏆 Course Challenge</h3>
              <p className="text-sm text-muted-foreground">
                Test across multiple units to prepare for exams
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;