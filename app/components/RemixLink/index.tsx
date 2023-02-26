import { forwardRef } from 'react'
import { Link } from '@remix-run/react'
import type { LinkProps } from '@remix-run/react'

type RemixLinkProps = Omit<LinkProps, 'to'> & { href: string }

// Wrap the Remix Link component, replacing the `to` prop with `href`
const RemixLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'> & { href: string }>(
  ({ href, children, ...rest }: RemixLinkProps, ref) => {
    return (
      <Link to={href} {...rest} ref={ref}>
        {children}
      </Link>
    )
  }
)

RemixLink.displayName = 'RemixLink'

export default RemixLink
