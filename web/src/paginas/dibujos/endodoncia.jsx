import { useLayoutEffect, useRef } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// Esquema simple de un diente por dentro, con sus partes señaladas. No es una ilustración médica exacta.
export function Diente({ alt, partes }) {
  const lineas = [
    { x1: 170, y1: 36, y2: 36 },
    { x1: 158, y1: 84, y2: 84 },
    { x1: 130, y1: 100, y2: 132 },
    { x1: 130, y1: 186, y2: 186 },
  ]
  return (
    <svg viewBox="0 0 330 250" role="img" aria-label={alt} className="mx-auto w-full max-w-[460px]">
      <path
        d="M50 42C72 18 98 34 115 42C132 34 158 18 180 42C197 62 190 100 174 128C164 150 166 196 154 226C148 240 136 234 134 218C131 196 127 170 115 170C103 170 99 196 96 218C94 234 82 240 76 226C64 196 66 150 56 128C40 100 33 62 50 42Z"
        strokeWidth="3"
        className="fill-fondo stroke-brand"
      />
      <path
        d="M62 50C78 36 100 46 115 54C130 46 152 36 168 50C180 66 174 98 160 122C150 142 152 186 146 214C143 222 141 218 140 210C137 182 134 154 115 154C96 154 93 182 90 210C89 218 87 222 84 214C78 186 80 142 70 122C56 98 50 66 62 50Z"
        strokeWidth="1.5"
        className="fill-superficie stroke-arco"
      />
      <path
        d="M92 76C102 68 128 68 138 76C146 90 138 112 130 124C128 150 130 178 134 204L128 204C124 176 122 150 115 144C108 150 106 176 102 204L96 204C100 178 102 150 100 124C92 112 84 90 92 76Z"
        className="fill-acento"
      />
      {partes.map((parte, i) => (
        <g key={parte}>
          <line x1={lineas[i].x1} y1={lineas[i].y1} x2="222" y2={lineas[i].y2} strokeWidth="1" className="stroke-acento" />
          <text x="228" y={lineas[i].y2 + 5} fontSize="15" fontWeight="600" className="fill-texto">
            {parte}
          </text>
        </g>
      ))}
    </svg>
  )
}

// Fondo de endodoncia: una línea rosa, como un conducto, que baja por el costado y se dibuja al hacer scroll.
export function LineaConducto() {
  const linea = useRef(null)

  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        linea.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.6 } },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={linea} aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-16 sm:w-32 lg:w-48">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full" fill="none">
        <path
          d="M70 0C95 60 40 120 62 190C85 260 35 320 58 400C80 470 40 540 66 610C90 680 42 750 60 820C75 880 55 940 65 1000"
          className="stroke-resalte"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
