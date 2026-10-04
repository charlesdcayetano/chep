import { profile } from '../data/profile'
import { useUi } from '../i18n/useUi'

export default function Footer() {
  const { ui } = useUi()
  const year = new Date().getFullYear()

  return (
    <footer className="t-muted mt-2 border-t py-8 text-sm rule">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="min-w-0">
          <p className="font-medium text-[#171717] dark:text-[#F5F5F5]">{profile.name}</p>
          <p>{profile.title}</p>
          <p className="t-faint mt-1 font-mono text-xs">{ui.footerLocation}</p>
        </div>
        <nav aria-label={ui.footerLinks} className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[36px] items-center hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[36px] items-center hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            {ui.linkedin}
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex min-h-[36px] items-center hover:text-[#B45309] dark:hover:text-[#F59E0B]">
            {ui.email}
          </a>
        </nav>
      </div>
      <p className="t-faint mt-6 font-mono text-xs">
        © {year} {profile.name}
      </p>
    </footer>
  )
}