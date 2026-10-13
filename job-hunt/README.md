# Job-Hunt

Deep job search and application prep. The agent finds openings that fit the profile and can hire from Cuba, proposes a shortlist, and, for each job you accept, prepares a brief, a tailored email or cover letter, and a tailored resume.

Nothing is sent and nothing is tracked in this repo. You review the files and send them yourself.

## Structure

```
job-hunt/
├── data/
│   └── sources.json          # Job boards, talent platforms and careers pages to check
├── applications/             # Private output (git-ignored)
│   ├── YYYY-MM-DD-company-role/
│   │   ├── brief.md          # Posting, company research, requirement → evidence map
│   │   ├── email.md          # Tailored email (or cover-letter.md for forms)
│   │   ├── <id>.json         # Tailored resume config
│   │   └── resume-<id>.pdf   # Tailored resume
│   └── _archive/             # Old autopilot data and configs (reference only)
├── preferences.md            # Private preferences: family, relocation, destinations (git-ignored)
├── preferences.example.md    # Public template for preferences.md
├── skills/job-hunt/SKILL.md  # Workflow
└── AGENTS.md
```

## Usage

Ask the agent to "run job-hunt" or "find jobs". It will:

1. Search and read postings in full, checking that each is open, you're eligible from Cuba, and the stack and seniority fit
2. Show a shortlist and wait for you to pick
3. Prepare an application folder for each pick

Resumes are built with:

```bash
node resume-build/build-resume.cjs job-hunt/applications/<id>/<id>.json --out job-hunt/applications/<id>
```
