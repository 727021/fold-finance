import { useEffect, useState } from 'react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import type { User } from '@prisma/client'
import { authenticator } from '~/services/auth.server'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import PersonIcon from '@mui/icons-material/Person'
import SavingsIcon from '@mui/icons-material/Savings'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'
import NavListLink from '~/components/NavListLink'
import ColorModeToggle from '~/components/ColorModeToggle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const drawerWidth = 240

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
      width: theme.spacing(7)
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

  const theme = useTheme()

  const [open, setOpen] = useState(true)

  const desktop = useMediaQuery('(min-width: 690px)')

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <MuiAppBar position="absolute" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label={`${open ? 'close' : 'open'} drawer`}
            onClick={() => setOpen(prev => !prev)}
            sx={{ marginRight: '24px', ...(!desktop && { display: 'none' }) }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, userSelect: 'none', cursor: 'default' }}
          >
            Fold Finance
          </Typography>
          <ColorModeToggle />
        </Toolbar>
      </MuiAppBar>
      <Drawer
        variant="permanent"
        open={desktop && open}
      >
        <Toolbar />
        <List component="nav">
          <NavListLink
            href="/app"
            label="Dashboard"
            icon={<DashboardIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/expenses"
            label="Expenses"
            icon={<ShoppingCartIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/savings"
            label="Savings"
            icon={<SavingsIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/budgets"
            label="Budgets"
            icon={<CalendarMonthIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/accounts"
            label="Accounts"
            icon={<AccountBalanceIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/reports"
            label="Reports"
            icon={<BarChartIcon />}
            disableTooltip={desktop && open}
          />
          <Divider sx={{ my: 1 }} />
          <NavListLink
            href="/app/profile"
            label="Profile"
            icon={<PersonIcon />}
            disableTooltip={desktop && open}
          />
          <NavListLink
            href="/app/settings"
            label="Settings"
            icon={<SettingsIcon />}
            disableTooltip={desktop && open}
          />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme => theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
          flexGrow: 1,
          minHeight: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet context={loaderData} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4, cursor: 'default', userSelect: 'none' }}>
            Copyright &copy; <Link href="/" color="inherit">Fold Finance</Link> {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default App
