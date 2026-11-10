import { sitio } from '@/contenido/sitio.js'
import { contenedor } from '@/utilidades/estilos.js'
import { RUTA_PRINCIPAL } from '@/utilidades/enlaces.js'

// Dónde está parada la persona: queda siempre a la vista, pegada debajo del menú.
export default function FranjaUbicacion({ tratamiento }) {
  return (
    <nav data-franja aria-label={sitio.comun.estasEn} className="border-b border-borde bg-superficie">
      <ol className={`${contenedor} flex h-11 items-center gap-2 text-[15px] text-suave`}>
        <li>
          <a href={RUTA_PRINCIPAL} className="inline-flex h-11 items-center font-semibold text-brand underline underline-offset-4 hover:text-brand-oscuro">
            {sitio.comun.inicio}
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">{tratamiento}</li>
      </ol>
    </nav>
  )
}
