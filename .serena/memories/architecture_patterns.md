# Architecture & Design Patterns

## Next.js App Router Structure
- Uses **App Router** (not Pages Router)
- File-based routing with special files: `page.tsx`, `layout.tsx`
- Route groups: `(top)` for homepage grouping
- Dynamic routes: `[slug]` and `[year-month]` patterns

## Content Management System
### Entry System
- **Entry class** (`src/util/entry/Entry.ts`): Core data model
- **EntryManager class**: Handles entry collection and filtering
- **Frontmatter parsing**: Uses `front-matter` library for metadata extraction
- **Zod validation**: Runtime schema validation for metadata integrity

### Content Types
1. **Blog entries**: General articles and tutorials
2. **Monthly entries**: Time-based updates (monthly format)
3. **Work entries**: Portfolio project showcases

## Component Architecture
### Separation of Concerns
- **Data models**: Classes for Entry and Work
- **UI components**: Functional React components
- **Utilities**: Helper functions and shared logic

### Component Categories
- **Layout components**: `RootLayout`, page-specific layouts
- **Content components**: `BlogEntry`, `ReactMarkdown`, `SyntaxHighlightedCodeBlock`
- **Navigation components**: `IconLink`, `Hamburger`
- **Utility components**: `DateInfoSpan`, `TagList`

## Static Site Generation (SSG)
- **generateStaticParams**: Creates static pages for all content
- **Build-time generation**: All content rendered at build time
- **Performance optimized**: Fast loading with pre-generated HTML

## Styling Architecture
### Tailwind CSS Strategy
- **Utility-first approach**: Classes directly in JSX
- **Custom theme extensions**: Monokai color scheme
- **Responsive design**: Mobile-first breakpoints
- **Component-specific styles**: Logical grouping of related styles

## Data Flow Patterns
1. **Content ingestion**: Markdown files → frontmatter parsing → validation
2. **Static generation**: Validated data → React components → HTML
3. **Runtime rendering**: Pre-built pages served statically

## Error Handling
- **Schema validation**: Zod catches data format errors early
- **TypeScript**: Compile-time error prevention
- **Build-time validation**: Ensures all content is properly formatted

## Development Patterns
### File Organization
- **Feature-based grouping**: Related components in subdirectories
- **Clear separation**: Pages, components, utilities, and content
- **Logical imports**: Path aliases with `@/*` mapping

### State Management
- **Minimal state**: Mostly static content, minimal client-side state
- **Server-side generation**: Data processing at build time
- **Component props**: Data flow through React props pattern