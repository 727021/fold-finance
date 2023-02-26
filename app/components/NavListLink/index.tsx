import { useEffect, useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { useNavigate, useLocation } from '@remix-run/react'

type NavListLinkProps = {
  href: string
  label: string
  icon: JSX.Element
  disableTooltip?: boolean
}

const NavListLink = ({
  href,
  label,
  icon,
  disableTooltip = false
}: NavListLinkProps) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (open && disableTooltip) {
      setOpen(false)
    }
  }, [disableTooltip, open])

  // The LinkComponent prop isn't working, so use onClick for now
  return (
    <Tooltip arrow placement="right" title={label} open={open} onClose={() => setOpen(false)} onOpen={() => !disableTooltip && setOpen(true)}>
      <ListItemButton onClick={() => navigate(href)} selected={pathname === href}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </Tooltip>
  )
}

export default NavListLink
