export type Certification = {
  name: string
  issuer: string
  year: string
  date?: string
  credentialId?: string
  url?: string
  fileUrl?: string
}

export const certifications: Certification[] = [
  {
    name: 'Introduction to CSS',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2025',
    date: 'Nov 23, 2025',
    credentialId: 'cmpax4Ecq9',
    fileUrl: '/certificates/introduction-to-css.pdf',
  },
  {
    name: 'Microsoft Cybersecurity Course: Security, Compliance, and Identity Fundamentals',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: 't3RSgfnH92',
    fileUrl: '/certificates/microsoft-cybersecurity.pdf',
  },
  {
    name: 'Python Level III (486 Hours OJT Residency)',
    issuer: 'Digital Business Training Center (DBTC)',
    year: '2025',
    date: 'Feb 17 – Jun 9, 2025',
    credentialId: 'DBTC Roxas City',
    fileUrl: '/certificates/python-level-iii.pdf',
  },
  {
    name: 'Installing and Configuring Computer Systems',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: '8P5irdb2I8',
    fileUrl: '/certificates/installing-configuring-computer-systems.pdf',
  },
  {
    name: 'Maintaining Computer Systems and Networks',
    issuer: 'TESDA - National Institute for Technical Education and Skills Development',
    year: '2026',
    date: 'Jun 26, 2026',
    credentialId: 'w6CNWXfasf',
    fileUrl: '/certificates/maintaining-computer-systems-networks.pdf',
  },
  {
    name: 'DICT ICT Proficiency Diagnostic Exam',
    issuer: 'Department of Information and Communications Technology (DICT)',
    year: '2025',
    date: '2025',
  },
  {
    name: 'AMA Computer Servicing (BAS, MOUS)',
    issuer: 'AMA Computer College',
    year: '2014',
    date: '2014',
  },
]
