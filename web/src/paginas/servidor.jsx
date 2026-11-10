import { renderToString } from 'react-dom/server'
import App from '@/App.jsx'
import { paginas } from '@/contenido/paginas/indice.js'
import Envoltura from '@/estructura/Envoltura.jsx'
import { cabecera, DOMINIO } from './metadatos.js'
import PaginaTratamiento from './PaginaTratamiento.jsx'

export { comprobarContenido } from './comprobar.js'

// Arma el HTML de cada página al compilar. Lo usa scripts/generar-paginas.mjs.
export function generarPaginas(plantilla, htmlPrincipal) {
  const consultorio = JSON.parse(htmlPrincipal.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])

  return Object.entries(paginas).map(([clave, pagina]) => {
    const contenido = renderToString(
      <Envoltura>
        <PaginaTratamiento pagina={pagina} />
      </Envoltura>,
    )
    const html = plantilla
      .replace('<!--cabecera-->', () => cabecera(pagina, consultorio))
      .replace('data-pagina=""', () => `data-pagina="${clave}"`)
      .replace('<!--contenido-->', () => contenido)
    return { archivo: `${pagina.ruta.slice(1)}.html`, html }
  })
}

// La principal también sale con el texto ya escrito. `html` es el dist/index.html que deja Vite, con la raíz vacía.
export function generarPrincipal(html) {
  const contenido = renderToString(
    <Envoltura>
      <App />
    </Envoltura>,
  )
  return html.replace('<div id="root"></div>', () => `<div id="root">${contenido}</div>`)
}

// El sitemap sale de las páginas que existen: la principal y una entrada por tratamiento, con su `seo.prioridad`.
export function generarSitemap() {
  const entradas = [{ ruta: '/', prioridad: 1 }, ...Object.values(paginas).map((pagina) => ({ ruta: pagina.ruta, prioridad: pagina.seo.prioridad ?? 0.5 }))]
  const urls = entradas.map(({ ruta, prioridad }) => `  <url>\n    <loc>${DOMINIO}${ruta}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${prioridad.toFixed(1)}</priority>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}
