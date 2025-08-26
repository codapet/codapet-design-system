# CodaPet Design System

A comprehensive React component library built with Shadcn UI, Radix UI, Tailwind CSS, and TypeScript.

## Features

- 🎨 50+ accessible UI components
- 🎯 Built with Radix UI primitives
- 🎨 Tailwind CSS styling
- 📱 Mobile-first responsive design
- 🔧 TypeScript support
- ⚡️ Optimized for performance
- 🎭 Dark mode support
- ♿️ WCAG compliant

## Installation

### As an NPM Package

```bash
npm install @codapet/design-system
```

### Peer Dependencies

The library requires React and React DOM as peer dependencies. Make sure you have them installed:

```bash
npm install react react-dom
```

Note for CI/builders (e.g., Vercel, GitHub Actions): since this package is public on npm, no extra auth or `.npmrc` is required. Just run your normal install command.

**Note**: The library supports React 18.0.0 and above. For best compatibility, use React 18.2.0 or later.

---

## Quickstart: Next.js 15 + Tailwind v4

Follow these steps to integrate the design system in a brand-new Next.js app.

1) Create a Next.js app (TypeScript recommended):

```bash
npx create-next-app@latest my-app
cd my-app
```

2) Add Tailwind v4 PostCSS plugin (required for Tailwind v4):

```bash
npm install -D @tailwindcss/postcss
```

Create `postcss.config.mjs` (if you don't have one):

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

3) Install the design system:

```bash
npm install codapet-design-system
```

4) Configure global CSS for Tailwind v4 scanning and import the design system styles.

Edit `app/globals.css`:

```css
@import "tailwindcss";

/* Tell Tailwind where to scan for class usage */
@source "../**/*.{js,ts,jsx,tsx,mdx}";
@source "../../node_modules/@codapet/design-system/dist/**/*.{js,mjs,ts,tsx}";

/* Import the design system tokens and base styles (after Tailwind) */
@import "@codapet/design-system/styles";
```

5) Ensure your Next.js root layout includes the globals:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'My App' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

6) Use components:

```tsx
// app/page.tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from '@codapet/design-system'

export default function Page() {
  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Hello</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Works!</Button>
        </CardContent>
      </Card>
    </main>
  )
}
```

7) Run the app:

```bash
npm run dev
```

### Tailwind v3 (legacy)

If you are on Tailwind v3, use a config-based content scan instead of `@source` (see below in Styling).

---

## Usage

### Basic Setup

```tsx
import { Button, Card, Input } from '@codapet/design-system'

function App() {
  return (
    <div>
      <Card>
        <Input placeholder="Enter your name" />
        <Button>Click me</Button>
      </Card>
    </div>
  )
}
```

### Available Components

The library exports all UI components from the `components/ui` directory:

```tsx
import {
  Accordion,
  Alert,
  AlertDialog,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Chart,
  Checkbox,
  Collapsible,
  Command,
  ContextMenu,
  Dialog,
  Drawer,
  DropdownMenu,
  Form,
  HoverCard,
  Input,
  InputOTP,
  Label,
  Menubar,
  NavigationMenu,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Resizable,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  Sidebar,
  Skeleton,
  Slider,
  Sonner,
  Switch,
  Table,
  Tabs,
  Textarea,
  Toggle,
  ToggleGroup,
  Tooltip,
} from '@codapet/design-system'
```

### Utilities

```tsx
import { cn } from '@codapet/design-system'

// Utility function for merging class names
const className = cn('base-class', 'conditional-class')
```

### Hooks

```tsx
import { useIsMobile } from '@codapet/design-system'

function MyComponent() {
  const isMobile = useIsMobile()
  // ...
}
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Commands

- `npm run dev` - Start the development server
- `npm run build:lib` - Build the library for distribution
- `npm run build:all` - Build both the library and the demo app
- `npm run lint` - Run ESLint
- `npm run test:lib` - Test the library build
- `npm run check:deps` - Check dependency tree
- `npm run clean:deps` - Clean and reinstall dependencies

### Building for Distribution

To build the library as an npm package:

```bash
npm run build:lib
```

This will generate:
- `dist/index.mjs` - ES Module bundle
- `dist/index.d.mts` - TypeScript declarations

### Publishing

Releases are automated via GitHub Actions on semver tags.

Setup once:
- In GitHub → Settings → Secrets and variables → Actions, add `NPM_TOKEN` with publish access to the `@codapet` org.

Release steps:
```bash
# update version in package.json
git commit -am "chore(release): v1.2.3"
git tag v1.2.3
git push --follow-tags
```
The workflow builds, tests, and runs `npm publish --access public`.

## Styling

The design system uses Tailwind CSS for styling. Make sure to include Tailwind CSS in your project and configure Tailwind to scan this package so utilities used inside it are generated.

### Tailwind v4 (recommended)

1) In your global CSS (e.g. `app/globals.css`), add `@source` to include the design system and import its stylesheet after Tailwind:

```css
@import "tailwindcss";

/* Tell Tailwind to scan the design system in node_modules */
@source "../**/*.{js,ts,jsx,tsx,mdx}";
@source "../../node_modules/@codapet/design-system/dist/**/*.{js,mjs,ts,tsx}";

/* Import the design system CSS tokens and base layers */
@import "@codapet/design-system/styles";
```

2) Ensure your layout imports your globals (Next.js):

```tsx
// app/layout.tsx
import "./globals.css";
```

### Tailwind v3

If you are still on Tailwind v3, use the content globs instead of `@source`:

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@codapet/design-system/dist/**/*.{js,mjs,ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [],
}
```

## Troubleshooting

- Components render unstyled:
  - Ensure your `globals.css` contains `@source` that points to the design system in `node_modules` (Tailwind must see class usage to emit utilities).
  - Restart the dev server after changing `@source` or Tailwind config.
  - Verify `@import "codapet-design-system/styles";` comes after `@import "tailwindcss";`.
  - If you use Tailwind v3, configure `content` globs as shown above.
- PostCSS cannot resolve an import:
  - Ensure `@tailwindcss/postcss` is installed and present in `postcss.config.*`.
  - If you see an error resolving `tw-animate-css`, install it in the app: `npm i -D tw-animate-css`.
- Still stuck? Clear caches and rebuild: `rm -rf .next` then `npm run dev`.

## Dependency Management

For detailed information about how dependencies are organized and managed, see [DEPENDENCIES.md](./DEPENDENCIES.md).

### Key Points:
- **Peer Dependencies**: React and React DOM (provided by consuming app)
- **Dependencies**: UI libraries and utilities (bundled with library)
- **Dev Dependencies**: Build tools and development utilities (not included in package)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
