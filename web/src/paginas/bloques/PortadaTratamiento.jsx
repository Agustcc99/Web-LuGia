import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import { botonClaro, botonContorno, botonPrimario, botonSecundario, contenedor, flecha } from '@/utilidades/estilos.js'
import { RUTA_PRINCIPAL } from '@/utilidades/enlaces.js'
import { formasFoto } from '@/utilidades/formasFoto.js'
import { separarFinalDelTitulo } from '@/utilidades/textos.js'
import { enlacePedirTurno, enlaceWhatsapp } from '@/utilidades/whatsapp.js'
import { dibujos } from '../dibujos/indice.js'
import { versionesFoto } from '@/utilidades/fotos.js'

// Colores de la portada según el tono que pida cada tratamiento (portada.tono). Si no pide ninguno, es vino.
const tonos = {
  vino: {
    fondo: 'bg-brand text-sobre-brand',
    aro: 'border-resalte/70',
    mancha: 'bg-resalte/15',
    etiqueta: 'bg-tinte',
    circuloIcono: 'bg-fondo',
    finalTitulo: 'text-resalte',
    texto: 'text-white/90',
    botonTurno: botonClaro,
    botonWhatsapp: botonContorno,
    bordeFoto: 'border-resalte',
  },
  rosa: {
    fondo: 'bg-tinte text-texto',
    aro: 'border-arco',
    mancha: 'bg-resalte/35',
    etiqueta: 'bg-fondo',
    circuloIcono: 'bg-tinte',
    finalTitulo: 'text-brand',
    texto: 'text-suave',
    botonTurno: botonPrimario,
    botonWhatsapp: botonSecundario,
    bordeFoto: 'border-brand',
  },
  // Fondo muy claro de la gama de la página: la portada se apoya en los colores de la gama, sin ser un bloque de color.
  superficie: {
    fondo: 'bg-superficie text-texto',
    aro: 'border-arco',
    mancha: 'bg-resalte/40',
    etiqueta: 'bg-fondo',
    circuloIcono: 'bg-tinte',
    finalTitulo: 'text-brand',
    texto: 'text-suave',
    botonTurno: botonPrimario,
    botonWhatsapp: botonSecundario,
    bordeFoto: 'border-brand',
  },
  // Fondo blanco, como el resto de la página: la portada no es un bloque de color y los círculos de detalle van en los tonos de la gama.
  blanco: {
    fondo: 'bg-fondo text-texto',
    aro: 'border-arco',
    mancha: 'bg-superficie',
    etiqueta: 'bg-superficie',
    circuloIcono: 'bg-tinte',
    finalTitulo: 'text-brand',
    texto: 'text-suave',
    botonTurno: botonPrimario,
    botonWhatsapp: botonSecundario,
    bordeFoto: 'border-brand',
  },
  // El fondo baja del tinte de la gama al blanco: la portada se va aclarando hasta unirse con el resto de la página.
  degradado: {
    fondo: 'bg-linear-to-b from-tinte via-superficie to-fondo text-texto',
    aro: 'border-arco/60',
    mancha: 'bg-resalte/45',
    etiqueta: 'bg-fondo',
    circuloIcono: 'bg-tinte',
    finalTitulo: 'text-brand',
    texto: 'text-suave',
    botonTurno: botonPrimario,
    botonWhatsapp: botonSecundario,
    bordeFoto: 'border-brand',
  },
  bordo: {
    fondo: 'bg-brand-oscuro text-sobre-brand',
    aro: 'border-arco/70',
    mancha: 'bg-resalte/15',
    etiqueta: 'bg-tinte',
    circuloIcono: 'bg-fondo',
    finalTitulo: 'text-resalte',
    texto: 'text-white/90',
    botonTurno: botonClaro,
    botonWhatsapp: botonContorno,
    bordeFoto: 'border-arco',
    dibujoSobreOscuro: true,
  },
}

// Portada propia de cada tratamiento: bloque de lado a lado, con ícono, detalles rosas y, a un costado, foto en arco o, si la pide, un dibujo grande.
// Con `forma: 'centrada'` el texto va centrado y la foto o el dibujo quedan debajo.
// Con `respuesta: { corta, texto }` en lugar de `texto`, el título es una pregunta y la respuesta va en un cuadro debajo.
// `formaFoto` es la forma del marco de la foto (utilidades/formasFoto.js); sin ella, va en arco.
export default function PortadaTratamiento({ portada, formaFoto = 'arco' }) {
  const marcoFoto = formasFoto[formaFoto]
  const { tono = 'vino', forma, icono, etiqueta, titulo, texto, respuesta, imagen, alt, dibujo } = portada
  const colores = tonos[tono]
  const Dibujo = dibujo && dibujos[dibujo.tipo]
  const centrada = forma === 'centrada'
  const columnas = centrada ? 'justify-items-center gap-8 text-center md:gap-10' : `gap-10 ${Dibujo ? 'md:grid-cols-[6fr_5fr]' : 'md:grid-cols-[3fr_2fr]'} md:gap-16`

  // Las últimas palabras del título van en otro color.
  const { inicio, final } = separarFinalDelTitulo(titulo)

  return (
    // 44 px extra: el alto de la franja de ubicación.
    <section className={`relative overflow-hidden ${colores.fondo} pt-[calc(var(--alto-header,8rem)_+_44px_+_2rem)] pb-12 md:pt-[calc(var(--alto-header,8rem)_+_44px_+_3.5rem)] md:pb-20`}>
      {/* Detalles rosas */}
      {(!Dibujo || centrada) && <span aria-hidden="true" className={`absolute -top-10 -right-16 h-64 w-64 rounded-full border-2 ${colores.aro} md:h-96 md:w-96`} />}
      <span aria-hidden="true" className={`absolute -bottom-20 -left-16 h-52 w-52 rounded-full ${colores.mancha}`} />

      <div className={`${contenedor} relative grid items-center ${columnas}`}>
        <div className={`flex flex-col ${centrada ? 'items-center' : ''}`}>
          <p
            className={`inline-flex items-center gap-2.5 ${centrada ? 'self-center' : 'self-start'} rounded-full ${colores.etiqueta} py-1.5 pr-4 pl-2 text-sm leading-snug font-semibold text-brand sm:text-[15px]`}
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colores.circuloIcono}`}>
              <Icono nombre={icono} className="h-5 w-5" />
            </span>
            {etiqueta}
          </p>
          <h1 className="mt-6 font-display text-[40px] leading-[1.08] font-bold tracking-[-0.035em] text-balance sm:text-[52px] lg:text-[60px] lg:leading-[1.05]">
            {inicio} <span className={colores.finalTitulo}>{final}</span>
          </h1>
          {respuesta ? (
            // Con `respuesta`, el título es una pregunta y la respuesta va en un cuadro propio. Pensado para los tonos claros.
            <p className="mt-6 max-w-[580px] rounded-r-2xl border-l-4 border-arco bg-fondo/70 py-3.5 pr-5 pl-5 text-lg leading-relaxed text-suave sm:text-xl">
              <strong className="font-semibold text-brand">{respuesta.corta} </strong>
              {respuesta.texto}
            </p>
          ) : (
            <p className={`mt-5 max-w-[580px] text-lg leading-relaxed ${colores.texto} sm:text-xl`}>{texto}</p>
          )}
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${centrada ? 'sm:justify-center' : ''}`}>
            <a {...enlacePedirTurno(RUTA_PRINCIPAL)} className={`${colores.botonTurno} min-h-[58px] px-8 text-lg`}>
              {sitio.portada.boton}
              <Icono nombre="flecha" className={flecha} />
            </a>
            <a {...enlaceWhatsapp()} className={`${colores.botonWhatsapp} min-h-[58px] text-lg`}>
              <Icono nombre="chat" className="h-5 w-5" />
              {sitio.comun.whatsapp}
            </a>
          </div>
        </div>

        {Dibujo ? (
          <Dibujo alt={dibujo.alt} partes={dibujo.partes} sobreOscuro={colores.dibujoSobreOscuro} />
        ) : (
          <div className="relative mx-auto w-full max-w-[340px] md:mr-0">
            {/* Detalle que acompaña a la foto, según su forma. */}
            {marcoFoto.adorno === 'burbujas' && <span aria-hidden="true" className="absolute -top-4 -left-5 h-20 w-20 rounded-full bg-resalte" />}
            {marcoFoto.adorno === 'bloque' && <span aria-hidden="true" className={`absolute inset-0 translate-x-4 translate-y-4 ${marcoFoto.marco} bg-resalte`} />}
            {/* Tres rayas que asoman por un costado, como las vueltas de una rosca. */}
            {marcoFoto.adorno === 'rosca' && (
              <span aria-hidden="true" className="absolute top-[38%] -left-5 h-16 w-14 bg-[repeating-linear-gradient(to_bottom,var(--color-resalte)_0_8px,transparent_8px_28px)]" />
            )}
            <img
              src={imagen}
              {...versionesFoto(imagen)}
              alt={alt}
              width="1086"
              height="1448"
              fetchpriority="high"
              className={`relative ${marcoFoto.proporcion} w-full ${marcoFoto.marco} ${marcoFoto.sinBorde ? '' : `border-4 ${colores.bordeFoto}`} object-cover object-[50%_75%]`}
            />
            {marcoFoto.adorno === 'burbujas' && <span aria-hidden="true" className="absolute right-0 bottom-3 h-10 w-10 rounded-full border-2 border-arco bg-fondo" />}
          </div>
        )}
      </div>
    </section>
  )
}
