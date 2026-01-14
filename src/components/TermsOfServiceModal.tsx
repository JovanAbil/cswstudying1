import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

const TERMS_ACCEPTED_KEY = 'terms-accepted';

const TermsOfServiceModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to CSW Studying!</DialogTitle>
          <DialogDescription>
            Please review our terms before continuing
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">📚</span>
              <p className="text-muted-foreground">This website was made for studying to be more efficient</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
              <span className="text-lg">🔗</span>
              <p className="text-muted-foreground">More than just using this website, please share to anyone you know!</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">✏️</span>
              <p className="text-muted-foreground">You can also add your own guides as well in OTHER!</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <span className="text-lg">⚠️</span>
              <p className="text-muted-foreground">Since tests are directly taken from teachers, following the rules is necessary; don't ask to post tests that everyone hasn't taken</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border">
              <span className="text-lg">🔄</span>
              <p className="text-muted-foreground">Building off of academic dishonesty concerns, all test questions will be changed year-end to have similar content but not questions ripped off of tests to ensure teachers don't have to worry about cheating next year</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-lg">🎉</span>
              <p className="text-muted-foreground font-medium">Have fun using this website and good luck on your test!</p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Link to="/privacy" className="text-sm text-primary hover:underline">
            View Privacy Policy
          </Link>
          <Button onClick={handleAccept} className="w-full sm:w-auto">
            I Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
