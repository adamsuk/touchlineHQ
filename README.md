# touchlineHQ - East Leake

> Custom grassroots football websites with fast setup, club tools, and modern React styling.

## About

`touchlineHQ` is a lightweight website project built with React, Vite, and TypeScript. It focuses on marketing a polished club website experience for grassroots football teams, featuring fixtures, club data, contact options, and clear presentation.

It also includes a **Treasurer's Tool** backed by GoCardless for automated Direct Debit subscription setup with player-specific payment references.

## Quick start

From the repo root:

```bash
npm install        # installs wrangler and workers-types
cd website && npm install
npm run dev        # starts Vite dev server
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
cd website && npm run build
```

This runs TypeScript compilation and builds the production site into `website/dist`.

For a full local preview (including API functions):

```bash
npm run preview    # runs wrangler pages dev website/dist on port 8788
```

> **Codespaces note:** `localhost:8788` is not exposed by default. Forward port 8788 via the Codespaces "Ports" panel and use the generated `*.app.github.dev` URL.

## Project structure

```
functions/
  api/gocardless/
    _types.ts         # shared GoCardless + Env TypeScript interfaces
    create-link.ts    # POST  /api/gocardless/create-link
    confirm.ts        # GET   /api/gocardless/confirm  (GoCardless redirect target)
website/
  src/
    components/
      TreasurerTool.tsx   # UI for generating player payment links
    pages/
      PaymentSuccessPage.tsx
      PaymentCancelledPage.tsx
  public/             # static assets and JSON club data
  package.json
wrangler.toml         # Cloudflare Pages config (build command + output dir)
.github/workflows/    # CI and deployment workflows
```

## GoCardless payment automation

The Treasurer's Tool lets club treasurers generate a one-time GoCardless payment link for a player. The customer completes a hosted Direct Debit signup flow; the server then creates a recurring subscription automatically.

### Flow

1. Treasurer fills in: team, FAN number, payment type, amount, and interval.
2. `POST /api/gocardless/create-link` creates a GoCardless **Billing Request** (mandate only) and a **Billing Request Flow**, returning an `authorisation_url`.
3. Treasurer sends the link to the player/parent.
4. Customer completes the GoCardless hosted page (bank details, confirmation).
5. GoCardless redirects to `GET /api/gocardless/confirm` with `billing_request_id` and subscription params.
6. `confirm.ts` fulfils the billing request (if not already fulfilled), reads the mandate ID, checks for an existing subscription (idempotency), and creates a new GoCardless **Subscription** against the mandate.
7. Customer lands on `/payment-success` showing their reference, amount, and IDs.

### Payment reference format

References are formatted as `TEAM-FAN-TYPE`, e.g. `U8BLACKS-242424-SUBS`. This reference is stored in the subscription's `metadata.reference` and used to match existing subscriptions on link reuse.

### Idempotency

If the same payment link is opened again (link reuse, browser back/forward, refresh), `confirm.ts` queries existing subscriptions for the mandate. If one with a matching `metadata.reference` and a non-cancelled status is found, it is returned instead of creating a duplicate. The success page shows "This subscription is already active" in that case.

### Environment variables

Set these in the Cloudflare Pages dashboard (Settings → Environment variables):

| Variable | Description |
|---|---|
| `GC_ACCESS_TOKEN` | GoCardless API access token |
| `GC_ENVIRONMENT` | `sandbox` or `live` |

### Local development with GoCardless

For local testing, set a `.dev.vars` file at the repo root (gitignored by Cloudflare tooling):

```
GC_ACCESS_TOKEN=your_sandbox_token
GC_ENVIRONMENT=sandbox
```

Then run `npm run preview`. Use GoCardless sandbox bank details (sort code `20-00-00`, account `55779911`) to complete a test payment.

## Deployment

Cloudflare Pages automatically builds and deploys on push to `main`. The build command is `cd website && npm ci && npm run build`; output is `website/dist`. API functions in `functions/` are deployed as Cloudflare Pages Functions alongside the static site.

GoCardless secrets should be set in the Cloudflare Pages dashboard, not in code or CI.

## Tech stack

- React 19 + Vite
- TypeScript
- Mantine (UI components)
- Cloudflare Pages + Pages Functions (serverless API)
- GoCardless Billing Request Flow (Direct Debit)
