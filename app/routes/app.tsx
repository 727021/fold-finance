import { useState } from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import type { User } from '@prisma/client'
import { authenticator } from '~/services/auth.server'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import AccountIcon from '@mui/icons-material/AccountCircle'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'

const drawerWidth = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'noWrap',
    width: `${drawerWidth}px`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

type LoaderData = User

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  })

  return json({ user })
}

const App = () => {
  const loaderData = useLoaderData<LoaderData>()

  const [open, setOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Fold Finance
          </Typography>
          <IconButton color="inherit">
            <AccountIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <List component="nav">
          Main Nav
          <Divider sx={{ my: 1 }} />
          Secondary Nav
        </List>
      </Drawer>
    </Box>
  )
  // {/* <Link to="/logout">Log out</Link> */}
  // {/* <Outlet context={loaderData} /> */}
}

export default App
