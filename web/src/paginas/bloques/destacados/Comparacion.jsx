import Aparecer from '@/piezas/Aparecer.jsx'
import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor, flecha } from '@/utilidades/estilos.js'
import { dibujos } from '../../dibujos/indice.js'

// Bloque propio con forma de comparación: dos opciones lado a lado, cada una con sus filas y, si tiene, su dibujo.
// Lo piden blanqueamiento, limpieza y estética con sus propios textos.
export default function Comparacion({ destacado }) {
  const { etiqueta, titulo, texto, separador, opciones, nota, enlace } = destacado

  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={contenedor}>
        <div className="rounded-[28px] bg-superficie p-[22px] sm:rounded-[40px] sm:p-12">
          <div className="max-w-3xl">
            <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
            <p className="mt-5 text-lg leading-relaxed text-suave">{texto}</p>
          </div>

          <div className="relative mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
            {opciones.map((opcion, i) => {
              const Dibujo = dibujos[opcion.dibujo]
              return (
                <Aparecer key={opcion.titulo} efecto="subir" retraso={i} className="rounded-[22px] border border-borde bg-fondo p-[22px] sm:rounded-[28px] sm:p-7">
                  {Dibujo && (
                    <div className="mx-auto flex h-36 w-40 items-end justify-center rounded-t-[999px] rounded-b-2xl bg-tinte pb-2">
                      <Dibujo />
                    </div>
                  )}
                  <h3 className="mt-5 font-display text-2xl leading-snug font-bold">{opcion.titulo}</h3>
                  <dl className="mt-1">
                    {opcion.filas.map((fila) => (
                      <div key={fila.etiqueta} className="mt-3">
                        <dt className="text-sm font-semibold text-acento">{fila.etiqueta}</dt>
                        <dd className="mt-0.5 text-base leading-normal text-texto sm:text-[17px]">{fila.texto}</dd>
                      </div>
                    ))}
                  </dl>
                </Aparecer>
              )
            })}
            {separador && (
              <span aria-hidden="true" className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-superficie bg-brand-oscuro font-display text-lg font-bold text-sobre-brand">
                {separador}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-3xl border-l-4 border-arco pl-4 text-base leading-relaxed text-texto sm:text-[17px]">{nota}</p>
          {enlace && (
            <a href={enlace.ruta} className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-brand underline underline-offset-4 hover:text-brand-oscuro">
              {enlace.texto}
              <Icono nombre="flecha" className={flecha} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
