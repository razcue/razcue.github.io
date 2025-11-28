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
        period: '01/2025 - 11/2025',
        role: 'Senior Front End Developer',
        industry: 'Monetization & adTech',
        technologies: ['Nuxt', 'Vue 3', 'Vuetify', 'Tailwind', 'TypeScript'],
        bullets: [
          'Delivered front-end features for internal CMS and consumer-facing monetization app, resolving 120+ Jira tasks and translating Figma designs into pixel‑perfect, responsive UIs.',
          'Migrated 40+ Vue components from Vuetify to Tailwind and led performance optimizations that reduced bundle size by 19% and improved LCP from 9.1s to 6.6s, contributing to a 15% conversion lift.',
        ],
        description:
          'Delivered front end solutions for CMS and consumer app, migrating from Vuetify to Tailwind, and translating Figma designs into pixel-perfect implementations. Conducted performance reviews and optimizations to improve load times and user experience.',
      },
      {
        company: 'BSE America',
        location: 'Remote, Panama, Panama',
        period: '01/2024 - 11/2024',
        role: 'Lead Developer',
        industry: 'E-commerce, Assets Management',
        technologies: ['Laravel', 'TypeScript', 'Vue 3', 'Vuetify', 'Swagger'],
        bullets: [
          "Architected and developed from scratch an end‑to‑end CRM with a WooCommerce store comunication, integrated an automated invoicing and tax compliance module aligned with Panama's electronic bill system.",
          'Implemented CI/CD pipelines and AWS S3 secure storage, reducing deployment time from 20min to 4min and mentoring 3 developers to improve code review approval rate from 40% to 85%.',
        ],
        description:
          'Led architecture and development of an end‑to‑end CRM with WooCommerce integration and implemented RESTful APIs in Laravel, notification flows, and CI/CD to support reliable deployments.',
      },
      {
        company: 'EncodeBiz',
        location: 'Remote, Madrid, Spain',
        period: '11/2023 - 01/2024',
        role: 'Front End Developer',
        industry: 'Sports Tech',
        technologies: ['React', 'PrimeReact', 'TypeScript'],
        description:
          'Responsible for the front end of a padel tournament management system: translated Figma designs into a pixel‑perfect, responsive React UI and implemented robust front end–backend integrations with an Express.js API. Focused on maintainable, testable code and UX improvements to streamline scheduling, rankings and player management for admins and participants.',
      },
      {
        company: 'First Due @Inc5000',
        location: 'Remote, New York, US',
        period: '03/2021 - 11/2023',
        role: 'Full Stack Developer',
        industry: 'Fire & EMS, Assets Management',
        technologies: [
          'Vue 2',
          'Yii 2',
          'Google Maps API',
          'ArcGIS',
          'PostgreSQL',
        ],
        bullets: [
          'Delivered multi-tenant SaaS features across Fire Prevention, EMS and Assets modules serving 40+ fire departments, supporting company growth and contributing to Inc 5000 recognition.',
          'Enhanced geolocation capabilities and implemented a barcode/QR scanner processing 5,000+ daily scans with >99% accuracy, improving operational tracking and data reliability.',
        ],
        description:
          'Contributed multi-tenant features across multiple SaaS modules for fire and EMS operations, assets and operational workflows. Implemented a customized barcode/QR scanner component and integrated Google Maps and ArcGIS for geolocation mapping.',
      },
      {
        company: 'Tecnomática',
        location: 'On-site, Havana, Cuba',
        period: '12/2020 - 03/2021',
        role: 'Front End Developer',
        industry: 'Logistics',
        technologies: [
          'Angular 11',
          'NgZorro',
          'TypeScript',
          'PostgreSQL',
          'MySQL',
        ],
        description:
          'Developed the front end for a fuel logistics system using Angular 11 and NgZorro, building modules for fuel availability, movement tracking, and asset management. Assisted with database optimization and migration tasks to improve query performance. Mentored a junior developer on front end best practices, code organization, and Angular patterns.',
      },
      {
        company: 'Grupo de Electrónica para el Turismo',
        location: 'On-site, Havana, Cuba',
        period: '03/2019 - 11/2020',
        role: 'Full Stack Developer',
        industry: 'Public Sector & Logistics',
        technologies: [
          'Laravel',
          'Vue 2',
          'Vuetify',
          'Elasticsearch',
          'Express.js',
          'PostgreSQL',
        ],
        description:
          'Served as principal developer (working mostly independently) for a document management system built with Laravel and Vue 2. Implemented secure document storage, role‑based access control, and document search using Elasticsearch for fast retrieval. Developed asynchronous job processing for notifications to handle background tasks efficiently. Also contributed to the development of a hotel reservation platform using Express.js.',
      },
      {
        company: 'Banco Central de Cuba (BCC)',
        location: 'On-site, Havana, Cuba',
        period: '09/2018 - 02/2019',
        role: 'Full Stack Developer',
        industry: 'Banking, Assets Management',
        technologies: [
          '.NET Framework',
          'C#',
          'MVC',
          'Entity Framework',
          'SQL Server',
          'Bootstrap',
        ],
        description:
          "Developed a robust asset management system as part of the bank's internal compliance portal, improving lifecycle management, accountability, and regulatory compliance for critical banking assets. Engineered core functionalities including asset tracking, inventory updates, and compliance reporting. Collaborated with cross-departmental teams to define requirements aligned with banking regulations.",
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
