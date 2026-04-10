# Job-AI Agents

Complete workflow for autonomous job application management.

---

## Complete Workflow (Shell)

```
0. DAILY CHECKOUT
   - Check applications status (>30 days → no-response)
   - Check emails via Yandex IMAP (INBOX only, confidence >= 80%)
   - Update companies.json response history
   - Archive if needed
   - Update temp/TODO.md

1. CHECK TODO → temp/TODO.md, MANUAL_TODO.md, followups.md

2. FOLLOW-UP → Process due follow-ups in temp/followups.md

3. SEARCH → Web search + sources.json

4. FILTER → Check applications.json for conflicts

5. SCORE → Calculate priority (HIGH 70+, MEDIUM 40-69, LOW <40)

6. PROPOSE → Save to temp/direct.md (HIGH) or temp/outreach.md (MEDIUM)

7. USER APPROVAL → Wait for user to approve

8. BUILD → resume-build skill creates tailored + hybrid PDFs

9. EXECUTE → Apply or send outreach email

10. UPDATE → applications.json + companies.json

11. SCHEDULE → Add follow-up to temp/followups.md
```

---

## Email Checking

- **IMAP:** imap.yandex.com:993
- **Folders:** INBOX only
- **Confidence threshold:** 80%
- **State file:** data/email-state.json (tracks last check timestamp only)
- **Unmatched emails:**
  - Job-related but unmatched company → MANUAL_TODO
  - Not job-related → Silently skipped

---

## Application Status Values

`pending` | `approved` | `sent` | `applied` | `followup-scheduled` | `followup-sent` | `no-response` | `interview` | `negociation` | `rejected`

---

## Scoring System

| Score  | Priority | Action                             |
| ------ | -------- | ---------------------------------- |
| 70-100 | HIGH     | Direct apply + outreach + followup |
| 40-69  | MEDIUM   | Outreach only                      |
| 0-39   | LOW      | Skip                               |

---

## Key Files

| File                             | Purpose                         |
| -------------------------------- | ------------------------------- |
| `data/applications.json`         | Single source of truth          |
| `data/applications-YYYY-MM.json` | Archived applications           |
| `data/companies.json`            | Company tracking                |
| `data/email-state.json`          | Email check state               |
| `temp/TODO.md`                   | Current status (check first)    |
| `temp/MANUAL_TODO.md`            | Uncertain emails needing review |
| `temp/direct.md`                 | HIGH score proposals            |
| `temp/outreach.md`               | MEDIUM score proposals          |
| `temp/followups.md`              | Scheduled follow-ups            |

---

## Environment Variables (.env)

```env
# SMTP (sending)
YANDEX_USER=razcue
YANDEX_APP_PASSWORD=xxxx
YANDEX_SMTP_HOST=smtp.yandex.com
YANDEX_SMTP_PORT=465

# IMAP (checking)
YANDEX_IMAP_HOST=imap.yandex.com
YANDEX_IMAP_PORT=993
YANDEX_IMAP_APP_PASSWORD=xxxx

# Sender
SENDER_NAME=Rayko Azcue Pérez
SENDER_EMAIL=razcue@yandex.com
```

---

## Commands

```bash
# Check emails
bun run lib/yandex-email-checker.ts

# Send email
bun run lib/yandex-mailer.ts --to "..." --subject "..." --html "..."

# Build resume
node lib/build-resume.cjs <application-id>
```

---

## Skills

- `job-search` skill: Complete job search workflow (daily checkout, search, scoring, proposals)
- `resume-build` skill: PDF resume generation from proposals

---

## User Profile

- **Location:** Cuba (remote work)
- **Family:** Spouse + 1 child
- **Target:** Spain, Uruguay, Mexico (relocation); Remote LATAM/Global
- **Roles:** Vue.js/Nuxt.js (TOP), React/Next.js, Full-Stack, Laravel/PHP
- **Languages:** English (C1), Spanish (Native)
