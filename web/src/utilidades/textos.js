// Separa las últimas palabras de un título, que van en otro color.
export function separarFinalDelTitulo(titulo) {
  const palabras = titulo.split(' ')
  const corte = palabras.length > 3 ? palabras.length - 2 : palabras.length - 1
  return { inicio: palabras.slice(0, corte).join(' '), final: palabras.slice(corte).join(' ') }
}
