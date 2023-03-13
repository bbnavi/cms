import WebUrlInput from './WebUrlInput'

class ContactInput {
  constructor(data) {
    console.log('ContactInput', data)

    this.email = data.email
    this.fax = data.fax
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.phone = data.phone
    this.webUrls = [new WebUrlInput(data.webUrls)] // TODO: use an array
  }
}

export default ContactInput
