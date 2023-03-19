import type { CookieParseOptions} from '@remix-run/node'
import { createCookieSessionStorage } from '@remix-run/node'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production'
  }
})

export const getSession = async (request?: Request | null | undefined, options?: CookieParseOptions | undefined) =>
  sessionStorage.getSession(request?.headers.get('cookie'), options)

export const { commitSession, destroySession } = sessionStorage
