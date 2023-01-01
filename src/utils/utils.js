const convertImage = (image) => {
  if (image !== 'null') {
    const imageHex = image.split(',')[1]
    const buffer = Buffer.from(imageHex, 'binary')
    return buffer
  }
  return image
}

const unconvertImage = (binary) => {
  if (binary) {
    const buffer = Buffer.from(binary)
    const bufferBase64 = buffer.toString()
    return bufferBase64
  }
}

const justDate = (dbDate) => {
  const stringDate = JSON.parse(JSON.stringify(dbDate))
  const date = stringDate.split('T')[0]
  return date
}

module.exports = { convertImage, unconvertImage, justDate }