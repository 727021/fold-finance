import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'
import type { User } from '@prisma/client'

type LoaderData = { user: Partial<User> }

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return json({ user })
}

const Dashboard = () => {
  const loaderData = useLoaderData<LoaderData>()
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </div>
  )
}

export default Dashboard
