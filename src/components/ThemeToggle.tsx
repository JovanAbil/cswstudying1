import { Moon, Sun, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLockInMode } from '@/hooks/usePopupSettings';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLockIn, toggleLockIn } = useLockInMode();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="bg-card/80 backdrop-blur-sm border border-border shadow-md hover:bg-muted"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <div className="flex flex-col items-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLockIn}
          className={`bg-card/80 backdrop-blur-sm border shadow-md hover:bg-muted ${
            isLockIn 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-border text-foreground'
          }`}
          title={isLockIn ? 'Lock In Mode: ON - Popups disabled' : 'Lock In Mode: OFF - Popups enabled'}
        >
          <Lock className="h-5 w-5" />
          <span className="sr-only">Toggle Lock In Mode</span>
        </Button>
        <p className="text-[10px] text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded border border-border max-w-[120px] text-right">
          {isLockIn ? 'Lock In: No distractions' : 'Lock In: Disable popups'}
        </p>
      </div>
    </div>
  );
};
