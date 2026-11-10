import { useLayoutEffect } from 'react'
import { ScrollTrigger, sinMovimiento } from '@/utilidades/gsap.js'

// "Enciende" cada paso del proceso al llegar a él: el estilo del paso encendido está en Proceso.jsx (data-encendido).
// Sin JavaScript, o con "reducir movimiento", todos los pasos quedan encendidos.
export function useAnimacionProceso(lista) {
  useLayoutEffect(() => {
    const pasos = [...lista.current.querySelectorAll('[data-paso]')]
    if (sinMovimiento()) {
      pasos.forEach((paso) => (paso.dataset.encendido = 'si'))
      return
    }
    const disparadores = pasos.map((paso) =>
      ScrollTrigger.create({ trigger: paso, start: 'top 82%', once: true, onEnter: () => (paso.dataset.encendido = 'si') }),
    )
    return () => disparadores.forEach((disparador) => disparador.kill())
  }, [lista])
}
