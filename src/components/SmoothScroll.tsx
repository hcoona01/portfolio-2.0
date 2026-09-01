import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  useEffect(() => {
    // Register ScrollTrigger with gsap
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: true,
      overscroll: true,
    })

    // Expose lenis to window for global access (e.g. from Navbar)
    // @ts-expect-error: Lenis is added to window
    window.lenis = lenis

    // Sync Lenis scroll events directly with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Ensure ScrollTrigger uses Lenis's scroll position
    ScrollTrigger.refresh()

    return () => {
      // @ts-expect-error: Lenis is removed from window
      window.lenis = null
      lenis.destroy()
    }
  }, [])

  return null
}
