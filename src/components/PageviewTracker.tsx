import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const NAMESPACE = 'cswstudying';
const PAGEVIEWS_KEY = 'pageviews';
const BASE_URL = 'https://api.counterapi.dev/v1';

/**
 * PageviewTracker - Tracks SPA page navigations
 * 
 * This component increments the pageview counter on each route change.
 * The initial pageview is handled by useCounterAPIStats hook, so this
 * component skips the first render to avoid double-counting.
 */
export const PageviewTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial load (handled by useCounterAPIStats)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Increment pageview on route change
    fetch(`${BASE_URL}/${NAMESPACE}/${PAGEVIEWS_KEY}/up`).catch(() => {
      // Silently fail - not critical
    });
  }, [location.pathname]);

  return null;
};
