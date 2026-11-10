import { useEffect, useLayoutEffect } from 'react'
import { gsap, sinMovimiento } from '@/utilidades/gsap.js'

// Animaciones del formulario de turno con GSAP.
//  · Al llegar a la sección: el formulario sube y se endereza, los 4 círculos de pasos aparecen uno tras otro
//    y las ventajas de la izquierda entran escalonadas.
//  · En cada paso nuevo: las opciones entran con un pequeño rebote, una tras otra.
//  · Al aceptar los términos: el botón de enviar "se despierta" con un salto elástico.
// Devuelve `animarPaso`, que se engancha al cambio de paso (onAnimationStart).
export function useAnimacionPreAdmision({ raiz, pasoRef, enviarRef, acepta }) {
  useLayoutEffect(() => {
    if (sinMovimiento()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '#formulario-turno', start: 'top 88%', once: true } })
      tl.from('#formulario-turno', { y: 56, opacity: 0, rotateX: 7, transformPerspective: 900, transformOrigin: '50% 100%', duration: 0.95, ease: 'power3.out', clearProps: 'transform' })
        .from('#formulario-turno ol li > span:first-child > span:first-child', { scale: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(2.6)' }, '-=0.5')
        .from('#formulario-turno ol li > span:last-child', { opacity: 0, y: 8, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '<0.05')
        .from('#pedir-turno ul li', { x: -18, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, '-=0.7')
    }, raiz)
    return () => ctx.revert()
  }, [raiz])

  useEffect(() => {
    if (!acepta || sinMovimiento() || !enviarRef.current) return
    gsap.fromTo(enviarRef.current, { scale: 0.9, y: 6 }, { scale: 1, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
  }, [acepta, enviarRef])

  return function animarPaso(definicion) {
    // Solo cuando el paso termina de aparecer (no mientras se va el anterior).
    if (sinMovimiento() || !pasoRef.current || definicion?.opacity !== 1) return
    gsap.from(pasoRef.current.querySelectorAll('button[aria-pressed], label, textarea, pre'), {
      y: 14,
      scale: 0.94,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(2)',
      clearProps: 'transform,opacity',
    })
  }
}
