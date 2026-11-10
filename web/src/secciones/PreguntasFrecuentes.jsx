import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, contenedor, flecha } from '@/utilidades/estilos.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'

// Preguntas frecuentes en acordeón. La primera viene abierta.
// La respuesta se destapa con un fundido (animación `destapar` en index.css) y el "+" pasa a "−".
// Sin props muestra las preguntas de la página principal.
export default function PreguntasFrecuentes({ lista = sitio.preguntas.lista, id = 'faq' }) {
  const { etiqueta, titulo, texto } = sitio.preguntas

  return (
    <section id={id} className={`${anclaSeccion} bg-transparent py-10 sm:py-14`}>
      <div className={`${contenedor} grid items-start gap-6 md:grid-cols-[4fr_7fr] md:gap-20`}>
        <Aparecer efecto="texto">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-4 hidden text-lg text-suave md:block">{texto}</p>
          <a
            {...enlaceWhatsapp()}
            className="group mt-6 hidden items-center gap-2 text-[17px] font-semibold text-brand hover:text-brand-oscuro md:inline-flex"
          >
            {sitio.comun.escribinos}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </Aparecer>
        <Aparecer efecto="texto" retraso={1} className="border-t border-linea">
          {lista.map((entrada, i) => (
            <details key={entrada.pregunta} open={i === 0} className="group border-b border-linea">
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 py-2.5 font-display text-lg leading-snug font-bold text-texto sm:min-h-[76px] sm:gap-5 sm:text-xl [&::-webkit-details-marker]:hidden">
                {entrada.pregunta}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-borde-fuerte text-brand transition-colors duration-280 ease-pasar group-open:border-brand group-open:bg-brand group-open:text-sobre-brand sm:h-10 sm:w-10">
                  <Icono nombre="mas" className="h-[18px] w-[18px] group-open:hidden" />
                  <Icono nombre="menos" className="hidden h-[18px] w-[18px] group-open:block" />
                </span>
              </summary>
              <p className="respuesta pb-5 text-base leading-relaxed text-suave sm:pr-16 sm:pb-6 sm:text-[17px]">{entrada.respuesta}</p>
            </details>
          ))}
        </Aparecer>
      </div>
    </section>
  )
}
