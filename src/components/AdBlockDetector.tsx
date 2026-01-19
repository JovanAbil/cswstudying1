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

        // Test 1: Try to fetch the script (bypasses some adblockers)
        try {
          const scriptResponse = await fetch('https://cdn.counter.dev/script.js', {
            method: 'GET',
            cache: 'no-store',
          });

          if (!scriptResponse.ok) {
            setIsBlocked(true);
            setIsChecking(false);
            return;
          }
        } catch {
          setIsBlocked(true);
          setIsChecking(false);
          return;
        }

        // Test 2: Try to reach the tracking domain using an Image request (bypasses CORS)
        // Some adblockers block the tracking endpoint but not the script
        const trackingBlocked = await new Promise<boolean>((resolve) => {
          const img = new Image();
          const timeout = setTimeout(() => {
            resolve(true); // Timeout = likely blocked
          }, 5000);

          img.onload = () => {
            clearTimeout(timeout);
            resolve(false); // Loaded = not blocked
          };

          img.onerror = () => {
            clearTimeout(timeout);
            // Error could be 404 (not blocked) or network error (blocked)
            // We need to check if it's a network-level block
            // Try a second approach: check if we can reach the domain at all
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', 'https://t.counter.dev/', true);
            xhr.timeout = 3000;
            xhr.onload = () => resolve(false); // Got a response = not blocked
            xhr.onerror = () => resolve(true); // Network error = blocked
            xhr.ontimeout = () => resolve(true); // Timeout = blocked
            try {
              xhr.send();
            } catch {
              resolve(true); // Exception = blocked
            }
          };

          // Request favicon from tracking domain
          img.src = `https://t.counter.dev/favicon.ico?t=${Date.now()}`;
        });

        setIsBlocked(trackingBlocked);
      } catch (error) {
        console.warn('Counter.dev analytics check failed:', error);
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
