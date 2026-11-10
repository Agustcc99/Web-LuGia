import { m } from 'motion/react'
import { distancia, resorte } from '@/utilidades/movimiento.js'

// Envoltorio para que un bloque aparezca al llegar a él.
//  · efecto="subir": el bloque sube 24 px y se endereza un poco, una sola vez (fotos, tarjetas, cierre).
//  · efecto="texto" (o sin efecto): queda quieto. Los textos y formularios no se animan al llegar.
// `retraso` (0 a 3) hace esperar un poco a los bloques que van uno al lado del otro.
// Con "reducir movimiento" en el sistema queda solo el fundido (MotionConfig en main.jsx).
export default function Aparecer({ as = 'div', retraso = 0, efecto = 'quieto', className = '', children, ...props }) {
  const Elemento = m[as]

  if (efecto !== 'subir') {
    return (
      <Elemento className={className} {...props}>
        {children}
      </Elemento>
    )
  }

  return (
    <Elemento
      initial={{ opacity: 0, y: distancia.bloque, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ transformPerspective: 900, transformOrigin: '50% 100%' }}
      transition={{ ...resorte.llegar, delay: Math.min(retraso, 3) * 0.06, opacity: { duration: 0.4 } }}
      className={className}
      {...props}
    >
      {children}
    </Elemento>
  )
}
