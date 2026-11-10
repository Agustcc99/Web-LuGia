import Icono from '@/piezas/Icono.jsx'
import { contenedor, flecha } from '@/utilidades/estilos.js'

// Links a otros tratamientos, para quien llegó a esta página y busca otra cosa. Es opcional: solo aparece si la página lo pide.
export default function OtrosTratamientos({ otrosTratamientos }) {
  return (
    <section className="bg-transparent pb-10 sm:pb-14">
      <div className={`${contenedor} flex flex-col gap-x-8 gap-y-1 md:flex-row md:flex-wrap md:items-center`}>
        <p className="text-lg font-semibold text-texto">{otrosTratamientos.texto}</p>
        {otrosTratamientos.enlaces.map((enlace) => (
          <a key={enlace.ruta} href={enlace.ruta} className="group inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-brand underline underline-offset-4 hover:text-brand-oscuro">
            {enlace.texto}
            <Icono nombre="flecha" className={flecha} />
          </a>
        ))}
      </div>
    </section>
  )
}
