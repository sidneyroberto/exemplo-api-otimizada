import { connect, connection } from 'mongoose'

export const connectToMongoDB = async () => {
  await connect(`${process.env.DB_URL}`, { maxPoolSize: 10 })
}

connection.on('connecting', () =>
  console.log('Opening connection to database...')
)

connection.on('connected', () =>
  console.log(`App connected to db ${connection.db.databaseName}`)
)

connection.on('disconnecting', () =>
  console.log('Closing connection to database...')
)

connection.on('disconnected', () =>
  console.log(`App disconnected to db ${connection.db.databaseName}`)
)
