# Blog Setup Guide

## Giscus Comments Setup

To enable comments on your blog posts, you need to configure Giscus with your GitHub repository.

### Steps:

1. **Enable GitHub Discussions** on your repository:
   - Go to your repository settings
   - Under "Features", enable "Discussions"
   - Go to the Discussions tab → Categories → Create a category (e.g., "General" or "Blog Comments")

2. **Install the Giscus app**:
   - Visit https://github.com/apps/giscus
   - Click "Install"
   - Select your repository

3. **Get your Giscus configuration**:
   - Go to https://giscus.app
   - Enter your repository: `razcue/razcue.github.io`
   - **Page ↔️ Discussions Mapping**: Select "Discussion title contains page pathname" (recommended)
   - **Discussion Category**: Select your category (e.g., "General")
   - **Features**:
     - ✅ Enable reactions for the main post
     - ⬜ Leave others unchecked (optional preferences)
   - **Theme**: Select "Preferred color scheme" (auto light/dark)
   - Copy the `data-repo-id` and `data-category-id` values from the generated script

4. **Update the blog post templates** (ALREADY CONFIGURED):
   - Files: `src/pages/blog/[slug].astro` and `src/pages/es/blog/[slug].astro`
   - Current configuration uses:
     - Repo ID: `R_kgDON_jCog`
     - Category: "General"
     - Category ID: `DIC_kwDON_jCos4CjDY3`

### Example Configuration:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="razcue/razcue.github.io"
  data-repo-id="R_kgDON_jCog"
  data-category="General"
  data-category-id="DIC_kwDON_jCos4CjDY3"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script>
```

**Note**: The templates are already configured with the above values. Comments will automatically appear on your blog posts once GitHub Discussions are enabled.

## Buttondown Newsletter Setup

### Steps:

1. **Create a Buttondown account**:
   - Visit https://buttondown.email
   - Sign up for an account

2. **Get your API key**:
   - Go to Settings → API
   - Copy your API key

3. **Add to environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Buttondown API key:
     ```
     BUTTONDOWN_API_KEY=your_actual_api_key_here
     ```

4. **Deploy with environment variable**:
   - For Vercel: Add the environment variable in project settings
   - For local testing: Use the `.env` file

## Blog Images

Place hero images in `public/blog-images/` with descriptive names:

- `astro-changes-everything.jpg` - Featured post image
- Use `.jpg` for photos, `.png` for graphics/screenshots
- Recommended size: 1200x630px (optimal for OG images)

## RSS Feed

The RSS feed is automatically generated at `/rss.xml` and includes:

- All published English blog posts
- Post titles, descriptions, and publication dates
- Tags as categories

No additional setup required!

## Writing Blog Posts

Create MDX files in:

- `src/content/blog/en/` for English posts
- `src/content/blog/es/` for Spanish posts

### Frontmatter Template:

```yaml
---
title: 'Your Post Title'
description: 'Brief description for SEO and previews'
pubDate: 2024-01-15
updatedDate: 2024-01-20 # Optional
heroImage: '/blog-images/your-image.jpg'
tags: ['tag1', 'tag2', 'tag3']
draft: false # Set to true to hide from production
featured: false # Set to true for featured post
readingTime: 8 # Estimated minutes
locale: 'en' # or 'es'
liveUrl: 'https://example.com' # Optional - for project showcases
githubUrl: 'https://github.com/...' # Optional - for project showcases
---
```

## Development

```bash
# Start dev server (generates content collection types)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The blog is automatically deployed via GitHub Actions when you push to main. Make sure to add your environment variables to:

- Vercel project settings → Environment Variables
- Or GitHub repository secrets (if using GitHub Pages)
