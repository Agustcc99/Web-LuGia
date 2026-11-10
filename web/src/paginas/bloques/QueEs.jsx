import Titulo from '@/piezas/Titulo.jsx'
import { contenedor } from '@/utilidades/estilos.js'
import { dibujos } from '../dibujos/indice.js'

const estiloParrafo = 'text-lg leading-relaxed text-suave'

// Un párrafo es solo texto o, si conviene, arranca con unas palabras resaltadas: { resaltado, texto }.
function Parrafo({ elemento, className = '' }) {
  const { resaltado, texto } = typeof elemento === 'string' ? { texto: elemento } : elemento
  return (
    <p className={`${estiloParrafo} ${className}`}>
      {resaltado && <strong className="font-semibold text-texto">{resaltado} </strong>}
      {texto}
    </p>
  )
}

const claveDe = (elemento) => elemento.texto ?? elemento

// "Qué es": explicación con el dibujo propio del tratamiento. Si el dibujo va en la portada, cada párrafo es una tarjeta.
export default function QueEs({ que }) {
  if (!que.dibujo) {
    return (
      <section className="bg-transparent py-10 sm:py-14">
        <div className={contenedor}>
          <Titulo etiqueta={que.etiqueta}>{que.titulo}</Titulo>
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {que.parrafos.map((elemento) => (
              <div key={claveDe(elemento)} className="rounded-[22px] border border-borde bg-fondo p-[22px] sm:rounded-[28px] sm:p-7">
                <Parrafo elemento={elemento} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const Dibujo = dibujos[que.dibujo.tipo]
  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={`${contenedor} grid items-center gap-8 md:grid-cols-2 md:gap-16`}>
        <div>
          <Titulo etiqueta={que.etiqueta}>{que.titulo}</Titulo>
          {que.parrafos.map((elemento) => (
            <Parrafo key={claveDe(elemento)} elemento={elemento} className="mt-5" />
          ))}
        </div>
        <Dibujo alt={que.dibujo.alt} partes={que.dibujo.partes} />
      </div>
    </section>
  )
}
