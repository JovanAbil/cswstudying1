# GitHub Hosting Guide - Complete Lovable Removal

This guide walks you through removing Lovable completely and hosting your website on GitHub Pages for free.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Export from Lovable to GitHub](#step-1-export-from-lovable-to-github)
3. [Step 2: Clone the Repository](#step-2-clone-the-repository)
4. [Step 3: Remove Lovable-Specific Files](#step-3-remove-lovable-specific-files)
5. [Step 4: Update Configuration for GitHub Pages](#step-4-update-configuration-for-github-pages)
6. [Step 5: Set Up GitHub Actions for Automatic Deployment](#step-5-set-up-github-actions-for-automatic-deployment)
7. [Step 6: Enable GitHub Pages](#step-6-enable-github-pages)
8. [Step 7: Connect a Custom Domain (Optional)](#step-7-connect-a-custom-domain-optional)
9. [Verification Checklist](#verification-checklist)

---

## Prerequisites

Before you start, you need:

- [ ] A GitHub account (free at github.com)
- [ ] Git installed on your computer
- [ ] Node.js installed (version 18 or higher)
- [ ] A code editor (VS Code recommended, free at code.visualstudio.com)

---

## Step 1: Export from Lovable to GitHub

### If you already have a GitHub repository connected:

1. Go to your Lovable project
2. Click on **Settings** (gear icon)
3. Click on **GitHub** tab
4. Your repository URL will be shown - copy it
5. You're done! The code is already on GitHub

### If you DON'T have GitHub connected yet:

1. Go to your Lovable project
2. Click on **Settings** (gear icon)
3. Click on **GitHub** tab
4. Click **Connect to GitHub**
5. Authorize Lovable to access your GitHub
6. Click **Create Repository**
7. Choose a name for your repository
8. Click **Create**
9. Wait for the sync to complete

---

## Step 2: Clone the Repository

### What is "cloning"?
Cloning means downloading a copy of your code from GitHub to your computer.

### How to clone:

1. **Open your terminal/command prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

2. **Navigate to where you want to save the project**
   ```bash
   cd Desktop
   ```
   This puts you in your Desktop folder.

3. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```
   Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with your repository name.

4. **Enter the project folder**
   ```bash
   cd YOUR_REPOSITORY_NAME
   ```

5. **Install dependencies**
   ```bash
   npm install
   ```
   This downloads all the code libraries your project needs. Wait for it to finish.

6. **Test that it works**
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:8080`. You should see your website!

---

## Step 3: Remove Lovable-Specific Files

These files are only used by Lovable and can be safely removed:

### Files to DELETE:

1. **Delete the lovable-tagger dependency**
   
   Open `package.json` and find this line in `devDependencies`:
   ```json
   "lovable-tagger": "^1.0.0"
   ```
   Delete that entire line (including the comma if there's one after it).

2. **Update vite.config.ts**
   
   Open `vite.config.ts` and change it to this:
   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react-swc";
   import path from "path";

   export default defineConfig({
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

3. **Run npm install again**
   ```bash
   npm install
   ```

4. **Test that everything still works**
   ```bash
   npm run dev
   ```

---

## Step 4: Update Configuration for GitHub Pages

### 4.1 Update vite.config.ts for GitHub Pages

Open `vite.config.ts` and update it:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  // IMPORTANT: Change this to your repository name
  // If your repo is "my-quiz-app", use "/my-quiz-app/"
  // If using a custom domain, use "/"
  base: "/YOUR_REPOSITORY_NAME/",
  
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

**Replace `YOUR_REPOSITORY_NAME` with your actual repository name!**

### 4.2 Fix React Router for GitHub Pages

GitHub Pages needs special handling for client-side routing. Create a new file:

**Create file: `public/404.html`**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // This redirects 404s to the main app for React Router to handle
      var pathSegmentsToKeep = 1; // Keep 1 for repository name
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

**Update `index.html`** - Add this script inside the `<head>` tag, before other scripts:
```html
<script>
  // Handle GitHub Pages SPA redirect
  (function(l) {
    if (l.search[1] === '/' ) {
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

---

## Step 5: Set Up GitHub Actions for Automatic Deployment

GitHub Actions will automatically build and deploy your site whenever you push changes.

### 5.1 Create the workflow file

Create this folder structure: `.github/workflows/`

**Create file: `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]
  
  # Allows you to run this workflow manually
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
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

  # Deployment job
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

---

## Step 6: Enable GitHub Pages

1. **Go to your GitHub repository** in your web browser

2. **Click on Settings** (tab at the top, NOT the gear icon)

3. **Click on Pages** in the left sidebar (under "Code and automation")

4. **Under "Build and deployment":**
   - Source: Select **GitHub Actions**

5. **Push your changes to GitHub**
   ```bash
   git add .
   git commit -m "Set up GitHub Pages deployment"
   git push
   ```

6. **Wait for deployment**
   - Go to the **Actions** tab in your repository
   - You'll see a workflow running
   - Wait for it to complete (green checkmark)

7. **Find your website URL**
   - Go back to **Settings > Pages**
   - Your site URL will be shown at the top
   - It will be: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

## Step 7: Connect a Custom Domain (Optional)

If you want to use your own domain (like `www.mywebsite.com`):

### 7.1 Add your domain in GitHub

1. Go to **Settings > Pages**
2. Under "Custom domain", enter your domain
3. Click **Save**

### 7.2 Configure your domain provider

Add these DNS records at your domain registrar:

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### 7.3 Update vite.config.ts

Change `base` back to `/`:
```typescript
base: "/",
```

### 7.4 Create CNAME file

**Create file: `public/CNAME`**
```
www.yourdomain.com
```
(Replace with your actual domain)

---

## Verification Checklist

After completing all steps, verify:

- [ ] Website loads at your GitHub Pages URL
- [ ] All pages work (click through the entire site)
- [ ] Quiz functionality works
- [ ] Timer works
- [ ] Results page shows correctly
- [ ] Dark/light theme toggle works
- [ ] Data persists after page refresh (wrong answers, presets)
- [ ] Back buttons work correctly
- [ ] All images load

---

## Making Changes After Setup

### To make changes to your website:

1. **Edit files on your computer**
   Use VS Code or any text editor

2. **Test locally**
   ```bash
   npm run dev
   ```

3. **Save changes to Git**
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```

4. **Wait for automatic deployment**
   - Go to Actions tab on GitHub
   - Wait for the workflow to complete
   - Your changes will be live!

---

## Quick Command Reference

| Task | Command |
|------|---------|
| Start development server | `npm run dev` |
| Build for production | `npm run build` |
| Preview production build | `npm run preview` |
| Save changes to Git | `git add . && git commit -m "message" && git push` |
| Install new package | `npm install package-name` |
| Update all packages | `npm update` |

---

## Need Help?

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
