// Último paso de `npm run build`. Con el texto ya escrito en el código fuente, genera:
//  · dist/index.html, la principal;
//  · dist/<nombre>.html por cada página de tratamiento (contenido/paginas/), que Cloudflare sirve en /<nombre>, sin barra final;
//  · dist/sitemap.xml, con todas esas direcciones.
// Antes revisa el contenido: si falta una foto, un dibujo o un link no lleva a ningún lado, se corta y lo dice.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

process.env.NODE_ENV = 'production'
const { comprobarContenido, generarPaginas, generarPrincipal, generarSitemap } = await import('../.ssr/servidor.js')

const problemas = comprobarContenido((ruta) => existsSync(`public${ruta}`))
if (problemas.length > 0) {
  console.error(`\nEl contenido tiene ${problemas.length} problema(s). No se generó nada:\n${problemas.map((problema) => `  · ${problema}`).join('\n')}\n`)
  rmSync('.ssr', { recursive: true })
  process.exit(1)
}

const plantilla = readFileSync('dist/pagina.html', 'utf8')
const principal = readFileSync('dist/index.html', 'utf8')

for (const { archivo, html } of generarPaginas(plantilla, principal)) {
  writeFileSync(`dist/${archivo}`, html)
  console.log(`Página generada: dist/${archivo}`)
}

writeFileSync('dist/index.html', generarPrincipal(principal))
console.log('Página generada: dist/index.html')
writeFileSync('dist/sitemap.xml', generarSitemap())
console.log('Sitemap generado: dist/sitemap.xml')

rmSync('dist/pagina.html')
rmSync('.ssr', { recursive: true })
