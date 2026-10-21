import { useState, useEffect, useRef, ReactNode } from 'react'

interface DeferredSectionProps {
  id?: string
  minHeight?: string | number
  className?: string
  children: ReactNode
}

/**
 * Defers rendering of below-the-fold content until near the viewport or idle.
 * Ensures zero delay for critical initial mobile paint and TBT.
 */
export default function DeferredSection({
  id,
  minHeight = '180px',
  className = '',
  children,
}: DeferredSectionProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '500px 0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // Idle fallback: render after page has stabilized
    const idleCallback =
      typeof window.requestIdleCallback !== 'undefined'
        ? window.requestIdleCallback(() => setShouldRender(true), { timeout: 3000 })
        : setTimeout(() => setShouldRender(true), 2500)

    return () => {
      observer.disconnect()
      if (typeof window.cancelIdleCallback !== 'undefined') {
        window.cancelIdleCallback(idleCallback as number)
      } else {
        clearTimeout(idleCallback as any)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id={shouldRender ? undefined : id}
      className={className}
      style={{ minHeight: shouldRender ? undefined : minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  )
}
