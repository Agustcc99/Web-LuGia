import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Envoltura from '@/estructura/Envoltura.jsx'
import { iniciarMedicion } from '@/utilidades/medicion.js'

// Estadísticas de visitas: se activan una sola vez, antes de dibujar la página.
iniciarMedicion()

const raiz = document.getElementById('root')
const pagina = (
  <Envoltura>
    <App />
  </Envoltura>
)
// Publicada, la página ya viene con el HTML armado y React solo le suma las animaciones y los botones.
// Con `npm run dev` la raíz está vacía y se dibuja de cero.
if (raiz.hasChildNodes()) hydrateRoot(raiz, pagina)
else createRoot(raiz).render(pagina)
