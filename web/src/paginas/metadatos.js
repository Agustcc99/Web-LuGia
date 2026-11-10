import { sitio } from '@/contenido/sitio.js'

// Título, descripción y datos estructurados de cada página de tratamiento.
export const DOMINIO = 'https://lugia.com.ar'

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Datos estructurados de la página, sin horarios. Los datos del consultorio salen del index.html de la principal: así no hay dos copias.
function datosEstructurados(pagina, consultorio) {
  const url = `${DOMINIO}${pagina.ruta}`
  const { '@context': _contexto, ...datosConsultorio } = consultorio
  const idConsultorio = `${DOMINIO}/#consultorio`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${url}#pagina`,
        url,
        name: pagina.seo.titulo,
        description: pagina.seo.descripcion,
        inLanguage: 'es-AR',
        image: `${DOMINIO}${pagina.seo.imagen}`,
        about: { '@type': 'MedicalProcedure', name: pagina.tratamiento, alternateName: pagina.otroNombre },
        isPartOf: { '@type': 'WebSite', url: `${DOMINIO}/`, name: consultorio.name },
        publisher: { '@id': idConsultorio },
        breadcrumb: { '@id': `${url}#migas` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#migas`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: sitio.comun.inicio, item: `${DOMINIO}/` },
          { '@type': 'ListItem', position: 2, name: pagina.tratamiento, item: url },
        ],
      },
      {
        ...datosConsultorio,
        '@id': idConsultorio,
        makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${pagina.tratamiento} (${pagina.otroNombre.toLowerCase()})`, url } },
      },
    ],
  }
}

export function cabecera(pagina, consultorio) {
  const { titulo, descripcion, imagen } = pagina.seo
  const url = `${DOMINIO}${pagina.ruta}`
  const json = JSON.stringify(datosEstructurados(pagina, consultorio)).replace(/</g, '\\u003c')
  return [
    `<title>${escapar(titulo)}</title>`,
    `<meta name="description" content="${escapar(descripcion)}" />`,
    `<meta property="og:title" content="${escapar(titulo)}" />`,
    `<meta property="og:description" content="${escapar(descripcion)}" />`,
    `<meta property="og:image" content="${DOMINIO}${imagen}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<link rel="canonical" href="${url}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}
