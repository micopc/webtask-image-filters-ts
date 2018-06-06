declare module 'get-pixels' {
  import * as ndarray from 'ndarray'

  function getPixels(
    url: Buffer | string,
    cb: (err: Error | null, pixels: ndarray) => void
  ): void
  function getPixels(
    url: Buffer | string,
    type: string,
    cb: (err: Error | null, pixels: ndarray) => void
  ): void

  export = getPixels
}
