// Recorre todas las páginas del sitemap y revisa lo básico: que abran, que tengan título, que no se salgan de la pantalla
// y que no tiren errores.
import { expect, test } from '@playwright/test'

test('todas las páginas abren, sin desbordes ni errores', async ({ page, request }) => {
  await page.route(/googletagmanager|google-analytics/, (pedido) => pedido.abort())
  const errores = []
  page.on('pageerror', (error) => errores.push(`${page.url()}: ${error.message}`))
  page.on('console', (mensaje) => {
    // Analytics está bloqueado a propósito: ese error de carga no cuenta.
    if (mensaje.type() === 'error' && !/ERR_FAILED|Failed to load resource/.test(mensaje.text())) errores.push(`${page.url()}: ${mensaje.text()}`)
  })

  const sitemap = await (await request.get('/sitemap.xml')).text()
  const rutas = [...sitemap.matchAll(/<loc>https:\/\/lugia\.com\.ar(\/[^<]*)<\/loc>/g)].map((coincidencia) => coincidencia[1])
  expect(rutas.length).toBeGreaterThanOrEqual(8)

  for (const ruta of rutas) {
    const respuesta = await page.goto(ruta)
    expect(respuesta.status(), ruta).toBe(200)
    await expect(page.locator('h1'), ruta).toBeVisible()
    await expect(page, ruta).toHaveTitle(/LuGia/)
    const medidas = await page.evaluate(() => ({ pagina: document.documentElement.scrollWidth, pantalla: window.innerWidth }))
    expect(medidas.pagina, `${ruta} se sale de la pantalla`).toBeLessThanOrEqual(medidas.pantalla)
  }
  expect(errores).toEqual([])
})
