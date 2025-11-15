# Portfolio Page Creation Proposal

## Overview

Create a modern, professional portfolio website inspired by Brittany Chiang's design with a unique three-column desktop layout. The site will showcase frontend development work with content sourced from existing online portfolio and CV. Features include internationalization, dark/light themes, smooth scrolling sections, and dedicated pages for projects, blog, and lab.

## Design Inspirations

- **Layout & Colors**: Brittany Chiang (https://brittanychiang.com/)
- **Smooth Scrolling**: Olaolu (https://olaolu.dev/)
- **Hero Animation**: Adham Dannaway (https://www.adhamdannaway.com/)
- **Experience Timeline**: Brittany Chiang v4 (https://v4.brittanychiang.com/)

## Goals

- Create a stunning portfolio that highlights frontend development expertise
- Implement a unique three-column desktop layout with smooth scrolling
- Provide seamless bilingual experience (English/Spanish)
- Offer light/dark theme switching with professional color schemes
- Build dedicated pages for projects, blog, and lab
- Optimize for performance, accessibility, and SEO

## Technical Stack

- **Framework**: Astro with React components
- **Styling**: UnoCSS with Tailwind preset
- **Icons**: Tabler icons
- **Development Tools**: TypeScript, ESLint, Prettier
- **Deployment**: Vercel (no GitHub Actions required)

## Desktop Layout (Three Columns)

### Column 1 (5/12 on desktop, 2/12 on tablets - Static)

- Hero section with dual-profile scrolling animation
- Navigation menu
- Social links (GitHub, LinkedIn)
- Links to Blog and Lab pages
- Call-to-action button linking to contact section

### Column 2 (6/12 - Content)

- About section
- Professional Experience (timeline)
- Featured Projects
- Contact section with form

### Column 3 (1/12 on desktop, 2/12 on tablets - Static)

- Language toggle (EN/ES)
- Theme toggle (Light/Dark)
- Vertical email contact

## Responsive Breakpoints

### Large Desktop (>1536px)

- Three columns: 5/12 | 6/12 | 1/12
- Column 2: Content max width 1280px

### Standard Desktop (1024px-1536px)

- Three columns: 5/12 | 6/12 | 1/12
- Column 2: Content max width 1280px

### Large Tablets & Big Phones (640px-1023px)

- Three columns: 2/12 | 6/12 | 2/12
- Column 1: Only home button, navigation dots, and links
- Hero section minimized

### Small Phones (<640px)

- Single column layout
- Hidden header that shows on scroll up
- All content sections stacked vertically

## Scope

### In Scope

- Three-column desktop layout with smooth scrolling
- Hero section with dual-profile animation (Software Engineer ↔ Frontend Developer)
- About, Experience (timeline), Featured Projects (Pinterest-style grid), Contact sections
- i18n support (English default, Spanish)
- Light/dark themes (dark default, Brittany Chiang inspired colors)
- Dedicated pages: Projects, Blog, Lab (empty with navigation headers)
- Responsive design for mobile/tablet with updated breakpoints
- Development tools setup (TypeScript, ESLint, Prettier)
- Vercel deployment configuration

### Out of Scope

- Admin panel for content management
- User authentication
- E-commerce features
- Real-time chat functionality
- Advanced analytics beyond basic tracking

## Success Criteria

- Desktop three-column layout works flawlessly with smooth scrolling
- Hero dual-profile animation performs smoothly
- i18n switching works without page reload
- Theme switching is instant and preserves user preference
- Large tablets maintain three-column layout (2/12 | 6/12 | 2/12) with compressed first column
- Small phones use single-column layout with hidden header that reveals on scroll up
- Mobile responsive design maintains usability across all breakpoints
- Featured projects Pinterest-style grid with hover animations works correctly
- Dedicated pages load with navigation headers
- Development tools (TypeScript, ESLint, Prettier) are properly configured
- Vercel deployment is successful
- Page loads within 2 seconds on standard connections
- Lighthouse scores: Performance >90, Accessibility >95, SEO >95

## Dependencies

- Design assets or ability to recreate Brittany Chiang color scheme
- Adham Dannaway portfolio reference for hero animation
- Pinterest reference for featured projects grid layout
- Vercel account for deployment

## Timeline

- Design & Research: 1 week
- Development Setup: 1 week
- Core Layout & Hero: 2 weeks
- Content Sections: 2 weeks
- i18n & Themes: 1 week
- Additional Pages: 1 week
- Testing & Polish: 1 week
- Deployment: 1 week
