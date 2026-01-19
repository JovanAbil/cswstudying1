import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkCounterDev = async () => {
      // Wait for page to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      try {
        // Simple check: try to fetch the counter.dev script
        // If blocked by adblocker, this will throw a network error
        const response = await fetch('https://cdn.counter.dev/script.js', {
          cache: 'no-store',
        });

        // If we get any response (even error status), the request wasn't blocked
        setIsBlocked(false);
      } catch {
        // Network error = blocked by adblocker
        setIsBlocked(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkCounterDev();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isChecking || !isBlocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border-2 border-destructive rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-destructive/20 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4 text-destructive">
          Adblocker Detected
        </h2>
        
        <p className="text-center text-muted-foreground mb-6">
          Your adblocker is preventing analytics from loading. This helps us understand how students use the site to make it better.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>To continue:</strong>
          </p>
          <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
            <li>Disable your adblocker for this site</li>
            <li>Add this site to your adblocker's whitelist</li>
            <li>Click the refresh button below</li>
          </ol>
        </div>
        
        <button
          onClick={handleRefresh}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Page
        </button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          This popup cannot be dismissed until analytics can load successfully.
        </p>
      </div>
    </div>
  );
};
