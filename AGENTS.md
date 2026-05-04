# AGENTS.md

Project-specific configuration and guidelines for AI agent interactions.

---

## Project Overview

- **Type:** Personal portfolio website
- **Framework:** Astro + React + TypeScript
- **Styling:** UnoCSS (Tailwind-compatible utilities, preset-wind4)
- **Deployment:** GitHub Pages + Vercel (serverless)

---

## Resume Build

For resume building tasks, see `resume-build/` for standalone resume generation.

**Trigger:** When user mentions resume, CV, PDF generation

**Skills:**
- `resume-build` skill: Builds tailored and hybrid PDF resumes

**Key Files:**
- `resume-build/configs/` - Resume configurations
- `resume-build/KNOWLEDGE_BASE.md` - Profile knowledge base

---

## Job-Hunt Workflow

For automated job search, see `job-hunt/AGENTS.md`.

**Trigger:** "run job-hunt", "automate job search"

**Key Files:**
- `job-hunt/data/companies.json` - Company tracking

---

## Blog Article Workflow

When asked to create a new blog article, follow this process:

### 1. Brainstorm & Research

- Use the `brainstorming` skill first to explore the topic, user intent, and requirements
- Research the topic to gather data, sources, and both sides of any debate
- Identify key angles and unique perspectives

### 2. Create English Article First

- Location: `src/content/blog/en/`
- Filename format: `{slug}.mdx` (kebab-case, e.g., `ai-bubble-debate-2026.mdx`)
- Follow existing article structure:
  - Frontmatter with title, description, pubDate, heroImage, tags, locale, readingTime
  - Import React components as needed
  - Sections: intro, body with h2/h3, personal criteria table, bottom line, resources, follow-up
- Create React components in `src/components/` for data visualizations

### 3. Generate Images

- **OG Image**: `public/blog-images/{slug}-og.svg`
  - 1200x630 viewBox, include title, key points, author credit
  - Use gradients matching site theme
- **Hero Image**: Convert OG to WebP using sharp
  ```bash
  node -e "
  const sharp = require('sharp');
  const fs = require('fs');
  const svg = fs.readFileSync('public/blog-images/{slug}-og.svg');
  sharp(svg).resize(1200,630).webp({quality:90}).toFile('public/blog-images/{slug}-hero.webp');
  "
  ```

### 4. Update Sitemap

- Edit `public/sitemap.xml`
- Add both EN and ES article URLs with proper hreflang

### 5. Preview & Iterate

- Run `npm run build` to verify
- Preview in browser to check styling
- Wait for user feedback and fix issues

### 6. Create Spanish Article (only after EN is approved)

- Location: `src/content/blog/es/`
- Translate content maintaining structure and tone
- Update sitemap with ES URL

### Article Structure Reference

```mdx
---
title: 'Article Title'
description: 'Meta description'
pubDate: YYYY-MM-DD
heroImage: '/blog-images/{slug}-hero.webp'
tags: ['tag1', 'tag2']
draft: false
featured: false
readingTime: X
locale: 'en'
---

import ComponentName from '../../../components/ComponentName';

## Section Title

Content here...

<div className="my-6 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
  <p className="text-text-primary">
    <strong>Key point:</strong> Details
  </p>
</div>

### Subsection

- Bullet point 1
- Bullet point 2

<ComponentName />

---

## My Personal Criteria

| Criterion | My Assessment |
| --------- | ------------- |
| Question? | ✅ Answer     |

---

## Resources

- [Link](URL) - Description
- [Link](URL) - Description

---

## Follow Up

_Call to action_
```

### Image Naming Convention

- OG: `{slug}-og.svg`
- Hero: `{slug}-hero.webp`

---

## Global Skills

| Skill                         | Use Case                                        |
| ----------------------------- | ----------------------------------------------- |
| `seo-audit`                   | Audit portfolio for SEO issues                  |
| `frontend-design`             | Build UI components, landing pages              |
| `web-design-guidelines`       | Review UI for accessibility/best practices      |
| `programmatic-seo`            | Create SEO pages at scale                       |
| `vercel-react-best-practices` | React/Next.js performance optimization          |
| `tailwind-design-system`      | Build scalable design systems with Tailwind CSS |
| `dogfood`                     | Exploratory testing, find UX issues             |

---

## MCPs Configured

| MCP          | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| `playwright` | Browser automation (scraping, testing, web interaction) |

---

## Code Quality

### Common Scripts

```bash
# Development
npm run dev          # Astro dev server
npm run preview      # Preview production build

# Building
npm run build        # Production build
npm run astro check # Type-check Astro files

# Linting & Formatting
npm run check        # format:check + lint + type-check
npm run fix          # format + lint:fix + type-check
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check

# Job-AI
npm run build:resume       # Build resume from default.json
npm run build:linkedin     # Generate LinkedIn banners
```

### Commit Style: Conventional Commits

```
feat: add new blog section
fix: resolve navigation issue
docs: update README
refactor: restructure components
style: format code
test: add tests for component
chore: update dependencies
```

---

## Design Guidelines

### Styling

- **UnoCSS** with `preset-wind4` - Tailwind-compatible utility classes
- Prefer utility classes over custom CSS
- Use CSS variables for theming (dark/light mode)

### Dark/Light Mode

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
}

[data-theme='dark'] {
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
}
```

### Component Patterns

- React + TypeScript
- Functional components with hooks
- Props interface for type safety
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

### Agent Skills to Follow

When building UI, respect these skills:

- `web-design-guidelines` - Accessibility & best practices
- `tailwind-design-system` - Design tokens & consistent patterns
- `vercel-react-best-practices` - Performance optimization

---
