import { useEffect, useRef } from 'react'
import { cuandoHayaCalma } from '@/utilidades/calma.js'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'
import { lunares, tiposConDibujo } from './datos.js'
import Patron from './Patron.jsx'

// Posición, tamaño y aspecto de un lunar según su tipo.
function estiloDe(l) {
  const base = { top: `${l.top}%`, [l.lado]: l.borde, width: l.tam, height: l.tam }
  if (l.tipo === 'lleno' || l.tipo === 'chico') return { ...base, background: l.color, opacity: l.tipo === 'chico' ? 0.85 : 0.42 }
  if (l.tipo === 'aro') {
    const punto = Math.max(7, l.tam * 0.11)
    return { ...base, border: `4px solid ${l.color}`, opacity: 0.85, background: `radial-gradient(circle, ${l.color} 0 ${punto}px, transparent ${punto + 1}px)` }
  }
  return { ...base, opacity: 0.8 }
}

// Círculos de colores (fucsia, rosa y vino) repartidos por toda la página, detrás del contenido.
// Se mecen apenas de costado y, al hacer scroll, cada uno se corre a distinta velocidad (efecto de profundidad).
// Con "reducir movimiento" en el sistema quedan quietos.
export default function Lunares() {
  const raiz = useRef(null)

  useEffect(() => {
    if (sinMovimiento()) return
    let ctx
    // Son puro adorno: el movimiento arranca cuando la página ya cargó y el navegador tiene un momento libre.
    const cancelar = cuandoHayaCalma(() => {
      ctx = gsap.context(() => {
        const elementos = gsap.utils.toArray('[data-lunar]')
        // Mecido de costado, para siempre.
        elementos.forEach((el, i) => gsap.to(el, { x: (i % 2 ? 1 : -1) * (6 + (i % 4) * 3), duration: 4 + (i % 5), ease: 'sine.inOut', repeat: -1, yoyo: true }))
        // Corrimiento vertical según el scroll: un solo seguimiento del scroll para todos, cada uno con su recorrido.
        const recorrido = gsap.timeline({ scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
        elementos.forEach((el, i) => recorrido.to(el, { y: (i % 2 ? -1 : 1) * (40 + (i % 5) * 25), ease: 'none', duration: 1 }, 0))
      }, raiz)
    })
    return () => {
      cancelar()
      ctx?.revert()
    }
  }, [])

  return (
    <div ref={raiz} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {lunares.map((l, i) => (
        <span key={i} data-lunar className="absolute rounded-full" style={estiloDe(l)}>
          {tiposConDibujo.includes(l.tipo) && <Patron tipo={l.tipo} color={l.color} />}
        </span>
      ))}
    </div>
  )
}
