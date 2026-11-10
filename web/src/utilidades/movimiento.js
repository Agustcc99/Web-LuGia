// Valores de movimiento para las animaciones hechas con Motion (las de GSAP llevan los suyos).
// La idea: el movimiento acompaña, no se luce. Desplazamientos cortos, una sola vez y sin rebotes.
// Con "reducir movimiento" en el sistema, MotionConfig (en main.jsx) deja solo el fundido.

// Curvas de velocidad. Son las mismas que las `--ease-*` de index.css.
export const curva = {
  entrar: [0.16, 1, 0.3, 1], // llega rápido y se frena despacio
  pasar: [0.65, 0, 0.35, 1],
  salir: [0.4, 0, 1, 1],
  tocar: [0.3, 0.7, 0.4, 1],
  respirar: [0.25, 0.6, 0.15, 1],
}

// Duraciones en segundos. En Tailwind se usan como duration-160, duration-280…
export const duracion = { tocar: 0.16, pasar: 0.28, entrar: 0.52, foto: 0.9 }

// Cuánto se desplazan los elementos al aparecer, en px: 12 para textos y 24 para tarjetas y fotos.
export const distancia = { texto: 12, bloque: 24 }

// Pausa entre elementos de un mismo grupo (hasta 4 seguidos; después aparecen juntos).
export const escalonado = 0.06

// Resortes casi sin rebote: `llegar` para apariciones, `gesto` para tocar y `inclinar` para seguir al mouse.
export const resorte = {
  llegar: { type: 'spring', stiffness: 110, damping: 19, mass: 0.9 },
  gesto: { type: 'spring', stiffness: 260, damping: 22, mass: 0.6 },
  inclinar: { stiffness: 140, damping: 18, mass: 0.6 },
}

export const entrar = (retraso = 0) => ({ duration: duracion.entrar, ease: curva.entrar, delay: retraso })

// Para grupos que aparecen uno detrás de otro (portada, listas): el contenedor usa `grupo` y cada hijo `item`.
export const grupo = (retraso = 0) => ({
  visible: { transition: { staggerChildren: escalonado, delayChildren: retraso } },
})
export const elementoDeGrupo = (y = distancia.texto) => ({
  oculto: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: entrar() },
})
