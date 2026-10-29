import { useEffect, useState } from 'react'
import {
  Search,
  Menu,
  X,
  Briefcase,
  FolderGit2,
  User,
  Layers,
  Mail,
} from 'lucide-react'
import { Icon } from '@iconify/react'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playHover } from '../utils/sound'

export type NavPage = 'home' | 'gear' | 'ask' | 'chat' | 'typing-test'

interface NavProps {
  onOpenSearch?: () => void
  currentPage?: NavPage
  onNavigate?: (page: NavPage, sectionId?: string) => void
}

export default function Nav({ onOpenSearch, currentPage = 'home', onNavigate }: NavProps) {
  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>(currentPage === 'home' ? 'experience' : currentPage)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Sync active section when currentPage changes
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage)
    }
  }, [currentPage])

  // Track window scroll for morphing pill
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    if (currentPage !== 'home') return

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
  }, [currentPage])

  // Core Section Links (Rendered as text links)
  const sectionLinks = [
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

  // Interactive Module Apps (Rendered as Iconify icon buttons with smooth tooltips)
  const appLinks = [
    {
      id: 'gear' as NavPage,
      label: language === 'fil' ? 'Gamit' : 'Gear',
      tooltip: language === 'fil' ? 'Gamit (Gear Setup)' : 'Gear Setup',
      href: '#gear',
      icon: 'solar:laptop-minimalistic-linear',
    },
    {
      id: 'ask' as NavPage,
      label: language === 'fil' ? 'Magtanong' : 'Ask Anything',
      tooltip: language === 'fil' ? 'Magtanong kay Chep (AI)' : 'Ask Anything (AI Assistant)',
      href: '#ask',
      icon: 'solar:magic-stick-3-linear',
    },
    {
      id: 'chat' as NavPage,
      label: language === 'fil' ? 'Kwentuhan' : 'Community Chat',
      tooltip: language === 'fil' ? 'Kwentuhan (Community Wall)' : 'Community Chat & Wall',
      href: '#chat',
      icon: 'solar:chat-round-dots-linear',
    },
    {
      id: 'typing-test' as NavPage,
      label: language === 'fil' ? 'Typing Test' : 'Typing Test',
      tooltip: language === 'fil' ? 'Pagsusulit sa Pag-type' : 'Developer Typing Test',
      href: '#typing-test',
      icon: 'solar:keyboard-linear',
    },
  ]

  const handleLinkClick = (id: string, href: string) => {
    playClick()
    setActiveSection(id)
    setMobileMenuOpen(false)

    if (id === 'gear' || id === 'ask' || id === 'chat' || id === 'typing-test') {
      onNavigate?.(id as NavPage)
      return
    }

    if (currentPage !== 'home') {
      onNavigate?.('home', id)
      return
    }

    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] border border-border/40 dark:border-white/10 bg-background/80 backdrop-blur-xl transition-all duration-300 ease-out ${
          isScrolled
            ? 'top-3.5 h-[52px] rounded-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl px-3 sm:px-4 shadow-lg'
            : 'top-6 h-16 rounded-3xl max-w-xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl px-4 sm:px-6 shadow-sm'
        }`}
      >
        <div className="flex h-full items-center justify-between gap-2 w-full min-w-0">
          {/* Left Side: Brand Logo + Nav Links */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href="#top"
              aria-label="Chep — Back to top"
              onClick={(e) => {
                e.preventDefault()
                playClick()
                if (currentPage !== 'home') {
                  onNavigate?.('home', 'top')
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
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
              className="hidden md:flex items-center gap-0.5 shrink-0"
              onMouseLeave={() => setHoveredSection(null)}
            >
              {sectionLinks.map((link) => {
                const isPillTarget = hoveredSection
                  ? hoveredSection === link.id
                  : currentPage === 'home' && activeSection === link.id

                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onMouseEnter={() => {
                      playHover()
                      setHoveredSection(link.id)
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.id, link.href)
                    }}
                    className={`relative rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                      isScrolled ? 'px-2 py-1 text-[11px]' : 'px-2.5 xl:px-3 py-1.5 text-xs'
                    } ${
                      isPillTarget
                        ? 'text-foreground font-semibold bg-zinc-200/80 dark:bg-white/15 shadow-xs'
                        : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                )
              })}

              {/* Vertical Divider separating Core Sections and Interactive App Modules */}
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5 shrink-0" />

              {/* Interactive Module Apps represented as Iconify Icons */}
              <div className="flex items-center gap-1 shrink-0">
                {appLinks.map((app) => {
                  const isActive = currentPage === app.id
                  const isHovered = hoveredSection === app.id

                  return (
                    <div key={app.id} className="relative group">
                      <a
                        href={app.href}
                        aria-label={app.tooltip}
                        onMouseEnter={() => {
                          playHover()
                          setHoveredSection(app.id)
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(app.id, app.href)
                        }}
                        className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
                          isScrolled ? 'size-7' : 'size-8'
                        } ${
                          isActive
                            ? 'text-foreground font-semibold bg-zinc-200/90 dark:bg-white/20 shadow-xs ring-1 ring-zinc-300 dark:ring-white/20'
                            : isHovered
                            ? 'text-foreground bg-zinc-100 dark:bg-zinc-800/70'
                            : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                        }`}
                      >
                        <Icon
                          icon={app.icon}
                          className={`size-4 shrink-0 transition-transform duration-150 ${
                            isHovered ? 'scale-110' : 'scale-100'
                          }`}
                        />
                      </a>

                      {/* Micro floating tooltip on hover */}
                      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-150 transform group-hover:translate-y-0 translate-y-1 z-50">
                        <div className="relative px-2 py-0.5 rounded-md text-[10px] font-mono tracking-tight whitespace-nowrap bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md">
                          {app.label}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-x-4 border-x-transparent border-b-4 border-b-zinc-900 dark:border-b-zinc-100" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Action Tools: Search, Language, Theme, Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search Ctrl+K"
              className={`relative flex h-8 sm:h-8.5 items-center justify-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-xs font-normal shadow-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground btn-inner-shadow active:scale-[0.98] shrink-0 ${
                isScrolled ? 'px-2' : 'px-2 sm:px-2.5'
              }`}
            >
              <Search size={13} className="shrink-0 text-muted-foreground" />
              {!isScrolled && (
                <>
                  <span className="text-muted-foreground hidden lg:inline-flex text-xs">Search</span>
                  <span className="text-[10px] font-mono text-muted-foreground hidden xl:inline-flex opacity-75">
                    Ctrl+K
                  </span>
                </>
              )}
            </button>

            {/* Language toggle: on tablet/desktop displayed directly in bar */}
            <div className="hidden sm:inline-flex shrink-0">
              <LanguageToggle />
            </div>

            <div className="shrink-0">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button (Hamburger / Close) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/60 text-foreground transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-800 btn-inner-shadow active:scale-95 shrink-0"
            >
              <div className={`transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Floating Dropdown Card */}
      <div
        className={`fixed inset-x-3 mx-auto z-50 max-w-sm rounded-2xl border border-border/50 dark:border-white/10 bg-background/95 dark:bg-zinc-950/95 p-2.5 shadow-2xl backdrop-blur-2xl transition-all duration-200 md:hidden overflow-hidden ${
          isScrolled ? 'top-[68px]' : 'top-[88px]'
        } ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        {/* Menu Links */}
        <div className="space-y-1">
          <div className="px-3 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">
            {language === 'fil' ? 'Mga Seksyon' : 'Sections'}
          </div>
          {sectionLinks.map((link) => {
            const IconComponent = link.icon
            const isActive = currentPage === 'home' && activeSection === link.id

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.id, link.href)
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent
                    size={15}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  <span>{link.label}</span>
                </div>
                {isActive && (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-normal">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    active
                  </span>
                )}
              </a>
            )
          })}

          <div className="pt-2 mt-1 border-t border-border/30 dark:border-white/5 px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">
            {language === 'fil' ? 'Mga Apps at Gamit' : 'Interactive Apps'}
          </div>
          {appLinks.map((app) => {
            const isActive = currentPage === app.id

            return (
              <a
                key={app.id}
                href={app.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(app.id, app.href)
                }}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800/90 text-foreground font-semibold shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    icon={app.icon}
                    className={`size-4 shrink-0 transition-colors ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  <span>{app.tooltip}</span>
                </div>
                {isActive && (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-normal">
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
            <span className="text-xs text-muted-foreground font-medium">
              {language === 'fil' ? 'Wika' : 'Language'}
            </span>
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
      </div>
    </>
  )
}