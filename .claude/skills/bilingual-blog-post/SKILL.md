---
name: bilingual-blog-post
description: 'Create, rewrite or review a blog post on razcue.github.io. Use for any change under src/content/blog/ or blog-related components, images and sitemap entries. Enforces the EN/ES pairing, frontmatter, sitemap and sourcing conventions.'
---

# Bilingual Blog Post

Every post on this site exists in English and Spanish. Readers switch language by adding or removing `/es` in the URL, so both versions must stay in lockstep.

## File layout

| What | Where |
|---|---|
| English post | `src/content/blog/en/<slug>.mdx` |
| Spanish post | `src/content/blog/es/<slug>.mdx` |
| Hero image | `public/blog-images/<slug>-hero.webp` |
| OG image (optional) | `public/blog-images/<slug>-og.svg` |
| Interactive pieces | `src/components/<Name>.tsx` |

- **The slug is English and identical in both locales.** Never translate the filename (`ai-bubble-debate-2026.mdx` in both `en/` and `es/`, not `la-burbuja-de-ia-2026.mdx`).
- Routes: `/blog/<slug>/` and `/es/blog/<slug>/`.

## Workflow

1. **Research first.** For opinion or analysis posts, gather sources for both sides before you write.
2. **Write the English post first** and build it. Wait for the author's feedback.
3. **Write the Spanish post only after the English one is approved.**
4. **Images.** Write the OG image as an SVG (1200x630 viewBox, site gradients, title and key points). Then convert it to the hero image:
   ```bash
   node -e "require('sharp')(require('fs').readFileSync('public/blog-images/<slug>-og.svg')).resize(1200,630).webp({quality:90}).toFile('public/blog-images/<slug>-hero.webp')"
   ```
   If the title changes, update the text in the SVG and convert it again.
5. **Sitemap and final checks** (see below).

## Frontmatter

Copy the shape from an existing post (`src/content/blog/config.ts` is the schema):

```yaml
title: '...'
description: '...'
pubDate: YYYY-MM-DD        # the real publish date, same in both locales
heroImage: '/blog-images/<slug>-hero.webp'   # must match a real file in public/
tags: [...]                # English tags in en/, Spanish tags in es/
draft: false
featured: false
readingTime: N
locale: 'en' | 'es'
```

Check that `heroImage` points to a file that exists: `ls public/blog-images/`.

## Components

- Shared components take a `locale?: 'en' | 'es'` prop and keep both languages' strings inside the component. Use them as `<Component locale="es" />` in the Spanish post.
- Style with the existing UnoCSS tokens (`bg-surface`, `border-border`, `text-text-primary`, `text-text-secondary`). There is no Tailwind config or shadcn/ui in this project.
- Delete a component when no post uses it any more.

## Sitemap

`public/sitemap.xml` is maintained by hand. For a new post, add one `<url>` block per locale. Each block lists both `hreflang` alternates (`en` and `es`), and both use the same slug. Set `lastmod` to `pubDate`, and update the `lastmod` of the `/blog/` and `/es/blog/` index entries.

## Writing

- **Spanish is a full rewrite, not a word-for-word translation.** Keep it natural, and use one variant (Spain or Latin American) consistently.
- **Statements the author believes are not "questions".** Don't frame established facts as open debate (e.g. "the technology is real" is not something in doubt).
- **Sourcing:** hedge figures that come from one source or a leak ("reportedly", "según los reportes"). Leave out claims you can only find on a single blog.
- **Personal experience:** don't invent first-person claims. Flag any "I use…/I've seen…" line for the author to confirm.
- **Resources section:** a plain list of links, `- [Title](url)`, with no description after the link.
- Date-sensitive topics: make sure the framing matches the publish date. A forecast must not read as a forecast once its period has passed.

## Before finishing

1. Both files exist with the same slug, and their frontmatter matches (dates, image, readingTime).
2. `npm run build` passes, and the output shows both `/blog/<slug>/index.html` and `/es/blog/<slug>/index.html`.
3. `grep` the built HTML for the hero image filename and a string from each component, to confirm they render.
4. Report to the author any claims that still need fact-checking.
