import Minio from 'minio'

export default defineEventHandler(async (event) => {
  const { minioConfig, key } = await readBody(event)
  const client = new Minio.Client({
    endPoint: minioConfig.endpoint.replace('https://', ''),
    accessKey: minioConfig.access_key_id,
    secretKey: minioConfig.secret_access_key,
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
