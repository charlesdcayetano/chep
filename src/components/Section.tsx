import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

const base = 'scroll-mt-20 py-8 border-t rule'

/** A section that is always open. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={base}>
      <h2 id={`${id}-heading`} className="section-title mb-5">
        {title}
      </h2>
      {children}
    </section>
  )
}

/** A section whose heading is a button that shows / hides the content. */
export function CollapsibleSection({
  id,
  title,
  defaultOpen = false,
  children,
}: {
  id: string
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = `${id}-content`

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={base}>
      <h2 id={`${id}-heading`} className="section-title">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex min-h-[44px] flex-1 items-center justify-between gap-3 text-left"
        >
          <span>{title}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`t-faint shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h2>
      <div id={contentId} hidden={!open} className="open-in mt-4">
        {children}
      </div>
    </section>
  )
}