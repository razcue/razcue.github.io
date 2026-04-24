---
name: job-hunt
description: 'Fully automated job-hunting workflow with no user validation. Search, outreach, and follow-up autonomously.'
---

# Job-Hunt - Agent Skill

## Overview

Fully automated job-hunting workflow that runs without any user validation - just search, send, and update.

## User Profile (MUST KNOW)

- **Location:** Cuba (actively seeking remote work)
- **Target:** Remote LATAM/Global, also relocation
- **Roles:** Vue.js/Nuxt.js (TOP), React/Next.js, Full-Stack, Laravel/Yii
- **Resume:** `public/Rayko_Azcue_Resume.pdf`

## When to Use

- User wants automated job search without manual approval
- User wants to set up job-hunt as autopilot
- User triggers with "job-hunt", "job hunt", "automate"

---

## Two Separate Workflows

### Workflow A: Search & Contact (User-triggered for finding jobs)

Steps: Search → Check Data → Send Outreach → Update

### Workflow B: Data Consistency (User-triggered for maintenance)

Steps: Validate → Send Follow-ups → Update Status

**These workflows are independent and should NOT be mixed.**

---

## Workflow A: Search & Contact

### Step 1: Search for Opportunities

**A. Web Search (80% of effort)**

Rotate through these queries:

**TOP Priority:**
- `"Vue.js remote developer"`
- `"Nuxt.js remote developer"`
- `"relocation Vue.js developer"`
- `"relocation Nuxt.js developer"`
- `"visa sponsorship Vue.js developer"`
- `"visa sponsorship Nuxt.js developer"`

**2nd Priority:**
- `"PHP fullstack remote developer"`
- `"TypeScript fullstack remote developer"`
- `"Laravel remote developer"`

**B. Sources Check (20% of effort)**

Periodically check sources from `job-hunt/data/sources.json`:
- Look for active job postings

**C. Post-Search Filtering**

After finding companies, apply filters:

✅ **Include (good fit):**
- Remote: "worldwide", "LATAM", "anywhere", "remote"
- Relocation: "visa sponsorship", "relocation package"
- No location restriction mentioned

❌ **Skip (not a fit):**
- Specific countries listed without Cuba (e.g., "Argentina only", "Mexico only")
- Job posting shows "Closed", "No longer accepting"

For each valid company, gather:
- name, website, sector, techStack, stage, notes

### Step 2: Check Against Data

Load `job-hunt/data/companies.json` and check:

| Scenario | Action |
|----------|--------|
| Company not in data | Add to companies.json → Proceed to Step 3 |
| Company exists, lastContact > 30 days ago | Proceed to Step 3 |
| Company exists, recent contact | Skip (too soon) |
| Company status is "black-list" | Skip |

### Step 3: Send Outreach (Auto-pilot)

Extract domain from company website:
- `https://company.com` → `company.com`

Use the yandex-mailer to send outreach:

```bash
bun run job-hunt/lib/yandex-mailer.ts --to "companydomain.com" --type "outreach" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"
```

The mailer will:
- If `--to` is domain (no @): Generate all email patterns (hr@, careers@, jobs@, etc.)
- If `--to` is email (has @): Send to that single address
- Send outreach email with resume attachment
- Return sent/failed email addresses
- Send summary email

### Step 4: Update Companies.json

After sending, update `job-hunt/data/companies.json`:

For new company, add entry:
```json
{
  "name": "Company Name",
  "domain": "company.com",
  "website": "https://company.com",
  "sector": "Industry",
  "techStack": ["Vue.js", "React"],
  "stage": "startup",
  "score": 50,
  "status": "outreach",
  "lastContact": "2026-04-20",
  "contactHistory": [{
    "date": "2026-04-20",
    "type": "outreach",
    "status": "sent",
    "response": "no-response",
    "emailsSent": ["hr@company.com", "careers@company.com"],
    "emailsFailed": ["jobs@company.com"]
  }],
  "positiveResponses": 0,
  "negativeResponses": 0,
  "totalContacts": 1,
  "notes": "Company notes"
}
```

For existing company:
- Update status to "outreach"
- Update lastContact to today
- Add contactHistory entry
- Increment totalContacts

---

## Company Status Values

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

Each contactHistory entry should have:
- `date`: YYYY-MM-DD
- `type`: "outreach" | "follow-up" | "direct-apply"
- `status`: "sent" | "bounced" | "no-response" | etc.
- `response`: "positive" | "negative" | "no-response"
- `emailsSent`: Array of successful email addresses
- `emailsFailed`: Array of failed email addresses
- `notes`: Description

## Workflow B: Data Consistency

Run when user asks to "validate", "check data", "update status", etc.

### Step 1: Validate & Send Follow-ups

```bash
bun run validate
```

This:
- Validates positiveResponses/negativeResponses counts from contactHistory
- Sets company status based on contactHistory entries (bounced → black-list)
- **Automatically sends follow-ups** to companies where outreach was sent >7 days ago
- Uses only `emailsSent` array (previously successful deliveries)
- Updates company status to "follow-up" after sending

### How Follow-ups Work

The validate script:
1. Finds companies with status "outreach" + >7 days since lastContact
2. Gets emails from `contactHistory[last].emailsSent`
3. Sends follow-up to each successful email
4. Adds new contactHistory entry with type "follow-up"
5. Updates company status to "follow-up"

### Step 3: Update No-Response Status

For companies where:
- status is "outreach" or "follow-up"
- last contact was >30 days ago

- Update status to "no-response"

---

## Follow-up Rules

- **Only send to emailsSent** - Never generate new email patterns for follow-up
- **Use existing success** - Only follow up to emails that were confirmed delivered

---

## Important Rules

1. **Two independent workflows** - Search/Contact vs Data Consistency, don't mix
2. **Rotate search queries** - Use the query list, don't repeat the same one
3. **Use sources.json** - 20% effort from sources, 80% from web search
4. **Apply post-search filters** - Skip companies with specific countries excluding Cuba
5. **Always attach resume** - Use `--attachment "public/Rayko_Azcue_Resume.pdf"` (from project root)
6. **Always use --company** - Include company name for email personalization
7. **Extract domain from website** - Remove https:// and www. prefix
8. **Check existing companies** - Never contact same company within 30 days
9. **Update after every send** - Always update companies.json
10. **Skip black-list** - Never contact companies with status "black-list"
11. **Follow-up only to emailsSent** - Only follow up to successful deliveries from original outreach
12. **No user validation** - Fully autonomous, no approval needed

---

## Files

- `job-hunt/data/companies.json` - Company tracking with status and history
- `job-hunt/data/sources.json` - Job search sources
- `job-hunt/lib/yandex-mailer.ts` - Email sending logic
- `job-hunt/skills/job-hunt/SKILL.md` - This workflow

---

## Commands

```bash
# Send outreach to domain (generates all email patterns)
bun run job-hunt/lib/yandex-mailer.ts --to "company.com" --type "outreach" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"

# Send outreach to single email address
bun run job-hunt/lib/yandex-mailer.ts --to "hr@company.com" --type "outreach" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"

# Send follow-up to previously successful email
bun run job-hunt/lib/yandex-mailer.ts --to "hr@company.com" --type "follow-up" --attachment "public/Rayko_Azcue_Resume.pdf" --company "Company Name"

# Validate data
bun run validate
```