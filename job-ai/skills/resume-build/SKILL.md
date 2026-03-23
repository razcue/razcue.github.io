# Resume Build - Agent Skill

## Overview

Agent skill for building tailored and hybrid PDF resumes for job applications. Works in conjunction with the job-search skill to process proposals from temp files.

## When to Use

- User wants to build resumes for applications in pending proposals
- Processing temp/direct.md or temp/outreach.md proposals
- User wants to create or modify resume configs

## How It Works

### 1. Check Pending Proposals

- Read `job-ai/temp/direct.md` for direct apply proposals
- Read `job-ai/temp/outreach.md` for outreach proposals
- Identify which applications need resume builds

### 2. Review Proposal Details

Each proposal in temp files contains:

```markdown
## Company Name - Position Title

**Action:** manual-apply / send-outreach

### Company

- Name, website, sector, tech stack

### Position

- Title, URL, Application Type

### Skills (for resume)

- List of technologies to emphasize

### Experience (relevant highlights)

- Key experiences to highlight

### Summary (tailored)

- Custom summary for this role
```

### 3. Generate Resume Config

For each application needing a resume:

**A. Tailored Resume Config** (full customization):

- Create `job-ai/configs/resume/{application_id}.json`
- Use `default.json` as base
- Rewrite:
  - `metadata.targetPosition` → position title
  - `metadata.keywords` → skills from proposal
  - `metadata.positionModel`, `metadata.location`, `metadata.language` → from application
  - `summary` → tailored summary from proposal
  - `experience[].selected` → true only for relevant experiences
  - Rewrite bullets to emphasize role-specific achievements

**B. Hybrid Resume Config** (default + tailored summary):

- Create `job-ai/configs/resume/{application_id}-full.json`
- Copy ALL content from `default.json`
- Only change:
  - `metadata.targetPosition` → position title
  - `summary` → tailored summary from proposal

### 4. IMPORTANT: Sync Config with Applications

When creating a new config file, ensure the metadata in the config file DUPLICATES the application entry in `applications.json`:

```json
{
  "metadata": {
    "id": "YYYY-MM-DD-company-position-slug",
    "targetPosition": "Job Title",
    "applicationType": "company page",
    "jobLink": "https://...",
    "client": "Company Name",
    "clientWebsite": "https://company.com",
    "positionModel": "remote",
    "location": "Remote (LATAM)",
    "keywords": { ... },
    "notes": { ... }
  }
}
```

The config file metadata should contain the same information as the `applications.json` entry for this application.

### 5. Build PDFs

Run resume builder for each config:

```bash
# Tailored resume
node resume-builder/build-resume.cjs {application_id}

# Hybrid resume
node resume-builder/build-resume.cjs {application_id}-full
```

Outputs:

- `public/rayko-azcue-{application_id}.pdf` (tailored)
- `public/rayko-azcue-{application_id}-full.pdf` (hybrid)

### 6. Update temp File

Mark resume as built in temp file:

```markdown
### Resume Action Needed

- [x] Build tailored resume
- [x] Build hybrid resume
- [ ] Review and approve → Apply/Send
```

### 7. Update Applications.json

After creating config, add/update the application entry in `job-ai/data/applications.json` with:

- id, type, company info, position info
- metadata (positionModel, location, salary, language, keywords)
- notes (model, company description, techStack, role)
- proposedAt, proposedWhy

### 8. Confirm with User

After building, show user:

- Summary of what was built
- Links to PDF files
- Ask for approval to proceed

## Configuration Files

### Base Config

`job-ai/configs/resume/default.json` - Master resume template

### Generated Configs

`job-ai/configs/resume/{application_id}.json` - Tailored versions
`job-ai/configs/resume/{application_id}-full.json` - Hybrid versions

## Rules

1. **Always ask before building** - Don't auto-generate without user confirmation
2. **Two PDFs per application** - Tailored AND hybrid
3. **Use temp files** - Read proposals from temp/direct.md and temp/outreach.md
4. **Validate tech stack** - If proposal mentions tech not in skills, ask user
5. **Preserve default** - Never modify default.json
6. **Sync metadata** - Config file metadata must duplicate applications.json entry

## Tools Used

- File read/write (for configs and temp files)
- Shell command (to run build-resume.cjs)
- Web browser (if needed for research)

## Files

- `job-ai/data/applications.json` - Application records
- `job-ai/configs/resume/default.json` - Base resume config
- `job-ai/temp/direct.md` - Direct apply proposals
- `job-ai/temp/outreach.md` - Outreach proposals
- `job-ai/temp/TODO.md` - Summary of pending actions
- `resume-builder/build-resume.cjs` - Build script
