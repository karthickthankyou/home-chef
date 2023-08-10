import '@home-chefs/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css'

import { ApolloProvider } from '@home-chefs-org/network/src/config/apollo'
import { ReduxProvider } from '@home-chefs-org/store/provider'
import { MenuItem } from '@home-chefs-org/types'
import { AppLevelListeners } from '@home-chefs-org/ui/src/components/atoms/AppLevelListeners'
import { Footer } from '@home-chefs-org/ui/src/components/organisms/Footer'
import { Header } from '@home-chefs-org/ui/src/components/organisms/Header'
import { Notifications } from '@home-chefs-org/ui/src/components/organisms/Notifications'
import type { AppProps } from 'next/app'

const MENUITEMS: MenuItem[] = [
  { label: 'Search', href: '/kitchen', loggedIn: true },
  { label: 'Orders', href: '/orders', loggedIn: true },
  { label: 'Schedules', href: '/schedules', loggedIn: true },
  { label: 'About', href: '/about', loggedIn: false },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'Contact', href: '/contact', loggedIn: false },
  { label: 'FAQs', href: '/faqs', loggedIn: false },
  { label: 'How it works', href: '/how-it-works', loggedIn: false },
]

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <AppLevelListeners />

        <Header menuItems={MENUITEMS} sideMenuItems={SUBMENUITEMS} />

        <Component {...pageProps} />
        <Footer />
        <Notifications />
      </ApolloProvider>
    </ReduxProvider>
  )
}
