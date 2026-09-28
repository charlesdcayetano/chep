import { Github, Linkedin, Mail, Facebook, Twitter, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: JSX.Element
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-arrow text-sm"
      aria-label={`${label} (opens in a new tab)`}
    >
      {icon}
      {label}
      <ArrowUpRight size={12} />
    </a>
  )
}

export default function ProfileHeader() {
  return (
    <header className="pt-10 pb-6 sm:pt-14 sm:pb-8">
      <div className="flex justify-end mb-5">
        <ThemeToggle />
      </div>

      <div className="flex flex-row items-start justify-between gap-5 sm:gap-8">
        <div className="flex flex-col items-start gap-5 min-w-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-base sm:text-lg text-[#666666] dark:text-[#A3A3A3]">
              {profile.title}
            </p>
          </div>

          <div className="font-mono text-xs text-[#999999] dark:text-[#737373] flex flex-wrap gap-x-4 gap-y-1">
            <span>{profile.location}</span>
            <span className="text-[#B45309] dark:text-[#F59E0B]">{profile.availability}</span>
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            <SocialLink href={profile.github} icon={<Github size={14} />} label="GitHub" />
            <SocialLink href={profile.linkedin} icon={<Linkedin size={14} />} label="LinkedIn" />
            <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={14} />} label="Email" />
            <SocialLink href={profile.facebook} icon={<Facebook size={14} />} label="Facebook" />
            <SocialLink href={profile.x} icon={<Twitter size={14} />} label="X" />
          </nav>
        </div>

        <img
          src="/images/Portfolioo.webp"
          alt="Portrait of Charles D. Cayetano"
          width={140}
          height={140}
          loading="eager"
          className="w-[90px] h-[90px] sm:w-[140px] sm:h-[140px] rounded-xl object-cover hover:grayscale transition-all duration-300 border border-[#E5E5E5] dark:border-[#2A2A2A] shrink-0"
        />
      </div>

      <p className="mt-6 text-lg sm:text-xl leading-relaxed max-w-content">
        {profile.heroStatement}
      </p>
      <p className="mt-3 text-base text-[#666666] dark:text-[#A3A3A3] max-w-content">
        {profile.heroSupporting}
      </p>
    </header>
  )
}