# A&A Flooring — aa-flooring.ca

Modern, SEO-optimized rebuild of A&A Flooring Accessories' website. Lower Mainland flooring contractor based in Coquitlam, BC.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Sanity v3 (CMS hosted on sanity.io/manage, not embedded)
- Resend for transactional email
- Vercel deployment + Vercel Analytics

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Visit http://localhost:3000.

## Project layout

```
src/app/                 routes (App Router)
src/components/          UI components
src/lib/                 site config, sanity client, SEO helpers
sanity/schemas/          content models for the Studio
public/                  static assets
docs/                    deliverables for the owner (GBP, cutover)
```

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint

## Strategy docs

- [`docs/business-plan.md`](docs/business-plan.md) — 12-month Greater Vancouver growth plan: market analysis, top-10 competitor profiles, channel-by-channel marketing strategy with budgets, monthly roadmap, and KPIs.
- [`docs/gbp-and-cutover.md`](docs/gbp-and-cutover.md) — Google Business Profile audit, NAP consistency sweep, and DNS cutover checklist.
- [`docs/google-reviews-setup.md`](docs/google-reviews-setup.md) — one-time setup to make the homepage pull live Google reviews via the Places API.

## Deployment

Pushed to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds a static export with `NEXT_OUTPUT_MODE=export` and publishes the `out/` directory to GitHub Pages.

Live URL: **https://dimoobraznii1986.github.io/aa-flooring/**

The static-export build:
- Disables Next's image optimizer (`images.unoptimized: true`); originals are served from `/images/`
- Sets `basePath` to `/aa-flooring` via `NEXT_PUBLIC_BASE_PATH`
- Generates 37 static HTML routes (home, services hub + 4 details, service-areas hub + 4 cities, 16 service-city matrix pages, portfolio, reviews, about, contact, robots.txt, sitemap.xml, icon.svg)
- Replaces the API-backed quote form with a `mailto:` fallback that opens the visitor's mail client with all fields prefilled

To run a local export: `NEXT_OUTPUT_MODE=export NEXT_PUBLIC_BASE_PATH= npm run build`. Output lands in `out/`.
