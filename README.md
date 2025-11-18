# Rayko Azcue - Portfolio Website

Modern, performant portfolio website built with Astro, React, and UnoCSS. Features internationalization (EN/ES), dark/light themes, a blog with MDX support, and a contact form with email integration.

## 🚀 Tech Stack

- **Framework**: Astro 5.15.3 with React integration
- **Styling**: UnoCSS with Tailwind preset and Tabler icons
- **Language**: TypeScript
- **Content**: Astro Content Collections with MDX
- **Email**: Resend API for contact form
- **Blog Comments**: Giscus (GitHub Discussions)
- **Deployment**: GitHub Pages (static site), Vercel (serverless)
- **Code Quality**: ESLint, Prettier, TypeScript checks

## 📁 Project Structure

```text
/
├── .github/
│   └── workflows/                   # GitHub Actions workflows
│       ├── deploy-github-pages.yml  # Static site deployment
│       └── deploy-vercel.yml        # API/serverless deployment
├── api/
│   └── api/                         # Vercel serverless functions
│       ├── contact.ts               # Contact form API endpoint
│       ├── newsletter.ts            # Newsletter subscription endpoint
│       ├── package.json             # API dependencies
│       ├── tsconfig.json            # API TypeScript config
│       ├── vercel.json              # Vercel configuration
│       └── .env.example             # API environment template
├── public/
│   ├── blog-images/                 # Blog post images
│   └── ...                          # Other static assets
├── src/
│   ├── components/
│   │   ├── blog/                    # Blog-specific components
│   │   │   ├── BlogCard.tsx
│   │   │   ├── FeaturedPost.tsx
│   │   │   ├── NewsletterSignup.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SortControl.tsx
│   │   │   └── TagFilter.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── ...                      # Other components
│   ├── content/
│   │   └── blog/                    # Blog posts (MDX)
│   │       ├── en/                  # English posts
│   │       └── es/                  # Spanish posts
│   ├── i18n/                        # Internationalization
│   │   ├── en.ts                    # English translations
│   │   └── es.ts                    # Spanish translations
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro              # English homepage
│   │   ├── rss.xml.ts               # English RSS feed
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog list page
│   │   │   └── [slug].astro         # Blog post page
│   │   └── es/                      # Spanish routes
│   │       ├── index.astro
│   │       ├── rss.xml.ts           # Spanish RSS feed
│   │       └── blog/
│   │           ├── index.astro
│   │           └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── i18n.ts                  # i18n helpers
│       └── theme.ts                 # Theme helpers
├── astro.config.mjs                 # Astro configuration
├── uno.config.ts                    # UnoCSS configuration
└── ...
```

## 🧞 Commands

### Main Project Commands

| Command                | Action                                       |
| :--------------------- | :------------------------------------------- |
| `npm install`          | Installs dependencies                        |
| `npm run dev`          | Starts local dev server at `localhost:4321`  |
| `npm run build`        | Build your production site to `./dist/`      |
| `npm run preview`      | Preview your build locally, before deploying |
| `npm run check`        | Run all checks (format, lint, types)         |
| `npm run fix`          | Auto-fix formatting and linting issues       |
| `npm run lint`         | Check for linting errors                     |
| `npm run lint:fix`     | Fix linting errors automatically             |
| `npm run format`       | Format code with Prettier                    |
| `npm run format:check` | Check code formatting                        |
| `npm run type-check`   | Validate TypeScript types                    |

### API Commands

Run from the `api/` directory:

| Command          | Action                          |
| :--------------- | :------------------------------ |
| `npm install`    | Install API dependencies        |
| `npm run dev`    | Start local Vercel dev server   |
| `npm run deploy` | Deploy API to Vercel production |

## 🌍 Internationalization

The site supports English (default) and Spanish:

- **English**: `https://razcue.github.io/`
- **Spanish**: `https://razcue.github.io/es/`

### Features

- Language preference stored in localStorage
- Fallback to browser language detection

**Hash Navigation & Language Persistence**

The site implements hash-based section navigation that persists when changing languages.

## 🎨 Theming

- **Light/Dark modes** with system preference detection
- Theme preference stored in localStorage
- Dark theme is default

**CSS for smooth scrolling:**

This ensures users stay at their current section when switching languages, improving UX.

## 📧 Contact Form Setup

The contact form uses [Resend](https://resend.com) API for email delivery.

**Setup steps:**

1. Sign up for Resend: https://resend.com
2. Verify your email domain (or use your `.dev` address for testing)
3. Create an API key from https://resend.com/api-keys
4. Add environment variables:
   - **Local development**: Create `.env` file with `RESEND_API_KEY=re_...`
   - **Vercel**: Add `RESEND_API_KEY` in project settings
   - **GitHub Actions**: Add `RESEND_API_KEY` in repository secrets

## 📝 Code Quality

This project follows strict code quality standards with automated checks:

```bash
npm run check       # Run all checks (format, lint, type-check)
npm run fix         # Auto-fix all issues
npm run lint        # ESLint only
npm run format      # Prettier only
npm run type-check  # TypeScript only
```

Quality tools configured:

- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode

## 🚢 Deployment

This project uses a **dual deployment strategy**:

- **GitHub Pages**: Static site at `https://razcue.github.io`
- **Vercel**: Serverless API functions for contact form

### Architecture

```
┌─────────────────────────────────────────┐
│  GitHub Pages (razcue.github.io)        │
│  - Static HTML/CSS/JS                   │
│  - All pages and components             │
│  - Contact form UI                      │
└─────────────────┬───────────────────────┘
                  │
                  │ HTTPS POST
                  ▼
┌─────────────────────────────────────────┐
│  Vercel (*.vercel.app/api/contact)      │
│  - Serverless function                  │
│  - Resend email integration             │
│  - CORS enabled for GitHub Pages        │
└─────────────────────────────────────────┘
```

### Complete Setup Guide

#### Step 1: Initial Setup

```bash
# Clone and install dependencies
git clone https://github.com/razcue/razcue.github.io.git
cd razcue.github.io
npm install

# Install API dependencies
cd api
npm install
cd ..
```

#### Step 2: Configure Environment Variables

**Main Project (.env)**

```bash
# Copy template
cp .env.example .env

# Edit .env and add:
PUBLIC_API_URL=https://your-vercel-project.vercel.app/api/contact
```

**API Project (api/.env)**

```bash
# Copy template
cp api/.env.example api/.env

# Edit api/.env and add:
RESEND_API_KEY=re_your_actual_api_key_here
```

#### Step 3: Deploy API to Vercel

```bash
# Navigate to API directory
cd api

# Login to Vercel (first time only)
npx vercel login

# Deploy to production
npx vercel --prod

# Note the deployment URL (e.g., https://razcue-portfolio-api.vercel.app)
```

**After deployment:**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `RESEND_API_KEY` = `re_your_api_key`
3. Redeploy: `npx vercel --prod`

#### Step 4: Update API URL

```bash
# Back to project root
cd ..

# Update .env with your actual Vercel URL
echo "PUBLIC_API_URL=https://your-actual-vercel-url.vercel.app/api/contact" > .env
```

#### Step 5: Configure GitHub Secrets

Go to GitHub Repository → Settings → Secrets and variables → Actions

Add these secrets:

- `VERCEL_TOKEN` - Get from Vercel Dashboard → Settings → Tokens
- `VERCEL_ORG_ID` - Found in `.vercel/project.json` after first deployment
- `VERCEL_PROJECT_ID` - Found in `.vercel/project.json` after first deployment
- `RESEND_API_KEY` - Your Resend API key
- `PUBLIC_API_URL` - (Optional) Your Vercel API URL

#### Step 6: Enable GitHub Pages

1. Go to Repository → Settings → Pages
2. **Source**: Select "GitHub Actions" (NOT "Deploy from a branch")
3. Save

#### Step 7: Deploy

```bash
# Commit all changes
git add .
git commit -m "chore: configure deployment"
git push origin master
```

GitHub Actions will automatically:

1. Build static site → Deploy to GitHub Pages
2. Deploy API → Deploy to Vercel (on api/\*\* changes)

### Deployment Workflows

**GitHub Pages Workflow** (`.github/workflows/deploy-github-pages.yml`)

- **Triggers**: Push to `master` branch
- **Actions**: Build Astro static site → Upload to GitHub Pages
- **URL**: `https://razcue.github.io`

**Vercel API Workflow** (`.github/workflows/deploy-vercel.yml`)

- **Triggers**: Push to `master` with changes in `api/**` or manual trigger
- **Actions**: Deploy serverless functions to Vercel
- **URL**: `https://your-project.vercel.app`

### Local Development

**Static Site:**

```bash
npm run dev
# Visit http://localhost:4321
```

**API (Vercel Dev Server):**

```bash
cd api
npm run dev
# API at http://localhost:3000/api/contact
```

**Full Stack (both running):**

```bash
# Terminal 1
npm run dev

# Terminal 2
cd api && npm run dev

# Update Contact.tsx to use http://localhost:3000/api/contact for testing
```

### Troubleshooting

**Contact form not working?**

- Check browser console for CORS errors
- Verify `PUBLIC_API_URL` matches your Vercel deployment
- Check Vercel logs: `cd api && vercel logs`
- Verify `RESEND_API_KEY` is set in Vercel dashboard

**GitHub Pages 404?**

- Ensure "GitHub Actions" is selected as source (not branch)
- Check Actions tab for workflow failures
- Wait 2-3 minutes after first deployment

**API deployment fails?**

- Verify all GitHub secrets are set correctly
- Check workflow logs in Actions tab
- Ensure `api/package.json` has correct dependencies

## 🌟 Features

### Portfolio

- ✅ Fully responsive (mobile-first design)
- ✅ Internationalization (EN/ES) with hash preservation
- ✅ Dark/Light theme support
- ✅ Contact form with email notifications
- ✅ Project showcase with status indicators
- ✅ Professional experience timeline
- ✅ Section-based scroll navigation (wheel/keyboard/touch)

### Blog

- ✅ MDX support for rich content
- ✅ Bilingual content (EN/ES) with separate RSS feeds
- ✅ Featured posts with hero images (1200×630)
- ✅ Tag-based filtering with URL state preservation
- ✅ Sorting by date or reading time (asc/desc)
- ✅ Automatic reading time calculation
- ✅ Giscus comments integration (GitHub Discussions)
- ✅ Newsletter signup with Buttondown API
- ✅ Responsive grid and list views
- ✅ SEO optimized with Open Graph and JSON-LD

### Performance & Quality

- ✅ Performance optimized (Terser minification, code splitting)
- ✅ Accessibility optimized (96/100 Lighthouse score)
- ✅ SEO optimized (100/100 Lighthouse score)
- ✅ Strict TypeScript and ESLint checks

## 📝 Blog Setup & Usage

### Quick Start

See [BLOG_SETUP.md](./BLOG_SETUP.md) for complete setup instructions including:

- Giscus comments configuration
- Newsletter integration (Buttondown)
- Image naming conventions

### Creating a New Blog Post

1. **Create MDX file** in the appropriate language directory:

```bash
# English post
touch src/content/blog/en/my-new-post.mdx

# Spanish post
touch src/content/blog/es/my-new-post.mdx
```

2. **Add frontmatter** at the top of your MDX file:

```mdx
---
title: 'My Awesome Blog Post'
description: 'A brief description of what this post is about'
pubDate: 2025-01-15
heroImage: '/blog-images/my-new-post-hero.webp'
tags: ['javascript', 'webdev', 'tutorial']
featured: true # Optional: show on homepage and at top of blog list
---

Your content goes here with full MDX support...
```

3. **Create post images** (1200×630px recommended):

```bash
# Save images in public/blog-images/
public/blog-images/my-new-post-hero.webp
public/blog-images/my-new-post-og.svg  # Optional: og-image for social sharing
```

**Image naming convention:** `[slug]-hero.webp, [slug]-og.svg`

4. **Preview your post**:

```bash
npm run dev
# Visit http://localhost:4321/blog/my-new-post
# Spanish: http://localhost:4321/es/blog/my-new-post
```

### Frontmatter Options

| Field         | Type     | Required | Description                            |
| :------------ | :------- | :------- | :------------------------------------- |
| `title`       | string   | ✅       | Post title (for SEO and display)       |
| `description` | string   | ✅       | Brief summary (for SEO and cards)      |
| `pubDate`     | date     | ✅       | Publication date (YYYY-MM-DD)          |
| `heroImage`   | string   | ✅       | Path to hero image (1200×630px)        |
| `tags`        | string[] | ✅       | Categories/tags for filtering          |
| `featured`    | boolean  | ⬜       | Show as featured post (default: false) |

### MDX Features

Blog posts support full MDX capabilities:

- **Markdown**: Headers, lists, links, images, code blocks
- **React Components**: Import and use custom components
- **Code Syntax Highlighting**: Automatic with Astro
- **Custom Styling**: UnoCSS utility classes available

Example:

````mdx
---
title: 'Advanced React Patterns'
description: 'Learn advanced patterns in React'
pubDate: 2025-01-15
heroImage: '/blog-images/react-patterns-hero.webp'
tags: ['react', 'javascript', 'patterns']
---

import CustomComponent from '../../components/CustomComponent';

## Introduction

Here's some **bold text** and _italic text_.

<CustomComponent prop="value" />

```javascript
const example = () => {
  console.log('Code with syntax highlighting!');
};
```
````

### Blog Features

**Sorting & Filtering:**

- Sort by date or reading time (ascending/descending)
- Filter by tags with state preservation in URL
- URL params: `?tag=javascript&sort=date&dir=desc`

**RSS Feeds:**

- English: `https://razcue.github.io/rss.xml`
- Spanish: `https://razcue.github.io/es/rss.xml`

**Comments:**

- Powered by Giscus (GitHub Discussions)
- Automatic per-post threads via pathname mapping
- See [BLOG_SETUP.md](./BLOG_SETUP.md) for configuration

**Newsletter:**

- Buttondown integration for subscriptions
- Configurable in `api/api/newsletter.ts`

## 🔍 SEO Optimization

The site includes comprehensive SEO features.

**Key SEO Features:**

- Dynamic meta tags (title, description) for EN/ES
- Open Graph tags for social media
- JSON-LD structured data
- RSS feeds for blog content
- Sitemap and robots.txt
- 100/100 Lighthouse SEO score

## 📄 License

**All Rights Reserved** - Copyright (c) 2025 Rayko Azcue

This is a personal portfolio project. The source code is available for reference and educational purposes only. You may NOT copy, modify, distribute, or use this code as a template for your own projects without explicit permission.

See [LICENSE](LICENSE) for full details.

## ⚠️ Usage Notice

This repository is **not open source**. While the code is publicly viewable for learning purposes, it is not licensed for reuse. If you're interested in using any part of this code, please contact me at razcue@yandex.com.
