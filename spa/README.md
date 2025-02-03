# BRUTAL//SPA template

A brutalist-minimal Remix SPA template. Built with [Remix SPA Mode](https://remix.run/docs/en/main/guides/spa-mode) and tanstack query for data fetching.

## Features
- Clean neobrutalist design system
- Google OAuth authentication
- Responsive layouts
- Type-safe data fetching

## Development

Run the development server:

```shellscript
pnpm dev
```

## Production

Build for production:

```shellscript
pnpm build
```


> [!IMPORTANT]
>
> `vite preview` is not designed for use as a production server

### Deployment

Deploy to any HTTP server with SPA fallback support (serves `/index.html` for all routes).

## Styling

Built with [Tailwind CSS](https://tailwindcss.com/) and custom design tokens. Recommended fonts:
- Display: Chakra Petch
- Body: Geist Sans
- Mono: Geist Mono

See [Vite CSS docs](https://vitejs.dev/guide/features.html#css) for customization.
