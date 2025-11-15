# Deployment Guide

This guide covers deploying your Astro portfolio to GitHub Pages (static site) and Vercel (serverless functions).

## 📋 Architecture Overview

- **Static Site**: GitHub Pages (`razcue.github.io`)
- **Serverless Functions**: Vercel (contact form API)
- **CI/CD**: GitHub Actions for automated deployments

## 🔧 Prerequisites

- GitHub account with `razcue.github.io` repository
- Vercel account linked to your GitHub
- Resend API key for contact form

## 🏗️ Repository Setup

### GitHub Pages Repository

For GitHub Pages to work with your username, the repository **must** be named `razcue.github.io`.

**If you need to rename your current repository:**

1. Go to your GitHub repository settings
2. Navigate to the "Repository name" section
3. Rename to `razcue.github.io`
4. Update your local git remote:
   ```bash
   git remote set-url origin https://github.com/razcue/razcue.github.io.git
   ```

**Or create a new repository:**

1. Create a new repository named `razcue.github.io`
2. Push your code:
   ```bash
   git remote add origin https://github.com/razcue/razcue.github.io.git
   git branch -M master
   git push -u origin master
   ```

## 🔐 Environment Variables

### GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name         | Description               | Required For      |
| ------------------- | ------------------------- | ----------------- |
| `VERCEL_TOKEN`      | Vercel API token          | Vercel deployment |
| `VERCEL_ORG_ID`     | Vercel organization ID    | Vercel deployment |
| `VERCEL_PROJECT_ID` | Vercel project ID         | Vercel deployment |
| `RESEND_API_KEY`    | Resend API key for emails | Contact form      |

#### Getting Vercel Credentials

1. **Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Create a new token with deployment permissions
   - Copy the token value

2. **Vercel Org ID & Project ID**:

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and link project
   vercel link

   # Get org ID and project ID from .vercel/project.json
   cat .vercel/project.json
   ```

3. **Resend API Key**:
   - Go to https://resend.com/api-keys
   - Create a new API key
   - Copy the key (starts with `re_`)

### Vercel Environment Variables

Add these in your Vercel project settings (Settings → Environment Variables):

| Variable Name    | Value               | Environment         |
| ---------------- | ------------------- | ------------------- |
| `RESEND_API_KEY` | Your Resend API key | Production, Preview |

## 🚀 Deployment Workflows

### GitHub Pages (Static Site)

The static site will be deployed to `https://razcue.github.io` automatically on every push to `master`.

**What gets deployed:**

- All static pages (HTML, CSS, JS)
- Public assets (images, fonts, etc.)
- No serverless functions

**Workflow file**: `.github/workflows/deploy-github-pages.yml`

### Vercel (Serverless Functions)

Serverless functions (like `/api/contact`) will be deployed to Vercel automatically.

**What gets deployed:**

- API endpoints in `src/pages/api/`
- Full Astro SSR capabilities
- Contact form functionality

**Workflow file**: `.github/workflows/deploy-vercel.yml`

## 📦 Build Configuration

### For GitHub Pages

The site is built with static output:

```js
// astro.config.mjs for static
export default defineConfig({
  output: 'static',
  site: 'https://razcue.github.io',
});
```

### For Vercel (Serverless)

The site uses server output for API routes:

```js
// astro.config.mjs for serverless
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
```

## 🔄 Deployment Process

### Automatic Deployment (Recommended)

1. **Push to master branch**:

   ```bash
   git add .
   git commit -m "Deploy updates"
   git push origin master
   ```

2. **GitHub Actions will automatically**:
   - Build the static site
   - Deploy to GitHub Pages
   - Deploy API routes to Vercel

3. **Check deployment status**:
   - GitHub: Actions tab in your repository
   - Vercel: Deployments page in your project dashboard

### Manual Deployment

#### GitHub Pages (Manual)

```bash
# Build static site
npm run build

# Deploy to GitHub Pages branch
git subtree push --prefix dist origin gh-pages
```

#### Vercel (Manual)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## 🌐 Domain Configuration

### GitHub Pages

**Default URL**: `https://razcue.github.io`

**Custom domain** (optional):

1. Add a `CNAME` file to `/public/` with your domain
2. Configure DNS records with your domain provider:
   ```
   A record: 185.199.108.153
   A record: 185.199.109.153
   A record: 185.199.110.153
   A record: 185.199.111.153
   ```
3. Enable HTTPS in GitHub Pages settings

### Vercel

**Default URL**: `https://your-project.vercel.app`

**Custom domain** (optional):

1. Go to Vercel dashboard → Domains
2. Add your domain
3. Configure DNS as instructed by Vercel

### Recommended Setup

- **Main site**: `https://razcue.com` → GitHub Pages
- **API subdomain**: `https://api.razcue.com` → Vercel
- **Or keep separate**: GitHub Pages for site, Vercel domain for API

## 🔍 Monitoring & Debugging

### GitHub Actions Logs

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select the workflow run
4. View logs for each step

### Vercel Logs

1. Go to Vercel dashboard
2. Select your project
3. Go to "Deployments"
4. Click on a deployment to see logs

### Common Issues

**GitHub Pages not updating:**

- Check Actions tab for failed workflows
- Verify `GITHUB_TOKEN` permissions
- Clear browser cache

**Vercel deployment failing:**

- Verify all environment variables are set
- Check Vercel build logs
- Ensure Vercel token has correct permissions

**Contact form not working:**

- Verify `RESEND_API_KEY` is set in Vercel
- Check Vercel function logs
- Verify email domain is verified in Resend

## 📊 Project Routes

### English

- `/` - Home/Portfolio
- `/blog/` - Blog (Coming Soon)
- `/lab/` - Lab experiments (Coming Soon)

### Spanish

- `/es/` - Home/Portfolio
- `/es/blog/` - Blog (Próximamente)
- `/es/lab/` - Laboratorio (Próximamente)

### API

- `/api/contact` - Contact form submission (POST only, Vercel)

## 🛠️ Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Quality checks
npm run check        # Run all checks (format, lint, type-check)
npm run fix          # Fix all auto-fixable issues
npm run lint         # ESLint check
npm run format       # Prettier format
npm run type-check   # TypeScript check

# Preview production build locally
npm run preview
```

## 📚 Additional Resources

- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Resend API Documentation](https://resend.com/docs)

## 🎯 Quick Start Checklist

- [ ] Repository renamed to `razcue.github.io` (or new repo created)
- [ ] GitHub secrets added (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, RESEND_API_KEY)
- [ ] Vercel environment variables set (RESEND_API_KEY)
- [ ] Vercel project linked to GitHub repository
- [ ] GitHub Actions workflows committed
- [ ] First deployment tested
- [ ] Contact form tested on production
- [ ] Custom domain configured (optional)

## 📝 Notes

- Blog and Lab navigation links are currently disabled in `Navigation.tsx`
- Pages show "Coming Soon" / "Próximamente" messages
- Contact form sends to verified email only (Resend free plan limitation)
- Theme and language preferences persist via localStorage
- Build output: ~230 KB total (~68 KB gzipped)
