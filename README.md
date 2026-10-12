# firmium-site

Showcase website for Firmium, built with Vite + Svelte + TypeScript.

## Development

```bash
npm install
npm run dev
npm test      # changelog parser
npm run check # svelte-check + tsc
```

## Build

```bash
npm run build
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` (check, build, publish to GitHub Pages). `public/CNAME` sets the domain (firmium.app).

## Release checklist

Bump `VERSION` in `src/lib/changelog.ts` by hand with each app release (the app's `scripts/bump-version.sh` does not cover this site) and refresh `FALLBACK_CHANGELOG` in the same file.
