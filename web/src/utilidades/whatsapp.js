import { sitio } from '@/contenido/sitio.js'

export function urlWhatsapp(mensaje = sitio.whatsapp.mensaje) {
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`
}

// Atributos de un link que abre WhatsApp en otra pestaña. Uso: <a {...enlaceWhatsapp()}>
export function enlaceWhatsapp(mensaje) {
  return { href: urlWhatsapp(mensaje), target: '_blank', rel: 'noopener noreferrer' }
}

// Botón principal de la página: lleva al formulario de turno si existe; si no, a WhatsApp.
// `inicio` es "/" en las páginas que no son la principal, porque el formulario está en la principal.
export function enlacePedirTurno(inicio = '') {
  if (sitio.preadmision) return { href: `${inicio}#pedir-turno` }
  return enlaceWhatsapp()
}
