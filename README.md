# touchlineHQ

> Custom grassroots football websites with fast setup, club tools, and modern React styling.

## About

`touchlineHQ` is a lightweight website project built with React, Vite, and TypeScript. It focuses on marketting a polished club website experience for grassroots football teams, featuring fixtures, club data, contact options, and clear presentation.

## Quick start

From the `website` folder:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

This runs TypeScript compilation and builds the production site into `website/dist`.

## Project structure

- `website/src/` - React app source code
- `website/public/` - static assets and JSON data
- `website/package.json` - app dependencies and scripts
- `.github/workflows/` - CI and deployment workflows

## Deployment

This project is configured for Cloudflare Pages deployment from `website/dist`.

## Notes

- React 19 + Vite provide a fast development experience
- Mantine is used for UI components
- The app is designed for small club and community websites
