// Textos, fotos, datos de contacto y qué secciones se muestran en la página principal.
// Los cursos, el formulario de turno y las páginas de tratamientos tienen su archivo en esta misma carpeta.
//
// LuGia — consultorio odontológico de la Od. Luciana Gianello.
// Reglas por ser un sitio de salud: sin precios, sin promesas ("cura", "sin dolor", "garantizado"),
// sin promociones ni antes y después, matrícula visible y sin reseñas inventadas.

import { cursos } from './cursos.js'

const email = 'lucygianello@gmail.com'

export const sitio = {
  nombre: 'LuGia',
  logoIcono: '/logo-centrado.png',

  whatsapp: { numero: '5493513938777', mensaje: 'Hola, quiero pedir un turno en LuGia.' },

  // Textos cortos que se repiten en varias partes.
  comun: {
    whatsapp: 'WhatsApp',
    escribinos: 'Escribinos por WhatsApp',
    matricula: 'Matrícula',
    inicio: 'Inicio',
    estasEn: 'Estás en',
  },

  menu: { abrir: 'Abrir menú', cerrar: 'Cerrar menú' },

  portada: {
    etiqueta: 'Odontología · Jardín Horizonte, Córdoba',
    titulo: 'Cuidamos tu sonrisa, con tiempo y cercanía.',
    subtitulo:
      'Endodoncia y odontología integral para niños y adultos. Turnos de 45 minutos a 1 hora, sin apuro.',
    boton: 'Pedir turno',
    imagen: '/fotos/sillon.webp',
    alt: 'Sillón odontológico del consultorio LuGia',
    datos: [
      { etiqueta: 'Atención', valor: 'Niños y adultos' },
      { etiqueta: 'Modalidad', valor: 'Atención particular' },
      { etiqueta: 'Turnos', valor: 'Por WhatsApp' },
    ],
  },

  servicios: {
    etiqueta: 'Tratamientos',
    titulo: 'Atención odontológica para toda la familia',
    consultar: 'Consultar por un tratamiento',
    verMas: 'Ver más',
    elementos: [
      { icono: 'raiz', titulo: 'Endodoncias', descripcion: 'Tratamiento de conducto para conservar tu diente. Es el área en la que la Od. Gianello tiene más de 20 años de experiencia.', enlace: '/endodoncia', enlaceAyuda: 'sobre endodoncia' },
      { icono: 'diente', titulo: 'Odontología integral', descripcion: 'Controles, arreglos, extracciones y plan de tratamiento para adultos. Odontopediatría para niños desde los 5 años.', enlacesEnTexto: [{ texto: 'Odontopediatría', ruta: '/odontopediatria' }] },
      { icono: 'corona', titulo: 'Prótesis, pernos y coronas', descripcion: 'Coronas, pernos y prótesis para recuperar la comodidad al masticar y sonreír.', enlace: '/protesis-y-coronas', enlaceAyuda: 'sobre prótesis, pernos y coronas' },
      { icono: 'herramienta', titulo: 'Implantes', descripcion: 'Evaluamos tu caso y te explicamos las opciones para reponer dientes ausentes.', enlace: '/implantes', enlaceAyuda: 'sobre implantes' },
      { icono: 'brillo', titulo: 'Blanqueamientos y limpiezas', descripcion: 'Limpiezas de control y blanqueamiento, previa evaluación de tu boca.', enlacesEnTexto: [{ texto: 'Limpiezas', ruta: '/limpieza-dental' }, { texto: 'blanqueamiento', ruta: '/blanqueamiento-dental' }] },
      { icono: 'escudo', titulo: 'Placas de bruxismo y férulas', descripcion: 'Placas a medida para proteger tus dientes si apretás o rechinás, y férulas para trastornos de ATM, la articulación de la mandíbula.', enlace: '/placas-de-bruxismo', enlaceAyuda: 'sobre placas de bruxismo y férulas' },
      { icono: 'estrella', titulo: 'Estética dental', descripcion: 'Tratamientos para mejorar el aspecto de tu sonrisa de forma natural.' },
    ],
  },

  profesional: {
    etiqueta: 'La profesional',
    nombre: 'Od. Luciana Gianello',
    especialidad: 'Odontóloga',
    matricula: 'MP 7700',
    imagen: '/fotos/luciana.webp',
    frase: 'Me encanta mi trabajo y sigo formándome siempre, porque quiero estar cada día mejor para mis pacientes.',
    formacion: ['Más de 20 años de experiencia en endodoncia', 'Formación universitaria', 'Capacitación continua'],
    cursos,
  },

  nosotros: {
    etiqueta: 'El consultorio',
    titulo: 'Un lugar tranquilo, con tiempo para vos.',
    texto:
      'En LuGia cada turno dura entre 45 minutos y 1 hora, para que puedas preguntar todo lo que quieras y entender cada paso del tratamiento.',
    imagen: '/fotos/sala-de-espera.webp',
    alt: 'Sala de espera del consultorio LuGia',
    puntos: [
      'Turnos de 45 minutos a 1 hora',
      'Atención a niños y adultos',
    ],
  },

  galeria: null,

  pasos: {
    etiqueta: 'Cómo pedir turno',
    titulo: 'Tu turno en 3 pasos',
    elementos: [
      { icono: 'chat', titulo: 'Escribinos', texto: 'Completá el pedido o escribinos por WhatsApp y contanos el motivo de tu consulta.' },
      { icono: 'calendario', titulo: 'Elegí el horario', texto: 'Te pasamos los días y horarios libres y confirmamos el que te quede mejor.' },
      { icono: 'diente', titulo: 'Vení a tu consulta', texto: 'No hace falta que traigas nada. Del resto nos ocupamos nosotros.' },
    ],
  },

  // Reseñas apagadas en App.jsx hasta que existan reseñas reales en Google.
  resenas: { etiqueta: 'Reseñas', titulo: 'Lo que dicen los pacientes', estrellas: '5 estrellas', fuente: 'Google', elementos: [] },

  // Formulario de turno: arma el pedido y lo abre en WhatsApp. No guarda nada.
  preadmision: {
    etiqueta: 'Pedir turno',
    titulo: 'Pedí tu turno en un minuto',
    texto: 'Respondé unas preguntas y te armamos el mensaje para WhatsApp. Así te contestamos más rápido.',
    ventajas: ['Sin descargar nada ni crear cuentas', 'El pedido llega ordenado y se responde más rápido', 'No guardamos tus datos en la página'],
    motivos: ['Primera consulta', 'Control o limpieza', 'Dolor', 'Endodoncia', 'Corona o prótesis', 'Seguir un tratamiento'],
  },

  preguntas: {
    etiqueta: 'Dudas',
    titulo: 'Preguntas frecuentes',
    texto: '¿No encontrás tu duda? Escribinos y te respondemos en el horario de atención.',
    enlaceMenu: 'Preguntas',
    lista: [
      {
        pregunta: '¿Trabajan con obras sociales?',
        respuesta: 'No, la atención es particular. Se puede pagar en efectivo, por transferencia o con tarjeta, y también en cuotas.',
      },
      {
        pregunta: '¿Me va a doler?',
        respuesta:
          'Es muy común sentir nervios antes de ir al dentista. Si tenés miedo o una mala experiencia anterior, contanoslo al pedir el turno: vamos a tu ritmo y te explicamos cada paso antes de empezar.',
      },
      { pregunta: '¿Atienden niños?', respuesta: 'Sí, atendemos niños desde los 5 años y adultos.' },
      { pregunta: '¿Cuánto dura un turno?', respuesta: 'Entre 45 minutos y 1 hora.' },
      { pregunta: '¿Cuánto sale?', respuesta: 'Los valores se informan en la consulta, una vez que revisamos tu caso.' },
    ],
  },

  // Final de la página: invita a todos los pacientes a dejar su reseña en Google. El botón se ve siempre
  // porque Google prohíbe pedirles reseñas solo a quienes quedaron conformes. El corazón solo agradece.
  // urlResenas: link "Pedir reseñas" de la ficha de Google (tipo https://g.page/r/…/review).
  // Mientras sea null, el botón lleva a la ficha en Google Maps.
  corazon: {
    pregunta: '¿Te atendiste en LuGia?',
    gracias: '¡Gracias!',
    texto: 'Contá en Google cómo fue tu experiencia: tu opinión ayuda a otras personas a elegir.',
    boton: 'Dejar mi reseña en Google',
    ayuda: 'Mandar un corazón al consultorio',
    urlResenas: 'https://g.page/r/CchXfn0V4yCgEBM/review',
  },

  cierre: {
    titulo: '¿Hace cuánto no te hacés un control?',
    texto: 'Pedí tu turno en LuGia.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/equipamiento.webp',
  },

  contacto: {
    etiqueta: 'Contacto',
    titulo: 'Te esperamos en LuGia',
    texto: 'Escribinos por WhatsApp: te respondemos en el horario de atención.',
    telefono: null,
    email,
    comoLlegar: 'Cómo llegar',
    mapaTitulo: 'Mapa de LuGia',
    filas: { telefono: 'Teléfono', email: 'Email', direccion: 'Dirección', horarios: 'Horarios' },
    direccion: 'Pública 6 N.º 3753, Barrio Jardín Horizonte, Córdoba',
    horarios: 'Lunes a viernes, con turno previo', // agenda variable (varios consultorios): sin horas publicadas
    mapa: 'Pública 6 3753, Jardín Horizonte, Córdoba, Argentina',
    // "Cómo llegar" abre la ruta hacia la ficha de Google (por su ID de lugar), no hacia la dirección suelta.
    urlMapa: 'https://www.google.com/maps/dir/?api=1&destination=Consultorio%20Odontol%C3%B3gico%20LuGia&destination_place_id=ChIJMUmWLOCjMpQRyFd-fRXjIKA',
    mapaIdFicha: '11538471926762461128', // ID de la ficha de Google: el mapa embebido muestra el consultorio
    mapaCoordenadas: '-31.4569977,-64.156729', // ubicación de la ficha (respaldo si no hay mapaIdFicha)
  },

  pagos: {
    titulo: 'Atención particular',
    lista: ['Efectivo', 'Transferencia', 'Tarjetas', 'Cuotas'],
    nota: 'Los valores se informan en la consulta.',
  },

  aviso: 'Este sitio es informativo y no reemplaza la consulta profesional.',

  pie: {
    secciones: 'Secciones',
    contacto: 'Contacto',
    legalTitulo: 'Términos y política de privacidad',
    legal: [
      'Esta página es informativa y no reemplaza la consulta profesional. Los valores de los tratamientos se informan en la consulta.',
      'El pedido de turno arma un mensaje con los datos que completás (motivo, nombre, edad, horario preferido) y lo abre en WhatsApp para que lo envíes vos. La página no guarda esos datos ni los comparte con terceros: solo llegan al consultorio si enviás el mensaje, y se usan únicamente para coordinar tu turno.',
      'No escribas diagnósticos ni datos médicos en el pedido: eso se conversa en la consulta.',
      `Para consultar o borrar tus datos, escribinos por WhatsApp o a ${email}.`,
    ],
    derechos: 'Todos los derechos reservados',
    cookies: 'Esta página usa cookies para medir las visitas.',
  },

  medicion: { ga4: 'G-TXQT7T56NC', metaPixel: '' },
  redes: { instagram: null, facebook: null },
}
