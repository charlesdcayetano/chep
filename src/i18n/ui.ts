import type { Language } from './LanguageContext'

/**
 * A piece of content that is either a plain string (shown in every language)
 * or an object with a Filipino version. Falls back to English when `fil` is missing.
 * Your existing data files (plain strings) keep working; switch a field to
 * `{ en, fil }` to translate it.
 */
export type Localized = string | { en: string; fil?: string }

export function tr(value: Localized, language: Language): string {
  if (typeof value === 'string') return value
  return value[language] ?? value.en
}

export interface UiStrings {
  brand: string
  skipToContent: string
  navLabel: string
  languageLabel: string
  switchToLight: string
  switchToDark: string
  portraitAlt: (name: string) => string
  tagline: string
  currently: string
  aboutCurrentLabel: string
  aboutCurrent: string
  skills: string
  skillGroups: Record<string, string>
  selectedWork: string
  technologiesUsed: (project: string) => string
  liveDemo: string
  experience: string
  background: string
  additionalTraining: string
  certifications: string
  verify: string
  githubLabel: string
  githubChartAlt: (name: string) => string
  viewGithub: string
  contactHeading: string
  contactText: string
  emailMe: string
  linkedin: string
  email: string
  footerLinks: string
  footerLocation: string
}

export const uiStrings: Record<Language, UiStrings> = {
  en: {
    brand: 'Portfolio',
    skipToContent: 'Skip to content',
    navLabel: 'Main',
    languageLabel: 'Language',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    portraitAlt: (name) => `Portrait of ${name}`,
    tagline: 'Practical software, built to be used.',
    currently: 'Currently',
    aboutCurrentLabel: 'Right now',
    aboutCurrent:
      'I work as an IT Assistant at PVDCI, supporting the team with day-to-day IT needs, from troubleshooting devices and networks to keeping internal systems running smoothly.',
    skills: 'Skills',
    skillGroups: {},
    selectedWork: 'Selected Work',
    technologiesUsed: (project) => `Technologies used in ${project}`,
    liveDemo: 'Live Demo',
    experience: 'Professional Experience',
    background: 'Education & Background',
    additionalTraining: 'Additional Training',
    certifications: 'Certifications',
    verify: 'Verify',
    githubLabel: 'GitHub activity',
    githubChartAlt: (name) => `${name}'s GitHub contribution graph`,
    viewGithub: 'View GitHub profile',
    contactHeading: 'Let\u2019s work together.',
    contactText:
      'Have a project, role, or technical problem in mind? I\u2019m open to engineering opportunities and practical software projects.',
    emailMe: 'Email me',
    linkedin: 'LinkedIn',
    email: 'Email',
    footerLinks: 'Footer links',
    footerLocation: 'Philippines \u00b7 GMT+8',
  },
  fil: {
    brand: 'Portfolio',
    skipToContent: 'Lumaktaw sa nilalaman',
    navLabel: 'Pangunahin',
    languageLabel: 'Wika',
    switchToLight: 'Lumipat sa light theme',
    switchToDark: 'Lumipat sa dark theme',
    portraitAlt: (name) => `Larawan ni ${name}`,
    tagline: 'Praktikal na software, ginawa para gamitin.',
    currently: 'Kasalukuyan',
    aboutCurrentLabel: 'Sa ngayon',
    aboutCurrent:
      'Nagtatrabaho ako bilang IT Assistant sa PVDCI, kung saan tinutulungan ko ang team sa pang-araw-araw na pangangailangan sa IT, mula sa pag-troubleshoot ng mga device at network hanggang sa pagtiyak na maayos ang takbo ng mga internal system.',
    skills: 'Mga Kasanayan',
    skillGroups: {
      Tools: 'Mga Tool',
      'AI Tools': 'Mga AI Tool',
      Design: 'Disenyo',
      Languages: 'Mga Wika',
      Frameworks: 'Mga Framework',
      Others: 'Iba pa',
    },
    selectedWork: 'Mga Piling Proyekto',
    technologiesUsed: (project) => `Mga teknolohiyang ginamit sa ${project}`,
    liveDemo: 'Live Demo',
    experience: 'Karanasang Propesyonal',
    background: 'Edukasyon at Background',
    additionalTraining: 'Karagdagang Pagsasanay',
    certifications: 'Mga Sertipikasyon',
    verify: 'I-verify',
    githubLabel: 'Aktibidad sa GitHub',
    githubChartAlt: (name) => `Graph ng mga kontribusyon ni ${name} sa GitHub`,
    viewGithub: 'Tingnan ang GitHub profile',
    contactHeading: 'Magtulungan tayo.',
    contactText:
      'May proyekto, posisyon, o teknikal na problema ka bang nasa isip? Bukas ako sa mga oportunidad sa engineering at sa mga praktikal na software project.',
    emailMe: 'I-email ako',
    linkedin: 'LinkedIn',
    email: 'Email',
    footerLinks: 'Mga link sa footer',
    footerLocation: 'Pilipinas \u00b7 GMT+8',
  },
}