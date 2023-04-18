import dotenv from 'dotenv'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { ContactModel, Contact } from './models/ContactModel'
import { connectToMongoDB } from './configs/db'

dotenv.config()

const POPULATION_SIZE = 100000

const createRandomContact = (): Contact => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const name = `${firstName} ${lastName}`
  const email = faker.internet.email(firstName, lastName)
  const phone = faker.phone.number()
  const birthday = faker.date.birthdate()

  return new ContactModel({
    name,
    email,
    phone,
    birthday,
  })
}

const saveContacts = async () => {
  await connectToMongoDB()

  for (let i = 0; i < POPULATION_SIZE; i++) {
    const contact = createRandomContact()
    await ContactModel.create(contact)
    console.log(`Contact #${i + 1} created`)
  }
}

saveContacts().then(() => process.exit(1))
