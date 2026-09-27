import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { experience } from '../data/experience'

export default function Experience() {
  const [open, setOpen] = useState(true)

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-6 border-t border-[#E5E5E5] dark:border-[#2A2A2A]"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="experience-list"
        className="flex items-center gap-2 section-label"
      >
        Professional Experience
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <h2 id="experience-heading" className="sr-only">
        Professional Experience
      </h2>

      {open && (
        <ul id="experience-list" className="mt-4 space-y-5">
          {experience.map((item) => (
            <li key={item.role} className="grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-6">
              <div className="font-mono text-xs text-[#999999] dark:text-[#737373] pt-0.5">
                {item.period}
              </div>
              <div>
                <h3 className="text-base font-medium">{item.role}</h3>
                <p className="text-sm text-[#666666] dark:text-[#A3A3A3] mb-2">
                  {item.org}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                <ul className="text-sm space-y-1 text-[#171717] dark:text-[#F5F5F5]">
                  {item.description.map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#B45309] dark:text-[#F59E0B]">—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}