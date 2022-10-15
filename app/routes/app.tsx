import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import type { IUser } from '~/models/User'
import { authenticator } from '~/services/auth.server'

type LoaderData = IUser

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return json({ user })
}

const App = () => {
  const loaderData = useLoaderData<LoaderData>()
  return (
    <div>
      <Link to="/logout">Log out</Link>
      {/* TODO: Common dashboard layout */}
      <Outlet context={loaderData} />
    </div>
  )
}

export default App
