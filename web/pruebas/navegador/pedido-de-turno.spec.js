// El pedido de turno es lo único de la página que no puede fallar. Estas pruebas lo completan con datos inventados.
// No se manda nada: la apertura de WhatsApp y Analytics quedan interceptadas.
import { expect, test } from '@playwright/test'

const NOMBRE = 'Paciente de Prueba'

test.beforeEach(async ({ page }) => {
  // Analytics no carga: las pruebas no cuentan como visitas.
  await page.route(/googletagmanager|google-analytics/, (pedido) => pedido.abort())
  // En vez de abrir WhatsApp, se anota a dónde iba.
  await page.addInitScript(() => {
    window.__abierto = []
    window.open = (direccion) => {
      window.__abierto.push(direccion)
      return null
    }
  })
  await page.goto('/#pedir-turno')
})

async function completarHastaLaRevision(page, { edad = '34', adulto } = {}) {
  const formulario = page.locator('#formulario-turno')
  await formulario.getByRole('button', { name: 'Corona o prótesis' }).click()
  await formulario.locator('input[autocomplete="name"]').fill(NOMBRE)
  await formulario.locator('input[type="number"]').fill(edad)
  if (adulto) await formulario.locator('input:not([autocomplete]):not([type])').fill(adulto)
  await formulario.getByRole('button', { name: 'Siguiente' }).click()
  await formulario.getByRole('button', { name: 'Tarde' }).click()
  await formulario.getByRole('button', { name: 'Mar' }).click()
  await formulario.locator('#nota-turno').fill('Nota de prueba')
  await formulario.getByRole('button', { name: 'Siguiente' }).click()
  return formulario
}

test('arma el mensaje y lo abre en WhatsApp solo después de aceptar', async ({ page }) => {
  const formulario = await completarHastaLaRevision(page)
  const mensaje = formulario.locator('pre')
  await expect(mensaje).toContainText('Motivo: Corona o prótesis')
  await expect(mensaje).toContainText(`Paciente: ${NOMBRE}, 34 años`)
  await expect(mensaje).toContainText('Prefiere: tarde, Mar')
  await expect(mensaje).toContainText('Nota: Nota de prueba')

  // Sin aceptar los términos, el botón no hace nada.
  const enviar = formulario.locator('a[aria-disabled]')
  await expect(enviar).toHaveAttribute('aria-disabled', 'true')
  await enviar.click({ force: true })
  expect(await page.evaluate(() => window.__abierto)).toEqual([])

  await formulario.getByRole('checkbox').check()
  await expect(enviar).toHaveAttribute('aria-disabled', 'false')
  await enviar.click()
  const abierto = await page.evaluate(() => window.__abierto)
  expect(abierto).toHaveLength(1)
  expect(abierto[0]).toContain('https://wa.me/5493513938777')
  expect(decodeURIComponent(abierto[0])).toContain(`Paciente: ${NOMBRE}, 34 años`)
})

test('el link de enviar no lleva datos del paciente', async ({ page }) => {
  // Analytics registra la dirección de los links: el nombre, la edad y el motivo no pueden estar ahí.
  const formulario = await completarHastaLaRevision(page)
  await formulario.getByRole('checkbox').check()
  const destino = decodeURIComponent(await formulario.locator('a[aria-disabled]').getAttribute('href'))
  expect(destino).toContain('wa.me/5493513938777')
  for (const dato of [NOMBRE, 'Prueba', '34', 'Corona', 'Nota de prueba']) expect(destino).not.toContain(dato)
})

test('si es menor, pide y suma al adulto responsable', async ({ page }) => {
  const formulario = await completarHastaLaRevision(page, { edad: '9', adulto: 'Adulto de Prueba' })
  await expect(formulario.locator('pre')).toContainText('Adulto responsable: Adulto de Prueba')
})
