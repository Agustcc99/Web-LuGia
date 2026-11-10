// Pruebas en un navegador real (pruebas/navegador/). Corren con `npm run probar`, sobre lo último compilado:
// antes hay que correr `npm run build`. Usan el Edge que ya trae Windows, así no hay que bajar otro navegador.
import { defineConfig, devices } from '@playwright/test'

const PUERTO = 4180

export default defineConfig({
  testDir: 'pruebas/navegador',
  reporter: 'list',
  use: { baseURL: `http://localhost:${PUERTO}`, channel: 'msedge' },
  projects: [
    { name: 'compu', use: { viewport: { width: 1280, height: 800 } } },
    { name: 'celular', use: { ...devices['Pixel 7'], channel: 'msedge' } },
  ],
  webServer: { command: `npx vite preview --port ${PUERTO} --strictPort`, url: `http://localhost:${PUERTO}`, reuseExistingServer: true },
})
