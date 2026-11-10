import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

const encia = 'M8 122Q34 113 60 121T110 121T160 121T212 122V250H8Z'
const lineaEncia = 'M8 122Q34 113 60 121T110 121T160 121T212 122'
const dienteDeLeche = 'M78 122C70 100 72 70 84 58C94 48 102 56 110 58C118 56 126 48 136 58C148 70 150 100 142 122L138 146Q133 156 128 146L124 134Q110 126 96 134L92 146Q87 156 82 146Z'
const dientePermanente = 'M70 238C62 216 64 192 78 180C90 170 100 178 110 180C120 178 130 170 142 180C156 192 158 216 150 238Z'
// Dónde termina la línea de cada nombre: diente de leche, encía y diente permanente.
const lineas = [
  { x1: 148, y: 84 },
  { x1: 212, y: 122 },
  { x1: 158, y: 212 },
]

// Corte de la encía: arriba el diente de leche y, debajo, el permanente que se está formando y espera su lugar.
// Al llegar al dibujo, el permanente sube un poco y aparece la flecha. Con "reducir movimiento" queda completo y quieto.
// No es una ilustración médica exacta.
export function DienteDeLeche({ alt, partes }) {
  const dibujo = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
        .fromTo('[data-permanente]', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
        .fromTo('[data-flecha]', { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 400 250" role="img" aria-label={alt} className="mx-auto w-full max-w-[480px]">
      <path d={encia} className="fill-tinte" />
      <path data-permanente d={dientePermanente} strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="6 5" className="fill-fondo stroke-acento" />
      <path d={dienteDeLeche} strokeWidth="3" strokeLinejoin="round" className="fill-fondo stroke-brand" />
      <path d={lineaEncia} strokeWidth="2.5" strokeLinecap="round" className="fill-none stroke-arco" />
      <path data-flecha d="M110 173V153M103 160L110 152L117 160" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-acento" />
      {partes.map((parte, i) => (
        <g key={parte}>
          <line x1={lineas[i].x1} y1={lineas[i].y} x2="230" y2={lineas[i].y} strokeWidth="1" className="stroke-acento" />
          <text x="236" y={lineas[i].y + 5} fontSize="15" fontWeight="600" className="fill-texto">
            {parte}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Formas blandas repartidas por los costados. Cada una tiene su lugar, su tamaño y cuánto se corre al hacer scroll.
const formas = [
  { clases: 'top-[16%] -right-10 h-40 w-44 sm:h-56 sm:w-64', borde: '58% 42% 47% 53% / 52% 60% 40% 48%', color: 'bg-tinte', recorrido: -90 },
  { clases: 'top-[33%] -left-14 h-36 w-36 sm:h-52 sm:w-52', borde: '46% 54% 62% 38% / 58% 44% 56% 42%', color: 'bg-superficie', recorrido: 70 },
  { clases: 'top-[50%] -right-8 h-24 w-28 sm:h-36 sm:w-40', borde: '62% 38% 44% 56% / 48% 58% 42% 52%', color: 'border-2 border-resalte', recorrido: -60 },
  { clases: 'top-[68%] -left-10 h-28 w-32 sm:h-40 sm:w-44', borde: '40% 60% 52% 48% / 62% 42% 58% 38%', color: 'border-2 border-borde', recorrido: 80 },
  { clases: 'top-[84%] -right-12 h-40 w-40 sm:h-52 sm:w-56', borde: '54% 46% 38% 62% / 44% 56% 44% 56%', color: 'bg-tinte', recorrido: -70 },
]

// Fondo de odontopediatría: formas redondeadas que flotan despacio, a distinta velocidad, al hacer scroll.
export function FormasRedondeadas() {
  const contenedor = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-forma]').forEach((forma, i) => {
        gsap.to(forma, { y: formas[i].recorrido, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
      })
    }, contenedor)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={contenedor} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {formas.map((forma) => (
        <span key={forma.clases} data-forma className={`absolute ${forma.clases} ${forma.color}`} style={{ borderRadius: forma.borde }} />
      ))}
    </div>
  )
}
