export default {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    openTo: 'Open To',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
    blog: 'Blog',
    lab: 'Lab',
  },

  // Blog
  blog: {
    title: 'Blog',
    subtitle: 'Thoughts on web development and more',
    featured: 'Featured',
    allPosts: 'All Posts',
    filterByTag: 'Filter by Tag',
    noPostsYet: 'No posts yet. Check back soon!',
    readArticle: 'Read Article',
    minRead: 'min read',
    backToBlog: 'Back to Blog',
    shareArticle: 'Share this article',
    shareOn: 'Share on',
    comments: 'Comments',
    updated: 'Updated',
    newsletter: {
      title: 'Subscribe to my Newsletter',
      description: 'Get the latest posts delivered right to your inbox',
      placeholder: 'your.email@example.com',
      subscribing: 'Subscribing...',
      subscribe: 'Subscribe',
      successMessage: 'Successfully subscribed! Check your email to confirm.',
      errorMessage: 'Failed to subscribe. Please try again.',
      poweredBy: 'Powered by Buttondown. No spam, unsubscribe anytime.',
    },
  },

  // Hero Section
  hero: {
    greeting: "Hi, I'm",
    name: 'Rayko Azcue',
    title: 'Software Engineer',
    subtitle: 'Front End Developer',
    description:
      'I build exceptional digital experiences with modern web technologies.',
    cta: 'Get In Touch',
    downloadResume: 'Resume',
  },

  // About Section
  about: {
    title: 'About Me',
    description: [
      'I specialize in bringing ideas to life through high-performance applications that drive real business results. With a primary focus on front end development and extensive backend experience, I create tailored solutions designed to boost conversions and meet your specific business objectives.',
      'Every business is unique, and so are my solutions. I deliver personalized digital experiences using modern technologies, with a strong emphasis on Core Web Vitals and business metrics, translating your goals into measurable outcomes.',
    ],
    siteMetrics: 'About This Site',
    siteMetricsDescription:
      'Built with performance and best practices in mind.',
    performance: 'Performance',
    accessibility: 'Accessibility',
    bestPractices: 'Best Practices',
    seo: 'SEO',
  },

  // Experience Section
  experience: {
    title: 'Professional Experience',
    present: 'Present',
    items: [
      {
        company: 'Blue Creator Agency | Kimia Group',
        location: 'Remote, Madrid, Spain',
        period: 'Jan/2025 - Nov/2025',
        role: 'Senior Front End Developer',
        industry: 'Monetization & adTech',
        technologies: [
          'Nuxt',
          'Vue 3',
          'Vuetify',
          'Tailwind',
          'JavaScript',
          'TypeScript',
        ],
        bullets: [
          'Delivered front-end features for internal CMS and consumer-facing monetization app, resolving 120+ Jira tasks and translating Figma designs into pixel‑perfect, responsive UIs.',
          'Migrated 40+ Vue components from Vuetify to Tailwind and led performance optimizations that reduced bundle size by 19% and improved LCP from 9.1s to 6.6s, contributing to a 15% conversion lift.',
        ],
      },
      {
        company: 'BSE America',
        location: 'Remote, Panama, Panama',
        period: 'Jan/2024 - Nov/2024',
        role: 'Lead Developer',
        industry: 'E-commerce, Assets Management',
        technologies: [
          'Laravel 11',
          'Vue 3',
          'TypeScript',
          'Vuetify',
          'Swagger',
          'JavaScript',
          'PHP',
        ],
        bullets: [
          "Architected and developed from scratch an end‑to‑end CRM with a WooCommerce store comunication, integrated an automated invoicing and tax compliance module aligned with Panama's electronic bill system.",
          'Implemented CI/CD pipelines and AWS S3 secure storage, reducing deployment time from 20min to 4min and mentoring 3 developers to improve code review approval rate from 40% to 85%.',
        ],
      },
      {
        company: 'EncodeBiz',
        location: 'Remote, Madrid, Spain',
        period: 'Nov/2023 - Jan/2024',
        role: 'Front End Developer',
        industry: 'Sports Tech',
        technologies: ['React', 'PrimeReact', 'JavaScript', 'TypeScript'],
        bullets: [
          'Spearheaded front-end development for a padel tournament system, translating Figma mockups into a pixel‑perfect, responsive React UI and increasing key admin flow completion speed by ~20%.',
          'Integrated the React UI with a Node.js/Express.js API and optimized local workflows with ngrok, cutting integration issues/support tickets by ~30% and shrinking backend feedback cycles from hours to minutes.',
        ],
      },
      {
        company: 'First Due @Inc5000',
        location: 'Remote, New York, US',
        period: 'Mar/2021 - Nov/2023',
        role: 'Full Stack Developer',
        industry: 'Fire & EMS, Assets Management',
        technologies: [
          'Vue 2',
          'Yii 2',
          'Google Maps API',
          'ArcGIS',
          'PostgreSQL',
          'JavaScript',
          'PHP',
        ],
        bullets: [
          'Delivered multi-tenant SaaS features across Fire Prevention, EMS and Assets modules serving 40+ fire departments, supporting company growth and contributing to Inc 5000 recognition.',
          'Enhanced geolocation capabilities and implemented a barcode/QR scanner processing 5,000+ daily scans with >99% accuracy, improving operational tracking and data reliability.',
        ],
      },
      {
        company: 'Tecnomática',
        location: 'On-site, Havana, Cuba',
        period: 'Dec/2020 - Mar/2021',
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
        bullets: [
          'Built front-end modules for a fuel logistics system (availability, movement, asset management) in Angular 11/NgZorro and mentored a junior developer to ship production features within a few weeks.',
          'Improved key logistics queries by an estimated 25–30% through PostgreSQL/MySQL optimization and migrations, increasing performance and reporting reliability.',
        ],
      },
      {
        company: 'Grupo de Electrónica para el Turismo',
        location: 'On-site, Havana, Cuba',
        period: 'Mar/2019 - Nov/2020',
        role: 'Junior Full Stack Developer',
        industry: 'Public Sector & Logistics',
        technologies: [
          'Laravel 6',
          'Vue 2',
          'Vuetify',
          'Elasticsearch',
          'Express.js',
          'PostgreSQL',
          'JavaScript',
          'PHP',
        ],
        bullets: [
          'Led a multi-tenant Laravel/Vue 2 document management system for the Tourism Ministry with secure storage and enhanced search powered by Elasticsearch, cutting typical search times from several seconds to under one second.',
          'Co‑built a hotel reservation system in Express.js/PostgreSQL, improving booking completion by an estimated 10–15% and enabling dynamic pricing with automated notifications.',
        ],
      },
      {
        company: 'Banco Central de Cuba (BCC)',
        location: 'On-site, Havana, Cuba',
        period: 'Sep/2018 - Feb/2019',
        role: 'Junior Full Stack Developer',
        industry: 'Banking, Assets Management',
        technologies: [
          '.NET Framework',
          'C#',
          'Entity Framework',
          'SQL Server',
          'Bootstrap',
        ],
        bullets: [
          'Implemented asset tracking, inventory, and compliance reporting in .NET/C#/SQL Server, reducing manual reporting effort for operations by an estimated 20–30%.',
          'Worked with multiple departments and compliance teams to align the system with regulations, smoothing cross‑departmental audits and cutting rework after reviews.',
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: 'Featured Projects',
    viewAll: 'View All Projects',
    talkAbout: "Let's Talk",
    status: {
      deployed: 'Deployed',
      'in-progress': 'In Progress',
      deprecated: 'Deprecated',
      idea: 'Idea',
    },
    items: [
      {
        title: 'My Wedding Website',
        description:
          'A simple and elegant website to showcase my wedding celebration. Features photo gallery and event details, with a beautiful interactive experience.',
        technologies: ['Astro', 'React', 'TypeScript', 'UnoCSS', 'Three.js'],
        githubUrl: 'https://github.com/razcue/my-weeding',
        liveUrl: 'https://anais-rayko-weeding.vercel.app/',
        license: 'MIT',
        status: 'deployed',
        pictureDesktopUrl: '/my-weeding-desktop.webp',
        pictureMobileUrl: '/my-weeding-mobile.webp',
      },
      {
        title: 'Aqua Bar & Grill',
        description:
          'A custom restaurant website featuring customized admin panel for easy content management powered by Sanity CMS. Built with high-performance Astro architecture, React components, UnoCSS styling, and Google Analytics 4 integration for comprehensive analytics.',
        technologies: [
          'Astro',
          'Sanity',
          'React',
          'TypeScript',
          'UnoCSS',
          'GA4',
        ],
        license: 'Private',
        status: 'in-progress',
      },
      {
        title: 'EasyFolio Hub',
        description:
          'A zero-cost infrastructure platform that enables anyone to create stunning portfolio or CV websites without technical knowledge. Built as a source-available, community-driven solution using GitHub as the data layer and Vercel for hosting. Features a mobile-first responsive design powered by Nuxt, Vue, and UnoCSS.',
        technologies: ['Nuxt', 'Vue', 'TypeScript', 'UnoCSS', 'GitHub API'],
        githubUrl: 'https://github.com/razcue/easyfolio-hub',
        liveUrl: 'https://easyfolio-hub.vercel.app/',
        license: 'Source-available',
        status: 'deprecated',
        pictureDesktopUrl: '/easyfolio-hub-desktop.webp',
        pictureMobileUrl: '/easyfolio-hub-mobile.webp',
      },
      {
        title: 'EasyFolio Template',
        description:
          'A flexible, public template for creating professional portfolio and CV websites. Features customizable themes with light/dark mode support, JSON-based content management, and ready-to-deploy configuration for GitHub Pages or Vercel. Built with Nuxt, Vue, and UnoCSS for a fully responsive experience.',
        technologies: ['Nuxt', 'Vue', 'TypeScript', 'UnoCSS'],
        githubUrl: 'https://github.com/razcue/easyfolio-template',
        license: 'CC BY-NC 4.0',
        status: 'deprecated',
      },
      {
        title: 'In-Tool Companions',
        description:
          'A SaaS on AI-powered embeddable widgets and extensions featuring interactive companions with chat capabilities and integrated applications. Designed for code editors, browsers, and other tools; providing a unified platform for creating, managing, and deploying intelligent companions across different environments.',
        technologies: ['Nuxt', 'TypeScript', 'AI/ML', 'WebSocket', 'APIs'],
        license: 'Private',
        status: 'idea',
      },
    ],
  },

  // Contact Section
  contact: {
    title: 'Get In Touch',
    description:
      "I'm always interested in new opportunities and collaborations.",
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    success:
      "Message sent! I'll get back to you soon at the email you provided.",
    successDetails: 'Check your inbox for a confirmation.',
    error: 'Failed to send message. Please try again.',
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project inquiry',
      message: 'Tell me about your project...',
    },
  },

  // Footer
  footer: {
    copyright: '© {year} Rayko Azcue. All rights reserved.',
  },

  // SEO Meta
  seo: {
    title: 'Rayko Azcue - Front End Developer',
    description:
      'Portfolio of Rayko Azcue - Front End Developer specializing in Vue, Nuxt, React, Astro, Tailwind, UnoCSS, and TypeScript. Experience in modern and responsive web development.',
    keywords:
      'Rayko Azcue, front end developer, Vue, Nuxt, React, Astro, TypeScript, JavaScript, Tailwind, UnoCSS, Node.js, Laravel, PHP, web development',
    ogImageAlt: 'Rayko Azcue - Front End Developer',
    siteName: 'Rayko Azcue Portfolio',
    jobTitle: 'Front End Developer',
  },
  // Job status / availability
  openTo: {
    title: "I'm actively looking for new opportunities",
    intro:
      "Below are the roles I'm targeting and my availability. If you think I might be a good fit, let's talk!",
    rolesTitle: 'Target Roles',
    roles: ['Front End Developer', 'Full Stack Developer'],
    preferredRole: 'Preferred',
    availabilityTitle: 'Availability & Location',
    availability: [
      'Remote globally within an English or Spanish setup',
      'On-site/Hybrid with relocation basis. Prefer family relocation packages. Primary interest: Latin America or Spain, but open to discussing other locations',
    ],
    ctaTalk: "Let's Talk",
  },
};
