import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'

const parrafo = 'text-lg leading-relaxed text-suave'

// "Cuándo hace falta": causas y señales, con la aclaración de que hay que revisar el diente.
// Cada lista lleva tilde; si pide otro ícono (`icono`), usa ese, por ejemplo `menos` para lo que no se recomienda.
export default function Cuando({ cuando }) {
  return (
    <section className="bg-superficie/70 py-10 sm:py-14">
      <div className={contenedor}>
        <div className="max-w-3xl">
          <Titulo etiqueta={cuando.etiqueta}>{cuando.titulo}</Titulo>
          <p className={`mt-5 ${parrafo}`}>{cuando.texto}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
          {cuando.listas.map((lista) => (
            <div key={lista.titulo} className="rounded-[22px] border border-borde bg-fondo p-[22px] sm:rounded-[28px] sm:p-7">
              <h3 className="font-display text-xl leading-snug font-bold sm:text-[22px]">{lista.titulo}</h3>
              <ul className="mt-4 space-y-3">
                {lista.elementos.map((elemento) => (
                  <li key={elemento} className="flex items-start gap-3 text-base leading-normal text-texto sm:text-[17px]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tinte text-brand">
                      <Icono nombre={lista.icono ?? 'check'} className="h-4 w-4" />
                    </span>
                    <span className="pt-0.5">{elemento}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl border-l-4 border-arco pl-4 text-base leading-relaxed text-texto sm:text-[17px]">{cuando.nota}</p>
      </div>
    </section>
  )
}
