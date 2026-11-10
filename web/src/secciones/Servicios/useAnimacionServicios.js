import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger, sinMovimiento, hayMouse } from '@/utilidades/gsap.js'

// Animaciones de las tarjetas de tratamientos con GSAP. `grilla` es la ref del contenedor de las tarjetas.
//  · Entran escalonadas: suben, giran apenas y rebotan.
//  · El número grande de cada tarjeta se corre a distinta velocidad al hacer scroll.
//  · Compu: al pasar el mouse la tarjeta se llena de vino desde donde entró el cursor, el ícono salta y aparece una línea de color.
//  · Celular: la tarjeta que pasa por el centro de la pantalla se llena igual, y se vacía al irse.
export function useAnimacionServicios(grilla) {
  useLayoutEffect(() => {
    if (!grilla.current || sinMovimiento()) return
    const conMouse = hayMouse()

    const ctx = gsap.context(() => {
      const tarjetas = gsap.utils.toArray('[data-tarjeta]')

      gsap.from(tarjetas, {
        y: 90,
        opacity: 0,
        scale: 0.88,
        rotate: (i) => (i % 2 ? 3 : -3),
        duration: 1,
        ease: 'back.out(1.5)',
        stagger: 0.12,
        scrollTrigger: { trigger: grilla.current, start: 'top 82%', once: true },
      })

      tarjetas.forEach((t, i) =>
        gsap.fromTo(
          t.querySelector('[data-numero]'),
          { y: 0 },
          { y: 28 + (i % 3) * 14, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } },
        ),
      )

      tarjetas.forEach((t) => {
        const relleno = t.querySelector('[data-relleno]')
        const icono = t.querySelector('[data-icono]')
        const linea = t.querySelector('[data-linea]')

        // `x` e `y` son el punto de la tarjeta desde donde se llena o se vacía.
        const llenar = (x, y) => {
          t.classList.add('activa')
          gsap.fromTo(relleno, { clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(160% at ${x}px ${y}px)`, duration: 0.7, ease: 'power3.out', overwrite: true })
          gsap.fromTo(icono, { y: 0, rotate: 0 }, { keyframes: [{ y: -10, rotate: -12, duration: 0.18 }, { y: 0, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }], overwrite: true })
          gsap.to(linea, { scaleX: 1, duration: 0.6, ease: 'power3.out' })
          gsap.to(t, { y: -8, duration: 0.4, ease: 'power3.out' })
        }
        const vaciar = (x, y) => {
          t.classList.remove('activa')
          gsap.to(relleno, { clipPath: `circle(0px at ${x}px ${y}px)`, duration: 0.5, ease: 'power3.in', overwrite: true })
          gsap.to(linea, { scaleX: 0, duration: 0.4, ease: 'power3.in' })
          gsap.to(t, { y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
        }

        if (conMouse) {
          const puntoDelMouse = (e) => {
            const r = t.getBoundingClientRect()
            return [e.clientX - r.left, e.clientY - r.top]
          }
          t.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && llenar(...puntoDelMouse(e)))
          t.addEventListener('pointerleave', (e) => e.pointerType !== 'touch' && vaciar(...puntoDelMouse(e)))
        } else {
          ScrollTrigger.create({
            trigger: t,
            start: 'top 62%',
            end: 'bottom 38%',
            onEnter: () => llenar(t.offsetWidth / 2, t.offsetHeight),
            onEnterBack: () => llenar(t.offsetWidth / 2, 0),
            onLeave: () => vaciar(t.offsetWidth / 2, 0),
            onLeaveBack: () => vaciar(t.offsetWidth / 2, t.offsetHeight),
          })
        }
      })
    }, grilla)

    return () => ctx.revert()
  }, [grilla])
}
