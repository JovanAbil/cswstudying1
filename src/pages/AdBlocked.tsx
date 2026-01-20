import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const AdBlocked = () => {
  const [checking, setChecking] = useState(false);

  const checkAndRedirect = async () => {
    setChecking(true);
    
    // Check if adblocker is still active
    try {
      const response = await fetch('https://cdn.counter.dev/script.js', {
        cache: 'no-store',
      });
      if (!response.ok) {
        setChecking(false);
        return;
      }
    } catch {
      setChecking(false);
      return;
    }

    // Check tracking endpoint
    try {
      await fetch(`https://t.counter.dev/track?_=${Date.now()}`, {
        mode: 'no-cors',
        cache: 'no-store',
      });
      // If we get here, adblocker is disabled - redirect to home
      window.location.href = '/';
    } catch {
      setChecking(false);
    }
  };

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card border-2 border-destructive rounded-xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-destructive/20 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-4 text-destructive">
          Nice Try
        </h1>
        
        <p className="text-center text-muted-foreground mb-6">
          You've been redirected here because an adblocker was detected. Removing page elements won't help - there's nothing to see here.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">
            <strong>To access the site:</strong>
          </p>
          <ol className="text-sm text-muted-foreground mt-2 space-y-1 list-decimal list-inside">
            <li>Disable your adblocker for this site</li>
            <li>Add this site to your whitelist</li>
            <li>Click the button below to verify</li>
          </ol>
        </div>
        
        <button
          onClick={checkAndRedirect}
          disabled={checking}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-5 w-5 ${checking ? 'animate-spin' : ''}`} />
          {checking ? 'Checking...' : 'I Disabled My Adblocker'}
        </button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          Analytics help us understand how students use this site to make it better.
        </p>
      </div>
    </div>
  );
};

export default AdBlocked;
