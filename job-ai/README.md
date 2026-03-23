# job-ai

Autonomous job application system that finds opportunities, builds tailored resumes, and manages the application workflow.

## Overview

job-ai combines job search with resume building to automate your job hunting:

1. **Job Search** - Finds companies hiring remote LATAM developers
2. **Conflict Checking** - Avoids duplicate applications
3. **Resume Build** - Generates tailored + hybrid PDF resumes
4. **Outreach** - Sends personalized emails via Yandex SMTP

## Structure

```
job-ai/
├── README.md                    # Documentation
├── KNOWLEDGE_BASE.es.md        # Knowledge base
├── prompts/                     # Prompt engineering templates
│   ├── search/                  # Job search prompts
│   │   ├── system.md           # System prompt for search agent
│   │   ├── queries.md          # Search query templates
│   │   └── context.md          # Rayko's profile context
│   ├── filter/                  # Company evaluation prompts
│   │   ├── system.md           # System prompt for filtering
│   │   ├── criteria.md          # Must-have / Should-have criteria
│   │   └── scoring.md           # Scoring template
│   ├── email/                   # Email writing prompts
│   │   ├── system.md           # System prompt for email writing
│   │   ├── examples.md          # Good/bad email examples
│   │   └── templates/           # Email templates
│   │       ├── outreach.md      # Cold outreach template
│   │       ├── followup.md      # Follow-up template
│   │       └── direct-apply.md  # Direct application template
│   └── resume/                  # Resume tailoring prompts
│       ├── system.md           # System prompt for tailoring
│       ├── structure.md         # Section guidance
│       └── examples.md          # Strong bullet examples
├── skills/
│   ├── job-search/             # Find companies & opportunities
│   └── resume-build/            # Build PDF resumes
├── data/
│   └── applications.json        # Single source of truth
├── temp/
│   ├── TODO.md                  # Pending actions summary
│   ├── direct.md               # Direct apply proposals
│   ├── outreach.md             # Outreach proposals
│   └── email-draft.md          # Email draft for review
├── configs/
│   ├── sources.json            # Job search sources registry
│   └── resume/                # Resume configs
│       ├── default.json
│       └── *.json
├── lib/
│   ├── build-resume.cjs       # Resume builder script
│   ├── yandex-mailer.ts       # Email sending via CLI
│   ├── conflict-checker.ts    # Avoid duplicate applications
│   └── chat-prompt.ts
└── templates/
    └── harvard-template.html
```

## Quick Start

### 1. Configure Environment

Create `job-ai/.env`:

```env
# Yandex SMTP (for sending emails)
YANDEX_USER=razcue
YANDEX_APP_PASSWORD=xxxx xxxx xxxx xxxx
YANDEX_SMTP_HOST=smtp.yandex.com
YANDEX_SMTP_PORT=465
SENDER_NAME=Rayko Azcue Pérez
SENDER_EMAIL=razcue@yandex.com
```

### 2. Run Job Search

```bash
# Find 5 companies
cd job-ai && bun run skills/job-search
```

### 3. Build Resumes

```bash
# Build tailored resume
node lib/build-resume.cjs 2026-02-21-deel-software-engineer

# Build hybrid resume
node lib/build-resume.cjs 2026-02-21-deel-software-engineer-full
```

### 4. Send Outreach

```bash
# Send email with attachment
bun run lib/yandex-mailer.ts \
  --to "company@email.com" \
  --subject "Application" \
  --html "<p>Hello...</p>" \
  --attachment "resume.pdf=public/rayko-azcue-2026-02-21-deel.pdf"
```

## Application Types

| Type           | Description                             |
| -------------- | --------------------------------------- |
| `direct-apply` | Has active job posting - apply directly |
| `outreach`     | No job posting - send cold email        |

## Status Values

- `pending` - Awaiting approval
- `approved` - Ready to proceed
- `sent` - Outreach email sent
- `applied` - Direct application submitted
- `interview` - Got interview
- `negociation` - Salary negotiation
- `rejection` - Application rejected

## Resume Versions

For each application, two PDFs are generated:

| File                        | Description                |
| --------------------------- | -------------------------- |
| `rayko-azcue-{id}.pdf`      | Fully tailored resume      |
| `rayko-azcue-{id}-full.pdf` | Default + tailored summary |

## Skills

### job-search

1. Load sources and check conflicts
2. Search for companies
3. Classify as direct-apply or outreach
4. Save proposals to temp files
5. Ask user before proceeding

### resume-build

1. Read proposal from temp file
2. Generate tailored config
3. Generate hybrid config
4. Build both PDFs
5. Update applications.json

## Configuration Files

### applications.json Structure

```json
{
  "id": "YYYY-MM-DD-company-position-slug",
  "type": "direct-apply" | "outreach",
  "company": {
    "name": "Company Name",
    "website": "https://company.com",
    "email": "contact@company.com" | null,
    "sector": "Industry",
    "techStack": ["Vue.js", "React"]
  },
  "position": {
    "title": "Job Title",
    "url": "https://jobposting.com" | null,
    "applicationType": "company page" | "email" | "LinkedIn" | "Telegram",
    "requirements": ["Skill 1", "Skill 2"]
  },
  "metadata": {
    "positionModel": "remote" | "hybrid" | "onsite",
    "location": "Remote (LATAM)",
    "salary": "$60,000 USD/year" | null,
    "language": "en" | "es",
    "keywords": {
      "technical": ["TypeScript", "React"],
      "soft": ["Remote-first", "Agile"]
    }
  },
  "status": "pending" | "approved" | "sent" | "applied" | "interview" | "negociation" | "rejected",
  "applicationDate": "YYYY-MM-DD" | null,
  "proposedAt": "YYYY-MM-DD",
  "proposedWhy": "Reason for targeting",
  "outcomes": {
    "emailSentAt": "YYYY-MM-DD",
    "responseReceived": true | false,
    "responseDate": "YYYY-MM-DD" | null,
    "responseType": "positive" | "negative" | "no-response",
    "interviewScheduled": true | false,
    "interviewDate": "YYYY-MM-DD" | null,
    "feedback": "Notes from the process"
  },
  "rejectionDate": null,
  "rejectionNote": "",
  "notes": {
    "model": "Company description - work model",
    "company": "Detailed company info",
    "techStack": "Full tech stack mentioned",
    "role": "Role responsibilities"
  }
}
```

### Resume Config Structure

```json
{
  "metadata": { "id": "...", "targetPosition": "...", ... },
  "contactInfo": { ... },
  "summary": "...",
  "skills": { ... },
  "experience": [ ... ]
}
```

## Environment Variables

| Variable              | Description                            |
| --------------------- | -------------------------------------- |
| `YANDEX_USER`         | Yandex email username                  |
| `YANDEX_APP_PASSWORD` | Yandex app password                    |
| `YANDEX_SMTP_HOST`    | SMTP server (default: smtp.yandex.com) |
| `YANDEX_SMTP_PORT`    | SMTP port (default: 465)               |
| `SENDER_NAME`         | Display name in emails                 |
| `SENDER_EMAIL`        | Sender email address                   |

## Notes

- Always ask user before sending emails or submitting applications
- Check applications.json for conflicts before proposing
- Keep config files in sync with applications.json metadata
- Two resumes per application: tailored + hybrid
- Track outcomes in applications.json `outcomes` field for feedback loop
- Prompts in `prompts/` directory are modular - edit individual files as needed
