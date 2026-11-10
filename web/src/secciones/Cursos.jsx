import { useEffect, useRef, useState } from 'react'
import Icono from '@/piezas/Icono.jsx'
import { botonSecundario } from '@/utilidades/estilos.js'

// Botón "Ver mis cursos" y la ventana con la lista: qué hizo y dónde, sin años.
// Usa <dialog> del navegador: ya trae el foco atrapado, cierra con Esc y deja la página de atrás quieta.
// La animación de entrada está en index.css (clase `ventana-cursos`).
export default function Cursos({ cursos }) {
  const ventana = useRef(null)
  const [abierta, setAbierta] = useState(false)

  useEffect(() => {
    if (!abierta) return
    // Sin esto la página de atrás sigue scrolleando al deslizar sobre la ventana
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = antes
    }
  }, [abierta])

  const abrir = () => {
    ventana.current?.showModal()
    setAbierta(true)
  }
  const cerrar = () => ventana.current?.close()

  return (
    <>
      <button type="button" onClick={abrir} aria-haspopup="dialog" className={`${botonSecundario} mt-7 w-full sm:mt-9 sm:w-auto`}>
        <Icono nombre="birrete" className="h-[18px] w-[18px] text-brand" />
        {cursos.boton}
        <span className="rounded-full bg-tinte px-2.5 py-0.5 text-sm font-bold text-brand-oscuro">{cursos.elementos.length}</span>
      </button>

      <dialog
        ref={ventana}
        onClose={() => setAbierta(false)}
        // Tocar el fondo oscuro (fuera de la caja) también cierra
        onClick={(e) => e.target === ventana.current && cerrar()}
        aria-labelledby="cursos-titulo"
        className="ventana-cursos m-auto max-h-[88dvh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl bg-fondo p-0 text-texto shadow-2xl backdrop:bg-texto/55 max-sm:mb-4"
      >
        <div className="flex max-h-[88dvh] flex-col">
          <header className="flex items-start justify-between gap-4 border-b border-linea px-5 py-5 sm:px-8 sm:py-6">
            <div>
              <h3 id="cursos-titulo" className="font-display text-2xl leading-tight font-bold tracking-[-0.02em] sm:text-3xl">
                {cursos.titulo}
              </h3>
              <p className="mt-1.5 text-base text-suave">{cursos.intro}</p>
            </div>
            <button
              type="button"
              onClick={cerrar}
              aria-label={cursos.cerrar}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-borde-fuerte text-brand transition-colors duration-160 ease-tocar hover:border-brand hover:bg-brand hover:text-sobre-brand"
            >
              <Icono nombre="cerrar" className="h-5 w-5" />
            </button>
          </header>

          <div className="overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
            <ul className="space-y-3.5">
              {cursos.elementos.map((curso) => (
                <li key={curso.titulo}>
                  <p className="text-base leading-snug font-semibold text-texto sm:text-[17px]">{curso.titulo}</p>
                  <p className="mt-0.5 text-[15px] text-suave">{curso.detalle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  )
}
