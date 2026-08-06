# Palava Kalibari Trust (PKT) — Website

A premium, festive Bengali single-page app for the Palava Kalibari Trust, built with
**React + Vite + Tailwind CSS + lucide-react**. Deep maroon, royal gold, and warm ivory
palette with Playfair Display / Cinzel serif headings.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production bundle in dist/
npm run preview  # preview the production build
```

> Note: the sandbox blocks package install scripts. If `vite` fails to start with an
> esbuild platform error, run `npm approve-scripts esbuild` once, then `npm install`.

## What's inside

- **Hero** — hand-drawn SVG art of Maa Durga (crown/Mukut, third eye, bindi, Chokshu eyes,
  Nath) plus a simulated video-player modal.
- **Ilish Utsav 2026** — three interactive platter tabs (Ilish / Mutton / Veg) with exact
  menus, Member vs Non-Member pricing, and a working "Book Platter Seats" modal.
- **Durga Puja 2026 — Puja Nirghanta** — tabbed ritual schedule for all six tithis, with
  Sandhi Puja (19 Oct) highlighted as the most sacred moment.
- **Membership Portal** — Life (₹3,000) and Annual (₹1,500) plans, registration form, and a
  **simulated Razorpay checkout** (UPI / Card+OTP / Netbanking → processing → success screen
  with mock transaction ID and downloadable receipt).
- **About** and a **Contact footer** with clickable phone/email, Trust reg. details
  (F-8722), social links, and an SVG map mockup.

## Structure

| File | Purpose |
|------|---------|
| `src/App.jsx` | All sections, modals, and the Razorpay flow |
| `src/DurgaFace.jsx` | Pure-SVG Maa Durga illustration |
| `src/data.js` | Exact Trust data (events, menus, schedule, plans) |
| `src/index.css` | Tailwind layer + custom festive styles |
| `tailwind.config.js` | Maroon/gold/ivory theme, fonts, animations |

All grounding data (dates, prices, ritual timings, contacts) lives in `src/data.js` — edit
there to update content. No remote images are used; all art is SVG / CSS.
