import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Sparkles,
  Users,
  Heart,
  Flame,
  Rocket,
  ThumbsUp,
  Tag,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { playClick, playPop, playSuccess } from '../utils/sound'

interface ChatMessage {
  id: string
  name: string
  role: string
  avatar: string
  message: string
  date: string
  reactions: {
    heart: number
    fire: number
    rocket: number
    thumbs: number
  }
}

interface CommunityChatProps {
  onBackToHome: (targetSection?: string) => void
}

const STORAGE_KEY = 'site-community-chat-v2'

export default function CommunityChat({ onBackToHome }: CommunityChatProps) {
  const { language } = useLanguage()
  const isFil = language === 'fil'

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) return JSON.parse(saved)
      } catch {
        // Fallback to empty
      }
    }
    return []
  })

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍💻')
  const [userReacted, setUserReacted] = useState<Record<string, boolean>>({})

  const avatars = ['👨‍💻', '🚀', '⚡', '💻', '🎯', '👾', '☕', '🛠️']
  const quickRoles = [
    isFil ? 'Developer' : 'Developer',
    isFil ? 'Kasama sa Coop' : 'Coop Colleague',
    isFil ? 'Recruiter' : 'Tech Recruiter',
    isFil ? 'Bisita' : 'Visitor',
    isFil ? 'Estudyante' : 'Student',
  ]

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    playSuccess()

    const newMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || (isFil ? 'Bisita' : 'Visitor'),
      avatar: selectedAvatar,
      message: message.trim(),
      date: isFil ? 'Kani-kanina lang' : 'Just now',
      reactions: { heart: 1, fire: 1, rocket: 1, thumbs: 1 },
    }

    const updated = [newMsg, ...messages]
    setMessages(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Ignore
    }

    setMessage('')
  }

  const handleReaction = (msgId: string, type: 'heart' | 'fire' | 'rocket' | 'thumbs') => {
    const key = `${msgId}-${type}`
    if (userReacted[key]) return

    playPop()
    setUserReacted((prev) => ({ ...prev, [key]: true }))

    const updated = messages.map((m) => {
      if (m.id === msgId) {
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [type]: m.reactions[type] + 1,
          },
        }
      }
      return m
    })

    setMessages(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // Ignore
    }
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-36 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top Back Navigation Pill */}
        <div className="mb-8">
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
              {isFil ? 'Komunidad // Guestbook' : 'Developer Community & Guestbook'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-foreground lowercase">
            community chat
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            {isFil
              ? 'Mag-iwan ng mensahe, batiin si Chep, magbahagi ng feedback sa mga proyekto, o kumonekta sa kapwa mga developer at bisita.'
              : 'Leave a message, say hello, share feedback on the projects, or connect with fellow engineers and visitors.'}
          </p>
        </div>

        {/* Post Message Form Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/70 p-5 sm:p-6 shadow-xs mb-10 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageSquare size={16} className="text-emerald-500" />
              <span>{isFil ? 'Mag-iwan ng Mensahe sa Wall' : 'Leave a Note on the Board'}</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              {isFil ? 'Bukas para sa lahat' : 'Open to everyone'}
            </span>
          </div>

          <form onSubmit={handlePost} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                  {isFil ? 'Pangalan o Handle *' : 'Your Name or Handle *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isFil ? 'hal. Alex Santos (@alex)' : 'e.g. Alex Santos (@alex)'}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-foreground text-xs placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>

              {/* Role / Tag */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                  {isFil ? 'Tungkulin o Relasyon' : 'Role or Affiliation'}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder={isFil ? 'hal. Frontend Dev / Recruiter' : 'e.g. Frontend Dev / Visitor'}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-foreground text-xs placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all"
                />
              </div>
            </div>

            {/* Quick Role Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 mr-1">
                {isFil ? 'Piliin:' : 'Presets:'}
              </span>
              {quickRoles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    playPop()
                    setRole(r)
                  }}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-200/60 transition-all"
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Avatar Picker */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                {isFil ? 'Pumili ng Avatar Emoji' : 'Pick an Avatar Emoji'}
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {avatars.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => {
                      playPop()
                      setSelectedAvatar(av)
                    }}
                    className={`flex size-9 items-center justify-center rounded-xl text-base transition-all ${
                      selectedAvatar === av
                        ? 'bg-foreground text-background scale-110 shadow-xs ring-2 ring-foreground/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1">
                {isFil ? 'Mensahe *' : 'Message *'}
              </label>
              <textarea
                required
                rows={3}
                maxLength={300}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  isFil
                    ? 'Kamustahin si Chep, mag-iwan ng komento sa portfolio, o mag-share ng thoughts...'
                    : 'Say hi, drop a note on the portfolio, or share your thoughts...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-foreground text-xs sm:text-sm placeholder:text-zinc-600 dark:placeholder:text-zinc-400 focus:outline-hidden focus:ring-1 focus:ring-foreground transition-all resize-none"
              />
              <div className="flex justify-between items-center text-[10px] text-zinc-600 dark:text-zinc-400 mt-1">
                <span>{isFil ? 'Maging magalang at magiliw' : 'Be kind and constructive'}</span>
                <span>{message.length} / 300</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!name.trim() || !message.trim()}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs disabled:opacity-40 disabled:pointer-events-none"
              >
                <Send size={13} />
                <span>{isFil ? 'I-post ang Mensahe' : 'Post Message'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Messages List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Users size={14} />
              <span>
                {isFil ? `Mga Mensahe (${messages.length})` : `Community Wall (${messages.length})`}
              </span>
            </h3>
            <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              {isFil ? 'Live guestbook feed' : 'Live guestbook feed'}
            </span>
          </div>

          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  <MessageSquare size={22} />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-semibold text-foreground">
                    {isFil ? 'Wala pang mensahe sa wall' : 'No messages on the wall yet'}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isFil
                      ? 'Maging unang mag-iwan ng pagbati, tanong, o feedback para kay Chep gamit ang form sa itaas!'
                      : 'Be the first to say hello, leave feedback, or ask something for Chep using the form above!'}
                  </p>
                </div>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {isFil ? 'Bukas ang board para sa iyong mensahe' : 'Ready for your first note'}
                  </span>
                </div>
              </div>
            ) : (
              messages.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-4 sm:p-5 shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-lg shadow-2xs">
                      {m.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground text-xs sm:text-sm">
                          {m.name}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60">
                          {m.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">
                        {m.date}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-1 sm:pl-11 mb-3">
                  {m.message}
                </p>

                {/* Reaction Pill Buttons */}
                <div className="flex items-center gap-1.5 pl-1 sm:pl-11">
                  <button
                    type="button"
                    onClick={() => handleReaction(m.id, 'fire')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all active:scale-95 ${
                      userReacted[`${m.id}-fire`]
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-500 hover:text-foreground'
                    }`}
                  >
                    <span>🔥</span>
                    <span className="font-mono text-[10px]">{m.reactions.fire}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReaction(m.id, 'rocket')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all active:scale-95 ${
                      userReacted[`${m.id}-rocket`]
                        ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-500 hover:text-foreground'
                    }`}
                  >
                    <span>🚀</span>
                    <span className="font-mono text-[10px]">{m.reactions.rocket}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReaction(m.id, 'heart')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all active:scale-95 ${
                      userReacted[`${m.id}-heart`]
                        ? 'border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-500 hover:text-foreground'
                    }`}
                  >
                    <span>❤️</span>
                    <span className="font-mono text-[10px]">{m.reactions.heart}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReaction(m.id, 'thumbs')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border transition-all active:scale-95 ${
                      userReacted[`${m.id}-thumbs`]
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-500 hover:text-foreground'
                    }`}
                  >
                    <span>👏</span>
                    <span className="font-mono text-[10px]">{m.reactions.thumbs}</span>
                  </button>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  )
}


