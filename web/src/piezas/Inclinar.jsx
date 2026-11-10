import { useEffect, useRef, useState } from 'react'
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { resorte } from '@/utilidades/movimiento.js'

// Inclina el contenido en 3D (hasta `max` grados).
//  · Con mouse: sigue al cursor.
//  · En el celular: se inclina de a poco mientras se hace scroll.
//  · Con "reducir movimiento" en el sistema: queda quieto.
// Los hijos pueden separarse en profundidad con la clase [transform:translateZ(..)].
export default function Inclinar({ as = 'div', max = 6, className = '', children, ...props }) {
  const Elemento = m[as]
  const reducir = useReducedMotion()
  const ref = useRef(null)
  const [conMouse, setConMouse] = useState(false)

  useEffect(() => {
    setConMouse(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  // Inclinación con el mouse: la posición del cursor (de -0.5 a 0.5) se convierte en grados.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, resorte.inclinar)
  const y = useSpring(py, resorte.inclinar)
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max])

  // Inclinación por scroll: la pieza se acomoda mientras cruza la pantalla.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const avance = useSpring(scrollYProgress, resorte.inclinar)
  const scrollRotateX = useTransform(avance, [0, 0.5, 1], [max * 0.9, 0, -max * 0.9])
  const scrollRotateY = useTransform(avance, [0, 0.5, 1], [-max * 0.7, 0, max * 0.7])

  const conMouseActivo = conMouse && !reducir
  const porScroll = !conMouse && !reducir

  const seguirMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const volverAlCentro = () => {
    px.set(0)
    py.set(0)
  }

  const perspectiva = { transformPerspective: 900, transformStyle: 'preserve-3d' }
  const estilo = conMouseActivo
    ? { rotateX, rotateY, ...perspectiva }
    : porScroll
      ? { rotateX: scrollRotateX, rotateY: scrollRotateY, ...perspectiva }
      : undefined

  return (
    <Elemento
      ref={ref}
      onPointerMove={conMouseActivo ? seguirMouse : undefined}
      onPointerLeave={conMouseActivo ? volverAlCentro : undefined}
      style={estilo}
      className={className}
      {...props}
    >
      {children}
    </Elemento>
  )
}
