declare module 'save-pixels' {
  import * as ndarray from 'ndarray'

  function savePixels(pixels: ndarray, type: string): NodeJS.ReadWriteStream

  export = savePixels
}
