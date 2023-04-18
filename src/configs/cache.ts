import { createClient } from 'redis'

export const redisClient = createClient()
redisClient.on('error', (error) => console.log(error))
redisClient.connect().then(
  () => {
    console.log('Connected to Redis')
    redisClient.flushAll().then((value) => console.log('Redis cache clean'))
  },
  (error) => console.log(error)
)

const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM']

events.forEach((e) => {
  process.on(e, async () => {
    if (redisClient.isOpen) {
      await redisClient.disconnect()
      console.log('Disconnected from Redis')
    }
  })
})
