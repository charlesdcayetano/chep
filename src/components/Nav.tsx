import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  Search,
  Menu,
  X,
  Briefcase,
  FolderGit2,
  User,
  Layers,
  Mail,
  Globe,
} from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'

interface NavProps {
  onOpenSearch?: () => void
}

export default function Nav({ onOpenSearch }: NavProps) {
  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState('experience')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()
  const smoothY = useSpring(scrollY, { stiffness: 90, damping: 24, mass: 0.6 })

  // Kroszborg scroll responsive transforms: wide at top (1024px), shrinking down (640px)
  const maxWidthDesktop = useTransform(smoothY, [0, 280], [1024, 640])
  const maxWidthMobile = useTransform(smoothY, [0, 280], [560, 480])
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

  // Floating dropdown menu dynamically tracks 8px beneath the navbar
  const dropdownTop = useTransform(smoothY, [0, 280], [24 + 64 + 8, 14 + 52 + 8])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => {
      setIsDesktop(mq.matches)
      if (mq.matches) {
        setMobileMenuOpen(false)
      }
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close mobile menu on page scroll
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleScroll = () => {
      setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

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
    {
      id: 'experience',
      label: language === 'fil' ? 'Karanasan' : 'Work',
      href: '#experience',
      icon: Briefcase,
    },
    {
      id: 'projects',
      label: language === 'fil' ? 'Proyekto' : 'Projects',
      href: '#projects',
      icon: FolderGit2,
    },
    {
      id: 'about',
      label: language === 'fil' ? 'Tungkol' : 'About',
      href: '#about',
      icon: User,
    },
    {
      id: 'skills',
      label: language === 'fil' ? 'Stack' : 'Stack',
      href: '#skills',
      icon: Layers,
    },
    {
      id: 'contact',
      label: language === 'fil' ? 'Kontak' : 'Contact',
      href: '#contact',
      icon: Mail,
    },
  ]

  const handleLinkClick = (id: string, href: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
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
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group flex shrink-0 items-center gap-1.5 sm:gap-2 transition-opacity hover:opacity-80 active:scale-95"
            >
              <img
                src="/images/Portfolio.webp"
                alt={`${profile.name} avatar`}
                width={24}
                height={24}
                className="size-6 sm:size-7 rounded-full object-cover ring-1 ring-border/60 transition-opacity group-hover:opacity-75"
              />
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground hidden min-[360px]:inline-block">
                {profile.handle || 'Chep'}
              </span>
            </a>

            {/* Desktop Section Navigation Links with Smooth Hover & Active Sliding Pill */}
            <div
              className="hidden md:flex items-center gap-0.5"
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

          {/* Right Action Tools: Search, Language, Theme, Mobile Menu */}
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

            {/* Language toggle: on tablet/desktop displayed directly in bar */}
            <div className="hidden sm:inline-flex">
              <LanguageToggle />
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button (Hamburger / Close) */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.92 }}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 btn-inner-shadow"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={15} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={15} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Backdrop & Floating Glassmorphic Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
              aria-hidden="true"
            />

            {/* Floating Dropdown Card */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                top: dropdownTop,
              }}
              className="fixed inset-x-3 mx-auto z-50 max-w-sm rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 dark:bg-zinc-950/95 p-2.5 shadow-2xl backdrop-blur-2xl md:hidden overflow-hidden"
            >
              {/* Menu Links */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = activeSection === link.id

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleLinkClick(link.id, link.href)
                      }}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-zinc-100 dark:bg-zinc-800/90 text-foreground font-semibold shadow-xs'
                          : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={16}
                          className={`shrink-0 transition-colors ${
                            isActive
                              ? 'text-foreground'
                              : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        />
                        <span>{link.label}</span>
                      </div>
                      {isActive && (
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-normal">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          active
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>

              {/* Quick Actions & Language Toggle */}
              <div className="mt-2 pt-2 border-t border-border/40 dark:border-white/10 space-y-2">
                {/* Language row for mobile view */}
                <div className="flex items-center justify-between px-3 py-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Globe size={14} className="shrink-0" />
                    <span>{language === 'fil' ? 'Wika' : 'Language'}</span>
                  </div>
                  <LanguageToggle />
                </div>

                {/* Quick Search Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenSearch?.()
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors btn-inner-shadow"
                >
                  <div className="flex items-center gap-2">
                    <Search size={13} />
                    <span>{language === 'fil' ? 'Maghanap sa portfolio...' : 'Search portfolio...'}</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 border border-border/60 dark:border-white/10 rounded px-1 py-0.5">
                    Ctrl+K
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}