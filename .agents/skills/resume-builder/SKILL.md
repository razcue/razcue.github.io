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

1. Ask the user for missing inputs: target `title`, `company`, `job link` (or paste job description), `application type` (e.g., "company page", "linkedin", "referral"), `position model` (remote, remote-global, hybrid, on-site), `location`, `model description` (human-readable description of work arrangement, office location, and relocation package details for notes), `language`, `deadline` (optional), and `desired focus` (e.g., performance, frontend, leadership).
2. Read `resume-builder/KNOWLEDGE_BASE.md` to extract canonical phrasing, roles, and accomplishments.
3. Parse the job description for keywords and prioritize matching skills/phrases from the knowledge base.
4. **Select 2–3 most relevant experience entries** from the knowledge base that align with the target role.
5. Generate a config file: `resume-builder/configs/YYYY-MM-DD-{company}-{role}.json` containing:
   - `metadata`: `id` (same as filename), `language`, `targetPosition`, `applicationType` (e.g., "company page", "linkedin", "referral"), `jobLink` (URL to job posting), `client`, `clientWebsite`, `positionModel` (remote, remote-global, hybrid, on-site), `location`, `keywords` (technical and soft skills), `dateBuilt`, `notes` (object with `model`, `company`, `techStack`, `role` properties)
   - `contactInfo` (merged from `default.json`)
   - `summary`
   - `skills` (technical, additional, languages)
   - `experience` (2–3 selected roles, 1–3 bullets each)
   - `artifacts`: `coverLetter`, `emailPitch`, `socialMessage` (each as array of paragraphs; empty arrays `[]` for unused artifacts)
6. Show the generated config AND all artifacts (coverLetter, emailPitch, socialMessage) in the chat conversation for user review and feedback.
7. On approval, run: `node resume-builder/build-resume.cjs {configName}` to produce `public/resume.html` and `public/Rayko_Azcue_Resume.pdf`.
8. **Verify the PDF is exactly one page.** If it exceeds one page, remove less relevant experience entries (2–3 selected) and experience bullets (1–3 bullets each) or until the PDF fits one page.
9. **After EACH iteration** (config changes, bullet additions, artifact edits): rebuild the resume AND display all artifacts in chat for further revision until user approves.
10. After approval, update `resume-builder/position-history.json` status and ask the user if they want to update `resume-builder/KNOWLEDGE_BASE.md` with fresh information.

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
- [ ] Created `resume-builder/configs/YYYY-MM-DD-{company}-{role}.json` with `metadata` (including `id`, `applicationType`, `jobLink`, `client`, `clientWebsite`, `positionModel`, `location`, `notes` object with `model`, `company`, `techStack`, `role`) and `artifacts` (coverLetter, emailPitch, socialMessage).
- [ ] Merged `contactInfo` and `education` from `configs/default.json` where fields are missing.
- [ ] Presented the generated config to the user and received approval.
- [ ] Ran `node resume-builder/build-resume.cjs {configName}` and confirmed `public/resume.html` and PDF output.
- [ ] **Verified the PDF is exactly one page; if not, reduced experience bullets or entries iteratively until one-page achieved.**
- [ ] Confirmed `resume-builder/position-history.json` includes the new application metadata entry with `positionModel`, `location`, and structured `notes` object containing `model`, `company`, `techStack`, `role` (note: artifacts stored in config files, not position-history).

## What to Do / What not to Do

Do:

- Use `resume-builder/KNOWLEDGE_BASE.md` as the single source of truth for phrasing and accomplishments.
- Use `resume-builder/position-history.json` to track and fetch positions you applied for.
- Select 2–3 most relevant experiences that directly match the target role.
- Keep each experience to 1–2 bullets max; prioritize measurable impact.
- Verify the final PDF is exactly one page; reduce content iteratively if needed.
- **ALWAYS display all artifacts (coverLetter, emailPitch, socialMessage) in the chat conversation** after creating or updating a config.
- **Rebuild the resume and show artifacts after EVERY iteration** for user review and feedback.
- Ask clarifying questions before creating or committing a config.
- **NEVER modify contact information** - use exactly what's in `configs/default.json`.
- **Maintain chronological order** of experiences as they appear in `KNOWLEDGE_BASE.md` (most recent first).
- **NEVER infer, assume, or fabricate technologies** - only use technologies explicitly listed in `KNOWLEDGE_BASE.md` for each role. When in doubt, ask the user.
- Use the `skills.additional` field for soft skills and non-role-specific technical skills (Team Leadership, Mentoring, Figma to Code, Jira, Linux/Ubuntu, Agile, etc.).

Do not:

- Include more than 3 experience entries; prioritize over breadth.
- Use more than 2 bullets per experience entry.
- Invent dates, metrics, or responsibilities not supported by the knowledge base or the user's confirmation.
- Commit a config that produces a multi-page PDF; one page is mandatory.
- Modify contact information (location, phone, email, website).
- Reorder experiences differently from the knowledge base.
- **NEVER infer or fabricate technologies** - only list technologies explicitly mentioned in the knowledge base for each specific role.
- Add technologies to skills or keywords that are not in the knowledge base without explicit user approval.

## Quick Commands

- Generate a resume (after approval): `node resume-builder/build-resume.cjs YYYY-MM-DD-{company}-{role}`

## Notes

- If `configs/default.json` is missing contact fields, ask the user to provide them before finalizing the config, then update the `configs/default.json` file.
- The Agent should always return the new config path and a short summary of changes for user review.
