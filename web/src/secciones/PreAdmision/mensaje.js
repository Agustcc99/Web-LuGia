// Opciones del formulario de turno y armado del mensaje que se manda por WhatsApp.

export const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']
export const FRANJAS = ['Mañana', 'Tarde', 'Me da igual']
export const PASOS = ['Motivo', 'Tus datos', 'Cuándo', 'Enviar']

// Datos con los que arranca el formulario.
export const datosIniciales = {
  motivo: null,
  nombre: '',
  edad: '',
  adulto: '',
  franja: 'Me da igual',
  dias: [],
  nota: '',
  acepta: false,
}

// Arma el texto del pedido. Si el paciente es menor, agrega el adulto responsable.
export function armarMensaje(datos) {
  const lineas = [
    'Pedido de turno (desde la página)',
    `Motivo: ${datos.motivo}`,
    `Paciente: ${datos.nombre}, ${datos.edad} años`,
    datos.edad && Number(datos.edad) < 18 && datos.adulto && `Adulto responsable: ${datos.adulto}`,
    `Prefiere: ${datos.franja.toLowerCase()}${datos.dias.length ? `, ${datos.dias.join(', ')}` : ''}`,
    datos.nota && `Nota: ${datos.nota}`,
  ].filter(Boolean)
  return lineas.join('\n')
}
