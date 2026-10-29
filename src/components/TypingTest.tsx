import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Trophy,
  Keyboard,
  Timer,
  CheckCircle2,
  AlertCircle,
  Flame,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playPop, playKey, playSuccess } from '../utils/sound'

interface TypingTestProps {
  onBackToHome: (targetSection?: string) => void
}

const CODE_SNIPPETS = [
  `const [count, setCount] = useState<number>(0);`,
  `Route::get('/subscribers', [BillingController::class, 'index']);`,
  `SELECT id, name, balance FROM accounts WHERE status = 'active';`,
  `export async function getStaticProps() { return { props: {} }; }`,
  `interface UserProfile { id: string; email: string; role: Role; }`,
  `const handlePayment = async (data: InvoiceData): Promise<Receipt> => {};`,
]

const DEV_QUOTES = [
  `First, solve the problem. Then, write the code.`,
  `Simplicity is prerequisite for reliability.`,
  `Any fool can write code that a computer understands. Good programmers write code that humans understand.`,
  `Make it work, make it right, make it fast.`,
  `Clean code always looks like it was written by someone who cares.`,
]

export default function TypingTest({ onBackToHome }: TypingTestProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const [category, setCategory] = useState<'code' | 'quotes'>('code')
  const [duration, setDuration] = useState<number>(30)
  const [targetText, setTargetText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Reset or pick random sample
  const pickNewSample = (cat: 'code' | 'quotes') => {
    const pool = cat === 'code' ? CODE_SNIPPETS : DEV_QUOTES
    const random = pool[Math.floor(Math.random() * pool.length)]
    setTargetText(random)
    setUserInput('')
    setTimeLeft(duration)
    setIsActive(false)
    setIsFinished(false)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    pickNewSample(category)
  }, [category, duration])

  // Timer countdown
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsActive(false)
            setIsFinished(true)
            playSuccess()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, timeLeft])

  // Key typing handler with sound effect
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return
    const value = e.target.value

    if (!isActive && value.length === 1) {
      setIsActive(true)
    }

    // Play mechanical switch click
    playKey()
    setUserInput(value)

    if (value.length >= targetText.length) {
      setIsActive(false)
      setIsFinished(true)
      playSuccess()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  // Calculate live stats
  const correctChars = userInput.split('').filter((char, i) => char === targetText[i]).length
  const totalTyped = userInput.length
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100
  const timeElapsed = duration - timeLeft || 1
  const wpm = Math.round((correctChars / 5) / (timeElapsed / 60)) || 0

  // Rank badge
  const getRankBadge = (wpmScore: number) => {
    if (wpmScore >= 80) return isFil ? '⚡ Speed Demon / 10x Typist' : '⚡ Speed Demon / 10x Typist'
    if (wpmScore >= 60) return isFil ? '🚀 Senior Fast Coder' : '🚀 Senior Fast Coder'
    if (wpmScore >= 40) return isFil ? '🎯 Steady Software Builder' : '🎯 Steady Software Builder'
    return isFil ? '🌱 Coding Apprentice' : '🌱 Coding Apprentice'
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top Back Navigation Pill */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onBackToHome('top')}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-foreground dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>{isFil ? 'Bumalik sa Portfolio' : 'Back to Portfolio'}</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="mb-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
              {isFil ? 'Bilis Mag-Type // Developer Benchmark' : 'Typing Speed // Developer Benchmark'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            typing test
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            {isFil
              ? 'Subukan ang iyong bilis at accuracy sa pag-type gamit ang tunay na code snippets (TypeScript, React, SQL, Laravel) o quotes na may mechanical keyboard sound.'
              : 'Test your developer typing speed with real-world code snippets (TypeScript, React, SQL, Laravel) or dev quotes with tactile sound effects.'}
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md shadow-xs">
          {/* Mode Switch */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80">
            <button
              type="button"
              onClick={() => {
                playPop()
                setCategory('code')
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === 'code'
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'
              }`}
            >
              {isFil ? 'Code Snippets' : 'Code Snippets'}
            </button>
            <button
              type="button"
              onClick={() => {
                playPop()
                setCategory('quotes')
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === 'quotes'
                  ? 'bg-foreground text-background font-semibold shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-foreground'
              }`}
            >
              {isFil ? 'Dev Quotes' : 'Dev Quotes'}
            </button>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mr-1 flex items-center gap-1">
              <Timer size={13} />
              <span>{isFil ? 'Oras:' : 'Time:'}</span>
            </span>
            {[15, 30, 60].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => {
                  playPop()
                  setDuration(sec)
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  duration === sec
                    ? 'bg-foreground text-background font-semibold'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground'
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>

          {/* Reset / New Sample Button */}
          <button
            type="button"
            onClick={() => {
              playClick()
              pickNewSample(category)
              setTimeout(() => inputRef.current?.focus(), 50)
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-foreground hover:border-zinc-400 transition-all active:scale-95"
          >
            <RotateCcw size={13} />
            <span>{isFil ? 'Ulitin' : 'New Sample'}</span>
          </button>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 text-center shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
              WPM
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              {wpm}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 text-center shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
              {isFil ? 'Kawastuhan' : 'Accuracy'}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              {accuracy}%
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 text-center shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
              {isFil ? 'Natitirang Oras' : 'Time Left'}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {timeLeft}s
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-4 text-center shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
              {isFil ? 'Mga Letra' : 'Characters'}
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
              {correctChars}/{targetText.length}
            </div>
          </div>
        </div>

        {/* Interactive Typing Arena */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="relative rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-xs cursor-text min-h-[160px] flex flex-col justify-center select-none"
        >
          {/* Target Text with Character-by-Character Color Rendering */}
          <div className="font-mono text-base sm:text-lg sm:leading-loose tracking-wide leading-relaxed">
            {targetText.split('').map((char, index) => {
              let colorClass = 'text-zinc-600 dark:text-zinc-400'
              const isCurrent = index === userInput.length

              if (index < userInput.length) {
                if (userInput[index] === char) {
                  colorClass = 'text-emerald-600 dark:text-emerald-400 font-semibold'
                } else {
                  colorClass = 'text-rose-500 underline decoration-rose-500 font-bold bg-rose-500/10 rounded-xs'
                }
              }

              return (
                <span
                  key={index}
                  className={`relative ${colorClass} ${
                    isCurrent ? 'border-b-2 border-emerald-500 animate-pulse' : ''
                  }`}
                >
                  {char}
                </span>
              )
            })}
          </div>

          {/* Hidden Actual Input */}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            autoFocus
            className="absolute inset-0 opacity-0 cursor-text pointer-events-auto"
            aria-label="Typing test input"
          />

          {!isActive && !isFinished && (
            <div className="absolute bottom-3 right-4 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Keyboard size={13} />
              <span>{isFil ? 'Magsimulang mag-type para magsimula...' : 'Start typing to begin...'}</span>
            </div>
          )}
        </div>

        {/* Finished Result Modal / Callout */}
        {isFinished && (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 p-6 sm:p-8 shadow-sm text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Trophy size={28} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 mb-2">
                {getRankBadge(wpm)}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">
                {wpm} WPM • {accuracy}% {isFil ? 'Kawastuhan' : 'Accuracy'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {isFil
                  ? 'Napakagaling! Natapos mo ang developer typing speed test.'
                  : 'Great run! You completed the developer typing speed benchmark.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  playClick()
                  pickNewSample(category)
                  setTimeout(() => inputRef.current?.focus(), 50)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs"
              >
                <RotateCcw size={14} />
                <span>{isFil ? 'Subukan Muli' : 'Try Again'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

