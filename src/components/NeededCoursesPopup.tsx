import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Lock } from 'lucide-react';
import { useLockInMode } from '@/hooks/usePopupSettings';
import { useState } from 'react';

export type CategoryType = 'math' | 'science' | 'social' | 'english' | 'other';

// Editable lists of needed courses for each category
// Modify these arrays to add/remove needed courses
export const NEEDED_COURSES: Record<CategoryType, string[]> = {
  math: [
    'Calc3',
    'AP Calculus AB',
    'AP Calculus BC',
    'Calculus AB',
    'Calculus BC',
    'Statistics',
    'Math 3',
    'Math 2',
    'Math 1',
  ],
  science: [
    'AP Biology',
    'AP Chemistry',
    'Chemistry (Darone)',
    'Physics',
    'AP Physics',
    'AP Physics C',
  ],
  social: [
    'AP US History',
    'US History',
    'Psychology',
    'World History Kohl',
  ],
  english: [
  ],
  other: [
    'APSCP',
    'APSCA',
  ],
};

interface NeededCoursesPopupProps {
  category: CategoryType;
  isOpen: boolean;
  onClose: () => void;
}

export const NeededCoursesPopup = ({ 
  category,
  isOpen,
  onClose,
}: NeededCoursesPopupProps) => {
  const courses = NEEDED_COURSES[category] || [];
  const { isLockIn, toggleLockIn } = useLockInMode();
  const [showLockInPrompt, setShowLockInPrompt] = useState(false);
  
  const categoryNames: Record<CategoryType, string> = {
    math: 'Mathematics',
    science: 'Science',
    social: 'Social Studies',
    english: 'English',
    other: 'Other',
  };

  const handleGotIt = () => {
    if (!isLockIn) {
      setShowLockInPrompt(true);
    } else {
      onClose();
    }
  };

  const handleEnableLockIn = () => {
    toggleLockIn();
    setShowLockInPrompt(false);
    onClose();
  };

  const handleSkipLockIn = () => {
    setShowLockInPrompt(false);
    onClose();
  };

  if (courses.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setShowLockInPrompt(false);
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        {!showLockInPrompt ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Courses Needed for {categoryNames[category]}
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                These courses are missing or incomplete. Consider adding them!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <ul className="space-y-2">
                {courses.map((course, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 p-2 rounded-lg bg-muted/50`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-yellow-500`} />
                    <span className="text-sm font-medium">{course}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">
                Head to the <span className="font-semibold">Other</span> category to create custom units and help your classmates!
              </p>
              <Button onClick={handleGotIt} className="w-full">
                Got it!
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Lock className="h-5 w-5 text-primary" />
                Enable Lock In Mode?
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                Lock In mode disables all popups so you can focus on studying without distractions.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={handleEnableLockIn} className="w-full">
                <Lock className="mr-2 h-4 w-4" />
                Yes, enable Lock In
              </Button>
              <Button onClick={handleSkipLockIn} variant="outline" className="w-full">
                No, keep popups enabled
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
