import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Calculator, BookOpen, FlaskConical, Landmark, Sparkles, ArrowRight, Keyboard, ArrowDown, FolderPlus } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { AdPlaceholder } from '@/components/AdPlaceholder';
import { CreditsSection } from '@/components/CreditsSection';
const categories = [{
  id: 'math',
  name: 'Mathematics',
  description: 'Precalculus, Algebra, and more',
  icon: Calculator,
  color: 'math',
  path: '/category/math'
}, {
  id: 'english',
  name: 'English',
  description: 'Literature, Writing, and Language Arts',
  icon: BookOpen,
  color: 'english',
  path: '/category/english'
}, {
  id: 'science',
  name: 'Science',
  description: 'Biology, Chemistry, and more',
  icon: FlaskConical,
  color: 'science',
  path: '/category/science'
}, {
  id: 'social',
  name: 'Social Studies',
  description: 'World History, US History, and more',
  icon: Landmark,
  color: 'social',
  path: '/category/social'
}, {
  id: 'other',
  name: 'Other',
  description: 'Memory training and miscellaneous, MAKE CUSTOM COURSES/UNITS HERE',
  icon: Sparkles,
  color: 'other',
  path: '/category/other'
}];
const controls = [{
  key: '1-5',
  description: 'Select answer option (1 for first, 2 for second, etc.)'
}, {
  key: 'Enter',
  description: 'Submit answer / Move to next question'
}, {
  key: '← Arrow',
  description: 'Mark free response as incorrect'
}, {
  key: '→ Arrow',
  description: 'Mark free response as correct'
}];
const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background flex flex-col">
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
            <p className="text-sm text-muted-foreground/70 mb-4">If you are confused, check the bottom of the main page and the "Other" page for understanding. Further questions can be emailed to me, email down below. Have fun using this!</p>
            <div className="flex items-center justify-center gap-2 text-primary font-medium animate-bounce">
              <ArrowDown className="h-5 w-5" />
              <span>Scroll down to see how to use the website</span>
              <ArrowDown className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
          const Icon = category.icon;
          return <Card key={category.id} className={`group relative overflow-hidden p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-${category.color} animate-fade-in`} style={{
            animationDelay: `${index * 0.1}s`
          }} onClick={() => navigate(category.path)}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${category.color}/10 mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 text-${category.color}`} />
                </div>
                <h2 className="text-2xl font-display font-bold mb-2">{category.name}</h2>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className={`flex items-center text-${category.color} font-medium`}>
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>;
        })}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-science/5 border-science/20 animate-fade-in" style={{
            animationDelay: '0.5s'
          }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-science">📚 Cram Study</h3>
              <p className="text-sm text-muted-foreground">
                Practice ALL questions in a unit to master the material
              </p>
            </Card>
            <Card className="p-6 bg-english/5 border-english/20 animate-fade-in" style={{
            animationDelay: '0.6s'
          }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-english">📝 View All Questions</h3>
              <p className="text-sm text-muted-foreground">
                Browse questions with IDs without taking a test
              </p>
            </Card>
            <Card className="p-6 bg-math/5 border-math/20 animate-fade-in" style={{
            animationDelay: '0.7s'
          }}>
              <h3 className="text-lg font-display font-semibold mb-2 text-math">🎯 Targeted Practice</h3>
              <p className="text-sm text-muted-foreground">
                Review questions you got wrong on previous attempts
              </p>
            </Card>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Keyboard className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">Keyboard Controls</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Use these keyboard shortcuts during quizzes to navigate quickly:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {controls.map((control, index) => <div key={index} className="flex items-center gap-4 p-3 bg-background rounded-lg border">
                  <kbd className="px-3 py-2 bg-muted rounded-md font-mono text-sm font-semibold min-w-[80px] text-center">
                    {control.key}
                  </kbd>
                  <span className="text-sm text-muted-foreground">{control.description}</span>
                </div>)}
            </div>
          </Card>
        </div>

        {/* How to Use Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-accent/20 bg-accent/5">
            <h2 className="text-2xl font-display font-bold mb-6">How to Use Practice Hub</h2>
            <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
              <li className="leading-relaxed">
                <span className="font-semibold text-foreground">Choose a Category</span> - Click on Math, Science, or any subject area above
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-foreground">Select a Subject</span> - Pick the specific course (e.g., AP Precalculus, Chemistry)
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-foreground">Pick a Unit</span> - Click on a unit to see practice options
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-foreground">Start Practicing</span> - Choose "Cram Study" for all questions or "View All Questions" to browse
              </li>
              <li className="leading-relaxed">
              <span className="font-semibold text-foreground">Review Mistakes</span> - Use "Targeted Practice" to review questions you got wrong
              </li>
            </ol>
          </Card>
        </div>

        {/* Custom Units Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-other/20 bg-other/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-other/20 rounded-lg">
                <FolderPlus className="h-6 w-6 text-other" />
              </div>
              <h2 className="text-2xl font-display font-bold">Custom Units & Topics</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Create your own question banks for any subject! Navigate to the <span className="font-medium text-foreground">Other</span> category to create custom units and topics. Check the warnings and instructions there for important information about browser storage limitations.
            </p>
          </Card>
        </div>

        {/* Credits Section */}
        <CreditsSection />

        {/* Bottom Ad Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
      <Footer />
    </div>;
};
export default Index;
