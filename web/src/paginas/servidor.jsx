import { renderToString } from 'react-dom/server'
import { paginas } from '@/contenido/paginas/indice.js'
import Envoltura from '@/estructura/Envoltura.jsx'
import { cabecera } from './metadatos.js'
import PaginaTratamiento from './PaginaTratamiento.jsx'

// Arma el HTML de cada página de tratamiento al compilar. Lo usa scripts/generar-paginas.mjs.
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
