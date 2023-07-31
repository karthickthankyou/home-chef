import { Inter } from 'next/font/google'
import { Container } from '@home-chefs-org/ui/src/components/atoms/Container'
import { IsLoggedIn } from '@home-chefs-org/ui/src/components/organisms/IsLoggedIn'
import { IsCook } from '@home-chefs-org/ui/src/components/molecules/IsCook'
import { CookOrders } from '@home-chefs-org/ui/src/components/templates/CookOrders'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className} bg-gray-25`}>
      <Container>
        <IsLoggedIn>
          {(uid) => (
            <IsCook uid={uid}>
              <CookOrders />
            </IsCook>
          )}
        </IsLoggedIn>
      </Container>
    </main>
  )
}
