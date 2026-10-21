import {
  SiReact,
  SiVuedotjs,
  SiInertia,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiGit,
  SiGithub,
  SiVite,
  SiFigma,
  SiN8N,
  SiVercel,
  SiNetlify,
  SiNamecheap,
  SiPython,
  SiClaudecode,
  SiGithubcopilot,
  SiGooglegemini,
} from 'react-icons/si'
import { Network, Lock, Database, Code2, Cpu, Bot } from 'lucide-react'
import { skillGroups } from '../data/stack'
import { useUi } from '../i18n/useUi'
import { animateBadgeHover, animateBadgeLeave } from '../utils/animeEffects'

const iconMap: Record<string, React.ReactNode> = {
  React: <SiReact className="text-[#61DAFB]" />,
  'Vue.js 3': <SiVuedotjs className="text-[#4FC08D]" />,
  'Inertia.js': <SiInertia className="text-[#9553E9]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  HTML5: <SiHtml5 className="text-[#E34F26]" />,
  CSS3: <SiCss className="text-[#1572B6]" />,
  Bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  Laravel: <SiLaravel className="text-[#FF2D20]" />,
  PHP: <SiPhp className="text-[#777BB4]" />,
  MySQL: <SiMysql className="text-[#4479A1]" />,
  'REST APIs': <Network className="text-zinc-500" />,
  Authentication: <Lock className="text-zinc-500" />,
  'CRUD Architecture': <Database className="text-zinc-500" />,
  Git: <SiGit className="text-[#F05032]" />,
  GitHub: <SiGithub />,
  Vite: <SiVite className="text-[#646CFF]" />,
  'VS Code': <Code2 className="text-[#007ACC]" />,
  Figma: <SiFigma className="text-[#F24E1E]" />,
  n8n: <SiN8N className="text-[#EA4B71]" />,
  Vercel: <SiVercel />,
  Netlify: <SiNetlify className="text-[#00C7B7]" />,
  Namecheap: <SiNamecheap className="text-[#DE3723]" />,
  'Python 3': <SiPython className="text-[#3776AB]" />,
  'Claude Code': <SiClaudecode className="text-[#D97706]" />,
  'GitHub Copilot': <SiGithubcopilot className="text-[#24292E] dark:text-white" />,
  ChatGPT: <Bot />,
  Gemini: <SiGooglegemini className="text-[#4285F4]" />,
}

export default function Skills() {
  const { ui } = useUi()

  return (
    <section id="skills" className="scroll-mt-28 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground font-display">
            {ui.skills}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            Full-stack technologies, frameworks, and developer workflows
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">Core Stack</span>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 sm:p-5 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800 pb-2">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                {ui.skillGroups[group.label] ?? group.label}
              </h3>
              <span className="font-mono text-[10px] text-zinc-600 dark:text-zinc-400">
                {group.skills.length} tools
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {group.skills.map((skill) => (
                <div
                  key={skill}
                  onMouseEnter={(e) => animateBadgeHover(e.currentTarget)}
                  onMouseLeave={(e) => animateBadgeLeave(e.currentTarget)}
                  className="skill-inner-shadow cursor-default inline-flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/80 px-2.5 py-1 text-xs font-medium text-foreground hover:border-zinc-900 dark:hover:border-zinc-100 transition-colors"
                >
                  <span aria-hidden="true" className="text-sm shrink-0">
                    {iconMap[skill] ?? <Cpu size={13} aria-hidden="true" />}
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}