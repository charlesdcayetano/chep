import anime from 'animejs'

/**
 * High-performance Anime.js animations for portfolio elements
 */

/**
 * Staggered entrance animation for page elements on initial load
 */
export function animatePageEntrance(containerSelector = '#main') {
  if (typeof window === 'undefined') return

  // Stagger sections smoothly without delaying first contentful paint
  anime({
    targets: `${containerSelector} > section`,
    translateY: [12, 0],
    opacity: [0.95, 1],
    delay: anime.stagger(40, { start: 20 }),
    duration: 350,
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
