import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import { contenedor } from '@/utilidades/estilos.js'
import { enlacesDesde } from '@/utilidades/enlaces.js'
import { medicionActiva } from '@/utilidades/medicion.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'

// Pie de página en vino, igual que la barra de arriba: logo, links a las secciones, datos de contacto,
// matrícula y los términos de privacidad. `inicio` es "/" en las páginas que no son la principal.
export default function Pie({ inicio = '' }) {
  const redes = Object.entries(sitio.redes).filter(([, url]) => url)
  const { profesional, contacto, comun, pie } = sitio
  const claseEnlace = 'text-white/80 transition-colors duration-160 ease-tocar hover:text-white'

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-brand-oscuro via-brand to-brand-oscuro pb-32 text-white/80 md:pb-12">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-resalte via-[#e3b34f] to-resalte" />
      <div className={`${contenedor} pt-10 md:pt-14`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-14">
          <div>
            <p className="flex items-center gap-3 font-display text-[22px] font-bold text-white">
              {sitio.logoIcono && (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)]">
                  <img src={sitio.logoIcono} alt="" className="h-10 w-10" />
                </span>
              )}
              {sitio.nombre}
            </p>
            {profesional && (
              <p className="mt-4 text-[15px] leading-relaxed sm:text-base">
                {profesional.nombre}
                <br />
                {profesional.especialidad} · <strong className="font-semibold text-white">{profesional.matricula}</strong>
              </p>
            )}
            {redes.length > 0 && (
              <ul className="mt-4 flex gap-6 text-[15px]">
                {redes.map(([red, url]) => (
                  <li key={red}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`capitalize ${claseEnlace}`}>
                      {red}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label={pie.secciones}>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-resalte uppercase">{pie.secciones}</p>
            <ul className="mt-4 space-y-2.5 text-[16px]">
              {enlacesDesde(inicio).map((enlace) => (
                <li key={enlace.href}>
                  <a href={enlace.href} className={claseEnlace}>
                    {enlace.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-resalte uppercase">{pie.contacto}</p>
            <ul className="mt-4 space-y-2.5 text-[16px]">
              {contacto.direccion && <li>{contacto.direccion}</li>}
              {contacto.horarios && <li>{contacto.horarios}</li>}
              {contacto.email && (
                <li>
                  <a href={`mailto:${contacto.email}`} className={claseEnlace}>
                    {contacto.email}
                  </a>
                </li>
              )}
            </ul>
            <a
              {...enlaceWhatsapp()}
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-semibold text-brand transition duration-160 ease-tocar hover:bg-tinte active:scale-[0.98]"
            >
              <Icono nombre="chat" className="h-[18px] w-[18px]" />
              {comun.escribinos}
            </a>
          </div>
        </div>

        {/* Se abre solo desde el formulario de turno (link a #privacidad). */}
        <details id="privacidad" className="mt-10 border-t border-white/15 pt-5 text-sm leading-normal">
          <summary className="cursor-pointer font-semibold text-white">{pie.legalTitulo}</summary>
          <div className="mt-3 max-w-3xl space-y-2">
            {pie.legal.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </details>
        {sitio.aviso && <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-normal">{sitio.aviso}</p>}
        <p className="mt-5 text-sm">© {new Date().getFullYear()} · {pie.derechos}</p>
        {medicionActiva && <p className="mt-1 text-xs">{pie.cookies}</p>}
      </div>
    </footer>
  )
}
