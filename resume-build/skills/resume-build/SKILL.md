---
name: resume-build
description: 'Agent skill for building tailored and hybrid PDF resumes for job applications. Creates configs and generates PDF resumes based on job proposals.'
---

# Resume Build - Agent Skill

## Overview

Standalone agent skill for building tailored and hybrid PDF resumes for job applications. Works independently with config files and knowledge base.

## When to Use

- User wants to build resumes for job applications
- User wants to create or modify resume configs
- User mentions "build resume", "generate PDF", "tailor resume"

---

## How It Works

### 1. Check Knowledge Base

- Read `resume-build/KNOWLEDGE_BASE.md` (English) or `resume-build/KNOWLEDGE_BASE.es.md` (Spanish) for profile context
- Use as compact, local knowledge base when tailoring resumes

### 2. Review or Create Config

For each application needing a resume:

**A. Tailored Resume Config** (full customization):

- Create `resume-build/configs/{application_id}.json`
- Use `default.json` as base
- Rewrite:
  - `metadata.targetPosition` → position title
  - `metadata.keywords` → skills from proposal
  - `metadata.positionModel`, `metadata.location`, `metadata.language` → from application
  - `summary` → tailored summary
  - `experience[].selected` → true only for relevant experiences
  - Rewrite bullets to emphasize role-specific achievements

**B. Hybrid Resume Config** (default + tailored summary):

- Create `resume-build/configs/{application_id}-full.json`
- Copy ALL content from `default.json`
- Only change:
  - `metadata.targetPosition` → position title
  - `summary` → tailored summary

### 3. Build PDFs

Run resume builder for each config:

```bash
# Tailored resume
node resume-build/build-resume.cjs {application_id}

# Hybrid resume
node resume-build/build-resume.cjs {application_id}-full
```

Outputs:

- `public/resume-{application_id}.pdf` (tailored)
- `public/resume-{application_id}-full.pdf` (hybrid)

### 4. Validate Config

When creating a new config file, ensure:
- Config structure matches `default.json` schema
- `metadata.id` matches the filename
- All required fields are present (contactInfo, summary, skills, experience, education)

---

## Configuration Files

### Base Config

`resume-build/configs/default.json` - Master resume template

### Generated Configs

`resume-build/configs/{application_id}.json` - Tailored versions
`resume-build/configs/{application_id}-full.json` - Hybrid versions

---

## Rules

1. **Validate before building** - Check config structure and required fields
2. **Two PDFs per application** - Tailored AND hybrid
3. **Use knowledge base** - Read KNOWLEDGE_BASE.md for profile context
4. **Preserve default** - Never modify default.json without user request
5. **Sync metadata** - Config file metadata must be consistent

---

## Tools Used

- File read/write (for configs)
- Shell command (to run build-resume.cjs)
- Web browser (if needed for research)

---

## Files

- `resume-build/KNOWLEDGE_BASE.md` - Profile knowledge base (EN)
- `resume-build/KNOWLEDGE_BASE.es.md` - Profile knowledge base (ES)
- `resume-build/configs/default.json` - Base resume config
- `resume-build/configs/*.json` - Tailored resume configs
- `resume-build/build-resume.cjs` - Build script
- `resume-build/templates/harvard-template.html` - HTML template
