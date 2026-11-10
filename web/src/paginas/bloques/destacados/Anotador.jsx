import { useState } from 'react'
import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'

// Bloque propio con forma de anotador: una lista de cosas para tener pensadas, que la persona puede ir tildando,
// y al lado un aviso destacado. No guarda ni envía nada: los tildes se pierden al salir de la página.
// Lo pide la página de implantes con sus propios textos.
export default function Anotador({ destacado }) {
  const { etiqueta, titulo, texto, elementos, aviso, nota } = destacado
  const [tildados, setTildados] = useState([])

  const alternar = (elemento) => setTildados((antes) => (antes.includes(elemento) ? antes.filter((otro) => otro !== elemento) : [...antes, elemento]))

  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={`${contenedor} grid items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-16`}>
        <div>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-5 text-lg leading-relaxed text-suave">{texto}</p>
          <p className="mt-4 border-l-4 border-arco pl-4 text-base leading-relaxed text-texto sm:text-[17px]">{nota}</p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[22px] border border-borde bg-superficie px-[22px] pt-4 pb-2 sm:rounded-[28px] sm:px-7">
            {/* Los agujeros de la hoja del anotador. */}
            <div aria-hidden="true" className="flex justify-center gap-6 pb-2">
              {[0, 1, 2, 3, 4].map((agujero) => (
                <span key={agujero} className="h-3 w-3 rounded-full border-2 border-borde-fuerte bg-fondo" />
              ))}
            </div>
            <ul>
              {elementos.map((elemento) => {
                const tildado = tildados.includes(elemento)
                return (
                  <li key={elemento} className="border-b border-dashed border-borde-fuerte last:border-b-0">
                    <button
                      type="button"
                      aria-pressed={tildado}
                      onClick={() => alternar(elemento)}
                      className="flex min-h-[56px] w-full items-center gap-3.5 py-2 text-left text-[17px] leading-snug text-texto focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-brand transition-colors duration-300 ease-tocar ${tildado ? 'bg-brand text-sobre-brand' : 'bg-fondo text-transparent'}`}
                      >
                        <Icono nombre="check" className="h-4 w-4" />
                      </span>
                      {elemento}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex items-start gap-3.5 rounded-[22px] border-2 border-brand bg-fondo p-[22px] sm:rounded-[28px] sm:p-7">
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tinte text-brand">
              <Icono nombre="alerta" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl leading-snug font-bold text-brand sm:text-[22px]">{aviso.titulo}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-suave sm:text-[17px]">{aviso.texto}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
