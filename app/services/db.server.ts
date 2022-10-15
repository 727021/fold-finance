import { json } from '@remix-run/node'
import { STATES, connection, connect as dbConnect } from 'mongoose'

const maxTries = process.env.MONGO_TRIES ?? 5
let tries = 0

export const connect = async (): Promise<void> => {
  // If we're already connected, do nothing
  if (connection.readyState === STATES.connected) return
  // Try to connect up to `maxTries` times
  try {
    console.info(`Connecting to database. This is attempt number ${tries + 1}...`)
    await dbConnect(process.env.MONGO_URL!)
    console.info('Connected to database.')
  } catch (error) {
    if (tries < maxTries) {
      console.error('Failed to connect to database. Trying again.', error)
      ++tries
      connect()
    } else {
      console.error('Failed to connect to database. Max tries exceeded.', error)
      throw json({ message: 'Failed to connect to database.' }, { status: 500 })
    }
  }
}
