import { Code, Home, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { profile } from '../data/profile'
import { translations } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

/** Strips the scheme and "www." so a URL reads like plain text ("github.com/x"). */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

function InfoRow({
  icon: Icon,
  href,
  children,
}: {
  icon: IconType | typeof Code
  href?: string
  children: React.ReactNode
}) {
  const content = (
    <>
      <Icon size={15} className="shrink-0 text-[#171717] dark:text-[#F5F5F5]" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </>
  )

  if (!href) {
    return <div className="flex items-center gap-2.5 text-sm">{content}</div>
  }

  const isMail = href.startsWith('mailto:')
  return (
    <a
      href={href}
      {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex items-center gap-2.5 text-sm hover:text-[#B45309] dark:hover:text-[#F59E0B] transition-colors"
    >
      {content}
    </a>
  )
}

export default function ProfileHeader() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="py-10 sm:py-14">
      {/* Avatar + name */}
      <div className="flex items-start gap-5 sm:gap-6">
        <img
          src="/images/Portfolioo.webp"
          alt={`Portrait of ${profile.name}`}
          width={112}
          height={112}
          loading="eager"
          className="w-[88px] h-[88px] sm:w-28 sm:h-28 rounded-2xl object-cover border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm shrink-0"
        />
        <div className="pt-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{profile.name}</h1>
          {profile.handle && (
            <p className="mt-1 text-sm font-medium text-[#B45309] dark:text-[#F59E0B]">
              @{profile.handle}
            </p>
          )}
        </div>
      </div>

      {/* Contact / quick-facts list */}
      <div className="mt-6 flex flex-col gap-2.5">
        <InfoRow icon={Code}>
          <span className="font-semibold">{profile.title}</span>
          <span className="ml-1.5 text-[#999999] dark:text-[#737373]">
            {profile.availability ? `· ${t.availability}` : null}
          </span>
        </InfoRow>
        <InfoRow icon={Home}>{profile.location}</InfoRow>
        <InfoRow icon={Mail} href={`mailto:${profile.email}`}>
          {profile.email}
        </InfoRow>
        <InfoRow icon={FaLinkedin} href={profile.linkedin}>
          {displayUrl(profile.linkedin)}
        </InfoRow>
        <InfoRow icon={FaGithub} href={profile.github}>
          {displayUrl(profile.github)}
        </InfoRow>
        <InfoRow icon={FaFacebook} href={profile.facebook}>
          {displayUrl(profile.facebook)}
        </InfoRow>
        <InfoRow icon={FaXTwitter} href={profile.x}>
          {displayUrl(profile.x)}
        </InfoRow>
      </div>
    </header>
  )
}