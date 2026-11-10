// Forma de los datos de una página de tratamiento (contenido/paginas/). No genera código: le sirve al editor
// para autocompletar y mostrar qué va en cada campo. Lo que de verdad frena un error es paginas/comprobar.js, al compilar.

/**
 * @typedef {object} Enlace
 * @property {string} texto
 * @property {string} ruta Dirección de otra página (`/endodoncia`) o de una sección de la principal (`/#servicios`).
 */

/**
 * @typedef {object} Dibujo
 * @property {string} tipo Nombre del dibujo en paginas/dibujos/indice.js.
 * @property {string} alt Descripción para quien no ve el dibujo.
 * @property {string[]} [partes] Nombres que el dibujo señala, en su orden.
 */

/**
 * @typedef {object} Seo
 * @property {number} [prioridad] Peso en el sitemap, de 0.5 a 0.8 (la principal es 1.0).
 * @property {string} titulo Título de la pestaña y del resultado de Google.
 * @property {string} descripcion Hasta unos 160 caracteres.
 * @property {string} imagen Foto que se ve al compartir el link. Tiene que estar en public/.
 */

/**
 * @typedef {object} Portada
 * @property {'vino' | 'rosa' | 'bordo' | 'superficie' | 'blanco' | 'degradado'} [tono] Colores de la portada (PortadaTratamiento.jsx).
 * @property {'centrada'} [forma]
 * @property {string} [icono]
 * @property {string} etiqueta
 * @property {string} titulo
 * @property {string} texto
 * @property {string} [respuesta] Si está, el título es una pregunta y esta es su respuesta corta.
 * @property {string} [imagen]
 * @property {string} [alt]
 * @property {Dibujo} [dibujo] Dibujo grande en lugar de la foto.
 */

/**
 * @typedef {object} QueEs
 * @property {string} etiqueta
 * @property {string} titulo
 * @property {(string | { resaltado: string, texto: string })[]} parrafos
 * @property {Dibujo} [dibujo]
 */

/**
 * @typedef {object} Cuando
 * @property {string} etiqueta
 * @property {string} titulo
 * @property {string} [texto]
 * @property {{ titulo: string, elementos: string[], icono?: string }[]} listas
 */

/**
 * Bloque propio de una página. `tipo` dice cuál es (paginas/bloques/destacados/indice.js); el resto depende del bloque.
 * @typedef {{ tipo: 'anotador' | 'calendario' | 'comparacion' | 'proceso' | 'reparto', [campo: string]: any }} BloquePropio
 */

/**
 * @typedef {object} PaginaTratamiento
 * @property {string} ruta Dirección de la página, con barra adelante: `/endodoncia`.
 * @property {string} tratamiento Nombre que se ve en "Inicio / …".
 * @property {string} otroNombre Otra forma de llamar al tratamiento, para Google.
 * @property {'ciruela' | 'durazno' | 'malva' | 'bruma' | 'damasco' | 'noche'} [gama] Colores de la página (index.css). Sin gama, vino y rosas.
 * @property {'arco' | 'circulo' | 'ventana' | 'hoja' | 'capsula' | 'cuenco' | 'esquina' | 'chaflan'} [formaFotos] Forma del marco de las fotos.
 * @property {string} [fondo] Nombre del fondo en paginas/dibujos/indice.js.
 * @property {string[]} [orden] Secciones y bloques propios, en el orden en que aparecen.
 * @property {Seo} seo
 * @property {Portada} portada
 * @property {QueEs} [que]
 * @property {Cuando} [cuando]
 * @property {BloquePropio} [destacado]
 * @property {Record<string, any>} [atencion]
 * @property {Record<string, any>} [experiencia]
 * @property {{ pregunta: string, respuesta: string }[]} [preguntas]
 * @property {{ texto: string, enlaces: Enlace[] }} [otrosTratamientos]
 * @property {Record<string, any>} cierre
 */

export {}
