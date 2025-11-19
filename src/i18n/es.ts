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
    newsletter: {
      title: 'Suscríbete a mi Newsletter',
      description:
        'Recibe los últimos artículos directamente en tu bandeja de entrada',
      placeholder: 'tu.email@ejemplo.com',
      subscribing: 'Suscribiendo...',
      subscribe: 'Suscribirse',
      successMessage: '¡Suscripción exitosa! Revisa tu email para confirmar.',
      errorMessage: 'Error al suscribirse. Por favor intenta de nuevo.',
      poweredBy: 'Powered by Buttondown. Sin spam, cancela cuando quieras.',
    },
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
        period: '01/2025 - 11/2025',
        role: 'Senior Front End Developer',
        industry: 'Monetización & adTech',
        technologies: ['Nuxt', 'Vue 3', 'Vuetify', 'Tailwind', 'TypeScript'],
        description:
          'Entregué soluciones front end para CMS y app de consumo, migrando de Vuetify a Tailwind y traduciendo diseños de Figma en implementaciones pixel-perfect. Asumí la entrega completa de funcionalidades de principio a fin desde el desarrollo hasta el despliegue en producción, colaborando con QA y Product Managers para asegurar estándares de calidad. Realicé revisiones y optimizaciones de rendimiento, mejorando tiempos de carga y experiencia de usuario.',
      },
      {
        company: 'BSE America',
        location: 'Remoto, Panamá, Panamá',
        period: '01/2024 - 11/2024',
        role: 'Lead Developer',
        industry: 'E-commerce, Gestión de Activos',
        technologies: ['Laravel', 'TypeScript', 'Vue 3', 'Vuetify', 'Swagger'],
        description:
          'Dirigí la arquitectura y el desarrollo de un CRM completo con integración con WooCommerce, entregando módulos principales para ventas, productos, logística, consignaciones y contratos. Diseñé e implementé APIs RESTful en Laravel, añadí flujos de notificaciones (email, WhatsApp) e implementé flujos CI/CD y almacenamiento seguro en AWS S3 para soportar despliegues fiables. Trabajé directamente con product owners para priorizar funcionalidades y guié al equipo de desarrollo para ofrecer funcionalidades escalables y listas para producción, además de adiestrar al equipo de desarrollo.',
      },
      {
        company: 'EncodeBiz',
        location: 'Remoto, Madrid, España',
        period: '11/2023 - 01/2024',
        role: 'Front End Developer',
        industry: 'Sports Tech',
        technologies: ['React', 'PrimeReact', 'TypeScript'],
        description:
          'Responsable del front end de un sistema de gestión de torneos de pádel: traduje diseños de Figma en una interfaz de usuario responsive y pixel-perfect basada en React, e implementé integraciones robustas front end–backend con una API en Express.js. Enfocado en código mantenible y testeable y en mejoras de UX para optimizar la gestión de calendarios, rankings y participantes.',
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
        ],
        description:
          'Contribuí con funcionalidades multi-tenant en múltiples módulos SaaS para operaciones de bomberos y EMS, activos y flujos operativos. Implementé un componente personalizado de escáner de código de barras/QR, integré Google Maps y ArcGIS para mapeo geolocalizado, solucioné bugs críticos y reforcé prácticas de calidad de código mediante revisiones y estándares. Colaboré estrechamente con producto, diseño y operaciones para agregar valor a la plataforma. La empresa logró entrar en el Inc 5000 durante cuatro años consecutivos desde 2022.',
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
          'TypeScript',
          'PostgreSQL',
          'MySQL',
        ],
        description:
          'Desarrollé el front end para un sistema de logística de combustible usando Angular 11 y NgZorro, centrado en disponibilidad de combustible, seguimiento de movimientos y gestión de activos. Asistí con tareas de optimización y migración de bases de datos para mejorar el rendimiento de consultas. Adiestré a un desarrollador junior acerca de buenas prácticas front end, organización de código y patrones de Angular.',
      },
      {
        company: 'Grupo de Electrónica para el Turismo',
        location: 'Presencial, La Habana, Cuba',
        period: '03/2019 - 11/2020',
        role: 'Full Stack Developer',
        industry: 'Sector Público & Logística',
        technologies: [
          'Laravel',
          'Vue 2',
          'Vuetify',
          'Elasticsearch',
          'Express.js',
          'PostgreSQL',
        ],
        description:
          'Fungí como desarrollador principal (trabajando mayormente de forma independiente) para un sistema de gestión documental construido con Laravel y Vue 2. Implementé almacenamiento seguro de documentos, control de acceso basado en roles y búsqueda de documentos usando Elasticsearch para recuperación rápida. Desarrollé procesamiento asíncrono de notificaciones para manejar tareas en segundo plano eficientemente. También contribuí al desarrollo de una plataforma de reservas hoteleras usando Express.js.',
      },
      {
        company: 'Banco Central de Cuba (BCC)',
        location: 'Presencial, La Habana, Cuba',
        period: '09/2018 - 02/2019',
        role: 'Full Stack Developer',
        industry: 'Banca, Gestión de Activos',
        technologies: [
          '.NET Framework',
          'C#',
          'MVC',
          'Entity Framework',
          'SQL Server',
          'Bootstrap',
        ],
        description:
          'Desarrollé un sistema robusto de gestión de activos como parte del portal de cumplimiento interno del banco, mejorando la gestión del ciclo de vida, la rendición de cuentas y el cumplimiento normativo para activos bancarios críticos. Ingenieré funcionalidades principales incluyendo seguimiento de activos, actualizaciones de inventario y reportes de cumplimiento. Colaboré con equipos interdepartamentales para definir requisitos alineados con regulaciones bancarias.',
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
