import { Request, Response } from 'express'
import { ContactDAO } from '../daos/ContactDAO'
import { Params, getParams } from '../types/Params'
import { redisClient } from '../configs/cache'
import { Contact } from '../models/ContactModel'

export class ContactController {
  private _dao: ContactDAO

  constructor() {
    this._dao = new ContactDAO()
  }

  async findByName(req: Request, res: Response) {
    const { name } = req.params
    const params: Params = getParams(req.query)
    const { page, perPage } = params

    const cacheKey = `byName_${name.toLowerCase().trim()}_${page}_${perPage}`
    const cachedContacts = await redisClient.get(cacheKey)
    let contacts: Contact[] = []
    if (cachedContacts) {
      return res
        .status(200)
        .json({ cachedContacts: JSON.parse(cachedContacts) })
    }

    contacts = await this._dao.findByName(name, page, perPage)
    await redisClient.set(cacheKey, JSON.stringify(contacts), {
      EX: Number(process.env.CACHE_LIFE_TIME),
    })
    return res.status(200).json({ contacts })
  }
}
