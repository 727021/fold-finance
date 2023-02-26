import { CssBaseline } from '@mui/material'
import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ClientCacheProvider } from '~/context/ClientStyleContext'
import { ColorModeProvider } from './context/ColorModeContext'

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <ColorModeProvider>
          <CssBaseline />
          <RemixBrowser />
        </ColorModeProvider>
      </ClientCacheProvider>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}
