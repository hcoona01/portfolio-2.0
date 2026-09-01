import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    // Fire once on mount with slight delay for smooth entry
    const timer = window.setTimeout(() => setActive(true), 100)
    return () => window.clearTimeout(timer)
  }, [])

  const letters = useMemo(
    () => text.split('').map((ch, index) => ({ ch, index })),
    [text]
  )

  const baseDelay = 400
  const minStagger = 50
  const maxStagger = 90

  return (
    <div className={`hero-text-wrapper ${className}`}>
      <div className={`hero-nebula-glow ${active ? 'hero-nebula-glow-active' : ''}`} />
      <span aria-label={text} className="relative z-10 inline-block">
        {letters.map(({ ch, index }) => {
          const stagger =
            minStagger +
            ((maxStagger - minStagger) * index) / Math.max(letters.length - 1, 1)
          const delay = baseDelay + stagger * index
          return (
            <span
              key={index}
              className={`hero-letter ${active ? 'hero-letter-visible' : ''}`}
              style={{
                transitionDelay: `${delay}ms`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          )
        })}
      </span>
    </div>
  )
}

type AnimatedTaglineProps = {
  children: React.ReactNode
  className?: string
}

export const AnimatedTagline: React.FC<AnimatedTaglineProps> = ({
  children,
  className = '',
}) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setActive(true), 520)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className={`hero-tagline ${active ? 'hero-tagline-active' : ''} ${className}`}>
      {children}
    </div>
  )
}

type AnimatedButtonsProps = {
  children: React.ReactNode
  className?: string
}

export const AnimatedButtons: React.FC<AnimatedButtonsProps> = ({
  children,
  className = '',
}) => {
  const items = React.Children.toArray(children)

  return (
    <div className={`flex flex-col items-center justify-center gap-4 sm:flex-row ${className}`}>
      {items.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: 1.2 + index * 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

type ParallaxWrapperProps = {
  children: React.ReactNode
  className?: string
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const [current, setCurrent] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (event.clientX - centerX) / (rect.width || 1)
      const dy = (event.clientY - centerY) / (rect.height || 1)

      const maxX = 8 // px
      const maxY = 6 // px

      targetRef.current = {
        x: Math.max(-1, Math.min(1, dx)) * maxX,
        y: Math.max(-1, Math.min(1, dy)) * maxY,
      }
    }

    let frameId: number
    const update = () => {
      setCurrent((prev) => {
        const lerp = 0.08
        const target = targetRef.current
        const nx = prev.x + (target.x - prev.x) * lerp
        const ny = prev.y + (target.y - prev.y) * lerp
        return { x: nx, y: ny }
      })
      frameId = window.requestAnimationFrame(update)
    }

    frameId = window.requestAnimationFrame(update)
    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`hero-parallax-wrapper ${className}`}
      style={{
        transform: `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
