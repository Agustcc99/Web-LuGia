import { useState } from 'react'
import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import { flecha } from '@/utilidades/estilos.js'

// Mapa de Google embebido con el link "Cómo llegar". `urlMapa` es el link que abre Google Maps.
export default function Mapa({ urlMapa, retraso }) {
  const { mapa, mapaTitulo, comoLlegar, mapaCoordenadas, mapaIdFicha } = sitio.contacto
  const [listo, setListo] = useState(false)
  // Prioridad: la ficha de Google (por su ID), después las coordenadas y por último la dirección escrita.
  const destino = mapaIdFicha ? `cid=${mapaIdFicha}` : `q=${encodeURIComponent(mapaCoordenadas ?? mapa)}`

  return (
    <Aparecer retraso={retraso} className="overflow-hidden rounded-[22px] border border-borde bg-fondo sm:rounded-[28px]">
      {/* Hasta que carga se ve un fondo liso; después el mapa aparece con un fundido */}
      <div className="h-[180px] bg-superficie sm:h-[260px]">
        <iframe
          title={mapaTitulo}
          src={`https://www.google.com/maps?${destino}&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setListo(true)}
          className={`block h-full w-full grayscale transition-opacity duration-280 ease-pasar ${listo ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <a
        href={urlMapa}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between px-[18px] py-4 text-[17px] font-semibold text-texto transition-colors duration-160 hover:text-brand sm:px-[22px] sm:py-[18px]"
      >
        {comoLlegar} <Icono nombre="flecha" className={`${flecha} text-brand`} />
      </a>
    </Aparecer>
  )
}
