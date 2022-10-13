import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { connect } from '~/db.server'
import User from '~/models/User'

export const loader: LoaderFunction = async () => {
  await connect()

  await User.deleteMany({})
  const user = await new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password',
    verificationToken: 'yeet'
  }).save()

  return json({ user })
}

const Index = () => {
  const loaderData = useLoaderData()
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <pre>
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </div>
  )
}

export default Index
