import { Moon, Sun, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLockInMode } from '@/hooks/usePopupSettings';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLockIn, toggleLockIn } = useLockInMode();

  return (
    <div className="fixed top-4 left-16 z-50 flex gap-2 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLockIn}
            className={`bg-card/80 backdrop-blur-sm border shadow-md hover:bg-muted ${
              isLockIn 
                ? 'border-primary bg-primary/10 text-primary' 
                : 'border-border text-foreground'
            }`}
          >
            <Lock className="h-5 w-5" />
            <span className="sr-only">Toggle Lock In Mode</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Lock In: {isLockIn ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-muted-foreground">
            {isLockIn ? 'No distractions - popups disabled' : 'Disable all popups'}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
