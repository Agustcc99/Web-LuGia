import { useLayoutEffect } from 'react'
import { gsap, SplitText, sinMovimiento } from '@/utilidades/gsap.js'

// Anima un título: lo parte en líneas y las palabras suben una a una cuando la sección entra en pantalla.
// Uso: const ref = useRef(null); useTextoGsap(ref); <h2 ref={ref}>…</h2>
export function useTextoGsap(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || sinMovimiento()) return
    let partes
    const ctx = gsap.context(() => {
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
    return () => {
      ctx.revert()
      partes?.revert()
    }
  }, [ref])
}
