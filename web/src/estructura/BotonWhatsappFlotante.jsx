import { m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import { curva, duracion } from '@/utilidades/movimiento.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'

// Solo compu: botón de WhatsApp flotante en la esquina de abajo. Aparece con un fundido después de la portada.
export default function BotonWhatsappFlotante() {
  return (
    <m.a
      {...enlaceWhatsapp()}
      aria-label={sitio.comun.escribinos}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duracion.entrar, ease: curva.entrar, delay: 1.2 }}
      className="fixed right-6 bottom-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-sobre-whatsapp shadow-[0_16px_32px_-12px_rgba(5,46,22,0.45)] transition-[filter] duration-160 ease-tocar hover:brightness-95 md:flex"
    >
      <Icono nombre="chat" className="h-7 w-7" />
    </m.a>
  )
}
