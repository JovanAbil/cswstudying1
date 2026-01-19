# CounterAPI.dev Analytics Integration

## Overview

This guide explains the CounterAPI.dev integration, which provides real-time visitor and pageview tracking via a simple REST API.

---

## Table of Contents

1. [What is CounterAPI.dev](#what-is-counterapidev)
2. [How It Works](#how-it-works)
3. [API Endpoints](#api-endpoints)
4. [Initial Setup](#initial-setup)
5. [SPA Tracking](#spa-tracking)
6. [Managing Counters](#managing-counters)
7. [Troubleshooting](#troubleshooting)

---

## What is CounterAPI.dev

CounterAPI.dev is a free, simple counter API service. It provides:

- Real-time counter values via REST API
- No authentication required
- Unlimited counters
- No cookie consent needed
- High uptime and reliability
- Rarely blocked by adblockers

**Base URL:** `https://api.counterapi.dev/v1`

---

## How It Works

### Architecture

```
User visits site
       ↓
useCounterAPIStats hook fetches/increments counters
       ↓
CounterAPI.dev returns current count
       ↓
CreditsSection displays live stats
       ↓
PageviewTracker increments on route changes
```

### Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useCounterAPIStats.ts` | Fetches and increments counters on load |
| `src/components/PageviewTracker.tsx` | Tracks SPA navigation pageviews |
| `src/components/CreditsSection.tsx` | Displays live stats |

### Namespace and Keys

The counters use:
- **Namespace:** `cswstudying`
- **Visitors Key:** `visitors`
- **Pageviews Key:** `pageviews`

---

## API Endpoints

### Read a counter (without incrementing)

```
GET https://api.counterapi.dev/v1/{namespace}/{key}
```

Response:
```json
{
  "count": 254
}
```

### Increment a counter

```
GET https://api.counterapi.dev/v1/{namespace}/{key}/up
```

Response:
```json
{
  "count": 255
}
```

### Set a counter to a specific value

```
GET https://api.counterapi.dev/v1/{namespace}/{key}/set/{value}
```

Response:
```json
{
  "count": 1000
}
```

### Decrement a counter

```
GET https://api.counterapi.dev/v1/{namespace}/{key}/down
```

---

## Initial Setup

### IMPORTANT: Initialize Counters Before Going Live

Before deploying, you need to set your counters to your existing totals. Open these URLs in your browser **once**:

```
https://api.counterapi.dev/v1/cswstudying/visitors/set/254
https://api.counterapi.dev/v1/cswstudying/pageviews/set/1801
```

Replace `254` and `1801` with your actual current totals.

### Verify Setup

After initialization, verify the counters exist:

```
https://api.counterapi.dev/v1/cswstudying/visitors
https://api.counterapi.dev/v1/cswstudying/pageviews
```

You should see JSON responses with your initialized counts.

---

## SPA Tracking

### How Visitors Are Counted

1. On page load, `useCounterAPIStats` checks if this is a new session
2. If new session: Increments `visitors` counter AND `pageviews` counter
3. If existing session: Only increments `pageviews` counter
4. Session state stored in `sessionStorage` (clears when browser closes)

### How Pageviews Are Counted

1. Initial pageview: Handled by `useCounterAPIStats` hook
2. Subsequent navigations: `PageviewTracker` component increments on route changes
3. Uses React Router's `useLocation` hook to detect navigation

### Session vs. Visitor Logic

```typescript
// New session (new visitor)
sessionStorage.getItem('counterapi_session') === null
→ Increment both visitors AND pageviews

// Existing session (returning visitor in same session)
sessionStorage.getItem('counterapi_session') === 'true'
→ Increment only pageviews
```

---

## Managing Counters

### Check Current Counts

Visit these URLs in your browser:

- Visitors: `https://api.counterapi.dev/v1/cswstudying/visitors`
- Pageviews: `https://api.counterapi.dev/v1/cswstudying/pageviews`

### Reset or Adjust Counters

To set a counter to a specific value:

```
https://api.counterapi.dev/v1/cswstudying/visitors/set/500
https://api.counterapi.dev/v1/cswstudying/pageviews/set/3000
```

### Fallback Values

If the API is unavailable, the app uses:
1. **localStorage cache:** Last successfully fetched values
2. **Baseline values:** Hardcoded in `useCounterAPIStats.ts` (254 visitors, 1801 pageviews)

Update baseline values if needed:

```typescript
// src/hooks/useCounterAPIStats.ts
const BASELINE_VISITORS = 254;
const BASELINE_PAGEVIEWS = 1801;
```

---

## Troubleshooting

### Stats Not Updating

1. **Check API directly:** Visit `https://api.counterapi.dev/v1/cswstudying/visitors` in browser
2. **Clear session:** Close browser completely and reopen
3. **Check console:** Look for fetch errors in browser DevTools
4. **Network issues:** CounterAPI.dev may have temporary outages

### Double-Counting Issues

If pageviews seem to increment too fast:

1. Check that `PageviewTracker` skips first render (see `isFirstRender` ref)
2. Ensure `useCounterAPIStats` only runs once per page load
3. Check for multiple component mounts in development (React Strict Mode)

### Counters Not Initialized

If you see very low or incorrect numbers:

1. Initialize counters using the `/set/{value}` endpoint
2. Verify initialization by checking the counter directly
3. Update `BASELINE_VISITORS` and `BASELINE_PAGEVIEWS` as fallbacks

### Adblocker Blocking API

CounterAPI.dev is rarely blocked, but if it is:

1. The app will fall back to cached values (localStorage)
2. If no cache, baseline values are shown
3. The UI shows "Cached stats" instead of "Live stats"

### API Rate Limits

CounterAPI.dev is free and has generous limits. However:

- Avoid calling the API excessively (e.g., in a loop)
- The current implementation is efficient (one call per page load + one per navigation)

---

## Comparison with Other Analytics

| Feature | CounterAPI.dev | Counter.dev | Cloudflare Analytics |
|---------|---------------|-------------|---------------------|
| Public API | ✅ Yes | ❌ No | ✅ Yes (with auth) |
| Real-time | ✅ Instant | ✅ Instant | ❌ ~24hr delay |
| Free tier | ✅ Unlimited | ✅ Unlimited | ✅ Basic |
| Authentication | ❌ Not needed | ✅ Account required | ✅ API token required |
| Dashboard | ❌ DIY | ✅ Built-in | ✅ Built-in |
| Adblocker resistant | ✅ High | ⚠️ Medium | ⚠️ Medium |
| Setup complexity | ✅ Very simple | ✅ Simple | ⚠️ Moderate |

---

## Last Updated

January 2026
