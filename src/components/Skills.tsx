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
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]">
      <p className="section-label mb-4">Skills</p>
      <h2 id="skills-heading" className="sr-only">Skills</h2>

      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="text-sm font-medium mb-2 text-[#666666] dark:text-[#A3A3A3]">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label={group.label}>
              {group.skills.map((skill) => (
                <li key={skill} className="tag flex items-center gap-1.5">
                  <span className="text-[13px] leading-none" aria-hidden="true">
                    {iconMap[skill] ?? <Code2 size={13} />}
                  </span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}