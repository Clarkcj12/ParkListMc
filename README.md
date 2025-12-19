# ParkListMc

ParkListMc is a Minecraft theme-park server directory with owner-managed listings,
NuVotifier support, and ranked voting.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + Radix UI primitives
- Prisma + MariaDB
- Better Auth (Google, Microsoft, Discord, email/password)

## Local setup

1. Copy `.env.example` to `.env` or `.env.local` and fill in values.
2. Install dependencies: `npm install`
3. Initialize the database:
   - `npx prisma migrate dev`
   - or `npx prisma db push`
4. Run the dev server: `npm run dev`

## Environment variables

- `DATABASE_URL` - MariaDB connection string.
- `BETTER_AUTH_SECRET` - random secret used by Better Auth.
- `BETTER_AUTH_URL` - base URL for auth callbacks.
- `NEXT_PUBLIC_APP_URL` - app URL for client-side config.
- Provider client IDs and secrets for Google, Discord, and Microsoft.

## Key routes

- `GET /api/servers` - list published servers.
- `POST /api/servers` - create a server (auth required).
- `GET /api/servers/[slug]` - server details.
- `POST /api/servers/[slug]/vote` - vote with a 12-hour cooldown.
- `GET|POST /api/auth/*` - Better Auth handlers.

## Notes

- Vote cooldown is 12 hours (session or IP hash).
- Votifier settings are stored per listing.
