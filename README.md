# Ehsaas

A quiet daily poem app — one poem a day, shown exactly as written, with a soft generated meaning layer and a short personal line.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 on your phone (or iPhone 13 sim) for the intended experience.

## LLM

Set `ANTHROPIC_API_KEY` in `.env.local` to enable real generation. Without it, a local fallback layer is returned so the app still feels complete.

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Adding poems

Edit `data/poems.json`. Each entry:

```json
{
  "id": "poem-xxx",
  "date": "YYYY-MM-DD",
  "title": "...",
  "originalPoem": "line 1\nline 2",
  "tags": ["..."],
  "contextHint": "morning | evening | rainy | calm | missing | birthday | gentle",
  "manualNotes": "optional"
}
```

If no poem matches today's date, the app falls back to rotating through entries by day-of-year.

## PWA

- `public/manifest.json`
- `public/sw.js` (service worker, registered in production)
- Add `public/icons/icon-192.png` and `public/icons/icon-512.png` before deploying.

## Deploy

Vercel. Add `ANTHROPIC_API_KEY` as an environment variable.
