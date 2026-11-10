// Genera un HTML propio para cada página de tratamiento (contenido/paginas/), con el texto ya escrito en el código fuente.
// Es el último paso de `npm run build`. Cada página queda en dist/<nombre>.html, que Cloudflare sirve en /<nombre>, sin barra final.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'

process.env.NODE_ENV = 'production'
const { generarPaginas } = await import('../.ssr/servidor.js')

const plantilla = readFileSync('dist/pagina.html', 'utf8')
const principal = readFileSync('dist/index.html', 'utf8')

for (const { archivo, html } of generarPaginas(plantilla, principal)) {
  writeFileSync(`dist/${archivo}`, html)
  console.log(`Página generada: dist/${archivo}`)
}

rmSync('dist/pagina.html')
rmSync('.ssr', { recursive: true })
