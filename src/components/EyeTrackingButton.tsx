import { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'

interface EyeTrackingButtonProps {
  resumeUrl?: string
  onClick?: () => void
}

export default function EyeTrackingButton({
  resumeUrl = '#contact',
  onClick,
}: EyeTrackingButtonProps) {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 })
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const calculatePupilOffset = (eyeEl: HTMLDivElement | null) => {
        if (!eyeEl) return { x: 0, y: 0 }
        const rect = eyeEl.getBoundingClientRect()
        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2

        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY
        const angle = Math.atan2(dy, dx)
        const distance = Math.min(Math.hypot(dx, dy) / 25, 3.2) // Max pupil travel distance

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        }
      }

      setLeftPupilPos(calculatePupilOffset(leftEyeRef.current))
      setRightPupilPos(calculatePupilOffset(rightEyeRef.current))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <a
      href={resumeUrl}
      target={resumeUrl.startsWith('http') ? '_blank' : undefined}
      rel={resumeUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className="group relative inline-flex items-center justify-between gap-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 px-4 py-2 text-sm font-medium text-foreground btn-inner-shadow transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 active:scale-[0.98]"
      title="View or download Resume"
    >
      <span className="flex items-center gap-2">
        <FileText size={15} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        <span>Resume</span>
      </span>

      {/* Dual Eye Tracking Sockets */}
      <span className="flex items-center gap-1 pl-1" aria-hidden="true">
        <span
          ref={leftEyeRef}
          className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-950 shadow-inner"
        >
          <span
            className="absolute h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100 transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${leftPupilPos.x}px, ${leftPupilPos.y}px)`,
            }}
          />
        </span>
        <span
          ref={rightEyeRef}
          className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-950 shadow-inner"
        >
          <span
            className="absolute h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100 transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${rightPupilPos.x}px, ${rightPupilPos.y}px)`,
            }}
          />
        </span>
      </span>
    </a>
  )
}
