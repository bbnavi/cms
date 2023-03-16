class GeoLocationInput {
  constructor(data) {
    this.latitude = data?.latitude || 0
    this.longitude = data?.longitude || 0
  }
}

export default GeoLocationInput
