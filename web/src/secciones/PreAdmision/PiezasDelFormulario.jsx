import { m } from 'motion/react'
import { formularioTurno } from '@/contenido/formularioTurno.js'
import { botonPrimario } from '@/utilidades/estilos.js'
import { curva } from '@/utilidades/movimiento.js'
import { PASOS } from './mensaje.js'

// Piezas chicas que comparten los pasos del formulario de turno.

// Arriba de cada paso: "Paso 2 de 4" y la pregunta. `numero` empieza en 1.
export function EncabezadoPaso({ numero, pregunta }) {
  return (
    <>
      <p className="text-sm font-medium text-slate-500 sm:text-[15px]">
        {formularioTurno.paso} {numero} {formularioTurno.de} {PASOS.length}
      </p>
      <p className="mt-1 font-display text-[23px] leading-tight font-bold tracking-[-0.02em] text-texto sm:text-[28px]">{pregunta}</p>
    </>
  )
}

// Botones "Volver" y "Siguiente". Si falta algún dato (`habilitado` en false), "Siguiente" queda apagado y se muestra la `pista`.
export function Navegacion({ atras, siguiente, habilitado, pista }) {
  return (
    <div className="mt-7 sm:mt-8">
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={atras} className="self-start text-base font-semibold text-suave underline sm:self-auto">
          {formularioTurno.volver}
        </button>
        <button type="button" onClick={siguiente} disabled={!habilitado} className={`${botonPrimario} px-8 disabled:bg-borde-fuerte disabled:text-slate-700`}>
          {formularioTurno.siguiente}
        </button>
      </div>
      {!habilitado && pista && <p className="mt-2.5 text-sm text-suave sm:text-right">{pista}</p>}
    </div>
  )
}

// Campo que aparece o desaparece según una respuesta. La altura crece (o se cierra) en vez de empujar el botón "Siguiente" de golpe.
// El margen de -4 / +4 px deja lugar al aro de foco, que de otra forma quedaría recortado.
export function Desplegar({ children }) {
  return (
    <m.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22, ease: curva.pasar } }}
      exit={{ height: 0, opacity: 0, transition: { duration: 0.16, ease: curva.salir } }}
      className="-mx-1 overflow-hidden px-1 pb-1"
    >
      {children}
    </m.div>
  )
}
