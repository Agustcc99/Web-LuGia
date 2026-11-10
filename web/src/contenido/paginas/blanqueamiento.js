// Textos de /blanqueamiento-dental. Se revisan con docs/PAGINA-BLANQUEAMIENTO.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
export const blanqueamiento = {
  ruta: '/blanqueamiento-dental',
  tratamiento: 'Blanqueamiento dental',
  otroNombre: 'Blanqueamiento de dientes',
  seo: {
    titulo: 'Blanqueamiento dental en Córdoba | LuGia',
    descripcion: 'Blanqueamiento dental en consultorio o en casa, previa revisión, también en dientes con conducto. Od. Luciana Gianello (MP 7700), Jardín Horizonte, Córdoba.',
    imagen: '/fotos/sala-de-espera.webp',
  },
  gama: 'bruma',
  formaFotos: 'ventana',
  fondo: 'destellosChicos',
  orden: ['que', 'cuando', 'destacado', 'atencion', 'preguntas', 'experiencia'],
  portada: {
    tono: 'blanco',
    icono: 'brillo',
    etiqueta: 'Tratamientos · Jardín Horizonte, Córdoba',
    titulo: 'Blanqueamiento dental en Córdoba',
    texto:
      'Antes de blanquear te revisamos la boca: si tenés arreglos por hacer o mucha sensibilidad, lo charlamos primero. Lo hacemos en el consultorio o en tu casa, y también blanqueamos dientes con conducto que se oscurecieron. Te atiende la Od. Luciana Gianello (MP 7700), odontóloga.',
    imagen: '/fotos/sala-de-espera.webp', // provisoria
    alt: 'Sala de espera del consultorio LuGia, con sillones y plantas',
  },
  que: {
    etiqueta: 'El tratamiento',
    titulo: 'Qué es un blanqueamiento',
    parrafos: [
      'El blanqueamiento aclara el color de tus dientes. Se hace con un gel que se aplica sobre ellos, y no los desgasta ni cambia su forma.',
      'Lo hacemos de dos maneras: en el consultorio, o en tu casa, que es lo que se llama ambulatorio. Antes revisamos tu boca para ver si conviene.',
      'También se puede blanquear un diente con conducto que se oscureció. Si es tu caso, abajo te dejamos el link a la página de endodoncia.',
    ],
    dibujo: {
      tipo: 'dienteConBrillos',
      alt: 'Dibujo simple de un diente con el esmalte, la capa de afuera, y la dentina, la de abajo, señalados, y unos brillos alrededor',
      partes: ['Esmalte', 'Dentina'],
    },
  },
  cuando: {
    etiqueta: 'Antes de empezar',
    titulo: 'Cuándo no conviene blanquear',
    texto: 'No todas las bocas están listas para un blanqueamiento. Por eso, antes de empezar, la revisamos. Qué conviene en tu caso lo definimos en la consulta.',
    listas: [
      {
        titulo: 'Lo que revisamos antes',
        elementos: ['Si hay arreglos por hacer', 'Cuánta sensibilidad tenés en los dientes', 'Si tenés arreglos o coronas a la vista, porque no cambian de color con el blanqueamiento'],
      },
      {
        titulo: 'Cuándo no lo recomendamos',
        icono: 'menos',
        elementos: ['Si tenés mucha sensibilidad dentaria', 'En otros casos que vemos en la consulta, después de revisarte'],
      },
    ],
    nota: 'Es una guía general. Si el blanqueamiento no es para vos, te lo decimos y te explicamos qué otras opciones hay.',
  },
  destacado: {
    tipo: 'comparacion',
    etiqueta: 'Dos maneras',
    titulo: 'En el consultorio o en casa',
    texto: 'Hacemos las dos. Cuál conviene lo definimos en la consulta, después de revisarte.',
    separador: 'o',
    opciones: [
      {
        titulo: 'En el consultorio',
        dibujo: 'dienteConBrilloGrande',
        filas: [
          { etiqueta: 'Dónde', texto: 'Acá, en el consultorio' },
          { etiqueta: 'Quién lo aplica', texto: 'Lo aplicamos nosotros' },
          { etiqueta: 'Antes de empezar', texto: 'Revisamos tu boca' },
          { etiqueta: 'Después', texto: 'Cuidados e indicaciones para los días siguientes' },
        ],
      },
      {
        titulo: 'En casa (ambulatorio)',
        dibujo: 'dienteConBrilloChico',
        filas: [
          { etiqueta: 'Dónde', texto: 'En tu casa' },
          { etiqueta: 'Quién lo aplica', texto: 'Lo hacés vos, siguiendo las indicaciones que te damos' },
          { etiqueta: 'Antes de empezar', texto: 'Revisamos tu boca' },
          { etiqueta: 'Después', texto: 'Cuidados e indicaciones para los días siguientes' },
        ],
      },
    ],
    nota: 'En los dos casos, si aparece sensibilidad, te indicamos flúor o pastas desensibilizantes.',
  },
  atencion: {
    etiqueta: 'En LuGia',
    titulo: 'Cómo es la atención',
    pasos: [
      { titulo: 'Pedís tu turno', texto: 'Por WhatsApp o con el pedido de turno. Contanos qué querés mejorar y coordinamos el día.' },
      { titulo: 'Revisamos tu boca', texto: 'Vemos si hay arreglos por hacer y cuánta sensibilidad tenés.' },
      { titulo: 'Elegimos cómo hacerlo', texto: 'En el consultorio o en casa, según lo que conviene en tu caso.' },
      { titulo: 'Te explicamos los cuidados', texto: 'Por unos días indicamos una dieta blanca y te decimos cómo seguir. Si hay sensibilidad, indicamos flúor o pastas desensibilizantes.' },
    ],
  },
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto: 'Hace blanqueamientos en el consultorio y ambulatorios, también en dientes con conducto que se oscurecieron. Este es uno de sus cursos sobre el tema:',
    cursos: ['Blanqueamiento dentario en dientes vitales y no vitales (Instituto Claro de Sierra)'],
    enlace: 'Ver toda su formación',
  },
  preguntas: [
    { pregunta: '¿Es lo mismo una limpieza que un blanqueamiento?', respuesta: 'No. La limpieza saca el sarro y la placa de los dientes; el blanqueamiento aclara su color. Se pueden hacer los dos, y el orden lo vemos en la consulta.' },
    { pregunta: '¿Da sensibilidad?', respuesta: 'Algunas personas sienten sensibilidad después. Por eso, antes de empezar vemos cuánta tenés: si es mucha, no lo recomendamos. Si aparece, te indicamos flúor o pastas desensibilizantes.' },
    { pregunta: '¿Qué es la dieta blanca?', respuesta: 'Son comidas y bebidas que no manchan, como arroz, pollo, pastas o leche. La indicamos por unos días después del blanqueamiento y te explicamos cómo seguir.' },
    { pregunta: '¿Qué tono van a tener mis dientes?', respuesta: 'No prometemos un tono: depende de cada persona y de cada diente. En la consulta te contamos qué se puede esperar en tu caso.' },
    { pregunta: '¿Se puede blanquear un diente con conducto que se oscureció?', respuesta: 'Sí, lo hacemos. Si todavía no te hicieron el conducto, en la página de endodoncia está explicado cómo es el tratamiento.' },
    { pregunta: '¿Y los arreglos o las coronas que ya tengo?', respuesta: 'No cambian de color con el blanqueamiento. Si tenés alguno a la vista, lo vemos antes de empezar. Qué conviene hacer con ellos lo definimos en la consulta.' },
    { pregunta: '¿Cuánto sale?', respuesta: 'Se informa en la consulta, cuando ya te revisamos y vimos cuál de las dos maneras conviene. La atención es particular, sin obras sociales.' },
  ],
  otrosTratamientos: {
    texto: '¿Se te oscureció un diente con conducto?',
    enlaces: [
      { texto: 'Endodoncia y tratamiento de conducto', ruta: '/endodoncia' },
      { texto: 'Limpieza dental', ruta: '/limpieza-dental' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Querés saber si te conviene blanquear?',
    texto: 'Contanos por WhatsApp qué querés mejorar. Te revisamos la boca y vemos si lo hacemos en el consultorio o en tu casa.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/sillon.webp', // provisoria
  },
}
