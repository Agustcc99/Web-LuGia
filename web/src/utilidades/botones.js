import { gsap, sinMovimiento, hayMouse } from '@/utilidades/gsap.js'

// Efectos de los botones con GSAP. Se activan una sola vez para todo el sitio (por delegación de eventos).
//  · Clase `btn-gsap`  → el botón sigue un poco al cursor, se rellena desde donde entra el mouse y rebota al apretarlo.
//  · Clase `chip-gsap` → solo el rebote al apretar (opciones del pedido de turno).
//  · Atributo `data-brillo` → un destello que cruza el botón cada tanto.
// Con "reducir movimiento" no se activa nada. En el celular queda solo el rebote y el relleno al tocar.
export function iniciarBotones() {
  if (sinMovimiento()) return

  const rellenos = new WeakMap() // botón → círculo de relleno
  const destellos = new Map() // botón → { franja, animación }

  const botonDe = (e) => e.target.closest?.('.btn-gsap, .chip-gsap')
  const inactivo = (b) => b.matches('[aria-disabled="true"], :disabled')
  // Lo que hay dentro del botón, sin contar los elementos que agregamos nosotros.
  const contenido = (b) => [...b.children].filter((c) => !c.dataset.gsapExtra)

  // Devuelve el círculo de relleno del botón (lo crea la primera vez).
  function relleno(b) {
    let r = rellenos.get(b)
    if (!r) {
      r = document.createElement('span')
      r.dataset.gsapExtra = '1'
      r.setAttribute('aria-hidden', 'true')
      r.className = 'pointer-events-none absolute top-0 left-0 -z-10 rounded-full bg-current'
      gsap.set(r, { scale: 0, opacity: 0 })
      b.appendChild(r)
      rellenos.set(b, r)
    }
    return r
  }

  // Hace nacer el relleno en el punto exacto donde está el cursor (o el dedo).
  function nacerRelleno(b, e, opacidad, duracion) {
    const r = b.getBoundingClientRect()
    const diametro = Math.hypot(r.width, r.height) * 2
    gsap.set(relleno(b), { width: diametro, height: diametro, x: e.clientX - r.left, y: e.clientY - r.top, xPercent: -50, yPercent: -50, scale: 0, opacity: opacidad })
    gsap.to(relleno(b), { scale: 1, duration: duracion, ease: 'power3.out', overwrite: true })
  }

  // El mouse entra: nace el relleno.
  document.addEventListener('pointerover', (e) => {
    const b = botonDe(e)
    if (!b || !b.classList.contains('btn-gsap') || b.contains(e.relatedTarget) || e.pointerType === 'touch' || inactivo(b)) return
    nacerRelleno(b, e, 0.14, 0.6)
  })

  // El mouse se mueve: el botón y su contenido siguen al cursor (el contenido, un poco menos).
  document.addEventListener('pointermove', (e) => {
    const b = botonDe(e)
    if (!b || !b.classList.contains('btn-gsap') || e.pointerType === 'touch' || !hayMouse() || inactivo(b)) return
    const r = b.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    gsap.to(b, { x: dx * 0.2, y: dy * 0.3, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
    gsap.to(contenido(b), { x: dx * 0.08, y: dy * 0.12, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
  })

  // El mouse sale: el relleno se retira por donde salió y el botón vuelve a su lugar con rebote.
  document.addEventListener('pointerout', (e) => {
    const b = botonDe(e)
    if (!b || b.contains(e.relatedTarget) || !b.classList.contains('btn-gsap')) return
    const r = b.getBoundingClientRect()
    const salida = rellenos.get(b)
    if (salida) gsap.to(salida, { x: e.clientX - r.left, y: e.clientY - r.top, scale: 0, duration: 0.45, ease: 'power3.in', overwrite: true })
    gsap.to(b, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
    gsap.to(contenido(b), { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' })
  })

  // Al apretar: el botón se achica y al soltar vuelve con rebote.
  document.addEventListener('pointerdown', (e) => {
    const b = botonDe(e)
    if (!b || inactivo(b)) return
    gsap.to(b, { scale: 0.94, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })

    // En el celular no hay "pasar el mouse": el relleno nace donde se toca y se retira al soltar.
    const tactil = e.pointerType === 'touch' && b.classList.contains('btn-gsap')
    if (tactil) nacerRelleno(b, e, 0.18, 0.5)

    const soltar = () => {
      gsap.to(b, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' })
      if (tactil) gsap.to(relleno(b), { opacity: 0, duration: 0.45, ease: 'power2.out', overwrite: true })
      removeEventListener('pointerup', soltar)
      removeEventListener('pointercancel', soltar)
    }
    addEventListener('pointerup', soltar)
    addEventListener('pointercancel', soltar)
  })

  // Destello: una franja clara inclinada que cruza el botón cada ~4 segundos.
  function sincronizarDestellos() {
    // Agrega el destello a los botones nuevos.
    document.querySelectorAll('[data-brillo]').forEach((b) => {
      if (destellos.has(b)) return
      const franja = document.createElement('span')
      franja.dataset.gsapExtra = '1'
      franja.setAttribute('aria-hidden', 'true')
      franja.className = 'pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent'
      b.appendChild(franja)
      const animacion = gsap.timeline({ repeat: -1, repeatDelay: 3.6, delay: 1.5 })
      animacion.fromTo(franja, { xPercent: -160, skewX: -20 }, { xPercent: 460, skewX: -20, duration: 0.9, ease: 'power2.inOut' })
      destellos.set(b, { franja, animacion })
    })
    // Quita el destello de los botones que ya no están o ya no lo piden.
    destellos.forEach(({ franja, animacion }, b) => {
      if (!b.isConnected || !b.hasAttribute('data-brillo')) {
        animacion.kill()
        franja.remove()
        destellos.delete(b)
      }
    })
  }

  // La página cambia (por ejemplo, al pasar de paso en el formulario): se revisan los destellos una vez por cuadro.
  let pendiente = false
  new MutationObserver(() => {
    if (pendiente) return
    pendiente = true
    requestAnimationFrame(() => {
      pendiente = false
      sincronizarDestellos()
    })
  }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-brillo'] })
  sincronizarDestellos()
}
