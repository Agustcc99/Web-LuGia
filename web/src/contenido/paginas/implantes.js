// Textos de /implantes. Se revisan con docs/PAGINA-IMPLANTES.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
// Cuidado: el implante y los injertos los hace otro profesional. Acá nunca se dice que los hace la Od. Luciana.
/** @type {import('../tipos.js').PaginaTratamiento} */
export const implantes = {
  ruta: '/implantes',
  tratamiento: 'Implantes',
  otroNombre: 'Implantes dentales',
  seo: {
    prioridad: 0.5, // peso de la página en el sitemap (la principal es 1.0)
    titulo: 'Implantes dentales en Córdoba | LuGia',
    descripcion: 'Coronas, puentes y prótesis sobre implantes con la Od. Luciana Gianello (MP 7700). El implante lo coloca otro profesional, en el consultorio. Córdoba.',
    imagen: '/fotos/sillon.webp',
  },
  gama: 'noche',
  formaFotos: 'chaflan',
  fondo: 'ejeConMarcas',
  orden: ['destacado', 'que', 'atencion', 'antes', 'preguntas', 'experiencia'],
  portada: {
    tono: 'degradado',
    icono: 'herramienta',
    etiqueta: 'Implantes · Jardín Horizonte, Córdoba',
    titulo: '¿Quién te coloca el implante?',
    respuesta: {
      corta: 'Otro profesional, en nuestro consultorio.',
      texto: 'La Od. Luciana Gianello (MP 7700), odontóloga, hace lo que va encima: la corona, el puente o la prótesis.',
    },
    imagen: '/fotos/sillon.webp', // provisoria
    alt: 'Sillón del consultorio LuGia',
  },
  destacado: {
    tipo: 'reparto',
    etiqueta: 'Dos profesionales, un consultorio',
    titulo: 'Quién hace cada parte',
    texto: 'Un implante lleva dos trabajos distintos. Los dos se hacen acá, y cada uno lo hace un profesional.',
    columnas: [
      { nombre: 'Od. Luciana Gianello', detalle: 'Odontóloga · MP 7700' },
      { nombre: 'Otro profesional', detalle: 'Atiende en nuestro consultorio' },
    ],
    // `columna` dice quién hace el paso: 0 es la primera columna y 1, la segunda.
    pasos: [
      { columna: 0, titulo: 'Te revisa', texto: 'Mira los espacios donde faltan dientes, tu edad y tu salud general.' },
      { columna: 0, titulo: 'Pide la tomografía', texto: 'Es una Cone Beam y se hace afuera del consultorio.' },
      { columna: 1, titulo: 'Hace el injerto de hueso, si hace falta', texto: 'Con membranas, antes del implante.' },
      { columna: 1, titulo: 'Coloca el implante' },
      { columna: 0, titulo: 'Hace lo que va encima', texto: 'La corona, el puente o la prótesis sobre el implante.' },
      { columna: 0, titulo: 'Te controla', texto: 'Con un control en el consultorio y una radiografía.' },
    ],
    nota: 'No todos los casos pasan por todos los pasos. Cuáles hacen falta en el tuyo te lo decimos después de revisarte y de ver la tomografía.',
    enlace: { texto: 'Ver coronas y prótesis', ruta: '/protesis-y-coronas' },
  },
  que: {
    etiqueta: 'El tratamiento',
    titulo: 'Qué es un implante',
    parrafos: [
      { resaltado: 'El implante', texto: 'es una pieza que se coloca en el hueso, donde falta un diente, y hace de raíz.' },
      { resaltado: 'Lo que va encima', texto: 'es lo que se ve y con lo que masticás: una corona si falta un diente, o un puente o una prótesis si faltan varios.' },
      'Por eso son dos trabajos. En LuGia el primero lo hace otro profesional y el segundo, la Od. Luciana.',
    ],
    dibujo: {
      tipo: 'implanteJuntoADiente',
      alt: 'Dibujo simple de un implante con su corona al lado de un diente natural',
      partes: ['Corona', 'Implante', 'Diente natural'],
    },
  },
  atencion: {
    etiqueta: 'En LuGia',
    titulo: 'Cómo empieza',
    pasos: [
      { titulo: 'Pedís tu turno', texto: 'Contanos qué diente te falta, o cuáles. Por WhatsApp o con el pedido de turno, y coordinamos el día.' },
      { titulo: 'Primera consulta', texto: 'Te revisamos y charlamos sobre tu salud. No hace falta que traigas nada.' },
      { titulo: 'Tomografía', texto: 'Te pedimos una tomografía Cone Beam. Se hace afuera, en un centro de diagnóstico, y la traés a la consulta siguiente.' },
      { titulo: 'Te explicamos el plan', texto: 'Qué pasos hacen falta en tu caso, quién hace cada uno y los valores, antes de empezar.' },
    ],
  },
  // Segundo bloque propio: va en `orden` con su nombre.
  antes: {
    tipo: 'anotador',
    etiqueta: 'Para la primera consulta',
    titulo: 'Lo que nos tenés que contar',
    texto: 'No hace falta traer nada, pero sí que nos cuentes esto. Podés ir tildando lo que ya tenés pensado.',
    elementos: ['Qué enfermedades tenés o tuviste', 'Qué medicación tomás, toda, aunque no sea para la boca', 'Tus hábitos', 'Qué dientes te faltan'],
    aviso: {
      titulo: 'Si tomás bisfosfonatos',
      texto: 'Son una medicación para los huesos. Avisanos antes de empezar: tu caso se evalúa en particular. No la dejes por tu cuenta: hablalo primero con tu médico.',
    },
    nota: 'Con eso y la tomografía vemos si un implante es para vos.',
  },
  preguntas: [
    { pregunta: '¿Cuánto sale un implante?', respuesta: 'Se informa en la consulta, cuando ya sabemos qué pasos hacen falta en tu caso. La atención es particular, sin obras sociales.' },
    { pregunta: '¿Tengo que ir a otro consultorio?', respuesta: 'Para el implante, no: el profesional que lo coloca atiende en el nuestro. Solo la tomografía se hace afuera.' },
    { pregunta: '¿Qué estudio me van a pedir?', respuesta: 'Una tomografía Cone Beam. Te la pedimos en la primera consulta y se hace afuera del consultorio.' },
    {
      pregunta: '¿Y si no tengo hueso suficiente?',
      respuesta: 'Una opción es hacer antes un injerto de hueso con membranas. Lo hace el mismo profesional que coloca el implante, en el consultorio. Si hace falta, se ve con la tomografía.',
    },
    { pregunta: '¿Cuánto tiempo lleva?', respuesta: 'Depende de cada caso. Te lo decimos después de revisarte y de ver la tomografía.' },
    { pregunta: '¿Qué controles hay después?', respuesta: 'Un control en el consultorio y una radiografía, que también hacemos acá.' },
  ],
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto: 'Hace las coronas, los puentes y las prótesis que van sobre los implantes. Estos son sus cursos sobre el tema:',
    cursos: ['Rehabilitación sobre Implantes (Círculo Odontológico de Córdoba)', 'Reconstrucción de maxilares atróficos (UNC)'],
    enlace: 'Ver toda su formación',
  },
  otrosTratamientos: {
    texto: '¿Querés ver otras formas de reponer un diente?',
    enlaces: [
      { texto: 'Prótesis, pernos y coronas', ruta: '/protesis-y-coronas' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Te falta un diente?',
    texto: 'Contanos por WhatsApp cuál y coordinamos una primera consulta para revisarte.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/sala-de-espera.webp', // provisoria
  },
}
