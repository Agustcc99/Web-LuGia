import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import { useScrollPasado } from '@/hooks/useScrollPasado.js'
import { enlacePedirTurno, enlaceWhatsapp } from '@/utilidades/whatsapp.js'

// La barra aparece cuando se pasó el 70 % de la portada.
const pasoLaPortada = () => window.innerHeight * 0.7

// Solo celular: barra fija abajo con los botones "WhatsApp" y "Pedir turno".
// Sube desde abajo al dejar atrás la portada (que ya tiene esos botones) y se va al volver arriba.
// `inicio` es "/" en las páginas que no son la principal.
export default function BarraMovil({ inicio = '' }) {
  const visible = useScrollPasado(pasoLaPortada)

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t border-linea bg-fondo/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_28px_-18px_rgba(15,23,42,0.3)] backdrop-blur transition-transform duration-240 motion-reduce:transition-none md:hidden ${
        visible ? 'translate-y-0 ease-entrar' : 'pointer-events-none translate-y-full ease-salir'
      }`}
    >
      <a
        {...enlaceWhatsapp()}
        tabIndex={visible ? 0 : -1}
        className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-borde-fuerte bg-fondo text-[17px] font-semibold text-texto active:scale-[0.98]"
      >
        <Icono nombre="chat" className="h-5 w-5 text-brand" />
        {sitio.comun.whatsapp}
      </a>
      <a
        {...enlacePedirTurno(inicio)}
        tabIndex={visible ? 0 : -1}
        className="flex min-h-14 flex-[1.4] items-center justify-center gap-2 rounded-full bg-brand text-[17px] font-semibold text-sobre-brand active:scale-[0.98]"
      >
        <Icono nombre="calendario" className="h-5 w-5" />
        {sitio.portada.boton}
      </a>
    </div>
  )
}
