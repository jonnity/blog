# Code Style & Conventions

## TypeScript Configuration
- **Target**: ES2024
- **Strict mode**: Enabled
- **Path mapping**: `@/*` maps to `./src/*`
- **JSX**: preserve mode for Next.js processing
- **Force consistent casing**: Enabled

## Code Style Tools
- **ESLint**: `next/core-web-vitals` configuration
  - Custom rule: `@next/next/no-img-element: "off"` (allows img tags)
- **Prettier**: Configured with tailwindcss plugin for class sorting
- **Tailwind CSS**: Custom theme with monokai color scheme extensions

## File Naming Conventions
- **Components**: PascalCase (e.g., `BlogEntry.tsx`, `ImageViewer.tsx`)
- **Pages**: lowercase with Next.js conventions (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (e.g., `metaTagInfo.ts`, `Entry.ts`)
- **Content files**: kebab-case (e.g., `monthly-2024-07.md`, `sketch-match.md`)

## Component Patterns
- **Functional components** with TypeScript
- **React.FC** type annotation commonly used
- **Props destructuring** in component parameters
- **Export patterns**: Both named and default exports used appropriately

## Code Organization
- **Logical grouping**: Related components in subdirectories
  - `/util/entry/components/` - Entry-related components
  - `/util/profile/` - Profile-related utilities
  - `/util/work/components/` - Work portfolio components
- **Separation of concerns**: 
  - Business logic in utility classes (e.g., `Entry.ts`, `Work.ts`)
  - UI components separate from data handling
  - Styling via Tailwind classes

## TypeScript Conventions
- **Strict typing**: Full type definitions for props and return values
- **Schema validation**: Zod schemas for runtime validation
- **Interface definitions**: Clear type definitions for data structures

## Styling Approach
- **Tailwind-first**: Utility classes for styling
- **Responsive design**: Mobile-first approach
- **Custom colors**: Extended Tailwind palette for monokai theme
- **Class organization**: Prettier plugin sorts Tailwind classes automatically