<h1 align="center">Astro Portfolio Template</h1>

<p align="center">
  <b>A production-grade, fork-ready personal-site / portfolio starter built with Astro.</b><br/>
  Floating-pill nav · motion system · SEO schema · analytics-as-env · OG cards · contact form. MIT.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-black.svg" alt="MIT License"></a>
  <a href="https://github.com/floating-astronaut/astro-portfolio-template"><img src="https://img.shields.io/badge/github-floating--astronaut-181717.svg?logo=github&logoColor=white" alt="GitHub"></a>
  <img src="https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
</p>

> Maintained by [Tejas Karan Agrawal](https://github.com/floating-astronaut). Two sites in production run on this exact stack:
> **[tejaskaranagrawal.com](https://tejaskaranagrawal.com)** and **[nuraveda.com](https://nuraveda.com)**.
> Fork it, edit one config file, replace the copy, ship.

---

## Why this exists

Most portfolio starters are either a bare Astro `create` skeleton or a heavy
theme you have to fight. This sits in between: the boring-but-essential
production layer is already wired — nav, motion, SEO/schema, analytics,
OG metadata, a contact form — and the content is clean placeholder text you
swap out. No brand lock-in, no business logic, no telemetry phoning home.

## What's included

- **Astro static output** — zero JS by default; ships as a plain static dir, deploy anywhere (Cloudflare Pages, Netlify, Vercel, nginx, GitHub Pages).
- **Floating-pill nav** — sticky, rounded, blurred, with an accessible mobile drawer (hamburger → full-screen, Escape to close, focus-safe).
- **Motion-ready, content-first** — `.reveal` elements are visible by default and only animate when JS is present, so slow networks / blocked scripts never leave blank sections.
- **Mobile performance guards** — section-level `overflow-x: clip`, capped blur radii on touch devices, image overflow guards. (These were battle-tested fixes for a real >30s iOS Safari freeze.)
- **SEO + structured data** — `JsonLd` Person/WebPage schema in the base layout, plus a `components/schema/` set (Breadcrumb, FAQ, HowTo, Product, SoftwareApplication, WebApplication, Claim).
- **Analytics as env** — GTM, GA4, Meta Pixel, TikTok Pixel, Plausible, Umami. Each reads its own `PUBLIC_*` var and is **off unless set**. No IDs are baked in.
- **OG image + meta** — Open Graph / Twitter cards wired through the base layout; static OG image you can replace.
- **Contact form** — progressive-enhancement form component (wire it to your endpoint / Cloudflare Pages Function / Formspree, etc.).
- **Design tokens** — colors, radii, motion, fluid type scale in `src/styles/tokens.css`. Re-theme by editing the CSS custom properties.

## Quick start

**Requirements:** Node 18+, pnpm (or npm/yarn).

```bash
git clone https://github.com/floating-astronaut/astro-portfolio-template.git
cd astro-portfolio-template
pnpm install
cp .env.example .env      # optional — site builds with everything blank
pnpm dev                  # http://localhost:4321
```

## Make it yours (in order)

1. **`src/lib/site.ts`** — your name, tagline, description, domain, contact email, nav items, social links. This is the single source of truth; most of the page flows from here.
2. **`src/pages/index.astro`** — the portfolio content (hero, stats, experience, skills, selected work, contact). All placeholder — replace the arrays + copy.
3. **`src/styles/tokens.css`** — brand color is `--color-brand`; swap it (and `--color-electric` for the accent) to re-theme everything.
4. **`public/assets/brand/`** — replace the favicon set, `mark-128.png` (the nav/footer logo), and `og-image.png` with your own.
5. **`.env`** — set the analytics IDs you actually use (all optional).
6. **`src/components/ContactForm.astro`** — point the form at your submission endpoint.

Search the repo for `Your Name` and `example.com` to find every remaining string to replace.

## Layout

```
src/
  pages/
    index.astro          Single-page portfolio (placeholder content)
  layouts/
    Base.astro           HTML shell: meta, OG, JSON-LD, Nav, Footer, Analytics
  components/
    Nav.astro            Floating-pill nav + mobile drawer
    Footer.astro         Footer with nav + social + contact
    Analytics.astro      Env-gated GTM / GA4 / Meta / TikTok / Plausible / Umami
    JsonLd.astro         Structured-data emitter
    SocialIcons.astro    Renders socialLinks from site.ts
    ContactForm.astro    Progressive-enhancement contact form
    StackLogoMarquee.astro, Mascot, Icon, InlineCta, StatCallout, ImageSlot, AnnouncementBar
    schema/              BreadcrumbSchema, FAQSchema, HowToSchema, ProductSchema, ...
  content/
    config.ts            Blog collection schema (example post included)
    blog/hello-world.mdx Example post — wire a /blog route to render it
  lib/site.ts            ← edit this first
  styles/                tokens.css (design tokens) + global.css (base + utilities)
public/
  assets/brand/          favicons, logo mark, OG image  ← replace with yours
```

## Content collections

`src/content/config.ts` defines a `blog` collection with a typed schema and
ships one example post. To render posts, add routes:

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
const posts = (await getCollection('blog')).filter(p => !p.data.draft);
---
{posts.map(p => <a href={`/blog/${p.slug}`}>{p.data.title}</a>)}
```

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  return (await getCollection('blog')).map(p => ({ params: { slug: p.slug }, props: { p } }));
}
const { p } = Astro.props;
const { Content } = await p.render();
---
<article><Content /></article>
```

## Deploy

`pnpm build` emits a static `dist/`. Point any host at it.

**Cloudflare Pages:** build command `pnpm build`, output dir `dist`, set your
`PUBLIC_*` env vars in the project settings. Both reference sites
(tejaskaranagrawal.com, nuraveda.com) are hosted exactly this way.

## License

[MIT](LICENSE) — fork it, ship it, sell it. Attribution appreciated, not required.

---

<p align="center"><sub>Maintained by <a href="https://github.com/floating-astronaut">Tejas Karan Agrawal</a>. Built with Astro.</sub></p>
