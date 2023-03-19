import type { PaletteMode } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { getTheme } from '~/theme'

type ColorModeContextOptions = {
  toggleColorMode: () => void
  colorMode: PaletteMode
}

const ColorModeContext = createContext<ColorModeContextOptions>({ toggleColorMode: () => {}, colorMode: 'light' })

export const useColorModeContext = () => useContext(ColorModeContext)


type ColorModeProviderProps = {
  children: ReactNode
  defaultMode?: PaletteMode
}

export const ColorModeProvider = ({ children, defaultMode = 'light' }: ColorModeProviderProps) => {
  const [colorMode, setColorMode] = useState<PaletteMode>(defaultMode)

  const toggleColorMode = useCallback(() => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const theme = useMemo(() => createTheme(getTheme(colorMode)), [colorMode])

  const colorModeContextValue = {
    toggleColorMode,
    colorMode
  }

  return (
    <ThemeProvider theme={theme}>
      <ColorModeContext.Provider value={colorModeContextValue}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  )
}
