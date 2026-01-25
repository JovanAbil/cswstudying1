import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, FileText, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import TermsOfServiceModal from '@/components/TermsOfServiceModal';

const PrivacyPolicy = () => {
  const [copied, setCopied] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const contactEmail = 'abilash.jovan@charterschool.org';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-1">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div>
          {/* Academic Honesty Section */}
          <h1 className="text-4xl font-display font-bold mb-8">Academic Honesty</h1>
          
          <Card className="p-8 space-y-6 mb-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-display font-semibold">Our Commitment to Academic Integrity</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                According to the{' '}
                <a 
                  href="https://www.charterschool.org/page/studenthandbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  25-26 CSW Student Handbook
                  <ExternalLink className="h-3 w-3" />
                </a>
                , the following constitutes a violation:
              </p>
              <blockquote className="border-l-4 border-primary/50 pl-4 py-2 bg-muted/30 rounded-r-md mb-6">
                <p className="text-muted-foreground italic">
                  "Cheating or Test Procedure Violation: Using unauthorized materials, copying, sharing answer keys/tests, 
                  pre-programmed calculators, or unauthorized online resources"
                </p>
              </blockquote>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">How We Follow These Rules</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This website was created <strong>by students, for students</strong>, with the explicit goal of maintaining 
                academic integrity while providing the most effective study resources possible.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-3 ml-4">
                <li>
                  <strong>Tests are only added AFTER they have been taken</strong> — This removes any possibility of 
                  cheating since the test has already occurred before questions become available.
                </li>
                <li>
                  <strong>Automatic lockout at end of school year</strong> — Tests are automatically removed from access 
                  on June 16th each year to prevent use during subsequent years' exams.
                </li>
                <li>
                  <strong>Best-effort prevention</strong> — While we cannot stop someone who is determined to copy content 
                  (tests are already publicized by teachers during class), we've implemented technical safeguards to minimize misuse.
                </li>
                <li>
                  <strong>Evidence-based studying</strong> — We use the most efficient study method: practicing with 
                  previous exams and active recall, which research shows maximizes learning and retention.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Our Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                The purpose of this resource is to help students study more effectively, not to enable cheating. 
                By only making content available after tests have been administered, we ensure this tool can only 
                be used for legitimate studying purposes. We believe that practicing with real exam questions 
                (after the fact) is one of the most effective ways to prepare for future assessments.
              </p>
            </section>
          </Card>

          {/* Privacy Policy Section */}
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Third-Party Advertising</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use third-party advertising companies, including Google, to serve ads when you visit our website. 
                These companies may use information about your visits to this and other websites in order to provide 
                advertisements about goods and services of interest to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies may be used by us and our advertising partners to collect non-personally identifiable information 
                about your browsing activities. This helps us understand how visitors use our site and allows advertisers 
                to show you more relevant ads.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Opt-Out Options</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to opt out of personalized advertising. You can do this by:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Visiting Google's Ads Settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adssettings.google.com</a></li>
                <li>Using the Network Advertising Initiative opt-out page at <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">optout.networkadvertising.org</a></li>
                <li>Adjusting your browser settings to block or delete cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="flex items-center gap-2">
                <code className="px-3 py-2 bg-muted rounded-md text-sm font-mono">
                  {contactEmail}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyEmail}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </section>
          </Card>

          {/* View Terms of Service Button */}
          <Card className="p-6 mt-6 bg-muted/30 border-dashed">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium">Terms of Service</h3>
                  <p className="text-sm text-muted-foreground">
                    View the website terms and guidelines
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={() => setShowTerms(true)}>
                View Terms
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
      
      {/* Terms of Service Modal - externally controlled */}
      {showTerms && (
        <TermsOfServiceModal 
          externalOpen={true} 
          onExternalClose={() => setShowTerms(false)} 
        />
      )}
    </div>
  );
};

export default PrivacyPolicy;
