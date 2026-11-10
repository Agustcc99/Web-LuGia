import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import { flecha } from '@/utilidades/estilos.js'

// Descripción de la tarjeta. Cada parte del texto que figura en enlacesEnTexto es un link a otra página (en el orden en que aparecen).
function Descripcion({ texto, enlaces = [] }) {
  if (enlaces.length === 0) return texto
  const [enlace, ...resto] = enlaces
  const [antes, despues] = texto.split(enlace.texto)
  return (
    <>
      {antes}
      <a href={enlace.ruta} className="font-semibold text-brand underline underline-offset-4 transition-colors duration-300 group-hover:text-white group-[.activa]:text-white">
        {enlace.texto}
      </a>
      <Descripcion texto={despues} enlaces={resto} />
    </>
  )
}

// Una tarjeta de tratamiento. Los atributos data-* los usa useAnimacionServicios para animarla.
// La clase `activa` la agrega esa animación (mouse encima, o tarjeta en el centro de la pantalla del celular).
// La tarjeta destacada ocupa dos columnas.
export default function TarjetaServicio({ servicio, numero, destacada }) {
  return (
    <article
      data-tarjeta
      tabIndex={0}
      className={`group relative isolate cursor-default overflow-hidden rounded-[22px] border border-borde bg-gradient-to-br from-fondo to-superficie p-[22px] outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:rounded-[28px] sm:p-7 ${
        destacada ? 'sm:col-span-2' : ''
      }`}
    >
      {/* Relleno vino que nace desde donde entra el mouse */}
      <span data-relleno aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand to-brand-oscuro" style={{ clipPath: 'circle(0% at 50% 50%)' }} />
      {/* Número grande de fondo */}
      <span
        aria-hidden="true"
        data-numero
        className="pointer-events-none absolute -top-3 right-4 -z-10 font-display text-[88px] leading-none font-bold text-brand/[0.07] transition-colors duration-300 group-hover:text-white/15 group-[.activa]:text-white/15 sm:text-[110px]"
      >
        {String(numero).padStart(2, '0')}
      </span>
      <span
        data-icono
        className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-tinte text-brand transition-colors duration-300 group-hover:bg-white/15 group-[.activa]:bg-white/15 group-hover:text-white group-[.activa]:text-white sm:h-[60px] sm:w-[60px]"
      >
        <Icono nombre={servicio.icono} className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
      </span>
      <h3 className="mt-5 font-display text-xl leading-snug font-bold text-texto transition-colors duration-300 group-hover:text-white group-[.activa]:text-white sm:text-[22px]">{servicio.titulo}</h3>
      <p className={`mt-2 text-base leading-normal text-suave transition-colors duration-300 group-hover:text-white/85 group-[.activa]:text-white/85 ${destacada ? 'sm:max-w-md' : ''}`}>
        <Descripcion texto={servicio.descripcion} enlaces={servicio.enlacesEnTexto} />
      </p>
      {/* Link a la página propia del tratamiento, si tiene. El agregado invisible le dice a Google y a los lectores de pantalla adónde va. */}
      {servicio.enlace && (
        <a
          href={servicio.enlace}
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-brand underline underline-offset-4 transition-colors duration-300 group-hover:text-white group-[.activa]:text-white"
        >
          {sitio.servicios.verMas}
          <span className="sr-only"> {servicio.enlaceAyuda}</span>
          <Icono nombre="flecha" className={flecha} />
        </a>
      )}
      {/* Línea de color que se dibuja abajo */}
      <span aria-hidden="true" data-linea className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-resalte to-arco" />
    </article>
  )
}
