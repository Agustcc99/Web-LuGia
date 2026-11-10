// Datos de los lunares de fondo: dónde va cada uno, de qué tipo, tamaño y color.
// No se usa Math.random(): `azar` da siempre los mismos números, así la página se ve igual en cada visita.

const colores = ['#e0307a', '#ff6fa5', '#c2185b', '#7a1f3d', '#f4a9c0', '#ff8fb8']

// Tipos de lunar. Se repiten en este orden:
//  · lleno: círculo liso     · aro: círculo con borde y un punto al medio    · chico: círculo chiquito
//  · empaque, radial y concentrico: dibujos hechos con muchos círculos (ver más abajo)
const tipos = ['empaque', 'lleno', 'radial', 'chico', 'concentrico', 'aro', 'lleno', 'radial', 'empaque', 'chico', 'concentrico', 'lleno']

export const tiposConDibujo = ['empaque', 'radial', 'concentrico']

// Número "al azar" entre 0 y 1 que depende solo de `n`.
const azar = (n) => {
  const x = Math.sin(n * 91.7) * 10000
  return x - Math.floor(x)
}

// 44 lunares repartidos de arriba a abajo, uno a cada lado, pegados a los costados de la página.
export const lunares = Array.from({ length: 44 }, (_, i) => {
  const tipo = tipos[i % tipos.length]
  const tam = tipo === 'chico' ? 22 + azar(i) * 22 : 70 + azar(i + 3) * 120
  return {
    top: 1.5 + i * 2.2 + azar(i + 7) * 1.2, // % desde arriba
    lado: i % 2 ? 'left' : 'right',
    borde: -tam * (0.15 + azar(i + 11) * 0.55) + (i % 4 === 3 ? 150 : 0), // cuánto sobresale del borde, en px
    tam,
    color: colores[Math.floor(azar(i + 5) * colores.length)],
    tipo,
  }
})

// Los dibujos se arman en un cuadro de 100 × 100 y se pintan del color de cada lunar.

// empaque: círculos de muchos tamaños que se acomodan sin pisarse, dentro de un círculo grande.
export const empaque = (() => {
  const circulos = []
  const radios = [11, 9, 7.5, 6, 5, 4, 3, 2.4, 1.8, 1.3, 1]
  let n = 0
  for (const r of radios) {
    const intentos = r > 6 ? 60 : 140
    const cuantos = r > 6 ? 5 : r > 3 ? 9 : 14
    let puestos = 0
    for (let t = 0; t < intentos && puestos < cuantos; t++) {
      n++
      const ang = azar(n) * Math.PI * 2
      const dist = Math.sqrt(azar(n + 500)) * (49 - r)
      const x = 50 + Math.cos(ang) * dist
      const y = 50 + Math.sin(ang) * dist
      // Solo se pone si no toca a ningún círculo que ya está.
      if (circulos.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + r + 0.9)) {
        circulos.push({ x, y, r })
        puestos++
      }
    }
  }
  return circulos
})()

// radial: lunares en rayos que van creciendo desde el centro hacia afuera.
export const radial = (() => {
  const circulos = []
  const rayos = 22
  for (let anillo = 1; anillo <= 8; anillo++)
    for (let k = 0; k < rayos; k++) {
      const ang = (k / rayos) * Math.PI * 2 + (anillo % 2 ? 0 : Math.PI / rayos)
      const dist = anillo * 5.6
      circulos.push({ x: 50 + Math.cos(ang) * dist, y: 50 + Math.sin(ang) * dist, r: 0.45 + anillo * 0.24 })
    }
  return circulos
})()

// concentrico: aros uno dentro del otro (solo se guarda el radio de cada uno).
export const concentrico = Array.from({ length: 9 }, (_, i) => 6 + i * 5.3)
