class OpenStreetMapInput {
  constructor(data) {
    this.capacity = data.capacity
    this.capacityCharging = data.capacityCharging
    this.capacityDisabled = data.capacityDisabled
    this.fee = data.fee
    this.lit = data.lit
    this.parking = data.parking
    this.shelter = data.shelter
    this.surface = data.surface
    this.utilization = data.utilization
    this.website = data.website
  }
}

export default OpenStreetMapInput
