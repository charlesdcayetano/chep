import type { JSX } from 'react'
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
import { Network, Lock, Database, Code2, Palette, Bot } from 'lucide-react'
import { skillGroups } from '../data/stack'
import { Section } from './Section'
import { useUi } from '../i18n/useUi'

// Maps a skill label to its icon. Skills without a well-known brand mark
// fall back to a neutral lucide icon rather than an inaccurate brand logo.
const iconMap: Record<string, JSX.Element> = {
  React: <SiReact />,
  'Vue.js 3': <SiVuedotjs />,
  'Inertia.js': <SiInertia />,
  TypeScript: <SiTypescript />,
  JavaScript: <SiJavascript />,
  'Tailwind CSS': <SiTailwindcss />,
  HTML5: <SiHtml5 />,
  CSS3: <SiCss />,
  Bootstrap: <SiBootstrap />,
  Laravel: <SiLaravel />,
  PHP: <SiPhp />,
  MySQL: <SiMysql />,
  'REST APIs': <Network />,
  Authentication: <Lock />,
  'CRUD Architecture': <Database />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  Vite: <SiVite />,
  'VS Code': <Code2 />,
  Figma: <SiFigma />,
  Canva: <Palette />,
  n8n: <SiN8N />,
  Vercel: <SiVercel />,
  Netlify: <SiNetlify />,
  Namecheap: <SiNamecheap />,
  'Python 3': <SiPython />,
  'Claude Code': <SiClaudecode />,
  'GitHub Copilot': <SiGithubcopilot />,
  ChatGPT: <Bot />,
  Gemini: <SiGooglegemini />,
}

export default function Skills() {
  const { ui } = useUi()

  return (
    <Section id="skills" title={ui.skills}>
      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.label} className="grid grid-cols-1 gap-2 sm:grid-cols-[130px_minmax(0,1fr)] sm:gap-6">
            <h3 className="t-faint pt-1.5 text-sm font-medium">
              {ui.skillGroups[group.label] ?? group.label}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label={ui.skillGroups[group.label] ?? group.label}>
              {group.skills.map((skill) => (
                <li key={skill} className="tag">
                  <span className="text-[14px] leading-none" aria-hidden="true">
                    {iconMap[skill] ?? <Code2 size={13} />}
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}