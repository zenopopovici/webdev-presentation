// Slide Components
import TitleSlide from '@/app/components/slides/TitleSlide'
import BrowserSlide from '@/app/components/slides/BrowserSlide'
import BrowserDetailsSlide from '@/app/components/slides/BrowserDetailsSlide'
import JavaScriptSlide from '@/app/components/slides/JavaScriptSlide'
import EventLoopSlide from '@/app/components/slides/EventLoopSlide'
import RestApiSlide from '@/app/components/slides/RestApiSlide'
import RestApiDetailsSlide from '@/app/components/slides/RestApiDetailsSlide'
import PokerGameSlide from '@/app/components/slides/PokerGameSlide'
import PokerCodeSlide from '@/app/components/slides/PokerCodeSlide'
import SecuritySlide from '@/app/components/slides/SecuritySlide'
import DockerIntroSlide from '@/app/components/slides/DockerIntroSlide'
import DockerHowSlide from '@/app/components/slides/DockerHowSlide'
import DockerfileSlide from '@/app/components/slides/DockerfileSlide'
import CICDSlide from '@/app/components/slides/CICDSlide'
import GitHubActionsSlide from '@/app/components/slides/GitHubActionsSlide'
import GitHubActionsFileSlide from '@/app/components/slides/GitHubActionsFileSlide'
import ThankYouSlide from '@/app/components/slides/ThankYouSlide'

export interface SlideConfig {
  component: React.ComponentType<{ contentVisible?: boolean }>
  name: string
  slug: string
}

export const slides: SlideConfig[] = [
  { component: TitleSlide, name: 'Titlu', slug: 'title' },
  { component: BrowserSlide, name: 'Browser', slug: 'browser' },
  { component: BrowserDetailsSlide, name: 'Browser Details', slug: 'browser-details' },
  { component: JavaScriptSlide, name: 'JavaScript', slug: 'javascript' },
  { component: EventLoopSlide, name: 'Event Loop', slug: 'event-loop' },
  { component: RestApiSlide, name: 'REST API', slug: 'rest-api' },
  { component: RestApiDetailsSlide, name: 'REST API Details', slug: 'rest-api-details' },
  { component: PokerGameSlide, name: 'Poker Game Demo', slug: 'poker-game' },
  { component: PokerCodeSlide, name: 'Poker Code', slug: 'poker-code' },
  { component: SecuritySlide, name: 'Security', slug: 'security' },
  { component: DockerIntroSlide, name: 'Docker Intro', slug: 'docker-intro' },
  { component: DockerHowSlide, name: 'Docker How', slug: 'docker-how' },
  { component: DockerfileSlide, name: 'Dockerfile', slug: 'dockerfile' },
  { component: CICDSlide, name: 'CI/CD', slug: 'cicd' },
  { component: GitHubActionsSlide, name: 'GitHub Actions', slug: 'github-actions' },
  { component: GitHubActionsFileSlide, name: 'GitHub Actions File', slug: 'github-actions-file' },
  { component: ThankYouSlide, name: 'Thank You', slug: 'thank-you' },
]

export function getSlideBySlug(slug: string): { slide: SlideConfig; index: number } | null {
  const index = slides.findIndex(s => s.slug === slug)
  if (index === -1) return null
  return { slide: slides[index], index }
}

export function getSlideByIndex(index: number): SlideConfig | null {
  if (index < 0 || index >= slides.length) return null
  return slides[index]
}
