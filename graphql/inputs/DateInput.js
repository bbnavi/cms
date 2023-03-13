class DateInput {
  constructor(data) {
    this.dateEnd = data.dateEnd
    this.dateStart = data.dateStart
    this.timeDescription = data.timeDescription
    this.timeEnd = data.timeEnd
    this.timeStart = data.timeStart
    this.useOnlyTimeDescription = data.useOnlyTimeDescription
    this.weekday = data.weekday
  }
}

export default DateInput
