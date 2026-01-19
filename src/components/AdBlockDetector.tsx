import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkCounterDev = async () => {
      // Wait for page to fully load and scripts to execute
      await new Promise(resolve => setTimeout(resolve, 3000));

      try {
        // Check if the counter.dev script tag exists
        const script = document.querySelector('script[src*="counter.dev"]') as HTMLScriptElement;
        
        if (!script) {
          setIsBlocked(true);
          setIsChecking(false);
          return;
        }

        // Test 1: Try to fetch the script
        const scriptResponse = await fetch('https://cdn.counter.dev/script.js', {
          method: 'GET',
          cache: 'no-store',
        });

        if (!scriptResponse.ok) {
          setIsBlocked(true);
          setIsChecking(false);
          return;
        }

        // Test 2: Try to reach the tracking endpoint (some adblockers block this but not the script)
        // Using a HEAD request to minimize data transfer
        const trackResponse = await fetch('https://t.counter.dev/trackpage', {
          method: 'POST',
          body: new URLSearchParams({ id: 'test', page: '/test' }),
          cache: 'no-store',
        });

        // If we get here without an error, tracking is not blocked
        // Note: The response might be an error status but that's OK - we just need to know the request wasn't blocked
        setIsBlocked(false);
      } catch (error) {
        // Fetch failed - blocked by adblocker
        console.warn('Counter.dev analytics blocked:', error);
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
