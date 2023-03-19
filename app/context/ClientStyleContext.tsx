import type { PropsWithChildren} from 'react'
import { useContext} from 'react'
import { createContext, useMemo, useState } from 'react'
import { createEmotionCache } from '~/createEmotionCache'
import { CacheProvider } from '@emotion/react'

export interface ClientStyleContextData {
  reset: () => void
}

const ClientStyleContext = createContext<ClientStyleContextData>({ reset: () => {} })

export const ClientCacheProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [cache, setCache] = useState(createEmotionCache())

  const clientStyleContextValue = useMemo(() => ({
    reset() {
      setCache(createEmotionCache())
    }
  }), [])

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>
        {children}
      </CacheProvider>
    </ClientStyleContext.Provider>
  )
}

export const useClientStyleContext = () => useContext(ClientStyleContext)

export default ClientStyleContext
