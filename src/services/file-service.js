import { getUploadUrl, getRestUrl } from '../rest'

export default {
  getCategoryResourceUrl,
  getShareResourceUrl,
  getMediaResourceUrl,
  getMediaUploadUrl
}

function getCategoryResourceUrl (path) {
  return window.location.origin + '/upload/category/' + path
}

function getShareResourceUrl (path) {
  return window.location.origin + '/upload/temp' + path
}

function getMediaResourceUrl () {
  return window.location.origin + '/upload'
}

function getMediaUploadUrl () {
  return getRestUrl('media')
}
