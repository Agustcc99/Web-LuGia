import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'
import { contornoDiente } from './blanqueamiento.jsx'

// Encía: una línea ondulada que tapa la base del diente. Se dibuja encima del diente para que las raíces queden adentro.
const encia = 'M0 100Q40 88 80 98T160 98T240 96T330 98V150H0Z'
const lineaEncia = 'M0 100Q40 88 80 98T160 98T240 96T330 98'

// Dónde se junta el sarro: pegado al diente, justo arriba de la encía.
const puntosDeSarro = [
  { x: 74, y: 88 },
  { x: 100, y: 95 },
  { x: 156, y: 88 },
]

// Diente de frente con la encía y el sarro señalados. Al llegar al dibujo, una onda chica pasa por cada punto de sarro y este se desvanece, uno tras otro.
// Con "reducir movimiento" el sarro queda a la vista. No es una ilustración médica exacta.
export function DienteConEncia({ alt, partes }) {
  const dibujo = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      const linea = gsap.timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
      gsap.utils.toArray('[data-sarro]').forEach((punto, i) => {
        const onda = `[data-onda="${i}"]`
        linea
          .fromTo(onda, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: '0% 50%', duration: 0.35, ease: 'power2.out' }, i * 0.45)
          .to(onda, { opacity: 0, duration: 0.3 }, i * 0.45 + 0.35)
          .to(punto, { opacity: 0.2, scale: 0.6, transformOrigin: '50% 50%', duration: 0.4, ease: 'power2.in' }, i * 0.45 + 0.3)
      })
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 330 150" role="img" aria-label={alt} className="mx-auto w-full max-w-[420px] overflow-visible">
      <path d={contornoDiente} strokeWidth="8" strokeLinejoin="round" className="fill-fondo stroke-arco" />
      <path d={contornoDiente} strokeWidth="2" strokeLinejoin="round" className="fill-none stroke-brand" />
      {puntosDeSarro.map((punto, i) => (
        <g key={punto.x}>
          <circle data-sarro cx={punto.x} cy={punto.y} r="5" className="fill-acento" />
          {/* Dos arcos que salen del punto, como la vibración del ultrasonido. */}
          <path data-onda={i} d={`M${punto.x + 9} ${punto.y - 6}q6 6 0 12M${punto.x + 15} ${punto.y - 10}q10 10 0 20`} strokeWidth="1.5" strokeLinecap="round" className="fill-none stroke-acento opacity-0" />
        </g>
      ))}
      <path d={encia} className="fill-tinte" />
      <path d={lineaEncia} strokeWidth="3" strokeLinecap="round" className="fill-none stroke-arco" />
      <g data-pieza="nombres">
        <line x1="156" y1="88" x2="226" y2="46" strokeWidth="1" className="stroke-acento" />
        <text x="232" y="51" fontSize="15" fontWeight="600" className="fill-texto">
          {partes[1]}
        </text>
        <line x1="232" y1="116" x2="262" y2="130" strokeWidth="1" className="stroke-acento" />
        <text x="266" y="135" fontSize="15" fontWeight="600" className="fill-texto">
          {partes[0]}
        </text>
      </g>
    </svg>
  )
}

// Versión chica para la tarjeta de la comparación: el mismo diente con la encía, sin nombres ni movimiento.
export function DienteConEnciaChico() {
  return (
    <svg viewBox="40 0 150 140" aria-hidden="true" className="h-full w-full">
      <path d={contornoDiente} strokeWidth="8" strokeLinejoin="round" className="fill-fondo stroke-arco" />
      <path d={contornoDiente} strokeWidth="2" strokeLinejoin="round" className="fill-none stroke-brand" />
      <path d="M0 100Q40 88 80 98T160 98T240 96V140H0Z" className="fill-tinte" />
      <path d="M0 100Q40 88 80 98T160 98T240 96" strokeWidth="3" strokeLinecap="round" className="fill-none stroke-arco" />
    </svg>
  )
}

// Fondo de limpieza: dos líneas onduladas muy finas, una por lado, que se deslizan despacio. En celular se ve una sola.
// Con "reducir movimiento" quedan quietas. La onda se repite cada 30 unidades: al correrla 60 vuelve a empezar sin saltos.
// La línea va de -60 a 300 para cubrir la ventana (0 a 120) hacia los dos lados.
const onda = `M-60 20Q-45 4 -30 20${Array.from({ length: 11 }, (_, i) => `T${i * 30} 20`).join('')}`
const ondas = [
  { clases: 'top-[30%] left-0 w-28 sm:w-44', sentido: -1 },
  { clases: 'top-[62%] right-0 hidden w-44 sm:block', sentido: 1 },
]

export function OndasSuaves() {
  const contenedor = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-onda-fondo]').forEach((trazo, i) => {
        gsap.fromTo(trazo, { x: 0 }, { x: ondas[i].sentido * 60, duration: 9, ease: 'none', repeat: -1 })
      })
    }, contenedor)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={contenedor} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {ondas.map((una) => (
        <svg key={una.clases} viewBox="0 0 120 40" preserveAspectRatio="none" className={`absolute h-10 overflow-hidden opacity-60 ${una.clases}`}>
          <path data-onda-fondo d={onda} strokeWidth="1.5" strokeLinecap="round" className="fill-none stroke-arco" />
        </svg>
      ))}
    </div>
  )
}
