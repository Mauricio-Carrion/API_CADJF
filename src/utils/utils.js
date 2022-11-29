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


module.exports = { convertImage, unconvertImage }