class MediaContentInput {
  constructor(data) {
    this.captionText = data.captionText
    this.contentType = data.contentType
    this.copyright = data.copyright
    this.height = data.height
    this.sourceUrl = data.sourceUrl // WebUrlInput
    this.width = data.width
  }
}

export default MediaContentInput
