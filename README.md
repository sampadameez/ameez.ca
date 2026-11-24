# Ameez Research Labs

A static, responsive website for Ameez Research Labs, built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide.

## Development

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To create and preview the production build:

```bash
npm run build
npm run preview
```

The generated site is in `dist`. No server-side code, database, or paid service is required. The contact form opens the visitor's default email application; it does not send or store messages itself. Google Fonts are loaded externally, with local fallback fonts if unavailable.

## Before publishing

- Confirm `support@ameez.ca` is a working inbox, or replace `contactEmail` in `src/App.tsx`.
- The founder section uses the Ameez monogram as an institutional graphic. The transparent, scalable `public/ameez-monogram.svg` can also be used in presentations and social profile artwork; `public/favicon.svg` is the small-size variant.
- The canonical URL, structured data, sitemap, and robots file assume `https://ameez.ca/`. Update them to the final public URL if different.
- Configure the custom domain in GitHub Pages and DNS if using `ameez.ca`. GitHub Pages must be publicly reachable for search engines to index it.

## GitHub Pages

In the repository settings, under **Pages**, select **GitHub Actions** as the build and deployment source. Push to `main` or run the **Deploy to GitHub Pages** workflow manually. The workflow builds with the Pages base path, supporting both a custom domain and a repository subpath. For a local subpath build, set `GITHUB_PAGES_BASE` to the path including leading and trailing slashes before running `npm run build`.

The canonical URL and sitemap should describe the final public site, not a temporary GitHub Pages URL. Update them if deploying without the custom domain.