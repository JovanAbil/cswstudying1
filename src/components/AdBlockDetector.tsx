import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const AdBlockDetector = () => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAnalyticsBlocked = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));

      let scriptBlocked = false;
      let trackingBlocked = false;

      // Test 1: Check if script can be fetched
      try {
        await fetch('https://cdn.counter.dev/script.js', { cache: 'no-store' });
      } catch {
        scriptBlocked = true;
      }

      // Test 2: Check if tracking endpoint is blocked using sendBeacon
      try {
        const beaconSent = navigator.sendBeacon('https://t.counter.dev/trackpage', '');
        if (!beaconSent) {
          trackingBlocked = true;
        }
      } catch {
        trackingBlocked = true;
      }

      setIsBlocked(scriptBlocked || trackingBlocked);
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
          Analytics Blocked
        </h2>
        
        <p className="text-center text-muted-foreground mb-6">
          A blocker or privacy setting is preventing analytics from loading. This helps us understand how students use the site.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-foreground mb-2">Common causes:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Adblocker extensions (uBlock, AdGuard)</li>
            <li>Brave Shields or Firefox strict mode</li>
            <li>Antivirus web protection</li>
            <li>School/work device policies</li>
          </ul>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>To continue:</strong> Disable any blockers for this site, then refresh.
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Refresh Page
        </button>
      </div>
    </div>
  );
};
