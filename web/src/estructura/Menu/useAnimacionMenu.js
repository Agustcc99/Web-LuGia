import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, sinMovimiento } from '@/utilidades/gsap.js'
import { enlaces } from '@/utilidades/enlaces.js'

// Animaciones del menú de arriba con GSAP:
//  · La barra baja desde arriba al cargar, se esconde al bajar por la página y vuelve al subir.
//  · Detecta qué sección se está viendo. Devuelve su posición en `enlaces` (o -1 si arriba de todo no hay ninguna),
//    y el menú usa ese número para mover la pastilla.
// `header` es la ref de la barra y `abierto` indica si el menú del celular está desplegado (en ese caso la barra no se esconde).
export function useAnimacionMenu({ header, abierto }) {
  const [activo, setActivo] = useState(null) // href de la sección que se está viendo

  // Guardamos `abierto` en una ref para leer su valor actual dentro del scroll sin volver a crear la animación.
  const abiertoRef = useRef(false)
  abiertoRef.current = abierto

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sinMovimiento()) {
        gsap.from(header.current, { yPercent: -100, duration: 0.9, ease: 'power3.out', delay: 0.1 })
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const oculta = self.direction === 1 && self.scroll() > 240 && !abiertoRef.current
            // Si la página tiene franja de ubicación, se esconde solo el menú y la franja queda arriba de todo.
            const franja = header.current.querySelector('[data-franja]')?.offsetHeight ?? 0
            gsap.to(header.current, { y: oculta ? franja - header.current.offsetHeight : 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
          },
        })
      }

      // Una sección queda "activa" cuando pasa de la mitad de la pantalla.
      enlaces.forEach((l) => {
        const seccion = document.querySelector(l.href)
        if (!seccion) return
        ScrollTrigger.create({
          trigger: seccion,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setActivo(l.href),
        })
      })
      // Arriba de todo no hay ninguna activa.
      ScrollTrigger.create({ trigger: document.body, start: 'top top', end: '+=300', onLeaveBack: () => setActivo(null) })
    }, header)
    return () => ctx.revert()
  }, [header])

  return enlaces.findIndex((l) => l.href === activo)
}
