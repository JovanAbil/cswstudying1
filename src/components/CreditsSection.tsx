import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Users, Heart, Copy, Check, Eye, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * =============================================================================
 * CONTRIBUTORS LIST - Easy to Add/Remove
 * =============================================================================
 * 
 * To ADD a new contributor:
 *   1. Copy one of the existing contributor objects below
 *   2. Paste it at the end of the 'contributors' array
 *   3. Update the name and role fields
 * 
 * To REMOVE a contributor:
 *   1. Find their object in the array below
 *   2. Delete the entire object (including the comma if it's not the last one)
 * 
 * Example contributor object:
 *   { name: 'John Doe', role: 'Content Creator' },
 * 
 * =============================================================================
 */

const contributors = [
  // ===== ADD CONTRIBUTORS BELOW THIS LINE =====
  
  { name: 'Jovan Abilash', role: 'Creator & Developer' },
  // { name: 'Contributor Name', role: 'Their Role' },
  // { name: 'Another Person', role: 'Content Creator' },
  
  // ===== ADD CONTRIBUTORS ABOVE THIS LINE =====
];

/**
 * =============================================================================
 * CONTACT INFORMATION
 * =============================================================================
 * 
 * Update the email below to change the contact email displayed
 * 
 * =============================================================================
 */

const contactEmail = 'abilash.jovan@charterschool.org';

/**
 * =============================================================================
 * SITE STATISTICS
 * =============================================================================
 * 
 * Update these values to reflect the latest site statistics.
 * Last updated: Jan 19th, 2026 at 9:35 AM
 * 
 * =============================================================================
 */

const TOTAL_VISITORS = 236 + 18; // 254 total visitors
const TOTAL_PAGEVIEWS = 1700 + 101; // 1801 total pageviews
const LAST_UPDATED = "9:35 AM, Jan 19th 2026";

export const CreditsSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contributors Card */}
        <Card className="p-8 border-2 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-display font-bold">Contributors</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            Thank you to everyone who helped make this website possible!
          </p>
          <div className="space-y-3">
            {contributors.map((contributor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="font-medium">{contributor.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{contributor.role}</span>
              </div>
            ))}
            {contributors.length === 0 && (
              <p className="text-sm text-muted-foreground italic text-center py-4">
                No contributors listed yet
              </p>
            )}
          </div>
        </Card>

        {/* Contact Card */}
        <Card className="p-8 border-2 border-accent/20 bg-accent/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent/20 rounded-lg">
              <Mail className="h-6 w-6 text-accent-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold">Need Help?</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">
            Have questions, suggestions, or want to contribute? Reach out!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-background rounded-lg border">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Email</p>
                <p className="text-sm text-muted-foreground truncate">{contactEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyEmail}
                className="flex items-center gap-2 shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <div className="text-xs text-muted-foreground text-center pt-2">
              Response time: Usually within 24-48 hours
            </div>
          </div>
        </Card>
      </div>

      {/* Site Stats Box */}
      <Card className="mt-6 p-6 border-2 border-muted bg-muted/30">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Site Stats</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">{TOTAL_VISITORS.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">visitors</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-lg font-bold">{TOTAL_PAGEVIEWS.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">pageviews</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground/60 text-center mt-3">
          Last updated: {LAST_UPDATED}
        </p>
      </Card>
    </div>
  );
};
