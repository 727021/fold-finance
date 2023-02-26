import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import type { LoaderFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { LoaderData as ContextData } from '~/routes/app'

type LoaderData = {
  reports: []
}

export const loader: LoaderFunction = async (): Promise<TypedResponse<LoaderData>> => {
  return json({
    reports: []
  })
}

const Reports = () => {
  const context = useOutletContext<ContextData>()
  const loaderData = useLoaderData<LoaderData>()

  const data = { ...context, ...loaderData }

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
      >
        Reports
      </Typography>
      <Divider />
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default Reports
