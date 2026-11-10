import { useEffect } from 'react'

// Guarda el alto real de la barra en la variable CSS --alto-header.
// La portada y los saltos a cada sección (#contacto…) la usan para que la barra no los tape.
// Se mide hasta el borde de abajo de la barra, sin contar el menú desplegado del celular.
export function useAlturaMenu(header, barra) {
  useEffect(() => {
    const medir = () => {
      if (!barra.current || !header.current) return
      const alto = barra.current.getBoundingClientRect().bottom - header.current.getBoundingClientRect().top
      document.documentElement.style.setProperty('--alto-header', `${Math.round(alto)}px`)
    }
    const observador = new ResizeObserver(medir)
    observador.observe(header.current)
    return () => observador.disconnect()
  }, [header, barra])
}
