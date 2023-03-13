import AccessibilityInformationInput from './AccessibilityInformationInput'
import AddressInput from './AddressInput'
import CategoryInput from './CategoryInput'
import CertificateInput from './CertificateInput'
import ContactInput from './ContactInput'
import ContentBlockInput from './ContentBlockInput'
import DateInput from './DateInput'
import GeoLocationInput from './GeoLocationInput'
import LocationInput from './LocationInput'
import LunchInput from './LunchInput'
import LunchOfferInput from './LunchOfferInput'
import MediaContentInput from './MediaContentInput'
import OpeningHourInput from './OpeningHourInput'
import OperatingCompanyInput from './OperatingCompanyInput'
import PriceInput from './PriceInput'
import RegionInput from './RegionInput'
import RepeatDurationInput from './RepeatDurationInput'
import WebUrlInput from './WebUrlInput'

const classes = {
  AccessibilityInformationInput,
    AddressInput,
    CategoryInput,
    CertificateInput,
    ContactInput,
    ContentBlockInput,
    DateInput,
    GeoLocationInput,
    LocationInput,
    LunchInput,
    LunchOfferInput,
    MediaContentInput,
    OpeningHourInput,
    OperatingCompanyInput,
    PriceInput,
    RegionInput,
    RepeatDurationInput,
    WebUrlInput
}

class InputProxyClass {
  constructor (className, opts) {
    return new classes[className](opts)
  }
}

export default InputProxyClass
