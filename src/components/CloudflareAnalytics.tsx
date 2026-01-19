import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    __cfBeacon?: {
      load: string;
      spa: boolean;
    };
    __cfRl?: {
      t: (url: string) => void;
    };
  }
}

/**
 * CloudflareAnalytics Component
 * 
 * This component enables proper SPA tracking for Cloudflare Web Analytics.
 * By default, Cloudflare only tracks full page loads, missing client-side
 * React Router navigation. This component listens to route changes and
 * manually triggers Cloudflare's beacon on each navigation.
 * 
 * Requirements:
 * - The Cloudflare beacon script in index.html must have "spa": true
 * - This component must be rendered inside BrowserRouter
 */
export const CloudflareAnalytics = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial load - Cloudflare handles that automatically
    // Only track subsequent client-side navigations
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Send the pageview to Cloudflare
    if (window.__cfRl && typeof window.__cfRl.t === 'function') {
      window.__cfRl.t(window.location.href);
    }
  }, [location.pathname, location.search]);

  return null; // This component doesn't render anything
};
