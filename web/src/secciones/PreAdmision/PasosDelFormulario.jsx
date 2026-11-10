import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { botonSecundario, botonWhatsapp, campo, chip, etiquetaCampo } from '@/utilidades/estilos.js'
import { registrarEvento } from '@/utilidades/medicion.js'
import { urlWhatsapp } from '@/utilidades/whatsapp.js'
import { formularioTurno } from '@/contenido/formularioTurno.js'
import Icono from '@/piezas/Icono.jsx'
import { DIAS, FRANJAS } from './mensaje.js'
import { Desplegar, EncabezadoPaso, Navegacion } from './PiezasDelFormulario.jsx'

// Los 4 pasos del formulario de turno, cada uno con su pantalla.
// Todos reciben: `datos` (los datos cargados), `setDatos` (para cambiarlos) y `cambiar(campo)` (para inputs de texto).

// Paso 1: ¿Por qué querés el turno? Al elegir un motivo pasa solo al paso siguiente.
export function PasoMotivo({ datos, motivos, onElegir }) {
  return (
    <div>
      <EncabezadoPaso numero={1} pregunta={formularioTurno.motivo.pregunta} />
      <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
        {motivos.map((motivo) => (
          <button key={motivo} type="button" aria-pressed={datos.motivo === motivo} onClick={() => onElegir(motivo)} className={chip(datos.motivo === motivo)}>
            {motivo}
          </button>
        ))}
      </div>
    </div>
  )
}

// Paso 2: nombre y edad. Si es menor de 18, pide también el adulto responsable.
export function PasoDatos({ datos, cambiar, atras, siguiente }) {
  const textos = formularioTurno.datos
  const esMenor = datos.edad !== '' && Number(datos.edad) < 18
  const completo = datos.nombre.trim() && datos.edad !== '' && (!esMenor || datos.adulto.trim())
  const pista = !datos.nombre.trim() || datos.edad === '' ? textos.pistaDatos : textos.pistaAdulto

  return (
    <div>
      <EncabezadoPaso numero={2} pregunta={textos.pregunta} />
      <div className="mt-5 grid gap-3 sm:grid-cols-[3fr_1fr]">
        <label className={etiquetaCampo}>
          {textos.nombre}
          <input value={datos.nombre} onChange={cambiar('nombre')} autoComplete="name" className={campo} />
        </label>
        <label className={etiquetaCampo}>
          {textos.edad}
          <input value={datos.edad} onChange={cambiar('edad')} type="number" inputMode="numeric" min="0" max="120" className={`${campo} max-w-[120px] sm:max-w-none`} />
        </label>
      </div>
      <AnimatePresence initial={false}>
        {esMenor && (
          <Desplegar key="adulto">
            <label className={`${etiquetaCampo} mt-3 rounded-[18px] bg-tinte p-3.5 text-brand-oscuro`}>
              {textos.adulto}
              <input value={datos.adulto} onChange={cambiar('adulto')} className={`${campo} border-brand font-normal`} />
            </label>
          </Desplegar>
        )}
      </AnimatePresence>
      <Navegacion atras={atras} siguiente={siguiente} habilitado={completo} pista={pista} />
    </div>
  )
}

// Paso 3: franja horaria, días y una nota opcional.
export function PasoCuando({ datos, setDatos, cambiar, atras, siguiente }) {
  const textos = formularioTurno.cuando

  // Marca o desmarca un día, manteniendo siempre el orden de la semana.
  const alternarDia = (dia, activo) =>
    setDatos({ ...datos, dias: activo ? datos.dias.filter((otroDia) => otroDia !== dia) : DIAS.filter((otroDia) => otroDia === dia || datos.dias.includes(otroDia)) })

  return (
    <div>
      <EncabezadoPaso numero={3} pregunta={textos.pregunta} />
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-2.5">
        {FRANJAS.map((franja) => (
          <button
            key={franja}
            type="button"
            aria-pressed={datos.franja === franja}
            onClick={() => setDatos({ ...datos, franja })}
            className={`${chip(datos.franja === franja)} px-2 text-[15px] leading-tight sm:px-5 sm:text-base`}
          >
            {franja}
          </button>
        ))}
      </div>
      <p className="mt-6 text-[15px] font-semibold text-texto">{textos.dias}</p>
      <div className="mt-2 grid grid-cols-5 gap-2">
        {DIAS.map((dia) => {
          const activo = datos.dias.includes(dia)
          return (
            <button key={dia} type="button" aria-pressed={activo} onClick={() => alternarDia(dia, activo)} className={`${chip(activo)} px-0 text-[15px]`}>
              {dia}
            </button>
          )
        })}
      </div>
      <label className={`${etiquetaCampo} mt-6`} htmlFor="nota-turno">
        {textos.nota}
      </label>
      <textarea id="nota-turno" value={datos.nota} onChange={cambiar('nota')} maxLength={140} rows={2} placeholder={textos.notaEjemplo} className={`${campo} mt-1.5 h-auto py-3`} />
      <p className="mt-1.5 text-sm text-suave">{textos.aviso}</p>
      <Navegacion atras={atras} siguiente={siguiente} habilitado />
    </div>
  )
}

// Paso 4: se ve el mensaje armado, se aceptan los términos y se envía por WhatsApp (o se copia).
// `enviarRef` es el botón de enviar, que se anima cuando se aceptan los términos.
export function PasoRevision({ datos, cambiar, mensaje, enviarRef, atras }) {
  const textos = formularioTurno.revision
  const [copiado, setCopiado] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensaje)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div>
      <EncabezadoPaso numero={4} pregunta={textos.pregunta} />
      <p className="mt-1.5 text-base text-suave">{textos.intro}</p>
      <pre className="mt-3.5 rounded-[20px] rounded-bl-md bg-superficie px-5 py-4 font-sans text-[15px] leading-[1.7] whitespace-pre-wrap text-texto first-line:font-semibold sm:rounded-[22px] sm:rounded-bl-md sm:text-base">
        {mensaje}
      </pre>
      <label className="mt-5 flex cursor-pointer items-start gap-3 text-[15px] leading-normal text-slate-800 sm:text-base">
        <input type="checkbox" checked={datos.acepta} onChange={cambiar('acepta')} className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-brand" />
        <span>
          {textos.aceptaAntes}{' '}
          <a href="#privacidad" onClick={() => document.getElementById('privacidad')?.setAttribute('open', '')} className="font-semibold underline">
            {textos.aceptaEnlace}
          </a>{' '}
          {textos.aceptaDespues}
        </span>
      </label>
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        {/* Sin aceptar los términos el botón no hace nada.
            El href no lleva el mensaje: Analytics registra la dirección de los links y no debe recibir datos del paciente.
            El mensaje con los datos se abre recién al tocar. */}
        <a
          ref={enviarRef}
          data-brillo={datos.acepta ? '' : undefined}
          href={datos.acepta ? urlWhatsapp() : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!datos.acepta}
          onClick={(e) => {
            e.preventDefault()
            if (!datos.acepta) return
            registrarEvento('preadmision_enviada')
            window.open(urlWhatsapp(mensaje), '_blank', 'noopener,noreferrer')
          }}
          className={`${botonWhatsapp} min-h-[58px] flex-1 ${datos.acepta ? '' : 'cursor-not-allowed opacity-40'}`}
        >
          <Icono nombre="chat" className="h-5 w-5" />
          {textos.enviar}
        </a>
        <button type="button" onClick={copiar} className={`${botonSecundario} min-h-[58px] text-base`}>
          {copiado ? textos.copiado : textos.copiar}
        </button>
      </div>
      <button type="button" onClick={atras} className="mt-5 text-base font-semibold text-suave underline">
        {formularioTurno.volver}
      </button>
    </div>
  )
}
