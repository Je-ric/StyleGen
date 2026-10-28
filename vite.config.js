import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'prompt',
            includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
            manifest: {
                id: './',
                name: 'StyleGen',
                short_name: 'StyleGen',
                description: 'Create and preview CSS with visual generators.',
                lang: 'en',
                start_url: './',
                scope: './',
                display: 'standalone',
                theme_color: '#15803d',
                background_color: '#f0fdf4',
                icons: [
                    { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
                    { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                    { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                ],
            },
            workbox: {
                cacheId: 'stylegen',
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2,mp3,wav,webp}'],
                navigateFallback: 'index.html',
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'stylegen-font-styles', expiration: { maxEntries: 32, maxAgeSeconds: 31536000 } },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                        handler: 'CacheFirst',
                        options: { cacheName: 'stylegen-font-files', cacheableResponse: { statuses: [0, 200] }, expiration: { maxEntries: 100, maxAgeSeconds: 31536000 } },
                    },
                ],
            },
        }),
    ],
})
