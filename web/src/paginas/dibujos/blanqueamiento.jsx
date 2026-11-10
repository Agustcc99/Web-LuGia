import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// Estrella de cuatro puntas con los lados curvos, centrada en (x, y). Es el brillo de todo el dibujo y del fondo.
const estrella = (x, y, radio) => `M${x} ${y - radio}Q${x} ${y} ${x + radio} ${y}Q${x} ${y} ${x} ${y + radio}Q${x} ${y} ${x - radio} ${y}Q${x} ${y} ${x} ${y - radio}Z`

// Contorno del diente de frente. El esmalte es el trazo grueso de afuera, y la dentina, lo que queda adentro.
export const contornoDiente = 'M70 28C86 14 104 22 115 28C126 22 144 14 160 28C174 42 170 70 160 88C154 98 154 112 148 124C144 132 138 130 136 122C133 112 126 104 115 104C104 104 97 112 94 122C92 130 86 132 82 124C76 112 76 98 70 88C60 70 56 42 70 28Z'

// Los brillos de cada versión del dibujo: lugar y tamaño.
const brillosGrande = [
  { x: 200, y: 26, radio: 11 },
  { x: 40, y: 62, radio: 8 },
  { x: 190, y: 82, radio: 7 },
]

// Diente con el esmalte y la dentina señalados. Al llegar al dibujo, los brillos titilan una vez, uno tras otro.
// No es una ilustración médica exacta.
export function DienteConBrillos({ alt, partes }) {
  const dibujo = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
        .from('[data-brillo]', { scale: 0, opacity: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)', stagger: 0.25 })
        .from('[data-pieza="nombres"]', { opacity: 0, duration: 0.4 }, 0.4)
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 330 170" role="img" aria-label={alt} className="mx-auto w-full max-w-[420px] overflow-visible">
      <path d={contornoDiente} strokeWidth="8" strokeLinejoin="round" className="fill-fondo stroke-arco" />
      <path d={contornoDiente} strokeWidth="2" strokeLinejoin="round" className="fill-none stroke-brand" />
      {brillosGrande.map((brillo) => (
        <path key={`${brillo.x}-${brillo.y}`} data-brillo d={estrella(brillo.x, brillo.y, brillo.radio)} strokeWidth="1.5" strokeLinejoin="round" className="fill-resalte stroke-acento" />
      ))}
      <g data-pieza="nombres">
        <line x1="166" y1="42" x2="226" y2="56" strokeWidth="1" className="stroke-acento" />
        <text x="232" y="61" fontSize="15" fontWeight="600" className="fill-texto">
          {partes[0]}
        </text>
        <line x1="115" y1="72" x2="226" y2="116" strokeWidth="1" className="stroke-acento" />
        <text x="232" y="121" fontSize="15" fontWeight="600" className="fill-texto">
          {partes[1]}
        </text>
      </g>
    </svg>
  )
}

// Versión chica para las tarjetas de la comparación: el mismo diente, sin nombres y con un brillo grande o uno chico.
function DienteChico({ radioBrillo }) {
  return (
    <svg viewBox="40 0 150 140" aria-hidden="true" className="h-full w-full">
      <path d={contornoDiente} strokeWidth="8" strokeLinejoin="round" className="fill-fondo stroke-arco" />
      <path d={contornoDiente} strokeWidth="2" strokeLinejoin="round" className="fill-none stroke-brand" />
      <path d={estrella(162, 30, radioBrillo)} strokeWidth="1.5" strokeLinejoin="round" className="fill-resalte stroke-acento" />
    </svg>
  )
}
export const DienteConBrilloGrande = () => <DienteChico radioBrillo={20} />
export const DienteConBrilloChico = () => <DienteChico radioBrillo={10} />

// Lugar, tamaño, ritmo y lado de cada destello del fondo. En celular se ven solo los primeros de cada lado.
const destellos = [
  { clases: 'top-[14%] right-2 sm:right-8', radio: 9, espera: 0, soloCompu: false },
  { clases: 'top-[24%] left-1 sm:left-6', radio: 6, espera: 1.4, soloCompu: false },
  { clases: 'top-[38%] right-6 sm:right-20', radio: 5, espera: 0.7, soloCompu: true },
  { clases: 'top-[52%] left-3 sm:left-14', radio: 10, espera: 2.1, soloCompu: false },
  { clases: 'top-[64%] right-1 sm:right-10', radio: 6, espera: 0.4, soloCompu: false },
  { clases: 'top-[76%] left-8 sm:left-24', radio: 5, espera: 1.8, soloCompu: true },
  { clases: 'top-[88%] right-5 sm:right-16', radio: 8, espera: 1.1, soloCompu: false },
]

// Fondo de blanqueamiento: destellos chicos por los costados que se prenden y se apagan de a uno, despacio.
// Con "reducir movimiento" quedan quietos y tenues.
export function DestellosChicos() {
  const contenedor = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-destello]').forEach((destello, i) => {
        gsap.fromTo(
          destello,
          { opacity: 0.15, scale: 0.7, transformOrigin: '50% 50%' },
          { opacity: 1, scale: 1, duration: 1.6, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 1.2, delay: destellos[i].espera },
        )
      })
    }, contenedor)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={contenedor} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {destellos.map((destello) => (
        <svg
          key={destello.clases}
          data-destello
          viewBox="-12 -12 24 24"
          style={{ width: destello.radio * 3, height: destello.radio * 3 }}
          className={`absolute ${destello.clases} opacity-40 ${destello.soloCompu ? 'hidden sm:block' : ''}`}
        >
          <path d={estrella(0, 0, 10)} strokeWidth="1" strokeLinejoin="round" className="fill-resalte stroke-arco" />
        </svg>
      ))}
    </div>
  )
}
