# B. C. Pushya — Portfolio

A single-page portfolio highlighting B. C. Pushya's software projects, internship experience, education, skills, and contact links.

## Run & Operate

- `pnpm --filter @workspace/pushya-portfolio run dev` — run the portfolio web app
- `pnpm --filter @workspace/pushya-portfolio run typecheck` — typecheck the portfolio
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- No database or API server is required by the portfolio.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Icons: Lucide React

## Where things live

- `artifacts/pushya-portfolio/src/App.tsx` — portfolio content and page structure
- `artifacts/pushya-portfolio/src/index.css` — visual theme and responsive styling
- `artifacts/pushya-portfolio/public/resume.pdf` — downloadable résumé
- `artifacts/pushya-portfolio/index.html` — page title and sharing metadata

## Architecture decisions

- The portfolio is a static single-page site; its content is based on the supplied résumé.
- Project cards link to the matching public GitHub repositories.
- Use original hand-painted fantasy artwork rather than existing studio art or characters.

## Product

Visitors can browse projects, work experience, education, skills, and NCC recognition; open project repositories and social profiles; contact Pushya; or download the résumé.

## User preferences

- The user wants a whimsical, Ghibli-inspired anime atmosphere for this portfolio.

## Gotchas

The résumé file available for download should stay in the portfolio's `public` directory.
