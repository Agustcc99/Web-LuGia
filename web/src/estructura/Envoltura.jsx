import { StrictMode } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

// Envuelve todas las páginas. Tiene que ser igual al generar el HTML y en el navegador.
// LazyMotion carga solo lo necesario (los componentes `m.*`) y reducedMotion="user" respeta la opción "reducir movimiento" del sistema.
export default function Envoltura({ children }) {
  return (
    <StrictMode>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </StrictMode>
  )
}
