import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ContributionReminderProps {
  intervalMinutes?: number;
  cooldownSeconds?: number;
}

export const ContributionReminder = ({ 
  intervalMinutes = 1, 
  cooldownSeconds = 5 
}: ContributionReminderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(cooldownSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
      setCanClose(false);
      setCountdown(cooldownSeconds);
    }, intervalMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, [intervalMinutes, cooldownSeconds]);

  useEffect(() => {
    if (isOpen && !canClose) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanClose(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, canClose]);

  const handleClose = () => {
    if (canClose) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && canClose) {
        setIsOpen(false);
      }
    }}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => {
        if (!canClose) e.preventDefault();
      }} onEscapeKeyDown={(e) => {
        if (!canClose) e.preventDefault();
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5 text-red-500" />
            Help Your Fellow Students!
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            If you added a course, it would unlock better studying tools forever. 
            A bit of your time can save others a lot!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Head to the <span className="font-semibold text-other">Other</span> category to create custom units and topics that everyone can benefit from.
          </p>
          <Button 
            onClick={handleClose} 
            disabled={!canClose}
            variant={canClose ? "default" : "secondary"}
            className="w-full"
          >
            {canClose ? "Got it!" : `Please wait ${countdown}s...`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
