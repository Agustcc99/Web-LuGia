import { Fragment, useEffect, useState } from 'react'
import BarraMovil from '@/estructura/BarraMovil.jsx'
import BotonWhatsappFlotante from '@/estructura/BotonWhatsappFlotante.jsx'
import CursorFluido from '@/estructura/CursorFluido.jsx'
import Menu from '@/estructura/Menu/Menu.jsx'
import Pie from '@/estructura/Pie.jsx'
import ProgresoScroll from '@/estructura/ProgresoScroll.jsx'
import Cierre from '@/secciones/Cierre.jsx'
import PreguntasFrecuentes from '@/secciones/PreguntasFrecuentes.jsx'
import { iniciarBotones } from '@/utilidades/botones.js'
import { RUTA_PRINCIPAL } from '@/utilidades/enlaces.js'
import { raizPagina } from '@/utilidades/estilos.js'
import Atencion from './bloques/Atencion.jsx'
import AtencionPorTurnos from './bloques/AtencionPorTurnos.jsx'
import Cuando from './bloques/Cuando.jsx'
import Experiencia from './bloques/Experiencia.jsx'
import FranjaUbicacion from './bloques/FranjaUbicacion.jsx'
import OtrosTratamientos from './bloques/OtrosTratamientos.jsx'
import PortadaTratamiento from './bloques/PortadaTratamiento.jsx'
import QueEs from './bloques/QueEs.jsx'
import { destacados } from './bloques/destacados/indice.js'
import { fondos } from './dibujos/indice.js'

// Cada sección de la página, por nombre. Una página puede pedir otro orden o saltear alguna con `orden`.
const secciones = {
  que: (pagina) => <QueEs que={pagina.que} />,
  cuando: (pagina) => <Cuando cuando={pagina.cuando} />,
  atencion: (pagina) => (pagina.atencion.forma === 'turnos' ? <AtencionPorTurnos atencion={pagina.atencion} /> : <Atencion atencion={pagina.atencion} />),
  experiencia: (pagina) => <Experiencia experiencia={pagina.experiencia} formaFoto={pagina.formaFotos} />,
  preguntas: (pagina) => <PreguntasFrecuentes lista={pagina.preguntas} id="preguntas" />,
}
// Lo que no es una sección común es un bloque propio: `destacado` o, si la página tiene más de uno, el nombre que le ponga. Su forma la dice `tipo`.
function BloquePropio({ datos }) {
  const Bloque = destacados[datos.tipo]
  return <Bloque destacado={datos} />
}
const ORDEN_COMUN = ['que', 'cuando', 'destacado', 'atencion', 'experiencia', 'preguntas']

// Página de un tratamiento (endodoncia y las que se sumen). Los textos están en contenido/paginas/.
// Comparte menú, pie y botones con la principal, pero tiene portada, dibujo, recorrido y fondo propios.
export default function PaginaTratamiento({ pagina }) {
  // El efecto del mouse y el de los botones arrancan recién en el navegador.
  const [enNavegador, setEnNavegador] = useState(false)
  useEffect(() => {
    setEnNavegador(true)
    iniciarBotones()
  }, [])

  const Fondo = fondos[pagina.fondo]
  const orden = (pagina.orden ?? ORDEN_COMUN).filter((seccion) => pagina[seccion])

  return (
    <div className={raizPagina}>
      {enNavegador && <CursorFluido gama={pagina.gama} />}
      <ProgresoScroll />
      <Menu inicio={RUTA_PRINCIPAL}>
        <FranjaUbicacion tratamiento={pagina.tratamiento} />
      </Menu>
      {/* La gama cambia los colores solo acá adentro: el menú y el pie siguen iguales en todas las páginas. */}
      <div className={pagina.gama ? `gama-${pagina.gama}` : undefined}>
        {Fondo && <Fondo />}
        <main>
          <PortadaTratamiento portada={pagina.portada} formaFoto={pagina.formaFotos} />
          {orden.map((seccion) => (
            <Fragment key={seccion}>{secciones[seccion] ? secciones[seccion](pagina) : <BloquePropio datos={pagina[seccion]} />}</Fragment>
          ))}
          {pagina.otrosTratamientos && <OtrosTratamientos otrosTratamientos={pagina.otrosTratamientos} />}
          <Cierre datos={pagina.cierre} formaFoto={pagina.formaFotos} />
        </main>
      </div>
      <Pie inicio={RUTA_PRINCIPAL} />
      <BotonWhatsappFlotante />
      <BarraMovil inicio={RUTA_PRINCIPAL} />
    </div>
  )
}
