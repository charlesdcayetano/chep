import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Laptop,
  Search,
  Sparkles,
  Tag,
  Monitor,
  Headphones,
  Armchair,
  Smartphone,
} from 'lucide-react'
import { gearList, gearCategories, type GearItem } from '../data/gear'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playHover } from '../utils/sound'

interface GearProps {
  onBackToHome: (targetSection?: string) => void
}

export default function Gear({ onBackToHome }: GearProps) {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

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
        item.color.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, language])

  // Group items by category for structured layout
  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'All') {
      return [{ category: selectedCategory, items: filteredItems }]
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

  const categoryIcons: Record<string, React.ReactNode> = {
    'Desk Setup': <Monitor size={14} />,
    'Audio & Acoustics': <Headphones size={14} />,
    'Workspace & Ergonomics': <Armchair size={14} />,
    'Everyday Carry': <Smartphone size={14} />,
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Back Navigation Pill */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => onBackToHome('top')}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-foreground dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            <span>
              {language === 'fil'
                ? 'Bumalik sa Portfolio'
                : 'Back to Portfolio'}
            </span>
          </button>
        </div>

        {/* Page Hero Header - Matching user's reference mockup */}
        <div className="mb-12 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
              {language === 'fil' ? 'Aking Setup & Hardware' : 'Workspace & Arsenal'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            gear
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            {language === 'fil'
              ? 'Ang hardware, peripherals, at tools na gamit ko sa pag-code, pag-build ng systems, at pagpapanatili ng produktibidad — aking desk setup, everyday carry, at audio equipment.'
              : 'The hardware and tools I use to build, create, and stay productive — my desk setup, everyday carry, and the kit I code and game with.'}
          </p>
        </div>

        {/* Filter Bar & Search Tool */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {gearCategories.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-foreground text-background font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  {cat !== 'All' && categoryIcons[cat]}
                  <span>
                    {cat === 'All'
                      ? language === 'fil'
                        ? `Lahat (${gearList.length})`
                        : `All Gear (${gearList.length})`
                      : cat}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'fil' ? 'Maghanap ng gamit...' : 'Filter gear...'
              }
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-foreground placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Empty Search State */}
        {groupedCategories.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
              <Laptop size={24} />
            </div>
            <p className="text-sm font-medium text-foreground">
              {language === 'fil'
                ? 'Walang nahanap na gamit sa search na ito.'
                : 'No equipment matches your search query.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {language === 'fil' ? 'I-reset ang filter' : 'Reset filter'}
            </button>
          </div>
        )}

        {/* Grouped Category Sections */}
        <div className="space-y-14">
          {groupedCategories.map(({ category, items }) => (
            <section key={category} className="space-y-6">
              {/* Category Subheading - Matching DESK SETUP styling in screenshot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
                    {category}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              {/* Products Cards Grid - 3 Columns on desktop matching the reference screenshot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((gear) => (
                  <a
                    key={gear.id}
                    href={gear.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    title={`${gear.name} — ${language === 'fil' ? 'Buksan ang produkto' : 'View official product'}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-5 shadow-xs hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div>
                      {/* Product Image Stage */}
                      <div className="relative h-48 sm:h-52 w-full flex items-center justify-center p-4 bg-zinc-50/80 dark:bg-zinc-950/40 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800/50 mb-4 transition-colors group-hover:bg-zinc-100/70 dark:group-hover:bg-zinc-950/70">
                        {gear.badge && (
                          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium tracking-tight bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 shadow-2xs backdrop-blur-xs">
                            {gear.badge}
                          </span>
                        )}

                        <img
                          src={gear.image}
                          alt={gear.name}
                          loading="lazy"
                          className="max-h-36 sm:max-h-40 max-w-[85%] object-contain transition-transform duration-300 ease-out group-hover:scale-105 drop-shadow-sm"
                        />
                      </div>

                      {/* Header Title & Arrow Icon */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display font-semibold text-foreground text-base tracking-tight group-hover:text-foreground">
                          {gear.name}
                        </h3>
                        <div className="p-1 rounded-md text-zinc-400 group-hover:text-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>

                      {/* Quick Specification summary - exact font/layout of user's screenshot */}
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans line-clamp-1">
                        {gear.specs}
                      </p>

                      {/* Description / Personal Use Context */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-300/90 mt-2.5 leading-relaxed line-clamp-2">
                        {gear.description[language]}
                      </p>
                    </div>

                    {/* Bottom Metadata & Product Link hint */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                        <Tag size={11} className="text-zinc-400" />
                        <span>{gear.color}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 group-hover:underline">
                        <span>
                          {language === 'fil' ? 'Tingnan' : 'View Product'}
                        </span>
                        <ExternalLink size={10} />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Return Banner */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            <Sparkles size={14} className="text-emerald-500" />
            <span>
              {language === 'fil'
                ? 'Lahat ng gamit ay aktibong ginagamit sa daily engineering setup.'
                : 'All listed hardware actively powers my daily dev & engineering setup.'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onBackToHome('top')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-foreground hover:underline"
          >
            <ArrowLeft size={13} />
            <span>
              {language === 'fil' ? 'Bumalik sa Home' : 'Return to Portfolio'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

