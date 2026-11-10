import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// La arcada se arma con una cuenta: los dientes se reparten sobre una media elipse, más angostos adelante y más anchos atrás.
const CENTRO = { x: 250, y: 170 }
const RADIO = { x: 150, y: 140 }
const CANTIDAD_DE_DIENTES = 14

const dientes = Array.from({ length: CANTIDAD_DE_DIENTES }, (_, i) => {
  const angulo = (-172 + i * (164 / (CANTIDAD_DE_DIENTES - 1))) * (Math.PI / 180)
  const ancho = 13 + 15 * Math.abs(Math.cos(angulo))
  const alto = 26 + 6 * Math.abs(Math.cos(angulo))
  const x = CENTRO.x + RADIO.x * Math.cos(angulo)
  const y = CENTRO.y + RADIO.y * Math.sin(angulo)
  // Cada diente gira para quedar de frente al centro de la arcada.
  return { x, y, ancho, alto, giro: (angulo * 180) / Math.PI + 90 }
})

// La placa es una banda que sigue el mismo arco, más ancha que los dientes y con los extremos redondeados.
// Se dibuja como una forma cerrada y translúcida para que los dientes se vean por debajo.
const MEDIO_ANCHO_PLACA = 23
const ANGULO_PLACA = { desde: (-169.6 * Math.PI) / 180, hasta: (-10.4 * Math.PI) / 180 }
const puntoPlaca = (angulo, desborde) => `${CENTRO.x + (RADIO.x + desborde) * Math.cos(angulo)} ${CENTRO.y + (RADIO.y + desborde) * Math.sin(angulo)}`
const arco = (desborde, sentido) => `A${RADIO.x + desborde} ${RADIO.y + desborde} 0 0 ${sentido} `
const punta = `A${MEDIO_ANCHO_PLACA} ${MEDIO_ANCHO_PLACA} 0 0 1 `
const trazoPlaca = [
  `M${puntoPlaca(ANGULO_PLACA.desde, MEDIO_ANCHO_PLACA)}`,
  `${arco(MEDIO_ANCHO_PLACA, 1)}${puntoPlaca(ANGULO_PLACA.hasta, MEDIO_ANCHO_PLACA)}`,
  `${punta}${puntoPlaca(ANGULO_PLACA.hasta, -MEDIO_ANCHO_PLACA)}`,
  `${arco(-MEDIO_ANCHO_PLACA, 0)}${puntoPlaca(ANGULO_PLACA.desde, -MEDIO_ANCHO_PLACA)}`,
  `${punta}${puntoPlaca(ANGULO_PLACA.desde, MEDIO_ANCHO_PLACA)}Z`,
].join('')

// Arcada vista desde arriba, con la placa encima. Al llegar al dibujo aparecen los dientes y la placa baja y se apoya.
// No es una ilustración médica exacta.
export function PlacaSobreArcada({ alt, partes }) {
  const dibujo = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
        .from('[data-diente]', { opacity: 0, duration: 0.35, stagger: 0.04 })
        .from('[data-pieza="placa"]', { y: -36, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0.5)
        .from('[data-pieza="nombres"]', { opacity: 0, duration: 0.4 }, 1.3)
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 500 215" role="img" aria-label={alt} className="mx-auto w-full max-w-[520px] overflow-visible">
      {dientes.map((diente) => (
        <g key={diente.x} data-diente>
          <rect
            x={diente.x - diente.ancho / 2}
            y={diente.y - diente.alto / 2}
            width={diente.ancho}
            height={diente.alto}
            rx="4"
            strokeWidth="1.5"
            transform={`rotate(${diente.giro} ${diente.x} ${diente.y})`}
            className="fill-fondo stroke-brand"
          />
        </g>
      ))}
      <g data-pieza="placa">
        <path d={trazoPlaca} strokeWidth="2" strokeLinejoin="round" className="fill-resalte/60 stroke-acento" />
      </g>
      <g data-pieza="nombres">
        <line x1="356" y1="71" x2="402" y2="46" strokeWidth="1" className="stroke-acento" />
        <text x="408" y="51" fontSize="16" fontWeight="600" className="fill-texto">
          {partes[0]}
        </text>
        <line x1="102" y1="150" x2="62" y2="172" strokeWidth="1" className="stroke-acento" />
        <text x="56" y="177" fontSize="16" fontWeight="600" textAnchor="end" className="fill-texto">
          {partes[1]}
        </text>
      </g>
    </svg>
  )
}

// Cuántos tramos tiene el zigzag, de arriba hacia abajo.
const TRAMOS = 26
const puntos = (fase) => Array.from({ length: TRAMOS + 1 }, (_, i) => `${(i + fase) % 2 === 0 ? 20 : 80} ${(i * 100) / TRAMOS}`)
const trazoZigzag = (fase) => `M${puntos(fase).join('L')}`

// Fondo de placas: dos líneas suaves en zigzag, a contrafase, por el costado derecho. Se dibujan hacia abajo siguiendo el borde de abajo de la ventana.
export function ZigzagSuave() {
  const contenedor = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contenedor.current,
        { clipPath: 'inset(0 -10% 100% -10%)' },
        { clipPath: 'inset(0 -10% 0% -10%)', ease: 'none', scrollTrigger: { trigger: contenedor.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } },
      )
    }, contenedor)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={contenedor} aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-4 sm:w-7 xl:w-24">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className="h-full w-full overflow-visible">
        <path d={trazoZigzag(0)} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="stroke-arco" />
        <path d={trazoZigzag(1)} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="stroke-resalte" />
      </svg>
    </div>
  )
}
