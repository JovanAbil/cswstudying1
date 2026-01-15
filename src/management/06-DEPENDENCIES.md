# Dependencies Documentation

## Overview

This document lists all external dependencies, what functionality relies on them, and what must be replaced or removed after separating from Lovable.

---

## Production Dependencies

### Core Framework

| Package | Version | Purpose | Critical? |
|---------|---------|---------|-----------|
| `react` | ^18.3.1 | UI framework | ✅ Yes |
| `react-dom` | ^18.3.1 | React DOM rendering | ✅ Yes |
| `react-router-dom` | ^6.30.1 | Client-side routing | ✅ Yes |

### UI Components (shadcn/ui)

| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-*` | Various | Headless UI primitives |
| `class-variance-authority` | ^0.7.1 | Component variant styling |
| `clsx` | ^2.1.1 | Conditional classnames |
| `tailwind-merge` | ^2.6.0 | Merge Tailwind classes |
| `lucide-react` | ^0.462.0 | Icons |

**Note:** The Radix UI packages power all shadcn components. They're listed individually in package.json.

### Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss-animate` | ^1.0.7 | Animation utilities |

### Math Rendering

| Package | Version | Purpose | Critical? |
|---------|---------|---------|-----------|
| `katex` | ^0.16.23 | LaTeX math rendering | ✅ Yes (for math content) |

**Usage:** `MathText.tsx` component renders LaTeX expressions wrapped in `$...$`.

### File Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `jszip` | ^3.10.1 | Create/extract ZIP files |

**Usage:** Exporting custom units as ZIP files with folder structure.

### Form Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.61.1 | Form state management |
| `@hookform/resolvers` | ^3.10.0 | Form validation resolvers |
| `zod` | ^3.25.76 | Schema validation |

**Usage:** Currently minimal, mostly for shadcn form components.

### Date Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | ^3.6.0 | Date formatting/manipulation |
| `react-day-picker` | ^8.10.1 | Date picker component |

**Usage:** Currently minimal, available for future features.

### Notifications

| Package | Version | Purpose |
|---------|---------|---------|
| `sonner` | ^1.7.4 | Toast notifications |

**Usage:** Success/error messages throughout the app.

### Other UI

| Package | Version | Purpose |
|---------|---------|---------|
| `cmdk` | ^1.1.1 | Command palette (shadcn command) |
| `embla-carousel-react` | ^8.6.0 | Carousel component |
| `input-otp` | ^1.4.2 | OTP input component |
| `react-resizable-panels` | ^2.1.9 | Resizable panel layout |
| `recharts` | ^2.15.4 | Charts (currently unused) |
| `vaul` | ^0.9.9 | Drawer component |
| `next-themes` | ^0.3.0 | Theme switching |

### Data Fetching

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | ^5.83.0 | Data fetching/caching |

**Note:** Currently unused since there's no backend. Can be removed or kept for future use.

---

## Development Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Build tool & dev server |
| `typescript` | Type checking |
| `eslint` | Code linting |
| `tailwindcss` | CSS framework |
| `postcss` | CSS processing |
| `autoprefixer` | CSS vendor prefixes |

---

## External Services & CDNs

### Currently Used

| Service | Purpose | Required? |
|---------|---------|-----------|
| None | - | - |

**Note:** The application is completely self-contained. No external APIs, CDNs, or services are used.

### Potentially Referenced (but not critical)

| Service | Where | Purpose |
|---------|-------|---------|
| Khan Academy | Study resources links | External learning links (optional) |
| ChemQuiz | Study resources links | External practice links (optional) |

---

## Lovable-Specific Dependencies

### What Lovable Provides

1. **Hosting:** Preview and production URLs
2. **Deployment:** Automatic builds and deployment
3. **SSL:** HTTPS certificates
4. **Build System:** Vite configuration and bundling

### What Will Stop Working Without Lovable

| Feature | Impact | Replacement Needed |
|---------|--------|-------------------|
| Automatic deployment | Must deploy manually | Set up Netlify, Vercel, or similar |
| Preview URLs | No instant previews | Run locally or set up preview environments |
| Version history | No rollback capability | Use Git for version control |

### What Works Independently

| Feature | Status |
|---------|--------|
| All quiz functionality | ✅ Works |
| All question content | ✅ Works |
| LocalStorage persistence | ✅ Works |
| Themes | ✅ Works |
| Math rendering | ✅ Works |
| File import/export | ✅ Works |

---

## Dependency Replacement Guide

### If You Want to Remove Unused Dependencies

**Safe to Remove (currently unused):**
- `@tanstack/react-query` - No data fetching
- `recharts` - No charts implemented
- `embla-carousel-react` - No carousels used
- `react-day-picker`, `date-fns` - No date pickers used
- `input-otp` - No OTP inputs used
- `cmdk` - Command palette not used

**Command:**
```bash
npm uninstall @tanstack/react-query recharts embla-carousel-react react-day-picker date-fns input-otp cmdk
```

### If You Want to Upgrade Dependencies

1. Check compatibility before upgrading major versions
2. Test thoroughly after upgrades
3. Be especially careful with:
   - `react-router-dom` (API changes between major versions)
   - `@radix-ui/*` (shadcn component compatibility)
   - `katex` (LaTeX rendering behavior)

---

## CDN Alternative (Optional)

If you want to reduce bundle size, some dependencies could be loaded from CDN:

### KaTeX
```html
<!-- In index.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.23/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.23/dist/katex.min.js"></script>
```

Then modify `MathText.tsx` to use `window.katex` instead of imported module.

**Not Recommended:** Adds external dependency, potential for CDN downtime.

---

## Version Locking

Current `package.json` uses caret (`^`) versioning which allows minor and patch updates.

### For Production Stability

Consider changing to exact versions:
```json
"react": "18.3.1"  // instead of "^18.3.1"
```

Or use `package-lock.json` / `bun.lockb` for reproducible builds (already present).

---

## Bundle Size Analysis

To analyze bundle size:

```bash
npm run build
npx vite-bundle-visualizer
```

### Expected Bundle Composition

| Category | Approximate Size |
|----------|-----------------|
| React + React DOM | ~140 KB |
| Radix UI components | ~100 KB |
| KaTeX | ~300 KB |
| Lucide icons | ~50 KB (tree-shaken) |
| Application code | ~200 KB |
| Question data | ~100-200 KB |
| **Total (gzipped)** | ~300-400 KB |

---

## Security Considerations

### No Known Vulnerabilities

Run regular audits:
```bash
npm audit
```

### Dependencies with Special Permissions

None. All dependencies are client-side only with no special permissions required.

### Third-Party Code Execution

- KaTeX: Renders user-provided LaTeX (safe, no JS execution)
- Question content: Displayed via React (auto-escaped)
- No `dangerouslySetInnerHTML` without sanitization
