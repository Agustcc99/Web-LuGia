import { useRef } from 'react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { botonPrimario, contenedor, flecha } from '@/utilidades/estilos.js'
import { enlacePedirTurno } from '@/utilidades/whatsapp.js'
import { useAnimacionPasos } from './useAnimacionPasos.js'

// "Cómo pedir turno" en pasos numerados (contenido/sitio.js → pasos). Los atributos data-* los usa useAnimacionPasos.
export default function Pasos() {
  const { etiqueta, titulo, elementos } = sitio.pasos
  const raiz = useRef(null)
  useAnimacionPasos(raiz)

  // Esta sección alterna el fondo con la anterior ("El consultorio"): si esa no está, queda sin fondo.
  const fondo = sitio.nosotros ? 'bg-superficie/70' : 'bg-transparent'

  return (
    <section ref={raiz} className={`relative overflow-hidden py-12 sm:py-20 ${fondo}`}>
      {/* Manchas de color de fondo para que no se vea plano */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-tinte blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-arco/30 blur-3xl" />

      <div className={`${contenedor} relative flex flex-col md:items-center`}>
        <Titulo etiqueta={etiqueta} centrado>
          {titulo}
        </Titulo>

        <ol data-lista className="relative mt-10 grid w-full gap-6 sm:mt-16 md:grid-cols-3 md:gap-8">
          {/* Línea rosa clara de fondo y, encima, la línea vino que se va llenando */}
          <li aria-hidden="true" className="absolute top-6 bottom-16 left-[23px] w-[3px] rounded-full bg-arco/50 md:inset-x-[16%] md:top-[30px] md:bottom-auto md:left-auto md:h-[3px] md:w-auto">
            <span data-progreso className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand to-acento md:origin-left md:bg-gradient-to-r" />
          </li>

          {elementos.map((paso, i) => (
            <li key={paso.titulo} data-paso className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-7 md:text-center">
              {/* Círculo con el número */}
              <span
                data-nodo
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-brand bg-fondo font-display text-[19px] font-bold text-brand shadow-[0_0_0_6px_var(--color-superficie)] md:h-[62px] md:w-[62px] md:text-2xl"
              >
                {i + 1}
              </span>
              {/* Tarjeta del paso */}
              <div
                data-tarjeta
                className="group relative flex-1 self-stretch overflow-hidden rounded-[22px] border border-borde bg-fondo p-6 shadow-[0_24px_40px_-30px_rgba(122,31,61,0.45)] md:rounded-[28px] md:p-8"
              >
                <span aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[120px] leading-none font-bold text-brand/[0.06]">
                  {i + 1}
                </span>
                <span data-icono className="mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-tinte text-brand md:mx-auto">
                  <Icono nombre={paso.icono} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-[20px] font-bold text-texto md:text-[23px]">{paso.titulo}</h3>
                <p className="mt-2 text-base leading-normal text-suave">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <Aparecer efecto="texto" className="mt-10 sm:mt-16">
          <a {...enlacePedirTurno()} data-brillo className={`${botonPrimario} w-full min-h-[58px] px-8 text-lg sm:w-auto`}>
            {sitio.portada.boton}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </Aparecer>
      </div>
    </section>
  )
}
