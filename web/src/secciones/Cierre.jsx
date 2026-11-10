import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import { useTextoGsap } from '@/hooks/useTextoGsap.js'
import { flecha } from '@/utilidades/estilos.js'
import { formasFoto } from '@/utilidades/formasFoto.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'

// Cierre de la página: un bloque vino con el llamado a pedir turno y una foto al costado.
// Sin props muestra el cierre de la página principal. Con `formaFoto` (utilidades/formasFoto.js), la foto va enmarcada con esa forma.
const claseFoto = 'absolute inset-x-0 -top-2 h-[calc(100%_+_16px)] w-full object-cover object-[50%_68%]'

export default function Cierre({ datos = sitio.cierre, formaFoto }) {
  const { titulo, texto, boton, imagen } = datos
  const marcoFoto = formaFoto && formaFoto !== 'arco' ? formasFoto[formaFoto] : null

  const seccion = useRef(null)
  const h2 = useRef(null)
  useTextoGsap(h2)

  // La foto se corre unos pocos px dentro de su marco mientras se hace scroll. Con "reducir movimiento" queda quieta.
  const quieto = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start end', 'end start'] })
  const yFoto = useTransform(scrollYProgress, [0, 1], quieto ? ['0px', '0px'] : ['8px', '-8px'])

  return (
    <section ref={seccion} className="bg-transparent pb-10 sm:pb-14">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-8">
        <Aparecer efecto="subir" className="grid overflow-hidden rounded-[32px] bg-brand text-sobre-brand md:min-h-[480px] md:grid-cols-[6fr_5fr] md:rounded-[40px]">
          <div className="order-2 flex flex-col justify-center px-[22px] pt-8 pb-7 md:order-none md:px-16 md:py-[72px]">
            <h2 ref={h2} className="font-display text-[32px] leading-[1.12] font-bold tracking-[-0.03em] text-balance md:text-[50px] md:leading-[1.08]">{titulo}</h2>
            <p className="mt-3.5 max-w-[460px] text-[17px] leading-relaxed text-white/90 md:mt-5 md:text-[19px]">{texto}</p>
            <a
              {...enlaceWhatsapp()}
              className="group mt-6 inline-flex min-h-[58px] items-center justify-center gap-3 self-stretch rounded-full bg-fondo px-8 text-[17px] font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98] md:mt-9 md:self-start md:min-h-[60px] md:text-lg"
            >
              {boton}
              <Icono nombre="flecha" className={flecha} />
            </a>
          </div>
          {imagen && !marcoFoto && (
            <div className="relative order-1 h-60 overflow-hidden rounded-bl-[140px] md:order-none md:h-auto md:rounded-bl-none md:rounded-tl-[240px]">
              <m.img src={imagen} alt="" loading="lazy" style={{ y: yFoto }} className={claseFoto} />
            </div>
          )}
          {/* Con `formaFoto`, la foto va enmarcada con esa forma, dentro del bloque. */}
          {imagen && marcoFoto && (
            <div className="order-1 flex items-center justify-center px-8 pt-8 md:order-none md:p-12">
              <div className={`relative w-full max-w-[260px] overflow-hidden md:max-w-[360px] ${marcoFoto.proporcion} ${marcoFoto.marco} ${marcoFoto.sinBorde ? '' : 'border-4 border-resalte'}`}>
                <m.img src={imagen} alt="" loading="lazy" style={{ y: yFoto }} className={claseFoto} />
              </div>
            </div>
          )}
        </Aparecer>
      </div>
    </section>
  )
}
