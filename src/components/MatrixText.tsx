import { useState, useRef, useEffect, CSSProperties } from 'react'

const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z:・."*=_+-<>[]{}'

interface MatrixTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

export default function MatrixText({ text, className = '', style }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const animRef = useRef<number | null>(null)
  const originalRef = useRef(text)
  const progressRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    originalRef.current = text
    setDisplayText(text)
  }, [text])

  const handleMouseEnter = () => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    progressRef.current = 0
    const original = originalRef.current
    const totalFrames = original.length

    const animate = (timestamp: number) => {
      if (timestamp - lastTimeRef.current < 28) {
        animRef.current = requestAnimationFrame(animate)
        return
      }
      lastTimeRef.current = timestamp
      progressRef.current += 0.55
      const progress = progressRef.current

      if (progress >= totalFrames) {
        setDisplayText(original)
        animRef.current = null
        return
      }

      setDisplayText(
        original
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            return index < progress
              ? original[index]
              : MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          })
          .join('')
      )
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
  }

  const handleMouseLeave = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
    setDisplayText(originalRef.current)
  }

  return (
    <span
      className={`cursor-pointer transition-colors duration-150 inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {displayText}
    </span>
  )
}
