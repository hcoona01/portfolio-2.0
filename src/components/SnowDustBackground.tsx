import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  speedY: number
  swaySpeed: number
  swayOffset: number
  swayDistance: number
  alpha: number
  maxAlpha: number
  pulseSpeed: number
}

export default function SnowDustBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [scrollOpacity, setScrollOpacity] = useState(0)

  // Scroll listener to fade in snow dust as hero video scrolls up
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // Transition opacity between 100px and 550px scroll depth
      const fadeStart = 80
      const fadeEnd = 500

      if (scrollY <= fadeStart) {
        setScrollOpacity(0)
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(1)
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart)
        // Smooth ease curve
        setScrollOpacity(progress * progress * (3 - 2 * progress))
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also listen to Lenis if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', handleScroll)
      }
    }
  }, [])

  // Canvas particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Generate snow dust particles
    const particleCount = Math.min(Math.floor((width * height) / 14000), 90)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const maxAlpha = 0.45 + Math.random() * 0.55
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 2.0,
        speedY: 0.3 + Math.random() * 0.75,
        swaySpeed: 0.008 + Math.random() * 0.015,
        swayOffset: Math.random() * Math.PI * 2,
        swayDistance: 0.5 + Math.random() * 1.4,
        alpha: maxAlpha * Math.random(),
        maxAlpha,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      })
    }

    let time = 0

    const render = () => {
      time += 1
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Vertical falling motion
        p.y += p.speedY

        // Horizontal sinusoidal sway
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayDistance

        // Gentle alpha breathing/twinkle
        p.alpha =
          p.maxAlpha * (0.7 + 0.3 * Math.sin(time * p.pulseSpeed + p.swayOffset))

        // Wrap around screen edges
        if (p.y > height + 10) {
          p.y = -10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Draw particle with bright crisp white glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha.toFixed(3)})`
        ctx.shadowBlur = p.radius > 2.0 ? 8 : 4
        ctx.shadowColor = 'rgba(255, 255, 255, 0.85)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700 ease-out"
      style={{
        opacity: scrollOpacity,
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  )
}
