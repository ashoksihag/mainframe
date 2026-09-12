# Mainframe

A cinematic single-page site: full-screen background video, typewriter hero
text, and a minimal top navigation.

## Live demo

Once pushed, the site is served via GitHub Pages at:

https://<username>.github.io/mainframe/

## Tech stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react icons

## Getting started

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Deployment

On every push to main, .github/workflows/deploy.yml builds the site and
publishes it to GitHub Pages. Enable it once under:

Settings > Pages > Build and deployment > Source: GitHub Actions
