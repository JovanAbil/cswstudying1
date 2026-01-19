import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

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

      // Test 2: Check if the tracking domain is reachable.
      // Important: ResourceTiming is NOT reliable cross-origin (often all sizes are 0),
      // so we instead use a no-cors fetch probe. If an adblocker blocks the request,
      // the promise typically rejects with "Failed to fetch".
      const probeTracking = async (): Promise<boolean> => {
        const url = `https://t.counter.dev/track?_=${Date.now()}`;
        try {
          await fetch(url, {
            mode: 'no-cors',
            cache: 'no-store',
          });
          return false;
        } catch {
          return true;
        }
      };

      // Retry once to avoid false positives from transient network hiccups.
      trackingBlocked = await probeTracking();
      if (trackingBlocked) {
        await new Promise(resolve => setTimeout(resolve, 500));
        trackingBlocked = await probeTracking();
      }

      setIsBlocked(trackingBlocked);
      setIsChecking(false);
    };

    checkAnalyticsBlocked();
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
