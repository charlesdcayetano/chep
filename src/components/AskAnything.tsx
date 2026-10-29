import { useState, useRef, useEffect } from 'react'
import {
  ArrowLeft,
  Send,
  Sparkles,
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
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playPop, playChime } from '../utils/sound'
import { profile } from '../data/profile'
import { currentJob } from '../data/currentJob'
import { projects } from '../data/projects'
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

export default function AskAnything({ onBackToHome }: AskAnythingProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const initialGreeting: Message = {
    id: 'msg-welcome',
    role: 'assistant',
    content: isFil
      ? `Kumusta! Ako ang portfolio assistant ni Charles (Chep). Pwede mo akong tanungin tungkol sa kanyang tech stack, cooperative systems (tulad ng LinkCoop at Hulamverde), kagamitan sa desk, edukasyon, o kung paano siya ma-hire!`
      : `Hello! I'm Charles (Chep)'s portfolio assistant. You can ask me anything about his technical stack, cooperative software engineering (like LinkCoop and Hulamverde), workspace gear, education, or how to contact and hire him!`,
    timestamp: 'Just now',
  }

  const [messages, setMessages] = useState<Message[]>([initialGreeting])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  const quickPrompts = [
    {
      label: isFil ? 'Tech Stack ni Chep' : "Chep's Tech Stack",
      query: isFil ? 'Ano-ano ang pangunahing tech stack at tools na gamit ni Chep?' : "What is Chep's primary tech stack and tools?",
      icon: <Code2 size={13} />,
    },
    {
      label: isFil ? 'LinkCoop & PVDCI Projects' : 'LinkCoop & PVDCI Projects',
      query: isFil ? 'Ikwento mo ang tungkol sa LinkCoop, Hulamverde, at trabaho niya sa PVDCI Coop.' : 'Tell me about LinkCoop, Hulamverde, and his work at PVDCI Coop.',
      icon: <Briefcase size={13} />,
    },
    {
      label: isFil ? 'Workstation & Gear' : 'Workstation & Gear',
      query: isFil ? 'Anong laptop, monitor, at desk setup ang gamit ni Chep?' : 'What laptop, monitor, and desk setup does Chep use?',
      icon: <Laptop size={13} />,
    },
    {
      label: isFil ? 'Paano Mag-Hire' : 'How to Hire Chep',
      query: isFil ? 'Bukas ba si Chep para sa trabaho o freelance projects? Paano siya kokontakin?' : 'Is Chep open for hire or freelance projects? How can I contact him?',
      icon: <Mail size={13} />,
    },
    {
      label: isFil ? 'Edukasyon & Pagsasanay' : 'Education & Training',
      query: isFil ? 'Saan nagtapos ng kolehiyo si Chep at anong training ang natapos niya?' : 'Where did Chep graduate and what certifications does he hold?',
      icon: <GraduationCap size={13} />,
    },
  ]

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Simple local intelligence engine generating natural responses from actual portfolio data
  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase()

    if (q.includes('stack') || q.includes('technology') || q.includes('teknolohiya') || q.includes('tools') || q.includes('language') || q.includes('framework')) {
      if (isFil) {
        return `Dalubhasa si Chep sa mga sumusunod:\n\n• **Backend & Core:** Laravel 11, PHP 8.2, MySQL, PostgreSQL, REST APIs, Redis, Inertia.js\n• **Frontend:** React, Next.js, Vue 3, TypeScript, JavaScript (ES6+), Tailwind CSS\n• **Tools & Systems:** Git, GitHub, Linux server administration, Postman, Mikrotik/Networking, at VS Code\n\nSanay siyang mag-develop ng scalable business platforms mula relational database design hanggang sa responsive frontends.`
      }
      return `Chep specializes in:\n\n• **Backend & Systems:** Laravel 11, PHP 8.2, MySQL, PostgreSQL, Redis, REST APIs, Inertia.js\n• **Frontend:** React, Next.js, Vue 3, TypeScript, Modern JavaScript, Tailwind CSS\n• **Tools & Infrastructure:** Git, GitHub, Linux environments, Postman, Mikrotik/ISP networks, and VS Code\n\nHe has deep hands-on experience structuring reliable relational schemas and high-throughput cooperative billing workflows.`
    }

    if (q.includes('linkcoop') || q.includes('hulamverde') || q.includes('pvdci') || q.includes('coop') || q.includes('trabaho') || q.includes('work') || q.includes('job') || q.includes('experience')) {
      if (isFil) {
        return `Si Charles ay kasalukuyang naglilingkod bilang **IT Assistant sa PVDCI Coop** sa Roxas City, Capiz:\n\n1. **LinkCoop (ISP & Billing Management):** Siya ang lead developer ng core platform na nagpapatakbo ng automated subscriber billing, collection tracking, at statement generation para sa libu-libong internet subscribers.\n2. **Hulamverde (Loan Management System):** Dinisenyo niya ang sistema para sa amortization computation, ledger auditing, at loan approvals.\n3. **PVDCI IP Tracker:** NOC system para sa live IP assignment at modem monitoring.\n4. **IT Operations:** Araw-araw na nangangalaga sa network infrastructure, hardware, at internal systems.`
      }
      return `Charles is currently an **IT Assistant at PVDCI Coop** in Roxas City, Capiz:\n\n1. **LinkCoop (ISP & Billing Management):** Lead engineer for the cooperative's core ISP platform, managing automated recurring billing, subscriber accounts, payment receipts, and collection tracking.\n2. **Hulamverde (Loan Management System):** Engineered loan amortization scheduling, ledger auditing, and member credit tracking.\n3. **PVDCI IP Tracker:** Network Operations Center (NOC) utility for modem and subscriber IP tracking.\n4. **IT Infrastructure:** Provides hardware servicing, local network maintenance, and day-to-day operations.`
    }

    if (q.includes('gear') || q.includes('gamit') || q.includes('laptop') || q.includes('setup') || q.includes('monitor') || q.includes('mouse') || q.includes('desk')) {
      if (isFil) {
        return `Narito ang pangunahing workstation setup ni Chep:\n\n• **Main Laptop:** ASUS TUF Gaming A15 (AMD Ryzen 7, RTX 40-Series, 144Hz FHD)\n• **Monitor:** Xiaomi Gaming Monitor G24i (23.8" Fast IPS, 180Hz, 1ms MPRT)\n• **Peripherals:** Attack Shark X11 Wireless Mouse (Magnetic RGB dock), Inplay KMT-4 Dual Desk Arm Mount, Vention Light Bar\n• **Ergonomics & Desk:** Icon Computer Desk (120cm), Ergonomic Mesh Chair, Petgear Foot Stool, at Foldable Phone Stand\n• **Audio:** Maono DM30 USB Mic, JBL GO 3, Orashare Wireless Headset, at Soundcore R601 Earbuds.\n\nPwede mong tingnan ang kumpletong listahan sa **Gear** page!`
      }
      return `Here is Chep's primary workspace setup:\n\n• **Main Computing:** ASUS TUF Gaming A15 (Ryzen 7, RTX 40-Series, 16GB DDR5)\n• **Display:** Xiaomi Gaming Monitor G24i (23.8" Fast IPS, 180Hz, 1ms)\n• **Peripherals:** Attack Shark X11 Tri-Mode Mouse, Inplay KMT-4 Dual Desk Arm, Vention Screen Light Bar\n• **Furniture & Ergo:** Icon 120cm Computer Desk, Breathable Cooling Gaming Chair, Petgear Footrest, and Foldable Desktop Phone Stand\n• **Audio:** Maono DM30 USB Mic, JBL GO 3, Orashare Wireless ANC Headset, and Soundcore R601 Earbuds.\n\nYou can explore all 19 verified items in the **Gear** section!`
    }

    if (q.includes('hire') || q.includes('contact') || q.includes('kontak') || q.includes('email') || q.includes('rate') || q.includes('freelance') || q.includes('trabaho')) {
      if (isFil) {
        return `Oo, **bukas si Chep para sa full-stack engineering roles at freelance software projects**!\n\n• **Email:** [${profile.email}](mailto:${profile.email})\n• **Lokasyon:** Roxas City, Capiz, Philippines (Available din para sa remote roles)\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano)\n• **LinkedIn:** [linkedin.com/in/charles-cayetano](https://linkedin.com/in/charles-cayetano)\n\nI-click lamang ang 'Contact' section o magpadala ng email para sa mabilisang tugon.`
      }
      return `Yes, **Chep is actively available for engineering opportunities and freelance software projects**!\n\n• **Direct Email:** [${profile.email}](mailto:${profile.email})\n• **Location:** Roxas City, Capiz, Philippines (Open to remote roles)\n• **GitHub:** [github.com/charlesdcayetano](https://github.com/charlesdcayetano)\n• **LinkedIn:** [linkedin.com/in/charles-cayetano](https://linkedin.com/in/charles-cayetano)\n\nFeel free to reach out via email or connect through LinkedIn!`
    }

    if (q.includes('education') || q.includes('edukasyon') || q.includes('school') || q.includes('aral') || q.includes('college') || q.includes('cert') || q.includes('degree')) {
      if (isFil) {
        return `Edukasyon at Pagsasanay ni Chep:\n\n• **Degree:** Bachelor of Science in Information Technology (BSIT)\n• **Paaralan:** Filamer Christian University (Class of 2024)\n• **Karagdagang Pagsasanay:** Computer Systems Servicing NC II, DICT Cybersecurity & Cloud Essentials, Responsive Web Design Certification\n\nNagsasama ang kanyang edukasyon ng hands-on hardware expertise at solid software engineering principles.`
      }
      return `Chep's Education & Credentials:\n\n• **Degree:** Bachelor of Science in Information Technology (BSIT)\n• **Institution:** Filamer Christian University (Class of 2024)\n• **Additional Credentials:** Computer Systems Servicing NC II, DICT Cybersecurity & Cloud Foundations, Responsive Web Design Certification\n\nHis technical background couples hardware & networking support with rigorous full-stack application development.`
    }

    if (q.includes('sino') || q.includes('who') || q.includes('about') || q.includes('chep') || q.includes('charles')) {
      if (isFil) {
        return `Si **Charles D. Cayetano** (@Chep) ay isang Full-Stack Web Developer mula sa Roxas City, Capiz. Gumagawa siya ng mga maaasahang web application at business management systems gamit ang Laravel, PHP, MySQL, React, at TypeScript. Kasalukuyan siyang IT Assistant sa PVDCI Coop kung saan pinangungunahan niya ang development ng internal billing at customer management software.`
      }
      return `**Charles D. Cayetano** (@Chep) is a Full-Stack Web Developer based in Roxas City, Capiz, Philippines. He creates production-ready web applications, automated billing systems, and cooperative digital workflows using Laravel, React, Next.js, and TypeScript. He is currently an IT Assistant at PVDCI Coop.`
    }

    // Default Fallback
    if (isFil) {
      return `Magandang tanong! Bilang developer, nakatuon si Chep sa praktikal na software, malinis na relational databases (MySQL/PostgreSQL), at modernong web frameworks tulad ng Laravel, React, at TypeScript. Maaari mo rin siyang direktang i-email sa **${profile.email}** o magtanong pa tungkol sa kanyang mga proyekto tulad ng LinkCoop at Hulamverde!`
    }
    return `Great question! Chep focuses on building robust software, clean relational architectures, and dependable web applications using Laravel, React, TypeScript, and modern tooling. You can also reach him directly at **${profile.email}** or explore his projects like LinkCoop and Hulamverde!`
  }

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || isTyping) return

    playClick()
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate smart thinking and answering delay
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
    }, 450)
  }

  const handleCopy = (id: string, text: string) => {
    playPop()
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const handleClear = () => {
    playPop()
    setMessages([initialGreeting])
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

          {messages.length > 1 && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 size={13} />
              <span>{isFil ? 'Linisin ang Usapan' : 'Clear Chat'}</span>
            </button>
          )}
        </div>

        {/* Hero Header */}
        <div className="mb-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
              {isFil ? 'AI Assistant // Tanungin si Chep' : "AI Assistant // Chep's Knowledge Base"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            ask anything
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            {isFil
              ? 'May mga tanong tungkol sa aking karanasan sa software, LinkCoop, tech stack, o availability? Magtanong ng kahit ano sa ibaba.'
              : 'Have questions about my software background, LinkCoop, tech stack, or engineering availability? Ask anything below.'}
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="mb-6 space-y-2">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {isFil ? 'Mga Mabilisang Tanong:' : 'Suggested Questions:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p.query)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-foreground transition-all active:scale-95 shadow-2xs"
              >
                {p.icon}
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Conversation Container */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 sm:p-6 shadow-xs min-h-[420px] flex flex-col justify-between space-y-6">
          {/* Messages Stream */}
          <div className="space-y-5 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant'
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAssistant && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs mt-0.5">
                      <Bot size={16} />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-foreground shadow-xs'
                        : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>

                    <div className="mt-2.5 flex items-center justify-between gap-3 text-[10px] text-zinc-600 dark:text-zinc-400">
                      <span>{m.timestamp}</span>
                      {isAssistant && (
                        <button
                          type="button"
                          onClick={() => handleCopy(m.id, m.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground inline-flex items-center gap-1"
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
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 text-foreground border border-zinc-300 dark:border-zinc-700 shadow-xs mt-0.5">
                      <User size={15} />
                    </div>
                  )}
                </div>
              )
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <Bot size={16} />
                </div>
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-xs flex items-center gap-1.5 shadow-xs">
                  <span className="flex size-1.5 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="flex size-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="flex size-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-2 text-zinc-500">{isFil ? 'Nagiisip...' : 'Thinking...'}</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Box Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="relative flex items-center gap-2 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isFil
                  ? 'Magtanong tungkol sa projects, tech stack, o career ni Chep...'
                  : 'Ask about projects, tech stack, or career...'
              }
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-foreground text-xs sm:text-sm placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send query"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background disabled:opacity-30 disabled:pointer-events-none hover:opacity-90 active:scale-95 transition-all shadow-xs"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

