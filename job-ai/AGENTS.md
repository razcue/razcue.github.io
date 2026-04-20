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

2. PROCESS FOLLOW-UPS (if due)
   - Read followups.md for entries due today or past
   - Build fresh resume for each
   - Send follow-up email to ALL emails from initial outreach
   - Parse result, update emailsSent/emailsFailed
   - Permanently remove failed emails from both outreach and follow-up from future attempts

3. SEARCH → Web search + sources.json

4. FILTER → Check applications.json for conflicts

5. SCORE → Calculate priority (HIGH 70+, MEDIUM 40-69, LOW <40)

6. PROPOSE → Save to temp/direct.md (HIGH) or temp/outreach.md (MEDIUM)
   - Each proposal MUST have: Summary, Skills (technologies, additional), Email Draft, Follow-up Email Draft
   - Skills must be comma-separated in two sub-sections:
     - technologies: Primary technical skills (Vue.js, Nuxt.js, TypeScript, etc.)
     - additional: Soft skills (Team Leadership, Remote Work, etc.)

7. BUILD CONFIG → Generate config file in data/configs/{id}.json BEFORE user validation
   - metadata.id, targetPosition, keywords
   - contactInfo (from defaults)
   - summary (EXACTLY from proposal.summary)
   - skills.technical (EXACTLY from proposal.skills.technologies)
   - skills.additional (EXACTLY from proposal.skills.additional)
   - skills.languages (from defaults)
   - education (from defaults)
   - experience (from defaults)

8. USER APPROVAL → Show proposals with summary + skills for validation
   - Display summary and skills for each proposal
   - User validates content that will appear in the resume
   - On approval, proceed to step 9

9. BUILD RESUME → Generate fresh PDF using validated config
   - Use config file from step 7
   - Output: public/resume-{id}.pdf (unique per company!)
   - IMPORTANT: Resume filenames must be unique (e.g., resume-2026-04-15-venturus.pdf)

10. VERIFY RESUME → Before sending, verify:
    - Resume config exists in data/configs/
    - Resume PDF exists in public/resume-{id}.pdf
    - Resume metadata matches company (check id, company name, position)
    - ATTACHMENT must be company-specific resume, NOT generic
    - Use correct filename: resume-{id}.pdf

11. EXECUTE OUTREACH (batch mode)
    - Send to all email patterns using --batch
    - Parse result: SENT_EMAILS, FAILED_EMAILS
    - If 0 sent: ABORT, do not update any data, rollback generated config

12. UPDATE APPLICATION DATA
    - applications.json: add sent emails to emailsSent array
    - companies.json: add contact history
    - TODO.md: move from open proposals to active applications

13. SCHEDULE FOLLOW-UP
    - Create entry in followups.md with:
      - Due date (7 days from now)
      - Company, Position, Application ID
      - Status: "outreach (YYYY-MM-DD)"
      - Emails sent, Emails failed
      - Position URL
      - Initial Email Draft (from proposal)
      - Follow-up Email Draft (from proposal)

14. CLEANUP
    - Remove proposal from outreach.md (processed)
    - If last application: regenerate default resume

15. UPDATE TODO
    - Active Applications count
    - Future Follow-ups count
    - Open Proposals count
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

`pending` | `approved` | `outreach` | `sent` | `applied` | `in-review` | `bounced` | `followup-scheduled` | `followup-sent` | `no-response` | `interview` | `negociation` | `rejected`

**Status Meaning:**
| Status | Description |
|--------|-------------|
| `outreach` | Outreach email sent, waiting for initial response |
| `in-review` | Company received email, reviewing (or out-of-office received) |
| `bounced` | All emails bounced, company unreachable |
| `sent` | Direct apply email sent |
| `applied` | Application submitted via form |

---

## Scoring System

| Score  | Priority | Action                             |
| ------ | -------- | ---------------------------------- |
| 70-100 | HIGH     | Direct apply + outreach + followup |
| 40-69  | MEDIUM   | Outreach only                      |
| 0-39   | LOW      | Skip                               |

---

## Key Files (DATA-ONLY - No Logic)

| File                             | Purpose                          |
| -------------------------------- | -------------------------------- |
| `data/applications.json`         | Single source of truth           |
| `data/applications-YYYY-MM.json` | Archived applications            |
| `data/companies.json`            | Company tracking                 |
| `data/email-state.json`          | Email check state                |
| `temp/TODO.md`                   | Current status (check first)     |
| `temp/MANUAL_TODO.md`            | Uncertain emails needing review  |
| `temp/direct.md`                 | HIGH score proposals (data only) |
| `temp/outreach.md`               | MEDIUM score proposals (data)    |
| `temp/followups.md`              | Scheduled follow-ups             |

**IMPORTANT:** Temp files should contain ONLY data (company info, emails, status). NO logic, NO rules, NO workflow explanations. See job-search skill for workflow logic.

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
# Check emails (INBOX)
bun run lib/yandex-email-checker.ts

# Send email (single recipient)
bun run lib/yandex-mailer.ts --to "recipient@example.com" --subject "Subject" --html "<p>Body</p>"

# Send to multiple recipients (batch mode - one email per recipient)
bun run lib/yandex-mailer.ts --to "a@x.com,b@x.com,c@x.com" --batch --subject "Subject" --html "<p>Body</p>"

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
