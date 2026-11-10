import { useLayoutEffect } from 'react'
import { gsap, SplitText, sinMovimiento } from '@/utilidades/gsap.js'

// Cuánto antes de que el título entre en pantalla se lo prepara, en px.
const MARGEN = 400

// Anima un título: lo parte en líneas y las palabras suben una a una cuando la sección entra en pantalla.
// Partir un título obliga al navegador a medirlo, así que no se preparan todos al cargar: los que están cerca de la pantalla,
// enseguida; el resto, recién cuando falta poco para llegar a ellos.
// Uso: const ref = useRef(null); useTextoGsap(ref); <h2 ref={ref}>…</h2>
export function useTextoGsap(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || sinMovimiento()) return
    let partes
    let ctx
    let observador

    const preparar = () => {
      ctx = gsap.context(() => {
        partes = SplitText.create(el, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 115,
              rotate: 4,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }),
        })
      }, el)
    }

    if (el.getBoundingClientRect().top < window.innerHeight + MARGEN) preparar()
    else {
      observador = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((entrada) => entrada.isIntersecting)) return
          observador.disconnect()
          preparar()
        },
        { rootMargin: `${MARGEN}px 0px` },
      )
      observador.observe(el)
    }

    return () => {
      observador?.disconnect()
      ctx?.revert()
      partes?.revert()
    }
  }, [ref])
}
