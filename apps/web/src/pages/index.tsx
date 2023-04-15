import { DynamicHero } from '@home-chefs-org/ui/src/components/templates/DynamicHero'
import dynamic from 'next/dynamic'

const HeroSection = dynamic(() =>
  import('@home-chefs-org/3d/src/components/HeroSection').then(
    (module) => module.HeroSection,
  ),
)

export default function Home() {
  return (
    <main>
      <div className="space-y-12">
        <HeroSection />
        <DynamicHero />
      </div>
    </main>
  )
}
