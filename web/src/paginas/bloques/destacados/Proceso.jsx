import { useRef } from 'react'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'
import { useAnimacionProceso } from './useAnimacionProceso.js'

// Bloque propio con forma de proceso: los pasos de cómo se hace algo, en zigzag en compu y en columna en celular.
// Cada paso se enciende al llegar a él. Lo pide la página de placas con sus propios textos.
export default function Proceso({ destacado }) {
  const { etiqueta, titulo, texto, pasos, nota } = destacado
  const lista = useRef(null)
  useAnimacionProceso(lista)

  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={contenedor}>
        <div className="rounded-[28px] bg-superficie p-[22px] sm:rounded-[40px] sm:p-12">
          <div className="max-w-3xl">
            <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
            <p className="mt-5 text-lg leading-relaxed text-suave">{texto}</p>
          </div>

          {/* Escalonado de a tres: el paso del medio de cada fila baja, y se arma el zigzag. */}
          <ol ref={lista} className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5 md:pb-10">
            {pasos.map((paso, i) => (
              <li
                key={paso.titulo}
                data-paso
                className="group relative rounded-[22px] border border-borde bg-fondo p-[22px] pl-[76px] transition-colors duration-500 ease-entrar data-[encendido=si]:border-arco sm:rounded-[28px] md:pl-7 md:[&:nth-child(3n+2)]:mt-10"
              >
                {/* En celular, una línea une los pasos. */}
                {i < pasos.length - 1 && <span aria-hidden="true" className="absolute top-[70px] -bottom-4 left-[43px] w-0.5 bg-resalte md:hidden" />}
                <span
                  aria-hidden="true"
                  className="absolute top-[22px] left-[22px] flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-tinte font-display text-lg font-bold text-brand transition-all duration-500 ease-entrar group-data-[encendido=si]:scale-100 group-data-[encendido=si]:bg-brand group-data-[encendido=si]:text-sobre-brand md:static md:mb-4"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-xl leading-snug font-bold sm:text-[22px]">{paso.titulo}</h3>
                <p className="mt-1.5 text-base leading-normal text-suave sm:text-[17px]">{paso.texto}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 max-w-3xl border-l-4 border-arco pl-4 text-base leading-relaxed text-texto sm:text-[17px]">{nota}</p>
        </div>
      </div>
    </section>
  )
}
