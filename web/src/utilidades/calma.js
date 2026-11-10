// Corre `tarea` cuando la página ya cargó y el navegador tiene un momento libre (a lo sumo `espera` ms después).
// Sirve para lo que es adorno y no hace falta en el primer segundo. Devuelve una función para cancelarla.
export function cuandoHayaCalma(tarea, espera = 3000) {
  let id
  let cancelada = false
  const pedir = () => {
    if (cancelada) return
    id = window.requestIdleCallback ? window.requestIdleCallback(tarea, { timeout: espera }) : setTimeout(tarea, 1200)
  }
  if (document.readyState === 'complete') pedir()
  else window.addEventListener('load', pedir, { once: true })
  return () => {
    cancelada = true
    window.removeEventListener('load', pedir)
    if (id) (window.cancelIdleCallback ?? clearTimeout)(id)
  }
}
