import { useEffect, useState } from 'react'
import { m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import { botonPrimario, contenedor, flecha } from '@/utilidades/estilos.js'
import { registrarEvento } from '@/utilidades/medicion.js'
import { curva } from '@/utilidades/movimiento.js'

const CLAVE = 'lugia-me-gusta'

// Si el corazón ya se tocó en este navegador. El almacenamiento puede estar bloqueado: en ese caso no se recuerda y listo.
function yaTocado() {
  try {
    return localStorage.getItem(CLAVE) === '1'
  } catch {
    return false
  }
}

// Invitación a dejar una reseña en Google, visible para todos. El corazón con pulso solo agradece al tocarlo.
// Se recuerda en el navegador de cada persona; no hay contador público ni se guarda nada en un servidor.
export default function MeGusta() {
  const { pregunta, gracias, texto, boton, ayuda, urlResenas } = sitio.corazon
  // Arranca vacío, igual que en el HTML ya armado, y recién en el navegador se fija si ya se había tocado.
  const [tocado, setTocado] = useState(false)
  useEffect(() => setTocado(yaTocado()), [])
  const destino = urlResenas ?? sitio.contacto.urlMapa

  function tocar() {
    if (tocado) return
    setTocado(true)
    registrarEvento('me_gusta')
    try {
      localStorage.setItem(CLAVE, '1')
    } catch {
      // Sin almacenamiento: el corazón igual se llena en esta visita.
    }
  }

  return (
    <section className="bg-transparent pb-12 sm:pb-16">
      <div className={`${contenedor} flex flex-col items-center text-center`}>
        <Aparecer efecto="texto" className="flex flex-col items-center">
          <p className="font-display text-xl font-bold text-texto sm:text-2xl">{tocado ? gracias : pregunta}</p>

          <button
            type="button"
            onClick={tocar}
            aria-pressed={tocado}
            aria-label={ayuda}
            className="relative mt-5 flex h-20 w-20 items-center justify-center rounded-full bg-tinte text-brand transition-colors duration-300 ease-tocar hover:bg-borde focus-visible:ring-4 focus-visible:ring-brand/25 focus-visible:outline-none aria-pressed:cursor-default aria-pressed:bg-brand aria-pressed:text-sobre-brand"
          >
            {/* Onda que se abre al tocar */}
            {tocado && (
              <m.span
                aria-hidden="true"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.1, opacity: 0 }}
                transition={{ duration: 0.9, ease: curva.entrar }}
                className="pointer-events-none absolute inset-0 rounded-full bg-brand"
              />
            )}
            {/* Latido: suave y repetido mientras espera; un pulso grande al tocar */}
            <m.span
              animate={tocado ? { scale: [1, 1.4, 0.92, 1.12, 1] } : { scale: [1, 1.14, 1, 1.09, 1] }}
              transition={tocado ? { duration: 0.7, ease: curva.entrar } : { duration: 1.1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4 }}
              className="flex"
            >
              <Icono nombre="corazon" className={`h-9 w-9 ${tocado ? 'fill-current' : ''}`} />
            </m.span>
          </button>

          <div className="mt-5 flex flex-col items-center">
            <p className="max-w-md text-base leading-relaxed text-suave sm:text-[17px]">{texto}</p>
            <a href={destino} target="_blank" rel="noopener noreferrer" onClick={() => registrarEvento('resena_google_click')} className={`${botonPrimario} mt-5 min-h-[56px]`}>
              {boton}
              <Icono nombre="flecha" className={flecha} />
            </a>
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
