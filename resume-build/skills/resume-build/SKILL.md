---
name: resume-build
description: 'Build tailored PDF resumes (EN/ES, full or one-page) from a JSON config and the profile knowledge base. Use for "build resume", "tailor resume", "generate PDF", "update my CV", and when job-hunt prepares an application.'
---

# Resume Build

Builds ATS-friendly PDF resumes from a JSON config, rendered through `templates/harvard-template.html` with Puppeteer.

## Rules

1. **The knowledge base is the source of truth.** Every claim must come from `KNOWLEDGE_BASE.md` / `KNOWLEDGE_BASE.es.md`, or from an answer the user gave in this session. Never invent metrics, tools or responsibilities.
2. **Company-specific resumes stay private.** The repo is public. Tailored configs and PDFs go in `job-hunt/applications/<id>/` (git-ignored), never in `resume-build/configs/` or `public/`.
3. **Never pass a position JSON argument** (the optional second argument). It writes company metadata to `position-history.json`, which is tracked.
4. **Don't modify `default.json`, the knowledge base or the template** unless the user asks. When new skills are confirmed, propose the exact knowledge base lines and wait for approval.

5. **English knowledge base is the reference for facts.** `KNOWLEDGE_BASE.es.md` is a shorter Spanish version and may lag behind. For Spanish resumes, take facts and metrics from the English file and use the Spanish one only for wording. If the two disagree, ask.
6. **Don't inflate titles.** Use the job titles exactly as listed (e.g. "Software Engineer" at El Asadito, "(Junior)" roles). Seniority is shown through the summary and bullets, not by renaming roles.

## Keeping the public profile in sync

The same experience appears in several places. When a job, date, title, metric or "years of experience" changes, update **all** of them in one go, after the user approves:

| Copy | Used for |
|---|---|
| `resume-build/KNOWLEDGE_BASE.md` / `.es.md` | Source of truth for tailoring |
| `resume-build/configs/default.json` | Public resume and CV PDFs (rebuild both afterwards) |
| `src/i18n/en.ts` / `es.ts` (`experience` items and highlights) | Experience section on the site |
| `api/api/chat.ts` (`knowledgeBase`) | AI chat assistant on the site |
| `api/api/alexa.ts` (`knowledgeBase`, intents) | Alexa skill |

Then run `npm run build` and compare dates and titles across the copies.

## Files

| File | Role |
|---|---|
| `resume-build/KNOWLEDGE_BASE.md` / `.es.md` | Profile: experience, skills, achievements (EN / ES) |
| `resume-build/configs/default.json` | Base config: the public resume on the site |
| `resume-build/templates/harvard-template.html` | Layout (section titles switch on `metadata.language`) |
| `resume-build/build-resume.cjs` | Builder |
| `job-hunt/applications/<id>/<id>.json` | Tailored config (private) |

## Config shape

Same as `default.json`. Anything missing in a tailored config (contact info, education, skills keys) falls back to `default.json`.

```jsonc
{
  "metadata": { "id": "<id>", "language": "en" | "es", "targetPosition": "...", "keywords": { "technical": [], "soft": [] } },
  "contactInfo": {
    "location": "Havana, Cuba",        // use "La Habana, Cuba" for es
    "availability": "Open to relocation with family · Visa sponsorship required"  // optional line under contact info
  },
  "summary": "...",
  "skills": { "technical": "...", "additional": "...", "languages": "..." },
  "education": [ ... ],
  "experienceHighlights": [ "Result sentence @Company", ... ],   // used by the one-page version
  "experience": [ { "company", "title", "location", "dateRange", "bullets": [] } ]
}
```

## Tailoring a resume

1. Copy `configs/default.json` to `job-hunt/applications/<id>/<id>.json`. Set `metadata.id` to `<id>` (it must match the filename).
2. **Language:** use the posting's language. For Spanish, set `metadata.language: "es"`, `contactInfo.location: "La Habana, Cuba"`, and write the summary, skills, highlights and bullets in Spanish from `KNOWLEDGE_BASE.es.md`.
3. **Availability line:** for relocation roles, set `contactInfo.availability`, e.g. *"Open to relocation with family · Visa sponsorship required"* / *"Disponible para reubicación con familia · Requiere patrocinio de visa"*. For remote roles, e.g. *"Remote · Available for US/EU/LATAM time zones"*. Leave it out if it adds nothing.
4. **Summary:** 2–3 sentences, built around the role's top requirements, with one measurable result.
5. **Skills:** trim `skills.technical` to what's relevant to the posting (about 15–25 items), with the posting's must-haves first and named the way the posting names them (e.g. "Vue.js" vs "Vue"). Remove items unrelated to the role.
6. **Experience:** keep every job so the timeline has no gaps. For relevant jobs, put the matching bullets first and reword them to echo the posting's language, without changing the facts. For less relevant jobs, cut to 1–2 bullets.
7. **Keywords:** set `metadata.keywords` from the posting (for reference; not rendered).

## Building

```bash
# Tailored resume (full)
node resume-build/build-resume.cjs job-hunt/applications/<id>/<id>.json --out job-hunt/applications/<id>

# One-page version (uses experienceHighlights instead of experience)
node resume-build/build-resume.cjs job-hunt/applications/<id>/<id>.json short --out job-hunt/applications/<id>

# Public site resume and CV (only when the user asks to update them)
node resume-build/build-resume.cjs default short   # public/Rayko_Azcue_Resume.pdf
node resume-build/build-resume.cjs default         # public/Rayko_Azcue_CV.pdf
```

Output: `resume-<id>.pdf` (and `resume-<id>-short.pdf`), plus a debug `resume.html` in the same folder.

Build the full version by default. Build the short one too when the posting asks for a one-page resume or for a short application.

## Check before handing off

1. Read the PDF: no empty sections, no "undefined", nothing overflowing, the right language throughout.
2. The page count makes sense (short: 1 page; full: usually 2–3).
3. Every metric and tool in it is in the knowledge base or was confirmed by the user.
4. `git status` shows nothing new under `resume-build/` or `public/`.
