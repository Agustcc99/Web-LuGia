// Pruebas del texto del pedido de turno. Corren con `npm run probar` (no necesitan navegador).
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { armarMensaje, datosIniciales } from '../../src/secciones/PreAdmision/mensaje.js'

const adulto = { ...datosIniciales, motivo: 'Endodoncia', nombre: 'Paciente de Prueba', edad: '34' }

test('arma el pedido de un adulto', () => {
  assert.equal(armarMensaje(adulto), 'Pedido de turno (desde la página)\nMotivo: Endodoncia\nPaciente: Paciente de Prueba, 34 años\nPrefiere: me da igual')
})

test('suma la franja, los días y la nota', () => {
  const mensaje = armarMensaje({ ...adulto, franja: 'Tarde', dias: ['Mar', 'Jue'], nota: 'Después de las 18' })
  assert.match(mensaje, /Prefiere: tarde, Mar, Jue/)
  assert.match(mensaje, /Nota: Después de las 18/)
})

test('si es menor, suma al adulto responsable', () => {
  const mensaje = armarMensaje({ ...adulto, edad: '9', adulto: 'Adulto de Prueba' })
  assert.match(mensaje, /Adulto responsable: Adulto de Prueba/)
})

test('si es mayor, no suma al adulto aunque esté escrito', () => {
  assert.doesNotMatch(armarMensaje({ ...adulto, adulto: 'Adulto de Prueba' }), /Adulto responsable/)
})
