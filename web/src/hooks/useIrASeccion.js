import { useEffect } from 'react'

// Al llegar con un link a una sección (/#pedir-turno, desde otra página) el navegador no la encuentra,
// porque React todavía no la dibujó: hay que ir a mano una vez que está en pantalla.
export function useIrASeccion() {
  useEffect(() => {
    const seccion = document.getElementById(location.hash.slice(1))
    if (!seccion) return
    const ir = () => seccion.scrollIntoView({ behavior: 'instant' })
    ir()
    // Al terminar de cargar las fuentes los textos cambian de alto: se acomoda otra vez.
    document.fonts?.ready.then(ir)
  }, [])
}
