import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        setIsVisible(true)
        ringX = mouseX
        ringY = mouseY
      }

      // Fast direct transform for the inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Smooth lerp loop for the outer ring follower
    const render = () => {
      const lerp = 0.18
      ringX += (mouseX - ringX) * lerp
      ringY += (mouseY - ringY) * lerp

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    // Detect hover on links, buttons, and clickable items
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('input') ||
        target?.closest('[role="button"]') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('article')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousemove', handleElementHover, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:block`}
    >
      {/* Outer Follower Glow / Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-white/40 transition-[width,height,margin,border-color,background-color,transform] duration-200 ease-out will-change-transform ${
          isHovered
            ? '!h-12 !w-12 !-ml-6 !-mt-6 border-[#89aacc]/80 bg-[#89aacc]/15 backdrop-blur-[1px]'
            : ''
        } ${isClicked ? 'scale-90 bg-white/20' : ''}`}
      />
      {/* Center Precise Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white transition-transform duration-100 will-change-transform ${
          isHovered ? 'scale-0' : isClicked ? 'scale-75' : ''
        }`}
      />
    </div>
  )
}
