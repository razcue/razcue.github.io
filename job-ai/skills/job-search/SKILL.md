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

## Filtering Rules (APPLY BEFORE SCORING)

### 1. Location Fit Check

- ✅ Good fit → Continue to scoring:
  - Remote globally / "work from anywhere" / "remote" / "anywhere in the world"
  - Remote LATAM (no specific countries listed)
  - Visa sponsorship (any country)

- ❌ Not a good fit → Skip or mark as OUTREACH:
  - Remote LATAM with SPECIFIC country list, not having Cuba (e.g., "Argentina, Brazil, Colombia") → OUTREACH
  - Specific cities/countries listed without Cuba → OUTREACH
  - "LATAM" with countries listed that don't include Cuba → OUTREACH

**Note:** It's acceptable if "remote LATAM" or similar broad terms are used; Cuba doesn't need to be explicitly listed. Only problematic when specific countries are listed excluding Cuba.

### 2. Active Position Check

- ✅ Job posting URL is active and accepting applications → DIRECT APPLY eligible
- ❌ Job posting shows "Closed", "No longer accepting", "Expired", "This job is closed" → OUTREACH

### 3. Application Source Check

- ✅ Company careers page (company.com/careers, company.com/jobs, company.com/jobs/...) → DIRECT APPLY
- ❌ Job board postings → OUTREACH (not direct apply)
  - We Work Remotely
  - Remotive
  - LinkedIn Jobs
  - Indeed
  - Glassdoor
  - Dynamo Jobs
  - Remote Rocketship
  - VueJobs
  - Get on Board (company page is OK, but their job board is not)

### 4. Double-hit Strategy

- All direct apply entries MUST also include company outreach emails
- Even when applying via company page, also send outreach email to company contacts (multiple emails if found)

---

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
- **Contact emails (FIND MULTIPLE - VERIFY EACH):**
  - **Step 1:** Check job posting page for application email (if listed)
  - **Step 2:** Visit company website and scrape:
    - Homepage footer
    - /contact page
    - /careers or /jobs page
  - **Step 3:** Generate ALL possible email patterns (no limit):
    hr@{{domain}}, careers@{{domain}}, jobs@{{domain}}, recruiting@{{domain}}, talent@{{domain}}, recruitment@{{domain}}, hiring@{{domain}}, apply@{{domain}}, work@{{domain}}, contact@{{domain}}, info@{{domain}}, hello@{{domain}}, support@{{domain}}, admin@{{domain}}, team@{{domain}}, office@{{domain}}, contactus@{{domain}}, general@{{domain}}, mail@{{domain}}, staff@{{domain}}, dev@{{domain}}, tech@{{domain}}, it@{{domain}}
  - **Step 4:** Verify emails by visiting company website pages to confirm they exist
  - **Step 5:** Document which emails were actually verified on the website vs guessed
  - **Send applications to ALL verified emails found (no max limit)**
- Sector, product, target customers
- Tech stack
- Career page URL
- Active job postings
- **IMPORTANT:** Verify the job posting URL is still active before proceeding

### 4. Detect Language for Communications

**Determine email language based on:**

1. **Job posting language:**
   - If posting is in Spanish → use Spanish
   - If posting is in Portuguese → use English (NOT Portuguese)
   - If posting is in English → use English
   - If posting is in another language → default to English

2. **Company origin:**
   - Spanish-speaking countries (Spain, Mexico, LATAM) → check posting, default Spanish
   - Portuguese-speaking countries (Brazil, Portugal) → use English (NOT Portuguese)
   - English-speaking countries/companies → English

3. **User preference:**
   - English = better salaries, more opportunities
   - Spanish = local/regional companies
   - Default: **English** unless posting specifically requests Spanish

**Language decision rules:**

- If job posting explicitly asks for Spanish responses → Spanish
- If job posting is in Portuguese → English (NOT Portuguese)
- If company team is Spanish-speaking (Spanish in job description, "habla español") → Spanish
- Otherwise → English

**Store in proposal:**

```json
"language": "en" | "es"
```

### 5. Check Conflicts (Smart Filtering)

Before proposing, check against `applications.json` AND `companies.json`:

| Scenario                                    | Action                                                          |
| ------------------------------------------- | --------------------------------------------------------------- |
| Same company + same position                | **SKIP** - Already applied                                      |
| Same company + different position           | **CHECK** - Keep highest score only, skip others within 30 days |
| Already sent outreach + has new job posting | **PROPOSE** - Direct apply now possible                         |
| Company already in pending proposals        | **SKIP** - Already proposed                                     |
| Company has 3+ rejections in history        | **SKIP** - Low response rate                                    |
| Company has positive response in history    | **BOOST SCORE** - Prioritize                                    |
| Company marked as "unreachable"             | **SKIP** - All emails bounced, no valid email found             |

**Same Company Time Window Rule:**

- If you have applied to or sent outreach to a company within the last 30 days, DO NOT propose additional positions at the same company
- Keep only the highest-scoring position at each company
- Wait until 30+ days have passed before targeting the same company again

### 6. Classify Opportunity

**APPLY FILTERING RULES FIRST (Section 2.4), THEN classify:**

**A. Direct Apply** (passes ALL filtering rules):

- Location fit: ✅ (remote globally, LATAM without countries, visa)
- Active position: ✅ Job posting URL is active
- Source: ✅ Company careers page (not job board)
- → Mark as "direct-apply" + add outreach emails for double-hit

**B. Outreach** (fails one or more filtering rules):

- Location fails: Specific countries listed without Cuba → OUTREACH
- Position closed: Job posting no longer accepting applications → OUTREACH
- Source is job board: We Work Remotely, Remotive, LinkedIn, etc. → OUTREACH
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

| Model                                   | Points | Notes               |
| --------------------------------------- | ------ | ------------------- |
| Visa sponsorship + family relocation    | +20    | Best for relocation |
| Remote (global/LATAM without countries) | +20    | Passed filter       |
| Remote (specific countries)             | +10    | Lower priority      |
| Hybrid without visa                     | +0     | Skip, Not suitable  |
| Onsite without visa                     | +0     | Skip, Not suitable  |

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

Create detailed proposals for each opportunity with the following structure:

**Every proposal in temp/outreach.md MUST include:**

- **Summary (Tailored):** 2-3 sentences following the Summary Template below
- **Skills to Highlight:** Split into TWO sub-sections with comma-separated values:
  - **technologies:** Primary technical skills (Vue.js, Nuxt.js, TypeScript, etc.)
  - **additional:** Soft skills and complementary skills (Team Leadership, Remote Work, etc.)
- **Email Draft:** Following the Email Introduction Template below
- **Follow-up Email Draft:** Following the Follow-up Email Template below

**USE KNOWLEDGE BASE:**

- Load `job-ai/KNOWLEDGE_BASE.md` (English) or `job-ai/KNOWLEDGE_BASE.es.md` (Spanish) based on company language
- Load `job-ai/data/configs/default.json` for profile sections (use actual achievements)
- Match skills to job requirements
- Use real experience examples

**Templates (ALWAYS USE):**

Important Rule: Only include sectors/domains that are documented in the knowledge base or your actual experience. NEVER claim experience in sectors you don't have (e.g., Legal Tech, FinTech, Healthcare, etc. unless explicitly in KNOWLEDGE_BASE.md).

**Email Introduction Template:**

"I'm a Software Developer with 7+ years of experience serving companies across Europe, US, and LATAM, with hands-on experience in [company's sector/similar sectors]."

Only use sectors from KNOWLEDGE_BASE.md or default.json experience section.

**Summary Template:**

"Senior Front End & Full Stack Engineer with 7+ years building web applications for companies across Europe, US, and LATAM. Strong expertise in [main technologies] with proven track record of [key achievement]. Cross-functional experience across [sectors]."

**Follow-up Email Template:**

"Subject: Checking In - [Position] Opportunity at [Company]

Dear [Company] Team,

My name is [Your Name], and I recently reached out regarding [position] opportunities at [Company]. I wanted to know if there might be any current or upcoming positions that could be a good match for my experience.

With 7+ years building web applications and strong expertise in [main technologies], I'd love to discuss how I could contribute to your team.

Best regards
[Your Name]"

**Key points for follow-up emails:**

- Always introduce yourself by name first
- Mention you sent an email previously and show interest
- Use "I wanted to know if there might be" (NOT "I wanted to follow up and see if there might be")
- Never include "Please let me know if you'd like to connect"
- Keep under 150 words

**Speech Mode & Tone:**

- Language: Match company's language (English or Spanish)
- Tone: Professional, concise, confident but not arrogant
- Length: Emails under 150 words
- Focus: Value proposition, not just interest

**Proposal Structure for temp/outreach.md:**

```markdown
### {{company}} - {{position}}

- **Score:** {{score}}
- **Position:** {{position_title}}
- **URL:** {{job_url}}
- **Website:** {{website}}
- **Sector:** {{sector}}
- **Tech Stack:** {{tech_stack}}
- **Stage:** {{stage}}
- **Work Model:** {{remote|hybrid|onsite}}
- **Location:** {{location}}

#### Company Emails

- {{all email addresses found}}

#### Email Draft

[Full outreach email using template above]

#### Summary (Tailored)

[2-3 sentences following Summary Template]

#### Skills to Highlight

**technologies:** {{comma-separated technical skills}}
**additional:** {{comma-separated soft skills}}

#### Follow-up Email Draft

[Full follow-up email using template above]
```

### 10. BUILD CONFIG BEFORE USER VALIDATION

**CRITICAL: Create the full resume config BEFORE showing proposals to user for validation.**

For each proposal, create the config file in `job-ai/data/configs/{id}.json` with:

```json
{
  "metadata": {
    "id": "{{id}}",
    "configName": "{{company}}-{{position}}",
    "language": "{{en|es}}",
    "dateCreated": "{{ISO date}}",
    "targetPosition": "{{position_title}}",
    "keywords": {
      "technical": [comma-separated from job post or company stack],
      "soft": [comma-separated from job post or company stack]
    }
  },
  "contactInfo": {
    "location": "Havana, Cuba",
    "phone": "+53 5476-1244",
    "email": "razcue@yandex.com",
    "website": "razcue.github.io"
  },
  "summary": "{{copy exactly from proposal.summary}}",
  "skills": {
    "technical": "{{copy exactly from proposal.skills.technologies}}",
    "additional": "{{copy exactly from proposal.skills.additional}}",
    "languages": "English (C1 - Advanced), Spanish (Native)"
  },
  "education": [...from default.json...],
  "experience": [...from default.json...]
}
```

**The config's summary and skills MUST mirror the proposal exactly.**

### 11. Present Options to User for Validation

Show summary table with scores AND include the config content (summary + skills) for validation:

```
I found X opportunities:

| # | Company | Score | Type | Action Plan |
|---|---------|-------|------|-------------|
| 1 | Company A | 85 | HIGH | Direct + Outreach + Followup |
| 2 | Company B | 55 | MEDIUM | Outreach only |
| ...

For each opportunity, here's the content that will go into the resume:

### Company A - Senior Vue.js Developer
**Summary:** [exact summary from proposal]
**Skills - technologies:** [exact tech skills]
**Skills - additional:** [exact soft skills]

### Company B - Frontend Engineer
**Summary:** [exact summary from proposal]
**Skills - technologies:** [exact tech skills]
**Skills - additional:** [exact soft skills]

Do you approve these? [A] Approve all [B] Approve specific [C] Request changes
```

**The user validates the summary and skills that will appear in the resume.**

### 12. On User Approval - Build PDF Resume

When user approves:

1. **Build PDF Resume** using the validated config:
   - Use `node lib/build-resume.cjs {{config-id}}`
   - Output: `public/resume-{{config-id}}.pdf`

2. **Then Execute Primary Action** (same as before)

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
- Open proposals (remove the just-applied proposal from the list)

**IMPORTANT:** Also remove the applied proposal from `temp/outreach.md` file removing the entry entirely.

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
