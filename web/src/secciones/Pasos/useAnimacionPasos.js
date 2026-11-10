import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, sinMovimiento } from '@/utilidades/gsap.js'

// Animaciones de "Cómo pedir turno" con GSAP. `raiz` es la ref de la sección.
//  · Una línea vino se va llenando con el scroll (en compu de costado a costado, en celular de arriba abajo).
//  · Cada círculo con número se enciende cuando la línea lo alcanza.
//  · Las tarjetas entran una detrás de otra.
//  · Al pasar el mouse la tarjeta sube y el ícono da una vuelta. En el celular el ícono gira al aparecer.
export function useAnimacionPasos(raiz) {
  useLayoutEffect(() => {
    if (!raiz.current || sinMovimiento()) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ ancho: '(min-width: 768px)' }, (c) => {
        const horizontal = c.conditions.ancho
        const pasos = gsap.utils.toArray('[data-paso]')
        const nodos = gsap.utils.toArray('[data-nodo]')

        // Línea que se llena con el scroll
        gsap.fromTo('[data-progreso]', horizontal ? { scaleX: 0 } : { scaleY: 0 }, {
          scaleX: 1,
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-lista]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
        })

        pasos.forEach((p, i) => {
          const nodo = nodos[i]
          const tarjeta = p.querySelector('[data-tarjeta]')
          const icono = p.querySelector('[data-icono]')
          const girarIcono = (duracion, retraso = 0) => gsap.fromTo(icono, { rotate: 0 }, { rotate: 360, duration: duracion, ease: 'back.out(1.6)', delay: retraso })

          // La tarjeta entra desde abajo, con un giro leve (el del medio entra derecho)
          gsap.from(tarjeta, {
            y: 60,
            opacity: 0,
            scale: 0.92,
            rotate: i === 1 ? 0 : i === 0 ? -2 : 2,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: p, start: 'top 82%', once: true },
          })

          // El círculo se llena de vino y rebota cuando la línea llega
          gsap
            .timeline({ scrollTrigger: { trigger: p, start: horizontal ? 'top 70%' : 'top 62%', toggleActions: 'play none none reverse' } })
            .to(nodo, { backgroundColor: '#7a1f3d', color: '#ffffff', borderColor: '#7a1f3d', duration: 0.3 }, 0)
            .fromTo(nodo, { scale: 0.7 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, 0)

          // Celular: el ícono da una vuelta cuando el paso aparece en pantalla
          ScrollTrigger.create({
            trigger: p,
            start: 'top 75%',
            once: true,
            onEnter: () => !window.matchMedia('(hover: hover)').matches && girarIcono(0.8, 0.2),
          })

          // Compu: la tarjeta sube y el ícono gira al pasar el mouse
          p.addEventListener('pointerenter', (e) => {
            if (e.pointerType === 'touch') return
            gsap.to(tarjeta, { y: -8, duration: 0.4, ease: 'power3.out' })
            girarIcono(0.7)
          })
          p.addEventListener('pointerleave', () => gsap.to(tarjeta, { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' }))
        })
      })
    }, raiz)

    return () => ctx.revert()
  }, [raiz])
}
