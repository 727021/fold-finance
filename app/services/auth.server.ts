import { GoogleStrategy } from 'remix-auth-google'
import { Authenticator } from 'remix-auth'
import type { IUser} from '~/models/User'
import { User } from '~/models/User'
import { sessionStorage } from '~/services/session.server'
import { connect } from './db.server'


export const authenticator = new Authenticator<IUser>(sessionStorage)

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!
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
    await connect()
    const user =
      await User.findOne({ googleId }) ??
      await new User({
        googleId,
        email,
        givenName,
        familyName
      }).save()
    return user
  }
)

authenticator.use(googleStrategy)
