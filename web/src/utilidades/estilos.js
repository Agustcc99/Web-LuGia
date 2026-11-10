// Clases de Tailwind que se repiten en varias partes (botones, chips, campos). Los colores salen de index.css.

const base =
  'btn-gsap group relative isolate inline-flex min-h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-[17px] font-semibold transition-colors duration-300 ease-tocar disabled:cursor-not-allowed'

export const botonPrimario = `${base} bg-brand text-sobre-brand hover:bg-brand-oscuro`
export const botonSecundario = `${base} border-[1.5px] border-borde-fuerte bg-fondo text-texto hover:border-brand hover:text-brand-oscuro`
// Para usar sobre fondo vino.
export const botonClaro = `${base} bg-fondo text-brand hover:bg-tinte`
export const botonContorno = `${base} border-[1.5px] border-resalte text-white hover:bg-white/10`
export const botonWhatsapp = `${base} bg-whatsapp font-bold text-sobre-whatsapp hover:brightness-95`

// La flecha de los botones se corre 3 px al pasar el mouse.
export const flecha = 'h-5 w-5 transition-transform duration-160 ease-tocar group-hover:translate-x-[3px]'

// Opción tildable (motivo de consulta, días, franja horaria).
export const chip = (activo) =>
  `chip-gsap min-h-[52px] rounded-full border-[1.5px] px-5 text-base font-medium transition-colors duration-160 ease-tocar ${
    activo ? 'border-brand bg-brand font-semibold text-sobre-brand' : 'border-borde-fuerte bg-fondo text-texto hover:border-brand'
  }`

export const campo =
  'h-14 w-full rounded-2xl border-[1.5px] border-borde-fuerte bg-fondo px-4 text-[17px] text-texto placeholder:text-suave transition-colors duration-160 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none'

export const etiquetaCampo = 'flex flex-col gap-1.5 text-[15px] font-semibold text-texto'

// Base de cada página: fondo, fuente y color de selección.
export const raizPagina = 'relative isolate min-h-screen overflow-x-clip bg-fondo font-sans text-texto antialiased selection:bg-brand selection:text-sobre-brand'

// Ancho y márgenes de las secciones: iguales en toda la página.
export const contenedor = 'mx-auto w-full max-w-6xl px-5 sm:px-8'

// Al saltar a una sección con un link (#contacto), deja lugar para que el menú de arriba no la tape.
export const anclaSeccion = 'scroll-mt-[calc(var(--alto-header,7rem)_+_1rem)]'
