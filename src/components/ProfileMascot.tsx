import { profile } from '../data/profile'

interface ProfileMascotProps {
  size?: number
}

/**
 * Steady Profile Avatar (No animations/cursor-tracking per user request)
 */
export default function ProfileMascot({ size = 96 }: ProfileMascotProps) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div className="size-20 sm:size-24 rounded-full overflow-hidden ring-2 ring-zinc-300 dark:ring-zinc-700/80 shadow-md bg-zinc-100 dark:bg-zinc-900">
        <img
          src="/images/Portfolio.webp"
          alt={`${profile.name} portrait`}
          width={size}
          height={size}
          loading="eager"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
