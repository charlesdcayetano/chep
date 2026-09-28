export type Certification = {
  name: string
  issuer: string
  year: string
  url?: string
}

// Only include a verification URL when a real, public one exists.
export const certifications: Certification[] = [
  {
    name: 'Python Level III Developer Residency',
    issuer: 'Digital Business Training Center',
    year: '2025',
  },
  {
    name: 'DICT ICT Proficiency Diagnostic Exam',
    issuer: 'Department of Information and Communications Technology',
    year: '2025',
  },
  {
    name: 'AMA Computer Servicing ( BAS, MOUS )',
    issuer: 'AMA Computer College',
    year: '2014',
  },
]
