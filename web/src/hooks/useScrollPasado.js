import { useEffect, useState } from 'react'

// Devuelve true cuando se bajó más de `limite` px en la página. `limite` puede ser un número o una función que devuelve el número.
// Si es una función, definila fuera del componente para que no se vuelva a crear en cada render.
export function useScrollPasado(limite) {
  const [pasado, setPasado] = useState(false)

  useEffect(() => {
    const calcular = typeof limite === 'function' ? limite : () => limite
    const revisar = () => setPasado(window.scrollY > calcular())
    revisar()
    window.addEventListener('scroll', revisar, { passive: true })
    return () => window.removeEventListener('scroll', revisar)
  }, [limite])

  return pasado
}
