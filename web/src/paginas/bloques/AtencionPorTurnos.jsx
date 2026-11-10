import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'

// Atención contada por turnos: una columna por momento, para los tratamientos que llevan más de una visita.
export default function AtencionPorTurnos({ atencion }) {
  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={contenedor}>
        <Titulo etiqueta={atencion.etiqueta}>{atencion.titulo}</Titulo>
        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {atencion.grupos.map((grupo) => (
            <li key={grupo.titulo} className="overflow-hidden rounded-[22px] border border-borde bg-fondo sm:rounded-[28px]">
              <h3 className="bg-brand-oscuro px-[22px] py-3.5 font-display text-lg leading-snug font-bold text-sobre-brand sm:px-7">{grupo.titulo}</h3>
              <div className="space-y-5 p-[22px] sm:p-7">
                {grupo.pasos.map((paso) => (
                  <div key={paso.titulo}>
                    <h4 className="font-display text-xl leading-snug font-bold">{paso.titulo}</h4>
                    <p className="mt-1.5 text-base leading-normal text-suave sm:text-[17px]">{paso.texto}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl border-l-4 border-arco pl-4 text-base leading-relaxed text-texto sm:text-[17px]">{atencion.nota}</p>
      </div>
    </section>
  )
}
