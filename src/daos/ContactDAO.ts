import { Contact, ContactModel } from '../models/ContactModel'

export class ContactDAO {
  async findByName(
    name: string,
    page: number,
    perPage: number
  ): Promise<Contact[]> {
    const contacts = await ContactModel.find({
      name: {
        $regex: name,
        $options: 'i',
      },
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec()

    return contacts
  }
}
