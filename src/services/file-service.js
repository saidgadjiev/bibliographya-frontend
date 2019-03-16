import { getUploadUrl } from '../rest'

export default {
  getCategoryResourceUrl
}

function getCategoryResourceUrl (path) {
  return getUploadUrl('upload/category/') + path
}
