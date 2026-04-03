import type { VercelRequest, VercelResponse } from '@vercel/node';

interface AlexaRequest {
  version: string;
  session: {
    new: boolean;
    sessionId: string;
    application: { applicationId: string };
    user: { userId: string };
  };
  request: {
    type: string;
    requestId: string;
    timestamp: string;
    locale: string;
    intent?: {
      name: string;
      confirmationStatus: string;
      slots?: Record<string, unknown>;
    };
  };
  context?: {
    System?: {
      application?: { applicationId: string };
      user?: { userId: string };
    };
  };
}

const knowledgeBase = {
  person: {
    name: 'Rayko Azcue',
    title: 'Senior Software Engineer',
    tagline:
      'Front End & Full Stack Engineer with 7+ years building scalable, performant web applications. Expert in Vue, Nuxt, React and TypeScript.',
    location: 'Madrid, Spain',
    openTo:
      'Remote globally within English or Spanish setup. On-site/hybrid with relocation to Latin America or Spain.',
    targetRoles: ['Front End Developer', 'Full Stack Developer'],
    availability: 'Actively looking for new opportunities',
    languages: 'English (C1 - Advanced), Spanish (Native)',
    yearsOfExperience: 7,
  },
  contact: {
    email: 'razcue@yandex.com',
    github: 'github.com/razcue',
    website: 'razcue.github.io',
  },
  currentRole: {
    company: 'Delfín Motor Labs SL',
    role: 'Senior Front End Developer',
    period: 'Jan 2026 - Present',
    location: 'Remote, Madrid, Spain',
    industry: 'E-commerce, Automotive',
  },
  skills: {
    primary: ['Vue', 'Nuxt', 'React', 'Astro', 'TypeScript', 'JavaScript'],
    frameworks: ['Tailwind', 'UnoCSS', 'Vuetify', 'PrimeReact', 'NgZorro'],
    backend: ['Laravel', 'PHP', 'Node.js', 'Express.js', '.NET', 'C#'],
    databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Elasticsearch', 'Redis'],
  },
  education: [
    {
      institution: 'University of Informatics Sciences',
      degree: "Bachelor's degree",
      location: 'Havana, Cuba',
      date: '2013 - 2018',
    },
    {
      institution: 'freeCodeCamp',
      degree: 'Responsive Web Design Certificate',
      location: 'Online',
      date: '2021',
    },
  ],
  projects: [
    { title: 'My Wedding Website', status: 'Deployed' },
    { title: 'Aqua Bar & Grill', status: 'In Progress' },
    { title: 'EasyFolio Hub', status: 'Deprecated' },
  ],
};

function getStaticResponse(intentName: string, locale: string): string | null {
  const isSpanish = locale.startsWith('es');

  const responses: Record<string, { en: string; es: string }> = {
    GetNameIntent: {
      en: "My name is Rayko Azcue. I'm a Senior Software Engineer.",
      es: 'Mi nombre es Rayko Azcue. Soy Ingeniero de Software Senior.',
    },
    GetTitleIntent: {
      en: 'I am a Senior Front End and Full Stack Engineer with over 7 years of experience building web applications.',
      es: 'Soy Ingeniero Front End y Full Stack Senior con más de 7 años de experiencia construyendo aplicaciones web.',
    },
    GetSummaryIntent: {
      en: `I am ${knowledgeBase.person.name}, ${knowledgeBase.person.tagline} I specialize in Vue, Nuxt, React and TypeScript, with experience in e-commerce, SaaS, and enterprise platforms.`,
      es: `Soy ${knowledgeBase.person.name}, ${knowledgeBase.person.tagline} Especializado en Vue, Nuxt, React y TypeScript, con experiencia en comercio electrónico, SaaS y plataformas empresariales.`,
    },
    GetExperienceIntent: {
      en: `I have ${knowledgeBase.person.yearsOfExperience}+ years of experience. Currently working as ${knowledgeBase.currentRole.role} at ${knowledgeBase.currentRole.company}. Previously at Blue Creator Agency, BSE America, EncodeBiz, First Due (Inc 5000), Tecnomática, and more.`,
      es: `Tengo ${knowledgeBase.person.yearsOfExperience}+ años de experiencia. Actualmente trabajo como ${knowledgeBase.currentRole.role} en ${knowledgeBase.currentRole.company}. Anteriormente en Blue Creator Agency, BSE America, EncodeBiz, First Due (Inc 5000), Tecnomática, y más.`,
    },
    GetCurrentRoleIntent: {
      en: `I am currently working as ${knowledgeBase.currentRole.role} at ${knowledgeBase.currentRole.company} in ${knowledgeBase.currentRole.location}, working with Nuxt, Vuetify, Tailwind, Laravel, and TypeScript.`,
      es: `Actualmente trabajo como ${knowledgeBase.currentRole.role} en ${knowledgeBase.currentRole.company} en ${knowledgeBase.currentRole.location}, trabajando con Nuxt, Vuetify, Tailwind, Laravel y TypeScript.`,
    },
    GetSkillsIntent: {
      en: `My technical skills include: ${knowledgeBase.skills.primary.join(', ')}, ${knowledgeBase.skills.frameworks.join(', ')}, ${knowledgeBase.skills.backend.join(', ')}, and ${knowledgeBase.skills.databases.join(', ')}.`,
      es: `Mis habilidades técnicas incluyen: ${knowledgeBase.skills.primary.join(', ')}, ${knowledgeBase.skills.frameworks.join(', ')}, ${knowledgeBase.skills.backend.join(', ')}, y ${knowledgeBase.skills.databases.join(', ')}.`,
    },
    GetAvailabilityIntent: {
      en: knowledgeBase.person.availability,
      es: `Estoy ${knowledgeBase.person.availability.toLowerCase()}.`,
    },
    GetLocationIntent: {
      en: `I am based in ${knowledgeBase.person.location}.`,
      es: `Estoy basado en ${knowledgeBase.person.location}.`,
    },
    GetContactIntent: {
      en: `You can contact me at ${knowledgeBase.contact.email}. My GitHub is ${knowledgeBase.contact.github}.`,
      es: `Puedes contactarme en ${knowledgeBase.contact.email}. Mi GitHub es ${knowledgeBase.contact.github}.`,
    },
    GetEducationIntent: {
      en: `I have a ${knowledgeBase.education[0].degree} from ${knowledgeBase.education[0].institution} in ${knowledgeBase.education[0].location}. Also certified in Responsive Web Design by freeCodeCamp.`,
      es: `Tengo un ${knowledgeBase.education[0].degree} de ${knowledgeBase.education[0].institution} en ${knowledgeBase.education[0].location}. También certificado en Diseño Web Responsivo por freeCodeCamp.`,
    },
    GetProjectsIntent: {
      en: `Some of my projects include: ${knowledgeBase.projects.map((p) => `${p.title} (${p.status})`).join(', ')}. You can see more at ${knowledgeBase.contact.website}.`,
      es: `Algunos de mis proyectos incluyen: ${knowledgeBase.projects.map((p) => `${p.title} (${p.status})`).join(', ')}. Puedes ver más en ${knowledgeBase.contact.website}.`,
    },
    GetLanguagesIntent: {
      en: knowledgeBase.person.languages,
      es: 'Inglés (C1 - Avanzado), Español (Nativo)',
    },
    GetGitHubIntent: {
      en: `My GitHub profile is ${knowledgeBase.contact.github}.`,
      es: `Mi perfil de GitHub es ${knowledgeBase.contact.github}.`,
    },
    GetYearsExperienceIntent: {
      en: `I have ${knowledgeBase.person.yearsOfExperience}+ years of professional experience in software development.`,
      es: `Tengo ${knowledgeBase.person.yearsOfExperience}+ años de experiencia profesional en desarrollo de software.`,
    },
    GetRemoteWorkIntent: {
      en: `Yes, I am open to remote work globally. I have experience working with distributed teams across US, Spain, and Latin America.`,
      es: `Sí, estoy abierto al trabajo remoto globalmente. Tengo experiencia trabajando con equipos distribuidos en EE.UU., España y América Latina.`,
    },
    'AMAZON.HelpIntent': {
      en: "You can ask me about Rayko's experience, skills, current job, projects, how to contact him, or anything about his background. What would you like to know?",
      es: 'Puedes preguntarme sobre la experiencia de Rayko, sus habilidades, trabajo actual, proyectos, cómo contactarlo, o cualquier cosa sobre su historial. ¿Qué te gustaría saber?',
    },
    'AMAZON.StopIntent': {
      en: "Thank you for listening! Feel free to visit Rayko's portfolio at razcue.github.io",
      es: '¡Gracias por escuchar! No dudes en visitar el portfolio de Rayko en razcue.github.io',
    },
    'AMAZON.CancelIntent': {
      en: 'Okay, let me know if you need anything else.',
      es: 'Está bien, avísame si necesitas algo más.',
    },
  };

  const response = responses[intentName];
  if (!response) return null;

  return isSpanish ? response.es : response.en;
}

async function getAIResponse(
  userMessage: string,
  locale: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return locale.startsWith('es')
      ? 'Lo siento, el servicio de IA no está configurado correctamente.'
      : 'Sorry, the AI service is not configured correctly.';
  }

  const isSpanish = locale.startsWith('es');
  const systemPrompt = isSpanish
    ? `Eres el asistente de IA de Rayko Azcue en su portfolio. Tu rol es ayudar a los visitantes a conocer sobre Rayko, su experiencia, habilidades y disponibilidad. Responde de manera friendly y profesional en español.`
    : `You are Rayko Azcue's AI assistant on his portfolio website. Your role is to help visitors learn about Rayko's background, experience, skills, and availability. Respond in a friendly and professional manner in English.`;

  const kbInfo = `
## ABOUT RAYKO
Name: ${knowledgeBase.person.name}
Title: ${knowledgeBase.person.title}
Location: ${knowledgeBase.person.location}
Years of Experience: ${knowledgeBase.person.yearsOfExperience}+ years
Languages: ${knowledgeBase.person.languages}

## CURRENT ROLE
${knowledgeBase.currentRole.role} at ${knowledgeBase.currentRole.company}
Technologies: Nuxt, Vuetify, Tailwind, Laravel, TypeScript

## SKILLS
Primary: ${knowledgeBase.skills.primary.join(', ')}
Frameworks: ${knowledgeBase.skills.frameworks.join(', ')}
Backend: ${knowledgeBase.skills.backend.join(', ')}

## CONTACT
Email: ${knowledgeBase.contact.email}
GitHub: ${knowledgeBase.contact.github}
Website: ${knowledgeBase.contact.website}

Guidelines:
- Be friendly, professional and concise
- Answer questions about Rayko's experience, skills, and availability
- If you don't know something, say so honestly
- Keep responses brief for voice (2-3 sentences max)
  `;

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: `${systemPrompt}\n\n${kbInfo}` },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 256,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      return isSpanish
        ? 'Lo siento, tuve un problema al generar la respuesta. Puedes visitar razcue.github.io para más información.'
        : 'Sorry, I had trouble generating a response. You can visit razcue.github.io for more information.';
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    return (
      data.choices?.[0]?.message?.content ||
      (isSpanish
        ? 'Lo siento, no pude generar una respuesta.'
        : 'Sorry, I could not generate a response.')
    );
  } catch (error) {
    console.error('AI response error:', error);
    return isSpanish
      ? 'Lo siento, ocurrió un error al procesar tu solicitud.'
      : 'Sorry, an error occurred processing your request.';
  }
}

function buildAlexaResponse(
  outputSpeech: string,
  shouldEndSession: boolean = true
) {
  return {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: `<speak>${outputSpeech}</speak>`,
      },
      shouldEndSession,
    },
  };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const alexaRequest = request.body as AlexaRequest;

    if (!alexaRequest.request || !alexaRequest.request.type) {
      return response.status(400).json({ error: 'Invalid Alexa request' });
    }

    const locale = alexaRequest.request.locale || 'en-US';
    const requestType = alexaRequest.request.type;

    if (requestType === 'LaunchRequest') {
      const welcomeMsg = locale.startsWith('es')
        ? 'Bienvenido a Rayko Portfolio. Soy el asistente de voz de Rayko Azcue. Puedes preguntarme sobre su experiencia, habilidades o proyectos. ¿Qué te gustaría saber?'
        : "Welcome to Rayko Portfolio. I am Rayko Azcue's voice assistant. You can ask me about his experience, skills, or projects. What would you like to know?";
      return response.json(buildAlexaResponse(welcomeMsg));
    }

    if (requestType === 'IntentRequest') {
      const intentName = alexaRequest.request.intent?.name;

      if (!intentName) {
        return response.status(400).json({ error: 'No intent provided' });
      }

      const staticResponse = getStaticResponse(intentName, locale);

      if (staticResponse) {
        const shouldEnd = ['AMAZON.StopIntent', 'AMAZON.CancelIntent'].includes(
          intentName
        );
        return response.json(buildAlexaResponse(staticResponse, shouldEnd));
      }

      if (intentName === 'AMAZON.FallbackIntent') {
        const userMessage = 'Tell me about Rayko Azcue';
        const aiResponse = await getAIResponse(userMessage, locale);
        return response.json(buildAlexaResponse(aiResponse));
      }

      if (intentName === 'FallbackIntent') {
        const querySlot = alexaRequest.request.intent?.slots?.Query as
          | { value?: string }
          | undefined;
        const userMessage = querySlot?.value || 'Tell me about Rayko Azcue';
        const aiResponse = await getAIResponse(userMessage, locale);
        return response.json(buildAlexaResponse(aiResponse));
      }

      const fallbackMsg = locale.startsWith('es')
        ? 'No entendí esa pregunta. Puedes preguntarme sobre la experiencia, habilidades, proyectos o cómo contactar a Rayko.'
        : "I didn't understand that question. You can ask me about Rayko's experience, skills, projects, or how to contact him.";
      return response.json(buildAlexaResponse(fallbackMsg));
    }

    if (requestType === 'SessionEndedRequest') {
      return response.status(200).end();
    }

    return response.status(400).json({ error: 'Unknown request type' });
  } catch (error) {
    console.error('Alexa handler error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
