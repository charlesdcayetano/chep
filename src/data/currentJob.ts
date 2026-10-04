import type { Localized } from '../i18n/ui'

/**
 * Your current job. Shown in the hero, in About, and at the top of Experience.
 * EDIT the period and bullet points so they describe what you really do.
 */
export const currentJob: {
  role: Localized
  org: string
  location?: Localized
  period: Localized
  description: Localized[]
} = {
  role: { en: 'IT Assistant at Main Office', fil: 'IT Assistant sa Pangunahing Opisina' },
  org: 'PVDCI',
  // TODO: add your start date, e.g. { en: 'Jun 2025 \u2013 Present', fil: 'Hun 2025 \u2013 Kasalukuyan' }
  period: { en: 'Present', fil: 'Kasalukuyan' },
  description: [
    {
      en: 'Provide day-to-day technical support, resolving hardware, software, and network issues.',
      fil: 'Nagbibigay ng pang-araw-araw na technical support at nilulutas ang mga isyu sa hardware, software, at network.',
    },
    {
      en: 'Set up and maintain computers, peripherals, and office systems so operations keep running.',
      fil: 'Nagse-set up at nagmementena ng mga computer, peripheral, at office system para tuloy-tuloy ang operasyon.',
    },
    {
      en: 'Support internal systems and digital workflows, applying web development skills where they save time.',
      fil: 'Sumusuporta sa mga internal system at digital workflow, at ginagamit ang kasanayan sa web development kung saan nakakatipid ito ng oras.',
    },
  ],
}