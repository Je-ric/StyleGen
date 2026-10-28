# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Progressive Web App (PWA)

Install StyleGen from the browser installation menu or the **Install app** button when supported. On iPhone/iPad, use Safari’s Share menu and **Add to Home Screen**. Production hosting requires HTTPS; localhost works for testing.

After the first successful online visit, wait for **This app is ready to use offline**. The production service worker caches all built routes, styles, fonts, icons, and local data assets, including routes you have not opened yet. A first visit still requires a connection.

The interface fonts and filter sample image are bundled. Additional Google Fonts in Typography require a first online load; successfully loaded font styles and files are cached for later use. Uncached fonts use the chosen fallback offline.

Updates display **Reload to update** and **Later**. Finish any work or game before reloading; no update forces a reload. Ordinary reloads or closing the app can still discard unsaved in-memory state.

### Files used (source of truth)

- `vite.config.js`: manifest, precache, and cache policy.
- `src/components/PwaStatus.vue` and `src/App.vue`: installation, offline status, and update prompt.
- `src/main.js`, `src/style.css`, `tailwind.config.js`, and `postcss.config.js`: bundled interface assets and compiled CSS.
- `public/pwa-*.png` and `public/apple-touch-icon.png`: installation icons.

### Build and verify

1. Run `npm install`, then `npm run build` and `npm run preview`. The development server intentionally does not register a service worker.
2. Open the preview URL online and wait for offline readiness.
3. Switch browser networking offline, reload, and open routes you have not visited.
4. Reconnect, publish a changed build, and reopen the app to verify the update prompt. Choose **Later** to keep working or **Reload to update** when ready.

Deploy the complete `dist/` directory, including `sw.js`, its Workbox file, the manifest, and all assets. Serve `sw.js` and `index.html` with revalidation (for example, `Cache-Control: no-cache`); hashed assets may use immutable caching. Each app needs its own origin or a nonoverlapping deployment path and service-worker scope. The current configuration targets an origin root; configure Vite’s `base` and root-relative asset URLs before deploying under a subdirectory.
