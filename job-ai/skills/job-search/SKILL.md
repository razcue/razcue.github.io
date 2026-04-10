---
name: job-search
description: 'Autonomous job opportunity hunter that searches, filters, scores, and proposes outreach to companies. Includes daily checkout, auto-rejection, and full application workflow.'
---

# Job Search - Agent Skill

## Overview

Autonomous job opportunity hunter that searches, filters, and proposes outreach to companies. Integrates with resume-build for complete application workflow.

## User Profile (MUST KNOW)

- **Location:** Cuba (actively seeking relocation)
- **Family:** Spouse + 1 child
- **Target Countries:** Spain, Uruguay, Mexico (primary); Open to Caribbean/Mediterranean climate, Latino culture friendly, Spanish/English language
- **Languages:** English (C1), Spanish (Native)
- **Job Preferences (Priority Order):**
  1. Frontend Developer (Vue.js, Nuxt.js) ← TOP PRIORITY
  2. Frontend Developer (React.js, Next.js)
  3. Full-Stack (Vue.js/React + Node.js)
  4. Laravel/PHP Developer

## When to Use

- User wants to find companies hiring remote LATAM developers
- User wants to outreach to potential employers
- User wants to automate job search and company research

## Search Modes

### Default Mode: Remote from Cuba

- Search: "remote LATAM Vue.js developer" (user can work from Cuba)
- Focus on roles open to LATAM or "work from anywhere"
- Filter out roles that specify specific countries not including Cuba

### Relocation Mode (when user asks "relocation" or "visa")

- Search: Include "visa sponsorship", "relocation package"
- Prioritize roles with family relocation support
- Target countries: Spain, Uruguay, Mexico, or similar

## How It Works

### 0. Daily Full Checkout (ALWAYS RUN FIRST)

**Every time job-search skill runs, start here:**

1. **Check applications.json status:**
   - Load `job-ai/data/applications.json`
   - For each application with status `applied` or `sent`:
     - If > 30 days since applicationDate/emailSentAt and no response → Update status to `no-response`
     - Update company history in `companies.json` based on outcomes

2. **CHECK EMAIL (Yandex):**
   - Load `job-ai/data/email-state.json` for last check timestamp
   - Connect to Yandex IMAP (imap.yandex.com:993)
   - Search folder: INBOX only
   - For each email since last check:
     - Match to applications by company name
     - Analyze with keyword detection
     - If confidence >= 80% → Auto-categorize (positive/negative/no-response)
     - If confidence < 80% → Add to `temp/MANUAL_TODO.md` for review
   - Update `data/email-state.json` with new timestamp
   - Update `applications.json` and `companies.json` with found responses
   - **Notify user** if new MANUAL_TODO items added

3. **Check companies.json response history:**
   - Update positive/negative response counts
   - Recalculate company score based on response history

4. **Check for monthly archive:**
   - If applications.json was last updated > 30 days ago:
     - Rename to `applications-YYYY-MM.json` (archive)
     - Create new `applications.json` with empty applications array

5. **Update TODO.md:**
   - Reflect current state: pending follow-ups, open proposals, applications summary

### 1. Check TODO

After daily checkout, load files:

- Load `job-ai/temp/TODO.md` - Check for pending follow-ups and actions
- Load `job-ai/temp/MANUAL_TODO.md` - Check for emails needing manual review
- Load `job-ai/temp/followups.md` - Check for due follow-ups
- Load `job-ai/data/applications.json` - Check existing applications (conflict check)
- Load `job-ai/data/companies.json` - Check company history for scoring
- Load `job-ai/data/email-state.json` - Check last email check timestamp
- Load `job-ai/configs/sources.json` - Job search sources
- Check for focus parameters (sector, tech stack, count)

### 2. Process Follow-ups (FOLLOW-UP)

If there are pending follow-ups in temp/followups.md where due date <= today:

1. For each pending follow-up:
   - Review original application context from applications.json
   - Generate personalized follow-up email
   - Show to user for approval
   - On approval: Send via yandex-mailer
   - Update status → "followup-sent"
   - Update applications.json with outcomes
   - Mark follow-up as "sent" in followups.md

2. After processing all follow-ups, update TODO.md

**If there are pending follow-ups, DO NOT proceed to new search until they are handled.**

### 3. Search & Discover

Search for companies using:

- **Default:** Web search for "remote LATAM Vue.js developer" (or "remote LATAM frontend Vue.js")
- **If relocation requested:** Add "visa sponsorship" to search
- Job boards from sources.json
- Staff augmentation companies (nearshore LATAM)
- Talent platforms

**Priority Search Order:**

1. Vue.js / Nuxt.js frontend roles (TOP PRIORITY)
2. React.js / Next.js frontend roles
3. Full-Stack with Vue.js or React, Laravel or Node.js
4. Laravel/PHP (lower priority)

For each company found, gather:

- Company name, website
- **Contact emails (FIND MULTIPLE):**
  - Job posting email (if listed)
  - HR/Recruitment: Try hr@{{domain}}, careers@{{domain}}, jobs@{{domain}}, recruiting@{{domain}}, talent@{{domain}}, recruitment@{{domain}}
  - General contact: Try contact@{{domain}}, info@{{domain}}, hello@{{domain}}, support@{{domain}}
  - Visit company homepage, careers page, contact page for additional emails
  - **Send applications to ALL found emails (no max limit)**
- Sector, product, target customers
- Tech stack
- Career page URL
- Active job postings
- **IMPORTANT:** Verify the job posting URL is still active before proceeding

### 4. Detect Language for Communications

**Determine email language based on:**

1. **Job posting language:**
   - If posting is in Spanish → use Spanish
   - If posting is in English → use English
   - If posting is mixed → default to English

2. **Company origin:**
   - Spanish-speaking countries (Spain, Mexico, LATAM) → check posting, default Spanish
   - English-speaking countries/companies → English

3. **User preference:**
   - English = better salaries, more opportunities
   - Spanish = local/regional companies
   - Default: **English** unless posting specifically requests Spanish

**Language decision rules:**

- If job posting explicitly asks for Spanish responses → Spanish
- If company team is Spanish-speaking (Spanish in job description, "habla español") → Spanish
- Otherwise → English

**Store in proposal:**

```json
"language": "en" | "es"
```

### 5. Check Conflicts (Smart Filtering)

Before proposing, check against `applications.json` AND `companies.json`:

| Scenario                                    | Action                                  |
| ------------------------------------------- | --------------------------------------- |
| Same company + same position                | **SKIP** - Already applied              |
| Same company + different position           | **ALLOW** - New opportunity             |
| Already sent outreach + has new job posting | **PROPOSE** - Direct apply now possible |
| Company already in pending proposals        | **SKIP** - Already proposed             |
| Company has 3+ rejections in history        | **SKIP** - Low response rate            |
| Company has positive response in history    | **BOOST SCORE** - Prioritize            |

### 6. Classify Opportunity

**A. Direct Apply** (has active job posting):

- Company has career page WITH active job posting
- Job posting is NOT redirect to LinkedIn only
- → Mark as "manual-apply"

**B. Outreach** (no direct apply possible):

- No career page found
- Career page but NO active job postings
- Job posting redirects to LinkedIn (no direct apply)
- → Mark as "send-outreach"

### 7. Calculate Priority Score

For each valid opportunity, calculate a priority score (0-100):

**Tech Stack Match (0-30 points):**

| Match                            | Points | Notes             |
| -------------------------------- | ------ | ----------------- |
| Vue.js/Nuxt.js                   | +30    | TOP PRIORITY      |
| Full-stack (Vue/React + Laravel) | +25    | Strong match      |
| React.js/Next.js                 | +25    | Strong preference |
| Full-stack (Vue/React + Node)    | +20    | Good match        |
| Laravel/PHP                      | +15    | Acceptable        |
| Other tech                       | +5     | Low priority      |
| No tech overlap                  | +0     | Skip              |

**Work Model (0-20 points):**

| Model                                | Points | Notes               |
| ------------------------------------ | ------ | ------------------- |
| Visa sponsorship + family relocation | +20    | Good for relocation |
| Remote (from Cuba/LATAM)             | +20    | Perfect             |
| Remote (global)                      | +15    | Works               |
| Hybrid without visa                  | +0     | Skip                |
| Onsite                               | +0     | Not suitable        |

**Salary/Benefits (0-20 points):**

| Salary Info                | Points | Notes       |
| -------------------------- | ------ | ----------- |
| Salary + benefits provided | +20    | Competitive |
| Salary range provided      | +15    | Transparent |
| Benefits mentioned         | +10    | Some value  |
| No info                    | +0     | Unknown     |

**Company Quality (0-15 points):**

| Stage               | Points | Notes        |
| ------------------- | ------ | ------------ |
| Enterprise (500+)   | +15    | Stable       |
| Series A/B (50-500) | +15    | Growing      |
| Startup (< 50)      | +10    | Early stage  |
| Unknown             | +5     | Can't verify |

**Response History (0-15 points):**

| History                                 | Points | Notes             |
| --------------------------------------- | ------ | ----------------- |
| Positive response before                | +15    | Boost priority    |
| Any response before                     | +10    | Responsive        |
| No history                              | +0     | Unknown           |
| 3+ rejections/no-response last 6 months | -10    | Low response rate |

### 8. Classify by Score

| Score Range | Priority | Action Plan                               |
| ----------- | -------- | ----------------------------------------- |
| 70-100      | HIGH     | Direct apply + outreach email + follow-up |
| 40-69       | MEDIUM   | Outreach email only (low effort)          |
| 0-39        | LOW      | Skip (not worth effort)                   |

### 9. Save Proposals to Temp Files

Create detailed proposals with FULL EMAIL CONTENT and RESUME SECTIONS.

**USE KNOWLEDGE BASE:**

- Load `job-ai/KNOWLEDGE_BASE.md` for:
  - Profile sections (use actual achievements, not placeholders)
  - Skills to highlight (match job requirements)
  - Experience bullets (use real examples)
  - Email tone and content style

**Speech Mode & Tone:**

- Language: Match company's language (English or Spanish) - see section 2.5
- Tone: Professional, concise, confident but not arrogant
- Length: Emails under 150 words
- Focus: Value proposition, not just interest

**temp/direct.md** - For high-score opportunities (70+):

```markdown
## {{company_name}} - {{position_title}}

**Score:** {{score}}/100 ({{priority}} PRIORITY)
**Proposed:** {{YYYY-MM-DD}}
**Action:** Direct Apply + Outreach + Follow-up

### Company

- **Name:** {{company_name}}
- **Website:** {{company_website}}
- **Emails:** {{comma-separated list of all found emails}}
- **Sector:** {{industry_sector}}
- **Tech Stack:** {{tech_stack_csv}}
- **Stage:** {{startup|series-a|series-b|enterprise|unknown}}

### Position

- **Title:** {{position_title}}
- **URL:** {{job_posting_url}}
- **Application Type:** {{company_page|email|LinkedIn}}
- **Model:** {{remote|hybrid|onsite}}
- **Location:** {{location}}
- **Salary:** {{salary_range_or_null}}

---

## Resume Sections (Tailored)

**Speech Mode:** Match company's language
**Tone:** Professional, achievements-focused

### Profile (Tailored)

{{2-3 sentences: years_experience + primary_skill + key_achievement + how_it_relates_to_company}}

### Skills to Highlight

{{3-5 skills most relevant to the job posting}}

---

## Cover Letter (for direct apply)

**Subject:** {{position_title}} Application - Rayko Azcue

**Tone:** Professional, concise, role-focused

Dear {{Hiring Team|Hiring Manager}},

{{Opening: Express interest in role + why company (1 sentence)}}

{{Body: 1-2 relevant achievements that match job requirements (2 sentences)}}

{{Closing: Call to action + attached resume mention (1 sentence)}}

Best regards,
Rayko Azcue

---

## Outreach Email (to technical contact)

**Subject:** {{Dynamic subject line - company name + role or question}}

**Tone:** Professional, curious, value-first

Hi {{recipient_name|there}},

{{Opening: 1 sentence - specific thing noticed about company OR connection to their work}}

{{Body: Your relevant achievement + why this company interests you (2 sentences)}}

{{Closing: Question or call to action}}

Best regards,
Rayko Azcue
Senior Frontend Developer
{{linkedin_url}}
{{phone_number}}

---

## Follow-up Email (schedule for 7 days after)

**Subject:** Following up - {{position_title}}

**Tone:** Polite, brief, non-pushy

Hi {{recipient_name|there}},

{{Short follow-up: Reference previous email + still interested + ask if needed more info}}

Best regards,
Rayko Azcue

---

### Actions

[ ] Review cover letter → Approve → Apply via company page
[ ] Review outreach email → Approve → Send to technical contact
[ ] On send: Add follow-up to temp/followups.md
[ ] Build tailored + hybrid resumes
```

**temp/outreach.md** - For medium-score opportunities (40-69):

```markdown
## {{company_name}}

**Score:** {{score}}/100 (MEDIUM PRIORITY)
**Proposed:** {{YYYY-MM-DD}}
**Action:** Outreach Only

### Company

- **Name:** {{company_name}}
- **Website:** {{company_website}}
- **Emails:** {{comma-separated list of all found emails}}
- **Sector:** {{industry_sector}}
- **Tech Stack:** {{tech_stack_csv}}

### Position (if any)

- **Title:** {{position_title_or_null}}
- **URL:** {{job_posting_url_or_null}}
- **Model:** {{remote|hybrid|onsite}}
- **Location:** {{location}}

---

## Resume Sections (Tailored)

**Speech Mode:** Match company's language
**Tone:** Professional, concise

### Profile (Tailored)

{{2-3 sentences: years_experience + primary_skill + key_achievement}}

### Skills to Highlight

{{3-5 skills most relevant to company}}

---

## Outreach Email

**Subject:** {{Dynamic subject - role + company name}}

**Tone:** Professional, concise, curious

Hi {{recipient_name|there}},

{{Opening: 1 sentence - noticed about company}}

{{Body: Your relevant experience + what interests you about them}}

{{Closing: Question about hiring or connection}}

Best regards,
Rayko Azcue

---

## Follow-up Email (7 days after)

**Subject:** Following up - {{company_name}}

**Tone:** Polite, brief, non-pushy

Hi {{recipient_name|there}},

{{Short follow-up: still interested + any opportunities}}

Best regards,
Rayko Azcue

---

### Actions

[ ] Review outreach email → Approve → Send
[ ] On send: Add follow-up to temp/followups.md
```

### 10. Present Options to User

Show summary table with scores and ask:

```
I found X opportunities:

| # | Company | Score | Type | Action Plan |
|---|---------|-------|------|-------------|
| 1 | Company A | 85 | HIGH | Direct + Outreach + Followup |
| 2 | Company B | 55 | MEDIUM | Outreach only |
| ...

What would you like to do?
[A] Process high-priority (score 70+)
[B] Process medium-priority (score 40-69)
[C] Both
[D] Review details first
[E] Something else?
```

### 11. On User Approval - Full Workflow

When user approves a proposal, execute these steps in order:

#### Step 1: Create Resume Config

- Call resume-build skill → Build resumes
- Creates `configs/resume/{id}.json` with tailored config

#### Step 2: Execute Primary Action

**If DIRECT APPLY:**

- Submit application via company page/email
- Update applications.json:
  - status: "applied"
  - applicationDate: today's date
  - outcomes.emailSentAt: today's date (if via email)
  - outcomes.emailsSent: list of all emails sent to

**If OUTREACH EMAIL:**

- **Send to ALL found emails** (not just one):
  - For each email in the found email list:
    - Send via yandex-mailer
    - Track sent status
- Update applications.json:
  - status: "sent"
  - outcomes.emailSentAt: today's date
  - outcomes.emailsSent: ["email1", "email2", ...]
  - outcomes.emailContent: full email sent

#### Step 3: Update Companies.json

For new company (not in companies.json):

```json
{
  "name": "{{company_name}}",
  "website": "{{website}}",
  "sector": "{{sector}}",
  "techStack": ["{{tech}}"],
  "stage": "{{startup|series-a|series-b|enterprise|unknown}}",
  "score": {{score}},
  "lastContact": "{{YYYY-MM-DD}}",
  "contactHistory": [{
    "date": "{{YYYY-MM-DD}}",
    "type": "outreach" | "direct-apply",
    "status": "sent" | "applied",
    "response": "no-response",
    "applicationId": "{{application_id}}"
  }],
  "positiveResponses": 0,
  "negativeResponses": 0,
  "totalContacts": 1,
  "notes": "{{company notes}}"
}
```

For existing company:

- Update lastContact to today's date
- Add new entry to contactHistory
- Increment totalContacts

#### Step 4: Schedule Follow-up (if outreach)

Add to temp/followups.md:

```markdown
- **App ID:** {{application_id}}
- **Company:** {{company_name}}
- **Recipient:** {{email_address}}
- **Due:** {{YYYY-MM-DD + 7 days}}
- **Status:** pending
```

#### Step 5: Update Applications.json Full Entry

Add/update in applications.json:

```json
{
  "id": "{{application_id}}",
  "type": "direct-apply" | "outreach",
  "score": {{score}},
  "priority": "HIGH" | "MEDIUM" | "LOW",
  "company": {
    "name": "{{company_name}}",
    "website": "{{website}}",
    "email": "{{contact_email}}",
    "sector": "{{sector}}",
    "techStack": ["{{tech}}"],
    "stage": "{{stage}}"
  },
  "position": {
    "title": "{{position_title}}",
    "url": "{{job_url}}",
    "applicationType": "{{type}}",
    "model": "{{remote|hybrid|onsite}}",
    "location": "{{location}}",
    "salary": "{{salary}}",
    "language": "{{en|es}}"
  },
  "status": "applied" | "sent",
  "applicationDate": "{{YYYY-MM-DD}}",
  "outcomes": {
    "emailSentAt": "{{YYYY-MM-DD}}",
    "emailsSent": ["{{email1}}", "{{email2}}", ...],
    "followupSentAt": null,
    "responseReceived": false,
    "responseType": "no-response",
    "emailContent": "{{full email text}}"
  },
  "proposal": {
    "proposedAt": "{{YYYY-MM-DD}}",
    "proposedWhy": "{{reason}}",
    "profile": "{{tailored profile}}",
    "skills": ["{{skill1}}", "{{skill2}}"],
    "coverLetter": "{{cover letter}}",
    "outreachEmail": "{{outreach email}}",
    "outreachEmails": ["{{email1}}", "{{email2}}", ...],
    "followupEmail": "{{follow-up email}}"
  }
}
}
```

#### Step 6: Update TODO.md

After all updates, regenerate TODO.md with:

- Current application counts by status
- Pending follow-ups
- Open proposals

---

### 12. Update & Track

After any contact:

**Update applications.json:**

- Applied → status: "applied", applicationDate
- Sent outreach → status: "sent"
- Scheduled follow-up → status: "followup-scheduled"
- Sent follow-up → status: "followup-sent"
- Rejection → status: "rejected", rejectionDate, rejectionNote

**Update companies.json:**

- Add new contact entry to contactHistory
- Increment totalContacts
- Update positive/negative response counts if applicable
- Recalculate score based on response history

---

### 13. Regenerate TODO

After completing all steps:

1. Update temp/TODO.md with:
   - Current application counts by status
   - Pending follow-ups
   - Open proposals
   - Any new archived months

---

## Application JSON Structure

When adding new applications, use this structure:

```json
{
  "id": "YYYY-MM-DD-company-position-slug",
  "type": "direct-apply" | "outreach",
  "score": 75,
  "company": {
    "name": "Company Name",
    "website": "https://company.com",
    "email": "contact@company.com" | null,
    "sector": "Industry",
    "techStack": ["Vue.js", "React"],
    "stage": "startup" | "series-a" | "series-b" | "enterprise" | "unknown"
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
  "status": "pending" | "approved" | "sent" | "applied" | "followup-scheduled" | "followup-sent" | "interview" | "negociation" | "rejected",
  "applicationDate": "YYYY-MM-DD" | null,
  "rejectionDate": null,
  "rejectionNote": "",
  "notes": {
    "model": "Company description - work model",
    "company": "Detailed company info",
    "techStack": "Full tech stack mentioned",
    "role": "Role responsibilities"
  },
  "proposal": {
    "proposedAt": "YYYY-MM-DD",
    "proposedWhy": "Reason for targeting this company",
    "profile": "Tailored profile section",
    "skills": ["Skill 1", "Skill 2"],
    "coverLetter": "Full cover letter text",
    "outreachEmail": "Full outreach email text",
    "followupEmail": "Full follow-up email text"
  },
  "outcomes": {
    "emailSentAt": "YYYY-MM-DD",
    "followupSentAt": "YYYY-MM-DD" | null,
    "responseReceived": true | false,
    "responseDate": "YYYY-MM-DD" | null,
    "responseType": "positive" | "negative" | "no-response",
    "interviewScheduled": true | false,
    "interviewDate": "YYYY-MM-DD" | null,
    "feedback": "Notes from the process"
  }
}
```

## Important Rules

1. **RUN DAILY CHECKOUT FIRST** - Always run step 0 (daily checkout) before any new search
2. **CHECK TODO.md FIRST** - Always check TODO.md, MANUAL_TODO.md, and followups.md before starting new search
3. **Process follow-ups before search** - Handle all pending follow-ups before finding new opportunities
4. **Process MANUAL_TODO items** - Review email responses needing manual categorization
5. **ALWAYS ask before proceeding** - Never auto-send or auto-apply
6. **Score all proposals** - Calculate priority score (0-100) before saving
7. **Check conflicts first** - Query applications.json and companies.json before proposing
8. **Two temp files by score** - direct.md for high-score (70+), outreach.md for medium-score (40-69)
9. **No direct apply to LinkedIn** - If posting redirects to LinkedIn, treat as outreach
10. **Track everything** - Update applications.json and companies.json after any action
11. **Schedule all follow-ups** - Always add follow-up entry in temp/followups.md after sending outreach
12. **Require contact email for outreach** - Skip if no email found
13. **Config file sync** - When creating new application, also create/update config file in `job-ai/configs/resume/{id}.json` with matching metadata
14. **CRITICAL: Verify URL is ACTIVE** - Before proposing, check that the job posting URL works and the position is still open
15. **CRITICAL: Verify Cuba/LATAM eligibility** - Confirm the role is open for Cuba or LATAM generally. Skip if it specifies countries like "Argentina only", "Mexico only", etc.
16. **Prioritize Vue.js/Nuxt.js** - User prefers frontend Vue.js roles. Only propose full-stack if no good Vue.js options available

## Tools Used

- Web search (OpenCode)
- Playwright MCP (website scraping)
- File read/write (applications.json, temp files)
- Yandex mailer (for sending outreach)
- Yandex email checker (for checking responses via IMAP)

## Files

- `job-ai/data/applications.json` - Single source of truth for applications
- `job-ai/data/companies.json` - Company tracking with history and scores
- `job-ai/data/email-state.json` - Email check timestamp and tracked IDs
- `job-ai/configs/sources.json` - Search sources
- `job-ai/temp/direct.md` - High-score proposals (70+)
- `job-ai/temp/outreach.md` - Medium-score proposals (40-69)
- `job-ai/temp/followups.md` - Scheduled follow-up emails
- `job-ai/temp/MANUAL_TODO.md` - User tasks requiring manual review (emails)
- `job-ai/temp/TODO.md` - Summary of all pending - CHECK FIRST
- `job-ai/skills/resume-build/SKILL.md` - Resume building
- `job-ai/prompts/score/system.md` - Scoring criteria
