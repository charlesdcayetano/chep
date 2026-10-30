import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Code2,
  Briefcase,
  Laptop,
  Mail,
  GraduationCap,
  CornerDownLeft,
  ShieldAlert,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playPop, playChime, playHover } from '../utils/sound'
import { containsProfanity } from '../utils/profanityFilter'
import { profile } from '../data/profile'
import { gearList } from '../data/gear'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface AskAnythingProps {
  onBackToHome: (targetSection?: string) => void
}

function renderFormattedText(text: string) {
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(tokenRegex)

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith('mailto:') ? undefined : '_blank'}
          rel={linkMatch[2].startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="font-medium underline underline-offset-4 decoration-zinc-400 hover:decoration-foreground transition-colors"
        >
          {linkMatch[1]}
        </a>
      )
    }
    return <span key={idx}>{part}</span>
  })
}

export default function AskAnything({ onBackToHome }: AskAnythingProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const getInitialGreeting = (fil: boolean): Message => ({
    id: 'msg-welcome',
    role: 'assistant',
    content: fil
      ? `Kumusta! Ako ang portfolio assistant ni **Charles (Chep)**. Pwede mo akong tanungin tungkol sa kanyang tech stack, cooperative systems (tulad ng **LinkCoop** at **Hulamverde**), buong workstation gear (${gearList.length} items), edukasyon, o kung paano siya ma-hire.`
      : `Hello! I'm **Charles (Chep)'s** portfolio assistant. Ask me anything about his technical stack, cooperative software systems (**LinkCoop** & **Hulamverde**), workstation gear (${gearList.length} verified items), education, or how to hire him.`,
    timestamp: fil ? 'Ngayon' : 'Ready',
  })

  const [messages, setMessages] = useState<Message[]>(() => [getInitialGreeting(isFil)])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [profanityBlocked, setProfanityBlocked] = useState(false)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isInitialMount = useRef(true)

  // Keep welcome message synced with language if no conversation has started yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'msg-welcome') {
        return [getInitialGreeting(isFil)]
      }
      return prev
    })
  }, [isFil])

  // Scroll ONLY the internal chat box — never scroll the outer window/page
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  const quickPrompts = [
    {
      label: isFil ? 'Tech Stack' : 'Tech Stack',
      query: isFil
        ? 'Ano-ano ang pangunahing tech stack at tools na gamit ni Chep?'
        : "What is Chep's primary tech stack and daily tools?",
      icon: <Code2 size={13} />,
    },
    {
      label: isFil ? 'LinkCoop & PVDCI' : 'LinkCoop & PVDCI',
      query: isFil
        ? 'Ikwento mo ang tungkol sa LinkCoop, Hulamverde, at trabaho niya sa PVDCI Coop.'
        : 'Tell me about LinkCoop, Hulamverde, and his work at PVDCI Coop.',
      icon: <Briefcase size={13} />,
    },
    {
      label: isFil ? 'Workstation & Gear' : 'Workstation & Gear',
      query: isFil
        ? 'Anong laptop, monitor, keyboard, at desk setup ang gamit ni Chep?'
        : 'What laptop, monitor, keyboard, and desk gear does Chep use?',
      icon: <Laptop size={13} />,
    },
    {
      label: isFil ? 'Paano Mag-Hire' : 'How to Hire',
      query: isFil
        ? 'Bukas ba si Chep para sa trabaho o freelance projects? Paano siya kokontakin?'
        : 'Is Chep open for hire or freelance projects? How can I contact him?',
      icon: <Mail size={13} />,
    },
    {
      label: isFil ? 'Edukasyon & Certs' : 'Education & Certs',
      query: isFil
        ? 'Saan nagtapos ng kolehiyo si Chep at anong certifications ang meron siya?'
        : 'Where did Chep graduate and what certifications does he hold?',
      icon: <GraduationCap size={13} />,
    },
  ]

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase()

    if (
      q.includes('resource') ||
      q.includes('profile') ||
      q.includes('repo') ||
      q.includes('github') ||
      q.includes('domain')
    ) {
      if (isFil) {
        return `Narito ang pangunahing online profiles at repositories ni Chep:\n\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano) (kabilang ang **cheapresume**, **csas**, **portfolio**, at **chep**)\n• **Primary Domain:** [chep.website](https://chep.website)\n• **LinkedIn:** [linkedin.com/in/charlesdcayetano](https://linkedin.com/in/charlesdcayetano)\n• **Figma:** [figma.com/@charlesdcayetano](https://www.figma.com/@charlesdcayetano)\n\nMaaari mo ring buksan ang **Resources** icon sa navigation bar para sa kumpletong listahan ng lahat ng tools at 15 software systems niya!`
      }
      return `Here are Chep's core developer profiles & public repositories:\n\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano) (featuring **cheapresume**, **csas**, **portfolio**, and **chep**)\n• **Primary Domain:** [chep.website](https://chep.website)\n• **LinkedIn:** [linkedin.com/in/charlesdcayetano](https://linkedin.com/in/charlesdcayetano)\n• **Figma:** [figma.com/@charlesdcayetano](https://www.figma.com/@charlesdcayetano)\n\nClick the **Resources** icon in the top navigation bar to explore his full directory of tools, cloud platforms, and 15 built systems!`
    }

    if (
      q.includes('stack') ||
      q.includes('technology') ||
      q.includes('teknolohiya') ||
      q.includes('tools') ||
      q.includes('language') ||
      q.includes('framework') ||
      q.includes('tailscale') ||
      q.includes('zerotier')
    ) {
      if (isFil) {
        return `Dalubhasa si Chep sa mga sumusunod:\n\n• **Backend & Core:** Laravel 11/12, PHP 8.2, MySQL, PostgreSQL, Supabase, REST APIs, Inertia.js\n• **Frontend:** React, Next.js, Vue 3, TypeScript, Tailwind CSS, Bootstrap 5, Vite\n• **Tools, Cloud & Networking:** VS Code, Laragon & XAMPP, Tailscale & ZeroTier UI, Vercel, Render, Git/GitHub, Figma, Canva, at Photopea\n\nSanay siyang mag-build ng production business platforms mula relational database modeling hanggang sa malinis na UI.`
      }
      return `Chep specializes in:\n\n• **Backend & Systems:** Laravel 11/12, PHP 8.2, MySQL, PostgreSQL, Supabase, REST APIs, Inertia.js\n• **Frontend:** React, Next.js, Vue 3, TypeScript, Tailwind CSS, Bootstrap 5, Vite\n• **Tools, Cloud & Networking:** VS Code, Laragon & XAMPP, Tailscale & ZeroTier UI, Vercel, Render, Git/GitHub, Figma, Canva, and Photopea\n\nHe builds reliable relational schemas, automated financial billing workflows, and responsive interfaces.`
    }

    if (
      q.includes('linkcoop') ||
      q.includes('hulamverde') ||
      q.includes('pvdci') ||
      q.includes('coop') ||
      q.includes('work') ||
      q.includes('job') ||
      q.includes('experience')
    ) {
      if (isFil) {
        return `Si Charles ay kasalukuyang **IT Assistant sa PVDCI Coop** sa Roxas City, Capiz:\n\n1. **LinkCoop (ISP & Billing Management):** Lead developer ng core platform para sa automated subscriber billing, collection tracking, at statement generation.\n2. **Hulamverde (Loan Management System):** Sistema para sa loan amortization schedules, interest computation, at ledger auditing.\n3. **PVDCI IP Tracker:** NOC utility para sa live subscriber IP assignment at modem monitoring.\n4. **IT Operations:** Araw-araw na nangangalaga sa hardware, network infrastructure, at internal systems.`
      }
      return `Charles serves as an **IT Assistant at PVDCI Coop** in Roxas City, Capiz:\n\n1. **LinkCoop (ISP & Billing Management):** Lead developer for the cooperative's core ISP platform handling automated recurring billing, collections, and subscriber ledgers.\n2. **Hulamverde (Loan Management System):** Engineered loan amortization scheduling, interest computation, and audit-ready member credit records.\n3. **PVDCI IP Tracker:** Network Operations Center (NOC) system for subscriber IP and modem tracking.\n4. **IT Infrastructure:** Maintains enterprise hardware, networking, and day-to-day technical operations.`
    }

    if (
      q.includes('gear') ||
      q.includes('gamit') ||
      q.includes('laptop') ||
      q.includes('setup') ||
      q.includes('monitor') ||
      q.includes('mouse') ||
      q.includes('keyboard') ||
      q.includes('earbuds') ||
      q.includes('speaker') ||
      q.includes('headset') ||
      q.includes('webcam') ||
      q.includes('camera') ||
      q.includes('desk')
    ) {
      if (isFil) {
        return `Narito ang workstation arsenal ni Chep (${gearList.length} verified hardware items):\n\n• **Main Rig:** ASUS TUF Gaming A15 (AMD Ryzen 7, RTX 40-Series, 16GB DDR5)\n• **Display & Camera:** Xiaomi Gaming Monitor G24i (23.8" 180Hz IPS), EMEET C960 4K UHD Webcam, Vention Light Bar\n• **Keyboards & Mice:** Inplay SK610 60% Wireless Mechanical Keyboard, Raiku RGB Keyboard & Mouse Combo, Attack Shark X11 Wireless Mouse\n• **Audio:** Maono DM30 USB Mic, JBL GO 3, Xiaomi 16W Portable Speaker, Orashare ANC Headphones, Soundcore A30i / A20i / R601, at Popcorn X8 Pro IEMs\n• **Workspace:** ICON 120cm Desk, Breathable Mesh Chair, Inplay KMT-4 Dual Arm, Footrest, Headphone Stand, Phone Stand, at Cup Holder.`
      }
      return `Here is Chep's workstation arsenal (${gearList.length} verified hardware items):\n\n• **Main Rig:** ASUS TUF Gaming A15 (Ryzen 7, RTX 40-Series, 16GB DDR5)\n• **Display & Optics:** Xiaomi Gaming Monitor G24i (23.8" 180Hz Fast IPS), EMEET C960 4K UHD Webcam, Vention Screen Light Bar\n• **Keyboards & Mice:** Inplay SK610 60% Wireless Mechanical Keyboard, Raiku RGB Keyboard & Mouse Combo, Attack Shark X11 Mouse\n• **Audio Chain:** Maono DM30 USB Mic, JBL GO 3, Xiaomi 16W Portable Speaker, Orashare ANC Headphones, Soundcore A30i / A20i / R601, and Popcorn X8 Pro IEMs\n• **Ergonomics:** ICON 120cm Workstation Desk, Breathable Mesh Chair, Inplay KMT-4 Dual Arm, Footrest, Headphone Stand, Phone Dock, and Cup Holder.`
    }

    if (
      q.includes('hire') ||
      q.includes('contact') ||
      q.includes('kontak') ||
      q.includes('email') ||
      q.includes('rate') ||
      q.includes('freelance') ||
      q.includes('trabaho')
    ) {
      if (isFil) {
        return `Oo, **bukas si Chep para sa full-stack engineering roles at freelance software projects**!\n\n• **Email:** [${profile.email}](mailto:${profile.email})\n• **Lokasyon:** Roxas City, Capiz, Philippines (Open sa remote work)\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano)\n• **LinkedIn:** [linkedin.com/in/charlesdcayetano](https://linkedin.com/in/charlesdcayetano)`
      }
      return `Yes, **Chep is open to full-stack engineering opportunities and freelance software projects**!\n\n• **Direct Email:** [${profile.email}](mailto:${profile.email})\n• **Location:** Roxas City, Capiz, Philippines (Open to remote roles)\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano)\n• **LinkedIn:** [linkedin.com/in/charlesdcayetano](https://linkedin.com/in/charlesdcayetano)`
    }

    if (
      q.includes('education') ||
      q.includes('edukasyon') ||
      q.includes('school') ||
      q.includes('aral') ||
      q.includes('college') ||
      q.includes('cert') ||
      q.includes('degree')
    ) {
      if (isFil) {
        return `Edukasyon at Kredensyal ni Chep (14 Verified Credentials):\n\n• **Degree:** BS Information Technology (BSIT) — Filamer Christian University (2025)\n• **Eligibility:** DICT ICT Proficiency Diagnostic Exam Passer\n• **Software & Web:** Python Level III (486-Hour Residency — DBTC) at Three-Day Vue.js Bootcamp\n• **Cybersecurity & Systems:** Microsoft Security/Compliance/Identity, OPSWAT Critical Infrastructure Protection, SOC Essentials (Splunk & Threat Hunting), at TESDA Computer Systems Servicing NC II.`
      }
      return `Chep's Education & Credentials (14 Verified Credentials):\n\n• **Degree:** BS Information Technology (BSIT) — Filamer Christian University (2025)\n• **Eligibility:** DICT ICT Proficiency Diagnostic Exam Passer\n• **Software & Web:** Python Level III (486-Hour Residency — DBTC) & Three-Day Vue.js Bootcamp\n• **Cybersecurity & Systems:** Microsoft Security/Compliance/Identity, OPSWAT Critical Infrastructure Protection, SOC Essentials (Splunk & Threat Hunting), and TESDA Computer Systems Servicing NC II.`
    }

    if (q.includes('sino') || q.includes('who') || q.includes('about') || q.includes('chep') || q.includes('charles')) {
      if (isFil) {
        return `Si **Charles D. Cayetano** (@Chep) ay isang Full-Stack Developer mula sa Roxas City, Capiz. Gumagawa siya ng maaasahang production web apps at automated billing platforms gamit ang Laravel, React, Next.js, TypeScript, at MySQL/PostgreSQL.`
      }
      return `**Charles D. Cayetano** (@Chep) is a Full-Stack Developer based in Roxas City, Capiz, Philippines. He builds production-ready web platforms, automated billing engines, and cooperative digital systems using Laravel, React, Next.js, TypeScript, and MySQL/PostgreSQL.`
    }

    if (isFil) {
      return `Magandang tanong! Nakatuon si Chep sa malinis na full-stack architecture gamit ang **Laravel, React, TypeScript, at MySQL/PostgreSQL**. Maaari mo siyang i-email sa [${profile.email}](mailto:${profile.email}) o pumili sa mga suggested topics sa itaas!`
    }
    return `Great question! Chep focuses on clean full-stack architecture with **Laravel, React, TypeScript, and MySQL/PostgreSQL**. Feel free to reach him directly at [${profile.email}](mailto:${profile.email}) or pick one of the topic chips above!`
  }

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isTyping) return

    if (containsProfanity(query)) {
      playPop()
      setProfanityBlocked(true)
      return
    }

    setProfanityBlocked(false)
    playClick()
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) {
      setInput('')
    }
    setIsTyping(true)

    setTimeout(() => {
      const answer = generateAnswer(query)
      const botMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
      playChime()
    }, 380)
  }

  const handleCopy = (id: string, text: string) => {
    playPop()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const handleClear = () => {
    playPop()
    setMessages([getInitialGreeting(isFil)])
  }

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
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

          <span className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {isFil ? 'Instant Local AI' : 'Instant Portfolio AI'}
          </span>
        </div>

        {/* Compact Header so entire workspace fits cleanly in viewport */}
        <div className="mb-6 space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-display text-foreground lowercase">
            ask anything
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isFil
              ? 'Magtanong tungkol sa aking karanasan, LinkCoop, tech stack, workstation gear, o availability — nananatili sa pwesto ang chat box habang nag-uusap.'
              : 'Ask about my engineering experience, LinkCoop, tech stack, workstation gear, or availability — answers stream right inside this panel without jumping the page.'}
          </p>
        </div>

        {/* shadcn/ui Card Container */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-foreground shadow-2xs">
                <Bot size={14} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none">
                  {isFil ? 'Chep Knowledge Assistant' : 'Chep Knowledge Assistant'}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {isFil ? 'Sinasagot mula sa beripikadong portfolio data' : 'Grounded in verified portfolio & gear data'}
                </p>
              </div>
            </div>

            {messages.length > 1 && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
              >
                <Trash2 size={12} />
                <span>{isFil ? 'I-reset' : 'Reset'}</span>
              </button>
            )}
          </div>

          {/* Prompt Bar */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-zinc-100 dark:border-zinc-800/70 bg-zinc-50/30 dark:bg-zinc-900/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0 mr-1">
              {isFil ? 'Tanong:' : 'Topics:'}
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onMouseEnter={playHover}
                onClick={(e) => {
                  e.preventDefault()
                  handleSend(p.query)
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-foreground whitespace-nowrap transition-colors active:scale-[0.98] shrink-0"
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          {/* Fixed-Height Internal Scroll Area — keeps the page stationary */}
          <div
            ref={messagesContainerRef}
            className="h-[360px] sm:h-[400px] overflow-y-auto overscroll-contain px-4 sm:px-5 py-5 space-y-4 scroll-smooth"
          >
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant'
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-foreground mt-0.5">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-[86%] sm:max-w-[78%] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      isAssistant
                        ? 'border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300'
                        : 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-medium shadow-2xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{renderFormattedText(m.content)}</div>

                    <div
                      className={`mt-2 flex items-center justify-between gap-3 text-[10px] font-mono ${
                        isAssistant
                          ? 'text-muted-foreground'
                          : 'text-zinc-400 dark:text-zinc-600'
                      }`}
                    >
                      <span>{m.timestamp}</span>
                      {isAssistant && (
                        <button
                          type="button"
                          onClick={() => handleCopy(m.id, m.content)}
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:text-foreground inline-flex items-center gap-1"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check size={11} className="text-emerald-500" />
                              <span className="text-emerald-500">{isFil ? 'Nakopya' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>{isFil ? 'Kopyahin' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 mt-0.5">
                      <User size={13} />
                    </div>
                  )}
                </div>
              )
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-foreground">
                  <Bot size={14} />
                </div>
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/80 px-3.5 py-2.5 text-xs flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* Card Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
              inputRef.current?.focus({ preventScroll: true })
            }}
            className="p-3 sm:p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2.5"
          >
            {profanityBlocked && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-400"
              >
                <ShieldAlert size={14} className="shrink-0" />
                <span>
                  {isFil
                    ? 'Na-block ang mensahe: Bawal ang masasamang salita o mura sa anumang lenggwahe.'
                    : 'Message blocked: Profanity and offensive words in any language are not allowed.'}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  if (profanityBlocked) setProfanityBlocked(false)
                }}
                placeholder={
                  isFil
                    ? 'Magtanong tungkol sa projects, tech stack, gear, o career ni Chep...'
                    : 'Ask about projects, tech stack, gear setup, or availability...'
                }
                className="flex-1 h-10 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-300 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="inline-flex h-10 px-3.5 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 text-xs font-medium disabled:opacity-40 disabled:pointer-events-none hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
              >
                <span className="hidden sm:inline">{isFil ? 'Ipadala' : 'Ask'}</span>
                <CornerDownLeft size={13} className="hidden sm:inline opacity-70" />
                <Send size={14} className="sm:hidden" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
