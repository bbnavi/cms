import WebUrlInput from './WebUrlInput'
class MediaContentInput {
  constructor(data) {
    this.captionText = data.captionText
    this.contentType = data.contentType
    this.copyright = data.copyright
    this.height = data.height
    this.sourceUrl = new WebUrlInput({
      url: data.sourceUrl,
      description: data.captionText
    })
    this.width = data.width
  }
}

export default MediaContentInput
