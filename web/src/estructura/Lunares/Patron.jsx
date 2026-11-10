import { concentrico, empaque, radial } from './datos.js'

// Dibujo de un lunar de tipo empaque, radial o concentrico, pintado del color que se le pase.
export default function Patron({ tipo, color }) {
  const esAro = tipo === 'concentrico'
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill={esAro ? 'none' : color} stroke={esAro ? color : 'none'} strokeWidth="1.6">
      {tipo === 'empaque' && empaque.map((o, i) => <circle key={i} cx={o.x} cy={o.y} r={o.r} />)}
      {tipo === 'radial' && radial.map((o, i) => <circle key={i} cx={o.x} cy={o.y} r={o.r} />)}
      {esAro && concentrico.map((r) => <circle key={r} cx="50" cy="50" r={r} />)}
    </svg>
  )
}
