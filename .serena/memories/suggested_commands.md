# Suggested Commands

## Development Workflow

### Installation
```bash
npm ci                          # Install dependencies (use ci for production-like install)
```

### Development Server
```bash
npm run dev                     # Start development server on localhost:3000
```

### Build Process
```bash
npm run build                   # Build for production
npm run postbuild               # Generate sitemap (runs automatically after build)
```

### Production Server
```bash
npm run start                   # Start production server (requires build first)
```

### Code Quality
```bash
npm run lint                    # Run ESLint for code linting
npx prettier --write .          # Format code with Prettier
npx prettier --check .          # Check if code is formatted
```

## System Utilities (Linux)
- `git` - Version control
- `ls` - List directory contents  
- `cd` - Change directory
- `grep` - Search text patterns
- `find` - Find files and directories
- `cat` - Display file contents
- `head/tail` - Display file beginning/end

## Development Best Practices

### Before Committing
1. Run `npm run lint` to check for linting issues
2. Run `npx prettier --check .` to verify formatting
3. Test the build with `npm run build`

### Content Management
- Blog entries: Add `.md` files to `/src/entries/`
- Portfolio items: Add `.md` files to `/src/works/`
- Both use frontmatter for metadata (title, tags, dates, etc.)

### Node.js Version Management
- Project uses **Volta** for version management
- Node.js: 20.10.0
- npm: 10.2.5

## Optional Commands for Development
```bash
# Type checking (if needed separately)
npx tsc --noEmit

# Check for unused dependencies
npx depcheck

# Analyze bundle size
npm run build && npx @next/bundle-analyzer
```

## Troubleshooting
- Clear Next.js cache: `rm -rf .next`
- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`