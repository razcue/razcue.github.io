# LinkedIn Banner - Clean Navy

Professional LinkedIn banner optimized for your profile.

## Specifications

- **Dimensions:** 1584 x 396 px (LinkedIn recommended)
- **Format:** PNG (125KB)
- **Safe Zone:** Left 40% is covered by profile photo (especially on mobile)

## Design

**File:** `banner-clean-navy.html` / `banner.png`

- **Background:** Solid #0f172a (navy)
- **Accent:** #2dd4bf (teal)
- **Footer:** #057a55 (LinkedIn "Open to Work" green)
- **Style:** Clean with scattered tech icons and enhanced KPIs

## Content Features

### Header

- **Title:** "FRONTEND DEVELOPER / FULLSTACK DEVELOPER"
- **Motto:** "Shipping solutions that scale"

### KPIs (Enhanced with Subtitles)

- **6+ YEARS** - "From idea to production"
- **1,400+ COMMITS** - "Only in last year"
- **SUCCESS ACROSS** - "Spain • US • Latin America"
- **7+ SECTORS** - "E-commerce • Logistics • EMS • more"

### Tech Stack (Scattered Icons)

Priority order (top to bottom, larger to smaller):

1. Vue.js ⚡
2. React ⚛️
3. TypeScript 📘
4. PHP 🐘
5. Node.js 🟢
6. Tailwind 🎨
7. Laravel 🔴
8. Angular 🅰️
9. Astro 🚀

### Footer

🌍 OPEN TO REMOTE WORK (EST ±6) • RELOCATION WITH FAMILY (3 MEMBERS) • AVAILABLE IMMEDIATELY

## Quick Export

Generate the PNG from HTML:

```bash
node generate-banners.cjs
```

The PNG will be saved in `exports/banner-5-clean-navy.png`

## Upload to LinkedIn

1. Go to your LinkedIn profile
2. Click the camera icon on banner area
3. Upload `exports/banner-5-clean-navy.png`
4. Adjust positioning if needed
5. Save

## Design Notes

- **No padding/whitespace** - Banner fills entire 1584x396px area
- **Full-width footer** - Text aligned right for visibility
- **Wider content area** - Starts at 420px from left to avoid profile photo overlap
- **Larger KPI labels** - 12px font size for better readability
- **LinkedIn green footer** - Uses #057a55 to match "Open to Work" frame color

---

**File Location:** `public/linkedin-banners/exports/banner-5-clean-navy.png`
