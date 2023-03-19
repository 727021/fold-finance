import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react'
import type { LoaderFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { LoaderData as ContextData } from '~/routes/app'
import { db } from '~/services/db.server'
import { getCurrentUser } from '~/services/auth.server'
import type { Account } from '@prisma/client'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/AddCircleOutline'

type LoaderData = {
  accounts: Account[]
}

export const loader: LoaderFunction = async ({ request }): Promise<TypedResponse<LoaderData>> => {
  const user = await getCurrentUser(request)
  const accounts = await db.account.findMany({ where: { ownerId: user.id } })

  return json({
    accounts
  })
}

const Accounts = () => {
  const context = useOutletContext<ContextData>()
  const loaderData = useLoaderData<LoaderData>()

  const data = { ...context, ...loaderData }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          >
          Accounts
        </Typography>
        <IconButton href="/app/accounts/new" aria-label="New Account">
          <AddIcon fontSize="large" color="primary" />
        </IconButton>
      </Box>
      <Divider />
      <Outlet context={data} />
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default Accounts
