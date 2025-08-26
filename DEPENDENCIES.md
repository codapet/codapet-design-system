# Dependency Management Strategy

This document explains how dependencies are organized in the CodaPet Design System library.

## Dependency Categories

### 1. Peer Dependencies (`peerDependencies`)

These are dependencies that the consuming application must provide:

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

**Why?** React and React DOM are core dependencies that should be provided by the consuming application to avoid version conflicts and duplicate installations.

### 2. Dependencies (`dependencies`)

These are dependencies that are bundled with the library and required at runtime:

#### UI Component Libraries
- `@radix-ui/*` - All Radix UI primitives used by components
- `lucide-react` - Icon library
- `vaul` - Drawer component
- `embla-carousel-react` - Carousel component
- `recharts` - Chart components
- `react-day-picker` - Date picker
- `input-otp` - OTP input component

#### Utility Libraries
- `class-variance-authority` - Component variant management
- `clsx` - Conditional class name utility
- `tailwind-merge` - Tailwind class merging
- `date-fns` - Date manipulation utilities
- `zod` - Schema validation
- `cmdk` - Command palette component

#### Form Libraries
- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation resolvers

#### Theme & Styling
- `next-themes` - Theme management
- `sonner` - Toast notifications

### 3. Dev Dependencies (`devDependencies`)

These are dependencies only needed during development and build:

#### Build Tools
- `tsup` - Library bundler
- `typescript` - TypeScript compiler
- `tailwindcss` - CSS framework (for development)

#### Development Tools
- `next` - Next.js framework (for demo app)
- `react` - React (for development)
- `react-dom` - React DOM (for development)
- `eslint` - Code linting
- `eslint-config-next` - Next.js ESLint config

#### Type Definitions
- `@types/react` - React TypeScript definitions
- `@types/react-dom` - React DOM TypeScript definitions
- `@types/node` - Node.js TypeScript definitions

## Build Configuration

### External Dependencies

All dependencies are marked as `external` in the tsup configuration:

```typescript
// tsup.config.ts
external: [
  'react',
  'react-dom',
  '@radix-ui/react-accordion',
  // ... all other dependencies
]
```

This ensures that:
1. Dependencies are not bundled with the library
2. The library is lightweight
3. Version conflicts are avoided
4. Tree-shaking works properly

### Bundle Strategy

- **ESM Only**: The library is built as ES modules only for modern bundlers
- **External Dependencies**: All dependencies are externalized
- **TypeScript Declarations**: Full type definitions are generated
- **Source Maps**: Source maps are included for debugging

## Installation Requirements

### For Library Consumers

```bash
# Install the library
npm install codapet-design-system

# Install peer dependencies (if not already installed)
npm install react react-dom
```

### For Library Developers

```bash
# Install all dependencies
npm install

# Install peer dependencies for development
npm install react react-dom
```

## Dependency Management Scripts

```bash
# Check dependency tree
npm run check:deps

# Clean and reinstall dependencies
npm run clean:deps

# Build and test library
npm run build:lib && npm run test:lib
```

## Version Compatibility

### React Version Support
- **Minimum**: React 18.0.0
- **Recommended**: React 18.2.0 or later
- **Tested**: React 19.1.0

### Node.js Version Support
- **Minimum**: Node.js 18.0.0
- **Recommended**: Node.js 20.0.0 or later

## Publishing Considerations

When publishing the library:

1. **Peer Dependencies**: Will be installed by consumers
2. **Dependencies**: Will be installed automatically with the library
3. **Dev Dependencies**: Will not be installed by consumers

This ensures that:
- The library is lightweight
- Version conflicts are minimized
- Consumers have control over React versions
- Development tools don't bloat the production installation

## Troubleshooting

### Common Issues

1. **Peer Dependency Warnings**: Install the required peer dependencies
2. **Version Conflicts**: Ensure React versions are compatible
3. **Build Failures**: Check that all dev dependencies are installed

### Resolution

```bash
# Install peer dependencies
npm install react react-dom

# Clean and reinstall
npm run clean:deps

# Rebuild library
npm run build:lib
```
