export interface SocialLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  role: string
  location: string
  bio: string[]
  email: string
  social: SocialLink[]
  availability: string
  focus: string[]
  available: boolean
  hero: {
    headline: string
    subheadline: string
  }
  contact: {
    title: string
    subtitle: string
  }
  footer: string
}

export interface Skill {
  name: string
  accentColor?: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface Project {
  id: string
  name: string
  description: string
  longDescription: string[]
  tech: string[]
  date: string
  status?: string
  image?: string
  liveDemo?: string
  github?: string
}

export interface Language {
  id: string
  label: string
  ext: string
  color: string
  comment: string
}

export interface ThemeColors {
  bg: string
  panel: string
  panel2: string
  line: string
  text: string
  textDim: string
  textBright: string
  amber: string
  purple: string
  green: string
  blue: string
}

export interface Theme {
  id: string
  label: string
  colors: ThemeColors
}

export interface Section {
  id: string
  label: string
  number: string
  eyebrow: string
  title: string
  accent: 'blue' | 'purple' | 'green' | 'amber' | string
}

export interface Resume {
  googleDriveFileId: string
}

export interface PortfolioData {
  profile: Profile
  sections: Section[]
  skills: SkillCategory[]
  projects: Project[]
  languages: Language[]
  themes: Theme[]
  resume: Resume
}
