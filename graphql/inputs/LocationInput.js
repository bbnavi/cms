import GeoLocationInput from './GeoLocationInput'

class LocationInput {
  constructor(data) {
    this.department = data.department
    this.district = data.district
    this.geoLocation = new GeoLocationInput(data.geoLocation)
    this.name = data.name
    this.regionName = data.regionName
    this.state = data.state
  }
}

export default LocationInput
