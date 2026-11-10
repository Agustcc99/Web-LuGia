// Formas del marco de las fotos en las páginas de tratamientos. Cada página elige una con `formaFotos` y la usan su portada, su experiencia y su cierre.
// Sin `formaFotos`, las fotos van en arco, como en la principal.
//  · marco: la forma del borde.
//  · proporcion: alto y ancho de la foto en la portada y en el cierre.
//  · adorno: detalle que acompaña a la foto de la portada.
//  · sinBorde: la forma es un recorte y el borde quedaría cortado en las esquinas, así que la foto va sin borde.
export const formasFoto = {
  chaflan: { marco: '[clip-path:polygon(16%_0,84%_0,100%_12%,100%_88%,84%_100%,16%_100%,0_88%,0_12%)]', proporcion: 'aspect-[4/5]', adorno: 'rosca', sinBorde: true },
  arco: { marco: 'rounded-t-[999px] rounded-b-[28px]', proporcion: 'aspect-[4/5]' },
  circulo: { marco: 'rounded-full', proporcion: 'aspect-square', adorno: 'burbujas' },
  hoja: { marco: 'rounded-tl-[42%] rounded-br-[42%] rounded-tr-[28px] rounded-bl-[28px]', proporcion: 'aspect-[4/5]' },
  capsula: { marco: 'rounded-full', proporcion: 'aspect-[4/5]' },
  cuenco: { marco: 'rounded-t-[28px] rounded-b-[999px]', proporcion: 'aspect-[4/5]' },
  esquina: { marco: 'rounded-[28px] rounded-tl-[50%]', proporcion: 'aspect-[4/5]' },
  ventana: { marco: 'rounded-[36px]', proporcion: 'aspect-[4/5]', adorno: 'bloque' },
}
