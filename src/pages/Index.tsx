import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ExpandableLogo from '../components/ExpandableLogo'
import { AnimatedButtons, AnimatedTagline, AnimatedText, ParallaxWrapper } from '../components/AnimatedHero'
import SnowDustBackground from '../components/SnowDustBackground'
import omPhoto from '../assets/om.jpg'

gsap.registerPlugin(ScrollTrigger)

const videoSrc =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#contact' },
]

const roles = ['Enthusiast', '  Sophomore  ', 'Programmer', 'Problem Solver']
const loadingWords = ['Design', 'Create', 'Inspire']

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['C / C++', 'Python', 'TypeScript', 'JavaScript', 'Solidity'],
  },
  {
    title: 'Frontend & UI Frameworks',
    skills: ['React 19', 'Next.js', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend & Systems',
    skills: ['Flask', 'FastAPI', 'Node.js & Express', 'MySQL', 'PostgreSQL', 'SMTP'],
  },
  {
    title: 'AI, Data Science & Computer Vision',
    skills: ['Machine Learning', 'PyTorch', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib'],
  },
  {
    title: 'Blockchain & Core CS',
    skills: ['Blockchain', 'Data Structures & Algorithms', 'Cybersecurity', 'Git & GitHub'],
  },
]

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

export type FlashcardPreviewItem = {
  id?: string | number
  title: string
  tag?: string
  description?: string
  image?: string
  tags?: string[]
  year?: string
  date?: string
  issuer?: string
  credentialId?: string
  status?: string
  link?: string
  skills?: string[]
  rotation?: string
}

const certificates: FlashcardPreviewItem[] = [
  {
    id: 1,
    title: 'Foundations of Cybersecurity',
    issuer: 'Google',
    date: 'Jul 2026',
    year: 'Jul 2026',
    credentialId: '612GGAUQQ9ZC',
    skills: ['CyberSecurity', 'Threat Mitigation', 'SIEM Tools', 'Network Security'],
    tags: ['Google', 'CyberSecurity', 'Verified Credential'],
    link: 'https://coursera.org/share/7ff716b5f9d841493763354e6e7a3455',
    status: 'Verified Credential',
    image: 'https://images.credly.com/images/40960e1a-85d7-46a2-9fa4-70e2be52ad3e/Foundations_of_Cybersecurity.png',
    description:
      'Professional cybersecurity accreditation issued by Google via Coursera. Encompasses core principles of threat modeling, defensive architectures, network packet inspection, security compliance, and organizational incident response.',
  },
  {
    id: 2,
    title: 'Elements Of AI',
    issuer: 'University Of Helsinki',
    date: 'Nov 2026',
    year: 'Nov 2026',
    credentialId: '3ymca808p92',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Probabilistic AI', 'Neural Networks'],
    tags: ['Univ of Helsinki', 'AI & ML', 'Verified Credential'],
    link: 'https://certificates.mooc.fi/validate/3ymca808p92',
    status: 'Verified Credential',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    description:
      'Rigorous academic certification in Artificial Intelligence foundations, probabilistic reasoning, machine learning algorithms, search spaces, and real-world ethical implications of autonomous systems, issued by University of Helsinki & MinnaLearn.',
  },
  {
    id: 3,
    title: 'AI for Beginners',
    issuer: 'HP Foundation',
    date: 'Feb 2026',
    year: 'Feb 2026',
    credentialId: '8688aeb1-8bad-4d3b-a5f6-0c8d5c8bc46b',
    skills: ['AI Foundations', 'Predictive Modeling', 'Ethics in AI', 'Automation'],
    tags: ['HP LIFE', 'Applied AI', 'Verified Credential'],
    link: 'https://www.life-global.org/certificate/8688aeb1-8bad-4d3b-a5f6-0c8d5c8bc46b',
    status: 'Verified Credential',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    description:
      'Applied accreditation covering practical implementations of artificial intelligence, intelligent process automation, data-driven decision frameworks, and ethical machine learning deployments under the HP LIFE global initiative.',
  },
  {
    id: 4,
    title: 'C Programming',
    issuer: 'Neo Colab (LPU)',
    date: 'May 2026',
    year: 'May 2026',
    credentialId: '9A50aE4BF1AG0DH3BI1',
    skills: ['C Programming', 'Memory Management', 'Pointers & Structs', 'Data Structures'],
    tags: ['Neo Colab', 'LPU', 'Core Systems'],
    link: 'https://media.licdn.com/dms/document/media/v2/D561FAQHMVLStIe23Zg/feedshare-document-pdf-analyzed/B56Z7LVAz_KMAY-/0/1781527745400?e=1788998400&v=beta&t=kAzd4C9HgTV9QfsUbKXHPc2yL_BARKjUfwM0YEWZlSw',
    status: 'Verified Credential',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop',
    description:
      'Advanced proficiency certificate demonstrating in-depth mastery of low-level C programming, dynamic memory allocation, pointer arithmetic, algorithmic recursion, and data structure implementations certified via Neo Colab.',
  },
]

const educationStoryline = [
  {
    step: '01',
    phase: 'Foundation Chapter',
    degree: 'Class X',
    institution: 'Army Public School Bikaner',
    score: '95.8%',
    scoreLabel: 'Aggregate Score',
    scoreBadge: 'Board Distinction',
    status: 'Completed',
    statusDetail: 'CBSE Board',
    story:
      'Solidified a strong academic foundation with consistent scholastic achievement across all core subjects, earning a 100/100 perfect score in CBSE Science and three-year Bikaner District Rank 1 in Vidyarthi Vigyan Manthan (VVM).',
    highlights: ['CBSE Board', 'APS Bikaner', 'Science 100/100', 'VVM District Rank 1 (3x)'],
  },
  {
    step: '02',
    phase: 'Ascent Chapter',
    degree: 'Class XII',
    institution: 'Army Public School Bikaner',
    score: '92.8%',
    scoreLabel: 'Aggregate Score',
    scoreBadge: 'PCM Distinction',
    status: 'Completed',
    statusDetail: 'CBSE Board • PCM',
    story:
      'Completed rigorous higher secondary studies specializing in Physics, Chemistry, and Mathematics (PCM). Achieved State Rank 12 in Rajasthan State Talent Search Examination (STSE) and 97.29%ile in JEE Mains with 99.21%ile in Physics.',
    highlights: ['PCM Stream', 'APS Bikaner', 'STSE State Rank 12', 'JEE Mains 97.29%ile', 'Physics 99.21%ile'],
  },
  {
    step: '03',
    phase: 'Frontier Chapter',
    degree: 'B.Tech Computer Science and Engineering (AI/ML)',
    institution: 'Undergraduate Degree',
    score: '9.53 CGPA',
    scoreLabel: 'Cumulative GPA',
    scoreBadge: 'Top Tier Honors',
    status: 'In Progress',
    statusDetail: 'Sophomore • AI/ML',
    story:
      'Pursuing an engineering degree with in-depth focus on Artificial Intelligence, Machine Learning algorithms, and software systems. Maintaining a 9.53 CGPA while conducting project engineering and being recognized as a Reliance Foundation Scholar.',
    highlights: ['AI & Machine Learning', 'Data Structures & Algorithms', 'Reliance Foundation Scholar', '9.53 CGPA'],
  },
]

const visualCards = [
  {
    id: 1,
    title: 'Vidyarthi Vigyan Manthan',
    tag: 'VVM',
    description:
      "Achieved Bikaner District Rank 1 for three consecutive years (2020,2021,2022) and in Top 10 Rajasthan Students at State Level Camp (2020,2021,2022). It is organised by NCERT, Vijnana Bharati and Department of Science and Technology.",
    image: 'https://vvm.org.in/assets/logo.png',
    rotation: '-2deg',
    tags: ['2020', '2021', '2022'],

  },
  {
    id: 2,
    title: 'CBSE Merit Certificate',
    tag: 'CBSE Merit Certificate in Science Subject X',
    description:
      'Scored a perfect 100/100 in CBSE Class 10th Science Examination 2022.',
    image: 'https://cdn.prod.website-files.com/6284943f887c4094af5abb07/672f8cf509fe44d51682db08_CBSE_new_logo.svg',
    rotation: '2deg',
    tags: ['2022'],
    year: '2022',
  },
  {
    id: 3,
    title: 'State Talent Search Rajasthan 2022',
    tag: 'STSE 2022',
    description:
      'State Rank 12 in Rajasthan State Level talent Search Examination (STSE) in 2022',
    image: 'https://bser-exam.in/img/boserlogo.png',
    rotation: '-3deg',
    tags: ['2022'],
    year: '2022',
  },
  {
    id: 4,
    title: 'Joint Entrace Examination Mains 2025',
    tag: 'JEE Mains 2025',
    description:
      'Scored 97.29%ile in JEE Mains with 99.21%ile in Physics.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-CKc58qhVh0DEFfX26XNc9fLYADp0ds8b6r7VTtuzfpuA5SXB15ySaA&s=10',
    rotation: '3deg',
    tags: ['2025'],
    year: '2025',
  },
  {
    id: 5,
    title: 'National Science Talent Search Examination (Unified Council)',
    tag: 'NSTSE 2022',
    description:
      'Achieved All India Rank 96 in National Science Talent Search Examination (Unified Council) in 2022.',
    image: 'https://institute.careerguide.com/wp-content/uploads/2023/04/rodeo-6-1024x576.jpg',
    rotation: '-1.5deg',
    tags: ['2022'],
    year: '2022',
  },
  {
    id: 6,
    title: 'Reliance Foundation Scholar 2025',
    tag: 'Reliance Foundation Scholar',
    description:
      'Selected for the Reliance Foundation Undergraduate Scholarship Program 2025, recognizing academic merit and leadership potential.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNCjIXfRvttd83KoYUzLwRq0PlAhkskGoEjhaHzM8qAEOGEhenJ4DDcE&s=10',
    rotation: '2.5deg',
    tags: ['2025'],
    year: '2025'}
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
  actionHref,
}: {
  title: string
  lead: string
  accent: string
  tail?: string
  description: string
  action?: string
  actionHref?: string
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
      {action &&
        (actionHref ? (
          <a
            href={actionHref}
            target="_blank"
            rel="noreferrer"
            className="group relative hidden rounded-full p-[2px] transition hover:scale-105 md:inline-flex"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative rounded-full border border-stroke bg-bg px-5 py-2 text-sm text-text-primary transition group-hover:bg-surface">
              {action} ↗
            </span>
          </a>
        ) : (
          <button className="group relative hidden rounded-full p-[2px] md:inline-flex">
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative rounded-full border border-stroke bg-bg px-5 py-2 text-sm">
              {action} ↗
            </span>
          </button>
        ))}
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
  const [selectedCard, setSelectedCard] = useState<FlashcardPreviewItem | null>(null)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const heroPhotoRef = useRef<HTMLDivElement>(null)

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
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      gsap.to('[data-col="right"]', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: 'bottom bottom',
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

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)

    return () => {
      window.clearTimeout(refreshTimer)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (!heroPhotoRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(heroPhotoRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: '35% top',
          scrub: true,
          onUpdate: (self) => {
            if (heroPhotoRef.current) {
              heroPhotoRef.current.style.pointerEvents = self.progress > 0.85 ? 'none' : 'auto'
            }
          },
        },
      })
    })
    return () => ctx.revert()
  }, [isLoading])

  useEffect(() => {
    const sectionEntries: Array<[string, string]> = [
      ['Home', 'home'],
      ['Skills', 'skills'],
      ['Work', 'work'],
      ['Education', 'education'],
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
          className={`pointer-events-auto inline-flex items-center rounded-full border border-white/10 bg-surface/90 px-2 py-2 backdrop-blur-md transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/40 border-white/15' : ''
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
              className={`rounded-full px-3 py-1.5 text-xs transition sm:px-4 sm:py-2 sm:text-sm ${active === link.label
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

        <ParallaxWrapper className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-16 pb-20 text-center">
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
          <p className="blur-in mb-10 max-w-md text-sm text-muted md:text-base">
            Passionate for building-edge systems, spanning AI and ML, Web3, full-stack dev and competitive programming.
          </p>

          <AnimatedButtons className="blur-in mb-2">
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

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">SCROLL</p>
          <div className="relative mx-auto h-10 w-px overflow-hidden bg-stroke">
            <span className="animate-scroll-down accent-gradient absolute inset-x-0 h-12" />
          </div>
        </div>

        {/* Hero Photo - Positioned in the bottom-right corner of the video hero section, fades away on scroll */}
        <div
          ref={heroPhotoRef}
          className="group absolute bottom-8 right-6 z-20 md:bottom-10 md:right-10 lg:bottom-12 lg:right-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Tooltip on hover */}
            

            {/* Glowing avatar ring with 180% hover expansion & modal opener */}
            <button
              type="button"
              onClick={() => setIsAboutModalOpen(true)}
              aria-label="View About Om Dipak Kanase"
              className="relative block h-20 w-20 origin-bottom-right rounded-full p-[2px] cursor-pointer text-left transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] sm:h-22 sm:w-22 md:h-24 md:w-24 focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-surface/90 shadow-2xl backdrop-blur-md transition-colors duration-500 group-hover:border-transparent group-hover:bg-bg">
                <img
                  src={omPhoto}
                  alt="Om Dipak Kanase"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110 select-none"
                  draggable={false}
                />
              </div>

              {/* Status indicator badge - Silver white glow */}
              <span className="absolute bottom-1 right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4" title="Available to connect">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full border-2 border-[#0a0a0c] bg-slate-100 shadow-[0_0_12px_rgba(255,255,255,0.9),0_0_4px_rgba(200,225,255,0.8)]" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative z-10 bg-transparent py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            title="EXPERTISE"
            lead="Technical"
            accent="Skills"
            description="Core languages, frameworks, AI/ML tools, and development paradigms. Still grinding for more!"
          />
          <div className="flex flex-col gap-8 md:gap-10">
            {skillCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: catIndex * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col gap-3 md:gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-white/20" />
                  <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-400">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 md:gap-3.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="group relative inline-flex cursor-default items-center justify-center overflow-hidden rounded-full border border-white/10 bg-surface/80 px-4 py-2 text-xs font-medium text-text-primary backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.12)] sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      {/* Subtle Silver Shimmer Sweep */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                      {/* Skill Name */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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
            actionHref="https://github.com/hcoona01"
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
                  className={`w-full md:w-[62%] lg:w-[56%] ${isEven ? 'md:self-start' : 'md:self-end'
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
                            href={item.link || 'https://github.com/hcoona01'}
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
                onClick={() => setSelectedCard(cert)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stroke bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-surface hover:shadow-2xl hover:shadow-cyan-500/5 sm:p-8 cursor-pointer"
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
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stroke/50 pt-4">
                  <span className="font-mono text-[11px] text-muted">
                    ID: {cert.credentialId || `CERT-00${index + 1}`}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCard(cert)
                      }}
                      className="group/btn relative inline-flex items-center gap-1.5 rounded-full p-[1px] text-xs font-medium transition hover:scale-105"
                    >
                      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover/btn:opacity-100" />
                      <span className="relative inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface/90 px-3.5 py-1.5 text-xs text-text-primary backdrop-blur-md transition group-hover/btn:border-white/30 group-hover/btn:text-white">
                        <span>Preview</span>
                        <span className="text-muted group-hover/btn:text-white">👁</span>
                      </span>
                    </button>

                    <a
                      href={cert.link || '#'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group/link relative inline-flex items-center gap-1.5 rounded-full p-[1px] text-xs font-medium transition hover:scale-105"
                    >
                      <span className="absolute inset-0 rounded-full accent-gradient opacity-0 transition-opacity group-hover/link:opacity-100" />
                      <span className="relative inline-flex items-center gap-1.5 rounded-full border border-stroke bg-bg px-4 py-1.5 text-text-primary transition-colors group-hover/link:bg-surface">
                        Verify ↗
                      </span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Education Storyline Section */}
      <section id="education" className="relative z-10 bg-transparent pt-14 pb-10 md:pt-20 md:pb-12">
        <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
          <SectionHeader
            title="ACADEMIC STORYLINE"
            lead="Educational"
            accent="Storyline"
            description="A chronological journey tracing scholastic foundations, board distinctions, and engineering studies."
          />

          <div className="relative mt-12 md:mt-20">
            {/* Storyline Central Trace Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 top-4 left-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-white/25 via-blue-400/40 to-stroke/60 md:left-1/2"
            />

            <div className="space-y-12 md:space-y-16">
              {educationStoryline.map((item, index) => {
                const isEven = index % 2 === 0
                return (
                  <motion.div
                    key={item.degree}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-70px' }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Storyline Spine Node (Center on md, Left on mobile) */}
                    <div className="absolute left-6 top-8 z-20 flex -translate-x-1/2 items-center justify-center md:left-1/2">
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#0e1015] shadow-[0_0_20px_rgba(255,255,255,0.18)] backdrop-blur-md transition-transform duration-300 hover:scale-110">
                        {item.status === 'In Progress' && (
                          <span className="absolute inset-0 animate-ping rounded-full bg-white/25" />
                        )}
                        <span className="font-mono text-xs font-semibold text-text-primary">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Card */}
                    <div
                      className={`relative w-full pl-14 md:w-[calc(50%-2.5rem)] md:pl-0 ${
                        isEven ? 'md:mr-auto' : 'md:ml-auto'
                      }`}
                    >
                      {/* Desktop connector beam to center node */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none hidden md:block absolute top-12 h-px w-10 ${
                          isEven
                            ? 'right-0 translate-x-full bg-gradient-to-r from-white/25 to-transparent'
                            : 'left-0 -translate-x-full bg-gradient-to-l from-white/25 to-transparent'
                        }`}
                      />

                      <article className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface/80 p-6 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-surface hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 sm:p-8">
                        {/* Ambient radial glow on hover */}
                        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(137,170,204,0.16)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Top Bar: Chapter badge & Score showcase */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-stroke/50 pb-4">
                          <div className="flex items-center gap-2.5">
                            {/* White silver glow dot */}
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
                              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white/60 bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.95),0_0_4px_rgba(220,235,255,0.85)]" />
                            </span>
                            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                              {item.phase} • {item.statusDetail}
                            </span>
                          </div>

                          {/* Prominent Score Chip */}
                          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 backdrop-blur-md transition-all group-hover:border-white/30 group-hover:bg-white/[0.08]">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                              {item.scoreLabel}
                            </span>
                            <span className="font-mono text-sm font-bold tracking-tight text-white sm:text-base [text-shadow:0_0_12px_rgba(255,255,255,0.4)]">
                              {item.score}
                            </span>
                          </div>
                        </div>

                        {/* Heading & Institution */}
                        <div className="mb-3">
                          <h3 className="text-xl font-medium text-text-primary transition-colors group-hover:text-white sm:text-2xl">
                            {item.degree}
                          </h3>
                          <p className="mt-1 text-sm sm:text-base text-muted">
                            <span className="font-display italic text-lg sm:text-xl text-text-primary/95">
                              {item.institution}
                            </span>
                          </p>
                        </div>

                        {/* Storyline narrative */}
                        <p className="text-sm leading-relaxed text-muted transition-colors group-hover:text-slate-300">
                          {item.story}
                        </p>

                        {/* Bottom highlight tags */}
                        <div className="mt-5 flex flex-wrap gap-1.5 border-t border-stroke/40 pt-4">
                          {item.highlights.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-stroke/60 bg-bg/60 px-3 py-1 text-[11px] text-muted transition-all group-hover:border-stroke group-hover:text-text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </article>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section ref={parallaxRef} className="relative z-10 min-h-[250vh] md:min-h-[270vh] bg-transparent">
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

        <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[35vh] md:gap-40 md:pt-[42vh]">
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
          <div data-col="right" className="space-y-16 pt-16 md:pt-20">
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

      <section className="relative z-20 bg-transparent py-16 md:py-24">
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
                href="https://www.linkedin.com/in/om-kanase-397180372/"
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
                href="https://github.com/hcoona01"
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

      {/* Visual Exploration & Certificate Detail Window Modal */}
      <AnimatePresence>
        {selectedCard && (
          <div
            className="fixed inset-0 z-[10000] grid place-items-center bg-black/85 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="group/detail relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[26px] p-[1.5px] shadow-[0_0_50px_rgba(0,0,0,0.9)] md:flex-row"
            >
              {/* Base border */}
              <div className="absolute inset-0 rounded-[26px] bg-white/10 transition-colors duration-500 group-hover/detail:bg-white/20" />

              {/* Moving white glow beam */}
              <div className="moving-border-glow pointer-events-none opacity-0 transition-opacity duration-500 group-hover/detail:opacity-100" />

              {/* Inner card container */}
              <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-[24.5px] bg-[#0d0f14] md:flex-row">
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
                <div className="relative flex min-h-[240px] w-full shrink-0 items-center justify-center overflow-hidden bg-black/50 p-6 md:min-h-[400px] md:w-1/2">
                  {selectedCard.image ? (
                    <img
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      className="max-h-[300px] max-w-full rounded-2xl object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.12)] transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">
                        {selectedCard.tag || 'Preview'}
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent md:hidden" />
                </div>

                {/* Right/Bottom: Detailed Exploration & Certificate Intel */}
                <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6 sm:p-8">
                  <div>
                    {/* Header Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted">0{selectedCard.id}</span>
                      <span className="text-muted">/</span>
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-cyan-300">
                        {selectedCard.tag || selectedCard.issuer}
                      </span>
                      {selectedCard.status && (
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                          </span>
                          <span>{selectedCard.status}</span>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-1.5 font-display text-2xl italic tracking-tight text-white md:text-3xl">
                      {selectedCard.title}
                    </h3>

                    {/* Issuer Subtitle */}
                    {selectedCard.issuer && (
                      <p className="mb-4 text-xs text-muted">
                        Issued by <span className="font-medium text-white">{selectedCard.issuer}</span>
                        {selectedCard.date ? ` • ${selectedCard.date}` : ''}
                      </p>
                    )}

                    {/* Description */}
                    <p className="mb-5 text-sm leading-relaxed text-slate-300 md:text-base">
                      {selectedCard.description}
                    </p>

                    {/* Skills / Tags */}
                    {(selectedCard.skills || selectedCard.tags) && (
                      <div className="mb-5">
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                          {selectedCard.issuer ? 'Key Skills Covered' : 'Years of Participation'}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedCard.skills || selectedCard.tags)?.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Credential ID */}
                    {selectedCard.credentialId && (
                      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-mono text-slate-300">
                        <span className="text-[11px] uppercase tracking-wider text-muted">Credential ID:</span>
                        <span className="select-all font-semibold tracking-wide text-white">{selectedCard.credentialId}</span>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="font-mono text-xs text-muted">
                      {selectedCard.year || selectedCard.date || '2026'} • {selectedCard.issuer ? 'Verified Credential' : 'Achievements & Awards'}
                    </span>

                    <div className="flex items-center gap-2.5">
                      {selectedCard.link && (
                        <a
                          href={selectedCard.link}
                          target="_blank"
                          rel="noreferrer"
                          className="group/ver relative inline-flex items-center justify-center rounded-full p-[1px] text-xs font-medium transition hover:scale-105"
                        >
                          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/70 via-slate-100 to-white/90 opacity-90 shadow-[0_0_14px_rgba(255,255,255,0.3)] transition-opacity group-hover/ver:opacity-100" />
                          <span className="relative flex items-center gap-1.5 rounded-full bg-[#0e1015] px-4 py-2 text-white transition group-hover/ver:bg-surface">
                            <span>Verify Credential</span>
                            <span>↗</span>
                          </span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => setSelectedCard(null)}
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-slate-200 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                      >
                        Close Window ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Me Popup Window Modal with Fade Effect */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setIsAboutModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="group/modal relative w-full max-w-[480px] overflow-hidden rounded-[24px] p-[1.5px] shadow-[0_0_20px_rgba(0,0,0,0.8),0_20px_60px_rgba(0,0,0,0.85)] transition-shadow duration-500 hover:shadow-[0_0_45px_rgba(255,255,255,0.15),0_20px_60px_rgba(0,0,0,0.9)]"
            >
              {/* Base border */}
              <div className="absolute inset-0 rounded-[24px] bg-white/10 transition-colors duration-500 group-hover/modal:bg-white/20" />

              {/* Moving white glow beam - only visible on hover */}
              <div className="moving-border-glow pointer-events-none opacity-0 transition-opacity duration-500 group-hover/modal:opacity-100" />

              {/* Inner content box */}
              <div className="relative z-10 h-full w-full overflow-hidden rounded-[22.5px] bg-[#0e1015]/95 p-6 backdrop-blur-2xl sm:p-7">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsAboutModalOpen(false)}
                  aria-label="Close window"
                  className="group absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:border-white/30 hover:bg-white/15 hover:text-white"
                >
                  ✕
                </button>

              {/* Profile Header */}
              <div className="flex items-center gap-4 pr-6">
                <div className="relative h-16 w-16 shrink-0 rounded-full p-[2px] shadow-[0_0_16px_rgba(255,255,255,0.2)]">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/70 via-slate-200/40 to-white/90" />
                  <img
                    src={omPhoto}
                    alt="Om Dipak Kanase"
                    className="relative h-full w-full rounded-full object-cover object-center"
                  />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0e1015] bg-slate-100 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl italic tracking-tight text-white [text-shadow:0_0_14px_rgba(255,255,255,0.4)] sm:text-3xl">
                    Om Dipak Kanase
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-300">
                    Programmer & Problem Solver
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    📍 Jalandhar, Punjab • Sophomore
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px w-full bg-white/10" />

              {/* Bio description */}
              <div className="space-y-3 text-sm leading-relaxed text-slate-300">
                <p>
                  Passionate for building cutting-edge software systems, bridging{' '}
                  <span className="font-medium text-white [text-shadow:0_0_8px_rgba(255,255,255,0.35)]">
                    Artificial Intelligence
                  </span>
                  ,{' '}
                  <span className="font-medium text-white [text-shadow:0_0_8px_rgba(255,255,255,0.35)]">
                    Web3 architectures
                  </span>
                  , and{' '}
                  <span className="font-medium text-white [text-shadow:0_0_8px_rgba(255,255,255,0.35)]">
                    Full-Stack Development
                  </span>
                  .
                </p>
                <p>
                  Honored as a{' '}
                  <span className="font-medium text-white [text-shadow:0_0_10px_rgba(255,255,255,0.5)]">
                    Reliance Foundation Scholar (2025)
                  </span>
                  , CBSE Science Merit recipient (100/100), and JEE Mains{' '}
                  <span className="font-medium text-white [text-shadow:0_0_8px_rgba(255,255,255,0.35)]">
                    97.29%ile
                  </span>{' '}
                  achiever.
                </p>
              </div>

              {/* Focus Tags */}
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                  Key Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'AI & Machine Learning',
                    'React 19 & Next.js',
                    'FastAPI & Flask',
                    'Solidity & Web3',
                    'Competitive Programming',
                    'Data Structures & Algorithms',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 transition-colors hover:border-white/25 hover:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-2.5 border-t border-white/10 pt-4">
                <a
                  href="mailto:projectcertificate01@gmail.com"
                  className="group relative flex flex-1 items-center justify-center rounded-full p-[1px] text-xs font-medium transition hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/70 via-slate-100 to-white/90 opacity-90 shadow-[0_0_14px_rgba(255,255,255,0.3)] transition-opacity group-hover:opacity-100" />
                  <span className="relative flex w-full items-center justify-center gap-1.5 rounded-full bg-[#0e1015] px-4 py-2.5 text-white transition group-hover:bg-surface">
                    <span>Contact Me</span>
                    <span>✉</span>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/om-kanase-397180372/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-slate-200 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/hcoona01"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-slate-200 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  GitHub ↗
                </a>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
