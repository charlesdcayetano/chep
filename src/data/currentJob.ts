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
  org: 'PVDCI Coop',
  // TODO: add your start date, e.g. { en: 'Jun 2025 \u2013 Present', fil: 'Hun 2025 \u2013 Kasalukuyan' }
  period: { en: 'Present', fil: 'Kasalukuyan' },
  description: [
    {
      en: 'Lead developer for core cooperative platforms: LinkCoop (Cable Internet & Billing Management System), Hulamverde (Loan Management & Billing System), and PVDCI IP Tracker (Subscriber & Modem NOC).',
      fil: 'Pangunahing developer para sa mga sistema ng kooperatiba: LinkCoop (Cable Internet & Billing Management System), Hulamverde (Loan Management & Billing System), at PVDCI IP Tracker (Subscriber & Modem NOC).',
    },
    {
      en: 'Designed and create automated workflows for subscriber billing, loan amortization schedules, interest computation, and member payment records.',
      fil: 'Nagdisenyo at nagpatupad ng mga automated workflow para sa subscriber billing, loan amortization schedules, interest computation, at records ng pagbabayad ng miyembro.',
    },
    {
      en: 'Provide day-to-day technical support, managing computer hardware, software installations, and network infrastructure to maintain uninterrupted operations.',
      fil: 'Nagbibigay ng pang-araw-araw na technical support, nagpapanatili ng computer hardware, software installations, at network infrastructure para sa tuloy-tuloy na operasyon.',
    },
  ],
}