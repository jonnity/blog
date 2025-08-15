# Task Completion Checklist

## After Completing Any Development Task

### 1. Code Quality Checks (REQUIRED)
```bash
npm run lint                    # Fix any ESLint errors/warnings
npx prettier --write .          # Format all code
```

### 2. Build Verification (REQUIRED)
```bash
npm run build                   # Ensure the project builds successfully
```
- The build process includes automatic sitemap generation via `postbuild`
- Must pass without errors before considering task complete

### 3. Development Server Testing
```bash
npm run dev                     # Test changes in development mode
```
- Verify functionality works as expected
- Check responsive design if UI changes were made
- Test any new routes or dynamic pages

### 4. Content Verification (if applicable)
- **For new blog entries**: Verify frontmatter format matches schema
- **For new work items**: Ensure proper markdown structure
- **For component changes**: Test with various content types

### 5. Type Checking
- TypeScript errors should be caught during build
- If needed separately: `npx tsc --noEmit`

## Pre-Commit Standards
- [ ] No ESLint errors or warnings
- [ ] Code properly formatted with Prettier
- [ ] Build succeeds without errors
- [ ] No TypeScript compilation errors
- [ ] Changes tested in development mode

## Deployment Readiness
Since this project uses GitHub Actions for deployment:
- All above checks must pass
- Changes should be committed to trigger automatic deployment
- Cloudflare Pages will build and deploy automatically

## Additional Considerations
- **Performance**: Consider impact on build time and bundle size
- **SEO**: Ensure meta tags and sitemap generation work properly
- **Accessibility**: Follow a11y best practices for any UI changes
- **Mobile responsiveness**: Test on different screen sizes