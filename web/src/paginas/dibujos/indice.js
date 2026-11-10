import { DestellosChicos, DienteConBrilloChico, DienteConBrilloGrande, DienteConBrillos } from './blanqueamiento.jsx'
import { Diente, LineaConducto } from './endodoncia.jsx'
import { EjeConMarcas, ImplanteJuntoADiente } from './implantes.jsx'
import { DienteConEncia, DienteConEnciaChico, OndasSuaves } from './limpieza.jsx'
import { DienteDeLeche, FormasRedondeadas } from './odontopediatria.jsx'
import { PlacaSobreArcada, ZigzagSuave } from './placas.jsx'
import { DienteConArreglo, DienteConCorona, DienteEnCapas, LineaEnCapas } from './protesis.jsx'

// Dibujos propios de cada tratamiento, uno por archivo. Para sumar uno: crear su archivo, agregar acá su nombre
// en `dibujos` o en `fondos` y pedirlo desde contenido/paginas/ (que.dibujo.tipo y fondo).
export const dibujos = {
  diente: Diente,
  dienteDeLeche: DienteDeLeche,
  dienteEnCapas: DienteEnCapas,
  dienteConArreglo: DienteConArreglo,
  dienteConCorona: DienteConCorona,
  placaSobreArcada: PlacaSobreArcada,
  dienteConBrillos: DienteConBrillos,
  dienteConBrilloGrande: DienteConBrilloGrande,
  dienteConBrilloChico: DienteConBrilloChico,
  dienteConEncia: DienteConEncia,
  dienteConEnciaChico: DienteConEnciaChico,
  implanteJuntoADiente: ImplanteJuntoADiente,
}
export const fondos = { conducto: LineaConducto, destellosChicos: DestellosChicos, ejeConMarcas: EjeConMarcas, formasRedondeadas: FormasRedondeadas, lineaEnCapas: LineaEnCapas, ondasSuaves: OndasSuaves, zigzagSuave: ZigzagSuave }
