import { DynamicHero } from '@home-chefs-org/ui/src/components/templates/DynamicHero'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'

const HeroSection = dynamic(() =>
  import('@home-chefs-org/3d/src/components/HeroSection').then(
    (module) => module.HeroSection,
  ),
)

export default function Home() {
  return (
    <main>
      <div className="relative h-[calc(100vh-4rem)]">
        <div className="absolute top-0 bottom-0 left-0 right-0 p-2">
          <HeroSection />
        </div>

        <div className="flex flex-col items-start space-y-2 font-black text-8xl">
          <div className="z-10 inline-block max-w-md px-3">
            Why should everyone cook?
          </div>{' '}
          <Link
            href="/kitchens"
            className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4"
          >
            <IconSearch />{' '}
            <div className="leading-none">Search home chefs near you.</div>
          </Link>
        </div>
      </div>{' '}
      <DynamicHero />
    </main>
  )
}
