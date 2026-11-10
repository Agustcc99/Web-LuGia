import { sitio } from '@/contenido/sitio.js'
import Aparecer from '@/piezas/Aparecer.jsx'
import EspecialidadYMatricula from '@/piezas/EspecialidadYMatricula.jsx'
import Icono from '@/piezas/Icono.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { contenedor, flecha } from '@/utilidades/estilos.js'
import { RUTA_PRINCIPAL } from '@/utilidades/enlaces.js'
import { formasFoto } from '@/utilidades/formasFoto.js'
import { versionesFoto } from '@/utilidades/fotos.js'

const parrafo = 'text-lg leading-relaxed text-suave'

// Experiencia de la profesional en el tema, con sus cursos.
// `formaFoto` es la forma del marco del retrato (utilidades/formasFoto.js); sin ella, va en arco.
export default function Experiencia({ experiencia, formaFoto = 'arco' }) {
  const { nombre, especialidad, imagen } = sitio.profesional
  const marcoFoto = formasFoto[formaFoto]

  return (
    <section className="overflow-hidden bg-superficie/70 py-10 sm:py-14">
      <div className={`${contenedor} grid items-center gap-8 md:grid-cols-[5fr_6fr] md:gap-20`}>
        <Aparecer efecto="subir" className="order-2 mx-auto w-full max-w-[400px] md:order-none md:mx-0">
          <img
            src={imagen}
            {...versionesFoto(imagen, '(min-width: 448px) 400px, 100vw')}
            alt={`${nombre}, ${especialidad}`}
            width="1000"
            height="1778"
            loading="lazy"
            className={`${formaFoto === 'circulo' ? 'aspect-square' : 'aspect-[22/29]'} w-full ${marcoFoto.marco} object-cover object-[50%_70%]`}
          />
        </Aparecer>
        <div>
          <Titulo etiqueta={experiencia.etiqueta}>{nombre}</Titulo>
          <EspecialidadYMatricula />
          <p className={`mt-6 ${parrafo}`}>{experiencia.texto}</p>
          <ul className="mt-5 space-y-3">
            {experiencia.cursos.map((curso) => (
              <li key={curso} className="flex items-start gap-3 text-base leading-normal text-texto sm:text-[17px]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fondo text-brand">
                  <Icono nombre="birrete" className="h-[18px] w-[18px]" />
                </span>
                <span className="pt-1">{curso}</span>
              </li>
            ))}
          </ul>
          <a
            href={`${RUTA_PRINCIPAL}#profesional`}
            className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-brand underline underline-offset-4 hover:text-brand-oscuro"
          >
            {experiencia.enlace}
            <Icono nombre="flecha" className={flecha} />
          </a>
        </div>
      </div>
    </section>
  )
}
