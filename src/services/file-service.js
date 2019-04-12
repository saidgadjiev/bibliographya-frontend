import { getUploadUrl } from '../rest'

export default {
  getCategoryResourceUrl,
  getShareResourceUrl
}

function getCategoryResourceUrl (path) {
  return getUploadUrl('upload/category/') + path
}

function getShareResourceUrl (path) {
  return getUploadUrl('upload/share/') + path
}
