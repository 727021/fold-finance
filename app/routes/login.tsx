import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import GoogleLoginButton from '~/components/GoogleLoginButton'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Divider from '@mui/material/Divider'

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
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: '1.5rem'
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Divider flexItem>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Divider>
          <Form action="/auth/google" method="post">
            <GoogleLoginButton />
          </Form>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
