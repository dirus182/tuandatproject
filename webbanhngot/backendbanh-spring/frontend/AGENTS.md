# AGENTS.md - Cake Project Guide

## Project Overview
**Cake** is a minimal React + TypeScript + Vite template optimized for fast development with strict type safety. It's configured with modern defaults but remains a starter template with no custom business logic.

## Architecture & Key Files

### Build System (Vite + TypeScript)
- **`vite.config.ts`**: Minimal config using `@vitejs/plugin-react` (Oxc-based JSX transpilation)
  - Hot Module Replacement (HMR) enabled by default
  - No custom aliases or advanced config yet
- **`tsconfig.json`**: Split configuration with references to app and node configs
  - **`tsconfig.app.json`**: Targets ES2023, includes DOM/JSX types, no emit (Vite handles it)
  - **`tsconfig.node.json`**: Separate config for build files (vite.config.ts)

### Application Entry Point
- **`index.html`**: Entry point with `<div id="root"></div>` and script loader
- **`src/main.tsx`**: React app initialization with StrictMode for dev warnings
- **`src/App.tsx`**: Single component template with counter demo

### Code Quality Tools
- **`eslint.config.js`**: Flat config format with recommended rules for:
  - React Hooks rules (dependencies, exhaustive-deps)
  - React Refresh rules (HMR indicators)
  - TypeScript ESLint recommended set
- **`package.json`**: Scripts defined: `dev`, `build`, `lint`, `preview`

## Development Workflow

### Local Development
```bash
npm run dev           # Start Vite dev server with HMR
npm run lint          # Check TypeScript + ESLint
npm run build         # Compile TypeScript, bundle with Vite → dist/
npm run preview       # Preview production build locally
```

**HMR Pattern**: Save src/ files → automatic browser refresh without page reload. Works for component changes in App.tsx.

### Build Pipeline
`npm run build` runs two steps:
1. `tsc -b`: TypeScript compilation (validates types, no output emitted)
2. `vite build`: Vite bundling to dist/

**Strict TS Checking**: Any unused variables/parameters/case branches will fail build.

## Code Conventions

### TypeScript Strictness
- `noUnusedLocals: true` - All declared variables must be used
- `noUnusedParameters: true` - Function parameters required or prefixed with `_`
- `inherentTypeStrict: true` - Catch common type bugs (implicit any, null checks)
- `noFallthroughCasesInSwitch: true` - Prevent accidental case fallthrough

**Example**: Adding unused imports will break the build:
```tsx
// ❌ Build will fail
import { useState } from 'react' // unused if not referenced
function MyComponent() { return null }

// ✅ Correct
import { useState } from 'react'
function MyComponent() {
  const [count, setCount] = useState(0) // now used
}
```

### Asset Imports
Assets (images, SVGs) are imported as URLs, not raw files:
```tsx
import reactLogo from './assets/react.svg'    // Resolves to URL string
import heroImg from './assets/hero.png'       // Works for any image format
// Use in JSX: <img src={reactLogo} alt="Logo" />
```

### Component Structure
- Single App.tsx with all demo UI (shows get-started pattern)
- CSS colocated: `App.css` imports into `App.tsx`
- No component sub-folders yet (starter template)

## Important Decisions & Constraints

### React Compiler
- **Disabled** in this template (noted in README)
- Don't enable without performance testing - impacts dev/build speed significantly
- Can be added later per [React Compiler docs](https://react.dev/learn/react-compiler/installation)

### Module System
- `type: "module"` in package.json → ES modules throughout
- All imports use ES6 syntax (no CommonJS)
- Vite config uses `import` statements

### No Experimental Features
- React Refresh only (no additional optimization)
- Standard ESLint rules (not type-aware, would need parser config)
- Template approach - add custom patterns as needed

## Dependencies & Versions
- **React**: 19.2.5 (latest with no breaking changes introduced)
- **TypeScript**: ~6.0.2 (recent major version)
- **Vite**: 8.0.10 (includes React plugin)
- **ESLint**: 10.2.1 (flat config standard)

No production dependencies beyond React/React-DOM. Add libraries as needed for features.

## Quick Reference for Agents

| Task | File(s) | Notes |
|------|---------|-------|
| Add component | `src/` | Ensure no unused imports; follows React 19 patterns |
| Change build | `vite.config.ts` | Restart dev server after changes |
| Update lint rules | `eslint.config.js` | Uses flat config syntax; no extends override |
| Fix types | `tsconfig.*.json` | Affects either app or node build separately |
| Styling | Colocate CSS with components; import in .tsx | See `App.css` pattern |
| Add dependency | `package.json` | Then `npm install` & restart dev server |

