# Job-Hunt

Fully automated job-hunting workflow that runs on autopilot without user validation.

## Folder Structure

```
job-hunt/
├── data/
│   ├── companies.json    # Company tracking with status and history
│   └── sources.json     # Job search sources (job boards, platforms)
├── lib/
│   └── yandex-mailer.ts  # Email sending with domain expansion
├── templates/
│   └── harvard-template.html  # Resume template
├── skills/
│   └── job-hunt/
│       └── SKILL.md    # Complete workflow logic
├── .env               # SMTP credentials
├── .env.example       # Template for credentials
├── package.json      # Scripts and dependencies
├── bun.lock          # Dependency lock
├── AGENTS.md         # When to use this workflow
└── README.md         # This file
```

## Search Strategy

**Web Search (80%):**
- "Vue.js remote developer" (TOP)
- "Nuxt.js remote developer" (TOP)
- "relocation Vue.js developer"
- "relocation Nuxt.js developer"
- "visa sponsorship Vue.js developer"
- "visa sponsorship Nuxt.js developer"
- "PHP fullstack remote developer"
- "Laravel remote developer"

**Sources Check (20%):**
- Periodically check staff_augmentation and talent_platform from sources.json
- Top 10-15 platforms weekly

**Post-Search Filtering:**
- ✅ Include: "worldwide", "LATAM", "anywhere", "remote", "visa sponsorship"
- ❌ Skip: Specific countries without Cuba

### 2. Check
Load `data/companies.json` and verify:
- New company → Add and proceed to outreach
- Existing, last contact > 30 days → Proceed to outreach
- Existing, recent contact → Skip
- Black-list → Skip

### 3. Outreach
Send email using `lib/yandex-mailer.ts`:
```bash
bun run job-hunt/lib/yandex-mailer.ts --to "company.com" --type "outreach" --attachment "public/Rayko_Azcue_Resume.pdf"
```

The mailer:
- Extracts domain from company website
- Generates email patterns: hr@, careers@, jobs@, recruiting@, talent@, etc.
- Sends outreach email with resume attachment
- Returns sent/failed addresses

### 4. Update
Update `data/companies.json` with:
- status: "outreach"
- lastContact: today's date
- contactHistory entry with emails sent/failed

## Company Status

| Status | Description |
|--------|------------|
| `processing` | Added, email not yet sent |
| `outreach` | Outreach email sent |
| `follow-up` | Follow-up email sent |
| `no-response` | 30+ days without response |
| `black-list` | Skip (3+ rejections, bounced, or manually set) |
| `rejected` | Got rejection email |
| `negociation` | On negociation phase |
| `interview` | On interview phase |

## contactHistory Entry Fields

Each contactHistory entry has:
- `date`: YYYY-MM-DD
- `type`: "outreach" | "follow-up" | "direct-apply"
- `status`: entry status
- `response`: "positive" | "negative" | "no-response"
- `emailsSent`: Array of successful emails
- `emailsFailed`: Array of failed emails
- `notes`: Description

## Commands

```bash
# Send outreach
bun run job-hunt/lib/yandex-mailer.ts --to "company.com" --type "outreach" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"

# Send follow-up
bun run job-hunt/lib/yandex-mailer.ts --to "company.com" --type "follow-up" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"
```

## Email Patterns

The mailer tries all these patterns per domain:
```
hr@, careers@, jobs@, recruiting@, talent@, recruitment@,
hiring@, apply@, work@, contact@, info@, hello@, support@,
admin@, team@, office@, contactus@, general@, mail@, staff@,
dev@, tech@, it@
```

## Key Differences from job-ai

| Feature | job-ai | job-hunt |
|---------|-------|---------|
| User validation | Required | None |
| Daily checkout | Yes | No |
| Email checking | IMAP | No |
| Score system | 0-100 | Simple |
| Resume build | Custom per company | Default |
| Follow-ups | Manual | Auto |
| Complexity | High | Low |

## Usage

Trigger job-hunt with phrases like:
- "run job-hunt"
- "start job hunt"
- "automate job search"