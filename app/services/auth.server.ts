import { GoogleStrategy } from 'remix-auth-google'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { db } from '~/services/db.server'
import type { User } from '@prisma/client'

export const authenticator = new Authenticator<User>(sessionStorage)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? `https://${process.env.VERCEL_URL}/auth/google/callback`
  },
  async ({ profile }) => {
    const {
      id: googleId,
      emails: [{ value: email }],
      name: {
        givenName,
        familyName
      }
    } = profile
    const user =
      await db.user.findFirst({ where: { googleId: { equals: googleId } } }) ??
      await db.user.create({
        data: {
          googleId,
          email,
          givenName,
          familyName
        }
      })
    return user
  }
)

authenticator.use(googleStrategy)
