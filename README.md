# Rayko Azcue - Portfolio Website

Modern, performant portfolio website built with Astro, React, and UnoCSS. Features internationalization (EN/ES), dark/light themes, and a contact form with email integration.

## 🚀 Tech Stack

- **Framework**: Astro 5.15.3 with React integration
- **Styling**: UnoCSS with Tailwind preset
- **Language**: TypeScript
- **Email**: Resend API for contact form
- **Deployment**: Vercel (recommended)
- **Code Quality**: ESLint, Prettier, TypeScript checks

## 📁 Project Structure

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   ├── i18n/             # Internationalization
│   │   ├── en.ts         # English translations
│   │   └── es.ts         # Spanish translations
│   ├── layouts/          # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/            # Routes
│   │   ├── index.astro   # English homepage
│   │   ├── es/           # Spanish routes
│   │   │   └── index.astro
│   │   └── api/          # API endpoints
│   │       └── contact.ts
│   ├── styles/           # Global styles
│   │   └── global.css
│   └── utils/            # Utilities
│       ├── i18n.ts
│       └── theme.ts
├── astro.config.mjs      # Astro configuration
├── uno.config.ts         # UnoCSS configuration
└── package.json
```

## 🧞 Commands

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

## 🌍 Internationalization

The site supports English (default) and Spanish:

- **English**: `https://yourdomain.com/`
- **Spanish**: `https://yourdomain.com/es/`

Language preference is stored in localStorage with fallback to browser language.

## 🎨 Theming

- **Light/Dark modes** with system preference detection
- Theme preference stored in localStorage
- Dark theme is default
- Colors inspired by Brittany Chiang's portfolio

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
npm run check    # Run all checks (format, lint, type-check)
npm run fix      # Auto-fix all issues
npm run lint     # ESLint only
npm run format   # Prettier only
npm run type-check  # TypeScript only
```

Quality tools configured:

- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode
- Pre-commit hooks

## 🚢 Deployment

This project uses a dual deployment strategy:

- **GitHub Pages**: Static site at `razcue.github.io`
- **Vercel**: Serverless functions for contact form API

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions including:

- Repository setup (renaming to `razcue.github.io`)
- Environment variables configuration
- GitHub Actions workflows
- Vercel integration
- Domain configuration
- Troubleshooting guide

### Quick Deploy

1. **Setup GitHub Secrets**:
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RESEND_API_KEY`

2. **Setup Vercel Environment**:
   - Add `RESEND_API_KEY` in Vercel project settings

3. **Push to master**:
   ```bash
   git push origin master
   ```

GitHub Actions will automatically deploy to both GitHub Pages and Vercel.

## 🌟 Features

- ✅ Fully responsive (mobile-first design)
- ✅ Internationalization (EN/ES)
- ✅ Dark/Light theme support
- ✅ Contact form with email notifications
- ✅ Project showcase with status indicators
- ✅ Professional experience timeline
- ✅ Performance optimized (Terser minification, code splitting)
- ✅ Accessibility focused
- ✅ SEO friendly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and adapt it for your own portfolio!
