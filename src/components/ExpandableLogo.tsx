import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface ExpandableLogoProps {
  size?: number
  name?: string
  monogram?: string
  isMobile?: boolean
  onClick?: () => void
}

export default function ExpandableLogo({
  size = 36,
  name = 'OM DIPAK KANASE',
  monogram = 'ODK',
  isMobile: externalIsMobile,
  onClick,
}: ExpandableLogoProps) {
  const [hovered, setHovered] = useState(false)
  const [labelWidth, setLabelWidth] = useState(0)
  const labelMeasureRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const spring = { type: 'spring' as const, stiffness: 140, damping: 18 }

  useEffect(() => {
    if (labelMeasureRef.current) {
      const w = Math.ceil(labelMeasureRef.current.getBoundingClientRect().width)
      setLabelWidth(w)
    }
  }, [name])

  const [internalIsMobile, setInternalIsMobile] = useState(false)
  const isMobile = externalIsMobile ?? internalIsMobile

  useEffect(() => {
    if (externalIsMobile !== undefined) return
    const checkMobile = () => {
      setInternalIsMobile(window.matchMedia('(hover: none)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [externalIsMobile])

  const spacingBetween = 10
  const textRightPadding = 18
  const expandedTextWidth = spacingBetween + labelWidth + textRightPadding

  const baseGlow =
    '0 0 0 1px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.4)'
  const hoverGlow =
    '0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 16px rgba(137, 170, 204, 0.35), 0 2px 10px rgba(0, 0, 0, 0.5)'

  return (
    <motion.div
      ref={containerRef}
      aria-label={name}
      onClick={onClick}
      onHoverStart={() => !isMobile && setHovered(true)}
      onHoverEnd={() => !isMobile && setHovered(false)}
      onFocus={() => !isMobile && setHovered(true)}
      onBlur={() => !isMobile && setHovered(false)}
      className="group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full border border-white/15 bg-surface/90 backdrop-blur-md"
      tabIndex={0}
      initial={false}
      animate={
        isMobile
          ? undefined
          : {
              boxShadow: hovered ? hoverGlow : baseGlow,
            }
      }
      transition={isMobile ? { duration: 0 } : spring}
      style={{
        borderRadius: 9999,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {/* Left Monogram Icon */}
      <div
        style={{
          width: size,
          height: size,
          flex: '0 0 auto',
        }}
        className="relative flex items-center justify-center p-[2px]"
      >
        <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#89AACC_0%,#4E85BF_100%)] transition-transform group-hover:scale-105 group-hover:bg-[linear-gradient(90deg,#4E85BF_0%,#89AACC_100%)]" />
        <span className="relative grid h-full w-full place-items-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
          {monogram}
        </span>
      </div>

      {/* Expandable Label */}
      <motion.div
        initial={false}
        animate={
          isMobile
            ? undefined
            : {
                width: hovered ? expandedTextWidth : 0,
              }
        }
        transition={isMobile ? { duration: 0 } : spring}
        className="hidden items-center overflow-hidden md:flex"
      >
        <div style={{ paddingLeft: spacingBetween, paddingRight: textRightPadding }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...spring, duration: 0.2 }}
            className="whitespace-nowrap font-display text-sm tracking-wide text-text-primary"
            style={{ pointerEvents: 'none' }}
          >
            {name}
          </motion.span>
        </div>
      </motion.div>

      {/* Hidden measuring element */}
      <span
        ref={labelMeasureRef}
        aria-hidden
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          left: -9999,
          top: -9999,
        }}
        className="font-display text-sm tracking-wide"
      >
        {name}
      </span>
    </motion.div>
  )
}
