import { hydrateRoot } from 'react-dom/client'
import '../index.css'
import { paginas } from '@/contenido/paginas/indice.js'
import Envoltura from '@/estructura/Envoltura.jsx'
import { iniciarMedicion } from '@/utilidades/medicion.js'
import PaginaTratamiento from './PaginaTratamiento.jsx'

// Arranque en el navegador de las páginas de tratamientos. El HTML ya viene armado: React solo le suma las animaciones y los botones.
iniciarMedicion()

const raiz = document.getElementById('root')
hydrateRoot(
  raiz,
  <Envoltura>
    <PaginaTratamiento pagina={paginas[raiz.dataset.pagina]} />
  </Envoltura>,
)
