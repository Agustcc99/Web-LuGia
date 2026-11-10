import { sitio } from '@/contenido/sitio.js'

// Links a las secciones de la página. Los usan el menú de arriba y el pie, así quedan siempre iguales.
// Una sección que no existe en contenido/sitio.js no aparece.
const nombreDe = (seccion) => seccion?.etiqueta ?? seccion?.titulo

// Dirección de la página principal, para los links que salen desde otra página.
export const RUTA_PRINCIPAL = '/'

export const enlaces = [
  { href: '#servicios', etiqueta: nombreDe(sitio.servicios), visible: true },
  { href: '#profesional', etiqueta: nombreDe(sitio.profesional), visible: Boolean(sitio.profesional) },
  { href: '#nosotros', etiqueta: nombreDe(sitio.nosotros), visible: Boolean(sitio.nosotros) },
  { href: '#galeria', etiqueta: nombreDe(sitio.galeria), visible: sitio.galeria?.imagenes.length > 0 },
  { href: '#contacto', etiqueta: nombreDe(sitio.contacto), visible: true },
  { href: '#faq', etiqueta: sitio.preguntas.enlaceMenu, visible: sitio.preguntas.lista.length > 0 },
].filter((enlace) => enlace.visible)

// Desde otra página, los mismos links llevan a las secciones de la principal: "/#servicios" en vez de "#servicios".
export const enlacesDesde = (inicio = '') => enlaces.map((enlace) => ({ ...enlace, href: `${inicio}${enlace.href}` }))
