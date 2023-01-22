import { withEmotionCache } from '@emotion/react'
import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import type { PropsWithChildren } from 'react'
import { useClientStyleContext } from '~/context/ClientStyleContext'
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material'

const Document = withEmotionCache(({ children }: PropsWithChildren, emotionCache) => {
  const clientStyleData = useClientStyleContext()

  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head
    const tags = emotionCache.sheet.tags
    emotionCache.sheet.flush()
    tags.forEach(tag => {
      (emotionCache.sheet as any)._insertTag(tag)
    })
    clientStyleData.reset()
  }, [])

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
  title: 'Fold Finance'
})

const App = () => {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export default App

// TODO
export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Document>
      <p>Error Boundary</p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Document>
  )
}

// TODO
export const CatchBoundary = () => {
  const catchData = useCatch()

  return (
    <Document>
      <p>Catch Boundary</p>
      <pre>{JSON.stringify(catchData, null, 2)}</pre>
    </Document>
  )
}
