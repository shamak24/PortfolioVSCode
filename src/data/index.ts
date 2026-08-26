import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/types/portfolio'

export const portfolio: PortfolioData = portfolioData

export function getResumeUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}

export function getResumePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

export function getResumeDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

export function getResumeFilename(name: string): string {
  return `${name.replace(/\s+/g, '-')}-Resume.pdf`
}
