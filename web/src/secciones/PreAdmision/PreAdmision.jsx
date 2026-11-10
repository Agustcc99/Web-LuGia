import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, contenedor } from '@/utilidades/estilos.js'
import { registrarEvento } from '@/utilidades/medicion.js'
import { curva, duracion } from '@/utilidades/movimiento.js'
import { armarMensaje, datosIniciales } from './mensaje.js'
import { PasoCuando, PasoDatos, PasoMotivo, PasoRevision } from './PasosDelFormulario.jsx'
import Progreso from './Progreso.jsx'
import { useAnimacionPreAdmision } from './useAnimacionPreAdmision.js'

// Al cambiar de paso, el que sale se corre 8 px a la izquierda y el nuevo entra desde 8 px a la derecha.
const cambioDePaso = {
  initial: { opacity: 0, x: 8 },
  animate: { opacity: 1, x: 0, transition: { duration: duracion.pasar, ease: curva.pasar } },
  exit: { opacity: 0, x: -8, transition: { duration: duracion.pasar * 0.7, ease: curva.salir } },
}

// Formulario de turno en 4 pasos. Arma el pedido y lo abre en WhatsApp.
// Solo hace preguntas administrativas (no historia clínica) y no guarda nada: ni en un servidor ni en el navegador.
export default function PreAdmision() {
  const { etiqueta, titulo, texto, ventajas, motivos } = sitio.preadmision

  const [paso, setPaso] = useState(0) // 0 a 3
  const [datos, setDatos] = useState(datosIniciales)
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  const mensaje = armarMensaje(datos)

  const raiz = useRef(null)
  const pasoRef = useRef(null)
  const enviarRef = useRef(null)
  const animarPaso = useAnimacionPreAdmision({ raiz, pasoRef, enviarRef, acepta: datos.acepta })

  // Cambia de paso y avisa a las estadísticas en cuál va (sin ningún dato del paciente).
  function ir(n) {
    setPaso(n)
    registrarEvento(`preadmision_paso_${n + 1}`)
  }

  function elegirMotivo(motivo) {
    if (paso === 0 && !datos.motivo) registrarEvento('preadmision_inicio')
    setDatos({ ...datos, motivo })
    ir(1)
  }

  return (
    <section ref={raiz} id="pedir-turno" className={`${anclaSeccion} bg-transparent py-10 sm:py-14`}>
      <div className={`${contenedor} grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-20`}>
        <Aparecer efecto="texto" className="lg:pt-2">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-4 text-[17px] text-suave sm:mt-5 sm:text-[19px]">{texto}</p>
          <ul className="mt-6 hidden space-y-3.5 text-[17px] text-texto sm:mt-8 sm:block">
            {ventajas.map((ventaja) => (
              <li key={ventaja} className="flex gap-3">
                <Icono nombre="check" className="mt-0.5 h-[22px] w-[22px] shrink-0 text-brand" />
                {ventaja}
              </li>
            ))}
          </ul>
        </Aparecer>

        {/* El formulario no lleva Aparecer: si se llega con el botón "Pedir turno" tiene que estar ya visible */}
        <div
          id="formulario-turno"
          className="rounded-[26px] border border-linea bg-fondo px-5 py-6 shadow-[0_32px_64px_-32px_rgba(15,23,42,0.2)] sm:rounded-[32px] sm:p-10"
        >
          <Progreso paso={paso} />

          <AnimatePresence mode="wait" initial={false}>
            <m.div key={paso} ref={pasoRef} {...cambioDePaso} onAnimationStart={animarPaso} className="mt-7 sm:mt-10">
              {paso === 0 && <PasoMotivo datos={datos} motivos={motivos} onElegir={elegirMotivo} />}
              {paso === 1 && <PasoDatos datos={datos} cambiar={cambiar} atras={() => setPaso(0)} siguiente={() => ir(2)} />}
              {paso === 2 && <PasoCuando datos={datos} setDatos={setDatos} cambiar={cambiar} atras={() => setPaso(1)} siguiente={() => ir(3)} />}
              {paso === 3 && <PasoRevision datos={datos} cambiar={cambiar} mensaje={mensaje} enviarRef={enviarRef} atras={() => setPaso(2)} />}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
