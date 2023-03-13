import MediaContentInput from './MediaContentInput'

class ContentBlockInput {
  constructor(data) {
    this.body = data.body
    this.intro = data.intro
    this.mediaContents = data.mediaContents.map((mediaContent) => new MediaContentInput(mediaContent))
    this.title = data.title
  }
}

export default ContentBlockInput
