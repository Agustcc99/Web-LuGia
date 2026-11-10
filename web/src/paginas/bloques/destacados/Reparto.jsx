import Aparecer from '@/piezas/Aparecer.jsx'
import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor, flecha } from '@/utilidades/estilos.js'

// Colores de cada columna: la primera en el color de marca y la segunda en el acento de la gama.
const coloresColumna = [
  { nombre: 'text-brand', filete: 'border-brand', numero: 'bg-brand text-sobre-brand', tarjeta: 'border-borde' },
  { nombre: 'text-acento', filete: 'border-acento', numero: 'bg-acento text-fondo', tarjeta: 'border-arco' },
]
// En compu cada paso va en la columna de quien lo hace.
const lugarEnCompu = ['md:col-start-1', 'md:col-start-2']

// Bloque propio con forma de reparto: dos columnas, una por profesional, y los pasos numerados en orden,
// cada uno en la columna de quien lo hace. En celular van en una sola columna y cada paso dice de quién es.
// Lo pide la página de implantes con sus propios textos.
export default function Reparto({ destacado }) {
  const { etiqueta, titulo, texto, columnas, pasos, nota, enlace } = destacado

  return (
    <section className="bg-transparent py-10 sm:py-14">
      <div className={contenedor}>
        <div className="rounded-[28px] bg-superficie p-[22px] sm:rounded-[40px] sm:p-12">
          <div className="max-w-3xl">
            <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
            <p className="mt-5 text-lg leading-relaxed text-suave">{texto}</p>
          </div>

          {/* Encabezado de las dos columnas, solo en compu. */}
          <div aria-hidden="true" className="mt-8 hidden grid-cols-2 gap-x-10 md:grid">
            {columnas.map((columna, i) => (
              <div key={columna.nombre} className={`border-b-4 pb-3 ${coloresColumna[i].filete}`}>
                <p className={`font-display text-2xl leading-snug font-bold ${coloresColumna[i].nombre}`}>{columna.nombre}</p>
                <p className="mt-0.5 text-base text-suave">{columna.detalle}</p>
              </div>
            ))}
          </div>

          <ol className="relative mt-6 grid gap-3 md:mt-5 md:grid-cols-2 md:gap-x-10 md:gap-y-4">
            {/* Línea del medio: separa lo que hace cada profesional. */}
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-resalte md:block" />
            {pasos.map((paso, i) => {
              const colores = coloresColumna[paso.columna]
              return (
                // Cada paso ocupa su propia fila, para que el orden se lea de arriba hacia abajo.
                <Aparecer as="li" key={paso.titulo} efecto="subir" style={{ gridRowStart: i + 1 }} className={`relative rounded-[22px] border bg-fondo p-[22px] pl-[76px] sm:rounded-[28px] ${colores.tarjeta} ${lugarEnCompu[paso.columna]}`}>
                  <span aria-hidden="true" className={`absolute top-[22px] left-[22px] flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold ${colores.numero}`}>
                    {i + 1}
                  </span>
                  <p className={`text-sm font-semibold md:sr-only ${colores.nombre}`}>{columnas[paso.columna].nombre}</p>
                  <h3 className="font-display text-xl leading-snug font-bold sm:text-[22px]">{paso.titulo}</h3>
                  {paso.texto && <p className="mt-1.5 text-base leading-normal text-suave sm:text-[17px]">{paso.texto}</p>}
                </Aparecer>
              )
            })}
          </ol>

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
