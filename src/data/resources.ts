export type ResourceCategory =
  | 'Profiles & Domains'
  | 'GitHub Repos'
  | 'Dev Stack & Tools'
  | 'Cloud & Hosting'
  | 'Design & UI'
  | 'Learning & Docs'

export interface ResourceItem {
  id: string
  name: string
  category: ResourceCategory
  tag: string
  icon: string
  url: string
  handleOrDomain: string
  description: {
    en: string
    fil: string
  }
}

export interface ArchiveSystemItem {
  name: string
  roleOrType: {
    en: string
    fil: string
  }
  stack: string
  repoUrl?: string
}

export const resourceCategories: Array<'All' | ResourceCategory> = [
  'All',
  'Profiles & Domains',
  'GitHub Repos',
  'Dev Stack & Tools',
  'Cloud & Hosting',
  'Design & UI',
  'Learning & Docs',
]

export const resourcesList: ResourceItem[] = [
  // ─── 1. PROFILES & DOMAINS ──────────────────────────────────────────────────
  {
    id: 'profile-github',
    name: 'GitHub',
    category: 'Profiles & Domains',
    tag: 'Source Code',
    icon: 'mdi:github',
    url: 'https://github.com/charlesdcayetano',
    handleOrDomain: 'github.com/charlesdcayetano',
    description: {
      en: 'Public repositories, full-stack starter kits, commit history, and open-source code.',
      fil: 'Mga public repositories, source code ng mga proyekto, at commit history.',
    },
  },
  {
    id: 'profile-linkedin',
    name: 'LinkedIn',
    category: 'Profiles & Domains',
    tag: 'Network',
    icon: 'mdi:linkedin',
    url: 'https://linkedin.com/in/charlesdcayetano',
    handleOrDomain: 'linkedin.com/in/charlesdcayetano',
    description: {
      en: 'Professional profile, software engineering roles, credentials, and career updates.',
      fil: 'Propesyonal na profile, karanasan sa trabaho, at koneksyon sa industriya.',
    },
  },
  {
    id: 'domain-chep',
    name: 'Chep Website',
    category: 'Profiles & Domains',
    tag: 'Primary Domain',
    icon: 'solar:globe-linear',
    url: 'https://chep.website',
    handleOrDomain: 'chep.website',
    description: {
      en: 'Official custom developer domain registered via Namecheap for flagship portfolio hosting.',
      fil: 'Opisyal na custom domain na binili sa Namecheap para sa pangunahing developer portfolio.',
    },
  },
  {
    id: 'profile-gh-portfolio',
    name: 'Portfolio Mirror',
    category: 'Profiles & Domains',
    tag: 'GitHub Pages',
    icon: 'solar:code-square-linear',
    url: 'https://charlesdcayetano.github.io/portfolio/',
    handleOrDomain: 'charlesdcayetano.github.io/portfolio',
    description: {
      en: 'Personal developer web showcase hosted on GitHub Pages.',
      fil: 'Personal developer website na naka-deploy sa GitHub Pages.',
    },
  },
  {
    id: 'profile-figma',
    name: 'Figma Profile',
    category: 'Profiles & Domains',
    tag: 'UI/UX',
    icon: 'logos:figma',
    url: 'https://www.figma.com/@charlesdcayetano',
    handleOrDomain: 'figma.com/@charlesdcayetano',
    description: {
      en: 'Wireframes, system UI layouts, and design explorations.',
      fil: 'Mga UI/UX wireframes, prototypes, at disenyo ng sistema.',
    },
  },
  {
    id: 'profile-facebook',
    name: 'Facebook',
    category: 'Profiles & Domains',
    tag: 'Social',
    icon: 'mdi:facebook',
    url: 'https://www.facebook.com/parengchep',
    handleOrDomain: 'facebook.com/parengchep',
    description: {
      en: 'Community updates, direct messaging, and personal milestones.',
      fil: 'Mga update, mensahe, at koneksyon sa komunidad.',
    },
  },
  {
    id: 'profile-instagram',
    name: 'Instagram',
    category: 'Profiles & Domains',
    tag: 'Social',
    icon: 'mdi:instagram',
    url: 'https://www.instagram.com/parengchep',
    handleOrDomain: 'instagram.com/parengchep',
    description: {
      en: 'Desk setup snapshots, life outside code, and visual stories.',
      fil: 'Mga larawan ng desk setup at araw-araw na kwento.',
    },
  },
  {
    id: 'profile-x',
    name: 'X (Twitter)',
    category: 'Profiles & Domains',
    tag: 'Dev Notes',
    icon: 'ri:twitter-x-fill',
    url: 'https://x.com/ch4rlescayetano',
    handleOrDomain: 'x.com/ch4rlescayetano',
    description: {
      en: 'Short thoughts on web engineering, tooling, and tech.',
      fil: 'Maiikling tala tungkol sa web development at bagong tools.',
    },
  },

  // ─── 2. GITHUB REPOSITORIES ─────────────────────────────────────────────────
  {
    id: 'repo-cheapresume',
    name: 'cheapresume',
    category: 'GitHub Repos',
    tag: 'Laravel 11 · Vue 3',
    icon: 'logos:laravel',
    url: 'https://github.com/charlesdcayetano/cheapresume',
    handleOrDomain: 'charlesdcayetano/cheapresume',
    description: {
      en: 'Streamlined resume builder crafted with Laravel 11, Inertia.js, Vue 3, and Tailwind CSS.',
      fil: 'Resume builder app na binuo gamit ang Laravel 11, Inertia.js, Vue 3, at Tailwind CSS.',
    },
  },
  {
    id: 'repo-csas',
    name: 'csas',
    category: 'GitHub Repos',
    tag: 'Laravel · MySQL',
    icon: 'logos:laravel',
    url: 'https://github.com/charlesdcayetano/csas',
    handleOrDomain: 'charlesdcayetano/csas',
    description: {
      en: 'Smart Academic System managing student records and workflows in Laravel, PHP, and MySQL.',
      fil: 'Smart Academic System para sa pamamahala ng rekord sa Laravel, PHP, at MySQL.',
    },
  },
  {
    id: 'repo-portfolio',
    name: 'portfolio',
    category: 'GitHub Repos',
    tag: 'React · TypeScript',
    icon: 'logos:react',
    url: 'https://github.com/charlesdcayetano/portfolio',
    handleOrDomain: 'charlesdcayetano/portfolio',
    description: {
      en: 'Personal developer portfolio architecture built with React, TypeScript, and Tailwind CSS.',
      fil: 'Source code ng developer portfolio gamit ang React, TypeScript, at Tailwind CSS.',
    },
  },
  {
    id: 'repo-chep',
    name: 'chep',
    category: 'GitHub Repos',
    tag: 'Core Workspace',
    icon: 'mdi:github',
    url: 'https://github.com/charlesdcayetano/chep',
    handleOrDomain: 'charlesdcayetano/chep',
    description: {
      en: 'Interactive portfolio hub featuring modular developer apps, gear index, and bilingual UI.',
      fil: 'Interactive portfolio workspace na may modular apps, gear catalog, at bilingual UI.',
    },
  },

  // ─── 3. DEV STACK & LOCAL ENVIRONMENTS ──────────────────────────────────────
  {
    id: 'stack-vscode',
    name: 'Visual Studio Code',
    category: 'Dev Stack & Tools',
    tag: 'Code Editor',
    icon: 'vscode-icons:file-type-vscode',
    url: 'https://code.visualstudio.com/',
    handleOrDomain: 'Intelephense · Prettier · One Dark Pro',
    description: {
      en: 'Configured with Intelephense, Prettier, Material Icon Theme, One Dark Pro Darker, and AI dev plugins.',
      fil: 'Naka-setup kasama ang Intelephense, Prettier, Material Icon Theme, One Dark Pro Darker, at AI plugins.',
    },
  },
  {
    id: 'stack-laravel',
    name: 'Laravel 11/12 & PHP 8',
    category: 'Dev Stack & Tools',
    tag: 'Backend Core',
    icon: 'logos:laravel',
    url: 'https://laravel.com/',
    handleOrDomain: 'laravel.com',
    description: {
      en: 'Primary backend framework powering cooperative billing, loan engines, queues, and REST APIs.',
      fil: 'Pangunahing backend framework para sa cooperative billing, loan systems, at REST APIs.',
    },
  },
  {
    id: 'stack-frontend',
    name: 'React, Vue 3 & Inertia.js',
    category: 'Dev Stack & Tools',
    tag: 'Frontend Frameworks',
    icon: 'logos:react',
    url: 'https://react.dev/',
    handleOrDomain: 'React · Vue 3 · Next.js · Inertia',
    description: {
      en: 'Component-driven UI engineering across SPA frontends and monolithic Laravel-Inertia apps.',
      fil: 'Modernong frontend frameworks para sa mabilis, malinis, at interactive na interfaces.',
    },
  },
  {
    id: 'stack-styling',
    name: 'Tailwind CSS, Bootstrap 5 & Vite',
    category: 'Dev Stack & Tools',
    tag: 'Styling & Bundler',
    icon: 'logos:tailwindcss-icon',
    url: 'https://tailwindcss.com/',
    handleOrDomain: 'Tailwind · shadcn/ui · Vite',
    description: {
      en: 'Utility-first design systems, responsive layouts, and lightning-fast Vite HMR builds.',
      fil: 'Mabilis na UI styling, responsive design systems, at instant Vite bundling.',
    },
  },
  {
    id: 'stack-local',
    name: 'Laragon & XAMPP (Windows)',
    category: 'Dev Stack & Tools',
    tag: 'Local Server',
    icon: 'simple-icons:xampp',
    url: 'https://www.apachefriends.org/',
    handleOrDomain: 'Apache · MySQL · PHP · phpMyAdmin',
    description: {
      en: 'Fast local Windows development environments for multi-project PHP, MySQL, and virtual hosts.',
      fil: 'Local server stack sa Windows para sa Apache, MySQL, PHP, at phpMyAdmin.',
    },
  },
  {
    id: 'stack-node',
    name: 'Node.js & npm',
    category: 'Dev Stack & Tools',
    tag: 'JS Runtime',
    icon: 'logos:nodejs-icon',
    url: 'https://nodejs.org/',
    handleOrDomain: 'nodejs.org',
    description: {
      en: 'JavaScript runtime, Express APIs, package scripts, and frontend build pipelines.',
      fil: 'JavaScript runtime, package manager, at pundasyon ng modernong frontend tooling.',
    },
  },
  {
    id: 'stack-git-ps',
    name: 'Git & PowerShell',
    category: 'Dev Stack & Tools',
    tag: 'VCS & CLI',
    icon: 'logos:git-icon',
    url: 'https://git-scm.com/',
    handleOrDomain: 'git-scm.com',
    description: {
      en: 'Branching workflows, release tagging, and Windows PowerShell automation scripts.',
      fil: 'Version control workflows at PowerShell scripting para sa mabilisang automation.',
    },
  },
  {
    id: 'stack-tailscale',
    name: 'Tailscale & ZeroTier UI',
    category: 'Dev Stack & Tools',
    tag: 'Mesh Networking',
    icon: 'simple-icons:tailscale',
    url: 'https://tailscale.com/',
    handleOrDomain: 'WireGuard · Virtual LAN',
    description: {
      en: 'Zero-trust encrypted peer-to-peer mesh networking for remote server and NOC access.',
      fil: 'Ligtas na mesh VPN at virtual LAN UI para sa remote servers at internal nodes.',
    },
  },

  // ─── 4. DEPLOYMENT, CLOUD & DATABASES ───────────────────────────────────────
  {
    id: 'cloud-vercel',
    name: 'Vercel',
    category: 'Cloud & Hosting',
    tag: 'Edge Hosting',
    icon: 'simple-icons:vercel',
    url: 'https://vercel.com/',
    handleOrDomain: 'vercel.com',
    description: {
      en: 'Zero-config Git deployments and global CDN edge hosting for React and Next.js apps.',
      fil: 'Mabilis na cloud deployment at global edge hosting para sa React at Next.js projects.',
    },
  },
  {
    id: 'cloud-supabase',
    name: 'Supabase',
    category: 'Cloud & Hosting',
    tag: 'BaaS · Postgres',
    icon: 'logos:supabase-icon',
    url: 'https://supabase.com/',
    handleOrDomain: 'supabase.com',
    description: {
      en: 'Managed PostgreSQL database, authentication, and realtime APIs (used in MyTindahan & chat).',
      fil: 'Managed PostgreSQL database, auth, at realtime backend services.',
    },
  },
  {
    id: 'cloud-render',
    name: 'Render',
    category: 'Cloud & Hosting',
    tag: 'Cloud PaaS',
    icon: 'simple-icons:render',
    url: 'https://render.com/',
    handleOrDomain: 'render.com',
    description: {
      en: 'Managed web service deployments for backend APIs, Python/Flask apps, and workers.',
      fil: 'Cloud hosting platform para sa backend web services, APIs, at databases.',
    },
  },
  {
    id: 'cloud-namecheap',
    name: 'Namecheap',
    category: 'Cloud & Hosting',
    tag: 'Domain & DNS',
    icon: 'simple-icons:namecheap',
    url: 'https://www.namecheap.com/',
    handleOrDomain: 'namecheap.com',
    description: {
      en: 'Domain registrar and DNS records management powering custom production domains.',
      fil: 'Domain registration at DNS management para sa mga custom web domains.',
    },
  },
  {
    id: 'cloud-ghpages',
    name: 'GitHub Pages',
    category: 'Cloud & Hosting',
    tag: 'Static Hosting',
    icon: 'mdi:github',
    url: 'https://pages.github.com/',
    handleOrDomain: 'pages.github.com',
    description: {
      en: 'Automated static site builds and project documentation hosting directly from Git.',
      fil: 'Libreng static hosting direkta mula sa GitHub repositories.',
    },
  },
  {
    id: 'cloud-databases',
    name: 'MySQL & PostgreSQL',
    category: 'Cloud & Hosting',
    tag: 'Relational DB',
    icon: 'logos:mysql-icon',
    url: 'https://www.postgresql.org/',
    handleOrDomain: 'MySQL · PostgreSQL',
    description: {
      en: 'Relational schema modeling, indexed queries, and ACID-compliant cooperative data storage.',
      fil: 'Relational databases para sa eksaktong schema design at ligtas na rekord.',
    },
  },

  // ─── 5. DESIGN & PROTOTYPING TOOLS ──────────────────────────────────────────
  {
    id: 'design-figma',
    name: 'Figma',
    category: 'Design & UI',
    tag: 'UI/UX Prototyping',
    icon: 'logos:figma',
    url: 'https://www.figma.com/',
    handleOrDomain: 'figma.com',
    description: {
      en: 'Collaborative interface design, component libraries, and interactive user flows.',
      fil: 'Pangunahing tool sa paggawa ng UI layouts, wireframes, at interactive prototypes.',
    },
  },
  {
    id: 'design-canva',
    name: 'Canva',
    category: 'Design & UI',
    tag: 'Visual Assets',
    icon: 'devicon:canva',
    url: 'https://www.canva.com/',
    handleOrDomain: 'canva.com',
    description: {
      en: 'Presentations, project pitch decks, social graphics, and publication banners.',
      fil: 'Mabilisang disenyo para sa presentations, pitch decks, at publication materials.',
    },
  },
  {
    id: 'design-photopea',
    name: 'Photopea',
    category: 'Design & UI',
    tag: 'Raster & PSD',
    icon: 'simple-icons:photopea',
    url: 'https://www.photopea.com/',
    handleOrDomain: 'photopea.com',
    description: {
      en: 'Browser-based PSD editor for image optimization, background cleanup, and WebP asset prep.',
      fil: 'Browser-based PSD at image editor para sa paglilinis at pag-optimize ng web assets.',
    },
  },

  // ─── 6. ONLINE LEARNING, COMPILERS & DOCS ───────────────────────────────────
  {
    id: 'learn-onecompiler',
    name: 'OneCompiler',
    category: 'Learning & Docs',
    tag: 'Online Runner',
    icon: 'solar:code-square-linear',
    url: 'https://onecompiler.com/',
    handleOrDomain: 'onecompiler.com',
    description: {
      en: 'Fast browser code execution for testing algorithms across Python, PHP, JS, C, and SQL.',
      fil: 'Mabilis na online compiler para mag-test ng snippets sa Python, PHP, JS, C, at SQL.',
    },
  },
  {
    id: 'learn-programiz',
    name: 'Programiz',
    category: 'Learning & Docs',
    tag: 'Tutorials & Refs',
    icon: 'solar:bookmark-square-minimalistic-linear',
    url: 'https://www.programiz.com/',
    handleOrDomain: 'programiz.com',
    description: {
      en: 'Concise data structures, Python, C/C++, and algorithm learning guides.',
      fil: 'Malinaw na gabay at tutorials sa Python, C/C++, at data structures.',
    },
  },
  {
    id: 'learn-replit',
    name: 'Replit',
    category: 'Learning & Docs',
    tag: 'Cloud Sandbox',
    icon: 'simple-icons:replit',
    url: 'https://replit.com/',
    handleOrDomain: 'replit.com',
    description: {
      en: 'Instant cloud development sandboxes for rapid prototyping and live code sharing.',
      fil: 'Online cloud IDE para sa mabilisang pag-prototype at pagbahagi ng code.',
    },
  },
  {
    id: 'learn-laravel-docs',
    name: 'Laravel Docs',
    category: 'Learning & Docs',
    tag: 'Official Docs',
    icon: 'logos:laravel',
    url: 'https://laravel.com/docs',
    handleOrDomain: 'laravel.com/docs',
    description: {
      en: 'Authoritative reference for Eloquent ORM, queues, middleware, and Laravel 11/12 architecture.',
      fil: 'Opisyal na dokumentasyon para sa Eloquent, queues, at Laravel 11/12.',
    },
  },
  {
    id: 'learn-vue-docs',
    name: 'Vue.js Docs',
    category: 'Learning & Docs',
    tag: 'Official Docs',
    icon: 'logos:vue',
    url: 'https://vuejs.org/',
    handleOrDomain: 'vuejs.org',
    description: {
      en: 'Official Composition API, reactivity system, and single-file component documentation.',
      fil: 'Opisyal na gabay para sa Vue 3 Composition API at reactive components.',
    },
  },
  {
    id: 'learn-bootstrap-docs',
    name: 'Bootstrap Docs',
    category: 'Learning & Docs',
    tag: 'UI Reference',
    icon: 'logos:bootstrap',
    url: 'https://getbootstrap.com/',
    handleOrDomain: 'getbootstrap.com',
    description: {
      en: 'Grid utilities and component documentation for rapid admin dashboards and legacy systems.',
      fil: 'Dokumentasyon ng Bootstrap 5 para sa responsive grids at admin templates.',
    },
  },
]

export const builtSystemsInventory: ArchiveSystemItem[] = [
  {
    name: 'LinkCoop',
    roleOrType: { en: 'Cable Internet & ISP Billing', fil: 'Cable Internet & ISP Billing' },
    stack: 'Laravel 11 · PHP 8.2 · MySQL',
  },
  {
    name: 'Hulamverde',
    roleOrType: { en: 'Secure Lending & Branch Ops', fil: 'Lending & Financial Management' },
    stack: 'Laravel · MySQL · Tailwind',
  },
  {
    name: 'Cheap Resume',
    roleOrType: { en: 'Modern Resume Builder', fil: 'Modern Resume Builder' },
    stack: 'Laravel 11 · Inertia · Vue 3',
    repoUrl: 'https://github.com/charlesdcayetano/cheapresume',
  },
  {
    name: 'CSAS',
    roleOrType: { en: 'Smart Academic System', fil: 'Smart Academic System' },
    stack: 'Laravel · PHP · MySQL',
    repoUrl: 'https://github.com/charlesdcayetano/csas',
  },
  {
    name: 'MyTindahan',
    roleOrType: { en: 'Modern Online Storefront', fil: 'Online Storefront' },
    stack: 'Next.js · Supabase · Tailwind',
  },
  {
    name: 'FilTracer',
    roleOrType: { en: 'FCU Alumni Tracker (UI/UX)', fil: 'FCU Alumni Tracker (UI/UX)' },
    stack: 'Figma · UI/UX Architecture',
  },
  {
    name: 'MediCore',
    roleOrType: { en: 'Healthcare Management', fil: 'Healthcare Management' },
    stack: 'PHP · MySQL · Bootstrap',
  },
  {
    name: 'Staff-Sync HRMS',
    roleOrType: { en: 'Human Resource System', fil: 'Human Resource Management' },
    stack: 'Laravel · MySQL · Tailwind',
  },
  {
    name: 'SolPayPlus',
    roleOrType: { en: 'Digital Bills Payment API', fil: 'Digital Bills Payment API' },
    stack: 'REST API · PHP · JSON',
  },
  {
    name: 'EnrollMate / Panitan-Connect',
    roleOrType: { en: 'Enrollment & Community Portal', fil: 'Enrollment & Community System' },
    stack: 'PHP · MySQL · JavaScript',
  },
  {
    name: 'PanitCart',
    roleOrType: { en: 'Local E-Commerce Platform', fil: 'Local E-Commerce System' },
    stack: 'PHP · MySQL · Tailwind',
  },
  {
    name: 'UiAEMS',
    roleOrType: { en: 'University ERP Platform', fil: 'University ERP System' },
    stack: 'Laravel · MySQL · JS',
  },
  {
    name: 'Chep BMS',
    roleOrType: { en: 'Booking & Business Ops', fil: 'Booking & Business System' },
    stack: 'Laravel · PHP · MySQL',
  },
  {
    name: 'Byahe Ta',
    roleOrType: { en: 'Commuter & Transport App', fil: 'Transportation System' },
    stack: 'JavaScript · PHP · Maps',
  },
  {
    name: 'Brgy. Timpas Appointment',
    roleOrType: { en: 'Civic Scheduling Portal', fil: 'Barangay Appointment System' },
    stack: 'PHP · MySQL · Bootstrap',
  },
]

export const skillMatrixSummary = {
  languages: ['PHP 8', 'JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'C', 'C++'],
  frameworks: [
    'Laravel 11/12',
    'React',
    'Vue 3',
    'Next.js',
    'Inertia.js',
    'Tailwind CSS',
    'Bootstrap 5',
    'Flask',
    'Express.js',
    'Angular',
  ],
  backendAndData: ['MySQL', 'Supabase', 'REST APIs', 'AJAX', 'Node.js', 'Vite'],
  currentlyLearning: ['Docker', 'PostgreSQL', 'Advanced TypeScript', 'Node.js', 'Postman'],
}

export const trainingAndOrgHighlights = [
  {
    org: 'PVDCI Cooperative (Main Office)',
    detail: {
      en: 'IT Assistant & Lead Full-Stack Systems Developer (LinkCoop, Hulamverde, IP Tracker)',
      fil: 'IT Assistant at Lead Developer ng core cooperative platforms',
    },
    period: '2025 – Present',
  },
  {
    org: 'Filamer Christian University (FCU)',
    detail: {
      en: 'BS Information Technology Graduate · FCU Mass Media Technical Residency',
      fil: 'BS Information Technology (2025) · FCU Mass Media OJT',
    },
    period: '2025',
  },
  {
    org: 'Digital Business Training Center (DBTC)',
    detail: {
      en: '486-Hour Python, Flask & Database Residency + 3-Day Vue.js Bootcamp',
      fil: '486-Oras na Python, Flask at Database OJT + Vue.js Bootcamp',
    },
    period: 'Feb – Jun 2025',
  },
  {
    org: 'Bailan District Hospital & AMA',
    detail: {
      en: 'DOLE GIP Support (HR, Admin, Supply & Pharmacy) · AMA Office Systems Internship',
      fil: 'DOLE Government Internship Program at AMA Office Systems Internship',
    },
    period: 'Internship',
  },
]

