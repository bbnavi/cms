import WebUrlInput from './WebUrlInput'

class AccessibilityInformationInput {
  constructor(data) {
    this.description = data.description
    this.types = data.types
    this.urls = data.webUrls.map((webUrl) => new WebUrlInput(webUrl))
  }
}

export default AccessibilityInformationInput
