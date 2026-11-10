// Textos de /limpieza-dental. Se revisan con docs/PAGINA-LIMPIEZA-DENTAL.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
/** @type {import('../tipos.js').PaginaTratamiento} */
export const limpieza = {
  ruta: '/limpieza-dental',
  tratamiento: 'Limpieza dental',
  otroNombre: 'Limpieza de dientes',
  seo: {
    prioridad: 0.5, // peso de la página en el sitemap (la principal es 1.0)
    titulo: 'Limpieza dental en Córdoba | LuGia',
    descripcion: 'Limpieza dental con ultrasonido, pulido y flúor, también en adultos. Od. Luciana Gianello (MP 7700), Jardín Horizonte, Córdoba. Turnos por WhatsApp.',
    imagen: '/fotos/equipamiento.webp',
  },
  gama: 'damasco',
  formaFotos: 'circulo',
  fondo: 'ondasSuaves',
  orden: ['destacado', 'que', 'frecuencia', 'preguntas', 'experiencia'],
  portada: {
    tono: 'rosa',
    icono: 'gota',
    etiqueta: 'Limpieza dental · Jardín Horizonte, Córdoba',
    titulo: '¿Es lo mismo una limpieza que un blanqueamiento?',
    respuesta: {
      corta: 'No.',
      texto: 'La limpieza saca el sarro y la placa de los dientes. El blanqueamiento aclara su color. Acá hacemos las dos, con la Od. Luciana Gianello (MP 7700), odontóloga.',
    },
    imagen: '/fotos/equipamiento.webp', // provisoria
    alt: 'Equipamiento del consultorio LuGia sobre la mesada',
  },
  destacado: {
    tipo: 'comparacion',
    etiqueta: 'Dos cosas distintas',
    titulo: 'No es lo mismo que un blanqueamiento',
    texto: 'Las dos son para cuidar tus dientes, pero cada una hace algo distinto. Se pueden hacer las dos, y en qué orden lo vemos en la consulta.',
    separador: 'y',
    opciones: [
      {
        titulo: 'Limpieza',
        dibujo: 'dienteConEnciaChico',
        filas: [
          { etiqueta: 'Para qué sirve', texto: 'Sacar el sarro y la placa' },
          { etiqueta: 'Cómo se hace', texto: 'Con ultrasonido, pulido y flúor' },
          { etiqueta: 'Cada cuánto', texto: 'Recomendamos una cada 6 meses' },
          { etiqueta: 'Cambia el color', texto: 'No aclara el color de fondo de los dientes' },
        ],
      },
      {
        titulo: 'Blanqueamiento',
        dibujo: 'dienteConBrilloChico',
        filas: [
          { etiqueta: 'Para qué sirve', texto: 'Aclarar el color de los dientes' },
          { etiqueta: 'Cómo se hace', texto: 'Con un gel, en el consultorio o en tu casa' },
          { etiqueta: 'Cada cuánto', texto: 'Lo definimos en la consulta, después de revisarte' },
          { etiqueta: 'Cambia el color', texto: 'Es lo que busca' },
        ],
      },
    ],
    nota: 'Si querés las dos, te lo contamos en la consulta y vemos cuál va primero.',
    enlace: { texto: 'Ver el blanqueamiento dental', ruta: '/blanqueamiento-dental' },
  },
  que: {
    etiqueta: 'La limpieza',
    titulo: 'Qué incluye',
    parrafos: [
      { resaltado: 'Ultrasonido.', texto: 'Una punta que vibra y desprende el sarro que se junta sobre los dientes y cerca de la encía.' },
      { resaltado: 'Pulido.', texto: 'Después de sacar el sarro, se pulen los dientes para que la superficie quede lisa.' },
      { resaltado: 'Flúor.', texto: 'Se aplica al final, para cuidar el esmalte.' },
      'También la hacemos en adultos, y la recomendamos cada 6 meses.',
    ],
    dibujo: {
      tipo: 'dienteConEncia',
      alt: 'Dibujo simple de un diente con el borde de la encía y el sarro señalados',
      partes: ['Encía', 'Sarro'],
    },
  },
  // Segundo bloque propio: va en `orden` con su nombre.
  frecuencia: {
    tipo: 'calendario',
    etiqueta: 'Cada 6 meses',
    titulo: '¿Cuándo te toca la próxima?',
    texto: 'Recomendamos una limpieza cada 6 meses, junto con el control. Tocá el mes de tu última limpieza y fijate cuándo te toca.',
    meses: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    cadaCuantosMeses: 6,
    icono: 'gota',
    inicial: 'Elegí el mes de tu última limpieza.',
    resultado: 'Si la última fue en {ultima}, la próxima te toca en {proxima}.',
    sinFecha: { boton: 'No me acuerdo', texto: 'Entonces conviene que la hagamos ahora. Pedí tu turno y vemos cómo están tus dientes.' },
    nota: 'Es una guía general: en la consulta te decimos cada cuánto te conviene a vos.',
  },
  preguntas: [
    { pregunta: '¿Cada cuánto conviene hacerla?', respuesta: 'Recomendamos una limpieza cada 6 meses, junto con el control.' },
    { pregunta: '¿Se hace también en adultos?', respuesta: 'Sí. Es un cuidado para cualquier edad. Si es para un chico, mirá cómo atendemos en la página de odontopediatría.' },
    { pregunta: '¿Qué es el sarro?', respuesta: 'Es la placa, esa capa blanda que se forma sobre los dientes, cuando se endurece. Con el cepillo no sale: hay que sacarlo en el consultorio.' },
    { pregunta: '¿Y si me sangran las encías?', respuesta: 'Contanoslo cuando pidas el turno. En la consulta te revisamos y te explicamos qué hace falta.' },
    { pregunta: '¿Cuánto sale?', respuesta: 'Se informa en la consulta. La atención es particular, sin obras sociales.' },
  ],
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto: 'Hace limpiezas con ultrasonido, pulido y flúor, también en adultos. Este es uno de sus cursos sobre el tema:',
    cursos: ['Terapia básica periodontal (UNC)'],
    enlace: 'Ver toda su formación',
  },
  otrosTratamientos: {
    texto: '¿Querés además aclarar el color de tus dientes?',
    enlaces: [
      { texto: 'Blanqueamiento dental', ruta: '/blanqueamiento-dental' },
      { texto: 'Odontopediatría', ruta: '/odontopediatria' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Te toca la limpieza de los 6 meses?',
    texto: 'Contanos por WhatsApp cuándo fue la última y coordinamos el día.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/sala-de-espera.webp', // provisoria
  },
}
