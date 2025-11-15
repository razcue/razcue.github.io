# Rayko Azcue - Portfolio Website

Modern, performant portfolio website built with Astro, React, and UnoCSS. Features internationalization (EN/ES), dark/light themes, and a contact form with email integration.

## 🚀 Tech Stack

- **Framework**: Astro 5.15.3 with React integration
- **Styling**: UnoCSS with Tailwind preset
- **Language**: TypeScript
- **Email**: Resend API for contact form
- **Deployment**: GitHub Page (static site), Vercel (serverless)
- **Code Quality**: ESLint, Prettier, TypeScript checks

## 📁 Project Structure

```text
/
├── .github/
│   └── workflows/         # GitHub Actions workflows
│       ├── deploy-github-pages.yml  # Static site deployment
│       └── deploy-vercel.yml        # API deployment
├── api/                   # Vercel serverless functions
│   ├── contact.ts         # Contact form API endpoint
│   ├── package.json       # API dependencies
│   ├── tsconfig.json      # API TypeScript config
│   ├── vercel.json        # Vercel configuration
│   └── .env.example       # API environment template
├── public/                # Static assets (favicon, images, etc.)
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx
│   │   ├── CircularScore.tsx
│   │   ├── Contact.tsx
│   │   ├── CTAButton.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── Navigation.tsx
│   │   ├── PortfolioLayout.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── Projects.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── i18n/              # Internationalization
│   │   ├── en.ts          # English translations
│   │   └── es.ts          # Spanish translations
│   ├── layouts/           # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/             # Routes (file-based routing)
│   │   ├── index.astro    # English homepage
│   │   ├── blog/
│   │   │   └── index.astro
│   │   ├── lab/
│   │   │   └── index.astro
│   │   └── es/            # Spanish routes
│   │       ├── index.astro
│   │       ├── blog/
│   │       │   └── index.astro
│   │       └── lab/
│   │           └── index.astro
│   ├── styles/            # Global styles
│   │   └── global.css
│   └── utils/             # Utilities
│       ├── i18n.ts        # i18n helpers
│       └── theme.ts       # Theme management
├── openspec/              # OpenSpec documentation
│   ├── AGENTS.md
│   ├── project.md
│   ├── changes/           # Change proposals
│   └── specs/             # Technical specs
├── astro.config.mjs       # Astro configuration
├── uno.config.ts          # UnoCSS configuration
├── eslint.config.js       # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
└── LICENSE                # Proprietary license
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
- **Section hash preservation across language changes**

### Hash Navigation & Language Persistence

The site implements hash-based section navigation that persists when changing languages.

**How it works:**

1. Clicking on navigation links adds hash to URL: `https://razcue.github.io/#experience`
2. When changing language, the hash is preserved: `https://razcue.github.io/es/#experience`
3. Page scrolls to the same section in the new language

**Implementation example:**

```typescript
// In LanguageToggle.tsx or similar component
const handleLanguageChange = (newLocale: string) => {
  const currentHash = window.location.hash; // e.g., "#experience"
  const newPath = newLocale === 'en' ? '/' : `/${newLocale}/`;
  window.location.href = newPath + currentHash;
};

// In Navigation.tsx
<a href="#about">About</a>
<a href="#experience">Experience</a>
<a href="#projects">Projects</a>
<a href="#contact">Contact</a>

// In your components
<section id="about">...</section>
<section id="experience">...</section>
<section id="projects">...</section>
<section id="contact">...</section>
```

**CSS for smooth scrolling:**

```css
html {
  scroll-behavior: smooth;
}
```

This ensures users stay at their current section when switching languages, improving UX.

## 🎨 Theming

- **Light/Dark modes** with system preference detection
- Theme preference stored in localStorage
- Dark theme is default

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

- ✅ Fully responsive (mobile-first design)
- ✅ Internationalization (EN/ES) with hash preservation
- ✅ Dark/Light theme support
- ✅ Contact form with email notifications
- ✅ Project showcase with status indicators
- ✅ Professional experience timeline
- ✅ Performance optimized (Terser minification, code splitting)
- ✅ Accessibility optimized (96/100 Lighthouse score)
- ✅ SEO optimized (100/100 Lighthouse score)

### SEO

✅ Semantic HTML structure  
✅ Meta descriptions and Open Graph tags  
✅ Proper heading hierarchy (h1, h2, h3)  
✅ Alt text for images

## 🔍 SEO & Search Engine Visibility

The site is optimized for search engines with a **100/100 Lighthouse SEO score**.

### ✅ Implemented

- Semantic HTML structure with proper heading hierarchy
- Dynamic meta tags (title, description, keywords) for EN/ES
- Open Graph tags for social media sharing
- Twitter Cards for rich previews
- JSON-LD structured data (Person, WebSite, WebPage schemas)
- Canonical URLs with hreflang for multilingual content
- `robots.txt` and `sitemap.xml` with bilingual support
- Responsive viewport and theme-color meta tags

### 📋 Post-Deployment SEO Checklist

After deploying your site, complete these steps to maximize search visibility:

#### 1. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://razcue.github.io`
3. Verify ownership (HTML tag method recommended)
4. Submit sitemap: `https://razcue.github.io/sitemap.xml`
5. Request indexing for main pages

#### 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap: `https://razcue.github.io/sitemap.xml`

#### 3. Social Media Validation

Test how your site appears when shared:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

#### 4. Structured Data Validation

Verify your JSON-LD markup:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

#### 5. Create Professional OG Image

The current `og-image.svg` is a placeholder. Create a 1200x630px image:

- Use [Canva](https://canva.com) or [Figma](https://figma.com)
- Include your name, title, and branding
- Export as JPG and save to `public/og-image.jpg`
- Update `BaseLayout.astro` to use the JPG

#### 6. Monitor & Improve

- Check Google Search Console weekly for crawl errors
- Monitor keyword rankings for "Rayko Azcue"
- Track clicks and impressions in Search Console
- Update content regularly to maintain freshness

### 💡 Tips for Ranking "Rayko Azcue"

1. **Link Building**: Link to your portfolio from:
   - GitHub profile README
   - LinkedIn profile
   - Dev.to, Medium, or personal blog posts
   - Stack Overflow profile

2. **Social Signals**: Share your portfolio on:
   - Twitter/X with @razcue
   - LinkedIn posts
   - Reddit (relevant subreddits)
   - Developer communities

3. **Content Freshness**: Update your portfolio regularly:
   - Add new projects
   - Write blog posts
   - Update experience section

4. **External Mentions**: Get your name mentioned:
   - Contribute to open source (commit messages with your name)
   - Comment on tech blogs/articles
   - Participate in developer forums

Google typically indexes new sites within 1-2 weeks. Searching "Rayko Azcue" should show your portfolio within a month of deployment and completing the checklist above.

## 📄 License

**All Rights Reserved** - Copyright (c) 2025 Rayko Azcue

This is a personal portfolio project. The source code is available for reference and educational purposes only. You may NOT copy, modify, distribute, or use this code as a template for your own projects without explicit permission.

See [LICENSE](LICENSE) for full details.

## ⚠️ Usage Notice

This repository is **not open source**. While the code is publicly viewable for learning purposes, it is not licensed for reuse. If you're interested in using any part of this code, please contact me at razcue@yandex.com.
