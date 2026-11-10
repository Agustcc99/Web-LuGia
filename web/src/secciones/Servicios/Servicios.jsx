import { useRef } from 'react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, contenedor, flecha } from '@/utilidades/estilos.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'
import TarjetaServicio from './TarjetaServicio.jsx'
import { useAnimacionServicios } from './useAnimacionServicios.js'

// Tratamientos: grilla de tarjetas con ícono. La primera (Endodoncias) es más ancha.
export default function Servicios() {
  const { etiqueta, titulo, consultar, elementos } = sitio.servicios
  const grilla = useRef(null)
  useAnimacionServicios(grilla)

  return (
    <section id="servicios" className={`${anclaSeccion} bg-transparent py-10 sm:py-14`}>
      <div className={contenedor}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
          <Aparecer efecto="texto" className="max-w-2xl">
            <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          </Aparecer>
          <a {...enlaceWhatsapp()} className="group hidden shrink-0 items-center gap-2 text-[17px] font-semibold text-brand hover:text-brand-oscuro md:inline-flex">
            {consultar}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </div>

        <div ref={grilla} className="mt-8 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {elementos.map((servicio, i) => (
            <TarjetaServicio key={servicio.titulo} servicio={servicio} numero={i + 1} destacada={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
