import type { VercelRequest, VercelResponse } from '@vercel/node';

const knowledgeBase = {
  person: {
    name: 'Rayko Azcue',
    title: 'Senior Software Engineer',
    tagline:
      'Front End & Full Stack Engineer with 7+ years building scalable, performant web applications across SaaS, e-commerce, and enterprise platforms. Expert in Vue, Nuxt, React and TypeScript.',
    location: 'Madrid, Spain',
    openTo:
      'Remote globally within English or Spanish setup. On-site/hybrid with relocation (Latin America or Spain preferred)',
    targetRoles: ['Front End Developer', 'Full Stack Developer'],
    availability: 'Actively looking for new opportunities',
    languages: 'English (C1 - Advanced), Spanish (Native)',
  },
  summary:
    'Front End & Full Stack Engineer with 7+ years building scalable, performant web applications across SaaS, e-commerce, and enterprise platforms. Expert in Vue, Nuxt, React and TypeScript. Focus areas include Core Web Vitals optimization, accessible UI, and pragmatic component design. Proven track record in remote-first distributed teams across US, Spain, and LATAM.',
  education: [
    {
      institution: 'University of Informatics Sciences',
      degree: "Bachelor's degree",
      location: 'Havana, Cuba',
      date: 'Sep 2013 - Jul 2018',
    },
    {
      institution: 'freeCodeCamp',
      degree: 'Responsive Web Design Certificate',
      location: 'Online',
      date: '2021',
      url: 'https://www.freecodecamp.org/certification/fcc0d66daac-ef4f-4e0e-9e60-d02d24f85508/responsive-web-design',
    },
  ],
  skills: {
    technical:
      'Vue, Nuxt, React, Next, Angular, Node.js, Express.js, Nest, JavaScript, TypeScript, Tailwind, UnoCSS, Laravel, Yii, Symfony, PHP, PostgreSQL, AWS S3, Redis, Docker, Elasticsearch, Swagger, CI/CD, PHPUnit, Faker, Mockery, a11y, Core Web Vitals, SEO, Vuetify, PrimeReact, NgZorro, .NET, C#, Supabase, Vercel, Cloudflare, Linux/Ubuntu, VPS Setup, n8n, Agent Coding, Mono-repos, Vite, Webpack, Redux, Pinia, Zustand, SWR, SSR, SSG, shadcn/ui, React Testing Library, StoryBook, Astro, Sanity, Express.js, Sequelize ORM, Doctrine ORM, OAuth2, Laravel Passport, RabbitMQ, Serverless, AWS Lambda, Vercel Serverless Functions, Cloudflare Workers, Eloquent ORM, Laravel Sanctum, Inertia.js, GitHub Actions, Nginx, SSL/TLS, Postman, Bruno, Sentry, ESLint, Prettier, CodeRabbit, i18n, SCSS, SASS, BEM Methodology, Conventional Commits, SOLID Principles, DRY, KISS, YAGNI, Google Analytics, Google Search Console, Lighthouse',
    soft: 'Team Leadership, Mentoring, Figma to Code, Pixel-Perfect Design, Mobile-First Design, Jira, Trello, Notion, Agile, Scrum, Kanban, Sprint Planning, Backlog Management, Cross-functional Collaboration, Technical Decision Making, Code Review, Technical Writing, Product and Module Ownership, Autonomy, Remote Work, Distributed Teams, Adaptability, Continuous Learning, Knowledge Sharing, Slack, Microsoft Teams, Pair Programming, Technical Interviewing, Stakeholder Communication',
    languages: 'English (C1 - Advanced), Spanish (Native)',
  },
  experience: [
    {
      company: 'Delfín Motor Labs SL',
      location: 'Remote, Madrid, Spain',
      period: 'Jan 2026 – Present',
      role: 'Senior Front End Developer',
      industry: 'E-commerce, Automotive',
      technologies: [
        'Nuxt',
        'Vuetify',
        'Tailwind',
        'Laravel',
        'TypeScript',
        'Stripe',
        'Cloudflare',
        'GitHub Actions',
      ],
      highlights: [
        'Built frontend for custom CMS (Nuxt + Vuetify) and consumer storefront (Nuxt + Tailwind Plus) consuming Laravel APIs; implemented authentication via login form and SSO (Google) using Laravel Sanctum',
        'Implemented comprehensive SEO strategy including meta tags, dynamic sitemap generation at build time, Schema markup, and canonical URLs; improved Core Web Vitals (LCP: 3.2s → 1.4s, CLS: 0.15 → 0.08) and increased organic traffic by 38%',
        'Leveraged Nuxt rendering strategies (SSR, SSG, SWR, ISR) with Cloudflare Page Rules, CDN, and caching; reduced TTFB by 52% (450ms → 220ms) and overall response times by 48%',
        'Implemented Stripe payment integration for end-user product purchases within the store',
        'Set up GitHub Actions CI/CD workflows for staging and production environments',
      ],
    },
    {
      company: 'Blue Creator Agency | Kimia Group',
      location: 'Remote, Madrid, Spain',
      period: 'Jan 2025 – Nov 2025',
      role: 'Senior Front End Developer',
      industry: 'Monetization & adTech',
      technologies: [
        'Nuxt',
        'Vue 3',
        'Vuetify',
        'Tailwind',
        'JavaScript',
        'TypeScript',
        'Google Analytics',
      ],
      highlights: [
        'Developed monetization/gamification consumer app with missions system (install apps, play games), points rewards, referral program with codes, daily missions, and redemption for 20+ gift card providers',
        'Delivered 120+ Jira tasks for internal CMS and consumer monetization app; ownership of product and tasks, delivery of critical features to production',
        'Implemented responsive pixel-perfect UIs from Figma mockups for high-quality user interfaces',
        'Led gradual migration of Vue components from Vuetify to Tailwind; pushed when ~70% migrated, reducing bundle size by 19% and improving LCP from 9.1s to 6.6s',
        'Implemented mechanism to track conversions and revenue per user via Google Analytics',
      ],
    },
    {
      company: 'BSE America',
      location: 'Remote, Panama',
      period: 'Jan 2024 – Nov 2024',
      role: 'Lead Developer',
      industry: 'E-commerce, Assets Management',
      technologies: [
        'Laravel 11',
        'Vue 3',
        'TypeScript',
        'Vuetify',
        'PHP',
        'PostgreSQL',
        'AWS S3',
        'Redis',
        'Swagger',
        'GitHub Actions',
      ],
      highlights: [
        "Architected and developed end-to-end CRM with RESTful APIs in Laravel for WooCommerce integration (products, customers, orders sync) and Panama's electronic billing system (YAML format, tax compliance), achieving near 100% delivery success rate",
        'Implemented CI/CD pipelines with automated code quality checks (PSR-12, PHPStan, PHPUnit), deployed backend to VPS and frontend to Vercel; reduced deployment time from ~20min to ~4min',
        'Integrated AWS S3 for secure file storage, Redis for caching, and Swagger for API documentation',
        'Mentored 3 developers to improve code review approval rates',
      ],
    },
    {
      company: 'EncodeBiz',
      location: 'Remote, Madrid, Spain',
      period: 'Nov 2023 – Jan 2024',
      role: 'Front End Developer',
      industry: 'Sports Tech',
      technologies: [
        'React',
        'PrimeReact',
        'JavaScript',
        'TypeScript',
        'Node.js',
        'Express.js',
        'React Testing Library',
      ],
      highlights: [
        'Spearheaded frontend for padel tournament system with scheduling, results, player registration & tracking, scoreboards, and tournament management',
        'Translated Figma into pixel-perfect React UI and increased admin flow completion by ~20%',
        'Integrated React UI with Node.js/Express API; optimized data flow and API calls, cutting integration issues by ~30%',
        'Wrote unit tests with React Testing Library for critical components and flows; improved code reliability and reduced support tickets',
      ],
    },
    {
      company: 'First Due (Inc 5000 company since 2022)',
      location: 'Remote, New York, US',
      period: 'Mar 2021 – Nov 2023',
      role: 'Full Stack Developer',
      industry: 'Fire & EMS, Assets Management',
      technologies: [
        'Vue 2',
        'Vue Router',
        'Yii 2',
        'Google Maps API',
        'ArcGIS',
        'PostgreSQL',
        'PHP',
        'Barcode/QR Scanner',
      ],
      highlights: [
        'Led migration of Yii PHP templates to Vue Router with per-module SPAs; reduced load time by 45%',
        'Built statistics module from scratch with reports; Fire Prevention stats sub-module, then other devs replicated for their modules',
        'Developed multi-tenant SaaS features for Fire Prevention, EMS, and Assets modules serving 40+ fire departments',
        'Implemented barcode/QR scanner component for asset tracking processing 5,000+ daily scans with 99%+ accuracy',
        'Integrated medical compliance (NEMSIS standard) for EMS module; handled medications and connected cardio readers apparatuses',
        'Worked on incident module with Google Maps and ArcGIS for incident tracking',
      ],
    },
    {
      company: 'Tecnomática',
      location: 'On-site, Havana, Cuba',
      period: 'Dec 2020 – Mar 2021',
      role: 'Front End Developer',
      industry: 'Logistics',
      technologies: [
        'Angular 11',
        'NgZorro',
        'JavaScript',
        'TypeScript',
        'PostgreSQL',
        'MySQL',
      ],
      highlights: [
        'Built Angular modules for fuel logistics system (distribution, stations management, storage, cisterns)',
        'Mentored junior developer (recent graduate, no framework experience) via pair programming and study roadmap',
        'Improved critical logistics queries by ~25-30% via database optimizations (indexes, normalization/denormalization) and migrations from MySQL to PostgreSQL',
      ],
    },
    {
      company: 'Grupo de Electrónica para el Turismo (GET)',
      location: 'On-site, Havana, Cuba',
      period: 'Mar 2019 – Nov 2020',
      role: 'Full Stack Developer',
      industry: 'Public Sector & Logistics',
      technologies: [
        'Laravel 6',
        'Vue 2',
        'Vuetify',
        'Elasticsearch',
        'Express.js',
        'Sequelize',
        'PostgreSQL',
        'PHP',
        'RBAC',
      ],
      highlights: [
        'Led development of multi-tenant Laravel/Vue document management system with RBAC (full CRUD over roles, based on permissions), document scanning & attachments, separate database per client',
        'Implemented Elasticsearch integration reducing search times to under 1 second',
        'Deployed on-premise version at Ministry (no internet, subnet only); manual deployment, stakeholder communication, infrastructure team coordination',
        'Implemented authentication via email + password + client selector',
        'Designed and implemented RESTful APIs for hotel restaurant reservation system (Express.js/Sequelize/PostgreSQL) with booking, availability, and menus for restaurants within hotels; improved booking completion by ~15%',
      ],
    },
    {
      company: 'Banco Central de Cuba (BCC)',
      location: 'On-site, Havana, Cuba',
      period: 'Sep 2018 – Feb 2019',
      role: 'Full Stack Developer (Junior)',
      industry: 'Banking, Assets Management',
      technologies: [
        '.NET Framework',
        'C#',
        'Entity Framework',
        'SQL Server',
        'Bootstrap',
      ],
      highlights: [
        'Implemented asset tracking, inventory updates, and compliance reporting in .NET/C#/SQL Server for physical assets',
        'Built forms and reports for internal audits and asset numbers for locals',
        'Implemented automated report generation and audit trail logging, reducing manual reporting effort by ~20-30%',
        'Collaborated with cross-departmental stakeholders to align the system with regulations, smoothing audits and reducing rework',
      ],
    },
  ],
  skillsSummary: {
    primary: ['Vue', 'Nuxt', 'React', 'Astro', 'TypeScript', 'JavaScript'],
    styling: [
      'Tailwind',
      'UnoCSS',
      'Vuetify',
      'PrimeReact',
      'NgZorro',
      'Bootstrap',
    ],
    backend: ['Laravel', 'PHP', 'Node.js', 'Express.js', '.NET', 'C#'],
    databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Elasticsearch', 'Redis'],
    cloud: ['AWS S3', 'Google Maps API', 'ArcGIS', 'Vercel', 'Cloudflare'],
    tools: ['Git', 'CI/CD', 'GitHub Actions', 'Swagger', 'Figma', 'Docker'],
    devops: [
      'VPS Setup',
      'Nginx',
      'SSL/TLS',
      'Serverless',
      'AWS Lambda',
      'Cloudflare Workers',
    ],
    testing: ['PHPUnit', 'React Testing Library', 'Jest', 'StoryBook'],
  },
  projects: [
    {
      title: 'My Wedding Website',
      description:
        'Elegant wedding celebration website with photo gallery and event details',
      technologies: ['Astro', 'React', 'TypeScript', 'UnoCSS', 'Three.js'],
      url: 'https://anais-rayko-weeding.vercel.app/',
      status: 'Deployed',
    },
    {
      title: 'Aqua Bar & Grill',
      description: 'Restaurant website with Sanity CMS admin panel',
      technologies: ['Astro', 'Sanity', 'React', 'TypeScript', 'UnoCSS', 'GA4'],
      status: 'In Progress',
    },
    {
      title: 'EasyFolio Hub',
      description:
        'Zero-cost portfolio creation platform using GitHub as data layer',
      technologies: ['Nuxt', 'Vue', 'TypeScript', 'UnoCSS', 'GitHub API'],
      url: 'https://easyfolio-hub.vercel.app/',
      status: 'Deprecated',
    },
  ],
  contact: {
    email: 'razcue@yandex.com',
    phone: '+53 5476-1244',
    location: 'Madrid, Spain',
    github: 'https://github.com/razcue',
    website: 'https://razcue.github.io',
  },
};

function getSystemPrompt(): string {
  const kb = knowledgeBase;

  const experienceList = kb.experience
    .map(
      (exp) =>
        `- ${exp.role} at ${exp.company} (${exp.period})
    Location: ${exp.location}
    Industry: ${exp.industry}
    Tech: ${exp.technologies.join(', ')}
    Highlights: ${exp.highlights.join('; ')}`
    )
    .join('\n\n');

  const skillsList = [
    `Primary: ${kb.skillsSummary.primary.join(', ')}`,
    `Styling: ${kb.skillsSummary.styling.join(', ')}`,
    `Backend: ${kb.skillsSummary.backend.join(', ')}`,
    `Databases: ${kb.skillsSummary.databases.join(', ')}`,
    `Cloud/DevOps: ${kb.skillsSummary.cloud.join(', ')}`,
    `Tools: ${kb.skillsSummary.tools.join(', ')}`,
  ].join('\n');

  const projectsList = kb.projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description} [${p.status}] (Tech: ${p.technologies.join(', ')})`
    )
    .join('\n');

  const educationList = kb.education
    .map(
      (edu) =>
        `- ${edu.degree} at ${edu.institution} (${edu.date})${edu.location ? ` - ${edu.location}` : ''}`
    )
    .join('\n');

  return `You are Rayko Azcue's AI assistant on his portfolio website. Your role is to help visitors learn about Rayko's background, experience, skills, and availability.

## ABOUT RAYKO
${kb.person.name} - ${kb.person.title}
${kb.person.tagline}
Location: ${kb.person.location}
Languages: ${kb.person.languages}
Open to: ${kb.person.openTo}
Target Roles: ${kb.person.targetRoles.join(', ')}
Availability: ${kb.person.availability}

## SUMMARY
${kb.summary}

## EDUCATION
${educationList}

## PROFESSIONAL EXPERIENCE
${experienceList}

## TECHNICAL SKILLS
${skillsList}

## SKILLS DETAILED
Technical: ${kb.skills.technical}
Soft Skills: ${kb.skills.soft}

## PROJECTS
${projectsList}

## CONTACT
Email: ${kb.contact.email}
Phone: ${kb.contact.phone}
Location: ${kb.contact.location}
GitHub: ${kb.contact.github}
Website: ${kb.contact.website}

## GUIDELINES
- Be friendly, professional, and concise
- Answer questions about Rayko experience, skills, and availability
- If you do not know something, say so honestly - do not make up information
- Direct visitors to contact Rayko if they have opportunities
- Keep responses brief and focused`;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const allowedOrigins = [
    'https://razcue.github.io',
    'http://localhost:4321',
    'http://localhost:3000',
  ];

  const origin = request.headers.origin || '';
  response.setHeader(
    'Access-Control-Allow-Origin',
    allowedOrigins.includes(origin) ? origin : 'https://razcue.github.io'
  );
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [] } = request.body;

    if (!message) {
      return response.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return response.status(500).json({ error: 'API key not configured' });
    }

    const messages = [
      { role: 'system', content: getSystemPrompt() },
      ...history.slice(-10).map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      { role: 'user', content: message },
    ];

    const groqResponse = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error('Groq API error:', error);
      return response
        .status(500)
        .json({ error: 'Failed to get response from AI' });
    }

    const data = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply =
      data.choices?.[0]?.message?.content ||
      'Sorry, I could not generate a response.';

    return response.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
