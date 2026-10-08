import { useState } from 'react'
import { BadgeCheck, Code, Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { Mascot } from 'page-mascot'
import { profile } from '../data/profile'
import { currentJob } from '../data/currentJob'
import { translations } from '../i18n/translations'
import { useUi } from '../i18n/useUi'

const MASCOTS = [
  { id: 'fox', name: 'Fox', emoji: '🦊' },
  { id: 'skater', name: 'Skater', emoji: '🛹' },
  { id: 'otter', name: 'Otter', emoji: '🦦' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'builder', name: 'Builder', emoji: '👷' },
] as const

type MascotId = (typeof MASCOTS)[number]['id']

/** Strips the scheme and "www." so a URL reads like plain text ("github.com/x"). */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

function Fact({ icon: Icon, children }: { icon: IconType | typeof Code; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon size={15} className="mt-0.5 shrink-0 text-[#171717] dark:text-[#F5F5F5]" aria-hidden="true" />
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </div>
  )
}

function ContactChip({
  icon: Icon,
  href,
  children,
}: {
  icon: IconType | typeof Code
  href: string
  children: React.ReactNode
}) {
  const isMail = href.startsWith('mailto:')
  return (
    <a
      href={href}
      {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="chip"
    >
      <Icon size={15} className="shrink-0" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </a>
  )
}

export default function ProfileHeader() {
  const { language, ui, t } = useUi()
  const copy = translations[language]

  const [mascotId, setMascotId] = useState<MascotId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cdc-mascot') as MascotId
      if (saved && MASCOTS.some((m) => m.id === saved)) return saved
    }
    return 'fox'
  })

  const currentMascot = MASCOTS.find((m) => m.id === mascotId) ?? MASCOTS[0]

  const handleNextMascot = () => {
    const currentIndex = MASCOTS.findIndex((m) => m.id === mascotId)
    const nextIndex = (currentIndex + 1) % MASCOTS.length
    const next = MASCOTS[nextIndex].id
    setMascotId(next)
    try {
      localStorage.setItem('cdc-mascot', next)
    } catch {
      // ignore storage errors
    }
  }

  return (
    <header id="top" className="scroll-mt-20 pb-8 pt-10 sm:pb-10 sm:pt-14">
      <div className="rise flex items-center gap-4 sm:gap-6" style={{ ['--d' as string]: '0ms' }}>
        <div className="group relative shrink-0">
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border rule surface shadow-sm transition-all sm:h-28 sm:w-28">
            <Mascot
              directions={`/mascots/${currentMascot.id}-directions.webp`}
              reactions={`/mascots/${currentMascot.id}-reactions.webp`}
              size={88}
              className="sm:!w-[112px] sm:!h-[112px]"
              label={`${currentMascot.name} mascot for ${profile.name}`}
            />
          </div>
          <button
            type="button"
            onClick={handleNextMascot}
            title={`Current mascot: ${currentMascot.name}. Click to switch character.`}
            aria-label={`Current mascot: ${currentMascot.name}. Click to switch character.`}
            className="surface absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border rule text-xs shadow-sm transition-transform hover:scale-115 active:scale-95"
          >
            <span role="img" aria-hidden="true">
              {currentMascot.emoji}
            </span>
          </button>
        </div>
        <div className="min-w-0">
          <h1 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          {profile.handle && <p className="t-accent mt-1.5 text-sm font-medium">@{profile.handle}</p>}
        </div>
      </div>

      <p
        className="rise mt-6 max-w-content text-lg leading-snug sm:text-xl"
        style={{ ['--d' as string]: '90ms' }}
      >
        {ui.tagline}
      </p>

      <div
        className="rise surface mt-4 inline-flex max-w-full items-center gap-3 rounded-xl border rule px-3.5 py-2.5 text-sm"
        style={{ ['--d' as string]: '170ms' }}
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
          <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span className="min-w-0 [overflow-wrap:anywhere]">
          <span className="t-faint">{ui.currently} </span>
          <span className="font-medium">
            {t(currentJob.role)} @{currentJob.org}
          </span>
        </span>
      </div>

      <div className="rise mt-6 flex flex-col gap-2.5" style={{ ['--d' as string]: '250ms' }}>
        <Fact icon={Code}>
          <span className="font-semibold">{profile.title}</span>
        </Fact>
        {profile.availability ? <Fact icon={BadgeCheck}>{copy.availability}</Fact> : null}
        <Fact icon={MapPin}>{profile.location}</Fact>
      </div>

      <div
        className="rise mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2"
        style={{ ['--d' as string]: '330ms' }}
      >
        <ContactChip icon={Mail} href={`mailto:${profile.email}`}>
          {profile.email}
        </ContactChip>
        <ContactChip icon={FaLinkedin} href={profile.linkedin}>
          {displayUrl(profile.linkedin)}
        </ContactChip>
        <ContactChip icon={FaGithub} href={profile.github}>
          {displayUrl(profile.github)}
        </ContactChip>
        <ContactChip icon={FaFacebook} href={profile.facebook}>
          {displayUrl(profile.facebook)}
        </ContactChip>
        <ContactChip icon={FaXTwitter} href={profile.x}>
          {displayUrl(profile.x)}
        </ContactChip>
      </div>
    </header>
  )
}