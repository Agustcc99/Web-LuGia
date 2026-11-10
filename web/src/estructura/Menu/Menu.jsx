import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import GooeyNav from '@/piezas/GooeyNav.jsx'
import LogoAnimado from '@/piezas/LogoAnimado.jsx'
import { useScrollPasado } from '@/hooks/useScrollPasado.js'
import { contenedor } from '@/utilidades/estilos.js'
import { enlacesDesde } from '@/utilidades/enlaces.js'
import { curva } from '@/utilidades/movimiento.js'
import { enlacePedirTurno, enlaceWhatsapp } from '@/utilidades/whatsapp.js'
import { useAlturaMenu } from './useAlturaMenu.js'
import { useAnimacionMenu } from './useAnimacionMenu.js'

// Menú de arriba, fijo, en vino. En compu muestra los links a las secciones; en celular, un botón que despliega el menú.
// `inicio` es "/" en las páginas que no son la principal: así los links llevan a las secciones de la principal.
// `children` va pegado debajo del menú (la franja de ubicación de esas páginas).
export default function Menu({ inicio = '', children }) {
  const enlaces = enlacesDesde(inicio)
  const [abierto, setAbierto] = useState(false)
  const header = useRef(null)
  const barra = useRef(null)

  // Al dejar de estar arriba de todo aparecen un filete y una sombra suave.
  const scrolleado = useScrollPasado(24)
  const marcada = scrolleado || abierto

  useAlturaMenu(header, barra)
  const seccionActiva = useAnimacionMenu({ header, abierto })

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-40">
      <div
        className={`border-b bg-gradient-to-r from-brand-oscuro via-brand to-brand-oscuro text-sobre-brand transition-[border-color,box-shadow] duration-200 ease-tocar ${
          marcada ? 'border-white/10 shadow-[0_14px_30px_-14px_rgba(60,10,30,0.55)]' : 'border-transparent'
        }`}
      >
        <nav ref={barra} className={`${contenedor} flex h-[68px] items-center justify-between gap-6 md:h-[84px]`}>
          {/* Logo y nombre */}
          <a href={inicio || '#'} className="flex min-w-0 items-center gap-2.5 font-display font-bold tracking-[-0.01em]">
                        {sitio.logoIcono && (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] md:h-12 md:w-12">
                <LogoAnimado src={sitio.logoIcono} className="h-9 w-9 md:h-10 md:w-10" />
              </span>
            )}
            <span className="line-clamp-2 text-[17px] leading-tight md:text-[19px]">{sitio.nombre}</span>
          </a>

          {/* Links a las secciones (solo compu): una pastilla blanca "líquida" marca la sección que se está viendo */}
          <div className="hidden lg:block">
            <GooeyNav
              items={enlaces.map(({ href, etiqueta }) => ({ href, label: etiqueta }))}
              activeIndex={Math.max(0, seccionActiva)}
              theme="dark"
              size="sm"
              frame={false}
              color="#ffffff"
              activeTextColor="#7a1f3d"
              style={{ '--gn-muted': 'rgba(255, 255, 255, 0.82)' }}
            />
          </div>

          {/* Botones de WhatsApp y turno (solo compu) */}
          <div className="ml-auto hidden items-center gap-5 md:flex lg:ml-0">
            <a {...enlaceWhatsapp()} className="flex items-center gap-2 text-base font-semibold text-white transition-colors duration-160 ease-tocar hover:text-resalte">
              <Icono nombre="chat" className="h-[18px] w-[18px] text-resalte" />
              {sitio.comun.whatsapp}
            </a>
            <a
              {...enlacePedirTurno(inicio)}
              className="inline-flex h-12 items-center rounded-full bg-white px-6 text-base font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98]"
            >
              {sitio.portada.boton}
            </a>
          </div>

          {/* Botón del menú (solo celular) */}
          <button
            type="button"
            onClick={() => setAbierto(!abierto)}
            className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/35 lg:hidden"
            aria-label={abierto ? sitio.menu.cerrar : sitio.menu.abrir}
            aria-expanded={abierto}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={abierto ? 'cerrar' : 'menu'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.1, ease: curva.entrar } }}
                exit={{ opacity: 0, transition: { duration: 0.08, ease: curva.salir } }}
                className="flex"
              >
                <Icono nombre={abierto ? 'cerrar' : 'menu'} className="h-[22px] w-[22px]" />
              </m.span>
            </AnimatePresence>
          </button>
        </nav>

        {/* Menú del celular: se destapa de arriba hacia abajo con un fundido; al cerrar va más rápido. */}
        <AnimatePresence initial={false}>
          {abierto && (
            <m.ul
              key="menu"
              initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: -4 }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0, transition: { duration: 0.2, ease: curva.entrar } }}
              exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0, y: -4, transition: { duration: 0.14, ease: curva.salir } }}
              className={`${contenedor} border-t border-white/15 py-2 lg:hidden`}
            >
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <a href={enlace.href} onClick={() => setAbierto(false)} className="block py-3.5 font-display text-lg font-bold">
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </m.ul>
          )}
        </AnimatePresence>
      </div>
      {children}
    </header>
  )
}
