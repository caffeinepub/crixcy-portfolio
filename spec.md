# Crixcy Portfolio

## Current State
Basic scaffolded project with empty backend actor and default App.tsx. No portfolio content exists yet. 8 server logo images have been processed (background removed) and are ready at `/assets/generated/logo-*.png`.

## Requested Changes (Diff)

### Add
- Full single-page portfolio site with 6 sections: Hero, About, Current Work, Past Experience, Skills, Contact
- Animated canvas particle background effect
- Smooth scroll between sections
- Dark glassmorphism design matching reference screenshots
- Server logos displayed on experience/current work cards

### Modify
- App.tsx: Replace default content with full portfolio
- index.css: Dark theme, OKLCH cyan/sky-blue tokens, animations

### Remove
- Nothing from backend (stays minimal/empty)

## Implementation Plan

1. **index.css**: Dark navy/black base, OKLCH cyan accent tokens, glassmorphism utilities, animation keyframes (fadeIn, slideUp, pulse glow)
2. **App.tsx**: Full portfolio layout with 6 sections and canvas particle background

### Section Details

**Hero**
- Large title "Crixcy Portfolio" (white + cyan split)
- "AVAILABLE FOR HIRE" badge
- Subtitle: "Minecraft Staff | Moderator | Staff Manager"
- Tagline: "Helping Minecraft servers grow with strong moderation and management."
- Two buttons: "Contact Me" (cyan filled) + "View Experience" (glass outline)

**About Me**
- Glassmorphism card
- Two info boxes: Availability (3-5h in-game / 10+ Discord) + Location (India GMT+5:30)
- Two paragraph bio

**Current Work** (glow highlighted)
- Two large cards: CavernSMP (Admin, ACTIVE badge) + FastClient (Staff Member, ACTIVE badge)
- Logos: /assets/generated/logo-cavernsmp-transparent.png, /assets/generated/logo-fastclient-transparent.png
- Stats shown on cards

**Past Experience**
- 6 cards in 3-column grid (2 rows)
- Each card: role, server name (cyan), member count, avg players, status badge (CLOSED/PAST/ENDED)
- Logos for each server on the card
- Server logo mapping:
  - DeathMC: /assets/generated/logo-deathmc-transparent.png
  - KyroMC: /assets/generated/logo-kyromc-transparent.png
  - UniversalMC: /assets/generated/logo-universalmc-transparent.png
  - PlumSMP: /assets/generated/logo-plumsmp-transparent.png
  - BlockFun: /assets/generated/logo-blockfun-transparent.png
  - CrystalChaos: /assets/generated/logo-crystalchaos-transparent.png
- Note text at bottom

**Skills**
- 5 skills in grid (3 top row, 2 bottom row centered)
- Each: icon + name + cyan underline
- Staff Management, Moderation & Conflict Handling, Team Mentoring, Event & Tournament Hosting, Basic Media Management

**Contact**
- Glassmorphism card
- Gmail card: Gmail logo, email address (mailto link)
- Discord card: Discord logo, username "tisu78" (discord profile link)
- Footer: copyright + Professional/Reliable/Experienced badges
