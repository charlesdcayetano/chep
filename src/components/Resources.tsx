import { useState, useMemo, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  Globe,
  GitBranch,
  Terminal,
  Cloud,
  Palette,
  BookOpen,
  Layers,
  Sparkles,
  GraduationCap,
  X,
} from 'lucide-react'
import { Icon } from '@iconify/react'
import {
  resourcesList,
  resourceCategories,
  builtSystemsInventory,
  skillMatrixSummary,
  trainingAndOrgHighlights,
  type ResourceCategory,
  type ResourceItem,
} from '../data/resources'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playHover, playPop } from '../utils/sound'

interface ResourcesProps {
  onBackToHome: (targetSection?: string) => void
}

export default function Resources({ onBackToHome }: ResourcesProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const [selectedCategory, setSelectedCategory] = useState<'All' | ResourceCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Press '/' to focus filter input quickly
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: resourcesList.length }
    for (const item of resourcesList) {
      counts[item.category] = (counts[item.category] || 0) + 1
    }
    return counts
  }, [])

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return resourcesList.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        item.handleOrDomain.toLowerCase().includes(q) ||
        item.description[language].toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [selectedCategory, searchQuery, language])

  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'All') {
      return filteredItems.length > 0
        ? [{ category: selectedCategory, items: filteredItems }]
        : []
    }

    const order: ResourceCategory[] = [
      'Profiles & Domains',
      'GitHub Repos',
      'Dev Stack & Tools',
      'Cloud & Hosting',
      'Design & UI',
      'Learning & Docs',
    ]

    const groups: Array<{ category: ResourceCategory; items: ResourceItem[] }> = []
    for (const cat of order) {
      const items = filteredItems.filter((i) => i.category === cat)
      if (items.length > 0) {
        groups.push({ category: cat, items })
      }
    }
    return groups
  }, [selectedCategory, filteredItems])

  const categoryMeta: Record<
    ResourceCategory,
    {
      icon: React.ReactNode
      labelFil: string
      subtitleEn: string
      subtitleFil: string
    }
  > = {
    'Profiles & Domains': {
      icon: <Globe size={15} />,
      labelFil: 'Profiles & Domains',
      subtitleEn: 'Official developer profiles, custom domains, and social handles',
      subtitleFil: 'Mga opisyal na developer profiles, custom domains, at social links',
    },
    'GitHub Repos': {
      icon: <GitBranch size={15} />,
      labelFil: 'GitHub Repos',
      subtitleEn: 'Public source repositories and open full-stack implementations',
      subtitleFil: 'Mga public GitHub repositories at source code ng mga proyekto',
    },
    'Dev Stack & Tools': {
      icon: <Terminal size={15} />,
      labelFil: 'Dev Stack & Tools',
      subtitleEn: 'Core frameworks, code editor setup, local servers, and mesh networking',
      subtitleFil: 'Pangunahing frameworks, VS Code setup, local servers, at mesh VPN',
    },
    'Cloud & Hosting': {
      icon: <Cloud size={15} />,
      labelFil: 'Cloud & Hosting',
      subtitleEn: 'Deployment platforms, DNS providers, and managed relational databases',
      subtitleFil: 'Mga cloud deployment platforms, domain registrar, at databases',
    },
    'Design & UI': {
      icon: <Palette size={15} />,
      labelFil: 'Design & UI',
      subtitleEn: 'UI/UX wireframing, graphic assets, and browser-based PSD editing',
      subtitleFil: 'Mga gamit sa UI/UX prototyping, graphic design, at asset optimization',
    },
    'Learning & Docs': {
      icon: <BookOpen size={15} />,
      labelFil: 'Learning & Docs',
      subtitleEn: 'Online compilers, cloud sandboxes, and official framework references',
      subtitleFil: 'Mga online compilers, cloud sandboxes, at opisyal na dokumentasyon',
    },
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Navigation Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playClick()
              onBackToHome('top')
            }}
            onMouseEnter={playHover}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background dark:bg-zinc-900/70 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-2xs transition-all active:scale-95"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>{isFil ? 'Bumalik sa Portfolio' : 'Back to Portfolio'}</span>
          </button>

          <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isFil
                ? `${resourcesList.length} Resources · ${builtSystemsInventory.length} Proyekto`
                : `${resourcesList.length} Curated Links · ${builtSystemsInventory.length} Systems Built`}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8 space-y-3 max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            {isFil ? '/resources & developer inventory' : '/resources & developer directory'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            resources & directory
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {isFil
              ? 'Kumpletong listahan ng aking online profiles, GitHub repositories, development stack, cloud services, design tools, learning platforms, at lahat ng sistemang binuo ko.'
              : 'My complete developer inventory — profiles, public repositories, local & cloud environments, design tools, documentation bookmarks, and software systems index.'}
          </p>
        </div>

        {/* Summary Bento Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Core Stack' : 'Core Stack'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Terminal size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              Laravel 11/12 · React · Vue 3
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              PHP 8 · Inertia · Tailwind · Vite
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Cloud & Deploy' : 'Cloud & Deploy'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Cloud size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              Vercel · Supabase · Render
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Namecheap · GitHub Pages
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Local & Design' : 'Local & Design'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Palette size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              VS Code · Laragon · Figma
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              XAMPP · Canva · Photopea
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Systems Index' : 'Systems Index'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Layers size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              15 Software Projects
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              4 Public Repos · BSIT 2025
            </p>
          </div>
        </div>

        {/* Enlarged shadcn/ui Search & Category Filter Toolbar */}
        <div className="flex flex-col gap-3.5 mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* Top Row: Spacious Full-Width Search Input */}
          <div className="relative w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isFil
                  ? 'Maghanap ng resource, repository, tool, o domain...'
                  : 'Search profiles, GitHub repos, dev tools, cloud hosts, or docs...'
              }
              className="h-11 w-full pl-10 pr-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/15 dark:focus:ring-zinc-100/20 focus:border-zinc-400 dark:focus:border-zinc-600 transition-all"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear filter"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={15} />
              </button>
            ) : (
              <kbd className="pointer-events-none hidden sm:inline-flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 h-6 min-w-[24px] rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 text-xs font-mono text-muted-foreground">
                /
              </kbd>
            )}
          </div>

          {/* Bottom Row: Enlarged Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {resourceCategories.map((cat) => {
              const isSelected = selectedCategory === cat
              const count = categoryCounts[cat] ?? 0
              return (
                <button
                  key={cat}
                  type="button"
                  onMouseEnter={playHover}
                  onClick={() => {
                    playPop()
                    setSelectedCategory(cat)
                  }}
                  className={`inline-flex h-10 items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 text-zinc-600 dark:text-zinc-300 hover:text-foreground hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm'
                  }`}
                >
                  {cat !== 'All' && categoryMeta[cat]?.icon}
                  <span>{cat === 'All' ? (isFil ? 'Lahat ng Resources' : 'All Resources') : cat}</span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-mono font-semibold ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-black/15 dark:text-zinc-900'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Categorized Resource Cards */}
        {groupedCategories.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-medium text-foreground">
              {isFil ? 'Walang nahanap na resource' : 'No matching resources found'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isFil
                ? 'Subukan ang ibang keyword o i-reset ang category filter.'
                : 'Try searching another tool name or reset the category filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 inline-flex items-center px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium"
            >
              {isFil ? 'I-reset ang Filter' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {groupedCategories.map(({ category, items }) => {
              const meta = categoryMeta[category]
              return (
                <section key={category} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{meta.icon}</span>
                        <h2 className="text-base sm:text-lg font-bold tracking-tight font-display text-foreground">
                          {isFil ? meta.labelFil : category}
                        </h2>
                        <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                          {items.length}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {isFil ? meta.subtitleFil : meta.subtitleEn}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {items.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        className="group flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                                <Icon icon={item.icon} className="size-5 text-foreground" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-zinc-900 dark:group-hover:text-white">
                                    {item.name}
                                  </h3>
                                </div>
                                <p className="text-[11px] font-mono text-muted-foreground truncate">
                                  {item.handleOrDomain}
                                </p>
                              </div>
                            </div>
                            <ArrowUpRight
                              size={14}
                              className="shrink-0 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                            />
                          </div>

                          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                            {item.description[language]}
                          </p>
                        </div>

                        <div className="mt-3.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                          <span className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-800">
                            {item.tag}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-foreground transition-colors">
                            {isFil ? 'Buksan' : 'Open'}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* Complete Software Projects & Systems Archive */}
        <section className="mt-16 pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                &gt;_ {isFil ? 'PROJECT & SYSTEM ARCHIVE' : 'SOFTWARE SYSTEMS ARCHIVE'}
              </p>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight font-display text-foreground mt-1">
                {isFil
                  ? 'Lahat ng Software Projects na Binuo at Dinevelop'
                  : 'Complete Software Development Projects Index'}
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {builtSystemsInventory.length} {isFil ? 'Sistema' : 'Systems'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {builtSystemsInventory.map((sys) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-semibold text-foreground truncate">
                        {sys.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                        {sys.roleOrType[language]}
                      </p>
                    </div>
                    {sys.repoUrl ? (
                      <span className="inline-flex items-center gap-1 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-1.5 py-0.5 text-[10px] font-mono shrink-0">
                        Repo
                        <ArrowUpRight size={10} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground border border-zinc-200/70 dark:border-zinc-800 shrink-0">
                        System
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-[10.5px] font-mono text-zinc-500 dark:text-zinc-400">
                    {sys.stack}
                  </p>
                </>
              )

              return sys.repoUrl ? (
                <a
                  key={sys.name}
                  href={sys.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 p-3.5 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={sys.name}
                  className="rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 p-3.5"
                >
                  {inner}
                </div>
              )
            })}
          </div>
        </section>

        {/* Technical Skill Matrix & Institutional Experience */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Languages, Frameworks & Active Learning */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-muted-foreground" />
              <h3 className="text-sm font-bold tracking-tight font-display text-foreground">
                {isFil
                  ? 'Mga Lenggwahe, Frameworks at Pinag-aaralan'
                  : 'Languages, Frameworks & Active Learning'}
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  {isFil ? 'Programming Languages' : 'Programming Languages'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillMatrixSummary.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-foreground"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                  {isFil ? 'Frameworks, Libraries & Data' : 'Frameworks, Libraries & Backend'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[...skillMatrixSummary.frameworks, ...skillMatrixSummary.backendAndData].map(
                    (fw) => (
                      <span
                        key={fw}
                        className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300"
                      >
                        {fw}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  {isFil ? 'Kasalukuyang Pinag-aaralan' : 'Currently Exploring & Deepening'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillMatrixSummary.currentlyLearning.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education, OJT & Institutional Background */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={15} className="text-muted-foreground" />
              <h3 className="text-sm font-bold tracking-tight font-display text-foreground">
                {isFil
                  ? 'Edukasyon, OJT Residency at Karanasan'
                  : 'Education, Residency & Field Experience'}
              </h3>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {trainingAndOrgHighlights.map((entry) => (
                <div key={entry.org} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">{entry.org}</p>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {entry.detail[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

