# Cloudflare Analytics with GitHub Actions

## Overview

This guide explains how to automatically fetch Cloudflare Web Analytics data every 30 minutes using GitHub Actions and display it on your website. This approach keeps your API credentials secure and works perfectly with GitHub Pages hosting.

**How it works:**
1. GitHub Actions runs a scheduled workflow every 30 minutes
2. The workflow fetches analytics data from Cloudflare's GraphQL API
3. Data is saved to `public/analytics.json` in your repository
4. Your website reads this static JSON file to display stats

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Get Your Cloudflare Zone ID](#step-1-get-your-cloudflare-zone-id)
3. [Step 2: Create a Cloudflare API Token](#step-2-create-a-cloudflare-api-token)
4. [Step 3: Add Secrets to GitHub](#step-3-add-secrets-to-github)
5. [Step 4: Create the GitHub Actions Workflow](#step-4-create-the-github-actions-workflow)
6. [Step 5: Create the Initial Analytics JSON File](#step-5-create-the-initial-analytics-json-file)
7. [Step 6: Create the Analytics Display Component](#step-6-create-the-analytics-display-component)
8. [Step 7: Add Component to Your Page](#step-7-add-component-to-your-page)
9. [Step 8: Push Changes and Test](#step-8-push-changes-and-test)
10. [Step 9: Verify the Workflow](#step-9-verify-the-workflow)
11. [Troubleshooting](#troubleshooting)
12. [Customization Options](#customization-options)

---

## Prerequisites

Before starting, ensure you have:

| Requirement | Purpose |
|-------------|---------|
| Cloudflare account | With Web Analytics enabled on your site |
| GitHub account | Repository connected to your project |
| GitHub Desktop | For pushing changes (already installed from hosting guide) |
| VS Code | For editing files (already installed from hosting guide) |

---

## Step 1: Get Your Cloudflare Zone ID

Your Zone ID identifies your website in Cloudflare's system.

### 1.1 Log into Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Sign in with your account

### 1.2 Navigate to Your Website

1. Click on your website/domain in the dashboard
2. You'll be taken to the Overview page for that site

### 1.3 Find Your Zone ID

1. Scroll down on the Overview page
2. Look at the **right sidebar** under "API"
3. Find **Zone ID** - it's a long string like `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`
4. Click the **Copy** button next to it

### 1.4 Save Your Zone ID

1. Open a text file (Notepad, TextEdit, or VS Code)
2. Paste your Zone ID and label it:
   ```
   Zone ID: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```
3. Keep this file open - you'll need it later

**Screenshot reference:** The Zone ID is in the right sidebar, in a box labeled "API" with "Zone ID" and "Account ID" listed.

---

## Step 2: Create a Cloudflare API Token

An API token allows GitHub Actions to securely access your analytics data.

### 2.1 Navigate to API Tokens

1. In Cloudflare dashboard, click your **profile icon** (top right)
2. Click **My Profile**
3. Click **API Tokens** in the left sidebar
4. Click the blue **Create Token** button

### 2.2 Create a Custom Token

1. Scroll down to **Custom token**
2. Click **Get started** next to "Create Custom Token"

### 2.3 Configure Token Permissions

Fill in the form as follows:

| Field | Value |
|-------|-------|
| **Token name** | `GitHub Actions Analytics` (or any name you prefer) |
| **Permissions** | See below |
| **Zone Resources** | See below |

**For Permissions:**
1. Click **+ Add more** if needed
2. Set the first dropdown to: `Zone`
3. Set the second dropdown to: `Analytics`
4. Set the third dropdown to: `Read`

Your permissions row should read: `Zone - Analytics - Read`

**For Zone Resources:**
1. Set the first dropdown to: `Include`
2. Set the second dropdown to: `Specific zone`
3. Set the third dropdown to: Your website's domain name

### 2.4 Create the Token

1. Scroll down and click **Continue to summary**
2. Review the summary - it should show:
   - Token name: GitHub Actions Analytics
   - Permissions: Zone Analytics Read
   - Zone Resources: Your domain
3. Click **Create Token**

### 2.5 Copy and Save the Token

**IMPORTANT:** You will only see this token ONCE!

1. The token will be displayed - it looks like a long random string
2. Click **Copy** to copy it
3. Paste it in your text file:
   ```
   Zone ID: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   API Token: your_token_here_abc123xyz
   ```
4. **Save this file securely** - you cannot retrieve this token again!

If you lose the token, you'll need to delete it and create a new one.

---

## Step 3: Add Secrets to GitHub

GitHub Secrets securely store your credentials so they're never exposed in code.

### 3.1 Open Your Repository on GitHub

1. Go to [github.com](https://github.com)
2. Navigate to your project repository
3. You should be on the main page of your repo

### 3.2 Navigate to Settings

1. Click the **Settings** tab (gear icon, far right of the tabs)
2. If you don't see Settings, you may not have admin access to the repo

### 3.3 Open Secrets and Variables

1. In the left sidebar, scroll down to **Security**
2. Click **Secrets and variables**
3. Click **Actions**

### 3.4 Add the Zone ID Secret

1. Click the green **New repository secret** button
2. Fill in:
   - **Name:** `CLOUDFLARE_ZONE_ID`
   - **Secret:** Paste your Zone ID (from your text file)
3. Click **Add secret**

### 3.5 Add the API Token Secret

1. Click **New repository secret** again
2. Fill in:
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Secret:** Paste your API Token (from your text file)
3. Click **Add secret**

### 3.6 Verify Secrets

You should now see two secrets listed:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ZONE_ID`

**Note:** You can't view the secret values after adding them - this is a security feature.

---

## Step 4: Create the GitHub Actions Workflow

This workflow file tells GitHub to run the analytics fetch every 30 minutes.

### 4.1 Open Your Project in VS Code

1. Open GitHub Desktop
2. Make sure your project repository is selected
3. Click **Repository** menu → **Open in Visual Studio Code**

### 4.2 Create the Workflows Directory

1. In VS Code, look at the file explorer on the left
2. Right-click on the root folder (top of the file list)
3. Click **New Folder**
4. Name it `.github` (with the dot at the beginning)
5. Right-click on the new `.github` folder
6. Click **New Folder**
7. Name it `workflows`

Your folder structure should now have: `.github/workflows/`

### 4.3 Create the Workflow File

1. Right-click on the `workflows` folder
2. Click **New File**
3. Name it `fetch-analytics.yml`
4. Copy and paste the following content:

```yaml
name: Fetch Cloudflare Analytics

on:
  schedule:
    # Runs every 30 minutes
    - cron: '*/30 * * * *'
  workflow_dispatch: # Allows manual trigger from GitHub

jobs:
  fetch-analytics:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Fetch Cloudflare Analytics
        run: |
          # Calculate date range (last 7 days)
          END_DATE=$(date -u +"%Y-%m-%d")
          START_DATE=$(date -u -d "7 days ago" +"%Y-%m-%d")
          
          echo "Fetching analytics from $START_DATE to $END_DATE"
          
          # Fetch analytics data from Cloudflare GraphQL API
          RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/graphql" \
            -H "Authorization: Bearer ${{ secrets.CLOUDFLARE_API_TOKEN }}" \
            -H "Content-Type: application/json" \
            --data '{
              "query": "query { viewer { zones(filter: { zoneTag: \"${{ secrets.CLOUDFLARE_ZONE_ID }}\" }) { httpRequests1dGroups(limit: 7, filter: { date_geq: \"'"$START_DATE"'\", date_leq: \"'"$END_DATE"'\" }) { dimensions { date } sum { requests pageViews countryMap { clientCountryName requests } } uniq { uniques } } } } }"
            }')
          
          # Check if we got a valid response
          if echo "$RESPONSE" | jq -e '.data.viewer.zones[0]' > /dev/null 2>&1; then
            echo "Successfully fetched analytics data"
            
            # Process and format the data
            ANALYTICS_DATA=$(echo "$RESPONSE" | jq '{
              lastUpdated: now | strftime("%Y-%m-%dT%H:%M:%SZ"),
              totalPageViews: [.data.viewer.zones[0].httpRequests1dGroups[].sum.pageViews] | add,
              totalRequests: [.data.viewer.zones[0].httpRequests1dGroups[].sum.requests] | add,
              uniqueVisitors: [.data.viewer.zones[0].httpRequests1dGroups[].uniq.uniques] | add,
              dailyStats: [.data.viewer.zones[0].httpRequests1dGroups[] | {
                date: .dimensions.date,
                pageViews: .sum.pageViews,
                requests: .sum.requests,
                uniqueVisitors: .uniq.uniques
              }] | sort_by(.date) | reverse,
              topCountries: (
                [.data.viewer.zones[0].httpRequests1dGroups[].sum.countryMap[]] 
                | group_by(.clientCountryName) 
                | map({country: .[0].clientCountryName, requests: (map(.requests) | add)}) 
                | sort_by(-.requests) 
                | .[0:5]
              )
            }')
            
            # Save to file
            echo "$ANALYTICS_DATA" > public/analytics.json
            echo "Saved analytics to public/analytics.json"
            
          else
            echo "Failed to fetch analytics data"
            echo "Response: $RESPONSE"
            
            # Create error state file
            echo '{
              "lastUpdated": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
              "error": "Failed to fetch analytics data",
              "totalPageViews": 0,
              "totalRequests": 0,
              "uniqueVisitors": 0,
              "dailyStats": [],
              "topCountries": []
            }' > public/analytics.json
          fi
      
      - name: Commit and push if changed
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add public/analytics.json
          git diff --staged --quiet || git commit -m "Update analytics data [skip ci]"
          git push
```

5. Save the file (Ctrl+S or Cmd+S)

### 4.4 Understanding the Workflow

| Section | Purpose |
|---------|---------|
| `schedule: cron` | Runs every 30 minutes |
| `workflow_dispatch` | Allows you to run manually from GitHub |
| `Fetch Cloudflare Analytics` | Calls Cloudflare API with your credentials |
| `Commit and push` | Saves the data to your repo |

---

## Step 5: Create the Initial Analytics JSON File

The website needs this file to exist before the first workflow runs.

### 5.1 Create the JSON File

1. In VS Code, navigate to the `public` folder
2. Right-click on `public`
3. Click **New File**
4. Name it `analytics.json`
5. Paste the following content:

```json
{
  "lastUpdated": "2024-01-01T00:00:00Z",
  "totalPageViews": 0,
  "totalRequests": 0,
  "uniqueVisitors": 0,
  "dailyStats": [],
  "topCountries": [],
  "note": "This file will be automatically updated by GitHub Actions every 30 minutes"
}
```

6. Save the file

---

## Step 6: Create the Analytics Display Component

This React component will display the analytics data on your website.

### 6.1 Create the Component File

1. In VS Code, navigate to `src/components`
2. Right-click on `components`
3. Click **New File**
4. Name it `CloudflareAnalytics.tsx`
5. Paste the following content:

```tsx
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { BarChart3, Users, Eye, Globe, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailyStat {
  date: string;
  pageViews: number;
  requests: number;
  uniqueVisitors: number;
}

interface CountryStat {
  country: string;
  requests: number;
}

interface AnalyticsData {
  lastUpdated: string;
  totalPageViews: number;
  totalRequests: number;
  uniqueVisitors: number;
  dailyStats: DailyStat[];
  topCountries: CountryStat[];
  error?: string;
}

const CloudflareAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Add cache-busting parameter
      const response = await fetch(`/analytics.json?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error('Failed to load analytics data');
      }
      
      const analyticsData = await response.json();
      setData(analyticsData);
      setLastFetch(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Auto-refresh every 30 minutes to match GitHub Actions schedule
    const interval = setInterval(fetchAnalytics, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading && !data) {
    return (
      <Card className="p-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-48 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
          <div className="h-20 bg-muted rounded" />
        </div>
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <div className="flex items-center justify-between">
          <p className="text-destructive">Failed to load analytics: {error}</p>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="p-6 border-2 border-primary/20 bg-primary/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold">Site Analytics</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last updated: {formatDate(data.lastUpdated)}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchAnalytics}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {data.error && (
        <p className="text-amber-600 text-sm mb-4 p-2 bg-amber-50 dark:bg-amber-950 rounded">
          ⚠️ {data.error}
        </p>
      )}

      {/* Main Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-background rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Page Views (7 days)</span>
          </div>
          <p className="text-3xl font-bold">{formatNumber(data.totalPageViews)}</p>
        </div>
        
        <div className="p-4 bg-background rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-science" />
            <span className="text-sm text-muted-foreground">Unique Visitors</span>
          </div>
          <p className="text-3xl font-bold">{formatNumber(data.uniqueVisitors)}</p>
        </div>
        
        <div className="p-4 bg-background rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-math" />
            <span className="text-sm text-muted-foreground">Total Requests</span>
          </div>
          <p className="text-3xl font-bold">{formatNumber(data.totalRequests)}</p>
        </div>
      </div>

      {/* Daily Breakdown */}
      {data.dailyStats.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Daily Breakdown</h3>
          <div className="space-y-2">
            {data.dailyStats.slice(0, 7).map((stat) => (
              <div 
                key={stat.date} 
                className="flex items-center justify-between p-3 bg-background rounded-lg border"
              >
                <span className="font-medium">
                  {new Date(stat.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <Eye className="h-4 w-4 inline mr-1" />
                    {formatNumber(stat.pageViews)}
                  </span>
                  <span className="text-muted-foreground">
                    <Users className="h-4 w-4 inline mr-1" />
                    {formatNumber(stat.uniqueVisitors)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Countries */}
      {data.topCountries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Top Countries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {data.topCountries.map((country, index) => (
              <div 
                key={country.country} 
                className="p-3 bg-background rounded-lg border text-center"
              >
                <span className="text-lg font-bold">{index + 1}</span>
                <p className="text-sm font-medium truncate" title={country.country}>
                  {country.country}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(country.requests)} requests
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Analytics data updates automatically every 30 minutes via GitHub Actions
      </p>
    </Card>
  );
};

export default CloudflareAnalytics;
```

6. Save the file

---

## Step 7: Add Component to Your Page

Now add the analytics display to your homepage.

### 7.1 Open the Index Page

1. In VS Code, navigate to `src/pages/Index.tsx`
2. Open the file

### 7.2 Import the Component

1. Find the import statements at the top of the file
2. Add this line with the other imports:

```tsx
import CloudflareAnalytics from '@/components/CloudflareAnalytics';
```

### 7.3 Add the Component to the Page

1. Find a good location in the JSX (after the Credits Section is recommended)
2. Add the component:

```tsx
{/* Analytics Section */}
<div className="mt-16 max-w-4xl mx-auto">
  <CloudflareAnalytics />
</div>
```

### 7.4 Example Placement

Your Index.tsx should have something like this near the bottom:

```tsx
        {/* Credits Section */}
        <CreditsSection />

        {/* Analytics Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <CloudflareAnalytics />
        </div>

        {/* Bottom Ad Placeholder */}
        <div className="mt-16 max-w-4xl mx-auto">
          <AdPlaceholder position="bottom" />
        </div>
```

5. Save the file

---

## Step 8: Push Changes and Test

### 8.1 Commit Changes in GitHub Desktop

1. Open GitHub Desktop
2. You should see all the changed files listed:
   - `.github/workflows/fetch-analytics.yml`
   - `public/analytics.json`
   - `src/components/CloudflareAnalytics.tsx`
   - `src/pages/Index.tsx`
3. In the bottom left, enter a commit message:
   - Summary: `Add Cloudflare analytics integration`
   - Description: `Adds GitHub Actions workflow to fetch analytics every 30 minutes`
4. Click **Commit to main** (or your default branch)
5. Click **Push origin** to upload to GitHub

### 8.2 Wait for Deployment

1. Go to your GitHub repository in a browser
2. Click the **Actions** tab
3. You should see your deployment workflow running
4. Wait for it to complete (green checkmark)

---

## Step 9: Verify the Workflow

### 9.1 Manually Trigger the Analytics Workflow

1. Go to your GitHub repository
2. Click the **Actions** tab
3. In the left sidebar, click **Fetch Cloudflare Analytics**
4. Click **Run workflow** button (right side)
5. Click the green **Run workflow** button in the dropdown
6. Wait for the workflow to complete

### 9.2 Check the Results

1. After the workflow completes, go to your repository's main page
2. Navigate to `public/analytics.json`
3. You should see updated analytics data

### 9.3 Verify on Your Website

1. Open your deployed website
2. Scroll to where you placed the analytics component
3. You should see the Site Analytics card with your data

---

## Troubleshooting

### Workflow Fails with "Bad Request"

**Cause:** Invalid API token or Zone ID

**Fix:**
1. Go to Repository → Settings → Secrets and variables → Actions
2. Delete both secrets
3. Re-create them carefully, making sure no extra spaces are copied

### Workflow Fails with "Authentication Error"

**Cause:** API token doesn't have correct permissions

**Fix:**
1. Go to Cloudflare → My Profile → API Tokens
2. Delete the old token
3. Create a new token with `Zone - Analytics - Read` permission
4. Update the `CLOUDFLARE_API_TOKEN` secret in GitHub

### Analytics Show All Zeros

**Cause:** Either no traffic yet, or Zone ID is wrong

**Fix:**
1. Verify Zone ID matches your Cloudflare site
2. Ensure Cloudflare Web Analytics is enabled for your domain
3. Wait for some real traffic to your site

### Component Shows "Failed to Load"

**Cause:** The analytics.json file doesn't exist or has invalid JSON

**Fix:**
1. Check that `public/analytics.json` exists
2. Verify it contains valid JSON
3. Manually run the GitHub Action workflow

### Workflow Runs But Doesn't Update File

**Cause:** Git permissions issue

**Fix:**
1. In your workflow file, ensure `permissions: contents: write` is set
2. Check that the branch isn't protected from automated commits

### Changes Not Showing on Website

**Cause:** Browser caching

**Fix:**
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Wait a few minutes for CDN cache to clear

---

## Customization Options

### Change Update Frequency

Edit the cron schedule in `.github/workflows/fetch-analytics.yml`:

| Cron Expression | Frequency |
|-----------------|-----------|
| `*/30 * * * *` | Every 30 minutes |
| `0 * * * *` | Every hour |
| `0 */6 * * *` | Every 6 hours |
| `0 0 * * *` | Once daily at midnight |

### Change Date Range

In the workflow file, modify the `START_DATE` calculation:

```bash
# Last 7 days (default)
START_DATE=$(date -u -d "7 days ago" +"%Y-%m-%d")

# Last 30 days
START_DATE=$(date -u -d "30 days ago" +"%Y-%m-%d")

# Last 1 day
START_DATE=$(date -u -d "1 day ago" +"%Y-%m-%d")
```

### Show/Hide Sections

In `CloudflareAnalytics.tsx`, you can comment out or remove sections:
- Remove the "Top Countries" section by deleting that JSX block
- Remove the "Daily Breakdown" section similarly
- Customize which stats are shown

### Styling

The component uses your site's design system. Modify:
- `border-primary/20` → Change border color
- `bg-primary/5` → Change background color
- Icon colors (text-primary, text-science, text-math)

---

## Security Notes

| Aspect | Status |
|--------|--------|
| API Token | Stored securely in GitHub Secrets, never exposed |
| Zone ID | Stored securely in GitHub Secrets |
| Analytics Data | Public (saved to public folder) |
| Cloudflare Access | Read-only analytics permission only |

The workflow only has permission to read analytics data - it cannot modify your Cloudflare settings.

---

## Summary Checklist

Before going live, verify:

- [ ] Cloudflare Zone ID saved in GitHub Secrets
- [ ] Cloudflare API Token saved in GitHub Secrets
- [ ] API Token has `Zone - Analytics - Read` permission
- [ ] `.github/workflows/fetch-analytics.yml` file created
- [ ] `public/analytics.json` file exists
- [ ] `CloudflareAnalytics.tsx` component created
- [ ] Component imported and added to Index.tsx
- [ ] All changes committed and pushed
- [ ] Workflow ran successfully at least once
- [ ] Analytics display shows data on website

---

## Related Documentation

- [08-GITHUB-HOSTING-GUIDE.md](./08-GITHUB-HOSTING-GUIDE.md) - How to host on GitHub Pages
- [Cloudflare Web Analytics Docs](https://developers.cloudflare.com/analytics/web-analytics/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

## Last Updated

January 2026
