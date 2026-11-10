import Aparecer from '@/piezas/Aparecer.jsx'

// Tarjeta con las formas de pago (contenido/sitio.js → pagos).
export default function MediosDePago({ pagos, retraso }) {
  return (
    <Aparecer retraso={retraso} className="rounded-[22px] border border-borde bg-fondo px-[18px] py-[22px] sm:rounded-[28px] sm:p-7">
      <p className="font-display text-lg font-bold text-texto sm:text-[19px]">{pagos.titulo}</p>
      <ul className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
        {pagos.lista.map((medio) => (
          <li key={medio} className="rounded-full bg-tinte px-3.5 py-[7px] text-[15px] font-semibold text-brand-oscuro sm:px-4 sm:py-2">
            {medio}
          </li>
        ))}
      </ul>
      {pagos.nota && <p className="mt-3 text-sm leading-normal text-suave sm:mt-3.5 sm:text-[15px]">{pagos.nota}</p>}
    </Aparecer>
  )
}
