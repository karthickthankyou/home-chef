import '@zillow/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReduxProvider } from '@home-chefs-org/store/provider'
import { ApolloProvider } from '@home-chefs-org/network/src/config/apollo'
import { Layout } from '@home-chefs-org/ui/src/components/templates/Layout'
import { AppLevelListeners } from '@home-chefs-org/ui/src/components/atoms/AppLevelListeners'
import { Notifications } from '@home-chefs-org/ui/src/components/organisms/Notifications'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ApolloProvider>
        <Layout>
          <AppLevelListeners />
          <Component {...pageProps} />
          <Notifications />
        </Layout>
      </ApolloProvider>
    </ReduxProvider>
  )
}
