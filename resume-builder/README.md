# Resume Builder

ATS-friendly resume system with Harvard template, build history tracking, and easy customization.

## Quick Start

```bash
# Install dependencies (if not already installed)
npm install handlebars puppeteer

# Build default resume
npm run build:resume default

# Build tailored resume
npm run build:resume tailored-react-engineer

# Or use node directly
node resume-builder/build-resume.cjs default
```

## Structure

```
resume-builder/
├── build-resume.cjs         # Main build script
├── build-history.json       # Build history tracking
├── configs/
│   ├── default.json         # Default resume config
│   └── *.json               # Custom configs for different roles
└── templates/
    └── harvard-template.html # Harvard-style resume template
```

## Creating a New Resume Variant

1. **Copy base config:**

   ```bash
   cp resume-builder/configs/default.json resume-builder/configs/my-role.json
   ```

2. **Edit the config:**
   - Update `metadata.targetPosition`
   - Adjust `metadata.keywords` for the role
   - Set `experience[].selected` to true/false to include/exclude entries
   - Rewrite bullets to emphasize relevant skills
   - Update `contactInfo` if needed

3. **Build:**
   ```bash
   npm run build:resume my-role
   # Or: node resume-builder/build-resume.cjs my-role
   ```

## Config Schema

```json
{
  "metadata": {
    "name": "Your Name",
    "title": "Your Title",
    "language": "en",
    "targetPosition": "Role you're applying for",
    "keywords": {
      "technical": ["React", "TypeScript", ...],
      "soft": ["Communication", "Leadership", ...]
    },
    "dateBuilt": "YYYY-MM-DD",
    "variant": "default|tailored-X"
  },
  "contactInfo": {
    "address": "Location",
    "email": "email@example.com",
    "phone": "+1 (555) 000-0000",
    "website": "yoursite.com",
    "github": "github.com/username"
  },
  "education": [...],
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "location": "City, Country",
      "dateRange": "MMM YYYY – MMM YYYY",
      "bullets": [
        "Action verb + quantifiable achievement",
        "Led X which resulted in Y% improvement"
      ],
      "selected": true  // Include in resume
    }
  ],
  "skills": [...],
  "leadership": [...]  // Optional
}
```

## Writing Effective Bullets

### Formula: Action Verb + Task + Quantifiable Result

**Good examples:**

- ❌ "Worked on front end features"
- ✅ "Delivered 15+ React components reducing development time by 30%"

- ❌ "Improved performance"
- ✅ "Optimized bundle size from 2.1MB to 850KB, improving LCP by 60%"

- ❌ "Led team meetings"
- ✅ "Facilitated weekly code reviews for 5-person team, reducing bug rate from 12% to 4%"

### Strong Action Verbs

- **Building:** Architected, Developed, Implemented, Built, Engineered, Created
- **Improving:** Optimized, Enhanced, Reduced, Increased, Improved, Accelerated
- **Leading:** Led, Directed, Mentored, Coordinated, Facilitated, Managed
- **Delivering:** Shipped, Launched, Delivered, Released, Deployed

### Quantification Ideas

- Percentages: "by 40%", "from X to Y"
- Time: "from 3 hours to 30 minutes"
- Scale: "serving 200+ users", "processing 10,000+ requests/day"
- Team impact: "for 5-person team", "across 3 departments"
- Business metrics: "improving conversion by 18%", "reducing costs by $X"

## Build History

The system tracks every build in `build-history.json`:

```json
[
  {
    "timestamp": "2025-11-27T10:30:00.000Z",
    "configName": "tailored-react-engineer",
    "language": "en",
    "targetPosition": "Front-End Engineer (React)",
    "keywords": {...},
    "selectedExperiences": ["Company A", "Company B"],
    "outputFile": "resume.pdf",
    "variant": "tailored"
  }
]
```

Use this to:

- Track which config was used for each application
- Rebuild exact same resume later
- Compare keyword sets across variants
- See which experiences you included

## Tips for ATS

1. **Use standard headings:** Education, Experience, Skills
2. **Include keywords** from job description in bullets
3. **Avoid:**
   - Tables or multi-column layouts
   - Headers/footers with important info
   - Images or graphics
   - Unusual fonts
4. **Keep formatting simple:** The Harvard template is already optimized
5. **Use exact job titles** and technology names from the posting

## Outputs

After running the build:

- `public/resume.html` - HTML version (for debugging)
- **Default resume:** `public/Rayko_Azcue_Resume.pdf` - Your main resume (ATS-friendly)
- **Position-specific resume:** `public/resume.pdf` - Temporary resume for specific applications

The default resume is automatically available at `/Rayko_Azcue_Resume.pdf` on your deployed site.

When building for a specific position using a position JSON file, a temporary `resume.pdf` is created instead.
