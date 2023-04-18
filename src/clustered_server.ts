import dotenv from 'dotenv'
import { cpus } from 'os'
import cluster from 'cluster'

dotenv.config()

import { connection } from 'mongoose'

import { app } from './app'

const PORT = process.env.PORT || 3000

if (cluster.isPrimary) {
  const numWorkers = cpus().length
  console.log(`Master cluster setting up ${numWorkers} workers...`)

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`)
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    )
    console.log('Starting a new worker')
    cluster.fork()
  })
} else {
  const server = app.listen(PORT, () =>
    console.log(`Worker ${process.pid} listening on port ${PORT}`)
  )

  const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM']

  events.forEach((e) => {
    process.on(e, async () => {
      server.close()
      if (connection.readyState == 1) {
        await connection.close()
      }
    })
  })
}
