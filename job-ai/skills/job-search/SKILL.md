# Job Search - Agent Skill

## Overview

Autonomous job opportunity hunter that searches, filters, and proposes outreach to companies. Integrates with resume-build for complete application workflow.

## When to Use

- User wants to find companies hiring remote LATAM developers
- User wants to outreach to potential employers
- User wants to automate job search and company research

## How It Works

### 1. Initialize

- Load `job-ai/data/applications.json` - Check existing applications (conflict check)
- Load `job-ai/configs/sources.json` - Job search sources
- Check for focus parameters (sector, tech stack, count)

### 2. Search & Discover

Search for companies using:

- Web search for "LATAM remote hiring Vue.js developers 2026"
- Job boards from sources.json
- Staff augmentation companies
- Talent platforms

For each company found, gather:

- Company name, website
- Contact email (if available)
- Sector, product, target customers
- Tech stack
- Career page URL
- Active job postings

### 3. Check Conflicts (Smart Filtering)

Before proposing, check against `applications.json`:

| Scenario                                    | Action                                  |
| ------------------------------------------- | --------------------------------------- |
| Same company + same position                | **SKIP** - Already applied              |
| Same company + different position           | **ALLOW** - New opportunity             |
| Already sent outreach + has new job posting | **PROPOSE** - Direct apply now possible |
| Company already in pending proposals        | **SKIP** - Already proposed             |

### 4. Classify Opportunity

For each valid opportunity:

**A. Direct Apply** (has active job posting):

- Company has career page WITH active job posting
- Job posting is NOT redirect to LinkedIn only
- → Mark as "manual-apply"

**B. Outreach** (no direct apply possible):

- No career page found
- Career page but NO active job postings
- Job posting redirects to LinkedIn (no direct apply)
- → Mark as "send-outreach"

### 5. Save Proposals to Temp Files

Create detailed proposals in temp files:

**temp/direct.md** - For direct apply opportunities:

```markdown
## Company Name - Position Title

**Action:** manual-apply  
**Proposed:** YYYY-MM-DD

### Company

- **Name:** Company Name
- **Website:** company.com
- **Sector:** Industry
- **Tech Stack:** Vue.js, React, etc.

### Position

- **Title:** Job Title
- **URL:** link to posting
- **Application Type:** company page / email / LinkedIn / etc.

### Skills (for resume)

- Tech skills to emphasize

### Experience (relevant highlights)

- Key achievements to highlight

### Summary (tailored)

- Custom summary for this role

### Notes

- Additional context

---

### Resume Action Needed

[ ] Build tailored resume
[ ] Build hybrid resume
[ ] Review and approve → Apply
```

**temp/outreach.md** - For outreach opportunities:

```markdown
## Company Name

**Action:** send-outreach  
**Proposed:** YYYY-MM-DD

### Company

- **Name:** Company Name
- **Website:** company.com
- **Email:** contact@company.com
- **Sector:** Industry
- **Tech Stack:** Vue.js, React, etc.

### Why Proposed

- Reason for targeting this company

### Summary (for outreach email)

- Tailored value proposition

---

### Resume Action Needed

[ ] Build tailored resume
[ ] Build hybrid resume  
[ ] Review email draft → Send
```

### 6. Present Options to User

Show summary table and ask:

```
I found X opportunities:

| # | Company | Type | Action Needed |
|---|---------|------|---------------|
| 1 | Company A | direct | manual-apply |
| 2 | Company B | outreach | send-outreach |
| ...

What would you like to do?
[A] Apply to direct opportunities
[B] Send outreach to these companies
[C] Both
[D] Review details first
[E] Something else?
```

### 7. On User Approval

For **direct apply**:

- Call resume-build skill → Build resumes
- Update status in applications.json → "pending"

For **outreach**:

- Call resume-build skill → Build resumes (optional for cold outreach)
- Draft email using template
- Save to temp/outreach.md for review
- On approval → Send via yandex-mailer
- Update status → "sent"

### 8. Track Results

Update applications.json:

- Applied → status: "applied", applicationDate
- Sent outreach → status: "sent"
- Rejection → status: "rejected", rejectionDate, rejectionNote

## Application JSON Structure

When adding new applications, use this structure:

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
    "applicationType": "company page" | "email" | "LinkedIn" | "Telegram DM",
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
  "rejectionDate": null,
  "rejectionNote": "",
  "notes": {
    "model": "Company description - work model",
    "company": "Detailed company info",
    "techStack": "Full tech stack mentioned",
    "role": "Role responsibilities"
  },
  "proposedAt": "YYYY-MM-DD",
  "proposedWhy": "Reason for targeting this company"
}
```

## Important Rules

1. **ALWAYS ask before proceeding** - Never auto-send or auto-apply
2. **Check conflicts first** - Query applications.json before proposing
3. **Two temp files** - direct.md for job postings, outreach.md for cold outreach
4. **No direct apply to LinkedIn** - If posting redirects to LinkedIn, treat as outreach
5. **Track everything** - Update applications.json after any action
6. **Require contact email for outreach** - Skip if no email found
7. **Config file sync** - When creating new application, also create/update config file in `job-ai/configs/resume/{id}.json` with matching metadata

## Tools Used

- Web search (OpenCode)
- Playwright MCP (website scraping)
- File read/write (applications.json, temp files)
- Yandex mailer (for sending outreach)

## Files

- `job-ai/data/applications.json` - Single source of truth
- `job-ai/configs/sources.json` - Search sources
- `job-ai/temp/direct.md` - Direct apply proposals
- `job-ai/temp/outreach.md` - Outreach proposals
- `job-ai/temp/TODO.md` - Summary of all pending
- `job-ai/skills/resume-build/SKILL.md` - Resume building
