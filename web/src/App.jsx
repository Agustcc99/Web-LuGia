import { sitio } from '@/contenido/sitio.js'
import { raizPagina } from '@/utilidades/estilos.js'
import { useIrASeccion } from '@/hooks/useIrASeccion.js'

// Estructura de la página (barra, fondo y pie)
import Lunares from '@/estructura/Lunares/Lunares.jsx'
import CursorFluido from '@/estructura/CursorFluido.jsx'
import ProgresoScroll from '@/estructura/ProgresoScroll.jsx'
import Menu from '@/estructura/Menu/Menu.jsx'
import Pie from '@/estructura/Pie.jsx'
import BotonWhatsappFlotante from '@/estructura/BotonWhatsappFlotante.jsx'
import BarraMovil from '@/estructura/BarraMovil.jsx'

// Secciones, en el orden en que aparecen
import Portada from '@/secciones/Portada.jsx'
import Servicios from '@/secciones/Servicios/Servicios.jsx'
import Profesional from '@/secciones/Profesional.jsx'
import Nosotros from '@/secciones/Nosotros.jsx'
import Galeria from '@/secciones/Galeria.jsx'
import Pasos from '@/secciones/Pasos/Pasos.jsx'
import PreAdmision from '@/secciones/PreAdmision/PreAdmision.jsx'
// import Resenas from '@/secciones/Resenas.jsx'
import Cierre from '@/secciones/Cierre.jsx'
import Contacto from '@/secciones/Contacto/Contacto.jsx'
import PreguntasFrecuentes from '@/secciones/PreguntasFrecuentes.jsx'
import MeGusta from '@/secciones/MeGusta.jsx'

export default function App() {
  useIrASeccion()

  return (
    <div className={raizPagina}>
      <Lunares />
      <CursorFluido />
      <ProgresoScroll />
      <Menu />
      <main>
        <Portada />
        <Servicios />
        {/* Las secciones opcionales se muestran solo si tienen contenido en contenido/sitio.js */}
        {sitio.profesional && <Profesional />}
        {sitio.nosotros && <Nosotros />}
        {sitio.galeria?.imagenes.length > 0 && <Galeria />}
        {sitio.pasos && <Pasos />}
        {sitio.preadmision && <PreAdmision />}
        {/* Reseñas apagadas hasta que haya reseñas reales: para mostrarlas, descomentar el import de arriba y esta línea. */}
        {/* {sitio.resenas && <Resenas />} */}
        {sitio.cierre && <Cierre />}
        <Contacto />
        {sitio.preguntas.lista.length > 0 && <PreguntasFrecuentes />}
        {sitio.corazon && <MeGusta />}
      </main>
      <Pie />
      <BotonWhatsappFlotante />
      <BarraMovil />
    </div>
  )
}
