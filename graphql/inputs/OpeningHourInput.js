class OpeningHourInput {
  constructor(data) {
    this.dateFrom = data.dateFrom
    this.dateTo = data.dateTo
    this.description = data.description
    this.open = data.open
    this.sortNumber = data.sortNumber
    this.timeFrom = data.timeFrom
    this.timeTo = data.timeTo
    this.weekday = data.weekday
  }
}

export default OpeningHourInput
