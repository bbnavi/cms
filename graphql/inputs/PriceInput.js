class PriceInput {
  constructor(data) {
    this.ageFrom = data.ageFrom
    this.ageTo = data.ageTo
    this.amount = data.amount
    this.category = data.category
    this.description = data.description
    this.groupPrice = data.groupPrice
    this.maxAdultCount = data.maxAdultCount
    this.maxChildrenCount = data.maxChildrenCount
    this.minAdultCount = data.minAdultCount
    this.minChildrenCount = data.minChildrenCount
    this.name = data.name
  }
}

export default PriceInput
