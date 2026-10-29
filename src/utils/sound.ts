/**
 * Interactive Web Audio Synthesizer for UI sound effects
 * Zero external audio files required — ultra-crisp, instant response, zero latency.
 * Inspired by tactile mechanical interfaces and bryllim.com Cuelume synthesis.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

const STORAGE_KEY = 'site-sound-enabled'

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === null) return true // Default enabled
  return stored === 'true'
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, String(enabled))
  window.dispatchEvent(new CustomEvent('sound-toggle-change', { detail: { enabled } }))
  if (enabled) {
    getAudioContext()
    playToggle(true)
  }
}

// Master volume multiplier
const MASTER_VOLUME = 0.25

/**
 * Play a subtle high-frequency hover micro-tick
 */
let lastHoverTime = 0
export function playHover(): void {
  if (!isSoundEnabled()) return
  const now = Date.now()
  if (now - lastHoverTime < 45) return // Debounce rapid hovering
  lastHoverTime = now

  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(3200, t)
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.015)

    gain.gain.setValueAtTime(0.04 * MASTER_VOLUME, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.018)
  } catch {
    // Ignore audio failures safely
  }
}

/**
 * Play a tactile mechanical button press click
 */
export function playClick(): void {
  if (!isSoundEnabled()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1400, t)
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.025)

    gain.gain.setValueAtTime(0.12 * MASTER_VOLUME, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.028)
  } catch {
    // Ignore
  }
}

/**
 * Play a subtle soft pop / release
 */
export function playPop(): void {
  if (!isSoundEnabled()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(500, t)
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.03)

    gain.gain.setValueAtTime(0.09 * MASTER_VOLUME, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.04)
  } catch {
    // Ignore
  }
}

/**
 * Play toggle state sound (ascending if enabled, descending if disabled)
 */
export function playToggle(on = true): void {
  if (!isSoundEnabled() && !on) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    if (on) {
      osc.frequency.setValueAtTime(540, t)
      osc.frequency.setValueAtTime(820, t + 0.05)
    } else {
      osc.frequency.setValueAtTime(750, t)
      osc.frequency.setValueAtTime(420, t + 0.05)
    }

    gain.gain.setValueAtTime(0.08 * MASTER_VOLUME, t)
    gain.gain.setValueAtTime(0.08 * MASTER_VOLUME, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.13)
  } catch {
    // Ignore
  }
}

/**
 * Play mechanical keyboard switch sound with organic pitch jitter
 * Designed specifically for the Typing Test and input interactions
 */
export function playKey(): void {
  if (!isSoundEnabled()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // Randomize pitch slightly (±4%) for realistic mechanical switch feel
    const jitter = (Math.random() - 0.5) * 80
    const baseFreq = 720 + jitter

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(baseFreq, t)
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.02)

    gain.gain.setValueAtTime(0.14 * MASTER_VOLUME, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t)
    osc.stop(t + 0.025)
  } catch {
    // Ignore
  }
}

/**
 * Play crystal chime (harmonic double tone)
 */
export function playChime(): void {
  if (!isSoundEnabled()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const freqs = [1046.5, 1568] // C6 and G6 harmonic

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t + idx * 0.04)

      gain.gain.setValueAtTime(0.06 * MASTER_VOLUME, t + idx * 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.04 + 0.28)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(t + idx * 0.04)
      osc.stop(t + idx * 0.04 + 0.3)
    })
  } catch {
    // Ignore
  }
}

/**
 * Play success / completion fanfare chime
 */
export function playSuccess(): void {
  if (!isSoundEnabled()) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const t = ctx.currentTime
    const chord = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6 arpeggio

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, t + i * 0.06)

      gain.gain.setValueAtTime(0.07 * MASTER_VOLUME, t + i * 0.06)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.32)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(t + i * 0.06)
      osc.stop(t + i * 0.06 + 0.35)
    })
  } catch {
    // Ignore
  }
}

