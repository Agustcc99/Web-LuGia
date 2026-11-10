import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'

// Especialidad y matrícula de la profesional, bien visibles. La usan "La profesional" y las páginas de tratamientos.
export default function EspecialidadYMatricula() {
  const { especialidad, matricula } = sitio.profesional
  return (
    <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
      <span className="text-lg font-semibold text-brand sm:text-[19px]">{especialidad}</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-borde bg-fondo px-3.5 py-1.5 text-[15px] font-semibold">
        <Icono nombre="escudo" className="h-4 w-4 text-brand" />
        {sitio.comun.matricula} {matricula}
      </span>
    </div>
  )
}
