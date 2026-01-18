# Complete GitHub Hosting Guide - Remove Lovable and Self-Host

This comprehensive guide walks you through completely removing Lovable and hosting your website on GitHub Pages for free, using **GitHub Desktop** and **VS Code** (no command line required).

---

## Table of Contents

1. [Prerequisites - What You Need](#prerequisites---what-you-need)
2. [Step 1: Export from Lovable to GitHub](#step-1-export-from-lovable-to-github)
3. [Step 2: Install Required Software](#step-2-install-required-software)
4. [Step 3: Clone Repository with GitHub Desktop](#step-3-clone-repository-with-github-desktop)
5. [Step 4: Open Project in VS Code](#step-4-open-project-in-vs-code)
6. [Step 5: Install Dependencies](#step-5-install-dependencies)
7. [Step 6: Remove Lovable Files](#step-6-remove-lovable-files)
8. [Step 7: Configure for GitHub Pages](#step-7-configure-for-github-pages)
9. [Step 8: Create Deployment Workflow](#step-8-create-deployment-workflow)
10. [Step 9: Push Changes and Deploy](#step-9-push-changes-and-deploy)
11. [Step 10: Enable GitHub Pages](#step-10-enable-github-pages)
12. [Troubleshooting Common Issues](#troubleshooting-common-issues)
13. [Making Future Changes](#making-future-changes)
14. [Custom Domain Setup (Optional)](#custom-domain-setup-optional)

---

## Prerequisites - What You Need

Before starting, gather these (all free):

| Item | Where to Get It |
|------|-----------------|
| GitHub Account | [github.com](https://github.com) - Sign up for free |
| GitHub Desktop | [desktop.github.com](https://desktop.github.com) - Download for Windows/Mac |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com) - Download for Windows/Mac |
| Node.js | [nodejs.org](https://nodejs.org) - Download LTS version (20.x or higher) |

**Installing Node.js:**
1. Go to nodejs.org
2. Click the big green button that says "LTS" (Long Term Support)
3. Run the installer
4. Click "Next" through all the steps
5. Restart your computer after installation

---

## Step 1: Export from Lovable to GitHub

### If GitHub is NOT connected yet:

1. Open your Lovable project
2. Click the **GitHub** button in the top menu
3. Click **Connect to GitHub**
4. A popup will ask you to authorize Lovable - click **Authorize**
5. Select your GitHub account
6. Click **Create Repository**
7. Enter a name for your repository (e.g., `my-quiz-app`)
8. Click **Create**
9. Wait for "Connected" to appear

### If GitHub IS already connected:

1. Open your Lovable project
2. Click the **GitHub** button
3. Note the repository name shown - you'll need this
4. Make sure "Synced" shows (your latest code is on GitHub)

---

## Step 2: Install Required Software

### Install GitHub Desktop:

1. Go to [desktop.github.com](https://desktop.github.com)
2. Click **Download for Windows** (or Mac)
3. Run the installer
4. When it opens, click **Sign in to GitHub.com**
5. Enter your GitHub username and password
6. Click **Authorize desktop**
7. Choose your email from the list
8. Click **Finish**

### Install VS Code:

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click **Download for Windows** (or Mac)
3. Run the installer
4. Check all the boxes during installation (especially "Add to PATH")
5. Click "Install" then "Finish"

---

## Step 3: Clone Repository with GitHub Desktop

**"Cloning" = downloading your code from GitHub to your computer**

1. Open **GitHub Desktop**
2. Click **File** → **Clone Repository**
3. Find your repository in the list (or paste the URL)
4. Choose where to save it:
   - Click **Choose...** next to "Local Path"
   - Select **Desktop** (easy to find)
5. Click **Clone**
6. Wait for download to complete
7. You'll see "No local changes" - that's good!

**Your project is now in a folder on your Desktop!**

---

## Step 4: Open Project in VS Code

1. In GitHub Desktop, click **Repository** → **Open in Visual Studio Code**
   - OR manually: Open VS Code, click **File** → **Open Folder**, select your project folder

2. You'll see all your files in the left sidebar

3. **Trust the project**: If VS Code asks "Do you trust the authors?", click **Yes, I trust the authors**

---

## Step 5: Install Dependencies

You need to install the code libraries your project uses.

### Option A: Using VS Code Terminal (Recommended)

1. In VS Code, click **Terminal** → **New Terminal** (or press `Ctrl+`` `)
2. A panel opens at the bottom
3. Type this command and press Enter:
   ```
   npm install
   ```
4. Wait for it to finish (may take 1-2 minutes)
5. You'll see "added X packages" when done

### Option B: Using Command Prompt (Windows)

1. Press `Win + R`
2. Type `cmd` and press Enter
3. Type: `cd Desktop\YOUR_FOLDER_NAME` (replace with your actual folder name)
4. Type: `npm install`
5. Wait for completion

---

## Step 6: Remove Lovable Files

These files are Lovable-specific and need to be modified.

### 6.1 Delete the .github folder (if it exists)

1. In VS Code's file explorer (left sidebar), look for a folder named `.github`
2. If it exists, right-click it → **Delete**
3. Confirm deletion

### 6.2 Modify vite.config.ts

1. In VS Code, click on **vite.config.ts** in the left sidebar
2. You'll see something like this:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

3. **Replace the ENTIRE file** with this (copy and paste):

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // IMPORTANT: Replace YOUR_REPO_NAME with your actual repository name
  // Example: if your repo is "my-quiz-app", use "/my-quiz-app/"
  base: "/YOUR_REPO_NAME/",
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

4. **CRITICAL: Change `/YOUR_REPO_NAME/` to match your actual GitHub repository name!**
   - If your repo is called `quiz-app`, use `base: "/quiz-app/"`
   - If your repo is called `cswstudying`, use `base: "/cswstudying/"`

5. Save the file (Ctrl+S or Cmd+S)

### 6.3 Remove lovable-tagger from package.json

1. Open **package.json** in VS Code
2. Find this section in `devDependencies`:
   ```json
   "lovable-tagger": "^1.0.0",
   ```
3. Delete that entire line
4. Make sure there are no trailing commas causing errors
5. Save the file

### 6.4 Reinstall dependencies

1. In the VS Code terminal, run:
   ```
   npm install
   ```
2. This updates the lock file without lovable-tagger

---

## Step 7: Configure for GitHub Pages

GitHub Pages needs special handling for single-page applications (SPAs).

### 7.1 Create 404.html for routing

1. In VS Code, right-click the **public** folder
2. Click **New File**
3. Name it: `404.html`
4. Paste this content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Single Page App redirect for GitHub Pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    Redirecting...
  </body>
</html>
```

5. Save the file

### 7.2 Update index.html

1. Open **index.html** (in the root folder, NOT in public)
2. Find the `<head>` section
3. Add this script IMMEDIATELY after the opening `<head>` tag:

```html
<script>
  // Handle GitHub Pages SPA redirect
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

So your index.html head section should start like:
```html
<head>
  <script>
    // Handle GitHub Pages SPA redirect
    (function(l) {
      if (l.search[1] === '/') {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <meta charset="UTF-8" />
  <!-- rest of your head content -->
```

4. Save the file

---

## Step 8: Create Deployment Workflow

GitHub Actions will automatically build and deploy your site.

### 8.1 Create the folder structure

1. In VS Code, right-click in the file explorer (left sidebar)
2. Click **New Folder**
3. Name it: `.github`
4. Right-click the `.github` folder
5. Click **New Folder**
6. Name it: `workflows`

### 8.2 Create the workflow file

1. Right-click the `workflows` folder
2. Click **New File**
3. Name it: `deploy.yml`
4. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "./dist"

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Save the file

---

## Step 9: Push Changes and Deploy

Now send all your changes to GitHub.

### Using GitHub Desktop:

1. Open **GitHub Desktop**
2. You should see a list of changed files on the left
3. At the bottom left, you'll see:
   - **Summary (required)**: Type a message like `Set up GitHub Pages deployment`
   - **Description**: Optional, leave blank
4. Click the blue **Commit to main** button
5. Click **Push origin** (top right, or in the center)
6. Wait for push to complete

---

## Step 10: Enable GitHub Pages

Final step - tell GitHub to serve your site.

1. Open your web browser
2. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
3. Click **Settings** (the tab, not the gear)
4. In the left sidebar, click **Pages**
5. Under "Build and deployment":
   - **Source**: Select **GitHub Actions**
6. Go to the **Actions** tab
7. You should see a workflow running (orange circle)
8. Wait for it to complete (green checkmark) - takes 2-3 minutes
9. Go back to **Settings** → **Pages**
10. You'll see: "Your site is live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`"
11. Click the link to visit your live site!

---

## Troubleshooting Common Issues

### Issue: 404 Error on Pages

**Cause**: The `base` path in vite.config.ts doesn't match your repo name.

**Fix**:
1. Open vite.config.ts
2. Check that `base: "/YOUR_REPO_NAME/"` matches EXACTLY
3. Repository name is case-sensitive!
4. Commit and push changes

### Issue: Blank Page

**Cause**: The 404.html redirect isn't working.

**Fix**:
1. Make sure 404.html is in the `public` folder
2. Make sure the script is added to index.html
3. Check the browser console (F12) for errors

### Issue: "Cannot find module 'lovable-tagger'"

**Cause**: The lovable-tagger wasn't removed properly.

**Fix**:
1. Delete the `node_modules` folder
2. Delete the `package-lock.json` file
3. Make sure lovable-tagger is removed from package.json
4. Run `npm install` again

### Issue: Images Not Loading

**Cause**: Image paths start with `/` which doesn't work with GitHub Pages base path.

**Fix**: Images in `public/` folder should work. If not:
1. Check that images are in the correct folder
2. Make sure paths match exactly (case-sensitive)

### Issue: Routing Doesn't Work (Pages Show 404)

**Cause**: GitHub Pages doesn't understand React Router.

**Fix**:
1. Make sure 404.html is in `public/`
2. Make sure the redirect script is in index.html
3. The `pathSegmentsToKeep = 1` is correct for most repos

### Issue: Build Fails in GitHub Actions

**Check the error**:
1. Go to Actions tab in GitHub
2. Click the failed workflow
3. Click on the "build" job
4. Read the error message
5. Common fixes:
   - TypeScript errors: Fix the code error
   - Missing dependencies: Run `npm install` locally first
   - Old Node version: Make sure workflow uses Node 20

---

## Making Future Changes

After your site is live, here's how to make updates:

### 1. Edit files locally

1. Open your project in VS Code
2. Make your changes
3. Save the files

### 2. Test locally (optional but recommended)

1. Open terminal in VS Code
2. Run: `npm run dev`
3. Open browser to `http://localhost:8080`
4. Verify your changes work

### 3. Push to GitHub

1. Open GitHub Desktop
2. You'll see your changed files
3. Write a summary (e.g., "Fixed typo on home page")
4. Click **Commit to main**
5. Click **Push origin**

### 4. Wait for deployment

1. Go to GitHub → Actions tab
2. Watch the workflow run
3. Once green, your site is updated!
4. Takes about 2-3 minutes

---

## Custom Domain Setup (Optional)

If you want to use your own domain like `www.mysite.com`:

### Step 1: Update vite.config.ts

Change the base to just `/`:

```typescript
base: "/",
```

### Step 2: Create CNAME file

1. Create a file called `CNAME` (no extension) in the `public` folder
2. Put your domain on the first line:
   ```
   www.yourdomain.com
   ```

### Step 3: Update 404.html

Change `pathSegmentsToKeep` from `1` to `0`:
```javascript
var pathSegmentsToKeep = 0;
```

### Step 4: Configure DNS

At your domain registrar, add these records:

**For apex domain (yourdomain.com):**
| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**For www subdomain:**
| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR_USERNAME.github.io |

### Step 5: Add domain in GitHub

1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Click Save
4. Wait for DNS to propagate (up to 48 hours)
5. Check "Enforce HTTPS" once available

---

## Quick Reference

| Task | Action |
|------|--------|
| Open project | GitHub Desktop → Repository → Open in VS Code |
| Test locally | Terminal: `npm run dev` → Browser: localhost:8080 |
| Save changes | VS Code: Ctrl+S (or Cmd+S) |
| Commit changes | GitHub Desktop: Write summary → Commit to main |
| Push to GitHub | GitHub Desktop: Push origin |
| View live site | `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/` |
| Check deployment | GitHub.com → Actions tab |

---

## Summary Checklist

Before you consider yourself done, verify:

- [ ] Site loads at GitHub Pages URL
- [ ] All internal links work
- [ ] All pages load (not 404)
- [ ] Quiz functionality works
- [ ] Results page shows correctly
- [ ] Data persists (wrong answers saved)
- [ ] Images load correctly
- [ ] Theme toggle works
- [ ] Mobile view works

**Congratulations! Your site is now fully independent and hosted for free on GitHub Pages!**
