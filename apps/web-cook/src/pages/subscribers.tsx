import { Container } from '@home-chefs-org/ui/src/components/atoms/Container'
import { IsCook } from '@home-chefs-org/ui/src/components/molecules/IsCook'
import { IsLoggedIn } from '@home-chefs-org/ui/src/components/organisms/IsLoggedIn'
import { CookSubscribers } from '@home-chefs-org/ui/src/components/templates/CookSubscribers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className} bg-gray-25`}>
      <Container>
        <IsLoggedIn>
          {(uid) => (
            <IsCook uid={uid}>
              <CookSubscribers />
            </IsCook>
          )}
        </IsLoggedIn>
      </Container>
    </main>
  )
}
