# Vette

**Vette** — Premium Auto Brokerage Company website.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **i18n:** next-intl (8 dil: en, tr, es, pt, de, el, sq, ru)
- **Theme:** next-themes (dark/light, default: dark)
- **Email:** Resend API (contact form)
- **Hosting:** Vercel

## Project Structure
- `src/app/[locale]/` — locale-based routing
- `src/components/` — React components (Header, Hero, About, Gallery, Contact, Footer)
- `src/messages/` — translation JSON files
- `src/i18n/` — i18n configuration
- `public/` — static assets (logo.png, gallery/)
- `src/app/api/contact/` — contact form API route

## Environment Variables (Vercel)
- `RESEND_API_KEY` — Resend API key for sending emails
- `CONTACT_EMAIL` — email address to receive contact form submissions

## Design
- Dark theme: navy background (#0a1628)
- Accent: red (#e63946), blue (#3b82f6)
- Fonts: Oswald (headings), Inter (body)
- One-page layout: Hero → About → Gallery → Contact → Footer
- Parallax, smooth scroll, typography animations
