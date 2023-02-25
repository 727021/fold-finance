import { Link } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'

export const loader: LoaderFunction = () => {
  // Redirect to /app for now. Landing page will come later.
  return redirect('/app')
}

const Index = () => {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <Link to="/app">App</Link>
    </div>
  )
}

export default Index
