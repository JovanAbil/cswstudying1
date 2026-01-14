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

interface TermsOfServiceModalProps {
  /** If true, the modal can be opened manually (from privacy policy page) */
  externalOpen?: boolean;
  /** Callback when the external modal closes */
  onExternalClose?: () => void;
}

const TermsOfServiceModal = ({ externalOpen = false, onExternalClose }: TermsOfServiceModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only auto-open on first visit if not being controlled externally
    if (!externalOpen) {
      const hasAccepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
      if (!hasAccepted) {
        setIsOpen(true);
      }
    }
  }, [externalOpen]);

  // Handle external open state
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  const handleAccept = () => {
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    setIsOpen(false);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Allow closing only if it was externally opened (viewing from privacy policy)
      if (!open && externalOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => {
        // Prevent closing on first visit, allow if viewing from privacy policy
        if (!externalOpen) {
          e.preventDefault();
        }
      }}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to CSW Studying!</DialogTitle>
          <DialogDescription>
            {externalOpen ? 'Viewing Terms of Service' : 'Please review our terms before continuing'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span className="text-lg">📚</span>
              <p className="text-muted-foreground">This website was made for studying to be more efficient</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
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

            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <span className="text-lg">⚠️</span>
              <p className="text-muted-foreground">Building off of academic dishonesty concerns, all test questions will be changed year-end to have similar content that was learned off of tests to ensure teachers don't have to worry about cheating next year</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-lg">🎉</span>
              <p className="text-muted-foreground font-medium">Have fun using this website and good luck on your test!</p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!externalOpen && (
            <Link to="/privacy" className="text-sm text-primary hover:underline">
              View Privacy Policy
            </Link>
          )}
          <Button onClick={handleAccept} className="w-full sm:w-auto">
            {externalOpen ? 'Close' : 'I Accept'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
