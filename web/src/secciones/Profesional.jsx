import { m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Cursos from '@/secciones/Cursos.jsx'
import EspecialidadYMatricula from '@/piezas/EspecialidadYMatricula.jsx'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Inclinar from '@/piezas/Inclinar.jsx'
import { anclaSeccion, botonPrimario, botonSecundario, contenedor } from '@/utilidades/estilos.js'
import { curva } from '@/utilidades/movimiento.js'
import { enlacePedirTurno, enlaceWhatsapp } from '@/utilidades/whatsapp.js'
import { versionesFoto } from '@/utilidades/fotos.js'

// "La profesional": foto en arco, nombre, especialidad, matrícula bien visible, frase y formación.
export default function Profesional() {
  const { etiqueta, nombre, especialidad, imagen, frase, formacion = [], cursos } = sitio.profesional

  return (
    <section id="profesional" className={`${anclaSeccion} overflow-hidden bg-superficie/70 py-10 sm:py-14`}>
      <div className={`${contenedor} grid items-center gap-10 md:grid-cols-[5fr_6fr] md:gap-24`}>
        {/* En el celular la etiqueta va arriba de la foto; en compu va arriba del nombre */}
        <p className="text-[13px] font-semibold tracking-[0.14em] text-brand uppercase md:hidden">{etiqueta}</p>

        {/* Foto: sube 24 px y después el arco fino de atrás se corre a su lugar */}
        <Aparecer efecto="subir" className="relative mx-auto w-full max-w-[440px] pt-4 pr-4 md:mx-0">
          <Inclinar max={5} className="relative">
            <m.div
              aria-hidden="true"
              initial={{ x: 0, y: 0 }}
              whileInView={{ x: 16, y: -16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: curva.entrar, delay: 0.15 + 0.52 }}
              className="absolute inset-0 top-4 right-4 rounded-t-[999px] rounded-b-[28px] border-[1.5px] border-arco"
            />
            <img
              src={imagen}
              {...versionesFoto(imagen, '(min-width: 448px) 400px, 100vw')}
              alt={`${nombre}, ${especialidad}`}
              loading="lazy"
              className="relative aspect-[22/29] w-full rounded-t-[999px] rounded-b-[28px] object-cover object-[50%_70%]"
            />
          </Inclinar>
        </Aparecer>

        {/* Datos de la profesional */}
        <Aparecer efecto="texto" retraso={1}>
          <p className="hidden text-sm font-semibold tracking-[0.14em] text-brand uppercase md:block">{etiqueta}</p>
          <h2 className="font-display text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-texto md:mt-4 md:text-[52px] md:leading-[1.08]">{nombre}</h2>
          <EspecialidadYMatricula />
          {frase && (
            <blockquote className="mt-7 flex gap-3 sm:mt-9 sm:gap-4">
              <span aria-hidden="true" className="font-display text-[56px] leading-[0.9] font-extrabold text-brand sm:text-[72px]">
                “
              </span>
              <p className="text-[19px] leading-[1.55] text-slate-800 sm:text-[23px]">{frase}</p>
            </blockquote>
          )}
          {formacion.length > 0 && (
            <ul className="mt-7 space-y-3 sm:mt-9 sm:space-y-3.5">
              {formacion.map((dato) => (
                <li key={dato} className="flex items-start gap-3 text-base text-texto sm:items-center sm:gap-3.5 sm:text-[17px]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fondo text-brand sm:h-[34px] sm:w-[34px]">
                    <Icono nombre="birrete" className="h-[18px] w-[18px]" />
                  </span>
                  <span className="pt-1 sm:pt-0">{dato}</span>
                </li>
              ))}
            </ul>
          )}
          {cursos && <Cursos cursos={cursos} />}
          <div className="mt-8 flex flex-col gap-3 sm:mt-11 sm:flex-row">
            <a {...enlacePedirTurno()} className={botonPrimario}>
              {sitio.portada.boton}
            </a>
            <a {...enlaceWhatsapp()} className={`${botonSecundario} border-borde-fuerte`}>
              <Icono nombre="chat" className="h-[18px] w-[18px] text-brand" />
              {sitio.comun.whatsapp}
            </a>
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
