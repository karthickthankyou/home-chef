import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

import type { AppProps } from 'next/app'
import { ReduxProvider } from '@home-chefs-org/store/provider'
import { ApolloProvider } from '@home-chefs-org/network/src/config/apollo'
import { Layout } from '@home-chefs-org/ui/src/components/templates/Layout'
import { AppLevelListeners } from '@home-chefs-org/ui/src/components/atoms/AppLevelListeners'
import { Notifications } from '@home-chefs-org/ui/src/components/organisms/Notifications'
import { MenuItem } from '@home-chefs-org/types'
import { Header } from '@home-chefs-org/ui/src/components/organisms/Header'
import { Footer } from '@home-chefs-org/ui/src/components/organisms/Footer'

const MENUITEMS: MenuItem[] = [
  { label: 'Menu', href: '/menu', loggedIn: true },
  { label: 'Subscribers', href: '/subscribers', loggedIn: true },
  { label: 'Orders', href: '/orders', loggedIn: true },
]
const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'About', href: '/about', loggedIn: false },
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
