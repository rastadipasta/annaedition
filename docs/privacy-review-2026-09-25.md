# Privacy review — 25 September 2026

## Implemented in this checkout

- Consent version 2 covers the theme and optional intro preference. Existing consent must be renewed because its purposes changed.
- Consent and theme use first-party cookies with a maximum 180-day lifetime. Theme changes cannot extend the original consent expiry. Legacy theme localStorage is removed.
- The intro sessionStorage entry is read/written only with current optional consent. Withdrawal clears both optional preferences. The intro can still run without storing a preference.
- Accept and necessary-only actions have equal visual treatment. Closing the banner means necessary-only. Changing preferences preserves other query parameters and the page fragment.
- The inquiry form provides a direct privacy notice instead of requesting consent for processing a project inquiry under Article 6(1)(b)/(f).
- Upload URLs omit the original filename. The upload field discloses link-based public access before submission.
- The cleanup route rejects requests when CRON_SECRET is absent or incorrect, reports missing storage as an error, and deletes files at least 30 days old. The daily schedule is unchanged. The privacy notice describes deletion at the next daily run (normally approximately 30–31 days).
- The privacy notice uses Vercel's current address, describes both optional preferences and withdrawal, and links directly to Cloudflare's Turnstile privacy notice.

## Still requires operational or business confirmation

1. **Private uploads:** uploads remain public to anyone with their unguessable URL. Public access is not authentication. Provision a private Vercel Blob store and a protected staff download flow before accepting confidential files. Switching only `access` would break existing public-store uploads and email links. No existing files were read, migrated or deleted during this review.
2. **Production cleanup:** confirm CRON_SECRET and BLOB_READ_WRITE_TOKEN are configured in Production, the cron is enabled, and recent invocations succeeded. No production cleanup was invoked. Missing CRON_SECRET now deliberately prevents deletion. Monitor failures so the stated retention is met.
3. **Six-month inquiry retention:** the existing notice promises removal six months after the last contact for unsuccessful inquiries. Implement/confirm an operational process covering the studio mailbox, Resend records, downloaded copies and applicable backups. The web app does not implement mailbox deletion.
4. **Impressum:** confirm Anna's full legal name, service address and contact details. Add an assigned USt-ID/Wirtschafts-ID and register/professional details if applicable. No numbers or registration facts were invented.
5. **Processors and transfers:** confirm applicable DPAs, actual processing regions, retention settings and transfer safeguards for Vercel, Resend, Cloudflare, Sanity and the receiving mailbox provider. The current transfer paragraph is general and should be made specific once these facts are known. Verify the necessity/legal assessment for Turnstile's configured device access; Article 6(1)(f) alone does not establish a TDDDG exception.
6. **CMS overrides:** the public Sanity query returned no Impressum/Datenschutz page documents during the audit, so the code fallback was in use. Later published CMS `sections` replace the fallback entirely and must retain these corrections.
7. **Release:** changes are local. Build/test results are not evidence that the public deployment has been updated.

## Verification

- Full Vitest suite: 61 tests passed across 12 files. Cleanup tests also passed after the SDK mock type correction.
- ESLint, TypeScript and production build passed. Next.js used its WASM compiler fallback because the installed native Windows SWC binary could not load.
- Browser checks on port 3101: updated privacy notice and upload disclosure render; accepting consent and reloading restores the dark theme; withdrawing consent and reloading resets it; the final inquiry step displays the privacy notice without a consent checkbox. No browser console errors were recorded.
- No real inquiry email or upload was submitted. Cron deletion was tested with mocked storage only.

## Sources checked

- DDG § 5: https://www.gesetze-im-internet.de/ddg/__5.html
- Cookie guidance: https://datenschutz.hessen.de/datenschutz/internet-und-medien/haeufige-fragen-zu-cookies
- LDI NRW website privacy guidance: https://www.ldi.nrw.de/datenschutz/medien-und-technik/websites-muster-fuer-datenschutzhinweise
- Vercel privacy notice: https://vercel.com/legal/privacy-notice
- Vercel Blob SDK: https://vercel.com/docs/vercel-blob/using-blob-sdk
- Vercel cron management: https://vercel.com/docs/cron-jobs/manage-cron-jobs
- Cloudflare Turnstile privacy: https://www.cloudflare.com/turnstile-privacy-policy/
