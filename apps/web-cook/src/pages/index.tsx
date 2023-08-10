import { Container } from '@home-chefs-org/ui/src/components/atoms/Container'
import { IsCook } from '@home-chefs-org/ui/src/components/molecules/IsCook'
import { IsLoggedIn } from '@home-chefs-org/ui/src/components/organisms/IsLoggedIn'
import { CookProfile } from '@home-chefs-org/ui/src/components/templates/CookPage/CookPage'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <Container>
        <IsLoggedIn>
          {(uid) => (
            <IsCook uid={uid}>{(cook) => <CookProfile cook={cook} />}</IsCook>
          )}
        </IsLoggedIn>
      </Container>
    </main>
  )
}
