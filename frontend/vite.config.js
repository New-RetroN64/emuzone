import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/emuzone/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-icon.svg'],
      manifest: {
        name: 'Emuzone - Katalog Gier Retro',
        short_name: 'Emuzone',
        description: 'Katalog klasycznych gier retro w technologii PWA',
        theme_color: '#05050a',
        background_color: '#05050a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            // 1. Cache dla zewnętrznego pliku JSON (GitHub Gist / zewnętrzny host)
            urlPattern: ({ url }) =>
              url.pathname.endsWith('.json') ||
              url.hostname.includes('githubusercontent.com') ||
              url.hostname.includes('npoint.io') ||
              url.hostname.includes('jsonbin.io'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-json-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dni
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // 2. Cache dla zewnętrznych obrazków (okładki z Wikipedii i innych źródeł)
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dni
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
