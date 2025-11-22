# LinkWithMentor - Svelte Frontend

A modern, internationalized Svelte application with advanced theming and client-side routing.

## Features

- 🌍 **Internationalization**: English, Arabic, Urdu, Hindi with automatic RTL support
- 🎨 **Advanced Th eming**: System/Light/Dark modes with dynamic color customization
- 🌐 **Geolocation**: Auto-detect user's country and currency
- 💾 **Persistence**: All settings saved to localStorage
- 🚀 **Client-Side Routing**: Clean URLs without hashes (e.g., `/auth`, `/book`)
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Svelte + TypeScript
- **Build Tool**: Vite
- **i18n**: svelte-i18n
- **Routing**: Custom history-based router (no hashes!)
- **Styling**: Vanilla CSS with CSS Variables

## Development

```bash
# Install dependencies
npm install

# Start dev server (with API proxy to Rust backend)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Routing

This app uses **history-based routing** (not hash-based), which means:
- ✅ Clean URLs: `/auth`, `/book` (not `/#/auth`, `/#/book`)
- ✅ Works in development automatically (Vite handles SPA fallback)
- ✅ Requires server configuration for production deployments

### Available Routes

- `/` - Landing page
- `/auth` - Authentication (Sign In/Sign Up)
- `/book` - Booking wizard

### How It Works

1. **Development**: Vite dev server automatically handles SPA routing
2. **Production**: The `public/_redirects` file ensures all routes fallback to `index.html`
3. **Router**: `src/lib/Router.svelte` uses `window.history.pushState()` for navigation

## API Proxy

The Vite dev server proxies `/api/*` requests to `http://127.0.0.1:8000` (Rust backend).

## Internationalization

### Supported Languages

| Language | Code | RTL |
|----------|------|-----|
| English  | en   | No  |
| Arabic   | العربية | ar   | Yes |
| Urdu     | اردو | ur   | Yes |
| Hindi    | हिन्दी | hi   | No  |

### Adding a New Language

1. Add language to `src/lib/config.ts`:
```typescript
{ code: 'fr', name: 'French', nativeName: 'Français', rtl: false }
```

2. Create locale file: `src/locales/fr.json`

3. Register in `src/lib/i18n.ts`:
```typescript
register('fr', () => import('../locales/fr.json'));
```

## User Preferences

Users can independently configure:
- **Language**: UI language
- **Country**: User's country (auto-detected or manual)
- **Currency**: Preferred currency for pricing
- **Theme Mode**: System, Light, or Dark
- **Primary Color**: Hue slider (0-360°)

All preferences persist across page reloads via localStorage.

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

The `public/_redirects` file ensures proper SPA routing:
```
/* /index.html 200
```

### Custom Server

Configure your server to serve `index.html` for all routes except:
- Static assets (`/assets/*`)
- API endpoints (`/api/*`)

Example Nginx config:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   ├── services/       # Business logic (geo, etc.)
│   ├── stores/         # Svelte stores (theme, user)
│   ├── config.ts       # App configuration
│   ├── i18n.ts         # i18n setup
│   └── Router.svelte   # Client-side router
├── locales/            # Translation files
├── routes/             # Page components
├── app.css             # Global styles
└── main.ts             # App entry point
```

## Configuration

### Theme Store (`src/lib/stores/theme.ts`)
- Manages theme mode and primary color
- Syncs with localStorage

### User Store (`src/lib/stores/user.ts`)
- Separates detected location from user preferences
- Allows independent country/currency selection

### Config (`src/lib/config.ts`)
- Centralized configuration for languages, currencies, countries
- Easy to extend and maintain
