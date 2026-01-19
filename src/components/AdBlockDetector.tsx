import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const observerRef = useRef<PerformanceObserver | null>(null);

  useEffect(() => {
    const checkAnalyticsBlocked = async () => {
      // Wait for page to fully load and Counter.dev to attempt tracking
      await new Promise(resolve => setTimeout(resolve, 2500));

      let scriptBlocked = false;
      let trackingBlocked = false;

      // Test 1: Check if the Counter.dev script can be fetched
      try {
        const response = await fetch('https://cdn.counter.dev/script.js', {
          cache: 'no-store',
        });
        if (!response.ok) {
          scriptBlocked = true;
        }
      } catch {
        scriptBlocked = true;
      }

      if (scriptBlocked) {
        setIsBlocked(true);
        setIsChecking(false);
        return;
      }

      // Test 2: Check if tracking endpoint is blocked
      // Use PerformanceObserver to detect blocked requests to t.counter.dev
      try {
        const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        for (const entry of entries) {
          if (entry.name.includes('t.counter.dev') || entry.name.includes('counter.dev/track')) {
            // If the request was made but got 0 bytes transferred, it was likely blocked
            if (entry.transferSize === 0 && entry.decodedBodySize === 0 && entry.encodedBodySize === 0) {
              trackingBlocked = true;
              break;
            }
          }
        }
      } catch {
        // PerformanceObserver not supported, fall through to other checks
      }

      // Test 3: Try to directly test the tracking endpoint
      // Some adblockers block specific domains entirely
      if (!trackingBlocked) {
        try {
          // Use an image request to test if t.counter.dev is reachable
          // This won't trigger CORS but will fail if the domain is blocked
          const testBlocked = await new Promise<boolean>((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
              resolve(false); // Timeout means we can't determine, assume not blocked
            }, 3000);
            
            img.onload = () => {
              clearTimeout(timeout);
              resolve(false); // Loaded = not blocked
            };
            
            img.onerror = () => {
              clearTimeout(timeout);
              // Check if the error is due to blocking vs normal 404
              // Blocked requests typically fail immediately
              resolve(true);
            };
            
            // Use a cache-busting query param
            img.src = `https://t.counter.dev/pixel.gif?_=${Date.now()}`;
          });
          
          if (testBlocked) {
            // Double-check: try fetching and check for network error vs CORS
            try {
              await fetch(`https://t.counter.dev/pixel?_=${Date.now()}`, {
                mode: 'no-cors',
                cache: 'no-store',
              });
              // If fetch succeeds in no-cors mode, not blocked
            } catch {
              // Network error in no-cors mode = blocked by client
              trackingBlocked = true;
            }
          }
        } catch {
          // If all tests fail, check performance entries one more time
        }
      }

      // Test 4: Set up observer for future blocked requests
      if (!trackingBlocked && typeof PerformanceObserver !== 'undefined') {
        try {
          observerRef.current = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name.includes('t.counter.dev')) {
                const resourceEntry = entry as PerformanceResourceTiming;
                if (resourceEntry.transferSize === 0 && resourceEntry.decodedBodySize === 0) {
                  setIsBlocked(true);
                }
              }
            }
          });
          
          observerRef.current.observe({ entryTypes: ['resource'] });
          
          // Give it a moment to catch any pending requests
          await new Promise(resolve => setTimeout(resolve, 1500));
        } catch {
          // Observer not supported
        }
      }

      setIsBlocked(trackingBlocked);
      setIsChecking(false);
    };

    checkAnalyticsBlocked();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
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
