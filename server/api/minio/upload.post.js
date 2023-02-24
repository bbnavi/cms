export default defineEventHandler(async (event) => {
  const { url, dataURL, filename, filetype } = await readBody(event)
  const base64String = dataURL.split(';base64,').pop();
  const buffer = Buffer.from(base64String, 'base64');
  const body = new File([buffer], filename, { type: filetype });

  fetch(url, {
    method: 'PUT',
    body: body,
    headers: {},
  }).then((response) => {
    console.log('response', response.status)
  }).catch((e) => {
    console.error(e)
  })

  return {
    success: true
  }
})
