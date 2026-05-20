# A To Z Computer Solution Site

Marketing and local-SEO website for a computer solutions provider covering repair, installation assistance, networking, printer support, upgrades, and easy customer booking.

## Stack

- Next.js App Router
- TypeScript
- `next-intl` for multilingual routing and translations
- Tailwind CSS 4 with custom design tokens
- Structured data, sitemap, robots, Open Graph image, and reusable metadata helpers

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Public pages are locale-based:

- `/en`
- `/hi`
- `/mr`

## Content management

The project is intentionally organized so updates stay easy:

- Business contact details and location defaults: `src/content/site.ts`
- Service slugs and icons: `src/content/services.ts`
- Translated copy for all public pages: `src/messages/*`
- Locale routing and request config: `src/i18n/*`
- Localized content helpers: `src/lib/content.ts`
- Shared SEO helpers and structured data: `src/lib/seo.ts`
- Contact, WhatsApp, map, and booking helpers: `src/lib/site.ts`
- Reusable UI sections and layout pieces: `src/components/*`
- Public localized routes: `src/app/(public)/[locale]/*`
- Admin route: `src/app/(admin)/admin/*`

## Easy future changes

- Add a new public page by creating a route inside `src/app/(public)/[locale]/`.
- Add or edit translations in `src/messages/en.ts`, `src/messages/hi.ts`, and `src/messages/mr.ts`.
- Add a new navigation link by updating `src/lib/content.ts`.
- Add a new service by inserting a slug/icon in `src/content/services.ts` and adding translated content in `src/messages/*`.
- Update colors, spacing, buttons, and reusable look-and-feel in `src/app/globals.css`.
- Replace the booking transport later by editing `src/components/booking-form.tsx`.

## Environment

Copy `.env.example` if you want production-ready SEO values:

- `NEXT_PUBLIC_SITE_URL`
  Use the final domain so canonical URLs, sitemap entries, and OG tags point to the live site.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  Optional Google Search Console verification token.
- `ADMIN_PASSWORD`
  Password for the `/admin` panel used to edit contact details and business settings.
- `DATA_DIRECTORY`
  Optional writable folder for `data/site-settings.json`. Keep the default locally. On a host with mounted storage, point this to that mounted directory.

## Admin panel

- Visit `/admin` after setting `ADMIN_PASSWORD`.
- The panel saves managed business details into `data/site-settings.json`.
- Saving revalidates all locale versions so updated phone numbers, email, address, WhatsApp, schema, and metadata refresh together.

## Images

- Suggested image filenames and search prompts are in `public/images/README.md`.
- Keep downloaded site photos inside `public/images/`.
- Local images can then be used directly with Next's `Image` component.

## Booking flow

The current booking experience is zero-backend and launch-friendly:

- Customers fill a structured form.
- The form opens WhatsApp with the request prefilled.
- There is an email fallback and copy-to-clipboard option.

If you later want CRM storage, email delivery, or a database-backed booking system, the form is already isolated enough to swap the transport layer cleanly.

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` before production.
- Verify the business email spelling from the original card before going live if needed.
- Submit the deployed domain to Google Search Console after launch.

## Recommended production host

This project currently stores admin-edited business settings in a JSON file, so it needs a host with a persistent writable directory.

The simplest launch path is:

1. Push this project to a GitHub repository.
2. Deploy it to Railway from GitHub.
3. Attach a volume and mount it to `/app/data`.
4. Set `DATA_DIRECTORY=/app/data`.
5. Set `NEXT_PUBLIC_SITE_URL` to your final domain.
6. Set a real `ADMIN_PASSWORD`.
7. Configure the Railway healthcheck path as `/health`.
8. Connect your custom domain and redeploy once.

The app is now prepared for that flow:

- Production build uses Next.js standalone output.
- `npm start` runs the standalone server.
- `/health` returns `200`.

## Google launch checklist

After the site is live on the final domain:

1. Open Google Search Console and add the domain.
2. Verify ownership.
   If you use the HTML tag method, place the Search Console token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
3. Submit `/sitemap.xml`.
4. Inspect the main URLs in URL Inspection and request indexing:
   - `/`
   - `/services`
   - `/book-service`
   - `/contact`
5. Add or claim the Google Business Profile for the business and add the website URL there too.
