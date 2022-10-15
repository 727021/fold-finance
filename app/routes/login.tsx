import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import GoogleLoginButton from '~/components/GoogleLoginButton'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/app'
  })
  const session = await getSession(request.headers.get('cookie'))
  const error = session.get(authenticator.sessionErrorKey)
  return json({ error })
}

const Login = () => {
  const { error } = useLoaderData()
  return (
    <Form action="/auth/google" method="post">
      <GoogleLoginButton />
    </Form>
  )
}

export default Login
