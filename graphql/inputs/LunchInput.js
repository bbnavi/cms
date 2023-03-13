import DateInput from './DateInput'
import LunchOfferInput from './LunchOfferInput'

class LunchInput {
  constructor(data) {
    this.pointOfInterestAttributes = data.pointOfInterestAttributes
    this.pointOfInterestId = data.pointOfInterestId
    this.text = data.text
    this.dates = data.dates.map((date) => new DateInput(date))
    this.lunchOffers = data.lunchOffers.map((lunchOffer) => new LunchOfferInput(lunchOffer))
  }
}

export default LunchInput
