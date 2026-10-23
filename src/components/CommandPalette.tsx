import { useEffect, useState, useRef } from 'react'
import {
  Search,
  FolderGit2,
  Briefcase,
  Sun,
  Moon,
  Mail,
  Copy,
  Check,
  Languages,
  Code2,
} from 'lucide-react'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { currentJob } from '../data/currentJob'
import { profile } from '../data/profile'
import { getStoredTheme, setTheme } from '../utils/theme'
import { useLanguage } from '../i18n/LanguageContext'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Navigation' | 'Projects' | 'Experience' | 'Actions'
  icon: React.ReactNode
  onSelect: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopiedEmail(true)
    setTimeout(() => {
      setCopiedEmail(false)
      onClose()
    }, 1200)
  }

  const toggleTheme = () => {
    const current = getStoredTheme()
    const next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
    onClose()
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fil' : 'en')
    onClose()
  }

  const scrollToSection = (id: string) => {
    onClose()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Define commands list
  const allItems: CommandItem[] = [
    // Navigation
    {
      id: 'nav-exp',
      title: 'Experience & Career',
      subtitle: 'View professional timeline & roles',
      category: 'Navigation',
      icon: <Briefcase size={16} />,
      onSelect: () => scrollToSection('experience'),
    },
    {
      id: 'nav-proj',
      title: 'Projects & Systems',
      subtitle: 'Browse 8 production platforms & SaaS tools',
      category: 'Navigation',
      icon: <FolderGit2 size={16} />,
      onSelect: () => scrollToSection('projects'),
    },
    {
      id: 'nav-skills',
      title: 'Technical Stack',
      subtitle: 'Frontend, Backend, Databases, and Tools',
      category: 'Navigation',
      icon: <Code2 size={16} />,
      onSelect: () => scrollToSection('skills'),
    },
    {
      id: 'nav-contact',
      title: 'Get In Touch',
      subtitle: 'Send message, email, or connect',
      category: 'Navigation',
      icon: <Mail size={16} />,
      onSelect: () => scrollToSection('contact'),
    },

    // Actions
    {
      id: 'act-email',
      title: copiedEmail ? 'Email Copied!' : `Copy Email: ${profile.email}`,
      subtitle: 'Copy address to clipboard',
      category: 'Actions',
      icon: copiedEmail ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />,
      onSelect: copyEmail,
    },
    {
      id: 'act-theme',
      title: 'Toggle Theme',
      subtitle: 'Switch between light and dark mode',
      category: 'Actions',
      icon: document.documentElement.classList.contains('dark') ? <Sun size={16} /> : <Moon size={16} />,
      onSelect: toggleTheme,
    },
    {
      id: 'act-lang',
      title: `Switch Language (${language === 'en' ? 'Filipino' : 'English'})`,
      subtitle: language === 'en' ? 'Lumipat sa Filipino' : 'Switch to English',
      category: 'Actions',
      icon: <Languages size={16} />,
      onSelect: toggleLanguage,
    },

    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.name}`,
      title: p.name,
      subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(', ')}`,
      category: 'Projects' as const,
      icon: <FolderGit2 size={16} />,
      onSelect: () => {
        if (p.live) window.open(p.live, '_blank')
        else if (p.repo) window.open(p.repo, '_blank')
        else scrollToSection('projects')
        onClose()
      },
    })),

    // Experience
    {
      id: 'exp-current',
      title: `${typeof currentJob.role === 'string' ? currentJob.role : currentJob.role.en} @ ${currentJob.org}`,
      subtitle: 'Lead developer for LinkCoop, Hulamverde & IP Tracker systems',
      category: 'Experience',
      icon: <Briefcase size={16} />,
      onSelect: () => scrollToSection('experience'),
    },
    ...experience.map((exp, idx) => ({
      id: `exp-${idx}`,
      title: `${exp.role} @ ${exp.org}`,
      subtitle: exp.period,
      category: 'Experience' as const,
      icon: <Briefcase size={16} />,
      onSelect: () => scrollToSection('experience'),
    })),
  ]

  // Filter items
  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden text-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3.5">
          <Search size={18} className="text-zinc-400 shrink-0" />
          <label htmlFor="command-search-input" className="sr-only">
            Search portfolio
          </label>
          <input
            id="command-search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, experience, skills, or links..."
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-zinc-400 font-sans text-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-400">
              No matching items found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`shrink-0 p-1.5 rounded-lg border ${
                        isSelected
                          ? 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-foreground'
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate text-foreground">{item.title}</p>
                      {item.subtitle && (
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    {item.category}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-4 py-2.5 bg-zinc-50/50 dark:bg-zinc-950/40 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>esc to close</span>
          </div>
          <span className="font-mono">Charles Cayetano</span>
        </div>
      </div>
    </div>
  )
}
