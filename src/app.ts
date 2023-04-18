import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { connectToMongoDB } from './configs/db'
import { contactsRouter } from './routes/contacts'
import './configs/cache'

connectToMongoDB()

export const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.use('/contacts', contactsRouter)

app.get('/', (req, res) => res.send('Contact Book API'))
