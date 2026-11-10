import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// Encía: una línea ondulada. Lo que queda debajo es el hueso, donde van la raíz del diente y el implante.
const lineaEncia = 'M0 104Q40 94 80 102T160 102T240 100T330 104'
const diente = 'M172 100c-6-30-2-62 14-70 10-5 16 4 24 4s14-9 24-4c16 8 20 40 14 70l-10 62c-2 12-12 12-14 0l-6-40c-2-10-14-10-16 0l-6 40c-2 12-12 12-14 0z'
const corona = 'M56 100c-6-30-2-62 14-70 10-5 16 4 24 4s14-9 24-4c16 8 20 40 14 70z'
const cuerpoImplante = 'M80 112h28l-5 66q-9 10-18 0z'
// Las vueltas de la rosca, de arriba hacia abajo.
const vueltas = ['M77 124h34', 'M78 137h32', 'M79 150h30', 'M80 163h28']

// Implante con su corona al lado de un diente natural. La corona va en el color de marca y el implante en el acento,
// igual que las dos columnas del bloque "Quién hace cada parte".
// Al llegar al dibujo, las vueltas de la rosca se trazan de a una y un aro marca la unión con la corona.
// Con "reducir movimiento" queda completo y quieto. No es una ilustración médica exacta.
export function ImplanteJuntoADiente({ alt, partes }) {
  const dibujo = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
        .fromTo('[data-vuelta]', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.22 })
        .fromTo('[data-union]', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' })
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 330 215" role="img" aria-label={alt} className="mx-auto w-full max-w-[460px] overflow-visible">
      <path d={`${lineaEncia}V215H0Z`} className="fill-tinte" />
      <path d={diente} strokeWidth="6" strokeLinejoin="round" className="fill-fondo stroke-arco" />
      <path d={diente} strokeWidth="2" strokeLinejoin="round" className="fill-none stroke-brand" />
      <path d={corona} strokeWidth="3" strokeLinejoin="round" className="fill-fondo stroke-brand" />
      <rect x="84" y="100" width="20" height="12" className="fill-acento" />
      <path d={cuerpoImplante} strokeWidth="2.5" strokeLinejoin="round" className="fill-fondo stroke-acento" />
      {vueltas.map((vuelta) => (
        <path key={vuelta} data-vuelta d={vuelta} pathLength="1" strokeDasharray="1" strokeWidth="3.5" strokeLinecap="round" className="fill-none stroke-acento" />
      ))}
      <circle data-union cx="94" cy="104" r="16" strokeWidth="3" className="fill-none stroke-resalte" />
      <path d={lineaEncia} strokeWidth="2.5" strokeLinecap="round" className="fill-none stroke-arco" />
      <g data-pieza="nombres">
        <text x="18" y="18" fontSize="15" fontWeight="600" className="fill-brand">
          {partes[0]}
        </text>
        <text x="6" y="200" fontSize="15" fontWeight="600" className="fill-acento">
          {partes[1]}
        </text>
        <text x="196" y="18" fontSize="15" fontWeight="600" className="fill-texto">
          {partes[2]}
        </text>
      </g>
    </svg>
  )
}

// Fondo de implantes: una línea recta y punteada que baja por el costado, con marcas cortas cada tanto, como una regla.
// Las marcas se corren despacio hacia abajo. En celular es más corta. Con "reducir movimiento" quedan quietas.
const SEPARACION_MARCAS = 56

export function EjeConMarcas() {
  const marcas = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(marcas.current, { backgroundPositionY: 0 }, { backgroundPositionY: SEPARACION_MARCAS, duration: 7, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-[30%] bottom-[30%] left-1.5 -z-10 w-3 sm:inset-y-0 sm:left-6 sm:w-5 lg:left-12">
      <span className="absolute inset-y-0 left-1/2 border-l-2 border-dashed border-resalte" />
      <span ref={marcas} className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,var(--color-arco)_0_2px,transparent_2px_56px)] opacity-50" />
    </div>
  )
}
