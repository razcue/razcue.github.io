export default {
  // Navigation
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    openTo: 'Abierto A',
    experience: 'Experiencia',
    projects: 'Proyectos',
    contact: 'Contacto',
    blog: 'Blog',
    lab: 'Laboratorio',
  },

  // Estado laboral / disponibilidad
  openTo: {
    title: 'Estoy buscando activamente nuevas oportunidades',
    intro:
      'Abajo están los roles que me interesan y mi disponibilidad. Si crees que puedo ser un buen candidato, ¡hablemos!',
    rolesTitle: 'Roles Buscados',
    roles: ['Front End Developer', 'Full Stack Developer'],
    preferredRole: 'Preferido',
    availabilityTitle: 'Disponibilidad y Ubicación',
    availability: [
      'Remoto globalmente en entorno de inglés o español',
      'Presencial/Híbrido con base de reubicación. Prefiero paquetes de reubicación familiar. Interés principal: América Latina o España, pero abierto a discutir otras ubicaciones',
    ],
    ctaTalk: 'Hablemos',
  },
  // Blog
  blog: {
    title: 'Blog',
    subtitle: 'Reflexiones sobre desarrollo web y más',
    featured: 'Destacado',
    allPosts: 'Todos los Artículos',
    filterByTag: 'Filtrar por Etiqueta',
    noPostsYet: '¡No hay artículos todavía. Vuelve pronto!',
    readArticle: 'Leer Artículo',
    minRead: 'min de lectura',
    backToBlog: 'Volver al Blog',
    shareArticle: 'Compartir este artículo',
    shareOn: 'Compartir en',
    comments: 'Comentarios',
    updated: 'Actualizado',
  },

  // Hero Section
  hero: {
    greeting: 'Hola, soy',
    name: 'Rayko Azcue',
    title: 'Ingeniero de Software',
    subtitle: 'Desarrollador Front End',
    description:
      'Creo experiencias digitales excepcionales con tecnologías web modernas.',
    cta: 'Contactar',
    downloadResume: 'Currículum',
  },

  // About Section
  about: {
    title: 'Sobre Mí',
    description: [
      'Me especializo en dar vida a las ideas a través de aplicaciones de alto rendimiento que generan resultados comerciales reales. Con un enfoque principal en desarrollo front end y amplia experiencia en backend, creo soluciones personalizadas diseñadas para impulsar conversiones y alcanzar tus objetivos comerciales específicos.',
      'Cada negocio es único, y también lo son mis soluciones. Entrego experiencias digitales personalizadas utilizando tecnologías modernas, con un fuerte énfasis en Core Web Vitals y métricas de negocio, traduciendo tus objetivos en resultados medibles.',
    ],
    siteMetrics: 'Sobre Este Sitio',
    siteMetricsDescription:
      'Construido con rendimiento y mejores prácticas en mente.',
    performance: 'Rendimiento',
    accessibility: 'Accesibilidad',
    bestPractices: 'Mejores Prácticas',
    seo: 'SEO',
  },

  // Experience Section
  experience: {
    title: 'Experiencia Profesional',
    present: 'Presente',
    items: [
      {
        company: 'Blue Creator Agency | Kimia Group',
        location: 'Remoto, Madrid, España',
        period: 'Ene/2025 - Nov/2025',
        role: 'Senior Front End Developer',
        industry: 'Monetización & adTech',
        technologies: [
          'Nuxt',
          'Vue 3',
          'Vuetify',
          'Tailwind',
          'JavaScript',
          'TypeScript',
        ],
        bullets: [
          'Implementé características front‑end para un CMS interno y una app de monetización; resolví más de 120 incidencias en Jira y transformé los diseños de Figma en interfaces responsivas y fieles al diseño.',
          'Migré más de 40 componentes Vue de Vuetify a Tailwind y lideré optimizaciones de rendimiento que redujeron el bundle en un 19% y mejoraron el LCP de 9.1s a 6.6s.',
        ],
      },
      {
        company: 'BSE America',
        location: 'Remoto, Panamá, Panamá',
        period: 'Ene/2024 - Nov/2024',
        role: 'Lead Developer',
        industry: 'E-commerce, Gestión de Activos',
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
          'Diseñé y desarrollé un CRM de extremo a extremo con integración a WooCommerce, incluida facturación automatizada y seguimiento fiscal adapatadas al sistema electrónico de Panamá.',
          'Establecí flujos de integración y despliegue continuo, almacenamiento seguro en AWS S3, reduciendo el tiempo de despliegue de ~20min a ~4min; además formé a 3 desarrolladores, elevando la tasa de aprobación de revisiones de código de 40% a 85%.',
        ],
      },
      {
        company: 'EncodeBiz',
        location: 'Remoto, Madrid, España',
        period: '11/2023 - 01/2024',
        role: 'Front End Developer',
        industry: 'Sports Tech',
        technologies: ['React', 'PrimeReact', 'JavaScript', 'TypeScript'],
        bullets: [
          'Implementé varios módulos de front‑end para un sistema de gestión de torneos de pádel, transformando de Figma en interfaces responsivas basadas en componentes de React y aumentando la completitud de procesos administrativos en ~20%.',
          'Integré la interfaz con una API en Node.js/Express y optimicé flujos locales con ngrok, reduciendo incidencias y tickets de soporte en ~30% y acortando los ciclos de retroalimentación entre equipos.',
        ],
      },
      {
        company: 'First Due @Inc5000',
        location: 'Remoto, Nueva York, EE. UU.',
        period: '03/2021 - 11/2023',
        role: 'Full Stack Developer',
        industry: 'Fire & EMS, Gestión de Activos',
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
          'Implementé características multi‑tenant en módulos SaaS para prevención de incendios, EMS y gestión de activos, dando servicio a más de 40 departamentos de bomberos.',
          'Mejoré funcionalidades de geolocalización e implementé un escáner de códigos/QR que procesaba más de 5,000 escaneos diarios con >99% de precisión, mejorando la trazabilidad operativa.',
        ],
      },
      {
        company: 'Tecnomática',
        location: 'Presencial, La Habana, Cuba',
        period: '12/2020 - 03/2021',
        role: 'Front End Developer',
        industry: 'Logística',
        technologies: [
          'Angular 11',
          'NgZorro',
          'JavaScript',
          'TypeScript',
          'PostgreSQL',
          'MySQL',
        ],
        bullets: [
          'Implementé módulos de interfaz de usuario en Angular 11 (NgZorro) para un sistema de logística de combustible, centrados en disponibilidad, movimiento y gestión de activos.',
          'Optimizé consultas claves de logística en ~25–30% mediante migraciones y ajustes de base de datos PostgreSQL/MySQL, aumentando el rendimiento y la fiabilidad de los informes.',
        ],
      },
      {
        company: 'Grupo de Electrónica para el Turismo',
        location: 'Presencial, La Habana, Cuba',
        period: 'Mar/2019 - Nov/2020',
        role: 'Junior Full Stack Developer',
        industry: 'Sector Público & Logística',
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
          'Lideré el desarrollo de un sistema multi‑tenant de gestión documental (Laravel/Vue 2) con almacenamiento seguro y búsqueda mejorada basada en Elasticsearch, reduciendo tiempos de búsqueda típicos a <1s.',
          'Co‑desarrollé una plataforma de reservas hoteleras (Express.js/PostgreSQL), mejorando la tasa de conversión de reservas en ~10–15% y habilitando precios dinámicos con notificaciones automatizadas.',
        ],
      },
      {
        company: 'Banco Central de Cuba (BCC)',
        location: 'Presencial, La Habana, Cuba',
        period: 'Sep/2018 - Feb/2019',
        role: 'Junior Full Stack Developer',
        industry: 'Banca, Gestión de Activos',
        technologies: [
          '.NET Framework',
          'C#',
          'Entity Framework',
          'SQL Server',
          'Bootstrap',
        ],
        bullets: [
          'Implementé seguimiento de activos, actualizaciones de inventario y reportes de cumplimiento en .NET/C#/SQL Server, reduciendo el trabajo manual en ~20–30%.',
          'Colaboré con distintos departamentos y equipos de cumplimiento normativo para alinear el sistema con regulaciones, reduciendo el trabajo derivado de las auditorías.',
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: 'Proyectos Destacados',
    viewAll: 'Ver Todos los Proyectos',
    talkAbout: 'Hablemos',
    status: {
      deployed: 'Desplegado',
      'in-progress': 'En Progreso',
      deprecated: 'Descontinuado',
      idea: 'Idea',
    },
    items: [
      {
        title: 'Sitio Web de Mi Boda',
        description:
          'Un sitio web simple y elegante para mostrar la celebración de mi boda. Incluye galería de fotos y detalles del evento, con una hermosa experiencia interactiva.',
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
          'Un sitio web de restaurante personalizado con panel de administración para facilitar la gestión de contenido, impulsado por Sanity CMS. Construido con arquitectura de alto rendimiento basada en Astro, componentes en React, estilos con UnoCSS e integración de Google Analytics 4 para análisis completos.',
        technologies: [
          'Astro',
          'Sanity',
          'React',
          'TypeScript',
          'UnoCSS',
          'GA4',
        ],
        license: 'Privado',
        status: 'in-progress',
      },
      {
        title: 'EasyFolio Hub',
        description:
          'Una plataforma sobre infraestructura de costo cero que permite a cualquiera crear impresionantes sitios web de portafolio o CV sin conocimientos técnicos. Construida como una solución disponible y orientada a la comunidad, utilizando GitHub como capa de datos y Vercel para alojamiento. Cuenta con un diseño responsive mobile-first impulsado por Nuxt, Vue y UnoCSS.',
        technologies: ['Nuxt', 'Vue', 'TypeScript', 'UnoCSS', 'GitHub API'],
        githubUrl: 'https://github.com/razcue/easyfolio-hub',
        liveUrl: 'https://easyfolio-hub.vercel.app/',
        license: 'Código disponible',
        status: 'deprecated',
        pictureDesktopUrl: '/easyfolio-hub-desktop.webp',
        pictureMobileUrl: '/easyfolio-hub-mobile.webp',
      },
      {
        title: 'EasyFolio Template',
        description:
          'Una plantilla pública y flexible para crear sitios web profesionales de portafolio y CV. Incluye temas personalizables con soporte para modo claro/oscuro, gestión de contenido basada en JSON y configuración lista para desplegar en GitHub Pages o Vercel. Construida con Nuxt, Vue y UnoCSS para una experiencia completamente responsive.',
        technologies: ['Nuxt', 'Vue', 'TypeScript', 'UnoCSS'],
        githubUrl: 'https://github.com/razcue/easyfolio-template',
        license: 'CC BY-NC 4.0',
        status: 'deprecated',
      },
      {
        title: 'In-Tool Companions',
        description:
          'Un SaaS de widgets y extensiones embebibles impulsados por IA que presentan compañeros interactivos con capacidades de chat y aplicaciones integradas. Diseñado para editores de código, navegadores y otras herramientas; proporcionando una plataforma unificada para crear, gestionar y desplegar compañeros inteligentes en diferentes entornos.',
        technologies: ['Nuxt', 'TypeScript', 'AI/ML', 'WebSocket', 'APIs'],
        license: 'Privado',
        status: 'idea',
      },
    ],
  },

  // Contact Section
  contact: {
    title: 'Ponte en Contacto',
    description:
      'Siempre estoy interesado en nuevas oportunidades y colaboraciones.',
    name: 'Nombre',
    email: 'Correo Electrónico',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar Mensaje',
    sending: 'Enviando...',
    success:
      '¡Mensaje enviado! Te responderé pronto al correo que proporcionaste.',
    successDetails: 'Revisa tu bandeja de entrada para una confirmación.',
    error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    placeholders: {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      subject: 'Consulta de proyecto',
      message: 'Cuéntame sobre tu proyecto...',
    },
  },

  // Footer
  footer: {
    copyright: '© {year} Rayko Azcue. Todos los derechos reservados.',
  },

  // SEO Meta
  seo: {
    title: 'Rayko Azcue - Desarrollador Front End',
    description:
      'Portfolio de Rayko Azcue - Desarrollador Front End especializado en Vue, Nuxt, React, Astro, Tailwind, UnoCSS y TypeScript. Experiencia en desarrollo web moderno y responsive.',
    keywords:
      'Rayko Azcue, desarrollador front end, Vue, Nuxt, React, Astro, TypeScript, JavaScript, Tailwind, UnoCSS, Node.js, Laravel, PHP, desarrollo web',
    ogImageAlt: 'Rayko Azcue - Desarrollador Front End',
    siteName: 'Rayko Azcue Portfolio',
    jobTitle: 'Desarrollador Front End',
  },
};
