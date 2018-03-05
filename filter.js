'use latest'

const fs = require('fs')
const getPixels = require('get-pixels')
const savePixels = require('save-pixels')
const getImageType = require('image-type')

// protect against invalid colors
function truncateColor(color) {
  if (color < 0) return 0
  if (color > 255) return 255
  return color
}

/**
 * Apply the specified filter to a Pixels object
 * a Pixels object has a data key which stores all the image pixels and their respective colors
 * */
function applyFilter(pixels, filterType) {
  const data = pixels.data

  /**
   * The data key in pixels is a one-dimensional array of color vectors
   * [R, G, B, A] is an image of one pixel
   * while [R, G, B, A, R, G, B, A] is an image with two pixels
   * To iterate over all colors, we have to skip 4 items in each iteration
   * since each color is composed of 4 items
   * */

  switch (filterType) {
    case 'greyscale':
      for (let i = 0; i < data.length; i += 4) {
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3

        data[i] = gray
        data[i + 1] = gray
        data[i + 2] = gray
      }
      break
    case 'invert':
      for (let i = 0; i < data.length; i += 4) {
        const R = data[i]
        const G = data[i + 1]
        const B = data[i + 2]

        data[i] = truncateColor(255 - R)
        data[i + 1] = truncateColor(255 - G)
        data[i + 2] = truncateColor(255 - B)
      }
      break
    case 'sepia':
      for (let i = 0; i < data.length; i += 4) {
        const R = data[i]
        const G = data[i + 1]
        const B = data[i + 2]

        data[i] = truncateColor(R * 0.393 + G * 0.769 + B * 0.189)
        data[i + 1] = truncateColor(R * 0.349 + G * 0.686 + B * 0.168)
        data[i + 2] = truncateColor(R * 0.272 + G * 0.534 + B * 0.131)
      }
      break
    default:
      break
  }

  return data
}

module.exports = function(context, req, res) {
  const filterType = req.url.split('/').pop()

  let image = []

  req.on('data', data => image.push(data))

  req.on('end', () => {
    const imageBuffer = Buffer.concat(image)
    const imageType = getImageType(imageBuffer)

    if (
      imageType === null ||
      (imageType.ext !== 'jpg' && imageType.ext !== 'png')
    ) {
      throw new Error('The image needs to be either jpg or png')
      return
    }

    getPixels(imageBuffer, imageType.mime, (err, pixels) => {
      if (err) throw err

      pixels.data = applyFilter(pixels, filterType)

      res.writeHead(200, { 'Content-Type': imageType.mime })
      savePixels(pixels, 'jpg').pipe(res)
    })
  })
}
