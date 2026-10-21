import anime from 'animejs'

/**
 * High-performance Anime.js animations for portfolio elements
 */

/**
 * Staggered entrance animation for page elements on initial load
 */
export function animatePageEntrance(containerSelector = '#main') {
  if (typeof window === 'undefined') return

  // Stagger sections and cards smoothly without breaking sticky on aside
  anime({
    targets: `${containerSelector} > section`,
    translateY: [24, 0],
    opacity: [0, 1],
    delay: anime.stagger(100, { start: 100 }),
    duration: 650,
    easing: 'easeOutCubic',
  })
}

/**
 * Elastic micro-interaction bounce for buttons, cards, and icons
 */
export function animateElasticClick(target: HTMLElement | null) {
  if (!target) return
  anime({
    targets: target,
    scale: [1, 0.94, 1.06, 0.98, 1],
    duration: 450,
    easing: 'easeOutElastic(1, .6)',
  })
}

/**
 * Subtle elastic pop for skill badges on hover
 */
export function animateBadgeHover(target: HTMLElement | null) {
  if (!target) return
  anime({
    targets: target,
    translateY: -3,
    scale: 1.04,
    duration: 250,
    easing: 'easeOutQuad',
  })
}

export function animateBadgeLeave(target: HTMLElement | null) {
  if (!target) return
  anime({
    targets: target,
    translateY: 0,
    scale: 1,
    duration: 250,
    easing: 'easeOutQuad',
  })
}
