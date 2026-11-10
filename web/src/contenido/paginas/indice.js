import { blanqueamiento } from './blanqueamiento.js'
import { endodoncia } from './endodoncia.js'
import { implantes } from './implantes.js'
import { limpieza } from './limpieza.js'
import { odontopediatria } from './odontopediatria.js'
import { placas } from './placas.js'
import { protesis } from './protesis.js'

// Páginas de tratamientos, cada una con su propia dirección. Al compilar se genera un HTML por cada entrada
// (ver "Sumar una página" en web/README.md).
export const paginas = { endodoncia, odontopediatria, protesis, placas, blanqueamiento, limpieza, implantes }
