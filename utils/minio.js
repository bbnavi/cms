export const getPresignedUrl = async (minioConfig, key) => {
  const response = await fetch('/api/minio/presigned-url', {
    method: 'POST',
    body: JSON.stringify({
      key,
      minioConfig
    })
  })

  const { url } = await response.json()

  return url
}

export const uploadFile = async (minioConfig, filename, filetype, dataURL) => {
  const presignedUrl = await getPresignedUrl(minioConfig, filename)

  return fetch('/api/minio/upload', {
    method: 'POST',
    body: JSON.stringify({
      dataURL: dataURL,
      filename: filename,
      filetype: filetype,
      url: presignedUrl
    })
  }).then((response) => {
    console.log('upload response', response)
  }).catch((e) => {
    console.error(e);
  })
}
