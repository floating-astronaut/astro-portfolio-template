# Codeberg / Forgejo Actions for `glitch-grow-site`

These workflows run on Codeberg's Forgejo Actions runners and replace
the Cloudflare Pages → GitHub source integration that broke when the
upstream GitHub account was suspended.

## What's here

| Workflow | Trigger | What it does |
|---|---|---|
| `deploy-cloudflare-pages.yml` | push to `main` (+ manual dispatch) | Builds the Astro site and deploys `./dist` to Cloudflare Pages via Wrangler Direct Upload. |

## One-time setup on Codeberg

In the repo's web UI:

**Repo → Settings → Actions → Secrets** (encrypted, never echoed in logs)
- `CLOUDFLARE_API_TOKEN` — create at <https://dash.cloudflare.com/profile/api-tokens> with two scopes:
  - Account → **Cloudflare Pages: Edit**
  - User    → **User Details: Read**

  Do **not** use the Cloudflare Global API Key.
- `CLOUDFLARE_ACCOUNT_ID` — copy from the right rail of any Cloudflare
  dashboard page.

**Repo → Settings → Actions → Variables** (plain-text, fine to log)

These are the `PUBLIC_*` env vars Astro inlines at build time. They
already ship to every browser via the deployed bundle, so they are
not secret — they just need to exist at build time so the inlined
literals are correct.

- `PUBLIC_GTM_CONTAINER_ID`     e.g. `GTM-TMXWNNLJ`
- `PUBLIC_GA_MEASUREMENT_ID`    e.g. `G-TK7ZYVLJRQ`
- `PUBLIC_META_PIXEL_ID`        e.g. `1273074111260527`
- `PUBLIC_TIKTOK_PIXEL_ID`      e.g. `D7SUUBRC77UEKU3Q0FSG`
- `PUBLIC_TURNSTILE_SITE_KEY`   the Turnstile public site key

## One-time setup on Cloudflare Pages

After the first successful Forgejo deploy lands a new revision in the
Pages project, disconnect the old GitHub source so Pages doesn't keep
retrying the suspended remote:

> Pages → `glitch-grow-site` → Settings → **Builds & deployments** →
> Source → **Disconnect**

The Pages project itself, custom domain, env vars, and routing all
stay intact — only the *source* of future revisions changes from
"git pull on commit" to "Wrangler Direct Upload from Forgejo Actions".

## Server-only env vars

Anything the Cloudflare Pages **Functions** read at runtime
(`STRIPE_SECRET_KEY`, `RAZORPAY_KEY_*`, `META_CAPI_TOKEN`,
`TIKTOK_CAPI_TOKEN`, `RESEND_API_KEY`, `FULFILL_SECRET`,
`CODEBERG_FULFILL_TOKEN`, `BUYER_LEDGER_URL`, etc.) live on the
**Cloudflare Pages dashboard**, not here. Wrangler Direct Upload
doesn't touch those — they're attached to the project, not the
deploy artefact, so they survive every revision change automatically.

## Troubleshooting

- **`Authentication error [code: 10000]`** in the deploy step
  → the `CLOUDFLARE_API_TOKEN` is missing one of the two scopes,
  or the token belongs to a different account than `CLOUDFLARE_ACCOUNT_ID`.

- **`Project not found`**
  → the `--project-name` doesn't match an existing Pages project.
  Confirm the slug at Pages → project → Settings → General.

- **Deploy succeeds but `_routes.json` / Functions don't appear to deploy**
  → Wrangler's Direct Upload of `./dist` includes the `functions/`
  output Astro generates next to it. If Functions don't fire, ensure
  the build emitted them (look for `dist/_worker.js` or
  `dist/functions/` in the workflow log).

## Self-host fallback

If Codeberg's shared runners get rate-limited or saturated, the
workflow runs unchanged on a self-hosted Forgejo runner — same
container image (`node:20-bookworm`), same secret schema. Spin one
up on this VPS with `docker run --rm -e FORGEJO_INSTANCE_URL=...
forgejo/runner:latest` (it picks up the YAML automatically once
registered with the repo).
