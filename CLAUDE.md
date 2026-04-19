# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PM/PO assessment case study directory for a product called **Learnly** — a personalized learning platform. There is no source code; the directory contains deliverables:

- `Learnly — PM_PO Assessment Case Study - Complete.pptx` — main presentation deck
- `Learnly_Accompanying_Document_Complete.docx` — written accompanying document
- `screen-1-personalised-learning-feed.jpg` — app screen mockup: personalized learning feed
- `screen-2-my-skill-profile.jpg` — app screen mockup: skill profile view
- `screen-3-hr-skill-dashboard.jpg` — app screen mockup: HR skill dashboard

## Learnly React App (`learnly-app/`)

A Vite + React prototype of the Learnly platform, deployable to Vercel as flat files (no backend/database).

**Run locally:** `cd learnly-app && npm install && npm run dev`
**Build for Vercel:** `npm run build` → outputs to `dist/`
**Deploy:** push `learnly-app/` to a GitHub repo, import in Vercel — routing is handled by `vercel.json`

**Demo logins** (password: `demo`):
- `alex@learnly.com` — Product Manager (employee view)
- `sarah@learnly.com` — UX Designer (employee view)
- `hr@learnly.com` — L&D Manager (HR Dashboard unlocked)

**Screens:** Login · Dashboard · My Learning · Skill Profile · Course Detail · Teams · Leaderboard · HR Dashboard (HR role only)

**Data files** (flat JS in `src/data/`): `users.js`, `courses.js`, `skills.js`, `hrData.js` — edit these to change mock content.

**Key dependencies:** `react-router-dom` (routing), `recharts` (Radar + Bar charts), `tailwindcss` (dark-theme design system).

---

## Working with These Files

- `.pptx` and `.docx` files cannot be read directly with text tools — use Office applications or convert to text/PDF first.
- The `.jpg` images can be read visually via the Read tool.
- No build, lint, or test commands apply — this is a documentation-only directory.
