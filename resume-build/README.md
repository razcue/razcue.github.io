# Resume Build

Standalone feature for building tailored PDF resumes from job application configurations.

## Purpose

Generate ATS-optimized PDF resumes tailored to specific job applications. Each resume is customized based on a JSON config file containing target company, position, and personalized content.

## Structure

```
resume-build/
├── build-resume.cjs    # Resume generation script
├── configs/             # Job application config files
│   ├── default.json    # Default/template config
│   └── *.json         # Company-specific configs
└── skills/
    └── resume-build/   # Agent skill for resume building
        └── SKILL.md   # Skill documentation
```

## Usage

### Generate Resume from Config

```bash
node resume-build/build-resume.cjs <application-id>
```

Example:
```bash
node resume-build/build-resume.cjs 2026-04-18-nango-frontend-engineer
```

Output: `public/resume-<application-id>.pdf`

### Config File Format

Each config contains:
- `metadata`: Application ID, target position, keywords
- `contactInfo`: Name, email, phone, location, links
- `summary`: Professional summary
- `skills`: Technical and soft skills
- `languages`: Language proficiencies
- `education`: Educational background
- `experience`: Work experience items

## Agent Skill

The `resume-build` skill provides instructions for:
- Reading and validating config files
- Generating PDF resumes with proper formatting
- ATS optimization (fonts, layout, keywords)
- Company-specific tailoring

## Integration

This feature was extracted from the job-ai workflow to be used as a standalone tool for:
- Direct resume generation without running full job search
- Quick resume updates for new applications
- Reusable component across different agents