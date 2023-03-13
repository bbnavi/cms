import AddressInput from './AddressInput'
import ContactInput from './ContactInput'

class OperatingCompanyInput {
  constructor(data) {
    // TODO: check data payload structure
    this.address = new AddressInput(data.address)
    this.contact = new ContactInput(data.contact)
    this.name = data.name
  }
}

export default OperatingCompanyInput
