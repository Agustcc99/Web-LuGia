import { lazy, Suspense } from 'react'
import { coloresCursor } from '@/utilidades/coloresCursor.js'
import { sinMovimiento } from '@/utilidades/gsap.js'

// El efecto pesa bastante, así que se baja aparte (lazy).
const SplashCursor = lazy(() => import('@/piezas/SplashCursor.jsx'))

// Tinta de colores que deja el mouse al moverse, y un salpicón al hacer clic.
// En el celular no deja tinta al deslizar el dedo (para no pintar al hacer scroll): solo hace el salpicón con un toque.
// No se carga si la persona pidió "reducir movimiento".
// Los colores son los de la gama de la página (utilidades/coloresCursor.js); sin gama, los de la marca (vino y rosas).
// El tema es "light" porque el fondo de la página es claro.
// zIndex 30: queda por encima del contenido pero debajo del menú (40) y de los botones flotantes (50).
export default function CursorFluido({ gama }) {
  if (sinMovimiento()) return null
  const colores = coloresCursor[gama] ?? coloresCursor.vino

  return (
    <Suspense fallback={null}>
      <SplashCursor theme="light" rainbow={false} colors={colores} colorSpeed={0.6} size={0.6} trail={0.6} quality="low" intro={false} touchTrail={false} zIndex={30} />
    </Suspense>
  )
}
