# Edgebaston College — Website & CMS

A full college website with a built-in, **no-code content dashboard**. The
client can log in and manage everything — courses, staff, pages, branding,
and enquiries — through a rich-text editor, without ever touching the code.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Prisma + SQLite**, and **TipTap** for rich text.

---

## ✨ What's included

**Public website** (fully responsive — mobile, tablet, desktop):
- Home page with hero, live stats, featured courses and staff highlights
- Courses listing with category filter + individual course pages
- Faculty / staff directory grouped by category
- About page
- Contact page with a working enquiry form (saved to the dashboard)
- Custom pages created by the client (e.g. Admissions, Campus Life)

**Admin dashboard** (`/admin`) — protected by email + password login:
- Overview with stats and recent enquiries
- **Courses** — create / edit / delete, rich-text descriptions
- **Staff** — create / edit / delete, rich-text bios
- **Pages** — build brand-new pages with a rich-text editor and optionally
  add them to the site navigation
- **Enquiries** — read / mark / reply to / delete contact submissions
- **Settings** — site name, tagline, hero copy, about text, contact details,
  and **brand colours** (the whole site re-themes instantly)

Everything is edited through a WYSIWYG editor — **no code changes needed** to
update content.

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env
#    then edit .env (see "Environment variables" below)

# 3. Create the database and load demo content
npm run db:reset

# 4. Start the dev server
npm run dev
```

Open <http://localhost:3000> for the website, and
<http://localhost:3000/admin> for the dashboard.

**Demo login** (from `.env`):
- Email: `admin@edgebaston.edu`
- Password: `admin1234`

---

## 🔐 Environment variables

All configuration lives in a `.env` file (copy it from `.env.example`). This
is where any secrets or third-party **API keys** go — never hard-code them in
the source.

| Variable         | What it does                                                       |
| ---------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`   | Supabase **pooled** connection (Supavisor, port 6543, `?pgbouncer=true`). Used at runtime. |
| `DIRECT_URL`     | Supabase **direct** connection (port 5432). Used for migrations / schema push. |
| `ADMIN_EMAIL`    | The dashboard login email.                                         |
| `ADMIN_PASSWORD` | The dashboard login password.                                      |
| `SESSION_SECRET` | Random string used to sign the login session cookie.               |

Get both connection strings from **Supabase → Project Settings → Database →
Connection string** (pick "Transaction" pooler for `DATABASE_URL` and the
direct/session string for `DIRECT_URL`).

**Adding a new API key later** (e.g. an email service, maps, analytics):

1. Add it to `.env` and to `.env.example` (with a placeholder), e.g.
   `RESEND_API_KEY="..."`.
2. Read it in server code via `process.env.RESEND_API_KEY`.
3. If a value must be visible in the browser, prefix it with `NEXT_PUBLIC_`
   (e.g. `NEXT_PUBLIC_MAPS_KEY`) — **only** do this for non-secret values.

`.env` is git-ignored, so secrets are never committed. `.env.example`
documents which variables are needed.

---

## 🎨 Branding

Brand colours are stored in the database and injected as CSS variables, so the
client can change the whole site's look from **Dashboard → Settings** — no code
changes. Defaults live in `src/app/globals.css`.

---

## 🗄️ Useful scripts

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the development server                       |
| `npm run build`     | Production build                                   |
| `npm run start`     | Run the production build                           |
| `npm run db:push`   | Sync the schema to the database                    |
| `npm run db:seed`   | Load demo content                                  |
| `npm run db:reset`  | Wipe + recreate the database with demo content     |
| `npm run db:studio` | Open Prisma Studio to inspect data                 |

---

## 🏗️ Moving to production

The app runs on **Supabase Postgres**. Create a Supabase project, then set
`DATABASE_URL` (pooled) and `DIRECT_URL` (direct) locally and in your host's
environment variables. The build step (`scripts/setup-db.mjs`) creates the
tables and seeds demo content on first deploy — no manual migration needed.
