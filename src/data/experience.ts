export type ExperienceItem = {
  role: string
  period: string
  org: string
  location?: string
  description: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Freelance Full-Stack Developer',
    period: '2025 — Present',
    org: 'Independent Practice',
    location: 'Philippines',
    description: [
      'Builds custom web applications, business platforms, and internal operational tools.',
      'Works with React, Vue 3, Inertia.js, Laravel, and MySQL across the stack.',
      'Implements APIs, dashboards, authentication, and reporting features for practical business needs.',
    ],
  },
  {
    role: 'IT Intern — Public Health Operations',
    period: '2025',
    org: 'Bailan District Hospital · DOLE GIP Program',
    description: [
      'Supported hospital administration, HR, medical supply, and pharmacy operations.',
      'Assisted with document handling and general IT support for operational workflows.',
    ],
  },
  {
    role: 'Python Level III Developer Residency',
    period: '2025',
    org: 'Digital Business Training Center',
    description: [
      '486-hour intensive training program.',
      'Focused on Python, object-oriented programming, databases, automation, and problem solving.',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Filamer Christian University',
  year: '2025',
  additional: [
    'Python Level III training',
    'Vue.js bootcamp',
    'DICT ICT Proficiency Diagnostic Exam',
    'Microsoft cybersecurity learning path',
  ],
}
