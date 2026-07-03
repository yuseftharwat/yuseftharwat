# Yusef Tharwat — Portfolio (Next.js Scaffold)

This is a working scaffold of the premium 3D visualization / motion design
portfolio described in the project blueprint. It runs end-to-end on mock
data today, and is structured so each production integration (Sanity, Mux,
real fonts, real email) can be dropped in without touching component code.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — design tokens (color, type scale, spacing) match the
  blueprint's design system, defined in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, hero entrance, filter transitions
- **React Hook Form + Zod** — contact form validation
- Mock CMS layer standing in for **Sanity**, and a native `<video>` player
  standing in for a **Mux/Cloudflare R2** streaming integration

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## What's real vs. mocked

| Area | Status |
|---|---|
| Layout, sections, responsive breakpoints, animations | Fully built |
| Project data model, filtering, dynamic `/work/[slug]` routes | Fully built |
| SEO (metadata, sitemap, robots, structured data) | Fully built |
| **Sanity CMS** | **Live integration.** `src/lib/data.ts` queries Sanity for real once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set (see `.env.example`); until then, or if a query fails, it transparently falls back to `src/lib/mock-data.ts`. No component code changes either way. |
| **Video hosting (Mux)** | **Live integration.** Pass a project's `muxPlaybackId` and `VideoPlayer` builds the HLS manifest and streams it via `hls.js` (Safari plays it natively). No ID → falls back to a plain MP4 `src`. |
| **Contact form delivery (Resend)** | **Live integration.** Sends real email once `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` are set; otherwise logs the submission server-side so nothing is lost during development. |
| Heading font (General Sans/Satoshi/Neue Montreal) | Loaded from Fontshare's free CDN in `src/app/layout.tsx`. This is the one piece I genuinely can't finish for you: self-hosting needs the actual licensed font files, which I have no way to obtain in this environment. Drop `.woff2` files into `public/fonts/` and switch to `next/font/local` when you have them — a few lines in `layout.tsx`. |
| Media assets | Images are still Unsplash placeholders and `heroVideo`/`muxPlaybackId` are empty. These need your actual renders/footage — I can't generate or license stand-in creative work for a real studio's portfolio. |

## Going live checklist

1. **Sanity**: create a project, add a `project` document schema matching `src/lib/types.ts` (see field-by-field comments in `src/lib/sanity.ts`), set the three `NEXT_PUBLIC_SANITY_*` / `SANITY_API_TOKEN` env vars.
2. **Mux**: create a Mux account, install `sanity-plugin-mux-input` in your Sanity Studio so editors can upload video directly; the resulting playback ID flows straight into `muxPlaybackId`.
3. **Resend**: create an account, verify a sending domain, set `RESEND_API_KEY` / `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL`.
4. **Font**: license or download General Sans/Satoshi/Neue Montreal, drop the files in `public/fonts/`, swap the Fontshare `<link>` for `next/font/local`.
5. Replace every Unsplash placeholder and empty video field with real project media.

## Project structure

```
src/
  app/
    layout.tsx          Root layout, fonts, global metadata
    page.tsx             Homepage — composes every section
    sitemap.ts / robots.ts
    api/contact/route.ts Contact form submission endpoint
    work/[slug]/page.tsx Dynamic project case-study page
  components/
    nav.tsx, hero.tsx, selected-work.tsx, project-card.tsx,
    services.tsx, process.tsx, about.tsx, testimonials.tsx,
    contact.tsx, contact-form.tsx, footer.tsx, video-player.tsx
    ui/                  Button, SectionHeading primitives
    animations/reveal.tsx
  lib/
    types.ts             Project/Testimonial/Service data models
    data.ts               Live data layer — Sanity when configured, else mock
    mock-data.ts           Fallback content used until/unless Sanity is live
    sanity.ts             Real Sanity client, GROQ queries, mappers
    utils.ts
.env.example             Every env var needed to flip on live integrations
```

## Design system reference

Colors, type scale, and spacing all live in `tailwind.config.ts` and map
directly onto the blueprint's spec (background `#F8F7F4`, accent `#315EFB`
used sparingly, 1400px site max-width, 1200px content max-width, etc.).

## What I genuinely can't finish here

I don't have network access in this environment and can't create third-party
accounts on your behalf, so a few things stay as your action items rather
than code changes:

- Actually creating the Sanity, Mux, and Resend accounts and pasting their
  keys into `.env.local`
- Real project renders, photography, and video footage
- Licensed heading-font files, if Fontshare's CDN isn't acceptable for
  production use
- A final Lighthouse/cross-browser pass once real media replaces the
  Unsplash placeholders and empty video fields — those will skew current
  scores
