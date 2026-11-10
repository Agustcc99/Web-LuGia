import { formularioTurno } from '@/contenido/formularioTurno.js'
import Icono from '@/piezas/Icono.jsx'
import { PASOS } from './mensaje.js'

// Indicador de los 4 pasos arriba del formulario. `paso` es el paso actual (0 a 3).
// Los pasos hechos muestran un tilde y la línea que los une se va llenando.
export default function Progreso({ paso }) {
  return (
    <ol aria-label={formularioTurno.pasos} className="grid grid-cols-4 gap-1.5 sm:gap-2">
      {PASOS.map((nombre, i) => {
        const hecho = i < paso
        const actual = i === paso
        return (
          <li key={nombre} aria-current={actual ? 'step' : undefined} className="flex flex-col gap-2 sm:gap-2.5">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-280 ease-pasar sm:h-8 sm:w-8 sm:text-[15px] ${
                  hecho ? 'bg-tinte text-brand' : actual ? 'bg-brand text-sobre-brand' : 'border-[1.5px] border-borde-fuerte font-semibold text-slate-500'
                }`}
              >
                {hecho ? <Icono nombre="check" className="h-4 w-4" /> : i + 1}
              </span>
              {i < PASOS.length - 1 && (
                <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-linea">
                  <span className={`absolute inset-0 origin-left bg-brand transition-transform duration-280 ease-pasar ${hecho ? 'scale-x-100' : 'scale-x-0'}`} />
                </span>
              )}
            </span>
            <span className={`text-[13px] sm:text-sm ${actual ? 'font-semibold text-brand' : 'text-slate-500'}`}>{nombre}</span>
          </li>
        )
      })}
    </ol>
  )
}
