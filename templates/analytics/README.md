# Metric

A clear view of the numbers that move your business.

## Run independently

Use Node 22.12+ and pnpm 11. Run `pnpm install`, then `pnpm dev`. Run `pnpm build` and `pnpm start` for production. No environment variables are needed.

Routes: `/`, `/reports`, `/reports/weekly`, `/customers`, `/settings`.

## Make it yours

Edit app/view.tsx for route content, app/globals.css for this identity, and registry/ for editable components. Assets are local in public/assets. This is fictional demonstration content, not customer evidence.

## Backend integration

Forms expose async onSubmit adapters in their source. Replace useDemoState with your data layer for persistence; local demo storage uses jez-demo: keys and is not authentication. ChatWorkspace.respond is the simulated streaming boundary: replace it with your provider transport and abort handling. Storefront add and checkout handlers are frontend demos; pricing and orders must be validated server-side in a real shop. Never store credentials in local storage.

## Demo reset

Use the visible Reset demo or New conversation controls. For a full reset, clear this origin's keys prefixed jez-demo:.

## Distribution

Original source is all rights reserved. Public distribution terms are pending. Third-party licences are included in THIRD_PARTY_NOTICES.md and assets retain their stated provenance.
