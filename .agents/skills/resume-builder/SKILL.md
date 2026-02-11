---
name: resume-builder
description: Minimal in-project agent skill to build tailored resumes using the repository's resume-builder tools with knowledge base.
---

# Resume Builder — Skill

This in-repo skill guides an Agent to produce tailored resumes and application artifacts using the repository's `resume-builder/` tooling and the project's canonical profile sources.

**Primary sources (canonical):** `resume-builder/KNOWLEDGE_BASE.md` and `resume-builder/position-history.json`

## When to Use

- You need a tailored resume, cover letter, or outreach message for a specific job application.
- You want the Agent to generate a new config in `resume-builder/configs/` and optionally build PDF/HTML artifacts.
- You want to keep wording aligned canonical profile and ATS-friendly phrasing.
- You want to check positions you applied for or get porfessional information and accomplishments.

## How to Use / Core Workflow

1. Ask the user for missing inputs: target `title`, `company`, `job link` (or paste job description), `language`, `deadline` (optional), and `desired focus` (e.g., performance, frontend, leadership).
2. Read `resume-builder/KNOWLEDGE_BASE.md` to extract canonical phrasing, roles, and accomplishments.
3. Parse the job description for keywords and prioritize matching skills/phrases from the knowledge base.
4. **Select 2–3 most relevant experience entries** from the knowledge base that align with the target role.
5. Generate a config file: `resume-builder/configs/YYYY-MM-DD-{company}-{role}.json` containing `metadata`, `contactInfo` (merged from `default.json`), `summary`, `skills`, `experience` (2–3 selected roles, 1–3 bullets each), and `artifacts` (coverLetter, emailPitch, socialMessages).
6. Show the generated config to the user for quick approval or small edits.
7. On approval, run: `node resume-builder/build-resume.cjs {configName}` to produce `public/resume.html` and `public/Rayko_Azcue_Resume.pdf`.
8. **Verify the PDF is exactly one page.** If it exceeds one page, remove less relevant experience entries (2–3 selected) and experience bullets (1–3 bullets each) or until the PDF fits one page.
9. Iterate until one-page PDF is achieved, then confirm with the user.
10. After approval, ask the user if they want to update `resume-builder/KNOWLEDGE_BASE.md` with fresh information.

## Requirements

- Repository tools: `node` (v16+ recommended) and project dependencies installed (`npm install` in repo root if needed).
- Access to `resume-builder/configs/default.json` for contact/education defaults.
- Access to `resume-builder/KNOWLEDGE_BASE.md` (extracted summary).
- Access to `resume-builder/position-history.json` (position history metadata).
- Keep config filenames unique using `YYYY-MM-DD-{company}-{role}` pattern and use it as identifier whitin `resume-builder/position-history.json`.

## Practical ATS Tips

- Use plain text for resume sections.
- Mirror exact keywords from target job descriptions: job title, frameworks, responsibilities.
- Experience bullets: start with action verbs, quantify outcomes, mention technologies where relevant.

## Completion Checklist

- [ ] Collected missing inputs from the user (title, company, job link, language, or get from job description).
- [ ] Read and matched keywords from the job description to the knowledge base.
- [ ] Selected 2–3 most relevant experience entries aligned to the target role.
- [ ] Created `resume-builder/configs/YYYY-MM-DD-{company}-{role}.json`, included `metadata` and `artifacts`.
- [ ] Merged `contactInfo` and `education` from `configs/default.json` where fields are missing.
- [ ] Presented the generated config to the user and received approval.
- [ ] Ran `node resume-builder/build-resume.cjs {configName}` and confirmed `public/resume.html` and PDF output.
- [ ] **Verified the PDF is exactly one page; if not, reduced experience bullets or entries iteratively until one-page achieved.**
- [ ] Confirmed `resume-builder/position-history.json` includes the new application metadata entry.

## What to Do / What not to Do

Do:

- Use `resume-builder/KNOWLEDGE_BASE.md` as the single source of truth for phrasing and accomplishments.
- Use `resume-builder/position-history.json` to track and fetch positions you applied for.
- Select 2–3 most relevant experiences that directly match the target role.
- Keep each experience to 1–2 bullets max; prioritize measurable impact.
- Verify the final PDF is exactly one page; reduce content iteratively if needed.
- Ask clarifying questions before creating or committing a config.

Do not:

- Include more than 3 experience entries; prioritize over breadth.
- Use more than 2 bullets per experience entry.
- Invent dates, metrics, or responsibilities not supported by the knowledge base or the user's confirmation.
- Commit a config that produces a multi-page PDF; one page is mandatory.

## Quick Commands

- Generate a resume (after approval): `node resume-builder/build-resume.cjs YYYY-MM-DD-{company}-{role}`

## Notes

- If `configs/default.json` is missing contact fields, ask the user to provide them before finalizing the config, then update the `configs/default.json` file.
- The Agent should always return the new config path and a short summary of changes for user review.
