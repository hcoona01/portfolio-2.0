import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ExpandableLogo from '../components/ExpandableLogo'
import { AnimatedButtons, AnimatedTagline, AnimatedText, ParallaxWrapper } from '../components/AnimatedHero'
import SnowDustBackground from '../components/SnowDustBackground'

gsap.registerPlugin(ScrollTrigger)

const videoSrc =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Resume', href: '#contact' },
]

const roles = ['Enthusiast', '  Sophomore  ', 'Programmer', 'Problem Solver']
const loadingWords = ['Design', 'Create', 'Inspire']

const workItems = [
  { title: 'StackAlign', subtitle: 'AI Job Portal', image: '', link: 'https://devstorm.vercel.app/' },
  { title: 'CiviSeva', subtitle: 'ML Civic Complaint Reporter', image: '', link: 'https://civiseva-front.vercel.app/' },
  { title: 'NextRace Web3', subtitle: 'Web3 Certificate Issuer', image: '', link: 'https://nextrace-web3.vercel.app/' },
  {
    title: 'Personal Plastic Tracker',
    subtitle: 'Eco friendly Plate form',
    image: 'https://i.ibb.co/Y7CMr3Xb/Plastic-Tracker.jpg',
    link: 'https://plastic-tracker-tau.vercel.app/',
    useImageOnly: true,
  },
]

const certificates = [
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: 'Jul 2026',
    credentialId: '612GGAUQQ9ZC',
    skills: ['CyberSecurity'],
    link: 'https://coursera.org/share/7ff716b5f9d841493763354e6e7a3455',
    status: 'Verified Credential',
  },
  {
    title: 'Elements Of AI',
    issuer: 'Helsinki University & Reaktor',
    date: 'Nov 2026',
    credentialId: '3ymca808p92',
    skills: ['Introduction to Artificial Intelligence', 'Machine Learning'],
    link: 'https://certificates.mooc.fi/validate/3ymca808p92',
    status: 'Verified Credential',
  },
  {
    title: 'AI for Beginners',
    issuer: 'HP Foundation',
    date: 'Feb 2026',
    credentialId: '8688aeb1-8bad-4d3b-a5f6-0c8d5c8bc46b',
    skills: ['AI','ML'],
    link: 'https://www.life-global.org/certificate/8688aeb1-8bad-4d3b-a5f6-0c8d5c8bc46b',
    status: 'Verified Credential',
  },
  {
    title: 'C Programming',
    issuer: 'Neo Colab (LPU)',
    date: 'May 2026',
    credentialId: '9A50aE4BF1AG0DH3BI1',
    skills: ['C Programming'],
    link: 'https://media.licdn.com/dms/document/media/v2/D561FAQHMVLStIe23Zg/feedshare-document-pdf-analyzed/B56Z7LVAz_KMAY-/0/1781527745400?e=1788998400&v=beta&t=kAzd4C9HgTV9QfsUbKXHPc2yL_BARKjUfwM0YEWZlSw',
    status: 'Verified Credential',
  },
]

const visualCards = [
  {
    id: 1,
    title: 'Command Center OS',
    tag: 'Web3 & AI Interface',
    description:
      'A futuristic blockchain command center interface exploring real-time decentralized node telemetry, transaction verification streams, and intuitive wallet session management with cybernetic dark styling.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    rotation: '-2deg',
    tags: ['Web3', 'React', 'EVM Nodes', 'UI/UX Architecture'],
    year: '2026',
  },
  {
    id: 2,
    title: 'Neural Vision System',
    tag: 'Computer Vision AI',
    description:
      'Deep learning interface concept for real-time edge computer vision, feature map segmentation, and predictive object classification in spatial multi-agent environments.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    rotation: '2deg',
    tags: ['PyTorch', 'Computer Vision', 'Neural Net', 'Edge AI'],
    year: '2026',
  },
  {
    id: 3,
    title: 'Crypto Liquidity Engine',
    tag: 'DeFi Protocol',
    description:
      'High-throughput automated market maker visualization mapping liquidity depth curves, slippage corridors, and real-time smart contract token swaps across decentralized liquidity pools.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    rotation: '-3deg',
    tags: ['DeFi', 'Solidity', 'Algorithmic Trading', 'WebGL'],
    year: '2026',
  },
  {
    id: 4,
    title: 'Spatial Canvas UI',
    tag: 'Interactive WebGL',
    description:
      'Kinetic typography and volumetric shader experiment combining spring physics, cursor gravity fields, and GPU-accelerated mesh distortions for tactile web interactions.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    rotation: '3deg',
    tags: ['Three.js', 'GLSL Shaders', 'Creative Coding', 'WebGL'],
    year: '2026',
  },
  {
    id: 5,
    title: 'Autonomous Robotics',
    tag: 'Deep Learning Models',
    description:
      'Telemetry visualization for autonomous robotics featuring lidar point-cloud mapping, sensor fusion pipelines, and trajectory prediction for robotic manipulation.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    rotation: '-1.5deg',
    tags: ['Robotics', 'ROS', 'Reinforcement Learning', 'IoT'],
    year: '2026',
  },
  {
    id: 6,
    title: 'Eco-Tracker Analytics',
    tag: 'Telemetry Dashboard',
    description:
      'Environmental monitoring suite tracking real-time carbon indices, satellite sensory telemetry, and sustainable material supply chain flows for carbon offset verification.',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
    rotation: '2.5deg',
    tags: ['Data Viz', 'GIS', 'Telemetry', 'CleanTech'],
    year: '2026',
  },
]

function HlsVideo({ className, flipped = false }: { className?: string; flipped?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls()
      hls.loadSource(videoSrc)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc
    }

    return () => {
      hls?.destroy()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className={`${className ?? ''} ${flipped ? 'scale-y-[-1]' : ''}`}
    />
  )
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 2700
    let frame = 0
    let done = false
    let completeTimer: number | null = null

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const next = Math.floor(progress * 100)
      setCount(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
      if (next >= 100 && !done) {
        done = true
        completeTimer = window.setTimeout(onComplete, 400)
      }
    }

    frame = requestAnimationFrame(tick)
    const words = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % loadingWords.length)
    }, 900)

    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(words)
      if (completeTimer) window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-bg">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Portfolio
      </motion.div>

      <div className="grid h-full place-items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={loadingWords[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {loadingWords[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-6 font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
        {String(count).padStart(3, '0')}
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </div>
  )
}

function BrowserPreview({
  image,
  link,
  title,
  useImageOnly,
}: {
  image: string
  link?: string
  title: string
  useImageOnly?: boolean
}) {
  const displayUrl = useMemo(() => {
    if (!link) return title
    try {
      return new URL(link).hostname
    } catch {
      return link
    }
  }, [link, title])

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0f1115]">
      {/* Browser Chrome */}
      <div className="relative z-10 flex h-8 w-full shrink-0 items-center border-b border-white/10 bg-[#16181d] px-4 md:h-10 md:px-5">
        <div className="flex gap-1.5 md:gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] md:h-3 md:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] md:h-3 md:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] md:h-3 md:w-3" />
        </div>
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center">
          <div className="flex h-5 items-center justify-center rounded bg-white/5 px-3 text-[10px] text-white/40 md:h-6 md:px-4 md:text-xs">
            {displayUrl}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="group/content relative flex-1 overflow-hidden bg-bg">
        {useImageOnly && image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/content:scale-105"
          />
        ) : link ? (
          <div className="absolute inset-0 overflow-hidden">
            {/* The iframe serves only as a visual preview without scrollbars */}
            <iframe
              src={link}
              title={title}
              scrolling="no"
              className="pointer-events-none h-full w-full border-0 bg-white"
              style={{
                overflow: 'hidden',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              loading="lazy"
              tabIndex={-1}
            />
            {/* Overlay to catch mouse events for hover while keeping the frame slightly dimmed */}
            <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover/content:bg-black/0" />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover/content:scale-105"
          />
        )}
      </div>
    </div>
  )
}

function SectionHeader({
  title,
  lead,
  accent,
  tail = '',
  description,
  action,
}: {
  title: string
  lead: string
  accent: string
  tail?: string
  description: string
  action?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-8 flex items-end justify-between gap-4 md:mb-10"
    >
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{title}</span>
        </div>
        <h2 className="mb-3 text-3xl text-text-primary md:text-5xl">
          {lead}{' '}
          <span className="font-display italic">{accent}</span>
          {tail}
        </h2>
        <p className="text-sm text-muted md:text-base">{description}</p>
      </div>
      {action && (
        <button className="group relative hidden rounded-full p-[2px] md:inline-flex">
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative rounded-full border border-stroke bg-bg px-5 py-2 text-sm">
            {action} ↗
          </span>
        </button>
      )}
    </motion.div>
  )
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.sessionStorage.getItem('portfolio-loading-done') !== 'true'
  })
  const [roleIndex, setRoleIndex] = useState(0)
  const [active, setActive] = useState('Home')
  const [scrolled, setScrolled] = useState(false)
  const [selectedCard, setSelectedCard] = useState<(typeof visualCards)[0] | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const roleTimer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2000)
    return () => window.clearInterval(roleTimer)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.name-reveal', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
    tl.fromTo(
      '.blur-in',
      { opacity: 0, filter: 'blur(10px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
      0
    )
    return () => {
      tl.kill()
    }
  }, [isLoading])

  useEffect(() => {
    if (!contentRef.current || !parallaxRef.current || !marqueeRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: parallaxRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      gsap.to('[data-col="left"]', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('[data-col="right"]', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const sectionEntries: Array<[string, string]> = [
      ['Home', 'home'],
      ['Work', 'work'],
      ['Resume', 'contact'],
    ]

    const onScroll = () => {
      setScrolled(window.scrollY > 100)
      const offset = window.scrollY + 180
      for (let i = sectionEntries.length - 1; i >= 0; i -= 1) {
        const [name, id] = sectionEntries[i]
        const section = document.getElementById(id)
        if (section && offset >= section.offsetTop) {
          setActive(name)
          break
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const marqueeText = useMemo(() => 'BUILDING THE FUTURE • '.repeat(10), [])
  const handleLoadingComplete = useCallback(() => {
    window.sessionStorage.setItem('portfolio-loading-done', 'true')
    setIsLoading(false)
    window.setTimeout(() => {
      ScrollTrigger.refresh()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).lenis
      if (lenis && typeof lenis.resize === 'function') {
        lenis.resize()
      }
    }, 150)
  }, [])

  const scrollToSection = (target: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { duration: 1.2 })
    } else {
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="relative overflow-x-hidden bg-bg">
      <SnowDustBackground />
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Global Fixed Navbar Header - Topmost Stacking Context */}
      <header className="pointer-events-none fixed left-0 right-0 top-0 z-[1000] flex justify-center px-4 pt-4 md:pt-6">
        <nav
          className={`pointer-events-auto inline-flex items-center rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md transition-all duration-300 ${
            scrolled ? 'shadow-lg shadow-black/40 border-white/15' : ''
          }`}
        >
          <ExpandableLogo
            name="OM DIPAK KANASE"
            monogram="ODK"
            onClick={() => {
              scrollToSection('#home')
              setActive('Home')
            }}
          />
          <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.href)
                setActive(link.label)
              }}
              className={`rounded-full px-3 py-1.5 text-xs transition sm:px-4 sm:py-2 sm:text-sm ${
                active === link.label
                  ? 'bg-stroke/50 text-text-primary'
                  : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#contact')
              setActive('Resume')
            }}
            className="group relative rounded-full p-[2px] text-xs sm:text-sm"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 sm:px-4 sm:py-2">
              Say hi ↗
            </span>
          </a>
        </nav>
      </header>

      <section id="home" className="relative z-10 min-h-screen">
        <HlsVideo className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-bg to-transparent" />

        <ParallaxWrapper className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">HCOONA01</p>
          <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
            <AnimatedText text="Om Dipak Kanase" />
          </h1>
          <AnimatedTagline className="mb-4">
            <p className="text-base text-text-primary md:text-xl">
              A{' '}
              <span key={roleIndex} className="animate-role-fade-in inline-block font-display italic">
                {roles[roleIndex]}
              </span>{' '}
              lives in Jalandhar.
            </p>
          </AnimatedTagline>
          <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
            Passionate for building-edge systems, spanning AI and ML, Web3, full-stack dev and competitive programming.
          </p>

          <AnimatedButtons className="blur-in">
            <button
              onClick={() => scrollToSection('#work')}
              className="group relative rounded-full p-[2px] text-sm transition hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative rounded-full bg-text-primary px-7 py-3.5 text-bg transition group-hover:bg-bg group-hover:text-text-primary">
                See Works
              </span>
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="group relative rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition hover:scale-105 hover:border-transparent"
            >
              <span className="absolute inset-[-2px] -z-10 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
              Reach out...
            </button>
          </AnimatedButtons>
        </ParallaxWrapper>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">SCROLL</p>
          <div className="relative mx-auto h-10 w-px overflow-hidden bg-stroke">
            <span className="animate-scroll-down accent-gradient absolute inset-x-0 h-12" />
          </div>
        </div>
      </section>

      <section id="work" className="relative z-10 bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            title="SELECTED WORK"
            lead="FEATURED"
            accent=" PROJECTS"
            description="A selection of projects I've worked on, from concept to launch."
            action="View all work"
          />
          <div className="flex flex-col gap-12 md:gap-20">
            {workItems.map((item, index) => {
              const isEven = index % 2 === 0
              const projectNumber = String(index + 1).padStart(2, '0')
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`w-full md:w-[62%] lg:w-[56%] ${
                    isEven ? 'md:self-start' : 'md:self-end'
                  }`}
                >
                  <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface/90 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <BrowserPreview image={item.image} link={item.link} title={item.title} useImageOnly={item.useImageOnly} />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0"
                        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-bg/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute bottom-6 left-6 rounded-full p-[1px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <div className="animate-gradient-shift rounded-full accent-gradient p-[1px]">
                          <a
                            href={item.link || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="pointer-events-auto block rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-gray-100 sm:text-sm"
                          >
                            Visit Project ↗
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-stroke/60 bg-surface/80 px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted">{projectNumber}</span>
                          <span className="text-muted">/</span>
                          <span className="text-xs uppercase tracking-wider text-muted">{item.subtitle}</span>
                        </div>
                        <h3 className="mt-0.5 text-lg font-medium text-text-primary md:text-xl">
                          {item.title}
                        </h3>
                      </div>
                      <a
                        href={item.link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="group/btn relative rounded-full p-[1px] text-xs"
                      >
                        <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover/btn:opacity-100" />
                        <span className="relative inline-flex items-center gap-1 rounded-full border border-stroke bg-bg px-4 py-2 text-xs text-text-primary transition-colors hover:bg-surface">
                          Explore ↗
                        </span>
                      </a>
                    </div>
                  </article>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="certifications" className="relative z-10 bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            title="CERTIFICATIONS"
            lead="Check out my "
            accent="Certifications"
            description="Verified credentials and technical accreditations across AI, Web3, and Systems."
            action=""
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {certificates.map((cert, index) => (
              <motion.article
                key={cert.title || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stroke bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-surface hover:shadow-xl hover:shadow-cyan-500/5 sm:p-8"
              >
                {/* Background ambient glow on hover */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(137,170,204,0.15)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div>
                  {/* Top Bar: Issuer status & Date */}
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-400">
                        {cert.status || 'Verified Credential'}
                      </span>
                    </div>
                    {cert.date && (
                      <span className="font-mono text-xs text-muted">
                        {cert.date}
                      </span>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-text-primary transition-colors group-hover:text-white md:text-2xl">
                      {cert.title || 'Certificate Title'}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      Issued by <span className="font-display italic text-text-primary/90">{cert.issuer || 'Authority'}</span>
                    </p>
                  </div>

                  {/* Skills / Badges */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-stroke/60 bg-bg/60 px-3 py-1 text-[11px] text-muted transition group-hover:border-stroke group-hover:text-text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-2 flex items-center justify-between border-t border-stroke/50 pt-4">
                  <span className="font-mono text-[11px] text-muted">
                    ID: {cert.credentialId || `CERT-00${index + 1}`}
                  </span>

                  <a
                    href={cert.link || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link relative inline-flex items-center gap-1.5 rounded-full p-[1px] text-xs font-medium transition hover:scale-105"
                  >
                    <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover/link:opacity-100" />
                    <span className="relative inline-flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-4 py-2 text-text-primary transition-colors group-hover/link:bg-surface">
                      Verify Credential ↗
                    </span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={parallaxRef} className="relative z-10 min-h-[300vh] bg-transparent">
        <div ref={contentRef} className="z-10 flex h-screen items-center justify-center px-6 text-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Achievments</p>
            <h2 className="mb-4 text-4xl md:text-6xl">
              Merited <span className="font-display italic">Rewards</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted">
              Academic, Scholastic and Co-curricular Achievements
            </p>
            
          </div>
        </div>

        <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[30vh] md:gap-40">
          <div data-col="left" className="space-y-16">
            {visualCards.slice(0, 3).map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                style={{ transform: `rotate(${card.rotation})` }}
                className="group relative aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl border border-stroke bg-surface/90 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-cyan-500/10"
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">Slot 0{card.id}</span>
                    <h4 className="mt-2 text-lg font-medium text-text-primary">{card.title}</h4>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">{card.tag}</span>
                  <h4 className="text-sm font-medium text-white">{card.title}</h4>
                </div>
              </button>
            ))}
          </div>
          <div data-col="right" className="space-y-16 pt-24">
            {visualCards.slice(3, 6).map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                style={{ transform: `rotate(${card.rotation})` }}
                className="group relative aspect-square w-full max-w-[340px] overflow-hidden rounded-3xl border border-stroke bg-surface/90 shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/30 hover:shadow-cyan-500/10"
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">Slot 0{card.id}</span>
                    <h4 className="mt-2 text-lg font-medium text-text-primary">{card.title}</h4>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300">{card.tag}</span>
                  <h4 className="text-sm font-medium text-white">{card.title}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-transparent py-16 md:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 md:grid-cols-3 md:px-10 lg:px-16">
          {[
            ['1', 'Year Experience'],
            ['20+', 'Projects Done'],
            ['100%', 'Success Rate'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-stroke bg-surface/80 p-8 text-center backdrop-blur-sm">
              <p className="mb-3 font-display text-6xl italic text-text-primary">{value}</p>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="relative z-10 overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
        <HlsVideo flipped className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10">
          <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-5">
            <div ref={marqueeRef} className="inline-block text-xl uppercase tracking-[0.25em] text-text-primary/70 md:text-3xl">
              {marqueeText}
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-16 text-center">
            <a href="mailto:projectcertificate01@gmail.com" className="group relative inline-flex rounded-full p-[2px]">
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative rounded-full border border-stroke bg-bg px-8 py-3 text-sm text-text-primary">
                projectcertificate01@gmail.com
              </span>
            </a>
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/10 px-6 pt-6 text-sm text-muted md:flex-row">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center rounded-full p-[1px] text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-surface/90 px-5 py-2.5 text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent group-hover:bg-bg group-hover:text-white">
                  <svg className="h-4 w-4 fill-cyan-400 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                  <span className="text-xs text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                    ↗
                  </span>
                </span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center rounded-full p-[1px] text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-surface/90 px-5 py-2.5 text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent group-hover:bg-bg group-hover:text-white">
                  <svg className="h-4 w-4 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                  <span className="text-xs text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                    ↗
                  </span>
                </span>
              </a>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/60 px-4 py-2 text-xs backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Available for projects
            </p>
          </div>
        </div>
      </footer>

      {/* Visual Exploration Detail Window Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div
            className="fixed inset-0 z-[10000] grid place-items-center bg-black/85 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-[#0d0f13] shadow-2xl md:flex-row"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                aria-label="Close modal"
                className="group absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-muted backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/90 hover:text-white"
              >
                ✕
              </button>

              {/* Left/Top: High-Res Image Display */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-black/40 md:aspect-auto md:w-1/2">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f13] via-transparent to-transparent md:hidden" />
              </div>

              {/* Right/Bottom: Detailed Exploration Intel */}
              <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="font-mono text-xs text-muted">0{selectedCard.id}</span>
                    <span className="text-muted">/</span>
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                      {selectedCard.tag}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-2xl text-text-primary md:text-3xl">
                    {selectedCard.title}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-muted md:text-base">
                    {selectedCard.description}
                  </p>

                  {selectedCard.tags && (
                    <div className="mb-6">
                      <p className="mb-2 text-xs uppercase tracking-widest text-muted">Exploration Focus</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCard.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-primary/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-muted">
                    {selectedCard.year || '2026'} • Achievments & Awards
                  </span>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="group relative rounded-full p-[1px] text-xs"
                  >
                    <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-text-primary transition hover:bg-white/20">
                      Close Window ✕
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
