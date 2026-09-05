# Objects

Considered objects. A considered shopping experience.

## Run independently

Use Node 22.12+ and pnpm 11. Run `pnpm install`, then `pnpm dev`. Run `pnpm build` and `pnpm start` for production. No environment variables are needed.

Routes: `/`, `/collection`, `/product/studio-lamp`, `/product/form-vase`, `/product/linen-throw`, `/cart`, `/checkout`.

## Make it yours

Edit app/view.tsx for route content, app/globals.css for this identity, and registry/ for editable components. Assets are local in public/assets. This is fictional demonstration content, not customer evidence.

## Backend integration

Forms expose async onSubmit adapters in their source. Blocks expose value/defaultValue/onValueChange for state ownership. Supply persistence from your application; template-specific demo storage uses jez-demo: keys and is not authentication. ChatWorkspace accepts an onSend callback with message history and an AbortSignal for your provider transport. Storefront add and checkout handlers are frontend demos; pricing and orders must be validated server-side in a real shop. Never store credentials in local storage.

## Demo reset

Use the visible Reset demo or New conversation controls. For a full reset, clear this origin's keys prefixed jez-demo:.

## Distribution

Original source is all rights reserved. Public distribution terms are pending. Third-party licences are included in THIRD_PARTY_NOTICES.md and assets retain their stated provenance.
