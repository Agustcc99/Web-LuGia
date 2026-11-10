import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Envoltura from '@/estructura/Envoltura.jsx'
import { iniciarMedicion } from '@/utilidades/medicion.js'
import { iniciarBotones } from '@/utilidades/botones.js'

// Estadísticas de visitas y efectos de los botones: se activan una sola vez, antes de dibujar la página.
iniciarMedicion()
iniciarBotones()

createRoot(document.getElementById('root')).render(
  <Envoltura>
    <App />
  </Envoltura>,
)
