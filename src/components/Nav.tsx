import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Search } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'

interface NavProps {
  onOpenSearch?: () => void
}

export default function Nav({ onOpenSearch }: NavProps) {
  const [activeSection, setActiveSection] = useState('experience')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollY } = useScroll()
  const smoothY = useSpring(scrollY, { stiffness: 90, damping: 24, mass: 0.6 })

  // Kroszborg scroll responsive transforms: wide at top (1024px/560px), shrinking down (640px/380px)
  const maxWidthDesktop = useTransform(smoothY, [0, 280], [1024, 640])
  const maxWidthMobile = useTransform(smoothY, [0, 280], [560, 380])
  const navHeight = useTransform(smoothY, [0, 280], [64, 52])
  const navTop = useTransform(smoothY, [0, 280], [24, 14])
  const navPaddingX = useTransform(smoothY, [0, 280], [24, 14])
  const navRadius = useTransform(smoothY, [0, 280], [24, 9999])
  const navShadow = useTransform(
    smoothY,
    [0, 280],
    [
      '0 10px 30px -10px rgba(0, 0, 0, 0.25)',
      '0 4px 16px -6px rgba(0, 0, 0, 0.35)',
    ]
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Smooth 60fps passive scroll observer using RAF
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Track active section for indicator
          const sections = ['experience', 'projects', 'about', 'skills', 'contact']
          const scrollPos = window.scrollY + 200

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId)
            if (el) {
              const top = el.offsetTop
              const height = el.offsetHeight
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(sectionId)
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'experience', label: 'Work', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Stack', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      aria-label="Main Navigation"
      style={{
        maxWidth: isDesktop ? maxWidthDesktop : maxWidthMobile,
        paddingLeft: navPaddingX,
        paddingRight: navPaddingX,
        height: navHeight,
        top: navTop,
        borderRadius: navRadius,
        boxShadow: navShadow,
      }}
      className="fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] border border-border/40 dark:border-white/10 bg-background/80 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex h-full items-center justify-between gap-2 w-full">
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <a
            href="#top"
            aria-label="Back to top"
            className="group flex shrink-0 items-center gap-1.5 sm:gap-2 transition-opacity hover:opacity-80 active:scale-95"
          >
            <img
              src="/images/Portfolio.webp"
              alt={`${profile.name} avatar`}
              width={24}
              height={24}
              className="size-6 sm:size-7 rounded-full object-cover ring-1 ring-border/60 transition-opacity group-hover:opacity-75"
            />
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground hidden sm:inline-block">
              {profile.handle || 'Chep'}
            </span>
          </a>

          {/* Section Navigation Links with Smooth Hover & Active Sliding Pill */}
          <div
            className="flex items-center gap-0.5"
            onMouseLeave={() => setHoveredSection(null)}
          >
            {navLinks.map((link) => {
              const isPillTarget = hoveredSection
                ? hoveredSection === link.id
                : activeSection === link.id

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredSection(link.id)}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative px-2 sm:px-2.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-colors duration-150 ${
                    isPillTarget
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isPillTarget && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-zinc-200/80 dark:bg-white/15 -z-0 shadow-sm"
                    />
                  )}
                </a>
              )
            })}
          </div>
        </div>

        {/* Right Action Tools: Search, Language, Theme */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search portfolio"
            className="relative flex h-8 sm:h-8.5 items-center justify-start gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 px-2 sm:px-2.5 text-xs font-normal shadow-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground btn-inner-shadow active:scale-[0.98]"
          >
            <Search size={13} className="shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground hidden sm:inline-flex text-xs">Search</span>
            <span className="text-[10px] font-mono text-muted-foreground hidden md:inline-flex opacity-75">
              Ctrl+K
            </span>
          </button>

          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  )
}