import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkCounterDev = async () => {
      try {
        // Method 1: Try to fetch the Counter.dev script
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch('https://cdn.counter.dev/script.js', {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // If we get here with no-cors, we can't really tell if it succeeded
        // So we also check if the script tag loaded
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Method 2: Check if counter.dev script is in the DOM and loaded
        const scripts = document.querySelectorAll('script[src*="counter.dev"]');
        if (scripts.length === 0) {
          setIsBlocked(true);
          setIsChecking(false);
          return;
        }

        // Method 3: Check if the script actually executed by looking for network activity
        // We'll use a small test - try to create an image request to counter.dev
        const testImg = new Image();
        let loaded = false;

        testImg.onload = () => {
          loaded = true;
        };
        testImg.onerror = () => {
          // Image request blocked - likely adblocker
          setIsBlocked(true);
        };

        testImg.src = `https://cdn.counter.dev/favicon.ico?t=${Date.now()}`;

        // Wait for the test to complete
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!loaded && !isBlocked) {
          // Double-check by trying to access the script content
          try {
            const testFetch = await fetch('https://cdn.counter.dev/script.js', {
              signal: AbortSignal.timeout(3000),
            });
            if (!testFetch.ok) {
              setIsBlocked(true);
            }
          } catch {
            setIsBlocked(true);
          }
        }
      } catch (error) {
        // Fetch failed - likely blocked by adblocker
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
