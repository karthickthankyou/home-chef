import { AuthLayout } from '@home-chefs-org/ui/src/components/molecules/AuthLayout'
import { LoginForm } from '@home-chefs-org/ui/src/components/templates/LoginForm'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthLayout title="Login">
          <LoginForm />
        </AuthLayout>
      </main>
    </>
  )
}
