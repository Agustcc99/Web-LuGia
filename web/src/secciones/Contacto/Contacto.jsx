import { sitio } from '@/contenido/sitio.js'
import Icono from '@/piezas/Icono.jsx'
import Aparecer from '@/piezas/Aparecer.jsx'
import Titulo from '@/piezas/Titulo.jsx'
import { anclaSeccion, botonPrimario, contenedor } from '@/utilidades/estilos.js'
import { enlaceWhatsapp } from '@/utilidades/whatsapp.js'
import Mapa from './Mapa.jsx'
import MediosDePago from './MediosDePago.jsx'

// Contacto: a la izquierda el botón de WhatsApp y los datos; a la derecha el mapa y las formas de pago.
export default function Contacto() {
  const { etiqueta, titulo, texto, telefono, email, direccion, horarios, mapa, filas } = sitio.contacto
  const { pagos } = sitio

  // Link de Google Maps: el de contenido/sitio.js, o uno armado con la dirección.
  const urlMapa = sitio.contacto.urlMapa ?? (mapa && `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapa)}`)

  // Filas de datos. Las que no están cargadas en contenido/sitio.js no se muestran.
  const datos = [
    telefono && { etiqueta: filas.telefono, valor: telefono, href: `tel:${telefono}` },
    email && { etiqueta: filas.email, valor: email, href: `mailto:${email}` },
    direccion && { etiqueta: filas.direccion, valor: direccion, href: urlMapa },
    horarios && { etiqueta: filas.horarios, valor: horarios },
  ].filter(Boolean)

  return (
    <section id="contacto" className={`${anclaSeccion} bg-superficie/70 py-10 sm:py-14`}>
      <div className={`${contenedor} grid items-start gap-6 md:grid-cols-2 md:gap-16`}>
        <Aparecer efecto="texto">
          <Titulo etiqueta={etiqueta}>{titulo}</Titulo>
          <p className="mt-3.5 text-[17px] text-suave sm:mt-5 sm:text-lg">{texto}</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <a {...enlaceWhatsapp()} className={botonPrimario}>
              <Icono nombre="chat" className="h-5 w-5" />
              {sitio.comun.escribinos}
            </a>
          </div>
          {datos.length > 0 && (
            <dl className="mt-7 border-t border-borde sm:mt-10">
              {datos.map((fila) => (
                <div key={fila.etiqueta} className="border-b border-borde py-3.5 sm:grid sm:grid-cols-[140px_1fr] sm:gap-4 sm:py-4">
                  <dt className="text-xs font-semibold tracking-[0.1em] text-stone-600 uppercase sm:pt-[3px] sm:text-[13px]">{fila.etiqueta}</dt>
                  <dd className="mt-0.5 text-[17px] font-medium [overflow-wrap:anywhere] text-texto sm:mt-0">
                    {fila.href ? (
                      <a href={fila.href} target={fila.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-brand">
                        {fila.valor}
                      </a>
                    ) : (
                      fila.valor
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Aparecer>

        <div className="flex flex-col gap-4 sm:gap-5">
          {mapa && <Mapa urlMapa={urlMapa} retraso={1} />}
          {pagos?.lista.length > 0 && <MediosDePago pagos={pagos} retraso={2} />}
        </div>
      </div>
    </section>
  )
}
