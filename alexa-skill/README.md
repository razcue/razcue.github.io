# Alexa Skill Setup - Rayko Azcue

Voice assistant for Rayko Azcue's portfolio. Users can ask about experience, skills, projects, and contact information.

## Skill Details

| Property            | Value                            |
| ------------------- | -------------------------------- |
| **Skill Name**      | Rayko Azcue                      |
| **Invocation (EN)** | rayko azcue                      |
| **Invocation (ES)** | rayko azcue                      |
| **Languages**       | English (en-US), Spanish (es-ES) |

## Distribution - Example Phrases

### English (en-US)

```
- Alexa, ask Rayko Azcue
- Alexa, open Rayko Azcue
- Alexa, talk to Rayko Azcue
```

### Spanish (es-ES)

```
- Alexa, abre Rayko Azcue
- Alexa, pregunta a Rayko Azcue
- Alexa, habla con Rayko Azcue
```

## Distribution - Descriptions

### English (en-US)

**One Sentence:** Ask Alexa about Rayko Azcue's experience, skills, and projects.

**Detailed:** Rayko Azcue is your voice assistant to learn about a Senior Software Engineer with 7+ years of experience. Ask about his work experience, technical skills, projects, availability for work, location, and how to contact him. The assistant responds in English and Spanish, and uses AI for questions not covered by predefined queries.

### Spanish (es-ES)

**One Sentence:** Pregunta a Alexa sobre la experiencia, habilidades y proyectos de Rayko Azcue.

**Detailed:** Rayko Azcue es tu asistente de voz para conocer a un Ingeniero de Software Senior con más de 7 años de experiencia. Pregúntale sobre su experiencia laboral, habilidades técnicas, proyectos, disponibilidad para trabajar, ubicación y cómo contactarlo. El asistente responde en español e inglés, y usa IA para preguntas no cubiertas por las consultas predefinidas.

## Architecture

```
Alexa Voice → Alexa Developer Console → Vercel API (/api/alexa.ts) → Groq API (fallback)
```

## Files

```
alexa-skill/
├── interaction-model/
│   ├── en/intents.json    # English intents
│   └── es/intents.json    # Spanish intents
└── README.md              # This file

api/
└── api/
    └── alexa.ts           # Vercel serverless handler
```

## Prerequisites

- Alexa Developer Account (developer.amazon.com)
- Vercel account (already configured for portfolio)
- Groq API key (already configured in Vercel env vars)

## Setup Steps

### 1. Create Skill in Alexa Developer Console

1. Go to [developer.amazon.com/alexa/console/ask](https://developer.amazon.com/alexa/console/ask)
2. Create new skill → "Rayko Azcue"
3. Choose language: English (or Spanish - you'll create both)
4. Choose model: Custom
5. Choose hosting method: Alexa-Hosted (or self-hosted)

### 2. Configure Interaction Model

#### Option A: Manual (via Console)

1. In Alexa Console → Edit → Interaction Model
2. Copy contents from `interaction-model/en/intents.json`
3. Paste into JSON Editor
4. Save and Build

#### Option B: Using SMAPI (Programmatic)

```bash
# Install ask-cli
npm install -g ask-cli

# Initialize
ask init

# Deploy interaction model
ask api upload-interaction -s <skill-id> -f interaction-model/en/intents.json
```

### 3. Configure Endpoint

1. In Alexa Console → Endpoint
2. Select "AWS Lambda ARN" or "HTTPS"
3. Enter your Vercel URL:
   - For HTTPS: Your domain + `/api/alexa`
   - Example: `https://razcue-github-io.vercel.app/api/alexa`

### 4. Test

1. In Alexa Console → Test
2. Enable skill testing
3. Try: "Alexa, ask Rayko Azcue about his experience"

## Intent List

### Static Intents (20)

| Intent                   | Example Utterance (EN)          |
| ------------------------ | ------------------------------- |
| GetNameIntent            | "what is your name"             |
| GetTitleIntent           | "what do you do"                |
| GetSummaryIntent         | "tell me about yourself"        |
| GetExperienceIntent      | "tell me about your experience" |
| GetCurrentRoleIntent     | "where do you work now"         |
| GetSkillsIntent          | "what are your skills"          |
| GetAvailabilityIntent    | "are you available for work"    |
| GetLocationIntent        | "where are you located"         |
| GetContactIntent         | "how can i contact you"         |
| GetEducationIntent       | "what is your education"        |
| GetProjectsIntent        | "what projects have you built"  |
| GetLanguagesIntent       | "what languages do you speak"   |
| GetGitHubIntent          | "what is your github"           |
| GetYearsExperienceIntent | "how many years of experience"  |
| GetRemoteWorkIntent      | "do you work remotely"          |
| AMAZON.HelpIntent        | "help"                          |
| AMAZON.StopIntent        | "stop"                          |
| AMAZON.CancelIntent      | "cancel"                        |
| FallbackIntent           | (anything else)                 |

### Fallback Behavior

When an utterance doesn't match any static intent:

1. Returns generic fallback message
2. Or uses AI (Groq) to generate response

## Invocation

- English: "Alexa, ask Rayko Azcue about his experience"
- Spanish: "Alexa, pregunta a Rayko Azcue sobre su experiencia"

Or open the skill:

- English: "Alexa, open Rayko Azcue"
- Spanish: "Alexa, abre Rayko Azcue"

## Environment Variables

No new env vars needed - uses existing `GROQ_API_KEY` from your portfolio.

## Deployment

```bash
cd api
vercel --prod
```

After deployment, update the Alexa endpoint URL in the console.

## Testing Locally

```bash
# Start local server
cd api
vercel dev

# Test with curl
curl -X POST http://localhost:3000/api/alexa \
  -H "Content-Type: application/json" \
  -d '{
    "request": {
      "type": "LaunchRequest",
      "locale": "en-US"
    },
    "session": {
      "new": true,
      "sessionId": "test"
    }
  }'
```

## Extending

### Adding New Intents

1. Edit `interaction-model/en/intents.json` and `es/intents.json`
2. Add response in `api/alexa.ts` → `getStaticResponse()` function
3. Re-upload interaction model
4. Rebuild skill

### Using AI for All Responses

Remove static intents and let Groq handle everything - but this increases API costs.

## Cost

| Resource               | Cost                 |
| ---------------------- | -------------------- |
| Alexa Developer        | Free                 |
| Alexa-Hosted Lambda    | Free (40k req/month) |
| Your existing Groq API | Already paying       |
| Vercel (existing)      | Already using        |

**New cost: ~€0** (reuses existing infrastructure)
