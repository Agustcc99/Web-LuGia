import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// Diente en corte, con sus capas señaladas. Al llegar al dibujo, el perno baja dentro de la raíz y encima encaja la corona.
// Es de una sola raíz porque el perno casi no se usa en molares. No es una ilustración médica exacta.
export function DienteEnCapas({ alt, partes, sobreOscuro = false }) {
  const dibujo = useRef(null)
  // Sobre una portada oscura, el contorno y los nombres van en colores claros.
  const contorno = sobreOscuro ? 'stroke-resalte' : 'stroke-brand'
  const linea = sobreOscuro ? 'stroke-resalte' : 'stroke-acento'
  const nombre = sobreOscuro ? 'fill-sobre-brand' : 'fill-texto'
  const lineas = [
    { x1: 158, y: 62 },
    { x1: 128, y: 108 },
    { x1: 116, y: 170 },
    { x1: 138, y: 222 },
  ]

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: dibujo.current, start: 'top 75%', once: true } })
        .from('[data-pieza="perno"]', { y: -30, duration: 0.8, ease: 'power3.out' })
        .from('[data-pieza="corona"]', { y: -44, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0.55)
        .from('[data-pieza="nombres"]', { opacity: 0, duration: 0.4 }, 1.1)
    }, dibujo)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={dibujo} viewBox="0 0 345 290" role="img" aria-label={alt} className="mx-auto w-full max-w-[460px] overflow-visible">
      <path d="M68 132C70 190 88 262 104 280Q110 286 116 280C132 262 150 190 152 132Z" strokeWidth="3" strokeLinejoin="round" className={`fill-fondo ${contorno}`} />
      <path d="M110 226V268" strokeWidth="5" strokeLinecap="round" className="stroke-resalte" />
      <g data-pieza="perno">
        <path d="M84 134L87 90Q110 78 133 90L136 134Z" strokeWidth="2" strokeLinejoin="round" className="fill-tinte stroke-acento" />
        <path d="M104 106H116L114 226Q110 232 106 226Z" className="fill-brand" />
      </g>
      <path
        data-pieza="corona"
        d="M64 134C54 104 54 66 68 48Q82 34 96 48Q110 58 124 48Q138 34 152 48C166 66 166 104 156 134H137L133 90Q110 78 87 90L83 134Z"
        strokeWidth="3"
        strokeLinejoin="round"
        className={`fill-superficie ${contorno}`}
      />
      <g data-pieza="nombres">
        {partes.map((parte, i) => (
          <g key={parte}>
            <line x1={lineas[i].x1} y1={lineas[i].y} x2="216" y2={lineas[i].y} strokeWidth="1" className={linea} />
            <text x="222" y={lineas[i].y + 5} fontSize="15" fontWeight="600" className={nombre}>
              {parte}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

const silueta = 'M8 34C2 22 6 8 18 8Q28 8 37 14Q46 8 56 8C68 8 72 22 66 34C60 48 60 74 50 82Q44 84 42 74C41 66 40 58 37 58C34 58 33 66 32 74Q30 84 24 82C14 74 14 48 8 34Z'

// Diente con un arreglo chico: queda casi todo sano. Se explica con el texto de al lado, por eso no se anuncia.
export function DienteConArreglo() {
  return (
    <svg viewBox="0 0 74 86" aria-hidden="true" className="h-[100px] w-[86px]">
      <path d={silueta} strokeWidth="2.5" strokeLinejoin="round" className="fill-fondo stroke-brand" />
      <path d="M28 13Q37 18 46 13L44 30Q37 34 30 30Z" strokeWidth="1.5" strokeLinejoin="round" className="fill-resalte stroke-acento" />
    </svg>
  )
}

// El mismo diente, con toda la parte visible cubierta por la corona.
export function DienteConCorona() {
  return (
    <svg viewBox="0 0 74 86" aria-hidden="true" className="h-[100px] w-[86px]">
      <path d={silueta} strokeWidth="2.5" strokeLinejoin="round" className="fill-fondo stroke-brand" />
      <path d="M8 34C2 22 6 8 18 8Q28 8 37 14Q46 8 56 8C68 8 72 22 66 34Q37 44 8 34Z" strokeWidth="2.5" strokeLinejoin="round" className="fill-brand stroke-brand" />
    </svg>
  )
}

// Tramos de la línea de fondo, de arriba hacia abajo: dónde va cada parte vertical, de 0 a 100 en el ancho de la franja.
const tramos = [55, 20, 70, 30, 80, 25, 60, 15, 65, 35, 75, 10]

// Fondo de prótesis: una línea fina en escalones, por el costado izquierdo. Cada tramo sube a medida que se llega a él.
export function LineaEnCapas() {
  const contenedor = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-tramo]').forEach((tramo) => {
        gsap.fromTo(
          tramo,
          // En % los cuatro lados, para que GSAP pueda pasar de un valor al otro. Los negativos dejan ver el grosor de la línea.
          // clamp: el último tramo termina de subir aunque la página no llegue a ese punto.
          { clipPath: 'inset(101% -10% -1% -10%)' },
          { clipPath: 'inset(-1% -10% -1% -10%)', ease: 'none', scrollTrigger: { trigger: tramo, start: 'top 85%', end: 'clamp(top 25%)', scrub: 0.6 } },
        )
      })
    }, contenedor)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={contenedor} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 flex w-4 flex-col sm:w-7 xl:w-24">
      {tramos.map((posicion, i) => (
        <div key={posicion} data-tramo className="flex-1">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className="h-full w-full overflow-visible">
            <path d={`M${posicion} 100V0H${tramos[i - 1] ?? posicion}`} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" className="stroke-arco" />
          </svg>
        </div>
      ))}
    </div>
  )
}
