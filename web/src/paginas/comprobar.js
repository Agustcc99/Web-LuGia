import { paginas } from '@/contenido/paginas/indice.js'
import { sitio } from '@/contenido/sitio.js'
import { coloresCursor } from '@/utilidades/coloresCursor.js'
import { formasFoto } from '@/utilidades/formasFoto.js'
import { destacados } from './bloques/destacados/indice.js'
import { dibujos, fondos } from './dibujos/indice.js'

// Revisa el contenido antes de generar las páginas. Si encuentra un problema, `npm run build` se corta y lo dice,
// en vez de publicar una página rota. `existeArchivo(ruta)` dice si un archivo está en public/.
const SECCIONES_COMUNES = ['que', 'cuando', 'atencion', 'experiencia', 'preguntas']

export function comprobarContenido(existeArchivo) {
  const problemas = []
  const rutas = Object.values(paginas).map((pagina) => pagina.ruta)

  // Recorre todos los datos y revisa fotos, links y dibujos, estén donde estén.
  const recorrer = (dato, lugar) => {
    if (Array.isArray(dato)) return dato.forEach((elemento, i) => recorrer(elemento, `${lugar}[${i}]`))
    if (!dato || typeof dato !== 'object') return
    for (const [clave, valor] of Object.entries(dato)) {
      const donde = `${lugar}.${clave}`
      if (clave === 'imagen' && typeof valor === 'string' && valor.startsWith('/') && !existeArchivo(valor)) problemas.push(`${donde}: no existe la foto ${valor} en public/`)
      if ((clave === 'ruta' || clave === 'enlace') && typeof valor === 'string' && valor.startsWith('/') && !valor.startsWith('/#') && !rutas.includes(valor))
        problemas.push(`${donde}: el link ${valor} no lleva a ninguna página`)
      if (clave === 'dibujo') {
        const tipo = typeof valor === 'string' ? valor : valor?.tipo
        if (tipo && !dibujos[tipo]) problemas.push(`${donde}: no existe el dibujo "${tipo}" (paginas/dibujos/indice.js)`)
      }
      recorrer(valor, donde)
    }
  }
  recorrer(sitio, 'sitio')

  for (const [clave, pagina] of Object.entries(paginas)) {
    const falta = (campo) => problemas.push(`${clave}: falta ${campo}`)
    if (!pagina.ruta?.startsWith('/')) falta('ruta')
    if (!pagina.tratamiento) falta('tratamiento')
    if (!pagina.otroNombre) falta('otroNombre')
    for (const campo of ['titulo', 'descripcion', 'imagen']) if (!pagina.seo?.[campo]) falta(`seo.${campo}`)
    if (!pagina.portada?.titulo) falta('portada.titulo')
    if (!pagina.cierre) falta('cierre')
    if (rutas.filter((ruta) => ruta === pagina.ruta).length > 1) problemas.push(`${clave}: la ruta ${pagina.ruta} está repetida`)
    if (pagina.gama && !coloresCursor[pagina.gama]) problemas.push(`${clave}: la gama "${pagina.gama}" no tiene colores en utilidades/coloresCursor.js`)
    if (pagina.formaFotos && !formasFoto[pagina.formaFotos]) problemas.push(`${clave}: no existe la forma de foto "${pagina.formaFotos}"`)
    if (pagina.fondo && !fondos[pagina.fondo]) problemas.push(`${clave}: no existe el fondo "${pagina.fondo}"`)
    for (const seccion of pagina.orden ?? []) {
      if (SECCIONES_COMUNES.includes(seccion)) continue
      if (!pagina[seccion]) problemas.push(`${clave}: \`orden\` pide "${seccion}" y la página no lo tiene`)
      else if (!destacados[pagina[seccion].tipo]) problemas.push(`${clave}.${seccion}: no existe el bloque "${pagina[seccion].tipo}" (bloques/destacados/indice.js)`)
    }
    recorrer(pagina, clave)
  }
  return problemas
}
