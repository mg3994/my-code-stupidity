# lwm (Svelte + TypeScript)

This is a Svelte project with TypeScript support, created using `npm create vite@latest`.

## Development

To start the development server:

```bash
npm run dev
```

The server runs on `http://localhost:5173` (by default).

### API Proxy

All requests to `/api/*` are proxied to the Rust backend running on `http://127.0.0.1:8000`.
This allows you to make calls like `fetch('/api/users')` from your Svelte code, and they will be forwarded to your Rust service.

## Build

To build for production:

```bash
npm run build
```
