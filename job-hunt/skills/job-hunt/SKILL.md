---
name: job-hunt
description: 'Deep job search and application prep for Rayko. Prioritises jobs with visa sponsorship and a family relocation package, with remote roles as a second track. Checks eligibility from Cuba, asks about skills the profile does not declare, presents a shortlist for approval, then prepares a job brief, a tailored email/cover letter and a tailored resume per accepted job. Never sends emails, never applies, never keeps company records in the repo. Use for "job hunt", "find jobs", "search openings", "prepare application".'
---

# Job Hunt: Search & Prepare

Find a few good, reachable openings and prepare a strong application for each one. Quality over volume: 5 well-researched applications beat 50 cold emails.

## Hard rules

1. **Never send anything.** No emails, no form submissions, no applying on any site, no messages. The output is files Rayko reviews and sends himself.
2. **No company records or personal data in the repo.** The repo is public. Company research, applications and family details live only in git-ignored paths: `job-hunt/applications/` and `job-hunt/preferences.md`. Before writing there, check with `git check-ignore -q <path>`. If the check fails, stop and say so.
3. **Don't build in `public/`.** Tailored resumes are built into the application folder with `--out`, never into `public/`.
4. **Shortlist first, prepare after approval.** Don't write emails or resumes until Rayko has accepted specific jobs.
5. **Only real contacts.** Use the application channel or the contact person shown in the posting or on the company's careers page. Never guess addresses (`hr@`, `jobs@`…).
6. **Don't invent experience.** Every claim in an email or resume must come from the knowledge base (the English file is the reference for facts and metrics) or from an answer Rayko gave in this session (see Step 3). Never stretch a "used it once" into "expert", and never rename job titles.
7. **Immigration facts come from current sources, not memory.** Visa routes, income thresholds and family rules change often. Quote the posting or an official government or immigration source, with its date. If you can't verify something, say "unverified" and don't treat it as a fact.

## Inputs

Read these fresh on every run:

| File | What it gives you |
|---|---|
| `job-hunt/preferences.md` (private) | Family situation, relocation and remote priorities, destination criteria, salary floor, countries to prefer or avoid |
| `resume-build/KNOWLEDGE_BASE.md` / `KNOWLEDGE_BASE.es.md` | Experience, skills, achievements (source of truth for claims) |
| `resume-build/configs/default.json` | Base resume and target keywords |
| `src/i18n/en.ts` (job status section) | Current target roles and availability shown on the site |
| `job-hunt/data/sources.json` | Job boards, talent platforms and careers pages |

If `job-hunt/preferences.md` is missing, copy `job-hunt/preferences.example.md` to it and ask Rayko to fill it in before searching.

## Step 1: Deep search

Run two tracks. Track A is the priority. Track B gives income and stability, and in some countries a remote job can itself support a residence permit. Flag that only after verifying it per Rule 7.

- **Track A: Relocation with sponsorship.** Roles that sponsor a work visa for Rayko *and* his dependents.
  Example queries: `"visa sponsorship" "relocation" senior frontend`, `"relocation package" Vue developer`, `"we sponsor visas" full stack engineer`, plus the destinations listed in preferences.
- **Track B: Remote.** Roles open to hiring from Cuba (worldwide or LATAM, or contractors through a platform that can pay people in Cuba). Rank higher the remote roles that state a path to relocation or sponsorship later ("remote first, then relocate"); label them **B→A** in the shortlist.
  Example queries: `"Vue.js" OR "Nuxt" remote LATAM`, `"senior frontend" remote worldwide`, `"desarrollador frontend" remoto Vue`.

Also check the boards in `sources.json` (use each source's `track` and `cuba_eligibility` fields to pick where to look; `cuba-filter` sources are pre-filtered for Cuba, `unverified` ones need a per-posting check) and employers of record or staff augmentation firms (check each one's country list). Rotate queries between runs.

**Open each posting and read it in full.** Never shortlist from a search snippet. For every candidate, collect evidence (quote the posting):

| Check | Pass when |
|---|---|
| **Open** | Posted within ~30 days and not marked closed |
| **Eligible from Cuba** | Track A: sponsorship explicitly offered, with no nationality restriction. Track B: worldwide / anywhere / LATAM without a country list that excludes Cuba |
| **Hiring restrictions** | No sign the company can't hire or pay people in Cuba (US payroll only, country list without Cuba, "must reside in…", "must already have work authorization") |
| **Stack fit** | Most of the required stack is in the knowledge base. If not, a promising job goes to Step 3; don't reject it straight away |
| **Seniority fit** | The levels listed in `preferences.md` (including any "only if…" conditions) |
| **Role and setup** | Role type, employer type and work mode match `preferences.md`; use its order of preference for ranking |
| **Deal-breakers** | None of the deal-breakers in `preferences.md` apply (e.g. night-hours overlap, long unpaid tests, excluded industries) |
| **Pay** | Meets the minimums in `preferences.md`; for relocation, judge against the local cost of living for the family |
| **Real channel** | There's a clear way to apply: an application form, a named recruiter, or an address shown in the posting |

For Track A jobs, also record the **family relocation package**. Mark each item ✅ stated, ❓ not mentioned (ask in interview), or ❌ excluded:

- Work visa sponsorship for Rayko
- Dependent visas for spouse and child, or a family reunification route within the window set in `preferences.md` (verify the route and processing times per Rule 7)
- Spouse's right to work
- Relocation allowance, flights, temporary housing
- Health insurance covering the family
- School or childcare support (the child is 3)

And rate the **destination** against the criteria in `preferences.md` (climate, healthcare, education, lifestyle, Latin community / friendliness, IT market). Give one short line per criterion, from current sources, not stereotypes.

Skip anything that fails *Open*, *Eligible*, *Real channel* or *Deal-breakers*, or whose destination is on the "Avoid" list. Write down the reason in the shortlist's "Rejected" section so Rayko can override it.

## Step 2: Shortlist (wait for approval)

Show the shortlist in chat, at most 10 rows, ordered by Track A, then B→A, then B, and by fit within each:

| # | Track | Company · Role · City/Country | Link | Fit (1–5) | Why it fits | Relocation package (✅/❓/❌ summary) | Destination fit | Red flags | Channel |

Below the table:

- **Rejected:** company: reason
- **Skill questions** (see Step 3), if any

Then **stop and ask which jobs to prepare** and ask the skill questions. Don't continue without an explicit selection.

## Step 3: Undeclared skills

The knowledge base may not list everything Rayko knows. Before rejecting a promising job, or when an accepted job asks for something the knowledge base doesn't cover:

1. List each missing requirement (tool, domain, practice), grouped by job.
2. Ask concise questions in **one** message, e.g. *"GraphQL (required by Acme): have you used it? Where, for how long, and what did you build?"*
3. Treat the answer as the only evidence:
   - **Yes, with details** → you may use it in this application, worded at the level he described.
   - **Some exposure** → mention only as familiarity, or leave it out.
   - **No** → it's a gap. Keep it in the brief, and in the email if it matters (e.g. "I haven't used X in production, but…").
4. At the end, offer to add the confirmed skills to the knowledge base (`KNOWLEDGE_BASE.md` and `KNOWLEDGE_BASE.es.md`). Show the exact lines and only write them after approval. These files are public, so add only skills and experience Rayko is happy to show publicly; never company names from current applications.

## Step 4: Application folder

For each accepted job, create `job-hunt/applications/YYYY-MM-DD-<company>-<role>/` (kebab-case) with:

### `brief.md`

- Posting link, date found, track (A/B), eligibility wording (quoted)
- Company: what it does, size/stage, tech stack, anything recent (funding, launches)
- Requirements mapped to evidence: requirement → matching experience (knowledge base or a Step 3 answer). Mark gaps honestly.
- **Track A:** the relocation package checklist with quotes, the destination notes, and the visa route if it's known and verified (with sources)
- **Questions to ask the employer**, e.g. dependent visas, spouse work rights, relocation support, family health cover, schooling, timeline, who pays visa fees
- Channel: how to apply (form URL, recruiter name and profile, or the address shown in the posting)
- 2–3 likely interview topics and how to answer them from real experience

### `email.md`

Use the posting's language (EN or ES). The goal is a short message a busy recruiter actually reads.

- **Subject:** role title and one concrete hook, e.g. `Senior Vue/Nuxt Engineer: cut LCP 3.2s → 1.4s on a Nuxt e-commerce`
- **Greeting:** the recruiter or hiring manager by name if known, otherwise the team
- **Body:** 120–180 words:
  1. Which role, and why this company specifically (one real detail from the research)
  2. Two or three matches between their requirements and measurable results
  3. Location in one line:
     - Track A: based in Havana, ready to relocate with his family (spouse and child), and requires visa sponsorship. Be clear and early about sponsorship; hiding it wastes everyone's time.
     - Track B: based in Havana, works remotely with US/EU/LATAM teams. Payment details only if the posting raises them, and ask Rayko to confirm them.
  4. Short call to action
- Signature: name, `razcue@yandex.com`, `razcue.github.io`
- If the channel is a form, also include `cover-letter.md` (same content, formatted for a text field) and short answers to any questions the form asks

Avoid generic openers ("Hi there", "I'm reaching out about potential opportunities"), buzzword lists, and repeating the whole resume.

### Tailored resume

Follow the `resume-build` skill using the application folder:

```bash
node resume-build/build-resume.cjs job-hunt/applications/<id>/<id>.json --out job-hunt/applications/<id>
```

Use the Spanish knowledge base and `"language": "es"` when the posting is in Spanish. Open the PDF and check it renders correctly.

## Step 5: Hand-off

End with a short summary in chat:

- One line per prepared application: folder path, track, channel, anything Rayko must do or decide before sending (e.g. confirm the notice period or start date from `preferences.md`)
- Skill questions still open, and any proposed knowledge base additions waiting for approval
- Unverified immigration points that need checking with an official source

Don't keep notes about which jobs were sent; Rayko tracks that in his email.

## Files

- `job-hunt/preferences.md`: private preferences (git-ignored); `preferences.example.md` is the public template
- `job-hunt/data/sources.json`: job boards, talent platforms and careers pages (public, no personal data)
- `job-hunt/applications/`: private output (git-ignored)
- `job-hunt/applications/_archive/`: old configs and tracking data from the previous autopilot workflow (private, reference only)
- `resume-build/`: knowledge base, base resume config and PDF builder
