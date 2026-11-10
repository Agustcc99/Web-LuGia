import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'

// Recorrido vertical: los pasos unidos por una línea, en un solo bloque.
export default function Atencion({ atencion }) {
  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={`${contenedor} grid items-start gap-8 md:grid-cols-[4fr_7fr] md:gap-16`}>
        <Titulo etiqueta={atencion.etiqueta}>{atencion.titulo}</Titulo>
        <ol className="rounded-[22px] border border-borde bg-fondo p-[22px] sm:rounded-[28px] sm:p-8">
          {atencion.pasos.map((paso, i) => (
            <li key={paso.titulo} className="relative pb-8 pl-14 last:pb-0">
              {i < atencion.pasos.length - 1 && <span aria-hidden="true" className="absolute top-11 bottom-0 left-[21px] w-0.5 bg-resalte" />}
              <span aria-hidden="true" className="absolute top-0 left-0 flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-sobre-brand">
                {i + 1}
              </span>
              <h3 className="font-display text-xl leading-snug font-bold sm:text-[22px]">{paso.titulo}</h3>
              <p className="mt-1.5 text-base leading-normal text-suave sm:text-[17px]">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
