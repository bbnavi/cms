import GeoLocationInput from './GeoLocationInput'

class AddressInput {
  constructor(data) {
    this.addition = data.addition
    this.city = data.city
    this.geoLocation = new GeoLocationInput(data.geoLocation)
    this.id = data.id
    this.kind = data.kind
    this.street = data.street
    this.zip = data.zip
  }
}

export default AddressInput
