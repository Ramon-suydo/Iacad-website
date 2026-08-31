# iACADEMY Library

The iACADEMY Library portal is a Next.js application built with the App Router and Supabase. It provides the library's public-facing pages and Supabase-backed user features.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file with the Supabase project values used by both the browser and server clients:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Project structure

- `app/` — App Router pages, layouts, and route handlers
- `components/` — reusable UI components
- `data/` — static content and structured project data
- `lib/` — shared utilities and Supabase clients
- `scripts/` — project maintenance scripts, including image optimization

## Deployment

Deploy the application on [Vercel](https://vercel.com/) and configure the same environment variables in the Vercel project settings.
