# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two unrelated things live side by side:

1. **The website** (root `src/`, `server.ts`, config) — a full-stack marketing / lead-gen SPA for **UVR Green Energies**, a rooftop-solar EPC company in India (UVR TECHSOL Pvt. Ltd., based in Vadodara, Gujarat). This is the actual code.
2. **Business collateral** (`UVR_ONE_*.md`, `docs/`, `resources/`) — pricing proposals, market-research notes, and solar-equipment datasheets for a *separate* consulting engagement ("UVR ONE", a Solar ERP platform quoted to a client named Rahul). These are reference documents, **not** part of the website build. Don't wire them into the app.

The project was scaffolded in Google AI Studio (see `metadata.json`, the `aistudio-build` User-Agent in `server.ts`, and the `DISABLE_HMR` handling in `vite.config.ts`). The `package.json` `name` is still the boilerplate `react-example`.

## Commands

```bash
npm run dev      # tsx server.ts — Express + Vite middleware, http://localhost:3000
npm run build    # vite build, then esbuild-bundle server.ts -> dist/server.cjs
npm run start    # node dist/server.cjs (NODE_ENV=production for static serving)
npm run lint     # tsc --noEmit (type-check only; the only "test" this repo has)
npm run clean    # rm -rf dist
```

There is **no test suite and no test runner.** `npm run lint` (type-check) is the verification gate. Note `package.json` scripts use `rm -rf`; on Windows run them via the Bash tool, not PowerShell.

## Architecture

**Single Express server, two modes** (`server.ts`): in dev it mounts Vite in middleware mode (SPA); in prod (`NODE_ENV=production`) it serves the built `dist/` and falls back all routes to `index.html`. Both modes expose the same API.

**AI chatbot endpoint** — `POST /api/chat` is the only real backend logic. It takes `{ history: [{role, content}] }`, maps it to `@google/genai` `contents`, and calls Gemini with a large hard-coded `SYSTEM_INSTRUCTION` ("UVR Solar Advisor AI") defined at the top of `server.ts`. That system prompt encodes the company's domain facts — panel/inverter/battery specs, PM Surya Ghar subsidy tiers, net-metering rules, and sizing rules of thumb. **If subsidy amounts, product specs, or sizing math change, they must be updated in three places to stay consistent:** the `server.ts` system prompt, the FAQ/testimonial constants in `src/App.tsx`, and the calculator constants in `src/components/QuoteCalculator.tsx`. Requires `GEMINI_API_KEY` in `.env` (dotenv); without it the endpoint returns a friendly offline message rather than erroring. Also `GET /api/health`.

**Frontend** — React 19 + Tailwind CSS v4 (via `@tailwindcss/vite`), `motion` (Framer Motion) for animation, `lucide-react` for icons. `src/main.tsx` mounts `src/App.tsx`.

**`src/App.tsx` is the whole app shell** (~1200 lines): hash-based routing (reads/writes `window.location.hash`, allow-list of routes in the `currentPage` initializer), dark/light theme toggle persisted to `localStorage`, and the marketing content constants (`TESTIMONIALS`, `FAQS`). It composes the section components in `src/components/` — each is one page/section (`SolarSimulator`, `QuoteCalculator`, `EducationalHub`, `CommercialSegment`, `GalleryShowcase`, `ContactPortal`, `WebGLSolarVisualizer`, `ServicesPortal`, `AboutUs`, `Logo`).

**Domain types** live in `src/types.ts` (`QuoteInput`, `QuoteResult`, `SimulationState`, `Message`) — the shared contract between the calculator, simulator, and chat UI.

**Import alias:** `@/` → repo root (configured in both `vite.config.ts` and `tsconfig.json`).

## Content-accuracy caveat

Several facts on the site (addresses, phone numbers, stats, testimonials) are placeholders or inconsistent — see `docs/FOUNDER_DATA_CHECKLIST.md`, which tracks what still needs founder sign-off. Treat customer-facing numbers as unverified unless that checklist says otherwise. `resources/product_master.csv` is the closest thing to a verified equipment list, and even it flags many rows as `FILENAME ONLY` / `OCR pending` / `UNVERIFIED brand` — check the `Verification` column before quoting a spec.
