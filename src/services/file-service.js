import { getRestUrl, getUploadUrl } from '../rest'
import { isMobilePlatform } from '../config'

export default {
  getCategoryResourceUrl,
  getShareResourceUrl,
  getMediaResourceUrl,
  getMediaUploadUrl
}

function getCategoryResourceUrl (path) {
  if (isMobilePlatform()) {
    return getUploadUrl('upload/category/' + path)
  }

  return window.location.origin + '/upload/category/' + path
}

function getShareResourceUrl (path) {
  return window.location.origin + '/upload/temp/' + path
}

function getMediaResourceUrl () {
  if (isMobilePlatform()) {
    getUploadUrl('upload')
  }

  return window.location.origin + '/upload'
}

function getMediaUploadUrl () {
  return getRestUrl('media')
}
