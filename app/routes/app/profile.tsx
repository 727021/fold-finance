import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import type { LoaderFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { LoaderData as ContextData } from '~/routes/app'

type LoaderData = {
  profile: { [key: string]: any }
}

export const loader: LoaderFunction = async (): Promise<TypedResponse<LoaderData>> => {
  return json({
    profile: {}
  })
}

const Profile = () => {
  const context = useOutletContext<ContextData>()
  const loaderData = useLoaderData<LoaderData>()

  const data = { ...context, ...loaderData }

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
      >
        Profile
      </Typography>
      <Divider />
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default Profile
