import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Tooltip from '@mui/material/Tooltip'
import { useColorModeContext } from '~/context/ColorModeContext'

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorModeContext()

  return (
    <Tooltip placement="left" title={`${colorMode === 'light' ? 'Light' : 'Dark'} Mode`}>
      <IconButton onClick={toggleColorMode} color="inherit">
        {colorMode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  )
}

export default ColorModeToggle
