import Link from 'next/link'
import { Button } from '../../atoms/Button'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'

import { FormTypeLogin, useFormLogin } from '@home-chefs-org/forms/src/login'
import { useAsync } from '@home-chefs-org/hooks/src/fetcher'
import { Form } from '../../atoms/Form'
import { FormError } from '../../atoms/FormError'

import { useDebounce } from '@home-chefs-org/hooks/src/async'
import { login } from '@home-chefs-org/network/src/auth'
import { useAppSelector } from '@home-chefs-org/store'
import { selectUser } from '@home-chefs-org/store/user'
import { notification$ } from '@home-chefs-org/util/subjects'
import { useRouter } from 'next/navigation'

export interface ILoginFormProps {
  className?: string
}

const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const user = useAppSelector(selectUser)

  const { loading, error, success, callAsyncFn } = useAsync(
    (data: FormTypeLogin) => login(data),
    (err: any) => {
      if (err.code === 'auth/user-not-found') {
        return 'Invalid email.'
      } else if (err.code === 'auth/wrong-password') {
        return 'Invalid password.'
      }
      return 'Something went wrong. Please try again.'
    },
  )

  const debounce$ = useDebounce(1000)

  const router = useRouter()

  if (user.uid) {
    notification$.next({ message: 'Logged in. Redirecting...' })
    debounce$.next(() => router.push('/'))
  }
  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        const user = await callAsyncFn({ email, password })
        console.log('Login data: ', data, user)
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput placeholder="Enter the email." {...register('email')} />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          type="password"
          placeholder="********"
          {...register('password')}
        />
      </HtmlLabel>
      <Button loading={loading} type="submit" fullWidth>
        Login
      </Button>
      {error ? <FormError error={error} /> : null}
      <div className="mt-4 text-sm">
        Do not have a common kitchen account?
        <br />
        <Link href="/register" className="font-bold">
          Create one{' '}
        </Link>
        now.
      </div>
    </Form>
  )
}

export { LoginForm }
