import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

const fallbackUi = {
  contactHeading: 'Contact',
  contactText: 'Let’s connect and build something great together.',
  emailMe: 'Email me',
  linkedin: 'LinkedIn',
} as const

export default function Contact() {
  const ui = fallbackUi

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t py-10 rule"
    >
      <h2 id="contact-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
        {ui.contactHeading}
      </h2>
      <p className="t-muted mt-3 max-w-content leading-relaxed">{ui.contactText}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 text-sm font-medium text-[#FAFAFA] transition-opacity hover:opacity-85 dark:bg-[#F5F5F5] dark:text-[#111111]"
        >
          <Mail size={15} aria-hidden="true" /> {ui.emailMe}
        </a>
        <div className="flex flex-wrap gap-x-6 gap-y-1 sm:ml-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-arrow min-h-[44px] text-sm">
            <Github size={14} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-arrow min-h-[44px] text-sm">
            <Linkedin size={14} aria-hidden="true" /> {ui.linkedin} <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}