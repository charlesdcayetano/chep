export type Certification = {
  name: string
  issuer: string
  year: string
  date?: string
  credentialId?: string
  url?: string
  fileUrl?: string
  featured?: boolean
  badge?: string
  description?: string
  skills?: string[]
}

export const certifications: Certification[] = [
  {
    name: 'DICT ICT Proficiency Diagnostic Exam (DICT Passer)',
    issuer: 'Department of Information and Communications Technology (DICT)',
    year: '2025',
    date: '2025',
    featured: true,
    badge: 'Part 1 Examination Passer',
    description:
      'Officially conferred by the Department of Information and Communications Technology. Grants civil service eligibility equivalent for government and enterprise ICT engineering roles.',
    skills: ['Software Engineering', 'System Analysis', 'Database Concepts', 'Network Architecture'],
  },
  {
    name: 'Python Level III (486 Hours OJT Residency)',
    issuer: 'Digital Business Training Center (DBTC)',
    year: '2025',
    date: 'Feb 17 – Jun 9, 2025',
    credentialId: 'DBTC Roxas City',
    fileUrl: '/certificates/python-level-iii.pdf',
    featured: true,
    badge: '486-Hour Practical Residency',
    description:
      'Intensive 486-hour practical software residency covering full-stack Python development, database modeling, and real-world commercial software implementations.',
    skills: ['Python 3', 'Database Modeling', 'API Integration', 'Enterprise Workflows'],
  },
  {
    name: 'Introduction to CSS',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2025',
    date: 'Nov 23, 2025',
    credentialId: 'cmpax4Ecq9',
    fileUrl: '/certificates/introduction-to-css.pdf',
    featured: false,
  },
  {
    name: 'Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: 't3RSgfnH92',
    fileUrl: '/certificates/microsoft-cybersecurity.pdf',
    featured: false,
  },
  {
    name: 'Installing and Configuring Computer Systems',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: '8P5irdb2I8',
    fileUrl: '/certificates/installing-configuring-computer-systems.pdf',
    featured: false,
  },
  {
    name: 'Maintaining Computer Systems and Networks',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: 'w6CNWXfasf',
    fileUrl: '/certificates/maintaining-computer-systems-networks.pdf',
    featured: false,
  },
  {
    name: 'AMA Computer Servicing (BAS, MOUS)',
    issuer: 'AMA Computer College',
    year: '2014',
    date: '2014',
    featured: false,
  },
]
