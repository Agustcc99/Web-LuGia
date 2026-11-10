// Textos de /odontopediatria. Se revisan con docs/PAGINA-ODONTOPEDIATRIA.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
/** @type {import('../tipos.js').PaginaTratamiento} */
export const odontopediatria = {
  ruta: '/odontopediatria',
  tratamiento: 'Odontopediatría',
  otroNombre: 'Atención odontológica para niños',
  formaFotos: 'hoja',
  seo: {
    prioridad: 0.6, // peso de la página en el sitemap (la principal es 1.0)
    titulo: 'Odontopediatría: atención a niños desde los 5 años | LuGia',
    descripcion: 'Atención odontológica para niños desde los 5 años con la Od. Luciana Gianello (MP 7700), odontóloga. Jardín Horizonte, Córdoba. Turnos por WhatsApp.',
    imagen: '/fotos/sillon.webp',
  },
  fondo: 'formasRedondeadas',
  orden: ['que', 'cuando', 'atencion', 'preguntas', 'experiencia'],
  portada: {
    tono: 'rosa',
    icono: 'nino',
    etiqueta: 'Tratamientos · Jardín Horizonte, Córdoba',
    titulo: 'Odontopediatría: atención a niños desde los 5 años',
    texto: 'Una consulta para revisar los dientes de tu hijo o hija y explicarte cómo cuidarlos en casa. Te atiende la Od. Luciana Gianello (MP 7700), odontóloga.',
    imagen: '/fotos/sillon.webp',
    alt: 'Sillón odontológico rosa del consultorio LuGia',
  },
  que: {
    etiqueta: 'El tratamiento',
    titulo: 'Qué es la odontopediatría',
    parrafos: [
      'La odontopediatría es la parte de la odontología que se ocupa de la boca de los chicos: los dientes de leche, los permanentes que van saliendo y los hábitos que ayudan a cuidarlos.',
      'Los dientes de leche también importan. Sirven para masticar y hablar, y le marcan el camino a los permanentes. Una caries sin tratar puede traer dolor o una infección, y complicar cosas de todos los días, como comer, jugar o ir a la escuela.',
      'Por eso conviene revisarlos, aunque se vayan a caer.',
    ],
    dibujo: {
      tipo: 'dienteDeLeche',
      alt: 'Dibujo simple de la encía en corte: arriba, un diente de leche; debajo, el diente permanente que se está formando y espera su lugar',
      partes: ['Diente de leche', 'Encía', 'Diente permanente'],
    },
  },
  cuando: {
    etiqueta: 'Momentos y señales',
    titulo: 'Cuándo conviene consultar',
    texto:
      'No hace falta esperar a que algo duela. Una revisión sirve para ver cómo están los dientes y encontrar a tiempo lo que haga falta. Qué conviene hacer lo define la revisión en la consulta.',
    listas: [
      {
        titulo: 'Buenos momentos para una consulta',
        elementos: [
          'Si todavía no hizo su primera revisión',
          'Cuando salen los primeros molares permanentes, alrededor de los 6 años',
          'Si tenés dudas sobre el cepillado o la pasta dental',
          'Si tenés dudas sobre hábitos como chuparse el dedo',
        ],
      },
      {
        titulo: 'Señales para consultar',
        elementos: [
          'Dolor de muela o dolor al masticar',
          'Molestia con lo dulce, lo frío o lo caliente',
          'Manchas blancas, marrones o negras en un diente, o un agujerito',
          'Encías rojas o doloridas',
          'Un golpe en un diente, aunque no se vea la rotura',
        ],
      },
    ],
    nota: 'Estas señales no alcanzan para saber qué tiene, y al principio una caries puede no dar ninguna molestia. Para saberlo hay que revisar los dientes.',
  },
  atencion: {
    etiqueta: 'En LuGia',
    titulo: 'Cómo es la atención',
    pasos: [
      {
        titulo: 'Pedís el turno',
        texto: 'Nos escribís por WhatsApp o completás el pedido de turno con el nombre y la edad de tu hijo o hija, y el nombre del adulto responsable. Coordinamos el día que les quede mejor.',
      },
      { titulo: 'Antes de venir', texto: 'Lo mejor es no asustarlo. Si tiene miedo o nervios, avisanos al pedir el turno: vamos a su ritmo y le explicamos cada paso.' },
      {
        titulo: 'Conocernos y revisar los dientes',
        texto:
          'Lo primero es conocerlo y darle confianza. Un adulto tiene que acompañarlo y puede entrar con él al consultorio. Miramos cómo están los dientes y te contamos con palabras simples lo que vemos. Podés preguntar todo lo que quieras.',
      },
      {
        titulo: 'Te contamos cómo seguir',
        texto:
          'Si hace falta un tratamiento, te explicamos las opciones antes de empezar. Las extracciones se hacen en otro turno. También te damos pautas para cuidar los dientes en casa, y los controles son cada 6 meses.',
      },
    ],
  },
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto:
      'Es odontóloga y, a lo largo de su carrera, atendió a muchos niños. Hoy atiende a niños desde los 5 años y a adultos, y sigue formándose. Estos son algunos de sus cursos relacionados con el tema:',
    cursos: ['Salud pública y prevención en odontología (Colegio Odontológico)', 'El niño y la odontología de hoy (UNC)'],
    enlace: 'Ver toda su formación',
  },
  preguntas: [
    {
      pregunta: '¿Qué tratamientos hacen en los chicos?',
      respuesta:
        'Controles, limpiezas, flúor, selladores, arreglos, extracciones de dientes de leche y tratamientos de conducto. Los conductos se hacen desde los 6 años. Qué necesita cada chico lo definimos después de revisarlo.',
    },
    {
      pregunta: '¿Desde qué edad atienden?',
      respuesta: 'Desde los 5 años. Si tu hijo o hija es más chico, lo derivamos a una consulta de odontopediatría para niños pequeños: no hace falta esperar a los 5 años para una primera revisión.',
    },
    {
      pregunta: '¿Quién atiende a los chicos?',
      respuesta: 'La Od. Luciana Gianello (MP 7700). Es odontóloga, no tiene la especialización en odontopediatría y, a lo largo de su carrera, atendió a muchos niños.',
    },
    {
      pregunta: '¿Por qué tratar un diente de leche si se va a caer?',
      respuesta:
        'Porque mientras está en la boca sirve para masticar y hablar, y le marca el camino al permanente. Una caries sin tratar puede doler o infectarse. Qué conviene hacer con cada diente lo vemos en la consulta.',
    },
    {
      pregunta: '¿Le va a doler?',
      respuesta: 'Depende de lo que haga falta, y por eso primero lo revisamos. Si un tratamiento necesita anestesia, usamos anestesia local. Si tiene miedo o nervios, contanoslo al pedir el turno.',
    },
    { pregunta: '¿Cada cuánto conviene un control?', respuesta: 'Cada 6 meses, y no hace falta esperar a que algo duela.' },
    {
      pregunta: '¿Cómo puedo ayudar en casa?',
      respuesta:
        'Con el cepillado dos veces por día, con pasta con flúor y sin tragarla. Un adulto puede ayudar o mirar hasta que lo haga bien solo, por lo general hasta los 7 años como mínimo. También ayuda dejar lo dulce para las comidas. En la consulta te damos pautas para su caso.',
    },
    { pregunta: '¿Hacen ortodoncia?', respuesta: 'No hacemos ortodoncia. Si en la revisión vemos que hace falta, te derivamos con un profesional que la haga.' },
    {
      pregunta: '¿Cuánto sale la consulta de un chico? ¿Hay obra social?',
      respuesta: 'La atención es particular, sin obras sociales. Los valores se informan en la consulta, y se puede pagar en efectivo, por transferencia o con tarjeta, también en cuotas.',
    },
  ],
  otrosTratamientos: {
    texto: 'También atendemos a adultos.',
    enlaces: [
      { texto: 'Endodoncia y tratamiento de conducto', ruta: '/endodoncia' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Querés que revisemos sus dientes?',
    texto: 'Pedí el turno por WhatsApp. Atención particular para niños desde los 5 años en Jardín Horizonte, Córdoba.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/sala-de-espera.webp',
  },
}
