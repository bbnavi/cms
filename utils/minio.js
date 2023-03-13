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
    console.error(e)
  })
}

export const performUploads = async (minioConfig, formData) => {
  const uploads = collectUploadData(formData)

  await Promise.all(uploads.map(upload => {
    // return promiseWait(5000)
    return uploadFile(minioConfig, upload.key, upload.filetype, upload.dataURL)
  }))
}

export const collectUploadData = (formData, uploads = []) => {
  if (formData && formData.uploadData) {
    uploads.push(formData.uploadData)

    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object') {
        collectUploadData(formData[key], uploads)
      }
    })
  }

  return uploads
}
