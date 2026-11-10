import { sitio } from '@/contenido/sitio.js'

// Estadísticas de visitas: Google Analytics 4 y Píxel de Meta. Los IDs se cargan en contenido/sitio.js → medicion.
// Solo funcionan en la página publicada: nunca con `npm run dev`.
const { ga4, metaPixel } = sitio.medicion || {}
export const medicionActiva = !import.meta.env.DEV && Boolean(ga4 || metaPixel)

export function iniciarMedicion() {
  if (!medicionActiva) return

  if (ga4) {
    // El script de Google pesa: se baja cuando la página ya cargó y está tranquila. Los eventos de mientras tanto quedan en la cola.
    cargarCuandoHayaCalma(`https://www.googletagmanager.com/gtag/js?id=${ga4}`)
    window.dataLayer = window.dataLayer || []
    // gtag necesita el objeto `arguments`, no un array: no cambiar por (...args).
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4)
  }

  if (metaPixel) {
    // Es el mismo arranque del código oficial de Meta: guarda los eventos hasta que carga fbevents.js.
    const fbq = (window.fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
    })
    if (!window._fbq) window._fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    cargarScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', metaPixel)
    fbq('track', 'PageView')
  }

  // Un solo listener para todos los botones de WhatsApp de la página.
  // En GA4 queda como evento `contacto_whatsapp` y en Meta como `Contact`.
  document.addEventListener('click', (e) => {
    if (!e.target.closest?.('a[href*="wa.me/"]')) return
    window.gtag?.('event', 'contacto_whatsapp')
    window.fbq?.('track', 'Contact')
  })
}

// Registra un evento en GA4. Nunca se mandan datos del paciente, solo el nombre del evento.
export const registrarEvento = (nombre) => window.gtag?.('event', nombre)

// Espera a que termine de cargar la página y a que el navegador tenga un momento libre (a lo sumo 3 segundos más).
function cargarCuandoHayaCalma(src) {
  const cargar = () => (window.requestIdleCallback ? window.requestIdleCallback(() => cargarScript(src), { timeout: 3000 }) : setTimeout(() => cargarScript(src), 1500))
  if (document.readyState === 'complete') cargar()
  else window.addEventListener('load', cargar, { once: true })
}

function cargarScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}
