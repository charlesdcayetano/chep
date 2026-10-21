import { useState } from 'react'
import { Mail, Copy, Check, Send, ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook, FaXTwitter } from 'react-icons/fa6'
import { profile } from '../data/profile'
import { useUi } from '../i18n/useUi'
import { animateElasticClick } from '../utils/animeEffects'

export default function Contact() {
  const { ui } = useUi()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="scroll-mt-28 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.contactHeading}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            {ui.contactText}
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-400">Get in touch</span>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
            Direct Inquiry
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-foreground">
                <Mail size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-zinc-400 font-mono">Email Address</p>
                <p className="font-mono text-sm sm:text-base font-semibold text-foreground truncate">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  animateElasticClick(e.currentTarget)
                  copyEmail()
                }}
                aria-label="Copy email address"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 text-xs font-semibold shadow-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={`mailto:${profile.email}`}
                onClick={(e) => animateElasticClick(e.currentTarget)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background px-4 py-2 text-xs font-semibold shadow-xs hover:opacity-90 active:scale-95 transition-all"
              >
                <Send size={13} />
                <span>Compose</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social channels */}
        <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
            Social &amp; Developer Profiles
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaGithub size={14} />
                <span>GitHub</span>
              </span>
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaLinkedin size={14} />
                <span>LinkedIn</span>
              </span>
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>

            <a
              href={profile.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaFacebook size={14} />
                <span>Facebook</span>
              </span>
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>

            <a
              href={profile.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaXTwitter size={14} />
                <span>X (Twitter)</span>
              </span>
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}