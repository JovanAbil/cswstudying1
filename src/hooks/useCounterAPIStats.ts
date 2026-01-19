import { useState, useEffect, useRef } from 'react';

const NAMESPACE = 'cswstudying';
const VISITORS_KEY = 'visitors';
const PAGEVIEWS_KEY = 'pageviews';
const BASE_URL = 'https://api.counterapi.dev/v1';

// Baseline values - your existing totals before switching to CounterAPI.dev
const BASELINE_VISITORS = 254;
const BASELINE_PAGEVIEWS = 1801;

interface CounterAPIResponse {
  count: number;
}

interface CounterAPIStats {
  visitors: number;
  pageviews: number;
  loading: boolean;
  error: string | null;
  isLive: boolean;
}

export const useCounterAPIStats = (): CounterAPIStats => {
  const [visitors, setVisitors] = useState<number>(BASELINE_VISITORS);
  const [pageviews, setPageviews] = useState<number>(BASELINE_PAGEVIEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const hasIncremented = useRef(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Check if this is a new session (new visitor)
        const sessionKey = 'counterapi_session';
        const isNewSession = !sessionStorage.getItem(sessionKey);
        
        let visitorsUrl = `${BASE_URL}/${NAMESPACE}/${VISITORS_KEY}`;
        let pageviewsUrl = `${BASE_URL}/${NAMESPACE}/${PAGEVIEWS_KEY}`;
        
        // On first visit of session, increment visitor count
        if (isNewSession && !hasIncremented.current) {
          visitorsUrl += '/up';
          sessionStorage.setItem(sessionKey, 'true');
          hasIncremented.current = true;
        }
        
        // Always increment pageview on initial load
        pageviewsUrl += '/up';
        
        const [visitorsRes, pageviewsRes] = await Promise.all([
          fetch(visitorsUrl),
          fetch(pageviewsUrl)
        ]);
        
        if (!visitorsRes.ok || !pageviewsRes.ok) {
          throw new Error('API request failed');
        }
        
        const visitorsData: CounterAPIResponse = await visitorsRes.json();
        const pageviewsData: CounterAPIResponse = await pageviewsRes.json();
        
        setVisitors(visitorsData.count);
        setPageviews(pageviewsData.count);
        setIsLive(true);
        setLoading(false);
        
        // Cache successful values in localStorage
        localStorage.setItem('counterapi_cache', JSON.stringify({
          visitors: visitorsData.count,
          pageviews: pageviewsData.count,
          timestamp: Date.now()
        }));
      } catch (err) {
        console.error('CounterAPI.dev fetch failed:', err);
        
        // Try to use cached values
        const cached = localStorage.getItem('counterapi_cache');
        if (cached) {
          try {
            const { visitors: cachedVisitors, pageviews: cachedPageviews } = JSON.parse(cached);
            setVisitors(cachedVisitors);
            setPageviews(cachedPageviews);
          } catch {
            // Use baseline values
          }
        }
        
        setError('Using cached stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { visitors, pageviews, loading, error, isLive };
};
