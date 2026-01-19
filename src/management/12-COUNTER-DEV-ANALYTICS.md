# Counter.dev Analytics Integration

## Overview

This guide explains the Counter.dev analytics integration, which provides real-time visitor tracking with minimal setup. Counter.dev is the **primary analytics provider** for CSW Studying.

---

## Table of Contents

1. [What is Counter.dev](#what-is-counterdev)
2. [How It Works](#how-it-works)
3. [SPA Tracking](#spa-tracking)
4. [Adblocker Detection](#adblocker-detection)
5. [Dashboard Access](#dashboard-access)
6. [Manual Stats Update](#manual-stats-update)

---

## What is Counter.dev

Counter.dev is a free, privacy-friendly, real-time analytics service. It requires no cookie consent banners and provides:

- Real-time visitor counts
- Page view tracking
- Referrer tracking
- Country/region data
- Device/browser information

**Dashboard URL:** [counter.dev](https://counter.dev)

---

## How It Works

The tracking script is added to `index.html`:

```html
<script src="https://cdn.counter.dev/script.js" data-id="YOUR_ID" data-utcoffset="-5"></script>
```

| Attribute | Purpose |
|-----------|---------|
| `src` | Counter.dev tracking script CDN URL |
| `data-id` | Your unique Counter.dev account identifier |
| `data-utcoffset` | Timezone offset for accurate daily stats |

---

## SPA Tracking

Counter.dev automatically handles Single Page Application (SPA) navigation via the History API. When users navigate between routes in the React app:

1. The script detects `pushState` and `replaceState` calls
2. Each route change is tracked as a new page view
3. No additional configuration needed

**Note:** The script only needs to be loaded once in `index.html` - it will track all SPA navigation automatically.

---

## Adblocker Detection

### Why Detection is Needed

Many adblockers block analytics scripts, including Counter.dev. When blocked:
- No visitor data is recorded
- Site usage metrics become inaccurate
- We can't understand how students use the platform

### Implementation

The `AdBlockDetector` component (`src/components/AdBlockDetector.tsx`) checks if Counter.dev is accessible:

1. **Detection Methods:**
   - Attempts to fetch the Counter.dev script
   - Tests image loading from Counter.dev CDN
   - Checks if script elements exist in DOM

2. **User Experience:**
   - If blocked: Shows an **undismissable popup**
   - User must disable adblocker and refresh
   - Popup cannot be closed any other way

3. **Design Rationale:**
   - Analytics help improve the platform for students
   - Accurate usage data guides feature development
   - The popup is intentionally persistent to ensure compliance

### Component Location

```
src/components/AdBlockDetector.tsx
```

### Modifying Detection Behavior

To change detection sensitivity or popup behavior, edit:

```typescript
// src/components/AdBlockDetector.tsx

// Detection timeout (ms)
const timeoutId = setTimeout(() => controller.abort(), 3000);

// Wait time before final check (ms)
await new Promise(resolve => setTimeout(resolve, 2000));
```

---

## Dashboard Access

1. Go to [counter.dev](https://counter.dev)
2. Log in with your account
3. View real-time stats for your site

**Features available:**
- Live visitor count
- Page views by URL
- Referrer sources
- Geographic distribution
- Device/browser breakdown

---

## Manual Stats Update

Counter.dev does not provide a public API for fetching visitor counts programmatically. To display stats on the website:

### Current Implementation

Stats are manually updated in `src/components/CreditsSection.tsx`:

```typescript
// Update these values periodically from Counter.dev dashboard
const visitorCount = "1,234"; // Get from dashboard
```

### How to Update

1. Log into [counter.dev](https://counter.dev)
2. Note the current visitor/page view counts
3. Open `src/components/CreditsSection.tsx`
4. Update the displayed values
5. Commit and deploy the changes

### Update Frequency

Recommended: Update monthly or after significant milestones.

---

## Analytics Removed

**Cloudflare Analytics has been removed** from this project. The guide at `11-CLOUDFLARE-ANALYTICS-GITHUB-ACTIONS.md` is kept for reference only in case GitHub Actions data fetching is needed for other purposes in the future.

---

## Troubleshooting

### Data Not Appearing in Dashboard

1. **Wait 1-5 minutes** - Initial data may take time to appear
2. **Check browser DevTools** - Look for network requests to `counter.dev`
3. **Test in incognito** - Ensures no cached states
4. **Verify script in HTML** - Check `index.html` has the script

### Adblocker Popup Showing Incorrectly

If the popup shows when Counter.dev is actually accessible:

1. Check network conditions (slow connections may cause false positives)
2. Increase timeout values in `AdBlockDetector.tsx`
3. Verify CDN is not experiencing outages

### Script Not Loading

Common causes:
- Content Security Policy blocking external scripts
- Network firewall rules
- Browser extensions other than adblockers

---

## Last Updated

January 2026
