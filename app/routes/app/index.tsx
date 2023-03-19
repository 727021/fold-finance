import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getCurrentUser } from '~/services/auth.server'
import type { User } from '@prisma/client'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

type LoaderData = { user: Partial<User> }

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getCurrentUser(request)

  return json({ user })
}

const Dashboard = () => {
  const loaderData = useLoaderData<LoaderData>()
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
      >
        Dashboard
      </Typography>
      <Divider />
      <pre>
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </>
  )
}

export default Dashboard
