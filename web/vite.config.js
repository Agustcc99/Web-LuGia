import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const ruta = (archivo) => fileURLToPath(new URL(archivo, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/" apunta a la carpeta src: así los imports no necesitan "../../".
    alias: { '@': ruta('./src') },
  },
  build: {
    // Dos entradas: la página principal y la plantilla de las páginas de tratamientos (ver scripts/generar-paginas.mjs).
    rollupOptions: { input: { index: ruta('./index.html'), pagina: ruta('./pagina.html') } },
  },
  // GSAP va adentro del compilado que genera el HTML: sus plugins no se pueden importar directo desde Node.
  ssr: { noExternal: ['gsap'] },
})
