import { useEffect, useState } from 'react'
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Layers,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiInertia,
  SiRedis,
  SiLeaflet,
  SiTypescript,
  SiBootstrap,
  SiVercel,
} from 'react-icons/si'
import type { Project } from '../data/projects'
import { useUi } from '../i18n/useUi'

const techIconMap: Record<string, React.ReactNode> = {
  Laravel: <SiLaravel className="text-[#FF2D20]" />,
  'Laravel 11': <SiLaravel className="text-[#FF2D20]" />,
  PHP: <SiPhp className="text-[#777BB4]" />,
  MySQL: <SiMysql className="text-[#4479A1]" />,
  'Tailwind CSS': <SiTailwindcss className="text-[#06B6D4]" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  React: <SiReact className="text-[#61DAFB]" />,
  'Next.js': <SiNextdotjs />,
  'Vue 3': <SiVuedotjs className="text-[#4FC08D]" />,
  'Inertia.js': <SiInertia className="text-[#9553E9]" />,
  Redis: <SiRedis className="text-[#DC382D]" />,
  Leaflet: <SiLeaflet className="text-[#199900]" />,
  TypeScript: <SiTypescript className="text-[#3178C6]" />,
  Bootstrap: <SiBootstrap className="text-[#7952B3]" />,
  Vercel: <SiVercel />,
}

interface ProjectModalProps {
  project: Project | null
  projectsList: Project[]
  isOpen: boolean
  onClose: () => void
  onSelectProject: (p: Project) => void
}

export default function ProjectModal({
  project,
  projectsList,
  isOpen,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const { t } = useUi()
  const [isZoomed, setIsZoomed] = useState(false)

  // Keyboard navigation (ESC, Left, Right)
  useEffect(() => {
    if (!isOpen || !project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false)
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowRight') {
        const currIdx = projectsList.findIndex((p) => p.index === project.index)
        if (currIdx !== -1 && currIdx < projectsList.length - 1) {
          onSelectProject(projectsList[currIdx + 1])
          setIsZoomed(false)
        }
      } else if (e.key === 'ArrowLeft') {
        const currIdx = projectsList.findIndex((p) => p.index === project.index)
        if (currIdx > 0) {
          onSelectProject(projectsList[currIdx - 1])
          setIsZoomed(false)
        }
      }
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, project, projectsList, onClose, onSelectProject, isZoomed])

  if (!isOpen || !project) return null

  const currentIndex = projectsList.findIndex((p) => p.index === project.index)
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null
  const nextProject =
    currentIndex < projectsList.length - 1 ? projectsList[currentIndex + 1] : null

  const isCoopPrivate =
    project.name === 'LinkCoop' ||
    project.name === 'Hulamverde' ||
    project.name === 'PVDCI IP Tracker'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (isZoomed) setIsZoomed(false)
          else onClose()
        }}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
      <div
        className={`relative z-10 w-full max-h-[92vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden transition-all duration-300 ${
          isZoomed ? 'max-w-7xl' : 'max-w-4xl'
        }`}
      >
        {/* Top App Bar Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/90 px-4 sm:px-6 py-3.5 bg-zinc-50/90 dark:bg-zinc-900/70 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-200/70 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
              {project.index} / {projectsList.length < 10 ? `0${projectsList.length}` : projectsList.length}
            </span>
            <div className="min-w-0">
              <h2
                id="modal-project-title"
                className="text-base sm:text-lg font-bold font-display text-foreground truncate"
              >
                {project.name}
              </h2>
              {project.fullName && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate hidden sm:block">
                  {project.fullName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.image && (
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? 'Standard view' : 'Expand preview width'}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Maximize2 size={13} />
                <span>{isZoomed ? 'Collapse' : 'Expand View'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {/* System Screenshot / Output Mockup Viewport */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/90 overflow-hidden shadow-inner">
            {/* Browser / Application Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-200/60 dark:bg-zinc-900 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/70 dark:bg-zinc-950/70 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/80 max-w-xs truncate">
                <ShieldCheck size={12} className="text-emerald-500 shrink-0" />
                <span className="truncate">
                  {project.live
                    ? project.live.replace(/^https?:\/\//, '')
                    : `${project.name.toLowerCase().replace(/\s+/g, '-')}.internal.pvdci.coop`}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider hidden sm:inline">
                {project.image ? 'Production UI Capture' : 'Architecture Blueprint'}
              </span>
            </div>

            {/* Display Image or Blueprint */}
            {project.image ? (
              <div className="relative group bg-zinc-950/10 dark:bg-zinc-950/40 flex items-center justify-center p-2 sm:p-4">
                <img
                  src={project.image}
                  alt={`${project.name} system output interface`}
                  className="w-full h-auto rounded-lg shadow-md border border-zinc-200/50 dark:border-zinc-800/80 object-contain max-h-[58vh]"
                />
                <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-zinc-200 font-mono shadow-lg">
                  <Sparkles size={12} className="text-emerald-400" />
                  <span>Verified Production System Output</span>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center justify-center space-y-3 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="p-3 rounded-xl bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <Terminal size={28} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm">
                    {project.name} Architecture & System Codebase
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">
                    Full functional modules, database schemas, and API controllers are configured. Additional output screenshots are currently being scheduled for upload.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Description & Key Deliverables */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                    {project.category}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="text-xs font-mono text-zinc-500">
                    {project.badge || 'Enterprise Grade'}
                  </span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                  {t(project.description)}
                </p>
              </div>

              {/* Key Deliverables & System Modules */}
              {project.focus && project.focus.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-bold">
                    <Layers size={13} className="text-zinc-600 dark:text-zinc-400" />
                    <span>Engineered Capabilities & Modules</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.focus.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs text-zinc-700 dark:text-zinc-300"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enterprise / Proprietary Notice for PVDCI Coop Systems */}
              {isCoopPrivate && (
                <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
                    <Lock size={13} />
                    <span>Proprietary Production Platform</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    This system actively handles cooperative member billing, subscriber records, or internal network operations at PVDCI Coop. Source code and live database are proprietary. Full architectural walkthrough, schema review, and code walk-throughs are available during technical interview.
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Tech Stack & Action Links */}
            <div className="space-y-5 lg:border-l lg:border-zinc-200 lg:dark:border-zinc-800/80 lg:pl-6">
              {/* Stack List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 px-2.5 py-1 text-xs font-mono text-zinc-800 dark:text-zinc-200 shadow-2xs"
                    >
                      <span className="text-sm">{techIconMap[tech] || '•'}</span>
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block">
                  Deployment Status
                </span>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>{project.status || 'Active & Operational'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background font-medium text-xs shadow-sm hover:opacity-95 transition-opacity"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-foreground font-medium text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Github size={14} />
                    <span>Inspect GitHub Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Previous / Next Controls */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/80 px-4 sm:px-6 py-3 bg-zinc-50/90 dark:bg-zinc-900/60 shrink-0 text-xs">
          <button
            type="button"
            disabled={!prevProject}
            onClick={() => {
              if (prevProject) {
                onSelectProject(prevProject)
                setIsZoomed(false)
              }
            }}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors font-mono ${
              prevProject
                ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground cursor-pointer'
                : 'opacity-40 cursor-not-allowed text-zinc-400'
            }`}
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
            {prevProject && (
              <span className="hidden sm:inline text-zinc-500 font-sans ml-1">
                ({prevProject.name})
              </span>
            )}
          </button>

          <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 hidden sm:inline">
            Use <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">←</kbd> and{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">→</kbd> to browse •{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800">ESC</kbd> to close
          </span>

          <button
            type="button"
            disabled={!nextProject}
            onClick={() => {
              if (nextProject) {
                onSelectProject(nextProject)
                setIsZoomed(false)
              }
            }}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-colors font-mono ${
              nextProject
                ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground cursor-pointer'
                : 'opacity-40 cursor-not-allowed text-zinc-400'
            }`}
          >
            {nextProject && (
              <span className="hidden sm:inline text-zinc-500 font-sans mr-1">
                ({nextProject.name})
              </span>
            )}
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
