# Project Overview

## Purpose
jonnity's blog/portfolio website project. This is a personal blog and portfolio site showcasing technical content and work projects.

**Live Site**: https://jonnity.com

## Tech Stack
- **Next.js 15** (Static Site Generation - SSG)
- **TypeScript 5.8.3**
- **Tailwind CSS 3** for styling
- **React 18** with modern features
- **Markdown-based content management**
  - `react-markdown` for rendering
  - `remark-gfm` for GitHub Flavored Markdown
  - `react-syntax-highlighter` for code blocks
- **Zod** for schema validation
- **Front-matter** for markdown metadata parsing
- **Volta** for Node.js version management (Node 20.10.0, npm 10.2.5)

## Deployment
- **GitHub Actions** for CI/CD (automatic deployment and linting on push)
- **Cloudflare Pages** for hosting

## Key Features
1. **Markdown-based CMS**: Content stored in `/src/entries` as `.md` files
2. **Dynamic page generation** using `generateStaticParams` for blog posts and work items
3. **Responsive design** with Tailwind CSS
4. **Multiple content types**:
   - Blog entries (`/blog/[slug]`)
   - Monthly updates (`/monthly/[year-month]`)
   - Work portfolio items (`/work/[slug]`)
   - Profile page
5. **Enhanced markdown features** via react-markdown extensions
6. **Automatic sitemap generation** with next-sitemap

## Project Structure
```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (top)/             # Homepage
│   │   ├── blog/              # Blog section
│   │   ├── monthly/           # Monthly updates
│   │   ├── work/              # Portfolio work items
│   │   └── profile/           # About/profile page
│   ├── entries/               # Markdown content files
│   ├── works/                 # Portfolio markdown files
│   ├── util/                  # Utilities and components
│   └── assets/                # Static assets (icons, logos)
├── public/                    # Static files served directly
└── Configuration files        # Next.js, Tailwind, TypeScript configs
```