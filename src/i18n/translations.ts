import type { Language } from './LanguageContext'

/**
 * Only narrative/marketing copy is translated here. Proper nouns, job
 * titles, locations, and contact links stay as written in data/profile.ts
 * for both languages — translating "Full-Stack Developer" or a place name
 * usually reads worse, not better, on a professional portfolio.
 */
export const translations: Record<Language, {
  availability: string
  heroStatement: string
  heroSupporting: string
  aboutHeading: string
  aboutIntro: string
  about: string[]
}> = {
  en: {
    availability: 'Available for Engineering Roles',
    // Same wording as profile.heroStatement / heroSupporting in data/profile.ts.
    // Kept here (not read from profile.ts) so both languages live side by
    // side and can never end up half-English, half-Filipino on a language
    // switch. You can remove heroStatement/heroSupporting from profile.ts
    // once you're happy with this, or leave them there unused.
    heroStatement:
      'Front-end and full-stack developer building practical web applications, business systems, and digital workflows.',
    heroSupporting:
      'I build applications where interfaces, backend logic, databases, and business rules work together.',
    aboutHeading: 'About',
    aboutIntro: 'Hello there!',
    about: [
      'BS Information Technology graduate building practical applications and business systems — academic management, healthcare workflows, booking systems, and public-service platforms.',
      'Based in Roxas City, Capiz, Philippines. Continuously learning, and open to engineering opportunities.',
    ],
  },
  fil: {
    availability: 'Bukas para sa Engineering Roles',
    heroStatement:
      'Front-end at full-stack developer na gumagawa ng praktikal na web applications, business systems, at digital workflows.',
    heroSupporting:
      'Gumagawa ako ng mga application kung saan magkakasamang gumagana ang interface, backend logic, database, at business rules.',
    aboutHeading: 'Tungkol Sa Akin',
    aboutIntro: 'Kumusta!',
    about: [
      'Isang BS Information Technology graduate na gumagawa ng praktikal na aplikasyon at business systems — academic management, healthcare workflows, booking systems, at public-service platforms.',
      'Naninirahan sa Roxas City, Capiz, Philippines. Patuloy na natututo, at bukas sa mga oportunidad sa larangan ng engineering.',
    ],
  },
}