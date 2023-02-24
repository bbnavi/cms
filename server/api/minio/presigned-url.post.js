import Minio from 'minio'

export default defineEventHandler(async (event) => {
  const { minioConfig, key } = await readBody(event)

  const client = new Minio.Client({
    endPoint: minioConfig.endpoint,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey,
    useSSL: true,
  })

  const url = await client.presignedPutObject(minioConfig.bucket, key)
    .then((url) => {
      return url
    }).catch((err) => {
      console.log(err)
      return null
    })

  return {
    url
  }
})
