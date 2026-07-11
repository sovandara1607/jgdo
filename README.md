# JgDo Website

Marketing site, blog, and checkout flow for [JgDo](https://jgdo.app) — a macOS menu bar app for window snapping, app switching, and workspaces. Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4.

## Getting started

Requires Node >= 20.9 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

Checkout is powered by [ABA PayWay](https://developer.payway.com.kh). Copy `.env.example` to `.env.local` and fill in your merchant credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `PAYWAY_MERCHANT_ID` | Merchant ID from your PayWay registration email |
| `PAYWAY_API_KEY` | API key from your PayWay registration email |
| `PAYWAY_BASE_URL` | `https://checkout-sandbox.payway.com.kh` for sandbox, `https://checkout.payway.com.kh` for production |

## Project structure

```
src/app/            Routes (App Router): pricing, checkout, download, blog, changelog, support
src/app/api/        Route handlers: contact, newsletter, checkout, payway webhook/callback
src/components/     UI, layout (navbar/footer), sections, blog, mockups, icons
src/data/           Site-wide config, pricing, FAQs, changelog entries
content/blog/       MDX blog posts, rendered via next-mdx-remote
public/downloads/   Distributable app builds (.dmg)
```

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Notes for contributors

This project pins `next@16.2.10`, which has breaking changes from earlier Next.js versions you may be used to. Check `node_modules/next/dist/docs/` before relying on prior Next.js knowledge, and heed any deprecation notices from the framework.
