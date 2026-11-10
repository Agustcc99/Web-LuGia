import { useState } from 'react'
import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'

const SIN_FECHA = 'sinFecha'

// Bloque propio con forma de calendario: la persona toca el mes de su última visita y ve en cuál le toca la próxima.
// `cadaCuantosMeses` dice cuántos meses hay entre una y otra. No guarda ni envía nada: es solo una ayuda para ubicarse.
export default function Calendario({ destacado }) {
  const { etiqueta, titulo, texto, meses, cadaCuantosMeses, icono, inicial, resultado, sinFecha, nota } = destacado
  const [elegido, setElegido] = useState(null)

  const mesProximo = typeof elegido === 'number' ? (elegido + cadaCuantosMeses) % meses.length : null
  const enMinuscula = (mes) => meses[mes].toLowerCase()

  let frase = inicial
  if (elegido === SIN_FECHA) frase = sinFecha.texto
  else if (mesProximo !== null) frase = resultado.replace('{ultima}', enMinuscula(elegido)).replace('{proxima}', enMinuscula(mesProximo))

  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={`${contenedor} grid items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-16`}>
        <div>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-5 text-lg leading-relaxed text-suave">{texto}</p>
        </div>

        <div className="rounded-[28px] border border-borde bg-superficie p-[22px] sm:rounded-[40px] sm:p-8">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-2.5">
            {meses.map((mes, numero) => {
              const esUltima = numero === elegido
              const esProxima = numero === mesProximo
              return (
                <button
                  key={mes}
                  type="button"
                  aria-pressed={esUltima}
                  onClick={() => setElegido(numero)}
                  className={`relative flex min-h-[52px] items-center justify-center rounded-2xl border text-base font-semibold transition-colors duration-300 ease-tocar focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:outline-none ${
                    esUltima ? 'border-brand bg-brand text-sobre-brand' : esProxima ? 'border-arco bg-tinte text-brand' : 'border-borde bg-fondo text-texto hover:border-borde-fuerte'
                  }`}
                >
                  <span aria-hidden="true">{mes.slice(0, 3)}</span>
                  <span className="sr-only">{mes}</span>
                  {/* La marca de la próxima visita. */}
                  {esProxima && (
                    <span aria-hidden="true" className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-sobre-brand">
                      <Icono nombre={icono} className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            aria-pressed={elegido === SIN_FECHA}
            onClick={() => setElegido(SIN_FECHA)}
            className={`mt-3 min-h-11 rounded-full border px-5 text-[15px] font-semibold transition-colors duration-300 ease-tocar focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:outline-none ${
              elegido === SIN_FECHA ? 'border-brand bg-brand text-sobre-brand' : 'border-borde-fuerte bg-fondo text-brand hover:border-brand'
            }`}
          >
            {sinFecha.boton}
          </button>

          <p aria-live="polite" className="mt-5 border-l-4 border-arco pl-4 font-display text-xl leading-snug font-bold text-texto sm:text-2xl">
            {frase}
          </p>
          <p className="mt-3 text-base leading-relaxed text-suave">{nota}</p>
        </div>
      </div>
    </section>
  )
}
