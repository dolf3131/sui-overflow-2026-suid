## Overflow Passport (Sui Overflow MVP)

White, minimal UI inspired by [`overflow.sui.io`](https://overflow.sui.io/) for a hybrid-event participation system:

- **Offline**: QR check-in → Passport stamp
- **Online**: session code / evidence → issuer-backed credential (demo UI)
- **Team**: contributions → role badges (demo UI)
- **Verify**: public verification page (demo UI)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### zkLogin (Google) for Web2-style onboarding

This demo uses Google OAuth to obtain an OpenID JWT, derives a zkLogin address internally, and **does not show the wallet address** in the UI.

Create `.env.local` from `.env.example`:

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client id (GIS)
- `ZKLOGIN_SALT_SECRET`: server secret to derive a deterministic user salt
- `ZKLOGIN_PROVER_URL`: optional prover URL (defaults to `https://prover-dev.mystenlabs.com/v1`)

### Routes

- `/` Landing
- `/app` App shell + pages
  - `/app/events`
  - `/app/credentials`
  - `/app/team`
  - `/app/issuer`
- `/verify` Public verification (demo)

This project uses local system font stacks so production builds do not depend on fetching Google Fonts.
