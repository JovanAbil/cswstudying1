import { Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDebugMode } from '@/hooks/useDebugMode';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const DebugModeToggle = () => {
  const { isDebugMode, toggleDebugMode } = useDebugMode();

  return (
    <div className="fixed top-4 left-4 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isDebugMode ? 'default' : 'outline'}
            size="icon"
            onClick={toggleDebugMode}
            className={isDebugMode ? 'bg-primary' : 'bg-background/80 backdrop-blur-sm'}
          >
            <Bug className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Debug Mode: {isDebugMode ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-muted-foreground">Shows ad placements</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
