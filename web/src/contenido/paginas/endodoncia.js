// Textos de /endodoncia. Se revisan con docs/PAGINA-ENDODONCIA.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
export const endodoncia = {
  ruta: '/endodoncia',
  tratamiento: 'Endodoncia',
  otroNombre: 'Tratamiento de conducto',
  formaFotos: 'capsula',
  seo: {
    titulo: 'Endodoncia y tratamiento de conducto en Córdoba | LuGia',
    descripcion:
      'Tratamiento de conducto con la Od. Luciana Gianello (MP 7700), más de 20 años de experiencia en endodoncia. Jardín Horizonte, Córdoba. Turnos por WhatsApp.',
    imagen: '/fotos/equipamiento.webp',
  },
  gama: 'durazno',
  fondo: 'conducto', // detalle propio del tratamiento (ver paginas/dibujos.jsx)
  portada: {
    tono: 'rosa',
    icono: 'raiz',
    etiqueta: 'Tratamientos · Jardín Horizonte, Córdoba',
    titulo: 'Endodoncia y tratamiento de conducto en Córdoba',
    texto:
      'Cuando la parte interna de un diente se inflama o se infecta, el tratamiento de conducto busca conservarlo. Te atiende la Od. Luciana Gianello (MP 7700), con más de 20 años de experiencia en endodoncia.',
    imagen: '/fotos/equipamiento.webp',
    alt: 'Mesada con equipamiento e instrumental del consultorio LuGia',
  },
  que: {
    etiqueta: 'El tratamiento',
    titulo: 'Qué es el tratamiento de conducto',
    parrafos: [
      'Adentro de cada diente hay un tejido blando, la pulpa, que tiene nervios y vasos sanguíneos. Cuando la pulpa se inflama o se infecta, puede doler y, si no se trata, puede formarse un absceso.',
      'El tratamiento de conducto, que también se llama endodoncia, consiste en sacar esa pulpa, limpiar y desinfectar el interior del diente, y después rellenarlo y sellarlo.',
      'El objetivo es conservar tu propio diente. La otra opción suele ser sacarlo.',
    ],
    dibujo: {
      tipo: 'diente',
      alt: 'Dibujo simple de un diente por dentro, con el esmalte, la dentina, la pulpa y los conductos señalados',
      partes: ['Esmalte', 'Dentina', 'Pulpa', 'Conductos'],
    },
  },
  cuando: {
    etiqueta: 'Señales y causas',
    titulo: 'Cuándo hace falta',
    texto: 'Hace falta cuando la pulpa está inflamada o en proceso de necrosis, es decir, cuando ese tejido se va muriendo. Suele pasar por caries muy profundas o golpes. Lo define la revisión en la consulta, donde también vemos si el diente se puede conservar.',
    listas: [
      {
        titulo: 'Señales para consultar',
        elementos: ['Dolor al masticar o al tocar el diente', 'Molestia con el frío o el calor que sigue un rato después', 'Encía hinchada o sensible, o un granito en la encía', 'Un diente que se oscureció'],
      },
      {
        titulo: 'Causas frecuentes',
        elementos: ['Una caries muy profunda', 'Un diente roto, astillado o fisurado', 'Un golpe en el diente, aunque no se vea la rotura', 'Varios arreglos en el mismo diente'],
      },
    ],
    nota: 'Las señales no alcanzan para saber si necesitás el tratamiento, y a veces no hay ninguna molestia. Para saberlo hay que revisar el diente.',
  },
  atencion: {
    etiqueta: 'En LuGia',
    titulo: 'Cómo es la atención',
    pasos: [
      { titulo: 'Pedís tu turno', texto: 'Nos escribís por WhatsApp o completás el pedido de turno. Te pasamos los días libres y confirmamos el que te quede mejor.' },
      { titulo: 'Revisamos el diente', texto: 'Hacemos la radiografía en el consultorio y te explicamos qué tiene el diente y qué opciones hay antes de empezar. Podés preguntar todo lo que quieras.' },
      { titulo: 'Hacemos el tratamiento', texto: 'Trabajamos con anestesia local y hacemos endodoncia mecanizada. Sacamos la pulpa dañada, limpiamos y desinfectamos el interior del diente, y lo rellenamos y sellamos.' },
      { titulo: 'Protegemos el diente', texto: 'Después hace falta restaurarlo con un arreglo o una corona. Te explicamos qué conviene en tu caso y cómo cuidarlo.' },
    ],
  },
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto: 'Tiene más de 20 años de experiencia en endodoncia y otros odontólogos le mandan pacientes para hacer conductos. Sigue formándose, y estos son algunos de sus cursos sobre el tema:',
    cursos: [
      'Diplomado en Endodoncia Mecanizada (Instituto Claro de Sierra)',
      'Endodoncia Regenerativa (Instituto Claro de Sierra)',
      'Biocerámicos: usos clínicos (Instituto Claro de Sierra)',
      'Segunda Jornada Internacional de Endodoncia y Reconstrucción',
      'Endodoncia mecanizada y termoplastización (Fundación Creo)',
      'Endodoncia contemporánea (Colegio Odontológico)',
    ],
    enlace: 'Ver toda su formación',
  },
  preguntas: [
    { pregunta: '¿Endodoncia y tratamiento de conducto son lo mismo?', respuesta: 'Sí. Endodoncia es el nombre técnico y tratamiento de conducto es como se lo conoce en general.' },
    {
      pregunta: '¿Duele?',
      respuesta:
        'Se hace con anestesia local, para trabajar sobre esa zona. Es muy común sentir nervios: contanoslo al pedir el turno, vamos a tu ritmo y te explicamos cada paso. Después puede haber algo de molestia: te decimos qué esperar y, si hace falta, te indicamos qué tomar.',
    },
    { pregunta: '¿Cuántas sesiones lleva?', respuesta: 'Por lo general, una. Te lo confirmamos después de revisar el diente.' },
    { pregunta: '¿Qué pasa con el diente después?', respuesta: 'Hay que restaurarlo con un arreglo o una corona para protegerlo. Te explicamos qué conviene en tu caso.' },
    {
      pregunta: '¿Se puede sacar el diente en lugar de hacer el conducto?',
      respuesta: 'Es la otra opción y también hacemos extracciones. En la consulta te explicamos qué implica cada camino en tu caso, para que decidas con toda la información.',
    },
    { pregunta: '¿Se puede repetir un conducto hecho antes?', respuesta: 'Sí, se llama retratamiento y también lo hacemos. Primero revisamos el diente y te decimos si es una opción en tu caso.' },
    { pregunta: '¿Hacen conductos en muelas?', respuesta: 'Sí, en todos los dientes, también en los molares.' },
    { pregunta: '¿Hacen conductos en niños?', respuesta: 'Sí, desde los 6 años. Contanos la edad al pedir el turno.' },
    { pregunta: '¿Cuánto sale?', respuesta: 'Los valores se informan en la consulta, una vez que revisamos tu caso.' },
    { pregunta: '¿Trabajan con obras sociales?', respuesta: 'No, la atención es particular. Se puede pagar en efectivo, por transferencia o con tarjeta, y también en cuotas.' },
    { pregunta: '¿Dónde atienden?', respuesta: 'En Pública 6 N.º 3753, Barrio Jardín Horizonte, Córdoba, de lunes a viernes y con turno previo. Los turnos se piden por WhatsApp.' },
  ],
  otrosTratamientos: {
    texto: 'También atendemos a niños desde los 5 años.',
    enlaces: [
      { texto: 'Odontopediatría', ruta: '/odontopediatria' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Querés que revisemos ese diente?',
    texto: 'Pedí tu turno por WhatsApp. Atención particular en Jardín Horizonte, Córdoba.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/sala-de-espera.webp',
  },
}
