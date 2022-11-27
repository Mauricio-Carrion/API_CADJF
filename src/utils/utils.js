const convertImage = (image) => {
  const imageHex = image.split(',')[1]
  const buffer = Buffer.from(imageHex, 'binary')
  return buffer
}

const unconvertImage = (binary) => {
  if (binary) {
    const buffer = Buffer.from(binary)
    const bufferBase64 = buffer.toString()
    return bufferBase64
  }
}


module.exports = { convertImage, unconvertImage }