import type { LinkProps } from '@mui/material/Link'
import type { PaletteOptions, ThemeOptions } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import RemixLink from './components/RemixLink'

const lightMode: Omit<PaletteOptions, 'mode'> = {}
const darkMode: Omit<PaletteOptions, 'mode'> = {}

export const getTheme = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightMode : darkMode)
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: RemixLink
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: RemixLink
      }
    }
  }
})
