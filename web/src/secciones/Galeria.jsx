import { m } from 'motion/react'
import { sitio } from '@/contenido/sitio.js'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion } from '@/utilidades/estilos.js'
import { distancia, escalonado, resorte } from '@/utilidades/movimiento.js'

// Forma de cada foto en el mosaico. Está pensado para 6 fotos: la primera grande y la última ancha.
const formas = ['col-span-2 row-span-2', 'md:row-span-2', '', '', 'md:col-span-2', 'col-span-2']

// Galería de fotos. Por ahora está apagada: se activa cargando las imágenes en contenido/sitio.js → galeria.
export default function Galeria() {
  const { etiqueta, titulo, imagenes } = sitio.galeria

  return (
    <section id="galeria" className={`${anclaSeccion} bg-transparent py-14`}>
      <div className="mx-auto max-w-6xl px-4">
        <Aparecer>
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
        </Aparecer>
        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {imagenes.map((img, i) => (
            // Cada foto sube 24 px con un fundido, una detrás de otra.
            <m.figure
              key={img.src}
              initial={{ opacity: 0, y: distancia.bloque, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ transformPerspective: 900, transformOrigin: '50% 100%' }}
              transition={{ ...resorte.llegar, delay: (i % 3) * escalonado, opacity: { duration: 0.4 } }}
              className={`group relative overflow-hidden rounded-[22px] bg-superficie ${formas[i] ?? ''}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 ease-entrar group-hover:scale-[1.03]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-4 text-sm text-white opacity-0 transition duration-280 ease-tocar group-hover:opacity-100">
                {img.alt}
              </figcaption>
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
