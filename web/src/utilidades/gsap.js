// GSAP: se registran los plugins una sola vez acá y el resto del sitio importa desde este archivo.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

export { gsap, ScrollTrigger, SplitText }

// Si la persona pidió "reducir movimiento" en su sistema, las animaciones de GSAP no se activan.
export const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Hay mouse (compu). En el celular es false.
export const hayMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
