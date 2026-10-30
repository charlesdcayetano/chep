import { useState, useMemo, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Laptop,
  Search,
  Monitor,
  Headphones,
  Armchair,
  Smartphone,
  LayoutGrid,
  List,
  Cpu,
  Terminal,
  X,
} from 'lucide-react'
import { Icon } from '@iconify/react'
import { gearList, devToolsList, gearCategories, type GearItem } from '../data/gear'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playHover, playPop } from '../utils/sound'

interface GearProps {
  onBackToHome: (targetSection?: string) => void
}

export default function Gear({ onBackToHome }: GearProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Press '/' to focus filter input quickly (developer UX touch)
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

  // Pre-compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: gearList.length }
    for (const item of gearList) {
      counts[item.category] = (counts[item.category] || 0) + 1
    }
    return counts
  }, [])

  // Filter items based on active category and optional search query
  const filteredItems = useMemo(() => {
    return gearList.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.specs.toLowerCase().includes(query) ||
        item.description[language].toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, language])

  // Group items by category for structured layout
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'All') {
      return filteredItems.length > 0
        ? [{ category: selectedCategory, items: filteredItems }]
        : []
    }

    const categories: Array<{ category: string; items: GearItem[] }> = []
    const categoryOrder = [
      'Desk Setup',
      'Audio & Acoustics',
      'Workspace & Ergonomics',
      'Everyday Carry',
    ]

    for (const cat of categoryOrder) {
      const items = filteredItems.filter((i) => i.category === cat)
      if (items.length > 0) {
        categories.push({ category: cat, items })
      }
    }

    return categories
  }, [selectedCategory, filteredItems])

  const categoryMeta: Record<
    string,
    { icon: React.ReactNode; labelFil: string; subtitleEn: string; subtitleFil: string }
  > = {
    'Desk Setup': {
      icon: <Monitor size={15} />,
      labelFil: 'Desk Setup',
      subtitleEn: 'Core computing, high-refresh display, 4K optics, mechanical keyboards & precision mice',
      subtitleFil: 'Pangunahing laptop, 180Hz monitor, 4K webcam, mechanical keyboards, at wireless mice',
    },
    'Audio & Acoustics': {
      icon: <Headphones size={15} />,
      labelFil: 'Audio & Acoustics',
      subtitleEn: 'Condenser studio mic, portable speakers, ANC headphones & wireless/wired monitors',
      subtitleFil: 'Studio USB condenser mic, portable speakers, ANC headset, at wireless/wired earbuds',
    },
    'Workspace & Ergonomics': {
      icon: <Armchair size={15} />,
      labelFil: 'Workspace & Ergonomics',
      subtitleEn: '120cm desk architecture, airflow mesh seating, posture support & desk organization',
      subtitleFil: '120cm workstation table, ergonomic mesh chair, footrest, at desk organizers',
    },
    'Everyday Carry': {
      icon: <Smartphone size={15} />,
      labelFil: 'Everyday Carry',
      subtitleEn: 'Daily mobile test device, 2FA security keys & on-call field companion',
      subtitleFil: 'Araw-araw na smartphone para sa mobile testing, 2FA security, at komunikasyon',
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
                ? `${gearList.length} Hardware · ${devToolsList.length} Dev Tools`
                : `${gearList.length} Verified Gear · ${devToolsList.length} Core Tools`}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8 space-y-3 max-w-3xl">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
            {isFil ? '/uses & workstation inventory' : '/uses & developer workstation'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            gear & tools
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {isFil
              ? 'Ang kumpletong hardware rig, peripherals, audio gear, at software tools na araw-araw kong ginagamit sa pag-code ng production systems — ibinabahagi para magbigay-inspirasyon sa kapwa developers.'
              : 'Every piece of hardware, peripheral, acoustic tool, and software environment powering my daily full-stack builds — documented openly for fellow developers and builders.'}
          </p>
        </div>

        {/* shadcn/ui Workstation Spec Highlights Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Main Machine' : 'Compute Rig'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Cpu size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              ASUS TUF Gaming A15
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              Ryzen 7 · RTX 40 · DDR5
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Display & Camera' : 'Display & Optics'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Monitor size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              Xiaomi G24i + EMEET 4K
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              23.8&quot; 180Hz IPS · Sony 4K
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Input & Boses' : 'Input & Voice'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Headphones size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              SK610 · X11 · Maono DM30
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              60% Tri-Mode · 63g · 24-bit
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                {isFil ? 'Core Dev Stack' : 'Core Environment'}
              </span>
              <span className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-foreground">
                <Terminal size={16} />
              </span>
            </div>
            <p className="text-[15px] sm:text-base font-bold text-foreground tracking-tight">
              Laravel 11 · React · TS
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              VS Code · MySQL · Tailscale
            </p>
          </div>
        </div>

        {/* Enlarged shadcn/ui Search & Category Filter Toolbar */}
        <div className="flex flex-col gap-3.5 mb-10 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          {/* Top Row: Spacious Search Input + Grid/List View Switcher */}
          <div className="flex items-center gap-2.5 w-full">
            <div className="relative flex-1">
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
                    ? 'Maghanap ng hardware, brand, o specs...'
                    : 'Search hardware, peripherals, or specs...'
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

            {/* shadcn Segmented View Switcher */}
            <div
              role="group"
              aria-label="View layout"
              className="inline-flex h-11 items-center gap-0.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-sm shrink-0"
            >
              <button
                type="button"
                onClick={() => {
                  playPop()
                  setViewMode('grid')
                }}
                aria-label="Gallery view"
                aria-pressed={viewMode === 'grid'}
                className={`inline-flex size-9 items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  playPop()
                  setViewMode('list')
                }}
                aria-label="Spec sheet view"
                aria-pressed={viewMode === 'list'}
                className={`inline-flex size-9 items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Row: Enlarged Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {gearCategories.map((cat) => {
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
                  <span>{cat === 'All' ? (isFil ? 'Lahat ng Gamit' : 'All Gear') : cat}</span>
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

        {/* Empty Filter State */}
        {groupedCategories.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 py-16 px-4 text-center space-y-3">
            <div className="mx-auto inline-flex size-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-muted-foreground">
              <Laptop size={18} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">
                {isFil ? 'Walang nahanap na gamit' : 'No matching hardware found'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isFil
                  ? 'Subukang maghanap ng ibang pangalan o i-reset ang filter.'
                  : 'Try another keyword or clear your active filter.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playPop()
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="inline-flex h-8 items-center px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isFil ? 'I-reset ang filter' : 'Reset filters'}
            </button>
          </div>
        )}

        {/* Grouped Hardware Sections */}
        <div className="space-y-16">
          {groupedCategories.map(({ category, items }) => {
            const meta = categoryMeta[category]
            return (
              <section key={category} className="space-y-5">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{meta?.icon}</span>
                      <h2 className="text-xs font-mono font-bold tracking-widest text-foreground uppercase">
                        {category}
                      </h2>
                      <span className="rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-0.2 text-[10px] font-mono text-muted-foreground">
                        {items.length}
                      </span>
                    </div>
                    {meta && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {isFil ? meta.subtitleFil : meta.subtitleEn}
                      </p>
                    )}
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  /* Studio Pedestal Gallery Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((gear) => (
                      <a
                        key={gear.id}
                        href={gear.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 overflow-hidden shadow-2xs hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200"
                      >
                        <div>
                          {/* Pure Studio White Pedestal Stage — eliminates rectangular JPEG borders in both themes */}
                          <div className="relative h-52 w-full flex items-center justify-center p-6 bg-white border-b border-zinc-100 dark:border-zinc-800/80 overflow-hidden">
                            {gear.badge && (
                              <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-md border border-zinc-200/90 bg-zinc-50/95 px-2 py-0.5 text-[10px] font-mono font-medium text-zinc-700 shadow-2xs">
                                {gear.badge}
                              </span>
                            )}

                            <span className="absolute top-3 right-3 z-10 inline-flex size-7 items-center justify-center rounded-md border border-zinc-200/80 bg-white/95 text-zinc-500 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-zinc-950 shadow-2xs">
                              <ArrowUpRight size={14} />
                            </span>

                            <img
                              src={gear.image}
                              alt={gear.name}
                              loading="lazy"
                              className="max-h-36 max-w-[82%] object-contain mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105"
                            />
                          </div>

                          {/* Card Body */}
                          <div className="p-4 sm:p-5 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug tracking-tight">
                                {gear.name}
                              </h3>
                              <ArrowUpRight
                                size={15}
                                className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5"
                              />
                            </div>

                            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {gear.specs}
                            </p>

                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pt-0.5">
                              {gear.description[language]}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="px-4 sm:px-5 py-3 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-between text-[11px] font-mono">
                          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                            <span
                              className="size-2 rounded-full ring-1 ring-zinc-300 dark:ring-zinc-700 shrink-0"
                              style={{ backgroundColor: gear.colorHex || '#18181b' }}
                            />
                            <span>{gear.color}</span>
                          </span>

                          <span className="text-zinc-700 dark:text-zinc-300 font-medium group-hover:underline underline-offset-4">
                            {isFil ? 'Produkto ↗' : 'Product ↗'}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  /* Compact Developer Spec-Sheet View */
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 divide-y divide-zinc-100 dark:divide-zinc-800/80 overflow-hidden shadow-2xs">
                    {items.map((gear) => (
                      <a
                        key={gear.id}
                        href={gear.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="group flex items-center gap-4 p-3.5 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                      >
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white border border-zinc-200/80 p-1.5 overflow-hidden">
                          <img
                            src={gear.image}
                            alt={gear.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {gear.name}
                            </h3>
                            {gear.badge && (
                              <span className="rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground">
                                {gear.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-mono text-muted-foreground truncate mt-0.5">
                            {gear.specs}
                          </p>
                        </div>

                        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground shrink-0">
                          <span
                            className="size-2 rounded-full ring-1 ring-zinc-300 dark:ring-zinc-700"
                            style={{ backgroundColor: gear.colorHex || '#18181b' }}
                          />
                          <span>{gear.color}</span>
                        </div>

                        <ArrowUpRight
                          size={15}
                          className="shrink-0 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>

        {/* Daily Software & Developer Toolchain Section */}
        <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-muted-foreground" />
              <h2 className="text-xs font-mono font-bold tracking-widest text-foreground uppercase">
                {isFil ? 'Daily Software & Dev Toolchain' : 'Daily Software & Dev Toolchain'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isFil
                ? 'Ang core software environment na nagpapatakbo sa bawat cooperative billing platform, REST API, at full-stack build.'
                : 'The core software stack and engineering tools running on top of this hardware for daily development and deployment.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {devToolsList.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 p-4 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col justify-between gap-3"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <Icon icon={tool.icon} className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground leading-tight">
                          {tool.name}
                        </h3>
                        <p className="text-[11px] font-mono text-muted-foreground">
                          {tool.role}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tool.description[language]}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
