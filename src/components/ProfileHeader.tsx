import { useState } from 'react'
import { BadgeCheck, Code, Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { profile } from '../data/profile'
import { currentJob } from '../data/currentJob'
import { translations } from '../i18n/translations'
import { useUi } from '../i18n/useUi'

// The original file stays as the fallback. `npm run optimize:images` creates the
// smaller copies listed here so phones download ~5-15 KB instead of the full file.
const AVATAR = '/images/Portfolioo.webp'
const AVATAR_WIDTHS = [120, 240, 360]
const AVATAR_SRCSET = AVATAR_WIDTHS.map((w) => `/images/Portfolioo-${w}.webp ${w}w`).join(', ')

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
  // If the resized copies have not been generated yet, fall back to the single file.
  const [useSrcSet, setUseSrcSet] = useState(true)

  return (
    <header id="top" className="scroll-mt-20 pb-8 pt-10 sm:pb-10 sm:pt-14">
      <div className="rise flex items-center gap-4 sm:gap-6" style={{ ['--d' as string]: '0ms' }}>
        <img
          src={AVATAR}
          {...(useSrcSet ? { srcSet: AVATAR_SRCSET, sizes: '(min-width: 640px) 112px, 88px' } : {})}
          alt={ui.portraitAlt(profile.name)}
          width={112}
          height={112}
          loading="eager"
          decoding="async"
          onError={() => setUseSrcSet(false)}
          className="h-[88px] w-[88px] shrink-0 rounded-2xl border rule object-cover shadow-sm sm:h-28 sm:w-28"
        />
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