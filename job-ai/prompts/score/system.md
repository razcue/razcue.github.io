# Scoring System - Priority Score Calculation

## Overview

Every job opportunity is scored from 0-100 to determine the action plan and proposal priority.

## Score Thresholds

| Score Range | Priority | Action Plan                               |
| ----------- | -------- | ----------------------------------------- |
| 70-100      | HIGH     | Direct apply + outreach email + follow-up |
| 40-69       | MEDIUM   | Outreach email only (low effort)          |
| 0-39        | LOW      | Skip (not worth effort)                   |

## Scoring Criteria

### 1. Tech Stack Match (0-30 points)

The most important factor for the user:

| Match                            | Points | Notes                 |
| -------------------------------- | ------ | --------------------- |
| Vue.js/Nuxt.js                   | +30    | TOP PRIORITY for user |
| Full-stack (Vue/React + Laravel) | +25    | Strong match          |
| React.js/Next.js                 | +25    | Strong preference     |
| Full-stack (Vue/React + Node)    | +20    | Good match            |
| Laravel/PHP                      | +15    | Acceptable            |
| Other tech                       | +5     | Low priority          |
| No tech overlap                  | +0     | Skip                  |

### 2. Work Model (0-20 points)

| Model                                | Points | Notes                     |
| ------------------------------------ | ------ | ------------------------- |
| Visa sponsorship + family relocation | +20    | Good for relocation       |
| Remote (from Cuba/LATAM)             | +20    | Perfect for user location |
| Remote (global)                      | +15    | Works                     |
| Hybrid without visa                  | +0     | Skip                      |
| Onsite                               | +0     | Not suitable              |

### 3. Salary/Benefits (0-20 points)

| Salary Info                | Points | Notes       |
| -------------------------- | ------ | ----------- |
| Salary + benefits provided | +20    | Competitive |
| Salary range provided      | +15    | Transparent |
| Benefits mentioned         | +10    | Some value  |
| No info                    | +0     | Unknown     |

### 4. Company Quality (0-15 points)

| Stage               | Points | Notes               |
| ------------------- | ------ | ------------------- |
| Enterprise (500+)   | +15    | Stable, established |
| Series A/B (50-500) | +15    | Growing             |
| Startup (< 50)      | +10    | Early stage         |
| Unknown             | +5     | Can't verify        |

### 5. Response History (0-15 points)

Based on company history in data/companies.json:

| History                                 | Points | Notes                 |
| --------------------------------------- | ------ | --------------------- |
| Positive response before                | +15    | Boost priority        |
| Any response before                     | +10    | Company is responsive |
| No history                              | +0     | Unknown               |
| 3+ rejections/no-response last 6 months | -10    | Low response rate     |

## Calculation Process

1. Start with 0 points
2. Add points for each category
3. Check for bonuses/penalties
4. Final score determines proposal type

## Example Calculations

### Example 1: High Score (Vue.js remote)

- Tech: Vue.js match (+30)
- Model: Remote from LATAM (+20)
- Salary: $60-80K range (+15)
- Company: Series B (+12)
- History: No previous contact (+0)
- **Total: 77/100** → HIGH PRIORITY

### Example 2: Medium Score (React remote)

- Tech: React match (+25)
- Model: Remote global (+15)
- Salary: Not provided (+0)
- Company: Startup (+10)
- History: No response before (+0)
- **Total: 50/100** → MEDIUM PRIORITY (outreach only)

### Example 3: Low Score (PHP onsite)

- Tech: PHP match (+15)
- Model: Onsite (+0)
- Salary: Not provided (+0)
- Company: Unknown (+5)
- History: 3+ rejections before (-10)
- **Total: 10/100** → SKIP

## Priority Actions

1. Score >= 70 AND has job posting → **direct.md** (full plan: direct apply + outreach + followup)
2. Score >= 70 AND no job posting → **outreach.md** (outreach + followup)
3. Score 40-69 → **outreach.md** (outreach only, low effort)
4. Score < 40 → Skip (not worth the effort)

## Important Notes

1. **Vue.js is TOP PRIORITY** - User specifically wants Vue.js/Nuxt.js frontend roles
2. **Remote or visa (plus family relocation) is essential** - User is in Cuba, cannot relocate easily
3. **Response history matters** - Prioritize companies that have responded before
4. **Salary transparency** - Shows company values candidates
5. **Always verify** - Check that URLs are active and positions are open
