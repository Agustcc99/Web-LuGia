// Cada foto de public/fotos/ tiene una versión angosta (-800) para celulares. El navegador elige cuál bajar.
// Para sumar una foto: guardar las dos versiones y anotar acá el ancho de la grande.
const ANCHOS = {
  '/fotos/sillon.webp': 1086,
  '/fotos/luciana.webp': 1000,
  '/fotos/sala-de-espera.webp': 1086,
  '/fotos/equipamiento.webp': 1086,
}

// Atributos para un <img>: `tamanos` dice cuánto ocupa la foto en pantalla (por defecto, todo el ancho en celular y media página en compu).
export function versionesFoto(src, tamanos = '(min-width: 768px) 500px, 100vw') {
  const ancho = ANCHOS[src]
  if (!ancho) return {}
  return { srcSet: `${src.replace('.webp', '-800.webp')} 800w, ${src} ${ancho}w`, sizes: tamanos }
}
