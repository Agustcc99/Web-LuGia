import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Inclinar from '@/piezas/Inclinar.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, contenedor } from '@/utilidades/estilos.js'
import { versionesFoto } from '@/utilidades/fotos.js'

// "El consultorio": igual que "La profesional" pero espejado (texto a la izquierda, foto en arco a la derecha).
export default function Nosotros() {
  const { etiqueta, titulo, texto, imagen, alt, puntos = [] } = sitio.nosotros

  return (
    <section id="nosotros" className={`${anclaSeccion} overflow-hidden bg-transparent py-10 sm:py-14`}>
      <div className={`${contenedor} grid items-center gap-8 md:grid-cols-[6fr_5fr] md:gap-24`}>
        <Aparecer efecto="texto">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-5 text-[17px] leading-[1.65] text-suave sm:mt-6 sm:text-[19px]">{texto}</p>
          {puntos.length > 0 && (
            <ul className="mt-6 border-t border-linea sm:mt-9">
              {puntos.map((punto) => (
                <li key={punto} className="flex items-start gap-3.5 border-b border-linea py-4 text-base font-medium sm:items-center sm:gap-4 sm:py-[18px] sm:text-[17px]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tinte text-brand sm:h-9 sm:w-9">
                    <Icono nombre="check" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="pt-1 sm:pt-0">{punto}</span>
                </li>
              ))}
            </ul>
          )}
        </Aparecer>
        {imagen && (
          <Aparecer efecto="subir" retraso={1} className="relative mx-auto w-full max-w-[460px] md:order-none">
            <Inclinar max={5} className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-5 -left-5 h-[200px] w-[200px] rounded-full bg-superficie sm:bottom-10 sm:-left-9 sm:h-[300px] sm:w-[300px] sm:[transform:translateZ(-30px)]"
              />
              <img src={imagen} {...versionesFoto(imagen)} alt={alt} loading="lazy" className="relative aspect-[23/29] w-full rounded-t-[999px] rounded-b-[28px] object-cover object-[50%_60%]" />
            </Inclinar>
          </Aparecer>
        )}
      </div>
    </section>
  )
}
