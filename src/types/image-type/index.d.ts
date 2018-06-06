declare module 'image-type' {
  import * as fileType from 'file-type'

  function imageType(buffer: Buffer): null | fileType.FileTypeResult

  export = imageType
}
