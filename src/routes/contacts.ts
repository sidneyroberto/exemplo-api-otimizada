import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'

export const contactsRouter = Router()
const contactCtrl = new ContactController()

contactsRouter.get('/name/:name', (req, res) =>
  contactCtrl.findByName(req, res)
)
