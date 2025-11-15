# Project Context

## Purpose

Personal portfolio website showcasing projects, experience, and providing a contact form. Built with modern web technologies and deployed across GitHub Pages and Vercel.

## Tech Stack

- **Astro 5.15.3**: Static site generation with SSR capabilities
- **React 19.2.0**: UI components with client-side interactivity
- **TypeScript 5.9.3**: Type-safe development
- **UnoCSS 66.5.6**: Utility-first CSS with Tailwind v4 compatibility
- **Vercel Adapter**: Serverless functions for API endpoints
- **Resend API**: Email delivery for contact form
- **i18n**: English and Spanish locales

## Project Conventions

### Code Style

- **Formatting**: Prettier with 2-space indentation, single quotes, no semicolons
- **Linting**: ESLint with Astro recommended rules
- **Type Safety**: TypeScript strict mode enabled
- **File Naming**: kebab-case for files, PascalCase for React components
- **CSS**: UnoCSS utility classes, CSS variables for theming (`--primary`, `--text`, `--surface`, etc.)

### Architecture Patterns

- **Component Structure**: React components in `/src/components/`, Astro layouts in `/src/layouts/`
- **Routing**: File-based routing in `/src/pages/`, `/es/` prefix for Spanish
- **State Management**: Client-side localStorage for theme and language preferences
- **Hydration**: `client:visible` or `client:idle` directives for React components
- **API Routes**: `/src/pages/api/` with server-side rendering
- **i18n**: Centralized translations in `/src/i18n/` (en.ts, es.ts)

### Testing Strategy

- **Quality Checks**: `npm run check` runs format, lint, and type-check
- **Build Validation**: Successful build required before deployment
- **Manual Testing**: Visual testing in both light/dark themes and EN/ES locales

### Git Workflow

- **Main Branch**: `master`
- **Commit Style**: Conventional commits preferred (feat:, fix:, docs:, etc.)
- **Deployment**: Automatic via GitHub Actions on push to master
- **PR Review**: Optional for solo project, recommended for significant changes

## Domain Context

**Portfolio Sections:**

- Hero: Name, title, tagline with CTAs
- About: Bio and skills/certifications
- Experience: Professional timeline
- Projects: Showcase with images, status, tech stack
- Contact: Form with email integration

**Localization:**

- English (`/`): Default locale
- Spanish (`/es/`): Full translation including project content
- Locale detection: localStorage → browser language → fallback to English

## Important Constraints

- **Resend Free Plan**: Limited to verified sender domains
- **GitHub Pages**: Must use repository name `razcue.github.io` for username site
- **Dual Deployment**: Static site on GitHub Pages, serverless on Vercel
- **No Database**: All content stored in locale files (static)
- **Client-Side Features**: Theme and language preferences persist in localStorage

## External Dependencies

- **Resend API**: Email delivery for contact form (https://resend.com)
- **Vercel**: Serverless function hosting for `/api/contact`
- **GitHub Pages**: Static site hosting at `razcue.github.io`
- **GitHub Actions**: CI/CD for automated deployments
