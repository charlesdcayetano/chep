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
      en: 'Develop and maintain cooperative systems for member services, including LinkCoop (Cable Internet & Billing), Hulamverde (Loan Management), and PVDCI IP Tracker (Subscriber & Modem NOC), and assist with PVDCI website updates.',
      fil: 'Gumagawa at nagpapanatili ng mga sistema para sa serbisyo ng mga miyembro, kabilang ang LinkCoop (Cable Internet & Billing), Hulamverde (Loan Management), at PVDCI IP Tracker (Subscriber & Modem NOC), at tumutulong sa pag-update ng website ng PVDCI.',
    },
    {
      en: 'Provide IT support to employees and branch offices, maintaining and troubleshooting computers, printers, software, and network connections, with regular preventive maintenance and service documentation.',
      fil: 'Nagbibigay ng IT support sa mga empleyado at sangay, at nagpapanatili at nag-aayos ng mga computer, printer, software, at koneksyon sa network, kasama ang regular na preventive maintenance at pagtatala ng mga serbisyong ginawa.',
    },
    {
      en: 'Assist with preparing and validating monthly Credit Information Corporation (CIC) reports, and help protect the security and confidentiality of cooperative information.',
      fil: 'Tumutulong sa paghahanda at pagpapatunay ng buwanang ulat para sa Credit Information Corporation (CIC), at sa pagprotekta ng seguridad at pagiging kumpidensyal ng impormasyon ng kooperatiba.',
    },
    {
      en: 'Create multimedia marketing materials and ID designs to promote cooperative products, services, and membership campaigns.',
      fil: 'Gumagawa ng multimedia marketing materials at disenyo ng ID upang itaguyod ang mga produkto, serbisyo, at kampanya para sa pagiging miyembro ng kooperatiba.',
    },
  ],
}