# ANNA ÉDITION

## Font licensing

The website uses free Google Fonts: Prata for display headings, Manrope for body/UI copy and Pinyon Script for the navbar signature.

Premium Next.js website for the ANNA ÉDITION interior design studio.

## Local development

1. Copy `.env.example` to `.env.local` and fill the integrations you want to test.
2. Install dependencies with `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

Without environment variables, public content uses the local portfolio fallback and inquiry submission returns a safe demo success in development. File upload is enabled only when `BLOB_READ_WRITE_TOKEN` exists.

## CMS

Sanity Studio is embedded at `/studio`. Sign in with the Sanity account that has access to project `7ax7gaw6`, edit content and images, then press **Publish**. Public pages refresh CMS content at most 60 seconds after publishing and retain local fallback content while a CMS document is empty.

## Production integrations

- Sanity: set `NEXT_PUBLIC_SANITY_PROJECT_ID=7ax7gaw6`, `NEXT_PUBLIC_SANITY_DATASET=production`, and optionally `SANITY_API_READ_TOKEN` if the dataset becomes private.
- Resend: verify `annaedition.de`, set `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL`.
- Vercel Blob: connect a Blob store to provide `BLOB_READ_WRITE_TOKEN`.
- Cloudflare Turnstile: set both public site key and server secret.
- Vercel: set `NEXT_PUBLIC_SITE_URL` to the canonical production URL and create `CRON_SECRET` for the cleanup route.

## Deploy to Vercel

1. Import the GitHub repository into Vercel. The repository root is the Next.js project root; no custom root directory is required.
2. Keep the detected framework preset as **Next.js** and the default commands (`npm install`, `npm run build`).
3. Add all variables from `.env.example` under **Project Settings → Environment Variables**. Never commit their values.
4. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` production domain.
5. Add the Vercel production and preview origins in **Sanity Manage → API → CORS origins** so the embedded `/studio` can authenticate.
6. Deploy. Pushes to `main` create production deployments; other branches create previews when Git integration is enabled.

The daily `/api/cleanup` cron is configured in `vercel.json` and removes inquiry uploads older than 30 days.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Before launch, replace the marked legal placeholders and provide Anna's final portrait.
