import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/PlantaCheck_Dashboard/',
  plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
        manifest: {
          id: '/dashboard/',
          name: 'PlantaCheck',
          short_name: 'PlantaCheck',
          description: 'Dashboard del Clima para Plantas',
          theme_color: '#D3D1D1',
          icons: [
              {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: "pwa-maskable-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
              },
              {
                src: "pwa-maskable-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
              },
          ]
        },
   workbox: {
      runtimeCaching: [
         {
            // Intercepta todas las peticiones a esta API (ajusta según necesidad)
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
               cacheName: 'open-meteo-cache',
               expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24, // 1 día
               },
               cacheableResponse: {
                  statuses: [0, 200],
               }
            }
         }
      ]
   }



   
      })
  ]
})
