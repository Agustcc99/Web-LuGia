import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, contenedor } from '@/utilidades/estilos.js'

function Estrellas() {
  return (
    <span className="flex gap-0.5 text-amber-600" aria-label={sitio.resenas.estrellas}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Icono key={i} nombre="estrella" className="h-4 w-4 fill-current" />
      ))}
    </span>
  )
}

// Reseñas reales de Google. Hoy está apagada (ver App.jsx) porque todavía no hay reseñas reales.
// Si la lista de contenido/sitio.js → resenas.elementos está vacía, no muestra nada: nunca se inventan reseñas.
export default function Resenas() {
  const { etiqueta, titulo, fuente, elementos } = sitio.resenas
  if (elementos.length === 0) return null

  return (
    <section id="resenas" className={`${anclaSeccion} bg-fondo py-10 sm:py-14`}>
      <div className={contenedor}>
        <Aparecer efecto="texto">
          <Titulo etiqueta={etiqueta} centrado>
            {titulo}
          </Titulo>
        </Aparecer>

        <Aparecer efecto="texto" className="mt-8 sm:mt-14">
          <div className="grid gap-3 sm:gap-5 md:grid-cols-3">
            {elementos.map((resena) => (
              <article key={resena.autor} className="rounded-[22px] bg-superficie p-[22px] sm:rounded-[28px] sm:p-7">
                <Estrellas />
                <p className="mt-4 leading-relaxed text-texto">“{resena.texto}”</p>
                <p className="mt-4 text-sm font-semibold text-suave">
                  {resena.autor} · {fuente}
                </p>
              </article>
            ))}
          </div>
        </Aparecer>
      </div>
    </section>
  )
}
