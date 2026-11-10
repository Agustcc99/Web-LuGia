// Textos de /protesis-y-coronas. Se revisan con docs/PAGINA-PROTESIS-Y-CORONAS.md: si la Od. Luciana cambia algo, se cambia en los dos lugares.
export const protesis = {
  ruta: '/protesis-y-coronas',
  tratamiento: 'Prótesis, pernos y coronas',
  otroNombre: 'Coronas y prótesis dentales',
  formaFotos: 'esquina',
  seo: {
    titulo: 'Coronas, pernos y prótesis dentales en Córdoba | LuGia',
    descripcion:
      'Coronas de zirconio, porcelana y disilicato de litio, pernos y prótesis fijas o removibles. Od. Luciana Gianello (MP 7700), Jardín Horizonte, Córdoba.',
    imagen: '/fotos/sillon.webp',
  },
  gama: 'ciruela',
  fondo: 'lineaEnCapas',
  orden: ['destacado', 'que', 'cuando', 'atencion', 'preguntas', 'experiencia'],
  portada: {
    tono: 'bordo',
    icono: 'corona',
    etiqueta: 'Tratamientos · Jardín Horizonte, Córdoba',
    titulo: 'Prótesis, pernos y coronas en Córdoba',
    texto:
      'Junto con los conductos, los pernos y las coronas son lo que más hacemos en el consultorio. También reponemos dientes con prótesis fijas y removibles. Te atiende la Od. Luciana Gianello (MP 7700), odontóloga.',
    dibujo: {
      tipo: 'dienteEnCapas',
      alt: 'Dibujo simple de un diente en corte, con la corona, la reconstrucción, el perno y la raíz señalados',
      partes: ['Corona', 'Reconstrucción', 'Perno', 'Raíz'],
    },
  },
  que: {
    etiqueta: 'El tratamiento',
    titulo: 'Qué es cada cosa',
    parrafos: [
      {
        resaltado: 'Una corona',
        texto: 'es una pieza hecha a medida que cubre toda la parte visible de un diente, para protegerlo y devolverle su forma. Las hacemos de porcelana, zirconio y disilicato de litio. Las que más recomendamos son las de zirconio.',
      },
      {
        resaltado: 'Un perno',
        texto: 'es una pieza fina que va dentro de la raíz de un diente que ya tiene el conducto hecho. Ayuda a sostener lo que se reconstruye encima, y sobre eso va la corona. Solo se usa cuando queda poco diente arriba.',
      },
      {
        resaltado: 'Una prótesis',
        texto: 'repone los dientes que faltan. La fija queda firme en la boca. La removible se saca para limpiarla, puede ser parcial o completa, y la hacemos en acrílico o Flex. No derivamos ningún tipo de prótesis a otro consultorio.',
      },
    ],
  },
  cuando: {
    etiqueta: 'Qué necesita cada caso',
    titulo: 'Cuándo se usan',
    texto: 'Depende de cuánto diente sano queda y de cuántos dientes faltan. Lo definimos en la consulta, después de revisar tu boca y, si hace falta, de hacer una radiografía en el consultorio.',
    listas: [
      {
        titulo: 'Corona o perno',
        elementos: ['Un diente con conducto al que le queda poco tejido sano', 'Un diente muy roto o gastado', 'Un arreglo tan grande que ya debilitó el diente', 'Un implante que todavía no tiene su corona'],
      },
      {
        titulo: 'Prótesis',
        elementos: ['Te falta un diente o varios', 'Te faltan todos los de arriba o todos los de abajo', 'Tu prótesis se rompió o necesita un ajuste'],
      },
    ],
    nota: 'Es una guía general. Qué conviene en tu caso lo vemos en la consulta.',
  },
  destacado: {
    tipo: 'comparacion',
    etiqueta: 'Después de un conducto',
    titulo: '¿Arreglo o corona?',
    texto: 'Un diente con conducto se tiene que restaurar para protegerlo. Lo que define cómo es cuánto diente sano queda.',
    separador: 'o',
    opciones: [
      {
        titulo: 'Arreglo',
        dibujo: 'dienteConArreglo',
        filas: [
          { etiqueta: 'Cuándo', texto: 'Queda suficiente diente sano para restaurarlo así' },
          { etiqueta: 'Qué es', texto: 'Rellena la parte que falta' },
          { etiqueta: 'Material', texto: 'Por lo general, resina' },
        ],
      },
      {
        titulo: 'Corona',
        dibujo: 'dienteConCorona',
        filas: [
          { etiqueta: 'Cuándo', texto: 'No queda suficiente diente sano para restaurarlo con un arreglo' },
          { etiqueta: 'Qué es', texto: 'Cubre toda la parte visible del diente' },
          { etiqueta: 'Material', texto: 'Por lo general, zirconio' },
        ],
      },
    ],
    nota: 'Si queda muy poco diente, a veces hace falta además un perno, antes de la corona.',
    enlace: { texto: 'Cómo es el tratamiento de conducto', ruta: '/endodoncia' },
  },
  atencion: {
    forma: 'turnos',
    etiqueta: 'En LuGia',
    titulo: 'Cómo es la atención',
    grupos: [
      {
        titulo: 'Antes de empezar',
        pasos: [
          { titulo: 'Pedís tu turno', texto: 'Contanos si venís por un diente con conducto, por una corona o por una prótesis. Por WhatsApp o con el pedido de turno, y coordinamos el día.' },
          { titulo: 'Revisamos y te proponemos', texto: 'Miramos el diente o el espacio donde falta y, si hace falta, hacemos una radiografía. Te explicamos las opciones y los valores antes de empezar.' },
        ],
      },
      {
        titulo: 'Primer turno de la corona',
        pasos: [
          { titulo: 'Tomamos la impresión', texto: 'Preparamos el diente y tomamos la impresión con material. Con eso, el laboratorio hace la pieza a tu medida.' },
          { titulo: 'Te vas con una provisoria', texto: 'La usás mientras esperás la corona definitiva.' },
        ],
      },
      {
        titulo: 'Segundo turno de la corona',
        pasos: [{ titulo: 'Colocamos y ajustamos', texto: 'Cuando llega la pieza, la probamos, hacemos los ajustes y la dejamos en su lugar.' }],
      },
    ],
    nota: 'Una corona lleva, por lo general, dos turnos. Si además hace falta un perno, o si es una prótesis, te lo decimos después de revisarte. Si es una prótesis removible, también te indicamos cómo higienizarla.',
  },
  experiencia: {
    etiqueta: 'La experiencia de la Od. Luciana',
    texto: 'Los pernos y las coronas son, junto con los conductos, lo que más hace. También hace prótesis fijas y removibles, y coronas sobre implantes. Estos son algunos de sus cursos sobre el tema:',
    cursos: ['Prótesis Fija (FUNDACOS)', 'Prótesis libre de metal (UNC)'],
    enlace: 'Ver toda su formación',
  },
  preguntas: [
    { pregunta: '¿Cuánto sale una corona o una prótesis?', respuesta: 'Se informa en la consulta, cuando ya vimos qué necesitás y con qué material conviene hacerlo. La atención es particular, sin obras sociales.' },
    {
      pregunta: '¿Cuántos turnos lleva una corona?',
      respuesta: 'Por lo general, dos: en el primero preparamos el diente y tomamos la impresión, y en el segundo colocamos la corona. Si además hace falta un perno, o si es una prótesis, te lo decimos después de revisarte.',
    },
    { pregunta: '¿Me voy con el diente descubierto mientras hacen la corona?', respuesta: 'No. Te colocamos una corona provisoria hasta que la definitiva esté lista.' },
    { pregunta: '¿De qué material conviene la corona?', respuesta: 'Hacemos coronas de porcelana, zirconio y disilicato de litio. Las que más recomendamos son las de zirconio. En la consulta vemos cuál conviene para ese diente.' },
    { pregunta: '¿Todo diente con conducto necesita un perno?', respuesta: 'No. Se usa cuando queda poco diente arriba y hace falta sostener la reconstrucción. Lo vemos con el diente y la radiografía.' },
    { pregunta: '¿Me pueden arreglar una prótesis que ya tengo?', respuesta: 'Sí, reparamos y ajustamos prótesis viejas. Primero la revisamos y te decimos qué se puede hacer.' },
    { pregunta: '¿Qué es una prótesis Flex?', respuesta: 'Es una prótesis removible hecha con un material flexible. La otra opción que hacemos es la de acrílico. En la consulta vemos cuál conviene en tu caso.' },
    { pregunta: '¿Hacen coronas sobre implantes?', respuesta: 'Sí, hacemos la corona, el puente o la prótesis que van sobre el implante. El implante lo coloca otro profesional, en nuestro consultorio.' },
  ],
  otrosTratamientos: {
    texto: '¿Todavía no te hiciste el conducto?',
    enlaces: [
      { texto: 'Endodoncia y tratamiento de conducto', ruta: '/endodoncia' },
      { texto: 'Implantes', ruta: '/implantes' },
      { texto: 'Todos los tratamientos', ruta: '/#servicios' },
    ],
  },
  cierre: {
    titulo: '¿Querés saber qué necesita tu diente?',
    texto: 'Contanos por WhatsApp qué te pasa: un diente con conducto, una prótesis que molesta o un espacio sin diente.',
    boton: 'Pedir turno por WhatsApp',
    imagen: '/fotos/equipamiento.webp', // provisoria
  },
}
