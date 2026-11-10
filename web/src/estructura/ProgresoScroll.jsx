import { m, useScroll } from 'motion/react'

// Barra fina arriba de todo que se va llenando a medida que se baja por la página.
export default function ProgresoScroll() {
  const { scrollYProgress } = useScroll()

  return <m.div aria-hidden="true" style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-resalte to-[#e3b34f]" />
}
